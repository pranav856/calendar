import React, { useState, useMemo, useEffect, useRef } from 'react';
import { GLOSSARY_CATEGORIES, UTSAVA_GLOSSARY_TERMS } from '../data/utsavaGlossary';
import { Search, BookOpen, Sparkles, HelpCircle, Info, ChevronDown, ChevronUp, Image as ImageIcon, X, ChevronLeft, ChevronRight, Edit3 } from 'lucide-react';

export default function UtsavamGlossary({ 
  lang = 'en', 
  targetTermId, 
  customGlossaryEdits = {}, 
  isAdminLoggedIn,
  onOpenAdminEditTerm
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedTermId, setExpandedTermId] = useState(null);
  
  // Gallery Lightbox Modal State
  const [activeGalleryTerm, setActiveGalleryTerm] = useState(null);
  const [galleryImgIndex, setGalleryImgIndex] = useState(0);

  const termRefs = useRef({});

  // Helper function to parse images into standard objects
  const parseImagesList = (rawImgs) => {
    if (!Array.isArray(rawImgs)) return [];
    return rawImgs.map(img => {
      if (!img) return null;
      if (typeof img === 'string' && img.trim() !== '') {
        return { url: img.trim(), caption: '' };
      }
      if (typeof img === 'object' && img.url && typeof img.url === 'string' && img.url.trim() !== '') {
        return { url: img.url.trim(), caption: img.caption || '' };
      }
      return null;
    }).filter(Boolean);
  };

  // Merge default terms with Admin custom edits
  const allTermsList = useMemo(() => {
    if (!Array.isArray(UTSAVA_GLOSSARY_TERMS)) return [];
    const safeEdits = (customGlossaryEdits && typeof customGlossaryEdits === 'object') ? customGlossaryEdits : {};
    
    return UTSAVA_GLOSSARY_TERMS.map(defaultTerm => {
      if (!defaultTerm) return null;
      const customEdit = safeEdits[defaultTerm.id];
      if (customEdit) {
        const customParsed = parseImagesList(customEdit.images);
        const defaultParsed = parseImagesList(defaultTerm.images);
        return {
          ...defaultTerm,
          term: customEdit.term || defaultTerm.term || '',
          termTe: customEdit.termTe || defaultTerm.termTe || '',
          shortDesc: customEdit.shortDesc || defaultTerm.shortDesc || '',
          shortDescTe: customEdit.shortDescTe || defaultTerm.shortDescTe || '',
          detailedMeaning: customEdit.detailedMeaning || defaultTerm.detailedMeaning || '',
          detailedMeaningTe: customEdit.detailedMeaningTe || defaultTerm.detailedMeaningTe || '',
          images: customParsed.length > 0 ? customParsed : defaultParsed
        };
      }
      return {
        ...defaultTerm,
        images: parseImagesList(defaultTerm.images)
      };
    }).filter(Boolean);
  }, [customGlossaryEdits]);

  // Featured Word of the Day
  const featuredTerm = useMemo(() => {
    return allTermsList.find(t => t.id === 'brahmotsavam-origin') || allTermsList[0];
  }, [allTermsList]);

  // Filtered & Strictly Sorted Terms (Ascending Order A-Z / అ-ఱ)
  const filteredTerms = useMemo(() => {
    const list = allTermsList.filter(item => {
      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchTerm.trim().toLowerCase();
      if (!q) return matchesCat;

      const termEn = (item.term || '').toLowerCase();
      const termTe = (item.termTe || '').toLowerCase();
      const descEn = (item.shortDesc || '').toLowerCase();
      const descTe = (item.shortDescTe || '').toLowerCase();
      const detailEn = (item.detailedMeaning || '').toLowerCase();
      const detailTe = (item.detailedMeaningTe || '').toLowerCase();

      const matchesSearch =
        termEn.includes(q) ||
        termTe.includes(q) ||
        descEn.includes(q) ||
        descTe.includes(q) ||
        detailEn.includes(q) ||
        detailTe.includes(q);

      return matchesCat && matchesSearch;
    });

    // Sort in ascending order based on active language
    return list.sort((a, b) => {
      const nameA = lang === 'en' ? a.term : a.termTe;
      const nameB = lang === 'en' ? b.term : b.termTe;
      return nameA.localeCompare(nameB, lang === 'te' ? 'te' : 'en');
    });
  }, [allTermsList, searchTerm, selectedCategory, lang]);

  // Auto-scroll to target term if redirected from Calendar Event card
  useEffect(() => {
    if (targetTermId) {
      setExpandedTermId(targetTermId);
      setTimeout(() => {
        const el = termRefs.current[targetTermId];
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    }
  }, [targetTermId]);

  const toggleExpand = (id) => {
    setExpandedTermId(prev => prev === id ? null : id);
  };

  const handleScrollToFeatured = (termId) => {
    setExpandedTermId(termId);
    setTimeout(() => {
      const el = termRefs.current[termId];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      
      {/* HEADER HERO BANNER (Top source banner removed as requested) */}
      <div className="dark-hero-card p-6 sm:p-8 rounded-3xl border-2 border-[#D4AF37]/50 bg-gradient-to-r from-[#141923] via-[#0B0E14] to-[#1F1707] text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700]/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/40 text-[#FFD700] text-xs font-bold uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Utsava Shabda Kosh' : 'ఉత్సవ శబ్ద కోశం'}</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold gold-gradient-text leading-tight">
            {lang === 'en' ? 'Festival & Utsavam Glossary' : 'ఉత్సవాలు, వాహనాలు & భక్తుల దివ్య నిఘంటువు'}
          </h2>

          <p className="text-xs sm:text-base text-slate-300 dark:text-[#94A3B8] leading-relaxed">
            {lang === 'en'
              ? 'Explore Vedic origins, Puranic history, Alwar pasurams, royal traditions, and sacred meanings of terms, rituals, Vahanas, Naivedyams, and Great Devotees associated with Tirumala Utsavams.'
              : 'తిరుమల శ్రీవారి బ్రహ్మోత్సవాలు, దివ్య వాహనాలు, పంచబేరాలు, నైవేద్యాలు మరియు మహనీయ భక్తుల వెనుకున్న పవిత్రమైన అంతరార్థాలు, పురాణ ప్రాశస్త్యాలను ఇక్కడ వివరంగా తెలుసుకోండి.'}
          </p>

          {/* SEARCH BAR */}
          <div className="pt-2 relative">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 absolute left-4 text-[#FFD700]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  lang === 'en'
                    ? 'Search (e.g. Brahmotsavam, Garuda, Ramanuja, Ankurarpanam, Naivedyam)...'
                    : 'శోధించండి (ఉదా: బ్రహ్మోత్సవం, గరుడ, రామానుజ, అంకురార్పణ, నైవేద్యం)...'
                }
                className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-[#0B0E14]/90 border-2 border-[#D4AF37]/50 text-white placeholder-[#94A3B8] focus:border-[#FFD700] focus:outline-none text-sm sm:text-base shadow-inner transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 text-xs bg-[#141923] hover:bg-black/50 text-[#94A3B8] hover:text-white px-2 py-1 rounded-full border border-[#D4AF37]/30"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED WORD OF THE DAY (Now fully Clickable with Gold Glow Hover & High Contrast) */}
      {!searchTerm && selectedCategory === 'all' && featuredTerm && (
        <div 
          onClick={() => handleScrollToFeatured(featuredTerm.id)}
          className="dark-hero-card glossary-card-hover p-5 sm:p-6 rounded-2xl border-2 border-[#FFD700]/70 bg-gradient-to-r from-[#1A1500] via-[#141923] to-[#0B0E14] relative shadow-xl cursor-pointer group"
          title="Click to view full detailed meaning"
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FFD700] animate-spin" />
              <span className="text-xs font-extrabold text-[#FFD700] uppercase tracking-wider">
                {lang === 'en' ? 'Featured Utsavam Term' : 'ముఖ్యమైన దివ్య పదం'}
              </span>
            </div>

            <span className="text-xs font-extrabold text-[#FFD700] group-hover:underline flex items-center gap-1">
              <span>{lang === 'en' ? 'Read Full History ➔' : 'పూర్తి సమాచారం ➔'}</span>
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-[#FFD700] transition-colors">
                {lang === 'en' ? featuredTerm.term : featuredTerm.termTe}
              </h3>
              <span className="text-sm font-semibold text-[#FFD700] font-sans">
                ({featuredTerm.termTe})
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 dark:text-slate-200 leading-relaxed font-medium">
              {lang === 'en' ? featuredTerm.shortDesc : featuredTerm.shortDescTe}
            </p>

            <div className="pt-2 flex items-center gap-2 text-[11px] font-bold text-[#FFD700]/90">
              <span>📜 {lang === 'en' ? 'Source: TTD Sapthagiri Magazine (Sept 2020)' : 'ఆధారం: టిటిడి సప్తగిరి పత్రిక (సెప్టెంబరు 2020)'}</span>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY FILTER CHIPS */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {GLOSSARY_CATEGORIES.map(cat => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 shrink-0 transition-all shadow-md ${
                isActive
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black border border-[#FFD700] ring-2 ring-[#FFD700]/40'
                  : 'bg-[#141923] text-[#94A3B8] hover:text-[#FFD700] border border-[#D4AF37]/30 hover:border-[#D4AF37]/60'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{lang === 'en' ? cat.labelEn : cat.labelTe}</span>
            </button>
          );
        })}
      </div>

      {/* RESULTS COUNT SUMMARY & SORTING INDICATOR */}
      <div className="flex items-center justify-between text-xs text-slate-700 dark:text-[#94A3B8] px-1 font-mono font-bold">
        <span>
          {lang === 'en'
            ? `Showing ${filteredTerms.length} terms (Ascending Order A-Z)`
            : `మొత్తం ${filteredTerms.length} పదాలు కనిపించాయి (అకారాది క్రమం అ-ఱ)`}
        </span>
        {searchTerm && (
          <span className="text-[#FFD700] italic">
            {lang === 'en' ? `Filtered by "${searchTerm}"` : `"${searchTerm}" శోధన ఫలితాలు`}
          </span>
        )}
      </div>

      {/* TERMS GRID LIST (SORTED ASCENDING + GOLD HOVER GLOW + HIGH CONTRAST) */}
      {filteredTerms.length === 0 ? (
        <div className="glass-card p-10 text-center rounded-3xl border border-[#D4AF37]/30 space-y-3">
          <HelpCircle className="w-12 h-12 text-[#FFD700] mx-auto opacity-60 animate-bounce" />
          <h4 className="font-serif text-lg font-bold text-white">
            {lang === 'en' ? 'No terms found' : 'ఏ పదాలు కనిపించలేదు'}
          </h4>
          <p className="text-xs text-[#94A3B8] max-w-sm mx-auto">
            {lang === 'en'
              ? 'Try searching with a different keyword like "Brahmotsavam", "Garuda", "Ramanuja", or "Ankurarpanam".'
              : 'దయచేసి "బ్రహ్మోత్సవం", "గరుడ", "రామానుజ", లేదా "అంకురార్పణ" వంటి పదాలతో మళ్లీ ప్రయత్నించండి.'}
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 rounded-xl bg-[#141923] border border-[#D4AF37]/50 text-[#FFD700] text-xs font-bold hover:bg-[#D4AF37]/20 transition-all"
          >
            {lang === 'en' ? 'Reset Search' : 'శోధనను రీసెట్ చేయండి'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTerms.map((item) => {
            const isExpanded = expandedTermId === item.id;
            const hasAdminImages = Array.isArray(item.images) && item.images.length > 0;

            return (
              <div
                key={item.id}
                ref={el => termRefs.current[item.id] = el}
                onClick={() => toggleExpand(item.id)}
                className={`glass-card glossary-card-hover glossary-term-card rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                  isExpanded
                    ? 'border-[#FFD700] dark:border-[#FFD700] bg-white dark:bg-[#141923]/95 shadow-2xl ring-2 ring-amber-500/30 dark:ring-[#FFD700]/50'
                    : 'border-amber-600/30 dark:border-[#D4AF37]/40 bg-white dark:bg-[#0B0E14]/90 shadow-md'
                }`}
              >
                <div className="space-y-3">
                  
                  {/* Top Bar: Title & Category & Admin Edit Button */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-[#FFD700] transition-colors tracking-wide">
                          {lang === 'en' ? item.term : item.termTe}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-amber-700 dark:text-[#FFD700] font-sans font-semibold">
                          {item.termTe}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0" onClick={e => e.stopPropagation()}>
                      {isAdminLoggedIn && onOpenAdminEditTerm && (
                        <button
                          onClick={() => onOpenAdminEditTerm(item)}
                          className="px-2 py-1 rounded bg-[#FF5722]/20 hover:bg-[#FF5722]/40 border border-[#FF5722]/50 text-[#FF5722] text-[10px] font-extrabold flex items-center gap-1 transition-all"
                          title="Edit term text & add custom images"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                      )}

                      <span className="text-[10px] px-2 py-1 rounded-lg bg-amber-500/10 dark:bg-[#D4AF37]/20 border border-amber-600/30 dark:border-[#D4AF37]/40 text-amber-800 dark:text-[#FFD700] font-extrabold uppercase">
                        {item.category.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Short Description (High Contrast text for Light/Dark mode) */}
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                    {lang === 'en' ? item.shortDesc : item.shortDescTe}
                  </p>

                  {/* ADMIN CUSTOM IMAGE GALLERY (Displayed ONLY if Admin added images) */}
                  {hasAdminImages && (
                    <div className="pt-2" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                        {item.images.map((img, imgIdx) => (
                          <div
                            key={imgIdx}
                            onClick={() => {
                              setActiveGalleryTerm(item);
                              setGalleryImgIndex(imgIdx);
                            }}
                            className="relative h-20 w-28 rounded-xl overflow-hidden border border-[#D4AF37]/50 cursor-pointer group/img shrink-0"
                            title={img.caption || item.term}
                          >
                            <img
                              src={img.url}
                              alt={img.caption || item.term}
                              className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/30 group-hover/img:bg-transparent transition-colors"></div>
                            {img.caption && (
                              <div className="absolute bottom-0 inset-x-0 bg-black/80 px-1 py-0.5 text-[9px] text-[#FFD700] truncate text-center">
                                {img.caption}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Detailed Meaning (Expandable Multi-Paragraph) */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-amber-600/20 dark:border-[#D4AF37]/30 space-y-3 animate-fade-in">
                      <div className="space-y-1">
                        <span className="text-[11px] font-extrabold text-amber-800 dark:text-[#FFD700] uppercase tracking-wider flex items-center gap-1">
                          <Info className="w-3.5 h-3.5" />
                          {lang === 'en' ? 'Detailed History & Meaning' : 'వివరమైన నేపథ్యం & పురాణ అంతరార్థం'}
                        </span>
                        <div className="detailed-meaning-box text-xs sm:text-sm text-slate-800 dark:text-slate-100 leading-relaxed bg-amber-50/80 dark:bg-[#141923] p-3.5 rounded-xl border border-amber-600/30 dark:border-[#D4AF37]/30 whitespace-pre-line space-y-2 font-medium">
                          {lang === 'en' ? item.detailedMeaning : item.detailedMeaningTe}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Individual Term Source Attribution */}
                  <div className="pt-2 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-[11px] font-semibold text-amber-800 dark:text-[#FFD700]">
                    <span className="flex items-center gap-1">
                      📜 {lang === 'en' ? 'Source: TTD Sapthagiri Magazine (Sept 2020)' : 'ఆధారం: టిటిడి సప్తగిరి పత్రిక (సెప్టెంబరు 2020)'}
                    </span>
                    <button className="text-amber-700 dark:text-[#FFD700] group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold">
                      <span>{isExpanded ? (lang === 'en' ? 'Less ▲' : 'తక్కువ ▲') : (lang === 'en' ? 'Read More ▼' : 'మరిన్ని వివరాలు ▼')}</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ADMIN IMAGE GALLERY LIGHTBOX MODAL */}
      {activeGalleryTerm && Array.isArray(activeGalleryTerm.images) && activeGalleryTerm.images.length > 0 && (
        <div 
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6"
          onClick={() => setActiveGalleryTerm(null)}
        >
          <div className="flex items-center justify-between z-10" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-[#FFD700] text-sm sm:text-base">
                📷 {lang === 'en' ? activeGalleryTerm.term : activeGalleryTerm.termTe} — Gallery
              </span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-xs font-mono font-bold text-[#94A3B8]">
                {galleryImgIndex + 1} / {activeGalleryTerm.images.length}
              </span>
            </div>

            <button
              onClick={() => setActiveGalleryTerm(null)}
              className="px-3 py-1.5 rounded-full bg-red-600 text-white font-extrabold text-xs"
            >
              Close ✕
            </button>
          </div>

          <div 
            className="relative flex-grow flex items-center justify-center my-4 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <img 
              src={activeGalleryTerm.images[galleryImgIndex].url} 
              alt={activeGalleryTerm.images[galleryImgIndex].caption || activeGalleryTerm.term}
              className="max-h-[80vh] max-w-full object-contain rounded-xl border border-[#D4AF37]/50 shadow-2xl"
            />

            {activeGalleryTerm.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setGalleryImgIndex(prev => prev === 0 ? activeGalleryTerm.images.length - 1 : prev - 1);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/80 text-[#FFD700] hover:bg-black border border-[#D4AF37] flex items-center justify-center shadow-2xl"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setGalleryImgIndex(prev => prev === activeGalleryTerm.images.length - 1 ? 0 : prev + 1);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/80 text-[#FFD700] hover:bg-black border border-[#D4AF37] flex items-center justify-center shadow-2xl"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}
          </div>

          {activeGalleryTerm.images[galleryImgIndex].caption && (
            <div className="text-center z-10 max-w-md mx-auto" onClick={e => e.stopPropagation()}>
              <div className="p-3 rounded-xl bg-black/80 border border-[#D4AF37]/40 text-[#FFD700] font-bold text-xs shadow-xl">
                📷 {activeGalleryTerm.images[galleryImgIndex].caption}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
