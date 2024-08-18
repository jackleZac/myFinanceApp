import React from 'react'
import  Wallet  from '../components/Wallet'
import ExpensesList from '../components/ExpensesList'


export default function Dashboard() {
    return (
        <div className='grid grid-cols-1 gap-y-8'>
            <div className='h-18'>
                <h1 className='px-4 py-6'>Welcome back, User!</h1>
            </div>
            <div className='w-full px-4 flex flex-row'>
                <Wallet />
            </div>
            <div className='mx-4'>
                <ExpensesList />
            </div>
        </div>
    )
}