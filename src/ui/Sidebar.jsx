import { lazy, Suspense, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { HiXMark } from 'react-icons/hi2';
import Logo from './Logo';
import MainNav from './MainNav';
import ButtonIcon from './ButtonIcon';
import { device } from '../styles/breakpoints';

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2rem;
  border-right: 1px solid var(--color-brand-border);

  grid-row: 1 / -1;
  display: flex;
  gap: 3.2rem;
  flex-direction: column;
  overflow-y: auto;

  /* Off-canvas drawer on tablets and phones */
  @media ${device.tablet} {
    position: fixed;
    inset: 0 auto 0 0;
    z-index: 1001;
    width: min(28rem, 85vw);
    box-shadow: var(--shadow-lg);
    transform: translateX(-100%);
    visibility: hidden;
    transition:
      transform 0.3s ease,
      visibility 0.3s;

    ${(props) =>
      props.$isOpen &&
      css`
        transform: translateX(0);
        visibility: visible;
      `}
  }
`;

const Backdrop = styled.div`
  display: none;

  @media ${device.tablet} {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 1000;
    background-color: var(--backdrop-color);
    backdrop-filter: blur(2px);
    opacity: ${(props) => (props.$isOpen ? 1 : 0)};
    pointer-events: ${(props) => (props.$isOpen ? 'auto' : 'none')};
    transition: opacity 0.3s;
  }
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
`;

const CloseButton = styled(ButtonIcon)`
  display: none;

  @media ${device.tablet} {
    display: block;
  }
`;

// Sample-data uploader: dev server only. data/ is gitignored, so a glob is used
// instead of a static import. It resolves to nothing when the folder is
// missing (fresh clone, Vercel), and is stripped from production builds.
const uploaderModules = import.meta.env.DEV
  ? import.meta.glob('../../data/Uploader.jsx')
  : {};
const loadUploader = Object.values(uploaderModules)[0];
const Uploader = loadUploader ? lazy(loadUploader) : null;

function Sidebar({ isOpen = false, onClose }) {
  // Close the drawer with Escape
  useEffect(
    function () {
      if (!isOpen) return;
      function handleKey(e) {
        if (e.key === 'Escape') onClose?.();
      }
      document.addEventListener('keydown', handleKey);
      return () => document.removeEventListener('keydown', handleKey);
    },
    [isOpen, onClose],
  );

  return (
    <>
      <Backdrop $isOpen={isOpen} onClick={onClose} aria-hidden='true' />
      <StyledSidebar $isOpen={isOpen} id='app-sidebar'>
        <TopRow>
          <Logo />
          <CloseButton onClick={onClose} aria-label='Close menu'>
            <HiXMark />
          </CloseButton>
        </TopRow>
        <MainNav onNavigate={onClose} />
        {Uploader && (
          <Suspense fallback={null}>
            <Uploader />
          </Suspense>
        )}
      </StyledSidebar>
    </>
  );
}

export default Sidebar;
