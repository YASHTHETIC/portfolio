"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { certifications, getFeaturedCertifications } from "@/data/certifications"
import { formatDate } from "@/lib/utils"
import {
  ExternalLink,
  Shield,
  CheckCircle,
  Calendar,
} from "lucide-react"

export function Certifications() {
  const featuredCertifications = getFeaturedCertifications()

  return (
    <section id="certifications" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Certifications"
          subtitle="Professional certifications and credentials"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <ScrollReveal key={cert.id} direction="up" delay={index * 0.08}>
              <Card
                className={`p-6 border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 h-full flex flex-col ${
                  cert.featured ? "border-primary/20" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-neon-cyan/20 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  {cert.featured && (
                    <Badge className="bg-primary/20 text-primary text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>

                <h3 className="font-bold text-lg mb-2">{cert.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{cert.issuer}</p>

                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(cert.date)}
                  </span>
                  {cert.expiryDate && (
                    <span className="text-xs text-muted-foreground">
                      Expires: {formatDate(cert.expiryDate)}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4 flex-1">
                  {cert.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-xs bg-secondary/50"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>

                {cert.credentialUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full mt-auto border-border/50 hover:bg-primary/10"
                    asChild
                  >
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Verify Credential
                    </a>
                  </Button>
                )}
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
