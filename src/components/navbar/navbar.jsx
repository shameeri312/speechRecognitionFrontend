'use client'

import { Bot } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState('User')
  const navigate = useNavigate()

  // Get user name from localStorage
  const getUserName = () => {
    try {
      const profile = JSON.parse(localStorage.getItem('userProfile'))
      if (profile && profile.full_name) {
        return profile.full_name
      }
      return localStorage.getItem('userFullname') || 'User'
    } catch (err) {
      console.error('Error parsing userProfile:', err)
      return localStorage.getItem('userFullname') || 'User'
    }
  }

  // Check authentication status
  const checkAuthStatus = () => {
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token)
    if (token) {
      setUserName(getUserName())
    } else {
      setUserName('User')
    }
  }

  useEffect(() => {
    // Initial check
    checkAuthStatus()

    // Listen for storage changes (e.g., login/logout from other components)
    const handleStorageChange = (e) => {
      if (
        e.key === 'token' ||
        e.key === 'userProfile' ||
        e.key === 'userFullname'
      ) {
        checkAuthStatus()
      }
    }

    window.addEventListener('storage', handleStorageChange)

    // Custom event for same-tab updates
    const handleAuthChange = () => checkAuthStatus()
    window.addEventListener('authChange', handleAuthChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('authChange', handleAuthChange)
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userFullname')
    localStorage.removeItem('userProfile')
    setIsAuthenticated(false)
    setUserName('User')
    window.dispatchEvent(new Event('authChange'))
    navigate('/signin')
  }

  return (
    <header className="backdrop w-full text-white">
      <nav className="mx-auto flex h-[80px] items-center justify-between px-4 xl:container xl:px-0">
        <div className="xl:w-1/3 2xl:w-1/5">
          <h1 className="flex items-center gap-2 text-2xl font-bold lg:text-3xl">
            <Bot className="size-8 text-purple-600 lg:size-10" />
            Emotion Detector
          </h1>
        </div>

        <ul className="nova hidden h-full items-center justify-center gap-16 uppercase lg:flex xl:w-1/3 2xl:w-2/5">
          <li>
            <NavLink to={'/'}>Home</NavLink>
          </li>
          <li>
            <NavLink to={'/about'}>About</NavLink>
          </li>
          <li>
            <NavLink to={'/contact'}>Contact</NavLink>
          </li>
        </ul>

        <div className="nova flex items-center justify-end gap-2 text-sm lg:text-base xl:w-1/3 2xl:w-1/5">
          {isAuthenticated ? (
            <>
              <span className="max-w-[150px] truncate">
                Welcome, {userName}
              </span>
              <div className="custom gradient rounded-l-lg rounded-br-lg p-[2px]">
                <button
                  onClick={logout}
                  className="cursor-pointer px-6 py-2 text-black uppercase"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="hidden rounded-l-lg rounded-br-lg p-[2px] md:inline">
                <NavLink
                  to={'/signup'}
                  className="cursor-pointer px-6 py-2 uppercase"
                >
                  Create Account
                </NavLink>
              </div>
              <div className="custom gradient rounded-l-lg rounded-br-lg p-[2px]">
                <NavLink to={'/signin'}>
                  <button className="custom cursor-pointer rounded-l-lg rounded-br-lg bg-black px-6 py-2 uppercase">
                    Signin
                  </button>
                </NavLink>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
