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
    <div className="mx-auto flex w-full justify-center gap-5 px-6 md:px-0 2xl:w-[1336px]">
      <div className="backdrop mx-auto flex h-auto w-full flex-col rounded-2xl border-2 border-gray-600 bg-gradient-to-br from-neutral-600/20 to-gray-800/40 p-10 shadow-xl md:h-[550px] md:w-[550px]">
        <div className="flex h-full w-full flex-col justify-around gap-6">
          <h2 className="text-4xl font-bold md:text-5xl">Login</h2>
          <p>Login in to get access to the speech emotion detector</p>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-xl border border-neutral-600 bg-gradient-to-br from-neutral-600/20 to-gray-400/20 px-5 md:h-[56px]"
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
              className="h-12 rounded-xl border border-neutral-600 bg-gradient-to-br from-neutral-600/20 to-gray-400/20 px-5 md:h-[56px]"
            />
          </div>

          <p className="text-start text-neutral-300 underline">
            Forgot Password?
          </p>

          <div className="custom gradient w-max rounded-l-xl rounded-br-xl p-1">
            <button
              onClick={handleLogin}
              className="custom nova mx-auto h-12 w-[120px] cursor-pointer rounded-l-xl rounded-br-xl bg-black font-semibold md:h-[56px] md:w-[150px]"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto hidden w-[calc(100%_-_550px)] flex-col gap-4 rounded-2xl border-2 border-gray-500 bg-gradient-to-br from-neutral-600/20 to-gray-800/40 p-10 text-white backdrop-blur lg:flex">
        <h2 className="text-4xl font-bold md:text-5xl">How it works?</h2>
        <p>
          Login in to get access to the speech emotion detector Lorem, ipsum
          dolor sit amet consectetur adipisicing elit. Nostrum adipisci eos
          illum est suscipit maxime reiciendis, animi laborum tenetur itaque,
          sit error sint sed pariatur!
        </p>
      </div>
    </div>
  )
}

export default Login
