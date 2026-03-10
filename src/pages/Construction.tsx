import React from 'react';
import { motion } from 'motion/react';
import { Building2, ArrowRight } from 'lucide-react';

const Construction = ({ isDark }: { isDark: boolean }) => {
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
            <span className="font-bold tracking-widest uppercase text-sm">Our Expertise</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Construction & Infrastructure</h1>
          <p className={`text-xl md:text-2xl leading-relaxed mb-12 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Building the future of Kerala with integrity, innovation, and excellence. From residential complexes to commercial landmarks.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mt-20">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://t4.ftcdn.net/jpg/00/68/63/23/360_F_68632352_kmHLwFc2rQLmnKqn6gM0bhOPqxRTx8sY.jpg" 
              alt="Construction site" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6">Quality You Can Trust</h2>
            <p className={`text-lg mb-8 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              With over 25 years of experience, Sreebhadra Constructions has been at the forefront of Kerala's infrastructure development. We combine traditional craftsmanship with modern engineering.
            </p>
            <ul className="space-y-4 mb-10">
              {['Residential Projects', 'Commercial Complexes', 'Industrial Buildings', 'Interior Design'].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <button className="bg-emerald-500 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 w-fit hover:bg-emerald-600 transition-colors">
              View Portfolio <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Construction;
