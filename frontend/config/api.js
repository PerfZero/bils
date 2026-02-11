// API Configuration
export const API_BASE_URL =
  typeof window === "undefined"
    ? process.env.INTERNAL_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:8000"
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const API_ENDPOINTS = {
  FAQ_CATEGORIES: `${API_BASE_URL}/api/faq-categories/`,
  FAQ_QUESTIONS: `${API_BASE_URL}/api/faq-questions/`,
  CATEGORIES: `${API_BASE_URL}/api/categories/`,
  PRODUCTS: `${API_BASE_URL}/api/products/`,
  BRANDS: `${API_BASE_URL}/api/brands/`,
  SEARCH: `${API_BASE_URL}/api/search/`,
  SITE_SETTINGS: `${API_BASE_URL}/api/site-settings/`,
  MAIN_BANNERS: `${API_BASE_URL}/api/hero-items/`,
  CART: `${API_BASE_URL}/api/cart/`,
  FAVORITES: `${API_BASE_URL}/api/favorites/`,
  LEADS: `${API_BASE_URL}/api/leads/`,
  ORDERS: `${API_BASE_URL}/api/orders/`,
  DELIVERY_METHODS: `${API_BASE_URL}/api/delivery-methods/`,
  PAYMENT_METHODS: `${API_BASE_URL}/api/payment-methods/`,
};
