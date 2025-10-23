import React, { useState, useRef } from 'react';
import { Mic, Square, Send, Loader2 } from 'lucide-react';

export default function VoiceRecorder({card, closeOverlay}) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      setUploadStatus('');
      
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setUploadStatus('Error: Could not access microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const sendToBackend = async () => {
    if (!audioBlob) return;

    setIsUploading(true);
    setUploadStatus('');

    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');
    formData.append('text',card.front_content);

    try {
      // Replace with your actual backend endpoint
      const response = await fetch('https://your-backend-api.com/upload-audio', {
        method: 'POST',
        body: formData,

      });

      if (response.ok) {
        const data = await response.json();
        setUploadStatus('Successfully uploaded!');
        setAudioBlob(null);
        console.log('Response:', data);
      } else {
        setUploadStatus('Upload failed. Please try again.');
      }
    } catch (err) {
      console.error('Error uploading audio:', err);
      setUploadStatus('Error: Could not connect to server');
    } finally {
      setIsUploading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
      <div className="relative bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <button
              onClick={closeOverlay}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Voice Recorder
        </h1>

        <div className="flex flex-col items-center space-y-6">
          {/* Recording Timer */}
          {(isRecording || audioBlob) && (
            <div className="text-2xl font-mono text-gray-700">
              {formatTime(recordingTime)}
            </div>
          )}

          {/* Record/Stop Button */}
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all transform hover:scale-105 ${
              isRecording
                ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white shadow-lg`}
            disabled={isUploading}
          >
            {isRecording ? (
              <Square className="w-10 h-10" />
            ) : (
              <Mic className="w-10 h-10" />
            )}
          </button>

          <p className="text-gray-600 text-sm">
            {isRecording ? 'Recording... Click to stop' : 'Click to start recording'}
          </p>

          {/* Audio Preview */}
          {audioBlob && !isRecording && (
            <div className="w-full space-y-4">
              <audio
                controls
                src={URL.createObjectURL(audioBlob)}
                className="w-full"
              />

              {/* Send Button */}
              <button
                onClick={sendToBackend}
                disabled={isUploading}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    
                    <span>Check Pronounciation</span>
                  </>
                )}
              </button>

              
            </div>
          )}

          {/* Status Message */}
          {uploadStatus && (
            <div
              className={`w-full p-3 rounded-lg text-center ${
                uploadStatus.includes('Success')
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {uploadStatus}
            </div>
          )}
        </div>

        {/* Instructions */}
      </div>
  );
}