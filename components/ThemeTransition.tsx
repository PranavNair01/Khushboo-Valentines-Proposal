'use client'
import { motion, AnimatePresence } from 'framer-motion'

export default function ThemeTransition({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 bg-black z-[9999]"
        />
      )}
    </AnimatePresence>
  )
}
