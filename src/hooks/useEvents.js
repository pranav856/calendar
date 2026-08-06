import { useState } from "react";
import { pushEventsToCloud } from "../utils/cloudSync";

export default function useEvents(initialEvents) {
  const [events, setEvents] = useState(initialEvents);

  const addEvent = (newEvent) => {
    setEvents(prev => {
      const next = [newEvent, ...prev];

      pushEventsToCloud(next).catch(err =>
        console.warn("Auto cloud sync warning:", err)
      );

      return next;
    });
  };

  return {
    events,
    setEvents,
    addEvent,
  };
}