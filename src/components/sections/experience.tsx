"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { experiences } from "@/data/experience"
import { formatDate } from "@/lib/utils"
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MapPin,
  Briefcase,
  Building2,
} from "lucide-react"

export function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section id="experience" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Experience"
          subtitle="Professional journey and career milestones"
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-neon-purple/50 to-neon-cyan/50 hidden md:block" />
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-neon-purple/50 to-neon-cyan/50 md:hidden" />

          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0
            const isCurrent = exp.endDate === "Present"

            return (
              <ScrollReveal
                key={exp.id}
                direction={isLeft ? "left" : "right"}
                delay={index * 0.1}
                className="relative mb-12 last:mb-0"
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-10">
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      isCurrent
                        ? "border-green-400 bg-green-400/20 shadow-lg shadow-green-400/30"
                        : "border-primary bg-primary/20"
                    }`}
                  />
                  {isCurrent && (
                    <motion.div
                      className="absolute inset-0 w-4 h-4 rounded-full border-2 border-green-400"
                      animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>

                <div
                  className={`md:grid md:grid-cols-2 md:gap-8 pl-12 md:pl-0 ${
                    isLeft ? "" : ""
                  }`}
                >
                  {/* Content Card */}
                  <div className={`${isLeft ? "md:pr-12" : "md:col-start-2 md:pl-12"}`}>
                    <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                      {isCurrent && (
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                          <Badge
                            variant="secondary"
                            className="bg-green-500/20 text-green-400 text-xs"
                          >
                            Current
                          </Badge>
                        </div>
                      )}

                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-5 h-5 text-primary" />
                          <h3 className="text-lg font-bold">{exp.role}</h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <Building2 className="w-4 h-4" />
                        <span className="font-semibold text-foreground">
                          {exp.company}
                        </span>
                        {exp.website && (
                          <a
                            href={exp.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {exp.location}
                        </span>
                        <span>
                          {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                        </span>
                        <Badge
                          variant="secondary"
                          className={
                            exp.type === "full-time"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-blue-500/20 text-blue-400"
                          }
                        >
                          {exp.type === "full-time" ? "Full-time" : "Internship"}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {exp.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs border-primary/20 bg-primary/5"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpand(exp.id)}
                        className="w-full hover:bg-primary/10"
                      >
                        {expandedId === exp.id ? (
                          <>
                            Show Less
                            <ChevronUp className="w-4 h-4 ml-2" />
                          </>
                        ) : (
                          <>
                            View Achievements
                            <ChevronDown className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>

                      <AnimatePresence>
                        {expandedId === exp.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-4 border-t border-border/50">
                              <h4 className="font-semibold mb-3 text-sm">
                                Key Achievements
                              </h4>
                              <ul className="space-y-2">
                                {exp.achievements.map((achievement, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                    {achievement}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
