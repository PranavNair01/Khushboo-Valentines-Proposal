'use client'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

export default function QuestionPage() {
  const router = useRouter()
  const firedRef = useRef(false)

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [noBtnState, setNoBtnState] = useState({
    top: 'auto',
    left: 'auto',
    position: 'static' as 'static' | 'fixed'
  })

  const handleYes = (response: string) => {
    if (firedRef.current) return
    firedRef.current = true

    fetch('/api/yes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ response }),
    }).catch(() => {})

    router.push('/yes')
  }

  const moveNoButton = () => {
    if (prefersReducedMotion) return

    const padding = 20
    const maxX = window.innerWidth - 160
    const maxY = window.innerHeight - 100

    const x = Math.max(
      padding,
      Math.random() * maxX
    )
    const y = Math.max(
      padding,
      Math.random() * maxY
    )

    setNoBtnState({
      top: `${y}px`,
      left: `${x}px`,
      position: 'fixed'
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-center px-6">
      <div className="space-y-10 relative">

        {/* Proposal Text */}
        <div className="space-y-6">
          <h1 className="font-heading text-5xl md:text-6xl text-pink-500 font-bold">
            Hun, I love you.
          </h1>

          <p className="text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed">
            Will you be my Valentine to{' '}
            <span className="text-pink-600 underline decoration-wavy underline-offset-4">
              Jaipur
            </span>{' '}
            this year…
          </p>

          <p className="text-xl md:text-2xl text-gray-500 italic">
            (…and every other year?)
          </p>
        </div>

        {/* YES Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => handleYes('YES')}
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full text-xl transition-colors"
          >
            Yes 💖
          </button>

          <button
            onClick={() => handleYes('HELL YES')}
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full text-xl transition-colors"
          >
            Hell Yes! 🚀
          </button>
        </div>

        {/* Runaway No */}
        <div className="mt-4">
          <button
            onMouseEnter={moveNoButton}
            onClick={moveNoButton}
            style={{
              position: noBtnState.position,
              top: noBtnState.top,
              left: noBtnState.left,
              transition: prefersReducedMotion
                ? 'none'
                : 'top 0.25s ease-out, left 0.25s ease-out',
            }}
            className="bg-gray-400 text-white px-8 py-2 rounded-full text-lg cursor-default"
          >
            No
          </button>
        </div>

      </div>
    </div>
  )
}
