"use client"

import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right"
  distance?: number
  once?: boolean
  threshold?: number
}

const directionOffsets = {
  up: { y: 1 },
  down: { y: -1 },
  left: { x: 1 },
  right: { x: -1 },
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.5,
  direction = "up",
  distance = 40,
  once = true,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) {
            observer.unobserve(element)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [once, threshold])

  const offset = directionOffsets[direction]
  const initial: Record<string, number> = { opacity: 0 }
  if (offset.y !== undefined) initial.y = offset.y * distance
  if (offset.x !== undefined) initial.x = offset.x * distance

  const animate: Record<string, number> = { opacity: 1, x: 0, y: 0 }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={ref}
        initial={initial}
        animate={isVisible ? animate : initial}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className={cn(className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
