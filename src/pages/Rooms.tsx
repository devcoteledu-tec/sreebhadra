import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  Star, MapPin, Wifi, Wind, Zap, ParkingCircle, Utensils,
  DoorOpen, ChevronLeft, ChevronRight, CheckCircle2, Users,
  Shield, Coffee, Bed, ArrowRight, Sparkles, X, Check,
  Clock, Award, ThumbsUp, Quote, Loader, Phone,
  Camera, BadgeCheck, CalendarDays, Flame
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   CONFIG
═══════════════════════════════════════════════════════════ */
const EMAILJS_SERVICE_ID  = 'service_sreebhadra';
const EMAILJS_TEMPLATE_ID = 'template_booking';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
const OWNER_EMAIL         = 'epicdiscovery2020@gmail.com';

/* ═══════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════ */
const LOCATIONS = [
  {
    id: 'pariyanampatta',
    name: 'Sreebhadra Pariyanampatta',
    shortName: 'Pariyanampatta',
    address: 'Near Pariyanampatta Temple, Palakkad',
    distance: '0.4 km',
    rating: 4.6, ratingLabel: 'Excellent', reviews: 2681,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop',
    ],
    description: 'A serene sanctuary woven into the spiritual fabric of Pariyanampatta. Wake up to temple bells, pristine greenery and the legendary warmth of Kerala hospitality.',
    price: 1678, originalPrice: 5888, discount: 68, taxes: 177,
    amenities: [
      { icon: ParkingCircle, label: 'Free Parking' },
      { icon: DoorOpen,      label: 'Private Entrance' },
      { icon: Utensils,      label: 'Dining Area' },
      { icon: Wifi,          label: 'Free WiFi' },
      { icon: Coffee,        label: 'Breakfast' },
    ],
    extra: 12,
    badge: 'MOST POPULAR',
    badgeColor: 'from-amber-500 to-orange-500',
    urgent: null,
    pill: '🛕 Temple View',
  },
  {
    id: 'sreekrishnapuram',
    name: 'Sreebhadra Sreekrishnapuram',
    shortName: 'Sreekrishnapuram',
    address: 'Sreekrishnapuram Junction, Palakkad',
    distance: '1.2 km',
    rating: 3.8, ratingLabel: 'Good', reviews: 299,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop',
    ],
    description: 'Modern luxury for the discerning traveller — positioned at the pulse of Sreekrishnapuram with swift access to dining, business hubs and cultural landmarks.',
    price: 885, originalPrice: 3639, discount: 72, taxes: 134,
    amenities: [
      { icon: Wifi,          label: 'Free WiFi' },
      { icon: Wind,          label: 'Geyser' },
      { icon: Zap,           label: 'Power Backup' },
      { icon: Bed,           label: 'Premium Beds' },
    ],
    extra: 2,
    badge: 'BEST VALUE',
    badgeColor: 'from-emerald-500 to-teal-500',
    urgent: 'Only 1 room left!',
    pill: '🏙️ City Centre',
  },
] as const;

const REVIEWS = [
  { name: 'Arjun Mehta',   city: 'Mumbai',    init: 'AM', stars: 5, text: 'The temple view at sunrise was an experience I\'ll carry for life. Staff treated us like royalty — every small detail was thought through with care.',      prop: 'Pariyanampatta',    date: 'Feb 2026', likes: 24 },
  { name: 'Priya Sharma',  city: 'New Delhi', init: 'PS', stars: 5, text: 'I\'ve stayed in 5-star hotels across India and this matched all of them. The bed was cloud-soft, the bathroom spotless, the service impeccable.',        prop: 'Sreekrishnapuram',  date: 'Jan 2026', likes: 18 },
  { name: 'Vikram Singh',  city: 'Bangalore', init: 'VS', stars: 5, text: 'Unmatched hospitality anywhere in Kerala. Corporate-grade experience with a personal warm touch. Would recommend without a single hesitation.',          prop: 'Pariyanampatta',    date: 'Jan 2026', likes: 31 },
  { name: 'Ananya Iyer',   city: 'Chennai',   init: 'AI', stars: 4, text: 'Perfect location, immaculate rooms. The breakfast spread was authentic and generous. Staff responded to every request within minutes.',                  prop: 'Sreekrishnapuram',  date: 'Dec 2025', likes: 12 },
  { name: 'Rohan Gupta',   city: 'Kolkata',   init: 'RG', stars: 5, text: 'WiFi was perfect for remote work. Room was huge, AC was ice-cold, water was scalding hot. Everything just worked. Exceeded every expectation.',           prop: 'Pariyanampatta',    date: 'Dec 2025', likes: 9  },
  { name: 'Siddharth Rao', city: 'Hyderabad', init: 'SR', stars: 5, text: 'A perfect blend of Kerala heritage and modern luxury. Proximity to the temple adds a spiritual dimension that money genuinely cannot buy.',              prop: 'Sreekrishnapuram',  date: 'Nov 2025', likes: 15 },
];

/* ═══════════════════════════════════════════════════════════
   UTILS
═══════════════════════════════════════════════════════════ */
const fmt  = (d: Date | null, long = false) =>
  d ? d.toLocaleDateString('en-IN', long
    ? { day: 'numeric', month: 'short', year: 'numeric' }
    : { day: 'numeric', month: 'short' }
  ) : '—';

const ratingStyle = (r: number) =>
  r >= 4.5 ? 'bg-emerald-500' : r >= 4.0 ? 'bg-green-500' : r >= 3.5 ? 'bg-yellow-500' : 'bg-orange-500';

