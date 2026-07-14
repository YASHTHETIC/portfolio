"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { motion, useInView } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { personalInfo } from "@/data/personal"
import {
  Brain,
  Code,
  Target,
  Zap,
  Users,
  Lightbulb,
  Download,
  Briefcase,
  FolderCheck,
  Calendar,
  Globe,
} from "lucide-react"

const highlights = [
  {
    icon: Brain,
    title: "AI & ML Expert",
    description:
      "Specialized in building intelligent systems with deep learning, computer vision, and NLP expertise",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: Code,
    title: "Full Stack Developer",
    description: "End-to-end development from ML models to production-ready applications",
    color: "from-cyan-500/20 to-blue-500/20",
  },
  {
    icon: Target,
    title: "Problem Solver",
    description: "Passionate about tackling complex challenges with innovative solutions",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: Zap,
    title: "Fast Learner",
    description: "Quickly adapt to new technologies and stay ahead of industry trends",
    color: "from-yellow-500/20 to-orange-500/20",
  },
  {
    icon: Users,
    title: "Team Player",
    description: "Collaborative mindset with experience working in diverse teams",
    color: "from-blue-500/20 to-indigo-500/20",
  },
  {
    icon: Lightbulb,
    title: "Innovation Driven",
    description: "Always exploring cutting-edge technologies and creative approaches",
    color: "from-pink-500/20 to-rose-500/20",
  },
]

const stats = [
  { label: "Years Experience", value: 3, suffix: "+", icon: Calendar },
  { label: "Projects Completed", value: 25, suffix: "+", icon: FolderCheck },
  { label: "Technologies", value: 40, suffix: "+", icon: Code },
  { label: "Open Source Contributions", value: 100, suffix: "+", icon: Globe },
]

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 2000
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-neon-cyan bg-clip-text text-transparent">
      {count}
      {suffix}
    </div>
  )
}

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="About Me"
          subtitle="Passionate about building intelligent systems that make a difference"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <ScrollReveal direction="left" delay={0.2}>
            <Card className="p-8 border-border/50 bg-card/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-neon-purple bg-clip-text text-transparent">
                Who I Am
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{personalInfo.summary}</p>
                <p>
                  I&apos;m a B.Tech graduate in Computer Science and Engineering with a
                  specialization in Artificial Intelligence and Machine Learning. My journey
                  in tech has been driven by curiosity and a passion for solving real-world
                  problems through innovative solutions.
                </p>
                <p>
                  Whether it&apos;s developing computer vision systems, building NLP
                  applications, or creating full-stack AI-powered platforms, I thrive on
                  challenges that push the boundaries of what&apos;s possible with technology.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                {["AI Engineer", "ML Engineer", "Computer Vision", "Full Stack Developer"].map(
                  (tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </Badge>
                  )
                )}
              </div>
              <Button
                className="mt-8 px-6 py-2 bg-gradient-to-r from-primary to-neon-purple hover:opacity-90"
                asChild
              >
                <a href={personalInfo.resumeUrl} download>
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </a>
              </Button>
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.3}>
            <div className="space-y-4">
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon
                return (
                  <motion.div
                    key={highlight.title}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <Card className="p-5 border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group">
                      <div className="flex items-start gap-4">
                        <div
                          className={cn(
                            "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform",
                            highlight.color
                          )}
                        >
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{highlight.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {highlight.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="up" delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card
                  key={stat.label}
                  className="p-6 text-center border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
                </Card>
              )
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.3}>
          <Card className="mt-16 p-8 border-border/50 bg-card/50 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-neon-cyan bg-clip-text text-transparent">
              What Drives Me
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Target,
                  title: "Excellence",
                  desc: "Striving for the highest quality in everything I build",
                },
                {
                  icon: Globe,
                  title: "Impact",
                  desc: "Creating solutions that make a real difference",
                },
                {
                  icon: Lightbulb,
                  title: "Innovation",
                  desc: "Pushing boundaries with creative approaches",
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-neon-purple/20 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  )
}
