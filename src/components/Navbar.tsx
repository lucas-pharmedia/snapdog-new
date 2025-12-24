import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '產品特色', href: '#sec-1' },
    { label: '應用場景', href: '#scenarios' },
    { label: '商業價值', href: '#business-value' },
    { label: '常見問題', href: '#faq-section' }
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 z-100 w-full bg-white transition-all duration-300 ease-in-out',
        isScrolled ? 'py-2 shadow-sm backdrop-blur-md' : 'py-5'
      )}
    >
      <div className="mx-auto flex max-w-300 items-center justify-between px-6 md:px-0">
        <div
          className="flex cursor-pointer items-center"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            src="/logo.png"
            alt="Snapdog Logo"
            className={cn(
              'h-auto w-[195px] origin-left object-contain transition-transform duration-300',
              isScrolled && 'scale-[0.7]'
            )}
          />
        </div>

        <div className="hidden items-center md:flex md:gap-8 lg:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-base font-medium text-[#4A5565] transition-colors hover:text-blue-600"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="group flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-[15px] font-medium text-white transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30"
          >
            <span>立即規劃</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <button className="z-50 p-1 text-slate-900 md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 flex w-full flex-col gap-6 border-t border-slate-100 bg-white px-6 py-6 shadow-xl md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-left text-lg font-medium text-slate-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full rounded-xl bg-blue-600 py-4 font-bold text-white shadow-lg shadow-blue-200"
            >
              立即規劃
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
