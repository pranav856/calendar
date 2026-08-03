import React, { useState, useEffect } from 'react';
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
  
  // Touch Swipe gesture support
  const [touchStartX, setTouchStartX] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;

    if (diffX > 50) {
      handleNextMonth();
    } else if (diffX < -50) {
      handlePrevMonth();
    }
    setTouchStartX(null);
  };

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
      <div className="glass-card p-4 border-2 border-[#D4AF37]/50 flex flex-wrap items-center justify-between gap-3 bg-[#0B0E14] shadow-2xl">
        
        {/* Current Month Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD700] to-[#FF5722] p-0.5 flex items-center justify-center text-black font-extrabold shadow-md">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold gold-gradient-text">
              {lang === 'en' ? activeMonth.label : activeMonth.labelTe}
            </h3>
            <p className="text-[11px] text-[#94A3B8]">
              {lang === 'en' ? 'Click Prev/Next Month buttons or swipe sideways to navigate' : 'నెలల వారీగా తిప్పడానికి బటన్లు ఉపయోగించండి'}
            </p>
          </div>
        </div>

        {/* Month Dropdown & Prev/Next Controls */}
        <div className="flex items-center gap-2">
          
          {/* Direct Month Select Dropdown */}
          <select
            value={activeMonthIndex}
            onChange={(e) => setActiveMonthIndex(Number(e.target.value))}
            className="px-3 py-2.5 rounded-xl bg-[#141923] border border-[#D4AF37]/60 text-[#FFD700] text-xs font-extrabold focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          >
            {MONTHS_LIST.map((m, idx) => (
              <option key={idx} value={idx}>
                {lang === 'en' ? m.label : m.labelTe}
              </option>
            ))}
          </select>

          {/* PREVIOUS MONTH BUTTON */}
          <button
            type="button"
            onClick={handlePrevMonth}
            disabled={activeMonthIndex === 0}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-md ${
              activeMonthIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-[#141923] text-[#94A3B8] border border-white/10'
                : 'bg-[#141923] text-[#FFD700] border-2 border-[#D4AF37] hover:bg-[#D4AF37]/20 active:scale-95'
            }`}
          >
            <ChevronLeft className="w-4 h-4 text-[#FFD700]" />
            <span>{lang === 'en' ? 'Prev Month' : 'గత నెల'}</span>
          </button>

          {/* NEXT MONTH BUTTON */}
          <button
            type="button"
            onClick={handleNextMonth}
            disabled={activeMonthIndex === MONTHS_LIST.length - 1}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-md ${
              activeMonthIndex === MONTHS_LIST.length - 1
                ? 'opacity-40 cursor-not-allowed bg-[#141923] text-[#94A3B8] border border-white/10'
                : 'bg-gradient-to-r from-[#FF5722] to-[#FFD700] text-black hover:brightness-110 active:scale-95 ring-2 ring-[#FFD700]'
            }`}
          >
            <span>{lang === 'en' ? 'Next Month' : 'తరువాతి నెల'}</span>
            <ChevronRight className="w-4 h-4 text-black" />
          </button>
        </div>

      </div>

      {/* RENDERED ACTIVE MONTH CARD WITH SWIPE & KEYBOARD SUPPORT */}
      <div 
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="rounded-2xl border-2 border-[#D4AF37]/40 bg-[#0B0E14] shadow-2xl p-4 sm:p-6 transition-all duration-300"
      >
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

  // Active Date Cells - PURE WHITE BACKGROUND BOXES
  for (let day = 1; day <= totalDays; day++) {
    const dayEvents = getEventsForDay(day);
    const dayStr = day.toString().padStart(2, '0');
    const monthStr = (month + 1).toString().padStart(2, '0');
    const dateStr = `${year}-${monthStr}-${dayStr}`;

    const isToday = dateStr === new Date().toISOString().split('T')[0];

    gridCells.push(
      <div 
        key={`day-${day}`}
        className={`min-h-[65px] sm:min-h-[120px] p-1 sm:p-2.5 rounded-lg sm:rounded-xl border transition-all flex flex-col justify-between shadow-md ${
          isToday 
            ? 'bg-amber-100 border-[#FF5722] ring-2 ring-[#FF5722]' 
            : dayEvents.length > 0 
              ? 'bg-white border-2 border-[#D4AF37] hover:border-[#FFD700] hover:shadow-lg hover:scale-[1.02]' 
              : 'bg-white border border-slate-200 hover:border-[#D4AF37]'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className={`text-xs sm:text-base font-extrabold ${isToday ? 'text-[#FF5722]' : 'text-slate-900'}`}>
            {day}
          </span>
          {dayEvents.length > 0 && (
            <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#FF5722] text-white text-[9px] sm:text-[10px] font-black flex items-center justify-center shadow">
              {dayEvents.length}
            </span>
          )}
        </div>

        {/* Day Events Pill List */}
        <div className="space-y-1 mt-0.5 sm:mt-1 overflow-y-auto max-h-[48px] sm:max-h-[85px] no-scrollbar">
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

