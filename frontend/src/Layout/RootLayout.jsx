import React from 'react'
import Header from '../Components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'

function RootLayout() {
  return (
    <div className="" >
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default RootLayout