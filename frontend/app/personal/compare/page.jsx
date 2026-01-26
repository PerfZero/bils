"use client";

import { useEffect, useMemo, useState } from "react";
import { API_BASE_URL, API_ENDPOINTS } from "../../../config/api";
import { addToCart } from "../../lib/cart";
import {
  clearCompare,
  getCompareIds,
  removeFromCompare,
  updateCompareIds,
} from "../../lib/compare";

function normalizeImageUrl(url) {
  if (!url) return "/images/layouts/no_picture.svg";
  if (url.startsWith("http") || url.startsWith("//")) return url;
  if (url.startsWith("/media/")) return `${API_BASE_URL}${url}`;
  return url;
}

function formatPrice(value) {
  const number = Number(value || 0);
  return `${number.toLocaleString("ru-RU")} ₽`;
}

async function fetchProduct(id) {
  const response = await fetch(`${API_ENDPOINTS.PRODUCTS}${id}/`);
  if (!response.ok) return null;
  return response.json();
}

function formatAttributeValue(attribute) {
  if (!attribute) return "-";
  const value = attribute.value;
  if (value === null || value === undefined || value === "") return "-";
  if (attribute.unit) {
    return `${value} ${attribute.unit}`.trim();
  }
  return String(value);
}

export default function ComparePage() {
  const [compareIds, setCompareIds] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDifferences, setShowDifferences] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const handler = (event) => {
      const ids = Array.isArray(event.detail) ? event.detail : getCompareIds();
      setCompareIds(ids);
    };
    setCompareIds(getCompareIds());
    window.addEventListener("compare:updated", handler);
    return () => window.removeEventListener("compare:updated", handler);
  }, []);

  useEffect(() => {
    let isActive = true;
    if (compareIds.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all(compareIds.map((id) => fetchProduct(id)))
      .then((items) => {
        if (!isActive) return;
        const filtered = items.filter(Boolean);
        setProducts(filtered);
      })
      .catch(() => {
        if (!isActive) return;
        setError("Не удалось загрузить товары для сравнения.");
      })
      .finally(() => {
        if (isActive) setLoading(false);
      });
    return () => {
      isActive = false;
    };
  }, [compareIds]);

  const categories = useMemo(() => {
    const map = new Map();
    products.forEach((product) => {
      const slug = product?.category?.slug || "no-category";
      const name = product?.category?.name || "Без категории";
      const current = map.get(slug) || { slug, name, count: 0 };
      current.count += 1;
      map.set(slug, current);
    });
    return Array.from(map.values()).sort((a, b) =>
      a.name.localeCompare(b.name, "ru-RU"),
    );
  }, [products]);

  useEffect(() => {
    if (categories.length === 0) {
      setSelectedCategory(null);
      return;
    }
    if (!selectedCategory || !categories.some((c) => c.slug === selectedCategory)) {
      setSelectedCategory(categories[0].slug);
    }
  }, [categories, selectedCategory]);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter(
      (product) =>
        (product?.category?.slug || "no-category") === selectedCategory,
    );
  }, [products, selectedCategory]);

  const attributeRows = useMemo(() => {
    const rows = [];
    const map = new Map();

    filteredProducts.forEach((product, index) => {
      const attributes = Array.isArray(product.attributes)
        ? product.attributes
        : [];
      const brandName = product?.brand?.name || "-";
      const existingBrand = map.get("Производитель") || {
        name: "Производитель",
        order: -1,
        values: [],
      };
      existingBrand.values[index] = brandName;
      map.set("Производитель", existingBrand);

      attributes.forEach((attribute) => {
        const key = attribute.name || attribute.slug || `attr-${attribute.id}`;
        const existing = map.get(key) || {
          name: attribute.name || key,
          order: typeof attribute.order === "number" ? attribute.order : 0,
          values: [],
        };
        existing.values[index] = formatAttributeValue(attribute);
        map.set(key, existing);
      });
    });

    map.forEach((value) => rows.push(value));
    rows.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name, "ru-RU"));
    return rows;
  }, [filteredProducts]);

  const visibleRows = useMemo(() => {
    if (!showDifferences) return attributeRows;
    return attributeRows.filter((row) => {
      const values = row.values.map((value) => value ?? "-");
      return new Set(values).size > 1;
    });
  }, [attributeRows, showDifferences]);

  const handleClear = () => {
    if (compareIds.length === 0) return;
    clearCompare();
  };

  const handleRemoveCategory = (slug) => {
    if (!slug) return;
    setUpdating(true);
    const remaining = products
      .filter((product) => (product?.category?.slug || "no-category") !== slug)
      .map((product) => product.id);
    updateCompareIds(remaining);
    setUpdating(false);
  };

  const handleRemoveProduct = (id) => {
    setUpdating(true);
    removeFromCompare(id);
    setUpdating(false);
  };

  const handleAddToCart = async (id) => {
    if (!id) return;
    try {
      await addToCart(id, 1);
    } catch (err) {
      setError("Не удалось добавить товар в корзину.");
    }
  };

  return (
    <div className="a-page-compare a-page__main">
      <div className="a-page-compare__container">
        <ul className="a-breadcrumbs a-page-personal__breadcrumbs">
          <li className="a-breadcrumbs__item">
            <a className="a-breadcrumbs__link nuxt-link-active" href="/">
              Главная
            </a>{" "}
          </li>
          <li className="a-breadcrumbs__item a-breadcrumbs__item--current">
            <span className="a-breadcrumbs__text">Сравнение товаров</span>
          </li>
        </ul>{" "}
        <div className="a-back a-page-personal__back">
          <a className="a-back__link nuxt-link-active" href="/">
            <svg className="a-svg a-back__icon">
              <use xlinkHref="#icon-old-arrow" />
            </svg>{" "}
            <span className="a-back__text">Главная</span>
          </a>
        </div>{" "}
        <div className="a-page-compare__title">
          <h1 className="a-title__h1">Сравнение товаров</h1>{" "}
          <button
            aria-label="Очистить все"
            className="a-link-button a-page-compare__button-delete"
            title="Очистить все"
            type="button"
            onClick={handleClear}
            disabled={updating || compareIds.length === 0}
          >
            <span className="a-link-button__icon a-link-button__icon--grey">
              <svg className="a-svg a-svg--medium">
                <use xlinkHref="#icon-last-trash" />
              </svg>
            </span>{" "}
            <span className="a-link-button__content a-link-button__content--black">
              Очистить все
            </span>{" "}
          </button>
        </div>{" "}
        <div className="a-page-compare__auth">
          <span className="a-page-compare__auth-link">Авторизуйтесь</span>,
          чтобы сохранить список сравнения для просмотра на этом и других
          устройствах
        </div>{" "}
        {error && (
          <div className="a-page-cart__error a-page-cart__error--inline">
            {error}
          </div>
        )}
        {loading ? (
          <div className="a-page-cart__empty">Загрузка...</div>
        ) : products.length === 0 ? (
          <div className="a-page-cart__empty">Список сравнения пуст.</div>
        ) : (
          <section>
            {categories.length > 0 && (
              <div className="a-compare-sections">
                <div className="a-compare-sections__container">
                  <div className="a-compare-sections__list">
                    {categories.map((category) => (
                      <div className="a-compare-sections__item" key={category.slug}>
                        <div
                          aria-label={`${category.name}: ${category.count}`}
                          className={`a-ellipse-button a-ellipse-button--remove a-ellipse-button--interactive a-ellipse-button--color-blue${
                            selectedCategory === category.slug
                              ? " a-ellipse-button--active"
                              : ""
                          }`}
                          title={`${category.name}: ${category.count}`}
                        >
                          <button
                            aria-label={`${category.name}: ${category.count}`}
                            className="a-ellipse-button__button"
                            title={`${category.name}: ${category.count}`}
                            type="button"
                            onClick={() => setSelectedCategory(category.slug)}
                          >
                            <span className="a-ellipse-button__text">
                              {category.name}: {category.count}
                            </span>{" "}
                          </button>
                          <button
                            className="a-ellipse-button__remove"
                            title="Убрать"
                            type="button"
                            onClick={() => handleRemoveCategory(category.slug)}
                          >
                            <svg className="a-svg">
                              <use xlinkHref="#icon-cross" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div
              className="sticky-container"
              data-v-sticky-container=""
              style={{ position: "relative" }}
            >
              <div className="a-compare-products__wrapper">
                <div
                  className="a-compare-products__inner"
                  data-v-sticky-inner=""
                  style={{ position: "relative" }}
                >
                  <div className="a-compare-products">
                    <div className="a-compare-products-sticky">
                      <div
                        className="a-compare-products__list"
                        style={{ transform: "translateX(0%)" }}
                      >
                        {filteredProducts.map((product) => (
                          <div className="a-compare-products__item" key={product.id}>
                            <div className="a-product-card a-product-card--type-compare">
                              <a className="a-product-card__preview" href={product.href}>
                                <img
                                  alt={product.name}
                                  className="a-product-card__picture a-lazy-load a-is-loaded"
                                  src={normalizeImageUrl(product.image)}
                                  title={product.name}
                                />{" "}
                                <span />{" "}
                              </a>{" "}
                              <div className="a-product-card__description">
                                <div className="a-product-card__price">
                                  <div className="a-price">
                                    <div className="a-price__new">
                                      {formatPrice(product.price)}
                                    </div>{" "}
                                    {product.retail_price && (
                                      <div className="a-price__old">
                                        {formatPrice(product.retail_price)}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="a-product-card__status">
                                  <div className="a-rating">
                                    <ul className="a-rating__list">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <li className="a-rating__item" key={star}>
                                          <svg className="a-svg a-rating__icon a-rating__icon--inactive a-rating__icon--color-grey">
                                            <use xlinkHref="#icon-star" />
                                          </svg>{" "}
                                          <svg className="a-svg a-rating__icon a-rating__icon--active a-rating__icon--color-orange">
                                            <use xlinkHref="#icon-star" />
                                          </svg>
                                        </li>
                                      ))}
                                    </ul>{" "}
                                  </div>
                                </div>{" "}
                                <div className="a-product-card__title">
                                  <a href={product.href} title={product.name}>
                                    {product.name}
                                  </a>
                                </div>
                              </div>{" "}
                              <div className="a-product-card__helpers">
                                <div className="a-main-compare a-main-compare--active a-main-compare--type-compare">
                                  <button
                                    className="a-main-compare__helper"
                                    title="Удалить"
                                    type="button"
                                    onClick={() => handleRemoveProduct(product.id)}
                                  >
                                    <span className="a-main-compare__icon">
                                      <svg className="a-svg">
                                        <use xlinkHref="#icon-delete" />
                                      </svg>{" "}
                                      <svg className="a-svg">
                                        <use xlinkHref="#icon-delete" />
                                      </svg>
                                    </span>{" "}
                                    <span className="a-main-compare__title a-main-compare__title--in-compare" />
                                  </button>{" "}
                                </div>
                              </div>{" "}
                              <div className="a-product-card__buttons">
                                <button
                                  className="a-main-button a-product-card__add a-main-button--display-inline a-main-button--type-auto a-main-button--corner-round a-main-button--color-orange"
                                  type="button"
                                  onClick={() => handleAddToCart(product.id)}
                                >
                                  <span className="a-main-button__wrap">
                                    <span className="a-main-button__content">
                                      В корзину
                                    </span>{" "}
                                  </span>{" "}
                                </button>{" "}
                                <div className="a-product-card__mini-add">
                                  <button
                                    className="a-main-button a-main-button--display-inline a-main-button--type-auto a-main-button--corner-round a-main-button--color-orange"
                                    type="button"
                                    onClick={() => handleAddToCart(product.id)}
                                  >
                                    <span className="a-main-button__constrain">
                                      <svg className="a-svg a-main-button__icon a-main-button__icon--center a-svg--medium a-main-button__icon--icon-cart-stroke a-main-button__icon--color">
                                        <use xlinkHref="#icon-cart-stroke" />
                                      </svg>
                                    </span>
                                  </button>{" "}
                                </div>
                              </div>{" "}
                              <a className="a-product-card__link" href={product.href} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="a-compare-properties__wrapper">
                <div className="a-compare-properties a-compare-properties__additional">
                  <div className="a-compare-properties__title">Характеристики</div>{" "}
                  <div className="a-compare-properties__difference">
                    <span className="a-compare-properties__difference-text">
                      Показать только различия
                    </span>{" "}
                    <div className="a-toggle">
                      <input
                        className="a-toggle__input"
                        id="difference"
                        name="difference"
                        type="checkbox"
                        checked={showDifferences}
                        onChange={(event) =>
                          setShowDifferences(event.target.checked)
                        }
                      />{" "}
                      <label className="a-toggle__label" htmlFor="difference" />
                    </div>
                  </div>{" "}
                  <div className="a-compare-properties__rows">
                    {visibleRows.map((row) => (
                      <div className="a-compare-properties__row" key={row.name}>
                        <div className="a-compare-properties__item">
                          <span className="a-compare-properties__row-title">
                            {row.name}
                          </span>{" "}
                          <div
                            className="a-compare-properties__list"
                            style={{ transform: "translateX(0%)" }}
                          >
                            {filteredProducts.map((product, index) => (
                              <div
                                className="a-compare-properties__list-item"
                                key={`${product.id}-${row.name}`}
                              >
                                {row.values[index] ?? "-"}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
