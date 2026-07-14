"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { skills, skillCategories, getSkillsByCategory } from "@/data/skills"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { cn } from "@/lib/utils"
import {
  Code2,
  Layout,
  Brain,
  Cloud,
  GitBranch,
  Database,
  Wrench,
  Sparkles,
} from "lucide-react"

const categoryIcons: Record<string, React.ElementType> = {
  programming: Code2,
  frameworks: Layout,
  "ml-frameworks": Brain,
  cloud: Cloud,
  devops: GitBranch,
  databases: Database,
  tools: Wrench,
}

const proficiencyColor = (p: number) => {
  if (p >= 90) return "from-green-400 to-emerald-500"
  if (p >= 80) return "from-blue-400 to-cyan-500"
  if (p >= 70) return "from-yellow-400 to-amber-500"
  return "from-orange-400 to-red-500"
}

const proficiencyLabel = (p: number) => {
  if (p >= 90) return "Expert"
  if (p >= 80) return "Advanced"
  if (p >= 70) return "Intermediate"
  return "Beginner"
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState("ml-frameworks")

  const categorySkills = getSkillsByCategory(activeCategory as any)

  return (
    <section id="skills" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Skills & Expertise"
          subtitle="A comprehensive toolkit for building intelligent systems and scalable applications"
        />

        <ScrollReveal direction="up" delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {skillCategories.map((category) => {
              const Icon = categoryIcons[category.id] || Sparkles
              const isActive = activeCategory === category.id
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border",
                    isActive
                      ? "bg-primary/20 text-primary border-primary/50 shadow-lg shadow-primary/10"
                      : "bg-background/50 text-muted-foreground border-border/50 hover:border-primary/30 hover:bg-primary/5"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{category.label}</span>
                  <span className="sm:hidden">{category.label.split(" ")[0]}</span>
                </button>
              )
            })}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {categorySkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
              >
                <Card className="p-5 border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-neon-purple/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{skill.name}</h3>
                        <span className="text-xs text-muted-foreground">
                          {proficiencyLabel(skill.proficiency)}
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-xs font-bold",
                        skill.proficiency >= 90 && "bg-green-500/20 text-green-400",
                        skill.proficiency >= 80 &&
                          skill.proficiency < 90 &&
                          "bg-blue-500/20 text-blue-400",
                        skill.proficiency >= 70 &&
                          skill.proficiency < 80 &&
                          "bg-yellow-500/20 text-yellow-400",
                        skill.proficiency < 70 && "bg-orange-500/20 text-orange-400"
                      )}
                    >
                      {skill.proficiency}%
                    </Badge>
                  </div>

                  <div className="relative h-2 bg-secondary/50 rounded-full overflow-hidden">
                    <motion.div
                      className={cn(
                        "absolute inset-y-0 left-0 rounded-full bg-gradient-to-r",
                        proficiencyColor(skill.proficiency)
                      )}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.proficiency}%` }}
                      transition={{ delay: 0.3 + index * 0.04, duration: 0.8, ease: "easeOut" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer bg-[length:200%_100%]" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <ScrollReveal direction="up" delay={0.3}>
          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold mb-6">Core Competencies</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {skills
                .filter((s) => s.proficiency >= 90)
                .map((skill) => (
                  <Badge
                    key={skill.name}
                    variant="outline"
                    className="px-4 py-2 text-sm border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors cursor-default"
                  >
                    {skill.name}
                  </Badge>
                ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
