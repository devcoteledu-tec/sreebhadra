/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Construction from './pages/Construction';
import Hotels from './pages/Hotels';
import FoodProducts from './pages/FoodProducts';
import Auditorium from './pages/Auditorium';
import Rooms from './pages/Rooms';
import CommunityPage from './pages/Community';
import AboutUs from './pages/AboutUs';
import Careers from './pages/Careers';
import ContactUs from './pages/ContactUs';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  ChevronRight, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Building2, 
  Hotel, 
  Utensils, 
  Users, 
  Briefcase, 
  Phone,
  ArrowRight,
  MapPin,
  Mail,
  Clock,
  Truck,
  RefreshCcw,
  Maximize2,
  ExternalLink,
  Globe,
  Search,
  ChevronDown,
  Pause,
  Play,
  ChevronUp
} from 'lucide-react';

// --- Types ---
interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

// --- Constants ---
const NAV_ITEMS: NavItem[] = [
  { 
    label: 'Business', 
    href: '#',
    children: [
      { label: 'Construction', href: '/construction' },
      { label: 'Hotels', href: '/hotels' },
      { label: 'Food Products', href: '/food-products' },
      { label: 'Auditorium', href: '/auditorium' },
      { label: 'Rooms', href: '/rooms' },
    ]
  },
  { label: 'Community', href: '/community' },
  { label: 'About Us', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact Us', href: '/contact' },
];

const HERO_SLIDES = [
  {
    title: "Mastering Construction",
    subtitle: "Building the future of Kerala with integrity and innovation.",
    image: "https://t4.ftcdn.net/jpg/00/68/63/23/360_F_68632352_kmHLwFc2rQLmnKqn6gM0bhOPqxRTx8sY.jpg",
    link: "https://www.sreebhadraconstructions.in",
    buttonText: "Explore Construction"
  },
  {
    title: "Luxury Redefined",
    subtitle: "Experience unparalleled comfort in our premium hotel rooms.",
    image: "https://w0.peakpx.com/wallpaper/238/411/HD-wallpaper-modern-design-hallway-red-room-modern-apartment-interior-idea.jpg",
    link: "https://sreebhadrarooms.com",
    buttonText: "Book Your Stay"
  },
  {
    title: "Taste of Tradition",
    subtitle: "Quality food products that bring families together.",
    image: "https://media.istockphoto.com/id/1227210244/photo/flat-lay-view-at-kitchen-table-full-with-non-perishable-foods-spase-for-text.jpg?s=612x612&w=0&k=20&c=yoKYTbSTaHdBtRjgOUsDYBSB_0B10QxrR6lKH_36Hps=",
    link: "https://royaltastefoodproducts.com",
    buttonText: "Shop Products"
  }
];

const PRODUCT_ITEMS = [
  {
    id: 1,
    image: "https://m.media-amazon.com/images/I/71hS5RlM-3L.jpg",
    title: " sreebhadra homes and interiors",
    date: "9 February, 2026",
    link: "#"
  },
  {
    id: 2,
    image: "https://media.istockphoto.com/id/157636586/photo/variety-of-packaged-and-basic-foods-against-blue.jpg?s=612x612&w=0&k=20&c=OhxPv_xFtwrS7W79i_VBQtUZ_TB-vemqXT6acGlZPew=",
    title: "sreebhadra organic foods",
    date: "28 January, 2026",
    link: "#"
  },
  {
    id: 3,
    image: "https://img.freepik.com/free-photo/armchair-green-living-room-with-copy-space_43614-910.jpg?semt=ais_rp_50_assets&w=740&q=80",
    title: "Behind the Science of Everything",
    date: "9 September, 2025",
    link: "#"
  },
  {
    id: 4,
    image: "https://img.freepik.com/free-photo/top-view-canned-food-donation-with-copy-space_23-2148733826.jpg?semt=ais_hybrid&w=740&q=80",
    title: "From Blueprint to Build",
    date: "9 September, 2025",
    link: "#"
  },
  {
    id: 5,
    image: "https://ccemagazine.com/wp-content/uploads/sites/11/2025/04/types-of-building-construction-types.png",
    title: "From Past to Present",
    date: "9 September, 2025",
    link: "#"
  }
];

const HERITAGE_CAROUSEL_DATA = [
  {
    image: "https://media.schaefferhomes.com/372/2024/8/31/Full-007.jpg?width=1920&height=1280&fit=bounds&ois=a72dcae",
    title: "Sreebhadra construction,  suresh",
    subtitle: "Driving inovation in sreebhadra constraction",
    instagram: "https://www.instagram.com/sreebhadra_constructions/"
  },
  {
    image: "https://5.imimg.com/data5/KM/GQ/GLADMIN-55370520/food-products-express-500x500.jpg",
    title: "sreebhadra super market thiruvazhiyode",
    subtitle: "Driving innovation in Kerala's infrastructure",
    instagram: "https://www.instagram.com/royaltastefoodproducts/"
  },
  {
    image: "https://w0.peakpx.com/wallpaper/460/608/HD-wallpaper-hotel-room-hotel-beautiful-art-house-romantic-black-yellow-luxury-rooms-bedrooms-decor-nice-beige-style.jpg",
    title: "sreebhadra hotel rooms, palakkad",
    subtitle: "Redefining luxury rooms across palakkad",
    instagram: "https://www.instagram.com/sreebhadra_rooms/"
  },
  {
    image: "https://www.viralspices.com/wp-content/uploads/2019/03/Organic-Products-Manufacturers-in-India-1.jpg",
    title: "sreebhadra super market thiruvazhiyode",
    subtitle: "royal taste food products",
    instagram: "https://www.instagram.com/royaltastefoodproducts/"
 }
];

// --- Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Header = ({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? (isDark ? 'bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800' : 'bg-white/95 backdrop-blur-md border-b border-zinc-200') 
        : 'bg-transparent border-b border-transparent'
    } ${isScrolled ? (isDark ? 'text-white' : 'text-zinc-900') : 'text-white'}`}>
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img 
            src="https://static.wixstatic.com/media/6eb229_7576f5a1b3244797bfc62cb8c75e2417~mv2.png/v1/fill/w_500,h_500,al_c/6eb229_7576f5a1b3244797bfc62cb8c75e2417~mv2.png" 
            alt="Sreebhadra Logo" 
            className="h-12 w-12 rounded-full object-cover border-2 border-emerald-500"
            referrerPolicy="no-referrer"
          />
          <span className="text-xl font-bold tracking-tight">SREEBHADRA</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <div 
              key={item.label} 
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link 
                to={item.href} 
                className="text-sm font-medium hover:text-emerald-500 transition-colors flex items-center gap-1"
              >
                {item.label}
                {item.children && <ChevronRight className="w-4 h-4 rotate-90" />}
              </Link>
              
              {item.children && activeDropdown === item.label && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`absolute top-full left-0 mt-2 w-48 rounded-xl shadow-xl border ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-zinc-100'} overflow-hidden`}
                >
                  {item.children.map((child) => (
                    <Link 
                      key={child.label} 
                      to={child.href}
                      className={`block px-4 py-3 text-sm hover:bg-emerald-500 hover:text-white transition-colors ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <div className={`hidden lg:flex items-center gap-6 ${isScrolled ? (isDark ? 'text-zinc-400' : 'text-zinc-600') : 'text-white'}`}>
            <button className="hover:text-emerald-500 transition-colors cursor-pointer"><Globe className="w-5 h-5" /></button>
            <button className="hover:text-emerald-500 transition-colors cursor-pointer"><Mail className="w-5 h-5" /></button>
            <button className="hover:text-emerald-500 transition-colors cursor-pointer"><Search className="w-5 h-5" /></button>
          </div>

          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${
              isScrolled 
                ? (isDark ? 'hover:bg-zinc-800 text-yellow-400' : 'hover:bg-zinc-100 text-zinc-600') 
                : 'hover:bg-white/10 text-white'
            }`}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <button 
            className={`md:hidden p-2 rounded-full transition-colors ${
              isScrolled ? '' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}
          >
            <div className="p-4 flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  <Link to={item.href} className="text-lg font-medium block py-2" onClick={() => setIsMenuOpen(false)}>{item.label}</Link>
                  {item.children && (
                    <div className="pl-4 border-l border-emerald-500/30 flex flex-col gap-2 mt-2">
                      {item.children.map((child) => (
                        <Link key={child.label} to={child.href} className="text-sm opacity-70 block py-1" onClick={() => setIsMenuOpen(false)}>{child.label}</Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = ({ isDark }: { isDark: boolean }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Dot Matrix Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-30" 
           style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '4px 4px' }} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src={HERO_SLIDES[currentSlide].image} 
            alt={HERO_SLIDES[currentSlide].title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          
          <div className="absolute inset-0 z-20 flex items-center px-8 md:px-24">
            <div className="max-w-3xl">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block bg-[#003366] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-6"
              >
                Tribute
              </motion.div>
              
              <motion.h1 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tight"
              >
                {HERO_SLIDES[currentSlide].title}
              </motion.h1>
              
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="border-l-2 border-[#f2a900] pl-8 mb-12 max-w-xl"
              >
                <p className="text-lg md:text-xl text-white font-medium leading-relaxed">
                  {HERO_SLIDES[currentSlide].subtitle}
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <a 
                  href={HERO_SLIDES[currentSlide].link}
                  className="inline-flex items-center gap-4 bg-[#f2a900] hover:bg-[#d99800] text-white px-10 py-4 font-bold transition-all group"
                >
                  {HERO_SLIDES[currentSlide].buttonText}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Hero Controls */}
      <div className="absolute bottom-12 left-8 md:left-24 z-30 flex flex-col gap-6">
        <div className="flex items-center gap-4 text-white font-bold text-xl">
          <span>{currentSlide + 1}</span>
          <span className="opacity-40">/</span>
          <span className="opacity-40">{HERO_SLIDES.length}</span>
        </div>
        
        <div className="w-64 h-0.5 bg-white/20 relative overflow-hidden">
          <motion.div 
            key={currentSlide}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 6, ease: "linear" }}
            className="absolute top-0 left-0 h-full bg-white"
          />
        </div>

        <div className="flex items-center gap-8 text-white/60 text-sm font-bold uppercase tracking-widest">
          <button 
            onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            className="hover:text-white transition-colors flex items-center gap-2"
          >
            <ChevronRight className="w-4 h-4 rotate-180" /> Prev
          </button>
          
          <button 
            onClick={() => setIsPaused(!isPaused)}
            className="hover:text-white transition-colors"
          >
            {isPaused ? <Play className="w-5 h-5 fill-current" /> : <Pause className="w-5 h-5 fill-current" />}
          </button>

          <button 
            onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
            className="hover:text-white transition-colors flex items-center gap-2"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 right-8 md:right-24 z-30 flex flex-col items-center gap-2 text-white/40">
        <ChevronDown className="w-6 h-6 animate-bounce" />
        <ChevronDown className="w-6 h-6 -mt-4 opacity-50" />
      </div>
    </section>
  );
};

const NEWS_DATA = [
  {
    image: "https://freightwaves.b-cdn.net/wp-content/uploads/2020/01/shutterstock_785350690.jpg?width=1000&height=668",
    title: "Sreebhadra Group Unveils 'Green Meadows' - A Sustainable Living Initiative in Kochi",
    subtitle: "Kerala's first carbon-neutral residential project set to redefine luxury living."
  },
  {
    image: "https://w0.peakpx.com/wallpaper/238/411/HD-wallpaper-modern-design-hallway-red-room-modern-apartment-interior-idea.jpg",
    title: "Sreebhadra Grand Munnar: A New Landmark in Luxury Hospitality Opens Its Doors",
    subtitle: "Experience the misty hills with world-class amenities and traditional Kerala hospitality."
  },
  {
    image: "https://media.istockphoto.com/id/1227210244/photo/flat-lay-view-at-kitchen-table-full-with-non-perishable-foods-spase-for-text.jpg?s=612x612&w=0&k=20&c=yoKYTbSTaHdBtRjgOUsDYBSB_0B10QxrR6lKH_36Hps=",
    title: "Royal Taste Food Products Receives Prestigious 'Export Excellence' Award 2025",
    subtitle: "Recognized for maintaining international quality standards in traditional spice blends."
  }
];

const FACTS_DATA = [
  "Sreebhadra was the first private developer in Kerala to implement fully automated pre-cast construction technology in 2018.",
  "Our hospitality division manages over 500 premium rooms across Kerala's most scenic locations.",
  "Royal Taste Food Products exports to over 12 countries, bringing Kerala's authentic flavors to the global stage.",
  "We have successfully completed 500+ residential and commercial projects, maintaining a 100% on-time delivery record.",
  "Sreebhadra Group provides direct employment to over 100+ professionals and supports 500+ families through indirect opportunities."
];

const SocialSection = ({ isDark }: { isDark: boolean }) => {
  const [currentNews, setCurrentNews] = useState(0);
  const [currentFact, setCurrentFact] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshFact = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setCurrentFact((prev) => (prev + 1) % FACTS_DATA.length);
      setIsRefreshing(false);
    }, 300);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % NEWS_DATA.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      className="py-40 relative overflow-hidden"
      style={{ 
        backgroundImage: `url("https://images.pexels.com/photos/1029618/pexels-photo-1029618.jpeg?cs=srgb&dl=pexels-scottwebb-1029618.jpg&fm=jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* News Block */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 rounded-xl overflow-hidden shadow-xl relative min-h-[400px]">
            <div className="absolute -top-4 left-4 z-20 bg-zinc-900 text-white px-6 py-2 font-bold text-sm tracking-tight shadow-lg">
              In the News
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentNews}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="contents"
              >
                <div className="relative h-64 sm:h-auto">
                  <div className="absolute inset-0 bg-black/20 z-10" />
                  <img 
                    src={NEWS_DATA[currentNews].image} 
                    alt="News" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-6 left-6 z-20 flex gap-2">
                    {NEWS_DATA.map((_, idx) => (
                      <div 
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all ${currentNews === idx ? 'bg-white w-6' : 'bg-white/50'}`} 
                      />
                    ))}
                  </div>
                </div>
                <div className="bg-zinc-800 p-10 flex flex-col justify-center text-white">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500 mb-6">Press Release</span>
                  <motion.h3 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-2xl font-bold mb-6 leading-tight"
                  >
                    {NEWS_DATA[currentNews].title}
                  </motion.h3>
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="border-l-2 border-emerald-500 pl-6 mb-8"
                  >
                    <p className="text-sm text-zinc-400 italic">
                      {NEWS_DATA[currentNews].subtitle}
                    </p>
                  </motion.div>
                  <div className="flex justify-end">
                    <ArrowRight className="w-6 h-6 text-zinc-500 hover:text-emerald-500 cursor-pointer transition-colors" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Facts Block */}
          <div className="bg-[#1a73e8] p-10 rounded-xl shadow-xl text-white flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70 mb-8">Facts</span>
            <h3 className="text-3xl font-bold mb-8">Did you know</h3>
            <div className="border-l-2 border-white/30 pl-6 mb-auto min-h-[120px]">
              <AnimatePresence mode="wait">
                <motion.p 
                  key={currentFact}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="text-lg leading-relaxed opacity-90"
                >
                  {FACTS_DATA[currentFact]}
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="flex justify-end mt-8">
              <motion.button
                onClick={handleRefreshFact}
                animate={{ rotate: isRefreshing ? 360 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <RefreshCcw className="w-6 h-6 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
              </motion.button>
            </div>
          </div>

          {/* Facebook Block */}
          <div className="bg-[#3b5998]/10 border border-[#3b5998]/20 p-10 rounded-xl shadow-xl flex flex-col relative overflow-hidden group">
            <div className="absolute top-8 left-8">
              <Facebook className="w-8 h-8 text-[#3b5998]" />
            </div>
            <div className="absolute top-8 right-8">
              <img 
                src="https://png.pngtree.com/templates/sm/20180625/sm_5b30cc3695be0.jpg" 
                alt="Logo" 
                className="h-8 w-8 rounded-full grayscale opacity-50"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-24 mb-auto">
              <p className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                #SreebhadraExcellence #IWD2026
              </p>
              <p className="text-xs text-zinc-500">a day ago</p>
            </div>
            <div className="mt-8">
              <h4 className={`text-3xl font-serif opacity-20 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                Equal Opportunity<br />An ideal
              </h4>
            </div>
            <div className="absolute bottom-8 right-8">
              <Maximize2 className="w-5 h-5 text-zinc-400 group-hover:text-emerald-500 transition-colors cursor-pointer" />
            </div>
          </div>

          {/* Instagram Block */}
          <div className="md:col-span-2 bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] p-10 rounded-xl shadow-xl text-white flex flex-col relative overflow-hidden group">
            <div className="absolute top-8 left-8">
              <Instagram className="w-8 h-8" />
            </div>
            <div className="absolute top-8 right-8">
              <img 
                src="https://png.pngtree.com/templates/sm/20180625/sm_5b30cc3695be0.jpg" 
                alt="Logo" 
                className="h-8 w-8 rounded-full brightness-0 invert opacity-50"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-24 mb-auto">
              <p className="text-lg font-medium mb-2">
                #InternationalWomensDay #IWD2026
              </p>
              <p className="text-xs opacity-70">a day ago</p>
            </div>
            <div className="mt-8">
              <h4 className="text-4xl font-serif opacity-30 text-right">
                Equal Opportunity<br />An ideal
              </h4>
            </div>
            <div className="absolute bottom-8 right-8">
              <Maximize2 className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity cursor-pointer" />
            </div>
            {/* Subtle background text */}
            <div className="absolute bottom-20 right-20 opacity-10 pointer-events-none">
              <p className="text-sm font-bold tracking-widest uppercase">#InternationalWomensDay</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const AboutSection = ({ isDark }: { isDark: boolean }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERITAGE_CAROUSEL_DATA.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERITAGE_CAROUSEL_DATA.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERITAGE_CAROUSEL_DATA.length) % HERITAGE_CAROUSEL_DATA.length);

  return (
    <section 
      id="about" 
      className="relative py-40 overflow-hidden bg-zinc-950 min-h-[80vh] flex items-center"
      style={{ 
        backgroundImage: `url("https://media.designcafe.com/wp-content/uploads/2021/02/12192859/red-walls-in-living-room.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Premium Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 z-0" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h2 className="text-7xl md:text-8xl font-bold mb-10 tracking-tight leading-[0.9]">
              We Live for a <br />
              <span className="text-white">Challenge</span>
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed font-light text-white/80 max-w-xl">
              At Sreebhadra, we partner with our customers to bring their ambitions to life, delivering projects that make a lasting, meaningful difference for people and communities around the world.
            </p>
          </motion.div>

          {/* Right Content: Carousel Card */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Navigation Arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-[-40px] top-1/2 -translate-y-1/2 z-20 p-2 text-white/50 hover:text-white transition-colors hidden md:block"
            >
              <ChevronRight className="w-10 h-10 rotate-180" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-[-40px] top-1/2 -translate-y-1/2 z-20 p-2 text-white/50 hover:text-white transition-colors hidden md:block"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-[450px] relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col"
                >
                  <div className="aspect-[4/3] rounded-lg overflow-hidden mb-6">
                    <img 
                      src={HERITAGE_CAROUSEL_DATA[currentSlide].image} 
                      alt={HERITAGE_CAROUSEL_DATA[currentSlide].title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="px-2">
                    <h3 className="text-xl font-bold text-zinc-900 mb-2 leading-tight">
                      {HERITAGE_CAROUSEL_DATA[currentSlide].title}
                    </h3>
                    <p className="text-zinc-600 text-sm mb-4">
                      {HERITAGE_CAROUSEL_DATA[currentSlide].subtitle}
                    </p>
                    <a 
                      href={HERITAGE_CAROUSEL_DATA[currentSlide].instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors mb-8"
                    >
                      <Instagram className="w-4 h-4" />
                      View Profile
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between items-center px-2">
                <div className="flex gap-2">
                  {HERITAGE_CAROUSEL_DATA.map((_, idx) => (
                    <div 
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-8 bg-red-500' : 'w-2 bg-zinc-200'}`}
                    />
                  ))}
                </div>
                <button className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all group">
                  <ArrowRight className="w-6 h-6 transform -rotate-45 group-hover:rotate-0 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

const Counter = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(percentage * end));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <>{count}</>;
};

const CareersSection = ({ isDark }: { isDark: boolean }) => {
  return (
    <section id="careers" className="relative py-24 overflow-hidden">
      {/* Background Pattern - Fully Visible */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ 
          backgroundImage: 'url("https://img.freepik.com/free-vector/hand-drawn-turtle-shell-pattern_23-2150598661.jpg")',
          backgroundSize: '400px',
          backgroundRepeat: 'repeat'
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Left Block: Beware of Scams */}
          <div className="md:row-span-2 flex flex-col rounded-xl overflow-hidden shadow-xl">
            <div className="relative h-80">
              <div className="absolute top-0 left-0 z-20 bg-zinc-900 text-white px-6 py-2 font-bold text-sm tracking-tight shadow-lg">
                Careers
              </div>
              <img 
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop" 
                alt="Careers" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-zinc-800 to-transparent" />
            </div>
            <div className="bg-zinc-800 p-10 flex-grow text-white flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500 mb-8">Careers</span>
              <h3 className="text-2xl font-bold mb-8">Beware of Job Scams</h3>
              <div className="border-l-2 border-emerald-500 pl-6 mb-auto">
                <p className="text-sm text-zinc-400 leading-relaxed">
                  We do not charge/accept any amount or security deposit from job seekers. Read disclaimer.
                </p>
              </div>
              <div className="flex justify-end mt-8">
                <ArrowRight className="w-6 h-6 text-zinc-500 hover:text-emerald-500 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>

          {/* Top Right Block: Early Career */}
          <div className="md:col-span-2 bg-gradient-to-br from-[#003366] via-[#006666] to-[#003333] rounded-xl shadow-xl p-10 relative overflow-hidden flex flex-col justify-center min-h-[350px]">
            <div className="absolute top-8 left-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white opacity-70">
              Sreebhadra
            </div>
            
            <div className="relative z-10 max-w-md">
              <div className="bg-[#002244]/80 p-8 rounded-lg border border-white/10 backdrop-blur-sm">
                <h3 className="text-3xl font-bold text-white mb-6 leading-tight">
                  Early Career Sreebhadra Employee?
                </h3>
                <div className="border-l-2 border-white/30 pl-6">
                  <p className="text-white italic text-sm mb-2">Make #TheBestMoveForward.</p>
                  <p className="text-white/70 text-sm">Registrations for 2026 are closed.</p>
                </div>
              </div>
            </div>

            {/* Mountain Illustration */}
            <div className="absolute bottom-0 right-0 w-full h-full pointer-events-none opacity-40">
              <svg viewBox="0 0 800 400" className="absolute bottom-0 right-0 w-3/4 h-3/4">
                <path d="M400 400 L600 100 L800 400 Z" fill="#004488" />
                <path d="M200 400 L450 150 L700 400 Z" fill="#0055aa" />
                <circle cx="600" cy="100" r="4" fill="#ff00ff" />
                <path d="M600 100 L600 80 L615 90 L600 100" fill="#ff00ff" />
                <path d="M450 150 Q500 200 600 100" stroke="#ff00ff" strokeWidth="2" strokeDasharray="5,5" fill="none" />
              </svg>
            </div>
            
            <div className="absolute bottom-8 right-8 z-10">
              <ArrowRight className="w-6 h-6 text-white/50 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Bottom Middle: In Numbers */}
          <div className="bg-zinc-800 p-10 rounded-xl shadow-xl text-white flex flex-col justify-center items-center text-center group">
            <div className="w-full text-left mb-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500">In Numbers</span>
            </div>
            <Users className="w-12 h-12 text-emerald-500 mb-6 opacity-50 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-4xl font-bold mb-2">
              <Counter end={100} />+
            </h3>
            <p className="text-zinc-400 text-sm font-medium">Employees at the Sreebhadra group</p>
            <div className="w-full flex justify-end mt-8">
              <ArrowRight className="w-6 h-6 text-zinc-500 hover:text-emerald-500 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Bottom Right: Featured Jobs */}
          <div className="bg-[#1a365d] p-10 rounded-xl shadow-xl text-white flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70 mb-8">Careers</span>
            <h3 className="text-2xl font-bold mb-10">Featured Jobs</h3>
            
            <div className="flex flex-col gap-8 mb-auto">
              <div className="border-l-2 border-emerald-500 pl-6">
                <h4 className="font-bold text-lg">Project Engineer</h4>
                <p className="text-xs opacity-60 italic">Sreebhadra Constructions, Kochi</p>
              </div>
              <div className="border-l-2 border-white/20 pl-6">
                <h4 className="font-bold text-lg">Operations Manager</h4>
                <p className="text-xs opacity-60 italic">Hospitality Division, Munnar</p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-12">
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-white" />
                <div className="w-2 h-2 rounded-full bg-white/30" />
                <div className="w-2 h-2 rounded-full bg-white/30" />
              </div>
              <ArrowRight className="w-6 h-6 opacity-50 hover:opacity-100 cursor-pointer transition-opacity" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const FoundersSection = ({ isDark }: { isDark: boolean }) => {
  return (
    <section className={`relative overflow-hidden ${isDark ? 'bg-zinc-950' : 'bg-white'}`}>
      <div className="flex flex-col md:flex-row min-h-[600px]">
        {/* Left: Profile Image with Blue Background */}
        <div className="md:w-1/2 relative bg-[#003366] flex items-end justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-20" 
               style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <img 
            src="https://media.istockphoto.com/id/1005817658/photo/middle-aged-man-with-pleasant-face-expression.jpg?s=612x612&w=0&k=20&c=3YTdAT-m9io-zEF2aOmJsRz7tKVHlHSHvDFSILp6FAY=" 
            alt="Gopakumar - Founder" 
            className="relative z-10 w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Right: Quote Content */}
        <div className="md:w-1/2 flex flex-col justify-center p-12 md:p-24 bg-white">
          <div className="max-w-xl relative">
            <span className="text-6xl font-serif text-zinc-200 absolute -top-10 -left-6">"</span>
            <p className="text-xl md:text-2xl leading-relaxed text-zinc-800 font-medium mb-12 relative z-10">
              Build systems that empower, not exploit. Scale with <span className="text-green-600">kindness</span>, compete with honor, and remember that a business's <span className="font-bold text-blue-600">true value</span> is measured by the <span className="text-red-600">trust</span> it keeps, not just the profit it yields.
              <span className="text-6xl font-serif text-zinc-200 absolute -bottom-16 right-0">"</span>
            </p>

            {/* Adani-style Speech Bubble Line */}
            <div className="relative mt-16 mb-12">
              <svg width="100%" height="60" viewBox="0 0 400 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
                <path d="M0 2H100L115 30L130 2H350V-100" stroke="#18181b" strokeWidth="3" fill="none" />
              </svg>
            </div>

            <div className="mt-4">
              <h4 className="text-2xl font-bold text-zinc-900">Gopakumar</h4>
              <p className="text-zinc-500 font-medium uppercase tracking-widest text-xs mt-1">Founder, Sreebhadra Group</p>
            </div>

            <button className="mt-10 px-8 py-3 border border-zinc-300 rounded-lg text-zinc-700 font-bold hover:bg-zinc-50 transition-colors">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductsDisplay = ({ isDark }: { isDark: boolean }) => {
  const [flippedId, setFlippedId] = useState<number | null>(null);

  return (
    <section className={`py-24 overflow-hidden ${isDark ? 'bg-zinc-900' : 'bg-white'}`}>
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-16 gap-4">
          <h2 className={`text-3xl md:text-5xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>Our Diverse Portfolio</h2>
          <div className="flex items-center gap-2 text-red-600 font-bold text-sm cursor-pointer group">
            View All <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        {/* Mobile Scrollable / Desktop Grid */}
        <div className="flex lg:grid lg:grid-cols-4 xl:grid-cols-5 gap-0 overflow-x-auto pb-8 lg:pb-0 no-scrollbar snap-x snap-mandatory">
          {PRODUCT_ITEMS.map((item) => (
            <div
              key={item.id}
              className="min-w-[300px] sm:min-w-[350px] lg:min-w-0 snap-center perspective-1000 group aspect-[2/3] cursor-pointer"
              onClick={() => setFlippedId(flippedId === item.id ? null : item.id)}
            >
              <motion.div 
                className={`relative w-full h-full transition-all duration-700 preserve-3d ${flippedId === item.id ? 'rotate-x-180' : 'group-hover:rotate-x-180'}`}
              >
                {/* Front Side */}
                <div className="absolute inset-0 backface-hidden overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <p className="text-white/60 text-[10px] font-bold mb-2 uppercase tracking-widest">{item.date}</p>
                    <h3 className="text-white text-xl font-bold mb-6 leading-tight">{item.title}</h3>
                    <div className="flex items-center gap-2 text-white/80 font-bold text-xs uppercase tracking-wider">
                      Tap to flip
                      <RefreshCcw className="w-3 h-3" />
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 backface-hidden rotate-x-180 overflow-hidden bg-emerald-600 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-6">
                    <Play className="w-8 h-8 text-white fill-current" />
                  </div>
                  <h4 className="text-white text-2xl font-bold mb-4">Explore More</h4>
                  <p className="text-white/90 text-sm mb-8 leading-relaxed">
                    Discover the detailed story behind this project and its impact on our community.
                  </p>
                  <button className="bg-white text-emerald-600 px-8 py-3 rounded-full font-bold text-sm hover:bg-zinc-100 transition-colors shadow-lg">
                    View Project
                  </button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CommunitySection = ({ isDark }: { isDark: boolean }) => {
  return (
    <section id="community" className={`pt-24 pb-0 ${isDark ? 'bg-zinc-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 mb-16">
        {/* Header Content */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          <div className="max-w-md">
            <h2 className="text-5xl md:text-7xl font-light text-red-600 mb-4">Community</h2>
            <p className={`text-sm uppercase tracking-[0.3em] font-bold ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Our purpose in action</p>
          </div>
          <div className="max-w-2xl">
            <p className={`text-xl md:text-2xl leading-relaxed mb-8 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
              At Sreebhadra Group, we believe that success goes beyond financial progress. It encompasses our shared responsibility to enable a sustainable way of life for all sections of the society.
            </p>
            <motion.div 
              whileHover={{ x: 10 }}
              className="flex items-center gap-3 text-red-600 font-bold text-lg cursor-pointer group"
            >
              Visit Community <ExternalLink className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Full Width Large Image with Overlay */}
      <div className="relative overflow-hidden aspect-[16/10] md:aspect-[21/9] lg:aspect-[25/10] group">
        <img 
          src="https://www.keralatourism.org/images/enchanting_kerala/large/nedumkayam_rainforest_unshackle_yourself_here20210910070921_1115_1.jpg" 
          alt="Community" 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent group-hover:from-black/70 transition-all duration-500" />
        
        <div className="absolute inset-0 flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              <h3 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">Engage. <br className="hidden md:block" />Uplift. Empower</h3>
              <p className="text-white/90 text-lg md:text-2xl mb-10 font-medium max-w-xl">Supporting 9,000 villages, Impacting 11 Million Lives through sustainable initiatives.</p>
              <button className="flex items-center gap-4 bg-white text-zinc-900 px-8 py-4 rounded-full font-bold text-sm hover:bg-red-600 hover:text-white transition-all duration-300 shadow-xl group/btn">
                Click to Know More 
                <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center group-hover/btn:bg-white/20 transition-colors">
                  <ChevronRight className="w-4 h-4 text-zinc-900 group-hover/btn:text-white" />
                </div>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ isDark }: { isDark: boolean }) => {
  return (
    <footer className={`pt-0 pb-20 ${isDark ? 'bg-zinc-950 text-zinc-400' : 'bg-zinc-900 text-zinc-400'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <img 
                src="https://png.pngtree.com/templates/sm/20180625/sm_5b30cc3695be0.jpg" 
                alt="Logo" 
                className="h-10 w-10 rounded-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
              <span className="text-white text-xl font-bold tracking-tight">SREEBHADRA</span>
            </div>
            <p className="text-sm leading-relaxed mb-8">
              Building dreams and serving communities across Kerala for over 25 years. Excellence is not just our goal; it's our tradition.
            </p>
            <div className="flex gap-4">
              <Facebook className="w-5 h-5 hover:text-white cursor-pointer" />
              <Instagram className="w-5 h-5 hover:text-white cursor-pointer" />
              <Twitter className="w-5 h-5 hover:text-white cursor-pointer" />
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li><Link to="/about" className="hover:text-white cursor-pointer">About Us</Link></li>
              <li><Link to="/construction" className="hover:text-white cursor-pointer">Our Businesses</Link></li>
              <li><Link to="/careers" className="hover:text-white cursor-pointer">Careers</Link></li>
              <li><Link to="/community" className="hover:text-white cursor-pointer">Community</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Businesses</h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li><Link to="/construction" className="hover:text-white cursor-pointer">Construction</Link></li>
              <li><Link to="/hotels" className="hover:text-white cursor-pointer">Hotels & Rooms</Link></li>
              <li><Link to="/food-products" className="hover:text-white cursor-pointer">Food Products</Link></li>
              <li><Link to="/auditorium" className="hover:text-white cursor-pointer">Auditoriums</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-emerald-500" />
                Sreebhadra Towers, Kerala, India
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-500" />
                +91 484 1234567
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-500" />
                info@sreebhadra.com
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 Sreebhadra Group. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/privacy-policy" className="hover:text-white cursor-pointer">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white cursor-pointer">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Landing Page ---
const LandingPage = ({ isDark }: { isDark: boolean }) => {
  return (
    <main>
      <Hero isDark={isDark} />
      <SocialSection isDark={isDark} />
      <AboutSection isDark={isDark} />
      <CareersSection isDark={isDark} />
      <FoundersSection isDark={isDark} />
      <ProductsDisplay isDark={isDark} />
      <CommunitySection isDark={isDark} />
    </main>
  );
};

// --- Main App ---

export default function App() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <Router>
      <ScrollToTop />
      <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-zinc-900' : 'bg-white'}`}>
        <Header isDark={isDark} toggleTheme={toggleTheme} />
        
        <Routes>
          <Route path="/" element={<LandingPage isDark={isDark} />} />
          <Route path="/construction" element={<Construction isDark={isDark} />} />
          <Route path="/hotels" element={<Hotels isDark={isDark} />} />
          <Route path="/food-products" element={<FoodProducts isDark={isDark} />} />
          <Route path="/auditorium" element={<Auditorium isDark={isDark} />} />
          <Route path="/rooms" element={<Rooms isDark={isDark} />} />
          <Route path="/community" element={<CommunityPage isDark={isDark} />} />
          <Route path="/about" element={<AboutUs isDark={isDark} />} />
          <Route path="/careers" element={<Careers isDark={isDark} />} />
          <Route path="/contact" element={<ContactUs isDark={isDark} />} />
          <Route path="/terms-of-service" element={<TermsOfService isDark={isDark} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy isDark={isDark} />} />
        </Routes>
        
        <Footer isDark={isDark} />
      </div>
    </Router>
  );
}
