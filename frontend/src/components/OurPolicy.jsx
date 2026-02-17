import React from 'react'
import { assets } from '../assets/assets'
import Delivery from '../assets/Delivery.png'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row  justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
        <div>
            <img src={Delivery} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Super Fast <span className='text-red-500'>Delivery</span> </p>
            <p className='text-gray-400'>All Products are shipped on the same day.</p>
        </div>
        <div>
            <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'> <span className='text-red-500'>7-Days</span> Return Policy</p>
            <p className='text-gray-400'>We Offer 7-Day Return Policy</p>
        </div>
        <div>
            <img src={assets.support_img} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Best <span className='text-red-500'>Customer</span> Support</p>
            <p className='text-gray-400'>We Provide 24/7 Customer Support</p>
        </div>
    </div>
  )
}

export default OurPolicy