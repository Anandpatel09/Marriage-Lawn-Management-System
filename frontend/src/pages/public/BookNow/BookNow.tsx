// import { Loader2 } from "lucide-react";
// import { useEffect, useState } from "react";

// import Navbar from "../../../components/comman/Navbar";
// import Footer from "../../../components/comman/Footer";
// import BookingCalendar from "./BookingCalender";

// import axiosInstance from "../../../api/axios";
// import { API } from "../../../api/api-constant";
// import { useAuth } from "../../../context/AuthContext";

// // =====================================================
// // TYPES
// // =====================================================

// interface Venue {
//   id: number;
//   name: string;
//   description?: string;
//   capacity: number;
// }

// interface Package {
//   id: number;
//   name: string;
//   description?: string;
//   base_price: number;
//   included_guests: number;
//   extra_guest_price: number;
// }

// interface AvailabilityItem {
//   booking_date: string;
//   slot: "full-day";
//   status: "pending" | "confirmed" | "cancelled" | "completed";
// }

// interface AvailabilityMap {
//   [date: string]: {
//     available: boolean;
//     status?: string;
//   };
// }

// // =====================================================
// // COMPONENT
// // =====================================================

// const BookNow = () => {
//   const { user, isAuthenticated } = useAuth();

//   // ===================================================
//   // DATE
//   // ===================================================

//   const today = new Date();

//   const [currentMonth, setCurrentMonth] = useState(
//     new Date(today.getFullYear(), today.getMonth(), 1),
//   );

//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);

//   // ===================================================
//   // VENUES
//   // ===================================================

//   const [venues, setVenues] = useState<Venue[]>([]);

//   const [loadingVenues, setLoadingVenues] = useState(false);

//   const [venueId, setVenueId] = useState<number | null>(null);

//   // ===================================================
//   // PACKAGES
//   // ===================================================

//   const [packages, setPackages] = useState<Package[]>([]);

//   const [loadingPackages, setLoadingPackages] = useState(false);

//   const [packageId, setPackageId] = useState<number | null>(null);

//   const [loadingBooking, setLoadingBooking] = useState<boolean>(false);

//   // ===================================================
//   // BOOKING DETAILS
//   // ===================================================

//   const [occasion, setOccasion] = useState("Wedding");

//   const [guests, setGuests] = useState(300);

//   const [requests, setRequests] = useState("");

//   const [address, setAddress] = useState("");

//   // ===================================================
//   // CUSTOMER INFORMATION
//   // ===================================================

//   const [customerName, setCustomerName] = useState("");

//   const [customerMobile, setCustomerMobile] = useState("");

//   const [customerEmail, setCustomerEmail] = useState("");

//   // ===================================================
//   // AVAILABILITY
//   // ===================================================

//   const [availability, setAvailability] = useState<AvailabilityMap>({});

//   const [loadingAvailability, setLoadingAvailability] = useState(false);

//   // ===================================================
//   // BOOKING STATE
//   // ===================================================

//   const [bookingLoading, setBookingLoading] = useState(false);

//   const [successMessage, setSuccessMessage] = useState("");

//   const [errorMessage, setErrorMessage] = useState("");

//   // ===================================================
//   // FETCH VENUES
//   // ===================================================

//   const fetchVenues = async () => {
//     try {
//       setLoadingVenues(true);

//       const response = await axiosInstance.get(API.VENUE.GET_ALL);

//       const venueData = response.data.venues || [];

//       setVenues(venueData);

//       if (venueData.length > 0) {
//         setVenueId(venueData[0].id);
//       }
//     } catch (error) {
//       console.error("Venue API error:", error);

//       setErrorMessage("Failed to load marriage lawns.");
//     } finally {
//       setLoadingVenues(false);
//     }
//   };

//   // ===================================================
//   // FETCH PACKAGES
//   // ===================================================

//   const fetchPackages = async () => {
//     try {
//       setLoadingPackages(true);

//       const response = await axiosInstance.get(API.PACKAGE.GET_ALL);

//       const packageData = response.data.packages || [];

//       setPackages(packageData);

//       if (packageData.length > 0) {
//         setPackageId(packageData[0].id);
//       }
//     } catch (error) {
//       console.error("Package API error:", error);

//       setErrorMessage("Failed to load packages.");
//     } finally {
//       setLoadingPackages(false);
//     }
//     console.log("kmekfme ewkewfkewkmew======",packages)
//   };


//   // ===================================================
//   // FETCH AVAILABILITY
//   // ===================================================

//   const fetchAvailability = async () => {
//     if (!venueId) {
//       setAvailability({});
//       return;
//     }

//     try {
//       setLoadingAvailability(true);

//       const response = await axiosInstance.get(API.AVAILABILITY.GET, {
//         params: {
//           venueId,
//           month: currentMonth.getMonth() + 1,
//           year: currentMonth.getFullYear(),
//         },
//       });

//       const bookings: AvailabilityItem[] = response.data.bookings || [];

//       const map: AvailabilityMap = {};

//       bookings.forEach((booking) => {
//         map[booking.booking_date] = {
//           available: false,
//           status: booking.status,
//         };
//       });

//       setAvailability(map);
//     } catch (error) {
//       console.error("Availability API error:", error);

//       setAvailability({});
//     } finally {
//       setLoadingAvailability(false);
//     }
//   };

//   // ===================================================
//   // INITIAL API CALLS
//   // ===================================================

//   useEffect(() => {
//     fetchVenues();
//     fetchPackages();
//   }, []);

//   // ===================================================
//   // FETCH AVAILABILITY
//   // ===================================================

//   useEffect(() => {
//     fetchAvailability();
//   }, [currentMonth, venueId]);


//   // ===================================================
//   // SELECTED PACKAGE
//   // ===================================================

//   const selectedPackage = packages.find((pkg) => pkg.id === packageId);
//   console.log("nninininiu====", selectedPackage)

//   // ===================================================
//   // PRICE CALCULATION
//   // ===================================================

//   const basePrice = selectedPackage?.base_price || 0;





//   const includedGuests = selectedPackage?.included_guests || 0;

