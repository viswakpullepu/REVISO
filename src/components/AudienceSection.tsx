import { motion } from 'motion/react';

export default function AudienceSection({ onAction }: { onAction: () => void }) {
  return (
    <section className="bg-primary-container text-white py-24 px-6 relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gold via-primary-container to-primary-container"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-10">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.4 }}
          className="text-4xl lg:text-5xl font-bold font-sans"
        >
          Built for Serious Aspirants
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-4">
          <span className="px-5 py-2 rounded-full bg-white/10 text-sm font-semibold border border-white/20">Competitive Exams</span>
          <span className="px-5 py-2 rounded-full bg-white/10 text-sm font-semibold border border-white/20">Major Entrance Exams</span>
          <span className="px-5 py-2 rounded-full bg-white/10 text-sm font-semibold border border-white/20">Executive Learning</span>
        </div>

        <motion.p 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-xl lg:text-2xl text-blue-200/90 font-medium italic leading-relaxed"
        >
          "The anxiety of forgetting weeks of hard work right before the exam is overwhelming. Reviso acts as a trusted senior, structuring your revision so you walk into the exam hall knowing exactly what you've retained."
        </motion.p>

        <div className="pt-8">
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "#E49615" }}
            whileTap={{ scale: 0.95 }}
            onClick={onAction}
            className="bg-gold text-primary-container font-bold px-10 py-5 rounded-xl shadow-lg text-lg transition-all"
          >
            Secure Your Spot Early
          </motion.button>
        </div>
      </div>
    </section>
  );
}
