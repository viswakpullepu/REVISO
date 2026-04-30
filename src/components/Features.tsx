import { motion } from 'motion/react';
import { Scan, CalendarClock, Activity, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Scan className="w-5 h-5" />,
    title: "Scan & Sync",
    description: "Upload notes, PDFs, or photos of textbooks in seconds. We organize them automatically.",
    color: "bg-surface-container"
  },
  {
    icon: <CalendarClock className="w-5 h-5" />,
    title: "Smart Scheduling",
    description: "Auto-reminders carefully spaced out for Day 3, 7, 14, and 30 to maximize retention.",
    color: "bg-surface-container"
  },
  {
    icon: <Activity className="w-5 h-5" />,
    title: "Memory Readiness",
    description: "Track a live 0-100 score of your knowledge protection for every subject.",
    color: "bg-gold/20"
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "AI-Powered Study",
    description: "Generate accurate MCQs, flashcards, and summaries directly from your uploaded notes.",
    color: "bg-surface-container"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.3 }}
        className="text-3xl lg:text-4xl font-bold text-primary-container text-center mb-16"
      >
        Designed for Deep Focus
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group bg-white p-8 rounded-2xl border border-outline-variant/30 shadow-ambient hover:shadow-lift transition-all duration-300 ease-out"
          >
            <div className={`w-12 h-12 ${feature.color} text-primary-container rounded-xl flex items-center justify-center mb-6`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-primary-container mb-4 pb-2 border-b border-surface-container">
              {feature.title}
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
