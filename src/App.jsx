import { useState } from 'react'
import './App.css'
import EmotionDetector from './components/emotionDetector/EmotionDetector'
import Login from './components/login/login'
import Navbar from './components/navbar/navbar'
import BottomNav from './components/bottomNav/bottomNav'
import About from './components/about/about'
import Contact from './components/contact/contact'

const App = () => {
  const [tab, setTab] = useState('home')

  return (
    <main className="main overflow-y-auto">
      <Navbar tab={tab} setTab={setTab} />
      <div className="flex h-[calc(100vh_-_80px)] flex-col justify-center gap-6 !text-white">
        {tab === 'home' ? (
          <div className="mx-auto flex max-w-6xl flex-col items-center space-y-4">
            <h1 className="text-center text-6xl font-bold text-white lg:text-7xl xl:text-8xl">
              Speech Emotion Detector
            </h1>

            <p className="mx-auto px-5 text-center text-xl text-gray-300 lg:text-2xl">
              An advanced AI-driven Speech Emotion Detection System using
              Python, Flask, and React.js. Analyze speech patterns to detect
              emotions with high accuracy, real-time processing, and seamless
              frontend integration.
            </p>
            <div className="custom gradient rounded-l-xl rounded-br-xl p-[2px]">
              <button
                onClick={() => setTab('detector')}
                className="custom nova h-12 w-[170px] cursor-pointer rounded-l-xl rounded-br-xl bg-black text-sm font-bold uppercase md:h-16 md:w-[200px] md:text-base"
              >
                Detect Emotion
              </button>
            </div>
          </div>
        ) : tab === 'detector' ? (
          <EmotionDetector />
        ) : tab === 'signin' ? (
          <Login setTab={setTab} />
        ) : tab === 'signup' ? (
          <Login setTab={setTab} />
        ) : tab === 'about' ? (
          <About />
        ) : tab === 'contact' ? (
          <Contact />
        ) : (
          <h1 className="text-center text-4xl font-bold text-white lg:text-5xl xl:text-6xl">
            Page not found
          </h1>
        )}
      </div>
      <BottomNav tab={tab} setTab={setTab} />
    </main>
  )
}

export default App
