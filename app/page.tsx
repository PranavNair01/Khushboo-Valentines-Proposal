'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const TARGET_TIME = new Date('2026-02-08T08:30:00Z').getTime()

export default function Home() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [timeLeft, setTimeLeft] = useState(
    Math.max(TARGET_TIME - Date.now(), 0)
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(Math.max(TARGET_TIME - Date.now(), 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const isUnlocked = timeLeft === 0

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60)
  const seconds = Math.floor((timeLeft / 1000) % 60)

  const handleSubmit = () => {
    if (!isUnlocked) return

    if (password === process.env.NEXT_PUBLIC_PROPOSAL_PASSWORD) {
      router.push('/story')
    } else {
      setError('That doesn’t feel right… try again 💔')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center space-y-6 max-w-sm w-full">

        <h1 className="font-heading text-3xl">
          For One Person Only 💌
        </h1>

        {!isUnlocked ? (
          <>
            <p className="text-sm opacity-70">
              This unlocks in
            </p>

            <div className="text-2xl font-mono tracking-wide">
              {days}d {hours}h {minutes}m {seconds}s
            </div>

            <p className="text-xs opacity-50">
              8 February 2026 · 2:00 PM IST
            </p>
          </>
        ) : (
          <p className="text-sm opacity-70">
            Hint: the day we first felt “us” (YYYYMMDD)
          </p>
        )}

        <input
          type="password"
          placeholder={isUnlocked ? 'Enter password' : 'Locked'}
          disabled={!isUnlocked}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setError('')
          }}
          className="
            border rounded-lg px-4 py-2 w-full
            disabled:opacity-40
          "
        />

        <button
          onClick={handleSubmit}
          disabled={!isUnlocked}
          className="
            bg-pink-500 text-white px-6 py-2 rounded-xl w-full
            disabled:opacity-40
          "
        >
          Unlock ❤️
        </button>

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
