import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export default function Hero({ shakeTrigger }: { shakeTrigger: number }) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

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
      } else {
        setErrorStatus('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrorStatus('Network error. Check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const shakeAnimation = {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 }
  };

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex-1 space-y-8 text-center lg:text-left"
        >
          <h1 className="text-5xl lg:text-6xl font-bold text-primary-container leading-[1.12] tracking-tight">
            The app that tells you exactly what to revise and when.
          </h1>
          <p className="text-lg lg:text-xl text-on-surface-variant max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Stop forgetting 70% of what you study. Use the science of spaced repetition to lock information into long-term memory permanently.
          </p>
          
          <div className="max-w-lg mx-auto lg:mx-0">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div 
                  key="form-container"
                  animate={shakeTrigger > 0 ? shakeAnimation : {}}
                >
                  <form 
                    key="form"
                    className="flex flex-col sm:flex-row gap-4" 
                    onSubmit={handleSubmit}
                  >
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email" 
                      className={`flex-1 px-6 py-4 rounded-xl border ${errorStatus ? 'border-red-500 ring-1 ring-red-500' : 'border-outline-variant'} bg-white focus:outline-none focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container transition-all text-on-surface`}
                    />
                    <motion.button 
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ y: -2, shadow: "0 10px 25px -5px rgba(245, 166, 35, 0.4)" }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gold text-primary-container font-bold px-8 py-4 rounded-xl shadow-ambient transition-all whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
                    </motion.button>
                  </form>
                  {errorStatus && (
                    <p className="text-red-500 text-sm mt-2 font-medium">{errorStatus}</p>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-xl text-green-700"
                >
                  <CheckCircle2 className="w-6 h-6" />
                  <span className="font-semibold">You're on the list! We'll be in touch soon.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 w-full max-w-2xl"
        >
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lift border border-outline-variant/30">
            <img 
              src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2000&auto=format&fit=crop" 
              alt="Student focused on study" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-container/20 to-transparent"></div>
          </div>
        </motion.div>
      </div>

      {/* Background accents */}
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/2 bg-primary-container/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-1/4 h-1/3 bg-gold/10 blur-[100px] rounded-full"></div>
    </section>
  );
}
