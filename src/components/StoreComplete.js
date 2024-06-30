import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'
import StoreContentPane from './StoreContentPane'
import { useParams } from 'react-router-dom'
import { fetchProducts } from '../redux/features/allProductReducer' // Update import

const StorePage = () => {
  return (
    <div className="min-w-[250px] md:min-w-620 bg-[#F7FAFC]">
      <StoreContentPane />
      <Footer />
    </div>
  )
}

export default StorePage
