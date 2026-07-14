"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { navItems } from "@/data/personal"
import { cn } from "@/lib/utils"
import { useScrollPosition } from "@/hooks"
import {
  Menu,
  X,
  Sun,
  Moon,
  Home,
  User,
  Cpu,
  Briefcase,
  GraduationCap,
  FolderCode,
  Microscope,
  Award,
  FileText,
  Mail,
} from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  home: Home,
  user: User,
  cpu: Cpu,
  briefcase: Briefcase,
  "graduation-cap": GraduationCap,
  "folder-code": FolderCode,
  microscope: Microscope,
  award: Award,
  certificate: Award,
  "file-text": FileText,
  mail: Mail,
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const scrollPosition = useScrollPosition()
  const scrolled = scrollPosition.y > 50

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const sections = navItems
      .map((item) => item.href.replace("#", ""))
      .filter((href) => !href.startsWith("/"))

    const handleScroll = () => {
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = useCallback((href: string) => {
    setIsOpen(false)
    if (href.startsWith("/")) return
    const section = href.replace("#", "")
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark")
  }, [theme, setTheme])

  if (!mounted) return null

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/70 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-background/5 py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("#home")
              }}
              className="text-2xl font-bold bg-gradient-to-r from-primary via-neon-purple to-neon-cyan bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              YR
            </motion.a>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => {
                if (item.href.startsWith("/")) return null
                const Icon = iconMap[item.icon] || Home
                const isActive = activeSection === item.href.replace("#", "")

                return (
                  <motion.button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </motion.button>
                )
              })}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="hidden sm:flex"
              >
                <Sun className="w-5 h-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute w-5 h-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background/95 backdrop-blur-xl border-l border-border/50 p-6 overflow-y-auto"
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold bg-gradient-to-r from-primary to-neon-cyan bg-clip-text text-transparent">
                    Menu
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => {
                    if (item.href.startsWith("/")) return null
                    const Icon = iconMap[item.icon] || Home
                    const isActive = activeSection === item.href.replace("#", "")

                    return (
                      <button
                        key={item.label}
                        onClick={() => scrollToSection(item.href)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all",
                          isActive
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    )
                  })}
                </nav>

                <div className="pt-6 border-t border-border">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium">Theme</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleTheme}
                    >
                      <Sun className="w-5 h-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute w-5 h-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
