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
    { label: '常見問題', href: '#faq-section' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-100 transition-all duration-300 ease-in-out bg-white',
        isScrolled ? 'backdrop-blur-md shadow-sm py-2' : 'py-5',
      )}
    >
      <div className="mx-auto px-6 flex justify-between items-center max-w-300 md:px-0">
        <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img 
            src="/logo.png" 
            alt="Snapdog Logo" 
            className={cn(
              "w-[195px] h-auto object-contain transition-transform duration-300 origin-left",
              isScrolled && "scale-[0.7]"
            )}
          />
        </div>

        <div className="hidden md:flex items-center md:gap-8 lg:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#4A5565] hover:text-blue-600 font-medium transition-colors text-base"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-slate-900 text-white rounded-full font-medium hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center gap-2 px-6 py-3 text-[15px] group"
          >
            <span>立即規劃</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <button
          className="md:hidden text-slate-900 p-1 z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl py-6 px-6 flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-lg font-medium text-slate-700 text-left"
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
              className="bg-blue-600 text-white py-4 rounded-xl font-bold w-full shadow-lg shadow-blue-200"
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
