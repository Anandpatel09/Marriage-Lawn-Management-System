interface BookingTableProps {
    bookings: Booking[];
}

export interface Booking {
    id: string;
    customerName: string;
    lawn: string;
    event: string;
    date: string;
    guests: number;
    amount: string;
    payment: "Paid" | "Partial" | "Unpaid";
    status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
}

const BookingTable = ({ bookings }: BookingTableProps) => {
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">

                <thead>
                    <tr className="border-b border-[#403831] text-[#b8aaa1] text-xs">
                        <th className="px-3 py-3">Booking</th>
                        <th className="px-3 py-3">Lawn</th>
                        <th className="px-3 py-3">Event</th>
                        <th className="px-3 py-3">Date</th>
                        <th className="px-3 py-3">Guests</th>
                        <th className="px-3 py-3">Amount</th>
                        <th className="px-3 py-3">Payment</th>
                        <th className="px-3 py-3">Status</th>
                        <th className="px-3 py-3">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {bookings.length === 0 ? (
                        <tr>
                            <td
                                colSpan={9}
                                className="py-12 text-center text-[#8f847d]"
                            >
                                No bookings found
                            </td>
                        </tr>
                    ) : (
                        bookings.map((booking) => (
                            <tr
                                key={booking.id}
                                className="border-b border-[#3b332e] hover:bg-[#2a211c] transition"
                            >
                                <td className="px-3 py-4">
                                    <p className="text-sm font-semibold text-white">
                                        {booking.id}
                                    </p>
                                    <p className="text-xs text-[#9d9189] mt-1">
                                        {booking.customerName}
                                    </p>
                                </td>

                                <td className="px-3 py-4 text-sm text-white">
                                    {booking.lawn}
                                </td>

                                <td className="px-3 py-4 text-sm text-white">
                                    {booking.event}
                                </td>

                                <td className="px-3 py-4 text-sm text-white whitespace-nowrap">
                                    {booking.date}
                                </td>

                                <td className="px-3 py-4 text-sm text-white">
                                    {booking.guests}
                                </td>

                                <td className="px-3 py-4 text-sm text-white whitespace-nowrap">
                                    {booking.amount}
                                </td>

                                <td className="px-3 py-4">
                                    <span
                                        className={`
                                            inline-flex
                                            px-3
                                            py-1
                                            rounded-md
                                            text-xs
                                            border
                                            ${
                                                booking.payment === "Paid"
                                                    ? "bg-green-500/10 text-green-400 border-green-500/30"
                                                    : booking.payment === "Partial"
                                                    ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                                                    : "bg-red-500/10 text-red-400 border-red-500/30"
                                            }
                                        `}
                                    >
                                        {booking.payment}
                                    </span>
                                </td>

                                <td className="px-3 py-4">
                                    <span
                                        className={`
                                            inline-flex
                                            px-3
                                            py-1
                                            rounded-md
                                            text-xs
                                            border
                                            ${
                                                booking.status === "Confirmed"
                                                    ? "bg-green-500/10 text-green-400 border-green-500/30"
                                                    : booking.status === "Pending"
                                                    ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                                                    : booking.status === "Completed"
                                                    ? "bg-gray-500/10 text-gray-300 border-gray-500/30"
                                                    : "bg-red-500/10 text-red-400 border-red-500/30"
                                            }
                                        `}
                                    >
                                        {booking.status}
                                    </span>
                                </td>

                                <td className="px-3 py-4">
                                    <button className="text-sm text-white hover:text-[#d8a849] transition">
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>

            </table>
        </div>
    );
};

export default BookingTable;