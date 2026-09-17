{/* ================= STAT CARDS ================= */}
import { CalendarDays, IndianRupee, TrendingUp, Users } from 'lucide-react';
import React from 'react'

const DashboardCards = () => {




    

const stats = [
  {
    title: "REVENUE (MTD)",
    value: "₹28,90,000",
    change: "+18.4% vs June",
    icon: <IndianRupee size={22} />,
  },
  {
    title: "CONFIRMED BOOKINGS",
    value: "8",
    change: "+3 this week",
    icon: <CalendarDays size={22} />,
  },
  {
    title: "NEW CUSTOMERS",
    value: "12",
    change: "+5 vs last month",
    icon: <Users size={22} />,
  },
  {
    title: "OCCUPANCY",
    value: "72%",
    change: "Peak season",
    icon: <TrendingUp size={22} />,
  },
];
  return (
    <div>
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">

          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-2xl border border-[#493d35] bg-[#241d18] p-5 sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">

                <div className="min-w-0">
                  <p className="text-[11px] sm:text-xs tracking-[0.12em] text-[#b8a99f]">
                    {stat.title}
                  </p>

                  <h2 className="mt-4 text-2xl sm:text-3xl font-serif text-white">
                    {stat.value}
                  </h2>

                  <p className="mt-2 text-sm text-[#4caf70]">
                    {stat.change}
                  </p>
                </div>

                <div className="w-12 h-12 shrink-0 rounded-lg bg-[#4b3920] flex items-center justify-center text-[#d8a849]">
                  {stat.icon}
                </div>

              </div>
            </div>
          ))}

        </section>
    </div>
  )
}

export default DashboardCards

