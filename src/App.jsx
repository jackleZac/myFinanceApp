import './index.css'
import './App.css';
import  Sidebar  from './components/Sidebar'
import  Dashboard  from './pages/Dashboard'
import  Transaction  from './pages/Transaction'
import AddTransaction from './pages/AddTransaction';
import EditTransaction from './pages/EditTransaction';
import  Income from './pages/Income'
import AddIncome from './pages/AddIncome'
import EditIncome from './pages/EditIncome'
import AddWallet from './pages/AddWallet';
import  Investment from './pages/Investment'
import News from './pages/News'
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/income" element={<Income />} />
          <Route path="/add-income" element={<AddIncome />} />
          <Route path="/edit-income" element={<EditIncome />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/edit-transaction" element={<EditTransaction />} />
          <Route path='add-wallet' element={<AddWallet />} />
          <Route path="/investment" element={<Investment />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
