
import { Route, Routes } from 'react-router-dom'

import './App.css'

import Dashboard from './components/Dashboard'

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Dashboard />} />
    </Routes>
  )
}

export default App
