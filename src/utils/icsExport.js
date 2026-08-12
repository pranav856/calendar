// Utility to generate and download .ics iCalendar files for pilgrim events

export function downloadIcsFile(event) {
  const title = event.title;
  const description = `${event.description}\n\nVenue: ${event.location}\nTiming: ${event.time}\nVahanam: ${event.vahanam || 'N/A'}`;
  const location = `${event.location}, Tirupati/Tirumala Region, Andhra Pradesh, India`;

  // Format dates: YYYYMMDD
  const formatIcsDate = (dateStr) => {
    return dateStr.replace(/-/g, '');
  };

  const startDateStr = formatIcsDate(event.startDate);
  // Add 1 day for end date in ICS format all-day
const [year, month, day] = event.endDate.split('-').map(Number);
const end = new Date(Date.UTC(year, month - 1, day + 1));
const endDateStr = end.toISOString().split('T')[0].replace(/-/g, '');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Tirumala Divya Utsav//Temple Events Portal//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `LOCATION:${location}`,
    `DTSTART;VALUE=DATE:${startDateStr}`,
    `DTEND;VALUE=DATE:${endDateStr}`,
    `STATUS:CONFIRMED`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `${event.id}_${event.title.replace(/[^a-zA-Z0-9]/g, '_')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
