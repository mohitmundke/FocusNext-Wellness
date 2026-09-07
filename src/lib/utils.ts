import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names with Tailwind conflict resolution
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string to a human-readable format
 */
export function formatDate(dateString: string | Date): string {
  if (!dateString) return "";
  const date = typeof dateString === "string" ? new Date(dateString) : dateString;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

/**
 * Format date with time
 */
export function formatDateTime(dateString: string | Date, timeString?: string | null): string {
  if (!dateString) return "";
  const formattedDate = formatDate(dateString);
  if (timeString) {
    return `${formattedDate} • ${timeString}`;
  }
  return formattedDate;
}

/**
 * Generate a clean URL slug from any string
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")        // Replace spaces with -
    .replace(/&/g, "-and-")      // Replace & with 'and'
    .replace(/[^\w-]+/g, "")     // Remove all non-word chars
    .replace(/--+/g, "-");       // Replace multiple - with single -
}

/**
 * Safely truncate text to a maximum character length
 */
export function truncate(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}
