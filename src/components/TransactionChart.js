import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import client from '../api/api';
import { useSelector } from 'react-redux';

const MONTHS = [
  '2024-01', '2024-02', '2024-03', '2024-04',
  '2024-05', '2024-06', '2024-07', '2024-08',
  '2024-09', '2024-10', '2024-11', '2024-12'
];

export default function TransactionChart() {
  const [data, setData] = useState(MONTHS.map(month => ({ month, Income: 0 })));
  const userDetails = useSelector((state) => state.user);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await client.get(`api/sales/prices/${userDetails.id}/`);
        
        if (response.status === 200) {
          const result = response.data;
          const salesByMonth = result.sales.reduce((acc, sale) => {
            const month = sale.sale_created_date_month;
            const price = parseFloat(sale.price);
            if (!acc[month]) {
              acc[month] = { month, Income: 0 };
            }
            acc[month].Income += price;
            return acc;
          }, {});

          const formattedData = MONTHS.map(month => ({
            month,
            Income: salesByMonth[month] ? salesByMonth[month].Income : 0,
          }));

          setData(formattedData);
        } else {
          // If API request fails or returns non-200 status
          // Set data to default values (0 Income for all months)
          setData(MONTHS.map(month => ({ month, Income: 0 })));
        }
      } catch (err) {
        // If there's an error with the request (network error, etc.)
        // Set data to default values (0 Income for all months)
        setData(MONTHS.map(month => ({ month, Income: 0 })));
      }
    }

    if (userDetails.id) {
      fetchData();
    }
  }, [userDetails.id]);

  return (
    <div className="h-[22rem] w-[20rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">Income</strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: -10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Income" fill="#0ea5e9" name="Income" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