//   const extraGuestPrice = selectedPackage?.extra_guest_price || 0;

//   const extraGuests = Math.max(0, guests - includedGuests);

//   const extraGuestAmount = extraGuests * extraGuestPrice;

//   const subtotal = basePrice + extraGuestAmount;

//   const gst = subtotal * 0.18;

//   const total = subtotal + gst;

//   // ===================================================
//   // DATE FORMAT
//   // ===================================================

//   const getDateKey = (date: Date) => {
//     const year = date.getFullYear();

//     const month = String(date.getMonth() + 1).padStart(2, "0");

//     const day = String(date.getDate()).padStart(2, "0");

//     return `${year}-${month}-${day}`;
//   };

//   // ===================================================
//   // CREATE BOOKING
//   // ===================================================

//  const handleBooking = async () => {
//   try {
//     setLoadingBooking(true);
//     setErrorMessage("");
//     setSuccessMessage("");

//     if (!isAuthenticated || !user) {
//       setErrorMessage("Please login before booking.");
//       return;
//     }

//     if (!selectedDate) {
//       setErrorMessage("Please select a date.");
//       return;
//     }

//     if (!venueId || !packageId) {
//       setErrorMessage("Please select venue and package.");
//       return;
//     }

//     const bookingDate = getDateKey(selectedDate);

//     await axiosInstance.post(API.BOOKING.CREATE, {
//       venueId,
//       packageId,
//       occasion,
//       bookingDate,
//       guests,
//       specialRequests: requests,
//     });

//     setSuccessMessage("Booking request submitted successfully!");

//     // Refresh availability immediately
//     await fetchAvailability();

//     // Clear selected date if you want
//     setSelectedDate(null);

//     setRequests("");

//   } catch (error: any) {
//     setErrorMessage(
//       error?.response?.data?.message || "Failed to create booking."
//     );
//   } finally {
//     setLoadingBooking(false);
//   }
// };

//   // =====================================================
//   // RENDER
//   // =====================================================

//   return (
//     <div className="min-h-screen bg-[#17120f] text-white">
//       <Navbar />

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         {/* ==========================================
//             PAGE HEADING
//         ========================================== */}

//         <div className="mb-8">
//           <h1 className="text-3xl sm:text-4xl font-semibold">
//             Book Your Special Day
//           </h1>

//           <p className="text-[#9e9188] mt-2 text-sm">
//             Select your preferred date, lawn and package.
//           </p>
//         </div>

//         {/* ==========================================
//             MAIN GRID
//         ========================================== */}

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* ========================================
//               LEFT SIDE
//           ======================================== */}

//           <div className="lg:col-span-2 space-y-6">
//             {/* ======================================
//                 CALENDAR + BOOKING DETAILS COMPONENT
//             ====================================== */}

//             <BookingCalendar
//               currentMonth={currentMonth}
//               selectedDate={selectedDate}
//               availability={availability}
//               loadingAvailability={loadingAvailability}
//               onMonthChange={(date: Date) => {
//                 setCurrentMonth(date);
//                 setSelectedDate(null);
//               }}
//               onDateSelect={(date: Date) => {
//                 setSelectedDate(date);

//                 setSuccessMessage("");

//                 setErrorMessage("");
//               }}
//             />

//             {/* ======================================
//                 BOOKING FORM
//             ====================================== */}

//             <div className="bg-[#2b211c] border border-[#3a2f29] rounded-xl p-5">
//               <h2 className="text-lg font-medium mb-5">Event Information</h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 {/* VENUE */}

//                 <div>
//                   <label className="block text-xs text-[#a39790] mb-2">
//                     Marriage Lawn
//                   </label>

//                   <select
//                     value={venueId ?? ""}
//                     onChange={(e) => {
//                       const value = Number(e.target.value);

//                       setVenueId(value);

//                       setSelectedDate(null);
//                     }}
//                     disabled={loadingVenues}
//                     className="w-full bg-[#201813] border border-[#4b4039] rounded-lg px-3 py-3 text-sm outline-none focus:border-[#d8a849]"
//                   >
//                     {loadingVenues ? (
//                       <option>Loading lawns...</option>
//                     ) : (
//                       venues.map((venue) => (
//                         <option key={venue.id} value={venue.id}>
//                           {venue.name}
//                         </option>
//                       ))
//                     )}
//                   </select>
//                 </div>

//                 {/* PACKAGE */}

//                 <div>
//                   <label className="block text-xs text-[#a39790] mb-2">
//                     Package
//                   </label>

//                   <select
//                     value={packageId ?? ""}
//                     onChange={(e) => setPackageId(Number(e.target.value))}
//                     disabled={loadingPackages}
//                     className="w-full bg-[#201813] border border-[#4b4039] rounded-lg px-3 py-3 text-sm outline-none focus:border-[#d8a849]"
//                   >
//                     {loadingPackages ? (
//                       <option>Loading packages...</option>
//                     ) : (
//                       packages.map((pkg) => (
//                         <option key={pkg.id} value={pkg.id}>
//                           {pkg.name}
//                         </option>
//                       ))
//                     )}
//                   </select>
//                 </div>

//                 {/* OCCASION */}

//                 <div>
//                   <label className="block text-xs text-[#a39790] mb-2">
//                     Occasion
//                   </label>

//                   <select
//                     value={occasion}
//                     onChange={(e) => setOccasion(e.target.value)}
//                     className="w-full bg-[#201813] border border-[#4b4039] rounded-lg px-3 py-3 text-sm outline-none focus:border-[#d8a849]"
//                   >
//                     <option value="Wedding">Wedding</option>

//                     <option value="Engagement">Engagement</option>

//                     <option value="Reception">Reception</option>

//                     <option value="Birthday">Birthday</option>

//                     <option value="Anniversary">Anniversary</option>

//                     <option value="Haldi Ceremony">Haldi Ceremony</option>

//                     <option value="Mehndi Ceremony">Mehndi Ceremony</option>

//                     <option value="Sangeet Ceremony">Sangeet Ceremony</option>

//                     <option value="Roka Ceremony">Roka Ceremony</option>

//                     <option value="Tilak Ceremony">Tilak Ceremony</option>

