import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../pages/Header'
import Footer from './Footer'
import ContentPane from './ContentPane'
import axios from 'axios'
import Alert from './Alert'


const HomePage = () => {
 
  
  // Render the HomePage content if authenticated
  return (
    <div className="min-w-350 bg-[#F7FAFC]">
      
      <Header />
      <ContentPane />
      <Footer />
      {/* <Alert /> */}
    </div>
  )
}

export default HomePage
