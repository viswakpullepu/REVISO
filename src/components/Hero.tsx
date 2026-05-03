import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Hero({ shakeTrigger }: { shakeTrigger: number }) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const triggerConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, colors: ['#F5A623', '#ffffff', '#1E3A80'], origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, colors: ['#F5A623', '#ffffff', '#1E3A80'], origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorStatus('Please enter a valid email');
      return;
    }
    setErrorStatus(null);
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setIsSubmitted(true);
        triggerConfetti();
      } else {
        let errorMessage = 'Something went wrong. Please try again.';
        const responseText = await response.text();
        try {
          const data = JSON.parse(responseText);
          errorMessage = data.error || errorMessage;
        } catch (e) {
          errorMessage = `Server Error (${response.status}): ${responseText.substring(0, 100)}`;
        }
        setErrorStatus(errorMessage);
      }
    } catch (error: any) {
      setErrorStatus(`Network error: ${error.message || 'Check your connection'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const shakeAnimation = {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 },
  };

  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden">
      {/* Background glow blobs */}
      <div className="absolute top-0 right-0 -z-10 w-[40%] h-[60%] bg-primary-mid/60 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 w-[30%] h-[40%] bg-gold/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left — copy */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex-1 space-y-8 text-center lg:text-left"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/10 text-gold text-sm font-semibold"
          >
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            Now accepting early access
          </motion.div>

          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
            The app that tells you exactly{' '}
            <span style={{ color: '#F5A623' }}>what to revise</span> and when.
          </h1>

          <p className="text-lg lg:text-xl text-white/60 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Stop forgetting 70% of what you study. Use the science of spaced repetition to lock information into long-term memory permanently.
          </p>

          <div className="max-w-lg mx-auto lg:mx-0">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div key="form-container" animate={shakeTrigger > 0 ? shakeAnimation : {}}>
                  <form
                    key="form"
                    className="flex flex-col sm:flex-row gap-3"
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className={`flex-1 px-5 py-4 rounded-xl border ${
                        errorStatus
                          ? 'border-red-400 ring-1 ring-red-400'
                          : 'border-white/10'
                      } bg-primary-mid/60 backdrop-blur-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/50 transition-all`}
                    />
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.03, boxShadow: '0 0 28px rgba(245,166,35,0.55)' }}
                      whileTap={{ scale: 0.97 }}
                      className="bg-gold text-primary font-bold px-8 py-4 rounded-xl whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                      style={{ boxShadow: '0 0 20px rgba(245,166,35,0.4)' }}
                    >
                      {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
                    </motion.button>
                  </form>
                  {errorStatus && (
                    <p className="text-red-400 text-sm mt-2 font-medium">{errorStatus}</p>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 p-4 bg-gold/10 border border-gold/30 rounded-xl text-gold"
                >
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <span className="font-semibold">You're on the list! We'll be in touch soon.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right — image card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 w-full max-w-2xl"
        >
          <div
            className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/8"
            style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
          >
            <img
              src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2000&auto=format&fit=crop"
              alt="Student focused on study"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Dark overlay so image fits the dark theme */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent opacity-70" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
