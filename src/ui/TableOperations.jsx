import styled from 'styled-components';
import { device } from '../styles/breakpoints';

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  flex-wrap: wrap;
  max-width: 100%;

  @media ${device.mobile} {
    width: 100%;
    gap: 1.2rem;
  }
`;

export default TableOperations;
