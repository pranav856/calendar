import { STORAGE_KEYS } from "../config/storageKeys";

export function loadStoredEvents() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CUSTOM_EVENTS);

    if (!stored) {
      return null;
    }

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) ? parsed : null;
  } catch (error) {
    console.error("Error loading stored events:", error);
    return null;
  }
}

export function loadDeletedEventIds() {
  try {
    const stored = localStorage.getItem(
      STORAGE_KEYS.DELETED_EVENTS
    );

    return new Set(
      stored ? JSON.parse(stored) : []
    );
  } catch (error) {
    console.error("Error loading deleted IDs:", error);
    return new Set();
  }
}

export function saveDeletedEventIds(ids) {
  try {
    localStorage.setItem(
      STORAGE_KEYS.DELETED_EVENTS,
      JSON.stringify([...ids])
    );
  } catch (error) {
    console.error(error);
  }
}

export function saveStoredEvents(events) {
  try {
    console.log("Saving events:", events.length);

    localStorage.setItem(
      STORAGE_KEYS.CUSTOM_EVENTS,
      JSON.stringify(events)
    );

    console.log(
      "Saved under key:",
      STORAGE_KEYS.CUSTOM_EVENTS,
      localStorage.getItem(STORAGE_KEYS.CUSTOM_EVENTS)
    );
  } catch (error) {
    console.error("Error saving events:", error);
  }
}