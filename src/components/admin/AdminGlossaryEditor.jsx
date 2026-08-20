import { Plus, Trash2, Upload } from "lucide-react";

export default function AdminGlossaryEditor({
  glossaryForm,
  setGlossaryForm,
  onSaveGlossaryEdit,
  onDeleteGlossaryTerm,
  onClose,
  uploadFileToSupabaseStorage,
  compressImageFile,
  isAdding = false,
}) {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="space-y-4 animate-fade-in">
        <div className="p-4 rounded-xl bg-[#141923] border border-[#D4AF37]/40 space-y-3">
          <h3 className="font-serif text-lg font-bold text-[#FFD700]">
            📖 {isAdding ? "Add New Glossary Term" : "Admin Glossary Editor"}
            {!isAdding && glossaryForm.term
              ? `: ${glossaryForm.term}`
              : ""}
          </h3>

          <p className="text-xs text-[#94A3B8]">
            Edit term meanings and add custom images with captions. Note:
            Images are shown only when added by Admin.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="text-xs font-bold text-[#FFD700] block mb-1">
                Term (English):
              </label>

              <input
                type="text"
                value={glossaryForm.term}
                onChange={(e) =>
                  setGlossaryForm({
                    ...glossaryForm,
                    term: e.target.value,
                  })
                }
                className="w-full px-3 py-2 rounded-lg bg-black border border-[#D4AF37]/50 text-white text-xs font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#FFD700] block mb-1">
                Term (Telugu):
              </label>

              <input
                type="text"
                value={glossaryForm.termTe}
                onChange={(e) =>
                  setGlossaryForm({
                    ...glossaryForm,
                    termTe: e.target.value,
                  })
                }
                className="w-full px-3 py-2 rounded-lg bg-black border border-[#D4AF37]/50 text-white text-xs font-bold font-sans"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-[#FFD700] block mb-1">
                Short Description (English):
              </label>

              <textarea
                rows={2}
                value={glossaryForm.shortDesc}
                onChange={(e) =>
                  setGlossaryForm({
                    ...glossaryForm,
                    shortDesc: e.target.value,
                  })
                }
                className="w-full px-3 py-2 rounded-lg bg-black border border-[#D4AF37]/50 text-white text-xs"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-[#FFD700] block mb-1">
                Short Description (Telugu):
              </label>

              <textarea
                rows={2}
                value={glossaryForm.shortDescTe}
                onChange={(e) =>
                  setGlossaryForm({
                    ...glossaryForm,
                    shortDescTe: e.target.value,
                  })
                }
                className="w-full px-3 py-2 rounded-lg bg-black border border-[#D4AF37]/50 text-white text-xs font-sans"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-[#FFD700] block mb-1">
                Detailed History & Meaning (English):
              </label>

              <textarea
                rows={5}
                value={glossaryForm.detailedMeaning}
                onChange={(e) =>
                  setGlossaryForm({
                    ...glossaryForm,
                    detailedMeaning: e.target.value,
                  })
                }
                className="w-full px-3 py-2 rounded-lg bg-black border border-[#D4AF37]/50 text-white text-xs"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-[#FFD700] block mb-1">
                Detailed History & Meaning (Telugu):
              </label>

              <textarea
                rows={5}
                value={glossaryForm.detailedMeaningTe}
                onChange={(e) =>
                  setGlossaryForm({
                    ...glossaryForm,
                    detailedMeaningTe: e.target.value,
                  })
                }
                className="w-full px-3 py-2 rounded-lg bg-black border border-[#D4AF37]/50 text-white text-xs font-sans"
              />
            </div>

            {/* CUSTOM ADMIN IMAGE GALLERY MANAGEMENT */}
            <div className="md:col-span-2 space-y-2 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#FFD700]">
                  📷 Admin Custom Images Gallery (Optional):
                </label>

                <button
                  type="button"
                  onClick={() =>
                    setGlossaryForm({
                      ...glossaryForm,
                      images: [
                        ...(glossaryForm.images || []),
                        { url: "", caption: "" },
                      ],
                    })
                  }
                  className="px-2 py-1 rounded bg-[#FF5722] text-white text-[10px] font-extrabold flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Image</span>
                </button>
              </div>

              {(glossaryForm.images || []).map((img, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-[#0B0E14] border border-white/10 space-y-2 relative group"
                >
                  <div className="flex items-center justify-between text-[11px] font-bold text-white/80">
                    <span>Glossary Photo #{idx + 1}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[10px] font-bold text-[#FFD700]">
                          Image URL *
                        </label>

                        <label className="cursor-pointer text-[10px] font-extrabold text-[#FFD700] hover:text-white bg-[#FF5722]/30 hover:bg-[#FF5722]/60 border border-[#FF5722]/60 px-2 py-0.5 rounded flex items-center gap-1 transition-colors shadow">
                          <Upload className="w-3 h-3 text-[#FFD700]" />

                          <span>📤 Upload from PC</span>

                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              const file =
                                e.target.files &&
                                e.target.files[0];

                              if (!file) return;

                              try {
                                const glossaryFolder = `glossary/${
                                  glossaryForm.id ||
                                  glossaryForm.term ||
                                  "general"
                                }`;

                                const storageRes =
                                  await uploadFileToSupabaseStorage(
                                    file,
                                    glossaryFolder
                                  );

                                const finalUrl =
                                  storageRes.success &&
                                  storageRes.publicUrl
                                    ? storageRes.publicUrl
                                    : await compressImageFile(file);

                                const updated = [
                                  ...(glossaryForm.images || []),
                                ];

                                if (!updated[idx]) {
                                  updated[idx] = {
                                    url: "",
                                    caption: "",
                                  };
                                }

                                updated[idx] = {
                                  ...updated[idx],
                                  url: finalUrl,
                                };

                                setGlossaryForm({
                                  ...glossaryForm,
                                  images: updated,
                                });
                              } catch (err) {
                                console.error(err);

                                const compressedDataUrl =
                                  await compressImageFile(file);

                                const updated = [
                                  ...(glossaryForm.images || []),
                                ];

                                if (!updated[idx]) {
                                  updated[idx] = {
                                    url: "",
                                    caption: "",
                                  };
                                }

                                updated[idx] = {
                                  ...updated[idx],
                                  url: compressedDataUrl,
                                };

                                setGlossaryForm({
                                  ...glossaryForm,
                                  images: updated,
                                });
                              }

                              e.target.value = "";
                            }}
                          />
                        </label>
                      </div>

                      <input
                        type="text"
                        placeholder="https://... or click Upload from PC"
                        value={img.url}
                        onChange={(e) => {
                          const updated = [
                            ...(glossaryForm.images || []),
                          ];

                          updated[idx] = {
                            ...updated[idx],
                            url: e.target.value,
                          };

                          setGlossaryForm({
                            ...glossaryForm,
                            images: updated,
                          });
                        }}
                        className="w-full px-2 py-1 bg-[#141923] border border-white/20 text-white text-xs font-mono rounded"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#FFD700] block mb-1">
                        Caption / Title
                      </label>

                      <input
                        type="text"
                        placeholder="Image Caption"
                        value={img.caption}
                        onChange={(e) => {
                          const updated = [
                            ...(glossaryForm.images || []),
                          ];

                          updated[idx] = {
                            ...updated[idx],
                            caption: e.target.value,
                          };

                          setGlossaryForm({
                            ...glossaryForm,
                            images: updated,
                          });
                        }}
                        className="w-full px-2 py-1 bg-[#141923] border border-white/20 text-white text-xs rounded"
                      />
                    </div>
                  </div>

                  {img.url && (
                    <div className="h-20 w-full rounded-xl overflow-hidden border border-[#D4AF37]/40 mt-1 bg-[#141923] relative">
                      <img
                        src={img.url}
                        alt="Glossary Photo Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
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

            {/* ACTIONS */}
            <div className="md:col-span-2 pt-3 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() =>
                  onDeleteGlossaryTerm?.(glossaryForm.id)
                }
                disabled={
                  isAdding || !glossaryForm.id
                }
                className="px-4 py-2 rounded-xl bg-red-900/30 border border-red-500/40 text-red-300 text-xs font-bold flex items-center gap-1.5 hover:bg-red-900/50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete Term
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-[#141923] text-white text-xs font-bold"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onSaveGlossaryEdit) {
                      onSaveGlossaryEdit(
                        glossaryForm.id,
                        glossaryForm
                      );
                    }

                    onClose();
                  }}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#FFD700] text-black font-extrabold text-xs shadow-lg"
                >
                  {isAdding
                    ? "Add Glossary Term"
                    : "Save Glossary Term"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}