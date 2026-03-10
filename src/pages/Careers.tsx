import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, ArrowRight } from 'lucide-react';

const Careers = ({ isDark }: { isDark: boolean }) => {
  return (
    <div className={`pt-32 pb-20 ${isDark ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 text-emerald-500 mb-6">
            <Briefcase className="w-8 h-8" />
            <span className="font-bold tracking-widest uppercase text-sm">Join Our Team</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Careers</h1>
          <p className={`text-xl md:text-2xl leading-relaxed mb-12 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Be a part of a dynamic team that is shaping the future of Kerala. We value talent, innovation, and passion.
          </p>
        </motion.div>

        <div className="mt-20 space-y-6">
          {[
            { title: 'Project Manager', dept: 'Construction', type: 'Full-time' },
            { title: 'Hotel Manager', dept: 'Hospitality', type: 'Full-time' },
            { title: 'Quality Analyst', dept: 'Food Products', type: 'Full-time' },
            { title: 'Sales Executive', dept: 'Real Estate', type: 'Full-time' }
          ].map((job) => (
            <div key={job.title} className={`p-8 rounded-3xl ${isDark ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-50 hover:bg-zinc-100'} transition-all cursor-pointer flex justify-between items-center group`}>
              <div>
                <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
                <div className="flex gap-4 text-sm font-medium">
                  <span className="text-emerald-500">{job.dept}</span>
                  <span className={isDark ? 'text-zinc-500' : 'text-zinc-400'}>{job.type}</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowRight className="w-6 h-6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Careers;
