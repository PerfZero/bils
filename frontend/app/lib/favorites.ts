"use client";

import { API_ENDPOINTS } from "../../config/api";

const FAVORITES_TOKEN_KEY = "mms_favorites_token";
const FAVORITES_IDS_KEY = "mms_favorites_ids";

function getStoredFavoritesToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(FAVORITES_TOKEN_KEY);
}

function setStoredFavoritesToken(token: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(FAVORITES_TOKEN_KEY, token);
}

function getStoredFavoriteIds(): number[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(FAVORITES_IDS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function setStoredFavoriteIds(ids: number[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(FAVORITES_IDS_KEY, JSON.stringify(ids));
}

async function parseJson(response: Response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (error) {
    return null;
  }
}

function emitFavoritesUpdate(favorites: any) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("favorites:updated", { detail: favorites }),
  );
}

function syncFavoriteIds(payload: any) {
  const ids = Array.isArray(payload?.items)
    ? payload.items.map((item: any) => item.product_id).filter(Boolean)
    : [];
  setStoredFavoriteIds(ids);
  emitFavoritesUpdate(payload);
}

async function createFavorites() {
  const response = await fetch(API_ENDPOINTS.FAVORITES, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Failed to create favorites");
  }
  const payload = await parseJson(response);
  if (payload?.token) {
    setStoredFavoritesToken(payload.token);
    syncFavoriteIds(payload);
  }
  return payload;
}

export async function fetchFavorites(token: string) {
  const response = await fetch(`${API_ENDPOINTS.FAVORITES}${token}/`, {
    method: "GET",
  });
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error("Failed to load favorites");
  }
  const payload = await parseJson(response);
  if (payload) {
    syncFavoriteIds(payload);
  }
  return payload;
}

export async function ensureFavoritesToken() {
  const stored = getStoredFavoritesToken();
  if (stored) {
    return stored;
  }
  const created = await createFavorites();
  return created?.token;
}

export async function getOrCreateFavorites() {
  let token = await ensureFavoritesToken();
  if (!token) {
    const created = await createFavorites();
    token = created?.token;
  }
  if (!token) {
    throw new Error("Unable to initialize favorites");
  }
  const favorites = await fetchFavorites(token);
  if (favorites) {
    return { token, favorites };
  }
  const created = await createFavorites();
  return { token: created?.token, favorites: created };
}

let favoritesLoadPromise: Promise<any> | null = null;

export async function loadFavorites() {
  if (!favoritesLoadPromise) {
    favoritesLoadPromise = getOrCreateFavorites().then(
      (result) => result.favorites,
    );
  }
  return favoritesLoadPromise;
}

export function isFavorite(productId: number) {
  if (!productId) return false;
  return getStoredFavoriteIds().includes(productId);
}

export function getFavoriteCount() {
  return getStoredFavoriteIds().length;
}

export async function addToFavorites(productId: number) {
  const token = await ensureFavoritesToken();
  if (!token) {
    throw new Error("Missing favorites token");
  }
  const response = await fetch(`${API_ENDPOINTS.FAVORITES}${token}/items/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product_id: productId }),
  });
  if (response.status === 404) {
    const created = await createFavorites();
    const newToken = created?.token;
    if (!newToken) {
      throw new Error("Failed to recreate favorites");
    }
    const retry = await fetch(`${API_ENDPOINTS.FAVORITES}${newToken}/items/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: productId }),
    });
    if (!retry.ok) {
      throw new Error("Failed to add item to favorites");
    }
    const payload = await parseJson(retry);
    if (payload) {
      syncFavoriteIds(payload);
    }
    return payload;
  }
  if (!response.ok) {
    throw new Error("Failed to add item to favorites");
  }
  const payload = await parseJson(response);
  if (payload) {
    syncFavoriteIds(payload);
  }
  return payload;
}

export async function removeFavoriteByProductId(productId: number) {
  const token = await ensureFavoritesToken();
  if (!token) {
    throw new Error("Missing favorites token");
  }
  const response = await fetch(
    `${API_ENDPOINTS.FAVORITES}${token}/items/remove/?product_id=${encodeURIComponent(
      productId,
    )}`,
    {
      method: "DELETE",
    },
  );
  if (response.status === 404) {
    const created = await createFavorites();
    return created;
  }
  if (!response.ok) {
    throw new Error("Failed to remove item from favorites");
  }
  const payload = await parseJson(response);
  if (payload) {
    syncFavoriteIds(payload);
  }
  return payload;
}

export async function toggleFavorite(productId: number) {
  if (isFavorite(productId)) {
    return removeFavoriteByProductId(productId);
  }
  return addToFavorites(productId);
}

export async function removeFavoriteItem(token: string, itemId: number) {
  const response = await fetch(
    `${API_ENDPOINTS.FAVORITES}${token}/items/${itemId}/remove/`,
    { method: "DELETE" },
  );
  if (!response.ok) {
    throw new Error("Failed to remove item from favorites");
  }
  const payload = await parseJson(response);
  if (payload) {
    syncFavoriteIds(payload);
  }
  return payload;
}

export async function clearFavorites(token: string) {
  const response = await fetch(`${API_ENDPOINTS.FAVORITES}${token}/clear/`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to clear favorites");
  }
  const payload = await parseJson(response);
  if (payload) {
    syncFavoriteIds(payload);
  }
  return payload;
}
