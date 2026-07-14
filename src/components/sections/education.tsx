"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { education } from "@/data/education"
import { formatDate } from "@/lib/utils"
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MapPin,
  GraduationCap,
  Award,
  BookOpen,
} from "lucide-react"

export function Education() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section id="education" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Education"
          subtitle="Academic background and foundational knowledge"
        />

        <div className="max-w-4xl mx-auto space-y-6">
          {education.map((edu, index) => (
            <ScrollReveal key={edu.id} direction="up" delay={index * 0.1}>
              <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-neon-purple/20 flex items-center justify-center flex-shrink-0">
                          <GraduationCap className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">{edu.degree}</h3>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <span className="font-semibold text-foreground">
                              {edu.institution}
                            </span>
                            {edu.website && (
                              <a
                                href={edu.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary transition-colors"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-2 ml-15">
                        {edu.field}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground ml-15">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {edu.location}
                        </span>
                        <span>
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </span>
                      </div>
                    </div>

                    {edu.gpa && (
                      <Badge
                        variant="secondary"
                        className="bg-primary/20 text-primary text-sm px-3 py-1"
                      >
                        GPA: {edu.gpa}
                      </Badge>
                    )}
                  </div>

                  <div className="ml-15">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpand(edu.id)}
                      className="hover:bg-primary/10"
                    >
                      {expandedId === edu.id ? (
                        <>
                          Show Less
                          <ChevronUp className="w-4 h-4 ml-2" />
                        </>
                      ) : (
                        <>
                          View Details
                          <ChevronDown className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>

                    <AnimatePresence>
                      {expandedId === edu.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-border/50 space-y-6">
                            <div>
                              <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                                <Award className="w-4 h-4 text-primary" />
                                Achievements
                              </h4>
                              <ul className="space-y-2">
                                {edu.achievements.map((achievement, i) => (
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

                            {edu.relevantCoursework && (
                              <div>
                                <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                                  <BookOpen className="w-4 h-4 text-primary" />
                                  Relevant Coursework
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {edu.relevantCoursework.map((course) => (
                                    <Badge
                                      key={course}
                                      variant="outline"
                                      className="text-xs border-primary/20 bg-primary/5"
                                    >
                                      {course}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
