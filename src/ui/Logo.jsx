import styled, { css } from 'styled-components';

const sizes = {
  medium: { badge: '5.2rem', title: '2.6rem', sub: '1.1rem' },
  large: { badge: '8.8rem', title: '4.4rem', sub: '1.4rem' },
};

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  ${(props) =>
    props.$size === 'large' &&
    css`
      flex-direction: column;
      text-align: center;
      gap: 1.6rem;
    `}
`;

const Badge = styled.img`
  height: ${(props) => sizes[props.$size].badge};
  width: auto;
  flex-shrink: 0;
  filter: none;
`;

const Wordmark = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1;
`;

const Title = styled.span`
  font-family: var(--font-display);
  font-size: ${(props) => sizes[props.$size].title};
  letter-spacing: 0.04em;
  color: var(--color-grey-900);
`;

const Sub = styled.span`
  font-size: ${(props) => sizes[props.$size].sub};
  font-weight: 600;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--color-brand-600);
  margin-top: 0.4rem;
`;

function Logo({ size = 'medium' }) {
  return (
    <StyledLogo $size={size}>
      <Badge src='/logo.svg' alt='' $size={size} />
      <Wordmark>
        <Title $size={size}>The Rosebud</Title>
        <Sub $size={size}>Manager</Sub>
      </Wordmark>
    </StyledLogo>
  );
}

export default Logo;
