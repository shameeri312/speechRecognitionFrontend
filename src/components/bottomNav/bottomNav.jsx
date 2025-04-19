import { Home, Info, LogIn, LogOut, Mic, Phone } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const BottomNav = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is authenticated based on localStorage
    const token = localStorage.getItem('token')

    if (token) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [])

  const logout = () => {
    localStorage.clear()
    setIsAuthenticated(false)
    navigate('/')
  }

  const styles =
    'flex flex-col size-[56px] cursor-pointer justify-center items-center rounded-full hover:bg-blue-800'

  return (
    <nav className="fixed bottom-2 w-full px-1 text-white lg:hidden">
      <div className="gradient mx-auto w-max rounded-full p-[2px]">
        <ul className="nova flex h-[60px] items-center justify-center gap-8 rounded-full bg-[#14213d] px-1 uppercase md:w-max">
          <li className={styles}>
            <NavLink to="/">
              <Home />
            </NavLink>
            <span className="text-[10px]">Home</span>
          </li>
          <li className={styles}>
            <NavLink to="/about">
              <Info className="w-max" />
            </NavLink>
            <span className="text-[10px]">About</span>
          </li>

          <NavLink to={'/detector'}>
            <li className="gradient flex size-20 cursor-pointer flex-col items-center justify-center rounded-full text-black">
              <button className="zoom-in cursor-pointer">
                <Mic className="rounded-full" />
              </button>
              <span className="text-[10px]">Detect</span>
            </li>
          </NavLink>

          <li className={styles}>
            <NavLink to="/contact">
              <Phone />
            </NavLink>
            <span className="text-[10px]">Contact</span>
          </li>

          {isAuthenticated ? (
            <li
              className={styles}
              onClick={() => {
                localStorage.clear()
              }}
            >
              <LogOut />
              <span className="text-[10px]">Logout</span>
            </li>
          ) : (
            <li onClick={() => logout()} className={styles}>
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
