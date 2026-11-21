import styled, { css } from 'styled-components';

export const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

export const variations = {
  primary: css`
    color: var(--color-on-brand);
    background-color: var(--color-brand-600);
    font-weight: 600;

    &:hover:not(:disabled) {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-700);
    background: transparent;
    border: 1px solid var(--color-grey-300);

    &:hover:not(:disabled) {
      border-color: var(--color-brand-600);
      color: var(--color-brand-600);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-pill);
  box-shadow: var(--shadow-sm);

  &:disabled {
    opacity: 0.6;
  }
  transition: all 0.3s;

  ${(props) => sizes[props.size ?? 'medium']}
  ${(props) => variations[props.variation ?? 'primary']} /* &:hover {
    background-color: var(--color-brand-700);
  } */
`;

export default Button;
