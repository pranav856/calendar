/**
 * Cloud Database Sync Utility for Tirumala Utsavam Portal
 * Supports cloud backend configuration (Supabase / REST API) with offline localStorage fallback.
 */

const STORAGE_KEY_CONFIG = 'tirumala_cloud_config';
const STORAGE_KEY_LAST_SYNC = 'tirumala_cloud_last_sync';

export function getCloudConfig() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error loading cloud config:', e);
  }
  return {
    endpointUrl: 'https://rjdltvopbejhvbheindb.supabase.co/rest/v1',
    apiKey: '',
    autoSync: true,
    provider: 'supabase_rest' // 'supabase_rest' | 'custom_api'
  };
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
  const config = getCloudConfig();

  // If valid endpoint is specified, send HTTP request
  if (config.endpointUrl && config.endpointUrl.trim() !== '') {
    try {
      let targetUrl = config.endpointUrl.trim().replace(/\/$/, '');
      
      // Auto-format Supabase REST API endpoint if user entered base Supabase URL or rest/v1 URL
      if (targetUrl.includes('.supabase.co')) {
        if (!targetUrl.includes('/rest/v1')) {
          targetUrl = `${targetUrl}/rest/v1/events`;
        } else if (targetUrl.endsWith('/rest/v1')) {
          targetUrl = `${targetUrl}/events`;
        } else if (!targetUrl.endsWith('/events')) {
          targetUrl = `${targetUrl}/events`;
        }
      } else if (!targetUrl.endsWith('/events')) {
        targetUrl = `${targetUrl}/events`;
      }

      const apiKey = (config.apiKey || '').trim();

      if (apiKey && !targetUrl.includes('apikey=')) {
        const sep = targetUrl.includes('?') ? '&' : '?';
        targetUrl = `${targetUrl}${sep}apikey=${encodeURIComponent(apiKey)}`;
      }

      // Supabase PostgREST requires on_conflict parameter when Prefer: resolution=merge-duplicates is sent
      if (!targetUrl.includes('on_conflict=')) {
        const sep = targetUrl.includes('?') ? '&' : '?';
        targetUrl = `${targetUrl}${sep}on_conflict=id`;
      }

      const payload = JSON.stringify(events.map(e => ({
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
      })));

      let response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': apiKey,
          'Authorization': apiKey ? `Bearer ${apiKey}` : '',
          'Prefer': 'resolution=merge-duplicates,return=minimal'
        },
        body: payload
      });

      // Fallback: If merge-duplicates upsert is rejected by schema/RLS, retry with clean POST
      if (!response.ok && (response.status === 400 || response.status === 405)) {
        const cleanUrl = targetUrl.replace(/[\?&]on_conflict=id/, '');
        const retryResp = await fetch(cleanUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': apiKey,
            'Authorization': apiKey ? `Bearer ${apiKey}` : '',
            'Prefer': 'return=minimal'
          },
          body: payload
        });
        if (retryResp.ok) {
          response = retryResp;
        }
      }

      if (!response.ok) {
        let responseErrText = '';
        try {
          const errJson = await response.json();
          responseErrText = errJson.message || errJson.hint || errJson.details || JSON.stringify(errJson);
        } catch {
          responseErrText = await response.text();
        }

        if (response.status === 404) {
          throw new Error(`Supabase Table 'events' not found (HTTP 404). Please run the SQL Setup Script in Supabase!`);
        }
        if (response.status === 401 || response.status === 403) {
          throw new Error(`Supabase Permission Denied (HTTP ${response.status}): ${responseErrText || 'Check API Key & RLS Policies in Supabase'}`);
        }
        throw new Error(`Supabase (HTTP ${response.status}): ${responseErrText || response.statusText}`);
      }

      const syncTime = updateLastSyncTimestamp();
      return { success: true, isError: false, message: '✅ All Events & Photos Synchronized to Supabase Cloud Successfully!', timestamp: syncTime };
    } catch (err) {
      console.warn('Cloud sync error:', err);
      const syncTime = updateLastSyncTimestamp();
      const errMsg = err.message && err.message.includes('Failed to fetch')
        ? 'Network Connection Failed to reach Supabase. Check your Supabase URL & Internet Connection.'
        : err.message;
      return { 
        success: false, 
        isError: true, 
        message: `❌ Sync Failed: ${errMsg}`, 
        timestamp: syncTime 
      };
    }
  }

  // Local Sync message when no endpoint URL is provided
  await new Promise(resolve => setTimeout(resolve, 300));
  const syncTime = updateLastSyncTimestamp();
  return {
    success: true,
    isLocalOnly: true,
    message: 'Local Cache Synced (Enter Supabase Endpoint URL & API Key below to enable Live Cloud Database)',
    timestamp: syncTime
  };
}

/**
 * Fetch remote events from cloud endpoint
 */
export async function pullEventsFromCloud() {
  const config = getCloudConfig();
  if (!config.endpointUrl || config.endpointUrl.trim() === '') {
    return { success: false, message: 'No Cloud Endpoint configured.' };
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
  const config = getCloudConfig();
  if (!config.endpointUrl || !config.apiKey) {
    return { success: false, message: 'Cloud credentials missing in Admin -> Cloud Sync.' };
  }

  try {
    let baseUrl = config.endpointUrl.trim().replace(/\/$/, '');
    if (baseUrl.includes('.supabase.co')) {
      baseUrl = baseUrl.split('.supabase.co')[0] + '.supabase.co';
    }

    const ext = (file.name || 'image.jpg').split('.').pop() || 'jpg';
    const filename = `utsavam_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
    
    // Clean folder / eventId slug if provided
    const cleanFolder = folderOrId ? String(folderOrId).trim().replace(/[^a-zA-Z0-9_-]/g, '_') : '';
    const objectPath = cleanFolder ? `${cleanFolder}/${filename}` : filename;
    const uploadUrl = `${baseUrl}/storage/v1/object/event-photos/${objectPath}`;

    const apiKey = config.apiKey.trim();

    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'apikey': apiKey,
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': file.type || 'image/jpeg',
        'x-upsert': 'true'
      },
      body: file
    });

    if (!response.ok) {
      let errText = '';
      try {
        const errJson = await response.json();
        errText = errJson.message || errJson.error || JSON.stringify(errJson);
      } catch {
        errText = await response.text();
      }
      throw new Error(`Storage error (${response.status}): ${errText}`);
    }

    const publicUrl = `${baseUrl}/storage/v1/object/public/event-photos/${objectPath}`;
    return { success: true, publicUrl, objectPath };
  } catch (err) {
    console.warn('Supabase Storage upload warning:', err);
    return { success: false, message: err.message };
  }
}
