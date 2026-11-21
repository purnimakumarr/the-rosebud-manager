import styled, { css } from 'styled-components';
import { device } from '../styles/breakpoints';

const display = css`
  font-family: var(--font-display);
  font-weight: 400;
  letter-spacing: 0.03em;
  line-height: 1.1;
  color: var(--color-grey-900);
  /* Display caps read badly when hyphenated ("EX-IST") */
  hyphens: manual;
`;

const Heading = styled.h1`
  ${(props) =>
    props.as === 'h1' &&
    css`
      ${display}
      font-size: 4rem;

      @media ${device.mobile} {
        font-size: 3.2rem;
      }
    `};

  ${(props) =>
    props.as === 'h2' &&
    css`
      ${display}
      font-size: 2.8rem;

      @media ${device.mobile} {
        font-size: 2.4rem;
      }
    `};

  ${(props) =>
    props.as === 'h3' &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `};

  ${(props) =>
    props.as === 'h4' &&
    css`
      ${display}
      font-size: 4rem;
      text-align: center;

      @media ${device.mobile} {
        font-size: 3.2rem;
      }
    `};
`;

export default Heading;
