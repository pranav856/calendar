import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Sparkles
} from 'lucide-react';
import { TEMPLES } from '../data/templeEvents';

const MONTHS_LIST = [
  { year: 2026, month: 0, label: 'January 2026', labelTe: 'జనవరి 2026' },
  { year: 2026, month: 1, label: 'February 2026', labelTe: 'ఫిబ్రవరి 2026' },
  { year: 2026, month: 2, label: 'March 2026', labelTe: 'మార్చి 2026' },
  { year: 2026, month: 3, label: 'April 2026', labelTe: 'ఏప్రిల్ 2026' },
  { year: 2026, month: 4, label: 'May 2026', labelTe: 'మే 2026' },
  { year: 2026, month: 5, label: 'June 2026', labelTe: 'జూన్ 2026' },
  { year: 2026, month: 6, label: 'July 2026', labelTe: 'జూలై 2026' },
  { year: 2026, month: 7, label: 'August 2026', labelTe: 'ఆగస్టు 2026' },
  { year: 2026, month: 8, label: 'September 2026', labelTe: 'సెప్టెంబర్ 2026' },
  { year: 2026, month: 9, label: 'October 2026', labelTe: 'అక్టోబర్ 2026' },
  { year: 2026, month: 10, label: 'November 2026', labelTe: 'నవంబర్ 2026' },
  { year: 2026, month: 11, label: 'December 2026', labelTe: 'డిసెంబర్ 2026' },
  { year: 2027, month: 0, label: 'January 2027', labelTe: 'జనవరి 2027' },
  { year: 2027, month: 1, label: 'February 2027', labelTe: 'ఫిబ్రవరి 2027' },
  { year: 2027, month: 2, label: 'March 2027', labelTe: 'మార్చి 2027' },
  { year: 2027, month: 3, label: 'April 2027', labelTe: 'ఏప్రిల్ 2027' }
];

const getTodayIST = () =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date());

const getDateString = (year, month, day) => {
  const monthStr = String(month + 1).padStart(2, '0');
  const dayStr = String(day).padStart(2, '0');
  return `${year}-${monthStr}-${dayStr}`;
};

const getInitialMonthIndex = () => {
  const today = getTodayIST();
  const year = Number(today.slice(0, 4));
  const month = Number(today.slice(5, 7)) - 1;

  const index = MONTHS_LIST.findIndex(
    item => item.year === year && item.month === month
  );

  return index !== -1 ? index : 6;
};

