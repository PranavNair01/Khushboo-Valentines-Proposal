'use client'
import { motion } from 'framer-motion'

type Props = {
  lines: string[]
}

export default function RevealText({ lines }: Props) {
  return (
    <div className="space-y-2">
      {lines.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 }}
        >
          {line || <span>&nbsp;</span>}
        </motion.p>
      ))}
    </div>
  )
}
