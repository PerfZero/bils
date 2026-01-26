"use client";

const COMPARE_IDS_KEY = "mms_compare_ids";

function getStoredCompareIds(): number[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(COMPARE_IDS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function setStoredCompareIds(ids: number[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(COMPARE_IDS_KEY, JSON.stringify(ids));
}

function emitCompareUpdate(ids: number[]) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("compare:updated", { detail: ids }));
}

export function getCompareIds() {
  return getStoredCompareIds();
}

export function updateCompareIds(ids: number[]) {
  const normalized = Array.from(
    new Set(ids.filter((value) => Number.isFinite(value))),
  );
  setStoredCompareIds(normalized);
  emitCompareUpdate(normalized);
  return normalized;
}

export function isCompared(productId: number) {
  if (!productId) return false;
  return getStoredCompareIds().includes(productId);
}

export function getCompareCount() {
  return getStoredCompareIds().length;
}

export function addToCompare(productId: number) {
  if (!productId) return getStoredCompareIds();
  const ids = getStoredCompareIds();
  if (!ids.includes(productId)) {
    ids.push(productId);
  }
  return updateCompareIds(ids);
}

export function removeFromCompare(productId: number) {
  if (!productId) return getStoredCompareIds();
  const ids = getStoredCompareIds().filter((id) => id !== productId);
  return updateCompareIds(ids);
}

export function toggleCompare(productId: number) {
  if (isCompared(productId)) {
    return removeFromCompare(productId);
  }
  return addToCompare(productId);
}

export function clearCompare() {
  return updateCompareIds([]);
}
