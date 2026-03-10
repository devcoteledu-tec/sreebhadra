import React from 'react';
import { motion } from 'motion/react';
import { Globe, Heart } from 'lucide-react';

const Community = ({ isDark }: { isDark: boolean }) => {
  return (
    <div className={`pt-32 pb-20 ${isDark ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 text-emerald-500 mb-6">
            <Globe className="w-8 h-8" />
            <span className="font-bold tracking-widest uppercase text-sm">Our Impact</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Community First</h1>
          <p className={`text-xl md:text-2xl leading-relaxed mb-12 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            We believe that success goes beyond financial progress. It encompasses our shared responsibility to enable a sustainable way of life for all.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mt-20">
          <div className="rounded-3xl overflow-hidden h-[500px] shadow-2xl">
            <img 
              src="https://www.keralatourism.org/images/enchanting_kerala/large/nedumkayam_rainforest_unshackle_yourself_here20210910070921_1115_1.jpg" 
              alt="Community" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-4xl font-bold">Engage. Uplift. Empower</h2>
            </div>
            <p className={`text-lg mb-10 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Supporting 9,000 villages and impacting 11 million lives through sustainable initiatives. Our community programs focus on education, healthcare, and environmental conservation.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className={`p-8 rounded-3xl ${isDark ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
                <h4 className="text-3xl font-bold text-emerald-500 mb-2">9,000+</h4>
                <p className="font-medium">Villages Supported</p>
              </div>
              <div className={`p-8 rounded-3xl ${isDark ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
                <h4 className="text-3xl font-bold text-emerald-500 mb-2">11M+</h4>
                <p className="font-medium">Lives Impacted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
