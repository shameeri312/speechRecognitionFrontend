'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('') // Added username state
  const [fullname, setFullname] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSignup = async () => {
    setError('') // Clear previous errors

    // Validate inputs
    if (!email || !username || !fullname || !password || !confirmPassword) {
      setError('Please fill in all fields.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          full_name: fullname,
          password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Success: Navigate to sign-in page
        navigate('/signin')
      } else {
        // Handle API errors (e.g., duplicate username/email, invalid email)
        setError(data.error || 'An error occurred. Please try again.')
      }
    } catch (err) {
      console.error('Signup error:', err)
      setError('Failed to connect to the server. Please try again later.')
    }
  }

  return (
    <div className="mx-auto flex w-full flex-wrap justify-center gap-5 px-4 py-10 xl:container xl:px-0">
      {/* Signup Form */}
      <div className="backdrop flex h-auto w-full max-w-md flex-col rounded-2xl border-2 border-gray-600 bg-gradient-to-br from-neutral-600/20 to-gray-800/40 p-8 shadow-xl">
        <div className="flex w-full flex-col justify-between gap-4">
          <h2 className="text-3xl font-bold md:text-4xl">Sign Up</h2>
          <p className="text-sm text-gray-300">
            Create an account to use the speech emotion detector.
          </p>

          {error && (
            <p className="flex w-auto items-center gap-2 rounded-lg bg-red-500 px-2 py-1 text-sm text-white">
              {error}
            </p>
          )}
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="text-sm">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-10 rounded-xl border border-neutral-600 bg-gradient-to-br from-neutral-600/20 to-gray-400/20 px-4 text-sm text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none md:h-12"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 rounded-xl border border-neutral-600 bg-gradient-to-br from-neutral-600/20 to-gray-400/20 px-4 text-sm text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none md:h-12"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="fullname" className="text-sm">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              placeholder="Enter your full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
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

          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword" className="text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-10 rounded-xl border border-neutral-600 bg-gradient-to-br from-neutral-600/20 to-gray-400/20 px-4 text-sm text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none md:h-12"
            />
          </div>

          <div className="custom gradient w-max rounded-l-xl rounded-br-xl p-[2px]">
            <button
              onClick={handleSignup}
              className="nova custom mx-auto h-10 w-[110px] cursor-pointer rounded-l-xl rounded-br-xl bg-black text-sm font-semibold text-white transition hover:bg-gray-900 md:h-12 md:w-[140px]"
            >
              Sign Up
            </button>
          </div>

          <p className="mt-4 text-sm text-gray-300">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/signin')}
              className="cursor-pointer text-indigo-400 underline hover:text-indigo-300"
            >
              Log in
            </span>
          </p>
        </div>
      </div>

      {/* Info Section */}
      <div className="hidden h-auto w-full max-w-md flex-col rounded-2xl border-2 border-gray-500 bg-gradient-to-br from-neutral-600/20 to-gray-800/40 p-8 text-white backdrop-blur lg:flex">
        <h2 className="text-2xl font-bold text-white">How it works?</h2>
        <p className="text-sm leading-relaxed text-gray-300">
          Speak your feelings — we will decode them for you. Our Speech Emotion
          Detector uses AI and deep learning to analyze your voice and identify
          your emotional state.
          <br />
          <br />
          🎙 Just sign up and record a short audio clip.
          <br />
          🧠 Our system will detect emotions like happy, sad, angry, fearful,
          and more — in real time.
          <br />
          🔋 Powered by TensorFlow, accurate, fast, and mental wellness focused.
          <br />
          <img src="/reactions.png" alt="reactions" />
          <br />
          Sign up now and let your voice speak your emotions!
        </p>
      </div>
    </div>
  )
}

export default Signup
