import { getCloudConfig } from "./cloudSync";

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
  const config = getCloudConfig();

  if (
    !config.endpointUrl ||
    !config.apiKey ||
    !term
  ) {
    return {
      success: false,
      message: "Cloud configuration missing."
    };
  }

  try {
    let url = config.endpointUrl.replace(/\/$/, "");

    if (
      url.includes(".supabase.co") &&
      !url.includes("/rest/v1")
    ) {
      url += "/rest/v1/glossary";
    } else if (!url.endsWith("/glossary")) {
      url += "/glossary";
    }

    const payload = {
      id: term.id,
      title: term.term,
      title_te: term.termTe,
      meaning: term.shortDesc,
      meaning_te: term.shortDescTe,
      description: term.detailedMeaning,
      description_te: term.detailedMeaningTe,
      category: term.category,
      images: term.images || []
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        apikey: config.apiKey,
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates"
      },
      body: JSON.stringify(payload)
    });

   if (!response.ok) {
  let err;

  try {
    err = await response.json();
  } catch {
    err = await response.text();
  }

  console.log("Supabase Error:", err);

  throw new Error(`Cloud Error ${response.status}`);
}

    return { success: true };

  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: err.message
    };
  }
}

export async function deleteGlossaryTermFromCloud(termId) {

}