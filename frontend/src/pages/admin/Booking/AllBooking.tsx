import BookingTable, { type Booking } from "./BookingTable";

interface Props {
    bookings: Booking[];
}

const AllBookings = ({ bookings }: Props) => {
    return <BookingTable bookings={bookings} />;
};

export default AllBookings;