import styled from 'styled-components';
import { device } from '../../styles/breakpoints';
import Tag from '../../ui/Tag';
import { Flag } from '../../ui/Flag';
import Button from '../../ui/Button';
import { Link } from 'react-router';
import CheckoutButton from './CheckoutButton';

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 10.4rem 2rem minmax(0, 1fr) 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }

  /* The action button must never wrap ("CHECK / OUT") */
  & > :last-child {
    white-space: nowrap;
    justify-self: end;
  }

  /* Phones: status + action on the first line, guest + nights on the second.
     Children are always: tag, flag, name, nights, action. */
  @media ${device.small} {
    grid-template-columns: 2rem minmax(0, 1fr) auto;
    grid-template-areas:
      'tag   tag   action'
      'flag  guest nights';
    row-gap: 0.8rem;
    column-gap: 1rem;
    padding: 1.2rem 0;

    & > :nth-child(1) {
      grid-area: tag;
    }
    & > :nth-child(2) {
      grid-area: flag;
    }
    & > :nth-child(3) {
      grid-area: guest;
    }
    & > :nth-child(4) {
      grid-area: nights;
      color: var(--color-grey-500);
    }
    & > :nth-child(5) {
      grid-area: action;
    }
  }
`;

const Guest = styled.div`
  font-weight: 500;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;

  return (
    <StyledTodayItem>
      {status === 'unconfirmed' && <Tag type='green'>Arriving</Tag>}
      {status === 'checked-in' && <Tag type='green'>Departing</Tag>}

      <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />

      <Guest>{guests.fullName}</Guest>
      <div>{numNights} nights</div>

      {status === 'unconfirmed' && (
        <Button
          size='small'
          variation='primary'
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}

      {status === 'checked-in' && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
