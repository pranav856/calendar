import React, { useEffect, useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Image,
  Upload
} from 'lucide-react';

import { TEMPLES } from '../../data/templeEvents';
import {
  uploadFileToSupabaseStorage
} from '../../utils/cloudSync';
import {
  normalizeImageUrl,
  compressImageFile
} from '../../utils/eventStatus';

const getTodayIST = () =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

const getInitialImages = (evt) => {
  if (
    evt &&
    evt.images &&
    Array.isArray(evt.images) &&
    evt.images.length > 0
  ) {
    const mapped = evt.images
      .map(img =>
        typeof img === 'string'
          ? { url: img, caption: '' }
          : {
              url: img?.url || '',
              caption: img?.caption || ''
            }
      )
      .filter(img => img.url && img.url.trim() !== '');

    if (mapped.length > 0) {
      return mapped;
    }
  }

  if (evt && evt.imageUrl) {
    return [
      {
        url: evt.imageUrl,
        caption: evt.title || ''
      }
    ];
  }

  return [{ url: '', caption: '' }];
};

const getEmptyEventForm = () => ({
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

export default function AdminEventEditor({
  lang,
  targetEvent,
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
  onClose
}) {
  const [eventForm, setEventForm] = useState(
    getEmptyEventForm()
  );

  useEffect(() => {
    if (targetEvent) {
      setEventForm({
        title: targetEvent.title || '',
        titleTe: targetEvent.titleTe || '',
        templeId:
          targetEvent.templeId ||
          'tirumala-main',
        startDate:
          targetEvent.startDate ||
          getTodayIST(),
        endDate:
          targetEvent.endDate ||
          getTodayIST(),
        category:
          targetEvent.category ||
          'brahmotsavam',
        vahanam:
          targetEvent.vahanam || '',
        description:
          targetEvent.description || '',
        descriptionTe:
          targetEvent.descriptionTe || '',
        imageUrl:
          targetEvent.imageUrl || '',
        images: getInitialImages(targetEvent)
      });
    } else {
      setEventForm(getEmptyEventForm());
    }
  }, [targetEvent]);

  const handleAddImageField = () => {
    setEventForm(prev => ({
      ...prev,
      images: [
        ...prev.images,
        { url: '', caption: '' }
      ]
    }));
  };

  const handleRemoveImageField = (index) => {
    setEventForm(prev => ({
      ...prev,
      images: prev.images.filter(
        (_, i) => i !== index
      )
    }));
  };

  const handleImageFieldChange = (
    index,
    field,
    value
  ) => {
    setEventForm(prev => {
      const updated = [...prev.images];

      const cleanValue =
        field === 'url'
          ? normalizeImageUrl(value)
          : value;

      updated[index] = {
        ...updated[index],
        [field]: cleanValue
      };

      return {
        ...prev,
        images: updated
      };
    });
  };

  const handleSaveEvent = (e) => {
    e.preventDefault();

    if (!eventForm.title.trim()) {
      return;
    }

    const cleanedImages = (
      eventForm.images || []
    )
      .filter(
        img =>
          img.url &&
          img.url.trim() !== ''
      )
      .map(img => ({
        url: img.url.trim(),
        caption:
          (img.caption || '').trim()
      }));

    const eventPayload = {
      ...eventForm,
      images: cleanedImages,
      imageUrl:
        cleanedImages.length > 0
          ? cleanedImages[0].url
          : ''
    };

    if (targetEvent) {
      onUpdateEvent({
        ...targetEvent,
        ...eventPayload
      });

      alert(
        lang === 'en'
          ? 'Event updated live on website!'
          : 'ఉత్సవం నవీకరించబడింది!'
      );
    } else {
      const newEvent = {
        id: `custom-evt-${Date.now()}`,
        ...eventPayload
      };

      onAddEvent(newEvent);

      alert(
        lang === 'en'
          ? 'New event added live on website!'
          : 'కొత్త ఉత్సవం జతచేయబడింది!'
      );
    }

    onClose();
  };

  return (
    <form
      onSubmit={handleSaveEvent}
      className="space-y-4"
    >
      <div className="flex items-center gap-2 border-b border-[#D4AF37]/30 pb-3">
        <Edit2 className="w-5 h-5 text-[#FF5722]" />

        <h3 className="font-serif text-lg font-bold text-white">
          {targetEvent
            ? `Edit Event: ${targetEvent.title}`
            : 'Add New Temple Event'}
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold text-[#FFD700] block mb-1">
            Event Title (English) *
          </label>

          <input
            type="text"
            value={eventForm.title}
            onChange={e =>
              setEventForm(prev => ({
                ...prev,
                title: e.target.value
              }))
            }
            placeholder="e.g. Srivari Brahmotsavam"
            className="w-full px-3 py-2 rounded-xl bg-[#141923] border border-[#D4AF37]/50 text-white text-xs"
            required
          />
        </div>

        <div>
          <label className="text-xs font-bold text-[#FFD700] block mb-1">
            Event Title (Telugu)
          </label>

          <input
            type="text"
            value={eventForm.titleTe}
            onChange={e =>
              setEventForm(prev => ({
                ...prev,
                titleTe: e.target.value
              }))
            }
            placeholder="ఉత్సవం పేరు"
            className="w-full px-3 py-2 rounded-xl bg-[#141923] border border-[#D4AF37]/50 text-white text-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="text-xs font-bold text-[#FFD700] block mb-1">
            Temple Shrine
          </label>

          <select
            value={eventForm.templeId}
            onChange={e =>
              setEventForm(prev => ({
                ...prev,
                templeId: e.target.value
              }))
            }
            className="w-full px-3 py-2 rounded-xl bg-[#141923] border border-[#D4AF37]/50 text-[#FFD700] text-xs font-bold"
          >
            {TEMPLES.map(temple => (
              <option
                key={temple.id}
                value={temple.id}
              >
                {temple.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-[#FFD700] block mb-1">
            Start Date *
          </label>

          <input
            type="date"
            value={eventForm.startDate}
            onChange={e =>
              setEventForm(prev => ({
                ...prev,
                startDate: e.target.value
              }))
            }
            className="w-full px-3 py-2 rounded-xl bg-[#141923] border border-[#D4AF37]/50 text-white text-xs font-mono"
            required
          />
        </div>

        <div>
          <label className="text-xs font-bold text-[#FFD700] block mb-1">
            End Date *
          </label>

          <input
            type="date"
            value={eventForm.endDate}
            onChange={e =>
              setEventForm(prev => ({
                ...prev,
                endDate: e.target.value
              }))
            }
            className="w-full px-3 py-2 rounded-xl bg-[#141923] border border-[#D4AF37]/50 text-white text-xs font-mono"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold text-[#FFD700] block mb-1">
            Category
          </label>

          <input
            type="text"
            value={eventForm.category}
            onChange={e =>
              setEventForm(prev => ({
                ...prev,
                category: e.target.value
              }))
            }
            className="w-full px-3 py-2 rounded-xl bg-[#141923] border border-[#D4AF37]/50 text-white text-xs"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-[#FFD700] block mb-1">
            Vahanam
          </label>

          <input
            type="text"
            value={eventForm.vahanam}
            onChange={e =>
              setEventForm(prev => ({
                ...prev,
                vahanam: e.target.value
              }))
            }
            className="w-full px-3 py-2 rounded-xl bg-[#141923] border border-[#D4AF37]/50 text-white text-xs"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-[#FFD700] block mb-1">
          Description
        </label>

        <textarea
          rows={3}
          value={eventForm.description}
          onChange={e =>
            setEventForm(prev => ({
              ...prev,
              description: e.target.value
            }))
          }
          className="w-full px-3 py-2 rounded-xl bg-[#141923] border border-[#D4AF37]/50 text-white text-xs"
        />
      </div>

      <div>
        <label className="text-xs font-bold text-[#FFD700] block mb-1">
          Description (Telugu)
        </label>

        <textarea
          rows={3}
          value={eventForm.descriptionTe}
          onChange={e =>
            setEventForm(prev => ({
              ...prev,
              descriptionTe: e.target.value
            }))
          }
          className="w-full px-3 py-2 rounded-xl bg-[#141923] border border-[#D4AF37]/50 text-white text-xs"
        />
      </div>

      {/* EVENT PHOTOS */}
      <div className="space-y-3 p-3.5 rounded-xl bg-[#141923] border border-[#D4AF37]/40">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#FFD700]">
            <Image className="w-4 h-4 text-[#FF5722]" />

            <span>
              Event Photos & Captions (
              {eventForm.images.length}
              )
            </span>
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

        {eventForm.images.map(
          (imgObj, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-lg bg-[#0B0E14] border border-white/10 space-y-2 relative group"
            >
              <div className="flex items-center justify-between text-[11px] font-bold text-white/80">
                <span>
                  Photo #{idx + 1}{' '}
                  {idx === 0
                    ? '(Main Cover Photo)'
                    : ''}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    handleRemoveImageField(idx)
                  }
                  className="text-red-400 hover:text-red-300 p-1 flex items-center gap-1 bg-red-950/60 border border-red-500/40 px-2 py-0.5 rounded"
                  title="Remove / delete photo"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-[10px]">
                    Remove Photo
                  </span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[10px] font-bold text-[#FFD700]">
                      Image URL *
                    </label>

                    <label className="cursor-pointer text-[10px] font-extrabold text-[#FFD700] hover:text-white bg-[#FF5722]/30 hover:bg-[#FF5722]/60 border border-[#FF5722]/60 px-2 py-0.5 rounded flex items-center gap-1 transition-colors shadow">
                      <Upload className="w-3 h-3 text-[#FFD700]" />

                      <span>
                        📁 Upload from PC
                      </span>

                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async e => {
                          const file =
                            e.target.files?.[0];

                          if (!file) {
                            return;
                          }

                          try {
                            const eventFolder =
                              targetEvent?.id ||
                              eventForm.title ||
                              'event';

                            const storageRes =
                              await uploadFileToSupabaseStorage(
                                file,
                                eventFolder
                              );

                            if (
                              storageRes.success &&
                              storageRes.publicUrl
                            ) {
                              handleImageFieldChange(
                                idx,
                                'url',
                                storageRes.publicUrl
                              );
                            } else {
                              console.warn(
                                'Supabase storage upload failed:',
                                storageRes.message
                              );

                              const compressedDataUrl =
                                await compressImageFile(
                                  file
                                );

                              handleImageFieldChange(
                                idx,
                                'url',
                                compressedDataUrl
                              );

                              alert(
                                `⚠️ Could not upload directly to Supabase Storage (${storageRes.message || 'Check Admin -> Cloud Sync credentials & Storage RLS policies'}). Image saved to browser cache.`
                              );
                            }
                          } catch (err) {
                            console.error(
                              err
                            );

                            const compressedDataUrl =
                              await compressImageFile(
                                file
                              );

                            handleImageFieldChange(
                              idx,
                              'url',
                              compressedDataUrl
                            );
                          }

                          e.target.value = '';
                        }}
                      />
                    </label>
                  </div>

                  <input
                    type="text"
                    value={imgObj.url}
                    onChange={e =>
                      handleImageFieldChange(
                        idx,
                        'url',
                        e.target.value
                      )
                    }
                    onBlur={e =>
                      handleImageFieldChange(
                        idx,
                        'url',
                        normalizeImageUrl(
                          e.target.value
                        )
                      )
                    }
                    placeholder="https://... or click Upload from PC"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#141923] border border-[#D4AF37]/40 text-white text-xs font-mono"
                  />

                  <span className="text-[9px] text-[#94A3B8] block mt-0.5">
                    💡 Tip: Click "📁 Upload from PC" to select a photo from your computer, or paste a URL!
                  </span>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#FFD700] block mb-0.5">
                    Caption / Title
                  </label>

                  <input
                    type="text"
                    value={imgObj.caption}
                    onChange={e =>
                      handleImageFieldChange(
                        idx,
                        'caption',
                        e.target.value
                      )
                    }
                    placeholder="e.g. Malayappa swami Chinna Sesha Vahanam"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#141923] border border-[#D4AF37]/40 text-white text-xs"
                  />
                </div>
              </div>

              {imgObj.url && (
                <div className="h-20 w-full rounded-xl overflow-hidden border border-[#D4AF37]/40 mt-1 bg-[#141923] relative">
                  <img
                    src={normalizeImageUrl(
                      imgObj.url
                    )}
                    alt="Photo Preview"
                    className="w-full h-full object-cover"
                    onError={e => {
                      e.currentTarget.parentElement.innerHTML =
                        '<div class="p-2 text-[10px] text-amber-400 font-mono text-center">⚠️ Invalid image URL. Ensure URL points directly to an image (.jpg, .png, .webp).</div>';
                    }}
                  />

                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 rounded text-[9px] text-[#FFD700] font-bold border border-[#FFD700]/30">
                    Live Preview
                  </span>
                </div>
              )}
            </div>
          )
        )}
      </div>

      <div className="flex justify-between items-center gap-2 pt-2">
        <div>
          {targetEvent && (
            <button
              type="button"
              onClick={async () => {
                const confirmed =
                  window.confirm(
                    lang === 'en'
                      ? `Are you sure you want to permanently delete "${targetEvent.title}"?\n\nThis action cannot be undone.`
                      : `మీరు "${targetEvent.title}" ఉత్సవాన్ని శాశ్వతంగా తొలగించాలనుకుంటున్నారా?\n\nఈ చర్యను రద్దు చేయలేరు.`
                  );

                if (!confirmed) {
                  return;
                }

                try {
                  await onDeleteEvent(
                    targetEvent.id
                  );

                  onClose();
                } catch (error) {
                  console.error(
                    'Delete event failed:',
                    error
                  );

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
            {targetEvent
              ? 'Save Changes'
              : 'Publish Event Live'}
          </button>
        </div>
      </div>
    </form>
  );
}