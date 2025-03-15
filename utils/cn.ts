import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'

interface ClassInput {
  [key: string]: any
}

export function cn(...inputs: ClassInput[]): string {
  return twMerge(clsx(inputs))
}
