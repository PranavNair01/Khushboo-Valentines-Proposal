'use client'
import { useEffect, useState } from 'react'

const TARGET_TIME = new Date('2026-02-08T08:30:00Z').getTime()

export function useCountdown() {
  const [timeLeft, setTimeLeft] = useState(() => {
    return Math.max(TARGET_TIME - Date.now(), 0)
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = TARGET_TIME - Date.now()
      setTimeLeft(Math.max(diff, 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const isUnlocked = timeLeft === 0

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (timeLeft / (1000 * 60 * 60)) % 24
  )
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60)
  const seconds = Math.floor((timeLeft / 1000) % 60)

  return {
    days,
    hours,
    minutes,
    seconds,
    isUnlocked,
  }
}
