import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './ProductList.css'; // Import the CSS file for table styling

const ProductList = () => {
    const [selectedMonth, setSelectedMonth] = useState('3');
    const [products, setProducts] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [statistics, setStatistics] = useState({
        totalSoldAmount: 0,
        totalSoldItems: 0,
        totalUnsoldItems: 0
    });

    // Function to handle month change from dropdown
    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    // Fetch products and statistics when the selectedMonth changes
    useEffect(() => {
        if (selectedMonth) {
            fetchProductsByMonth(selectedMonth);
            fetchTransactionStatistics(selectedMonth);
        } else {
            setProducts([]); // Reset products if no month is selected
            setStatistics({
                totalSoldAmount: 0,
                totalSoldItems: 0,
                totalUnsoldItems: 0
            }); // Reset statistics
        }
    }, [selectedMonth]);

    // Fetch products from the API based on the selected month
    const fetchProductsByMonth = async (month) => {
        try {
            const response = await axios.get(backendUrl + `api/product/pic-chart?month=${month}`);
            setProducts(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]); // Reset products on error
        }
    };

    // Fetch transaction statistics from the API based on the selected month
    const fetchTransactionStatistics = async (month) => {
        try {
            const response = await axios.get(backendUrl + `api/product/pic-chart?month=${month}`);
            setStatistics(response.data);
        } catch (error) {
            console.error('Error fetching transaction statistics:', error);
            setStatistics({
                totalSoldAmount: 0,
                totalSoldItems: 0,
                totalUnsoldItems: 0
            }); // Reset statistics on error
        }
    };

    return (
        <div className='bg-black text-white  w-[100%] md:w-[40%]'>
            <div className='flex justify-between py-10 px-10 flex-col md:flex-row items-center' >
            <h1 className='text-l  text-green-400'>Select a Month to View Product Statistics</h1>
            
            {/* Dropdown to select the month */}
            <select className=' dark:bg-gray-900 text-green-400  p-1 outline-none w-[120px] mt-5 md:mt-0'  value={selectedMonth} onChange={handleMonthChange}>
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
            {/* Display statistics */}
            <div className=' flex justify-center '>
            <div className='bg-gray-900 text-green-400  flex flex-col justify-center py-5 px-10 w-[350px] md:w-[500px] mt-10 rounded'>
                <h2>Statistics for Month {selectedMonth}</h2>
                <p>Total Sales Amount: ${statistics.totalSoldAmount}</p>
                <p>Total Sold Items: {statistics.totalSoldItems}</p>
                <p>Total Not Sold Items: {statistics.totalUnsoldItems}</p>
            </div>
            </div>

            {/* Display products in a table */}
           
        </div>
    );
};

export default ProductList;
