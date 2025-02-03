import React from 'react'
import LoginPage from '../Pages/UserPages/LoginPage'
import { Route, Routes } from 'react-router-dom'
import SignupPage from '../Pages/UserPages/SignupPage'
import Landingpage from '../Pages/UserPages/Landingpage'
import DashboardPage from '../Pages/UserPages/DashboardPage'

function UserRouter() {
  return (
    <div>
    <Routes>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path='/signup' element={<SignupPage/>}/>
    <Route path='/' element={<Landingpage/>}/>
    <Route path='/dash' element={<DashboardPage/>}/>
    </Routes>
    
    </div>
  )
}

export default UserRouter