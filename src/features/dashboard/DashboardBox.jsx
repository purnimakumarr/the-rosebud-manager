import styled from "styled-components";
import { device } from '../../styles/breakpoints';

const DashboardBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);

  padding: 3.2rem;
  min-width: 0;

  @media ${device.mobile} {
    padding: 2rem 1.6rem;
  }

  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

export default DashboardBox;
