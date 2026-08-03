import React from 'react';
import { HelpCircle, ShieldAlert, Shirt, Utensils, Bus, PhoneCall, CheckCircle } from 'lucide-react';
import { PILGRIM_TIPS } from '../data/templeEvents';

export default function PilgrimGuide({ lang }) {
  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="glass-card p-6 border-l-4 border-l-[#3A86EF] border-[#D4AF37]/30">
        <div className="flex items-center gap-3 mb-2">
          <HelpCircle className="w-6 h-6 text-[#3A86EF]" />
          <h2 className="font-serif text-2xl font-bold gold-gradient-text">
            {lang === 'en' ? 'Pilgrim Guide, Dress Code & TTD Utilities' : 'భక్తుల మార్గదర్శకము & సదుపాయాలు'}
          </h2>
        </div>
        <p className="text-sm text-[#94A3B8] max-w-3xl">
          {lang === 'en'
            ? 'Essential guidelines for temple entry, sacred dress code, electronic storage rules, free transport, and official helpline numbers.'
            : 'శ్రీవారి దర్శన నియమాలు, సాంప్రదాయ దుస్తులు, ఉచిత రవాణా మరియు టిటిడి సేవాలైన్ వివరాలు.'}
        </p>
      </div>

      {/* Grid of Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PILGRIM_TIPS.map((tip, idx) => (
          <div key={idx} className="glass-card p-6 border border-[#D4AF37]/30 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center text-[#FFD700]">
                {idx === 0 && <Shirt className="w-5 h-5" />}
                {idx === 1 && <Utensils className="w-5 h-5" />}
                {idx === 2 && <ShieldAlert className="w-5 h-5" />}
                {idx === 3 && <Bus className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white">
                  {lang === 'en' ? tip.title : tip.titleTe}
                </h3>
              </div>
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              {tip.content}
            </p>
          </div>
        ))}
      </div>

      {/* Official Helplines & Counters Box */}
      <div className="glass-card p-6 border-2 border-[#FFD700]/40 bg-gradient-to-r from-[#141923] via-[#0B0E14] to-[#141923]">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-[#FF5722]" />
              <span>{lang === 'en' ? 'TTD Official Pilgrim Helpline (24x7)' : 'టిటిడి 24x7 భక్తజన హెల్ప్‌లైన్'}</span>
            </h3>
            <p className="text-xs text-[#94A3B8]">
              {lang === 'en'
                ? 'For darshan updates, cottage allocation status, and urgent pilgrimage assistance:'
                : 'దర్శనం సమాచారం మరియు అత్యవసర సహాయం కోసం:'}
            </p>
            <div className="flex flex-wrap gap-4 text-sm font-mono font-bold text-[#FFD700]">
              <span className="bg-[#0B0E14] px-3 py-1.5 rounded-lg border border-[#D4AF37]/30">📞 1800-425-4141 (Toll Free)</span>
              <span className="bg-[#0B0E14] px-3 py-1.5 rounded-lg border border-[#D4AF37]/30">📞 0877-2277777</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#F4F6FB]">
              <CheckCircle className="w-4 h-4 text-[#FFD700]" />
              <span>Official TTD Portal: tirupatibalaji.ap.gov.in</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#F4F6FB]">
              <CheckCircle className="w-4 h-4 text-[#FFD700]" />
              <span>Srivari Sevak Volunteers active at all 7 shrines</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
