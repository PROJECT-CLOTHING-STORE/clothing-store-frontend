import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
// import {HeroSection, FAQSection} from './sections
// import {} from './module-elements'

export const RegistrationModule: React.FC = () => {
  // TODO: Write module's logic
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async () => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      },
    })

    await axios
      .post(
        'https://clothing-store-backend-production.up.railway.app/auth/register',
        {
          username: username,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        }
      )
      .then((resp) => {
        if (resp.data.message === 'Success')
          Toast.fire({
            icon: 'success',
            title: 'Registered successfully',
            didClose: () => {
              router.push('/login')
            },
          })
        else throw Error()
      })
      .catch((resp) => {
        Toast.fire({
          icon: 'error',
          title: 'Register unsuccessful!',
        })
      })
  }
  return (
    <>
      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            maxWidth: '500px',
            margin: 2,
            padding: 20,
            borderRadius: '10px',
            backgroundColor: 'whitesmoke',
          }}
        >
          <div
            className="flex flex-col py-2 gap-10 grow"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
            }}
          >
            <h1 style={{ color: 'black', fontSize: 48, fontWeight: 'bold' }}>
              Register
            </h1>
            <div
              style={{
                width: '100%',
                color: 'black',
                alignItems: 'flex-start',
                textAlign: 'start',
              }}
            >
              <label style={{ paddingLeft: 3 }} htmlFor="username_text_input">
                Username
              </label>
              <input
                type="text"
                placeholder="e.g. Bambang123"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input input-bordered w-full max-w-md"
                id="username_text_input"
              />
            </div>
            <div
              style={{
                width: '100%',
                color: 'black',
                alignItems: 'flex-start',
                textAlign: 'start',
              }}
            >
              <label style={{ paddingLeft: 3 }} htmlFor="password_text_input">
                Password
              </label>
              <input
                type="password"
                placeholder="e.g. Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full max-w-md"
                id="password_text_input"
              />
            </div>
            <button className="btn btn-primary" onClick={handleRegister}>
              Submit
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
