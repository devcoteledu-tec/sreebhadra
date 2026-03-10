import React from 'react';
import { motion } from 'motion/react';
import { Maximize2, Bed, Wifi, Coffee } from 'lucide-react';

const Rooms = ({ isDark }: { isDark: boolean }) => {
  return (
    <div className={`pt-32 pb-20 ${isDark ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 text-emerald-500 mb-6">
            <Bed className="w-8 h-8" />
            <span className="font-bold tracking-widest uppercase text-sm">Accommodation</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Luxury Rooms</h1>
          <p className={`text-xl md:text-2xl leading-relaxed mb-12 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Unwind in our elegantly designed rooms, offering the perfect blend of comfort and style.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 mt-20">
          <div className="rounded-3xl overflow-hidden h-[600px] shadow-2xl">
            <img 
              src="https://w0.peakpx.com/wallpaper/238/411/HD-wallpaper-modern-design-hallway-red-room-modern-apartment-interior-idea.jpg" 
              alt="Room" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-8">Elegance in Every Detail</h2>
            <p className={`text-lg mb-10 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Our rooms are designed to provide a serene escape from the hustle and bustle. Each room is equipped with modern amenities to ensure a comfortable stay.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-12">
              {[
                { icon: Wifi, label: 'High-speed WiFi' },
                { icon: Coffee, label: 'Breakfast Included' },
                { icon: Maximize2, label: 'Spacious Interiors' },
                { icon: Bed, label: 'Premium Bedding' }
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isDark ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
                    <item.icon className="w-6 h-6 text-emerald-500" />
                  </div>
                  <span className="font-bold">{item.label}</span>
                </div>
              ))}
            </div>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-4 rounded-full font-bold transition-all w-fit">
              Book Your Stay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
