"use client";

import { API_ENDPOINTS } from "../../config/api";

async function parseJson(response: Response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (error) {
    return null;
  }
}

export async function createLead(payload: {
  name: string;
  address: string;
  email: string;
  phone: string;
  comment?: string;
}) {
  const response = await fetch(API_ENDPOINTS.LEADS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await parseJson(response);
  if (!response.ok) {
    throw new Error(data?.detail || "Failed to submit lead");
  }
  return data;
}
