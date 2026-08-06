import {
  MessageSquare,
  FileSpreadsheet,
  Trash2,
} from "lucide-react";

export default function AdminFeedbackInbox({
  feedbackStatusFilter,
  setFeedbackStatusFilter,
  filteredFeedback,
  handleExportCsv,
  setViewingScreenshotModal,
  setSelectedFeedbackItem,
  setEditingStatusInput,
  setAdminNoteInput,
  onDeleteFeedback,
}) {
  return (
    <div className="space-y-4">

      {/* 3. FEEDBACK INBOX MODE */}
    
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
        

    </div>
  );
}