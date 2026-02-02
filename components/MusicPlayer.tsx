'use client'
import { useEffect, useRef, useState } from 'react'

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  const toggleMusic = () => {
    if (!audioRef.current) return

    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.volume = 0.4
      audioRef.current.play()
    }
    setPlaying(!playing)
  }

  return (
    <>
      <audio ref={audioRef} src="/valentines_music.mp3" loop />
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 bg-white/80 backdrop-blur px-4 py-2 rounded-full text-sm shadow"
      >
        {playing ? 'Pause 🎵' : 'Play 🎶'}
      </button>
    </>
  )
}
