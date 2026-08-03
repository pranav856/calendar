import React, { useState } from 'react';
import { TEMPLES } from '../data/templeEvents';
import { getEventStatus, openGoogleCalendar, downloadIcsCalendarFile, shareToWhatsApp, normalizeImageUrl } from '../utils/eventStatus';
import { exportPanchangamPdf } from '../utils/pdfExport';
import CalendarMonthGrid from './CalendarMonthGrid';
import CalendarScheduleView from './CalendarScheduleView';
import { Calendar, Filter, Tag, Edit, Download, Plus, Trash2, FileText, Search, X as ClearIcon, Share2, List } from 'lucide-react';

export default function CalendarView({
  events,
  lang,
  selectedTemple,
  setSelectedTemple,
  onSelectEvent,
  isAdminLoggedIn,
  onEditEvent,
  onDeleteEvent,
  onOpenAddEvent
}) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'schedule' | 'cards'
  const [selectedMonthFilter, setSelectedMonthFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter events based on temple selection, month filter, and search query
  const filteredEvents = events.filter(evt => {
    // Temple filter
    if (selectedTemple !== 'all' && evt.templeId !== selectedTemple) {
      return false;
    }

    // Month filter
    if (selectedMonthFilter !== 'all') {
      const evtMonth = evt.startDate.substring(0, 7); // 'YYYY-MM'
      if (evtMonth !== selectedMonthFilter) {
        return false;
      }
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const title = (evt.title || '').toLowerCase();
      const titleTe = (evt.titleTe || '').toLowerCase();
      const location = (evt.location || '').toLowerCase();
      const description = (evt.description || '').toLowerCase();
      const descriptionTe = (evt.descriptionTe || '').toLowerCase();
      const vahanam = (evt.vahanam || '').toLowerCase();
      if (
        !title.includes(q) &&
        !titleTe.includes(q) &&
        !location.includes(q) &&
        !description.includes(q) &&
        !descriptionTe.includes(q) &&
        !vahanam.includes(q)
      ) {
        return false;
      }
    }

    return true;
  });

  return (
    <div id="calendar-view-container" className="space-y-6 scroll-mt-24">
      
      {/* Search & Filter Control Deck */}
      <div className="glass-card p-4 sm:p-5 border-2 border-[#D4AF37]/40 space-y-4 shadow-xl w-full rounded-2xl">
        
        {/* Top Control Bar: Title + Search Bar + Controls */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 w-full">
          
          <div className="flex items-center gap-3 w-full lg:w-auto shrink-0">
            <span className="font-serif text-lg sm:text-2xl font-extrabold gold-gradient-text shrink-0">
              {lang === 'en' ? 'Temple Utsavams' : 'దేవాలయాల ఉత్సవాలు'}
            </span>
          </div>

          {/* REAL-TIME LIVE SEARCH BAR */}
          <div className="relative flex-grow max-w-md w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-[#FFD700]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'en' ? 'Search festival, ritual or vehicle (e.g. Garuda, Kalyanam)...' : 'ఉత్సవం, వాహనం లేదా సేవ వెతకండి...'}
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#141923] border border-[#D4AF37]/60 text-white placeholder-[#94A3B8] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FFD700] shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-[#94A3B8] hover:text-[#FFD700]"
                title="Clear search"
              >
                <ClearIcon className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Controls Right Group: (Admin ➕ Add Event) + View Mode Switcher */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-end">
            
            {/* PDF Export Button */}
            <button
              onClick={() => exportPanchangamPdf({
                events: filteredEvents,
                selectedMonth: selectedMonthFilter,
                selectedTemple,
                lang
              })}
              title="Download Printable PDF Calendar"
              className="px-3 py-2 rounded-xl bg-[#141923] border border-[#D4AF37]/60 text-[#FFD700] hover:bg-[#D4AF37]/20 font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-[#FFD700]" />
              <span>{lang === 'en' ? 'Export PDF' : 'PDF నివేదిక'}</span>
            </button>
            
            {/* ADMIN LIVE ➕ ADD EVENT BUTTON */}
            {isAdminLoggedIn && (
              <button
                onClick={onOpenAddEvent}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#FFD700] text-black font-extrabold text-xs flex items-center gap-1.5 shadow-lg hover:brightness-110 active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>➕ Add Event Live</span>
              </button>
            )}

            {/* 3-Way View Mode Switcher: Month View | Schedule View | Cards View */}
            <div className="flex bg-[#141923] p-1 rounded-xl border border-[#D4AF37]/40 max-w-full overflow-x-auto no-scrollbar">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all shrink-0 ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black shadow-md'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
                title="Month Grid View"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Month View' : 'నెల క్యాలెండర్'}</span>
              </button>

              <button
                onClick={() => setViewMode('schedule')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all shrink-0 ${
                  viewMode === 'schedule'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black shadow-md'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
                title="Schedule Agenda View"
              >
                <List className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Schedule View' : 'షెడ్యూల్'}</span>
              </button>

              <button
                onClick={() => setViewMode('cards')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all shrink-0 ${
                  viewMode === 'cards'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black shadow-md'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
                title="Event Cards View"
              >
                <Tag className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Cards' : 'కార్డులు'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Filter Bar: Temple Filter + Month Filter */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/10 text-xs">
          
          <span className="text-[#FFD700] font-bold flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Temple Filter:' : 'క్షేత్రము:'}</span>
          </span>

          {/* All Temples Pill */}
          <button
            onClick={() => setSelectedTemple('all')}
            className={`px-3 py-1 rounded-full font-bold transition-all ${
              selectedTemple === 'all'
                ? 'bg-[#FF5722] text-white shadow'
                : 'bg-[#141923] text-[#94A3B8] hover:text-white border border-white/10'
            }`}
          >
            {lang === 'en' ? 'All Temples (సప్త క్షేత్రాలు)' : 'అన్ని ఆలయాలు'}
          </button>

          {/* Individual Temple Pills */}
          {TEMPLES.map(temple => (
            <button
              key={temple.id}
              onClick={() => setSelectedTemple(temple.id)}
              className={`px-3 py-1 rounded-full font-bold text-xs transition-all flex items-center gap-1.5 max-w-full text-left truncate shrink-0 sm:shrink ${
                selectedTemple === temple.id
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black shadow-md'
                  : 'bg-[#141923] text-[#94A3B8] hover:text-[#FFD700] border border-white/10'
              }`}
            >
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: temple.color }}></span>
              <span className="truncate">{lang === 'en' ? temple.name : temple.nameTe}</span>
            </button>
          ))}
        </div>

      </div>

      {/* RENDER VIEW MODE */}
      {viewMode === 'grid' ? (
        <CalendarMonthGrid
          events={filteredEvents}
          lang={lang}
          onSelectEvent={onSelectEvent}
          selectedTemple={selectedTemple}
        />
      ) : viewMode === 'schedule' ? (
        <CalendarScheduleView
          events={filteredEvents}
          lang={lang}
          onSelectEvent={onSelectEvent}
          selectedTemple={selectedTemple}
          isAdminLoggedIn={isAdminLoggedIn}
          onEditEvent={onEditEvent}
          onDeleteEvent={onDeleteEvent}
        />
      ) : (
        /* EVENT CARDS LIST VIEW WITH INLINE ADMIN EDIT & DELETE BUTTONS */
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#94A3B8]">
            <span>
              {lang === 'en'
                ? `Showing ${filteredEvents.length} events`
                : `${filteredEvents.length} ఉత్సవాలు కనిపించాయి`}
            </span>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="glass-card p-12 text-center text-[#94A3B8] space-y-3">
              <Calendar className="w-12 h-12 mx-auto text-[#D4AF37]/40 animate-pulse" />
              <h3 className="font-serif text-lg font-bold text-white">
                {lang === 'en' ? 'No Events Found' : 'ఏ ఉత్సవాలు లభించలేదు'}
              </h3>
              <p className="text-xs max-w-md mx-auto">
                {lang === 'en'
                  ? 'Try clearing your search query or selecting a different temple.'
                  : 'దయచేసి మీ శోధన పదాన్ని మార్చి ప్రయత్నించండి.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEvents.map(evt => {
                const statusObj = getEventStatus(evt.startDate, evt.endDate);
                const templeObj = TEMPLES.find(t => t.id === evt.templeId);

                // Collect images for cover display
                const evtImages = [];
                if (evt.images && Array.isArray(evt.images) && evt.images.length > 0) {
                  evt.images.forEach(img => {
                    if (typeof img === 'string' && img.trim()) evtImages.push(normalizeImageUrl(img.trim()));
                    else if (img && img.url && String(img.url).trim()) evtImages.push(normalizeImageUrl(String(img.url).trim()));
                  });
                }
                if (evtImages.length === 0 && evt.imageUrl && String(evt.imageUrl).trim()) {
                  evtImages.push(normalizeImageUrl(String(evt.imageUrl).trim()));
                }
                const coverUrl = evtImages[0] || null;

                return (
                  <div
                    key={evt.id}
                    onClick={() => onSelectEvent(evt)}
                    className={`glass-card rounded-2xl border-2 ${statusObj.bgCardBorder} hover:border-[#FFD700] transition-all overflow-hidden flex flex-col justify-between group shadow-xl bg-[#0B0E14] relative p-4 space-y-3 cursor-pointer hover:scale-[1.01]`}
                  >
                    {/* Event Cover Image Header */}
                    {coverUrl && (
                      <div 
                        className="relative h-48 w-full bg-[#141923] overflow-hidden rounded-xl -mt-1 -mx-1 mb-2 group-hover:brightness-110 transition-all shadow shrink-0"
                        title="Click to view full photo & details"
                      >
                        <img 
                          src={coverUrl} 
                          alt={evt.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => { e.target.parentElement.style.display = 'none'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-black/30"></div>
                        
                        <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[#FFD700] text-[11px] font-bold flex items-center gap-1 border border-[#FFD700]/30 shadow">
                          <span>📷 Tap photo to enlarge</span>
                          {evtImages.length > 1 && (
                            <span className="ml-1 px-1.5 py-0.2 rounded bg-[#FF5722] text-white text-[9px] font-extrabold">
                              +{evtImages.length - 1}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Top Control Bar: Status Badge + Temple Tag + Admin Controls */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase shadow-md ${statusObj.colorClass}`}>
                          {lang === 'en' ? statusObj.status : statusObj.statusTe}
                        </span>

                        <span 
                          className="px-2 py-0.5 rounded text-[10px] font-bold text-black shadow inline-block"
                          style={{ backgroundColor: templeObj?.color || '#FFD700' }}
                        >
                          {lang === 'en' ? templeObj?.name : templeObj?.nameTe}
                        </span>
                      </div>

                      {/* Inline Admin Edit & Delete Buttons */}
                      {isAdminLoggedIn && (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditEvent(evt);
                            }}
                            className="px-2 py-1 rounded bg-[#FF5722] text-white text-[10px] font-extrabold flex items-center gap-1 shadow-lg hover:brightness-110"
                            title="Edit this event live on website"
                          >
                            <Edit className="w-3 h-3" />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm(`Delete event "${evt.title}"?`)) {
                                onDeleteEvent(evt.id);
                              }
                            }}
                            className="p-1 rounded bg-red-900/80 text-white text-[10px] font-extrabold shadow-lg hover:bg-red-700"
                            title="Delete this event"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-4 space-y-3 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#FFD700] transition-colors leading-snug">
                          {lang === 'en' ? evt.title : (evt.titleTe || evt.title)}
                        </h3>

                        <div className="flex items-center gap-2 text-xs font-mono text-[#FFD700] font-bold mt-1">
                          <Calendar className="w-3.5 h-3.5 text-[#FF5722]" />
                          <span>
                            {evt.startDate === evt.endDate
                              ? evt.startDate
                              : `${evt.startDate} to ${evt.endDate}`}
                          </span>
                        </div>

                        <p className="text-xs text-[#94A3B8] line-clamp-2 mt-2 leading-relaxed">
                          {lang === 'en' ? evt.description : (evt.descriptionTe || evt.description)}
                        </p>
                      </div>

                      {/* Action Buttons: "View Details", "1-Click WhatsApp Share", & "Google Calendar" */}
                      <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                        <button
                          onClick={() => onSelectEvent(evt)}
                          className="text-xs font-extrabold text-[#FFD700] hover:underline"
                        >
                          {lang === 'en' ? 'Details →' : 'వివరాలు →'}
                        </button>

                        <div className="flex items-center gap-1.5">
                          {/* 1-CLICK WHATSAPP SHARE */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              shareToWhatsApp(evt, lang);
                            }}
                            className="p-1.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5B] text-black font-extrabold text-xs flex items-center gap-1 shadow"
                            title="Share event directly to WhatsApp"
                          >
                            <Share2 className="w-3.5 h-3.5 text-black" />
                            <span className="hidden sm:inline">WhatsApp</span>
                          </button>

                          {/* 1-CLICK GOOGLE CALENDAR */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openGoogleCalendar(evt);
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-[#4285F4] hover:bg-[#3367D6] text-white font-extrabold text-xs flex items-center gap-1 shadow"
                            title="Add directly to Google Calendar"
                          >
                            <Calendar className="w-3.5 h-3.5 text-white" />
                            <span>Calendar</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
