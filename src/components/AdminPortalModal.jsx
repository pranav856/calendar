import AdminGlossaryEditor from "./admin/AdminGlossaryEditor";
import AdminFeedbackInbox from "./admin/AdminFeedbackInbox";
import AdminYoutubeSettings from "./admin/AdminYoutubeSettings";
import AdminCloudSync from "./admin/AdminCloudSync";
import React, { useState, useEffect } from 'react';
import { X, Plus, Edit2, Trash2, ShieldCheck, Lock, LogOut, MessageSquare, FileSpreadsheet, Search, Eye, CheckCircle, Cloud, RefreshCw, Database, Server, Image, Video, Upload } from 'lucide-react';
import { TEMPLES } from '../data/templeEvents';
import { getCloudConfig, saveCloudConfig, pushEventsToCloud, getLastSyncTime, uploadFileToSupabaseStorage } from '../utils/cloudSync';
import { normalizeImageUrl, compressImageFile } from '../utils/eventStatus';

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

  const getInitialImages = (evt) => {
    if (evt && evt.images && Array.isArray(evt.images) && evt.images.length > 0) {
      return evt.images.map(img => typeof img === 'string' ? { url: img, caption: '' } : { url: img.url || '', caption: img.caption || '' });
    }
    if (evt && evt.imageUrl) {
      return [{ url: evt.imageUrl, caption: evt.title || '' }];
    }
    return [{ url: '', caption: '' }];
  };

  const getTodayIST = () =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

  // Event Form State
  const [eventForm, setEventForm] = useState({
    title: '',
    titleTe: '',
    templeId: 'tirumala-main',
    startDate: getTodayIST(),
    endDate: getTodayIST(),
    category: 'brahmotsavam',
    vahanam: '',
    description: '',
    descriptionTe: '',
    imageUrl: '',
    images: [{ url: '', caption: '' }]
  });

  useEffect(() => {
    if (targetEvent) {
      setEventForm({
        title: targetEvent.title || '',
        titleTe: targetEvent.titleTe || '',
        templeId: targetEvent.templeId || 'tirumala-main',
        startDate: targetEvent.startDate || '2026-07-27',
        endDate: targetEvent.endDate || '2026-07-27',
        category: targetEvent.category || 'brahmotsavam',
        vahanam: targetEvent.vahanam || '',
        description: targetEvent.description || '',
        descriptionTe: targetEvent.descriptionTe || '',
        imageUrl: targetEvent.imageUrl || '',
        images: getInitialImages(targetEvent)
      });
    } else {
      setEventForm({
        title: '',
        titleTe: '',
        templeId: 'tirumala-main',
        startDate: getTodayIST(),
        endDate: getTodayIST(),
        category: 'brahmotsavam',
        vahanam: '',
        description: '',
        descriptionTe: '',
        imageUrl: '',
        images: [{ url: '', caption: '' }]
      });
    }
  }, [targetEvent]);

  const handleAddImageField = () => {
    setEventForm(prev => ({
      ...prev,
      images: [...prev.images, { url: '', caption: '' }]
    }));
  };

  const handleRemoveImageField = (index) => {
    setEventForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleImageFieldChange = (index, field, value) => {
    setEventForm(prev => {
      const updated = [...prev.images];
      const cleanVal = field === 'url' ? normalizeImageUrl(value) : value;
      updated[index] = { ...updated[index], [field]: cleanVal };
      return { ...prev, images: updated };
    });
  };

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

  const handleSaveEvent = (e) => {
    e.preventDefault();
    if (!eventForm.title.trim()) return;

    const cleanedImages = (eventForm.images || [])
      .filter(img => img.url && img.url.trim() !== '')
      .map(img => ({ url: img.url.trim(), caption: (img.caption || '').trim() }));

    const eventPayload = {
      ...eventForm,
      images: cleanedImages,
      imageUrl: cleanedImages.length > 0 ? cleanedImages[0].url : ''
    };

    if (targetEvent) {
      onUpdateEvent({
        ...targetEvent,
        ...eventPayload
      });
      alert(lang === 'en' ? 'Event updated live on website!' : 'ఉత్సవం నవీకరించబడింది!');
    } else {
      const newEvt = {
        id: `custom-evt-${Date.now()}`,
        ...eventPayload
      };
      onAddEvent(newEvt);
      alert(lang === 'en' ? 'New event added live on website!' : 'కొత్త ఉత్సవం జతచేయబడింది!');
    }

    onClose();
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
        {isAdminLoggedIn && (activeAdminTab === 'edit-event' || activeAdminTab === 'add-event') && (
          <form onSubmit={handleSaveEvent} className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#D4AF37]/30 pb-3">
              <Edit2 className="w-5 h-5 text-[#FF5722]" />
              <h3 className="font-serif text-lg font-bold text-white">
                {targetEvent ? `Edit Event: ${targetEvent.title}` : 'Add New Temple Event'}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#FFD700] block mb-1">Event Title (English) *</label>
                <input
                  type="text"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  placeholder="e.g. Srivari Brahmotsavam"
                  className="w-full px-3 py-2 rounded-xl bg-[#141923] border border-[#D4AF37]/50 text-white text-xs"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#FFD700] block mb-1">Event Title (Telugu)</label>
                <input
                  type="text"
                  value={eventForm.titleTe}
                  onChange={(e) => setEventForm({ ...eventForm, titleTe: e.target.value })}
                  placeholder="ఉత్సవం పేరు"
                  className="w-full px-3 py-2 rounded-xl bg-[#141923] border border-[#D4AF37]/50 text-white text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-[#FFD700] block mb-1">Temple Shrine</label>
                <select
                  value={eventForm.templeId}
                  onChange={(e) => setEventForm({ ...eventForm, templeId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#141923] border border-[#D4AF37]/50 text-[#FFD700] text-xs font-bold"
                >
                  {TEMPLES.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#FFD700] block mb-1">Start Date *</label>
                <input
                  type="date"
                  value={eventForm.startDate}
                  onChange={(e) => setEventForm({ ...eventForm, startDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#141923] border border-[#D4AF37]/50 text-white text-xs font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#FFD700] block mb-1">End Date *</label>
                <input
                  type="date"
                  value={eventForm.endDate}
                  onChange={(e) => setEventForm({ ...eventForm, endDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#141923] border border-[#D4AF37]/50 text-white text-xs font-mono"
                  required
                />
              </div>
            </div>

            {/* EVENT PHOTOS & CAPTIONS MANAGER */}
            <div className="space-y-3 p-3.5 rounded-xl bg-[#141923] border border-[#D4AF37]/40">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#FFD700]">
                  <Image className="w-4 h-4 text-[#FF5722]" />
                  <span>Event Photos & Captions ({eventForm.images ? eventForm.images.length : 0})</span>
                </div>
                <button
                  type="button"
                  onClick={handleAddImageField}
                  className="px-2.5 py-1 rounded bg-[#FF5722] hover:bg-[#E65100] text-white text-[10px] font-extrabold flex items-center gap-1 shadow"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Photo</span>
                </button>
              </div>

              {eventForm.images.map((imgObj, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-[#0B0E14] border border-white/10 space-y-2 relative group">
                  <div className="flex items-center justify-between text-[11px] font-bold text-white/80">
                    <span>Photo #{idx + 1} {idx === 0 ? '(Main Cover Photo)' : ''}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveImageField(idx)}
                      className="text-red-400 hover:text-red-300 p-1 flex items-center gap-1 bg-red-950/60 border border-red-500/40 px-2 py-0.5 rounded"
                      title="Remove / delete photo"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      <span className="text-[10px]">Remove Photo</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[10px] font-bold text-[#FFD700]">Image URL *</label>
                        <label className="cursor-pointer text-[10px] font-extrabold text-[#FFD700] hover:text-white bg-[#FF5722]/30 hover:bg-[#FF5722]/60 border border-[#FF5722]/60 px-2 py-0.5 rounded flex items-center gap-1 transition-colors shadow">
                          <Upload className="w-3 h-3 text-[#FFD700]" />
                          <span>📁 Upload from PC</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files && e.target.files[0];
                              if (file) {
                                try {
                                  const eventFolder = targetEvent?.id || eventForm.title || 'event';
                                  const storageRes = await uploadFileToSupabaseStorage(file, eventFolder);
                                  if (storageRes.success && storageRes.publicUrl) {
                                    handleImageFieldChange(idx, 'url', storageRes.publicUrl);
                                  } else {
                                    console.warn('Supabase storage upload failed:', storageRes.message);
                                    const compressedDataUrl = await compressImageFile(file);
                                    handleImageFieldChange(idx, 'url', compressedDataUrl);
                                    alert(`⚠️ Could not upload directly to Supabase Storage (${storageRes.message || 'Check Admin -> Cloud Sync credentials & Storage RLS policies'}). Image saved to browser cache.`);
                                  }
                                } catch (err) {
                                  console.error(err);
                                  const compressedDataUrl = await compressImageFile(file);
                                  handleImageFieldChange(idx, 'url', compressedDataUrl);
                                }
                              }
                            }}
                          />
                        </label>
                      </div>
                      <input
                        type="text"
                        value={imgObj.url}
                        onChange={(e) => handleImageFieldChange(idx, 'url', e.target.value)}
                        onBlur={(e) => handleImageFieldChange(idx, 'url', normalizeImageUrl(e.target.value))}
                        placeholder="https://... or click Upload from PC"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-[#141923] border border-[#D4AF37]/40 text-white text-xs font-mono"
                      />
                      <span className="text-[9px] text-[#94A3B8] block mt-0.5">
                        💡 Tip: Click "📁 Upload from PC" to select a photo from your computer, or paste a URL!
                      </span>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#FFD700] block mb-0.5">Caption / Title</label>
                      <input
                        type="text"
                        value={imgObj.caption}
                        onChange={(e) => handleImageFieldChange(idx, 'caption', e.target.value)}
                        placeholder="e.g. Malayappa swami Chinna Sesha Vahanam"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-[#141923] border border-[#D4AF37]/40 text-white text-xs"
                      />
                    </div>
                  </div>

                  {imgObj.url && (
                    <div className="h-20 w-full rounded-xl overflow-hidden border border-[#D4AF37]/40 mt-1 bg-[#141923] relative">
                      <img 
                        src={normalizeImageUrl(imgObj.url)} 
                        alt="Photo Preview" 
                        className="w-full h-full object-cover" 
                        onError={(e) => { 
                          e.target.parentElement.innerHTML = '<div className="p-2 text-[10px] text-amber-400 font-mono text-center">⚠️ Invalid image URL. Ensure URL points directly to an image (.jpg, .png, .webp).</div>'; 
                        }} 
                      />
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 rounded text-[9px] text-[#FFD700] font-bold border border-[#FFD700]/30">
                        Live Preview
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div>
              <label className="text-xs font-bold text-[#FFD700] block mb-1">Description</label>
              <textarea
                rows={3}
                value={eventForm.description}
                onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#141923] border border-[#D4AF37]/50 text-white text-xs"
              ></textarea>
            </div>

          <div className="flex justify-between items-center gap-2 pt-2">
  <div>
    {targetEvent && (
      <button
        type="button"
        onClick={async () => {
          const confirmed = window.confirm(
            lang === 'en'
              ? `Are you sure you want to permanently delete "${targetEvent.title}"?\n\nThis action cannot be undone.`
              : `మీరు "${targetEvent.title}" ఉత్సవాన్ని శాశ్వతంగా తొలగించాలనుకుంటున్నారా?\n\nఈ చర్యను రద్దు చేయలేరు.`
          );

          if (!confirmed) return;

          try {
            await onDeleteEvent(targetEvent.id);
            onClose();
          } catch (error) {
            console.error('Delete event failed:', error);
            alert(
              lang === 'en'
                ? 'Failed to delete the event. Please try again.'
                : 'ఉత్సవాన్ని తొలగించడం విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి.'
            );
          }
        }}
        className="px-4 py-2 rounded-xl bg-red-950/70 hover:bg-red-900 text-red-300 hover:text-white border border-red-500/50 text-xs font-bold flex items-center gap-2 transition-colors"
      >
        <Trash2 className="w-3.5 h-3.5" />
        Delete Event
      </button>
    )}
  </div>

  <div className="flex gap-2">
    <button
      type="button"
      onClick={onClose}
      className="px-4 py-2 rounded-xl bg-[#141923] text-white border border-white/20 text-xs font-bold"
    >
      Cancel
    </button>

    <button
      type="submit"
      className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#FFD700] text-black font-extrabold text-xs shadow-lg"
    >
      {targetEvent ? 'Save Changes' : 'Publish Event Live'}
    </button>
  </div>
</div>
          </form>
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
    uploadFileToSupabaseStorage={uploadFileToSupabaseStorage}
    compressImageFile={compressImageFile}
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
