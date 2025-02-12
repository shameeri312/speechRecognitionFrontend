import { useState, useEffect } from 'react'
import './App.css'
import Home from './components/home/home'
import EmotionDetector from './components/emotionDetector/EmotionDetector'
import { FaFacebookF, FaInstagram, FaLinkedin } from 'react-icons/fa6'
import Login from './components/login/login'

const App = () => {
  const [tab, setTab] = useState('home')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is authenticated based on localStorage
    const userEmail = localStorage.getItem('userEmail')
    const userPassword = localStorage.getItem('userPassword')

    if (userEmail && userPassword) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
      if (tab == 'detector') setTab('login') // Redirect to login if not authenticated
    }
  }, [tab])

  return (
    <main className="main overflow-y-auto">
      <div className="bg-[#0000005d] gap-6 h-[90vh] flex flex-col justify-center">
        {tab === 'home' ? (
          <>
            <h1 className="lg:leading-24 font-extrabold text-white tracking-wider uppercase text-center text-6xl lg:text-7xl xl:text-8xl">
              Speech Emotion <br /> Detector
            </h1>

            <p className="max-w-[900px] mx-auto text-xl lg:text-2xl font-serif italic text-center text-gray-300 px-5">
              An advanced AI-driven Speech Emotion Detection System using
              Python, Flask, and React.js. Analyze speech patterns to detect
              emotions with high accuracy, real-time processing, and seamless
              frontend integration.
            </p>
          </>
        ) : tab === 'detector' ? (
          <EmotionDetector />
        ) : (
          <Login setTab={setTab} />
        )}
      </div>

      <div className="bg-[#0000005d] px-2 sm:px-6 md:px-10">
        <div className="max-w-[1336px] h-[7vh] md:h-[8vh] flex justify-between mx-auto bg-gray-300/30">
          <ul className="w-1/3 flex text-white h-full items-center">
            <li
              onClick={() => setTab('home')}
              className={`${tab === 'home' && 'bg-white text-black hover:bg-white'} transition-all duration-200 cursor-pointer hover:bg-gray-300/60 px-4 md:px-8 lg:px-12 font-semibold text-base md:text-lg lg:text-xl h-full grid place-content-center`}
            >
              Home
            </li>
            <li
              onClick={() =>
                isAuthenticated ? setTab('detector') : setTab('login')
              }
              className={`${tab === 'detector' && 'bg-white text-black hover:bg-white'} transition-all duration-200 cursor-pointer hover:bg-gray-300/60 px-4 md:px-8 lg:px-12 font-semibold text-base md:text-lg lg:text-xl h-full grid place-content-center`}
            >
              Detector
            </li>
            {isAuthenticated ? (
              <li
                onClick={() => {
                  setTab('login')
                  localStorage.clear()
                }}
                className={`${tab === 'login' && 'bg-white text-black hover:bg-white'} transition-all duration-200 cursor-pointer hover:bg-gray-300/60 px-4 md:px-8 lg:px-12 font-semibold text-base md:text-lg lg:text-xl h-full grid place-content-center`}
              >
                Logout
              </li>
            ) : (
              <li
                onClick={() => setTab('login')}
                className={`${tab === 'login' && 'bg-white text-black hover:bg-white'} transition-all duration-200 cursor-pointer hover:bg-gray-300/60 px-4 md:px-8 lg:px-12 font-semibold text-base md:text-lg lg:text-xl h-full grid place-content-center`}
              >
                Login
              </li>
            )}
          </ul>
          <ul className="w-1/3 hidden md:flex text-white h-full justify-end gap-4 items-center pr-4">
            <li className="transition-all duration-200 cursor-pointer hover:text-blue-400 px-2 md:px-4 font-semibold text-xl h-full grid place-content-center">
              <FaFacebookF />
            </li>
            <li className="transition-all duration-200 cursor-pointer hover:text-blue-400 px-2 md:px-4 font-semibold text-xl h-full grid place-content-center">
              <FaInstagram />
            </li>
            <li className="transition-all duration-200 cursor-pointer hover:text-blue-400 px-2 md:px-4 font-semibold text-xl h-full grid place-content-center">
              <FaLinkedin />
            </li>
          </ul>
        </div>

        <div
          className={`bg-white max-w-[1336px] ${tab === 'home' ? 'h-full' : 'h-[2vh]'} mx-auto space-y-10`}
        >
          {tab === 'home' && <Home />}
        </div>
      </div>
    </main>
  )
}

export default App
