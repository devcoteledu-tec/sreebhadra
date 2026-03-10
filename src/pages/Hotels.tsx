import React from 'react';
import { motion } from 'motion/react';
import { Hotel, Star } from 'lucide-react';

const Hotels = ({ isDark }: { isDark: boolean }) => {
  return (
    <div className={`pt-32 pb-20 ${isDark ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 text-emerald-500 mb-6">
            <Hotel className="w-8 h-8" />
            <span className="font-bold tracking-widest uppercase text-sm">Hospitality</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Premium Hotels</h1>
          <p className={`text-xl md:text-2xl leading-relaxed mb-12 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Experience unparalleled luxury and comfort in our handpicked locations across Kerala.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`rounded-3xl overflow-hidden ${isDark ? 'bg-zinc-800' : 'bg-zinc-50'} shadow-lg group`}>
              <div className="h-64 overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/hotel${i}/800/600`} 
                  alt="Hotel" 
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-emerald-500 text-emerald-500" />)}
                </div>
                <h3 className="text-2xl font-bold mb-4">Sreebhadra Grand {i}</h3>
                <p className={`mb-6 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Located in the heart of the city, offering world-class amenities and exceptional service.
                </p>
                <button className="text-emerald-500 font-bold hover:underline">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hotels;
