'use client'

import { useState, useEffect } from 'react'
import { BiTrash } from 'react-icons/bi'
import { Upload, Mic, Square } from 'lucide-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { WavRecorder } from 'webm-to-wav-converter'
import '../../App.css'

const EmotionDetector = () => {
  const [file, setFile] = useState(null)
  const [emotion, setEmotion] = useState('')
  const [accuracy, setAccuracy] = useState('')
  const [sentiment, setSentiment] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recordedBlob, setRecordedBlob] = useState(null)
  const [mode, setMode] = useState('upload')
  const [buttonText, setButtonText] = useState('Detect')
  const [wavRecorder, setWavRecorder] = useState(null)
  const [isRecorderReady, setIsRecorderReady] = useState(false)
  const navigate = useNavigate()

  // Initialize WavRecorder and check login status
  const initializeRecorder = async () => {
    try {
      let recorder = new WavRecorder()
      setWavRecorder(recorder)
      setIsRecorderReady(true)
      console.log('WavRecorder initialized')
    } catch (err) {
      console.error('Failed to initialize recorder:', err)
      setError(
        'Failed to access microphone. Please allow microphone access and try again.'
      )
    }
  }

  useEffect(() => {
    let recorder
    let stream
    ;(async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        console.log('Microphone stream acquired')
      } catch (err) {
        console.error('Failed to get microphone stream:', err)
        setError('Microphone access denied. Please allow microphone access.')
      }
    })()

    const token = localStorage.getItem('token')
    if (!token) {
      setError('Please log in to continue.')
      navigate('/signin')
    }

    initializeRecorder()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
        console.log('Microphone stream stopped')
      }
      if (recorder) {
        recorder.stop()
      }
    }
  }, [navigate])

  // Handle File Upload
  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setEmotion('')
    setAccuracy('')
    setSentiment('')
    setError('')
    setButtonText('Detect')
  }

  // Start Recording
  const startRecording = async () => {
    if (!wavRecorder || !isRecorderReady) {
      setError('Recorder not ready. Please try again.')
      console.error('WavRecorder not ready')
      return
    }
    try {
      await new Promise((resolve) => setTimeout(resolve, 100))
      await wavRecorder.start()
      console.log('Recording started successfully')
      setIsRecording(true)
      setEmotion('')
      setAccuracy('')
      setSentiment('')
      setError('')
    } catch (err) {
      console.error('Failed to start recording:', err)
      setError('Failed to start recording. Please allow microphone access.')
    }
  }

  // Stop Recording
  const stopRecording = async () => {
    if (!wavRecorder || !isRecording) {
      console.error('No active recording')
      return
    }
    try {
      await wavRecorder.stop()
      const blob = await wavRecorder.getBlob()
      if (!blob || blob.size === 0) {
        console.error('No valid blob received:', blob)
        setError('No audio recorded. Please try again.')
        return
      }
      console.log('Recording completed, blob:', blob.type, blob.size)
      setRecordedBlob(blob)
      setError('')
      setFile(null)
      setIsRecording(false)
      setButtonText('Detect')
    } catch (err) {
      console.error('Error stopping recording:', err)
      setError('Failed to stop recording.')
      setIsRecording(false)
    }
  }

  // Toggle Mode
  const toggleMode = (newMode) => {
    setMode(newMode)
    setFile(null)
    setRecordedBlob(null)
    setEmotion('')
    setAccuracy('')
    setSentiment('')
    setError('')
    setIsRecording(false)
    setButtonText('Detect')
  }

  // Send Audio to Backend
  const handleUpload = async () => {
    if (!file && !recordedBlob) {
      setError('Please upload or record an audio file!')
      return
    }

    const formData = new FormData()
    if (recordedBlob) {
      console.log(
        'Sending recorded blob:',
        recordedBlob.type,
        recordedBlob.size
      )
      const recordedFile = new File([recordedBlob], 'recorded_audio.wav', {
        type: 'audio/wav',
      })
      formData.append('file', recordedFile)
    } else {
      formData.append('file', file)
    }

    try {
      setIsLoading(true)
      const response = await axios.post(
        'http://127.0.0.1:5000/predict',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      console.log('Backend response:', response.data)

      if (response.status === 200) {
        setEmotion(response.data.emotion.label)
        setAccuracy(response.data.response_accuracy) // Use response_accuracy
        setSentiment(response.data.sentiment)
        setButtonText('Detected')
        setError('')
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || 'Error detecting emotion.'
      setError(errorMessage)
      console.error('Error detecting emotion:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userFullname')
    localStorage.removeItem('userProfile')
    navigate('/signin')
  }

  // Get user name from localStorage
  const getUserName = () => {
    try {
      const profile = JSON.parse(localStorage.getItem('userProfile'))
      if (profile && profile.full_name) {
        return profile.full_name
      }
      return localStorage.getItem('userFullname') || 'User'
    } catch (err) {
      console.error('Error parsing userProfile:', err)
      return localStorage.getItem('userFullname') || 'User'
    }
  }

  // Get user email from localStorage
  const getUserEmail = () => {
    try {
      const profile = JSON.parse(localStorage.getItem('userProfile'))
      if (profile && profile.email) {
        return profile.email
      }
      return localStorage.getItem('userEmail') || 'No email'
    } catch (err) {
      console.error('Error parsing userProfile:', err)
      return localStorage.getItem('userEmail') || 'No email'
    }
  }

  return (
    <div className="backdrop mx-auto flex h-max w-[90%] flex-col justify-center gap-8 rounded-2xl border border-neutral-400 bg-gradient-to-br from-neutral-600/20 to-gray-800/40 p-10 !text-white md:w-[750px]">
      <div className="flex items-center justify-between">
        <h2 className="mx-auto text-4xl font-semibold md:text-5xl">
          Speech Emotion Detector
        </h2>
      </div>
      <p className="text-center text-lg">
        Welcome, {getUserName()} ({getUserEmail()})!
      </p>
      <p className="text-center text-lg">
        Upload or record an audio file to detect emotion
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <div
          className={`nova w-max rounded-lg rounded-br-lg p-[2px] ${
            mode === 'upload' ? 'gradient' : 'bg-transparent'
          }`}
        >
          <button
            className={`h-12 cursor-pointer rounded-lg rounded-br-lg bg-black px-6 py-2 uppercase md:h-[56px]`}
            onClick={() => toggleMode('upload')}
          >
            Upload Voice
          </button>
        </div>
        <div
          className={`nova w-max rounded-lg p-[2px] ${
            mode === 'realtime' ? 'gradient' : ''
          }`}
        >
          <button
            className={`h-12 cursor-pointer rounded-lg bg-black px-6 py-2 uppercase md:h-[56px]`}
            onClick={() => toggleMode('realtime')}
          >
            Realtime Voice
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 sm:items-center md:flex-row">
        {mode === 'upload' ? (
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
              htmlFor="voice"
            >
              <Upload />
              {file ? file.name : 'Upload an audio file'}
            </label>
            <button
              className="size-10 cursor-pointer rounded-full bg-red-500 text-white shadow-md disabled:opacity-65"
              onClick={() => {
                setEmotion('')
                setAccuracy('')
                setSentiment('')
                setError('')
                setFile(null)
                setRecordedBlob(null)
                setButtonText('Detect')
              }}
              disabled={file == null}
            >
              <BiTrash className="mx-auto" />
            </button>
          </div>
        ) : (
          <div className="flex h-auto w-full flex-1 flex-col items-center justify-between rounded-xl border border-neutral-600 bg-gradient-to-br from-neutral-600/20 to-gray-400/20 px-5 py-2 sm:h-12 md:h-[56px] md:flex-row">
            <span className="nova truncate pl-2">
              {isRecording ? (
                <span className="animate-pulse">Recording...</span>
              ) : recordedBlob ? (
                'Audio Recorded'
              ) : isRecorderReady ? (
                'Ready to Record'
              ) : (
                'Initializing Recorder...'
              )}
            </span>
            <div className="flex gap-2">
              {!isRecording ? (
                <button
                  className="grid size-10 cursor-pointer place-content-center rounded-full bg-green-500 text-white disabled:opacity-65"
                  onClick={startRecording}
                  disabled={isRecording || !isRecorderReady}
                >
                  <Mic />
                </button>
              ) : (
                <button
                  className="grid size-10 cursor-pointer place-content-center rounded-full bg-red-500 text-white disabled:opacity-65"
                  onClick={stopRecording}
                  disabled={!isRecording}
                >
                  <Square className="size-5" />
                </button>
              )}
              {recordedBlob && (
                <button
                  className="size-10 cursor-pointer rounded-full bg-red-500 text-white shadow-md disabled:opacity-65"
                  onClick={() => {
                    setEmotion('')
                    setAccuracy('')
                    setSentiment('')
                    setError('')
                    setFile(null)
                    setRecordedBlob(null)
                    setButtonText('Detect')
                    initializeRecorder()
                  }}
                  disabled={recordedBlob == null}
                >
                  <BiTrash className="mx-auto" />
                </button>
              )}
            </div>
          </div>
        )}
        <div className="custom nova gradient mx-auto w-max rounded-l-lg rounded-br-lg p-[2px]">
          <button
            onClick={handleUpload}
            className="custom h-12 w-32 cursor-pointer rounded-l-lg rounded-br-lg bg-black px-6 py-2 uppercase md:h-[56px]"
            disabled={isLoading}
          >
            {buttonText}
          </button>
        </div>
      </div>

      {(file || recordedBlob) && (
        <div className="flex justify-center">
          <audio
            controls
            className="w-full max-w-md rounded-xl border border-neutral-600 bg-gradient-to-br from-neutral-600/20 to-gray-400/20"
          >
            <source
              src={
                file
                  ? URL.createObjectURL(file)
                  : URL.createObjectURL(recordedBlob)
              }
              type={recordedBlob ? 'audio/wav' : file?.type || 'audio/wav'}
            />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      <div className="flex h-auto flex-col items-center justify-center gap-2 rounded-xl px-5 py-2 text-lg">
        {isLoading ? (
          <span className="text-white">Loading...</span>
        ) : error ? (
          <span className="text-red-400">{error}</span>
        ) : emotion ? (
          <>
            <p className="text-white">
              Detected Emotion:{' '}
              <span className="nova font-semibold text-green-400 capitalize">
                {emotion === 'uncertain'
                  ? 'Uncertain (Low Confidence)'
                  : emotion}
              </span>
            </p>
            {emotion !== 'uncertain' && (
              <p className="text-white">
                Accuracy:{' '}
                <span className="nova font-semibold text-green-400">
                  {Number((accuracy * 100).toFixed(2))}%
                </span>
              </p>
            )}
            {sentiment && sentiment !== 'not_detected' && (
              <p className="text-white">
                Sentiment:{' '}
                <span className="nova font-semibold text-green-400 capitalize">
                  {sentiment}
                </span>
              </p>
            )}
          </>
        ) : (
          <span className="text-white">
            No results yet. Upload or record audio to detect emotion.
          </span>
        )}
      </div>
    </div>
  )
}

export default EmotionDetector
