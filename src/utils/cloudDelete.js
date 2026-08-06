import { loadCloudConfig } from "./cloudConfig";

export async function deleteEventFromCloud(eventId) {
  const config = loadCloudConfig();

  if (!config?.endpointUrl || !config?.apiKey) {
    throw new Error("Cloud configuration is missing.");
  }

  const response = await fetch(
    `${config.endpointUrl}/events?id=eq.${encodeURIComponent(eventId)}`,
    {
      method: "DELETE",
      headers: {
        apikey: config.apiKey,
        Authorization: `Bearer ${config.apiKey}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Cloud delete failed (${response.status})`
    );
  }

  return true;
}