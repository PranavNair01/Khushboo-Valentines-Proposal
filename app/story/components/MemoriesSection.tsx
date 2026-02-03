'use client'
import { useState } from 'react'
import MemoryCard from './MemoryCard'
import FadeInOnScroll from './FadeInOnScroll'

const memories = [
    {
        id: 1,
        image: '/memories/1.jpg',
        caption: '8th March 2025 - The first "Sup?"',
        reveal: '2 desperate pages front and back: I was quite certain I bored you, and you were never coming back.',
    },
    {
        id: 2,
        image: '/memories/2.jpg',
        caption: '27th and 28th March 2025 - The first date?',
        reveal: 'Those were 2 memorable days after a very long time in my life. I think I started falling for you, and leaving you that night still remains as the most difficult night of my life.',
    },
    {
        id: 3,
        image: '/memories/3.jpg',
        caption: '3rd May 2025 - The first solo trip for a date',
        reveal: `I smile as I recollect the surprise.
            Calling you downstairs as I sat with a bouquet and chocolates.

            M.O.D. at Phoenix Kurla.
            Nothing but Chicken at Marine Drive.

            Btw, this was the first time you slept on my lap.

            PS — a huge reason for flying was also so that I’m not too late
            and you don’t go on a date with someone else.`,
    },
    {
        id: 4,
        image: '/memories/4.jpg',
        caption: '16th May 2025 - The first road trip together',
        reveal: 'Bhai the feeling as you held my hand while walking and said "Love let\'s go" when it was raining in Lonavala 🤌'
    },
    {
        id: 5,
        image: '/memories/5.jpg',
        caption: '18th May 2025 - The first rejection 💔',
        reveal: 'Bitch'
    },
    {
        id: 6,
        image: '/memories/6.jpg',
        caption: '11th July 2025 - The first sleepover',
        reveal: 'Don\'t curse me please. I know you are. 🥺'
    },
    {
        id: 7,
        image: '/memories/7.jpg',
        caption: '19th September 2025 - The first concert together',
        reveal: '(har cheez ka caption nahi h mere paas mere copywriter jaan)'
    },
    {
        id: 8,
        image: '/memories/8.jpg',
        caption: 'Between that...',
        reveal: 'Many more trips, airport selfies, and a second rejection.'
    },
    {
        id: 9,
        image: '/memories/9.jpg',
        caption: 'and that...',
        reveal: 'A million memories, dealing with life together, and a second road trip 🚗'
    },
    {
        id: 10,
        image: '/memories/10.jpg',
        caption: '1st November 2025 - She finally said "YES" to us',
        reveal: 'Khushboo you have no idea how grateful I am for that day, and every other day. I still remember the shockwave and surprise as you leaned in to kiss me in our apartment 💖'
    },
    {
        id: 11,
        image: '/memories/11.jpg',
        caption: '12th December 2025 - The first birthday together',
        reveal: 'Also the first time someone travelled for me, and my happiest birthday.'
    },
    {
        id: 12,
        image: '/memories/12.jpg',
        caption: '1st January 2026 - A new year together',
        reveal: 'I know I ruined the year later. But I feel blessed to have kissed you that night!'
    },
    {
        id: 13,
        image: '/memories/13.jpg',
        caption: 'My only wish: This forever',
        reveal: ''
    }
]

export default function MemoriesSection() {
    const [visibleCount, setVisibleCount] = useState(2)

    return (
        <section className="min-h-screen px-6 py-20">
            <FadeInOnScroll>
                <div className="text-center mb-12 space-y-2">
                    <h2 className="text-2xl">
                    Little moments I never forgot
                    </h2>
                    <p className="text-sm opacity-50">
                    (tap every memory to reveal)
                    </p>
                </div>
            </FadeInOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {memories.slice(0, visibleCount).map((memory, index) => (
                    <MemoryCard
                        key={memory.id}
                        memory={memory}
                        isLast={index === visibleCount - 1}
                        onUnlockNext={() =>
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
