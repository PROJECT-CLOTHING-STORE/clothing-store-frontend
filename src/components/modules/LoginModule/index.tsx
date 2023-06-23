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
      <main>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleSignIn}>
          Sign In
        </button>
      </main>
    </>
  )
}
