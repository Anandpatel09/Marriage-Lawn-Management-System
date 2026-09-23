import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/comman/Navbar";
import Footer from "../../components/comman/Footer";
import axiosInstance from "../../api/axios";
import { API } from "../../api/api-constant";
import { useAuth } from "../../context/AuthContext";

interface Venue {
  id: number;
  name: string;
  description?: string;
  capacity: number;
}

interface Package {
  id: number;
  name: string;
  description?: string;
  base_price: number;
  included_guests: number;
  extra_guest_price: number;
}

interface AvailabilityItem {
  booking_date: string;
  slot: "full-day";
  status: "pending" | "confirmed" | "cancelled" | "completed";
}

interface AvailabilityMap {
  [date: string]: {
    available: boolean;
    status?: string;
  };
}

const BookNow = () => {
  const { user, isAuthenticated } = useAuth();

  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [venues, setVenues] = useState<Venue[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);

  const [venueId, setVenueId] = useState<number | null>(null);

  const [packageId, setPackageId] = useState<number | null>(null);

  const [occasion, setOccasion] = useState("Wedding");

  const [guests, setGuests] = useState(300);

  const [requests, setRequests] = useState("");

  const [availability, setAvailability] = useState<AvailabilityMap>({});

  const [loadingVenues, setLoadingVenues] = useState(false);

  const [loadingPackages, setLoadingPackages] = useState(false);

  const [loadingAvailability, setLoadingAvailability] = useState(false);

  const [bookingLoading, setBookingLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  // --------------------------------------------------
  // CALENDAR VALUES
  // --------------------------------------------------

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const monthName = currentMonth.toLocaleString("en-IN", {
    month: "long",
  });

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const calendarDays = useMemo(() => {
    return [
      ...Array(firstDayOfMonth).fill(null),
      ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
    ];
  }, [firstDayOfMonth, daysInMonth]);

  // --------------------------------------------------
  // DATE HELPERS
  // --------------------------------------------------

  const getDateKey = (date: Date) => {
    const dateYear = date.getFullYear();
    const dateMonth = String(date.getMonth() + 1).padStart(2, "0");

    const dateDay = String(date.getDate()).padStart(2, "0");

    return `${dateYear}-${dateMonth}-${dateDay}`;
  };

  const isPastDate = (day: number) => {
    const date = new Date(year, month, day);

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return date < currentDate;
  };

  const formatSelectedDate = () => {
    if (!selectedDate) {
      return "Select a date";
    }

    return selectedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // --------------------------------------------------
  // FETCH VENUES
  // --------------------------------------------------

  const fetchVenues = async () => {
    try {
      setLoadingVenues(true);

      const response = await axiosInstance.get(API.VENUE.GET_ALL);

      const venueData = response.data.venues || [];

      setVenues(venueData);

      if (venueData.length > 0) {
        setVenueId(venueData[0].id);
      }
    } catch (error) {
      console.error("Venue API error:", error);

      setErrorMessage("Failed to load marriage lawns.");
    } finally {
      setLoadingVenues(false);
    }
  };

  // --------------------------------------------------
  // FETCH PACKAGES
  // --------------------------------------------------

  const fetchPackages = async () => {
    try {
      setLoadingPackages(true);

      const response = await axiosInstance.get(API.PACKAGE.GET_ALL);

      const packageData = response.data.packages || [];

      setPackages(packageData);

      if (packageData.length > 0) {
        setPackageId(packageData[0].id);
      }
    } catch (error) {
      console.error("Package API error:", error);

      setErrorMessage("Failed to load packages.");
    } finally {
      setLoadingPackages(false);
    }
  };

  // --------------------------------------------------
  // FETCH AVAILABILITY
  // --------------------------------------------------

  const fetchAvailability = async () => {
    if (!venueId) {
      setAvailability({});
      return;
    }

    try {
      setLoadingAvailability(true);

      const response = await axiosInstance.get(API.AVAILABILITY.GET, {
        params: {
          venueId,
          month: month + 1,
          year,
        },
      });

      const bookings: AvailabilityItem[] = response.data.bookings || [];

      const map: AvailabilityMap = {};

      bookings.forEach((booking) => {
        map[booking.booking_date] = {
          available: false,
          status: booking.status,
        };
      });

      setAvailability(map);
    } catch (error) {
      console.error("Availability API error:", error);

      setAvailability({});
    } finally {
      setLoadingAvailability(false);
    }
  };

  // --------------------------------------------------
  // INITIAL API CALLS
  // --------------------------------------------------

  useEffect(() => {
    fetchVenues();
    fetchPackages();
  }, []);

  // --------------------------------------------------
  // FETCH AVAILABILITY WHEN MONTH/VENUE CHANGES
  // --------------------------------------------------

  useEffect(() => {
    fetchAvailability();
  }, [currentMonth, venueId]);

  // --------------------------------------------------
  // SELECTED PACKAGE
  // --------------------------------------------------

  const selectedPackage = packages.find((pkg) => pkg.id === packageId);

  // --------------------------------------------------
  // PRICE CALCULATION
  // --------------------------------------------------

  const basePrice = selectedPackage?.base_price || 0;

  const includedGuests = selectedPackage?.included_guests || 0;

  const extraGuestPrice = selectedPackage?.extra_guest_price || 0;

  const extraGuests = Math.max(0, guests - includedGuests);

  const extraGuestAmount = extraGuests * extraGuestPrice;

  const subtotal = basePrice + extraGuestAmount;

  const gst = subtotal * 0.18;

  const total = subtotal + gst;

  // --------------------------------------------------
  // MONTH NAVIGATION
  // --------------------------------------------------

  const goToPreviousMonth = () => {
    const previousMonth = new Date(year, month - 1, 1);

    const currentDate = new Date();

    const currentMonthStart = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );

    if (previousMonth < currentMonthStart) {
      return;
    }

    setCurrentMonth(previousMonth);
    setSelectedDate(null);
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));

    setSelectedDate(null);
  };

  // --------------------------------------------------
  // DATE AVAILABILITY
  // --------------------------------------------------

  const isDateAvailable = (date: Date) => {
    const dateKey = getDateKey(date);

    if (!availability[dateKey]) {
      return true;
    }

    return availability[dateKey].available;
  };

  // --------------------------------------------------
  // SELECT DATE
  // --------------------------------------------------

  const handleDateSelect = (day: number) => {
    const date = new Date(year, month, day);

    if (isPastDate(day)) {
      return;
    }

    if (!isDateAvailable(date)) {
      return;
    }

    setSelectedDate(date);

    setSuccessMessage("");
    setErrorMessage("");
  };

  // --------------------------------------------------
  // CREATE BOOKING
  // --------------------------------------------------

  const handleBooking = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    if (!isAuthenticated || !user) {
      setErrorMessage("Please login before requesting a booking.");
      return;
    }

    if (!selectedDate) {
      setErrorMessage("Please select a booking date.");
      return;
    }

    if (!venueId) {
      setErrorMessage("Please select a marriage lawn.");
      return;
    }

    if (!packageId) {
      setErrorMessage("Please select a package.");
      return;
    }

    if (guests <= 0) {
      setErrorMessage("Number of guests must be greater than 0.");
      return;
    }

    try {
      setBookingLoading(true);

      const response = await axiosInstance.post(API.BOOKING.CREATE, {
        venueId,
        packageId,
        occasion,
        bookingDate: getDateKey(selectedDate),
        guests,
        specialRequests: requests,
      });

      setSuccessMessage(
        response.data.message || "Booking request submitted successfully.",
      );

      setSelectedDate(null);
      setRequests("");
    } catch (error: any) {
      console.error("Booking API error:", error);

      setErrorMessage(
        error.response?.data?.message || "Failed to create booking.",
      );
    } finally {
      setBookingLoading(false);
    }
  };


  console.log("jmfmfmeefewfwf", venues)
  // --------------------------------------------------
  // SELECTED DATE AVAILABILITY
  // --------------------------------------------------

  const selectedDateAvailability = selectedDate
    ? availability[getDateKey(selectedDate)]
    : null;

  return (
    <div className="min-h-screen bg-[#17120f] text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* PAGE HEADING */}

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold">
            Book Your Special Day
          </h1>

          <p className="text-[#9e9188] mt-2 text-sm">
            Select your preferred date, lawn and package.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT SIDE */}

          <div className="lg:col-span-2 space-y-6">
            {/* CALENDAR */}

            <div className="bg-[#2b211c] border border-[#3a2f29] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-5">
                <CalendarDays size={20} className="text-[#d8a849]" />

                <h2 className="text-lg font-medium">Select Date</h2>
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

              {/* WEEK NAMES */}

              <div className="grid grid-cols-7 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center text-[11px] text-[#80736b] py-2"
                    >
                      {day}
                    </div>
                  ),
                )}
              </div>

              {/* CALENDAR DAYS */}

              <div className="grid grid-cols-7 gap-y-2">
                {calendarDays.map((day, index) => {
                  if (day === null) {
                    return <div key={index} className="h-10" />;
                  }

                  const date = new Date(year, month, day);

                  const dateKey = getDateKey(date);

                  const past = isPastDate(day);

                  const available = isDateAvailable(date);

                  const isSelected =
                    selectedDate?.toDateString() === date.toDateString();

                  return (
                    <div key={index} className="flex justify-center">
                      <button
                        type="button"
                        disabled={past || !available}
                        onClick={() => handleDateSelect(day)}
                        className={` relative w-10 h-10 rounded-full text-sm transition flex items-center justify-center
                            ${isSelected
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

                        {!past && !available && (
                          <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-red-500" />
                        )}

                        {!past && available && !isSelected && (
                          <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-[#62a86c]" />
                        )}

                        {availability[dateKey] &&
                          !availability[dateKey].available && <span />}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* LOADING */}

              {loadingAvailability && (
                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-[#9e9188]">
                  <Loader2 size={13} className="animate-spin" />
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

            {/* BOOKING DETAILS */}

            <div className="bg-[#2b211c] border border-[#3a2f29] rounded-xl p-5">
              <h2 className="text-lg font-medium mb-5">Booking Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* VENUE */}

                <div>
                  <label className="block text-xs text-[#a39790] mb-2">
                    Marriage Lawn
                  </label>

                  <select
                    value={venueId ?? ""}
                    onChange={(e) => {
                      const value = Number(e.target.value);

                      setVenueId(value);
                      setSelectedDate(null);
                    }}
                    disabled={loadingVenues}
                    className="w-full bg-[#201813] border border-[#4b4039] rounded-lg px-3 py-3 text-sm outline-none focus:border-[#d8a849]"
                  >
                    {loadingVenues ? (
                      <option>Loading lawns...</option>
                    ) : (
                      venues.map((venue) => (
                        <option key={venue.id} value={venue.id}>
                          {venue.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                {/* PACKAGE */}

                <div>
                  <label className="block text-xs text-[#a39790] mb-2">
                    Package
                  </label>

                  <select
                    value={packageId ?? ""}
                    onChange={(e) => setPackageId(Number(e.target.value))}
                    disabled={loadingPackages}
                    className="w-full bg-[#201813] border border-[#4b4039] rounded-lg px-3 py-3 text-sm outline-none focus:border-[#d8a849]"
                  >
                    {loadingPackages ? (
                      <option>Loading packages...</option>
                    ) : (
                      packages.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                {/* OCCASION */}

                <div>
                  <label className="block text-xs text-[#a39790] mb-2">
                    Occasion
                  </label>

                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full bg-[#201813] border border-[#4b4039] rounded-lg px-3 py-3 text-sm outline-none focus:border-[#d8a849]"
                  >
                    <option value="Wedding">Wedding</option>

                    <option value="Golden Vivah">Golden Vivah</option>

                    <option value="Engagement">Engagement</option>

                    <option value="Reception">Reception</option>

                    <option value="Birthday">Birthday</option>

                    <option value="Anniversary">Anniversary</option>
                  </select>
                </div>

                {/* GUESTS */}

                <div>
                  <label className="block text-xs text-[#a39790] mb-2">
                    Number of Guests
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-[#201813] border border-[#4b4039] rounded-lg px-3 py-3 text-sm outline-none focus:border-[#d8a849]"
                  />
                </div>
              </div>

              {/* CUSTOMER INFORMATION */}

              <div className="mt-6 pt-6 border-t border-[#3a2f29]">
                <h3 className="text-sm font-medium mb-4">
                  Customer Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-[#a39790] mb-2">
                      Name
                    </label>

                    <input
                      type="text"
                      value={user ? `${user.first_name} ${user.last_name}` : ""}
                      readOnly
                      className="w-full bg-[#201813] border border-[#3d332c] rounded-lg px-3 py-3 text-sm text-[#a39790]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#a39790] mb-2">
                      Mobile
                    </label>

                    <input
                      type="text"
                      value={user?.mobile || ""}
                      readOnly
                      className="w-full bg-[#201813] border border-[#3d332c] rounded-lg px-3 py-3 text-sm text-[#a39790]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#a39790] mb-2">
                      Email
                    </label>

                    <input
                      type="email"
                      value={user?.email || ""}
                      readOnly
                      className="w-full bg-[#201813] border border-[#3d332c] rounded-lg px-3 py-3 text-sm text-[#a39790]"
                    />
                  </div>
                </div>
              </div>

              {/* SPECIAL REQUESTS */}

              <div className="mt-6">
                <label className="block text-xs text-[#a39790] mb-2">
                  Special Requests
                </label>

                <textarea
                  rows={4}
                  value={requests}
                  onChange={(e) => setRequests(e.target.value)}
                  placeholder="Decoration, catering, parking, special arrangements..."
                  className="w-full bg-[#201813] border border-[#4b4039] rounded-lg px-3 py-3 text-sm outline-none focus:border-[#d8a849] resize-none placeholder:text-[#625850]"
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE SUMMARY */}

          <div>
            <div className="lg:sticky lg:top-24 bg-[#2b211c] border border-[#3a2f29] rounded-xl p-5">
              <h2 className="text-lg font-medium mb-5">Booking Summary</h2>

              <div className="space-y-4">
                {/* DATE */}

                <div>
                  <p className="text-xs text-[#81756d]">Selected Date</p>

                  <p className="text-sm mt-1">{formatSelectedDate()}</p>
                </div>

                {/* VENUE */}

                <div>
                  <p className="text-xs text-[#81756d]">Lawn</p>

                  <p className="text-sm mt-1">
                    {venues.find((v) => v.id === venueId)?.name ||
                      "Select lawn"}
                  </p>
                </div>

                {/* PACKAGE */}

                <div>
                  <p className="text-xs text-[#81756d]">Package</p>

                  <p className="text-sm mt-1">
                    {selectedPackage?.name || "Select package"}
                  </p>
                </div>

                {/* OCCASION */}

                <div>
                  <p className="text-xs text-[#81756d]">Occasion</p>

                  <p className="text-sm mt-1">{occasion}</p>
                </div>

                {/* GUESTS */}

                <div>
                  <p className="text-xs text-[#81756d]">Guests</p>

                  <p className="text-sm mt-1">{guests}</p>
                </div>

                {/* AVAILABILITY */}

                <div className="bg-[#22271f] rounded-lg p-3">
                  {selectedDateAvailability?.available === false ? (
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500" />

                      <span className="text-xs text-red-400">
                        Selected date is unavailable
                      </span>
                    </div>
                  ) : selectedDate ? (
                    <div className="flex items-center gap-2">
                      <Check size={14} className="text-[#62a86c]" />

                      <span className="text-xs text-[#76ab7b]">
                        This date is available
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-[#8b7e76]">
                      Select a date to check availability
                    </span>
                  )}
                </div>

                {/* PRICE */}

                <div className="border-t border-[#3a2f29] pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#968980]">Base package</span>

                    <span className="text-sm">
                      ₹{basePrice.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#968980]">Extra guests</span>

                    <span className="text-sm">
                      ₹{extraGuestAmount.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#968980]">Subtotal</span>

                    <span className="text-sm">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#968980]">GST (18%)</span>

                    <span className="text-sm">
                      ₹
                      {gst.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-medium">Total</span>

                    <span className="text-xl font-semibold text-[#d8a849]">
                      ₹
                      {total.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {successMessage && (
                <div className="mt-5 bg-[#1f3224] border border-[#315d39] text-[#7bc182] rounded-lg p-3 text-xs">
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div className="mt-5 bg-[#351f1f] border border-[#623333] text-red-400 rounded-lg p-3 text-xs">
                  {errorMessage}
                </div>
              )}

              <button
                type="button"
                onClick={handleBooking}
                disabled={
                  bookingLoading ||
                  !selectedDate ||
                  !venueId ||
                  !packageId ||
                  !isAuthenticated
                }
                className="w-full mt-5 py-3 bg-[#d8a849] hover:bg-[#c99a3d] disabled:bg-[#594c37] disabled:text-[#887b69] disabled:cursor-not-allowed text-black text-sm font-medium rounded-lg transition flex items-center justify-center gap-2"
              >
                {bookingLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Request Booking"
                )}
              </button>

              <p className="text-[10px] text-[#71655d] text-center mt-3">
                Final booking confirmation will be done by the admin.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookNow;
