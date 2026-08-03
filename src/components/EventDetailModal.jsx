import React, { useState } from 'react';
import { TEMPLES } from '../data/templeEvents';
import { getEventStatus, openGoogleCalendar, downloadIcsCalendarFile, shareToWhatsApp, normalizeImageUrl } from '../utils/eventStatus';
import { X, Calendar, MapPin, Tag, Share2, Edit, Download, ChevronLeft, ChevronRight, Maximize2, Camera, ExternalLink } from 'lucide-react';

export default function EventDetailModal({
  event,
  onClose,
  lang,
  isAdminLoggedIn,
  onEditEvent
}) {
  if (!event) return null;

  const temple = TEMPLES.find(t => t.id === event.templeId);
  const statusObj = getEventStatus(event.startDate, event.endDate);

  // Gallery & Lightbox State
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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

  const activeImage = allImages[activeImgIndex] || allImages[0] || null;

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

          {/* Action Buttons: Google Calendar, .ics Download, and 1-Click WhatsApp Share */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5">
            
            <div className="flex flex-wrap items-center gap-2">
              {/* 1-CLICK GOOGLE CALENDAR BUTTON */}
              <button
                onClick={() => openGoogleCalendar(event)}
                className="px-3.5 py-2 rounded-xl bg-[#4285F4] hover:bg-[#3367D6] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                title="Add directly to Google Calendar"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>Google Calendar</span>
              </button>

              {/* .ICS DOWNLOAD BUTTON */}
              <button
                onClick={() => downloadIcsCalendarFile(event)}
                className="px-3.5 py-2 rounded-xl bg-[#141923] border border-[#D4AF37]/50 text-[#FFD700] hover:bg-[#D4AF37]/20 font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                title="Download .ics file for Outlook & Apple Calendar"
              >
                <Download className="w-4 h-4 text-[#FFD700]" />
                <span>.ics File</span>
              </button>
            </div>

            {/* 1-CLICK WHATSAPP SHARE BUTTON (Mobile & Computer) */}
            <button
              onClick={() => shareToWhatsApp(event, lang)}
              className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5B] text-black font-extrabold text-xs flex items-center gap-2 shadow-lg active:scale-95 transition-all"
              title="Share event directly to WhatsApp"
            >
              <Share2 className="w-4 h-4 text-black" />
              <span>{lang === 'en' ? 'Share to WhatsApp' : 'WhatsApp ద్వారా పంచుకోండి'}</span>
            </button>

          </div>
          </div>
        </div>
      </div>

        {/* ENLARGED FULL SCREEN LIGHTBOX MODAL */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[999999] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-3 sm:p-6"
          onClick={() => setIsLightboxOpen(false)}
          onTouchStart={(e) => {
            if (e.touches && e.touches.length === 1) {
              window._lbTouchX = e.touches[0].clientX;
            }
          }}
          onTouchEnd={(e) => {
            if (e.changedTouches && e.changedTouches.length === 1 && window._lbTouchX) {
              const diffX = window._lbTouchX - e.changedTouches[0].clientX;
              if (Math.abs(diffX) > 40) {
                if (diffX > 0) handleLightboxNext(e);
                else handleLightboxPrev(e);
              }
            }
          }}
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
