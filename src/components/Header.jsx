import React, { useState, useEffect } from 'react';
import {
  Clock as ClockIcon,
  MessageSquare,
  Globe,
  Lock,
  Sun,
  Moon,
  BookOpen
} from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  lang, 
  setLang, 
  themeMode, 
  setThemeMode, 
  onOpenAdmin,
  onOpenLogoModal,
  isAdminLoggedIn,
  notificationsEnabled,
  onToggleNotifications,
  ttdLiveUrl,
  onOpenLiveStream
}) {
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
      });
    }
  };
  return (
    <header className="sticky top-0 z-50 bg-[#0B0E14]/95 border-b border-[#D4AF37]/30 shadow-2xl transition-colors">
      
      {/* Main Header Navigation Container */}
      <div className="container py-2 space-y-2">
        
        {/* TOP ROW: Brand Logo & Title on Left + Control Buttons on Right */}
        <div className="flex items-center justify-between gap-2 w-full">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-2.5 group shrink-0">
            <div 
              onClick={onOpenLogoModal}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-[#FFD700] shadow-md group-hover:scale-110 transition-transform bg-[#E65100] flex items-center justify-center cursor-pointer shrink-0"
              title="Click to view Logo in full size"
            >
              <img 
                src="/logo-64.png" 
                alt="Tirumala Logo" 
                className="w-full h-full object-contain p-0.5" 
                style={{ width: '36px', height: '36px' }}
              />
            </div>

            <div onClick={() => setActiveTab('calendar-page')} className="cursor-pointer">
              <h1 className="font-serif text-base sm:text-2xl font-extrabold gold-gradient-text tracking-wide leading-tight">
                The Tirumala Verse
              </h1>
              <p className="text-[9px] sm:text-xs text-[#94A3B8] tracking-wider font-medium">
                {lang === 'en' ? 'Your Independent Guide to Tirumala' : 'మీ స్వతంత్ర తిరుమల దివ్య దర్శిని'}
              </p>
            </div>
          </div>

          {/* CONTROL BUTTONS: THEME, ADMIN & LANGUAGE (Ultra-compact on phone screens) */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {!isOnline && (
              <span className="px-1.5 py-0.5 rounded-lg bg-red-900/80 border border-red-500 text-red-200 text-[10px] font-bold flex items-center gap-1 shadow animate-pulse" title="Network disconnected - Serving cached events">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                <span className="hidden sm:inline">Offline</span>
              </span>
            )}

            {deferredPrompt && (
              <button
                onClick={handleInstallClick}
                className="px-2 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black text-[10px] sm:text-[11px] font-extrabold flex items-center gap-1 shadow hover:scale-105 transition-all"
                title="Install Tirumala Utsavam App"
              >
                <span>📱 <span className="hidden sm:inline">Install</span></span>
              </button>
            )}

            {/* TTD YOUTUBE LIVE STREAM BUTTON (Shown only if Admin set active link) */}
            {ttdLiveUrl && (
              <button
                onClick={onOpenLiveStream}
                className="px-2 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[10px] sm:text-[11px] font-extrabold flex items-center gap-1 shadow-lg animate-pulse"
                title="Watch TTD Daily YouTube Live Stream"
              >
                <span>🔴 <span className="hidden sm:inline">TTD Live</span></span>
              </button>
            )}

            {/* NOTIFICATIONS TOGGLE BUTTON */}
            <button
              onClick={onToggleNotifications}
              className={`p-1.5 sm:px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors border ${
                notificationsEnabled
                  ? 'bg-amber-500/20 border-[#FFD700] text-[#FFD700]'
                  : 'bg-[#141923] border-[#D4AF37]/40 text-[#94A3B8] hover:text-[#FFD700]'
              }`}
              title={notificationsEnabled ? 'Utsavam Notifications Enabled' : 'Enable Event & Utsavam Notifications'}
            >
              <span>{notificationsEnabled ? '🔔' : '🔕'}</span>
              <span className="hidden sm:inline text-[11px]">
                {notificationsEnabled ? 'Alerts On' : 'Alerts'}
              </span>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
              className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-[#141923] border border-[#D4AF37]/50 text-[#FFD700] hover:bg-[#D4AF37]/20 transition-colors flex items-center gap-1 text-xs font-bold shadow-sm"
              title={themeMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {themeMode === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[#FFD700]" />
                  <span className="hidden sm:inline text-[11px]">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[#FF5722]" />
                  <span className="hidden sm:inline text-[11px]">Dark</span>
                </>
              )}
            </button>

            {/* Admin Login Button */}
            <button
              onClick={onOpenAdmin}
              className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-[#FF5722]/20 border border-[#FF5722]/50 text-[#FF5722] hover:bg-[#FF5722]/30 text-xs font-extrabold flex items-center gap-1 transition-colors shadow-sm"
              title="Admin Login"
            >
              <Lock className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">{lang === 'en' ? 'Admin' : 'అడ్మిన్'}</span>
            </button>

            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
              className="px-2 py-1 rounded-full border border-[#D4AF37]/50 bg-[#141923] text-[#FFD700] text-xs font-extrabold flex items-center gap-1 hover:bg-[#D4AF37]/20 transition-colors shadow-sm"
            >
              <Globe className="w-3.5 h-3.5 text-[#FFD700]" />
              <span>{lang === 'en' ? 'TE' : 'EN'}</span>
            </button>
          </div>
        </div>

        {/* BOTTOM ROW: Smooth Scrolling Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-full">
          <button
            onClick={() => setActiveTab('calendar-page')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-1.5 shrink-0 transition-all shadow-md ${
              activeTab === 'calendar-page'
                ? 'bg-[#141923] text-[#FFD700] ring-2 ring-[#FFD700] border border-[#FFD700]'
                : 'bg-[#141923] text-[#FFD700] border border-[#D4AF37]/50 hover:bg-[#D4AF37]/20'
            }`}
          >
            <span>📅 {lang === 'en' ? 'Calendar' : 'క్యాలెండర్'}</span>
          </button>

          <button
            onClick={() => setActiveTab('glossary')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1.5 shrink-0 transition-all ${
              activeTab === 'glossary'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0B0E14] shadow-md font-extrabold'
                : 'text-[#94A3B8] hover:text-[#FFD700] hover:bg-[#141923]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#FFD700]" />
            <span>{lang === 'en' ? 'Glossary / Meanings' : 'నిఘంటువు / పదాల అర్థాలు'}</span>
          </button>

          <button
            onClick={() => setActiveTab('sevas')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1.5 shrink-0 transition-all ${
              activeTab === 'sevas'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0B0E14] shadow-md'
                : 'text-[#94A3B8] hover:text-[#FFD700] hover:bg-[#141923]'
            }`}
          >
            <ClockIcon className="w-4 h-4" />
            <span>{lang === 'en' ? 'Sevas' : 'సేవలు'}</span>
          </button>

          {/* COMMUNITY FEEDBACK BUTTON / ADMIN INBOX */}
          <button
            onClick={() => {
              if (isAdminLoggedIn) {
                onOpenAdmin('feedback-inbox');
              } else {
                setActiveTab('feedback');
              }
            }}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1.5 shrink-0 transition-all ${
              activeTab === 'feedback'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0B0E14] shadow-md'
                : 'text-[#94A3B8] hover:text-[#FFD700] hover:bg-[#141923]'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-[#FF5722]" />
            <span>{isAdminLoggedIn ? (lang === 'en' ? 'Feedback Inbox' : 'అభిప్రాయాల ఇన్బాక్స్') : (lang === 'en' ? 'Feedback' : 'అభిప్రాయాలు')}</span>
          </button>
        </nav>

      </div>
    </header>
  );
}
