import React, { useState, useEffect } from 'react';
import { IoPieChart, IoPeople, IoAnalytics } from 'react-icons/io5';
import client from '../api/api';
import { useSelector } from 'react-redux';

export default function DashboardStatsGrid({ currentUser }) {
  const [activeContracts, setActiveContracts] = useState(0);
  const [expiredContracts, setExpiredContracts] = useState(0);
  const [totalProductValue, setTotalProductValue] = useState(0);
  const [totalSales, setTotalSales] = useState(0); // New state for total sales
  const userDetails = useSelector(state => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch active contracts count
        const activeRes = await client.get(`api/check_active_records/${userDetails.id}/`);
        setActiveContracts(activeRes?.data?.active_contracts_count || 0);

        // Fetch expired contracts count
        const expiredRes = await client.get(`api/check_expire_records/${userDetails.id}/`);
        setExpiredContracts(expiredRes?.data?.expired_contracts_count || 0);

        // Fetch total product value
        const totalProductRes = await client.get(`api/totalproduct/${userDetails.id}/`);
        setTotalProductValue(totalProductRes?.data?.total_price || 0);

        // Fetch total sales (revenue earned)
        const totalSalesRes = await client.get(`api/totalsales/${userDetails.id}/`);
        setTotalSales(totalSalesRes?.data?.total_sales || 0);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userDetails.id]);

  return (
    <div className="flex flex-wrap gap-4">
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IoAnalytics className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Revenue Earned</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">${totalSales}</strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
          <IoPieChart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Total Product Value</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">${totalProductValue}</strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
          <IoPeople className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Active Contracts</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">{activeContracts}</strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
          <IoPeople className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Expired Contracts</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">{expiredContracts}</strong>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 sm:flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
}
