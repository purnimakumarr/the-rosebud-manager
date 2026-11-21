import styled from 'styled-components';
import LoginForm from '../features/authentication/LoginForm';
import Logo from '../ui/Logo';
import Heading from '../ui/Heading';

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(0, 48rem);
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  padding: 4.8rem 1.6rem;
`;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  text-align: center;
`;

const Subline = styled.p`
  color: var(--color-grey-500);
  font-size: 1.5rem;
`;

const Footnote = styled.p`
  text-align: center;
  font-size: 1.3rem;
  color: var(--color-grey-500);
`;

function Login() {
  return (
    <LoginLayout>
      <Logo size='large' />
      <Intro>
        <Heading as='h4'>Welcome back to the front desk</Heading>
        <Subline>Staff log-in for The Rosebud Stays</Subline>
      </Intro>
      <LoginForm />
      <Footnote>✿ Check in, put your feet up, and stay a while.</Footnote>
    </LoginLayout>
  );
}

export default Login;
