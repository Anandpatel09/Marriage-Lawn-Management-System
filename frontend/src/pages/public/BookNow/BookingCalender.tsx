// import {
//   CalendarDays,
//   ChevronLeft,
//   ChevronRight,
//   Loader2,
// } from "lucide-react";
// import { useMemo } from "react";

// interface AvailabilityMap {
//   [date: string]: {
//     available: boolean;
//     status?: string;
//   };
// }

// interface BookingCalendarDetailsProps {
//   currentMonth: Date;
//   selectedDate: Date | null;
//   availability: AvailabilityMap;
//   loadingAvailability: boolean;

//   onMonthChange: (date: Date) => void;
//   onDateSelect: (date: Date) => void;
// }

// const BookingCalendar = ({
//   currentMonth,
//   selectedDate,
//   availability,
//   loadingAvailability,
//   onMonthChange,
//   onDateSelect,
// }: BookingCalendarDetailsProps) => {
//   const year = currentMonth.getFullYear();
//   const month = currentMonth.getMonth();

//   const monthName = currentMonth.toLocaleString("en-IN", {
//     month: "long",
//   });

//   const daysInMonth = new Date(
//     year,
//     month + 1,
//     0,
//   ).getDate();

//   const firstDayOfMonth = new Date(
//     year,
//     month,
//     1,
//   ).getDay();

//   // -----------------------------
//   // CALENDAR DAYS
//   // -----------------------------

//   const calendarDays = useMemo(() => {
//     return [
//       ...Array(firstDayOfMonth).fill(null),
//       ...Array.from(
//         { length: daysInMonth },
//         (_, index) => index + 1,
//       ),
//     ];
//   }, [firstDayOfMonth, daysInMonth]);

//   // -----------------------------
//   // DATE KEY
//   // -----------------------------

//   const getDateKey = (date: Date) => {
//     const dateYear = date.getFullYear();

//     const dateMonth = String(
//       date.getMonth() + 1,
//     ).padStart(2, "0");

//     const dateDay = String(
//       date.getDate(),
//     ).padStart(2, "0");

//     return `${dateYear}-${dateMonth}-${dateDay}`;
//   };

//   // -----------------------------
//   // PAST DATE
//   // -----------------------------

//   const isPastDate = (day: number) => {
//     const date = new Date(
//       year,
//       month,
//       day,
//     );

//     const today = new Date();

//     today.setHours(0, 0, 0, 0);

//     return date < today;
//   };

//   // -----------------------------
//   // DATE AVAILABLE
//   // -----------------------------

//   const isDateAvailable = (date: Date) => {
//     const dateKey = getDateKey(date);

//     if (!availability[dateKey]) {
//       return true;
//     }

//     return availability[dateKey].available;
//   };

//   // -----------------------------
//   // PREVIOUS MONTH
//   // -----------------------------

//   const goToPreviousMonth = () => {
//     const previousMonth = new Date(
//       year,
//       month - 1,
//       1,
//     );

//     const today = new Date();

//     const currentMonthStart = new Date(
//       today.getFullYear(),
//       today.getMonth(),
//       1,
//     );

//     if (previousMonth < currentMonthStart) {
//       return;
//     }

//     onMonthChange(previousMonth);
//   };

//   // -----------------------------
//   // NEXT MONTH
//   // -----------------------------

//   const goToNextMonth = () => {
//     onMonthChange(
//       new Date(year, month + 1, 1),
//     );
//   };

//   // -----------------------------
//   // SELECT DATE
//   // -----------------------------

//   const handleDateSelect = (day: number) => {
//     const date = new Date(
//       year,
//       month,
//       day,
//     );

//     if (isPastDate(day)) {
//       return;
//     }

//     if (!isDateAvailable(date)) {
//       return;
//     }

//     onDateSelect(date);
//   };

//   return (
//     <div className="space-y-6">

//       {/* =========================
//           CALENDAR
//       ========================= */}

