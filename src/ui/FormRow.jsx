import styled from 'styled-components';
import { device } from '../styles/breakpoints';


const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 1.2rem;
  }

  @media ${device.tablet} {
    grid-template-columns: 18rem 1fr;

    /* Error message moves under the input */
    & > span {
      grid-column: 2;
    }
  }

  @media ${device.mobile} {
    grid-template-columns: minmax(0, 1fr);
    gap: 0.8rem;

    & > span {
      grid-column: auto;
    }
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
