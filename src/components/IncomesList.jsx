import React, { useState, useEffect } from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function IncomesList() {
  const [incomes, setIncomes] = useState([]);

  // Initialize useNavigate
  const navigate = useNavigate()

  // Handle Add button
  const handleAddClick = () => {
    // Navigate to addTransaction page
    navigate('/add-income')
  };

  // Handle Edit button
  const handleEditClick = (income) => {
    navigate(`/edit-transaction/${income._id}`);
  };

  useEffect(() => {
    // Perform a GET request to Flask app
    axios.get('http://localhost:5000/income')
    .then(response => {
      // Update the current state of incomes
      console.log(response.data);
      setIncomes(response.data['incomes']);
    })
    .catch(error => {
      console.error('There was an error fetching the incomes!', error)
    })
  }, [])

  return (
    <div className=''>
      <div className='py-6 flex justify-between items-center bg-[#f3f4f6] px-4'>
        <div>
          <h2 className='text-lg font-semibold text-gray-800'>Incomes</h2>
          <p className='text-sm text-gray-500'>in July 2024</p>
        </div>
        <button 
          onClick={handleAddClick}
          className='bg-cyan-700 hover:bg-cyan-800 text-white px-4 py-2 rounded-lg transition-all duration-200'
        >
          ADD
        </button>
      </div>
      <div className='overflow-y-auto max-h-[300px]'> {/* Set a fixed height and enable vertical scrolling */}
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Date</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Source</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Amount</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Description</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Wallet ID</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Action</th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {incomes.map((income) => ( 
              <tr key={income._id}>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{income.date}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{income.source}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{income.amount} MYR</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{income.description}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{income.wallet_id}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  <button 
                    onClick={() => handleEditClick(income)}
                    className='font-bold text-blue-500'
                  >
                    EDIT
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