//                     <option value="Ring Ceremony">Ring Ceremony</option>

//                     <option value="Cocktail Party">Cocktail Party</option>

//                     <option value="Baby Shower">Baby Shower</option>

//                     <option value="Naming Ceremony">Naming Ceremony</option>

//                     <option value="Retirement Party">Retirement Party</option>

//                     <option value="Farewell Party">Farewell Party</option>

//                     <option value="Kitty Party">Kitty Party</option>

//                     <option value="Corporate Event">Corporate Event</option>

//                     <option value="Business Meeting">Business Meeting</option>

//                     <option value="Conference">Conference</option>

//                     <option value="Product Launch">Product Launch</option>

//                     <option value="Award Ceremony">Award Ceremony</option>

//                     <option value="Cultural Event">Cultural Event</option>

//                     <option value="Religious Ceremony">
//                       Religious Ceremony
//                     </option>

//                     <option value="Family Function">Family Function</option>

//                     <option value="Social Gathering">Social Gathering</option>

//                     <option value="Festival Celebration">
//                       Festival Celebration
//                     </option>

//                     <option value="Golden Jubilee">Golden Jubilee</option>

//                     <option value="Silver Jubilee">Silver Jubilee</option>

//                     <option value="Graduation Party">Graduation Party</option>

//                     <option value="Reunion">Reunion</option>

//                     <option value="Other">Other</option>
//                   </select>
//                 </div>

//                 {/* GUESTS */}

//                 <div>
//                   <label className="block text-xs text-[#a39790] mb-2">
//                     Number of Guests
//                   </label>

//                   <input
//                     type="number"
//                     min="1"
//                     value={guests}
//                     onChange={(e) => setGuests(Number(e.target.value))}
//                     className="w-full bg-[#201813] border border-[#4b4039] rounded-lg px-3 py-3 text-sm outline-none focus:border-[#d8a849]"
//                   />
//                 </div>
//               </div>

//               {/* ====================================
//                   CUSTOMER INFORMATION
//               ==================================== */}

//               <div className="mt-6 pt-6 border-t border-[#3a2f29]">
//                 <h3 className="text-sm font-medium mb-4">
//                   Customer Information
//                 </h3>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   {/* NAME */}

//                   <div>
//                     <label className="block text-xs text-[#a39790] mb-2">
//                       Name
//                     </label>

//                     <input
//                       type="text"
//                       value={customerName}
//                       onChange={(e) => setCustomerName(e.target.value)}
//                       placeholder="Your name"
//                       className="w-full bg-[#201813] border border-[#3d332c] rounded-lg px-3 py-3 text-sm outline-none focus:border-[#d8a849] placeholder:text-[#625850]"
//                     />
//                   </div>

//                   {/* MOBILE */}

//                   <div>
//                     <label className="block text-xs text-[#a39790] mb-2">
//                       Mobile <span className="text-red-600">*</span>
//                     </label>

//                     <input
//                       type="tel"
//                       required
//                       value={customerMobile}
//                       onChange={(e) => setCustomerMobile(e.target.value)}
//                       placeholder="Mobile number"
//                       className="w-full bg-[#201813] border border-[#3d332c] rounded-lg px-3 py-3 text-sm outline-none focus:border-[#d8a849] placeholder:text-[#625850]"
//                     />
//                   </div>

//                   {/* EMAIL */}

//                   <div>
//                     <label className="block text-xs text-[#a39790] mb-2">
//                       Email 
//                     </label>

//                     <input
//                       type="email"
//                       value={customerEmail}
//                       onChange={(e) => setCustomerEmail(e.target.value)}
//                       placeholder="Email address"
//                       className="w-full bg-[#201813] border border-[#3d332c] rounded-lg px-3 py-3 text-sm outline-none focus:border-[#d8a849] placeholder:text-[#625850]"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* ====================================
//                   ADDRESS
//               ==================================== */}

//               <div className="mt-6">
//                 <label className="block text-xs text-[#a39790] mb-2">
//                   Enter Your Complete Address  <span className="text-red-600">*</span>
//                 </label>

//                 <textarea
//                   rows={3}
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                   placeholder="Enter your complete address..."
//                   className="w-full bg-[#201813] border border-[#4b4039] rounded-lg px-3 py-3 text-sm outline-none focus:border-[#d8a849] resize-none placeholder:text-[#625850]"
//                 />
//               </div>

//               {/* ====================================
//                   SPECIAL REQUESTS
//               ==================================== */}

//               <div className="mt-6">
//                 <label className="block text-xs text-[#a39790] mb-2">
//                   Special Requests
//                 </label>

//                 <textarea
//                   rows={4}
//                   value={requests}
//                   required
//                   onChange={(e) => setRequests(e.target.value)}
//                   placeholder="Decoration, catering, parking, special arrangements..."
//                   className="w-full bg-[#201813] border border-[#4b4039] rounded-lg px-3 py-3 text-sm outline-none focus:border-[#d8a849] resize-none placeholder:text-[#625850]"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* ========================================
//               RIGHT SIDE - SUMMARY
//           ======================================== */}

//           <div>
//             <div className="lg:sticky lg:top-24 bg-[#2b211c] border border-[#3a2f29] rounded-xl p-5">
//               <h2 className="text-lg font-medium mb-5">Booking Summary</h2>

//               <div className="space-y-4">
//                 {/* DATE */}

//                 <div>
//                   <p className="text-xs text-[#81756d]">Selected Date</p>

//                   <p className="text-sm mt-1">
//                     {selectedDate
//                       ? selectedDate.toLocaleDateString("en-IN", {
//                         day: "2-digit",
//                         month: "short",
//                         year: "numeric",
//                       })
//                       : "Select a date"}
//                   </p>
//                 </div>

//                 {/* VENUE */}

//                 <div>
//                   <p className="text-xs text-[#81756d]">Lawn</p>

//                   <p className="text-sm mt-1">
//                     {venues.find((v) => v.id === venueId)?.name ||
//                       "Select lawn"}
//                   </p>
//                 </div>

//                 {/* PACKAGE */}

//                 <div>
//                   <p className="text-xs text-[#81756d]">Package</p>

