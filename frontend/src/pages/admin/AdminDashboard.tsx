import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Bell, Calendar, Menu, Moon } from "lucide-react";

import AdminAside from "./AdminAside";
import DashboardCards from "./DashboardCards";
import DashboardChart from "./DashboardChart";
import DashboardBookingData from "./DashboardBookingData";
import Occupancy from "./Occupancy";

// COMPONENT

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#17120f] text-white">
      {/*MOBILE OVERLAY*/}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      {/*Aside */}
      <AdminAside />

      {/* MAIN CONTENT */}

      <div className="lg:ml-[270px] min-h-screen">
        {/*TOP HEADER*/}

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

              <button
                className="w-10 h-10 rounded-full
                  bg-[#a94b3f]
                  flex
                  items-center
                  justify-center
                  font-medium
                  text-sm
                "
                 onClick={() => navigate("/admin/profile")}
              >                Pro
              </button>
            </div>
          </div>
        </header>

        {/*  DASHBOARD CONTENT */}

        <main className="px-4 sm:px-6 lg:px-7 py-7">
          {/* STAT CARDS*/}
          <DashboardCards />

          {/* CHARTS */}

          <DashboardChart />
          {/*QUICK SUMMARY */}

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
