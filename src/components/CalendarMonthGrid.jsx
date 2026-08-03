import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sparkles } from 'lucide-react';
import { TEMPLES } from '../data/templeEvents';

export default function CalendarMonthGrid({ events, lang, onSelectEvent, selectedTemple }) {
  // Generate Months Array from January 2026 to April 2027 (16 Months)
  const MONTHS_LIST = [
    { year: 2026, month: 0, label: 'January 2026', labelTe: 'జనవరి 2026' },
    { year: 2026, month: 1, label: 'February 2026', labelTe: 'ఫిబ్రవరి 2026' },
    { year: 2026, month: 2, label: 'March 2026', labelTe: 'మార్చి 2026' },
    { year: 2026, month: 3, label: 'April 2026', labelTe: 'ఏప్రిల్ 2026' },
    { year: 2026, month: 4, label: 'May 2026', labelTe: 'మే 2026' },
    { year: 2026, month: 5, label: 'June 2026', labelTe: 'జూన్ 2026' },
    { year: 2026, month: 6, label: 'July 2026', labelTe: 'జూలై 2026' },
    { year: 2026, month: 7, label: 'August 2026', labelTe: 'ఆగస్టు 2026' },
    { year: 2026, month: 8, label: 'September 2026', labelTe: 'సెప్టెంబరు 2026' },
    { year: 2026, month: 9, label: 'October 2026', labelTe: 'అక్టోబరు 2026' },
    { year: 2026, month: 10, label: 'November 2026', labelTe: 'నవంబరు 2026' },
    { year: 2026, month: 11, label: 'December 2026', labelTe: 'డిసెంబరు 2026' },
    { year: 2027, month: 0, label: 'January 2027', labelTe: 'జనవరి 2027' },
    { year: 2027, month: 1, label: 'February 2027', labelTe: 'ఫిబ్రవరి 2027' },
    { year: 2027, month: 2, label: 'March 2027', labelTe: 'మార్చి 2027' },
    { year: 2027, month: 3, label: 'April 2027', labelTe: 'ఏప్రిల్ 2027' }
  ];

  // Auto-detect initial index: July 2026 = index 6
  const defaultCurrentIndex = () => {
    const now = new Date();
    const currYear = now.getFullYear();
    const currMonth = now.getMonth();
    const idx = MONTHS_LIST.findIndex(m => m.year === currYear && m.month === currMonth);
    return idx !== -1 ? idx : 6;
  };

  const [activeMonthIndex, setActiveMonthIndex] = useState(defaultCurrentIndex);
  
  // Touch & Mouse Pointer Drag Swipe gesture support
  const gridContainerRef = useRef(null);
  const activeIndexRef = useRef(activeMonthIndex);

  useEffect(() => {
    activeIndexRef.current = activeMonthIndex;
  }, [activeMonthIndex]);

  useEffect(() => {
    const el = gridContainerRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let isDragging = false;

    const handleSwipeStart = (clientX, clientY) => {
      startX = clientX;
      startY = clientY;
      currentX = clientX;
      currentY = clientY;
      isDragging = true;
    };

    const handleSwipeMove = (clientX, clientY) => {
      if (!isDragging) return;
      currentX = clientX;
      currentY = clientY;
    };

    const handleSwipeEnd = () => {
      if (!isDragging) return;
      isDragging = false;

      const diffX = startX - currentX;
      const diffY = startY - currentY;

      // Minimum swipe distance 30px, horizontal movement > vertical movement
      if (Math.abs(diffX) > 30 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
          // Swipe Left -> Next Month
          if (activeIndexRef.current < MONTHS_LIST.length - 1) {
            setActiveMonthIndex(prev => prev + 1);
          }
        } else {
          // Swipe Right -> Prev Month
          if (activeIndexRef.current > 0) {
            setActiveMonthIndex(prev => prev - 1);
          }
        }
      }
    };

    // Touch Event Listeners (Mobile Devices)
    const onTouchStart = (e) => {
      if (e.target.closest('button') || e.target.closest('select') || e.target.closest('a') || e.target.closest('input')) return;
      if (e.touches && e.touches.length === 1) {
        handleSwipeStart(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchMove = (e) => {
      if (e.touches && e.touches.length === 1) {
        handleSwipeMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchEnd = () => {
      handleSwipeEnd();
    };

    // Mouse Event Listeners (Laptop / Web Browsers)
    const onMouseDown = (e) => {
      if (e.target.closest('button') || e.target.closest('select') || e.target.closest('a') || e.target.closest('input')) return;
      if (e.button === 0) {
        // Prevent default text selection so mouse drag works smoothly on Web!
        e.preventDefault();
        handleSwipeStart(e.clientX, e.clientY);
      }
    };

    const onMouseMove = (e) => {
      if (isDragging) {
        handleSwipeMove(e.clientX, e.clientY);
      }
    };

    const onMouseUp = () => {
      handleSwipeEnd();
    };

    // Keyboard Arrow Keys
    const onKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
      if (e.key === 'ArrowLeft') {
        if (activeIndexRef.current > 0) setActiveMonthIndex(prev => prev - 1);
      } else if (e.key === 'ArrowRight') {
        if (activeIndexRef.current < MONTHS_LIST.length - 1) setActiveMonthIndex(prev => prev + 1);
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });

    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);

      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [MONTHS_LIST.length]);

  const handlePrevMonth = () => {
    if (activeMonthIndex > 0) {
      setActiveMonthIndex(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (activeMonthIndex < MONTHS_LIST.length - 1) {
      setActiveMonthIndex(prev => prev + 1);
    }
  };

  const activeMonth = MONTHS_LIST[activeMonthIndex];

  return (
    <div className="space-y-4">
      {/* Month Navigation Toolbar */}
      <div className="glass-card p-3 sm:p-4 border-2 border-[#D4AF37]/50 flex flex-wrap items-center justify-between gap-3 bg-[#0B0E14] shadow-2xl">
        
        {/* Current Month Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD700] to-[#FF5722] p-0.5 flex items-center justify-center text-black font-extrabold shadow-md shrink-0">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl sm:text-3xl font-extrabold gold-gradient-text">
              {lang === 'en' ? activeMonth.label : activeMonth.labelTe}
            </h3>
            <p className="text-[10px] sm:text-[11px] text-[#94A3B8]">
              {lang === 'en' ? '👈 Swipe or drag left/right or use arrow keys 👉' : 'పక్కకు జరపండి లేదా బాణం గుర్తును నొక్కండి'}
            </p>
          </div>
        </div>

        {/* Month Dropdown & Prev/Next Controls - RESPONSIVE WRAPPING PREVENTS OVERFLOW */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full sm:w-auto justify-between sm:justify-end">
          
          {/* Direct Month Select Dropdown */}
          <select
            value={activeMonthIndex}
            onChange={(e) => setActiveMonthIndex(Number(e.target.value))}
            className="flex-1 sm:flex-initial min-w-[130px] px-2.5 py-2 rounded-xl bg-[#141923] border border-[#D4AF37]/60 text-[#FFD700] text-xs font-extrabold focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          >
            {MONTHS_LIST.map((m, idx) => (
              <option key={idx} value={idx}>
                {lang === 'en' ? m.label : m.labelTe}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* PREVIOUS MONTH BUTTON */}
            <button
              type="button"
              onClick={handlePrevMonth}
              disabled={activeMonthIndex === 0}
              className={`px-3 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1 transition-all shadow-md ${
                activeMonthIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-[#141923] text-[#94A3B8] border border-white/10'
                  : 'bg-[#141923] text-[#FFD700] border-2 border-[#D4AF37] hover:bg-[#D4AF37]/20 active:scale-95'
              }`}
            >
              <ChevronLeft className="w-4 h-4 text-[#FFD700]" />
              <span>{lang === 'en' ? 'Prev' : 'గత'}</span>
            </button>

            {/* NEXT MONTH BUTTON */}
            <button
              type="button"
              onClick={handleNextMonth}
              disabled={activeMonthIndex === MONTHS_LIST.length - 1}
              className={`px-3 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1 transition-all shadow-md ${
                activeMonthIndex === MONTHS_LIST.length - 1
                  ? 'opacity-40 cursor-not-allowed bg-[#141923] text-[#94A3B8] border border-white/10'
                  : 'bg-gradient-to-r from-[#FF5722] to-[#FFD700] text-black hover:brightness-110 active:scale-95 ring-2 ring-[#FFD700]'
              }`}
            >
              <span>{lang === 'en' ? 'Next' : 'తరువాతి'}</span>
              <ChevronRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>

      </div>

      {/* RENDERED ACTIVE MONTH CARD WITH SWIPE & FLOATING SIDE ARROWS */}
      <div 
        ref={gridContainerRef}
        className="rounded-2xl border-2 border-[#D4AF37]/40 bg-[#0B0E14] shadow-2xl p-2 sm:p-6 transition-all duration-300 relative group touch-manipulation"
      >
        {/* Floating Side Arrow Buttons for Quick Touch Navigation */}
        {activeMonthIndex > 0 && (
          <button
            onClick={handlePrevMonth}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/80 text-[#FFD700] border border-[#FFD700]/50 flex items-center justify-center shadow-lg active:scale-90"
            title="Previous Month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {activeMonthIndex < MONTHS_LIST.length - 1 && (
          <button
            onClick={handleNextMonth}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/80 text-[#FFD700] border border-[#FFD700]/50 flex items-center justify-center shadow-lg active:scale-90"
            title="Next Month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
        <MonthGridCard 
          key={`${activeMonth.year}-${activeMonth.month}`}
          monthObj={activeMonth} 
          events={events} 
          lang={lang} 
          onSelectEvent={onSelectEvent} 
        />
      </div>
    </div>
  );
}

// Sub-component: Renders the 7-day Sunday to Saturday Grid for the active month with WHITE DATE BOXES
function MonthGridCard({ monthObj, events, lang, onSelectEvent }) {
  const { year, month } = monthObj;

  const daysOfWeekEn = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const daysOfWeekTe = ['ఆది', 'సోమ', 'మంగళ', 'బుధ', 'గురు', 'శుక్ర', 'శని'];

  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const getEventsForDay = (dayNum) => {
    const dayStr = dayNum.toString().padStart(2, '0');
    const monthStr = (month + 1).toString().padStart(2, '0');
    const dateStr = `${year}-${monthStr}-${dayStr}`;

    return events.filter(evt => {
      return evt.startDate <= dateStr && evt.endDate >= dateStr;
    });
  };

  const gridCells = [];
  
  // Empty leading cells
  for (let i = 0; i < firstDayIndex; i++) {
    gridCells.push(
      <div key={`empty-${i}`} className="min-h-[65px] sm:min-h-[120px] bg-[#141923]/40 border border-white/5 rounded-lg sm:rounded-xl"></div>
    );
  }

  // Active Date Cells - PURE WHITE BACKGROUND BOXES WITH EVENT IMAGE PREVIEW
  for (let day = 1; day <= totalDays; day++) {
    const dayEvents = getEventsForDay(day);
    const dayStr = day.toString().padStart(2, '0');
    const monthStr = (month + 1).toString().padStart(2, '0');
    const dateStr = `${year}-${monthStr}-${dayStr}`;

    const isToday = dateStr === new Date().toISOString().split('T')[0];

    // Find event on this day that has pictures
    const eventWithImage = dayEvents.find(e => (e.images && e.images.length > 0 && e.images[0].url) || e.imageUrl);
    const dayImageUrl = eventWithImage ? (eventWithImage.images?.[0]?.url || eventWithImage.imageUrl) : null;
    const totalPhotos = dayEvents.reduce((acc, e) => acc + (e.images && e.images.length > 0 ? e.images.length : (e.imageUrl ? 1 : 0)), 0);

    gridCells.push(
      <div 
        key={`day-${day}`}
        className={`min-h-[75px] sm:min-h-[130px] p-1 sm:p-2 rounded-lg sm:rounded-xl border transition-all flex flex-col justify-between shadow-md relative overflow-hidden ${
          isToday 
            ? 'bg-amber-100 border-[#FF5722] ring-2 ring-[#FF5722]' 
            : dayEvents.length > 0 
              ? 'bg-white border-2 border-[#D4AF37] hover:border-[#FFD700] hover:shadow-lg hover:scale-[1.02]' 
              : 'bg-white border border-slate-200 hover:border-[#D4AF37]'
        }`}
      >
        <div className="flex items-center justify-between z-10">
          <span className={`text-xs sm:text-base font-extrabold ${isToday ? 'text-[#FF5722]' : 'text-slate-900'}`}>
            {day}
          </span>
          {dayEvents.length > 0 && (
            <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#FF5722] text-white text-[9px] sm:text-[10px] font-black flex items-center justify-center shadow">
              {dayEvents.length}
            </span>
          )}
        </div>

        {/* WHITE AREA PICTURE PREVIEW THUMBNAIL */}
        {dayImageUrl && (
          <div 
            onClick={(e) => {
              e.stopPropagation();
              onSelectEvent(eventWithImage);
            }}
            className="my-1 w-full h-9 sm:h-16 rounded-md overflow-hidden relative group cursor-pointer border border-black/10 shadow-sm shrink-0"
            title="Click to view event photos"
          >
            <img 
              src={dayImageUrl} 
              alt="Festival Event" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={(e) => { e.target.parentElement.style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
            {totalPhotos > 1 && (
              <span className="absolute bottom-0.5 right-0.5 px-1 py-0.2 rounded bg-black/80 text-[#FFD700] text-[8px] sm:text-[9px] font-extrabold flex items-center gap-0.5 shadow">
                📷 {totalPhotos}
              </span>
            )}
          </div>
        )}

        {/* Day Events Pill List */}
        <div className="space-y-1 mt-0.5 sm:mt-1 overflow-y-auto max-h-[48px] sm:max-h-[75px] no-scrollbar z-10">
          {dayEvents.map(evt => {
            const temple = TEMPLES.find(t => t.id === evt.templeId);

            return (
              <div
                key={evt.id}
                onClick={() => onSelectEvent(evt)}
                className="p-0.5 sm:p-1.5 rounded text-[8.5px] sm:text-[10px] font-extrabold text-black cursor-pointer hover:scale-105 transition-transform truncate shadow-sm flex items-center justify-between border border-black/10"
                style={{ backgroundColor: temple?.color || '#FFD700' }}
                title={`${evt.title} (${temple ? temple.name : ''})`}
              >
                <span className="truncate">{lang === 'en' ? evt.title : (evt.titleTe || evt.title)}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* 7 Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 text-center font-extrabold text-xs text-[#FFD700] py-2 bg-[#141923] rounded-xl border border-[#D4AF37]/30">
        {(lang === 'en' ? daysOfWeekEn : daysOfWeekTe).map((dayName, dIdx) => (
          <div key={dIdx} className={dIdx === 0 ? 'text-[#FF5722]' : ''}>
            {dayName}
          </div>
        ))}
      </div>

      {/* 7-Column Days Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {gridCells}
      </div>
    </div>
  );
}

