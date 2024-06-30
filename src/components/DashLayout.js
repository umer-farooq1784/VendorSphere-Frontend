import { useEffect, useRef } from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from '../static/constants/Header'

export default function DashLayout() {
  const { pathname } = useLocation()
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }, [pathname])

  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-auto h-screen">
        <Sidebar />
        <div ref={containerRef} className="flex-1 flex flex-col p-4 min-h-0 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
