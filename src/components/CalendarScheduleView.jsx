import React, { useState } from 'react';
import { Calendar, MapPin, Share2, Edit, Trash2, Image as ImageIcon, ChevronRight, Clock } from 'lucide-react';
import { TEMPLES } from '../data/templeEvents';
import { getEventStatus, openGoogleCalendar, shareToWhatsApp } from '../utils/eventStatus';

export default function CalendarScheduleView({
  events,
  lang,
  onSelectEvent,
  selectedTemple,
  isAdminLoggedIn,
  onEditEvent,
  onDeleteEvent
}) {
  const [activeMonthFilter, setActiveMonthFilter] = useState('all');

  // Helper to format date string 'YYYY-MM-DD' into Day of Week, Day Num, Month Short Name
  const formatScheduleDate = (dateStr) => {
    try {
      const [y, m, d] = dateStr.split('-').map(Number);
      const dateObj = new Date(y, m - 1, d);
      const daysEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const daysTe = ['ఆది', 'సోమ', 'మంగళ', 'బుధ', 'గురు', 'శుక్ర', 'శని'];
      const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthsTe = ['జన', 'ఫిబ్ర', 'మార్చి', 'ఏప్రి', 'మే', 'జూన్', 'జూలై', 'ఆగ', 'సెప్టెం', 'అక్టో', 'నవం', 'డిసెం'];

      const dayOfWeek = lang === 'en' ? daysEn[dateObj.getDay()] : daysTe[dateObj.getDay()];
      const dayNum = dateObj.getDate();
      const monthShort = lang === 'en' ? monthsEn[dateObj.getMonth()] : monthsTe[dateObj.getMonth()];
      const monthFull = dateObj.toLocaleString(lang === 'en' ? 'en-US' : 'te-IN', { month: 'long', year: 'numeric' });

      return { dayOfWeek, dayNum, monthShort, monthFull, year: y, monthIndex: m - 1, dateObj };
    } catch {
      return { dayOfWeek: '', dayNum: dateStr, monthShort: '', monthFull: '', year: 2026, monthIndex: 0, dateObj: new Date() };
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];

  // Sort events chronologically by start date
  const sortedEvents = [...events].sort((a, b) => a.startDate.localeCompare(b.startDate));

  // Group events by Month ("August 2026", "September 2026", etc.)
  const eventsByMonth = sortedEvents.reduce((acc, evt) => {
    const { monthFull } = formatScheduleDate(evt.startDate);
    const key = monthFull || evt.startDate.substring(0, 7);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(evt);
    return acc;
  }, {});

  const monthKeys = Object.keys(eventsByMonth);

  return (
    <div className="space-y-6">
      {/* Schedule View Banner */}
      <div className="glass-card p-4 border-2 border-[#D4AF37]/40 flex flex-wrap items-center justify-between gap-3 bg-[#0B0E14] shadow-xl">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#FF5722]/20 border border-[#FF5722]/50 flex items-center justify-center text-[#FF5722]">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold gold-gradient-text">
              {lang === 'en' ? 'Google Schedule View' : 'షెడ్యూల్ దర్శిని'}
            </h3>
            <p className="text-[11px] text-[#94A3B8]">
              {lang === 'en' ? 'Chronological agenda layout optimized for easy mobile reading' : 'మొబైల్ వీక్షణకు అనుకూలమైన కాలక్రమ ఉత్సవాల జాబితా'}
            </p>
          </div>
        </div>

        {/* Quick Month Filter Pills if multiple months */}
        {monthKeys.length > 1 && (
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setActiveMonthFilter('all')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                activeMonthFilter === 'all'
                  ? 'bg-[#FF5722] text-white shadow-md'
                  : 'bg-[#141923] text-[#94A3B8] hover:text-white border border-white/10'
              }`}
            >
              {lang === 'en' ? 'All Months' : 'అన్ని నెలలు'}
            </button>
            {monthKeys.map(mKey => (
              <button
                key={mKey}
                onClick={() => setActiveMonthFilter(mKey)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 ${
                  activeMonthFilter === mKey
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black shadow-md'
                    : 'bg-[#141923] text-[#94A3B8] hover:text-[#FFD700] border border-white/10'
                }`}
              >
                {mKey}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Empty State */}
      {sortedEvents.length === 0 && (
        <div className="glass-card p-12 text-center text-[#94A3B8] space-y-3">
          <Calendar className="w-12 h-12 mx-auto text-[#D4AF37]/40 animate-pulse" />
          <h3 className="font-serif text-lg font-bold text-white">
            {lang === 'en' ? 'No Schedule Events Found' : 'ఏ ఉత్సవాలు లభించలేదు'}
          </h3>
        </div>
      )}

      {/* Chronological Month Sections */}
      {monthKeys.map(monthName => {
        if (activeMonthFilter !== 'all' && activeMonthFilter !== monthName) return null;
        const monthEvents = eventsByMonth[monthName];

        return (
          <div key={monthName} className="space-y-3">
            {/* Month Sticky Header */}
            <div className="sticky top-16 z-20 bg-[#0B0E14]/95 backdrop-blur-md py-2 px-3 rounded-xl border-b border-[#D4AF37]/30 flex items-center justify-between shadow-md">
              <span className="font-serif font-extrabold text-sm sm:text-base text-[#FFD700] tracking-wide flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF5722]"></span>
                {monthName}
              </span>
              <span className="text-[11px] font-mono font-bold text-[#94A3B8] bg-[#141923] px-2.5 py-0.5 rounded-full border border-white/10">
                {monthEvents.length} {lang === 'en' ? (monthEvents.length === 1 ? 'event' : 'events') : 'ఉత్సవాలు'}
              </span>
            </div>

            {/* Event List Items */}
            <div className="space-y-3 pl-1 sm:pl-2">
              {monthEvents.map(evt => {
                const dateInfo = formatScheduleDate(evt.startDate);
                const isToday = evt.startDate === todayStr;
                const temple = TEMPLES.find(t => t.id === evt.templeId);
                const statusObj = getEventStatus(evt.startDate, evt.endDate);

                // Collect images
                const evtImages = [];
                if (evt.images && Array.isArray(evt.images) && evt.images.length > 0) {
                  evt.images.forEach(img => {
                    if (typeof img === 'string' && img.trim()) evtImages.push(img.trim());
                    else if (img && img.url && img.url.trim()) evtImages.push(img.url.trim());
                  });
                }
                if (evtImages.length === 0 && evt.imageUrl) {
                  evtImages.push(evt.imageUrl.trim());
                }

                return (
                  <div
                    key={evt.id}
                    className="flex items-start gap-2.5 sm:gap-4 group cursor-pointer"
                    onClick={() => onSelectEvent(evt)}
                  >
                    {/* LEFT COLUMN: DAY OF WEEK & DATE CIRCLE */}
                    <div className="w-14 sm:w-16 shrink-0 flex flex-col items-center pt-1">
                      <span className="text-[11px] font-extrabold uppercase text-[#94A3B8]">
                        {dateInfo.dayOfWeek}
                      </span>
                      <div
                        className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-sm sm:text-base font-extrabold transition-transform group-hover:scale-110 shadow-md mt-0.5 ${
                          isToday
                            ? 'bg-gradient-to-tr from-[#FF5722] to-[#FFD700] text-black ring-4 ring-[#FF5722]/30 animate-pulse'
                            : 'bg-[#141923] text-white border border-[#D4AF37]/50'
                        }`}
                      >
                        {dateInfo.dayNum}
                      </div>
                    </div>

                    {/* RIGHT COLUMN: GOOGLE CALENDAR SCHEDULE CARD */}
                    <div
                      className="flex-grow glass-card p-3.5 sm:p-4 rounded-2xl border border-white/10 hover:border-[#FFD700] transition-all bg-[#0B0E14] shadow-lg relative overflow-hidden flex flex-col sm:flex-row justify-between gap-3 group-hover:shadow-2xl"
                      style={{ borderLeft: `5px solid ${temple?.color || '#FFD700'}` }}
                    >
                      {/* Event Details */}
                      <div className="space-y-1.5 flex-grow">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span
                            className="px-2 py-0.5 rounded text-[10px] font-extrabold text-black shadow"
                            style={{ backgroundColor: temple?.color || '#FFD700' }}
                          >
                            {lang === 'en' ? temple?.name : temple?.nameTe}
                          </span>

                          <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${statusObj.colorClass}`}>
                            {lang === 'en' ? statusObj.status : statusObj.statusTe}
                          </span>

                          {evtImages.length > 0 && (
                            <span className="px-1.5 py-0.5 rounded bg-black/60 text-[#FFD700] text-[10px] font-bold flex items-center gap-1 border border-[#FFD700]/30">
                              <ImageIcon className="w-3 h-3" />
                              <span>{evtImages.length}</span>
                            </span>
                          )}
                        </div>

                        <h4 className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-[#FFD700] transition-colors leading-snug">
                          {lang === 'en' ? evt.title : (evt.titleTe || evt.title)}
                        </h4>

                        {/* Date Range / Vahanam */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#94A3B8]">
                          <span className="font-mono text-[#FFD700] font-bold flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-[#FF5722]" />
                            {evt.startDate === evt.endDate
                              ? evt.startDate
                              : `${evt.startDate} to ${evt.endDate}`}
                          </span>

                          {evt.vahanam && (
                            <span className="text-[#FF5722] font-semibold">
                              🛕 {evt.vahanam}
                            </span>
                          )}
                        </div>

                        {evt.description && (
                          <p className="text-xs text-[#94A3B8]/90 line-clamp-2 leading-relaxed">
                            {lang === 'en' ? evt.description : (evt.descriptionTe || evt.description)}
                          </p>
                        )}
                      </div>

                      {/* Right Action Stack / Image Cover */}
                      <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 sm:border-l border-white/10 sm:pl-3">
                        {evtImages.length > 0 ? (
                          <div className="w-20 h-16 sm:w-24 sm:h-20 rounded-xl overflow-hidden border border-white/20 relative shadow shrink-0">
                            <img
                              src={evtImages[0]}
                              alt={evt.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              onError={(e) => { e.target.parentElement.style.display = 'none'; }}
                            />
                            {evtImages.length > 1 && (
                              <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/80 text-[#FFD700] text-[8px] font-mono font-bold">
                                +{evtImages.length - 1}
                              </span>
                            )}
                          </div>
                        ) : null}

                        <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
                          {/* WhatsApp Share */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              shareToWhatsApp(evt, lang);
                            }}
                            className="p-1.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5B] text-black font-extrabold text-xs shadow"
                            title="Share to WhatsApp"
                          >
                            <Share2 className="w-3.5 h-3.5 text-black" />
                          </button>

                          {/* Google Calendar */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openGoogleCalendar(evt);
                            }}
                            className="p-1.5 rounded-lg bg-[#4285F4] hover:bg-[#3367D6] text-white font-extrabold text-xs shadow"
                            title="Add to Google Calendar"
                          >
                            <Calendar className="w-3.5 h-3.5 text-white" />
                          </button>

                          {/* Details Chevron */}
                          <span className="p-1.5 rounded-lg bg-[#141923] text-[#FFD700] group-hover:bg-[#FFD700] group-hover:text-black transition-colors">
                            <ChevronRight className="w-4 h-4" />
                          </span>

                          {/* Admin Controls */}
                          {isAdminLoggedIn && (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onEditEvent(evt);
                                }}
                                className="p-1.5 rounded bg-[#FF5722] text-white text-xs shadow hover:brightness-110"
                                title="Edit Event"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (window.confirm(`Delete event "${evt.title}"?`)) {
                                    onDeleteEvent(evt.id);
                                  }
                                }}
                                className="p-1.5 rounded bg-red-900 text-white text-xs shadow hover:bg-red-700"
                                title="Delete Event"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
