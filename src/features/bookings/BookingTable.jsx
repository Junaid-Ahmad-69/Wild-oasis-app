import BookingRow from "./BookingRow.jsx";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import Empty from "../../ui/Empty.jsx";
import Spinner from "../../ui/Spinner.jsx";
import {useBooking} from "./useBooking.js";
import Pagination from "../../ui/Pagination.jsx";

function BookingTable() {
    const {isLoading, bookings = {}, count} = useBooking()
    if (isLoading) return <Spinner/>

    if (!bookings.length) return <Empty resourceName="bookings"/>

    return (
        <Menus>
            <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
                <Table.Header>
                    <div>Cabin</div>
                    <div>Guest</div>
                    <div>Dates</div>
                    <div>Status</div>
                    <div>Amount</div>
                    <div></div>
                </Table.Header>

                <Table.Body
                    data={bookings}
                    render={(booking) => (
                        <BookingRow key={booking.id} booking={booking}/>
                    )}
                />

                <Table.Footer>
                    <Pagination count={count}/>
                </Table.Footer>
            </Table>
        </Menus>
    );
}

export default BookingTable;
