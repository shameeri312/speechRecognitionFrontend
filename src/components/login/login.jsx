'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    setError('')
    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }

    try {
      // Authenticate user
      const loginResponse = await fetch('http://127.0.0.1:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const loginData = await loginResponse.json()

      if (!loginResponse.ok) {
        setError(loginData.error || 'An error occurred during login.')
        return
      }

      // Fetch user profile using user_id
      const userId = loginData.user.id
      const profileResponse = await fetch(
        `http://127.0.0.1:5000/users/${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const profileData = await profileResponse.json()

      if (!profileResponse.ok) {
        setError(profileData.error || 'Failed to fetch user profile.')
        return
      }

      // Store data in localStorage
      localStorage.setItem('token', loginData.token)
      localStorage.setItem('userEmail', profileData.email)
      localStorage.setItem('userFullname', profileData.full_name)
      localStorage.setItem(
        'userProfile',
        JSON.stringify({
          id: profileData.id,
          username: profileData.username,
          email: profileData.email,
          full_name: profileData.full_name,
        })
      )

      // Navigate to detector
      navigate('/detector')
    } catch (err) {
      console.error('Login error:', err)
      setError('Failed to connect to the server. Please try again later.')
    }
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
          {error && (
            <p className="flex w-max items-center gap-2 rounded-lg bg-red-500 px-2 py-1 text-sm text-white">
              {error}
            </p>
          )}

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

          <p className="mt-4 text-sm text-gray-300">
            Don&apos;t have an account?{' '}
            <span
              onClick={() => navigate('/signup')}
              className="cursor-pointer text-indigo-400 underline hover:text-indigo-300"
            >
              Sign up
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
