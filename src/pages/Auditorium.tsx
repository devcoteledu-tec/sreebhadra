import React from 'react';
import { motion } from 'motion/react';
import { Users, Calendar } from 'lucide-react';

const Auditorium = ({ isDark }: { isDark: boolean }) => {
  return (
    <div className={`pt-32 pb-20 ${isDark ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 text-emerald-500 mb-6">
            <Users className="w-8 h-8" />
            <span className="font-bold tracking-widest uppercase text-sm">Events</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Auditoriums</h1>
          <p className={`text-xl md:text-2xl leading-relaxed mb-12 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Perfect venues for your special occasions. From grand weddings to corporate conferences.
          </p>
        </motion.div>

        <div className="mt-20 relative rounded-3xl overflow-hidden h-[500px]">
          <img 
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2000" 
            alt="Auditorium" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">Create Memories</h2>
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-4 rounded-full font-bold flex items-center gap-3 mx-auto transition-all">
                <Calendar className="w-5 h-5" /> Check Availability
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auditorium;
