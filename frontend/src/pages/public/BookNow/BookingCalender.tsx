import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { useMemo } from "react";

interface AvailabilityMap {
  [date: string]: {
    available: boolean;
    status?: string;
  };
}

interface BookingCalendarDetailsProps {
  currentMonth: Date;
  selectedDate: Date | null;
  availability: AvailabilityMap;
  loadingAvailability: boolean;

  onMonthChange: (date: Date) => void;
  onDateSelect: (date: Date) => void;
}

const BookingCalendar = ({
  currentMonth,
  selectedDate,
  availability,
  loadingAvailability,
  onMonthChange,
  onDateSelect,
}: BookingCalendarDetailsProps) => {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const monthName = currentMonth.toLocaleString("en-IN", {
    month: "long",
  });

  const daysInMonth = new Date(
    year,
    month + 1,
    0,
  ).getDate();

  const firstDayOfMonth = new Date(
    year,
    month,
    1,
  ).getDay();

  // -----------------------------
  // CALENDAR DAYS
  // -----------------------------

  const calendarDays = useMemo(() => {
    return [
      ...Array(firstDayOfMonth).fill(null),
      ...Array.from(
        { length: daysInMonth },
        (_, index) => index + 1,
      ),
    ];
  }, [firstDayOfMonth, daysInMonth]);

  // -----------------------------
  // DATE KEY
  // -----------------------------

  const getDateKey = (date: Date) => {
    const dateYear = date.getFullYear();

    const dateMonth = String(
      date.getMonth() + 1,
    ).padStart(2, "0");

    const dateDay = String(
      date.getDate(),
    ).padStart(2, "0");

    return `${dateYear}-${dateMonth}-${dateDay}`;
  };

  // -----------------------------
  // PAST DATE
  // -----------------------------

  const isPastDate = (day: number) => {
    const date = new Date(
      year,
      month,
      day,
    );

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return date < today;
  };

  // -----------------------------
  // DATE AVAILABLE
  // -----------------------------

  const isDateAvailable = (date: Date) => {
    const dateKey = getDateKey(date);

    if (!availability[dateKey]) {
      return true;
    }

    return availability[dateKey].available;
  };

  // -----------------------------
  // PREVIOUS MONTH
  // -----------------------------

  const goToPreviousMonth = () => {
    const previousMonth = new Date(
      year,
      month - 1,
      1,
    );

    const today = new Date();

    const currentMonthStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      1,
    );

    if (previousMonth < currentMonthStart) {
      return;
    }

    onMonthChange(previousMonth);
  };

  // -----------------------------
  // NEXT MONTH
  // -----------------------------

  const goToNextMonth = () => {
    onMonthChange(
      new Date(year, month + 1, 1),
    );
  };

  // -----------------------------
  // SELECT DATE
  // -----------------------------

  const handleDateSelect = (day: number) => {
    const date = new Date(
      year,
      month,
      day,
    );

    if (isPastDate(day)) {
      return;
    }

    if (!isDateAvailable(date)) {
      return;
    }

    onDateSelect(date);
  };

  return (
    <div className="space-y-6">

      {/* =========================
          CALENDAR
      ========================= */}

      <div className="bg-[#2b211c] border border-[#3a2f29] rounded-xl p-5">

        <div className="flex items-center gap-2 mb-5">
          <CalendarDays
            size={20}
            className="text-[#d8a849]"
          />

          <h2 className="text-lg font-medium">
            Select Date
          </h2>
        </div>

        {/* MONTH HEADER */}

        <div className="flex items-center justify-between mb-4">

          <button
            type="button"
            onClick={goToPreviousMonth}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#3a2e27] transition"
          >
            <ChevronLeft size={18} />
          </button>

          <h3 className="text-base font-medium">
            {monthName} {year}
          </h3>

          <button
            type="button"
            onClick={goToNextMonth}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#3a2e27] transition"
          >
            <ChevronRight size={18} />
          </button>

        </div>

        {/* WEEK DAYS */}

        <div className="grid grid-cols-7 mb-2">

          {[
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
          ].map((day) => (
            <div
              key={day}
              className="text-center text-[11px] text-[#80736b] py-2"
            >
              {day}
            </div>
          ))}

        </div>

        {/* CALENDAR DAYS */}

        <div className="grid grid-cols-7 gap-y-2">

          {calendarDays.map((day, index) => {

            if (day === null) {
              return (
                <div
                  key={index}
                  className="h-10"
                />
              );
            }

            const date = new Date(
              year,
              month,
              day,
            );

            const dateKey =
              getDateKey(date);

            const past =
              isPastDate(day);

            const available =
              isDateAvailable(date);

            const isSelected =
              selectedDate?.toDateString() ===
              date.toDateString();

            return (
              <div
                key={index}
                className="flex justify-center"
              >

                <button
                  type="button"
                  disabled={
                    past || !available
                  }
                  onClick={() =>
                    handleDateSelect(day)
                  }
                  className={`
                    relative
                    w-10
                    h-10
                    rounded-full
                    text-sm
                    transition
                    flex
                    items-center
                    justify-center

                    ${
                      isSelected
                        ? "bg-[#a94b3f] text-white"
                        : past
                          ? "text-[#514943] cursor-not-allowed"
                          : !available
                            ? "text-red-500/40 cursor-not-allowed"
                            : "text-[#b8aaa1] hover:bg-[#3b3029] hover:text-white"
                    }
                  `}
                >

                  {day}

                  {/* BOOKED */}

                  {!past &&
                    !available && (
                      <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-red-500" />
                    )}

                  {/* AVAILABLE */}

                  {!past &&
                    available &&
                    !isSelected && (
                      <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-[#62a86c]" />
                    )}

                  {availability[
                    dateKey
                  ] &&
                    !availability[
                      dateKey
                    ].available && (
                      <span />
                    )}

                </button>

              </div>
            );
          })}

        </div>

        {/* LOADING */}

        {loadingAvailability && (
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-[#9e9188]">

            <Loader2
              size={13}
              className="animate-spin"
            />

            Checking availability...

          </div>
        )}

        {/* LEGEND */}

        <div className="flex flex-wrap gap-5 mt-6 text-xs text-[#8e8179]">

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#62a86c]" />
            Available
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            Booked
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#a94b3f]" />
            Selected
          </div>

        </div>

      </div>

      {/* =========================
          BOOKING DETAILS
      ========================= */}

      <div className="bg-[#2b211c] border border-[#3a2f29] rounded-xl p-5">

        <h2 className="text-lg font-medium mb-5">
          Booking Details
        </h2>

        {selectedDate ? (
          <div className="bg-[#201813] rounded-lg p-4">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs text-[#81756d]">
                  Selected Date
                </p>

                <p className="text-sm mt-1 text-white">
                  {selectedDate.toLocaleDateString(
                    "en-IN",
                    {
                      weekday: "long",
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    },
                  )}
                </p>
              </div>

              <div className="text-right">

                <p className="text-xs text-[#81756d]">
                  Status
                </p>

                <p className="text-sm mt-1 text-[#76ab7b]">
                  Available
                </p>

              </div>

            </div>

          </div>
        ) : (
          <div className="bg-[#201813] rounded-lg p-4">

            <p className="text-xs text-[#8b7e76]">
              Select a date from the calendar
              to continue your booking.
            </p>

          </div>
        )}

      </div>

    </div>
  );
};

export default BookingCalendar;