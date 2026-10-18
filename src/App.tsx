import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/home'
import HooksPage from './pages/HooksPage'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-800 w-full">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 w-full">
        <div className="px-6 lg:px-12">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-black text-slate-900 tracking-tighter hover:text-blue-600 transition-colors">
              AN/<span className="text-blue-600">REACT</span>
            </Link>
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/react-hooks" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">React hooks</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="w-full px-6 lg:px-12 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/react-hooks" element={<HooksPage />} />
        </Routes>
      </main>
      
      <footer className="border-t border-slate-200 py-12 mt-20 w-full">
        <div className="px-6 lg:px-12 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
          Build with React 19 & Tailwind CSS v4
        </div>
      </footer>
    </div>
  )
}

export default App
