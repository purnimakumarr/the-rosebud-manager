import { formatDistance, parseISO } from 'date-fns';
import { differenceInDays } from 'date-fns';

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In');

// Booking dates are stored as calendar dates at UTC midnight (e.g. 2026-11-21T00:00:00).
// "Today" must therefore be the staff member's LOCAL calendar date expressed at UTC
// midnight. Using new Date().setUTCHours(0) would pick the UTC date instead, which is a
// day off for anyone outside UTC around midnight. Returning a stable string (no ms/sec)
// also keeps React Query keys stable between renders.
export const getToday = function () {
  const now = new Date();
  const localDate = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('-');

  return `${localDate}T00:00:00.000Z`;
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
    value,
  );

// Reads ?page= from the URL as a whole number >= 1 (falls back to 1 for junk like "abc").
export const getPageParam = (searchParams) => {
  const page = Math.floor(Number(searchParams.get('page')));
  return Number.isFinite(page) && page >= 1 ? page : 1;
};
