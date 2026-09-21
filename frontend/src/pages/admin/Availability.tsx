import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
} from "lucide-react";
import { useMemo, useState } from "react";

type AvailabilityStatus = "available" | "tentative" | "booked";

interface AvailabilityRecord {
  status: AvailabilityStatus;
  slot?: "Morning" | "Evening" | "Full Day";
  lawnName?: string;
}

interface AvailabilityMap {
  [date: string]: AvailabilityRecord;
}

interface EventItem {
  id: number;
  title: string;
  lawnName: string;
  date: string;
  slot: string;
}

interface AvailabilityCalendarProps {
  availability?: AvailabilityMap;
  events?: EventItem[];
  lawns?: string[];
}

const AvailabilityCalendar = ({
  availability = {},
  events = [],
  lawns = ["All lawns"],
}: AvailabilityCalendarProps) => {
  // ================================
  // CURRENT DATE
  // ================================

  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(today.getFullYear(), today.getMonth(), today.getDate()),
  );

  const [selectedLawn, setSelectedLawn] = useState("All lawns");

  // ================================
  // YEAR / MONTH
  // ================================

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const monthName = currentMonth.toLocaleString("en-US", {
    month: "long",
  });

  // ================================
  // MONTH OPTIONS
  // ================================

  const monthOptions = useMemo(() => {
    return Array.from({ length: 12 }, (_, index) => {
      const date = new Date(year, index, 1);

      return {
        value: index,
        label: date.toLocaleString("en-US", {
          month: "long",
        }),
      };
    });
  }, [year]);

  // ================================
  // YEAR OPTIONS
  // ================================

  const yearOptions = useMemo(() => {
    const currentYear = today.getFullYear();

    return Array.from({ length: 7 }, (_, index) => currentYear - 3 + index);
  }, []);

  // ================================
  // DAYS IN MONTH
  // ================================

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // ================================
  // FIRST DAY
  // Monday = 0
  // ================================

  const firstDay = new Date(year, month, 1).getDay();

  const startingDay = (firstDay + 6) % 7;

  // ================================
  // CALENDAR CELLS
  // ================================

  const calendarDays = useMemo(() => {
    const cells: (number | null)[] = [];

    for (let index = 0; index < startingDay; index++) {
      cells.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(day);
    }

    return cells;
  }, [startingDay, daysInMonth]);

  // ================================
  // DATE KEY
  // ================================

  const getDateKey = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");

    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
  };

  // ================================
  // SELECT DATE
  // ================================

  const handleDateClick = (day: number) => {
    const date = new Date(year, month, day);

    setSelectedDate(date);
  };

  // ================================
  // PREVIOUS MONTH
  // ================================

  const previousMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));

    setSelectedDate(null);
  };

  // ================================
  // NEXT MONTH
  // ================================

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));

    setSelectedDate(null);
  };

  // ================================
  // MONTH CHANGE
  // ================================

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = Number(event.target.value);

    setCurrentMonth(new Date(year, newMonth, 1));

    setSelectedDate(null);
  };

  // ================================
  // YEAR CHANGE
  // ================================

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = Number(event.target.value);

    setCurrentMonth(new Date(newYear, month, 1));

    setSelectedDate(null);
  };

  // ================================
  // TODAY
  // ================================

  const isToday = (day: number) => {
    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    );
  };

  // ================================
  // SELECTED
  // ================================

  const isSelected = (day: number) => {
    if (!selectedDate) return false;

    return (
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === day
    );
  };

  // ================================
  // STATUS
  // ================================

  const getStatusStyle = (status?: AvailabilityStatus) => {
    switch (status) {
      case "booked":
        return "bg-[#a54842] border-[#a54842]";

      case "tentative":
        return "bg-[#6b5025] border-[#a17b36]";

      case "available":
      default:
        return "bg-[#292b21] border-[#484a40]";
    }
  };

  const getStatusLabel = (record?: AvailabilityRecord) => {
    if (!record) return "";

    if (record.status === "booked") {
      return record.slot || "Booked";
    }

    if (record.status === "tentative") {
      return record.slot || "Tentative";
    }

    return "Available";
  };

  // ================================
  // SELECTED DATE DATA
  // ================================

  const selectedDateKey = selectedDate ? getDateKey(selectedDate) : "";

  const selectedAvailability = availability[selectedDateKey];

  // ================================
  // FILTER EVENTS
  // ================================

  const filteredEvents = events
    .filter((event) =>
      selectedLawn === "All lawns" ? true : event.lawnName === selectedLawn,
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // ================================
  // UPCOMING EVENTS
  // ================================

  const upcomingEvents = filteredEvents
    .filter(
      (event) =>
        new Date(event.date).getTime() >=
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
        ).getTime(),
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#17120f] text-white">
      {/* =================================================
                PAGE HEADER
            ================================================== */}

      <div className="border-b border-[#332a25]">
        <div className="px-4 sm:px-6 lg:px-7 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Title */}

            <div>
              <h1 className="text-2xl sm:text-3xl font-serif">Availability</h1>

              <p className="text-sm text-[#a89b92] mt-1">
                Slot-wise venue calendar
              </p>
            </div>

            {/* Action */}

            <button
              className="
                                w-full
                                sm:w-auto
                                flex
                                items-center
                                justify-center
                                gap-2
                                px-5
                                py-2.5
                                rounded-lg
                                bg-[#d8a849]
                                hover:bg-[#c99a3d]
                                text-black
                                text-sm
                                font-medium
                                transition
                            "
            >
              <CalendarDays size={17} />
              Block a date
            </button>
          </div>
        </div>
      </div>

      {/* =================================================
                FILTER BAR
            ================================================== */}

      <div className="px-4 sm:px-6 lg:px-7 py-4 border-b border-[#29231f]">
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
          {/* Month */}

          <div className="flex items-center gap-2">
            <select
              value={month}
              onChange={handleMonthChange}
              className="
                                w-full
                                sm:w-48
                                appearance-none
                                px-4
                                py-2.5
                                rounded-lg
                                bg-[#1d1713]
                                border
                                border-[#493d35]
                                text-white
                                text-sm
                                outline-none
                                focus:border-[#d8a849]
                            "
            >
              {monthOptions.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                  className="bg-[#1d1713]"
                >
                  {item.label} {year}
                </option>
              ))}
            </select>

            <select
              value={year}
              onChange={handleYearChange}
              className="
                                w-32
                                appearance-none
                                px-4
                                py-2.5
                                rounded-lg
                                bg-[#1d1713]
                                border
                                border-[#493d35]
                                text-white
                                text-sm
                                outline-none
                                focus:border-[#d8a849]
                            "
            >
              {yearOptions.map((item) => (
                <option key={item} value={item} className="bg-[#1d1713]">
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Lawn */}

          <select
            value={selectedLawn}
            onChange={(event) => setSelectedLawn(event.target.value)}
            className="
                            w-full
                            sm:w-56
                            px-4
                            py-2.5
                            rounded-lg
                            bg-[#1d1713]
                            border
                            border-[#493d35]
                            text-white
                            text-sm
                            outline-none
                            focus:border-[#d8a849]
                        "
          >
            {lawns.map((lawn) => (
              <option key={lawn} value={lawn} className="bg-[#1d1713]">
                {lawn}
              </option>
            ))}
          </select>

          {/* Legend */}

          <div className="lg:ml-auto flex flex-wrap items-center gap-4 text-xs text-[#aaa19b]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-[#35553c]" />
              Available
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-[#94702d]" />
              Tentative
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-[#a54842]" />
              Booked
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
                MAIN CONTENT
            ================================================== */}

      <main className="px-4 sm:px-6 lg:px-7 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,2fr)_minmax(330px,0.9fr)] gap-5">
          {/* =================================================
                        CALENDAR
                    ================================================== */}

          <section className="bg-[#241d18] border border-[#493d35] rounded-2xl p-4 sm:p-6">
            {/* Calendar Header */}

            <div className="flex items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif">
                  {monthName} {year}
                </h2>

                <p className="text-xs sm:text-sm text-[#8f827a] mt-1">
                  Select a date to view availability
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={previousMonth}
                  className="
                                        w-9
                                        h-9
                                        rounded-lg
                                        border
                                        border-[#493d35]
                                        flex
                                        items-center
                                        justify-center
                                        text-[#aaa19b]
                                        hover:bg-[#332a25]
                                        hover:text-white
                                        transition
                                    "
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  onClick={nextMonth}
                  className="
                                        w-9
                                        h-9
                                        rounded-lg
                                        border
                                        border-[#493d35]
                                        flex
                                        items-center
                                        justify-center
                                        text-[#aaa19b]
                                        hover:bg-[#332a25]
                                        hover:text-white
                                        transition
                                    "
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Weekdays */}

            <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-2">
              {Array.from({ length: 7 }, (_, index) => {
                const date = new Date(2024, 0, 1 + index);

                return (
                  <div
                    key={index}
                    className="
                                                py-2
                                                text-center
                                                text-[10px]
                                                sm:text-xs
                                                font-medium
                                                text-[#968b84]
                                                uppercase
                                            "
                  >
                    {date.toLocaleString("en-US", {
                      weekday: "short",
                    })}
                  </div>
                );
              })}
            </div>

            {/* Calendar Days */}

            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {calendarDays.map((day, index) => {
                if (day === null) {
                  return (
                    <div
                      key={`empty-${index}`}
                      className="
                                                    min-h-[68px]
                                                    sm:min-h-[92px]
                                                "
                    />
                  );
                }

                const dateKey = getDateKey(new Date(year, month, day));

                const record = availability[dateKey];

                return (
                  <button
                    key={dateKey}
                    onClick={() => handleDateClick(day)}
                    className={`
                                                relative
                                                min-h-[68px]
                                                sm:min-h-[92px]
                                                rounded-lg
                                                border
                                                p-2
                                                text-left
                                                transition
                                                hover:border-[#d8a849]
                                                ${getStatusStyle(
                                                  record?.status,
                                                )}
                                                ${
                                                  isSelected(day)
                                                    ? "ring-2 ring-[#d8a849] ring-offset-1 ring-offset-[#241d18]"
                                                    : ""
                                                }
                                                ${
                                                  isToday(day)
                                                    ? "shadow-[inset_0_0_0_1px_#d8a849]"
                                                    : ""
                                                }
                                            `}
                  >
                    {/* Day number */}

                    <span
                      className={`
                                                    text-xs
                                                    sm:text-sm
                                                    font-semibold
                                                    ${
                                                      record?.status ===
                                                      "booked"
                                                        ? "text-white"
                                                        : "text-[#f1ebe7]"
                                                    }
                                                `}
                    >
                      {day}
                    </span>

                    {/* Status */}

                    {record && (
                      <div className="absolute bottom-2 left-2 right-2">
                        <p
                          className="
                                                        text-[9px]
                                                        sm:text-[11px]
                                                        text-[#ded5cf]
                                                        truncate
                                                    "
                        >
                          {getStatusLabel(record)}
                        </p>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Today */}

            <div className="flex items-center gap-2 mt-5 text-xs text-[#91867f]">
              <span className="w-2 h-2 rounded-full bg-[#d8a849]" />
              Today
            </div>
          </section>

          {/* =================================================
                        RIGHT PANEL
                    ================================================== */}

          <div className="space-y-5">
            {/* =================================================
                            SELECTED DATE
                        ================================================== */}

            <section className="bg-[#241d18] border border-[#493d35] rounded-2xl p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-[#8f827a]">
                    Selected date
                  </p>

                  <h2 className="text-xl sm:text-2xl font-serif mt-2">
                    {selectedDate
                      ? selectedDate.toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "Select a date"}
                  </h2>
                </div>

                <CalendarDays size={21} className="text-[#d8a849]" />
              </div>

              <div className="mt-5 border border-[#493d35] rounded-xl p-4 bg-[#1d1713]">
                {selectedDate && selectedAvailability ? (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold">
                          {selectedAvailability.lawnName || selectedLawn}
                        </h3>

                        <p className="flex items-center gap-2 text-sm text-[#aaa19b] mt-2">
                          <Clock3 size={15} />
                          {selectedAvailability.slot || "Full Day"}
                        </p>
                      </div>

                      <span
                        className={`
                                                    px-2.5
                                                    py-1
                                                    rounded-md
                                                    text-xs
                                                    font-medium
                                                    ${
                                                      selectedAvailability.status ===
                                                      "booked"
                                                        ? "bg-[#4b2925] text-[#df7c73]"
                                                        : selectedAvailability.status ===
                                                            "tentative"
                                                          ? "bg-[#4a391f] text-[#dbb35d]"
                                                          : "bg-[#24422d] text-[#63b77b]"
                                                    }
                                                `}
                      >
                        {selectedAvailability.status.charAt(0).toUpperCase() +
                          selectedAvailability.status.slice(1)}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-5">
                    <CalendarDays
                      size={28}
                      className="mx-auto text-[#665b54]"
                    />

                    <p className="text-sm text-[#aaa19b] mt-3">
                      No availability data for this date.
                    </p>
                  </div>
                )}
              </div>

              <button
                disabled={!selectedDate}
                className="
                                    w-full
                                    mt-4
                                    px-4
                                    py-3
                                    rounded-lg
                                    bg-[#d8a849]
                                    hover:bg-[#c99a3d]
                                    disabled:bg-[#4a4038]
                                    disabled:text-[#81756e]
                                    disabled:cursor-not-allowed
                                    text-black
                                    font-medium
                                    transition
                                "
              >
                Block this date
              </button>
            </section>

            {/* =================================================
                            UPCOMING EVENTS
                        ================================================== */}

            <section className="bg-[#241d18] border border-[#493d35] rounded-2xl p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif">
                    Next events
                  </h2>

                  <p className="text-sm text-[#8f827a] mt-1">
                    Upcoming scheduled events
                  </p>
                </div>

                <span className="text-xs text-[#8f827a]">
                  {upcomingEvents.length}
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="
                                                    p-4
                                                    rounded-xl
                                                    border
                                                    border-[#3e332d]
                                                    bg-[#1d1713]
                                                    hover:border-[#5b493c]
                                                    transition
                                                "
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="font-medium">{event.title}</h3>

                          <p className="text-sm text-[#aaa19b] mt-1 truncate">
                            {event.lawnName}
                          </p>
                        </div>

                        <span className="text-xs text-[#d8a849] whitespace-nowrap">
                          {new Date(event.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-3 text-xs text-[#8f827a]">
                        <Clock3 size={14} />

                        {event.slot}

                        <span className="mx-1">·</span>

                        <MapPin size={14} />

                        {event.lawnName}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <CalendarDays
                      size={30}
                      className="mx-auto text-[#665b54]"
                    />

                    <p className="text-sm text-[#aaa19b] mt-3">
                      No upcoming events
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AvailabilityCalendar;
