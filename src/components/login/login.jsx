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

    localStorage.setItem('userEmail', email)
    localStorage.setItem('userPassword', password)

    setTab('detector')
  }

  return (
    <div className="mx-auto flex w-full flex-wrap justify-center gap-5 px-4 py-10 xl:container xl:px-0">
      {/* Login Form */}
      <div className="backdrop flex h-auto w-full max-w-md flex-col rounded-2xl border-2 border-gray-600 bg-gradient-to-br from-neutral-600/20 to-gray-800/40 p-8 shadow-xl">
        <div className="flex w-full flex-col justify-between gap-4">
          <h2 className="text-3xl font-bold md:text-4xl">Login</h2>
          <p className="text-sm text-gray-300">
            Log in to access the speech emotion detector.
          </p>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 rounded-xl border border-neutral-600 bg-gradient-to-br from-neutral-600/20 to-gray-400/20 px-4 text-sm text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none md:h-12"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 rounded-xl border border-neutral-600 bg-gradient-to-br from-neutral-600/20 to-gray-400/20 px-4 text-sm text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none md:h-12"
            />
          </div>

          <p className="mt-1 cursor-pointer text-sm text-neutral-300 underline hover:text-white">
            Forgot Password?
          </p>

          <div className="custom gradient w-max rounded-l-xl rounded-br-xl p-[2px]">
            <button
              onClick={handleLogin}
              className="nova custom mx-auto h-10 w-[110px] cursor-pointer rounded-l-xl rounded-br-xl bg-black text-sm font-semibold text-white transition hover:bg-gray-900 md:h-12 md:w-[140px]"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="hidden h-auto w-full max-w-md flex-col rounded-2xl border-2 border-gray-500 bg-gradient-to-br from-neutral-600/20 to-gray-800/40 p-8 text-white backdrop-blur lg:flex">
        <h2 className="text-2xl font-bold text-white">How it works?</h2>
        <p className="text-sm leading-relaxed text-gray-300">
          Speak your feelings — we’ll decode them for you. Our Speech Emotion
          Detector uses AI and deep learning to analyze your voice and identify
          your emotional state.
          <br />
          <br />
          🎙 Just log in and record a short audio clip.
          <br />
          🧠 Our system will detect emotions like happy, sad, angry, fearful,
          and more — in real time.
          <br />
          🔋 Powered by TensorFlow, accurate, fast, and mental wellness focused.
          <br />
          <img src="/reactions.png" alt="reactions" />
          <br />
          Login now and let your voice speak your emotions!
        </p>
      </div>
    </div>
  )
}

export default Login
