import React from 'react';
import { Sparkles, Calendar, ArrowRight, Layers } from 'lucide-react';
import { FESTIVAL_SERIES_LIST } from '../data/mediaAndReferences';
import { TEMPLES } from '../data/templeEvents';

export default function FestivalSeries({ lang, onSelectSeries }) {
  return (
    <div className="space-y-6 py-4">
      {/* Header */}
      <div className="glass-card p-6 border-l-4 border-l-[#FF5722] border-[#D4AF37]/30">
        <div className="flex items-center gap-3 mb-2">
          <Layers className="w-6 h-6 text-[#FF5722]" />
          <h2 className="font-serif text-2xl font-bold gold-gradient-text">
            {lang === 'en' ? 'Festival Series & Utsavam Collections' : 'బ్రహ్మోత్సవాలు & ప్రధాన ఉత్సవాల పరంపర'}
          </h2>
        </div>
        <p className="text-sm text-[#94A3B8] max-w-3xl">
          {lang === 'en'
            ? 'Discover multi-day celestial festival series, annual Brahmotsavams, Vasanthotsavams, and Float Festivals across all shrines.'
            : 'శ్రీవారి సాలకట్ల బ్రహ్మోత్సవాలు, వసంతోత్సవాలు, తెప్పోత్సవాలు మరియు అమ్మవారి బ్రహ్మోత్సవ పరంపర.'}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FESTIVAL_SERIES_LIST.map(ser => {
          const temple = TEMPLES.find(t => t.id === ser.templeId);

          return (
            <div key={ser.id} className="glass-card p-6 border border-[#D4AF37]/30 hover:border-[#FFD700] transition-all space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span 
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-bold text-black"
                    style={{ backgroundColor: temple?.color || '#D4AF37' }}
                  >
                    {lang === 'en' ? temple?.name : temple?.teluguName}
                  </span>
                  <span className="badge-gold text-xs">{ser.badge}</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-white mb-2">
                  {lang === 'en' ? ser.name : ser.nameTe}
                </h3>

                <div className="flex items-center gap-4 text-xs font-mono font-bold text-[#FFD700] mb-3">
                  <span>⏱️ {ser.duration}</span>
                  <span>🗓️ {ser.season}</span>
                  <span>✨ {ser.eventsCount} Events</span>
                </div>

                <p className="text-xs text-[#94A3B8] leading-relaxed bg-[#0B0E14] p-3 rounded-xl border border-white/5">
                  {lang === 'en' ? ser.description : ser.descriptionTe}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => onSelectSeries(ser.templeId)}
                  className="btn-gold text-xs py-1.5 px-3"
                >
                  <span>{lang === 'en' ? 'View Series Events' : 'ఉత్సవాలు చూడు'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
