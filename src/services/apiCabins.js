import supabase from './supabase';
import { logError } from '../utils/logError';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const BUCKET = 'cabin-images';
const PUBLIC_PREFIX = `${supabaseUrl}/storage/v1/object/public/${BUCKET}/`;

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    logError(error);
    throw new Error('Rooms could not be loaded');
  }

  return data;
}

// Uploads a new photo and returns its public URL and storage path.
async function uploadImage(file) {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '');
  const path = `${crypto.randomUUID()}-${safeName}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file);
  if (error) {
    logError(error);
    throw new Error('Room photo could not be uploaded');
  }

  return { url: `${PUBLIC_PREFIX}${path}`, path };
}

async function removeImagePath(path) {
  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) logError(error);
}

// Removes a photo from storage, but only if no room still uses it
// (duplicated rooms share the same image URL).
async function removeImageIfUnused(url) {
  if (!url?.startsWith(PUBLIC_PREFIX)) return;

  const { count, error } = await supabase
    .from('cabins')
    .select('id', { count: 'exact', head: true })
    .eq('image', url);

  if (error || count > 0) return;
  await removeImagePath(url.slice(PUBLIC_PREFIX.length));
}

export async function createEditCabin(newCabin, id) {
  const isNewImage = newCabin.image instanceof File;

  // When editing, remember the old photo so it can be cleaned up afterwards
  let oldImage = null;
  if (id && isNewImage) {
    const { data } = await supabase
      .from('cabins')
      .select('image')
      .eq('id', id)
      .single();
    oldImage = data?.image ?? null;
  }

  // 1. Upload the photo first, so a failed upload never touches the room row
  const uploaded = isNewImage ? await uploadImage(newCabin.image) : null;
  const row = { ...newCabin, image: uploaded ? uploaded.url : newCabin.image };

  // 2. Create or update the room
  const query = id
    ? supabase.from('cabins').update(row).eq('id', id)
    : supabase.from('cabins').insert([row]);

  const { data, error } = await query.select().single();

  if (error) {
    logError(error);
    // Roll back the upload; the room itself was never changed
    if (uploaded) await removeImagePath(uploaded.path);
    throw new Error(id ? 'Room could not be edited' : 'Room could not be created');
  }

  // 3. Clean up the replaced photo
  if (oldImage && oldImage !== data.image) await removeImageIfUnused(oldImage);

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)
    .select('image')
    .maybeSingle();

  if (error) {
    logError(error);
    throw new Error('Room could not be deleted');
  }

  if (data?.image) await removeImageIfUnused(data.image);

  return data;
}
