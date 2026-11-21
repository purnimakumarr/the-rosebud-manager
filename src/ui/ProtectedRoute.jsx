import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import { useLogout } from '../features/authentication/useLogout';
import SpinnerFullPage from './SpinnerFullPage';
import Heading from './Heading';
import Button from './Button';

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2.4rem;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, isStaff } = useUser();
  const { logout, isLoading: isLoggingOut } = useLogout();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate('/login', { replace: true });
    },
    [isAuthenticated, isLoading, navigate],
  );

  if (isLoading) return <SpinnerFullPage />;

  // Signed in, but not a staff account (e.g. a self-registered user)
  if (isAuthenticated && !isStaff)
    return (
      <FullPage>
        <Heading as='h2'>This account doesn&apos;t have staff access</Heading>
        <p>Ask a Rosebud staff member to create an account for you.</p>
        <Button
          variation='secondary'
          onClick={() => logout()}
          disabled={isLoggingOut}
        >
          Log out
        </Button>
      </FullPage>
    );

  if (isAuthenticated) return children;

  return null;
}

export default ProtectedRoute;
