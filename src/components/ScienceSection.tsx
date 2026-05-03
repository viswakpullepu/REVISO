import { motion } from 'motion/react';
import { TrendingDown, RefreshCcw, BrainCircuit } from 'lucide-react';

export default function ScienceSection() {
  const steps = [
    {
      icon: <TrendingDown className="w-5 h-5 md:w-6 md:h-6 text-gold" />,
      title: 'The Problem',
      description: 'Without review, you forget nearly 70% of new information within 24 hours.',
      accent: false,
    },
    {
      icon: <RefreshCcw className="w-5 h-5 md:w-6 md:h-6 text-gold" />,
      title: 'The Solution',
      description:
        "Reviso prompts you to review material at the exact moment you're about to forget it, flattening the curve.",
      accent: false,
    },
    {
      icon: <BrainCircuit className="w-5 h-5 md:w-6 md:h-6 text-gold" />,
      title: 'The Result',
      description: 'Permanent retention with fewer study sessions. Work smarter, not harder.',
      accent: true,
    },
  ];

  return (
    <section id="science" className="py-16 md:py-24 px-5 md:px-6" style={{ background: 'rgba(30,58,128,0.25)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.35 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white"
          >
            The Science of Forgetting
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.05, duration: 0.35 }}
            className="text-base md:text-lg text-white/60 max-w-2xl mx-auto px-2"
          >
            The Ebbinghaus Forgetting Curve shows how information is lost over time when there is no
            attempt to retain it. Reviso strategically interrupts this curve.
          </motion.p>
        </div>

        {/* Card */}
        <div
          className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center rounded-2xl p-6 md:p-8 lg:p-12 border border-white/8"
          style={{ background: '#1E3A80', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
        >
          {/* Forgetting-curve visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            className="relative w-full rounded-xl overflow-hidden border border-white/8"
            style={{ background: '#0F1F5C', aspectRatio: '16/9' }}
          >
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
              alt="Data visualization of forgetting curve"
              className="w-full h-full object-cover opacity-20"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
              <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet">
                <path
                  d="M 0 30 Q 80 160 400 190"
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="2"
                  strokeDasharray="6,4"
                />
                <path d="M 0 30 Q 50 30 80 70"   fill="none" stroke="#F5A623" strokeWidth="3" />
                <path d="M 80 70 Q 130 40 160 70" fill="none" stroke="#F5A623" strokeWidth="3" />
                <path d="M 160 70 Q 230 45 270 70" fill="none" stroke="#F5A623" strokeWidth="3" />
                <path d="M 270 70 Q 340 50 380 65" fill="none" stroke="#F5A623" strokeWidth="3" />
                {[{ cx: 80, cy: 70 }, { cx: 160, cy: 70 }, { cx: 270, cy: 70 }, { cx: 380, cy: 65 }].map(
                  (p, i) => <circle key={i} cx={p.cx} cy={p.cy} r="5" fill="#F5A623" />
                )}
                <text x="5"   y="25"  fill="rgba(255,255,255,0.5)" fontSize="10">100%</text>
                <text x="5"   y="185" fill="rgba(255,255,255,0.5)" fontSize="10">0%</text>
                <text x="265" y="185" fill="rgba(255,255,255,0.3)" fontSize="9">Without review</text>
                <text x="300" y="58"  fill="#F5A623"               fontSize="9">With Reviso</text>
              </svg>
            </div>
          </motion.div>

          {/* Steps */}
          <div className="space-y-6 md:space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
                className="flex gap-4 md:gap-5"
              >
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center shrink-0 border ${
                    step.accent ? 'bg-gold/15 border-gold/30' : 'bg-white/5 border-white/8'
                  }`}
                >
                  {step.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="text-base md:text-lg font-bold text-white">{step.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
