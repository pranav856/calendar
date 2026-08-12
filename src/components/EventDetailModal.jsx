import { useEffect } from 'react';
import React, { useState, useMemo } from 'react';
import { TEMPLES } from '../data/templeEvents';
import { UTSAVA_GLOSSARY_TERMS } from '../data/utsavaGlossary';
import { getEventStatus, openGoogleCalendar, openAppleCalendar, shareToPlatform, normalizeImageUrl } from '../utils/eventStatus';
import { X, Calendar, MapPin, Tag, Share2, Edit, ChevronLeft, ChevronRight, BookOpen, ExternalLink, Copy, Check } from 'lucide-react';

export default function EventDetailModal({
  event,
  onClose,
  lang,
  isAdminLoggedIn,
  onEditEvent,
  onNavigateToGlossary
}) {

    useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  document.addEventListener('keydown', handleKeyDown);

  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}, [onClose]);


  if (!event) return null;

  const temple = TEMPLES.find(t => t.id === event.templeId);
  const statusObj = getEventStatus(event.startDate, event.endDate);

  // Share dropdown menu state
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Gallery & Lightbox State
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Detect matching glossary terms for this event (Sorted Ascending)
  const matchingGlossaryTerms = useMemo(() => {
    if (!event) return [];
    const fullText = `${event.title || ''} ${event.titleTe || ''} ${event.description || ''} ${event.descriptionTe || ''} ${event.vahanam || ''}`.toLowerCase();
    
    if (!Array.isArray(UTSAVA_GLOSSARY_TERMS)) return [];

    const matched = UTSAVA_GLOSSARY_TERMS.filter(gTerm => {
      if (!gTerm) return false;
      const matchTermEn = (gTerm.term || '').toLowerCase();
      const matchTermTe = (gTerm.termTe || '').toLowerCase();
      const matchesKeyword = Array.isArray(gTerm.relatedEventKeywords) && gTerm.relatedEventKeywords.some(kw => kw && fullText.includes(String(kw).toLowerCase()));
      return (matchTermEn && fullText.includes(matchTermEn)) || (matchTermTe && fullText.includes(matchTermTe)) || matchesKeyword;
    });

    return matched.sort((a, b) => {
      const nameA = (lang === 'en' ? a.term : a.termTe) || '';
      const nameB = (lang === 'en' ? b.term : b.termTe) || '';
      return nameA.localeCompare(nameB, lang === 'te' ? 'te' : 'en');
    });
  }, [event, lang]);

  // Robust Defensive Images List Normalization
  const allImages = [];
  if (event.images) {
    let rawImages = event.images;
    if (typeof rawImages === 'string') {
      try {
        rawImages = JSON.parse(rawImages);
      } catch {
        rawImages = [rawImages];
      }
    }
    if (Array.isArray(rawImages)) {
      rawImages.forEach(img => {
        if (typeof img === 'string' && img.trim() !== '') {
          allImages.push({ url: normalizeImageUrl(img.trim()), caption: event.title || '' });
        } else if (img && typeof img === 'object' && img.url && String(img.url).trim() !== '') {
          allImages.push({ url: normalizeImageUrl(String(img.url).trim()), caption: img.caption || '' });
        }
      });
    }
  }
  if (allImages.length === 0 && event.imageUrl && String(event.imageUrl).trim() !== '') {
    allImages.push({ url: normalizeImageUrl(String(event.imageUrl).trim()), caption: event.title || '' });
  }

  const activeImage = allImages[activeImgIndex] || allImages[0] 
  const handlePrevImage = (e) => {
    e.stopPropagation();
    setActiveImgIndex(prev => (prev === 0 ? allImages.length - 1 : prev - 1));
  };
  const handleNextImage = (e) => {
    e.stopPropagation();
    setActiveImgIndex(prev => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handleLightboxPrev = (e) => {
    e.stopPropagation();
    setLightboxIndex(prev => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleLightboxNext = (e) => {
    e.stopPropagation();
    setLightboxIndex(prev => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handleShareClick = (platform) => {
    if (platform === 'copy') {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
    shareToPlatform(platform, event, lang);
    setIsShareMenuOpen(false);
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div 
          className="glass-card max-w-2xl w-full p-0 relative animate-slide-up bg-[#0B0E14] border-2 border-[#D4AF37]/50 shadow-2xl rounded-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 text-[#FFD700] hover:bg-black border border-[#D4AF37]/50 flex items-center justify-center transition-colors shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* EVENT GALLERY CAROUSEL (If images present) */}
          {allImages.length > 0 && activeImage && (
            <div className="relative w-full bg-[#141923]">
              {/* Main Active Image Display */}
              <div 
                onClick={() => {
                  setLightboxIndex(activeImgIndex);
                  setIsLightboxOpen(true);
                }}
                className="relative h-64 sm:h-80 w-full overflow-hidden cursor-pointer group"
                title="Click picture to expand full screen"
              >
                <img 
                  src={activeImage.url} 
                  alt={activeImage.caption || event.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-black/30"></div>

                {/* Next / Prev Navigation Overlay Arrows */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 text-[#FFD700] hover:bg-black border border-[#D4AF37]/40 flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 text-[#FFD700] hover:bg-black border border-[#D4AF37]/40 flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Image Caption & Counter Overlay */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2">
                  {activeImage.caption && (
                    <div className="px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[#FFD700] text-xs font-bold border border-[#D4AF37]/40 max-w-[80%] truncate">
                      📷 {activeImage.caption}
                    </div>
                  )}

                  {allImages.length > 1 && (
                    <div className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-white text-[11px] font-extrabold border border-white/20 ml-auto shrink-0 font-mono">
                      {activeImgIndex + 1} / {allImages.length}
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnails Strip if multiple images */}
              {allImages.length > 1 && (
                <div className="flex items-center gap-2 p-2.5 bg-[#0B0E14] overflow-x-auto no-scrollbar border-b border-[#D4AF37]/30">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIndex(idx)}
                      className={`h-12 w-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        activeImgIndex === idx
                          ? 'border-[#FFD700] ring-2 ring-[#FF5722] scale-105'
                          : 'border-white/20 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Header Badges & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-2 pr-10">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase shadow-md ${statusObj.colorClass}`}>
                {lang === 'en' ? statusObj.status : statusObj.statusTe}
              </span>

              <span 
                className="px-3 py-1 rounded-lg text-xs font-extrabold text-black shadow-md inline-block"
                style={{ backgroundColor: temple?.color || '#FFD700' }}
              >
                {lang === 'en' ? temple?.name : temple?.nameTe}
              </span>
            </div>

            {isAdminLoggedIn && (
              <button
                onClick={() => {
                  onClose();
                  onEditEvent(event);
                }}
                className="px-3 py-1 rounded-full bg-[#FF5722] text-white text-xs font-extrabold flex items-center gap-1 shadow-lg hover:brightness-110"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Event</span>
              </button>
            )}
          </div>

          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold gold-gradient-text">
              {lang === 'en' ? event.title : (event.titleTe || event.title)}
            </h2>

            {/* Date Indicator */}
            <div className="flex items-center gap-2 text-sm font-mono font-bold text-[#FFD700] mt-2">
              <Calendar className="w-4 h-4 text-[#FF5722]" />
              <span>
                {event.startDate === event.endDate
                  ? event.startDate
                  : `${event.startDate} to ${event.endDate}`}
              </span>
            </div>
          </div>

          {/* Full Description */}
          <div className="p-4 rounded-xl bg-[#141923] border border-[#D4AF37]/30 text-sm text-white/90 leading-relaxed space-y-2">
            <p className="whitespace-pre-line">
              {lang === 'en' ? event.description : (event.descriptionTe || event.description)}
            </p>
          </div>

          {/* Vehicle / Vahanam details if applicable */}
          {event.vahanam && (
            <div className="p-3 rounded-lg bg-[#FF5722]/10 border border-[#FF5722]/40 text-xs font-bold text-[#FF5722] flex items-center gap-2">
              <span>🛕 Vahanam / Procession Vehicle:</span>
              <span className="text-white">{event.vahanam}</span>
            </div>
          )}

          {/* CONTEXTUAL UTSAVAM TERMS EXPLAINED (Clicking navigates directly to Glossary focused on that term) */}
          {matchingGlossaryTerms.length > 0 && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#141923] to-[#1A1500] border border-[#FFD700]/40 space-y-2.5">
              <div className="flex items-center justify-between gap-2 text-xs font-extrabold text-[#FFD700] uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#FFD700]" />
                  <span>{lang === 'en' ? 'Utsavam Terms & Meanings' : 'ఈ ఉత్సవంలో కనిపించే పవిత్ర పదాలు'}</span>
                </div>
                <span className="text-[10px] text-[#94A3B8] font-normal lowercase">(click term to read full glossary)</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {matchingGlossaryTerms.map(term => (
                  <button
                    key={term.id}
                    onClick={() => {
                      onClose();
                      if (onNavigateToGlossary) {
                        onNavigateToGlossary(term.id);
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-black/80 hover:bg-[#FFD700] text-[#FFD700] hover:text-black border border-[#D4AF37]/50 transition-all flex items-center gap-1.5 shadow-sm group/badge"
                    title={`Click to read complete glossary entry for ${term.term}`}
                  >
                    <span>📖 {lang === 'en' ? term.term : term.termTe}</span>
                    <ExternalLink className="w-3 h-3 group-hover/badge:scale-110" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons: Google Calendar, Apple Calendar (100% Crisp Visible Text), and Official Social Logos Share */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5">
            
            <div className="flex flex-wrap items-center gap-2">
              {/* GOOGLE CALENDAR BUTTON */}
              <button
                onClick={() => openGoogleCalendar(event)}
                className="px-3.5 py-2 rounded-xl bg-[#4285F4] hover:bg-[#3367D6] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                title="Add to Google Calendar"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span className="text-white font-extrabold" style={{ color: '#FFFFFF' }}>Google Calendar</span>
              </button>

              {/* APPLE CALENDAR BUTTON (HIGH CONTRAST GOLD & BLACK) */}
              <button
                onClick={() => openAppleCalendar(event)}
                className="px-3.5 py-2 rounded-xl bg-black border-2 border-[#FFD700] hover:bg-slate-900 text-[#FFD700] font-extrabold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                title="Direct to Apple Calendar"
              >
                <span className="text-base">🍏</span>
                <span className="font-extrabold text-[#FFD700]">Apple Calendar</span>
              </button>
            </div>

            {/* EXPANDED SOCIAL SHARE DROPDOWN MENU WITH REAL OFFICIAL BRAND LOGOS */}
            <div className="relative">
              <button
                onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#FFD700] text-black font-extrabold text-xs flex items-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-black" />
                <span>{lang === 'en' ? 'Share Event' : 'పంచుకోండి'}</span>
              </button>

              {isShareMenuOpen && (
                <div className="
  absolute right-0 bottom-12
  w-60
  bg-[#141923]
  light-theme:bg-white
  border-2 border-[#FFD700]
  light-theme:border-[#D4AF37]
  rounded-2xl
  shadow-2xl
  p-2
  space-y-1
  z-50
  animate-scale-up
">
                  
                  {/* WHATSAPP */}
                  <button
                    onClick={() => handleShareClick('whatsapp')}
                    className="
  w-full text-left px-3 py-2.5 rounded-xl
  hover:bg-green-50
  light-theme:hover:bg-green-50
  hover:bg-white/10
  text-[#166534]
  light-theme:text-[#166534]
  text-xs font-bold
  flex items-center gap-2.5
  transition-colors
"
                  >
                    <svg className="w-4 h-4 text-[#25D366] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.149 4.194 4.306-1.129z"/>
                    </svg>
                    <span style={{ color: '#25D366' }}>WhatsApp</span>
                  </button>

                  {/* X(TWITTER)  */}
                  <button
                    onClick={() => handleShareClick('x')}
                    className="
  w-full text-left px-3 py-2.5 rounded-xl
  hover:bg-slate-100
  light-theme:hover:bg-slate-100
  text-[#111827]
  text-xs font-bold
  flex items-center gap-2.5
  transition-colors
"
                  >
                   <svg
  className="w-4 h-4 shrink-0"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M18.244 2.25H21.5L14.39 10.37L22.75 21.75H16.2L11.07 14.85L5.17 21.75H1.91L9.52 13.05L1.5 2.25H8.22L12.86 8.55L18.244 2.25ZM17.1 19.75H18.9L7.24 4.15H5.31L17.1 19.75Z"
    fill="currentColor"
  />
</svg>
                    <span className="text-[#111827] font-bold">
  X (Twitter)
</span>
                  </button>

                  {/* FACEBOOK */}
                  <button
                    onClick={() => handleShareClick('facebook')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-xs font-bold text-white flex items-center gap-2.5 transition-colors"
                  >
                    <svg className="w-4 h-4 text-[#1877F2] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="text-[#1877F2] font-bold">
  Facebook
</span>
                  </button>

                  {/* REDDIT */}
                  <button
                    onClick={() => handleShareClick('reddit')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-xs font-bold text-white flex items-center gap-2.5 transition-colors"
                  >
                    <svg className="w-4 h-4 text-[#FF4500] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.196-.491.956 0 1.733.777 1.733 1.734 0 .658-.363 1.222-.898 1.516.02.179.034.363.034.55 0 2.8-3.32 5.07-7.414 5.07-4.095 0-7.416-2.27-7.416-5.07 0-.18.013-.362.033-.54-.53-.294-.89-.855-.89-1.515 0-.957.777-1.734 1.734-1.734.469 0 .89.182 1.198.49 1.193-.855 2.846-1.417 4.667-1.489l.926-4.343 3.32.697a1.246 1.246 0 0 1 1.252-1.144z"/>
                    </svg>
                    <span className="text-[#C2410C] font-bold">
  Reddit
</span>
                  </button>

                  {/* INSTAGRAM */}
                  <button
                    onClick={() => handleShareClick('instagram')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-xs font-bold text-white flex items-center gap-2.5 transition-colors"
                  >
                    <svg className="w-4 h-4 text-[#E4405F] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span className="text-[#C0265E] font-bold">
  Instagram
</span>
                  </button>

                  {/* THREADS */}
                  <button
                    onClick={() => handleShareClick('threads')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-xs font-bold text-white flex items-center gap-2.5 transition-colors"
                  >
                    <svg
  className="w-4 h-4 shrink-0"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M17.2 11.1c-.2-3.1-2-5.1-5.2-5.1-3.4 0-5.4 2-5.4 5.9 0 4.2 2.1 6.5 5.8 6.5 3.2 0 5.2-1.6 5.2-4.1 0-2.3-1.7-3.7-4.4-3.7-2.2 0-3.5 1-3.5 2.5 0 1.2 1 2 2.3 2 1.2 0 2-.6 2-1.6 0-.8-.6-1.3-1.6-1.3"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
                    <span className="text-[#111827] font-bold">
  Threads
</span>
                  </button>

                  {/* COPY LINK & TEXT */}
                  <button
                    onClick={() => handleShareClick('copy')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-xs font-bold text-[#FFD700] flex items-center gap-2.5 border-t border-white/10 pt-2 transition-colors"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-green-400 shrink-0" /> : <Copy className="w-4 h-4 text-[#B45309] shrink-0" />}
                    <span className="text-green-700 font-bold">
  {copiedLink ? 'Copied!' : 'Copy Link & Text'}
</span>
                  </button>

                </div>
              )}
            </div>

          </div>
          </div>
        </div>
      </div>

        {/* ENLARGED FULL SCREEN LIGHTBOX MODAL */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[999999] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-3 sm:p-6"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Lightbox Top Header */}
          <div className="flex items-center justify-between z-10 w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-[#FFD700] text-sm sm:text-base">
                {event.title}
              </span>
              {allImages.length > 1 && (
                <span className="px-2.5 py-0.5 rounded bg-white/10 text-xs font-mono font-bold text-[#94A3B8]">
                  {lightboxIndex + 1} / {allImages.length}
                </span>
              )}
            </div>

            <button
              onClick={() => setIsLightboxOpen(false)}
              className="px-3 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs transition-all flex items-center gap-1 shadow-lg ml-auto"
              title="Close enlarged view"
            >
              <X className="w-5 h-5" />
              <span>Close</span>
            </button>
          </div>

          {/* Lightbox Main Image & Navigation Arrows */}
          <div 
            className="relative flex-grow flex items-center justify-center my-2 sm:my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={allImages[lightboxIndex].url} 
              alt={allImages[lightboxIndex].caption || event.title} 
              className="max-h-[80vh] max-w-full object-contain shadow-2xl rounded-xl border border-white/20 animate-scale-up"
            />

            {allImages.length > 1 && (
              <>
                <button
                  onClick={handleLightboxPrev}
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/80 text-[#FFD700] hover:bg-black border border-[#D4AF37] flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95"
                  title="Previous photo"
                >
                  <ChevronLeft className="w-7 h-7 sm:w-9 sm:h-9" />
                </button>

                <button
                  onClick={handleLightboxNext}
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/80 text-[#FFD700] hover:bg-black border border-[#D4AF37] flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95"
                  title="Next photo"
                >
                  <ChevronRight className="w-7 h-7 sm:w-9 sm:h-9" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Bottom Caption Bar */}
          <div className="text-center z-10 max-w-2xl mx-auto w-full" onClick={(e) => e.stopPropagation()}>
            {allImages[lightboxIndex].caption ? (
              <div className="p-3 rounded-xl bg-black/80 border border-[#D4AF37]/40 text-[#FFD700] font-bold text-xs sm:text-sm shadow-xl">
                📷 {allImages[lightboxIndex].caption}
              </div>
            ) : (
              <div className="text-xs text-[#94A3B8] font-mono">
                Tap ✕ Close or click anywhere outside to return
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
