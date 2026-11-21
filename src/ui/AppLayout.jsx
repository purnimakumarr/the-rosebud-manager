import { Suspense } from 'react';
import { Outlet } from 'react-router';
import Spinner from './Spinner';
import Sidebar from './Sidebar';
import Header from './Header';
import styled from 'styled-components';

const Main = styled.main`
  /* Transparent so the body's rose/mint glow shows through */
  background-color: transparent;
  padding: 4rem 4.8rem 6.4rem;
  overflow: auto;
`;

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
