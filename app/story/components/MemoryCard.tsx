'use client'
import { useState } from 'react'

type Memory = {
  image: string
  caption: string
  reveal: string
}

export default function MemoryCard({
  memory,
  isLast,
  onUnlockNext,
}: {
  memory: Memory
  isLast: boolean
  onUnlockNext: () => void
}) {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    if (!open) {
      setOpen(true)

      // 🔑 Only unlock next memory if this is the LAST visible card
      if (isLast) {
        onUnlockNext()
      }
    }
  }

  return (
    <div
      onClick={handleClick}
      className="
        cursor-pointer space-y-3
        transition-transform active:scale-[0.98]
        animate-fade-up-card
      "
    >
      {/* Image */}
      <img
        src={memory.image}
        alt=""
        className="rounded-xl object-cover w-full h-64"
        loading="lazy"
      />

      {/* Caption */}
      <p className="text-sm opacity-80">
        {memory.caption}
      </p>

      {/* Reveal text */}
      {open && memory.reveal && (
        <p className="text-sm text-pink-500 animate-fade-up">
          {memory.reveal}
        </p>
      )}
    </div>
  )
}
