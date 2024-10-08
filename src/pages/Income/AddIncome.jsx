import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react';
import { ArrowLeftIcon , CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const sources = [
  { id: 1, name: 'Salary', avatar: '' },
  { id: 2, name: 'Investment', avatar: '' },
  { id: 3, name: 'Freelancing', avatar: '' },
  { id: 4, name: 'Gifts', avatar: '' },
  { id: 5, name: 'Other', avatar: '' },
];

export default function AddIncome() {
  const [newIncomeDetails, setNewIncomeDetails] = useState({
    source: '',
    amount: '',
    description: '',
    date: '',
    wallet_id: '',
  });
  const [selectedSource, setSelectedSource] = useState(sources[0])
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/wallet')
      .then(response => {
        setWallets(response.data['wallets']);
        setWallets(response.data['wallets']);
      })
      .catch(error => {
        console.error('Error fetching wallets:', error);
      });
  }, []);

  const handleSave = async () => {
    const isoDate = new Date(newIncomeDetails.date).toISOString();
    const newDetails = { 
      ...newIncomeDetails, 
      amount: Number(newIncomeDetails.amount), 
      date: isoDate,
      wallet_id: selectedWallet.wallet_id
    };
    setIsSaving(true);

    try {
      await axios.post('http://localhost:5000/income', newDetails);
      console.log('Income saved:', newDetails);
    } catch (error) {
      console.error('Error saving income:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const navigate = useNavigate();
  // Handle exits page button
  const handleExitClick = () => {
    navigate(-1)
  }

  return (
    <div className='grid grid-cols-1'>
      <button 
          onClick={handleExitClick}
          className='w-24 py-4 px-2 ml-24 mt-12 flex flex-rows text-blue-500'
        >
          <ArrowLeftIcon className='size-6 mx-2'/><p className='block font-medium text-md hover:underline'>Back</p>
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className='w-96 mx-auto px-8 py-12 grid grid-cols-1 gap-4 border-2 border-gray-100 rounded-lg shadow-lg'
      >
        <label className='block text-sm font-medium text-gray-700'>
          Date:
          <input
            type='date'
            value={newIncomeDetails.date}
            onChange={(e) => setNewIncomeDetails({ ...newIncomeDetails, date: e.target.value })}
            className='mt-1 px-2 block w-full py-1.5 pl-4 pr-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          />
        </label>

        <label className='block text-sm font-medium text-gray-700'>
          Source:
          <Listbox value={selectedSource} onChange={setSelectedSource}>
            <div className='relative mt-1'>
              <ListboxButton className='relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
                <span className='block truncate'>{selectedSource?.name || 'Select a source of income'}</span>
                <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                  <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                </span>
              </ListboxButton>
              <ListboxOptions className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {sources.map((category) => (
                  <ListboxOption
                    key={category.id}
                    value={category}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'text-white bg-indigo-600' : 'text-gray-900'
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {category.name}
                        </span>
                        {selected ? (
                          <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600'>
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
        </label>

        <label className='block text-sm font-medium text-gray-700'>
          Amount:
          <input
            type='number'
            value={newIncomeDetails.amount}
            onChange={(e) => setNewIncomeDetails({ ...newIncomeDetails, amount: e.target.value })}
            className='mt-1 px-2 block w-full py-1.5 pl-4 pr-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          />
        </label>

        <label className='block text-sm font-medium text-gray-700'>
          Description:
          <input
            type='text'
            value={newIncomeDetails.description}
            onChange={(e) => setNewIncomeDetails({ ...newIncomeDetails, description: e.target.value })}
            className='mt-1 px-2 block w-full py-1.5 pl-4 pr-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          />
        </label>

        <label className='block text-sm font-medium text-gray-700'>
          Wallet:
          <Listbox value={selectedWallet} onChange={setSelectedWallet}>
            <div className='relative mt-1'>
              <ListboxButton className='relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
                <span className='block truncate'>{selectedWallet?.type || 'Select a wallet'}</span>
                <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                  <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                </span>
              </ListboxButton>
              <ListboxOptions className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {wallets.map((wallet) => (
                  <ListboxOption
                    key={wallet.wallet_id}
                    value={wallet}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'text-white bg-indigo-600' : 'text-gray-900'
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {wallet.type}
                        </span>
                        {selected ? (
                          <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600'>
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
        </label>

        <button
          type='submit'
          className='inline-flex justify-center bg-cyan-700 hover:bg-cyan-800 text-white px-4 py-2 rounded-lg transition-all duration-200'
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}