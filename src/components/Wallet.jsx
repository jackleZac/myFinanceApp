import React from 'react'

export default function Wallet() {
  return (
    <div className='w-fit px-6 py-8 border-2 border-gray-400 rounded grid grid-cols-1 gap-y-2'>
        <p className='font-semibold text-lg'>Wallet 1</p>
        <p className='text-gray-600'>Balance: 7,500.00 MYR</p>
        <button className='font-bold text-blue-600'>Details</button>
    </div>
  )
}

