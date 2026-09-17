import React from 'react'

const Occupancy = () => {
  return (
    <>
    
      {/* Occupancy */}
                    <div className="rounded-2xl border border-[#493d35] bg-[#241d18] p-5 sm:p-6">

                        <h2 className="text-xl font-serif">
                            Lawn occupancy
                        </h2>

                        <p className="text-sm text-[#aaa19b] mt-1">
                            Current month
                        </p>

                        <div className="mt-7 flex items-center justify-center">

                            <div className="relative w-44 h-44">

                                <svg
                                    viewBox="0 0 120 120"
                                    className="w-full h-full -rotate-90"
                                >
                                    <circle
                                        cx="60"
                                        cy="60"
                                        r="48"
                                        fill="none"
                                        stroke="#40342d"
                                        strokeWidth="10"
                                    />

                                    <circle
                                        cx="60"
                                        cy="60"
                                        r="48"
                                        fill="none"
                                        stroke="#d8a849"
                                        strokeWidth="10"
                                        strokeLinecap="round"
                                        strokeDasharray="301.6"
                                        strokeDashoffset="84.4"
                                    />
                                </svg>

                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-serif">
                                        72%
                                    </span>

                                    <span className="text-xs text-[#aaa19b] mt-1">
                                        Occupancy
                                    </span>
                                </div>

                            </div>

                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-6">

                            <div className="rounded-lg bg-[#211a16] p-3">
                                <p className="text-xs text-[#aaa19b]">
                                    Available
                                </p>

                                <p className="text-lg mt-1">
                                    28%
                                </p>
                            </div>

                            <div className="rounded-lg bg-[#211a16] p-3">
                                <p className="text-xs text-[#aaa19b]">
                                    Booked
                                </p>

                                <p className="text-lg mt-1 text-[#d8a849]">
                                    72%
                                </p>
                            </div>

                        </div>
                    </div>
    </>
  )
}

export default Occupancy
