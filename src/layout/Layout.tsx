// import React from 'react'

import ClientOnly from "../components/ClientOnly"
import RegisterModal from "../components/modals/RegisterModal"
import Navbar from "../components/navbar/Navbar"
import ToasterProvider from "../providers/ToasterProvider"
import LoginModal from "../components/modals/LoginModal"
import RentalModal from "../components/modals/RentalModal"

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({children} : LayoutProps) => {
  return (
    <div className="">
         <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <RentalModal />
          <Navbar />
        </ClientOnly>
        {children}
    </div>
  )
}

export default Layout