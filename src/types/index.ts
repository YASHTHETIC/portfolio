export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  twitter: string;
  leetcode: string;
  kaggle: string;
  huggingface: string;
  resumeUrl: string;
  avatar: string;
  ogImage: string;
  description: string;
  summary: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export interface Skill {
  name: string;
  category: SkillCategory;
  proficiency: number;
  icon?: string;
  description?: string;
  yearsOfExperience?: number;
}

export type SkillCategory =
  | "programming"
  | "frameworks"
  | "ml-frameworks"
  | "cloud"
  | "devops"
  | "databases"
  | "tools"
  | "ml-concepts"
  | "cv-nlp"
  | "soft-skills";

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | "Present";
  description: string;
  achievements: string[];
  technologies: string[];
  type: "full-time" | "internship" | "contract" | "freelance";
  logo?: string;
  website?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements: string[];
  relevantCoursework?: string[];
  logo?: string;
  website?: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  thumbnail: string;
  images: string[];
  technologies: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  demoUrl?: string;
  architectureUrl?: string;
  features: string[];
  metrics?: ProjectMetrics;
  startDate: string;
  endDate?: string;
  teamSize?: number;
  role?: string;
}

export type ProjectCategory =
  | "computer-vision"
  | "nlp"
  | "mlops"
  | "fullstack-ai"
  | "research"
  | "mobile"
  | "web"
  | "data-science"
  | "generative-ai";

export type ProjectStatus = "completed" | "in-progress" | "archived" | "maintenance";

export interface ProjectMetrics {
  accuracy?: string;
  latency?: string;
  throughput?: string;
  users?: string;
  downloads?: string;
  stars?: number;
  forks?: number;
  issues?: number;
  contributions?: number;
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  abstract: string;
  pdfUrl?: string;
  arxivUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  tags: string[];
  citations?: number;
  featured: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  issuer: string;
  category: AchievementCategory;
  icon?: string;
  url?: string;
  featured: boolean;
}

export type AchievementCategory =
  | "competition"
  | "hackathon"
  | "award"
  | "scholarship"
  | "publication"
  | "recognition"
  | "leadership";

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
  featured: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  updatedDate?: string;
  author: string;
  tags: string[];
  category: string;
  readTime: string;
  featured: boolean;
  thumbnail?: string;
  ogImage?: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  stargazersCount: number;
  forksCount: number;
  watchersCount: number;
  openIssuesCount: number;
  topics: string[];
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  license: { name: string; spdxId: string } | null;
  defaultBranch: string;
  isPrivate: boolean;
  isFork: boolean;
  isArchived: boolean;
}

export interface GitHubContribution {
  date: string;
  count: number;
  level: number;
}

export interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  totalCommits: number;
  totalContributions: number;
  topLanguages: { name: string; count: number }[];
  contributions: GitHubContribution[];
  pinnedRepos: GitHubRepo[];
  recentActivity: GitHubRepo[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  projectType?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  twitterCard?: "summary" | "summary_large_image";
  noIndex?: boolean;
  noFollow?: boolean;
  structuredData?: Record<string, unknown>;
}

export interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
  "data-testid"?: string;
}

export interface AnimationVariants {
  hidden: { opacity: number; y?: number; x?: number; scale?: number };
  visible: { opacity: number; y?: number; x?: number; scale?: number; transition?: Transition };
  exit?: { opacity: number; y?: number; x?: number; scale?: number };
}

export interface Transition {
  duration?: number;
  delay?: number;
  ease?: string | number[];
  type?: "tween" | "spring" | "inertia";
  stiffness?: number;
  damping?: number;
  mass?: number;
}

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  once?: boolean;
}

export interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export type Theme = "light" | "dark" | "system";

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
}

export interface Toast {
  id: string;
  title: string;
  description?: string;
  type: "success" | "error" | "warning" | "info" | "loading";
  duration?: number;
  action?: { label: string; onClick: () => void };
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

export interface DropdownItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  divider?: boolean;
  shortcut?: string;
}

export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
  className?: string;
  sortable?: boolean;
  width?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
  className?: string;
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface SearchFilters {
  query: string;
  category?: string;
  tags?: string[];
  dateRange?: { start: string; end: string };
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}