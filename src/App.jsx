import './index.css'
import './App.css';
import  Sidebar  from './components/Sidebar'
import  Dashboard  from './pages/Dashboard'
import  Transaction  from './pages/Transaction'
import  Income from './pages/Income'
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
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/investment" element={<Investment />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
