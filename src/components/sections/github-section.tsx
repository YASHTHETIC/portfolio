"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { cn } from "@/lib/utils"
import {
  Github,
  Star,
  GitFork,
  ExternalLink,
  Code,
  Activity,
  Folder,
  Loader2,
} from "lucide-react"

interface PinnedRepo {
  name: string
  description: string | null
  language: string | null
  stargazersCount: number
  forksCount: number
  htmlUrl: string
  topics: string[]
}

interface GitHubData {
  totalRepos: number
  totalStars: number
  totalContributions: number
  pinnedRepos: PinnedRepo[]
  topLanguages: { name: string; count: number; color: string }[]
  contributions: number[]
}

const languageColors: Record<string, string> = {
  Python: "bg-blue-500",
  TypeScript: "bg-blue-600",
  JavaScript: "bg-yellow-400",
  HTML: "bg-orange-500",
  CSS: "bg-purple-500",
  Java: "bg-red-500",
  "C++": "bg-pink-500",
  Rust: "bg-orange-600",
  Go: "bg-cyan-500",
  Shell: "bg-green-500",
}

function SkeletonCard() {
  return (
    <Card className="p-5 border-border/50 bg-card/50 animate-pulse">
      <div className="h-4 bg-secondary/50 rounded w-3/4 mb-3" />
      <div className="h-3 bg-secondary/50 rounded w-full mb-2" />
      <div className="h-3 bg-secondary/50 rounded w-2/3 mb-4" />
      <div className="flex gap-2">
        <div className="h-5 bg-secondary/50 rounded w-16" />
        <div className="h-5 bg-secondary/50 rounded w-12" />
      </div>
    </Card>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType
  label: string
  value: number | string
  color: string
}) {
  return (
    <Card className="p-5 border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            color
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-sm text-muted-foreground">{label}</div>
        </div>
      </div>
    </Card>
  )
}

function ContributionHeatmap({ contributions }: { contributions: number[] }) {
  const getColor = (level: number) => {
    if (level === 0) return "bg-secondary/30"
    if (level <= 3) return "bg-green-500/30"
    if (level <= 6) return "bg-green-500/50"
    if (level <= 9) return "bg-green-500/70"
    return "bg-green-500"
  }

  const weeks: number[][] = []
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7))
  }

  return (
    <div className="flex gap-1 overflow-x-auto pb-2">
      {weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-1">
          {week.map((day, di) => (
            <div
              key={di}
              className={cn("w-3 h-3 rounded-sm", getColor(day))}
              title={`${day} contributions`}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export function GitHubSection() {
  const [data, setData] = useState<GitHubData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchGitHub() {
      try {
        const res = await fetch("/api/github")
        if (!res.ok) throw new Error("Failed to fetch")
        const json = await res.json()
        setData(json)
      } catch {
        setError("Failed to load GitHub data")
      } finally {
        setLoading(false)
      }
    }
    fetchGitHub()
  }, [])

  if (error) {
    return (
      <section id="github" className="py-20 md:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="GitHub"
            subtitle="My open source contributions and activity"
          />
          <Card className="p-8 border-border/50 bg-card/50 text-center">
            <Github className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">{error}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              asChild
            >
              <a
                href="https://github.com/yashrajkumar"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit GitHub Profile
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section id="github" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="GitHub"
          subtitle="My open source contributions and activity"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : data ? (
            <>
              <StatCard
                icon={Folder}
                label="Total Repos"
                value={data.totalRepos}
                color="bg-primary/20 text-primary"
              />
              <StatCard
                icon={Star}
                label="Total Stars"
                value={data.totalStars}
                color="bg-yellow-500/20 text-yellow-400"
              />
              <StatCard
                icon={Activity}
                label="Contributions"
                value={data.totalContributions}
                color="bg-green-500/20 text-green-400"
              />
            </>
          ) : null}
        </div>

        <ScrollReveal direction="up" delay={0.1}>
          <h3 className="text-xl font-semibold mb-6">Language Distribution</h3>
          {loading ? (
            <div className="h-8 bg-secondary/30 rounded-full animate-pulse" />
          ) : data?.topLanguages ? (
            <div className="mb-8">
              <div className="flex h-4 rounded-full overflow-hidden bg-secondary/30">
                {data.topLanguages.map((lang, i) => {
                  const total = data.topLanguages.reduce(
                    (sum, l) => sum + l.count,
                    0
                  )
                  const pct = (lang.count / total) * 100
                  return (
                    <motion.div
                      key={lang.name}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.05, duration: 0.6 }}
                      className={cn(
                        languageColors[lang.name] || "bg-gray-500",
                        "h-full"
                      )}
                      title={`${lang.name}: ${pct.toFixed(1)}%`}
                    />
                  )
                })}
              </div>
              <div className="flex flex-wrap gap-4 mt-3">
                {data.topLanguages.map((lang) => (
                  <div key={lang.name} className="flex items-center gap-2 text-sm">
                    <div
                      className={cn(
                        "w-3 h-3 rounded-full",
                        languageColors[lang.name] || "bg-gray-500"
                      )}
                    />
                    <span className="text-muted-foreground">{lang.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.15}>
          <h3 className="text-xl font-semibold mb-6">Contribution Activity</h3>
          {loading ? (
            <div className="h-24 bg-secondary/30 rounded-lg animate-pulse" />
          ) : data?.contributions ? (
            <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm mb-12 overflow-x-auto">
              <ContributionHeatmap contributions={data.contributions} />
            </Card>
          ) : null}
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <h3 className="text-xl font-semibold mb-6">Pinned Repositories</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : data?.pinnedRepos ? (
              data.pinnedRepos.map((repo, index) => (
                <motion.div
                  key={repo.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-5 border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Folder className="w-4 h-4 text-primary" />
                        <a
                          href={repo.htmlUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold hover:text-primary transition-colors"
                        >
                          {repo.name}
                        </a>
                      </div>
                      <a
                        href={repo.htmlUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    {repo.description && (
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
                        {repo.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <Badge
                          key={topic}
                          variant="secondary"
                          className="text-xs"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground pt-3 border-t border-border/50">
                      {repo.language && (
                        <span className="flex items-center gap-1.5">
                          <div
                            className={cn(
                              "w-3 h-3 rounded-full",
                              languageColors[repo.language] || "bg-gray-500"
                            )}
                          />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5" />
                        {repo.stargazersCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5" />
                        {repo.forksCount}
                      </span>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : null}
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.3}>
          <div className="mt-12 text-center">
            <Button
              variant="outline"
              size="lg"
              className="border-border/50 hover:bg-primary/10"
              asChild
            >
              <a
                href="https://github.com/yashrajkumar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5 mr-2" />
                View GitHub Profile
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
