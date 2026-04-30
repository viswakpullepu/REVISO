import { motion } from 'motion/react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary-container tracking-tight">Reviso</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Features</a>
          <a href="#science" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Science</a>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gold text-primary-container font-semibold px-6 py-2 rounded-lg text-sm shadow-sm hover:shadow-ambient transition-all"
          >
            Pre-register
          </motion.button>
        </div>

        <button className="md:hidden text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
        </button>
      </div>
    </nav>
  );
}
