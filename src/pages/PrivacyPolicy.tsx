import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';

const PrivacyPolicy = ({ isDark }: { isDark: boolean }) => {
  return (
    <div className={`pt-32 pb-20 ${isDark ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'}`}>
      <div className="max-w-4xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 text-emerald-500 mb-6">
            <ShieldCheck className="w-8 h-8" />
            <span className="font-bold tracking-widest uppercase text-sm">Legal</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Privacy Policy</h1>
          <p className={`text-xl leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Your privacy is important to us. Here's how we protect your information.
          </p>
        </motion.div>

        <div className="space-y-12">
          {[
            { title: 'Information Collection', content: 'We collect personal information that you provide to us, such as your name, email address, and phone number.' },
            { title: 'Use of Information', content: 'The information we collect is used to provide, maintain, and improve our services, and to communicate with you.' },
            { title: 'Data Protection', content: 'We implement a variety of security measures to maintain the safety of your personal information.' },
            { title: 'Third-Party Disclosure', content: 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent.' }
          ].map((section) => (
            <div key={section.title}>
              <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
              <p className={`leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
