"use client"

import dynamic from "next/dynamic"

const Navigation = dynamic(() => import("@/components/navigation").then(m => ({ default: m.Navigation })), { ssr: false })
const Hero = dynamic(() => import("@/components/sections/hero").then(m => ({ default: m.Hero })), { ssr: false })
const About = dynamic(() => import("@/components/sections/about").then(m => ({ default: m.About })), { ssr: false })
const Skills = dynamic(() => import("@/components/sections/skills").then(m => ({ default: m.Skills })), { ssr: false })
const Experience = dynamic(() => import("@/components/sections/experience").then(m => ({ default: m.Experience })), { ssr: false })
const Education = dynamic(() => import("@/components/sections/education").then(m => ({ default: m.Education })), { ssr: false })
const Projects = dynamic(() => import("@/components/sections/projects").then(m => ({ default: m.Projects })), { ssr: false })
const Research = dynamic(() => import("@/components/sections/research").then(m => ({ default: m.Research })), { ssr: false })
const Achievements = dynamic(() => import("@/components/sections/achievements").then(m => ({ default: m.Achievements })), { ssr: false })
const Certifications = dynamic(() => import("@/components/sections/certifications").then(m => ({ default: m.Certifications })), { ssr: false })
const Contact = dynamic(() => import("@/components/sections/contact").then(m => ({ default: m.Contact })), { ssr: false })
const Footer = dynamic(() => import("@/components/sections/footer").then(m => ({ default: m.Footer })), { ssr: false })
const GithubSection = dynamic(() => import("@/components/sections/github-section").then(m => ({ default: m.GithubSection })), { ssr: false })

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <GithubSection />
        <Research />
        <Achievements />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}