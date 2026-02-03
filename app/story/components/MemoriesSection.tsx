'use client'
import { useState } from 'react'
import MemoryCard from './MemoryCard'

const memories = [
  {
    id: 1,
    image: '/memories/1.jpg',
    caption: 'That day we didn’t plan anything.',
    reveal: 'But somehow it became one of my favourites.',
  },
  {
    id: 2,
    image: '/memories/2.jpg',
    caption: 'Your smile when you’re not posing.',
    reveal: 'That’s the one I fell for.',
  },
  {
    id: 3,
    image: '/memories/3.jpg',
    caption: 'A random moment.',
    reveal: 'That I replay more than you know.',
  },
]

export default function MemoriesSection() {
  const [visibleCount, setVisibleCount] = useState(2)

  return (
    <section className="min-h-screen px-6 py-20">
      <h2 className="text-center text-2xl mb-12">
        Little moments I never forgot
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {memories.slice(0, visibleCount).map((memory) => (
          <MemoryCard
            key={memory.id}
            memory={memory}
            onReveal={() =>
              setVisibleCount((c) =>
                Math.min(c + 1, memories.length)
              )
            }
          />
        ))}
      </div>
    </section>
  )
}
