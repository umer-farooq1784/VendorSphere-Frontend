import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DashboardStatsGrid from './DashboardStatsGrid'
import TransactionChart from './TransactionChart'
import PieChart from './PieChart'

export default function Dashboard() {
  const userDetails = useSelector((state) => state.user);

  return (
    <div className="relative flex flex-col gap-4">
      <div className={`${userDetails.subscription === 'Basic' ? 'blur' : ''}`}>
        <DashboardStatsGrid />

        <div className="flex flex-col gap-4 sm:flex-row sm:gap-8 w-full mt-2">
          <TransactionChart />
          <PieChart />
        </div>
      </div>

      {userDetails.subscription === 'Basic' && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-8 rounded shadow-lg text-center">
          <h2 className="text-2xl mb-4">Upgrade Required</h2>
          <p className="mb-6">
            To view the dashboard details, please upgrade your subscription plan.
          </p>
          <div className="flex justify-center space-x-6">
            <Link to="/plan">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Upgrade Now</button>
            </Link>
            <Link to="/">
              <button className="bg-red-500 text-white px-4 py-2 rounded">Go Back</button>
            </Link>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}
