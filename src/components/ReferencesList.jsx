import React from 'react';
import { BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';
import { REFERENCES_LIST } from '../data/mediaAndReferences';

export default function ReferencesList({ lang }) {
  return (
    <div className="space-y-6 py-4">
      {/* Header */}
      <div className="glass-card p-6 border-l-4 border-l-[#3A86EF] border-[#D4AF37]/30">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-6 h-6 text-[#3A86EF]" />
          <h2 className="font-serif text-2xl font-bold gold-gradient-text">
            {lang === 'en' ? 'Official References & Historical Literature' : 'అధికారిక ఆధారాలు & చారిత్రక గ్రంథాలు'}
          </h2>
        </div>
        <p className="text-sm text-[#94A3B8] max-w-3xl">
          {lang === 'en'
            ? 'Access historical manuscripts, temple manuals, Annamacharya sankirtana records, and epigraphical research.'
            : 'తిరుమల క్షేత్ర చరిత్ర, తాళ్లపాక అన్నమయ్య సంకీర్తనలు మరియు ప్రాచీన శాసనాల ఆధారాలు.'}
        </p>
      </div>

      {/* References Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {REFERENCES_LIST.map(ref => (
          <div key={ref.id} className="glass-card p-5 border border-[#D4AF37]/30 hover:border-[#FFD700] transition-all space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="badge-gold text-[10px] uppercase font-bold">{ref.type}</span>
              <span className="text-xs font-mono font-bold text-[#FFD700]">{ref.year}</span>
            </div>

            <h3 className="font-serif text-lg font-bold text-white leading-snug">
              {lang === 'en' ? ref.title : ref.titleTe}
            </h3>

            <p className="text-xs text-[#94A3B8] leading-relaxed bg-[#0B0E14] p-3 rounded-lg border border-white/5">
              {lang === 'en' ? ref.summary : ref.summaryTe}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-[#94A3B8]">
              <span>Publisher: {ref.publisher}</span>
              <a
                href={ref.url}
                target="_blank"
                rel="noreferrer"
                className="text-[#FFD700] hover:underline flex items-center gap-1 font-bold"
              >
                <span>Read More</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
