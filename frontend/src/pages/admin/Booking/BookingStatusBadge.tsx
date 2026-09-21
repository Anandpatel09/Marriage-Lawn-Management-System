interface BookingStatusBadgeProps {
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
}

const BookingStatusBadge = ({ status }: BookingStatusBadgeProps) => {
  const styles = {
    Confirmed: "bg-green-500/10 text-green-400 border-green-500/30",

    Pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",

    Completed: "bg-gray-500/10 text-gray-300 border-gray-500/30",

    Cancelled: "bg-red-500/10 text-red-400 border-red-500/30",
  };

  return (
    <span
      className={`inline-flex px-3 py-1 rounded-md border text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
};

export default BookingStatusBadge;
