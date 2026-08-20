import { useCallback, useEffect, useState } from "react";

import {
  loadStoredEvents,
  saveStoredEvents,
  loadDeletedEventIds,
  saveDeletedEventIds,
} from "../utils/eventStorage";

import { mergeEvents } from "../utils/eventMerge";

import {
  pullEventsFromCloud,
  pushEventsToCloud,
  deleteEventFromCloud,
} from "../utils/cloudSync";

export default function useEvents(initialEvents = []) {
  const [events, setEvents] = useState([]);
  const [eventsInitialized, setEventsInitialized] = useState(false);

  /*
   * Load the initial/static events and merge them with
   * locally stored custom events and deleted-event IDs.
   */
  useEffect(() => {
  if (!Array.isArray(initialEvents) || initialEvents.length === 0) {
    return;
  }


    const deletedIds = loadDeletedEventIds();
    const storedEvents = loadStoredEvents();

    const mergedEvents = mergeEvents(
      initialEvents,
      storedEvents,
      deletedIds
    );

    setEvents(mergedEvents);
    setEventsInitialized(true);
  }, [initialEvents?.length]);

  /*
   * Persist the current event list locally.
   */
  useEffect(() => {
    if (!eventsInitialized) {
      return;
    }

    saveStoredEvents(events);
  }, [events, eventsInitialized]);

  /*
   * Pull events from Supabase after the local/static
   * event data has been initialized.
   */
  useEffect(() => {
    if (!eventsInitialized) {
      return;
    }

    let cancelled = false;

    const syncFromCloud = async () => {
      try {
        const result = await pullEventsFromCloud();

        if (
          cancelled ||
          !result ||
          !result.success ||
          !Array.isArray(result.events)
        ) {
          return;
        }

        setEvents(prevEvents => {
          const deletedIds = loadDeletedEventIds();

          return mergeEvents(
            result.events,
            prevEvents,
            deletedIds
          );
        });
      } catch (error) {
        console.warn(
          "Automatic cloud event pull warning:",
          error
        );
      }
    };

    syncFromCloud();

    return () => {
      cancelled = true;
    };
  }, [eventsInitialized]);

  /*
   * Add a new event.
   */
  const addEvent = useCallback((newEvent) => {
    setEvents(prevEvents => {
     const nextEvents = [
  newEvent,
  ...prevEvents,
];
      pushEventsToCloud(nextEvents).catch(error =>
        console.warn(
          "Auto cloud sync warning:",
          error
        )
      );

      return nextEvents;
    });
  }, []);

  /*
   * Update an existing event.
   */
  const updateEvent = useCallback((updatedEvent) => {
    setEvents(prevEvents => {
      const nextEvents = prevEvents.map(event =>
        event.id === updatedEvent.id
          ? updatedEvent
          : event
      );

      pushEventsToCloud(nextEvents).catch(error =>
        console.warn(
          "Auto cloud sync warning:",
          error
        )
      );

      return nextEvents;
    });
  }, []);

  /*
   * Delete an event locally and remotely.
   */
  const deleteEvent = useCallback(async (eventId) => {
    setEvents(prevEvents =>
      prevEvents.filter(
        event => event.id !== eventId
      )
    );

    const deletedIds = loadDeletedEventIds();

    deletedIds.add(eventId);

    saveDeletedEventIds(deletedIds);

    try {
      const result =
        await deleteEventFromCloud(eventId);

      console.log(
        "deleteEventFromCloud called",
        eventId,
        result
      );

      return result;
    } catch (error) {
      console.error(
        "Cloud event deletion failed:",
        error
      );

      throw error;
    }
  }, []);

 return {
  events,
  setEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  eventsInitialized,
};
}