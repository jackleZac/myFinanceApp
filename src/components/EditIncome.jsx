import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const categories = [
  { id: 1, name: 'Salary', avatar: '' },
  { id: 2, name: 'Investment', avatar: '' },
  { id: 3, name: 'Freelancing', avatar: '' },
  { id: 4, name: 'Gifts', avatar: '' },
  { id: 5, name: 'Other', avatar: '' },
  // Add or modify categories based on your needs
];

export default function EditIncome({...selectedIncome}) {
  // Keep the initial details intact
  const [incomeDetails, setIncomeDetails] = useState(selectedIncome)
  console.log('Details of selected income: ', incomeDetails)

  // Create a copy for updates
  const [updatedIncomeDetails, setUpdatedIncomeDetails] = useState({ ...selectedIncome });

  // Get the details of selected category
  const [selectedCategory, setSelectedCategory] = useState([])
  console.log(selectedCategory)

  // Get the details of selected wallet
  const [wallets, setWallets] = useState([])
  console.log(wallets)
  const [selectedWallet, setSelectedWallet] = useState([])
  console.log(selectedWallet)

  // Handle income update
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Perform the GET request to retrieve a list of wallets
    axios.get('http://localhost:5000/wallet')
    .then(response => {
      console.log('A list of available wallets: ', response.data['wallets']);
      setWallets(response.data['wallets']);
    })
    .catch(error => {
      console.error('There was an error fetching the wallets!', error)
    })
  }, []);

  useEffect(() => {
    if (wallets.length > 0) {
      // Find the details of selected category from a list of categories
      const initialCategory = categories.find(category => category.name === updatedIncomeDetails.source);
      setSelectedCategory(initialCategory || { id: null, name: '' });
      // Find the details of selected wallet from a list of wallets
      const initialWallet = wallets.find(wallet => wallet.wallet_id === updatedIncomeDetails.wallet_id);
      setSelectedWallet(initialWallet || { wallet_id: null, type: '' });
    }
  }, [updatedIncomeDetails, wallets]);

  const handleSave = async () => {
    // Convert date to ISO 8601 format
    const isoDate = new Date(updatedIncomeDetails.date).toISOString();
    // Create a new object excluding the _id field
    const { _id, ...detailsWithoutId } = updatedIncomeDetails;
    const updatedDetails = { ...detailsWithoutId, amount: Number(updatedIncomeDetails.amount), date: isoDate };
    console.log(updatedDetails);
    setIsSaving(true);

    try {
      // Perform the PUT request with updatedIncomeDetails
      await axios.put(`http://localhost:5000/income/${incomeDetails._id}`, updatedDetails);
      console.log('Saving income:', updatedDetails);
    } catch (error) {
      console.error('Error saving income:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className='grid grid-cols-1 gap-4'
      >
        <label className='block text-sm font-medium leading-6 text-gray-600'>
          Date:
          <input
            type='date'
            value={updatedIncomeDetails?.date || ''}
            onChange={(e) => setUpdatedIncomeDetails({ ...updatedIncomeDetails, date: e.target.value })}
            className='block w-full mt-1 rounded-md border-gray-300 py-1.5 pl-4 pr-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          />
        </label>

        <label>
          <Listbox
            value={selectedCategory}
            onChange={(category) => {
              setSelectedCategory(category);
              setUpdatedIncomeDetails({ ...updatedIncomeDetails, source: category.name });
            }}
          >
            <Label className='block text-sm font-medium leading-6 text-gray-600'>Source</Label>
            <div className='relative mt-2'>
              <ListboxButton className='relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6'>
                <span className='flex items-center'>
                  <span className='ml-3 block truncate'>{selectedCategory?.name || 'Select a source'}</span>
                </span>
                <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
                  <ChevronUpDownIcon aria-hidden='true' className='h-5 w-5 text-gray-400' />
                </span>
              </ListboxButton>
              <ListboxOptions
                className='absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
              >
                {categories.map((option) => (
                  <ListboxOption
                    key={option.id}
                    value={option}
                    className='group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white'
                  >
                    <div className='flex items-center'>
                      <img alt='' src={option.avatar} className='h-5 w-5 flex-shrink-0 rounded-full' />
                      <span className='ml-3 block truncate'>{option.name}</span>
                    </div>
                    {selectedCategory?.id === option.id && (
                      <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600'>
                        <CheckIcon aria-hidden='true' className='h-5 w-5' />
                      </span>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
        </label>

        <label className='block text-sm font-medium leading-6 text-gray-600'>
          Amount:
          <input
            type='number'
            value={updatedIncomeDetails?.amount || ''}
            onChange={(e) => setUpdatedIncomeDetails({ ...updatedIncomeDetails, amount: e.target.value })}
            className='block w-full rounded-md border-0 py-1.5 pl-4 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          />
        </label>

        <label className='block text-sm font-medium leading-6 text-gray-600'>
          Description:
          <input
            type='text'
            value={updatedIncomeDetails?.description || ''}
            onChange={(e) => setUpdatedIncomeDetails({ ...updatedIncomeDetails, description: e.target.value })}
            className='block w-full mt-1 rounded-md border-gray-300 py-1.5 pl-4 pr-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          />
        </label>

        <label>
          <Listbox
            value={selectedWallet}
            onChange={(wallet) => {
              setSelectedWallet(wallet);
              setUpdatedIncomeDetails({ ...updatedIncomeDetails, wallet_id: wallet.wallet_id });
            }}
          >
            <Label className='block text-sm font-medium leading-6 text-gray-600'>Wallet</Label>
            <div className='relative mt-2'>
              <ListboxButton className='relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6'>
                <span className='flex items-center'>
                  <span className='ml-3 block truncate'>{selectedWallet?.type || 'Select a wallet'}</span>
                </span>
                <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
                  <ChevronUpDownIcon aria-hidden='true' className='h-5 w-5 text-gray-400' />
                </span>
              </ListboxButton>
              <ListboxOptions
                className='absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
              >
                {wallets.map((option) => (
                  <ListboxOption
                    key={option.wallet_id}
                    value={option}
                    className='group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white'
                  >
                    <div className='flex items-center'>
                      <span className='ml-3 block truncate'>{option.type}</span>
                    </div>
                    {selectedWallet?.wallet_id === option.wallet_id && (
                      <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600'>
                        <CheckIcon aria-hidden='true' className='h-5 w-5' />
                      </span>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
        </label>

        <button
          type='submit'
          className={`mt-2 p-2 rounded ${isSaving ? 'bg-gray-500' : 'bg-blue-500'} text-white`}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}
