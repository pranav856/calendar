# Tirumala Utsavam Portal 🛕

A web application designed for pilgrims visiting Tirumala and Tirupati temples. Features complete digitized 2026-27 Panchangam event schedules, an interactive Google Calendar-style horizontal month scroll view, 24-hour IST live time indicator, dark/light mode theme toggle, shrine filters, and a management Admin Portal.

---

## 🔑 Admin Portal Login Credentials

To access the event management desk (Add, Edit, and Delete events):

- **Login Button**: Click **Admin** in the top right header bar.
- **Username**: `admin`
- **Password**: `ttdadmin123`

---

## 🌟 Key Features

1. **24-Hour IST Live Clock**: Displayed in top-right header across all pages (`🇮🇳 IST HH:MM:SS | DD-MM-YYYY`).
2. **Live Event Status Badges**: Automatically computes and labels events:
   - `🔴 LIVE NOW` (Currently active event)
   - `🟢 UPCOMING` (Future festival)
   - `⚪ COMPLETED` (Concluded event)
3. **Google Calendar Horizontal Scroll**: Swipeable/scrollable month-by-month grid across 2026-2027.
4. **7 Sacred Shrines Explorer**: Direct click on any temple card filters the calendar view for that specific temple.
5. **Dark & Light Mode**: Toggle between Velvet Midnight and Divine Warm Ivory themes.
6. **Bilingual Support**: Instant toggle between English and Telugu (తెలుగు / English).
7. **.ICS Calendar Export**: Download event reminders directly to Google Calendar, Apple Calendar, or Outlook.

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build production bundle
npm run build
```
