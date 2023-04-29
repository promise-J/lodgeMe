// import React from 'react'

import ClientOnly from "../components/ClientOnly"
import RegisterModal from "../components/modals/RegisterModal"
import Navbar from "../components/navbar/Navbar"
import ToasterProvider from "../providers/ToasterProvider"
import Slider from '../components/Slider'

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({children} : LayoutProps) => {
  return (
    <div>
         <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        <Slider />
        {children}
    </div>
  )
}

export default Layout