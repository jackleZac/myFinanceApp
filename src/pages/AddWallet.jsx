import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react';
import { ArrowLeftIcon ,CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const types =[
    {
        'id': 1,
        'type': 'Current'
    },
    {
        'id': 2,
        'type': 'Savings'
    },
    {
        'id': 3,
        'type': 'Investment'
    }
];

export default function AddWallet() {
  const [selectedType, setSelectedType] = useState(null);
  const [newWalletDetails, setNewWalletDetails] = useState({
    name: '',
    balance: '',
    type: null, 
    target: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    const now = new Date().toISOString();
    const newDetails = {
      ...newWalletDetails,
      balance: Number(newWalletDetails.balance),
      target: Number(newWalletDetails.target),
      created_at: now,
      updated_at: now,
    };
    setIsSaving(true);

    try {
      await axios.post('http://localhost:5000/wallet', newDetails);
      console.log('Wallet saved:', newDetails);
      navigate('/wallets'); // Navigate to the wallets list or appropriate page after saving
    } catch (error) {
      console.error('Error saving wallet:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle exits page button
  const handleExitClick = () => {
    navigate('/wallets');
  };

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
          Name:
          <input
            type='text'
            value={newWalletDetails.name}
            onChange={(e) => setNewWalletDetails({ ...newWalletDetails, name: e.target.value })}
            className='mt-1 px-2 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            required
          />
        </label>

        <label className='block text-sm font-medium text-gray-700'>
          Balance:
          <input
            type='number'
            value={newWalletDetails.balance}
            onChange={(e) => setNewWalletDetails({ ...newWalletDetails, balance: e.target.value })}
            className='mt-1 px-2 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            required
          />
        </label>

        <label className='block text-sm font-medium text-gray-700'>
        <Listbox value={selectedType} onChange={setSelectedType}>
            <div className='relative mt-1'>
              <ListboxButton className='relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
                <span className='block truncate'>{selectedType?.type || 'Select a wallet'}</span>
                <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                  <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                </span>
              </ListboxButton>
              <ListboxOptions className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {types.map((type) => (
                  <ListboxOption
                    key={type.id}
                    value={type.type}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'text-white bg-indigo-600' : 'text-gray-900'
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {type.type}
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
          Target Amount:
          <input
            type='number'
            value={newWalletDetails.target}
            onChange={(e) => setNewWalletDetails({ ...newWalletDetails, target: e.target.value })}
            className='mt-1 px-2 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            required
          />
        </label>

        <button
          type='submit'
          className='inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}
