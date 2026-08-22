import React from 'react'
import Navbar from '../../components/comman/Navbar'

const Contact = () => {
  return (
    <div className="min-h-dvh flex flex-col bg-[#17120f]">

      <Navbar />

      <div className="flex-1 min-h-0 w-full border-b border-[#2f2824] flex items-center px-4 gap-3">
          
          <div className=' flex align-center justify-center '>

            <h1 className='text-2xl font-bold text-white'>About us</h1>
          </div>
      </div>

    </div>
  )
}

export default Contact 