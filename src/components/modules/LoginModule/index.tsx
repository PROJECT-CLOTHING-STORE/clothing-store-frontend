import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
// import {HeroSection, FAQSection} from './sections
// import {} from './module-elements'

export const LoginModule: React.FC = () => {
  // TODO: Write module's logic
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleSignIn = async () => {
    const result = await signIn('credentials', {
      redirect: false,
      username: username,
      password: password,
    })
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
    if (result!.error) {
      Toast.fire({
        icon: 'error',
        title: 'Sign in unsuccessful!',
      })
      console.error(result!.error)
    } else {
      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully',
        didClose: () => {
          router.push('/')
        },
      })

      console.log('Sign-in successful!')
    }
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
              Sign in
            </h1>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input input-bordered w-full max-w-md"
              id="username_text_input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full max-w-md"
              id="password_text_input"
            />
            <button className="btn btn-primary" onClick={handleSignIn}>
              Submit
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
