import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactUs = ({ isDark }: { isDark: boolean }) => {
  return (
    <div className={`pt-32 pb-20 ${isDark ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Contact Us</h1>
          <p className={`text-xl md:text-2xl leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Have a question or want to start a project? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            {[
              { icon: Phone, title: 'Call Us', detail: '+91 484 1234567', sub: 'Mon-Sat, 9am-6pm' },
              { icon: Mail, title: 'Email Us', detail: 'info@sreebhadra.com', sub: 'We reply within 24 hours' },
              { icon: MapPin, title: 'Visit Us', detail: 'Sreebhadra Towers, Kerala, India', sub: 'Headquarters' }
            ].map((item) => (
              <div key={item.title} className="flex gap-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-8 h-8 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-emerald-500 mb-1">{item.title}</h4>
                  <p className="text-2xl font-bold mb-1">{item.detail}</p>
                  <p className={isDark ? 'text-zinc-500' : 'text-zinc-400'}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={`p-10 rounded-[3rem] ${isDark ? 'bg-zinc-800' : 'bg-zinc-50'}`}>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold">Full Name</label>
                  <input type="text" className={`w-full p-4 rounded-2xl border ${isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-zinc-200'} focus:ring-2 focus:ring-emerald-500 outline-none`} placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Email Address</label>
                  <input type="email" className={`w-full p-4 rounded-2xl border ${isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-zinc-200'} focus:ring-2 focus:ring-emerald-500 outline-none`} placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Subject</label>
                <input type="text" className={`w-full p-4 rounded-2xl border ${isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-zinc-200'} focus:ring-2 focus:ring-emerald-500 outline-none`} placeholder="How can we help?" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Message</label>
                <textarea rows={4} className={`w-full p-4 rounded-2xl border ${isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-zinc-200'} focus:ring-2 focus:ring-emerald-500 outline-none`} placeholder="Tell us more about your inquiry..."></textarea>
              </div>
              <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all">
                Send Message <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
