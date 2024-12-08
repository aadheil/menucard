import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './Home/Home'
import DashboardSA from './Super-admin/DashboardSA'

function App() {
  return (
   
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/dashboard/super-admin' element={<DashboardSA />} />
    </Routes>
  )
}

export default App