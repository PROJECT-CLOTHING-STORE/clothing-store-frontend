import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
// import {HeroSection, FAQSection} from './sections
// import {} from './module-elements'

export const LoginModule: React.FC = () => {
  // TODO: Write module's logic
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleSignIn = async () => {
    const result = await signIn('credentials', {
      redirect: false,
      username: username,
      password: password,
    })
    if (result!.error) {
      // Handle sign-in error
      console.error(result!.error)
    } else {
      // Handle successful sign-in (e.g., redirect to a dashboard page)
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
