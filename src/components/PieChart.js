import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import client from '../api/api'; 
import { useSelector } from 'react-redux';

const RADIAN = Math.PI / 180;
const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#FF00FF', '#AF19FF', '#FF99C3', '#66FF66', '#FFD700', '#4B0082']; // Define your colors for different categories
const DEFAULT_COLOR = '#FF0000'; 

const defaultChartData = [
  { name: 'No Sale', value: 100 } 
];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const ProductSalesPieChart = () => {
  const [chartData, setChartData] = useState([]);
  const userDetails = useSelector(state => state.user); 

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await client.get(`/api/get_percentage/${userDetails.id}`); 
        
        if (response.status === 200) {
          const data = response.data;

          if (data.category_percentages) {
            const formattedData = Object.entries(data.category_percentages).map(([name, value], index) => ({
              name,
              value,
            }));
            setChartData(formattedData);
          } else {
            
            setChartData([]);
          }
        } else {
          console.error('Failed to fetch data:', response.data); 
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        
      }
    }

    if (userDetails && userDetails.id) {
      fetchData();
    }
  }, [userDetails]); 

  return (
    <div className="w-[20rem] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
      <strong className="text-gray-700 font-medium">Product Category Sales</strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={300}>
            <Pie
              data={chartData.length > 0 ? chartData : defaultChartData}
              cx="50%"
              cy="45%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={105}
              fill="#8884d8"
              dataKey="value"
            >
              {(chartData.length > 0 ? chartData : defaultChartData).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={chartData.length > 0 ? COLORS[index % COLORS.length] : DEFAULT_COLOR} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductSalesPieChart;
