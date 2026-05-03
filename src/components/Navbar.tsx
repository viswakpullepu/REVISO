import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Menu } from 'lucide-react';

export default function Navbar({ onPreRegister }: { onPreRegister: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handlePreRegister = () => {
    closeMenu();
    onPreRegister();
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-primary/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-5 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <span className="text-xl md:text-2xl font-bold text-white tracking-tight select-none">
            Reviso
          </span>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#science"
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              Science
            </a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onPreRegister}
              className="bg-gold text-primary font-bold px-6 py-2.5 rounded-lg text-sm hover:brightness-110 transition-all"
              style={{ boxShadow: '0 0 16px rgba(245,166,35,0.35)' }}
            >
              Pre-register
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={closeMenu}
            />

            {/* Slide-down menu */}
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="fixed top-16 left-0 right-0 z-50 md:hidden border-b border-white/8"
              style={{ background: '#0F1F5C' }}
            >
              <div className="flex flex-col px-5 py-6 gap-5">
                <a
                  href="#features"
                  onClick={closeMenu}
                  className="text-base font-medium text-white/80 hover:text-white transition-colors py-1"
                >
                  Features
                </a>
                <a
                  href="#science"
                  onClick={closeMenu}
                  className="text-base font-medium text-white/80 hover:text-white transition-colors py-1"
                >
                  Science
                </a>
                <button
                  onClick={handlePreRegister}
                  className="w-full bg-gold text-primary font-bold px-6 py-3.5 rounded-xl text-base mt-1 hover:brightness-110 transition-all"
                  style={{ boxShadow: '0 0 20px rgba(245,166,35,0.4)' }}
                >
                  Pre-register
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
