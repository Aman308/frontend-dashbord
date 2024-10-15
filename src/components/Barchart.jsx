import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    const [selectedMonth, setSelectedMonth] = useState('3');
    const [barChartData, setBarChartData] = useState({});
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    // Fetch bar chart data based on selected month
    useEffect(() => {
        if (selectedMonth) {
            fetchBarChartData(selectedMonth);
        }
    }, [selectedMonth]);

    // Fetch bar chart data from the API
    const fetchBarChartData = async (month) => {
        try {
            const response = await axios.get( backendUrl + `api/product/price-range?month=${month}`);
            const labels = Object.keys(response.data);
            const data = Object.values(response.data);

            // Set up the data for the bar chart
            setBarChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Number of Items',
                        data: data,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    }
                ]
            });
        } catch (error) {
            console.error('Error fetching bar chart data:', error);
            setBarChartData({}); // Reset bar chart data on error
        }
    };

    return (
        <div className='bg-black text-white w-[100%] md:w-[40%] py-20 md:py-0'>
            <div className='flex justify-between py-10 px-10 flex-col md:flex-row items-center' >
            <h1 className='text-l  text-green-400'>Select a Month for the Bar Chart</h1>
            <select className=' dark:bg-gray-900 text-green-400  p-1 outline-none w-[120px] mt-5 md:mt-0' value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                <option value="">Select Month</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>
            </div>
            {/* Display Bar Chart */}
            <div>
                <h2 className='text-green-400 text-center px-10 py-10'>Transactions Bar Chart for Month {selectedMonth}</h2>
                {barChartData.labels ? ( // Check if labels exist
                    <Bar data={barChartData} />
                ) : (
                    <p>No data available for the selected month.</p>
                )}
            </div>
        </div>
    );
};

export default BarChart;

