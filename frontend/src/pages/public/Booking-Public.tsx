
import { useEffect, useState } from "react";
import { CalendarDays, MapPin, Loader2 } from "lucide-react";

import Navbar from "../../components/comman/Navbar";
import Footer from "../../components/comman/Footer";

import axiosInstance from "../../api/axios";
import { API } from "../../api/api-constant";
import { useNavigate } from "react-router-dom";

interface Booking {
  id: number;
  bookingId: string;

  title: string;
  occasion: string;

  venueId: number;
  venueName: string;

  packageId: number;
  packageName: string;

  bookingDate: string;
  slot: string;

  guests: number;

  customerName: string;
  customerMobile: string;
  customerEmail: string;
  customerAddress: string;

  specialRequests?: string | null;

  baseAmount: number;
  extraGuestCount: number;
  extraGuestAmount: number;

  subtotal: number;
  gstAmount: number;
  totalAmount: number;

  // Your current API may return 0 until payment functionality is added.
  paidAmount?: number;

  status: "pending" | "confirmed" | "cancelled" | "completed";

  createdAt: string;
  updatedAt: string;
}

const Bookings = () => {
  // =====================================================
  // ACTIVE TAB
  // =====================================================

  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const navigate=useNavigate();
  // =====================================================
  // BOOKINGS
  // =====================================================

  const [bookings, setBookings] = useState<Booking[]>([]);

  // =====================================================
  // LOADING
  // =====================================================

  const [loading, setLoading] = useState(false);

  // =====================================================
  // ERROR
  // =====================================================

  const [error, setError] = useState("");

  // =====================================================
  // FETCH BOOKINGS
  // =====================================================

  const fetchBookings = async (type: "upcoming" | "past") => {
    try {
      setLoading(true);
      setError("");

      const response = await axiosInstance.get(API.BOOKING.MY_BOOKINGS, {
        params: {
          type,
        },
      });

      console.log(`${type} bookings response:`, response.data);

      setBookings(response.data.bookings || []);
    } catch (error: any) {
      console.error("Bookings API error:", error);

      setBookings([]);

      setError(error?.response?.data?.message || "Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FETCH WHEN TAB CHANGES
  // =====================================================

  useEffect(() => {
    fetchBookings(activeTab);
  }, [activeTab]);

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (dateString: string) => {
    if (!dateString) {
      return "";
    }

    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================================
  // FORMAT SLOT
  // =====================================================

  const formatSlot = (slot: string) => {
    if (slot === "full-day") {
      return "Full day";
    }

    return slot
      .replace("-", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // =====================================================
  // FORMAT CURRENCY
  // =====================================================

  const formatCurrency = (amount: number) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  // =====================================================
  // STATUS CLASS
  // =====================================================

  const getStatusClass = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return "text-[#62b879] border-[#315c3c] bg-[#1d2d21]";

      case "pending":
        return "text-[#d8a849] border-[#795b22] bg-[#302719]";

      case "cancelled":
        return "text-[#e26d6d] border-[#6b3434] bg-[#351f1f]";

      case "completed":
        return "text-[#76b8d8] border-[#34576a] bg-[#1f2d35]";

      default:
        return "text-[#9e9188] border-[#51463e] bg-[#2b231e]";
    }
  };

  // =====================================================
  // PAYMENT PROGRESS
  // =====================================================

  const getPaymentPercentage = (booking: Booking) => {
    const total = Number(booking.totalAmount) || 0;

    const paid = Number(booking.paidAmount || 0);

    if (total <= 0) {
      return 0;
    }

    return Math.min((paid / total) * 100, 100);
  };

  return (
    <div className="min-h-dvh flex flex-col bg-[#17120f] text-white">
      <Navbar />

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="flex-1 px-4 py-8 sm:px-6">
        <div className="w-full max-w-4xl mx-auto">
          {/* =================================================
              HEADING
          ================================================= */}

          <h1 className="text-2xl sm:text-3xl font-medium mb-5">My bookings</h1>

          {/* =================================================
              TABS
          ================================================= */}

          <div className="inline-flex p-0.5 bg-[#2b231e] rounded-md mb-5">
            {/* UPCOMING */}

            <button
              type="button"
              onClick={() => setActiveTab("upcoming")}
              className={`
                px-3
                py-1
                text-[10px]
                rounded
                transition
                ${
                  activeTab === "upcoming"
                    ? "bg-[#17120f] text-white"
                    : "text-[#8f827a]"
                }
              `}
            >
              Upcoming
            </button>

            {/* PAST */}

            <button
              type="button"
              onClick={() => setActiveTab("past")}
              className={`
                px-3
                py-1
                text-[10px]
                rounded
                transition
                ${
                  activeTab === "past"
                    ? "bg-[#17120f] text-white"
                    : "text-[#8f827a]"
                }
              `}
            >
              Past
            </button>
          </div>

          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (
            <div className="flex flex-col items-center justify-center py-16 text-[#9e9188]">
              <Loader2 size={25} className="animate-spin mb-3" />

              <p className="text-xs">Loading {activeTab} bookings...</p>
            </div>
          )}

          {/* =================================================
              ERROR
          ================================================= */}

          {!loading && error && (
            <div className="border border-[#693636] bg-[#351f1f] text-red-400 rounded-lg p-4 text-xs">
              {error}
            </div>
          )}

          {/* =================================================
              EMPTY
          ================================================= */}

          {!loading && !error && bookings.length === 0 && (
            <div className="border border-[#463b34] bg-[#241d18] rounded-lg p-10 text-center">
              <p className="text-sm text-[#9e9188]">
                {activeTab === "upcoming"
                  ? "You don't have any upcoming bookings."
                  : "You don't have any past bookings."}
              </p>

              {activeTab === "upcoming" && (
                <p className="text-xs text-[#675b54] mt-2">
                  Create a booking to see it here.
                </p>
              )}
            </div>
          )}

          {/* =================================================
              BOOKING CARDS
          ================================================= */}

          {!loading && !error && bookings.length > 0 && (
            <div className="space-y-3">
              {bookings.map((booking) => {
                const paidAmount = Number(booking.paidAmount || 0);

                const paymentPercentage = getPaymentPercentage(booking);

                return (
                  <div
                    key={booking.id}
                    className="border border-[#463b34] bg-[#241d18] rounded-lg p-4 sm:p-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_150px] gap-5">
                      {/* =================================
                              LEFT
                          ================================= */}

                      <div className="w-full min-w-0">
                        {/* ==================================================
      TITLE + STATUS
  ================================================== */}

                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="text-xl font-medium text-white break-words">
                            {booking.title}
                          </h2>

                          <span
                            className={`
        inline-flex
        items-center
        px-3
        py-1
        rounded
        text-[10px]
        border
        capitalize
        shrink-0
        ${getStatusClass(booking.status)}
      `}
                          >
                            {booking.status}
                          </span>
                        </div>

                        {/* ==================================================
                        DATE + GUESTS + BOOKING ID
                        ================================================== */}

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-[14px] text-[#9e9188]">
                          {/* DATE */}

                          <div className="flex items-center gap-1.5 min-w-0">
                            <CalendarDays size={13} className="shrink-0" />

                            <span className="truncate">
                              {formatDate(booking.bookingDate)}
                              {" · "}
                              {formatSlot(booking.slot)}
                            </span>
                          </div>

                          {/* GUESTS */}

                          <div className="flex items-center gap-1.5 min-w-0">
                            <MapPin size={13} className="shrink-0" />

                            <span>guests {booking.guests} </span>
                          </div>

                          {/* BOOKING ID */}

                          <div className="min-w-0">
                            <span className="break-words">
                              Booking {booking.bookingId}
                            </span>
                          </div>
                        </div>

                        {/* ==================================================
      CUSTOMER / EVENT DETAILS
  ================================================== */}

                        <div className="mt-5 border-t border-[#3a2f29] pt-4">
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-4">
                            {/* =================================================
          PACKAGE
      ================================================= */}

                            <div className="min-w-0">
                              <p className="text-[11px] text-[#675b54]">
                                Package
                              </p>

                              <p className="text-xs text-[#a89b93] mt-1 break-words">
                                {booking.packageName}
                              </p>
                            </div>

                            {/* =================================================
          OCCASION
      ================================================= */}

                            <div className="min-w-0">
                              <p className="text-[11px] text-[#675b54]">
                                Occasion
                              </p>

                              <p className="text-xs text-[#a89b93] mt-1 break-words">
                                {booking.occasion}
                              </p>
                            </div>

                            {/* =================================================
          CUSTOMER NAME
      ================================================= */}

                            <div className="min-w-0">
                              <p className="text-[11px] text-[#675b54]">
                                Customer Name
                              </p>

                              <p className="text-xs text-[#a89b93] mt-1 break-words">
                                {booking.customerName}
                              </p>
                            </div>

                            {/* =================================================
          MOBILE
      ================================================= */}

                            <div className="min-w-0">
                              <p className="text-[11px] text-[#675b54]">
                                Mobile Number
                              </p>

                              <p className="text-xs text-[#a89b93] mt-1 break-words">
                                {booking.customerMobile}
                              </p>
                            </div>

                            {/* =================================================
          EMAIL
      ================================================= */}

                            <div className="min-w-0">
                              <p className="text-[11px] text-[#675b54]">
                                Email
                              </p>

                              <p className="text-xs text-[#a89b93] mt-1 break-all">
                                {booking.customerEmail}
                              </p>
                            </div>

                            {/* =================================================
          ADDRESS
      ================================================= */}

                            <div className="col-span-2 lg:col-span-3 min-w-0">
                              <p className="text-[11px] text-[#675b54]">
                                Address
                              </p>

                              <p className="text-xs text-[#a89b93] mt-1 break-words leading-5">
                                {booking.customerAddress}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* =================================
                              RIGHT
                          ================================= */}

                      <div className="sm:border-l sm:border-[#3b322c] sm:pl-4">
                        {/* TOTAL */}

                        <div className="flex justify-between sm:block text-[14px]">
                          <span className="text-[#9e9188]">Total</span>

                          <span className="sm:block sm:mt-1 text-white">
                            {formatCurrency(booking.totalAmount)}
                          </span>
                        </div>

                        {/* PAID */}

                        <div className="flex justify-between sm:block mt-1 text-[14px]">
                          <span className="text-[#9e9188]">Paid</span>

                          <span className="sm:block sm:mt-1 text-[#55a966]">
                            {formatCurrency(paidAmount)}
                          </span>
                        </div>

                        {/* PROGRESS */}

                        <div className="w-full h-1 bg-[#352c26] rounded-full mt-3 overflow-hidden">
                          <div
                            className="h-full bg-[#d8a849] transition-all"
                            style={{
                              width: `${paymentPercentage}%`,
                            }}
                          />
                        </div>

                        {/* CONTACT */}

                        <button
                          type="button"
                          onClick={()=>navigate("/contact")}
                          className="w-full mt-3 py-2 border border-[#51463e] rounded text-[11px] text-white hover:bg-[#302721] transition"
                        >
                          Contact coordinator
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Bookings;