//       <div className="bg-[#2b211c] border border-[#3a2f29] rounded-xl p-5">

//         <div className="flex items-center gap-2 mb-5">
//           <CalendarDays
//             size={20}
//             className="text-[#d8a849]"
//           />

//           <h2 className="text-lg font-medium">
//             Select Date
//           </h2>
//         </div>

//         {/* MONTH HEADER */}

//         <div className="flex items-center justify-between mb-4">

//           <button
//             type="button"
//             onClick={goToPreviousMonth}
//             className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#3a2e27] transition"
//           >
//             <ChevronLeft size={18} />
//           </button>

//           <h3 className="text-base font-medium">
//             {monthName} {year}
//           </h3>

//           <button
//             type="button"
//             onClick={goToNextMonth}
//             className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#3a2e27] transition"
//           >
//             <ChevronRight size={18} />
//           </button>

//         </div>

//         {/* WEEK DAYS */}

//         <div className="grid grid-cols-7 mb-2">

//           {[
//             "Sun",
//             "Mon",
//             "Tue",
//             "Wed",
//             "Thu",
//             "Fri",
//             "Sat",
//           ].map((day) => (
//             <div
//               key={day}
//               className="text-center text-[11px] text-[#80736b] py-2"
//             >
//               {day}
//             </div>
//           ))}

//         </div>

//         {/* CALENDAR DAYS */}

//         <div className="grid grid-cols-7 gap-y-2">

//           {calendarDays.map((day, index) => {

//             if (day === null) {
//               return (
//                 <div
//                   key={index}
//                   className="h-10"
//                 />
//               );
//             }

//             const date = new Date(
//               year,
//               month,
//               day,
//             );

//             const dateKey =
//               getDateKey(date);

//             const past =
//               isPastDate(day);

//             const available =
//               isDateAvailable(date);

//             const isSelected =
//               selectedDate?.toDateString() ===
//               date.toDateString();

//             return (
//               <div
//                 key={index}
//                 className="flex justify-center"
//               >

//                 <button
//                   type="button"
//                   disabled={
//                     past || !available
//                   }
//                   onClick={() =>
//                     handleDateSelect(day)
//                   }
//                   className={`
//                     relative
//                     w-10
//                     h-10
//                     rounded-full
//                     text-sm
//                     transition
//                     flex
//                     items-center
//                     justify-center

//                     ${
//                       isSelected
//                         ? "bg-[#a94b3f] text-white"
//                         : past
//                           ? "text-[#514943] cursor-not-allowed"
//                           : !available
//                             ? "text-red-500/40 cursor-not-allowed"
//                             : "text-[#b8aaa1] hover:bg-[#3b3029] hover:text-white"
//                     }
//                   `}
//                 >

//                   {day}

//                   {/* BOOKED */}

//                   {!past &&
//                     !available && (
//                       <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-red-500" />
//                     )}

//                   {/* AVAILABLE */}

//                   {!past &&
//                     available &&
//                     !isSelected && (
//                       <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-[#62a86c]" />
//                     )}

//                   {availability[
//                     dateKey
//                   ] &&
//                     !availability[
//                       dateKey
//                     ].available && (
//                       <span />
//                     )}

//                 </button>

//               </div>
//             );
//           })}

//         </div>

//         {/* LOADING */}

//         {loadingAvailability && (
//           <div className="flex items-center justify-center gap-2 mt-4 text-xs text-[#9e9188]">

//             <Loader2
//               size={13}
//               className="animate-spin"
//             />

//             Checking availability...

//           </div>
//         )}

//         {/* LEGEND */}

//         <div className="flex flex-wrap gap-5 mt-6 text-xs text-[#8e8179]">

//           <div className="flex items-center gap-2">
//             <span className="w-2 h-2 rounded-full bg-[#62a86c]" />
//             Available
//           </div>

