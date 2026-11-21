import { getCurrentUser } from '../../services/apiAuth';
import { useQuery } from '@tanstack/react-query';

// Staff accounts carry app_metadata.role = 'staff'. app_metadata can only be
// set with the service-role key (Edge Function / SQL), never by the user.
export const STAFF_ROLE = 'staff';

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  return {
    isLoading,
    user,
    isAuthenticated: user?.role === 'authenticated',
    isStaff: user?.app_metadata?.role === STAFF_ROLE,
  };
}
