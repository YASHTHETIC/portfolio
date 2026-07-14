"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { researchPapers } from "@/data/research"
import {
  FileText,
  ExternalLink,
  Github,
  Quote,
  Users,
  Calendar,
  ChevronDown,
  ChevronUp,
  BookOpen,
} from "lucide-react"

export function Research() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section id="research" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Research"
          subtitle="Academic contributions and published work"
        />

        <div className="max-w-4xl mx-auto space-y-6">
          {researchPapers.map((paper, index) => (
            <ScrollReveal key={paper.id} direction="up" delay={index * 0.1}>
              <Card
                className={`p-6 border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 ${
                  paper.featured ? "border-primary/30 bg-primary/5" : ""
                }`}
              >
                {paper.featured && (
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-primary text-primary-foreground text-xs">
                      <BookOpen className="w-3 h-3 mr-1" />
                      Featured Publication
                    </Badge>
                  </div>
                )}

                <h3 className="text-lg font-bold mb-3">{paper.title}</h3>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {paper.authors.join(", ")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {paper.year}
                  </span>
                </div>

                <p className="text-sm font-medium text-primary/80 mb-4">
                  {paper.venue}
                </p>

                <div className="relative">
                  <div className="flex items-start gap-2 p-4 bg-secondary/30 rounded-lg">
                    <Quote className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <p
                      className={`text-sm text-muted-foreground leading-relaxed ${
                        expandedId !== paper.id ? "line-clamp-3" : ""
                      }`}
                    >
                      {paper.abstract}
                    </p>
                  </div>

                  {paper.abstract.length > 200 && (
                    <button
                      onClick={() => toggleExpand(paper.id)}
                      className="flex items-center gap-1 mt-2 text-xs text-primary hover:text-primary/80 transition-colors"
                    >
                      {expandedId === paper.id ? (
                        <>
                          Show less <ChevronUp className="w-3 h-3" />
                        </>
                      ) : (
                        <>
                          Read full abstract <ChevronDown className="w-3 h-3" />
                        </>
                      )}
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-4 mb-4">
                  {paper.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs border-primary/20 bg-primary/5"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <FileText className="w-3.5 h-3.5" />
                    <span className="font-medium">{paper.citations}</span> citations
                  </div>

                  <div className="flex gap-2">
                    {paper.pdfUrl && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="hover:bg-primary/10"
                        asChild
                      >
                        <a
                          href={paper.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          PDF
                        </a>
                      </Button>
                    )}
                    {paper.arxivUrl && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="hover:bg-primary/10"
                        asChild
                      >
                        <a
                          href={paper.arxivUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          arXiv
                        </a>
                      </Button>
                    )}
                    {paper.githubUrl && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="hover:bg-primary/10"
                        asChild
                      >
                        <a
                          href={paper.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4 mr-1" />
                          Code
                        </a>
                      </Button>
                    )}
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
