import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { INITIAL_EVENTS, TEMPLES } from '../data/templeEvents';

export default function HeroBanner({ lang, onSelectTemple }) {
  // Dynamically find next upcoming major event from today's date
  const todayStr = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Kolkata',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(new Date());
  const upcomingMajorEvents = INITIAL_EVENTS.filter(e => (e.isMajor || e.highlight) && e.startDate >= todayStr);
  const majorEvent = upcomingMajorEvents.length > 0 ? upcomingMajorEvents[0] : (INITIAL_EVENTS.find(e => e.isMajor) || INITIAL_EVENTS[0]);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!majorEvent || !majorEvent.startDate) return;

    // Use event time if available or default to 08:00 AM
    let timePart = '08:00:00';
    if (majorEvent.time && majorEvent.time.includes(':')) {
      const match = majorEvent.time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
      if (match) {
        let hrs = parseInt(match[1], 10);
        const mins = match[2];
        const ampm = match[3] ? match[3].toUpperCase() : '';
        if (ampm === 'PM' && hrs < 12) hrs += 12;
        if (ampm === 'AM' && hrs === 12) hrs = 0;
        timePart = `${hrs.toString().padStart(2, '0')}:${mins}:00`;
      }
    }

    const targetDate = new Date(`${majorEvent.startDate}T${timePart}`).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [majorEvent]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#141923] via-[#0B0E14] to-[#0B0E14] border-b border-[#D4AF37]/20 py-10">
      {/* Subtle Background Motif & Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#990000]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Message */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Official 2026-27 TTD Temple Events' : '2026-27 అధికారిక టిటిడి దేవాలయాల ఉత్సవాలు'}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              {lang === 'en' ? (
                <>Experience Sacred <span className="gold-gradient-text">Tirumala Utsavams</span> & Festivals</>
              ) : (
                <>తిరుమల తిరుపతి దివ్య క్షేత్రాల <span className="gold-gradient-text">ఉత్సవ సమగ్ర క్యాలెండర్</span></>
              )}
            </h2>

            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-2xl">
              {lang === 'en'
                ? 'Filter and plan your pilgrimage across Tirumala & Tirupati temples with official TTD schedules, interactive month calendar, and daily Nitya Seva timings.'
                : 'శ్రీ వెంకటేశ్వర స్వామి వారి తిరుమల దేవాలయంతో పాటు తిరుపతి పుణ్యక్షేత్రాల వార్షిక బ్రహ్మోత్సవాలు, వాహన సేవలు, నిత్య నైవేద్యాల సమగ్ర సమాచారం.'}
            </p>

            {/* Quick Temple Chips */}
            <div className="pt-2">
              <span className="text-xs text-[#94A3B8] block mb-2 font-medium">
                {lang === 'en' ? 'Filter by Temple Shrine:' : 'ఆలయం వారీగా పరిలక్షించు:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {TEMPLES.slice(0, 7).map(t => (
                  <button
                    key={t.id}
                    onClick={() => onSelectTemple(t.id)}
                    className="text-xs px-2.5 py-1 rounded-md bg-[#141923] hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#FFD700] transition-colors flex items-center gap-1.5"
                  >
                    <MapPin className="w-3 h-3 text-[#FF5722]" />
                    <span>{lang === 'en' ? t.name.split(' ')[0] + ' ' + (t.name.split(' ')[1] || '') : t.teluguName.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Countdown Card for Next Major Event */}
          <div className="lg:col-span-5">
            <div className="glass-card p-6 border-2 border-[#D4AF37]/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-r from-[#990000] to-[#FF5722] text-white text-[11px] font-extrabold uppercase rounded-bl-lg tracking-wider">
                {lang === 'en' ? 'FEATURED GRAND UTSAVAM' : 'ప్రధాన మహా ఉత్సవం'}
              </div>

              <div className="flex items-center gap-2 text-[#FFD700] text-xs font-semibold mb-2">
                <CalendarIcon className="w-4 h-4 text-[#FF5722]" />
                <span>{majorEvent.startDate} to {majorEvent.endDate}</span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2 leading-snug group-hover:text-[#FFD700] transition-colors">
                {lang === 'en' ? majorEvent.title : majorEvent.titleTe}
              </h3>

              <p className="text-xs text-[#94A3B8] mb-4 line-clamp-2">
                {lang === 'en' ? majorEvent.description : majorEvent.descriptionTe}
              </p>

              {/* Countdown Timer Display */}
              <div className="grid grid-cols-4 gap-2 py-3 bg-[#0B0E14]/80 rounded-xl border border-[#D4AF37]/30 text-center mb-4">
                <div>
                  <span className="block text-2xl font-extrabold gold-gradient-text">{timeLeft.days}</span>
                  <span className="text-[10px] text-[#94A3B8] uppercase font-semibold">{lang === 'en' ? 'Days' : 'రోజులు'}</span>
                </div>
                <div>
                  <span className="block text-2xl font-extrabold gold-gradient-text">{timeLeft.hours}</span>
                  <span className="text-[10px] text-[#94A3B8] uppercase font-semibold">{lang === 'en' ? 'Hours' : 'గంటలు'}</span>
                </div>
                <div>
                  <span className="block text-2xl font-extrabold gold-gradient-text">{timeLeft.minutes}</span>
                  <span className="text-[10px] text-[#94A3B8] uppercase font-semibold">{lang === 'en' ? 'Mins' : 'నిమిషాలు'}</span>
                </div>
                <div>
                  <span className="block text-2xl font-extrabold gold-gradient-text">{timeLeft.seconds}</span>
                  <span className="text-[10px] text-[#94A3B8] uppercase font-semibold">{lang === 'en' ? 'Secs' : 'సెకన్లు'}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#94A3B8] pt-1 border-t border-[#D4AF37]/20">
                <span className="flex items-center gap-1 text-[#FFD700]">
                  <Clock className="w-3.5 h-3.5" />
                  {majorEvent.time}
                </span>
                <span className="badge-peak">{majorEvent.crowdBadge}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
