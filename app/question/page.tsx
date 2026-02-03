'use client'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

export default function QuestionPage() {
  const router = useRouter()
  const firedRef = useRef(false)

  const handleYes = () => {
    if (firedRef.current) return
    firedRef.current = true

    // Fire backend (do not await)
    fetch('/api/yes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ response: 'YES' }),
    }).catch(() => {})

    // Go to celebration page immediately
    router.push('/yes')
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div className="space-y-8">
        <h1 className="font-heading text-5xl">
          Will you be my forever?
        </h1>

        <button
          onClick={handleYes}
          className="bg-pink-500 text-white px-12 py-4 rounded-full text-xl"
        >
          YES 💖
        </button>
      </div>
    </div>
  )
}