//                   <p className="text-sm mt-1">
//                     {selectedPackage?.name || "Select package"}
//                   </p>
//                 </div>

//                 {/* OCCASION */}

//                 <div>
//                   <p className="text-xs text-[#81756d]">Occasion</p>

//                   <p className="text-sm mt-1">{occasion}</p>
//                 </div>

//                 {/* GUESTS */}

//                 <div>
//                   <p className="text-xs text-[#81756d]">Guests</p>

//                   <p className="text-sm mt-1">{guests}</p>
//                 </div>

//                 {/* AVAILABILITY */}

//                 <div className="bg-[#22271f] rounded-lg p-3">
//                   {selectedDate ? (
//                     availability[getDateKey(selectedDate)]?.available ===
//                       false ? (
//                       <div className="flex items-center gap-2">
//                         <span className="w-2 h-2 rounded-full bg-red-500" />

//                         <span className="text-xs text-red-400">
//                           Selected date is unavailable
//                         </span>
//                       </div>
//                     ) : (
//                       <div className="flex items-center gap-2">
//                         <span className="w-2 h-2 rounded-full bg-[#62a86c]" />

//                         <span className="text-xs text-[#76ab7b]">
//                           This date is available
//                         </span>
//                       </div>
//                     )
//                   ) : (
//                     <span className="text-xs text-[#8b7e76]">
//                       Select a date to check availability
//                     </span>
//                   )}
//                 </div>

//                 {/* PRICE */}

//                 <div className="border-t border-[#3a2f29] pt-4 space-y-3">
//                   {/* BASE */}

//                   <div className="flex items-center justify-between">
//                     <span className="text-xs text-[#968980]">Base package</span>

//                     <span className="text-sm">
//                       ₹{basePrice.toLocaleString("en-IN")}
//                     </span>
//                   </div>

//                   {/* EXTRA GUESTS */}

//                   <div className="flex items-center justify-between">
//                     <span className="text-xs text-[#968980]">Extra guests</span>

//                     <span className="text-sm">
//                       ₹{extraGuestAmount.toLocaleString("en-IN")}
//                     </span>
//                   </div>

//                   {/* SUBTOTAL */}

//                   <div className="flex items-center justify-between">
//                     <span className="text-xs text-[#968980]">Subtotal</span>

//                     <span className="text-sm">
//                       ₹{subtotal.toLocaleString("en-IN")}
//                     </span>
//                   </div>

//                   {/* GST */}

//                   <div className="flex items-center justify-between">
//                     <span className="text-xs text-[#968980]">GST (18%)</span>

//                     <span className="text-sm">
//                       ₹
//                       {gst.toLocaleString("en-IN", {
//                         maximumFractionDigits: 0,
//                       })}
//                     </span>
//                   </div>

//                   {/* TOTAL */}

//                   <div className="flex items-center justify-between pt-2">
//                     <span className="text-sm font-medium">Total</span>

//                     <span className="text-xl font-semibold text-[#d8a849]">
//                       ₹
//                       {total.toLocaleString("en-IN", {
//                         maximumFractionDigits: 0,
//                       })}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* SUCCESS */}

//               {successMessage && (
//                 <div className="mt-5 bg-[#1f3224] border border-[#315d39] text-[#7bc182] rounded-lg p-3 text-xs">
//                   {successMessage}
//                 </div>
//               )}

//               {/* ERROR */}

//               {errorMessage && (
//                 <div className="mt-5 bg-[#351f1f] border border-[#623333] text-red-400 rounded-lg p-3 text-xs">
//                   {errorMessage}
//                 </div>
//               )}

//               {/* BOOKING BUTTON */}

//               <button
//                 type="button"
//                 onClick={handleBooking}
//                 disabled={
//                   bookingLoading ||
//                   !selectedDate ||
//                   !venueId ||
//                   !packageId ||
//                   !isAuthenticated
//                 }
//                 className="w-full mt-5 py-3 bg-[#d8a849] hover:bg-[#c99a3d] disabled:bg-[#594c37] disabled:text-[#887b69] disabled:cursor-not-allowed text-black text-sm font-medium rounded-lg transition flex items-center justify-center gap-2"
//               >
//                 {bookingLoading ? (
//                   <>
//                     <Loader2 size={16} className="animate-spin" />
//                     Sending...
//                   </>
//                 ) : (
//                   "Request Booking"
//                 )}
//               </button>

//               <p className="text-[10px] text-[#71655d] text-center mt-3">
//                 Final booking confirmation will be done by the admin.
//               </p>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default BookNow;



import { Loader2 } from "lucide-react";
import {
  useEffect,
  useState,
} from "react";

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

  // MySQL DECIMAL can arrive as string,
  // so we convert it with Number() before calculation.
  base_price: number | string;
  included_guests: number | string;
  extra_guest_price: number | string;
}

interface AvailabilityItem {
  booking_date: string;
  slot: "full-day";
  status:
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";
}

interface AvailabilityMap {
  [date: string]: {
    available: boolean;
    status?: string;
  };
}

// =====================================================
// COMPONENT
// =====================================================

