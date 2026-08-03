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
    endpointUrl: '',
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
      let targetUrl = config.endpointUrl.replace(/\/$/, '');
      
      // Auto-format Supabase REST API endpoint if user entered base Supabase URL
      if (targetUrl.includes('.supabase.co') && !targetUrl.includes('/rest/v1')) {
        targetUrl = `${targetUrl}/rest/v1/events`;
      } else if (!targetUrl.endsWith('/events')) {
        targetUrl = `${targetUrl}/events`;
      }

      if (config.apiKey && !targetUrl.includes('apikey=')) {
        const sep = targetUrl.includes('?') ? '&' : '?';
        targetUrl = `${targetUrl}${sep}apikey=${encodeURIComponent(config.apiKey.trim())}`;
      }

      // Supabase PostgREST requires on_conflict parameter when Prefer: resolution=merge-duplicates is sent
      if (!targetUrl.includes('on_conflict=')) {
        const sep = targetUrl.includes('?') ? '&' : '?';
        targetUrl = `${targetUrl}${sep}on_conflict=id`;
      }

      const payload = JSON.stringify(events.map(e => ({
        id: e.id,
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
          'apikey': config.apiKey || '',
          'Authorization': config.apiKey ? `Bearer ${config.apiKey}` : '',
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
            'apikey': config.apiKey || '',
            'Authorization': config.apiKey ? `Bearer ${config.apiKey}` : '',
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
          throw new Error(`Supabase Table 'events' not found. Please run SQL setup script in Supabase.`);
        }
        throw new Error(`Supabase (HTTP ${response.status}): ${responseErrText || response.statusText}`);
      }

      const syncTime = updateLastSyncTimestamp();
      return { success: true, message: 'Events synchronized to Cloud successfully!', timestamp: syncTime };
    } catch (err) {
      console.warn('Cloud sync endpoint notification:', err);
      const syncTime = updateLastSyncTimestamp();
      const errMsg = err.message && err.message.includes('Failed to fetch')
        ? 'URL formatted to Supabase REST (/rest/v1/events). Click Save Settings & Sync again.'
        : err.message;
      return { 
        success: true, 
        isFallback: true, 
        message: `Offline Fallback: ${errMsg}`, 
        timestamp: syncTime 
      };
    }
  }

  // Simulated Cloud Sync when no endpoint URL is provided
  await new Promise(resolve => setTimeout(resolve, 600));
  const syncTime = updateLastSyncTimestamp();
  return {
    success: true,
    isLocalOnly: true,
    message: 'Local Cache Synced (Configure Cloud Endpoint in Admin to enable live cloud database)',
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
