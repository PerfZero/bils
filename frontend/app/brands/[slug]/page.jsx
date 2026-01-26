"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductListItem } from "../../catalog/components/ProductListItem";
import { API_BASE_URL } from "../../../config/api";

function normalizeImageUrl(url) {
  if (!url) return "/images/layouts/no_picture.svg";
  if (url.startsWith("http") || url.startsWith("//")) return url;
  if (url.startsWith("/media/")) return `${API_BASE_URL}${url}`;
  return url;
}

export default function BrandPage({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page") || "1");
  const currentPage = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
  const [brand, setBrand] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [selectedSort, setSelectedSort] = useState("popular-desc");

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/brands/`);
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results || [];
        const match = data.find((item) => item.slug === params.slug);
        setBrand(match || null);
      } catch (error) {
        setBrand(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBrand();
  }, [params.slug]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductsLoading(true);
        const productsUrl = new URL(`${API_BASE_URL}/api/products/`);
        productsUrl.searchParams.set("brand", params.slug);
        productsUrl.searchParams.set("page", String(currentPage));
        const response = await fetch(productsUrl.toString());
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results || [];
        const count = Number(payload?.count || data.length || 0);
        setProducts(data);
        setTotalCount(count);
      } catch (error) {
        setProducts([]);
        setTotalCount(0);
      } finally {
        setProductsLoading(false);
      }
    };
    fetchProducts();
  }, [params.slug, currentPage]);

  useEffect(() => {
    const unique = new Map();
    products.forEach((product) => {
      const category = product?.category;
      if (!category?.slug || unique.has(category.slug)) return;
      unique.set(category.slug, category);
    });
    setCategories(Array.from(unique.values()));
  }, [products]);

  const pageSize = 24;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const pageHref = (page) => `/brands/${params.slug}/?page=${page}`;
  const pageNumbers = useMemo(
    () => buildPagination(currentPage, totalPages),
    [currentPage, totalPages],
  );

  const brandName = brand?.name || params.slug;
  const brandLogo = normalizeImageUrl(brand?.logo);

  return (
    <div className="a-page-catalog a-page-catalog--type-h a-page__main">
      <div className="a-page-catalog__container">
        <ul className="a-breadcrumbs a-page-catalog__breadcrumbs">
          <li className="a-breadcrumbs__item">
            <a className="a-breadcrumbs__link nuxt-link-active" href="/">
              Главная
            </a>
          </li>
          <li className="a-breadcrumbs__item">
            <a className="a-breadcrumbs__link nuxt-link-active" href="/brands/">
              Бренды
            </a>
          </li>
          <li className="a-breadcrumbs__item a-breadcrumbs__item--current">
            <span className="a-breadcrumbs__text">{brandName}</span>
          </li>
        </ul>
        <div className="a-back a-page-catalog__back">
          <a className="a-back__link nuxt-link-active" href="/brands/">
            <svg className="a-svg a-back__icon">
              <use
                xlinkHref="#icon-old-arrow"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              />
            </svg>
            <span className="a-back__text">Бренды</span>
          </a>
        </div>
      </div>
      <div className="a-page-catalog__container">
        <section className="a-page-catalog__section a-page-catalog__section--catalog">
          <div className="a-page-catalog__title">
            <h1 className="a-page-catalog__title-content">
              Инструмент и техника {brandName}
            </h1>
            <div className="a-page-catalog__title-count">
              Найдено {totalCount} товаров
            </div>
          </div>
          <div className="a-page-catalog__wrap">
            <div
              className="a-page-catalog__sidebar-container"
              data-v-sticky-container=""
              style={{ position: "relative" }}
            >
              <div className="a-page-catalog__sidebar">
                <div
                  className="a-page-catalog__sticky"
                  data-v-sticky-inner=""
                  style={{ position: "relative" }}
                >
                  <div className="a-page-catalog__logo">
                    <img
                      alt={brandName}
                      className="a-lazy-load a-is-loaded"
                      src={brandLogo}
                      title={brandName}
                    />
                    <span />
                  </div>
                </div>
              </div>
            </div>
            <div className="a-page-catalog__main">
              <div className="a-page-catalog__logo">
                <img
                  alt={brandName}
                  className="a-lazy-load"
                  data-src={brandLogo}
                  src="/images/layouts/no_picture.svg"
                  title={brandName}
                />
                <span />
              </div>
              {categories.length > 0 && (
                <div className="a-catalog-list">
                  <ul className="a-catalog-list__list">
                    {categories.map((category) => (
                      <li className="a-catalog-list__item" key={category.id}>
                        <a
                          className="a-catalog-card"
                          href={`/catalog/${category.slug}/?brand=${params.slug}`}
                        >
                          <div className="a-catalog-card__text">
                            {category.name}
                          </div>
                          <div className="a-catalog-card__image">
                            <img
                              alt={category.name}
                              src={normalizeImageUrl(category.image)}
                            />
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div
                className="a-product-list a-product-list--view-line-tile"
                id="product-list"
              >
                <div className="a-product-list__header">
                  <div className="a-product-list__panel">
                    <div className="a-product-list__sort">
                      <div className="a-sort-list">
                        <span className="a-sort-list__title">
                          Сортировать по:
                        </span>
                        {[
                          { value: "popular-desc", label: "Популярности" },
                          { value: "rate-desc", label: "Рейтингу" },
                          { value: "price-desc", label: "Сначала дороже" },
                          { value: "price-asc", label: "Сначала дешевле" },
                        ].map((option, index) => (
                          <span
                            className="a-sort-list__option"
                            key={option.value}
                          >
                            <input
                              defaultValue={option.value}
                              id={`sort-${params.slug}-option-${index}`}
                              name="sort"
                              type="radio"
                              value={option.value}
                              checked={selectedSort === option.value}
                              onChange={() => setSelectedSort(option.value)}
                            />
                            <label htmlFor={`sort-${params.slug}-option-${index}`}>
                              {option.label}
                            </label>
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="a-field-select">
                      <div className="a-field-select__constrain" tabIndex={0}>
                        <div className="a-field-select__container">
                          <div className="a-field-select__wrap">
                            <input
                              className="a-field-select__input"
                              defaultValue={selectedSort}
                              name="sort"
                              type="hidden"
                            />
                            <div className="a-field-select__placeholder" />
                            <div
                              className="a-field-select__fake"
                              title={
                                [
                                  { value: "popular-desc", label: "Популярности" },
                                  { value: "rate-desc", label: "Рейтингу" },
                                  { value: "price-desc", label: "Сначала дороже" },
                                  { value: "price-asc", label: "Сначала дешевле" },
                                ].find((option) => option.value === selectedSort)
                                  ?.label
                              }
                            >
                              {
                                [
                                  { value: "popular-desc", label: "Популярности" },
                                  { value: "rate-desc", label: "Рейтингу" },
                                  { value: "price-desc", label: "Сначала дороже" },
                                  { value: "price-asc", label: "Сначала дешевле" },
                                ].find((option) => option.value === selectedSort)
                                  ?.label
                              }
                              <div className="a-field-select__icon">
                                <svg className="a-svg">
                                  <use
                                    xlinkHref="#icon-old-arrow"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                        <ul className="a-field-select__list">
                          {[
                            { value: "popular-desc", label: "Популярности" },
                            { value: "rate-desc", label: "Рейтингу" },
                            { value: "price-desc", label: "Сначала дороже" },
                            { value: "price-asc", label: "Сначала дешевле" },
                          ].map((option) => (
                            <li
                              key={option.value}
                              className={`a-field-select__item${
                                selectedSort === option.value
                                  ? " a-field-select__item--active"
                                  : ""
                              }`}
                              title={option.label}
                              onClick={() => setSelectedSort(option.value)}
                            >
                              <div
                                className="a-field-select__text"
                                style={{
                                  "--filter-item-text": `'${option.label}'`,
                                }}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="a-product-list__main">
                  <ul className="a-product-list__list">
                    {productsLoading ? (
                      <ProductListItem />
                    ) : products.length > 0 ? (
                      products.map((product) => (
                        <ProductListItem key={product.id} product={product} />
                      ))
                    ) : (
                      <li className="a-product-list__item">
                        <div className="a-page-catalog__note">
                          Товары не найдены.
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="a-product-list__footer">
                  <div className="a-product-list__pagination">
                    <div className="a-product-list__more">
                      <button
                        className="a-main-button a-main-button--display-inline a-main-button--type-medium a-main-button--corner-round a-main-button--color-light-grey"
                        type="button"
                        disabled={currentPage >= totalPages}
                        onClick={() => {
                          if (currentPage < totalPages) {
                            router.push(pageHref(currentPage + 1));
                          }
                        }}
                      >
                        <span className="a-main-button__wrap">
                          <span className="a-main-button__content">
                            Показать еще
                          </span>
                          <span className="a-main-button__constrain">
                            <svg className="a-svg a-main-button__icon a-main-button__icon--right a-svg--medium a-main-button__icon--icon-meatballs a-main-button__icon--color">
                              <use
                                xlinkHref="#icon-meatballs"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                              />
                            </svg>
                          </span>
                        </span>
                      </button>
                    </div>
                    <div className="a-pagination">
                      {currentPage > 1 ? (
                        <a
                          className="a-pagination__button"
                          href={pageHref(currentPage - 1)}
                        >
                          <svg className="a-svg a-pagination__icon a-pagination__icon--prev">
                            <use
                              xlinkHref="#icon-old-arrow"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                            />
                          </svg>
                        </a>
                      ) : null}
                      {pageNumbers.map((page) =>
                        page === "..." ? (
                          <span
                            key={`page-${page}-${Math.random()}`}
                            className="a-pagination__item a-pagination__item--ellipsis"
                          >
                            ...
                          </span>
                        ) : (
                          <span
                            key={`page-${page}`}
                            className={`a-pagination__item${
                              page === currentPage
                                ? " a-pagination__item--active"
                                : ""
                            }`}
                          >
                            {page === currentPage ? (
                              <span>{page}</span>
                            ) : (
                              <a href={pageHref(Number(page))}>{page}</a>
                            )}
                          </span>
                        ),
                      )}
                      {currentPage < totalPages ? (
                        <a
                          className="a-pagination__button"
                          href={pageHref(currentPage + 1)}
                        >
                          <svg className="a-svg a-pagination__icon a-pagination__icon--next">
                            <use
                              xlinkHref="#icon-old-arrow"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                            />
                          </svg>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function buildPagination(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set([1, total, current]);
  [current - 1, current + 1].forEach((page) => {
    if (page > 1 && page < total) pages.add(page);
  });

  const sorted = Array.from(pages).sort((a, b) => a - b);
  const output = [];
  for (let i = 0; i < sorted.length; i += 1) {
    output.push(sorted[i]);
    if (i < sorted.length - 1 && sorted[i + 1] - sorted[i] > 1) {
      output.push("...");
    }
  }
  return output;
}
