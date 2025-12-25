import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const scrollToSection = (sectionId: string, offset: number = 0) => {
  const targetElement = document.getElementById(sectionId);

  if (targetElement) {
    const elementPosition = targetElement.getBoundingClientRect().top;

    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};
