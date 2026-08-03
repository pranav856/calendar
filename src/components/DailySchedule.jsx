import React, { useState } from 'react';
import { Clock, Utensils, Sparkles, Calendar, Ticket, Layers, Info } from 'lucide-react';

// Exact day-by-day weekly sevas extracted from TTD Official Schedule Images
export const WEEKLY_MAIN_TEMPLE_SEVAS = [
  {
    day: 'Monday',
    dayTe: 'సోమవారం',
    specialSeva: 'Special Seva: Vishesha Puja (05:30 to 07:00 hrs) (Weekly Seva)',
    color: '#FF5722',
    schedule: [
      { time: '03:00 - 03:30 hrs', seva: 'Suprabhatam', desc: 'Awakening ritual with sacred hymns' },
      { time: '03:30 - 04:00 hrs', seva: 'Thomala Seva (Ekantam)', desc: 'Garland decoration ritual' },
      { time: '04:00 - 04:15 hrs', seva: 'Koluvu and Panchanga Sravanam (Ekantam)', desc: 'Royal court & daily almanac reading' },
      { time: '04:15 - 05:00 hrs', seva: 'First Archana i.e., Sahasranama Archana (Ekantam)', desc: '1000 Holy Names recitation' },
      { time: '08:00 - 09:00 hrs', seva: 'Visesha Puja (Weekly Seva)', desc: 'Special Monday Visesha Homam & Puja' },
      { time: '07:00 - 19:00 hrs', seva: 'Sarva Darshanam', desc: 'General pilgrim darshan' },
      { time: '12:00 - 17:00 hrs', seva: 'Kalyanotsavam, Brahmotsavam, Vasanthostavam, Unjal Seva', desc: 'Arjitha Sevas in Sampangi Prakaram' },
      { time: '17:30 - 18:30 hrs', seva: 'Sahasra Deepalankarana Seva', desc: '1000 Ghee Lamp Swing Ritual' },
      { time: '19:00 - 20:00 hrs', seva: 'Suddhi, Night Kainkaryams (Ekantam) and Night Bell', desc: 'Night cleansing & offerings' },
      { time: '20:00 - 01:00 hrs', seva: 'Night Darshanam', desc: 'Late evening general darshan' },
      { time: '01:00 - 01:30 hrs', seva: 'Suddi and preparations for Ekanta Seva', desc: 'Final repose preparations' },
      { time: '01:30 hrs', seva: 'Ekanta Seva', desc: 'Lullaby and night slumber' }
    ]
  },
  {
    day: 'Tuesday',
    dayTe: 'మంగళవారం',
    specialSeva: 'Special Seva: Ashtadala Pada Padmaradhana (06:00 - 07:00 hrs) (Weekly Seva)',
    color: '#FFB703',
    schedule: [
      { time: '03:00 - 03:30 hrs', seva: 'Suprabhatam', desc: 'Awakening ritual' },
      { time: '03:30 - 04:00 hrs', seva: 'Thomala Seva', desc: 'Garland decoration' },
      { time: '04:00 - 04:15 hrs', seva: 'Koluvu and Panchanga Sravanam (Ekantam)', desc: 'Daily court & almanac' },
      { time: '04:15 - 05:00 hrs', seva: 'First Archana i.e., Sahasranama Archana', desc: '1000 names chanting' },
      { time: '06:00 - 07:00 hrs', seva: 'Suddi Ashtadala Pada Padmaradhana Second Bell (Weekly Seva)', desc: '108 Gold Lotus Flowers worship' },
      { time: '07:00 - 19:00 hrs', seva: 'Darshanam', desc: 'General darshan hours' },
      { time: '12:00 - 17:00 hrs', seva: 'Kalyanostavam, Brahmostavam, Vasanthostavam, Unjal Seva', desc: 'Daytime Arjitha Sevas' },
      { time: '17:30 - 18:30 hrs', seva: 'Sahasra Deepalankarana Seva', desc: '1000 lamps swing seva' },
      { time: '19:00 - 20:00 hrs', seva: 'Suddhi, Night Kainkaryams (Ekantam) and Night Bell', desc: 'Cleansing & night bell' },
      { time: '20:00 - 01:00 hrs', seva: 'Darshanam', desc: 'Night darshan' },
      { time: '01:00 - 01:30 hrs', seva: 'Suddi and preparations for Ekanta Seva', desc: 'Repose setup' },
      { time: '01:30 hrs', seva: 'Ekanta Seva', desc: 'Final night repose' }
    ]
  },
  {
    day: 'Wednesday',
    dayTe: 'బుధవారం',
    specialSeva: 'Special Seva: Sahasrakalasa Abhishekam (06:00 - 08:00 hrs) (Weekly Seva)',
    color: '#3A86EF',
    schedule: [
      { time: '03:00 - 03:30 hrs', seva: 'Suprabhatam', desc: 'Morning invocation' },
      { time: '03:30 - 04:00 hrs', seva: 'Thomala Seva', desc: 'Garland decoration' },
      { time: '04:00 - 04:15 hrs', seva: 'Koluvu and Panchanga Sravanam inside Bangaru Vakili (Ekantam)', desc: 'Sanctum court' },
      { time: '04:15 - 05:00 hrs', seva: 'First Archana i.e., Sahasranama Archana (Ekantam)', desc: 'Archana chanting' },
      { time: '06:00 - 08:00 hrs', seva: 'SahasraKalasa Abhishekam Second Archana (Ekantam) and Bell (Weekly Seva)', desc: '1008 Silver Vessel Holy Water Bath' },
      { time: '09:30 - 19:00 hrs', seva: 'Darshanam', desc: 'Daytime pilgrim darshan' },
      { time: '12:00 - 17:00 hrs', seva: 'Kalyanostavam, Brahmostavam, Vasanthostavam, Unjal Seva', desc: 'Daily Arjitha Sevas' },
      { time: '17:30 - 18:30 hrs', seva: 'Sahasra Deepalankarana Seva', desc: '1000 ghee lamps seva' },
      { time: '19:00 - 20:00 hrs', seva: 'Suddhi, Night Kainkaryams (Ekantam) and Night Bell', desc: 'Night kainkaryam' },
      { time: '20:00 - 01:00 hrs', seva: 'Darshanam', desc: 'Night darshan' },
      { time: '01:00 - 01:30 hrs', seva: 'Suddi and preparations for Ekanta Seva', desc: 'Bedtime preparations' },
      { time: '01:30 hrs', seva: 'Ekanta Seva', desc: 'Final night slumber' }
    ]
  },
  {
    day: 'Thursday',
    dayTe: 'గురువారం',
    specialSeva: 'Special Seva: Tiruppavada (06:00 - 08:00 hrs) & Poolangi Alankaram (21:00 - 22:00 hrs) (Weekly Seva)',
    color: '#800020',
    schedule: [
      { time: '03:00 - 03:30 hrs', seva: 'Suprabhatam', desc: 'Morning awakening' },
      { time: '03:30 - 04:00 hrs', seva: 'Thomala Seva', desc: 'Flower decoration' },
      { time: '04:00 - 04:15 hrs', seva: 'Koluvu and Panchanga Sravanam inside Bangaru Vakili (Ekantam)', desc: 'Court & almanac' },
      { time: '04:15 - 05:00 hrs', seva: 'First Archana i.e., Sahasranama Archana', desc: '1000 names archana' },
      { time: '06:00 - 07:00 hrs', seva: 'Sallimpu, Second Archana (Ekantam), Tiruppavada, Second Bell (Weekly Seva)', desc: 'Pulihora mound offering' },
      { time: '08:00 - 19:00 hrs', seva: 'Darshanam', desc: 'Daytime pilgrim darshan' },
      { time: '12:00 - 17:00 hrs', seva: 'Kalyanostavam, Brahmostavam, Vasanthostavam, Unjal Seva', desc: 'Arjitha Sevas' },
      { time: '17:30 - 18:30 hrs', seva: 'Sahasra Deepalankarana Seva', desc: 'Lamp swing ritual' },
      { time: '19:00 - 21:00 hrs', seva: 'Pedda Suddhi, Night Kainkaryams, Poolangi Alankaram and Night Bell', desc: 'Full Flower Armour Adornment' },
      { time: '21:00 - 01:00 hrs', seva: 'Poolangi Alankaram and Darshanam (Weekly Seva)', desc: 'Darshan of Lord adorned in Jasmine Garlands' },
      { time: '01:00 - 01:30 hrs', seva: 'Suddi and preparations for Ekanta Seva', desc: 'Late night setup' },
      { time: '01:30 hrs', seva: 'Ekanta Seva', desc: 'Final night slumber' }
    ]
  },
  {
    day: 'Friday',
    dayTe: 'శుక్రవారం',
    specialSeva: 'Special Seva: Abhishekam & Nijapada Darsanam (04:30 - 06:00 hrs) (Weekly Seva)',
    color: '#D4AF37',
    schedule: [
      { time: '03:00 - 03:30 hrs', seva: 'Suprabhatam', desc: 'Morning awakening' },
      { time: '03:00 - 04:00 hrs', seva: 'Sallimpu, Suddi, Nityakatla Kainkaryams, Morning I Bell and preparation for Abhishekam', desc: 'Sanctum preparation' },
      { time: '04:30 - 06:00 hrs', seva: 'Abhishekam and Nijapada Darsanam (Weekly Seva)', desc: 'Holy Fragrant Water Bath & Feet Darshan' },
      { time: '06:00 - 07:00 hrs', seva: 'Samarpana', desc: 'Offering of fresh Vastrams' },
      { time: '07:00 - 08:00 hrs', seva: 'Thomala Seva and Archana (Ekantam)', desc: 'Garland adornment & Archana' },
      { time: '09:00 - 20:00 hrs', seva: 'Darshanam', desc: 'Daytime pilgrim darshan' },
      { time: '12:00 - 17:00 hrs', seva: 'Kalyanostavam, Brahmostavam, Vasanthostavam, Unjal Seva', desc: 'Arjitha Sevas' },
      { time: '18:00 - 20:00 hrs', seva: 'Sahasra Deepalankarana Seva at Kolimi Mandapam and Procession along Mada streets', desc: 'Street Procession' },
      { time: '20:00 - 21:00 hrs', seva: 'Suddhi, Night Kainkaryams (Ekantam) and Night Bell', desc: 'Night cleansing' },
      { time: '21:00 - 01:00 hrs', seva: 'Darshanam', desc: 'Night general darshan' },
      { time: '01:00 - 01:30 hrs', seva: 'Suddi and preparations for Ekanta Seva', desc: 'Bedtime preparations' },
      { time: '01:30 hrs', seva: 'Ekanta Seva', desc: 'Final night slumber' }
    ]
  },
  {
    day: 'Saturdays & Sundays',
    dayTe: 'శని & ఆదివారాలు',
    specialSeva: 'Weekend High Pilgrim Demand Hours (Darshanam may continue beyond 01:00 hrs)',
    color: '#9C27B0',
    schedule: [
      { time: '03:00 - 03:30 hrs', seva: 'Suprabhatam', desc: 'Morning awakening' },
      { time: '03:30 - 04:00 hrs', seva: 'ThomalaSeva (Ekantam)', desc: 'Garland decoration (Ekantam)' },
      { time: '04:00 - 04:15 hrs', seva: 'Koluvu and Panchanga Sravanam (Ekantam)', desc: 'Court & almanac' },
      { time: '04:00 - 04:30 hrs', seva: 'First Archana, Sahasranama Archana (Ekantam)', desc: '1000 names archana' },
      { time: '06:30 - 07:00 hrs', seva: 'FirstBell, Bali and Sattumura', desc: 'Morning bell & offering' },
      { time: '07:00 - 07:30 hrs', seva: 'Suddhi Second Archana (Ekantam), SecondBell, etc.', desc: 'Second Archana' },
      { time: '07:30 - 19:00 hrs', seva: 'Darshanam', desc: 'Continuous weekend darshan' },
      { time: '12:00 - 17:00 hrs', seva: 'Kalyanostavam, Brahmostavam, Vasanthostavam, Unjal Seva', desc: 'Arjitha Sevas' },
      { time: '17:30 - 18:30 hrs', seva: 'Sahasra Deepalankarana Seva', desc: '1000 ghee lamps seva' },
      { time: '19:00 - 20:00 hrs', seva: 'Suddhi, Night Kainkaryams (Ekantam) and Night Bell', desc: 'Cleansing & night bell' },
      { time: '20:00 - 01:00 hrs', seva: 'Darshanam', desc: 'Late night weekend darshan' },
      { time: '01:00 - 01:30 hrs', seva: 'Suddi and preparations for Ekanta Seva', desc: 'Repose setup' },
      { time: '01:30 hrs', seva: 'Ekanta Seva', desc: 'Night repose' }
    ]
  }
];

