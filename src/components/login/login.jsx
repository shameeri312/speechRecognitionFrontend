'use client'

import { useState } from 'react'

const Login = ({ setTab }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    if (!email || !password) {
      alert('Please enter both email and password.')
      return
    }

    // Save login details to localStorage
    localStorage.setItem('userEmail', email)
    localStorage.setItem('userPassword', password)

    setTab('detector')
  }

  return (
    <div className="bg-gradient-to-tr to-white/30 text-white from-gray-300/10 flex flex-col gap-4 border border-gray-300/40 backdrop-blur p-8 w-[90%] rounded-2xl md:w-[500px] mx-auto">
      <h2 className="font-semibold text-3xl text-center">Login</h2>

      <div className="flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white/40 border border-white/80 rounded-lg px-3 h-11 text-sm outline-green-500 text-black"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-white/40 border border-white/80 rounded-lg px-3 h-11 text-sm outline-green-500 text-black"
        />
      </div>

      <p className="text-start underline text-green-400">Forgot Password?</p>

      <button
        onClick={handleLogin}
        className="bg-green-400 w-full h-11 text-black font-semibold mx-auto cursor-pointer rounded-lg"
      >
        Login
      </button>
    </div>
  )
}

export default Login
