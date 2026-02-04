'use client'
import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react'

export type MusicPlayerRef = {
  fadeOutAndStop: () => Promise<void>
}

const MusicPlayer = forwardRef<MusicPlayerRef, {
  src: string
  autoPlay?: boolean
}>(({ src, autoPlay = false }, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(autoPlay)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.loop = true
    let v = 0
    const fade = setInterval(() => {
      if (!audio) return clearInterval(fade)
      v += 0.05
      audio.volume = Math.min(v, 0.4)
      if (v >= 0.4) clearInterval(fade)
    }, 80)


    if (autoPlay) {
      audio.play().catch(() => {})
    }

    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, [autoPlay])

  const toggleMusic = () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      audio.play()
      setPlaying(true)
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  // 🎧 Fade-out logic
  const fadeOutAndStop = () => {
    return new Promise<void>((resolve) => {
      const audio = audioRef.current
      if (!audio) return resolve()

      let volume = audio.volume
      const fade = setInterval(() => {
        volume -= 0.05
        if (volume <= 0) {
          clearInterval(fade)
          audio.pause()
          audio.currentTime = 0
          audio.volume = 0.4 // reset for next mount
          resolve()
        } else {
          audio.volume = volume
        }
      }, 80)
    })
  }

  useImperativeHandle(ref, () => ({
    fadeOutAndStop,
  }))

  return (
    <>
      <audio ref={audioRef} src={src} />
      <button
        onClick={toggleMusic}
        className="
          fixed bottom-6 right-6 z-50
          bg-white/80 backdrop-blur
          px-4 py-2 rounded-full
          text-sm shadow
        "
      >
        {playing ? 'Pause 🎵' : 'Play 🎶'}
      </button>
    </>
  )
})

MusicPlayer.displayName = 'MusicPlayer'
export default MusicPlayer
