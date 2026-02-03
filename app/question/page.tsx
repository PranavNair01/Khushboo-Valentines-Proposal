'use client'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

export default function QuestionPage() {
  const router = useRouter()
  const firedRef = useRef(false)
  const [noBtnState, setNoBtnState] = useState({
    top: 'auto',
    left: 'auto',
    position: 'static' as 'static' | 'fixed' // Start static, become fixed on hover
  })

  const handleYes = (response: string) => {
    if (firedRef.current) return
    firedRef.current = true

    // Fire backend (do not await)
    fetch('/api/yes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ response }),
    }).catch(() => {})

    // Go to celebration page immediately
    router.push('/yes')
  }

  const moveNoButton = () => {
    // Calculate random position within the window
    // Subtracting button dimensions (approx) to keep it on screen
    const x = Math.random() * (window.innerWidth - 150)
    const y = Math.random() * (window.innerHeight - 100)

    setNoBtnState({
      top: `${y}px`,
      left: `${x}px`,
      position: 'fixed' // Switch to fixed so it can move anywhere
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div className="space-y-8 relative">
        
        {/* Proposal Text */}
        <div className="space-y-6">
          <h1 className="font-heading text-5xl md:text-6xl text-pink-500 font-bold drop-shadow-sm">
            Hun, I love you.
          </h1>
          
          <p className="text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed">
            Will you be my Valentine to <span className="text-pink-600 underline decoration-pink-400 decoration-wavy underline-offset-4">Jaipur</span> this year...
          </p>

          <p className="text-xl md:text-2xl text-gray-500 italic">
            (...and every other year?)
          </p>
        </div>

        {/* Positive Buttons Row */}
        <div className="flex flex-row gap-4 justify-center items-center">
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

        {/* The Runaway No Button */}
        {/* We use a container to ensure the button starts on its own line */}
        <div className="block">
          <button
            onMouseEnter={moveNoButton}
            onClick={moveNoButton} // For mobile touch support
            style={{
              position: noBtnState.position,
              top: noBtnState.top,
              left: noBtnState.left,
              transition: 'top 0.2s, left 0.2s', // Smooth movement
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