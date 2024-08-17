import React, { useState, useEffect } from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import EditExpense from './EditExpense';
import axios from 'axios';

export default function ExpensesList() {
  const [expenses, setExpense] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const handleEditClick = (expense) => {
    console.log('Selected Expense: ', expense)
    setSelectedExpense(expense);
  };

  useEffect(() => {
    // Perform a GET request to Flask app
    axios.get('http://localhost:5000/expense')
    .then(response => {
      // Update the current state of expenses
      console.log(response.data);
      setExpense(response.data['expenses']);
    })
    .catch(error => {
      console.error('There was an error fetching the expenses!', error)
    })
  }, [])

  return (
    <div className=''>
      <div className='py-6 flex flex-row bg-[#f3f4f6]'>
        <h2 className='mx-4'>Transaction</h2><p className='mx-2'>in July 2024</p>
        <button>Search ..</button>
      </div>
      <div className='overflow-y-auto max-h-[300px]'> {/* Set a fixed height and enable vertical scrolling */}
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Date</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Category</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Amount</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Description</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Wallet ID</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Action</th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {expenses.map((expense) => ( 
              <tr key={expense._id}>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{expense.date}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{expense.category}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{expense.amount} MYR</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{expense.description}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{expense.wallet_id}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                <Popover>
                    <PopoverButton onClick={() => handleEditClick(expense)} className='font-bold text-blue-500'>EDIT</PopoverButton>
                    <PopoverPanel className="absolute z-10 left-1/2 bg-white p-4 shadow-md rounded">
                      <EditExpense {...selectedExpense} />
                    </PopoverPanel>
                  </Popover>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


