"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { 
  Menu, 
  X, 
  Home, 
  User, 
  Cpu, 
  Briefcase, 
  GraduationCap, 
  FolderCode, 
  Microscope, 
  Award, 
  BadgeCheck, 
  FileText, 
  Mail,
  Moon,
  Sun,
  Github,
  Linkedin,
  Twitter
} from "lucide-react"
import { navItems, socialLinks } from "@/data/personal"
import { cn } from "@/lib/utils"

const iconMap = {
  "home": Home,
  "user": User,
  "cpu": Cpu,
  "briefcase": Briefcase,
  "graduation-cap": GraduationCap,
  "folder-code": FolderCode,
  "microscope": Microscope,
  "award": Award,
  "certificate": BadgeCheck,
  "file-text": FileText,
  "mail": Mail,
  "github": Github,
  "linkedin": Linkedin,
  "twitter": Twitter,
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.replace("#", ""))
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

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    setIsOpen(false)
    const section = href.replace("#", "")
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (!mounted) return null

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "glass-strong py-3" : "py-5"
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("#home")
              }}
              className="text-xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
            >
              YRK
            </motion.a>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => {
                const Icon = iconMap[item.icon as keyof typeof iconMap]
                const isActive = activeSection === item.href.replace("#", "")
                
                return (
                  <motion.button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
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

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hidden sm:flex"
              >
                <Sun className="w-5 h-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute w-5 h-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              {/* Mobile Menu Button */}
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

      {/* Mobile Navigation */}
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
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm glass-strong p-6 overflow-y-auto"
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold gradient-text">Menu</span>
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
                    const Icon = iconMap[item.icon as keyof typeof iconMap]
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
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                      <Sun className="w-5 h-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute w-5 h-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    {socialLinks.slice(0, 4).map((social) => {
                      const Icon = iconMap[social.icon as keyof typeof iconMap]
                      return (
                        <Button
                          key={social.name}
                          variant="ghost"
                          size="icon"
                          asChild
                        >
                          <a
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={social.color}
                          >
                            <Icon className="w-5 h-5" />
                          </a>
                        </Button>
                      )
                    })}
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
