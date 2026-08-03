import React, { useState } from 'react';
import { Image as ImageIcon, Video, Filter, X, Sparkles, MapPin } from 'lucide-react';
import { MEDIA_ITEMS } from '../data/mediaAndReferences';
import { TEMPLES } from '../data/templeEvents';

export default function MediaGallery({ lang }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeMediaModal, setActiveMediaModal] = useState(null);

  const filteredMedia = MEDIA_ITEMS.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 py-4">
      {/* Header */}
      <div className="glass-card p-6 border-l-4 border-l-[#FFD700] border-[#D4AF37]/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <ImageIcon className="w-6 h-6 text-[#FFD700]" />
            <h2 className="font-serif text-2xl font-bold gold-gradient-text">
              {lang === 'en' ? 'Tirumala Utsavam Media Gallery' : 'తిరుమల ఉత్సవ దివ్య దృశ్యమాలిక'}
            </h2>
          </div>
          <p className="text-sm text-[#94A3B8]">
            {lang === 'en'
              ? 'Explore high-resolution media, Vahana Seva photography, and temple architecture galleries.'
              : 'శ్రీవారి వాహన సేవలు, బ్రహ్మోత్సవాల దివ్య చిత్రాలు మరియు శోభానవిత దృశ్యాలు.'}
          </p>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedia.map(item => {
          const temple = TEMPLES.find(t => t.id === item.templeId);
          return (
            <div
              key={item.id}
              onClick={() => setActiveMediaModal(item)}
              className="glass-card overflow-hidden border border-[#D4AF37]/30 hover:border-[#FFD700] cursor-pointer transition-all hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-black">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  <span 
                    className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-black shadow-md"
                    style={{ backgroundColor: temple?.color || '#D4AF37' }}
                  >
                    {lang === 'en' ? temple?.name : temple?.teluguName}
                  </span>

                  <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/60 text-[#FFD700] text-[10px] font-bold border border-[#D4AF37]/40">
                    {item.category}
                  </span>
                </div>

                <div className="p-4 space-y-1.5">
                  <h3 className="font-serif text-base font-bold text-white group-hover:text-[#FFD700] transition-colors leading-snug">
                    {lang === 'en' ? item.title : item.titleTe}
                  </h3>
                  <p className="text-xs text-[#94A3B8] line-clamp-2">
                    {lang === 'en' ? item.caption : item.captionTe}
                  </p>
                </div>
              </div>

              <div className="px-4 py-2 bg-[#0B0E14]/70 border-t border-white/10 text-[10px] text-[#94A3B8] flex items-center justify-between">
                <span>Attribution: {item.attribution}</span>
                <span className="text-[#FFD700] font-bold">View HD</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Preview Modal */}
      {activeMediaModal && (
        <div className="modal-overlay" onClick={() => setActiveMediaModal(null)}>
          <div 
            className="glass-card w-full max-w-3xl p-4 border-2 border-[#FFD700] animate-slide-up relative space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveMediaModal(null)}
              className="absolute top-3 right-3 text-[#94A3B8] hover:text-[#FFD700] p-2 rounded-full bg-[#141923] border border-[#D4AF37]/30 z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative rounded-xl overflow-hidden max-h-[60vh] bg-black flex items-center justify-center">
              <img
                src={activeMediaModal.url}
                alt={activeMediaModal.title}
                className="max-h-[60vh] w-auto object-contain"
              />
            </div>

            <div className="space-y-2 text-left">
              <h3 className="font-serif text-xl font-bold gold-gradient-text">
                {lang === 'en' ? activeMediaModal.title : activeMediaModal.titleTe}
              </h3>
              <p className="text-xs text-[#F4F6FB] bg-[#0B0E14] p-3 rounded-lg border border-[#D4AF37]/20 leading-relaxed">
                {lang === 'en' ? activeMediaModal.caption : activeMediaModal.captionTe}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