const BookNow = () => {
  const {
    user,
    isAuthenticated,
  } = useAuth();

  // ===================================================
  // DATE
  // ===================================================

  const today = new Date();

  const [
    currentMonth,
    setCurrentMonth,
  ] = useState(
    new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    )
  );

  const [
    selectedDate,
    setSelectedDate,
  ] = useState<Date | null>(
    null
  );

  // ===================================================
  // VENUES
  // ===================================================

  const [
    venues,
    setVenues,
  ] = useState<Venue[]>([]);

  const [
    loadingVenues,
    setLoadingVenues,
  ] = useState(false);

  const [
    venueId,
    setVenueId,
  ] = useState<number | null>(
    null
  );

  // ===================================================
  // PACKAGES
  // ===================================================

  const [
    packages,
    setPackages,
  ] = useState<Package[]>([]);

  const [
    loadingPackages,
    setLoadingPackages,
  ] = useState(false);

  const [
    packageId,
    setPackageId,
  ] = useState<number | null>(
    null
  );

  // ===================================================
  // BOOKING DETAILS
  // ===================================================

  const [
    occasion,
    setOccasion,
  ] = useState("Wedding");

  const [
    guests,
    setGuests,
  ] = useState(300);

  const [
    requests,
    setRequests,
  ] = useState("");

  const [
    address,
    setAddress,
  ] = useState("");

  // ===================================================
  // CUSTOMER INFORMATION
  // ===================================================

  const [
    customerName,
    setCustomerName,
  ] = useState("");

  const [
    customerMobile,
    setCustomerMobile,
  ] = useState("");

  const [
    customerEmail,
    setCustomerEmail,
  ] = useState("");

  // ===================================================
  // AVAILABILITY
  // ===================================================

  const [
    availability,
    setAvailability,
  ] = useState<AvailabilityMap>(
    {}
  );

  const [
    loadingAvailability,
    setLoadingAvailability,
  ] = useState(false);

  // ===================================================
  // BOOKING STATE
  // ===================================================

  const [
    bookingLoading,
    setBookingLoading,
  ] = useState(false);

  const [
    successMessage,
    setSuccessMessage,
  ] = useState("");

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  // ===================================================
  // LOAD CUSTOMER DATA
  // ===================================================

  useEffect(() => {
    if (!user) {
      setCustomerName("");
      setCustomerMobile("");
      setCustomerEmail("");

      return;
    }

    setCustomerName(
      `${user.first_name} ${user.last_name}`.trim()
    );

    setCustomerMobile(
      user.mobile || ""
    );

    setCustomerEmail(
      user.email || ""
    );

    // Use city as an initial value only.
    // User can replace it with complete address.
    if (!address) {
      setAddress(user.city || "");
    }
  }, [user]);

  // ===================================================
  // FETCH VENUES
  // ===================================================

  const fetchVenues = async () => {
    try {
      setLoadingVenues(true);

      const response =
        await axiosInstance.get(
          API.VENUE.GET_ALL
        );

      const venueData =
        response.data.venues || [];

      setVenues(
        venueData
      );

      if (
        venueData.length > 0
      ) {
        setVenueId(
          venueData[0].id
        );
      }
    } catch (error) {
      console.error(
        "Venue API error:",
        error
      );

      setErrorMessage(
        "Failed to load marriage lawns."
      );
    } finally {
      setLoadingVenues(
        false
      );
    }
  };

  // ===================================================
  // FETCH PACKAGES
  // ===================================================

  const fetchPackages =
    async () => {
      try {
        setLoadingPackages(
          true
        );

        const response =
          await axiosInstance.get(
            API.PACKAGE.GET_ALL
          );

        const packageData =
          response.data
            .packages || [];

        setPackages(
          packageData
        );

        if (
          packageData.length > 0
        ) {
          setPackageId(
            packageData[0].id
          );
        }
      } catch (error) {
        console.error(
          "Package API error:",
          error
        );

        setErrorMessage(
          "Failed to load packages."
        );
      } finally {
        setLoadingPackages(
          false
        );
      }
    };

  // ===================================================
  // FETCH AVAILABILITY
  // ===================================================

  const fetchAvailability =
    async () => {
      if (!venueId) {
        setAvailability(
          {}
        );

        return;
      }

      try {
        setLoadingAvailability(
          true
        );

        const response =
          await axiosInstance.get(
            API.AVAILABILITY.GET,
            {
              params: {
                venueId,
                month:
                  currentMonth.getMonth() +
                  1,
                year:
                  currentMonth.getFullYear(),
              },
            }
          );

        const bookings: AvailabilityItem[] =
          response.data.bookings ||
          [];

        const map: AvailabilityMap =
          {};

        bookings.forEach(
          (booking) => {
            map[
              booking.booking_date
            ] = {
              available: false,
              status:
                booking.status,
            };
          }
        );

        setAvailability(
          map
        );
      } catch (error) {
        console.error(
          "Availability API error:",
          error
        );

        setAvailability(
          {}
        );
      } finally {
        setLoadingAvailability(
          false
        );
      }
    };

  // ===================================================
  // INITIAL API CALLS
  // ===================================================

  useEffect(() => {
    fetchVenues();
    fetchPackages();
  }, []);

  // ===================================================
  // AVAILABILITY API
  // Runs when month/year OR venue changes
  // ===================================================

  useEffect(() => {
    fetchAvailability();
  }, [
    currentMonth,
    venueId,
  ]);

  // ===================================================
  // SELECTED PACKAGE
  // ===================================================

  const selectedPackage =
    packages.find(
      (pkg) =>
        pkg.id === packageId
    );

  // ===================================================
  // PRICE CALCULATION
  // ===================================================
  // Convert MySQL DECIMAL values to Number().
  // This prevents string concatenation such as:
  // 125000.00022500
  // ===================================================

  const basePrice = Number(
    selectedPackage?.base_price ??
    0
  );

  const includedGuests =
    Number(
      selectedPackage?.included_guests ??
      0
    );

  const extraGuestPrice =
    Number(
      selectedPackage?.extra_guest_price ??
      0
    );

  const extraGuests =
    Math.max(
      0,
      Number(guests) -
      includedGuests
    );

  const extraGuestAmount =
    extraGuests *
    extraGuestPrice;

  const subtotal =
    basePrice +
    extraGuestAmount;

  const gst = Number(
    (subtotal * 0.18).toFixed(2)
  );

  const total = Number(
    (
      subtotal + gst
    ).toFixed(2)
  );

  // ===================================================
  // CURRENCY FORMAT
  // ===================================================

  const formatCurrency = (
    amount: number
  ) => {
    return `₹${Number(
      amount
    ).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  };

  // ===================================================
  // DATE FORMAT
  // ===================================================

  const getDateKey = (
    date: Date
  ) => {
    const year =
      date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // ===================================================
  // CREATE BOOKING
  // ===================================================

  const handleBooking =
    async () => {
      try {
        setBookingLoading(
          true
        );

        setErrorMessage("");
        setSuccessMessage("");

        // --------------------------------------------
        // LOGIN CHECK
        // --------------------------------------------

        if (
          !isAuthenticated ||
          !user
        ) {
          setErrorMessage(
            "Please login before booking."
          );

          return;
        }

        // --------------------------------------------
        // DATE CHECK
        // --------------------------------------------

        if (!selectedDate) {
          setErrorMessage(
            "Please select a date."
          );

          return;
        }

        // --------------------------------------------
        // VENUE / PACKAGE CHECK
        // --------------------------------------------

        if (
          !venueId ||
          !packageId
        ) {
          setErrorMessage(
            "Please select venue and package."
          );

          return;
        }

        // --------------------------------------------
        // OCCASION CHECK
        // --------------------------------------------

        if (
          !occasion.trim()
        ) {
          setErrorMessage(
            "Please select an occasion."
          );

          return;
        }

        // --------------------------------------------
        // GUEST CHECK
        // --------------------------------------------

        if (
          Number(guests) <= 0
        ) {
          setErrorMessage(
            "Please enter a valid number of guests."
          );

          return;
        }

        // --------------------------------------------
        // CUSTOMER CHECK
        // --------------------------------------------

        if (
          !customerName.trim()
        ) {
          setErrorMessage(
            "Please complete your name in your profile."
          );

          return;
        }

        if (
          !customerMobile.trim()
        ) {
          setErrorMessage(
            "Please add your mobile number to your profile."
          );

          return;
        }

        if (
          !customerEmail.trim()
        ) {
          setErrorMessage(
            "Please add your email to your profile."
          );

          return;
        }

        // --------------------------------------------
        // ADDRESS CHECK
        // --------------------------------------------

        if (
          !address.trim()
        ) {
          setErrorMessage(
            "Please enter your complete address."
          );

          return;
        }

        // --------------------------------------------
        // BOOKING DATE
        // --------------------------------------------

        const bookingDate =
          getDateKey(
            selectedDate
          );

        // --------------------------------------------
        // API REQUEST
        // --------------------------------------------

        const response =
          await axiosInstance.post(
            API.BOOKING.CREATE,
            {
              venueId,
              packageId,
              occasion,
              bookingDate,
              guests: Number(
                guests
              ),

              // Important:
              // backend stores this as customer_address
              customerAddress:
                address.trim(),

              specialRequests:
                requests.trim() ||
                null,
            }
          );

        console.log(
          "Booking response:",
          response.data
        );

        // --------------------------------------------
        // SUCCESS
        // --------------------------------------------

        setSuccessMessage(
          response.data.message ||
          "Booking request submitted successfully!"
        );

        // --------------------------------------------
        // REFRESH AVAILABILITY
        // --------------------------------------------

        await fetchAvailability();

        // --------------------------------------------
        // RESET
        // --------------------------------------------

        setSelectedDate(
          null
        );

        setRequests("");

      } catch (error: any) {
        console.error(
          "Booking error:",
          error
        );

        setErrorMessage(
          error?.response?.data
            ?.message ||
          "Failed to create booking."
        );
      } finally {
        setBookingLoading(
          false
        );
      }
    };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="min-h-screen bg-[#17120f] text-white">

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ==========================================
            PAGE HEADING
        ========================================== */}

        <div className="mb-8">

          <h1 className="text-3xl sm:text-4xl font-semibold">
            Book Your Special Day
          </h1>

          <p className="text-[#9e9188] mt-2 text-sm">
            Select your preferred
            date, lawn and package.
          </p>

        </div>

        {/* ==========================================
            MAIN GRID
        ========================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ========================================
              LEFT SIDE
          ======================================== */}

          <div className="lg:col-span-2 space-y-6">

            {/* ======================================
                CALENDAR
            ====================================== */}

            <BookingCalendar
              currentMonth={
                currentMonth
              }
              selectedDate={
                selectedDate
              }
              availability={
                availability
              }
              loadingAvailability={
                loadingAvailability
              }
              onMonthChange={(
                date: Date
              ) => {
                setCurrentMonth(
                  date
                );

                setSelectedDate(
                  null
                );

                setSuccessMessage(
                  ""
                );

                setErrorMessage(
                  ""
                );
              }}
              onDateSelect={(
                date: Date
              ) => {
                setSelectedDate(
                  date
                );

                setSuccessMessage(
                  ""
                );

                setErrorMessage(
                  ""
                );
              }}
            />

            {/* ======================================
                EVENT INFORMATION
            ====================================== */}

            <div className="bg-[#2b211c] border border-[#3a2f29] rounded-xl p-5">

              <h2 className="text-lg font-medium mb-5">
                Event Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* VENUE */}

                <div>

                  <label className="block text-xs text-[#a39790] mb-2">
                    Marriage Lawn
                  </label>

                  <select
                    value={
                      venueId ?? ""
                    }
                    onChange={(
                      e
                    ) => {
                      const value =
                        Number(
                          e.target
                            .value
                        );

                      setVenueId(
                        value
                      );

                      setSelectedDate(
                        null
                      );

                      setSuccessMessage(
                        ""
                      );

                      setErrorMessage(
                        ""
                      );
                    }}
                    disabled={
                      loadingVenues
                    }
                    className="w-full bg-[#201813] border border-[#4b4039] rounded-lg px-3 py-3 text-sm outline-none focus:border-[#d8a849]"
                  >

                    {loadingVenues ? (
                      <option>
                        Loading lawns...
                      </option>
                    ) : venues.length ===
                      0 ? (
                      <option value="">
                        No lawns available
                      </option>
                    ) : (
                      venues.map(
                        (
                          venue
                        ) => (
                          <option
                            key={
                              venue.id
                            }
                            value={
                              venue.id
                            }
                          >
                            {
                              venue.name
                            }
                          </option>
                        )
                      )
                    )}

                  </select>

                </div>

                {/* PACKAGE */}

                <div>

                  <label className="block text-xs text-[#a39790] mb-2">
                    Package
                  </label>

                  <select
                    value={
                      packageId ?? ""
                    }
                    onChange={(
                      e
                    ) =>
                      setPackageId(
                        Number(
                          e.target
                            .value
                        )
                      )
                    }
                    disabled={
                      loadingPackages
                    }
                    className="w-full bg-[#201813] border border-[#4b4039] rounded-lg px-3 py-3 text-sm outline-none focus:border-[#d8a849]"
                  >

                    {loadingPackages ? (
                      <option>
                        Loading packages...
                      </option>
                    ) : packages.length ===
                      0 ? (
                      <option value="">
                        No packages available
                      </option>
                    ) : (
                      packages.map(
                        (
                          pkg
                        ) => (
                          <option
                            key={
                              pkg.id
                            }
                            value={
                              pkg.id
                            }
                          >
                            {
                              pkg.name
                            }
                          </option>
                        )
                      )
                    )}

                  </select>

                </div>

                {/* OCCASION */}

                <div>

                  <label className="block text-xs text-[#a39790] mb-2">
                    Occasion
                  </label>

                  <select
                    value={
                      occasion
                    }
                    onChange={(
                      e
                    ) =>
                      setOccasion(
                        e.target
                          .value
                      )
                    }
                    className="w-full bg-[#201813] border border-[#4b4039] rounded-lg px-3 py-3 text-sm outline-none focus:border-[#d8a849]"
                  >

                    <option value="Wedding">
                      Wedding
                    </option>

                    <option value="Engagement">
                      Engagement
                    </option>

                    <option value="Reception">
                      Reception
                    </option>

                    <option value="Birthday">
                      Birthday
                    </option>

                    <option value="Anniversary">
                      Anniversary
                    </option>

                    <option value="Haldi Ceremony">
                      Haldi Ceremony
                    </option>

                    <option value="Mehndi Ceremony">
                      Mehndi Ceremony
                    </option>

                    <option value="Sangeet Ceremony">
                      Sangeet Ceremony
                    </option>

                    <option value="Roka Ceremony">
                      Roka Ceremony
                    </option>

                    <option value="Tilak Ceremony">
                      Tilak Ceremony
                    </option>

                    <option value="Ring Ceremony">
                      Ring Ceremony
                    </option>

                    <option value="Cocktail Party">
                      Cocktail Party
                    </option>

                    <option value="Baby Shower">
                      Baby Shower
                    </option>

                    <option value="Naming Ceremony">
                      Naming Ceremony
                    </option>

                    <option value="Retirement Party">
                      Retirement Party
                    </option>

                    <option value="Farewell Party">
                      Farewell Party
                    </option>

                    <option value="Kitty Party">
                      Kitty Party
                    </option>

                    <option value="Corporate Event">
                      Corporate Event
                    </option>

                    <option value="Business Meeting">
                      Business Meeting
                    </option>

                    <option value="Conference">
                      Conference
                    </option>

                    <option value="Product Launch">
                      Product Launch
                    </option>

                    <option value="Award Ceremony">
                      Award Ceremony
                    </option>

                    <option value="Cultural Event">
                      Cultural Event
                    </option>

                    <option value="Religious Ceremony">
                      Religious Ceremony
                    </option>

                    <option value="Family Function">
                      Family Function
                    </option>

                    <option value="Social Gathering">
                      Social Gathering
                    </option>

                    <option value="Festival Celebration">
                      Festival Celebration
                    </option>

                    <option value="Golden Jubilee">
                      Golden Jubilee
                    </option>

                    <option value="Silver Jubilee">
                      Silver Jubilee
                    </option>

                    <option value="Graduation Party">
                      Graduation Party
                    </option>

                    <option value="Reunion">
                      Reunion
                    </option>

                    <option value="Other">
                      Other
                    </option>

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
                    value={
                      guests
                    }
                    onChange={(
                      e
                    ) =>
                      setGuests(
                        Math.max(
                          1,
                          Number(
                            e.target
                              .value
                          )
                        )
                      )
                    }
                    className="w-full bg-[#201813] border border-[#4b4039] rounded-lg px-3 py-3 text-sm outline-none focus:border-[#d8a849]"
                  />

                </div>

              </div>

              {/* ====================================
                  CUSTOMER INFORMATION
              ==================================== */}

              <div className="mt-6 pt-6 border-t border-[#3a2f29]">

                <h3 className="text-sm font-medium mb-4">
                  Customer Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                  {/* NAME */}

                  <div>

                    <label className="block text-xs text-[#a39790] mb-2">
                      Name
                    </label>

                    <input
                      type="text"
                      value={
                        customerName
                      }
                      onChange={(
                        e
                      ) =>
                        setCustomerName(
                          e.target
                            .value
                        )
                      }
                      placeholder="Your name"
                      className="w-full bg-[#201813] border border-[#3d332c] rounded-lg px-3 py-3 text-sm outline-none focus:border-[#d8a849] placeholder:text-[#625850]"
                    />

                  </div>

                  {/* MOBILE */}

                  <div>

                    <label className="block text-xs text-[#a39790] mb-2">
                      Mobile{" "}
                      <span className="text-red-600">
                        *
                      </span>
                    </label>

                    <input
                      type="tel"
                      required
                      value={
                        customerMobile
                      }
                      onChange={(
                        e
                      ) =>
                        setCustomerMobile(
                          e.target
                            .value
                        )
                      }
                      placeholder="Mobile number"
                      className="w-full bg-[#201813] border border-[#3d332c] rounded-lg px-3 py-3 text-sm outline-none focus:border-[#d8a849] placeholder:text-[#625850]"
                    />

                  </div>

                  {/* EMAIL */}

                  <div>

                    <label className="block text-xs text-[#a39790] mb-2">
                      Email
                    </label>

                    <input
                      type="email"
                      value={
                        customerEmail
                      }
                      onChange={(
                        e
                      ) =>
                        setCustomerEmail(
                          e.target
                            .value
                        )
                      }
                      placeholder="Email address"
                      className="w-full bg-[#201813] border border-[#3d332c] rounded-lg px-3 py-3 text-sm outline-none focus:border-[#d8a849] placeholder:text-[#625850]"
                    />

                  </div>

                </div>

              </div>

              {/* ====================================
                  ADDRESS
              ==================================== */}

              <div className="mt-6">

                <label className="block text-xs text-[#a39790] mb-2">
                  Enter Your Complete
                  Address{" "}
                  <span className="text-red-600">
                    *
                  </span>
                </label>

                <textarea
                  rows={3}
                  value={
                    address
                  }
                  onChange={(
                    e
                  ) =>
                    setAddress(
                      e.target.value
                    )
                  }
                  placeholder="Enter your complete address..."
                  className="w-full bg-[#201813] border border-[#4b4039] rounded-lg px-3 py-3 text-sm outline-none focus:border-[#d8a849] resize-none placeholder:text-[#625850]"
                />

              </div>

              {/* ====================================
                  SPECIAL REQUESTS
              ==================================== */}

              <div className="mt-6">

                <label className="block text-xs text-[#a39790] mb-2">
                  Special Requests
                </label>

                <textarea
                  rows={4}
                  value={
                    requests
                  }
                  onChange={(
                    e
                  ) =>
                    setRequests(
                      e.target.value
                    )
                  }
                  placeholder="Decoration, catering, parking, special arrangements..."
                  className="w-full bg-[#201813] border border-[#4b4039] rounded-lg px-3 py-3 text-sm outline-none focus:border-[#d8a849] resize-none placeholder:text-[#625850]"
                />

              </div>

            </div>

          </div>

          {/* ========================================
              RIGHT SIDE - SUMMARY
          ======================================== */}

          <div>

            <div className="lg:sticky lg:top-24 bg-[#2b211c] border border-[#3a2f29] rounded-xl p-5">

              <h2 className="text-lg font-medium mb-5">
                Booking Summary
              </h2>

              <div className="space-y-4">

                {/* DATE */}

                <div>

                  <p className="text-xs text-[#81756d]">
                    Selected Date
                  </p>

                  <p className="text-sm mt-1">
                    {selectedDate
                      ? selectedDate.toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )
                      : "Select a date"}
                  </p>

                </div>

                {/* VENUE */}

                <div>

                  <p className="text-xs text-[#81756d]">
                    Lawn
                  </p>

                  <p className="text-sm mt-1">
                    {venues.find(
                      (v) =>
                        v.id ===
                        venueId
                    )?.name ||
                      "Select lawn"}
                  </p>

                </div>

                {/* PACKAGE */}

                <div>

                  <p className="text-xs text-[#81756d]">
                    Package
                  </p>

                  <p className="text-sm mt-1">
                    {selectedPackage
                      ?.name ||
                      "Select package"}
                  </p>

                </div>

                {/* OCCASION */}

                <div>

                  <p className="text-xs text-[#81756d]">
                    Occasion
                  </p>

                  <p className="text-sm mt-1">
                    {occasion}
                  </p>

                </div>

                {/* GUESTS */}

                <div>

                  <p className="text-xs text-[#81756d]">
                    Guests
                  </p>

                  <p className="text-sm mt-1">
                    {guests}
                  </p>

                </div>

                {/* AVAILABILITY */}

                <div className="bg-[#22271f] rounded-lg p-3">

                  {selectedDate ? (
                    availability[
                      getDateKey(
                        selectedDate
                      )
                    ]?.available ===
                      false ? (
                      <div className="flex items-center gap-2">

                        <span className="w-2 h-2 rounded-full bg-red-500" />

                        <span className="text-xs text-red-400">
                          Selected date
                          is unavailable
                        </span>

                      </div>
                    ) : (
                      <div className="flex items-center gap-2">

                        <span className="w-2 h-2 rounded-full bg-[#62a86c]" />

                        <span className="text-xs text-[#76ab7b]">
                          This date is
                          available
                        </span>

                      </div>
                    )
                  ) : (
                    <span className="text-xs text-[#8b7e76]">
                      Select a date to
                      check availability
                    </span>
                  )}

                </div>

                {/* PRICE */}

                <div className="border-t border-[#3a2f29] pt-4 space-y-3">

                  {/* BASE */}

                  <div className="flex items-center justify-between">

                    <span className="text-xs text-[#968980]">
                      Base package
                    </span>

                    <span className="text-sm">
                      {formatCurrency(
                        basePrice
                      )}
                    </span>

                  </div>

                  {/* EXTRA GUESTS */}

                  <div className="flex items-center justify-between">

                    <span className="text-xs text-[#968980]">
                      Extra guests
                    </span>

                    <span className="text-sm">
                      {formatCurrency(
                        extraGuestAmount
                      )}
                    </span>

                  </div>

                  {/* SUBTOTAL */}

                  <div className="flex items-center justify-between">

                    <span className="text-xs text-[#968980]">
                      Subtotal
                    </span>

                    <span className="text-sm">
                      {formatCurrency(
                        subtotal
                      )}
                    </span>

                  </div>

                  {/* GST */}

                  <div className="flex items-center justify-between">

                    <span className="text-xs text-[#968980]">
                      GST (18%)
                    </span>

                    <span className="text-sm">
                      {formatCurrency(
                        gst
                      )}
                    </span>

                  </div>

                  {/* TOTAL */}

                  <div className="flex items-center justify-between pt-2">

                    <span className="text-sm font-medium">
                      Total
                    </span>

                    <span className="text-xl font-semibold text-[#d8a849]">
                      {formatCurrency(
                        total
                      )}
                    </span>

                  </div>

                </div>

              </div>

              {/* ======================================
                  SUCCESS
              ====================================== */}

              {successMessage && (
                <div className="mt-5 bg-[#1f3224] border border-[#315d39] text-[#7bc182] rounded-lg p-3 text-xs">
                  {successMessage}
                </div>
              )}

              {/* ======================================
                  ERROR
              ====================================== */}

              {errorMessage && (
                <div className="mt-5 bg-[#351f1f] border border-[#623333] text-red-400 rounded-lg p-3 text-xs">
                  {errorMessage}
                </div>
              )}

              {/* ======================================
                  BOOKING BUTTON
              ====================================== */}

              <button
                type="button"
                onClick={
                  handleBooking
                }
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
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />

                    Sending...
                  </>
                ) : (
                  "Request Booking"
                )}

              </button>

              <p className="text-[10px] text-[#71655d] text-center mt-3">
                Final booking confirmation
                will be done by the admin.
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