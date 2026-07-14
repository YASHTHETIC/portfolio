"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { personalInfo, socialLinks, navItems } from "@/data/personal"
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ArrowUp,
  Code,
  Award,
  Cpu,
} from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
  code: Code,
  award: Award,
  cpu: Cpu,
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className="text-2xl font-bold bg-gradient-to-r from-primary via-neon-purple to-neon-cyan bg-clip-text text-transparent"
            >
              YR
            </a>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
              {personalInfo.tagline}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <nav className="grid grid-cols-2 gap-2">
              {navItems
                .filter((item) => !item.href.startsWith("/"))
                .slice(0, 8)
                .map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      const el = document.getElementById(
                        item.href.replace("#", "")
                      )
                      el?.scrollIntoView({ behavior: "smooth" })
                    }}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
            </nav>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-3">
              {socialLinks.slice(0, 5).map((social) => {
                const Icon = iconMap[social.icon] || Github
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-lg border border-border/50 bg-background/50 flex items-center justify-center transition-all hover:scale-110 ${social.color}`}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights
            reserved.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="gap-2 text-muted-foreground hover:text-primary"
            >
              Back to top
              <ArrowUp className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
