import { Banknote, CreditCard, Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../../components/comman/Navbar";
import Footer from "../../../components/comman/Footer";
import BookingCalendar from "./BookingCalender";

import axiosInstance from "../../../api/axios";
import { API } from "../../../api/api-constant";
import { useAuth } from "../../../context/AuthContext";

// =====================================================
// TYPES
// =====================================================

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
  base_price: number | string;
  included_guests: number | string;
  extra_guest_price: number | string;
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

interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayPaymentResponse) => void | Promise<void>;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayFailureResponse {
  error?: {
    code?: string;
    description?: string;
    reason?: string;
    metadata?: {
      order_id?: string;
      payment_id?: string;
    };
  };
}

interface RazorpayInstance {
  open: () => void;
  on: (
    event: string,
    callback: (response: RazorpayFailureResponse) => void,
  ) => void;
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

// =====================================================
// COMPONENT
// =====================================================

const BookNow = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Prevent duplicate booking/order requests.
  const submittingRef = useRef(false);

  // ===================================================
  // DATE
  // ===================================================

  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // ===================================================
  // VENUES
  // ===================================================

  const [venues, setVenues] = useState<Venue[]>([]);
  const [loadingVenues, setLoadingVenues] = useState(false);
  const [venueId, setVenueId] = useState<number | null>(null);

  // ===================================================
  // PACKAGES
  // ===================================================

  const [packages, setPackages] = useState<Package[]>([]);
  const [loadingPackages, setLoadingPackages] = useState(false);
  const [packageId, setPackageId] = useState<number | null>(null);

  // ===================================================
  // BOOKING DETAILS
  // ===================================================

  const [occasion, setOccasion] = useState("Wedding");
  const [guests, setGuests] = useState(300);
  const [requests, setRequests] = useState("");
  const [address, setAddress] = useState("");

  // ===================================================
  // CUSTOMER INFORMATION
  // ===================================================

  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  // ===================================================
  // AVAILABILITY
  // ===================================================

  const [availability, setAvailability] = useState<AvailabilityMap>({});
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  // ===================================================
  // UI STATE
  // ===================================================

