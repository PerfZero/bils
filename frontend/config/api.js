// API Configuration
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const API_ENDPOINTS = {
  FAQ_CATEGORIES: `${API_BASE_URL}/api/faq-categories/`,
  FAQ_QUESTIONS: `${API_BASE_URL}/api/faq-questions/`,
  CATEGORIES: `${API_BASE_URL}/api/categories/`,
  PRODUCTS: `${API_BASE_URL}/api/products/`,
  BRANDS: `${API_BASE_URL}/api/brands/`,
};
