import { useMemo } from "react";
import { UTSAVA_GLOSSARY_TERMS } from "../data/utsavaGlossary";

export default function useGlossary(customGlossaryEdits = {}) {
  return useMemo(() => {
    const edits =
      customGlossaryEdits &&
      typeof customGlossaryEdits === "object"
        ? customGlossaryEdits
        : {};

    return UTSAVA_GLOSSARY_TERMS.map(term => {
      const cloud = edits[term.id];

      if (!cloud) return term;

      return {
        ...term,

        term: cloud.term ?? term.term,
        termTe: cloud.termTe ?? term.termTe,

        shortDesc: cloud.shortDesc ?? term.shortDesc,
        shortDescTe: cloud.shortDescTe ?? term.shortDescTe,

        detailedMeaning:
          cloud.detailedMeaning ?? term.detailedMeaning,

        detailedMeaningTe:
          cloud.detailedMeaningTe ??
          term.detailedMeaningTe,

        category:
          cloud.category ?? term.category,

        images:
          Array.isArray(cloud.images)
            ? cloud.images
            : term.images
      };
    });
  }, [customGlossaryEdits]);
}