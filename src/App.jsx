import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import CalendarView from './components/CalendarView';
import TempleList from './components/TempleList';
import DailySchedule from './components/DailySchedule';
import CommunityFeedback from './components/CommunityFeedback';
import EventDetailModal from './components/EventDetailModal';
import AdminPortalModal from './components/AdminPortalModal';
import ReferencesList from './components/ReferencesList';
import { INITIAL_EVENTS } from './data/templeEvents';
import { ShieldCheck, LogOut, Edit2, X, ExternalLink, MessageSquare, Plus, Cloud, Lock } from 'lucide-react';

export default function App() {
  // Tab state: 'calendar-page', 'overview', 'temples', 'references', 'sevas', 'feedback'
  const [activeTab, setActiveTab] = useState('calendar-page');
  const [lang, setLang] = useState('en'); // 'en' | 'te'
  
  // Theme Mode state ('dark' | 'light')
  const [themeMode, setThemeMode] = useState(() => {
    try {
      return localStorage.getItem('tirumala_theme_mode') || 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tirumala_theme_mode', themeMode);
    } catch (e) {
      console.error(e);
    }
    if (themeMode === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [themeMode]);

  const [selectedTemple, setSelectedTemple] = useState('all');
  const [selectedEventModal, setSelectedEventModal] = useState(null);

  // Admin Modal States
  const [adminModalMode, setAdminModalMode] = useState(null); // null | 'login' | 'edit-event' | 'add-event' | 'feedback-inbox'
  const [targetEventToEdit, setTargetEventToEdit] = useState(null);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);

  // Admin Logged In State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      return localStorage.getItem('tirumala_admin_session') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tirumala_admin_session', isAdminLoggedIn ? 'true' : 'false');
    } catch (e) {
      console.error(e);
    }
  }, [isAdminLoggedIn]);

  // Defensive Dynamic Events State Initializer
  const [eventsList, setEventsList] = useState(() => {
    try {
      const storedEvents = localStorage.getItem('tirumala_custom_events_v5');
      if (storedEvents) {
        const parsed = JSON.parse(storedEvents);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Remove Independence Day events
          const cleanParsed = parsed.filter(e => {
            const title = (e.title || '').toLowerCase();
            const titleTe = e.titleTe || '';
            const desc = (e.description || '').toLowerCase();
            return !title.includes('independence') && !titleTe.includes('స్వాతంత్ర్య') && !desc.includes('independence');
          });
          const customUserAdded = cleanParsed.filter(e => e.id.startsWith('custom-'));
          return [...INITIAL_EVENTS, ...customUserAdded];
        }
      }
      return INITIAL_EVENTS;
    } catch (e) {
      console.error('Error loading events from storage:', e);
      return INITIAL_EVENTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tirumala_custom_events_v5', JSON.stringify(eventsList));
    } catch (e) {
      console.error(e);
    }
  }, [eventsList]);

  // Defensive Community Feedback Submissions State Initializer
  const [feedbackList, setFeedbackList] = useState(() => {
    try {
      const stored = localStorage.getItem('tirumala_feedback_submissions');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
      return [
        {
          id: 'fb-demo-1',
          refNumber: 'TU-2026-000101',
          feedbackType: 'Feature Request',
          title: 'Add Google Calendar Reminders for Abhishekam',
          description: 'It would be great to have direct notification reminders before early morning Abhishekam on Fridays.',
          name: 'Srinivas R.',
          email: 'srinivas@example.com',
          pageUrl: 'http://localhost:3000/',
          browser: 'Google Chrome',
          operatingSystem: 'Windows OS',
          deviceType: 'Desktop',
          screenshotUrl: null,
          status: 'Planned',
          adminNotes: 'Integrated .ics calendar download buttons across all event cards.',
          createdAt: '2026-07-26T10:00:00Z',
          updatedAt: '2026-07-27T12:00:00Z'
        }
      ];
    } catch (e) {
      console.error('Error loading feedback from storage:', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tirumala_feedback_submissions', JSON.stringify(feedbackList));
    } catch (e) {
      console.error(e);
    }
  }, [feedbackList]);

  // Feedback Handlers
  const handleAddFeedback = (newFeedback) => {
    setFeedbackList(prev => [newFeedback, ...prev]);
  };

  const handleUpdateFeedback = (updatedFeedback) => {
    setFeedbackList(prev => prev.map(f => f.id === updatedFeedback.id ? updatedFeedback : f));
  };

  const handleDeleteFeedback = (feedbackId) => {
    setFeedbackList(prev => prev.filter(f => f.id !== feedbackId));
  };

  // Admin CRUD operations for events
  const handleAddEvent = (newEvent) => {
    setEventsList(prev => [newEvent, ...prev]);
  };

  const handleUpdateEvent = (updatedEvent) => {
    setEventsList(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
  };

  const handleDeleteEvent = (eventId) => {
    setEventsList(prev => prev.filter(e => e.id !== eventId));
  };

  const handleOpenEditModalForEvent = (event) => {
    setTargetEventToEdit(event);
    setAdminModalMode('edit-event');
  };

  const handleOpenAddEventModal = () => {
    setTargetEventToEdit(null);
    setAdminModalMode('add-event');
  };

  const handleSelectTempleFromHeroOrList = (templeId) => {
    setSelectedTemple(templeId);
    setActiveTab('calendar-page');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const safeFeedbackList = Array.isArray(feedbackList) ? feedbackList : [];
  const safeEventsList = Array.isArray(eventsList) ? eventsList : INITIAL_EVENTS;

  const newFeedbackCount = safeFeedbackList.filter(f => f.status === 'New').length;

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      
      {/* SEAMLESS ADMIN TOP BAR */}
      {isAdminLoggedIn && (
        <div className="bg-gradient-to-r from-[#FF5722] via-[#E65100] to-[#FF5722] text-white py-1.5 px-4 text-xs font-bold flex flex-wrap items-center justify-between gap-2 shadow-lg sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#FFD700] animate-bounce shrink-0" />
            <span className="font-extrabold text-[#FFD700]">ADMIN MODE ACTIVE:</span>
            <span className="hidden sm:inline">You are viewing the live website. Click "Edit" or "Delete" on any card!</span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Live ➕ Add Event Button */}
            <button
              onClick={handleOpenAddEventModal}
              className="px-2.5 py-1 rounded bg-black/40 text-[#FFD700] hover:bg-black/60 font-extrabold flex items-center gap-1 border border-[#FFD700]/40"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Event</span>
            </button>

            {/* 💬 Devotee Feedback Inbox Button */}
            <button
              onClick={() => setAdminModalMode('feedback-inbox')}
              className="px-2.5 py-1 rounded bg-black/40 text-white hover:bg-black/60 font-bold flex items-center gap-1 relative border border-white/20"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#FFD700]" />
              <span>Feedback Inbox ({safeFeedbackList.length})</span>
              {newFeedbackCount > 0 && (
                <span className="px-1.5 py-0.2 bg-[#FFD700] text-black text-[10px] font-extrabold rounded-full animate-pulse">
                  {newFeedbackCount} New
                </span>
              )}
            </button>

            {/* ⚡ Cloud Database Sync Button */}
            <button
              onClick={() => setAdminModalMode('cloud-sync')}
              className="px-2.5 py-1 rounded bg-black/40 text-[#FFD700] hover:bg-black/60 font-bold flex items-center gap-1 border border-[#D4AF37]/40"
            >
              <Cloud className="w-3.5 h-3.5 text-[#FFD700]" />
              <span>Cloud Sync</span>
            </button>

            {/* Logout Admin */}
            <button
              onClick={() => setIsAdminLoggedIn(false)}
              className="px-2.5 py-1 rounded bg-black/50 text-white hover:bg-black/70 font-bold flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Top Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        themeMode={themeMode}
        setThemeMode={setThemeMode}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdmin={(requestedMode) => {
          if (isAdminLoggedIn) {
            setAdminModalMode(requestedMode || 'feedback-inbox');
          } else {
            setAdminModalMode('login');
          }
        }}
        onOpenLogoModal={() => setIsLogoModalOpen(true)}
      />

      {/* Hero Banner (Shown on Overview tab) */}
      {activeTab === 'overview' && (
        <HeroBanner
          lang={lang}
          onSelectTemple={handleSelectTempleFromHeroOrList}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-grow container py-4">
        
        {/* DEDICATED FULL-PAGE CALENDAR SECTION */}
        {activeTab === 'calendar-page' && (
          <div className="space-y-4">
            <div className="glass-card p-6 border-l-4 border-l-[#FFD700] border-[#D4AF37]/30 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-extrabold gold-gradient-text flex items-center gap-2">
                  <span>📅</span>
                  <span>{lang === 'en' ? 'Temple Events & Panchangam Calendar' : 'దేవాలయాల ఉత్సవాల క్యాలెండర్'}</span>
                </h2>
                <p className="text-xs text-[#94A3B8] mt-1">
                  {lang === 'en'
                    ? 'Explore complete 2026-27 Panchangam utsavams across all shrines. Scroll horizontally across months or filter by temple and date.'
                    : 'సప్త దివ్య పుణ్యక్షేత్రాల సమగ్ర ఉత్సవ పట్టిక.'}
                </p>
              </div>
            </div>

            <CalendarView
              events={safeEventsList}
              lang={lang}
              selectedTemple={selectedTemple}
              setSelectedTemple={setSelectedTemple}
              onSelectEvent={setSelectedEventModal}
              isAdminLoggedIn={isAdminLoggedIn}
              onEditEvent={handleOpenEditModalForEvent}
              onDeleteEvent={handleDeleteEvent}
              onOpenAddEvent={handleOpenAddEventModal}
            />
          </div>
        )}

        {/* OVERVIEW SECTION */}
        {activeTab === 'overview' && (
          <CalendarView
            events={safeEventsList}
            lang={lang}
            selectedTemple={selectedTemple}
            setSelectedTemple={setSelectedTemple}
            onSelectEvent={setSelectedEventModal}
            isAdminLoggedIn={isAdminLoggedIn}
            onEditEvent={handleOpenEditModalForEvent}
            onDeleteEvent={handleDeleteEvent}
            onOpenAddEvent={handleOpenAddEventModal}
          />
        )}

        {/* LOCKED REFERENCES SECTION */}
        {activeTab === 'references' && (
          <div className="glass-card p-10 sm:p-14 text-center max-w-2xl mx-auto space-y-4 border-2 border-[#D4AF37]/40 my-8 shadow-2xl rounded-3xl bg-[#141923]/90">
            <div className="w-16 h-16 rounded-full bg-[#0B0E14] border-2 border-[#FFD700] flex items-center justify-center mx-auto text-[#FFD700] shadow-lg animate-pulse">
              <Lock className="w-8 h-8 text-[#FFD700]" />
            </div>
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#FFD700] text-xs font-extrabold uppercase tracking-wider">
              🔒 Locked — Feature Under Development
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white gold-gradient-text">
              {lang === 'en' ? 'Sacred Panchangam Literature — Coming Soon' : 'పవిత్ర గ్రంథములు — త్వరలో లభిస్తుంది'}
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-md mx-auto">
              {lang === 'en'
                ? 'Official TTD Panchangam source documents, ancient Sanskrit manuscripts, and festival literature are currently being digitized.'
                : 'అధికారిక టిటిడి పంచాంగ ఆధార పత్రాలు మరియు సంస్కృత గ్రంథాల డిజిటలైజేషన్ పురోగతిలో ఉంది.'}
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActiveTab('calendar-page')}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#FFD700] text-black font-extrabold text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all"
              >
                {lang === 'en' ? '📅 Back to Panchangam Calendar' : '📅 క్యాలెండర్‌కు తిరిగి వెళ్ళండి'}
              </button>
            </div>
          </div>
        )}

        {/* DAILY SEVAS & ANNA PRASADAM SECTION */}
        {activeTab === 'sevas' && (
          <DailySchedule
            lang={lang}
          />
        )}

        {/* COMMUNITY FEEDBACK SYSTEM SECTION */}
        {activeTab === 'feedback' && (
          <CommunityFeedback
            lang={lang}
            onSubmitFeedback={handleAddFeedback}
          />
        )}
      </main>

      {/* Event Detail Modal Popup */}
      {selectedEventModal && (
        <EventDetailModal
          event={selectedEventModal}
          onClose={() => setSelectedEventModal(null)}
          lang={lang}
          isAdminLoggedIn={isAdminLoggedIn}
          onEditEvent={handleOpenEditModalForEvent}
        />
      )}

      {/* Admin Quick Action Modal (Login, Add Event, Edit Event, Feedback Inbox) */}
      {adminModalMode && (
        <AdminPortalModal
          mode={adminModalMode}
          onClose={() => setAdminModalMode(null)}
          lang={lang}
          events={safeEventsList}
          onAddEvent={handleAddEvent}
          onUpdateEvent={handleUpdateEvent}
          onDeleteEvent={handleDeleteEvent}
          isAdminLoggedIn={isAdminLoggedIn}
          setIsAdminLoggedIn={setIsAdminLoggedIn}
          targetEvent={targetEventToEdit}
          feedbackList={safeFeedbackList}
          onUpdateFeedback={handleUpdateFeedback}
          onDeleteFeedback={handleDeleteFeedback}
        />
      )}

      {/* LOGO FULL-SIZE LIGHTBOX MODAL POPUP */}
      {isLogoModalOpen && (
        <div className="modal-overlay" onClick={() => setIsLogoModalOpen(false)}>
          <div 
            className="glass-card p-6 border-2 border-[#FFD700] max-w-sm w-full text-center relative animate-slide-up bg-[#0B0E14]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsLogoModalOpen(false)}
              className="absolute top-3 right-3 text-[#94A3B8] hover:text-[#FFD700] p-2 rounded-full bg-[#141923] border border-[#D4AF37]/30"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-lg font-bold gold-gradient-text mb-3">
              The Tirumala Verse Official Symbol
            </h3>

            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-[#FFD700] bg-[#E65100] p-2 shadow-2xl flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Tirumala Gopuram Logo" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  if (e.target.src.endsWith('/logo.png')) e.target.src = '/logo.jpg';
                  else if (e.target.src.endsWith('/logo.jpg')) e.target.src = '/logo.svg';
                  else if (e.target.src.endsWith('/logo.svg')) e.target.src = '/logo.jpg.png';
                }}
              />
            </div>

            <p className="text-xs text-[#94A3B8] mt-4 leading-relaxed">
              Sacred insignia representing the divine Gopuram and Srivari Tirunamam.
            </p>
          </div>
        </div>
      )}

      {/* Footer with Disclaimer & Feedback Link */}
      <footer className="bg-[#080A0E] border-t border-[#D4AF37]/30 py-8 mt-12 text-xs text-[#94A3B8] space-y-6">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Tirumala Logo" 
              className="w-9 h-9 rounded-full border border-[#FFD700] cursor-pointer hover:scale-110 transition-transform" 
              onClick={() => setIsLogoModalOpen(true)}
              onError={(e) => {
                if (e.target.src.endsWith('/logo.png')) e.target.src = '/logo.jpg';
                else if (e.target.src.endsWith('/logo.jpg')) e.target.src = '/logo.svg';
                else if (e.target.src.endsWith('/logo.svg')) e.target.src = '/logo.jpg.png';
              }}
            />
            <div>
              <h4 className="font-serif text-sm font-bold text-[#FFD700]">
                The Tirumala Verse
              </h4>
              <p>
                {lang === 'en'
                  ? 'Your Independent Guide to Tirumala'
                  : 'మీ స్వతంత్ర తిరుమల దివ్య దర్శిని'}
              </p>
            </div>
          </div>

          {/* Give Feedback Link */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                setActiveTab('feedback');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3.5 py-1.5 rounded-lg bg-[#FF5722] text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:brightness-110 transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Give Feedback</span>
            </button>
          </div>
        </div>

        {/* FOOTER DISCLAIMER */}
        <div className="container pt-4 border-t border-white/10 text-[11px] text-[#94A3B8] leading-relaxed text-center">
          <p className="max-w-4xl mx-auto bg-[#141923]/60 p-3.5 rounded-xl border border-white/5">
            <span className="font-bold text-[#FFD700]">Disclaimer:</span> TheTirumalaVerse is an independent, privately run informational blog, cultural encyclopedia, and travel guide. This website is not affiliated with, authorized, maintained, sponsored, or endorsed by the Tirumala Tirupati Devasthanams (TTD), the Government of Andhra Pradesh, or any official religious administration. The official booking portal of the temple trust is accessible exclusively at <a href="https://ttdevasthanams.ap.gov.in" target="_blank" rel="noreferrer" className="text-[#3A86EF] underline">ttdevasthanams.ap.gov.in</a>. All official ticket quotas, seva bookings, and accommodation reservations must be made directly through their authorized platform. We do not sell tickets, collect payments, or offer commercial booking services.
          </p>
        </div>
      </footer>
    </div>
  );
}
