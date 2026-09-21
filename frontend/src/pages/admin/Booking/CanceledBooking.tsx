import BookingTable, { type Booking } from "./BookingTable";

interface Props {
    bookings: Booking[];
}

const CancelledBookings = ({ bookings }: Props) => {

    const cancelledBookings = bookings.filter(
        (booking) => booking.status === "Cancelled"
    );

    return <BookingTable bookings={cancelledBookings} />;
};

export default CancelledBookings;