import styled from 'styled-components';
import { HiBars3 } from 'react-icons/hi2';
import HeaderMenu from './HeaderMenu';
import ButtonIcon from './ButtonIcon';
import UserAvatar from '../features/authentication/UserAvatar';
import { device } from '../styles/breakpoints';

const StyledHeader = styled.header`
  background-color: color-mix(in srgb, var(--color-grey-0) 85%, transparent);
  backdrop-filter: blur(8px);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;

  @media ${device.tablet} {
    padding: 1.2rem 3.2rem;
    gap: 1.6rem;
  }

  @media ${device.mobile} {
    padding: 1rem 1.6rem;
    gap: 0.8rem;
  }
`;

const MenuButton = styled(ButtonIcon)`
  display: none;
  margin-right: auto;

  @media ${device.tablet} {
    display: block;
  }

  & svg {
    width: 2.6rem;
    height: 2.6rem;
  }
`;

function Header({ onOpenSidebar }) {
  return (
    <StyledHeader>
      <MenuButton
        onClick={onOpenSidebar}
        aria-label='Open menu'
        aria-controls='app-sidebar'
      >
        <HiBars3 />
      </MenuButton>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
