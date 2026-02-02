'use client'
import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import Confetti from 'react-confetti'

export default function YesPage() {
  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme('dark')
    saveYes()
  }, [])

  const saveYes = async () => {
    await fetch('/api/yes', { method: 'POST' })
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center text-center">
      <Confetti />
      <div>
        <h1 className="font-heading text-5xl">She said YES 💍</h1>
        <p className="mt-4">This moment is saved forever.</p>

        <a
          href="/api/certificate"
          className="inline-block mt-8 bg-white text-black px-6 py-3 rounded-xl"
        >
          Download Certificate 📜
        </a>
      </div>
    </div>
  )
}
