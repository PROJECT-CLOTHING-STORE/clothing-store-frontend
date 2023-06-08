import { Navbar, Typography, Button } from '@material-tailwind/react'
import React from 'react'

const NavbarElement: React.FC = () => {
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Clothes
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Account
        </a>
      </Typography>
    </ul>
  )

  return (
    <>
      <Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            Clothing Store
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 lg:block">{navList}</div>
            <Button variant="gradient" size="sm" className=" lg:inline-block">
              <span>Sign Up</span>
            </Button>
          </div>
        </div>
      </Navbar>
    </>
  )
}

export default NavbarElement
