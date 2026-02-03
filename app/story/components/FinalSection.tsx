'use client'
import { useRouter } from 'next/navigation'
import FadeInOnScroll from './FadeInOnScroll'

export default function FinalSection() {
    const router = useRouter()

    return (
        <section className="min-h-screen flex items-center justify-center text-center px-6">
            <FadeInOnScroll>
                <div className="space-y-8">
                    <p className="text-lg opacity-80">
                        After everything…
                    </p>

                    <p className="text-2xl">
                        there’s just one thing
                        <br />
                        I want to ask you.
                    </p>

                    <button
                        onClick={() => router.push('/question')}
                        className="mt-8 px-10 py-4 rounded-full bg-pink-500 text-white"
                    >
                        Continue →
                    </button>
                </div>
            </FadeInOnScroll>
        </section>
    )
}
