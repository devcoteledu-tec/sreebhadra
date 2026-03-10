import React from 'react';
import { motion } from 'motion/react';
import { Utensils, CheckCircle } from 'lucide-react';

const FoodProducts = ({ isDark }: { isDark: boolean }) => {
  return (
    <div className={`pt-32 pb-20 ${isDark ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 text-emerald-500 mb-6">
            <Utensils className="w-8 h-8" />
            <span className="font-bold tracking-widest uppercase text-sm">Royal Taste</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Food Products</h1>
          <p className={`text-xl md:text-2xl leading-relaxed mb-12 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Bringing the authentic taste of tradition to your kitchen with high-quality, organic food products.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 mt-20">
          <div>
            <img 
              src="https://media.istockphoto.com/id/1227210244/photo/flat-lay-view-at-kitchen-table-full-with-non-perishable-foods-spase-for-text.jpg?s=612x612&w=0&k=20&c=yoKYTbSTaHdBtRjgOUsDYBSB_0B10QxrR6lKH_36Hps=" 
              alt="Food Products" 
              className="rounded-3xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-8">Pure. Organic. Healthy.</h2>
            <div className="space-y-6">
              {[
                { title: 'Sourced Locally', desc: 'We work directly with farmers to ensure the freshest ingredients.' },
                { title: 'No Preservatives', desc: 'Our products are 100% natural with no artificial additives.' },
                { title: 'Quality Tested', desc: 'Every batch undergoes rigorous quality checks before reaching you.' }
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodProducts;
