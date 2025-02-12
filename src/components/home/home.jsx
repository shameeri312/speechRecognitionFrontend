const Home = () => {
  return (
    <>
      <div className="flex gap-4 items-center px-8 sm:px-12 md:px-16 lg:px-20">
        <div className="h-[2px] bg-gray-300 w-full" />
        <h6 className="text-2xl sm:w-[400px] mx-auto text-center font-serif">
          Semester Project
        </h6>
        <div className="h-[2px] bg-gray-300 w-full" />
      </div>
      <h1 className="py-4  font-extrabold tracking-wider uppercase text-center text-5xl md:text-6xl lg:text-7xl">
        About our <br />
        Speech Emotion <br /> Detector
      </h1>
      <p className="text-xl max-w-[800px] mx-auto text-center font-serif italic px-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
        consequatur modi minima laborum officiis perferendis error!
      </p>

      <div className="md:py-4"></div>

      <img
        src="/language-models.jpg"
        alt="image"
        className="mx-auto w-[95%] md:w-[90%] lg:w-[80%] object-contain"
      />
    </>
  )
}

export default Home
