/**
 * Cloud Database Sync Utility for Tirumala Utsavam Portal
 * Supports cloud backend configuration (Supabase / REST API) with offline localStorage fallback.
 */
import { CLOUD_CONFIG } from "../config/cloudConfig";
import { STORAGE_KEYS } from "../config/storageKeys";
import { supabase } from "./supabaseClient";

const STORAGE_KEY_CONFIG = STORAGE_KEYS.CLOUD_CONFIG;
const STORAGE_KEY_LAST_SYNC = STORAGE_KEYS.CLOUD_LAST_SYNC;

export function getCloudConfig() {
  return CLOUD_CONFIG;
}

export function saveCloudConfig(config) {
  try {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  } catch (e) {
    console.error('Error saving cloud config:', e);
  }
}

export function getLastSyncTime() {
  try {
    return localStorage.getItem(STORAGE_KEY_LAST_SYNC) || null;
  } catch {
    return null;
  }
}

function updateLastSyncTimestamp() {
  const timestamp = new Date().toISOString();
  try {
    localStorage.setItem(STORAGE_KEY_LAST_SYNC, timestamp);
  } catch (e) {
    console.error(e);
  }
  return timestamp;
}

/**
 * Sync events array to cloud endpoint (or save locally if offline/no endpoint)
 */

export async function pushEventsToCloud(events) {
  try {
    // Make sure an authenticated Supabase session exists.
    const {
      data: { session },
      error: sessionError
    } = await supabase.auth.getSession();

    if (sessionError) {
      throw sessionError;
    }

    if (!session) {
      throw new Error('Admin authentication session not found. Please log in again.');
    }

    const payload = events.map(e => ({
      id: String(e.id),
      title: e.title,
      title_te: e.titleTe || e.title,
      temple_id: e.templeId,
      start_date: e.startDate,
      end_date: e.endDate,
      category: e.category,
      vahanam: e.vahanam || '',
      description: e.description || '',
      description_te: e.descriptionTe || '',
      image_url: e.imageUrl || '',
      images: e.images || []
    }));

    const { data, error } = await supabase
      .from('events')
      .upsert(payload, {
        onConflict: 'id'
      })
      .select();

    if (error) {
      console.error('Supabase event sync error:', error);
      throw new Error(
        error.message || 'Supabase database write failed.'
      );
    }

    const syncTime = updateLastSyncTimestamp();

    return {
      success: true,
      isError: false,
      message: `✅ ${data?.length || payload.length} Events Synchronized to Supabase Cloud Successfully!`,
      timestamp: syncTime
    };

  } catch (err) {
    console.warn('Cloud sync error:', err);

    const syncTime = updateLastSyncTimestamp();

    return {
      success: false,
      isError: true,
      message: `❌ Sync Failed: ${err.message || 'Database write error'}`,
      timestamp: syncTime
    };
  }
}


/**
 * Fetch remote events from cloud endpoint
 */
export async function pullEventsFromCloud() {
  const config = getCloudConfig();
 
if (
  !config.endpointUrl ||
  config.endpointUrl.trim() === "" ||
  !config.apiKey ||
  config.apiKey.trim() === ""
) {
  return {
    success: true,
    events: [],
    message: "Cloud Sync not configured.",
  };
}

  try {
    let targetUrl = config.endpointUrl.replace(/\/$/, '');
    if (targetUrl.includes('.supabase.co') && !targetUrl.includes('/rest/v1')) {
      targetUrl = `${targetUrl}/rest/v1/events`;
    } else if (!targetUrl.endsWith('/events')) {
      targetUrl = `${targetUrl}/events`;
    }

    if (config.apiKey && !targetUrl.includes('apikey=')) {
      const sep = targetUrl.includes('?') ? '&' : '?';
      targetUrl = `${targetUrl}${sep}apikey=${encodeURIComponent(config.apiKey.trim())}`;
    }

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'apikey': config.apiKey || '',
        'Authorization': config.apiKey ? `Bearer ${config.apiKey}` : ''
      }
    });

    if (!response.ok) {
      throw new Error(`Cloud fetch error: ${response.status}`);
    }

    const data = await response.json();
    const rawEvents = data.events || data;
    const events = Array.isArray(rawEvents) ? rawEvents.map(e => ({
      id: e.id,
      title: e.title,
      titleTe: e.title_te || e.titleTe || e.title,
      templeId: e.temple_id || e.templeId,
      startDate: e.start_date || e.startDate,
      endDate: e.end_date || e.endDate,
      category: e.category,
      vahanam: e.vahanam || '',
      description: e.description || '',
      descriptionTe: e.description_te || e.descriptionTe || '',
      imageUrl: e.image_url || e.imageUrl || '',
      images: e.images || (e.image_url ? [{ url: e.image_url, caption: e.title }] : [])
    })) : [];

    const syncTime = updateLastSyncTimestamp();
    return { success: true, events, timestamp: syncTime };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

