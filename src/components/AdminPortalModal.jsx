import React, { useState, useEffect } from 'react';
import { X, Plus, Edit2, Trash2, ShieldCheck, Lock, LogOut, MessageSquare, FileSpreadsheet, Search, Eye, CheckCircle, Cloud, RefreshCw, Database, Server } from 'lucide-react';
import { TEMPLES } from '../data/templeEvents';
import { getCloudConfig, saveCloudConfig, pushEventsToCloud, getLastSyncTime } from '../utils/cloudSync';

export default function AdminPortalModal({
  mode, // 'login' | 'edit-event' | 'feedback-inbox'
  onClose,
  lang,
  events,
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
  isAdminLoggedIn,
  setIsAdminLoggedIn,
  targetEvent,
  feedbackList,
  onUpdateFeedback,
  onDeleteFeedback
}) {
  // Admin Navigation State
  const [activeAdminTab, setActiveAdminTab] = useState(mode || 'feedback-inbox');

  useEffect(() => {
    if (mode) setActiveAdminTab(mode);
  }, [mode]);

  // Login Form State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Event Form State
  const [eventForm, setEventForm] = useState({
    title: '',
    titleTe: '',
    templeId: 'tirumala',
    startDate: '2026-07-27',
    endDate: '2026-07-27',
    category: 'utsavam',
    vahanam: '',
    description: '',
    descriptionTe: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (targetEvent) {
      setEventForm({
        title: targetEvent.title || '',
        titleTe: targetEvent.titleTe || '',
        templeId: targetEvent.templeId || 'tirumala',
        startDate: targetEvent.startDate || '2026-07-27',
        endDate: targetEvent.endDate || '2026-07-27',
        category: targetEvent.category || 'utsavam',
        vahanam: targetEvent.vahanam || '',
        description: targetEvent.description || '',
        descriptionTe: targetEvent.descriptionTe || '',
        imageUrl: targetEvent.imageUrl || ''
      });
    } else {
      setEventForm({
        title: '',
        titleTe: '',
        templeId: 'tirumala',
        startDate: '2026-07-27',
        endDate: '2026-07-27',
        category: 'utsavam',
        vahanam: '',
        description: '',
        descriptionTe: '',
        imageUrl: ''
      });
    }
  }, [targetEvent]);

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
    setSyncStatusMsg('Synchronizing Panchangam events to cloud database...');
    const result = await pushEventsToCloud(events);
    setIsSyncing(false);
    setSyncStatusMsg(result.message);
    setLastSyncTime(result.timestamp);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError('');

    const expectedUser = import.meta.env.VITE_ADMIN_USER || 'ttd_master_admin';
    const expectedPass = import.meta.env.VITE_ADMIN_PASS || 'Tirumala#Divya2026!Secured';

    if (username.trim() === expectedUser && password.trim() === expectedPass) {
      setIsAdminLoggedIn(true);
      onClose();
    } else {
      setAuthError(lang === 'en' ? 'Invalid credentials! Please check your Admin username and password.' : 'అనుమతి నిరాకరించబడింది!');
    }
  };

  const handleSaveEvent = (e) => {
    e.preventDefault();
    if (!eventForm.title.trim()) return;

    if (targetEvent) {
      onUpdateEvent({
        ...targetEvent,
        ...eventForm
      });
      alert(lang === 'en' ? 'Event updated live on website!' : 'ఉత్సవం నవీకరించబడింది!');
    } else {
      const newEvt = {
        id: `custom-evt-${Date.now()}`,
        ...eventForm
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

            <div>
              <label className="text-xs font-bold text-[#FFD700] block mb-1">Image URL (Optional)</label>
              <input
                type="url"
                value={eventForm.imageUrl}
                onChange={(e) => setEventForm({ ...eventForm, imageUrl: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 rounded-xl bg-[#141923] border border-[#D4AF37]/50 text-white text-xs"
              />
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

            <div className="flex justify-end gap-2 pt-2">
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
          </form>
        )}

        {/* 3. FEEDBACK INBOX MODE */}
        {isAdminLoggedIn && activeAdminTab === 'feedback-inbox' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#FFD700]" />
                <h3 className="font-serif text-lg font-bold text-white">Devotee Feedback Inbox</h3>
              </div>

              <button
                onClick={handleExportCsv}
                className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 shadow"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            {/* Filter */}
            <div className="flex items-center justify-end gap-2">
              <select
                value={feedbackStatusFilter}
                onChange={(e) => setFeedbackStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg bg-[#141923] border border-[#D4AF37]/50 text-[#FFD700] text-xs font-bold"
              >
                <option value="all">All Statuses</option>
                <option value="New">New</option>
                <option value="Under Review">Under Review</option>
                <option value="Planned">Planned</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Feedback Submissions List */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto no-scrollbar">
              {filteredFeedback.length === 0 ? (
                <div className="p-8 text-center text-[#94A3B8] bg-[#141923] rounded-xl border border-white/10">
                  No feedback submissions match criteria.
                </div>
              ) : (
                filteredFeedback.map(fb => (
                  <div
                    key={fb.id}
                    className="p-3.5 rounded-xl bg-[#141923] border border-[#D4AF37]/30 hover:border-[#FFD700] transition-colors flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-[#FFD700] bg-[#0B0E14] px-1.5 py-0.5 rounded">
                          {fb.refNumber}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase bg-[#FF5722]/20 text-[#FF5722]">
                          {fb.feedbackType}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase bg-amber-500 text-black">
                          {fb.status}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-white text-sm">{fb.title}</h4>
                      <p className="text-[#94A3B8] line-clamp-2 text-xs">{fb.description}</p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {fb.screenshotUrl && (
                        <button
                          onClick={() => setViewingScreenshotModal(fb.screenshotUrl)}
                          className="px-2 py-1 rounded bg-[#0B0E14] text-[#FFD700] text-[10px] font-bold border border-[#FFD700]/30"
                        >
                          Screenshot
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setSelectedFeedbackItem(fb);
                          setEditingStatusInput(fb.status);
                          setAdminNoteInput(fb.adminNotes || '');
                        }}
                        className="px-2.5 py-1 rounded bg-[#FF5722] text-white text-[10px] font-bold"
                      >
                        Update
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm('Delete submission?')) {
                            onDeleteFeedback(fb.id);
                          }
                        }}
                        className="p-1 rounded bg-red-900/40 text-red-400 hover:bg-red-900"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 4. CLOUD DATABASE SYNC MODE */}
        {isAdminLoggedIn && activeAdminTab === 'cloud-sync' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-3">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-[#FFD700]" />
                <h3 className="font-serif text-lg font-bold text-white">Cloud Database Sync Manager</h3>
              </div>

              <button
                onClick={handleTriggerCloudSync}
                disabled={isSyncing}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black font-extrabold text-xs flex items-center gap-1.5 shadow hover:brightness-110 active:scale-95 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
              </button>
            </div>

            {/* Sync Status Banner */}
            {syncStatusMsg && (
              <div className="p-3 rounded-xl bg-[#141923] border border-[#FFD700]/40 text-xs font-bold text-[#FFD700] flex items-center justify-between">
                <span>{syncStatusMsg}</span>
                {lastSyncTime && (
                  <span className="text-[10px] text-[#94A3B8] font-mono">
                    Last: {new Date(lastSyncTime).toLocaleTimeString()}
                  </span>
                )}
              </div>
            )}

            {/* Cloud Endpoint Settings Form */}
            <form onSubmit={handleSaveCloudConfig} className="space-y-3 bg-[#141923] p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold text-white border-b border-white/10 pb-2">
                <Server className="w-4 h-4 text-[#FF5722]" />
                <span>Cloud Endpoint Credentials (Supabase / Custom REST)</span>
              </div>

              <div>
                <label className="text-xs font-bold text-[#FFD700] block mb-1">Database API Endpoint URL</label>
                <input
                  type="url"
                  value={cloudConfig.endpointUrl}
                  onChange={(e) => setCloudConfigState({ ...cloudConfig, endpointUrl: e.target.value })}
                  placeholder="https://xyz.supabase.co/rest/v1 or https://api.yourdomain.com"
                  className="w-full px-3 py-2 rounded-xl bg-[#0B0E14] border border-[#D4AF37]/40 text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#FFD700] block mb-1">API Key / Bearer Token</label>
                <input
                  type="password"
                  value={cloudConfig.apiKey}
                  onChange={(e) => setCloudConfigState({ ...cloudConfig, apiKey: e.target.value })}
                  placeholder="sbp_xxxxxxxxxxxx or secret_key"
                  className="w-full px-3 py-2 rounded-xl bg-[#0B0E14] border border-[#D4AF37]/40 text-white text-xs font-mono"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-[#94A3B8] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cloudConfig.autoSync}
                    onChange={(e) => setCloudConfigState({ ...cloudConfig, autoSync: e.target.checked })}
                    className="accent-[#FFD700]"
                  />
                  <span>Auto-sync when events are added or updated</span>
                </label>

                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
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
