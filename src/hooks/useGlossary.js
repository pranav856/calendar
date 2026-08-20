import { useMemo } from "react";
import { UTSAVA_GLOSSARY_TERMS } from "../data/utsavaGlossary";

export default function useGlossary(customGlossaryEdits = {}) {
  return useMemo(() => {
    const edits =
      customGlossaryEdits &&
      typeof customGlossaryEdits === "object"
        ? customGlossaryEdits
        : {};

    // Apply edits to existing glossary terms
    const existingTerms = UTSAVA_GLOSSARY_TERMS.map(term => {
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
          cloud.detailedMeaningTe ?? term.detailedMeaningTe,
        category: cloud.category ?? term.category,
        images:
          Array.isArray(cloud.images)
            ? cloud.images
            : term.images
      };
    });

    // Add custom glossary terms that are not part of the built-in glossary
    const customTerms = Object.values(edits).filter(
      edit =>
        edit &&
        edit.id &&
        !UTSAVA_GLOSSARY_TERMS.some(
          term => term.id === edit.id
        )
    );

    return [...existingTerms, ...customTerms];
  }, [customGlossaryEdits]);
}