import React from 'react'
import ServicesCard from './ServicesCard'

const Services = () => {
  return (
    <div className='flex justify-between m-12'>
        <ServicesCard />
        <ServicesCard />
        <ServicesCard />
        <ServicesCard />
    </div>
  )
}

export default Services
