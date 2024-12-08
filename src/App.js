import React from 'react'
import Home from './Home/Home'
import Api from './Home/Api'
import DashboardSA from './Super-admin/DashboardSA'
import { Route, Routes } from 'react-router'

function App() {
  return (
   
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/super-admin/dashboard' element={<DashboardSA />} />
    </Routes>
  )
}

export default App