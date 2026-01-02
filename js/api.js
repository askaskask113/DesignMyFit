// js/api.js

const API_URL = "https://693aedfa9b80ba7262cbecf7.mockapi.io/requests";

export async function fetchRequests() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch requests");
  }
  return response.json();
}
