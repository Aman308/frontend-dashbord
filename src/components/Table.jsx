import React, { useEffect, useState } from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import axios from 'axios'
// import './table.css'
const Table = () => {
  const [products, setProducts] = useState([])
  const [selectedMonth, setSelectedMonth] = useState('3');
 



    // Function to handle month change from dropdown
  const handleMonthChange = (event) => {
      setSelectedMonth(event.target.value);
  };

  useEffect(() => {
    if (selectedMonth) {
        fetchProductsByMonth(selectedMonth);
    }
}, [selectedMonth]);

    // Fetch products from the API based on the selected month
    const fetchProductsByMonth = async (month) => {
      const backendUrl = import.meta.env.VITE_BACKEND_URL
      try {
          const response = await axios.get(backendUrl + `api/product/month?month=${month}`);
          setProducts(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
          console.error('Error fetching products:', error);
      }
  };

  return (
    <div className='bg-black text-white min-h-screen'>
      
      <h1 className='text-center text-green-400 text-2xl pt-10 flex  justify-center items-center gap-5'>Product Dashboard <DashboardIcon color="success"/>
      </h1> 
    <div className='flex justify-between py-10 px-0 md:px-10 flex-col md:flex-row items-center'>
      <h1 className='text-l  text-green-400'>Select Month to view products accordingly</h1>
      <select className=' dark:bg-gray-900 text-green-400  p-1 outline-none w-[120px] mt-5 md:mt-0' value={selectedMonth} onChange={handleMonthChange}>
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
<div className=" overflow-x-auto flex flex-col items-center justify-center pt-10">
  <h2 className='text-green-500 text-lg py-9 px-8'>Products for {selectedMonth ? `Month ${selectedMonth}` : 'Selected Month'}</h2>
  {products.length > 0 ? (
    <div class="relative">
    <table class="w-full overflow-x-scroll text-sm text-left  text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3" >
                    Product ID
                </th>
                <th scope="col" class="px-6 py-3" >
                    Title
                </th>
                <th scope="col" class="px-6 py-3">
                    Description
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
                <th >
                    Category
                </th>
                <th >
                    Sold 
                </th>
                <th scope="col" class="px-6 py-3" >
                   Date Of Sale
                </th>
                <th scope="col" class="px-6 py-3" >
                   Image of Product
                </th>
            </tr>
        </thead>
        <tbody>
          {
            products.map(product =>{
              return <tr key={product._id}>
                <td class="px-6 py-4">
                   {product._id}
                </td>
                <td class="px-6 py-4" >
                {product.productTitle}
                </td>
                <td class="px-6 py-4" >
                {product.productDescription}
                </td>
                <td class="px-6 py-4"  >
                {product.productPrice}
                </td>
                <td class="px-6 py-4" >
                {product.productCategory}
                </td>
                
                <td class="px-6 py-4" >
                {product.sold ? "Yes" : "No"}
                </td>
                <td class="px-6 py-4" >
                {new Date(product.dateOfSale).toLocaleDateString()}
                </td>
                <td class="px-6 py-4" >
                <img src={product.image} alt="" width='150' />
                </td>
            </tr>
            })
          }
       
        </tbody>
   
    </table>
    </div> ) : (
      <p>No product Available for the selected month</p>
    )
    }
    
  
  
    
</div>

    </div>
)


}

export default Table