// WEEKLY SEVAS PERFORMED AT SRIVARI TEMPLE (Clean Table: Day, Seva Name, Seva Time)
export const OFFICIAL_WEEKLY_SEVAS_TABLE = [
  {
    day: 'Monday',
    sevaName: 'Visesha Pooja',
    isWeeklySeva: true,
    sevaTime: '07:30 a.m.'
  },
  {
    day: 'Tuesday',
    sevaName: 'Ashtadala Pada Padmaradhana',
    isWeeklySeva: true,
    sevaTime: '06:00 a.m.'
  },
  {
    day: 'Wednesday',
    sevaName: 'Sahasra Kalasabhishekam',
    isWeeklySeva: true,
    sevaTime: '06:00 a.m.'
  },
  {
    day: 'Thursday',
    sevaName: 'Tiruppavada Seva',
    isWeeklySeva: true,
    sevaTime: '06:15 a.m.'
  },
  {
    day: 'Friday',
    sevaName: 'Abhishekam',
    isWeeklySeva: true,
    sevaTime: '03:30 a.m.'
  },
  {
    day: 'Friday',
    sevaName: 'Civet Vessel',
    isWeeklySeva: true,
    sevaTime: '03:30 a.m.'
  },
  {
    day: 'Friday',
    sevaName: 'Musk Vessel',
    isWeeklySeva: true,
    sevaTime: '03:30 a.m.'
  },
  {
    day: 'Friday',
    sevaName: 'Nijapada Darsanam',
    isWeeklySeva: true,
    sevaTime: '05:30 a.m.'
  },
  {
    day: 'Friday',
    sevaName: 'Vastralankara Seva',
    isWeeklySeva: true,
    sevaTime: '03:30 a.m.'
  }
];

