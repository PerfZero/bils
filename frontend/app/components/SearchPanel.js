"use client";

import { useEffect, useRef, useState } from "react";
import { API_BASE_URL, API_ENDPOINTS } from "../../config/api";

function normalizeImageUrl(url) {
  if (!url) return "/images/layouts/no_picture.svg";
  if (url.startsWith("http") || url.startsWith("//")) return url;
  if (url.startsWith("/media/")) return `${API_BASE_URL}${url}`;
  return url;
}

export default function SearchPanel({
  isOpen,
  onClose,
  anchorRef,
  query,
  onSelectQuery,
}) {
  const panelRef = useRef(null);
  const [data, setData] = useState({
    suggestions: [],
    categories: [],
    brands: [],
    products: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };
    const handleClickOutside = (event) => {
      if (!panelRef.current) return;
      const target = event.target;
      const panelContains = panelRef.current.contains(target);
      const anchorContains = anchorRef?.current?.contains(target);
      if (!panelContains && !anchorContains) {
        onClose?.();
      }
    };
    window.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, anchorRef]);

  useEffect(() => {
    if (!isOpen || !query) {
      setData({ suggestions: [], categories: [], brands: [], products: [] });
      return;
    }
    let isActive = true;
    const controller = new AbortController();
    setLoading(true);
    const handle = setTimeout(async () => {
      try {
        const response = await fetch(
          `${API_ENDPOINTS.SEARCH}?q=${encodeURIComponent(query)}`,
          { signal: controller.signal },
        );
        if (!response.ok) {
          throw new Error("Failed to search");
        }
        const payload = await response.json();
        if (isActive) {
          setData({
            suggestions: payload.suggestions || [],
            categories: payload.categories || [],
            brands: payload.brands || [],
            products: payload.products || [],
          });
        }
      } catch (error) {
        if (isActive) {
          setData({
            suggestions: [],
            categories: [],
            brands: [],
            products: [],
          });
        }
      } finally {
        if (isActive) setLoading(false);
      }
    }, 250);
    return () => {
      isActive = false;
      clearTimeout(handle);
      controller.abort();
    };
  }, [isOpen, query]);

  if (!isOpen) return null;

  return (
    <div className="search-panel" ref={panelRef}>
      <div className="search-panel__card">
        <div className="search-panel__section">
          <h3>Найти в категории</h3>
          <ul>
            {data.categories.map((item) => (
              <li key={item.id || item.name}>
                <a href={item.href}>{item.name}</a>
              </li>
            ))}
            {!loading && data.categories.length === 0 && (
              <li className="search-panel__empty">Нет категорий</li>
            )}
          </ul>
        </div>

        <div className="search-panel__section">
          <h3>Бренды</h3>
          <div className="search-panel__brands">
            {data.brands.map((brand) => (
              <a
                className="search-panel__brand"
                key={brand.id || brand.name}
                href={brand.href}
              >
                {brand.logo ? (
                  <img alt={brand.name} src={normalizeImageUrl(brand.logo)} />
                ) : (
                  <span>{brand.name}</span>
                )}
              </a>
            ))}
            {!loading && data.brands.length === 0 && (
              <div className="search-panel__empty">Нет брендов</div>
            )}
          </div>
        </div>

        <div className="search-panel__section">
          <h3>Популярные товары</h3>
          <div className="search-panel__products">
            {data.products.map((product) => (
              <a
                className="search-panel__product"
                key={product.id}
                href={product.href}
              >
                <div className="search-panel__product-image">
                  <img
                    alt={product.name}
                    src={normalizeImageUrl(product.image)}
                  />
                </div>
                <div className="search-panel__product-info">
                  <div className="search-panel__product-title">
                    {product.name}
                  </div>
                  <div className="search-panel__product-price">
                    <span>
                      {Number(product.price || 0).toLocaleString("ru-RU")} ₽
                    </span>
                    {product.retail_price && (
                      <s>
                        {Number(product.retail_price || 0).toLocaleString(
                          "ru-RU",
                        )}{" "}
                        ₽
                      </s>
                    )}
                  </div>
                </div>
              </a>
            ))}
            {!loading && data.products.length === 0 && (
              <div className="search-panel__empty">Товары не найдены</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
