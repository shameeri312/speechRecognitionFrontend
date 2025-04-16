import {
  Contact,
  Contact2,
  Home,
  Info,
  Link2Icon,
  LogIn,
  LogOut,
  Mic,
  Phone,
  PhoneCall,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Login from '../login/login'

const BottomNav = ({ tab, setTab }) => {
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

  const styles =
    'flex flex-col size-[56px] cursor-pointer justify-center items-center rounded-full hover:bg-blue-800'

  return (
    <nav className="fixed bottom-2 w-full px-1 text-white lg:hidden">
      <div className="gradient mx-auto w-max rounded-full p-[2px]">
        <ul className="nova flex h-[60px] items-center justify-center gap-8 rounded-full bg-[#14213d] px-1 uppercase md:w-max">
          <li onClick={() => setTab('home')} className={styles}>
            <a href="#">
              <Home />
            </a>
            <span className="text-[10px]">Home</span>
          </li>
          <li onClick={() => setTab('about')} className={styles}>
            <a href="#">
              <Info className="w-max" />
            </a>
            <span className="text-[10px]">About</span>
          </li>

          <li
            onClick={() => setTab('detector')}
            className="gradient flex size-20 cursor-pointer flex-col items-center justify-center rounded-full text-black"
          >
            <button className="zoom-in cursor-pointer">
              <Mic className="rounded-full" />
            </button>
            <span className="text-[10px]">Detect</span>
          </li>

          <li className={styles} onClick={() => setTab('contact')}>
            <a href="#">
              <Phone />
            </a>
            <span className="text-[10px]">Contact</span>
          </li>

          {isAuthenticated ? (
            <li
              className={styles}
              onClick={() => {
                setTab('signin')
                localStorage.clear()
              }}
            >
              <LogOut />
              <span className="text-[10px]">Logout</span>
            </li>
          ) : (
            <li className={styles} onClick={() => setTab('signin')}>
              <LogIn />
              <span className="text-[10px]">Signin</span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default BottomNav
