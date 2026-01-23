"use client";

import { API_ENDPOINTS } from "../../config/api";

const CART_TOKEN_KEY = "mms_cart_token";

function getStoredCartToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(CART_TOKEN_KEY);
}

function setStoredCartToken(token: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_TOKEN_KEY, token);
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

function emitCartUpdate(cart: any) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("cart:updated", { detail: cart }));
}

async function createCart() {
  const response = await fetch(API_ENDPOINTS.CART, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Failed to create cart");
  }
  const payload = await parseJson(response);
  if (payload?.token) {
    setStoredCartToken(payload.token);
  }
  return payload;
}

export async function fetchCart(token: string) {
  const response = await fetch(`${API_ENDPOINTS.CART}${token}/`, {
    method: "GET",
  });
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error("Failed to load cart");
  }
  return parseJson(response);
}

export async function ensureCartToken() {
  const stored = getStoredCartToken();
  if (stored) {
    return stored;
  }
  const created = await createCart();
  return created?.token;
}

export async function getOrCreateCart() {
  let token = await ensureCartToken();
  if (!token) {
    const created = await createCart();
    token = created?.token;
  }
  if (!token) {
    throw new Error("Unable to initialize cart");
  }
  const cart = await fetchCart(token);
  if (cart) {
    return { token, cart };
  }
  const created = await createCart();
  return { token: created?.token, cart: created };
}

export async function addToCart(productId: number, quantity = 1) {
  const token = await ensureCartToken();
  if (!token) {
    throw new Error("Missing cart token");
  }
  const response = await fetch(`${API_ENDPOINTS.CART}${token}/items/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product_id: productId, quantity }),
  });
  if (response.status === 404) {
    const created = await createCart();
    const newToken = created?.token;
    if (!newToken) {
      throw new Error("Failed to recreate cart");
    }
    const retry = await fetch(`${API_ENDPOINTS.CART}${newToken}/items/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: productId, quantity }),
    });
    if (!retry.ok) {
      throw new Error("Failed to add item to cart");
    }
    const payload = await parseJson(retry);
    if (payload) {
      emitCartUpdate(payload);
    }
    return payload;
  }
  if (!response.ok) {
    throw new Error("Failed to add item to cart");
  }
  const payload = await parseJson(response);
  if (payload) {
    emitCartUpdate(payload);
  }
  return payload;
}

export async function updateCartItem(
  token: string,
  itemId: number,
  quantity: number,
) {
  const url = `${API_ENDPOINTS.CART}${token}/items/${itemId}/`;
  let response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });
  if (response.status === 405) {
    response = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });
  }
  if (!response.ok) {
    throw new Error("Failed to update cart item");
  }
  const payload = await parseJson(response);
  if (payload) {
    emitCartUpdate(payload);
  }
  return payload;
}

export async function removeCartItem(token: string, itemId: number) {
  const url = `${API_ENDPOINTS.CART}${token}/items/${itemId}/remove/`;
  const response = await fetch(url, { method: "DELETE" });
  if (!response.ok) {
    throw new Error("Failed to remove cart item");
  }
  const payload = await parseJson(response);
  if (payload) {
    emitCartUpdate(payload);
  }
  return payload;
}

export async function applyPromoCode(token: string, code: string) {
  const response = await fetch(`${API_ENDPOINTS.CART}${token}/promo/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });
  const payload = await parseJson(response);
  if (!response.ok) {
    throw new Error(payload?.detail || "Failed to apply promo code");
  }
  if (payload) {
    emitCartUpdate(payload);
  }
  return payload;
}

export async function removePromoCode(token: string) {
  const response = await fetch(`${API_ENDPOINTS.CART}${token}/promo/`, {
    method: "DELETE",
  });
  const payload = await parseJson(response);
  if (!response.ok) {
    throw new Error(payload?.detail || "Failed to remove promo code");
  }
  if (payload) {
    emitCartUpdate(payload);
  }
  return payload;
}
