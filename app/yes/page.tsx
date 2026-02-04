'use client'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Confetti from 'react-confetti'
import ThemeTransition from '@/components/ThemeTransition'
import MusicPlayer from '@/components/MusicPlayer'

export default function YesPage() {
  const { setTheme } = useTheme()
  const [showOverlay, setShowOverlay] = useState(false)
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // 1️⃣ Fade to black
    const t1 = setTimeout(() => setShowOverlay(true), 300)

    // 2️⃣ Switch theme WHILE covered
    const t2 = setTimeout(() => setTheme('dark'), 1100)

    // 3️⃣ Reveal dark mode
    const t3 = setTimeout(() => setShowOverlay(false), 1600)

    // 4️⃣ Stop confetti
    const t4 = setTimeout(() => setShowConfetti(false), 6000)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [setTheme])

  return (
    <>
      <MusicPlayer src='/valentines_music.mp3' autoPlay />
      <ThemeTransition show={showOverlay} />

      <div
        className="
          min-h-screen flex items-center justify-center text-center px-4
          bg-white text-gray-800
          dark:bg-black dark:text-white
          transition-colors duration-700
        "
      >
        {showConfetti && <Confetti numberOfPieces={300} gravity={0.15} />}

        <div className="space-y-6">
          <h1 className="font-heading text-5xl">
            Khushboo said YES 💍
          </h1>

          <p className="opacity-80">
            This moment is saved forever.
          </p>

          <a
            href="/api/certificate"
            className="inline-block bg-white text-black px-8 py-3 rounded-xl"
          >
            Download Certificate 📜
          </a>
        </div>
      </div>
    </>
  )
}
