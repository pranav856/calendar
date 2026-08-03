// Helper utility to calculate live event status based on current IST date
export function getEventStatus(startDate, endDate) {
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  if (todayStr >= startDate && todayStr <= endDate) {
    return {
      status: 'LIVE NOW',
      statusTe: 'ప్రస్తుతం జరుగుతోంది',
      colorClass: 'bg-emerald-500 text-white animate-pulse',
      bgCardBorder: 'border-emerald-500/50'
    };
  } else if (todayStr < startDate) {
    return {
      status: 'UPCOMING',
      statusTe: 'రాబోయే ఉత్సవం',
      colorClass: 'bg-[#FF5722] text-white',
      bgCardBorder: 'border-[#D4AF37]/30'
    };
  } else {
    return {
      status: 'COMPLETED',
      statusTe: 'పూర్తయినది',
      colorClass: 'bg-[#94A3B8]/30 text-[#94A3B8]',
      bgCardBorder: 'border-white/10'
    };
  }
}

// Download standard .ics file for Google Calendar, Apple Calendar, Outlook
export function downloadIcsCalendarFile(event) {
  const title = event.title || 'Tirumala Temple Event';
  const description = event.description || 'Tirumala Utsavam Event';
  const startDateStr = (event.startDate || '').replace(/-/g, '');
  const endDateStr = (event.endDate || event.startDate || '').replace(/-/g, '');

  const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Tirumala Utsavam Portal//NONSGML v1.0//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${event.id || Date.now()}@tirumala-utsavam
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART;VALUE=DATE:${startDateStr}
DTEND;VALUE=DATE:${endDateStr}
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:Tirumala Tirupati Devasthanams
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${title.replace(/\s+/g, '_')}_Tirumala.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Open Google Calendar Event Creation URL directly
export function openGoogleCalendar(event) {
  const title = encodeURIComponent(event.title || 'Tirumala Temple Event');
  const description = encodeURIComponent((event.description || '') + (event.location ? `\n\nLocation: ${event.location}` : ''));
  const location = encodeURIComponent(event.location || 'Tirumala Tirupati Devasthanams');
  
  const start = (event.startDate || '').replace(/-/g, '');
  let end = (event.endDate || event.startDate || '').replace(/-/g, '');
  
  if (start === end) {
    const sDate = new Date(event.startDate);
    sDate.setDate(sDate.getDate() + 1);
    end = sDate.toISOString().split('T')[0].replace(/-/g, '');
  }

  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${description}&location=${location}`;
  window.open(googleUrl, '_blank');
}

// 1-Click WhatsApp Share for Mobile & Computer
export function shareToWhatsApp(event, lang = 'en') {
  const title = lang === 'te' && event.titleTe ? event.titleTe : event.title;
  const date = event.startDate === event.endDate ? event.startDate : `${event.startDate} to ${event.endDate}`;
  const time = event.time ? `\n⏰ Time: ${event.time}` : '';
  const location = event.location ? `\n🛕 Location: ${event.location}` : '';
  const vahanam = event.vahanam ? `\n🐎 Vahanam: ${event.vahanam}` : '';
  
  const text = `🙏 *Tirumala Temple Event Update* 🙏\n\n✨ *${title}*\n📅 Date: ${date}${time}${location}${vahanam}\n\n📖 Read full schedule on The Tirumala Verse:\n${window.location.href}`;
  
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(whatsappUrl, '_blank');
}
