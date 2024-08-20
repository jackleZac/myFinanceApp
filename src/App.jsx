import './index.css'
import './App.css';
import  Sidebar  from './components/Sidebar'
import  Dashboard  from './pages/Dashboard/Dashboard'
import  Transaction  from './pages/Transaction/Transaction'
import AddTransaction from './pages/Transaction/AddTransaction';
import EditTransaction from './pages/Transaction/EditTransaction';
import  Income from './pages/Income/Income'
import AddIncome from './pages/Income/AddIncome'
import EditIncome from './pages/Income/EditIncome'
import AddWallet from './pages/Account/AddWallet';
import  Investment from './pages/Investment/Investment'
import News from './pages/News/News'
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='flex'>
      <Sidebar />
      <main className='flex-1'>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/income' element={<Income />} />
          <Route path='/income/add-income' element={<AddIncome />} />
          <Route path='/income/edit-income' element={<EditIncome />} />
          <Route path='/transaction' element={<Transaction />} />
          <Route path='/transaction/add-transaction' element={<AddTransaction />} />
          <Route path='/transaction/edit-transaction' element={<EditTransaction />} />
          <Route path='add-wallet' element={<AddWallet />} />
          <Route path='/investment' element={<Investment />} />
          <Route path='/news' element={<News />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
