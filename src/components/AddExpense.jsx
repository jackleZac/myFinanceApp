import React, { useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const categories = [
  {
    id: 1,
    name: 'Housing',
    avatar:
      '',
  },
  {
    id: 2,
    name: 'Transportation',
    avatar:
      '',
  },
  {
    id: 3,
    name: 'Food',
    avatar:
      '',
  },
  {
    id: 4,
    name: 'Health & Wellness',
    avatar:
      '',
  },
  {
    id: 5,
    name: 'Insurance',
    avatar:
      '',
  },
  {
    id: 6,
    name: 'Debt Payments',
    avatar:
      '',
  },
  {
    id: 7,
    name: 'Savings & Investments',
    avatar:
      '',
  },
  {
    id: 8,
    name: 'Entertainment',
    avatar:
      '',
  },
  {
    id: 9,
    name: 'Education',
    avatar:
      '',
  },
  {
    id: 10,
    name: 'Family & Childcare',
    avatar:
      '',
  },
  {
    id: 11,
    name: 'Gifts & Donations',
    avatar:
      '',
  },
  {
    id: 12,
    name: 'Miscellaneous',
    avatar:
      '',
  }
]

const wallets = [
  {
    id: 1,
    name: "Savings Account",
    balance: 5000.00
  },
  {
    id: 2,
    name: "Checking Account",
    balance: 1500.75
  },
  {
    id: 3,
    name: "Emergency Fund",
    balance: 3000.50
  }
];


export default function AddExpense() {
    const [selectedCategory, setselectedCategory] = useState(categories[0])
    const [amount, setAmount] = useState(0.00)
    const [selectedWallet, setSelectedWallet] = useState([])

    // Handle amount
    return (
      <div className='w-96 grid grid-cols-1 gap-y-4 gap-x-2'>
        <div className=''>
          <Listbox value={selectedCategory} onChange={setselectedCategory}>
            <Label className='block text-sm font-medium leading-6 text-gray-900'>Category</Label>
            <div className='relative mt-2'>
              <ListboxButton className='relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6'>
                <span className='flex items-center'>
                  <img alt='' src={selectedCategory.avatar} className='h-5 w-5 flex-shrink-0 rounded-full' />
                  <span className='ml-3 block truncate'>{selectedCategory.name}</span>
                </span>
                <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
                  <ChevronUpDownIcon aria-hidden='true' className='h-5 w-5 text-gray-400' />
                </span>
              </ListboxButton>

              <ListboxOptions
                transition
                className='absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm'
              >
                {categories.map((option) => (
                  <ListboxOption
                    key={option.id}
                    value={option}
                    className='group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white'
                  >
                    <div className='flex items-center'>
                      <img alt='' src={option.avatar} className='h-5 w-5 flex-shrink-0 rounded-full' />
                      <span className='ml-3 block truncate font-normal group-data-[selectedCategory]:font-semibold'>
                        {option.name}
                      </span>
                    </div>

                    <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selectedCategory])_&]:hidden'>
                      <CheckIcon aria-hidden='true' className='h-5 w-5' />
                    </span>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
        </div>
        <div className=''>
          <label htmlFor='amount' className='block text-sm font-medium leading-6 text-gray-900'>
            Amount
          </label>
          <div className='relative mt-2 rounded-md shadow-sm'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <span className='text-gray-500 sm:text-sm'>$</span>
            </div>
            <input
              id='amount'
              name='amount'
              type='text'
              placeholder='0.00'
              className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              
            />
          </div>
        </div>
        <div className='col-span-full'>
          <label htmlFor='description' className='block text-sm font-medium leading-6 text-gray-900'>
            Description
          </label>
          <div className='mt-2'>
            <textarea
              id='description'
              name='description'
              rows={3}
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              defaultValue={''}
            />
          </div>
          <p className='mt-3 text-sm leading-6 text-gray-600'>Write a few details (optional) </p>
        </div>
        <div className=''>
          <div className='grid grid-cols-2 col-span-full'>
            <label htmlFor='wallet' className='block text-sm font-medium leading-6 text-gray-900 my-auto'>
              Wallet
            </label>
            <div className='mt-2'>
              <select
                id='wallet'
                name='wallet'
                autoComplete='wallet-name'
                className='block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
              >
                {wallets.map((wallet) => (
                  <option key={wallet.id} value={wallet.id}>
                    {wallet.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    )
  }
  