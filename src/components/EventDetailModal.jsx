import React from 'react';
import { TEMPLES } from '../data/templeEvents';
import { getEventStatus, downloadIcsCalendarFile, openGoogleCalendar, shareToWhatsApp } from '../utils/eventStatus';
import { X, Calendar, MapPin, Tag, Share2, Edit, Download } from 'lucide-react';

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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Check out ${event.title} at ${temple?.name || 'Tirumala'}!`,
        url: window.location.href,
      }).catch(err => console.error(err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(lang === 'en' ? 'Portal link copied to clipboard!' : 'లింక్ కాపీ చేయబడింది!');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-card max-w-2xl w-full p-0 relative animate-slide-up bg-[#0B0E14] border-2 border-[#D4AF37]/50 shadow-2xl rounded-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-[#FFD700] hover:bg-black border border-[#D4AF37]/50 flex items-center justify-center transition-colors shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Header (Only rendered if custom imageUrl is provided by Admin) */}
        {event.imageUrl && (
          <div className="relative h-64 w-full bg-[#141923]">
            <img 
              src={event.imageUrl} 
              alt={event.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-black/40 to-transparent"></div>
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
  );
}
