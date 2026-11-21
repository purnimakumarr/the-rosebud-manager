import { Suspense, useState } from 'react';
import { Outlet } from 'react-router';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import Header from './Header';
import Spinner from './Spinner';
import { device } from '../styles/breakpoints';

const Main = styled.main`
  /* Transparent so the body's rose/mint glow shows through */
  background-color: transparent;
  padding: 4rem 4.8rem 6.4rem;
  overflow: auto;
  min-width: 0;

  @media ${device.tablet} {
    padding: 3.2rem 3.2rem 4.8rem;
  }

  @media ${device.mobile} {
    padding: 2.4rem 1.6rem 4rem;
  }
`;

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  height: 100dvh;

  /* Sidebar leaves the grid and becomes a drawer */
  @media ${device.tablet} {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media ${device.mobile} {
    gap: 2.4rem;
  }
`;

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <StyledAppLayout>
      <Header onOpenSidebar={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
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
