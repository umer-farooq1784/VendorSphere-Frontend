import React from 'react'
import FindVendor from '../static/assets/FindVendor.jpg'

const ServicesCard = () => {
  return (
    <div className="font-inter  mr-6 min-w-210 mt-8 border-solid rounded-md items-center border p-1 w-52 bg-white flex flex-col">
      <img className="" src={FindVendor} alt="store"></img>
      <p className="pl-2 pb-0 pr-2 text-base font-medium self-start">Search for more Vendors</p>
    </div>
  )
}

export default ServicesCard
