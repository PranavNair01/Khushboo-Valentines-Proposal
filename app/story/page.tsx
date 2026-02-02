'use client'
import { motion } from 'framer-motion'
import { proposalText } from '@/lib/proposalText'
import RevealText from '@/components/RevealText'
import { useRouter } from 'next/navigation'

export default function Story() {
  const router = useRouter()

  return (
    <div className="px-6 py-24 max-w-2xl mx-auto space-y-32">

      {/* INTRO */}
      <section className="text-center">
        <h1 className="font-heading text-4xl mb-8">
          {proposalText.intro.title}
        </h1>
        <RevealText lines={proposalText.intro.lines} />
        <button className="mt-10 text-pink-600">
          {proposalText.intro.button}
        </button>
      </section>

      {/* BEGINNING */}
      <section className="text-center">
        <RevealText lines={proposalText.beginning} />
      </section>

      {/* CHAT STORY */}
      <section className="space-y-6">
        <div className="bg-gray-100 p-4 rounded-xl w-fit">
          {proposalText.story.her}
        </div>

        <div className="bg-pink-100 p-4 rounded-xl w-fit ml-auto">
          {proposalText.story.me}
        </div>

        <RevealText lines={proposalText.story.memories} />
      </section>

      {/* DEPTH */}
      <section className="text-center">
        <RevealText lines={proposalText.depth} />
        <p className="mt-6 font-semibold">
          {proposalText.depthHighlight}
        </p>
      </section>

      {/* REASONS */}
      <section className="grid gap-6">
        {proposalText.reasons.map((reason, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="p-6 rounded-2xl bg-pink-50"
          >
            <h3 className="font-semibold mb-2">{reason.title}</h3>
            <p>{reason.text}</p>
          </motion.div>
        ))}
      </section>

      {/* LETTER */}
      <section className="font-serif text-lg leading-relaxed">
        <RevealText lines={proposalText.letter} />
      </section>

      {/* FINAL BUTTON */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push('/yes')}
        className="mx-auto block bg-pink-500 text-white px-12 py-4 rounded-full text-lg"
      >
        I’m ready 💖
      </motion.button>

    </div>
  )
}
