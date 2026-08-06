import { Cloud, RefreshCw, Server } from "lucide-react";
export default function AdminCloudSync({
  cloudConfig,
  setCloudConfigState,
  isSyncing,
  syncStatusMsg,
  lastSyncTime,
  handleTriggerCloudSync,
  handleSaveCloudConfig,
}) {
  return (
    <div className="space-y-4">

      {/* 4. CLOUD DATABASE SYNC MODE */}
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
              <div className={`p-3.5 rounded-xl border text-xs font-bold flex items-center justify-between shadow ${
                syncStatusMsg.startsWith('❌')
                  ? 'bg-red-950/80 border-red-500 text-red-200'
                  : 'bg-[#141923] border-[#FFD700]/40 text-[#FFD700]'
              }`}>
                <span>{syncStatusMsg}</span>
                {lastSyncTime && (
                  <span className="text-[10px] text-[#94A3B8] font-mono shrink-0 ml-2">
                    Last: {new Date(lastSyncTime).toLocaleTimeString()}
                  </span>
                )}
              </div>
            )}

            {/* Cloud Database Connection Warning Notice */}
            {!cloudConfig.endpointUrl && (
              <div className="p-3.5 rounded-xl bg-amber-950/60 border border-amber-500/50 text-amber-200 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-extrabold text-[#FFD700]">
                  <Cloud className="w-4 h-4 text-[#FF5722]" />
                  <span>⚠️ Cloud Database Not Connected</span>
                </div>
                <p className="leading-relaxed text-[11px] text-amber-100">
                  Currently, your event edits & computer-uploaded images are saved to your browser's local storage. To sync live across all devices & browsers in real-time, enter your <strong>Supabase REST URL</strong> and <strong>API Key</strong> in the fields below and click <strong>Save Settings & Sync</strong>.
                </p>
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
                  placeholder="e.g. https://xyz.supabase.co"
                  className="w-full px-3 py-2 rounded-xl bg-[#0B0E14] border border-[#D4AF37]/40 text-white text-xs font-mono"
                />
                <span className="text-[10px] text-[#94A3B8] block mt-0.5">
                  💡 Tip: You can paste your main Supabase URL (e.g. <code>https://xyz.supabase.co</code>) or REST URL (<code>/rest/v1/events</code>).
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-[#FFD700] block mb-1">API Key (anon public key or service key)</label>
                <input
                  type="password"
                  value={cloudConfig.apiKey}
                  onChange={(e) => setCloudConfigState({ ...cloudConfig, apiKey: e.target.value })}
                  placeholder="eyJhbGciOiJIUzI1Ni..."
                  className="w-full px-3 py-2 rounded-xl bg-[#0B0E14] border border-[#D4AF37]/40 text-white text-xs font-mono"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    const sql = `-- Run this SQL script in Supabase -> SQL Editor -> New Query -> Run
CREATE TABLE IF NOT EXISTS public.events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  title_te TEXT,
  temple_id TEXT,
  start_date TEXT,
  end_date TEXT,
  category TEXT,
  vahanam TEXT,
  description TEXT,
  description_te TEXT,
  image_url TEXT,
  images JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Disable Row Level Security so sync works without auth errors
ALTER TABLE public.events DISABLE ROW LEVEL SECURITY;`;
                    navigator.clipboard.writeText(sql);
                    alert('Copied 1-Click Supabase SQL Script! Paste in Supabase -> SQL Editor -> Run.');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#141923] border border-[#D4AF37]/50 text-[#FFD700] hover:bg-[#D4AF37]/20 text-[11px] font-bold flex items-center gap-1 shadow"
                  title="Copy SQL code to create events table in Supabase"
                >
                  <span>📋 Copy Supabase SQL Setup Script</span>
                </button>

                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 text-xs text-[#94A3B8] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cloudConfig.autoSync}
                      onChange={(e) => setCloudConfigState({ ...cloudConfig, autoSync: e.target.checked })}
                      className="accent-[#FFD700]"
                    />
                    <span>Auto-sync when updated</span>
                  </label>

                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow"
                  >
                    Save Settings
                  </button>
                </div>
              </div>
            </form>
          </div>
        

    </div>
  );
}