"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"

interface MouseParallaxProps {
  children: React.ReactNode
  className?: string
  intensity?: number
}

export function MouseParallax({
  children,
  className,
  intensity = 0.02,
}: MouseParallaxProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setOffset({ x: x * intensity * 100, y: y * intensity * 100 })
    },
    [intensity]
  )

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  return (
    <div
      className={cn("transition-transform duration-150 ease-out", className)}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
      }}
    >
      {children}
    </div>
  )
}
