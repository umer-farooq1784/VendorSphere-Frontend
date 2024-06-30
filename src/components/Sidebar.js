import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiOutlineLogout } from 'react-icons/hi'
import { BsArrowLeft } from 'react-icons/bs'
import classNames from 'classnames'
import {
  DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from '../static/constants/navigation'
import client from '../api/api'

const linkClass =
  'flex items-center gap-2 font-light px-3 py-2 hover:bg-white hover:no-underline active:bg-neutral-600 rounded-sm text-base'

export default function Sidebar() {
  const { pathname } = useLocation()
  const [isHovered, setIsHovered] = useState(false)
  const [isLaptopView, setIsLaptopView] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setIsLaptopView(window.innerWidth >= 1024)
    }
    window.addEventListener('resize', handleResize)
    handleResize() // Initial check
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const sidebarWidth = isLaptopView ? (isHovered ? '250px' : '70px') : '70px' // Adjusted sidebar width for mobile view

  const handleLogout = () => {
    // Perform logout action here
    client
      .post('api/logout/', {
        refresh: localStorage.getItem('refreshToken'),
      })
      .then(() => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('userDetails')
        window.location.href = '/login' // Redirect to login page
      })
      .catch((error) => {
        console.error('Error logging out:', error)
        // Handle error if needed
      })
  }

  return (
    <div
      className={'bg-[#2664EB] p-3 flex flex-col md:w-60 transition-width ease-in-out duration-100'}
      style={{ width: sidebarWidth }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center gap-2 px-1 py-3">
        <BsArrowLeft
          className="text-white text-2xl cursor-pointer"
          onClick={() => window.history.back()}
        />
      </div>
      <div className="py-8 flex flex-1 flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} isHovered={isHovered} />
        ))}
      </div>
      <hr />
      <div className="flex flex-col gap-0.5 pt-2 ">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} isHovered={isHovered} />
        ))}
        <div
          className={classNames(linkClass, 'cursor-pointer text-red-500')}
          onClick={handleLogout}
        >
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          {isHovered && 'Logout'}
        </div>
      </div>
    </div>
  )
}

function SidebarLink({ link, isHovered }) {
  const { pathname } = useLocation()

  return (
    <Link
      to={link.path}
      className={classNames(
        pathname === link.path
          ? 'text-white hover:text-[#1E40AF] bg-[#1E40AF]'
          : 'text-white hover:bg-blue-500 hover:text-[#1E40AF]',
        linkClass,
        { hidden: !isHovered && link.hideOnShrink }
      )}
    >
      <span className="text-xl">{link.icon}</span>
      {isHovered && link.label}
    </Link>
  )
}
