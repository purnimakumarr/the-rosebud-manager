import supabase from './supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

// Staff accounts are created server-side by the `create-staff-user` Edge Function,
// which checks the caller is staff and uses the service-role key. This lets public
// sign-ups stay disabled in Supabase Auth, and the admin's session is never swapped.
export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.functions.invoke('create-new-staff', {
    body: { fullName, email, password },
  });

  if (error) {
    let message = 'User could not be created';
    try {
      const body = await error.context?.json();
      if (body?.error) message = body.error;
    } catch {
      // Response had no JSON body; keep the generic message
    }
    throw new Error(message);
  }

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  let updateData;

  if (password) updateData = { password };

  if (fullName)
    updateData = {
      data: {
        fullName,
      },
    };
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${crypto.randomUUID()}`;

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);

  return updatedUser;
}
