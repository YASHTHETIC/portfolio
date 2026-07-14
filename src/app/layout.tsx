import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yashrajsingh.vercel.app"),
  title: "Yash Raj Kumar | AI Engineer & Full Stack AI Developer",
  description: "AI Engineer specializing in Computer Vision, Machine Learning, and Full Stack AI Development. Building production-ready AI systems with expertise in PyTorch, TensorFlow, and MLOps.",
  keywords: ["AI Engineer", "Machine Learning", "Computer Vision", "Deep Learning", "Full Stack Developer", "MLOps", "PyTorch", "TensorFlow"],
  authors: [{ name: "Yash Raj Kumar" }],
  creator: "Yash Raj Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yashrajsingh.vercel.app",
    title: "Yash Raj Kumar | AI Engineer & Full Stack AI Developer",
    description: "AI Engineer specializing in Computer Vision, Machine Learning, and Full Stack AI Development.",
    siteName: "Yash Raj Kumar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Raj Kumar | AI Engineer & Full Stack AI Developer",
    description: "AI Engineer specializing in Computer Vision, Machine Learning, and Full Stack AI Development.",
    creator: "@yashrajsingh1",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
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