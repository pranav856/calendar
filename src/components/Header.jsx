import React, { useState, useEffect } from 'react';
import { Calendar, Compass, Clock as ClockIcon, MessageSquare, Globe, Lock, Sun, Moon, BookOpen, ExternalLink } from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  lang, 
  setLang, 
  themeMode, 
  setThemeMode, 
  onOpenAdmin,
  onOpenLogoModal,
  isAdminLoggedIn
}) {
  // Live IST 24-Hour Clock State
  const [istTime, setIstTime] = useState('');
  const [istDate, setIstDate] = useState('');
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

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      
      const day = now.getDate().toString().padStart(2, '0');
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const year = now.getFullYear();

      setIstTime(`${hours}:${minutes}:${seconds}`);
      setIstDate(`${day}-${month}-${year}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#0B0E14]/95 border-b border-[#D4AF37]/30 shadow-2xl transition-colors">
      
      {/* Main Header Navigation Container */}
      <div className="container py-2 flex flex-wrap items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo & Title (CLICK LOGO TO VIEW LARGE IMAGE) */}
        <div className="flex items-center gap-2.5 group shrink-0">
          <div 
            onClick={onOpenLogoModal}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#FFD700] shadow-md group-hover:scale-110 transition-transform bg-[#E65100] flex items-center justify-center cursor-pointer"
            title="Click to view Logo in full size"
          >
            <img 
              src="/logo.png" 
              alt="Tirumala Logo" 
              className="w-full h-full object-contain p-0.5" 
              style={{ width: '40px', height: '40px', maxWidth: '40px', maxHeight: '40px' }}
              onError={(e) => {
                if (e.target.src.endsWith('/logo.png')) e.target.src = '/logo.jpg';
                else if (e.target.src.endsWith('/logo.jpg')) e.target.src = '/logo.svg';
                else if (e.target.src.endsWith('/logo.svg')) e.target.src = '/logo.jpg.png';
              }}
            />
          </div>

          <div onClick={() => setActiveTab('calendar-page')} className="cursor-pointer">
            <h1 className="font-serif text-lg sm:text-2xl font-extrabold gold-gradient-text tracking-wide leading-tight">
              The Tirumala Verse
            </h1>
            <p className="text-[10px] sm:text-xs text-[#94A3B8] tracking-wider font-medium">
              {lang === 'en' ? 'Your Independent Guide to Tirumala' : 'మీ స్వతంత్ర తిరుమల దివ్య దర్శిని'}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-1 max-w-full">
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
            onClick={() => setActiveTab('references')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1.5 shrink-0 transition-all ${
              activeTab === 'references'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0B0E14] shadow-md'
                : 'text-[#94A3B8] hover:text-[#FFD700] hover:bg-[#141923]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#94A3B8]" />
            <span>{lang === 'en' ? 'References' : 'గ్రంథాలు'}</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-[#FFD700] border border-[#FFD700]/30 font-semibold">🔒 Soon</span>
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

        {/* PINNED FAR RIGHT CONTROL COLUMN: THEME/ADMIN/LANG */}
        <div className="flex items-center gap-1.5 ml-auto shrink-0">
          {!isOnline && (
            <span className="px-2 py-0.5 rounded-lg bg-red-900/80 border border-red-500 text-red-200 text-[10px] font-bold flex items-center gap-1 shadow animate-pulse" title="Network disconnected - Serving cached Panchangam events">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
              <span>Offline Mode</span>
            </span>
          )}

          {deferredPrompt && (
            <button
              onClick={handleInstallClick}
              className="px-2 py-0.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black text-[11px] font-extrabold flex items-center gap-1 shadow hover:scale-105 transition-all"
              title="Install Tirumala Utsavam App"
            >
              <span>📱 Install App</span>
            </button>
          )}

          {/* Dark / Light Mode Toggle */}
            <button
              onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
              className="px-2 py-1 rounded-lg bg-[#141923] border border-[#D4AF37]/50 text-[#FFD700] hover:bg-[#D4AF37]/20 transition-colors flex items-center gap-1 text-xs font-bold shadow-sm"
              title={themeMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {themeMode === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#FFD700]" />
                  <span className="text-[11px]">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#FF5722]" />
                  <span className="text-[11px]">Dark</span>
                </>
              )}
            </button>

            {/* Admin Login Button */}
            <button
              onClick={onOpenAdmin}
              className="px-2.5 py-1 rounded-lg bg-[#FF5722]/20 border border-[#FF5722]/50 text-[#FF5722] hover:bg-[#FF5722]/30 text-xs font-extrabold flex items-center gap-1 transition-colors shadow-sm"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Admin' : 'అడ్మిన్'}</span>
            </button>

            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
              className="px-2.5 py-1 rounded-full border border-[#D4AF37]/50 bg-[#141923] text-[#FFD700] text-xs font-bold flex items-center gap-1 hover:bg-[#D4AF37]/20 transition-colors shadow-sm"
            >
              <Globe className="w-3.5 h-3.5 text-[#FFD700]" />
              <span>{lang === 'en' ? 'TE' : 'EN'}</span>
            </button>
          </div>

      </div>
    </header>
  );
}
