import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../Pages/AdminPages/LoginPage'
import DashboardPage from '../Pages/AdminPages/DashboardPage'

const AdminRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/home" element={<DashboardPage/>}/>
      </Routes>
    </div>
  )
}

export default AdminRouter
