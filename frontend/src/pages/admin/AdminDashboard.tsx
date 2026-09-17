// import {
//     Bell,
//     CalendarPlus,
//     Sun,
// } from "lucide-react";

// import DashboardCards from "./DashboardCards";
// import DashboardChart from "./DashboardChart";
// import DashboardBookingData from "./DashboardBookingData";
// import Occupancy from "./Occupancy";

// const AdminDashboard = () => {
//     return (
//         <div className="min-h-screen bg-[#17120f] text-white">

//             {/* ================= HEADER ================= */}
//             <header className="border-b border-[#332a25] bg-[#17120f]">
//                 <div className="px-4 sm:px-6 lg:px-7 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

//                     {/* Title */}
//                     <div>
//                         <h1 className="text-2xl sm:text-3xl font-serif text-white">
//                             Dashboard
//                         </h1>

//                         <p className="text-[#aaa19b] text-sm mt-1">
//                             Season overview · July 2026
//                         </p>
//                     </div>

//                     {/* Right side */}
//                     <div className="flex items-center justify-between sm:justify-end gap-3">

//                         <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#d8a849] text-black font-medium text-sm hover:bg-[#c99a3d] transition">
//                             <CalendarPlus size={17} />
//                             <span>New booking</span>
//                         </button>

//                         <button className="w-10 h-10 rounded-lg flex items-center justify-center text-[#c0b6af] hover:text-white hover:bg-[#2a211c] transition">
//                             <Sun size={19} />
//                         </button>

//                         <button className="w-10 h-10 rounded-lg flex items-center justify-center text-[#c0b6af] hover:text-white hover:bg-[#2a211c] transition">
//                             <Bell size={19} />
//                         </button>

//                         <button className="w-10 h-10 rounded-full bg-[#a94b3f] text-white font-medium">
//                             RC
//                         </button>
//                     </div>
//                 </div>
//             </header>

//             {/* ================= MAIN ================= */}
//             <main className="px-4 sm:px-6 lg:px-7 py-7">

//                 <DashboardCards />
//                 <DashboardChart />

//                 {/* ================= BOTTOM SUMMARY ================= */}
//                 <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-7">

//                     <DashboardBookingData />

//                     <Occupancy />

//                 </section>

//             </main>
//         </div>
//     );
// };

// export default AdminDashboard;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Bell,
    Calendar,
    CalendarDays,
    ChevronRight,
    Menu,
    Moon,
} from "lucide-react";

import AdminAside from "./adminAside";
import DashboardCards from "./DashboardCards";
import DashboardChart from "./DashboardChart";
import DashboardBookingData from "./DashboardBookingData";
import Occupancy from "./Occupancy";

// ==============================
// COMPONENT
// ==============================

const AdminDashboard = () => {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#17120f] text-white">
            {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}

            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/60 lg:hidden"
                />
            )}

            {/* =====================================================
          SIDEBAR
      ====================================================== */}
            <AdminAside />

            {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

            <div className="lg:ml-[270px] min-h-screen">
                {/* ===================================================
            TOP HEADER
        ==================================================== */}

                <header
                    className="
            sticky
            top-0
            z-30
            bg-[#17120f]/95
            backdrop-blur
            border-b
            border-[#332a25]
          "
                >
                    <div
                        className="
              min-h-[90px]
              px-4
              sm:px-6
              lg:px-7
              flex
              items-center
              justify-between
              gap-4
            "
                    >
                        {/* Left */}

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="
                  lg:hidden
                  w-10
                  h-10
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  text-[#c0b5ad]
                  hover:text-white
                  hover:bg-[#2a211c]
                "
                            >
                                <Menu size={22} />
                            </button>

                            <div>
                                <h2
                                    className="
                    text-2xl
                    sm:text-3xl
                    font-serif
                    text-white
                  "
                                >
                                    Dashboard
                                </h2>

                                <p className="text-[#a89b92] text-sm mt-1">
                                    Season overview · July 2026
                                </p>
                            </div>
                        </div>

                        {/* Right */}

                        <div className="flex items-center gap-2 sm:gap-3">
                            <button
                                onClick={() => navigate("/admin/bookings/new")}
                                className="
                  hidden
                  sm:flex
                  items-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-lg
                  bg-[#d8a849]
                  text-black
                  text-sm
                  font-medium
                  hover:bg-[#c99a3d]
                  transition
                "
                            >
                                <Calendar size={17} />
                                New booking
                            </button>

                            <button
                                className="
                  w-10
                  h-10
                  flex
                  items-center
                  justify-center
                  rounded-lg
                  text-[#c0b5ad]
                  hover:bg-[#2a211c]
                  hover:text-white
                "
                            >
                                <Moon size={19} />
                            </button>

                            <button
                                className="
                  w-10
                  h-10
                  flex
                  items-center
                  justify-center
                  rounded-lg
                  text-[#c0b5ad]
                  hover:bg-[#2a211c]
                  hover:text-white
                "
                            >
                                <Bell size={19} />
                            </button>

                            <div
                                className="
                  w-10
                  h-10
                  rounded-full
                  bg-[#a94b3f]
                  flex
                  items-center
                  justify-center
                  font-medium
                  text-sm
                "
                            >
                                RC
                            </div>
                        </div>
                    </div>
                </header>

                {/* ===================================================
            DASHBOARD CONTENT
        ==================================================== */}

                <main className="px-4 sm:px-6 lg:px-7 py-7">
                    {/* =================================================
              STAT CARDS
          ================================================== */}

                    {/* <section
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-4
              gap-4
              lg:gap-5
            "
          >
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="
                    bg-[#241d18]
                    border
                    border-[#493d35]
                    rounded-2xl
                    p-5
                    sm:p-6
                  "
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p
                        className="
                          text-[#b4a69d]
                          text-[11px]
                          sm:text-xs
                          tracking-[0.12em]
                        "
                      >
                        {stat.title}
                      </p>

                      <h3
                        className="
                          mt-4
                          text-2xl
                          sm:text-3xl
                          font-serif
                          text-white
                        "
                      >
                        {stat.value}
                      </h3>

                      <p
                        className="
                          mt-2
                          text-sm
                          text-[#48a866]
                        "
                      >
                        {stat.change}
                      </p>
                    </div>

                    <div
                      className="
                        w-12
                        h-12
                        shrink-0
                        rounded-lg
                        bg-[#49361f]
                        text-[#d8a849]
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Icon size={22} />
                    </div>
                  </div>
                </div>
              );
            })}
          </section> */}
                    <DashboardCards />

                    {/* =================================================
              CHARTS
          ================================================== */}

                    <DashboardChart />
                    {/* =================================================
              QUICK SUMMARY
          ================================================== */}

                    <section
                        className="
              mt-6
              grid
              grid-cols-1
              lg:grid-cols-3
              gap-5
            "
                    >
                        {/* Upcoming bookings */}

                        <div
                            className="
                lg:col-span-2
                bg-[#241d18]
                border
                border-[#493d35]
                rounded-2xl
                p-5
                sm:p-6
              "
                        >
                            <DashboardBookingData />
                        </div>

                        {/* Occupancy */}
                        <Occupancy />
                    </section>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
