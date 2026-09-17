import { CalendarDays } from 'lucide-react'
import React from 'react'

const DashboardBookingData = () => {
  return (
    <div>
      {/* Upcoming Bookings */}
         

            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-serif">
                  Upcoming bookings
                </h2>

                <p className="text-sm text-[#aaa19b] mt-1">
                  Latest confirmed events
                </p>
              </div>

              <button className="text-sm text-[#d8a849] hover:underline">
                View all
              </button>
            </div>

            <div className="space-y-3">

              {[
                {
                  name: "Anand Patel",
                  event: "Wedding",
                  date: "18 Jul 2026",
                  venue: "Royal Garden",
                },
                {
                  name: "Rahul Singh",
                  event: "Reception",
                  date: "22 Jul 2026",
                  venue: "Heritage Lawn",
                },
                {
                  name: "Priya Sharma",
                  event: "Engagement",
                  date: "27 Jul 2026",
                  venue: "Marigold Lawn",
                },
              ].map((booking) => (
                <div
                  key={booking.name}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-[#3e332d] bg-[#211a16] p-4"
                >
                  <div>
                    <h3 className="text-white font-medium">
                      {booking.name}
                    </h3>

                    <p className="text-sm text-[#aaa19b] mt-1">
                      {booking.event} · {booking.venue}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-[#d8a849]">
                    <CalendarDays size={16} />
                    {booking.date}
                  </div>
                </div>
              ))}

            </div>
          </div>
    
  )
}

export default DashboardBookingData
