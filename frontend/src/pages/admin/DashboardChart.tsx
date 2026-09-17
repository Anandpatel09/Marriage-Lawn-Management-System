import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const revenueData = [
  { month: "Feb", revenue: 15 },
  { month: "Mar", revenue: 18 },
  { month: "Apr", revenue: 10 },
  { month: "May", revenue: 22.5 },
  { month: "Jun", revenue: 16.5 },
  { month: "Jul", revenue: 29 },
];

const bookingsData = [
  { month: "Feb", bookings: 4 },
  { month: "Mar", bookings: 5 },
  { month: "Apr", bookings: 3 },
  { month: "May", bookings: 7 },
  { month: "Jun", bookings: 5 },
  { month: "Jul", bookings: 8 },
];

const DashboardChart = () => {
  return (
    <div>
      {/* ================= CHARTS ================= */}
        <section className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-5 mt-7">

          {/* Revenue */}
          <div className="rounded-2xl border border-[#493d35] bg-[#241d18] p-4 sm:p-6">

            <h2 className="text-xl sm:text-2xl font-serif text-white mb-6">
              Revenue trend
            </h2>

            <div className="w-full h-[280px] sm:h-[340px]">

              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={revenueData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <defs>
                    <linearGradient
                      id="revenueGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#d8a849"
                        stopOpacity={0.45}
                      />

                      <stop
                        offset="100%"
                        stopColor="#d8a849"
                        stopOpacity={0.02}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    stroke="#493d35"
                    strokeDasharray="3 5"
                    vertical
                    horizontal
                  />

                  <XAxis
                    dataKey="month"
                    stroke="#aaa19b"
                    tick={{ fontSize: 12 }}
                    axisLine={{ stroke: "#685b50" }}
                    tickLine={{ stroke: "#685b50" }}
                  />

                  <YAxis
                    stroke="#aaa19b"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `${value}L`}
                    axisLine={{ stroke: "#685b50" }}
                    tickLine={{ stroke: "#685b50" }}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#2b211c",
                      border: "1px solid #493d35",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    formatter={(value) => [`₹${value}L`, "Revenue"]}
                  />

                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#d8a849"
                    strokeWidth={2.5}
                    fill="url(#revenueGradient)"
                    dot={false}
                    activeDot={{
                      r: 5,
                      fill: "#d8a849",
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>

            </div>
          </div>

          {/* Bookings */}
          <div className="rounded-2xl border border-[#493d35] bg-[#241d18] p-4 sm:p-6">

            <h2 className="text-xl sm:text-2xl font-serif text-white mb-6">
              Bookings per month
            </h2>

            <div className="w-full h-[280px] sm:h-[340px]">

              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={bookingsData}
                  margin={{
                    top: 5,
                    right: 5,
                    left: -15,
                    bottom: 5,
                  }}
                >

                  <CartesianGrid
                    stroke="#493d35"
                    strokeDasharray="3 5"
                    vertical
                    horizontal
                  />

                  <XAxis
                    dataKey="month"
                    stroke="#aaa19b"
                    tick={{ fontSize: 12 }}
                    axisLine={{ stroke: "#685b50" }}
                    tickLine={{ stroke: "#685b50" }}
                  />

                  <YAxis
                    stroke="#aaa19b"
                    tick={{ fontSize: 12 }}
                    allowDecimals={false}
                    domain={[0, 8]}
                    axisLine={{ stroke: "#685b50" }}
                    tickLine={{ stroke: "#685b50" }}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#2b211c",
                      border: "1px solid #493d35",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    formatter={(value) => [value, "Bookings"]}
                  />

                  <Bar
                    dataKey="bookings"
                    fill="#8f3931"
                    radius={[5, 5, 0, 0]}
                    barSize={46}
                  />

                </BarChart>
              </ResponsiveContainer>

            </div>
          </div>

        </section>

    </div>
  )
}

export default DashboardChart
