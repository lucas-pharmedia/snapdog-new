import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const scrollToSection = (sectionId: string) => {
  const targetElement = document.getElementById(sectionId);
  targetElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
