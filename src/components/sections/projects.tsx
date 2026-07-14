"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { projects, getFeaturedProjects } from "@/data/projects"
import { formatDate, getTechColor } from "@/lib/utils"
import type { Project } from "@/types"
import {
  Github,
  ExternalLink,
  Star,
  GitFork,
  ArrowRight,
  X,
  Users,
  Layers,
} from "lucide-react"

const categories = [
  { id: "all", label: "All Projects" },
  { id: "computer-vision", label: "Computer Vision" },
  { id: "nlp", label: "NLP" },
  { id: "fullstack-ai", label: "Full Stack AI" },
  { id: "generative-ai", label: "Generative AI" },
  { id: "mlops", label: "MLOps" },
  { id: "data-science", label: "Data Science" },
]

const categoryColors: Record<string, string> = {
  "computer-vision": "from-pink-500/20 to-rose-500/20",
  nlp: "from-cyan-500/20 to-blue-500/20",
  "fullstack-ai": "from-green-500/20 to-emerald-500/20",
  "generative-ai": "from-purple-500/20 to-violet-500/20",
  mlops: "from-orange-500/20 to-amber-500/20",
  "data-science": "from-blue-500/20 to-indigo-500/20",
  research: "from-red-500/20 to-pink-500/20",
  web: "from-teal-500/20 to-cyan-500/20",
  mobile: "from-indigo-500/20 to-purple-500/20",
}

function ProjectCard({
  project,
  featured = false,
  onSelect,
}: {
  project: Project
  featured?: boolean
  onSelect: (p: Project) => void
}) {
  const colorClass = categoryColors[project.category] || "from-primary/20 to-neon-purple/20"

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={`overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group cursor-pointer ${
          featured ? "md:col-span-2 lg:col-span-1" : ""
        }`}
        onClick={() => onSelect(project)}
      >
        <div
          className={`aspect-video bg-gradient-to-br ${colorClass} relative overflow-hidden`}
        >
          <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500">
            {project.category === "computer-vision"
              ? "👁"
              : project.category === "nlp"
              ? "💬"
              : project.category === "generative-ai"
              ? "🎨"
              : project.category === "fullstack-ai"
              ? "🚀"
              : "📦"}
          </div>

          <div className="absolute top-3 right-3 flex gap-2">
            {featured && (
              <Badge className="bg-primary text-primary-foreground">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
            {project.status === "completed" && (
              <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                Completed
              </Badge>
            )}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-5">
          <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className={`text-xs ${getTechColor(tech)}`}
              >
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            {project.metrics?.stars && (
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5" />
                {project.metrics.stars}
              </span>
            )}
            {project.metrics?.forks && (
              <span className="flex items-center gap-1">
                <GitFork className="w-3.5 h-3.5" />
                {project.metrics.forks}
              </span>
            )}
            {project.teamSize && project.teamSize > 1 && (
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                {project.teamSize}
              </span>
            )}
          </div>

          <div className="flex gap-2">
            {project.githubUrl && (
              <Button
                size="sm"
                variant="outline"
                className="flex-1 border-border/50 hover:bg-primary/10"
                asChild
                onClick={(e) => e.stopPropagation()}
              >
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  Code
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button
                size="sm"
                className="flex-1 bg-primary/10 text-primary hover:bg-primary/20"
                asChild
                onClick={(e) => e.stopPropagation()}
              >
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  if (!project) return null
  const colorClass = categoryColors[project.category] || "from-primary/20 to-neon-purple/20"

  return (
    <Dialog open={!!project} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto border-border/50 bg-card/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold pr-8">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {project.shortDescription}
          </DialogDescription>
        </DialogHeader>

        <div className={`aspect-video rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center text-6xl mb-4`}>
          {project.category === "computer-vision"
            ? "👁"
            : project.category === "nlp"
            ? "💬"
            : project.category === "generative-ai"
            ? "🎨"
            : "🚀"}
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Description</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {project.features && (
            <div>
              <h4 className="font-semibold mb-2">Key Features</h4>
              <ul className="space-y-1.5">
                {project.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.metrics && (
            <div>
              <h4 className="font-semibold mb-2">Metrics</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center gap-2 text-sm p-2 rounded-lg bg-secondary/30"
                  >
                    <span className="text-muted-foreground capitalize">
                      {key}:
                    </span>
                    <span className="font-medium">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="font-semibold mb-2">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className={`text-xs ${getTechColor(tech)}`}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            {project.githubUrl && (
              <Button className="flex-1 bg-primary hover:bg-primary/90" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  View Code
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button
                variant="outline"
                className="flex-1 border-primary/30 hover:bg-primary/10"
                asChild
              >
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  const featuredProjects = getFeaturedProjects()

  return (
    <section id="projects" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Projects"
          subtitle="A showcase of my work in AI, ML, and full-stack development"
        />

        <ScrollReveal direction="up" delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border ${
                  activeCategory === category.id
                    ? "bg-primary/20 text-primary border-primary/50 shadow-lg shadow-primary/10"
                    : "bg-background/50 text-muted-foreground border-border/50 hover:border-primary/30 hover:bg-primary/5"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {activeCategory === "all" && featuredProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-xl font-semibold mb-6 bg-gradient-to-r from-primary to-neon-purple bg-clip-text text-transparent">
              Featured Projects
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  featured
                  onSelect={setSelectedProject}
                />
              ))}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </div>

        {activeCategory !== "all" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <Button
              variant="outline"
              size="lg"
              className="border-border/50 hover:bg-primary/10"
              onClick={() => setActiveCategory("all")}
            >
              View All Projects
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        )}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
