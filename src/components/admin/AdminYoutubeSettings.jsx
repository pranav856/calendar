export default function AdminYoutubeSettings({
  youtubeInput,
  setYoutubeInput,
  onSaveTtdLiveUrl,
  onClose,
}) {
  return (
    <div className="space-y-4 animate-fade-in">

      {/* YOUTUBE LIVE STREAM CONFIGURATION TAB */}
          <div className="space-y-4 animate-fade-in">
            <div className="p-4 rounded-xl bg-[#141923] border border-[#D4AF37]/40 space-y-3">
              <h3 className="font-serif text-lg font-bold text-[#FFD700]">
                🔴 TTD Daily YouTube Live Stream Embed Settings
              </h3>
              <p className="text-xs text-[#94A3B8]">
                Paste the TTD YouTube Live Stream video URL or Embed ID below. When set, a live stream banner/player will be displayed for all devotees!
              </p>

              <div>
                <label className="text-xs font-bold text-[#FFD700] block mb-1">YouTube Live Video URL or Embed ID:</label>
                <input
                  type="text"
                  placeholder="e.g. https://www.youtube.com/watch?v=liveID or dQw4w9WgXcQ"
                  value={youtubeInput}
                  onChange={e => setYoutubeInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black border border-[#D4AF37]/50 text-white text-xs font-bold"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (onSaveTtdLiveUrl) onSaveTtdLiveUrl('');
                    setYoutubeInput('');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-red-900/80 border border-red-500 text-white text-xs font-bold"
                >
                  Clear Live Stream
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (onSaveTtdLiveUrl) onSaveTtdLiveUrl(youtubeInput);
                    onClose();
                  }}
                  className="px-5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow"
                >
                  Save Live Stream
                </button>
              </div>
            </div>
          </div>
        

    </div>
  );
}