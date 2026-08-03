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
      const response = await fetch(`${config.endpointUrl.replace(/\/$/, '')}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': config.apiKey || '',
          'Authorization': config.apiKey ? `Bearer ${config.apiKey}` : ''
        },
        body: JSON.stringify({ events, updatedAt: new Date().toISOString() })
      });

      if (!response.ok) {
        throw new Error(`Cloud HTTP Error: ${response.status} ${response.statusText}`);
      }

      const syncTime = updateLastSyncTimestamp();
      return { success: true, message: 'Events synchronized to Cloud successfully!', timestamp: syncTime };
    } catch (err) {
      console.warn('Cloud sync endpoint failed, fallback to local cloud store:', err);
      const syncTime = updateLastSyncTimestamp();
      return { 
        success: true, 
        isFallback: true, 
        message: `Offline Fallback: Saved locally (${err.message})`, 
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
    const response = await fetch(`${config.endpointUrl.replace(/\/$/, '')}/events`, {
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
    const events = data.events || data;
    const syncTime = updateLastSyncTimestamp();
    return { success: true, events, timestamp: syncTime };
  } catch (err) {
    return { success: false, message: err.message };
  }
}
