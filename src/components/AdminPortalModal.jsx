import AdminGlossaryEditor from "./admin/AdminGlossaryEditor";
import AdminFeedbackInbox from "./admin/AdminFeedbackInbox";
import AdminYoutubeSettings from "./admin/AdminYoutubeSettings";
import AdminCloudSync from "./admin/AdminCloudSync";
import AdminEventEditor from "./admin/AdminEventEditor";
import React, { useState, useEffect } from 'react';
import { X, Plus, ShieldCheck, Lock, LogOut, MessageSquare, FileSpreadsheet, Search, Eye, CheckCircle, Cloud, RefreshCw, Database, Server, Video, } from 'lucide-react';
import { getCloudConfig, saveCloudConfig, pushEventsToCloud, getLastSyncTime } from '../utils/cloudSync';

export default function AdminPortalModal({
  mode, // 'login' | 'edit-event' | 'feedback-inbox' | 'edit-glossary' | 'youtube-live'
  onClose,
  lang,
  events,
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
  isAdminLoggedIn,
  setIsAdminLoggedIn,
  login,
  targetEvent,
  feedbackList,
  onUpdateFeedback,
  onDeleteFeedback,
  targetGlossaryTerm,
  onSaveGlossaryEdit,
  ttdLiveUrl,
  onSaveTtdLiveUrl
}) {
  // Admin Navigation State
  const [activeAdminTab, setActiveAdminTab] = useState(mode || 'feedback-inbox');

  useEffect(() => {
    if (mode) setActiveAdminTab(mode);
  }, [mode]);

  // YouTube Live Form State
  const [youtubeInput, setYoutubeInput] = useState(ttdLiveUrl || '');

  const getInitialGlossaryImages = (term) => {
    if (term && term.images && Array.isArray(term.images) && term.images.length > 0) {
      const mapped = term.images
        .map(img => typeof img === 'string' ? { url: img, caption: '' } : { url: img?.url || '', caption: img?.caption || '' })
        .filter(img => img.url && img.url.trim() !== '');
      if (mapped.length > 0) return mapped;
    }
    return [{ url: '', caption: '' }];
  };

  // Glossary Form State
  const [glossaryForm, setGlossaryForm] = useState({
    id: targetGlossaryTerm?.id || '',
    term: targetGlossaryTerm?.term || '',
    termTe: targetGlossaryTerm?.termTe || '',
    shortDesc: targetGlossaryTerm?.shortDesc || '',
    shortDescTe: targetGlossaryTerm?.shortDescTe || '',
    detailedMeaning: targetGlossaryTerm?.detailedMeaning || '',
    detailedMeaningTe: targetGlossaryTerm?.detailedMeaningTe || '',
    images: getInitialGlossaryImages(targetGlossaryTerm)
  });

  useEffect(() => {
    if (targetGlossaryTerm) {
      setGlossaryForm({
        id: targetGlossaryTerm.id || '',
        term: targetGlossaryTerm.term || '',
        termTe: targetGlossaryTerm.termTe || '',
        shortDesc: targetGlossaryTerm.shortDesc || '',
        shortDescTe: targetGlossaryTerm.shortDescTe || '',
        detailedMeaning: targetGlossaryTerm.detailedMeaning || '',
        detailedMeaningTe: targetGlossaryTerm.detailedMeaningTe || '',
        images: getInitialGlossaryImages(targetGlossaryTerm)
      });
    }
  }, [targetGlossaryTerm]);

  // Login Form State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');


  const getTodayIST = () =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

  // Feedback State
  const [feedbackStatusFilter, setFeedbackStatusFilter] = useState('all');
  const [feedbackSearchQuery, setFeedbackSearchQuery] = useState('');
  const [selectedFeedbackItem, setSelectedFeedbackItem] = useState(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');
  const [editingStatusInput, setEditingStatusInput] = useState('New');
  const [viewingScreenshotModal, setViewingScreenshotModal] = useState(null);

  // Cloud Sync State
  const [cloudConfig, setCloudConfigState] = useState(() => getCloudConfig());
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState('');
  const [lastSyncTime, setLastSyncTime] = useState(() => getLastSyncTime());

  const handleSaveCloudConfig = (e) => {
    e.preventDefault();
    saveCloudConfig(cloudConfig);
    setSyncStatusMsg('Cloud configuration saved!');
  };

  const handleTriggerCloudSync = async () => {
    saveCloudConfig(cloudConfig);
    setIsSyncing(true);
    setSyncStatusMsg('Synchronizing temple events to cloud database...');
    const result = await pushEventsToCloud(events);
    setIsSyncing(false);
    setSyncStatusMsg(result.message);
    setLastSyncTime(result.timestamp);
  };

const handleLogin = async (e) => {
  e.preventDefault();
  setAuthError('');

  try {
    await login(username.trim(), password.trim());
    onClose();
  } catch (error) {
    console.error('Supabase login failed:', error);

    setAuthError(
      lang === 'en'
        ? 'Invalid credentials! Please check your Admin email and password.'
        : 'అనుమతి నిరాకరించబడింది! దయచేసి మీ Admin ఇమెయిల్ మరియు పాస్‌వర్డ్‌ను తనిఖీ చేయండి.'
    );
  }
};

  // Feedback filter logic
  const filteredFeedback = (feedbackList || []).filter(item => {
    if (feedbackStatusFilter !== 'all' && item.status !== feedbackStatusFilter) return false;
    if (feedbackSearchQuery.trim() !== '') {
      const q = feedbackSearchQuery.toLowerCase();
      return item.title.toLowerCase().includes(q) || item.refNumber.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
    }
    return true;
  });

  const handleSaveFeedbackDetail = () => {
    if (!selectedFeedbackItem) return;
    onUpdateFeedback({
      ...selectedFeedbackItem,
      status: editingStatusInput,
      adminNotes: adminNoteInput,
      updatedAt: new Date().toISOString()
    });
    alert('Feedback status updated!');
    setSelectedFeedbackItem(null);
  };

  const handleExportCsv = () => {
    if (!feedbackList || feedbackList.length === 0) return;
    const headers = ['Ref Number', 'Type', 'Title', 'Status', 'Name', 'Email', 'Created Date'];
    const rows = feedbackList.map(item => [
      `"${item.refNumber}"`,
      `"${item.feedbackType}"`,
      `"${item.title.replace(/"/g, '""')}"`,
      `"${item.status}"`,
      `"${item.name}"`,
      `"${item.email}"`,
      `"${item.createdAt}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tirumala_feedback_export_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-card max-w-2xl w-full p-6 relative animate-slide-up bg-[#0B0E14] border-2 border-[#FFD700] shadow-2xl rounded-2xl space-y-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#FFD700] p-1.5 rounded-full bg-[#141923] border border-[#D4AF37]/30"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LOGGED IN ADMIN NAVIGATION BAR */}
        {isAdminLoggedIn && (
          <div className="flex flex-wrap items-center gap-2 border-b border-[#D4AF37]/30 pb-3 pr-8">
            <button
              type="button"
              onClick={() => setActiveAdminTab('feedback-inbox')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                activeAdminTab === 'feedback-inbox'
                  ? 'bg-gradient-to-r from-[#FF5722] to-[#FFD700] text-black shadow'
                  : 'bg-[#141923] text-[#FFD700] border border-[#D4AF37]/40 hover:bg-[#D4AF37]/20'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Devotee Inbox ({feedbackList ? feedbackList.length : 0})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveAdminTab('add-event')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                activeAdminTab === 'add-event' || activeAdminTab === 'edit-event'
                  ? 'bg-gradient-to-r from-[#FF5722] to-[#FFD700] text-black shadow'
                  : 'bg-[#141923] text-[#FFD700] border border-[#D4AF37]/40 hover:bg-[#D4AF37]/20'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{targetEvent ? 'Edit Event' : 'Add Event'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveAdminTab('cloud-sync')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                activeAdminTab === 'cloud-sync'
                  ? 'bg-gradient-to-r from-[#FF5722] to-[#FFD700] text-black shadow'
                  : 'bg-[#141923] text-[#FFD700] border border-[#D4AF37]/40 hover:bg-[#D4AF37]/20'
              }`}
            >
              <Cloud className="w-3.5 h-3.5" />
              <span>Cloud Sync</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveAdminTab('youtube-live')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                activeAdminTab === 'youtube-live'
                  ? 'bg-gradient-to-r from-red-600 to-[#FFD700] text-black shadow'
                  : 'bg-[#141923] text-red-400 border border-red-500/40 hover:bg-red-500/20'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-red-500" />
              <span>🔴 YouTube Live</span>
            </button>
          </div>
        )}

        {/* 1. LOGIN MODE */}
        {(!isAdminLoggedIn || mode === 'login' && !isAdminLoggedIn) && (
          <form onSubmit={handleLogin} className="space-y-4 max-w-sm mx-auto py-4">
            <div className="text-center space-y-1">
              <Lock className="w-10 h-10 text-[#FF5722] mx-auto" />
              <h3 className="font-serif text-xl font-bold text-white">Admin Login</h3>
              <p className="text-xs text-[#94A3B8]">Enter credentials to unlock live site editing.</p>
            </div>

            {authError && (
              <div className="p-3 rounded-lg bg-[#990000]/30 border border-[#FF5722] text-[#FF5722] text-xs font-bold text-center">
                {authError}
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-[#FFD700] block mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#141923] border border-[#D4AF37]/50 text-white text-xs"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#FFD700] block mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#141923] border border-[#D4AF37]/50 text-white text-xs"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#FFD700] text-black font-extrabold text-xs shadow-lg hover:brightness-110"
            >
              Unlock Admin Edit Mode
            </button>
          </form>
        )}

       {/* 2. EDIT / ADD EVENT MODE */}
{isAdminLoggedIn &&
  (activeAdminTab === 'edit-event' ||
    activeAdminTab === 'add-event') && (
    <AdminEventEditor
      lang={lang}
      targetEvent={targetEvent}
      onAddEvent={onAddEvent}
      onUpdateEvent={onUpdateEvent}
      onDeleteEvent={onDeleteEvent}
      onClose={onClose}
    />
)}

        {/* 3. FEEDBACK INBOX MODE */}
        {isAdminLoggedIn && activeAdminTab === "feedback-inbox" && (
  <AdminFeedbackInbox
    feedbackStatusFilter={feedbackStatusFilter}
    setFeedbackStatusFilter={setFeedbackStatusFilter}
    filteredFeedback={filteredFeedback}
    handleExportCsv={handleExportCsv}
    setViewingScreenshotModal={setViewingScreenshotModal}
    setSelectedFeedbackItem={setSelectedFeedbackItem}
    setEditingStatusInput={setEditingStatusInput}
    setAdminNoteInput={setAdminNoteInput}
    onDeleteFeedback={onDeleteFeedback}
  />
)}


      {isAdminLoggedIn && activeAdminTab === "cloud-sync" && (
  <AdminCloudSync
    cloudConfig={cloudConfig}
    setCloudConfigState={setCloudConfigState}
    isSyncing={isSyncing}
    syncStatusMsg={syncStatusMsg}
    lastSyncTime={lastSyncTime}
    handleTriggerCloudSync={handleTriggerCloudSync}
    handleSaveCloudConfig={handleSaveCloudConfig}
  />
)}

{activeAdminTab === "edit-glossary" && (
  <AdminGlossaryEditor
    glossaryForm={glossaryForm}
    setGlossaryForm={setGlossaryForm}
    onSaveGlossaryEdit={onSaveGlossaryEdit}
    onClose={onClose}
  />
)}

        {/* YOUTUBE LIVE STREAM CONFIGURATION TAB */}
        {activeAdminTab === "youtube-live" && (
  <AdminYoutubeSettings
    youtubeInput={youtubeInput}
    setYoutubeInput={setYoutubeInput}
    onSaveTtdLiveUrl={onSaveTtdLiveUrl}
    onClose={onClose}
  />
)}

        {/* FEEDBACK EDIT MODAL POPUP */}
        {selectedFeedbackItem && (
          <div className="modal-overlay z-50" onClick={() => setSelectedFeedbackItem(null)}>
            <div 
              className="glass-card p-5 border-2 border-[#FFD700] max-w-md w-full bg-[#0B0E14] space-y-3 rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h3 className="font-serif text-sm font-bold text-[#FFD700]">
                  Update Feedback #{selectedFeedbackItem.refNumber}
                </h3>
                <button onClick={() => setSelectedFeedbackItem(null)} className="text-white text-xs">✕</button>
              </div>

              <div>
                <label className="text-xs font-bold text-[#FFD700] block mb-1">Status:</label>
                <select
                  value={editingStatusInput}
                  onChange={(e) => setEditingStatusInput(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#141923] border border-[#D4AF37] text-white text-xs font-bold"
                >
                  <option value="New">New</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Planned">Planned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#FFD700] block mb-1">Admin Notes:</label>
                <textarea
                  rows={3}
                  value={adminNoteInput}
                  onChange={(e) => setAdminNoteInput(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#141923] border border-[#D4AF37] text-white text-xs"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setSelectedFeedbackItem(null)}
                  className="px-3 py-1 rounded bg-[#141923] text-white text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveFeedbackDetail}
                  className="px-4 py-1 rounded bg-gradient-to-r from-[#FF5722] to-[#FFD700] text-black font-extrabold text-xs"
                >
                  Save Status
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SCREENSHOT LIGHTBOX MODAL POPUP */}
        {viewingScreenshotModal && (
          <div className="modal-overlay z-50" onClick={() => setViewingScreenshotModal(null)}>
            <div className="glass-card p-3 border-2 border-[#FFD700] max-w-lg w-full bg-[#0B0E14] text-center rounded-2xl relative" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setViewingScreenshotModal(null)} className="absolute top-2 right-2 text-white bg-black/60 p-1.5 rounded-full text-xs">✕</button>
              <img src={viewingScreenshotModal} alt="Screenshot" className="max-h-[70vh] mx-auto rounded-lg object-contain" />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
