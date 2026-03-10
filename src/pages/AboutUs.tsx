import React from 'react';
import { motion } from 'motion/react';
import { Building2, History, Target, Users } from 'lucide-react';

const AboutUs = ({ isDark }: { isDark: boolean }) => {
  return (
    <div className={`pt-32 pb-20 ${isDark ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 text-emerald-500 mb-6">
            <Building2 className="w-8 h-8" />
            <span className="font-bold tracking-widest uppercase text-sm">Our Story</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">About Sreebhadra Group</h1>
          <p className={`text-xl md:text-2xl leading-relaxed mb-12 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            A legacy of excellence spanning over 25 years, built on the foundation of trust, quality, and community service.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 mt-20">
          {[
            { icon: History, title: 'Our Heritage', desc: 'Founded in 1999, we have grown from a small construction firm to a multi-business conglomerate.' },
            { icon: Target, title: 'Our Mission', desc: 'To provide world-class services and products that enhance the quality of life for our customers.' },
            { icon: Users, title: 'Our Values', desc: 'Integrity, innovation, and a commitment to social responsibility are at the core of everything we do.' }
          ].map((item) => (
            <div key={item.title} className={`p-10 rounded-3xl ${isDark ? 'bg-zinc-800' : 'bg-zinc-50'} shadow-lg`}>
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-8">
                <item.icon className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className={`leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
