'use client'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function Story() {
  const router = useRouter()

  return (
    <div className="px-6 py-20 max-w-2xl mx-auto space-y-24">

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-heading text-4xl text-center">
          Before anything else…
        </h1>
        <p className="text-center mt-6">
          This isn’t a website.<br />
          It’s my heart, in digital form.
        </p>
      </motion.div>

      {/* Continue adding sections */}

      <motion.button
        onClick={() => router.push('/yes')}
        className="mx-auto block bg-pink-500 text-white px-10 py-4 rounded-full"
      >
        I’m ready 💖
      </motion.button>

    </div>
  )
}
