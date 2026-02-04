'use client'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import MusicPlayer, { MusicPlayerRef } from '@/components/MusicPlayer'

// your existing imports
import IntroSection from './components/IntroSection'
import StorySection from './components/StorySection'
import MemoriesSection from './components/MemoriesSection'
import FinalSection from './components/FinalSection'

export default function StoryPage() {
  const router = useRouter()
  const musicRef = useRef<MusicPlayerRef>(null)

  const goToQuestion = async () => {
    if (musicRef.current) {
      await musicRef.current.fadeOutAndStop()
    }
    router.push('/question')
  }

  return (
    <>
      <MusicPlayer
        ref={musicRef}
        src="/valentines_music.mp3"
        autoPlay
      />

      <IntroSection />
      <StorySection />
      <MemoriesSection />

      {/* Replace your existing FinalSection button handler */}
      <FinalSection onContinue={goToQuestion} />
    </>
  )
}
