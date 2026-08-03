# 🛕 The Tirumala Verse & Utsav Calendar (2026–2027)

A state-of-the-art, high-performance web application designed for pilgrims and devotees visiting Tirumala, Tirupati, Tiruchanur, and surrounding sacred TTD shrines. It features digitized **2026–2027 TTD Panchangam festival schedules**, real-time live search, interactive month grid calendar views, 1-click Google Calendar & WhatsApp sharing, live festival countdowns, daily Nitya Seva timetables, PDF calendar export, and an Admin Portal.

---

## 🔑 Admin Portal Credentials

To access the Event Management Desk (Add, Edit, and Delete events):
- **Header Button**: Click `🔒 Admin` in the top right header bar.
- **Username**: `admin`
- **Password**: `ttdadmin123`

---

## 🌟 Comprehensive Feature Overview & What Was Built

### 1. 📅 Interactive Calendar & 16-Month Navigation
- **Google Calendar-Style Month Grid**: Displays white date cards with color-coded event pills across January 2026 to April 2027.
- **Side-by-Side Temple Event Pills**: Allows immediate identification of festivals per temple.
- **Touch Gesture & Mobile Swipe**: Swipe left or right on mobile/tablet screens to smoothly navigate between months.
- **Strict Month Filtering**: Selecting a temple filter retains the currently viewed month without auto-jumping across months.

### 2. 🔍 Real-Time Live Search Bar & Temple Filters
- **Live Search**: Instant keyword filtering across event titles, Telugu titles (`titleTe`), locations, descriptions, and Vahanams.
- **7 Sacred Temple Filters**:
  - Sri Venkateswara Swamy Temple (Tirumala Shrine)
  - Sri Padmavathi Ammavari Temple (Tiruchanur)
  - Sri Govindaraja Swamy Temple (Tirupati)
  - Sri Kodandarama Temple (Tirupati)
  - Sri Kapileswara Swamy Temple (Kapila Theertham)
  - Sri Prasanna Venkateswara Temple (Appalayagunta)
  - Sri Kalyana Venkateswara Temple (Srinivasa Mangapuram)

### 3. 🎯 1-Click Reminders & Social Sharing
- **📅 1-Click Google Calendar**: Instantly opens Google Calendar on web or mobile with pre-filled event title, dates, location, and description.
- **💬 1-Click WhatsApp Event Share**: Formats event details in English or Telugu and opens native WhatsApp / WhatsApp Web for instant sharing with family and friends.
- **📥 PDF Export**: Generates an auto-formatted downloadable PDF document of selected temple events.

### 4. 🛕 Daily Nitya Seva Timetable (Tirumala Shrine)
Comprehensive Monday through Sunday daily ritual schedules:
- **Suprabhatam**: `03:00 AM – 03:30 AM` (Daily morning awakening ritual)
- **Thomala Seva & Archana**: Daily morning garland decoration & 1,000 Holy Names recitation.
- **Weekly Special Sevas**:
  - Monday: *Vishesha Puja*
  - Tuesday: *Ashtadasa Pada Padma Aradhana*
  - Wednesday: *Sahasra Kalasabhishekam*
  - Thursday: *Tiruppavada Seva*
  - Friday: *Abhishekam & Nijapada Darsanam* (`04:30 AM – 06:00 AM`)
- **Ekanta Seva**: Conducted after `01:00 AM` (`01:00 AM – 01:30 AM` Suddi preparations, `01:30 AM` Ekanta Seva lullaby).

### 5. ⏳ Live Festival Countdown & Featured Banner
- Dynamically calculates the next major upcoming festival from today's date (e.g. Srivari Salakatla Brahmotsavams starting September 14, 2026).
- Displays a 1-second live ticking countdown timer (Days : Hours : Mins : Secs).

### 6. 🌐 Bilingual & Dual Theme Support
- **Bilingual Switch**: Toggle between English and Telugu (`తెలుగు` / `English`) across all titles, badges, schedules, and modals.
- **Dual Themes**: Toggle between *Velvet Midnight* (Dark Gold) and *Divine Warm Ivory* (Light Mode).

---

## 🛠️ Project Structure & Architecture

```text
d:\PS-Skilling\projects\calender\
├── public/
│   ├── logo.png / logo.jpg / logo.svg     # Temple logo assets with fallback chain
│   ├── manifest.json                      # PWA web manifest
│   └── sw.js                              # Service worker for offline caching
├── src/
│   ├── components/
│   │   ├── Header.jsx                     # Top navigation bar & live IST clock
│   │   ├── HeroBanner.jsx                 # Live countdown timer & featured festival
│   │   ├── CalendarView.jsx               # Main deck with search, filters & event cards
│   │   ├── CalendarMonthGrid.jsx          # 7-column month grid & swipe navigation
│   │   ├── DailySchedule.jsx              # Monday–Sunday Nitya Seva timetables
│   │   ├── TempleList.jsx                 # 7 sacred temples showcase grid
│   │   ├── FestivalSeries.jsx             # Major festival series overview
│   │   ├── EventDetailModal.jsx           # Full-screen event popup & share buttons
│   │   ├── AdminPortalModal.jsx           # Event manager desk (Add/Edit/Delete)
│   │   ├── PilgrimGuide.jsx               # Pilgrim tips, dress codes & accommodation
│   │   └── CommunityFeedback.jsx          # User feedback submission form
│   ├── data/
│   │   ├── templeEvents.js                # Master database of 2026-27 events & Sevas
│   │   └── mediaAndReferences.js          # References & TTD official links
│   ├── utils/
│   │   ├── eventStatus.js                 # Status calculation & Google/WhatsApp export
│   │   ├── pdfExport.js                   # jsPDF autoTable export utility
│   │   └── cloudSync.js                   # Mock cloud sync helper
│   ├── App.jsx                            # Root component & local state persistence
│   ├── index.css                          # Modern CSS design system & tokens
│   └── main.jsx                           # Entry point
├── package.json                           # Dependencies & Vite build scripts
└── README.md                              # Project documentation
```

---

## 🚀 Running Locally & Building

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npx vite preview
```