//           <div className="flex items-center gap-2">
//             <span className="w-2 h-2 rounded-full bg-red-500" />
//             Booked
//           </div>

//           <div className="flex items-center gap-2">
//             <span className="w-2 h-2 rounded-full bg-[#a94b3f]" />
//             Selected
//           </div>

//         </div>

//       </div>

//       {/* =========================
//           BOOKING DETAILS
//       ========================= */}

//       <div className="bg-[#2b211c] border border-[#3a2f29] rounded-xl p-5">

//         <h2 className="text-lg font-medium mb-5">
//           Booking Details
//         </h2>

//         {selectedDate ? (
//           <div className="bg-[#201813] rounded-lg p-4">

//             <div className="flex items-center justify-between">

//               <div>
//                 <p className="text-xs text-[#81756d]">
//                   Selected Date
//                 </p>

//                 <p className="text-sm mt-1 text-white">
//                   {selectedDate.toLocaleDateString(
//                     "en-IN",
//                     {
//                       weekday: "long",
//                       day: "2-digit",
//                       month: "long",
//                       year: "numeric",
//                     },
//                   )}
//                 </p>
//               </div>

//               <div className="text-right">

//                 <p className="text-xs text-[#81756d]">
//                   Status
//                 </p>

//                 <p className="text-sm mt-1 text-[#76ab7b]">
//                   Available
//                 </p>

//               </div>

//             </div>

//           </div>
//         ) : (
//           <div className="bg-[#201813] rounded-lg p-4">

//             <p className="text-xs text-[#8b7e76]">
//               Select a date from the calendar
//               to continue your booking.
//             </p>

//           </div>
//         )}

//       </div>

//     </div>
//   );
// };

