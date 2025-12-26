import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ChevronRight, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils';
import { LINE_OA_URL, SectionId } from '../constans';

const Navbar = ({ setNavBarScrolling }: { setNavBarScrolling: (scrolling: boolean) => void }) => {
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
    { label: '產品特色', sectionId: SectionId.InteractiveStage },
    { label: '應用場景', sectionId: SectionId.Scenarios },
    { label: '商業價值', sectionId: SectionId.BusinessValue },
    { label: '常見問題', sectionId: SectionId.FAQ }
  ];

  const scrollToSection = (sectionId: string) => {
    const offset = 50;
    const targetElement = document.getElementById(sectionId);
    if (!targetElement) return;
    const elementPosition = targetElement.getBoundingClientRect().top;

    const offsetPosition = elementPosition + window.scrollY - offset;

    setNavBarScrolling(true);
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    const checkScrollEnd = () => {
      if (Math.abs(window.scrollY - offsetPosition) <= 1) {
        setNavBarScrolling(false);
        window.removeEventListener('scroll', checkScrollEnd);
      }
    };

    window.addEventListener('scroll', checkScrollEnd);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 z-100 w-full bg-white transition-all duration-300 ease-in-out',
        isScrolled ? 'py-2 shadow-sm backdrop-blur-md' : 'py-5'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
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
            <button
              key={link.label}
              onClick={() => {
                scrollToSection(link.sectionId);
              }}
              className="cursor-pointer text-base font-medium text-[#4A5565] transition-colors hover:text-blue-600"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              scrollToSection(SectionId.Contact);
            }}
            className="group flex w-42.5 cursor-pointer items-center justify-center gap-1 rounded-full bg-slate-900 px-6 py-2.5 text-white transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30"
          >
            <span className="text-base font-medium">聯絡我們</span>
            <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <button className="z-50 p-1 text-slate-900 md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 flex w-full flex-col gap-7 border-t border-slate-100 bg-white px-6 py-11 shadow-xl md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  scrollToSection(SectionId.Contact);
                  setIsMobileMenuOpen(false);
                }}
                className="py-2 text-xl font-medium text-[#101828]"
              >
                {link.label}
              </button>
            ))}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  scrollToSection(SectionId.Contact);
                }}
                className="relative w-full rounded-xl bg-blue-600 py-5.5 text-xl font-medium text-white"
              >
                <span>聯絡我們</span>
                <ChevronRight className="absolute top-[50%] right-6 h-7 w-7 -translate-y-1/2" />
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.open(LINE_OA_URL, '_blank');
                }}
                className="relative w-full rounded-xl bg-[#182031] py-5.5 text-xl font-medium text-white"
              >
                <span>加入 LINE 體驗</span>
                <div className="absolute top-[50%] left-6 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-lg border border-green-500/20 bg-green-500/10">
                  <QrCode className="h-7 w-7 text-green-500" />
                </div>
                <ChevronRight className="absolute top-[50%] right-6 h-7 w-7 -translate-y-1/2" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
