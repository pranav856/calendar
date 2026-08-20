import { getCloudConfig } from "./cloudSync";
import { supabase } from "./supabaseClient";

export async function pullGlossaryFromCloud() {
  const config = getCloudConfig();

  if (!config.endpointUrl || !config.apiKey) {
    return {
      success: false,
      message: "Cloud configuration missing."
    };
  }

  try {
    let url = config.endpointUrl.replace(/\/$/, "");

    if (url.includes(".supabase.co") && !url.includes("/rest/v1")) {
      url += "/rest/v1/glossary";
    } else if (!url.endsWith("/glossary")) {
      url += "/glossary";
    }

    const response = await fetch(url, {
      headers: {
        apikey: config.apiKey,
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Cloud Error ${response.status}`);
    }

 const data = await response.json();

const glossary = data.map(item => ({
  id: item.id,

  // Title
  term: item.title,
  termTe: item.title_te,

  // Short Meaning
  shortDesc: item.meaning,
  shortDescTe: item.meaning_te,

  // Detailed Explanation
  detailedMeaning: item.description,
  detailedMeaningTe: item.description_te,

  category: item.category || "general",

  images: Array.isArray(item.images)
    ? item.images
    : []
}));

return {
  success: true,
  glossary
};
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: err.message
    };
  }
}

export async function saveGlossaryTermToCloud(term) {
  if (!term) {
    return {
      success: false,
      message: "Glossary term is missing."
    };
  }

  try {
    const {
      data: { session },
      error: sessionError
    } = await supabase.auth.getSession();

    if (sessionError) {
      throw sessionError;
    }

    if (!session) {
      throw new Error(
        "Admin authentication session not found. Please log in again."
      );
    }

    const payload = {
      id: term.id,
      title: term.term,
      title_te: term.termTe,
      meaning: term.shortDesc,
      meaning_te: term.shortDescTe,
      description: term.detailedMeaning,
      description_te: term.detailedMeaningTe,
      category: term.category || "general",
      images: Array.isArray(term.images)
        ? term.images
        : []
    };

    const { data, error } = await supabase
      .from("glossary")
      .upsert(payload, {
        onConflict: "id"
      })
      .select();

    if (error) {
      console.error("Supabase glossary sync error:", error);
      throw new Error(
        error.message || "Supabase glossary write failed."
      );
    }

    return {
      success: true,
      data
    };

  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: err.message
    };
  }
}

export async function deleteGlossaryTermFromCloud(termId) {
  if (!termId) {
    return {
      success: false,
      message: "Glossary term ID is missing."
    };
  }

  try {
    const {
      data: { session },
      error: sessionError
    } = await supabase.auth.getSession();

    if (sessionError) {
      throw sessionError;
    }

    if (!session) {
      throw new Error(
        "Admin authentication session not found. Please log in again."
      );
    }

    const { error } = await supabase
      .from("glossary")
      .delete()
      .eq("id", termId);

    if (error) {
      console.error("Supabase glossary delete error:", error);
      throw new Error(
        error.message || "Supabase glossary delete failed."
      );
    }

    return {
      success: true
    };

  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: err.message
    };
  }
}