// export default BookingCalendar;



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
  // =====================================================
  // CURRENT MONTH / YEAR
  // =====================================================

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const today = new Date();

  const currentYear = today.getFullYear();
  const currentMonthIndex = today.getMonth();

  // =====================================================
  // MONTH NAMES
  // =====================================================

  const monthOptions = useMemo(() => {
    return Array.from({ length: 12 }, (_, index) => {
      return {
        value: index,
        label: new Date(
          2000,
          index,
          1
        ).toLocaleString("en-IN", {
          month: "long",
        }),
      };
    });
  }, []);

  // =====================================================
  // YEAR OPTIONS
  // =====================================================

  const yearOptions = useMemo(() => {
    return Array.from(
      { length: 11 },
      (_, index) => currentYear + index
    );
  }, [currentYear]);

  // =====================================================
  // MONTH NAME
  // =====================================================

  const monthName = currentMonth.toLocaleString(
    "en-IN",
    {
      month: "long",
    }
  );

  // =====================================================
  // DAYS IN MONTH
  // =====================================================

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  // =====================================================
  // FIRST DAY OF MONTH
  // =====================================================

  const firstDayOfMonth = new Date(
    year,
    month,
    1
  ).getDay();

  // =====================================================
  // CALENDAR DAYS
  // =====================================================

  const calendarDays = useMemo(() => {
    return [
      ...Array(firstDayOfMonth).fill(null),

      ...Array.from(
        {
          length: daysInMonth,
        },
        (_, index) => index + 1
      ),
    ];
  }, [firstDayOfMonth, daysInMonth]);

  // =====================================================
  // DATE KEY
  // =====================================================

  const getDateKey = (date: Date) => {
    const dateYear =
      date.getFullYear();

    const dateMonth = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const dateDay = String(
      date.getDate()
    ).padStart(2, "0");

    return `${dateYear}-${dateMonth}-${dateDay}`;
  };

  // =====================================================
  // CHECK PAST DATE
  // =====================================================

  const isPastDate = (day: number) => {
    const date = new Date(
      year,
      month,
      day
    );

    const currentDate = new Date();

    currentDate.setHours(
      0,
      0,
      0,
      0
    );

    return date < currentDate;
  };

  // =====================================================
  // CHECK DATE AVAILABLE
  // =====================================================

  const isDateAvailable = (
    date: Date
  ) => {
    const dateKey =
      getDateKey(date);

    if (!availability[dateKey]) {
      return true;
    }

    return availability[
      dateKey
    ].available;
  };

  // =====================================================
  // CHECK MONTH IS CURRENT/PREVIOUS
  // =====================================================

  const isCurrentMonth =
    year === currentYear &&
    month === currentMonthIndex;

  // =====================================================
  // PREVIOUS MONTH
  // =====================================================

  const goToPreviousMonth = () => {
    const previousMonth =
      new Date(
        year,
        month - 1,
        1
      );

    const currentMonthStart =
      new Date(
        currentYear,
        currentMonthIndex,
        1
      );

    if (
      previousMonth <
      currentMonthStart
    ) {
      return;
    }

    onMonthChange(
      previousMonth
    );
  };

  // =====================================================
  // NEXT MONTH
  // =====================================================

  const goToNextMonth = () => {
    onMonthChange(
      new Date(
        year,
        month + 1,
        1
      )
    );
  };

  // =====================================================
  // SELECT MONTH
  // =====================================================

  const handleMonthChange = (
    selectedMonth: number
  ) => {
    let newMonth =
      selectedMonth;

    // Prevent selecting a month in the past
    if (
      year === currentYear &&
      newMonth < currentMonthIndex
    ) {
      newMonth =
        currentMonthIndex;
    }

    onMonthChange(
      new Date(
        year,
        newMonth,
        1
      )
    );
  };

  // =====================================================
  // SELECT YEAR
  // =====================================================

  const handleYearChange = (
    selectedYear: number
  ) => {
    let newMonth = month;

    // If selecting current year,
    // don't allow previous months
    if (
      selectedYear === currentYear &&
      newMonth < currentMonthIndex
    ) {
      newMonth =
        currentMonthIndex;
    }

    onMonthChange(
      new Date(
        selectedYear,
        newMonth,
        1
      )
    );
  };

  // =====================================================
  // SELECT DATE
  // =====================================================

  const handleDateSelect = (
    day: number
  ) => {
    const date = new Date(
      year,
      month,
      day
    );

    if (isPastDate(day)) {
      return;
    }

    if (!isDateAvailable(date)) {
      return;
    }

    onDateSelect(date);
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="space-y-6">

      {/* ================================================
          CALENDAR
      ================================================ */}

      <div className="bg-[#2b211c] border border-[#3a2f29] rounded-xl p-5">

        {/* TITLE */}

        <div className="flex items-center gap-2 mb-5">

          <CalendarDays
            size={20}
            className="text-[#d8a849]"
          />

          <h2 className="text-lg font-medium">
            Select Date
          </h2>

        </div>

        {/* ==============================================
            MONTH + YEAR SELECTORS
        ============================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">

          {/* MONTH SELECT */}

          <div>
            <label
              htmlFor="calendar-month"
              className="block text-[10px] text-[#82766e] mb-1.5"
            >
              Month
            </label>

            <select
              id="calendar-month"
              value={month}
              onChange={(e) =>
                handleMonthChange(
                  Number(e.target.value)
                )
              }
              className="w-full bg-[#201813] border border-[#4b4039] rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-[#d8a849] cursor-pointer"
            >
              {monthOptions.map(
                (item) => {
                  const disabled =
                    year ===
                    currentYear &&
                    item.value <
                    currentMonthIndex;

                  return (
                    <option
                      key={item.value}
                      value={item.value}
                      disabled={disabled}
                    >
                      {item.label}
                    </option>
                  );
                }
              )}
            </select>
          </div>

          {/* YEAR SELECT */}

          <div>
            <label
              htmlFor="calendar-year"
              className="block text-[10px] text-[#82766e] mb-1.5"
            >
              Year
            </label>

            <select
              id="calendar-year"
              value={year}
              onChange={(e) =>
                handleYearChange(
                  Number(e.target.value)
                )
              }
              className="w-full bg-[#201813] border border-[#4b4039] rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-[#d8a849] cursor-pointer"
            >
              {yearOptions.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </select>
          </div>

        </div>

        {/* ==============================================
            CALENDAR NAVIGATION
        ============================================== */}

        <div className="flex items-center justify-between mb-4">

          <button
            type="button"
            onClick={goToPreviousMonth}
            disabled={isCurrentMonth}
            aria-label="Previous month"
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#3a2e27] transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} />
          </button>

          <h3 className="text-sm font-semibold text-white">
            {monthName} {year}
          </h3>

          <button
            type="button"
            onClick={goToNextMonth}
            aria-label="Next month"
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#3a2e27] transition"
          >
            <ChevronRight size={18} />
          </button>

        </div>

        {/* ==============================================
            WEEK DAYS
        ============================================== */}

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
              className="text-center text-[10px] sm:text-[11px] text-[#80736b] py-2"
            >
              {day}
            </div>
          ))}

        </div>

        {/* ==============================================
            CALENDAR DAYS
        ============================================== */}

        <div className="grid grid-cols-7 gap-y-2">

          {calendarDays.map(
            (day, index) => {

              if (day === null) {
                return (
                  <div
                    key={`empty-${index}`}
                    className="h-10"
                  />
                );
              }

              const date =
                new Date(
                  year,
                  month,
                  day
                );

              const dateKey =
                getDateKey(date);

              const past =
                isPastDate(day);

              const available =
                isDateAvailable(
                  date
                );

              const isSelected =
                selectedDate?.toDateString() ===
                date.toDateString();

              const bookingInfo =
                availability[
                dateKey
                ];

              return (
                <div
                  key={dateKey}
                  className="flex justify-center"
                >
                  <button
                    type="button"
                    disabled={
                      past ||
                      !available
                    }
                    onClick={() =>
                      handleDateSelect(
                        day
                      )
                    }
                    aria-label={`${monthName} ${day}, ${year}`}
                    className={`
                      relative
                      w-10
                      h-10
                      rounded-full
                      text-xs
                      sm:text-sm
                      transition
                      flex
                      items-center
                      justify-center
                      ${isSelected
                        ? "bg-[#a94b3f] text-white shadow-md"
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

                    {bookingInfo &&
                      !bookingInfo.available && (
                        <span
                          className="absolute inset-0 rounded-full"
                          title={
                            bookingInfo.status
                              ? `Status: ${bookingInfo.status}`
                              : "Booked"
                          }
                        />
                      )}

                  </button>
                </div>
              );
            }
          )}

        </div>

        {/* ==============================================
            LOADING
        ============================================== */}

        {loadingAvailability && (
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-[#9e9188]">

            <Loader2
              size={13}
              className="animate-spin"
            />

            Checking availability...

          </div>
        )}

        {/* ==============================================
            LEGEND
        ============================================== */}

        <div className="flex flex-wrap gap-5 mt-6 text-[10px] sm:text-xs text-[#8e8179]">

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

      {/* ================================================
          BOOKING DETAILS
      ================================================ */}

      <div className="bg-[#2b211c] border border-[#3a2f29] rounded-xl p-5">

        <h2 className="text-lg font-medium mb-5">
          Booking Details
        </h2>

        {selectedDate ? (
          <div className="bg-[#201813] rounded-lg p-4">

            <div className="flex items-center justify-between gap-4">

              <div>
                <p className="text-xs text-[#81756d]">
                  Selected Date
                </p>

                <p className="text-sm mt-1 text-white">
                  {selectedDate.toLocaleDateString(
                    "en-IN",
                    {
                      weekday:
                        "long",
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }
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
              Select a date from the
              calendar to continue your
              booking.
            </p>

          </div>
        )}

      </div>

    </div>
  );
};

export default BookingCalendar;