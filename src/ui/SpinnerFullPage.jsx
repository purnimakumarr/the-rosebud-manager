import styled from 'styled-components';
import Spinner from './Spinner';

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function SpinnerFullPage() {
  return (
    <FullPage>
      <Spinner />
    </FullPage>
  );
}

export default SpinnerFullPage;
