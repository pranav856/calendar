import React, { useState } from 'react';
import {
  Calendar,
  Share2,
  Edit,
  Trash2,
  Image as ImageIcon,
  ChevronRight,
  Clock
} from 'lucide-react';

import { TEMPLES } from '../data/templeEvents';

import {
  getEventStatus,
  openGoogleCalendar,
  openAppleCalendar,
  shareToPlatform,
  normalizeImageUrl
} from '../utils/eventStatus';

export default function CalendarScheduleView({
  events,
  lang,
  onSelectEvent,
  selectedTemple,
  isAdminLoggedIn,
  onEditEvent,
  onDeleteEvent
}) {
  /*
   * -------------------------------------------------------------
   * TODAY IN INDIA / IST
   * -------------------------------------------------------------
   */
  const todayStr = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date());

  /*
   * -------------------------------------------------------------
   * MONTH NAMES
   * -------------------------------------------------------------
   */
  const monthsEn = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const monthsTe = [
    'జనవరి',
    'ఫిబ్రవరి',
    'మార్చి',
    'ఏప్రిల్',
    'మే',
    'జూన్',
    'జూలై',
    'ఆగస్టు',
    'సెప్టెంబరు',
    'అక్టోబరు',
    'నవంబరు',
    'డిసెంబరు'
  ];

  /*
   * -------------------------------------------------------------
   * CURRENT MONTH
   * -------------------------------------------------------------
   */
  const getCurrentMonthKey = () => {
    try {
      const [year, month] = todayStr
        .split('-')
        .map(Number);

      const monthName =
        lang === 'en'
          ? monthsEn[month - 1]
          : monthsTe[month - 1];

      return `${monthName} ${year}`;
    } catch {
      return 'August 2026';
    }
  };

  const [activeMonthFilter, setActiveMonthFilter] =
    useState(() => getCurrentMonthKey());

  // Per-event action menus
  const [openShareMenuId, setOpenShareMenuId] = useState(null);
  const [openCalendarMenuId, setOpenCalendarMenuId] = useState(null);

  const handleShare = (platform, evt, e) => {
    e.stopPropagation();
    shareToPlatform(platform, evt, lang);
    setOpenShareMenuId(null);
  };

  const handleCalendar = (type, evt, e) => {
    e.stopPropagation();

    if (type === 'google') {
      openGoogleCalendar(evt);
    } else if (type === 'apple') {
      openAppleCalendar(evt);
    }

    setOpenCalendarMenuId(null);
  };

  /*
   * -------------------------------------------------------------
   * FORMAT DATE
   * -------------------------------------------------------------
   */
  const formatScheduleDate = dateStr => {
    try {
      const [y, m, d] = dateStr
        .split('-')
        .map(Number);

      const dateObj = new Date(
        y,
        m - 1,
        d
      );

      const daysEn = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
      ];

      const daysTe = [
        'ఆది',
        'సోమ',
        'మంగళ',
        'బుధ',
        'గురు',
        'శుక్ర',
        'శని'
      ];

      const monthsShortEn = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ];

      const monthsShortTe = [
        'జన',
        'ఫిబ్ర',
        'మార్చి',
        'ఏప్రి',
        'మే',
        'జూన్',
        'జూలై',
        'ఆగ',
        'సెప్టెం',
        'అక్టో',
        'నవం',
        'డిసెం'
      ];

      const dayOfWeek =
        lang === 'en'
          ? daysEn[dateObj.getDay()]
          : daysTe[dateObj.getDay()];

      const dayNum = dateObj.getDate();

      const monthShort =
        lang === 'en'
          ? monthsShortEn[dateObj.getMonth()]
          : monthsShortTe[dateObj.getMonth()];

      const monthFull =
        dateObj.toLocaleString(
          lang === 'en'
            ? 'en-US'
            : 'te-IN',
          {
            month: 'long',
            year: 'numeric'
          }
        );

      return {
        dayOfWeek,
        dayNum,
        monthShort,
        monthFull,
        year: y,
        monthIndex: m - 1,
        dateObj
      };
    } catch {
      return {
        dayOfWeek: '',
        dayNum: dateStr,
        monthShort: '',
        monthFull: '',
        year: 2026,
        monthIndex: 0,
        dateObj: new Date()
      };
    }
  };

  /*
   * -------------------------------------------------------------
   * IMPORTANT:
   * REMOVE COMPLETED EVENTS
   *
   * Event is visible if:
   *
   * endDate >= today
   *
   * This means:
   *
   *  Aug 20 - Aug 20  -> hidden
   *  Aug 20 - Aug 22  -> shown
   *  Aug 21 - Aug 21  -> shown
   *  Aug 22 - Aug 22  -> shown
   * -------------------------------------------------------------
   */
  const upcomingEvents = (Array.isArray(events)
    ? events
    : []
  )
    .filter(evt => {
      if (!evt?.startDate || !evt?.endDate) {
        return false;
      }

      return evt.endDate >= todayStr;
    })
    .sort((a, b) => {
      const dateCompare =
        a.startDate.localeCompare(
          b.startDate
        );

      if (dateCompare !== 0) {
        return dateCompare;
      }

      return String(a.title || '').localeCompare(
        String(b.title || '')
      );
    });

  /*
   * -------------------------------------------------------------
   * GROUP EVENTS BY MONTH
   * -------------------------------------------------------------
   */
  const eventsByMonth =
    upcomingEvents.reduce(
      (acc, evt) => {
        const { monthFull } =
          formatScheduleDate(
            evt.startDate
          );

        const key =
          monthFull ||
          evt.startDate.substring(0, 7);

        if (!acc[key]) {
          acc[key] = [];
        }

        acc[key].push(evt);

        return acc;
      },
      {}
    );

  const monthKeys =
    Object.keys(eventsByMonth);

  /*
   * -------------------------------------------------------------
   * FALLBACK MONTH FILTER
   * -------------------------------------------------------------
   */
  const effectiveMonthFilter =
    activeMonthFilter !== 'all' &&
    !monthKeys.includes(
      activeMonthFilter
    )
      ? monthKeys.length > 0
        ? monthKeys[0]
        : 'all'
      : activeMonthFilter;

  /*
   * -------------------------------------------------------------
   * FORMAT TODAY LABEL
   * -------------------------------------------------------------
   */
  const todayLabel = (() => {
    try {
      const [y, m, d] =
        todayStr.split('-').map(Number);

      const date = new Date(
        y,
        m - 1,
        d
      );

      return date.toLocaleDateString(
        lang === 'en'
          ? 'en-IN'
          : 'te-IN',
        {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }
      );
    } catch {
      return todayStr;
    }
  })();

  return (
    <div className="space-y-6">

      {/* =========================================================
          SCHEDULE HEADER
      ========================================================== */}

      <div className="glass-card p-4 border-2 border-[#D4AF37]/40 flex flex-wrap items-center justify-between gap-3 bg-[#0B0E14] shadow-xl">

        <div className="flex items-center gap-2.5">

          <div className="w-9 h-9 rounded-xl bg-[#FF5722]/20 border border-[#FF5722]/50 flex items-center justify-center text-[#FF5722]">
            <Clock className="w-5 h-5" />
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold gold-gradient-text">
              {lang === 'en'
                ? 'Schedule View'
                : 'షెడ్యూల్ దర్శిని'}
            </h3>

            <p className="text-[11px] text-[#94A3B8]">
              {lang === 'en'
                ? `Upcoming events from ${todayLabel}`
                : `${todayLabel} నుండి రాబోయే ఉత్సవాలు`}
            </p>
          </div>

        </div>

        {/* Month Filters */}
        {monthKeys.length > 1 && (
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 max-w-full">

            <button
              type="button"
              onClick={() =>
                setActiveMonthFilter('all')
              }
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 ${
                effectiveMonthFilter === 'all'
                  ? 'bg-[#FF5722] text-white shadow-md'
                  : 'bg-[#141923] text-[#94A3B8] hover:text-white border border-white/10'
              }`}
            >
              {lang === 'en'
                ? 'All Upcoming'
                : 'అన్ని రాబోయే ఉత్సవాలు'}
            </button>

            {monthKeys.map(monthName => (
              <button
                type="button"
                key={monthName}
                onClick={() =>
                  setActiveMonthFilter(
                    monthName
                  )
                }
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 ${
                  effectiveMonthFilter ===
                  monthName
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black shadow-md'
                    : 'bg-[#141923] text-[#94A3B8] hover:text-[#FFD700] border border-white/10'
                }`}
              >
                {monthName}
              </button>
            ))}

          </div>
        )}

      </div>

      {/* =========================================================
          NO UPCOMING EVENTS
      ========================================================== */}

      {upcomingEvents.length === 0 && (
        <div className="glass-card p-12 text-center text-[#94A3B8] space-y-3">

          <Calendar className="w-12 h-12 mx-auto text-[#D4AF37]/40" />

          <h3 className="font-serif text-lg font-bold text-white">
            {lang === 'en'
              ? 'No Upcoming Events'
              : 'రాబోయే ఉత్సవాలు లేవు'}
          </h3>

          <p className="text-xs text-[#64748B]">
            {lang === 'en'
              ? 'There are no active or upcoming temple events at this time.'
              : 'ప్రస్తుతం క్రియాశీల లేదా రాబోయే ఆలయ ఉత్సవాలు లేవు.'}
          </p>

        </div>
      )}

      {/* =========================================================
          UPCOMING EVENTS
      ========================================================== */}

      {monthKeys.map(monthName => {

        if (
          effectiveMonthFilter !== 'all' &&
          effectiveMonthFilter !== monthName
        ) {
          return null;
        }

        const monthEvents =
          eventsByMonth[monthName];

        return (
          <div
            key={monthName}
            className="space-y-3"
          >

            {/* Month Header */}
            <div className="sticky top-16 z-20 bg-[#0B0E14]/95 backdrop-blur-md py-2 px-3 rounded-xl border-b border-[#D4AF37]/30 flex items-center justify-between shadow-md">

              <span className="font-serif font-extrabold text-sm sm:text-base text-[#FFD700] tracking-wide flex items-center gap-2">

                <span className="w-2 h-2 rounded-full bg-[#FF5722]" />

                {monthName}

              </span>

              <span className="text-[11px] font-mono font-bold text-[#94A3B8] bg-[#141923] px-2.5 py-0.5 rounded-full border border-white/10">

                {monthEvents.length}{' '}

                {lang === 'en'
                  ? monthEvents.length === 1
                    ? 'upcoming event'
                    : 'upcoming events'
                  : 'రాబోయే ఉత్సవాలు'}

              </span>

            </div>

            {/* =====================================================
                EVENT LIST
            ====================================================== */}

            <div className="space-y-3 pl-1 sm:pl-2">

              {monthEvents.map(evt => {

                const dateInfo =
                  formatScheduleDate(
                    evt.startDate
                  );

                const isToday =
                  evt.startDate <= todayStr &&
                  evt.endDate >= todayStr;

                const isFuture =
                  evt.startDate > todayStr;

                const temple =
                  TEMPLES.find(
                    t =>
                      t.id ===
                      evt.templeId
                  );

                const statusObj =
                  getEventStatus(
                    evt.startDate,
                    evt.endDate
                  );

                /*
                 * -------------------------------------------------
                 * COLLECT IMAGES
                 * -------------------------------------------------
                 */
                const evtImages = [];

                if (
                  Array.isArray(evt.images) &&
                  evt.images.length > 0
                ) {
                  evt.images.forEach(img => {

                    if (
                      typeof img === 'string' &&
                      img.trim()
                    ) {
                      evtImages.push(
                        normalizeImageUrl(
                          img.trim()
                        )
                      );
                    } else if (
                      img &&
                      img.url &&
                      img.url.trim()
                    ) {
                      evtImages.push(
                        normalizeImageUrl(
                          img.url.trim()
                        )
                      );
                    }

                  });
                }

                if (
                  evtImages.length === 0 &&
                  evt.imageUrl
                ) {
                  evtImages.push(
                    normalizeImageUrl(
                      evt.imageUrl.trim()
                    )
                  );
                }

                return (
                  <div
                    key={evt.id}
                    className="flex items-start gap-2.5 sm:gap-4 group cursor-pointer"
                    onClick={() =>
                      onSelectEvent(evt)
                    }
                  >

                    {/* =================================================
                        DATE COLUMN
                    ================================================== */}

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

                      {/* TODAY LABEL */}
                      {isToday && (
                        <span className="mt-1 text-[8px] font-black uppercase text-[#FF5722] tracking-wide">
                          {lang === 'en'
                            ? 'Today'
                            : 'ఈ రోజు'}
                        </span>
                      )}

                    </div>

                    {/* =================================================
                        EVENT CARD
                    ================================================== */}

                    <div
                      className={`flex-grow glass-card p-3.5 sm:p-4 rounded-2xl border border-white/10 group-hover:border-[#FFD700] group-hover:scale-[1.01] transition-all duration-300 shadow-lg group-hover:shadow-2xl relative overflow-visible flex flex-col sm:flex-row justify-between gap-3 cursor-pointer ${
                        isToday
                          ? 'ring-1 ring-[#FF5722]/40'
                          : ''
                      }`}
                      style={{
                        borderLeft: `5px solid ${
                          temple?.color ||
                          '#FFD700'
                        }`
                      }}
                    >

                      {/* EVENT DETAILS */}

                      <div className="space-y-1.5 flex-grow">

                        <div className="flex flex-wrap items-center gap-1.5">

                          <span
                            className="px-2 py-0.5 rounded text-[10px] font-extrabold text-black shadow"
                            style={{
                              backgroundColor:
                                temple?.color ||
                                '#FFD700'
                            }}
                          >
                            {lang === 'en'
                              ? temple?.name ||
                                'Tirumala'
                              : temple?.nameTe ||
                                temple?.name ||
                                'తిరుమల'}
                          </span>

                          {/* TODAY / UPCOMING STATUS */}

                          {isToday ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-[#FF5722] text-white shadow">
                              {lang === 'en'
                                ? 'TODAY'
                                : 'ఈ రోజు'}
                            </span>
                          ) : isFuture ? (
                            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${statusObj.colorClass}`}>
                              {lang === 'en'
                                ? statusObj.status
                                : statusObj.statusTe}
                            </span>
                          ) : null}

                          {evtImages.length > 0 && (
                            <span className="px-1.5 py-0.5 rounded bg-black/60 text-[#FFD700] text-[10px] font-bold flex items-center gap-1 border border-[#FFD700]/30">
                              <ImageIcon className="w-3 h-3" />
                              <span>
                                {evtImages.length}
                              </span>
                            </span>
                          )}

                        </div>

                        {/* TITLE */}

                        <h4 className="event-card-title font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-[#FFD700] transition-colors leading-snug">

                          {lang === 'en'
                            ? evt.title
                            : evt.titleTe ||
                              evt.title}

                        </h4>

                        {/* DATE RANGE / VAHANAM */}

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#94A3B8]">

                          <span className="font-mono text-[#FFD700] font-bold flex items-center gap-1">

                            <Calendar className="w-3.5 h-3.5 text-[#FF5722]" />

                            {evt.startDate ===
                            evt.endDate
                              ? evt.startDate
                              : `${evt.startDate} to ${evt.endDate}`}

                          </span>

                          {evt.vahanam && (
                            <span className="text-[#FF5722] font-semibold">
                              🛕 {evt.vahanam}
                            </span>
                          )}

                        </div>

                        {/* DESCRIPTION */}

                        {(evt.description ||
                          evt.descriptionTe) && (
                          <p className="text-xs text-[#94A3B8]/90 line-clamp-2 leading-relaxed">

                            {lang === 'en'
                              ? evt.description
                              : evt.descriptionTe ||
                                evt.description}

                          </p>
                        )}

                      </div>

                      {/* =================================================
                          RIGHT ACTION / IMAGE
                      ================================================== */}

                      <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 sm:border-l border-white/10 sm:pl-3">

                        {evtImages.length > 0 && (
                          <div className="w-20 h-16 sm:w-24 sm:h-20 rounded-xl overflow-hidden border border-white/20 relative shadow shrink-0">

                            <img
                              src={evtImages[0]}
                              alt={
                                evt.title ||
                                'Temple event'
                              }
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              onError={e => {
                                e.currentTarget.parentElement.style.display =
                                  'none';
                              }}
                            />

                            {evtImages.length > 1 && (
                              <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/80 text-[#FFD700] text-[8px] font-mono font-bold">
                                +{evtImages.length - 1}
                              </span>
                            )}

                          </div>
                        )}

                        <div className="flex items-center gap-1.5 ml-auto sm:ml-0">

                          {/* SHARE MENU */}

                          <div className="relative">
                            <button
                              type="button"
                              onClick={e => {
                                e.stopPropagation();
                                setOpenCalendarMenuId(null);
                                setOpenShareMenuId(prev =>
                                  prev === evt.id ? null : evt.id
                                );
                              }}
                              className="p-1.5 rounded-lg bg-[#FF5722] hover:bg-[#E64A19] text-white font-extrabold text-xs shadow"
                              title="Share Event"
                              aria-label="Share Event"
                            >
                              <Share2 className="w-3.5 h-3.5 text-white" />
                            </button>

                            {openShareMenuId === evt.id && (
                              <div
                                className="absolute right-0 bottom-full mb-2 z-50 w-48 rounded-xl border border-[#D4AF37]/50 bg-[#0B0E14] shadow-2xl p-2"
                                onClick={e => e.stopPropagation()}
                              >
                                <div className="px-2 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#FFD700] border-b border-white/10 mb-1">
                                  {lang === 'en' ? 'Share Event' : 'ఉత్సవాన్ని షేర్ చేయండి'}
                                </div>

                                <div className="grid grid-cols-2 gap-1">
                                  {[
                                    ['whatsapp', 'WhatsApp', 'bg-[#25D366] text-black'],
                                    ['x', 'X', 'bg-black text-white border border-white/20'],
                                    ['instagram', 'Instagram', 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white'],
                                    ['facebook', 'Facebook', 'bg-[#1877F2] text-white'],
                                    ['threads', 'Threads', 'bg-black text-white border border-white/20'],
                                    ['telegram', 'Telegram', 'bg-[#229ED9] text-white'],
                                    ['reddit', 'Reddit', 'bg-[#FF4500] text-white'],
                                    ['copy', 'Copy Link', 'bg-[#141923] text-[#FFD700] border border-[#D4AF37]/40']
                                  ].map(([platform, label, classes]) => (
                                    <button
                                      key={platform}
                                      type="button"
                                      onClick={e =>
                                        handleShare(platform, evt, e)
                                      }
                                      className={`px-2 py-2 rounded-lg text-[10px] font-extrabold shadow-sm hover:brightness-110 transition ${classes}`}
                                    >
                                      {label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* CALENDAR MENU */}

                          <div className="relative">
                            <button
                              type="button"
                              onClick={e => {
                                e.stopPropagation();
                                setOpenShareMenuId(null);
                                setOpenCalendarMenuId(prev =>
                                  prev === evt.id ? null : evt.id
                                );
                              }}
                              className="p-1.5 rounded-lg bg-[#4285F4] hover:bg-[#3367D6] text-white font-extrabold text-xs shadow"
                              title="Add to Calendar"
                              aria-label="Add to Calendar"
                            >
                              <Calendar className="w-3.5 h-3.5 text-white" />
                            </button>

                            {openCalendarMenuId === evt.id && (
                              <div
                                className="absolute right-0 bottom-full mb-2 z-50 w-44 rounded-xl border border-[#D4AF37]/50 bg-[#0B0E14] shadow-2xl p-2"
                                onClick={e => e.stopPropagation()}
                              >
                                <div className="px-2 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#FFD700] border-b border-white/10 mb-1">
                                  {lang === 'en' ? 'Add to Calendar' : 'క్యాలెండర్‌కు జోడించండి'}
                                </div>

                                <button
                                  type="button"
                                  onClick={e =>
                                    handleCalendar('google', evt, e)
                                  }
                                  className="w-full px-3 py-2 rounded-lg bg-[#4285F4] hover:bg-[#3367D6] text-white text-xs font-extrabold text-left"
                                >
                                  Google Calendar
                                </button>

                                <button
                                  type="button"
                                  onClick={e =>
                                    handleCalendar('apple', evt, e)
                                  }
                                  className="w-full mt-1 px-3 py-2 rounded-lg bg-black hover:bg-slate-900 border border-[#FFD700]/60 text-[#FFD700] text-xs font-extrabold text-left"
                                >
                                  Apple Calendar / iCal
                                </button>
                              </div>
                            )}
                          </div>

                          {/* DETAILS */}

                          <span className="p-1.5 rounded-lg bg-[#141923] text-[#FFD700] group-hover:bg-[#FFD700] group-hover:text-black transition-colors">
                            <ChevronRight className="w-4 h-4" />
                          </span>

                          {/* ADMIN */}

                          {isAdminLoggedIn && (
                            <>
                              <button
                                type="button"
                                onClick={e => {
                                  e.stopPropagation();
                                  onEditEvent(evt);
                                }}
                                className="p-1.5 rounded bg-[#FF5722] text-white text-xs shadow hover:brightness-110"
                                title="Edit Event"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>

                              <button
                                type="button"
                                onClick={e => {
                                  e.stopPropagation();

                                  if (
                                    window.confirm(
                                      `Delete event "${evt.title}"?`
                                    )
                                  ) {
                                    onDeleteEvent(
                                      evt.id
                                    );
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