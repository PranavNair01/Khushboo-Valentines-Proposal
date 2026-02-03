'use client'
import { useState } from 'react'

type Memory = {
  image: string
  caption: string
  reveal: string
}

export default function MemoryCard({
  memory,
  onReveal,
}: {
  memory: Memory
  onReveal: () => void
}) {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    if (!open) {
      setOpen(true)
      onReveal()
    }
  }

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer space-y-3 transition-transform active:scale-[0.98]"
    >
      <img
        src={memory.image}
        alt=""
        className="rounded-xl object-cover w-full h-64"
        loading="lazy"
      />

      <p className="text-sm opacity-80">
        {memory.caption}
      </p>

      {open && (
        <p className="text-sm text-pink-500">
          {memory.reveal}
        </p>
      )}
    </div>
  )
}
