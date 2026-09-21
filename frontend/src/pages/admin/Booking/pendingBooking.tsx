import BookingTable, { type Booking } from "./BookingTable";

interface Props {
    bookings: Booking[];
}

const PendingBookings = ({ bookings }: Props) => {

    const pendingBookings = bookings.filter(
        (booking) => booking.status === "Pending"
    );

    return <BookingTable bookings={pendingBookings} />;
};

export default PendingBookings;