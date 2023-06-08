import React, { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  // TODO: Write element's logic

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
