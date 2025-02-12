'use client'
import { useState, useRef } from 'react'
import axios from 'axios'
import '../../App.css'
import { BiTrash } from 'react-icons/bi'
import { FaMicrophone, FaStop } from 'react-icons/fa6'

const EmotionDetector = () => {
  const [file, setFile] = useState(null)
  const [emotion, setEmotion] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recordedBlob, setRecordedBlob] = useState(null)
  const mediaRecorderRef = useRef(null)
  const audioRef = useRef(null)

  // Handle File Upload
  const handleFileChange = (e) => setFile(e.target.files[0])

  // Start Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      const chunks = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) chunks.push(event.data)
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' })
        setRecordedBlob(audioBlob)
        setFile(null)
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch (err) {
      console.error('Error accessing microphone:', err)
      setError('Microphone access denied.')
    }
  }

  // Stop Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

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
    } catch (error) {
      setError(error.message)
      console.error('Error detecting emotion:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-tr to-white/30 from-gray-300/10 flex flex-col gap-4  border border-gray-300/40 backdrop-blur p-10 w-[90%] rounded-3xl md:w-[600px] mx-auto">
      <h2 className="font-semibold text-center text-3xl text-white">
        Speech Emotion Detector
      </h2>

      {/* Emotion Display */}
      <p className="flex flex-col gap-4 p-1 bg-white/30 text-white w-max px-4 rounded-full mx-auto">
        {isLoading ? (
          'Loading...'
        ) : emotion ? (
          <>
            <span className="mx-auto text-white">
              Detected Emotion:{' '}
              <span className="text-green-400 capitalize font-semibold">
                {emotion}
              </span>
            </span>
          </>
        ) : (
          <>
            <span className="text-red-400 mx-auto">{error}</span>
          </>
        )}
      </p>

      {/* File Upload Section */}
      <div className="bg-white/90 items-center flex justify-between p-2 rounded-xl">
        <input
          type="file"
          id="voice"
          accept="audio/*"
          className="file-input"
          onChange={handleFileChange}
        />
        <label className="cursor-pointer pl-2" htmlFor={'voice'}>
          {file ? file.name : 'Upload an audio file'}
        </label>
        <button
          className="bg-red-500 disabled:opacity-65 shadow-md cursor-pointer w-8 h-8 rounded-full text-white"
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

      <p className="text-white text-center">OR</p>

      <div className="bg-white/90 items-center flex justify-between p-2 rounded-xl">
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
        <div className="flex justify-between items-center">
          <button
            className={`${isRecording ? 'bg-red-500' : 'bg-blue-500'} shadow-md cursor-pointer w-8 h-8 rounded-full text-white grid place-content-center`}
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? <FaStop /> : <FaMicrophone />}
          </button>
        </div>
      </div>

      {/* Audio Playback */}
      {recordedBlob && (
        <div className="flex justify-center">
          <audio ref={audioRef} controls className="audio-player">
            <source src={URL.createObjectURL(recordedBlob)} type="audio/wav" />
          </audio>
        </div>
      )}

      {/* Upload Button */}
      <button
        className="bg-green-400 w-max mx-auto cursor-pointer h-10 px-4  rounded-lg"
        onClick={handleUpload}
      >
        Detect Emotion
      </button>
    </div>
  )
}

export default EmotionDetector
