import { getBookings } from '../../services/apiBookings';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { PAGE_SIZE } from '../../utils/constants';
import { getPageParam } from '../../utils/helpers';

const SORT_FIELDS = ['startDate', 'totalPrice'];
const STATUSES = ['checked-out', 'checked-in', 'unconfirmed'];

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // FILTER
  const filterValue = searchParams.get('status');
  const filter =
    !STATUSES.includes(filterValue)
      ? null
      : { field: 'status', value: filterValue, method: 'eq' };

  // SORT
  // Only allow known columns, so a hand-edited URL can't break the query
  const [rawField, rawDirection] = (searchParams.get('sortBy') || '').split('-');
  const sortBy = {
    field: SORT_FIELDS.includes(rawField) ? rawField : 'startDate',
    direction: rawDirection === 'asc' ? 'asc' : 'desc',
  };

  // PAGE
  const page = getPageParam(searchParams);

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  // PRE-FETCHING
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return { isLoading, error, bookings, count };
}
