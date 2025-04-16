const About = () => {
  return (
    <div className="mx-auto flex w-full flex-wrap justify-center gap-5 px-4 py-10 xl:container xl:px-0">
      {/* Text Section */}
      <div className="backdrop flex h-auto w-full max-w-lg flex-col gap-4 rounded-2xl border-2 border-gray-600 bg-gradient-to-br from-neutral-600/20 to-gray-800/40 p-8 text-white shadow-xl">
        <h2 className="text-3xl font-bold text-white">
          🎙️ About Our Emotion Detector
        </h2>
        <p className="text-lg text-gray-300">
          Our AI-powered speech emotion detection app uses your voice to
          understand your emotions in real-time. It's built with deep learning
          and helps in mental health tracking, customer experience, and more.
        </p>
        <ul className="list-disc pl-5 text-gray-300">
          <li>Built with ReactJS frontend and Python backend</li>
          <li>Trained on real-world emotional speech datasets</li>
          <li>Detects emotions like Happy, Sad, Angry, Fearful, and Neutral</li>
          <li>Secure, fast, and user-friendly</li>
        </ul>
        <p className="text-sm text-gray-400 italic">
          “Your voice carries more than words — it carries emotion.”
        </p>
      </div>

      {/* Image Section */}
      <div className="hidden h-auto w-full max-w-md flex-col items-center justify-center gap-5 rounded-2xl border-2 border-gray-500 bg-gradient-to-br from-neutral-600/20 to-gray-800/40 p-8 text-white backdrop-blur lg:flex">
        <img
          src={'/about.jpg'}
          alt="AI voice analysis"
          width={500}
          height={500}
          className="rounded-xl object-contain"
        />
        <p className="text-center text-lg text-gray-400">
          AI analyzing speech emotions
        </p>
      </div>
    </div>
  )
}

export default About