/**
 * Upload binary file directly to Supabase Storage bucket ('event-photos')
 * Supports Option 1 subfolder structure: event-photos/<folderOrId>/<filename>
 */
export async function uploadFileToSupabaseStorage(file, folderOrId = '') {
  try {
    const {
      data: { session },
      error: sessionError
    } = await supabase.auth.getSession();

    if (sessionError) {
      throw sessionError;
    }

    if (!session) {
      return {
        success: false,
        message: 'Admin authentication session not found. Please log in again.'
      };
    }

    const ext =
      (file.name || 'image.jpg').split('.').pop() || 'jpg';

    const filename =
      `utsavam_${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 8)}.${ext}`;

    const cleanFolder = folderOrId
      ? String(folderOrId)
          .trim()
          .replace(/[^a-zA-Z0-9_-]/g, '_')
      : '';

    const objectPath = cleanFolder
      ? `${cleanFolder}/${filename}`
      : filename;

    const { error } = await supabase.storage
      .from('event-photos')
      .upload(objectPath, file, {
        contentType: file.type || 'image/jpeg',
        upsert: true
      });

    if (error) {
      console.error('Supabase Storage upload error:', error);

      return {
        success: false,
        message: error.message || 'Storage upload failed.'
      };
    }

    const { data: publicUrlData } = supabase.storage
      .from('event-photos')
      .getPublicUrl(objectPath);

    return {
      success: true,
      publicUrl: publicUrlData.publicUrl,
      path: objectPath,
      message: 'Image uploaded successfully to Supabase Storage.'
    };

  } catch (err) {
    console.error('Storage upload error:', err);

    return {
      success: false,
      message: err.message || 'Storage upload failed.'
    };
  }
}

export async function deleteEventFromCloud(eventId) {
  try {
    const {
      data: { session },
      error: sessionError
    } = await supabase.auth.getSession();

    if (sessionError) {
      throw sessionError;
    }

    if (!session) {
      return {
        success: false,
        message: 'Admin authentication session not found. Please log in again.'
      };
    }

    // 1. Get the event first so we know which Storage files belong to it.
    const { data: event, error: fetchError } = await supabase
      .from('events')
      .select('id, images, image_url')
      .eq('id', String(eventId))
      .maybeSingle();

    if (fetchError) {
      console.error('Supabase event lookup error:', fetchError);

      return {
        success: false,
        message: fetchError.message || 'Could not find event before deletion.'
      };
    }

    // 2. Collect Storage paths from the event.
    const storagePaths = [];

    if (event?.images && Array.isArray(event.images)) {
      event.images.forEach((img) => {
        const url = typeof img === 'string' ? img : img?.url;

        if (!url) return;

        const marker = '/storage/v1/object/public/event-photos/';

        if (url.includes(marker)) {
          const path = decodeURIComponent(
            url.split(marker)[1].split('?')[0]
          );

          if (path) {
            storagePaths.push(path);
          }
        }
      });
    }

    // Also handle the older single-image field.
    if (event?.image_url) {
      const marker = '/storage/v1/object/public/event-photos/';

      if (event.image_url.includes(marker)) {
        const path = decodeURIComponent(
          event.image_url.split(marker)[1].split('?')[0]
        );

        if (path) {
          storagePaths.push(path);
        }
      }
    }

    // Remove duplicate paths.
    const uniqueStoragePaths = [...new Set(storagePaths)];

    // 3. Delete the Storage files first.
    if (uniqueStoragePaths.length > 0) {
      const { error: storageError } = await supabase.storage
        .from('event-photos')
        .remove(uniqueStoragePaths);

      if (storageError) {
        console.error(
          'Supabase Storage delete error:',
          storageError
        );

        return {
          success: false,
          message:
            storageError.message ||
            'Event found, but associated photos could not be deleted.'
        };
      }
    }

    // 4. Delete the event database row.
    const { error: deleteError } = await supabase
      .from('events')
      .delete()
      .eq('id', String(eventId));

    if (deleteError) {
      console.error(
        'Supabase event delete error:',
        deleteError
      );

      return {
        success: false,
        message: deleteError.message || 'Supabase delete failed.'
      };
    }

    return {
      success: true,
      message:
        `Event ${eventId} and ${uniqueStoragePaths.length} associated photo(s) ` +
        'deleted successfully from Supabase.'
    };

  } catch (err) {
    console.error('Cloud delete error:', err);

    return {
      success: false,
      message: err.message || 'Cloud delete failed.'
    };
  }
}