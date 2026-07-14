import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yash Raj Kumar | AI Engineer & Full Stack AI Developer",
  description: "AI Engineer specializing in Computer Vision, Machine Learning, and Full Stack AI Development. Building production-ready AI systems with expertise in PyTorch, TensorFlow, and MLOps.",
  keywords: ["AI Engineer", "Machine Learning", "Computer Vision", "Deep Learning", "Full Stack Developer", "MLOps", "PyTorch", "TensorFlow"],
  authors: [{ name: "Yash Raj Kumar" }],
  creator: "Yash Raj Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yashrajkumar.dev",
    title: "Yash Raj Kumar | AI Engineer & Full Stack AI Developer",
    description: "AI Engineer specializing in Computer Vision, Machine Learning, and Full Stack AI Development.",
    siteName: "Yash Raj Kumar Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Yash Raj Kumar - AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Raj Kumar | AI Engineer & Full Stack AI Developer",
    description: "AI Engineer specializing in Computer Vision, Machine Learning, and Full Stack AI Development.",
    images: ["/og-image.jpg"],
    creator: "@yashrajkumar",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
