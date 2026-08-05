import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import CalendarView from './components/CalendarView';
import TempleList from './components/TempleList';
import DailySchedule from './components/DailySchedule';
import CommunityFeedback from './components/CommunityFeedback';
import EventDetailModal from './components/EventDetailModal';
import AdminPortalModal from './components/AdminPortalModal';
import ReferencesList from './components/ReferencesList';
import UtsavamGlossary from './components/UtsavamGlossary';
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

  // Notifications State
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    try {
      return localStorage.getItem('tirumala_notifications_enabled') === 'true';
    } catch {
      return false;
    }
  });

  const handleToggleNotifications = () => {
    if (!notificationsEnabled) {
      if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            setNotificationsEnabled(true);
            localStorage.setItem('tirumala_notifications_enabled', 'true');
            alert(lang === 'te' ? 'ఉత్సవ నోటిఫికేషన్లు ప్రారంభించబడ్డాయి!' : 'Utsavam Notifications enabled successfully!');
          } else {
            alert(lang === 'te' ? 'నోటిఫికేషన్ల అనుమతి నిరాకరించబడింది.' : 'Notification permission was not granted by browser.');
          }
        });
      } else {
        alert('Browser does not support notifications.');
      }
    } else {
      setNotificationsEnabled(false);
      localStorage.setItem('tirumala_notifications_enabled', 'false');
    }
  };

  // TTD YouTube Live Stream State (Default to Official SVBC/TTD Live Link)
  const DEFAULT_TTD_LIVE_URL = 'https://www.youtube.com/live/Z6nHz5CU10I?si=s15-FIsreA6ltSQl';

  const [ttdLiveUrl, setTtdLiveUrl] = useState(() => {
    try {
      return localStorage.getItem('tirumala_ttd_live_url') || DEFAULT_TTD_LIVE_URL;
    } catch {
      return DEFAULT_TTD_LIVE_URL;
    }
  });
  const [isLiveStreamModalOpen, setIsLiveStreamModalOpen] = useState(false);

  const handleSaveTtdLiveUrl = (newUrl) => {
    setTtdLiveUrl(newUrl);
    try {
      localStorage.setItem('tirumala_ttd_live_url', newUrl);
    } catch (e) {
      console.error(e);
    }
  };

  // Admin Custom Glossary Edits State
  const [customGlossaryEdits, setCustomGlossaryEdits] = useState(() => {
    try {
      const stored = localStorage.getItem('tirumala_custom_glossary_edits');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const handleSaveGlossaryEdit = (termId, updatedData) => {
    setCustomGlossaryEdits(prev => {
      const next = { ...prev, [termId]: updatedData };
      try {
        localStorage.setItem('tirumala_custom_glossary_edits', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  // Direct Glossary Navigation State
  const [targetGlossaryTermId, setTargetGlossaryTermId] = useState(null);
  const [targetGlossaryTermToEdit, setTargetGlossaryTermToEdit] = useState(null);

  const handleNavigateToGlossary = (termId) => {
    setTargetGlossaryTermId(termId);
    setActiveTab('glossary');
  };

  const handleOpenAdminEditTerm = (term) => {
    setTargetGlossaryTermToEdit(term);
    setAdminModalMode('edit-glossary');
  };

  // Detect Today's Active Event for Rolling Ticker
  const todayStr = new Date().toISOString().split('T')[0];
  const safeEventsList = Array.isArray(eventsList) ? eventsList : INITIAL_EVENTS;
  const todayEvent = useMemo(() => {
    if (!Array.isArray(safeEventsList)) return null;
    return safeEventsList.find(e => e && typeof e === 'object' && e.startDate && e.endDate && e.startDate <= todayStr && e.endDate >= todayStr);
  }, [safeEventsList, todayStr]);

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

            {/* 🔴 TTD YouTube Live Stream Embed Settings Button */}
            <button
              onClick={() => setAdminModalMode('youtube-live')}
              className="px-2.5 py-1 rounded bg-black/40 text-red-300 hover:text-white hover:bg-black/60 font-extrabold flex items-center gap-1 border border-red-500/50"
              title="Configure TTD Daily YouTube Live Stream URL"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span>🔴 YouTube Live</span>
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
        notificationsEnabled={notificationsEnabled}
        onToggleNotifications={handleToggleNotifications}
        ttdLiveUrl={ttdLiveUrl}
        onOpenLiveStream={() => setIsLiveStreamModalOpen(true)}
      />

      {/* ROLLING TICKER BANNER FOR TODAY'S HAPPENING EVENT */}
      {todayEvent && (
        <div 
          onClick={() => setSelectedEventModal(todayEvent)}
          className="bg-gradient-to-r from-red-900 via-[#E65100] to-[#141923] text-white py-2 px-4 cursor-pointer border-b border-[#FFD700]/50 shadow-md overflow-hidden relative group"
          title="Click to view full event card details"
        >
          <div className="container flex items-center justify-between gap-3 text-xs sm:text-sm font-extrabold">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-ping"></span>
              <span className="px-2 py-0.5 rounded bg-red-600 text-white uppercase text-[10px] tracking-wider">
                {lang === 'en' ? 'Happening Today' : 'ఈ రోజు జరుగుతోంది'}
              </span>
            </div>

            <div className="truncate flex-grow text-center font-serif text-[#FFD700] tracking-wide">
              {lang === 'en' ? todayEvent.title : (todayEvent.titleTe || todayEvent.title)}
              {todayEvent.vahanam && ` — 🐎 ${todayEvent.vahanam}`}
            </div>

            <div className="shrink-0 text-[11px] font-sans underline text-[#FFD700] group-hover:scale-105 transition-transform">
              {lang === 'en' ? 'View Details ➔' : 'వివరాలు చూడండి ➔'}
            </div>
          </div>
        </div>
      )}

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

        {/* UTSAVAM & FESTIVAL GLOSSARY SECTION */}
        {activeTab === 'glossary' && (
          <UtsavamGlossary
            lang={lang}
            targetTermId={targetGlossaryTermId}
            customGlossaryEdits={customGlossaryEdits}
            isAdminLoggedIn={isAdminLoggedIn}
            onOpenAdminEditTerm={handleOpenAdminEditTerm}
          />
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
          onNavigateToGlossary={handleNavigateToGlossary}
        />
      )}

      {/* Admin Quick Action Modal */}
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
          targetGlossaryTerm={targetGlossaryTermToEdit}
          onSaveGlossaryEdit={handleSaveGlossaryEdit}
          ttdLiveUrl={ttdLiveUrl}
          onSaveTtdLiveUrl={handleSaveTtdLiveUrl}
        />
      )}

      {/* TTD YOUTUBE LIVE STREAM EMBEDDED MODAL */}
      {isLiveStreamModalOpen && ttdLiveUrl && (
        <div className="modal-overlay z-[99999]" onClick={() => setIsLiveStreamModalOpen(false)}>
          <div 
            className="glass-card p-4 border-2 border-red-500 max-w-3xl w-full bg-[#0B0E14] text-center rounded-2xl relative space-y-3 shadow-2xl animate-scale-up" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-serif font-bold text-red-500 text-sm sm:text-base flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                <span>🔴 TTD Daily YouTube Live Stream</span>
              </span>
              <button 
                onClick={() => setIsLiveStreamModalOpen(false)} 
                className="p-1 rounded-full bg-[#141923] text-white hover:text-[#FFD700] text-xs border border-white/20"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-white/20">
              <iframe
                className="w-full h-full"
                src={
                  ttdLiveUrl.includes('embed/')
                    ? ttdLiveUrl
                    : `https://www.youtube.com/embed/${
                        ttdLiveUrl.includes('/live/')
                          ? ttdLiveUrl.split('/live/')[1].split('?')[0].split('&')[0]
                          : ttdLiveUrl.includes('v=')
                          ? ttdLiveUrl.split('v=')[1].split('&')[0]
                          : ttdLiveUrl.includes('youtu.be/')
                          ? ttdLiveUrl.split('youtu.be/')[1].split('?')[0]
                          : ttdLiveUrl
                      }?autoplay=1`
                }
                title="TTD Daily Live Stream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="text-xs text-[#94A3B8] font-mono">
              Live broadcast provided via Tirumala Tirupati Devasthanams (TTD)
            </div>
          </div>
        </div>
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
      <footer className="bg-[#0B0E14] light-theme:bg-white border-t border-[#D4AF37]/40 light-theme:border-amber-300/40 py-8 mt-12 text-sm text-[#94A3B8] light-theme:text-slate-700 shadow-2xl transition-colors">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Tirumala Logo" 
              className="w-10 h-10 rounded-full border-2 border-[#FFD700] cursor-pointer hover:scale-110 transition-transform shadow-md" 
              onClick={() => setIsLogoModalOpen(true)}
              onError={(e) => {
                if (e.target.src.endsWith('/logo.png')) e.target.src = '/logo.jpg';
                else if (e.target.src.endsWith('/logo.jpg')) e.target.src = '/logo.svg';
              }}
            />
            <div>
              <h4 className="font-serif text-base font-bold gold-gradient-text">
                The Tirumala Verse
              </h4>
              <p className="text-xs text-[#94A3B8] light-theme:text-slate-600 font-medium">
                {lang === 'en'
                  ? 'Your Independent Guide to Tirumala'
                  : 'మీ స్వతంత్ర తిరుమల దివ్య దర్శిని'}
              </p>
            </div>
          </div>

          {/* Give Feedback Button */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                setActiveTab('feedback');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#FFD700] text-black font-extrabold text-xs flex items-center gap-2 shadow-lg hover:brightness-110 active:scale-95 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-black" />
              <span>Give Feedback</span>
            </button>
          </div>
        </div>

        {/* HIGH-CONTRAST READABLE FOOTER DISCLAIMER */}
        <div className="container pt-6 mt-6 border-t border-white/10 light-theme:border-slate-200">
          <div className="max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl bg-[#141923] light-theme:bg-amber-50/90 border border-[#D4AF37]/40 light-theme:border-amber-300/60 shadow-xl text-xs sm:text-sm text-slate-100 light-theme:text-slate-900 leading-relaxed font-medium">
            <p>
              <span className="font-black text-[#FFD700] light-theme:text-[#B45309] uppercase tracking-wider block sm:inline mb-1 sm:mb-0 mr-1.5 text-xs sm:text-sm">
                ⚠️ Disclaimer:
              </span>
              <span>
                TheTirumalaVerse is an independent, privately run informational blog, cultural encyclopedia, and travel guide. This website is not affiliated with, authorized, maintained, sponsored, or endorsed by the Tirumala Tirupati Devasthanams (TTD), the Government of Andhra Pradesh, or any official religious administration. The official booking portal of the temple trust is accessible exclusively at{' '}
              </span>
              <a 
                href="https://ttdevasthanams.ap.gov.in" 
                target="_blank" 
                rel="noreferrer" 
                className="text-[#60A5FA] light-theme:text-[#1D4ED8] font-bold underline hover:brightness-125"
              >
                ttdevasthanams.ap.gov.in
              </a>
              <span>
                . All official ticket quotas, seva bookings, and accommodation reservations must be made directly through their authorized platform. We do not sell tickets, collect payments, or offer commercial booking services.
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
