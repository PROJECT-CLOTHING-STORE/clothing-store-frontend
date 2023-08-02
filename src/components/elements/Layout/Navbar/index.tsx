import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const NavbarElement: React.FC = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [windowWidth, setWindowWidth] = useState(0)
  const authButton = () => {
    if (session) {
      signOut()
    } else {
      router.push('/login')
    }
  }
  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  }
  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <>
      <div
        className="navbar bg-base-100"
        style={{
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 999,
        }}
      >
        <div className="navbar-start">
          <div className="dropdown" style={{ zIndex: 999 }}>
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a href="/clothes">Clothes</a>
              </li>
              <li>
                <a href="/transactionList">Transactions</a>
              </li>
              {/* <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li> */}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl" href="/">
            Clothing Store
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="/clothes">Clothes</a>
            </li>
            <li>
              <a href="/transactionList">Transactions</a>
            </li>
            {/* <li tabIndex={0}>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li> */}
          </ul>
        </div>
        <div className="navbar-end">
          {session && windowWidth > 500 ? (
            <h1>Welcome, {session?.user.username}</h1>
          ) : (
            ''
          )}
          <button className="btn mx-5" onClick={authButton}>
            {session ? 'Sign Out' : 'Sign Up'}
          </button>
        </div>
      </div>
    </>
  )
}

export default NavbarElement
