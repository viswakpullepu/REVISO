import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Users, Mail, Clock } from 'lucide-react';

export default function AdminDashboard() {
  const [list, setList] = useState<{ email: string; timestamp: string }[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      fetch('/api/admin/waitlist')
        .then(res => res.json())
        .then(data => setList(data));
    }
  }, [isVisible]);

  // Handle a simple "secret" trigger (ctrl + alt + a)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === 'a') {
        setIsVisible(v => !v);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-primary/20 backdrop-blur-xl flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-4xl max-h-[80vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="p-8 border-b border-surface-container flex justify-between items-center bg-surface-container-low">
          <div className="flex items-center gap-3">
            <Users className="text-primary-container" />
            <h2 className="text-2xl font-bold text-primary-container">Waitlist Dashboard</h2>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-on-surface-variant hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest"
          >
            Close
          </button>
        </div>

        <div className="flex-grow overflow-auto p-8">
          {list.length === 0 ? (
            <div className="text-center py-20 text-on-surface-variant">
              <Mail className="mx-auto w-12 h-12 mb-4 opacity-20" />
              <p>No registrations yet. Spread the word!</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {list.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant/30 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-container/5 flex items-center justify-center text-primary-container font-bold">
                      {item.email[0].toUpperCase()}
                    </div>
                    <span className="font-medium text-on-surface">{item.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                    <Clock className="w-3 h-3" />
                    {new Date(item.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-4 bg-primary-container text-white text-center text-xs font-medium">
          PRO TIP: In a production app, this list would be in a persistent database.
        </div>
      </motion.div>
    </div>
  );
}