  const [bookingLoading, setBookingLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // ===================================================
  // DATE HELPERS
  // ===================================================

  const getDateKey = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formatCurrency = (amount: number): string =>
    `₹${Number(amount).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  // ===================================================
  // FETCH VENUES
  // ===================================================

  const fetchVenues = useCallback(async () => {
    try {
      setLoadingVenues(true);

      const response = await axiosInstance.get(API.VENUE.GET_ALL);
      const venueData: Venue[] = response.data.venues || [];

      setVenues(venueData);

      setVenueId((previousId) => {
        if (previousId && venueData.some((v) => v.id === previousId)) {
          return previousId;
        }

        return venueData.length > 0 ? venueData[0].id : null;
      });
    } catch (error) {
      console.error("Venue API error:", error);
      setErrorMessage("Failed to load marriage lawns.");
    } finally {
      setLoadingVenues(false);
    }
  }, []);

  // ===================================================
  // FETCH PACKAGES
  // ===================================================

  const fetchPackages = useCallback(async () => {
    try {
      setLoadingPackages(true);

      const response = await axiosInstance.get(API.PACKAGE.GET_ALL);
      const packageData: Package[] = response.data.packages || [];

      setPackages(packageData);

      setPackageId((previousId) => {
        if (previousId && packageData.some((p) => p.id === previousId)) {
          return previousId;
        }

        return packageData.length > 0 ? packageData[0].id : null;
      });
    } catch (error) {
      console.error("Package API error:", error);
      setErrorMessage("Failed to load packages.");
    } finally {
      setLoadingPackages(false);
    }
  }, []);

  // ===================================================
  // FETCH AVAILABILITY
  // ===================================================

  const fetchAvailability = useCallback(async () => {
    if (!venueId) {
      setAvailability({});
      return;
    }

    try {
      setLoadingAvailability(true);

      const response = await axiosInstance.get(API.AVAILABILITY.GET, {
        params: {
          venueId,
          month: currentMonth.getMonth() + 1,
          year: currentMonth.getFullYear(),
        },
      });

      const bookings: AvailabilityItem[] = response.data.bookings || [];
      const map: AvailabilityMap = {};

      bookings.forEach((booking) => {
        const dateKey = String(booking.booking_date).slice(0, 10);

        // Pending and confirmed bookings are considered unavailable.
        // Cancelled/completed bookings should not block the date.
        if (booking.status === "pending" || booking.status === "confirmed") {
          map[dateKey] = {
            available: false,
            status: booking.status,
          };
        }
      });

      setAvailability(map);
    } catch (error) {
      console.error("Availability API error:", error);
      setAvailability({});
    } finally {
      setLoadingAvailability(false);
    }
  }, [venueId, currentMonth]);

  // ===================================================
  // FETCH CUSTOMER BOOKINGS
  // ===================================================

  const fetchMyBookings = useCallback(async () => {
    const response = await axiosInstance.get(API.BOOKING.MY_BOOKINGS, {
      params: { type: "upcoming" },
    });

    const bookings = response.data.bookings || [];

    console.log("Latest upcoming bookings:", bookings);

    return bookings;
  }, []);

  // ===================================================
  // INITIAL API CALLS
  // ===================================================

  useEffect(() => {
    void fetchVenues();
    void fetchPackages();
  }, [fetchVenues, fetchPackages]);

  useEffect(() => {
    void fetchAvailability();
  }, [fetchAvailability]);

  // ===================================================
  // SELECTED PACKAGE AND PRICE PREVIEW
  // This preview is for display only.
  // The backend must calculate the final amount.
  // ===================================================

  const selectedPackage = packages.find((pkg) => pkg.id === packageId);

  const basePrice = Number(selectedPackage?.base_price ?? 0);
  const includedGuests = Number(selectedPackage?.included_guests ?? 0);
  const extraGuestPrice = Number(selectedPackage?.extra_guest_price ?? 0);

  const extraGuests = Math.max(0, Number(guests) - includedGuests);
  const extraGuestAmount = extraGuests * extraGuestPrice;
  const subtotal = basePrice + extraGuestAmount;
  const gst = Number((subtotal * 0.18).toFixed(2));
  const total = Number((subtotal + gst).toFixed(2));

  // ===================================================
  // FORM RESET
  // ===================================================

  const clearCustomerForm = () => {
    setSelectedDate(null);
    setCustomerName("");
    setCustomerMobile("");
    setCustomerEmail("");
    setAddress("");
    setRequests("");
  };

  // ===================================================
  // VALIDATION AND OPEN PAYMENT MODAL
  // ===================================================

  const handleBooking = () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!isAuthenticated) {
      setErrorMessage("Please login before booking.");
      return;
    }

    if (!selectedDate) {
      setErrorMessage("Please select a booking date.");
      return;
    }

    if (
      selectedDate <
      new Date(today.getFullYear(), today.getMonth(), today.getDate())
    ) {
      setErrorMessage("Please select today or a future date.");
      return;
    }

    if (!venueId || !packageId) {
      setErrorMessage("Please select a lawn and package.");
      return;
    }

    if (availability[getDateKey(selectedDate)]?.available === false) {
      setErrorMessage(
        "This date is already booked. Please select another date.",
      );
      return;
    }

    if (
      !customerName.trim() ||
      !customerMobile.trim() ||
      !customerEmail.trim() ||
      !address.trim()
    ) {
      setErrorMessage("Please complete all required customer information.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (Number(guests) <= 0 || !Number.isInteger(Number(guests))) {
      setErrorMessage("Please enter a valid guest count.");
      return;
    }

    setIsPaymentModalOpen(true);
  };

  // ===================================================
  // BOOKING AND PAYMENT
  // ===================================================

  const submitBooking = async (paymentMethod: "pay_at_lawn" | "online") => {
    if (submittingRef.current) return;

    if (!isAuthenticated) {
      setErrorMessage("Please login before booking.");
      return;
    }

    if (!selectedDate || !venueId || !packageId) {
      setErrorMessage("Please select a date, lawn and package.");
      return;
    }

    submittingRef.current = true;
    setBookingLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const payload = {
      venueId,
      packageId,
      occasion,
      bookingDate: getDateKey(selectedDate),
      guests: Number(guests),
      customerName: customerName.trim(),
      customerMobile: customerMobile.trim(),
      customerEmail: customerEmail.trim(),
      customerAddress: address.trim(),
      specialRequests: requests.trim() || null,
    };

    // -----------------------------------------------
    // PAY AT LAWN
    // -----------------------------------------------

    if (paymentMethod === "pay_at_lawn") {
      try {
        const response = await axiosInstance.post(API.BOOKING.CREATE, {
          ...payload,
          paymentMethod: "pay_at_lawn",
        });

        setIsPaymentModalOpen(false);

        setSuccessMessage(
          response.data.message ||
            "Booking request submitted. Payment is due at the lawn.",
        );

        clearCustomerForm();

        // A failed refresh should not undo a successful booking.
        try {
          await fetchMyBookings();
          await fetchAvailability();
        } catch (refreshError) {
          console.error("Booking refresh error:", refreshError);
        }

        navigate("/bookings-public");
      } catch (error: any) {
        console.error("Cash booking error:", error);

        setErrorMessage(
          error.response?.data?.message ||
            "Unable to submit your booking request.",
        );
      } finally {
        setBookingLoading(false);
        submittingRef.current = false;
      }

      return;
    }

    // -----------------------------------------------
    // ONLINE PAYMENT: CREATE ORDER
    // -----------------------------------------------

    let bookingId: number | null = null;

    try {
      const orderResponse = await axiosInstance.post(
        API.PAYMENT.CREATE_ORDER,
        payload,
      );

      const order = orderResponse.data;
      bookingId = Number(order.bookingId);

      if (
        !Number.isInteger(bookingId) ||
        bookingId <= 0 ||
        !order.razorpayOrderId ||
        !order.keyId ||
        !Number(order.amount)
      ) {
        throw new Error(
          "The server did not return valid payment order details.",
        );
      }

      if (!window.Razorpay) {
        throw new Error(
          "Razorpay Checkout did not load. Reload the page and check My Bookings before retrying.",
        );
      }

      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: Number(order.amount),
        currency: order.currency || "INR",
        name: "Durga Marriage Lawn",
        description: "Marriage lawn booking payment",
        order_id: order.razorpayOrderId,

        prefill: {
          name: customerName.trim(),
          email: customerEmail.trim(),
          contact: customerMobile.trim(),
        },

        theme: {
          color: "#d8a849",
        },

        // Only the backend verification response confirms payment.
        handler: async (paymentResponse) => {
          setBookingLoading(true);
          setErrorMessage("");

          try {
            const verificationResponse = await axiosInstance.post(
              API.PAYMENT.VERIFY,
              {
                bookingId,
                ...paymentResponse,
              },
            );

            setIsPaymentModalOpen(false);

            setSuccessMessage(
              verificationResponse.data.message ||
                "Payment verified. Your booking awaits admin confirmation.",
            );

            clearCustomerForm();

            // Refresh booking data and availability after verification.
            try {
              await fetchMyBookings();
              await fetchAvailability();
            } catch (refreshError) {
              console.error("Post-payment refresh error:", refreshError);
            }

            navigate("/bookings-public");
          } catch (error: any) {
            console.error("Payment verification error:", error);

            setErrorMessage(
              error.response?.data?.message ||
                "Payment verification could not be confirmed. Check My Bookings before attempting another payment.",
            );
          } finally {
            setBookingLoading(false);
            submittingRef.current = false;
          }
        },

        modal: {
          ondismiss: () => {
            setErrorMessage(
              "Checkout was closed. Check My Bookings before trying again.",
            );

            setBookingLoading(false);
            submittingRef.current = false;
          },
        },
      });

      checkout.on("payment.failed", async (failure) => {
        console.error("Razorpay payment failed:", failure);

        try {
          await axiosInstance.post(API.PAYMENT.FAILURE, {
            bookingId,
          });
        } catch (failureError) {
          console.error(
            "Could not update payment failure status:",
            failureError,
          );
        }

        setErrorMessage(
          "Payment failed. Check My Bookings before attempting another payment.",
        );

        setBookingLoading(false);
        submittingRef.current = false;
      });

      setIsPaymentModalOpen(false);

      // Checkout now owns the payment interaction.
      setBookingLoading(false);
      checkout.open();
    } catch (error: any) {
      console.error("Online booking/payment error:", error);

      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Unable to process your booking.",
      );

      setBookingLoading(false);
      submittingRef.current = false;
    }
  };

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <div className="min-h-screen bg-[#17120f] text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold sm:text-4xl">
            Book Your Special Day
          </h1>

          <p className="mt-2 text-sm text-[#9e9188]">
            Select your preferred date, lawn and package.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* LEFT SIDE */}
          <div className="space-y-6 lg:col-span-2">
            <BookingCalendar
              currentMonth={currentMonth}
              selectedDate={selectedDate}
              availability={availability}
              loadingAvailability={loadingAvailability}
              onMonthChange={(date: Date) => {
                setCurrentMonth(date);
                setSelectedDate(null);
                setSuccessMessage("");
                setErrorMessage("");
              }}
              onDateSelect={(date: Date) => {
                setSelectedDate(date);
                setSuccessMessage("");
                setErrorMessage("");
              }}
            />

            {/* EVENT INFORMATION */}
            <section className="rounded-xl border border-[#3a2f29] bg-[#2b211c] p-5">
              <h2 className="mb-5 text-lg font-medium">Event Information</h2>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs text-[#a39790]">
                    Marriage Lawn
                  </label>

                  <select
                    value={venueId ?? ""}
                    onChange={(event) => {
                      setVenueId(
                        event.target.value ? Number(event.target.value) : null,
                      );
                      setSelectedDate(null);
                      setErrorMessage("");
                      setSuccessMessage("");
                    }}
                    disabled={loadingVenues}
                    className="w-full rounded-lg border border-[#4b4039] bg-[#201813] px-3 py-3 text-sm outline-none focus:border-[#d8a849]"
                  >
                    {loadingVenues ? (
                      <option value="">Loading lawns...</option>
                    ) : venues.length === 0 ? (
                      <option value="">No lawns available</option>
                    ) : (
                      venues.map((venue) => (
                        <option key={venue.id} value={venue.id}>
                          {venue.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs text-[#a39790]">
                    Package
                  </label>

                  <select
                    value={packageId ?? ""}
                    onChange={(event) =>
                      setPackageId(
                        event.target.value ? Number(event.target.value) : null,
                      )
                    }
                    disabled={loadingPackages}
                    className="w-full rounded-lg border border-[#4b4039] bg-[#201813] px-3 py-3 text-sm outline-none focus:border-[#d8a849]"
                  >
                    {loadingPackages ? (
                      <option value="">Loading packages...</option>
                    ) : packages.length === 0 ? (
                      <option value="">No packages available</option>
                    ) : (
                      packages.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs text-[#a39790]">
                    Occasion
                  </label>

                  <select
                    value={occasion}
                    onChange={(event) => setOccasion(event.target.value)}
                    className="w-full rounded-lg border border-[#4b4039] bg-[#201813] px-3 py-3 text-sm outline-none focus:border-[#d8a849]"
                  >
                    {[
                      "Wedding",
                      "Engagement",
                      "Reception",
                      "Birthday",
                      "Anniversary",
                      "Haldi Ceremony",
                      "Mehndi Ceremony",
                      "Sangeet Ceremony",
                      "Roka Ceremony",
                      "Tilak Ceremony",
                      "Ring Ceremony",
                      "Cocktail Party",
                      "Baby Shower",
                      "Naming Ceremony",
                      "Retirement Party",
                      "Farewell Party",
                      "Kitty Party",
                      "Corporate Event",
                      "Business Meeting",
                      "Conference",
                      "Product Launch",
                      "Award Ceremony",
                      "Cultural Event",
                      "Religious Ceremony",
                      "Family Function",
                      "Social Gathering",
                      "Festival Celebration",
                      "Golden Jubilee",
                      "Silver Jubilee",
                      "Graduation Party",
                      "Reunion",
                      "Other",
                    ].map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs text-[#a39790]">
                    Number of Guests
                  </label>

                  <input
                    type="number"
                    min={1}
                    value={guests}
                    onChange={(event) =>
                      setGuests(Math.max(1, Number(event.target.value) || 1))
                    }
                    className="w-full rounded-lg border border-[#4b4039] bg-[#201813] px-3 py-3 text-sm outline-none focus:border-[#d8a849]"
                  />
                </div>
              </div>

              {/* CUSTOMER INFORMATION */}
              <div className="mt-6 border-t border-[#3a2f29] pt-6">
                <h3 className="mb-4 text-sm font-medium">
                  Customer Information
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-xs text-[#a39790]">
                      Full Name *
                    </label>

                    <input
                      type="text"
                      autoComplete="name"
                      value={customerName}
                      onChange={(event) => setCustomerName(event.target.value)}
                      placeholder="Your name"
                      className="w-full rounded-lg border border-[#3d332c] bg-[#201813] px-3 py-3 text-sm outline-none placeholder:text-[#625850] focus:border-[#d8a849]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs text-[#a39790]">
                      Mobile Number *
                    </label>

                    <input
                      type="tel"
                      autoComplete="tel"
                      value={customerMobile}
                      onChange={(event) =>
                        setCustomerMobile(event.target.value)
                      }
                      placeholder="Mobile number"
                      className="w-full rounded-lg border border-[#3d332c] bg-[#201813] px-3 py-3 text-sm outline-none placeholder:text-[#625850] focus:border-[#d8a849]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs text-[#a39790]">
                      Email Address *
                    </label>

                    <input
                      type="email"
                      autoComplete="email"
                      value={customerEmail}
                      onChange={(event) => setCustomerEmail(event.target.value)}
                      placeholder="Email address"
                      className="w-full rounded-lg border border-[#3d332c] bg-[#201813] px-3 py-3 text-sm outline-none placeholder:text-[#625850] focus:border-[#d8a849]"
                    />
                  </div>
                </div>
              </div>

              {/* ADDRESS */}
              <div className="mt-6">
                <label className="mb-2 block text-xs text-[#a39790]">
                  Complete Address *
                </label>

                <textarea
                  rows={3}
                  autoComplete="street-address"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  placeholder="Enter your complete address..."
                  className="w-full resize-none rounded-lg border border-[#4b4039] bg-[#201813] px-3 py-3 text-sm outline-none placeholder:text-[#625850] focus:border-[#d8a849]"
                />
              </div>

              {/* SPECIAL REQUESTS */}
              <div className="mt-6">
                <label className="mb-2 block text-xs text-[#a39790]">
                  Special Requests
                </label>

                <textarea
                  rows={3}
                  value={requests}
                  onChange={(event) => setRequests(event.target.value)}
                  placeholder="Decoration, catering, parking, special arrangements..."
                  className="w-full resize-none rounded-lg border border-[#4b4039] bg-[#201813] px-3 py-3 text-sm outline-none placeholder:text-[#625850] focus:border-[#d8a849]"
                />
              </div>
            </section>
          </div>

          {/* RIGHT SIDE: SUMMARY */}
          <aside>
            <div className="rounded-xl border border-[#3a2f29] bg-[#2b211c] p-5 lg:sticky lg:top-24">
              <h2 className="mb-5 text-lg font-medium">Booking Summary</h2>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-[#81756d]">Selected Date</p>
                  <p className="mt-1 text-sm">
                    {selectedDate
                      ? selectedDate.toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "Select a date"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#81756d]">Lawn</p>
                  <p className="mt-1 text-sm">
                    {venues.find((venue) => venue.id === venueId)?.name ||
                      "Select lawn"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#81756d]">Package</p>
                  <p className="mt-1 text-sm">
                    {selectedPackage?.name || "Select package"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#81756d]">Occasion</p>
                  <p className="mt-1 text-sm">{occasion}</p>
                </div>

                <div>
                  <p className="text-xs text-[#81756d]">Guests</p>
                  <p className="mt-1 text-sm">{guests}</p>
                </div>

                <div className="rounded-lg bg-[#22271f] p-3">
                  {!selectedDate ? (
                    <span className="text-xs text-[#8b7e76]">
                      Select a date to check availability
                    </span>
                  ) : loadingAvailability ? (
                    <span className="text-xs text-[#a39790]">
                      Checking availability...
                    </span>
                  ) : availability[getDateKey(selectedDate)]?.available ===
                    false ? (
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-red-500" />
                      <span className="text-xs text-red-400">
                        Selected date is unavailable
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#62a86c]" />
                      <span className="text-xs text-[#76ab7b]">
                        This date appears available
                      </span>
                    </div>
                  )}
                </div>

                {/* PRICE BREAKDOWN */}
                <div className="space-y-3 border-t border-[#3a2f29] pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#968980]">Base package</span>
                    <span className="text-sm">{formatCurrency(basePrice)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#968980]">
                      Extra guests ({extraGuests})
                    </span>
                    <span className="text-sm">
                      {formatCurrency(extraGuestAmount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#968980]">Subtotal</span>
                    <span className="text-sm">{formatCurrency(subtotal)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#968980]">GST (18%)</span>
                    <span className="text-sm">{formatCurrency(gst)}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-medium">Total</span>
                    <span className="text-xl font-semibold text-[#d8a849]">
                      {formatCurrency(total)}
                    </span>
                  </div>

                  <p className="text-[10px] text-[#81756d]">
                    Final booking charges are calculated by the server.
                  </p>
                </div>
              </div>

              {successMessage && (
                <div
                  role="status"
                  className="mt-5 rounded-lg border border-[#315d39] bg-[#1f3224] p-3 text-xs text-[#7bc182]"
                >
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div
                  role="alert"
                  className="mt-5 rounded-lg border border-[#623333] bg-[#351f1f] p-3 text-xs text-red-400"
                >
                  {errorMessage}
                </div>
              )}

              <button
                type="button"
                onClick={handleBooking}
                disabled={
                  bookingLoading ||
                  loadingVenues ||
                  loadingPackages ||
                  loadingAvailability ||
                  !selectedDate ||
                  !venueId ||
                  !packageId ||
                  !isAuthenticated ||
                  availability[getDateKey(selectedDate || today)]?.available ===
                    false
                }
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#d8a849] py-3 text-sm font-medium text-black transition hover:bg-[#c99a3d] disabled:cursor-not-allowed disabled:bg-[#594c37] disabled:text-[#887b69]"
              >
                {bookingLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Processing...
                  </>
                ) : !isAuthenticated ? (
                  "Login to Book"
                ) : (
                  "Request Booking"
                )}
              </button>

              <p className="mt-3 text-center text-[10px] text-[#71655d]">
                Final booking confirmation will be done by the admin.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <Footer />

      {/* =================================================
          PAYMENT METHOD MODAL
      ================================================= */}

      {isPaymentModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="payment-modal-title"
        >
          <div className="w-full max-w-lg rounded-2xl border border-[#4b4039] bg-[#2b211c] p-6 shadow-2xl">
            <h2 id="payment-modal-title" className="text-xl font-semibold">
              Choose Payment Method
            </h2>

            <p className="mt-2 text-sm text-[#a39790]">
              Select how you would like to pay for your booking.
            </p>

            <div className="mt-5 rounded-lg bg-[#201813] p-4">
              <p className="text-xs text-[#9e9188]">Estimated booking amount</p>
              <p className="mt-1 text-2xl font-semibold text-[#d8a849]">
                {formatCurrency(total)}
              </p>
            </div>

            <button
              type="button"
              disabled={bookingLoading}
              onClick={() => void submitBooking("pay_at_lawn")}
              className="mt-5 flex w-full items-center gap-4 rounded-xl border border-[#514239] bg-[#201813] p-4 text-left transition hover:border-[#d8a849] disabled:opacity-50"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#34281f] text-[#d8a849]">
                <Banknote size={22} />
              </span>

              <span className="flex-1">
                <span className="block text-sm font-medium">Pay at Lawn</span>
                <span className="mt-1 block text-xs text-[#9e9188]">
                  Pay in person. Your booking request will be saved.
                </span>
              </span>
            </button>

            <button
              type="button"
              disabled={bookingLoading}
              onClick={() => void submitBooking("online")}
              className="mt-3 flex w-full items-center gap-4 rounded-xl border border-[#514239] bg-[#201813] p-4 text-left transition hover:border-[#d8a849] disabled:opacity-50"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#34281f] text-[#d8a849]">
                <CreditCard size={22} />
              </span>

              <span className="flex-1">
                <span className="block text-sm font-medium">Pay Online</span>
                <span className="mt-1 block text-xs text-[#9e9188]">
                  Continue to secure Razorpay Checkout.
                </span>
              </span>
            </button>

            <button
              type="button"
              disabled={bookingLoading}
              onClick={() => setIsPaymentModalOpen(false)}
              className="mt-4 w-full rounded-lg border border-[#514239] px-4 py-3 text-sm text-[#b8aaa1] transition hover:bg-[#382b23] disabled:opacity-50"
            >
              Cancel
            </button>

            {bookingLoading && (
              <p className="mt-3 flex items-center justify-center gap-2 text-xs text-[#a39790]">
                <Loader2 size={14} className="animate-spin" />
                Processing booking...
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookNow;
