import { useState, useEffect } from 'react';

interface CountdownProps {
  seconds: number
  onComplete: () => void
}

export default function Countdown({ seconds, onComplete }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete()
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, onComplete])

  return (
    <div className="mt-4 text-gray-500">
      Redirecting to home page in {timeLeft} seconds...
    </div>
  )
}