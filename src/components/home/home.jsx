import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center space-y-4">
      <h1 className="text-center text-6xl font-bold text-white lg:text-7xl xl:text-8xl">
        Speech Emotion Detector
      </h1>
      <p className="mx-auto px-5 text-center text-xl text-gray-300 lg:text-2xl">
        An advanced AI-driven Speech Emotion Detection System using Python,
        Flask, and React.js. Analyze speech patterns to detect emotions with
        high accuracy, real-time processing, and seamless frontend integration.
      </p>
      <div className="custom gradient rounded-l-xl rounded-br-xl p-[2px]">
        <button
          onClick={() => navigate('/detector')}
          className="custom nova h-12 w-[170px] cursor-pointer rounded-l-xl rounded-br-xl bg-black text-sm font-bold uppercase md:h-16 md:w-[200px] md:text-base"
        >
          Detect Emotion
        </button>
      </div>
    </div>
  )
}

export default Home
