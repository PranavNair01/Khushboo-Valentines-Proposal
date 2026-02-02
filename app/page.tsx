'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = () => {
    if (password === process.env.NEXT_PUBLIC_PROPOSAL_PASSWORD) {
      router.push('/story')
    } else {
      alert('That doesn’t feel right… try again 💔')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center space-y-4">
        <h1 className="font-heading text-3xl">For One Person Only 💌</h1>
        <p className="text-sm">Hint: the day we first felt “us” (DDDDMMYY)</p>

        <input
          type="password"
          className="border rounded-lg px-4 py-2 w-full"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="bg-pink-500 text-white px-6 py-2 rounded-xl"
        >
          Unlock ❤️
        </button>
      </div>
    </div>
  )
}
