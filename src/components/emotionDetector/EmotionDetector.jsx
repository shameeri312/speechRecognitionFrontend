'use client'
import { useState, useRef } from 'react'
import { BiTrash } from 'react-icons/bi'
import { Upload } from 'lucide-react'
import axios from 'axios'
import '../../App.css'

const EmotionDetector = () => {
  const [file, setFile] = useState(null)
  const [emotion, setEmotion] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  // const [isRecording, setIsRecording] = useState(false)
  const [recordedBlob, setRecordedBlob] = useState(null)
  // const mediaRecorderRef = useRef(null)

  // Handle File Upload
  const handleFileChange = (e) => setFile(e.target.files[0])

  // Start Recording
  // const startRecording = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  //     mediaRecorderRef.current = new MediaRecorder(stream)
  //     const chunks = []

  //     mediaRecorderRef.current.ondataavailable = (event) => {
  //       if (event.data.size > 0) chunks.push(event.data)
  //     }

  //     mediaRecorderRef.current.onstop = () => {
  //       const audioBlob = new Blob(chunks, { type: 'audio/wav' })
  //       setRecordedBlob(audioBlob)
  //       setFile(null)
  //     }

  //     mediaRecorderRef.current.start()
  //     setIsRecording(true)
  //   } catch (err) {
  //     console.error('Error accessing microphone:', err)
  //     setError('Microphone access denied.')
  //   }
  // }

  // Stop Recording
  // const stopRecording = () => {
  //   if (mediaRecorderRef.current) {
  //     mediaRecorderRef.current.stop()
  //     setIsRecording(false)
  //   }
  // }

  // Send Audio to Backend
  const handleUpload = async () => {
    if (!file && !recordedBlob)
      return alert('Please upload or record an audio file!')

    const formData = new FormData()
    if (recordedBlob) {
      const recordedFile = new File([recordedBlob], 'recorded_audio.wav', {
        type: 'audio/wav',
      })
      formData.append('file', recordedFile)
    } else {
      formData.append('file', file)
    }

    try {
      setIsLoading(true)
      const { data } = await axios.post(
        'http://127.0.0.1:5000/predict',
        formData
      )
      setEmotion(data.emotion)
      console.log(data)
    } catch (error) {
      setError(error.message)
      console.error('Error detecting emotion:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="backdrop mx-auto flex h-max w-[90%] flex-col justify-center gap-8 rounded-2xl border border-neutral-400 bg-gradient-to-br from-neutral-600/20 to-gray-800/40 p-10 !text-white md:h-[450px] md:w-[750px]">
      <h2 className="text-center text-4xl font-semibold md:text-5xl">
        Speech Emotion Detector
      </h2>
      <p className="text-center text-lg">
        Upload an audio file to detect emotion
      </p>
      {/* Emotion Display */}
      {/* File Upload Section */}
      <div className="flex flex-col items-end gap-2 sm:items-center md:flex-row">
        <div className="flex h-auto w-full flex-1 items-center justify-between rounded-xl border border-neutral-600 bg-gradient-to-br from-neutral-600/20 to-gray-400/20 px-5 py-2 sm:h-12 md:h-[56px]">
          <input
            type="file"
            id="voice"
            accept="audio/*"
            className="file-input"
            onChange={handleFileChange}
          />
          <label
            className="nova flex cursor-pointer gap-2 pl-2"
            htmlFor={'voice'}
          >
            <Upload />
            {file ? file.name : 'Upload an audio file'}
          </label>
          <button
            className="h-8 w-8 cursor-pointer rounded-full bg-red-500 text-white shadow-md disabled:opacity-65"
            onClick={() => {
              setEmotion('')
              setError('')
              setFile(null)
              setRecordedBlob(null)
            }}
            disabled={file == null}
          >
            <BiTrash className="mx-auto" />
          </button>
        </div>
        <div className="custom nova gradient mx-auto w-max rounded-l-lg rounded-br-lg p-[2px]">
          <button
            onClick={handleUpload}
            className="custom h-12 w-32 cursor-pointer rounded-l-lg rounded-br-lg bg-black px-6 py-2 uppercase md:h-[56px]"
          >
            Detected
          </button>
        </div>
      </div>

      <p className="flex h-12 items-center justify-center rounded-xl px-5 text-lg md:h-[56px]">
        {isLoading ? (
          'Loading...'
        ) : emotion ? (
          <>
            <span className="mx-auto text-white">
              Detected Emotion:{' '}
              <span className="nova font-semibold text-green-400 capitalize">
                {emotion}
                {/* Happy */}
              </span>
            </span>
          </>
        ) : (
          <>
            <span className="mx-auto text-red-400">{error}</span>
          </>
        )}
      </p>

      {/* <p className="text-center text-white">OR</p>

      <div className="flex items-center justify-between rounded-xl bg-white/90 p-2">
        <label
          style={{
            color: 'black',
          }}
          className="cursor-pointer pl-2"
          htmlFor={'voice'}
        >
          {isRecording ? (
            <span className="animate-pulse">Recording...</span>
          ) : (
            'Record Audio'
          )}
        </label>
        {/* Audio Recorder */}
      {/* <div className="flex items-center justify-between">
        <button
          className={`${isRecording ? 'bg-red-500' : 'bg-blue-500'} grid h-8 w-8 cursor-pointer place-content-center rounded-full text-white shadow-md`}
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? <FaStop /> : <FaMicrophone />}
        </button>
      </div> */}
      {/* </div> */}

      {/* Audio Playback */}
      {/* {recordedBlob && (
        <div className="flex justify-center">
          <audio ref={audioRef} controls className="audio-player">
            <source src={URL.createObjectURL(recordedBlob)} type="audio/wav" />
          </audio>
        </div>
      )} */}
      {/* Upload Button */}
    </div>
  )
}

export default EmotionDetector