/* ═══════════════════════════════════════════════════════════
   CALENDAR
═══════════════════════════════════════════════════════════ */
function Calendar({ ci, co, onPick }: { ci: Date|null; co: Date|null; onPick: (d:Date)=>void }) {
  const today = new Date(); today.setHours(0,0,0,0);
  const [mo, setMo] = useState(today.getMonth());
  const [yr, setYr] = useState(today.getFullYear());
  const MNAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dCount   = new Date(yr, mo+1, 0).getDate();
  const startDow = new Date(yr, mo, 1).getDay();
  const cells: (Date|null)[] = Array(startDow).fill(null);
  for (let d=1; d<=dCount; d++) cells.push(new Date(yr, mo, d));
  const eq   = (a:Date, b:Date|null) => b && a.toDateString()===b.toDateString();
  const inR  = (d:Date) => ci && co && d>ci && d<co;
  const prev = () => mo===0 ? (setMo(11), setYr(y=>y-1)) : setMo(m=>m-1);
  const next = () => mo===11 ? (setMo(0),  setYr(y=>y+1)) : setMo(m=>m+1);
  return (
    <div className="select-none w-full">
      {/* Nav */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={prev} className="w-9 h-9 rounded-xl bg-white hover:bg-rose-50 border border-stone-200 flex items-center justify-center transition-colors shadow-sm active:scale-95">
          <ChevronLeft className="w-4 h-4 text-stone-500" />
        </button>
        <span className="text-[13px] font-black text-stone-800 tracking-wide">{MNAMES[mo]} {yr}</span>
        <button onClick={next} className="w-9 h-9 rounded-xl bg-white hover:bg-rose-50 border border-stone-200 flex items-center justify-center transition-colors shadow-sm active:scale-95">
          <ChevronRight className="w-4 h-4 text-stone-500" />
        </button>
      </div>
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1.5">
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
          <div key={d} className="text-center text-[10px] font-black text-stone-400 py-1 uppercase tracking-widest">{d}</div>
        ))}
      </div>
      {/* Cells */}
      <div className="grid grid-cols-7">
        {cells.map((date, i) => {
          if (!date) return <div key={i}/>;
          const past = date < today;
          const isCI = eq(date, ci); const isCO = eq(date, co); const rng = inR(date);
          return (
            <button key={i} disabled={past} onClick={() => !past && onPick(date)}
              className={[
                'relative h-9 w-full flex items-center justify-center text-[12px] font-semibold transition-all',
                past ? 'text-stone-300 cursor-not-allowed' : 'cursor-pointer',
                (isCI || isCO) ? 'z-10' : '',
                isCI ? 'rounded-l-xl bg-rose-600 text-white font-black shadow-lg shadow-rose-300' : '',
                isCO ? 'rounded-r-xl bg-rose-600 text-white font-black shadow-lg shadow-rose-300' : '',
                (isCI && isCO) ? 'rounded-xl' : '',
                rng ? 'bg-rose-100 text-rose-700 rounded-none' : '',
                (!isCI && !isCO && !rng && !past) ? 'rounded-xl hover:bg-rose-50 text-stone-700 hover:text-rose-700' : '',
              ].join(' ')}
            >{date.getDate()}</button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROOM CARD
═══════════════════════════════════════════════════════════ */
function RoomCard({ loc, idx, onBook }: { loc: typeof LOCATIONS[number]; idx: number; onBook:()=>void }) {
  const [slide, setSlide] = useState(0);
  const Icon = (props: { i: React.ComponentType<any>; className?: string }) => <props.i className={props.className} />;

  return (
    <motion.article
      initial={{ opacity:0, y:50 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:'-40px' }} transition={{ duration:0.65, delay:idx*0.12 }}
      className="group bg-white rounded-[1.75rem] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.07)] hover:shadow-[0_16px_56px_rgba(0,0,0,0.13)] border border-stone-100 transition-all duration-500"
    >
      <div className="flex flex-col lg:flex-row">

        {/* ── Gallery ── */}
        <div className="relative lg:w-[400px] xl:w-[460px] shrink-0 overflow-hidden">
          {/* Main image */}
          <div className="relative h-60 sm:h-72 lg:h-full min-h-[260px] overflow-hidden bg-stone-100">
            <AnimatePresence mode="wait">
              <motion.img
                key={slide}
                src={loc.gallery[slide]}
                alt={loc.name}
                initial={{ opacity:0, scale:1.06 }}
                animate={{ opacity:1, scale:1 }}
                exit={{ opacity:0 }}
                transition={{ duration:0.45 }}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </AnimatePresence>

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent pointer-events-none" />

            {/* Badge */}
            <div className="absolute top-3 left-3">
              <div className={`bg-gradient-to-r ${loc.badgeColor} text-white text-[10px] font-black tracking-wider uppercase px-3 py-1.5 rounded-full shadow-lg`}>
                {loc.badge}
              </div>
            </div>

            {/* Urgent */}
            {loc.urgent && (
              <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-red-500 text-white text-[10px] font-black px-2.5 py-1.5 rounded-full shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                {loc.urgent}
              </div>
            )}

            {/* Slide arrows (desktop hover) */}
            <button onClick={() => setSlide(s => (s-1+loc.gallery.length)%loc.gallery.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm lg:flex hidden">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => setSlide(s => (s+1)%loc.gallery.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm lg:flex hidden">
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Thumbnail strip */}
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
              <div className="flex gap-1.5 overflow-x-auto" style={{scrollbarWidth:'none'}}>
                {loc.gallery.slice(0,5).map((img,i) => (
                  <button key={i} onClick={() => setSlide(i)}
                    className={`shrink-0 w-10 h-8 sm:w-11 sm:h-9 rounded-lg overflow-hidden border-2 transition-all shadow-md
                      ${slide===i ? 'border-white scale-110 shadow-lg' : 'border-white/30 hover:border-white/70 opacity-70 hover:opacity-100'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
              <span className="ml-2 shrink-0 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full">
                <Camera className="w-3 h-3"/>{loc.gallery.length}
              </span>
            </div>
          </div>
        </div>

        {/* ── Details ── */}
        <div className="flex-1 p-5 sm:p-6 xl:p-8 flex flex-col">

          {/* Top row */}
          <div className="flex items-start gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-1 block">{loc.pill}</span>
              <h3 className="text-[17px] sm:text-xl font-black text-stone-900 leading-snug">{loc.name}</h3>
              <p className="flex items-center gap-1 text-[11px] sm:text-xs text-stone-400 font-medium mt-1">
                <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                <span className="truncate">{loc.address}</span>
                <span className="shrink-0 text-stone-200 mx-0.5">·</span>
                <span className="shrink-0">{loc.distance} from centre</span>
              </p>
            </div>
            {/* Rating */}
            <div className="shrink-0 text-center">
              <div className={`${ratingStyle(loc.rating)} text-white rounded-xl px-2.5 py-1.5 flex items-center gap-1 shadow-md`}>
                <span className="text-[13px] font-black">{loc.rating}</span>
                <Star className="w-3 h-3 fill-white"/>
              </div>
              <p className="text-[10px] font-bold text-stone-400 mt-0.5">{loc.ratingLabel}</p>
              <p className="text-[10px] text-stone-300">{loc.reviews.toLocaleString()} reviews</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-[13px] sm:text-sm text-stone-500 leading-relaxed line-clamp-2 mb-4">{loc.description}</p>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
            {loc.amenities.map((a) => (
              <span key={a.label} className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-stone-600 bg-stone-50 border border-stone-100 px-2.5 py-1.5 rounded-xl hover:border-rose-200 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-default">
                <a.icon className="w-3.5 h-3.5 text-rose-400"/>
                {a.label}
              </span>
            ))}
            {loc.extra > 0 && (
              <span className="inline-flex items-center text-[11px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-1.5 rounded-xl hover:bg-rose-100 transition-colors cursor-pointer">
                +{loc.extra} more
              </span>
            )}
          </div>

          {/* Member badge + Verified */}
          <div className="flex items-center gap-2.5 mb-4 flex-wrap">
            <div className="flex items-center gap-1.5 border border-stone-800 text-stone-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg">
              <div className="w-4 h-4 bg-stone-900 rounded flex items-center justify-center">
                <span className="text-white text-[8px] font-black leading-none">W</span>
              </div>
              WIZARD MEMBER
            </div>
            <div className="flex items-center gap-1 text-emerald-600 text-[11px] font-bold">
              <BadgeCheck className="w-3.5 h-3.5"/>
              Verified Property
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-stone-100 mb-4"/>

          {/* Price + CTA */}
          <div className="mt-auto flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-[26px] sm:text-3xl font-black text-stone-900 leading-none">₹{loc.price.toLocaleString()}</span>
                <span className="text-sm text-stone-400 line-through font-medium">₹{loc.originalPrice.toLocaleString()}</span>
                <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg">{loc.discount}% off</span>
              </div>
              <p className="text-[11px] text-stone-400 mt-1">+ ₹{loc.taxes} taxes &amp; fees · per room / night</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none sm:px-4 py-3 border-2 border-stone-200 hover:border-rose-300 text-stone-600 hover:text-rose-700 text-[13px] font-bold rounded-2xl transition-all active:scale-95">
                Details
              </button>
              <button onClick={onBook}
                className="flex-1 sm:flex-none sm:px-8 py-3 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-[13px] font-black rounded-2xl transition-all shadow-lg shadow-rose-200 hover:shadow-rose-300 flex items-center justify-center gap-2">
                Book Now <ArrowRight className="w-4 h-4"/>
              </button>
            </div>
          </div>

        </div>
      </div>
    </motion.article>
  );
}

/* ═══════════════════════════════════════════════════════════
   FIELD — top-level so it never re-mounts on parent re-render
═══════════════════════════════════════════════════════════ */
function Field({ label, val, set, type = 'text', ph = '' }: {
  label: string; val: string; set: (v: string) => void; type?: string; ph?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] font-black uppercase tracking-widest text-stone-400 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={val}
        onChange={e => set(e.target.value)}
        placeholder={ph}
        autoComplete={type === 'email' ? 'email' : type === 'tel' ? 'tel' : 'name'}
        className="w-full bg-stone-50 border-2 border-stone-200 focus:border-rose-400 focus:bg-white rounded-xl px-4 py-3 text-[13px] font-semibold text-stone-800 placeholder-stone-300 outline-none transition-colors"
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   BOOKING MODAL
═══════════════════════════════════════════════════════════ */
function BookingModal({ loc, onClose }: { loc: typeof LOCATIONS[number]; onClose:()=>void }) {
  type S = 'dates'|'details'|'confirm'|'done';
  const [step, setStep]   = useState<S>('dates');
  const [ci, setCi]       = useState<Date|null>(null);
  const [co, setCo]       = useState<Date|null>(null);
  const [guests, setG]    = useState(1);
  const [name, setName]   = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [req, setReq]     = useState('');
  const [busy, setBusy]   = useState(false);
  const [err, setErr]     = useState('');

  const nights   = ci && co ? Math.round((co.getTime()-ci.getTime())/86400000) : 0;
  const subtotal = loc.price * Math.max(nights,1);
  const gst      = Math.round(subtotal * 0.18);
  const total    = subtotal + gst;

  const pickDate = (d: Date) => {
    if (!ci || (ci && co)) { setCi(d); setCo(null); }
    else if (d <= ci)       { setCi(d); setCo(null); }
    else                     setCo(d);
  };

  const confirm = async () => {
    setBusy(true); setErr('');
    const checkInStr  = fmt(ci,  true);
    const checkOutStr = fmt(co,  true);
    const bookedOn    = new Date().toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' });
    try {
      // Template params — every field explicitly stringified so EmailJS receives clean values
      const p: Record<string, string> = {
        to_email:       OWNER_EMAIL,
        reply_to:       email,
        guest_name:     name,
        guest_email:    email,
        guest_phone:    phone,
        property_name:  loc.name,
        property_short: loc.shortName,
        check_in:       checkInStr,
        check_out:      checkOutStr,
        nights:         String(nights),
        guests:         String(guests),
        room_rate:      `₹${loc.price.toLocaleString()} per night`,
        subtotal:       `₹${subtotal.toLocaleString()}`,
        gst_amount:     `₹${gst.toLocaleString()}`,
        total_amount:   `₹${total.toLocaleString()}`,
        special_requests: req.trim() || 'None',
        booked_on:      bookedOn,
      };

      if ((window as any).emailjs) {
        await (window as any).emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          p,
          EMAILJS_PUBLIC_KEY
        );
      } else {
        // Mailto fallback — opens default mail client with full booking details
        const subject = encodeURIComponent(
          `🏨 New Booking: ${loc.shortName} — ${name} (${checkInStr} to ${checkOutStr})`
        );
        const body = encodeURIComponent(
          `═══════════════════════════════\n` +
          `  SREEBHADRA ROOMS — NEW BOOKING\n` +
          `═══════════════════════════════\n\n` +
          `GUEST DETAILS\n` +
          `─────────────\n` +
          `Name    : ${name}\n` +
          `Email   : ${email}\n` +
          `Phone   : ${phone}\n\n` +
          `BOOKING DETAILS\n` +
          `───────────────\n` +
          `Property : ${loc.name}\n` +
          `Check-in : ${checkInStr}\n` +
          `Check-out: ${checkOutStr}\n` +
          `Nights   : ${nights}\n` +
          `Guests   : ${guests}\n\n` +
          `PRICE BREAKDOWN\n` +
          `───────────────\n` +
          `Room Rate : ₹${loc.price.toLocaleString()} × ${nights} nights = ₹${subtotal.toLocaleString()}\n` +
          `GST (18%) : ₹${gst.toLocaleString()}\n` +
          `TOTAL     : ₹${total.toLocaleString()}\n\n` +
          `Special Requests: ${req.trim() || 'None'}\n\n` +
          `Booked on: ${bookedOn}`
        );
        window.open(`mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`, '_blank');
      }
      setStep('done');
    } catch (e) {
      console.error('Booking email error:', e);
      setErr('Could not send confirmation email. Please try again or call us directly.');
    }
    setBusy(false);
  };

  const STEP_LABELS = ['Dates','Details','Confirm'];
  const si = ['dates','details','confirm'].indexOf(step);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/65 backdrop-blur-md"
      onClick={e => { if (e.target===e.currentTarget) onClose(); }}>
      <motion.div
        initial={{ y:'100%', opacity:0 }} animate={{ y:0, opacity:1 }} exit={{ y:'100%', opacity:0 }}
        transition={{ type:'spring', damping:32, stiffness:320 }}
        className="bg-white w-full sm:max-w-[440px] rounded-t-[2.25rem] sm:rounded-[2rem] max-h-[93dvh] sm:max-h-[88vh] flex flex-col shadow-2xl"
        onClick={e=>e.stopPropagation()}>

        {/* Drag handle */}
        <div className="sm:hidden flex justify-center pt-3 pb-0.5 shrink-0">
          <div className="w-12 h-1.5 bg-stone-200 rounded-full"/>
        </div>

        {/* Header */}
        <div className="shrink-0 px-5 sm:px-6 pt-4 pb-3 border-b border-stone-100 flex items-center gap-3">
          <img src={loc.gallery[0]} alt="" className="w-10 h-10 rounded-xl object-cover shadow-sm shrink-0" referrerPolicy="no-referrer"/>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black uppercase tracking-widest text-rose-500 leading-none mb-0.5">Book Your Stay</p>
            <h2 className="text-[13px] sm:text-sm font-black text-stone-900 truncate">{loc.name}</h2>
          </div>
          <button onClick={onClose}
            className="shrink-0 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors active:scale-90">
            <X className="w-4 h-4 text-stone-500"/>
          </button>
        </div>

        {/* Step bar */}
        {step !== 'done' && (
          <div className="shrink-0 px-5 sm:px-6 pt-4 pb-3 flex items-center gap-1.5">
            {STEP_LABELS.map((lbl, i) => (
              <React.Fragment key={lbl}>
                <div className={`flex items-center gap-1.5 text-[11px] font-black transition-colors ${i<=si?'text-rose-600':'text-stone-300'}`}>
                  <div className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[9px] font-black transition-all
                    ${i<si?'bg-rose-600 text-white':i===si?'border-2 border-rose-500 text-rose-600':'border border-stone-300 text-stone-300'}`}>
                    {i<si ? <Check className="w-3 h-3"/> : i+1}
                  </div>
                  <span className="hidden xs:inline sm:inline">{lbl}</span>
                </div>
                {i<2 && <div className={`flex-1 h-px ${i<si?'bg-rose-500':'bg-stone-200'}`}/>}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-6 pb-6" style={{scrollbarWidth:'none'}}>
          <AnimatePresence mode="wait">

            {/* ── STEP 1: DATES ── */}
            {step==='dates' && (
              <motion.div key="dates" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} className="pt-4 space-y-4">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-stone-900">When are you staying?</h3>
                  <p className="text-xs text-stone-400 font-medium mt-0.5">Tap to pick check-in, then check-out</p>
                </div>

                {/* Date pills */}
                <div className="grid grid-cols-2 gap-3">
                  {[{lbl:'Check-in',val:fmt(ci),active:!!ci},{lbl:'Check-out',val:fmt(co),active:!!co}].map(it=>(
                    <div key={it.lbl} className={`p-3 rounded-2xl border-2 transition-all ${it.active?'border-rose-500 bg-rose-50':'border-stone-200 bg-stone-50'}`}>
                      <p className="text-[9px] font-black uppercase tracking-widest text-stone-400 mb-1 flex items-center gap-1">
                        <CalendarDays className="w-3 h-3"/> {it.lbl}
                      </p>
                      <p className={`text-sm font-black ${it.active?'text-rose-700':'text-stone-300'}`}>{it.val}</p>
                    </div>
                  ))}
                </div>

                {/* Nights pill */}
                {nights > 0 && (
                  <motion.div initial={{opacity:0,y:-6}} animate={{opacity:1,y:0}}
                    className="flex items-center justify-between bg-rose-600 text-white rounded-2xl px-4 py-3">
                    <div>
                      <p className="text-[11px] font-bold text-rose-200">Total stay</p>
                      <p className="text-sm font-black">{nights} night{nights>1?'s':''}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] font-bold text-rose-200">Est. price</p>
                      <p className="text-sm font-black">₹{(loc.price*nights).toLocaleString()} <span className="font-normal text-rose-300 text-[11px]">+tax</span></p>
                    </div>
                  </motion.div>
                )}

                {/* Calendar */}
                <div className="bg-stone-50 border border-stone-100 rounded-2xl p-4">
                  <Calendar ci={ci} co={co} onPick={pickDate}/>
                </div>

                {/* Guests */}
                <div className="flex items-center justify-between bg-stone-50 border border-stone-100 rounded-2xl px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center">
                      <Users className="w-4 h-4 text-rose-600"/>
                    </div>
                    <div>
                      <p className="text-sm font-black text-stone-800">Guests</p>
                      <p className="text-[11px] text-stone-400">Adults</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={()=>setG(g=>Math.max(1,g-1))}
                      className="w-9 h-9 rounded-xl border-2 border-stone-200 hover:border-rose-400 text-stone-600 hover:text-rose-600 font-bold flex items-center justify-center transition-all active:scale-90 text-lg">−</button>
                    <span className="w-5 text-center text-base font-black text-stone-900">{guests}</span>
                    <button onClick={()=>setG(g=>Math.min(8,g+1))}
                      className="w-9 h-9 rounded-xl border-2 border-stone-200 hover:border-rose-400 text-stone-600 hover:text-rose-600 font-bold flex items-center justify-center transition-all active:scale-90 text-lg">+</button>
                  </div>
                </div>

                <button disabled={!ci||!co} onClick={()=>setStep('details')}
                  className="w-full py-4 bg-rose-600 hover:bg-rose-700 disabled:bg-stone-200 disabled:text-stone-400 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-200 active:scale-[.98] text-[14px]">
                  Continue <ArrowRight className="w-4 h-4"/>
                </button>
              </motion.div>
            )}

            {/* ── STEP 2: DETAILS ── */}
            {step==='details' && (
              <motion.div key="details" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} className="pt-4 space-y-4">
                <div className="flex items-center gap-2">
                  <button onClick={()=>setStep('dates')} className="w-8 h-8 rounded-xl hover:bg-stone-100 flex items-center justify-center transition-colors active:scale-90">
                    <ChevronLeft className="w-4 h-4 text-stone-400"/>
                  </button>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-stone-900">Your Details</h3>
                    <p className="text-[11px] text-stone-400">{fmt(ci)} → {fmt(co)} · {guests} guest{guests>1?'s':''}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Field label="Full Name *"    val={name}  set={setName}  type="text"  ph="Your full name"/>
                  <Field label="Email Address *" val={email} set={setEmail} type="email" ph="you@email.com"/>
                  <Field label="Phone Number *"  val={phone} set={setPhone} type="tel"   ph="+91 98765 43210"/>
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-widest text-stone-400 mb-1.5">Special Requests</label>
                    <textarea rows={3} value={req} onChange={e=>setReq(e.target.value)} placeholder="Early check-in, dietary needs, room preferences..."
                      className="w-full bg-stone-50 border-2 border-stone-200 focus:border-rose-400 focus:bg-white rounded-xl px-4 py-3 text-[13px] font-semibold text-stone-800 placeholder-stone-300 outline-none transition-all resize-none"/>
                  </div>
                </div>

                {/* Price summary */}
                <div className="bg-stone-50 border border-stone-100 rounded-2xl p-4 space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Price Summary</p>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-stone-500">₹{loc.price.toLocaleString()} × {nights} night{nights>1?'s':''}</span>
                    <span className="font-bold text-stone-700">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-stone-500">GST (18%)</span>
                    <span className="font-bold text-stone-700">₹{gst.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t border-stone-200 pt-2 font-black text-[15px]">
                    <span className="text-stone-800">Total</span>
                    <span className="text-rose-600">₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <button disabled={!name||!email||!phone} onClick={()=>setStep('confirm')}
                  className="w-full py-4 bg-rose-600 hover:bg-rose-700 disabled:bg-stone-200 disabled:text-stone-400 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-200 active:scale-[.98] text-[14px]">
                  Review Booking <ArrowRight className="w-4 h-4"/>
                </button>
              </motion.div>
            )}

            {/* ── STEP 3: CONFIRM ── */}
            {step==='confirm' && (
              <motion.div key="confirm" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} className="pt-4 space-y-4">
                <div className="flex items-center gap-2">
                  <button onClick={()=>setStep('details')} className="w-8 h-8 rounded-xl hover:bg-stone-100 flex items-center justify-center transition-colors active:scale-90">
                    <ChevronLeft className="w-4 h-4 text-stone-400"/>
                  </button>
                  <h3 className="text-base sm:text-lg font-black text-stone-900">Review &amp; Confirm</h3>
                </div>

                {/* Property preview */}
                <div className="rounded-2xl overflow-hidden border border-stone-100 shadow-sm">
                  <div className="relative h-24">
                    <img src={loc.gallery[0]} alt={loc.name} className="w-full h-full object-cover" referrerPolicy="no-referrer"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"/>
                    <p className="absolute bottom-3 left-4 text-white font-black text-sm">{loc.name}</p>
                  </div>
                  <div className="bg-stone-50 px-4 py-3 space-y-2 text-[13px]">
                    {[
                      ['Guest',    name],
                      ['Email',    email],
                      ['Phone',    phone],
                      ['Check-in', fmt(ci,true)],
                      ['Check-out',fmt(co,true)],
                      ['Duration', `${nights} night${nights>1?'s':''} · ${guests} guest${guests>1?'s':''}`],
                    ].map(([k,v])=>(
                      <div key={k} className="flex justify-between items-center gap-4">
                        <span className="text-stone-400 font-medium shrink-0">{k}</span>
                        <span className="text-stone-800 font-bold text-right truncate">{v}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center border-t border-stone-200 pt-2 font-black text-[15px]">
                      <span className="text-stone-700">Total incl. GST</span>
                      <span className="text-rose-600">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Guarantee note */}
                <div className="flex gap-3 bg-emerald-50 border border-emerald-100 rounded-2xl p-3.5">
                  <Shield className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"/>
                  <p className="text-[12px] text-emerald-700 font-semibold leading-relaxed">
                    Free cancellation up to 48 hrs before check-in. A confirmation will be sent to <strong>{email}</strong> and our team instantly.
                  </p>
                </div>

                {err && <p className="text-[12px] text-red-500 font-semibold text-center bg-red-50 border border-red-100 rounded-xl px-4 py-3">{err}</p>}

                <button onClick={confirm} disabled={busy}
                  className="w-full py-4 bg-rose-600 hover:bg-rose-700 disabled:bg-rose-400 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-200 active:scale-[.98] text-[14px]">
                  {busy ? <><Loader className="w-4 h-4 animate-spin"/> Sending...</> : <><Sparkles className="w-4 h-4"/> Confirm Booking</>}
                </button>
              </motion.div>
            )}

            {/* ── DONE ── */}
            {step==='done' && (
              <motion.div key="done" initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}} className="pt-6 pb-2 flex flex-col items-center text-center gap-5">
                <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay:0.15,type:'spring',stiffness:220}}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-200">
                  <CheckCircle2 className="w-10 h-10 text-white"/>
                </motion.div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-stone-900">Booking Confirmed! 🎉</h2>
                  <p className="text-stone-500 text-sm mt-1">Thank you, <span className="font-black text-stone-800">{name}</span>!</p>
                </div>
                <div className="w-full bg-stone-50 rounded-2xl p-4 space-y-2 text-[13px] text-left border border-stone-100">
                  <div className="flex justify-between"><span className="text-stone-400">Property</span><span className="font-bold text-stone-800">{loc.shortName}</span></div>
                  <div className="flex justify-between"><span className="text-stone-400">Dates</span><span className="font-bold text-stone-800">{fmt(ci)} – {fmt(co)}</span></div>
                  <div className="flex justify-between border-t border-stone-200 pt-2 font-black text-[15px]">
                    <span className="text-stone-700">Total</span>
                    <span className="text-rose-600">₹{total.toLocaleString()}</span>
                  </div>
                </div>
                <p className="text-[12px] text-stone-400">Confirmation sent to <span className="text-rose-600 font-bold">{email}</span></p>
                <button onClick={onClose}
                  className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-2xl transition-all active:scale-[.98] text-[14px]">
                  Done
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════ */
export default function Rooms() {
  const [bookLoc, setBookLoc] = useState<typeof LOCATIONS[number]|null>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const heroRef   = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target:heroRef, offset:['start start','end start'] });
  const bgY = useTransform(scrollYProgress, [0,1], ['0%','22%']);
  const bgO = useTransform(scrollYProgress, [0,0.75], [1,0]);

  // Load EmailJS
  useEffect(()=>{
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    s.onload = () => (window as any).emailjs?.init(EMAILJS_PUBLIC_KEY);
    document.head.appendChild(s);
    return () => { try { document.head.removeChild(s); } catch {} };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{background:'#F5F1EA', fontFamily:"'Georgia', serif"}}>

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[100svh] flex items-center overflow-hidden">

        {/* Parallax backdrop */}
        <motion.div style={{y:bgY}} className="absolute inset-0 z-0">

          {/* Desktop: split image grid */}
          <div className="absolute inset-0 hidden md:block">
            <div className="absolute inset-0 grid grid-cols-3 gap-3 p-5 pt-20 opacity-90">
              <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:1,delay:0.2}}
                className="col-span-1 rounded-2xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=600&auto=format&fit=crop" alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer"/>
              </motion.div>
              <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:1,delay:0.35}}
                className="col-span-1 rounded-2xl overflow-hidden shadow-2xl mt-12">
                <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop" alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer"/>
              </motion.div>
              <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:1,delay:0.5}}
                className="col-span-1 rounded-2xl overflow-hidden shadow-2xl mt-6">
                <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop" alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer"/>
              </motion.div>
            </div>
          </div>

          {/* Mobile: single image bg */}
          <div className="absolute inset-0 md:hidden">
            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=900&auto=format&fit=crop"
              alt="" className="w-full h-full object-cover opacity-20" referrerPolicy="no-referrer"/>
          </div>

          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            <span className="text-[50vw] md:text-[28rem] font-black leading-none select-none"
              style={{color:'rgba(0,0,0,0.03)'}}>W</span>
          </div>

          {/* Gradients */}
          <div className="absolute inset-0" style={{background:'linear-gradient(to right, #F5F1EA 35%, rgba(245,241,234,0.7) 60%, rgba(245,241,234,0.1) 100%)'}}/>
          <div className="absolute inset-0" style={{background:'linear-gradient(to bottom, rgba(245,241,234,0.3) 0%, transparent 40%, #F5F1EA 100%)'}}/>
        </motion.div>

        {/* Hero content */}
        <motion.div style={{opacity:bgO}}
          className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-14 xl:px-20 pt-28 sm:pt-32 pb-20">
          <motion.div initial={{opacity:0,y:60}} animate={{opacity:1,y:0}} transition={{duration:1,ease:[0.16,1,0.3,1]}}>

            {/* Eyebrow */}
            <motion.div initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:0.2}}
              className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="h-px bg-stone-400" style={{width:'clamp(20px,4vw,40px)'}}/>
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.35em] text-stone-500">Premium Stays · Palakkad · Kerala</span>
            </motion.div>

            {/* Main headline */}
            <h1 className="font-black uppercase leading-[0.82] tracking-tighter text-stone-900 mb-6 sm:mb-8"
              style={{fontSize:'clamp(3rem,11.5vw,9rem)'}}>
              <motion.span initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{delay:0.1,duration:0.8}} className="block">
                OWN YOUR
              </motion.span>
              <motion.span initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.8}}
                className="block text-transparent"
                style={{WebkitTextStroke:'clamp(1.5px,0.25vw,3.5px) #e11d48'}}>
                JOURNEY
              </motion.span>
              <motion.span initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{delay:0.3,duration:0.8}} className="block">
                IN STYLE
              </motion.span>
            </h1>

            {/* Subtext */}
            <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}
              className="text-stone-500 font-medium leading-relaxed mb-8 sm:mb-10 max-w-xs sm:max-w-lg"
              style={{fontSize:'clamp(0.9rem,2vw,1.1rem)'}}>
              For those always on the move, journeys matter as much as destinations.
              Vibrant spaces where excitement comes alive and memories are made.
            </motion.p>

            {/* Stats */}
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.55}}
              className="flex flex-wrap gap-6 sm:gap-12 mb-9 sm:mb-11">
              {[
                {v:'17+',   l:'Luxury Rooms'},
                {v:'4.6★',  l:'Guest Rating'},
                {v:'2,900+',l:'Happy Guests'},
                {v:'2',     l:'Locations'},
              ].map((s,i) => (
                <motion.div key={s.l} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.6+i*0.08}}>
                  <p className="font-black text-stone-900" style={{fontSize:'clamp(1.4rem,3.5vw,2.25rem)'}}>{s.v}</p>
                  <p className="text-[10px] sm:text-[11px] font-black text-stone-400 uppercase tracking-widest">{s.l}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.75}}
              className="flex flex-col xs:flex-row gap-3">
              <a href="#rooms"
                className="inline-flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-full transition-all active:scale-95 shadow-xl shadow-rose-200/70"
                style={{padding:'clamp(0.85rem,2vw,1.1rem) clamp(1.75rem,4vw,2.5rem)', fontSize:'clamp(0.8rem,1.5vw,0.95rem)'}}>
                Explore Rooms <ArrowRight className="w-4 h-4"/>
              </a>
              <a href="#reviews"
                className="inline-flex items-center justify-center gap-2 border-2 border-stone-300 hover:border-rose-400 text-stone-700 hover:text-rose-700 font-black rounded-full transition-all active:scale-95"
                style={{padding:'clamp(0.85rem,2vw,1.1rem) clamp(1.75rem,4vw,2.5rem)', fontSize:'clamp(0.8rem,1.5vw,0.95rem)'}}>
                Read Reviews
              </a>
            </motion.div>

          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5">
          <motion.div animate={{y:[0,7,0]}} transition={{repeat:Infinity,duration:1.8}}>
            <ChevronRight className="w-4 h-4 text-stone-400 rotate-90"/>
          </motion.div>
          <span className="text-[9px] font-black text-stone-400 uppercase tracking-[0.25em]">Scroll</span>
        </div>
      </section>

      {/* ══════════════════════════════
          TRUST STRIP
      ══════════════════════════════ */}
      <div className="bg-rose-600 overflow-x-auto">
        <div className="flex items-center justify-start sm:justify-center gap-5 sm:gap-10 md:gap-16 px-5 py-4 min-w-max sm:min-w-0">
          {[
            {icon:Shield, text:'Free Cancellation'},
            {icon:Clock,  text:'Instant Confirmation'},
            {icon:Award,  text:'Best Price Guarantee'},
            {icon:Phone,  text:'24/7 Concierge'},
          ].map(it => (
            <div key={it.text} className="flex items-center gap-2 text-white/90 text-[10px] sm:text-[11px] font-black uppercase tracking-wider whitespace-nowrap">
              <it.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0"/> {it.text}
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════
          ROOM LISTINGS
      ══════════════════════════════ */}
      <section id="rooms" className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="mb-10 sm:mb-14">
          <p className="text-[11px] font-black text-rose-600 uppercase tracking-[0.35em] mb-2">Available Now</p>
          <h2 className="font-black text-stone-900 tracking-tighter leading-tight mb-3"
            style={{fontSize:'clamp(2rem,6vw,3.75rem)'}}>
            Choose Your<br className="hidden xs:block sm:hidden"/> Sanctuary
          </h2>
          <p className="text-stone-400 font-medium max-w-md" style={{fontSize:'clamp(0.85rem,1.8vw,1rem)'}}>
            Two exceptional properties in Palakkad — each a unique expression of Kerala luxury.
          </p>
        </motion.div>

        <div className="flex flex-col gap-5 sm:gap-7">
          {LOCATIONS.map((loc,i) => (
            <RoomCard key={loc.id} loc={loc} idx={i} onBook={()=>setBookLoc(loc)}/>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          REVIEWS
      ══════════════════════════════ */}
      <section id="reviews" className="bg-stone-900 py-14 sm:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Header row */}
          <div className="flex items-start sm:items-end justify-between gap-5 mb-9 sm:mb-12">
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
              <p className="text-[11px] font-black text-rose-400 uppercase tracking-[0.35em] mb-2">What Guests Say</p>
              <h2 className="font-black text-white tracking-tighter leading-tight mb-3"
                style={{fontSize:'clamp(2rem,6vw,3.75rem)'}}>
                Guest Stories
              </h2>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_,i)=><Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400"/>)}
                </div>
                <span className="text-stone-300 text-xs sm:text-sm font-bold">4.6 average · 2,980+ reviews</span>
              </div>
            </motion.div>

            {/* Desktop arrows */}
            <div className="hidden sm:flex gap-2 shrink-0">
              {(['l','r'] as const).map(dir => (
                <button key={dir} onClick={()=>reviewRef.current?.scrollBy({left:dir==='l'?-380:380,behavior:'smooth'})}
                  className="w-11 h-11 rounded-full border border-stone-700 hover:border-rose-500 flex items-center justify-center text-stone-400 hover:text-white transition-all active:scale-90">
                  {dir==='l' ? <ChevronLeft className="w-5 h-5"/> : <ChevronRight className="w-5 h-5"/>}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable track */}
          <div ref={reviewRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto pb-5 scroll-smooth snap-x snap-mandatory"
            style={{scrollbarWidth:'none'}}>
            {REVIEWS.map((r,i) => (
              <motion.div key={i}
                initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{delay:i*0.07}}
                className="min-w-[270px] sm:min-w-[330px] max-w-[270px] sm:max-w-[330px] snap-start shrink-0
                           bg-stone-800 border border-stone-700/60 rounded-2xl sm:rounded-3xl p-5 sm:p-6
                           flex flex-col gap-3 hover:border-rose-500/40 transition-all group">
                <Quote className="w-5 h-5 text-rose-500/40 group-hover:text-rose-500/70 transition-colors"/>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_,s)=>(
                    <Star key={s} className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${s<r.stars?'text-amber-400 fill-amber-400':'text-stone-600'}`}/>
                  ))}
                </div>
                <p className="text-stone-200 text-[12px] sm:text-sm leading-relaxed flex-1 font-medium">{r.text}</p>
                <div className="border-t border-stone-700 pt-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-[10px] font-black text-rose-300 shrink-0">
                      {r.init}
                    </div>
                    <div>
                      <p className="text-white font-black text-[12px] sm:text-[13px]">{r.name}</p>
                      <p className="text-stone-500 text-[10px] font-medium">{r.city} · {r.date}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-rose-400 text-[9px] sm:text-[10px] font-black uppercase tracking-wide">{r.prop}</p>
                    <div className="flex items-center gap-1 justify-end mt-1">
                      <ThumbsUp className="w-2.5 h-2.5 text-stone-600"/>
                      <span className="text-stone-600 text-[10px]">{r.likes}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-stone-600 text-[11px] mt-3 sm:hidden font-bold uppercase tracking-widest">
            ← Swipe to read more →
          </p>
        </div>
      </section>

      {/* ══════════════════════════════
          WHY SREEBHADRA
      ══════════════════════════════ */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-10 sm:mb-14">
          <p className="text-[11px] font-black text-rose-600 uppercase tracking-[0.35em] mb-2">The Difference</p>
          <h2 className="font-black text-stone-900 tracking-tighter" style={{fontSize:'clamp(1.8rem,5vw,3.25rem)'}}>
            Why Sreebhadra Rooms?
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          {[
            {icon:Bed,    title:'Premium Bedding', desc:'Hotel-grade mattresses and Egyptian cotton linens for perfect rest.'},
            {icon:Wifi,   title:'High-Speed WiFi',  desc:'Blazing fast internet — perfect for remote work or streaming.'},
            {icon:Coffee, title:'Kerala Breakfast', desc:'Authentic morning spreads, freshly prepared by our chefs daily.'},
            {icon:Shield, title:'Safe & Secure',    desc:'24/7 CCTV security, power backup and keycard-controlled access.'},
          ].map((item,i)=>(
            <motion.div key={item.title}
              initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
              viewport={{once:true}} transition={{delay:i*0.1}}
              whileHover={{y:-5}} transition2={{duration:0.2} as any}
              className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-stone-100 shadow-sm hover:shadow-2xl hover:border-rose-100 transition-all duration-300 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-rose-50 group-hover:bg-rose-600 flex items-center justify-center text-rose-600 group-hover:text-white transition-all mb-3 sm:mb-4 shadow-sm">
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6"/>
              </div>
              <h4 className="font-black text-stone-900 mb-1.5 leading-tight" style={{fontSize:'clamp(0.8rem,1.6vw,0.95rem)'}}>{item.title}</h4>
              <p className="text-stone-400 leading-relaxed font-medium" style={{fontSize:'clamp(0.72rem,1.4vw,0.82rem)'}}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          FINAL CTA
      ══════════════════════════════ */}
      <section className="bg-rose-600 py-14 sm:py-20 px-5">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
            <Flame className="w-8 h-8 text-rose-300 mx-auto mb-4"/>
            <h2 className="font-black text-white tracking-tighter mb-3" style={{fontSize:'clamp(1.8rem,5vw,3rem)'}}>
              Ready for the Experience?
            </h2>
            <p className="text-rose-200 font-medium mb-7 max-w-md mx-auto" style={{fontSize:'clamp(0.85rem,1.8vw,1rem)'}}>
              Book directly for the best rates, free cancellation and instant email confirmation.
            </p>
            <button onClick={()=>setBookLoc(LOCATIONS[0])}
              className="inline-flex items-center gap-3 bg-white hover:bg-stone-100 active:scale-95 text-rose-700 font-black rounded-full transition-all shadow-2xl shadow-rose-900/30"
              style={{padding:'clamp(1rem,2.5vw,1.25rem) clamp(2rem,5vw,3rem)', fontSize:'clamp(0.9rem,2vw,1.1rem)'}}>
              <Sparkles className="w-5 h-5"/> Book Your Stay Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════
          MODAL
      ══════════════════════════════ */}
      <AnimatePresence>
        {bookLoc && <BookingModal loc={bookLoc} onClose={()=>setBookLoc(null)}/>}
      </AnimatePresence>

      {/* EmailJS setup note */}
      <div className="bg-amber-50 border-t border-amber-200 px-4 sm:px-6 py-3 text-center">
        <p className="text-[11px] text-amber-700 font-semibold leading-relaxed">
          📧 <strong>Email Setup:</strong> Visit{' '}
          <a href="https://emailjs.com" target="_blank" rel="noreferrer" className="underline font-black">emailjs.com</a>
          {' '}→ free account → replace <code className="bg-amber-100 px-1 rounded">EMAILJS_SERVICE_ID</code>, <code className="bg-amber-100 px-1 rounded">EMAILJS_TEMPLATE_ID</code> &amp; <code className="bg-amber-100 px-1 rounded">EMAILJS_PUBLIC_KEY</code> at the top of Rooms.tsx. Until configured, bookings use a mailto fallback to {OWNER_EMAIL}.
        </p>
      </div>

      <style>{`
        html { scroll-behavior: smooth; }
        * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
        @media (max-width: 400px) {
          .xs\\:flex-row { flex-direction: row !important; }
          .xs\\:inline   { display: inline !important; }
          .xs\\:block    { display: block !important; }
        }
      `}</style>
    </div>
  );
}

