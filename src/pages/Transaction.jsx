import React, { useState, useEffect } from 'react';
import ExpensesList from '../components/ExpensesList'
import axios from 'axios';

export default function News() {
    return (
        <div className='grid grid-cols-1 gap-y-8'>
            <ExpensesList />
        </div>
    )
}