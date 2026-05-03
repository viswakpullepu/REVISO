import { motion } from 'motion/react';

const TAGS = ['Competitive Exams', 'Major Entrance Exams', 'Executive Learning'];

export default function AudienceSection({ onAction }: { onAction: () => void }) {
  return (
    <section
      className="relative py-20 md:py-28 px-5 md:px-6 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1E3A80, #0F1F5C)' }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top right, rgba(245,166,35,0.08) 0%, transparent 60%)',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-white/8" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/8" />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8 md:space-y-10">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.4 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
        >
          Built for{' '}
          <span style={{ color: '#F5A623' }}>Serious Aspirants</span>
        </motion.h2>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="px-4 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold text-white border border-white/15 bg-white/5 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-base sm:text-xl lg:text-2xl text-white/60 font-medium italic leading-relaxed max-w-3xl mx-auto"
        >
          "The anxiety of forgetting weeks of hard work right before the exam is overwhelming.
          Reviso acts as a trusted senior, structuring your revision so you walk into the exam
          hall knowing exactly what you've retained."
        </motion.p>

        {/* CTA */}
        <div className="pt-2 md:pt-4">
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(245,166,35,0.6)' }}
            whileTap={{ scale: 0.96 }}
            onClick={onAction}
            className="w-full sm:w-auto bg-gold text-primary font-bold px-8 md:px-10 py-4 md:py-5 rounded-xl text-base md:text-lg transition-all"
            style={{ boxShadow: '0 0 20px rgba(245,166,35,0.4)' }}
          >
            Secure Your Spot Early
          </motion.button>
        </div>
      </div>
    </section>
  );
}
