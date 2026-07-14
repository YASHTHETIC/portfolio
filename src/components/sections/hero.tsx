"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import dynamic from "next/dynamic"
import {
  ArrowDown,
  Download,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Code,
  Award,
  Cpu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { personalInfo, socialLinks } from "@/data/personal"
import { cn } from "@/lib/utils"

const AnimatedBackground = dynamic(
  () => import("@/components/3d/animated-background"),
  { ssr: false }
)

const roles = [
  "AI Engineer",
  "ML Engineer",
  "Computer Vision Engineer",
  "Full Stack AI Developer",
  "Deep Learning Researcher",
]

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
  code: Code,
  award: Award,
  cpu: Cpu,
}

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const textX = useTransform(x, [-0.5, 0.5], [15, -15])
  const textY = useTransform(y, [-0.5, 0.5], [10, -10])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const xNorm = e.clientX / window.innerWidth - 0.5
      const yNorm = e.clientY / window.innerHeight - 0.5
      mouseX.set(xNorm)
      mouseY.set(yNorm)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  useEffect(() => {
    const currentRole = roles[roleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    } else {
      const speed = isDeleting ? 30 : 60
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentRole.substring(0, displayText.length - 1)
            : currentRole.substring(0, displayText.length + 1)
        )
      }, speed)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, roleIndex])

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.3 },
      },
    }),
    []
  )

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    }),
    []
  )

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <AnimatedBackground />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      <motion.div
        style={{ x: textX, y: textY }}
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for opportunities
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="block text-foreground/80">Hi, I&apos;m</span>
            <span className="bg-gradient-to-r from-primary via-neon-purple to-neon-cyan bg-clip-text text-transparent animate-gradient-xy bg-[length:200%_200%]">
              {personalInfo.name}
            </span>
          </motion.h1>

          <motion.div variants={itemVariants} className="h-10 mb-4">
            <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-light">
              I&apos;m a{" "}
              <span className="text-primary font-medium">
                {displayText}
                <span className="inline-block w-0.5 h-6 md:h-8 bg-primary ml-1 animate-pulse align-middle" />
              </span>
            </p>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {personalInfo.tagline}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button
              size="lg"
              className="px-8 py-6 text-base font-semibold bg-gradient-to-r from-primary to-neon-purple hover:opacity-90 shadow-lg shadow-primary/25"
              onClick={() => scrollToSection("projects")}
            >
              View Projects
              <ArrowDown className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-base font-semibold border-primary/30 hover:bg-primary/10"
              onClick={() => scrollToSection("contact")}
            >
              Contact Me
              <Mail className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="px-8 py-6 text-base font-semibold hover:bg-accent"
              asChild
            >
              <a href={personalInfo.resumeUrl} download>
                <Download className="w-5 h-5 mr-2" />
                Resume
              </a>
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4"
          >
            {socialLinks.slice(0, 5).map((social, index) => {
              const Icon = iconMap[social.icon] || Github
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "p-3 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm transition-all",
                    social.color
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.name}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              )
            })}
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.button
          onClick={() => scrollToSection("about")}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          aria-label="Scroll to about"
        >
          <span className="text-xs font-medium tracking-wider uppercase">
            Scroll
          </span>
          <ArrowDown className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </section>
  )
}
