import styled from 'styled-components';
import { device } from '../styles/breakpoints';

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;
  flex-wrap: wrap;

  @media ${device.small} {
    & > button {
      flex: 1 1 auto;
    }
  }
`;

export default ButtonGroup;
