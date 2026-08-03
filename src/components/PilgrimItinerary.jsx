import React from 'react';
import { Bookmark, Calendar, Trash2, Download, MapPin, Clock, ArrowRight } from 'lucide-react';
import { TEMPLES } from '../data/templeEvents';
import { downloadIcsFile } from '../utils/icsExport';

export default function PilgrimItinerary({ events = [], lang, savedEventIds, onToggleSave, onSelectEvent, onClearAll }) {
  const savedEvents = events.filter(evt => savedEventIds.includes(evt.id));

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="glass-card p-6 border-l-4 border-l-[#FFD700] border-[#D4AF37]/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Bookmark className="w-6 h-6 text-[#FFD700]" />
            <h2 className="font-serif text-2xl font-bold gold-gradient-text">
              {lang === 'en' ? 'My Saved Pilgrim Itinerary' : 'నా పర్యటన ప్రణాళిక'}
            </h2>
          </div>
          <p className="text-sm text-[#94A3B8]">
            {lang === 'en'
              ? 'Your personalized list of saved utsavams, vahana sevas, and rituals. Export them to your calendar or keep track during your Tirumala trip.'
              : 'మీరు ఎంచుకున్న ఉత్సవాలు మరియు సేవలు.'}
          </p>
        </div>

        {savedEvents.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={onClearAll}
              className="px-3 py-2 rounded-lg bg-red-950/40 border border-red-500/40 text-red-300 hover:bg-red-900/50 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>{lang === 'en' ? 'Clear All' : 'అన్నీ తొలగించు'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Empty State */}
      {savedEvents.length === 0 ? (
        <div className="glass-card p-12 text-center space-y-4">
          <Bookmark className="w-12 h-12 text-[#94A3B8] mx-auto opacity-50" />
          <h3 className="font-serif text-xl font-bold text-white">
            {lang === 'en' ? 'Your itinerary is currently empty' : 'మీ షెడ్యూల్ ఖాళీగా ఉంది'}
          </h3>
          <p className="text-sm text-[#94A3B8] max-w-md mx-auto">
            {lang === 'en'
              ? 'Browse the Events Calendar and click the bookmark icon on any festival or seva to save it here.'
              : 'ఉత్సవ క్యాలెండర్ నుండి మీకు నచ్చిన ఉత్సవాలను సేవ్ చేయండి.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedEvents.map(evt => {
            const temple = TEMPLES.find(t => t.id === evt.templeId);

            return (
              <div 
                key={evt.id}
                className="glass-card p-5 border border-[#D4AF37]/40 flex flex-col justify-between space-y-4 hover:border-[#FFD700] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span 
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-black"
                      style={{ backgroundColor: temple?.color || '#D4AF37' }}
                    >
                      {lang === 'en' ? temple?.name : temple?.teluguName}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#FFD700]">{evt.startDate}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-white mb-2">
                    {lang === 'en' ? evt.title : evt.titleTe}
                  </h3>

                  <div className="space-y-1 text-xs text-[#94A3B8]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#FFB703]" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#3A86EF]" />
                      <span>{evt.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                  <button
                    onClick={() => onSelectEvent(evt)}
                    className="text-[#FFD700] font-bold hover:underline flex items-center gap-1"
                  >
                    <span>{lang === 'en' ? 'Details' : 'వివరాలు'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => downloadIcsFile(evt)}
                      className="p-2 rounded-lg bg-[#141923] border border-[#D4AF37]/30 text-[#FFD700] hover:bg-[#D4AF37]/20"
                      title="Download .ICS"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onToggleSave(evt)}
                      className="p-2 rounded-lg bg-red-950/40 border border-red-500/40 text-red-300 hover:bg-red-900/50"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
