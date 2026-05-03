import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Users, Mail, Clock, X } from 'lucide-react';

export default function AdminDashboard() {
  const [list, setList] = useState<{ email: string; created_at?: string; timestamp?: string }[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      fetch('/api/admin/waitlist')
        .then((res) => res.json())
        .then((data) => setList(data));
    }
  }, [isVisible]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === 'a') {
        setIsVisible((v) => !v);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-primary/60 backdrop-blur-xl flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl max-h-[80vh] rounded-2xl overflow-hidden flex flex-col border border-white/10"
        style={{ background: '#1E3A80', boxShadow: '0 10px 30px rgba(0,0,0,0.4)' }}
      >
        {/* Header */}
        <div
          className="p-6 border-b border-white/10 flex justify-between items-center"
          style={{ background: '#0F1F5C' }}
        >
          <div className="flex items-center gap-3">
            <Users className="text-gold w-5 h-5" />
            <h2 className="text-xl font-bold text-white">Waitlist Dashboard</h2>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white/50 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-grow overflow-auto p-6">
          {list.length === 0 ? (
            <div className="text-center py-20 text-white/30">
              <Mail className="mx-auto w-12 h-12 mb-4 opacity-30" />
              <p className="text-white/50">No registrations yet. Spread the word!</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {list.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-xl border border-white/8 hover:bg-white/5 transition-colors"
                  style={{ background: 'rgba(15,31,92,0.5)' }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-primary text-sm"
                      style={{ background: '#F5A623' }}
                    >
                      {item.email[0].toUpperCase()}
                    </div>
                    <span className="font-medium text-white">{item.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <Clock className="w-3 h-3" />
                    {new Date(item.created_at || item.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer bar */}
        <div
          className="p-3 text-center text-xs font-medium text-gold/80 border-t border-white/8"
          style={{ background: '#0F1F5C' }}
        >
          Connected to Supabase · Registrations are persistent
        </div>
      </motion.div>
    </div>
  );
}
