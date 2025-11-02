import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// class name merger
// e.g: 'bg-gray-300 bg-blue-500' => 'bg-blue-500'
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
