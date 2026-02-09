import { Routes, Route } from 'react-router'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { SitterProfile } from './pages/SitterProfile'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cuidadora/:id" element={<SitterProfile />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
