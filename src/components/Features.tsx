import { motion } from 'motion/react';
import { Scan, CalendarClock, Activity, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Scan className="w-5 h-5" />,
    title: 'Scan & Sync',
    description:
      'Upload notes, PDFs, or photos of textbooks in seconds. We organize them automatically.',
    highlight: false,
  },
  {
    icon: <CalendarClock className="w-5 h-5" />,
    title: 'Smart Scheduling',
    description:
      'Auto-reminders carefully spaced out for Day 3, 7, 14, and 30 to maximize retention.',
    highlight: false,
  },
  {
    icon: <Activity className="w-5 h-5" />,
    title: 'Memory Readiness',
    description:
      'Track a live 0–100 score of your knowledge protection for every subject.',
    highlight: true,
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: 'AI-Powered Study',
    description:
      'Generate accurate MCQs, flashcards, and summaries directly from your uploaded notes.',
    highlight: false,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-16 md:py-24 px-5 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.35 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-10 md:mb-16"
        >
          Designed for{' '}
          <span style={{ color: '#F5A623' }}>Deep Focus</span>
        </motion.h2>

        {/* 1 col → 2 col (sm) → 4 col (lg) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ delay: index * 0.06, duration: 0.35 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group flex flex-col gap-5 p-6 md:p-8 rounded-2xl border border-white/8 transition-all duration-300 ease-out"
              style={{ background: '#1E3A80', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
            >
              {/* Icon */}
              <div
                className={`w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                  feature.highlight
                    ? 'bg-gold/20 text-gold'
                    : 'bg-white/8 text-white/70 group-hover:bg-gold/20 group-hover:text-gold'
                }`}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <div className="space-y-2.5">
                <h3 className="text-base md:text-lg font-bold text-white">{feature.title}</h3>
                <div className="w-7 h-0.5 rounded-full bg-gold/40" />
                <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
