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
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recordedBlob, setRecordedBlob] = useState(null)
  const [mode, setMode] = useState('upload')
  const [buttonText, setButtonText] = useState('Detect')
  const [wavRecorder, setWavRecorder] = useState(null)
  const [isRecorderReady, setIsRecorderReady] = useState(false)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 200) {
        console.log(response.data)
        setUser(response.data.user)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  // Initialize WavRecorder and microphone stream
  useEffect(() => {
    let recorder
    let stream

    const initializeRecorder = async () => {
      try {
        // Request microphone access
        stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        console.log('Microphone stream acquired')

        // Initialize recorder
        recorder = new WavRecorder()
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

    initializeRecorder()
    if (token) getUser()
    return () => {
      // Stop microphone stream
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
        console.log('Microphone stream stopped')
      }

      // Stop recorder if still active
      if (recorder) {
        recorder.stop()
      }
    }
  }, [])

  // Handle File Upload
  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setEmotion('')
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
      // Ensure the recorder is ready by waiting briefly
      await new Promise((resolve) => setTimeout(resolve, 100))
      await wavRecorder.start()
      console.log('Recording started successfully')
      setIsRecording(true)
      setEmotion('')
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
      console.log('Recording stopped')
      const blob = await wavRecorder.getBlob()
      if (!blob || blob.size === 0) {
        console.error('No valid blob received:', blob)
        setError('Recording is empty or invalid. Please try again.')
        setIsRecording(false)
        return
      }
      console.log('Recording completed, blob:', blob.type, blob.size)
      setRecordedBlob(blob)
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

    if (!token) {
      setError('Please log in to continue.')
      navigate('/login')
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
        'http://localhost:5000/predict',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      setEmotion(response.data.emotion)
      setButtonText('Detected')
      setError('')
      console.log('Backend response:', response.data)
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || 'Error detecting emotion.'
      setError(errorMessage)
      console.error('Error detecting emotion:', error)

      if (
        errorMessage === 'Invalid or expired token' ||
        errorMessage === 'Authentication token required'
      ) {
        localStorage.removeItem('token')
        localStorage.removeItem('userEmail')
        localStorage.removeItem('userFullname')
        setToken(null)
        navigate('/login')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="backdrop mx-auto flex h-max w-[90%] flex-col justify-center gap-8 rounded-2xl border border-neutral-400 bg-gradient-to-br from-neutral-600/20 to-gray-800/40 p-10 !text-white md:h-[500px] md:w-[750px]">
      {loading ? (
        <p className="animate-pulse">Loading...</p>
      ) : (
        <>
          <h3 className="mx-auto w-max rounded-xl bg-white/20 px-4 py-2 text-center text-lg font-semibold md:text-xl">
            Welcome, <span className="capitalize"> {user?.fullname}!</span>
          </h3>
          <h2 className="text-center text-4xl font-semibold md:text-5xl">
            Speech Emotion Detector
          </h2>
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
                className={`h-12 cursor-pointer rounded-lg bg-black px-4 py-2 text-sm uppercase md:h-[56px] md:px-6 md:text-base`}
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
                className={`h-12 cursor-pointer rounded-lg bg-black px-4 py-2 text-sm uppercase md:h-[56px] md:px-6 md:text-base`}
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
                  className="nova flex cursor-pointer items-center gap-2 pl-2"
                  htmlFor="voice"
                >
                  <Upload className="size-5" />
                  {file ? file.name : 'Upload an audio file'}
                </label>
                <button
                  className="size-10 cursor-pointer rounded-full bg-red-500 text-white shadow-md disabled:opacity-65"
                  onClick={() => {
                    setEmotion('')
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
                      <Mic className="size-5" />
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
                        setError('')
                        setFile(null)
                        setRecordedBlob(null)
                        setButtonText('Detect')
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

          <div className="flex h-12 items-center justify-center rounded-xl px-5 text-lg md:h-[56px]">
            {isLoading ? (
              'Loading...'
            ) : emotion ? (
              <span className="mx-auto text-white">
                Detected Emotion:{' '}
                <span className="nova font-semibold text-green-400 capitalize">
                  {emotion}
                </span>
              </span>
            ) : (
              <p className="flex w-auto items-center gap-2 rounded-lg bg-red-500 px-2 py-1 text-sm text-white">
                {error}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default EmotionDetector
