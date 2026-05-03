import { motion } from 'motion/react';
import { Scan, CalendarClock, Activity, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Scan className="w-5 h-5" />,
    title: 'Scan & Sync',
    description: 'Upload notes, PDFs, or photos of textbooks in seconds. We organize them automatically.',
    highlight: false,
  },
  {
    icon: <CalendarClock className="w-5 h-5" />,
    title: 'Smart Scheduling',
    description: 'Auto-reminders carefully spaced out for Day 3, 7, 14, and 30 to maximize retention.',
    highlight: false,
  },
  {
    icon: <Activity className="w-5 h-5" />,
    title: 'Memory Readiness',
    description: 'Track a live 0–100 score of your knowledge protection for every subject.',
    highlight: true,
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: 'AI-Powered Study',
    description: 'Generate accurate MCQs, flashcards, and summaries directly from your uploaded notes.',
    highlight: false,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.35 }}
        className="text-3xl lg:text-4xl font-bold text-white text-center mb-16"
      >
        Designed for <span style={{ color: '#F5A623' }}>Deep Focus</span>
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: index * 0.07, duration: 0.35 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group flex flex-col gap-6 p-8 rounded-2xl border border-white/8 transition-all duration-300 ease-out"
            style={{
              background: '#1E3A80',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            }}
          >
            {/* Icon */}
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                feature.highlight ? 'bg-gold/20 text-gold' : 'bg-white/8 text-white/70'
              } group-hover:bg-gold/20 group-hover:text-gold transition-all duration-300`}
            >
              {feature.icon}
            </div>

            {/* Content */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white">{feature.title}</h3>
              <div className="w-8 h-0.5 rounded-full bg-gold/40" />
              <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