export default function CalendarMonthGrid({
  events,
  lang,
  onSelectEvent,
  selectedTemple
}) {
  const [activeMonthIndex, setActiveMonthIndex] = useState(
    getInitialMonthIndex
  );

  const [selectedDate, setSelectedDate] = useState(getTodayIST());

  const gridContainerRef = useRef(null);
  const activeIndexRef = useRef(activeMonthIndex);

  useEffect(() => {
    activeIndexRef.current = activeMonthIndex;
  }, [activeMonthIndex]);

  const activeMonth = MONTHS_LIST[activeMonthIndex];

  const firstDayIndex = new Date(
    activeMonth.year,
    activeMonth.month,
    1
  ).getDay();

  const totalDays = new Date(
    activeMonth.year,
    activeMonth.month + 1,
    0
  ).getDate();

  const getEventsForDate = dateStr => {
    return (events || []).filter(evt => {
      if (!evt?.startDate || !evt?.endDate) return false;

      return (
        evt.startDate <= dateStr &&
        evt.endDate >= dateStr
      );
    });
  };

  const getEventsForDay = dayNum => {
    return getEventsForDate(
      getDateString(
        activeMonth.year,
        activeMonth.month,
        dayNum
      )
    );
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

  const handleMonthChange = e => {
    const nextIndex = Number(e.target.value);
    setActiveMonthIndex(nextIndex);

    const nextMonth = MONTHS_LIST[nextIndex];

    const today = getTodayIST();

    const isCurrentMonth =
      today.startsWith(
        `${nextMonth.year}-${String(nextMonth.month + 1).padStart(2, '0')}`
      );

    if (isCurrentMonth) {
      setSelectedDate(today);
      return;
    }

    const firstEvent = (events || [])
      .filter(evt => {
        if (!evt?.startDate) return false;

        const prefix =
          `${nextMonth.year}-${String(nextMonth.month + 1).padStart(2, '0')}`;

        return evt.startDate.startsWith(prefix);
      })
      .sort((a, b) =>
        a.startDate.localeCompare(b.startDate)
      )[0];

    if (firstEvent) {
      setSelectedDate(firstEvent.startDate);
    } else {
      setSelectedDate(
        getDateString(nextMonth.year, nextMonth.month, 1)
      );
    }
  };

  /*
   * Keep selected date aligned with the active month.
   */
  useEffect(() => {
    const monthPrefix =
      `${activeMonth.year}-${String(activeMonth.month + 1).padStart(2, '0')}`;

    if (!selectedDate.startsWith(monthPrefix)) {
      const today = getTodayIST();

      if (today.startsWith(monthPrefix)) {
        setSelectedDate(today);
        return;
      }

      const firstEvent = (events || [])
        .filter(evt =>
          evt?.startDate?.startsWith(monthPrefix)
        )
        .sort((a, b) =>
          a.startDate.localeCompare(b.startDate)
        )[0];

      if (firstEvent) {
        setSelectedDate(firstEvent.startDate);
      } else {
        setSelectedDate(
          getDateString(
            activeMonth.year,
            activeMonth.month,
            1
          )
        );
      }
    }
  }, [
    activeMonth.year,
    activeMonth.month,
    selectedDate,
    events
  ]);

  /*
   * Swipe / drag support.
   */
  useEffect(() => {
    const el = gridContainerRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let isDragging = false;

    const start = (x, y) => {
      startX = x;
      startY = y;
      currentX = x;
      currentY = y;
      isDragging = true;
    };

    const move = (x, y) => {
      if (!isDragging) return;

      currentX = x;
      currentY = y;
    };

    const end = () => {
      if (!isDragging) return;

      isDragging = false;

      const diffX = startX - currentX;
      const diffY = startY - currentY;

      if (
        Math.abs(diffX) > 35 &&
        Math.abs(diffX) > Math.abs(diffY)
      ) {
        if (
          diffX > 0 &&
          activeIndexRef.current <
            MONTHS_LIST.length - 1
        ) {
          setActiveMonthIndex(prev => prev + 1);
        }

        if (
          diffX < 0 &&
          activeIndexRef.current > 0
        ) {
          setActiveMonthIndex(prev => prev - 1);
        }
      }
    };

    const onTouchStart = e => {
      if (
        e.target.closest('button') ||
        e.target.closest('select') ||
        e.target.closest('a') ||
        e.target.closest('input')
      ) {
        return;
      }

      if (e.touches?.length === 1) {
        start(
          e.touches[0].clientX,
          e.touches[0].clientY
        );
      }
    };

    const onTouchMove = e => {
      if (e.touches?.length === 1) {
        move(
          e.touches[0].clientX,
          e.touches[0].clientY
        );
      }
    };

    const onTouchEnd = () => {
      end();
    };

    const onMouseDown = e => {
      if (
        e.target.closest('button') ||
        e.target.closest('select') ||
        e.target.closest('a') ||
        e.target.closest('input')
      ) {
        return;
      }

      if (e.button === 0) {
        e.preventDefault();

        start(e.clientX, e.clientY);
      }
    };

    const onMouseMove = e => {
      if (isDragging) {
        move(e.clientX, e.clientY);
      }
    };

    const onMouseUp = () => {
      end();
    };

    const onKeyDown = e => {
      if (
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.tagName === 'SELECT'
      ) {
        return;
      }

      if (e.key === 'ArrowLeft') {
        handlePrevMonth();
      }

      if (e.key === 'ArrowRight') {
        handleNextMonth();
      }
    };

    el.addEventListener(
      'touchstart',
      onTouchStart,
      { passive: true }
    );

    el.addEventListener(
      'touchmove',
      onTouchMove,
      { passive: true }
    );

    el.addEventListener(
      'touchend',
      onTouchEnd,
      { passive: true }
    );

    el.addEventListener(
      'mousedown',
      onMouseDown
    );

    window.addEventListener(
      'mousemove',
      onMouseMove
    );

    window.addEventListener(
      'mouseup',
      onMouseUp
    );

    window.addEventListener(
      'keydown',
      onKeyDown
    );

    return () => {
      el.removeEventListener(
        'touchstart',
        onTouchStart
      );

      el.removeEventListener(
        'touchmove',
        onTouchMove
      );

      el.removeEventListener(
        'touchend',
        onTouchEnd
      );

      el.removeEventListener(
        'mousedown',
        onMouseDown
      );

      window.removeEventListener(
        'mousemove',
        onMouseMove
      );

      window.removeEventListener(
        'mouseup',
        onMouseUp
      );

      window.removeEventListener(
        'keydown',
        onKeyDown
      );
    };
  }, [activeMonthIndex]);

  const selectedDayEvents =
    getEventsForDate(selectedDate);

  const selectedDateObject = new Date(
    `${selectedDate}T00:00:00`
  );

  const selectedDateLabel =
    selectedDateObject.toLocaleDateString(
      lang === 'en' ? 'en-IN' : 'te-IN',
      {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }
    );

  return (
    <div
      ref={gridContainerRef}
      className="space-y-4"
    >
      {/* =========================================================
          MONTH NAVIGATION
      ========================================================== */}

      <div className="glass-card p-3 sm:p-4 border-2 border-[#D4AF37]/50 flex flex-wrap items-center justify-between gap-3 bg-[#0B0E14] shadow-2xl">

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD700] to-[#FF5722] p-0.5 flex items-center justify-center text-black font-extrabold shadow-md shrink-0">
            <CalendarIcon className="w-5 h-5" />
          </div>

          <div>
            <h2 className="font-serif text-xl sm:text-3xl font-extrabold gold-gradient-text">
              {lang === 'en'
                ? activeMonth.label
                : activeMonth.labelTe}
            </h2>

            <p className="hidden sm:block text-[10px] sm:text-[11px] text-[#94A3B8]">
              {lang === 'en'
                ? 'Swipe or drag left/right or use arrow keys'
                : 'ఎడమ లేదా కుడి వైపుకు స్వైప్ చేయండి'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full sm:w-auto justify-between sm:justify-end">

          <label
            htmlFor="calendar-month-select"
            className="sr-only"
          >
            Select month
          </label>

          <select
            id="calendar-month-select"
            value={activeMonthIndex}
            onChange={handleMonthChange}
            className="flex-1 sm:flex-initial min-w-[130px] px-2.5 py-2 rounded-xl bg-[#141923] border border-[#D4AF37]/60 text-[#FFD700] text-xs font-extrabold focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          >
            {MONTHS_LIST.map((item, index) => (
              <option
                key={index}
                value={index}
              >
                {lang === 'en'
                  ? item.label
                  : item.labelTe}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-1.5 shrink-0">

            <button
              type="button"
              onClick={handlePrevMonth}
              disabled={activeMonthIndex === 0}
              className={`px-2.5 sm:px-3 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1 transition-all shadow-md ${
                activeMonthIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-[#141923] text-[#94A3B8] border border-white/10'
                  : 'bg-[#141923] text-[#FFD700] border-2 border-[#D4AF37] hover:bg-[#D4AF37]/20 active:scale-95'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />

              <span className="hidden sm:inline">
                {lang === 'en' ? 'Prev' : 'గత'}
              </span>
            </button>

            <button
              type="button"
              onClick={handleNextMonth}
              disabled={
                activeMonthIndex ===
                MONTHS_LIST.length - 1
              }
              className={`px-2.5 sm:px-3 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1 transition-all shadow-md ${
                activeMonthIndex ===
                MONTHS_LIST.length - 1
                  ? 'opacity-40 cursor-not-allowed bg-[#141923] text-[#94A3B8] border border-white/10'
                  : 'bg-gradient-to-r from-[#FF5722] to-[#FFD700] text-black hover:brightness-110 active:scale-95'
              }`}
            >
              <span className="hidden sm:inline">
                {lang === 'en' ? 'Next' : 'తరువాతి'}
              </span>

              <ChevronRight className="w-4 h-4" />
            </button>

          </div>
        </div>
      </div>

      {/* =========================================================
          MOBILE CALENDAR
      ========================================================== */}

      <div className="block sm:hidden">

        <div className="rounded-2xl border-2 border-[#D4AF37]/40 bg-[#0B0E14] shadow-2xl p-2.5">

          {/* Week Header */}
          <div className="grid grid-cols-7 gap-1 mb-1.5">
            {(
              lang === 'en'
                ? ['S', 'M', 'T', 'W', 'T', 'F', 'S']
                : ['ఆ', 'సో', 'మం', 'బు', 'గు', 'శు', 'శ']
            ).map((day, index) => (
              <div
                key={index}
                className={`text-center py-1.5 text-[10px] font-black ${
                  index === 0 || index === 6
                    ? 'text-[#FF5722]'
                    : 'text-[#FFD700]'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">

            {Array.from({
              length: firstDayIndex
            }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="h-11 rounded-lg bg-[#141923]/30 border border-white/5"
              />
            ))}

            {Array.from({
              length: totalDays
            }).map((_, index) => {

              const day = index + 1;

              const dateStr = getDateString(
                activeMonth.year,
                activeMonth.month,
                day
              );

              const dayEvents =
                getEventsForDay(day);

              const hasEvents =
                dayEvents.length > 0;

              const isToday =
                dateStr === getTodayIST();

              const isSelected =
                dateStr === selectedDate;

              return (
                <button
                  key={dateStr}
                  type="button"
                  onClick={() =>
                    setSelectedDate(dateStr)
                  }
                  className={`h-11 rounded-lg border relative flex flex-col items-center justify-center transition-all active:scale-95 ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#FFD700] to-[#FF5722] border-[#FFD700] text-black shadow-lg ring-2 ring-[#FFD700]/40'
                      : isToday
                        ? 'bg-amber-100 border-[#FF5722] text-[#FF5722] ring-1 ring-[#FF5722]'
                        : hasEvents
                          ? 'bg-white border-[#D4AF37] text-slate-900'
                          : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >

                  <span className="text-xs font-black leading-none">
                    {day}
                  </span>

                  {hasEvents && (
                    <div className="flex items-center gap-0.5 mt-1">
                      {dayEvents
                        .slice(0, 3)
                        .map(evt => {
                          const temple =
                            TEMPLES.find(
                              t =>
                                t.id ===
                                evt.templeId
                            );

                          return (
                            <span
                              key={evt.id}
                              className="w-1.5 h-1.5 rounded-full"
                              style={{
                                backgroundColor:
                                  temple?.color ||
                                  '#FF5722'
                              }}
                            />
                          );
                        })}
                    </div>
                  )}

                  {dayEvents.length > 3 && (
                    <span className="absolute top-0.5 right-0.5 text-[7px] font-black">
                      +{dayEvents.length - 3}
                    </span>
                  )}

                </button>
              );
            })}
          </div>

          {/* Selected Date Indicator */}
          <div className="mt-3 px-3 py-2 rounded-xl bg-[#141923] border border-[#D4AF37]/30 flex items-center justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-wider text-[#94A3B8] font-bold">
                {lang === 'en'
                  ? 'Selected date'
                  : 'ఎంచుకున్న తేదీ'}
              </p>

              <p className="text-xs font-extrabold text-[#FFD700]">
                {selectedDateLabel}
              </p>
            </div>

            {selectedDayEvents.length > 0 && (
              <span className="px-2 py-1 rounded-full bg-[#FF5722] text-white text-[9px] font-black">
                {selectedDayEvents.length}
              </span>
            )}
          </div>
        </div>

        {/* =======================================================
            MOBILE SELECTED-DAY EVENTS
        ======================================================== */}

        <div className="mt-3 space-y-2">

          {selectedDayEvents.length === 0 ? (
            <div className="glass-card rounded-2xl p-6 text-center border border-white/10">
              <CalendarIcon className="w-8 h-8 mx-auto text-[#D4AF37]/50 mb-2" />

              <p className="text-xs font-bold text-[#94A3B8]">
                {lang === 'en'
                  ? 'No events on this date'
                  : 'ఈ తేదీన కార్యక్రమాలు లేవు'}
              </p>

              <p className="text-[10px] text-[#64748B] mt-1">
                {lang === 'en'
                  ? 'Select another date to view its events.'
                  : 'మరొక తేదీని ఎంచుకోండి.'}
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 px-1">
                <Sparkles className="w-4 h-4 text-[#FFD700]" />

                <h3 className="font-serif text-base font-extrabold text-[#FFD700]">
                  {lang === 'en'
                    ? "Today's / Selected Events"
                    : 'ఎంచుకున్న తేదీ ఉత్సవాలు'}
                </h3>
              </div>

              {selectedDayEvents.map(evt => {
                const temple =
                  TEMPLES.find(
                    t => t.id === evt.templeId
                  );

                return (
                  <button
                    key={evt.id}
                    type="button"
                    onClick={() =>
                      onSelectEvent(evt)
                    }
                    className="w-full text-left rounded-2xl bg-white border-2 border-[#D4AF37]/60 p-3 shadow-lg active:scale-[0.99] transition-all"
                  >
                    <div className="flex items-start gap-3">

                      <div
                        className="w-2 self-stretch rounded-full shrink-0"
                        style={{
                          backgroundColor:
                            temple?.color ||
                            '#FFD700'
                        }}
                      />

                      <div className="min-w-0 flex-1">

                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-sm font-black text-slate-900 leading-snug">
                            {lang === 'en'
                              ? evt.title
                              : evt.titleTe ||
                                evt.title}
                          </h4>

                          <span className="shrink-0 text-[9px] font-black text-[#FF5722]">
                            VIEW
                          </span>
                        </div>

                        <p className="text-[10px] text-slate-500 font-bold mt-1">
                          {lang === 'en'
                            ? temple?.name ||
                              'Tirumala'
                            : temple?.nameTe ||
                              temple?.name ||
                              'తిరుమల'}
                        </p>

                        <p className="text-[10px] text-slate-700 mt-1.5 line-clamp-2">
                          {lang === 'en'
                            ? evt.description ||
                              'Temple event'
                            : evt.descriptionTe ||
                              evt.description ||
                              'ఆలయ కార్యక్రమం'}
                        </p>

                      </div>
                    </div>
                  </button>
                );
              })}
            </>
          )}
        </div>
      </div>

      {/* =========================================================
          DESKTOP CALENDAR
          Existing desktop experience preserved.
      ========================================================== */}

      <div className="hidden sm:block">

        <div className="rounded-2xl border-2 border-[#D4AF37]/40 bg-[#0B0E14] shadow-2xl p-6 relative">

          {activeMonthIndex > 0 && (
            <button
              type="button"
              onClick={handlePrevMonth}
              className="absolute left-1 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/80 text-[#FFD700] border border-[#FFD700]/50 flex items-center justify-center shadow-lg active:scale-90"
              title="Previous Month"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {activeMonthIndex <
            MONTHS_LIST.length - 1 && (
            <button
              type="button"
              onClick={handleNextMonth}
              className="absolute right-1 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/80 text-[#FFD700] border border-[#FFD700]/50 flex items-center justify-center shadow-lg active:scale-90"
              title="Next Month"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          <DesktopMonthGrid
            monthObj={activeMonth}
            events={events}
            lang={lang}
            onSelectEvent={onSelectEvent}
          />
        </div>
      </div>
    </div>
  );
}


/* ===============================================================
   DESKTOP MONTH GRID
   =============================================================== */

function DesktopMonthGrid({
  monthObj,
  events,
  lang,
  onSelectEvent
}) {
  const { year, month } = monthObj;

  const daysOfWeekEn = [
    'SUN',
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT'
  ];

  const daysOfWeekTe = [
    'ఆది',
    'సోమ',
    'మంగళ',
    'బుధ',
    'గురు',
    'శుక్ర',
    'శని'
  ];

  const firstDayIndex =
    new Date(year, month, 1).getDay();

  const totalDays =
    new Date(
      year,
      month + 1,
      0
    ).getDate();

  const getEventsForDay = dayNum => {
    const dateStr = getDateString(
      year,
      month,
      dayNum
    );

    return (events || []).filter(evt => {
      return (
        evt?.startDate &&
        evt?.endDate &&
        evt.startDate <= dateStr &&
        evt.endDate >= dateStr
      );
    });
  };

  const gridCells = [];

  for (
    let i = 0;
    i < firstDayIndex;
    i++
  ) {
    gridCells.push(
      <div
        key={`empty-${i}`}
        className="min-h-[120px] bg-[#141923]/40 border border-white/5 rounded-xl"
      />
    );
  }

  for (
    let day = 1;
    day <= totalDays;
    day++
  ) {
    const dateStr = getDateString(
      year,
      month,
      day
    );

    const dayEvents =
      getEventsForDay(day);

    const isToday =
      dateStr === getTodayIST();

    const eventWithImage =
      dayEvents.find(
        e =>
          (Array.isArray(e.images) &&
            e.images.length > 0 &&
            e.images[0]?.url) ||
          e.imageUrl
      );

    const dayImageUrl =
      eventWithImage
        ? eventWithImage.images?.[0]
            ?.url ||
          eventWithImage.imageUrl
        : null;

    const totalPhotos =
      dayEvents.reduce(
        (total, event) =>
          total +
          (Array.isArray(event.images) &&
          event.images.length > 0
            ? event.images.length
            : event.imageUrl
              ? 1
              : 0),
        0
      );

    gridCells.push(
      <div
        key={`day-${day}`}
        className={`min-h-[130px] p-2 rounded-xl border transition-all flex flex-col justify-between shadow-md relative overflow-hidden ${
          isToday
            ? 'bg-amber-100 border-[#FF5722] ring-2 ring-[#FF5722]'
            : dayEvents.length > 0
              ? 'bg-white border-2 border-[#D4AF37] hover:border-[#FFD700] hover:shadow-lg hover:scale-[1.02]'
              : 'bg-white border border-slate-200 hover:border-[#D4AF37]'
        }`}
      >

        <div className="flex items-center justify-between z-10">
          <span
            className={`text-base font-extrabold ${
              isToday
                ? 'text-[#FF5722]'
                : 'text-slate-900'
            }`}
          >
            {day}
          </span>

          {dayEvents.length > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#FF5722] text-white text-[10px] font-black flex items-center justify-center shadow">
              {dayEvents.length}
            </span>
          )}
        </div>

        {dayImageUrl && (
          <div
            onClick={e => {
              e.stopPropagation();
              onSelectEvent(
                eventWithImage
              );
            }}
            className="my-1 w-full h-16 rounded-md overflow-hidden relative group cursor-pointer border border-black/10 shadow-sm shrink-0"
          >
            <img
              src={dayImageUrl}
              alt="Festival Event"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={e => {
                e.currentTarget.parentElement.style.display =
                  'none';
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />

            {totalPhotos > 1 && (
              <span className="absolute bottom-0.5 right-0.5 px-1 py-0.2 rounded bg-black/80 text-[#FFD700] text-[9px] font-extrabold shadow">
                📷 {totalPhotos}
              </span>
            )}
          </div>
        )}

        <div className="space-y-1 mt-1 overflow-y-auto max-h-[75px] no-scrollbar z-10">
          {dayEvents.map(evt => {
            const temple =
              TEMPLES.find(
                t =>
                  t.id === evt.templeId
              );

            return (
              <button
                key={evt.id}
                type="button"
                onClick={() =>
                  onSelectEvent(evt)
                }
                className="w-full p-1.5 rounded text-[10px] font-extrabold text-black cursor-pointer hover:scale-105 transition-transform truncate shadow-sm flex items-center justify-between border border-black/10 text-left"
                style={{
                  backgroundColor:
                    temple?.color ||
                    '#FFD700'
                }}
                title={`${evt.title} (${temple?.name || ''})`}
              >
                <span className="truncate">
                  {lang === 'en'
                    ? evt.title
                    : evt.titleTe ||
                      evt.title}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    );
  }

  return (
    <div className="space-y-3">

      <div className="grid grid-cols-7 gap-2 text-center font-extrabold text-xs text-[#FFD700] py-2 bg-[#141923] rounded-xl border border-[#D4AF37]/30">
        {(lang === 'en'
          ? daysOfWeekEn
          : daysOfWeekTe
        ).map((dayName, index) => (
          <div
            key={index}
            className={
              index === 0
                ? 'text-[#FF5722]'
                : ''
            }
          >
            {dayName}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {gridCells}
      </div>
    </div>
  );
}

