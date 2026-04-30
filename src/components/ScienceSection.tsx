import { motion } from 'motion/react';
import { TrendingDown, RefreshCcw, BrainCircuit } from 'lucide-react';

export default function ScienceSection() {
  const steps = [
    {
      icon: <TrendingDown className="w-6 h-6 text-primary-container" />,
      title: "The Problem",
      description: "Without review, you forget nearly 70% of new information within 24 hours.",
      color: "bg-surface-container"
    },
    {
      icon: <RefreshCcw className="w-6 h-6 text-primary-container" />,
      title: "The Solution",
      description: "Reviso prompts you to review material at the exact moment you're about to forget it, flattening the curve.",
      color: "bg-surface-container"
    },
    {
      icon: <BrainCircuit className="w-6 h-6 text-primary-container" />,
      title: "The Result",
      description: "Permanent retention with fewer study sessions. Work smarter, not harder.",
      color: "bg-gold/20"
    }
  ];

  return (
    <section id="science" className="py-24 bg-surface-container-low px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.3 }}
            className="text-3xl lg:text-4xl font-bold text-primary-container"
          >
            The Science of Forgetting
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.05, duration: 0.3 }}
            className="text-lg text-on-surface-variant max-w-2xl mx-auto"
          >
            The Ebbinghaus Forgetting Curve shows how information is lost over time when there is no attempt to retain it. Reviso strategically interrupts this curve.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center bg-white rounded-3xl p-8 lg:p-12 shadow-ambient border border-outline-variant/30">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            className="relative aspect-video bg-surface-container rounded-2xl overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" 
              alt="Data visualization of forgetting curve" 
              className="w-full h-full object-cover mix-blend-multiply opacity-80"
              referrerPolicy="no-referrer"
            />
            {/* Overlay graphic simplified representation */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 400 200" className="w-[80%] h-[60%]">
                <path d="M 0 50 Q 100 180 400 190" fill="none" stroke="#0f1f5c" strokeWidth="3" strokeDasharray="5,5" />
                <path d="M 0 50 Q 50 50 80 80" fill="none" stroke="#F5A623" strokeWidth="4" />
                <path d="M 80 80 Q 130 50 160 80" fill="none" stroke="#F5A623" strokeWidth="4" />
                <circle cx="0" cy="50" r="4" fill="#0f1f5c" />
                <circle cx="80" cy="80" r="4" fill="#F5A623" />
                <circle cx="160" cy="80" r="4" fill="#F5A623" />
              </svg>
            </div>
          </motion.div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="flex gap-5"
              >
                <div className={`${step.color} w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm`}>
                  {step.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-primary-container">{step.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
