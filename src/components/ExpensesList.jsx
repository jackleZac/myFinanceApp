import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns';
import axios from 'axios';

export default function ExpensesList() {
  const [expenses, setExpenses] = useState([]);
  // Initialize useNavigate
  const navigate = useNavigate()

  // Handle Add button
  const handleAddClick = () => {
    // Navigate to addTransaction page
    navigate('/transaction/add-transaction')
  };

  // Handle Edit button
  const handleEditClick = (expense) => {
    navigate('/transaction/edit-transaction', { state: { expense } });
  };

  useEffect(() => {
    // Perform a GET request to Flask app
    axios.get('http://localhost:5000/expense')
    .then(response => {
      // Extract the list of expenses from response
      const list_of_expenses = response.data['expenses'];

      try {
        // Update the date format of each expense
        const formattedExpenses = list_of_expenses.map((expense) => ({
          ...expense,
          date: format(new Date(expense.date), 'yyyy-MM-dd')  // Convert date to yyyy-mm-dd format
        }));

        // Update the current state of expenses
        setExpenses(formattedExpenses);
      } catch (error) {
        console.log('An error occurred when converting date to ISO', error);
      }
    })
    .catch(error => {
      console.error('There was an error fetching the expenses!', error)
    })
  }, [])

  return (
    <div className=''>
      <div className='py-6 flex justify-between items-center bg-[#f3f4f6] px-4'>
        <div>
          <h2 className='text-lg font-semibold text-gray-800'>Transactions</h2>
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
                <button 
                    onClick={() => handleEditClick(expense)}
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


