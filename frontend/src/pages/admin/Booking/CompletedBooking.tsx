import BookingTable, { type Booking } from "./BookingTable";

interface Props {
    bookings: Booking[];
}

const CompletedBookings = ({ bookings }: Props) => {

    const completedBookings = bookings.filter(
        (booking) => booking.status === "Completed"
    );

    return <BookingTable bookings={completedBookings} />;
};

export default CompletedBookings;