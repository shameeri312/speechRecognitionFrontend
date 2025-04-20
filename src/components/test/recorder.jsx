'use client'

import React, { useState } from 'react'
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'

export default function AudioRecorder() {
  const [recordState, setRecordState] = useState(null)
  const [audioData, setAudioData] = useState(null)

  const startRecording = () => {
    setRecordState(RecordState.START)
    setAudioData(null) // reset previous
  }

  const stopRecording = () => {
    setRecordState(RecordState.STOP)
  }

  const handleStop = (data) => {
    console.log('audioData', data) // contains `blob` and `blobUrl`
    setAudioData(data)
  }

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl bg-gray-100 p-4 shadow-md dark:bg-gray-800">
      <h2 className="text-xl font-semibold">Audio Recorder</h2>

      <AudioReactRecorder state={recordState} onStop={handleStop} />

      <div className="flex gap-4">
        <button
          onClick={startRecording}
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Start
        </button>

        <button
          onClick={stopRecording}
          className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Stop
        </button>
      </div>

      {audioData?.blobUrl && (
        <audio
          src={audioData.blobUrl}
          controls
          className="mt-4 w-full max-w-md"
        />
      )}
    </div>
  )
}
