import React from 'react'
import Footer from './Footer'
import Header from '../pages/Header'

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-100">
      <Header />
      <div className="">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
