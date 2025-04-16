import { Bot } from 'lucide-react'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Navbar = ({ tab, setTab }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is authenticated based on localStorage
    const userEmail = localStorage.getItem('userEmail')
    const userPassword = localStorage.getItem('userPassword')

    if (userEmail && userPassword) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
      if (tab == 'detector') setTab('signin') // Redirect to login if not authenticated
    }
  }, [tab])

  const logout = () => {
    localStorage.clear()
    setIsAuthenticated(false)
  }

  return (
    <header className="backdrop absolute top-0 w-full text-white">
      <nav className="mx-auto flex h-[80px] items-center justify-between px-4 xl:container xl:px-0">
        <div className="xl:w-1/3 2xl:w-1/5">
          <h1 className="flex items-center gap-2 text-2xl font-bold lg:text-3xl">
            {' '}
            <Bot className="size-8 text-purple-600 lg:size-10" />
            Emotion Detector
          </h1>
        </div>

        <>
          <ul className="nova hidden h-full items-center justify-center gap-16 uppercase lg:flex xl:w-1/3 2xl:w-2/5">
            <li>
              <button onClick={() => setTab('home')}>Home</button>
            </li>
            <li>
              <button onClick={() => setTab('about')}>About</button>
            </li>
            <li>
              <button onClick={() => setTab('contact')}>Contact</button>
            </li>
          </ul>
        </>

        <div className="nova flex items-center justify-end gap-2 text-sm lg:text-base xl:w-1/3 2xl:w-1/5">
          {isAuthenticated ? (
            <div className="custom gradient rounded-l-lg rounded-br-lg p-[2px]">
              <button
                onClick={() => logout()}
                className="cursor-pointer px-6 py-2 text-black uppercase"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <div className="hidden rounded-l-lg rounded-br-lg p-[2px] md:inline">
                <button
                  onClick={() => setTab('signup')}
                  className="cursor-pointer px-6 py-2 uppercase"
                >
                  Create Account
                </button>
              </div>
              <div className="custom gradient rounded-l-lg rounded-br-lg p-[2px]">
                <button
                  onClick={() => setTab('signin')}
                  className="custom cursor-pointer rounded-l-lg rounded-br-lg bg-black px-6 py-2 uppercase"
                >
                  Signin
                </button>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
