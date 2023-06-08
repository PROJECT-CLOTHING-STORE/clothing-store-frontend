import React, { ReactNode } from 'react'
import NavbarElement from './Navbar'
import FooterElement from './Footer'

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  // TODO: Write element's logic

  return (
    <>
      <NavbarElement />
      {children}
      <FooterElement />
    </>
  )
}
