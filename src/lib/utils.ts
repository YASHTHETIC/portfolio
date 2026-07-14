import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function formatDateLong(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "...";
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function getTechColor(tech: string): string {
  const colors: Record<string, string> = {
    python: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    javascript: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    typescript: "bg-blue-600/20 text-blue-300 border-blue-600/30",
    react: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    nextjs: "bg-gray-500/20 text-gray-300 border-gray-500/30",
    nodejs: "bg-green-500/20 text-green-400 border-green-500/30",
    python: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    pytorch: "bg-red-500/20 text-red-400 border-red-500/30",
    tensorflow: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    docker: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    kubernetes: "bg-blue-600/20 text-blue-300 border-blue-600/30",
    aws: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    gcp: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    azure: "bg-blue-600/20 text-blue-300 border-blue-600/30",
    sql: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    mongodb: "bg-green-500/20 text-green-400 border-green-500/30",
    postgresql: "bg-blue-600/20 text-blue-300 border-blue-600/30",
    redis: "bg-red-500/20 text-red-400 border-red-500/30",
    graphql: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    rest: "bg-green-500/20 text-green-400 border-green-500/30",
    grpc: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    kafka: "bg-red-500/20 text-red-400 border-red-500/30",
    rabbitmq: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    elasticsearch: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    prometheus: "bg-red-500/20 text-red-400 border-red-500/30",
    grafana: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    ci: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    cd: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    github: "bg-gray-500/20 text-gray-300 border-gray-500/30",
    gitlab: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    vscode: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    linux: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    bash: "bg-green-500/20 text-green-400 border-green-500/30",
    git: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    mlops: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    cv: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    nlp: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    deeplearning: "bg-red-500/20 text-red-400 border-red-500/30",
    reinforcement: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  };
  return colors[tech.toLowerCase()] || "bg-primary/20 text-primary border-primary/30";
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const group = String(item[key]);
    groups[group] = groups[group] ?? [];
    groups[group].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

export function sortBy<T>(array: T[], key: keyof T, order: "asc" | "desc" = "asc"): T[] {
  return [...array].sort((a, b) => {
    if (a[key] < b[key]) return order === "asc" ? -1 : 1;
    if (a[key] > b[key]) return order === "asc" ? 1 : -1;
    return 0;
  });
}

export function uniqueBy<T>(array: T[], key: keyof T): T[] {
  const seen = new Set();
  return array.filter((item) => {
    const val = item[key];
    if (seen.has(val)) return false;
    seen.add(val);
    return true;
  });
}

export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export function flattenArray<T>(array: T[][]): T[] {
  return array.reduce((acc, val) => acc.concat(val), []);
}

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function isEmpty(obj: unknown): boolean {
  if (obj == null) return true;
  if (Array.isArray(obj) || typeof obj === "string") return obj.length === 0;
  if (obj instanceof Map || obj instanceof Set) return obj.size === 0;
  if (typeof obj === "object") return Object.keys(obj).length === 0;
  return false;
}

export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result;
}

export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) result[key] = obj[key];
  });
  return result;
}