import { useMemo } from 'react';
import { UTSAVA_GLOSSARY_TERMS } from '../data/utsavaGlossary';
import { BookOpen, ExternalLink } from 'lucide-react';

export default function EventGlossaryMatches({
  event,
  lang,
  onClose,
  onNavigateToGlossary
}) {
  const matchingGlossaryTerms = useMemo(() => {
    if (!event) return [];

    const fullText = `
      ${event.title || ''}
      ${event.titleTe || ''}
      ${event.description || ''}
      ${event.descriptionTe || ''}
      ${event.vahanam || ''}
    `.toLowerCase();

    if (!Array.isArray(UTSAVA_GLOSSARY_TERMS)) return [];

    const matched = UTSAVA_GLOSSARY_TERMS.filter(gTerm => {
      if (!gTerm) return false;

      const matchTermEn = (gTerm.term || '').toLowerCase();
      const matchTermTe = (gTerm.termTe || '').toLowerCase();

      const matchesKeyword =
        Array.isArray(gTerm.relatedEventKeywords) &&
        gTerm.relatedEventKeywords.some(
          kw =>
            kw &&
            fullText.includes(String(kw).toLowerCase())
        );

      return (
        (matchTermEn && fullText.includes(matchTermEn)) ||
        (matchTermTe && fullText.includes(matchTermTe)) ||
        matchesKeyword
      );
    });

    return matched.sort((a, b) => {
      const nameA = (lang === 'en' ? a.term : a.termTe) || '';
      const nameB = (lang === 'en' ? b.term : b.termTe) || '';

      return nameA.localeCompare(
        nameB,
        lang === 'te' ? 'te' : 'en'
      );
    });
  }, [event, lang]);

  if (matchingGlossaryTerms.length === 0) {
    return null;
  }

  return (
    <div className="p-4 rounded-xl bg-gradient-to-r from-[#141923] to-[#1A1500] border border-[#FFD700]/40 space-y-2.5">
      <div className="flex items-center justify-between gap-2 text-xs font-extrabold text-[#FFD700] uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#FFD700]" />

          <span>
            {lang === 'en'
              ? 'Utsavam Terms & Meanings'
              : 'ఈ ఉత్సవంలో కనిపించే పవిత్ర పదాలు'}
          </span>
        </div>

        <span className="text-[10px] text-[#94A3B8] font-normal lowercase">
          (click term to read full glossary)
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {matchingGlossaryTerms.map(term => (
          <button
            key={term.id}
            onClick={() => {
              onClose();

              if (onNavigateToGlossary) {
                onNavigateToGlossary(term.id);
              }
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-black/80 hover:bg-[#FFD700] text-[#FFD700] hover:text-black border border-[#D4AF37]/50 transition-all flex items-center gap-1.5 shadow-sm group/badge"
            title={`Click to read complete glossary entry for ${term.term}`}
          >
            <span>
              📖 {lang === 'en' ? term.term : term.termTe}
            </span>

            <ExternalLink className="w-3 h-3 group-hover/badge:scale-110" />
          </button>
        ))}
      </div>
    </div>
  );
}