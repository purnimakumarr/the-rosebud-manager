import { Navigate, useSearchParams } from 'react-router';
import { PAGE_SIZE } from '../../utils/constants';
import BookingRow from './BookingRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';
import { useBookings } from './useBookings';
import Spinner from '../../ui/Spinner';
import Pagination from '../../ui/Pagination';

function BookingTable() {
  const { bookings, isLoading, error, count } = useBookings();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (error) return <Empty resourceName='bookings' />;

  // ?page= is past the last page: jump to the last page that has results
  if (!bookings?.length && count > 0) {
    const params = new URLSearchParams(searchParams);
    params.set('page', Math.ceil(count / PAGE_SIZE));
    return <Navigate replace to={`?${params}`} />;
  }

  if (!bookings?.length) return <Empty resourceName='bookings' />;

  return (
    <Menus>
      <Table columns='0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem'>
        <Table.Header>
          <div>Room</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
