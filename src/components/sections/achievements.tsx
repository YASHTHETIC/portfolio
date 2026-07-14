"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { achievements, getFeaturedAchievements } from "@/data/achievements"
import { formatDate } from "@/lib/utils"
import {
  Trophy,
  Award,
  Medal,
  GraduationCap,
  ExternalLink,
  Star,
  BadgeCheck,
  GitPullRequestArrow,
} from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  Trophy: Trophy,
  Award: Award,
  Medal: Medal,
  GraduationCap: GraduationCap,
  BadgeCheck: BadgeCheck,
  GitPullRequestArrow: GitPullRequestArrow,
}

const categoryColors: Record<string, string> = {
  hackathon: "from-yellow-500/20 to-orange-500/20",
  award: "from-purple-500/20 to-pink-500/20",
  competition: "from-blue-500/20 to-cyan-500/20",
  scholarship: "from-green-500/20 to-emerald-500/20",
  recognition: "from-red-500/20 to-rose-500/20",
}

const categoryBadgeColors: Record<string, string> = {
  hackathon: "bg-yellow-500/20 text-yellow-400",
  award: "bg-purple-500/20 text-purple-400",
  competition: "bg-blue-500/20 text-blue-400",
  scholarship: "bg-green-500/20 text-green-400",
  recognition: "bg-red-500/20 text-red-400",
}

export function Achievements() {
  const featuredAchievements = getFeaturedAchievements()

  return (
    <section id="achievements" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Achievements"
          subtitle="Recognition and milestones in my journey"
        />

        {featuredAchievements.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {featuredAchievements.map((achievement, index) => {
              const Icon = achievement.icon
                ? iconMap[achievement.icon] || Award
                : Trophy
              const colorClass =
                categoryColors[achievement.category] || categoryColors.award

              return (
                <ScrollReveal
                  key={achievement.id}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 0.1}
                >
                  <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 h-full">
                    <div className={`p-6 bg-gradient-to-br ${colorClass}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <Badge className="bg-primary text-primary-foreground text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {achievement.issuer}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className={`text-xs ${
                              categoryBadgeColors[achievement.category] || ""
                            }`}
                          >
                            {achievement.category}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(achievement.date)}
                          </span>
                        </div>
                        {achievement.url && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="hover:bg-primary/10"
                            asChild
                          >
                            <a
                              href={achievement.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>
              )
            })}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements
            .filter((a) => !a.featured)
            .map((achievement, index) => {
              const Icon = achievement.icon
                ? iconMap[achievement.icon] || Award
                : Trophy
              const colorClass =
                categoryColors[achievement.category] || categoryColors.award

              return (
                <ScrollReveal
                  key={achievement.id}
                  direction="up"
                  delay={index * 0.05}
                >
                  <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 h-full">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm mb-1 truncate">
                          {achievement.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          {achievement.issuer}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className={`text-xs ${
                              categoryBadgeColors[achievement.category] || ""
                            }`}
                          >
                            {achievement.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(achievement.date)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>
              )
            })}
        </div>
      </div>
    </section>
  )
}