// PERIODICAL SEVAS PERFORMED AT SRIVARI TEMPLE
export const PERIODICAL_SEVAS_LIST = [
  { name: 'Teppotsavam or float festival', frequency: '5 days a Year (March)', category: 'Annual Periodical Seva' },
  { name: 'Vasanthotsavam', frequency: '3 days a year (March or April)', category: 'Annual Periodical Seva' },
  { name: 'Padmavathi Parinayam', frequency: '3 days a year (May)', category: 'Annual Periodical Seva' },
  { name: 'Abhideyaka Abhishekam', frequency: '3 days a year (June-Annual)', category: 'Annual Periodical Seva' },
  { name: 'Pushpa Pallaki', frequency: '(July)', category: 'Annual Periodical Seva' },
  { name: 'Pushpa Yagam', frequency: '(November)', category: 'Annual Periodical Seva' },
  { name: 'Koil Alwar Thirumanjanam', frequency: '(4 times in a year)', category: 'Quarterly Periodical Seva' },
  { name: 'Pavithrotsavams', frequency: '3 days a year (August)', category: 'Annual Periodical Seva' }
];

export default function DailySchedule({ lang }) {
  const [selectedDayTab, setSelectedDayTab] = useState('Monday');
  const [viewSection, setViewSection] = useState('daily'); // 'daily' | 'weekly-table' | 'periodical'

  const activeDayObj = WEEKLY_MAIN_TEMPLE_SEVAS.find(d => d.day === selectedDayTab) || WEEKLY_MAIN_TEMPLE_SEVAS[0];

  return (
    <div className="space-y-6 py-4">
      
      {/* Header */}
      <div className="glass-card p-6 border-l-4 border-l-[#FFD700] border-[#D4AF37]/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Clock className="w-6 h-6 text-[#FFD700]" />
            <h2 className="font-serif text-2xl font-bold gold-gradient-text">
              {lang === 'en' ? 'Srivari Temple Daily, Weekly & Periodical Sevas' : 'తిరుమల శ్రీవారి నిత్య, వారపు & కాలిక సేవల పట్టిక'}
            </h2>
          </div>
          <p className="text-sm text-[#94A3B8]">
            {lang === 'en'
              ? 'Official schedules for Lord Venkateswara Main Temple in Tirumala including day-wise Kainkaryams, Weekly Seva details, and Periodical Festivals.'
              : 'శ్రీవారి ఆలయంలో జరిగే నిత్య సేవలు, వారపు సేవలు మరియు వార్షిక కాలిక సేవల పూర్తి సమాచారం.'}
          </p>
        </div>

        {/* Section Switcher Tabs */}
        <div className="flex items-center gap-1 bg-[#0B0E14] p-1.5 rounded-xl border border-[#D4AF37]/40 shrink-0">
          <button
            onClick={() => setViewSection('daily')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              viewSection === 'daily'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black shadow-md'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Daily Timetable' : 'నిత్య సేవలు'}</span>
          </button>

          <button
            onClick={() => setViewSection('weekly-table')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              viewSection === 'weekly-table'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black shadow-md'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Weekly Sevas' : 'వారపు సేవలు'}</span>
          </button>

          <button
            onClick={() => setViewSection('periodical')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              viewSection === 'periodical'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black shadow-md'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Periodical Sevas' : 'కాలిక సేవలు'}</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: DAILY & WEEKLY DAY-BY-DAY TIMETABLE */}
      {viewSection === 'daily' && (
        <div className="space-y-4">
          {/* Day-by-Day Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {WEEKLY_MAIN_TEMPLE_SEVAS.map(dayItem => (
              <button
                key={dayItem.day}
                onClick={() => setSelectedDayTab(dayItem.day)}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold shrink-0 transition-all flex items-center gap-2 shadow-md ${
                  selectedDayTab === dayItem.day
                    ? 'bg-gradient-to-r from-[#FF5722] to-[#FFD700] text-black ring-2 ring-[#FFD700]'
                    : 'bg-[#141923] text-[#FFD700] border border-[#D4AF37]/50 hover:bg-[#D4AF37]/20'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>{lang === 'en' ? dayItem.day : dayItem.dayTe}</span>
              </button>
            ))}
          </div>

          {/* Active Day Timetable Card */}
          <div className="glass-card p-6 border-2 border-[#D4AF37]/40 space-y-4 bg-[#0B0E14] shadow-2xl">
            {/* Special Seva Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#990000] via-[#FF5722] to-[#990000] text-white flex flex-wrap items-center justify-between gap-3 shadow-lg">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FFD700] block">
                  {lang === 'en' ? `${activeDayObj.day} Highlight` : `${activeDayObj.dayTe} ముఖ్యాంశం`}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-extrabold text-white">
                  {activeDayObj.specialSeva}
                </h3>
              </div>
              <span className="px-3 py-1 bg-black/40 rounded-full text-xs font-bold border border-[#FFD700]/40 text-[#FFD700]">
                Tirumala Main Sanctum
              </span>
            </div>

            {/* Timetable List */}
            <div className="space-y-2 pt-2">
              {activeDayObj.schedule.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#141923] border border-[#D4AF37]/20 hover:border-[#FFD700] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5722] shrink-0"></span>
                    <div>
                      <h4 className="font-serif text-base font-bold text-white flex items-center gap-2">
                        <span>{item.seva}</span>
                      </h4>
                      <p className="text-xs text-[#94A3B8]">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="px-3 py-1 rounded-lg bg-[#0B0E14] border border-[#D4AF37]/40 text-xs font-mono font-bold text-[#FFD700] shrink-0 self-start sm:self-auto">
                    ⏱️ {item.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: CLEAN WEEKLY SEVAS TABLE (DAY, SEVA NAME WITH WEEKLY TAG, SEVA TIME) */}
      {viewSection === 'weekly-table' && (
        <div className="glass-card p-6 border-2 border-[#D4AF37]/40 space-y-4 bg-[#0B0E14] shadow-2xl">
          <div className="border-b border-[#D4AF37]/30 pb-3">
            <h3 className="font-serif text-xl font-bold text-[#FFD700] flex items-center gap-2">
              <Ticket className="w-5 h-5 text-[#FF5722]" />
              <span>{lang === 'en' ? 'Weekly Sevas Performed at Srivari Temple' : 'శ్రీవారి ఆలయంలో వారపు సేవల సమయాలు'}</span>
            </h3>
            <p className="text-xs text-[#94A3B8] mt-1">
              Specific day weekly sevas and their performed timing.
            </p>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#141923] text-[#FFD700] border-b border-[#D4AF37]/40 font-serif text-sm">
                  <th className="p-3.5">Day</th>
                  <th className="p-3.5">Seva Name</th>
                  <th className="p-3.5">Seva Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-white text-xs">
                {OFFICIAL_WEEKLY_SEVAS_TABLE.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[#141923]/60 transition-colors">
                    <td className="p-3.5 font-bold text-[#FF5722] text-sm">{row.day}</td>
                    <td className="p-3.5 font-extrabold text-white text-sm">
                      <span>{row.sevaName}</span>
                      <span className="ml-2 px-2 py-0.5 rounded bg-[#FFD700]/20 text-[#FFD700] text-[11px] font-bold border border-[#D4AF37]/40">
                        (Weekly Seva)
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-[#FFD700] font-bold text-sm">⏱️ {row.sevaTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 3: PERIODICAL SEVAS */}
      {viewSection === 'periodical' && (
        <div className="glass-card p-6 border-2 border-[#D4AF37]/40 space-y-4 bg-[#0B0E14] shadow-2xl">
          <div className="border-b border-[#D4AF37]/30 pb-3">
            <h3 className="font-serif text-xl font-bold text-[#FFD700] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#FF5722]" />
              <span>{lang === 'en' ? 'Periodical Sevas (Annual Religious Occurrences)' : 'శ్రీవారి ఆలయంలో కాలిక సేవలు'}</span>
            </h3>
            <p className="text-xs text-[#94A3B8] mt-1">
              Annual events of religious significance performed in Tirumala following the importance of particular asterism.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PERIODICAL_SEVAS_LIST.map((pSeva, pIdx) => (
              <div key={pIdx} className="p-4 rounded-xl bg-[#141923] border border-[#D4AF37]/30 flex items-center justify-between gap-3">
                <div>
                  <span className="badge-gold text-[10px] uppercase">{pSeva.category}</span>
                  <h4 className="font-serif text-base font-bold text-white mt-1">
                    {pSeva.name}
                  </h4>
                </div>

                <div className="px-3 py-1.5 rounded-lg bg-[#0B0E14] border border-[#FF5722]/50 text-xs font-mono font-bold text-[#FFD700] shrink-0">
                  {pSeva.frequency}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}



    </div>
  );
}
