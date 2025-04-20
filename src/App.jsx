import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/navbar'
import BottomNav from './components/bottomNav/bottomNav'
import Home from './components/home/home'
import EmotionDetector from './components/emotionDetector/EmotionDetector'
import Login from './components/login/login'
import About from './components/about/about'
import Contact from './components/contact/contact'
import Signup from './components/signup/signup'
import PrivateRoute from './components/privateRoute/privateRoute'

const App = () => {
  return (
    <BrowserRouter>
      <main className="main overflow-y-auto">
        <Navbar />  
        <div className="flex h-[calc(100vh_-_80px)] flex-col justify-center gap-6 !text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<PrivateRoute />}>
              <Route path="/detector" element={<EmotionDetector />} />
            </Route>
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="*"
              element={
                <h1 className="text-center text-4xl font-bold text-white lg:text-5xl xl:text-6xl">
                  Page not found
                </h1>
              }
            />
          </Routes>
        </div>
        <BottomNav />
      </main>
    </BrowserRouter>
  )
}

export default App
