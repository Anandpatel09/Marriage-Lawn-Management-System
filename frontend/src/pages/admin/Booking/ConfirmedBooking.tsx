import BookingTable, { type Booking } from "./BookingTable";

interface Props {
    bookings: Booking[];
}

const ConfirmedBookings = ({ bookings }: Props) => {

    const confirmedBookings = bookings.filter(
        (booking) => booking.status === "Confirmed"
    );

    return <BookingTable bookings={confirmedBookings} />;
};

export default ConfirmedBookings;