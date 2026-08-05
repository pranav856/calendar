// Helper utility to calculate live event status based on current IST date
export function getEventStatus(startDate, endDate) {
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  if (todayStr >= startDate && todayStr <= endDate) {
    return {
      status: 'LIVE NOW',
      statusTe: '🔴 ప్రత్యక్ష సేవ / ప్రసారం',
      colorClass: 'bg-red-600 text-white font-extrabold animate-pulse shadow-lg ring-2 ring-red-400',
      bgCardBorder: 'border-red-500/80 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
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

// Open Apple Calendar (.ics data URL / webcal handler)
export function openAppleCalendar(event) {
  const title = event.title || 'Tirumala Temple Event';
  const description = event.description || 'Tirumala Utsavam Event';
  const startDateStr = (event.startDate || '').replace(/-/g, '');
  const endDateStr = (event.endDate || event.startDate || '').replace(/-/g, '');

  const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Tirumala Utsavam Portal//NONSGML v1.0//EN
CALSCALE:GREGORIAN
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

  const isAppleDevice = /iPhone|iPad|iPod|Macintosh|Mac OS X/i.test(navigator.userAgent);
  
  if (isAppleDevice) {
    // Directly launches native Apple Calendar app on iOS/macOS without downloading file
    const encoded = encodeURIComponent(icsData);
    window.location.href = `data:text/calendar;charset=utf8,${encoded}`;
  } else {
    // Directs to Apple iCloud Calendar on web browsers
    window.open('https://www.icloud.com/calendar', '_blank');
  }
}

// Multi-Platform Social Sharing Utility (WhatsApp, X, Reddit, Facebook, Threads, Copy Link)
export function shareToPlatform(platform, event, lang = 'en') {
  const title = lang === 'te' && event.titleTe ? event.titleTe : event.title;
  const date = event.startDate === event.endDate ? event.startDate : `${event.startDate} to ${event.endDate}`;
  const time = event.time ? `\n⏰ Time: ${event.time}` : '';
  const location = event.location ? `\n🛕 Location: ${event.location}` : '';
  const vahanam = event.vahanam ? `\n🐎 Vahanam: ${event.vahanam}` : '';
  const currentUrl = window.location.href;

  const shareText = `🙏 *Tirumala Temple Event Update* 🙏\n\n✨ *${title}*\n📅 Date: ${date}${time}${location}${vahanam}\n\n📖 Read full schedule on The Tirumala Verse:\n${currentUrl}`;

  switch (platform) {
    case 'whatsapp': {
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
      window.open(url, '_blank');
      break;
    }
    case 'x': {
      const tweet = `🙏 Tirumala Temple Event: ${title} (${date}) 🛕\n\nRead more on The Tirumala Verse: ${currentUrl}`;
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
      window.open(url, '_blank');
      break;
    }
    case 'facebook': {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(shareText)}`;
      window.open(url, '_blank');
      break;
    }
    case 'reddit': {
      const url = `https://www.reddit.com/submit?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(`Tirumala Utsavam: ${title}`)}`;
      window.open(url, '_blank');
      break;
    }
    case 'threads': {
      const url = `https://www.threads.net/intent/post?text=${encodeURIComponent(shareText)}`;
      window.open(url, '_blank');
      break;
    }
    case 'instagram': {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(`${shareText}`);
        alert(lang === 'te' ? 'ఉత్సవ సమాచారం కాపీ చేయబడింది! ఇన్‌స్టాగ్రామ్ ఓపెన్ అవుతోంది...' : 'Event details copied! Opening Instagram...');
      }
      window.open('https://www.instagram.com', '_blank');
      break;
    }
    case 'copy': {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(`${shareText}`);
        alert(lang === 'te' ? 'లింక్ విజయవంతంగా కాపీ చేయబడింది!' : 'Link & event details copied to clipboard!');
      } else {
        alert(lang === 'te' ? 'కాపీ చేయబడింది: ' + currentUrl : 'Copied link: ' + currentUrl);
      }
      break;
    }
    default:
      break;
  }
}

// 1-Click WhatsApp Share compatibility
export function shareToWhatsApp(event, lang = 'en') {
  shareToPlatform('whatsapp', event, lang);
}

// Apple / iCal Download compatibility
export function downloadIcsCalendarFile(event) {
  openAppleCalendar(event);
}

// Automatically convert Wikimedia file page links & Drive links to direct image URLs
export function normalizeImageUrl(url) {
  if (!url || typeof url !== 'string') return '';
  let cleanUrl = url.trim();

  if (cleanUrl.includes('commons.wikimedia.org/wiki/File:')) {
    const filename = cleanUrl.split('File:')[1].split('#')[0].split('?')[0];
    return `https://commons.wikimedia.org/wiki/Special:FilePath/${filename}`;
  }

  if (cleanUrl.includes('drive.google.com/file/d/')) {
    const fileId = cleanUrl.split('/d/')[1].split('/')[0];
    return `https://lh3.googleusercontent.com/d/${fileId}=s1600`;
  }

  return cleanUrl;
}
