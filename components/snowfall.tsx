"use client"

import { useEffect, useState } from "react"

interface Snowflake {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}

export function Snowfall() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([])

  useEffect(() => {
    const createSnowflake = (id: number): Snowflake => ({
      id,
      x: Math.random() * window.innerWidth,
      y: -10,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.4,
    })

    const initialSnowflakes = Array.from({ length: 50 }, (_, i) => createSnowflake(i))
    setSnowflakes(initialSnowflakes)

    const interval = setInterval(() => {
      setSnowflakes((prev) =>
        prev.map((flake) => {
          const newY = flake.y + flake.speed
          if (newY > window.innerHeight) {
            return createSnowflake(flake.id)
          }
          return { ...flake, y: newY }
        }),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${flake.x}px`,
            top: `${flake.y}px`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
          }}
        />
      ))}
    </div>
  )
}
