"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BaseFilter } from "../../../catalog/components/BaseFilter";
import { ProductListItem } from "../../../catalog/components/ProductListItem";
import { API_BASE_URL } from "../../../../config/api";

function normalizeImageUrl(url) {
  if (!url) return "/images/layouts/no_picture.svg";
  if (url.startsWith("http") || url.startsWith("//")) return url;
  if (url.startsWith("/media/")) return `${API_BASE_URL}${url}`;
  return url;
}

function decodeSlug(value) {
  if (!value) return "";
  try {
    return decodeURIComponent(value);
  } catch (error) {
    return value;
  }
}

export default function BrandCategoryPage({ params }) {
  const brandSlug = decodeSlug(params.slug);
  const categorySlug = decodeSlug(params.category);
  const brandHrefSlug = encodeURIComponent(brandSlug || params.slug);
  const categoryHrefSlug = encodeURIComponent(categorySlug || params.category);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page") || "1");
  const currentPage = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [productsLoading, setProductsLoading] = useState(true);
  const [priceBounds, setPriceBounds] = useState({ min: 0, max: 0 });
  const [countryOptions, setCountryOptions] = useState([]);
  const [draftCountries, setDraftCountries] = useState([]);
  const [draftPriceMin, setDraftPriceMin] = useState("");
  const [draftPriceMax, setDraftPriceMax] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("popular-desc");

  const selectedCountries = useMemo(() => {
    const raw = searchParams.get("country") || "";
    return raw
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }, [searchParams]);
  const priceMinParam = (searchParams.get("price_min") || "").trim();
  const priceMaxParam = (searchParams.get("price_max") || "").trim();

  useEffect(() => {
    setDraftCountries(selectedCountries);
    setDraftPriceMin(priceMinParam);
    setDraftPriceMax(priceMaxParam);
  }, [selectedCountries.join(","), priceMinParam, priceMaxParam]);

  useEffect(() => {
    if (!priceMinParam && priceBounds.min > 0) {
      setDraftPriceMin(String(priceBounds.min));
    }
    if (!priceMaxParam && priceBounds.max > 0) {
      setDraftPriceMax(String(priceBounds.max));
    }
  }, [priceBounds.min, priceBounds.max, priceMinParam, priceMaxParam]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(max-width: 568px)");
    const handleChange = () => setIsMobile(media.matches);
    handleChange();
    if (media.addEventListener) {
      media.addEventListener("change", handleChange);
      return () => media.removeEventListener("change", handleChange);
    }
    media.addListener(handleChange);
    return () => media.removeListener(handleChange);
  }, []);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/brands/`);
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results || [];
        const match = data.find((item) => item.slug === brandSlug);
        setBrand(match || null);
      } catch (error) {
        setBrand(null);
      }
    };
    fetchBrand();
  }, [params.slug, brandSlug]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/categories/`);
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results || [];

        const findCategoryPath = (nodes, targetSlug, path = []) => {
          for (const node of nodes || []) {
            const nextPath = [...path, node];
            if (node.slug === targetSlug) {
              return nextPath;
            }
            const found = findCategoryPath(
              node.children || [],
              targetSlug,
              nextPath,
            );
            if (found) return found;
          }
          return null;
        };

        const categoryPath = findCategoryPath(data, categorySlug) || [];
        const foundCategory =
          categoryPath.length > 0
            ? categoryPath[categoryPath.length - 1]
            : null;
        setCategory(
          foundCategory ? { ...foundCategory, path: categoryPath } : null,
        );
      } catch (error) {
        setCategory(null);
      }
    };
    fetchCategory();
  }, [params.category, categorySlug]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countryUrl = new URL(`${API_BASE_URL}/api/products/countries/`);
        countryUrl.searchParams.set("category", categorySlug);
        countryUrl.searchParams.set("brand", brandSlug);
        const response = await fetch(countryUrl.toString());
        const data = await response.json();
        setCountryOptions(
          (Array.isArray(data) ? data : []).filter(Boolean).map((country) => ({
            id: country,
            label: country,
            title: country,
          })),
        );
      } catch (error) {
        setCountryOptions([]);
      }
    };
    fetchCountries();
  }, [params.slug, params.category, brandSlug, categorySlug]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductsLoading(true);
        const productsUrl = new URL(`${API_BASE_URL}/api/products/list/`);
        productsUrl.searchParams.set("brand", brandSlug);
        productsUrl.searchParams.set("category", categorySlug);
        productsUrl.searchParams.set("page", String(currentPage));
        if (selectedCountries.length) {
          productsUrl.searchParams.set("country", selectedCountries.join(","));
        }
        if (priceMinParam) {
          productsUrl.searchParams.set("price_min", priceMinParam);
        }
        if (priceMaxParam) {
          productsUrl.searchParams.set("price_max", priceMaxParam);
        }
        const response = await fetch(productsUrl.toString());
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data);
          setTotalCount(data.length);
          const numericPrices = data
            .map((item) => Number(item?.price))
            .filter((value) => Number.isFinite(value));
          if (numericPrices.length) {
            setPriceBounds({
              min: Math.min(...numericPrices),
              max: Math.max(...numericPrices),
            });
          }
        } else {
          setProducts(data.results || []);
          setTotalCount(data.count || 0);
          const numericPrices = (data.results || [])
            .map((item) => Number(item?.price))
            .filter((value) => Number.isFinite(value));
          if (numericPrices.length) {
            setPriceBounds({
              min: Math.min(...numericPrices),
              max: Math.max(...numericPrices),
            });
          }
        }
      } catch (error) {
        setProducts([]);
        setTotalCount(0);
      } finally {
        setProductsLoading(false);
      }
    };
    fetchProducts();
  }, [
    params.slug,
    params.category,
    brandSlug,
    categorySlug,
    currentPage,
    selectedCountries.join(","),
    priceMinParam,
    priceMaxParam,
  ]);

  const pageSize = 24;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const pageHref = (page) =>
    `/brands/${brandHrefSlug}/${categoryHrefSlug}/?page=${page}`;
  const pageNumbers = useMemo(
    () => buildPagination(currentPage, totalPages),
    [currentPage, totalPages],
  );

  const brandName = brand?.name || brandSlug || params.slug;
  const brandLogo = normalizeImageUrl(brand?.logo);
  const categoryName = category?.name || categorySlug || params.category;

  const handleApplyFilters = () => {
    const nextParams = new URLSearchParams(searchParams.toString());
    if (draftCountries.length > 0) {
      nextParams.set("country", draftCountries.join(","));
    } else {
      nextParams.delete("country");
    }
    if (draftPriceMin.trim()) {
      nextParams.set("price_min", draftPriceMin.trim());
    } else {
      nextParams.delete("price_min");
    }
    if (draftPriceMax.trim()) {
      nextParams.set("price_max", draftPriceMax.trim());
    } else {
      nextParams.delete("price_max");
    }
    nextParams.set("page", "1");
    const query = nextParams.toString();
    router.push(
      query
        ? `/brands/${brandHrefSlug}/${categoryHrefSlug}/?${query}`
        : `/brands/${brandHrefSlug}/${categoryHrefSlug}/`,
    );
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    setDraftCountries([]);
    setDraftPriceMin("");
    setDraftPriceMax("");
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("country");
    nextParams.delete("price_min");
    nextParams.delete("price_max");
    nextParams.set("page", "1");
    const query = nextParams.toString();
    router.push(
      query
        ? `/brands/${brandHrefSlug}/${categoryHrefSlug}/?${query}`
        : `/brands/${brandHrefSlug}/${categoryHrefSlug}/`,
    );
  };

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
          <li className="a-breadcrumbs__item">
            <a
              className="a-breadcrumbs__link nuxt-link-active"
              href={`/brands/${brandHrefSlug}/`}
            >
              {brandName}
            </a>
          </li>
          <li className="a-breadcrumbs__item a-breadcrumbs__item--current">
            <span className="a-breadcrumbs__text">{categoryName}</span>
          </li>
        </ul>
        <div className="a-back a-page-catalog__back">
          <a
            className="a-back__link nuxt-link-active"
            href={`/brands/${brandHrefSlug}/`}
          >
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
                  <BaseFilter
                    manufacturerOptions={[
                      { id: brandSlug, label: brandName, title: brandName },
                    ]}
                    selectedManufacturers={[brandSlug]}
                    countryOptions={countryOptions}
                    selectedCountries={draftCountries}
                    priceMinBound={priceBounds.min}
                    priceMaxBound={priceBounds.max}
                    priceMin={draftPriceMin}
                    priceMax={draftPriceMax}
                    onPriceMinChange={setDraftPriceMin}
                    onPriceMaxChange={setDraftPriceMax}
                    onCountryToggle={(value, checked) => {
                      setDraftCountries((prev) => {
                        const next = new Set(prev);
                        if (checked) {
                          next.add(value);
                        } else {
                          next.delete(value);
                        }
                        return Array.from(next);
                      });
                    }}
                    onApply={handleApplyFilters}
                    onClearAll={handleClearFilters}
                    totalCount={totalCount}
                    showActions
                  />
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
                              id={`sort-${brandHrefSlug}-${categoryHrefSlug}-${index}`}
                              name="sort"
                              type="radio"
                              value={option.value}
                              checked={selectedSort === option.value}
                              onChange={() => setSelectedSort(option.value)}
                            />
                            <label
                              htmlFor={`sort-${brandHrefSlug}-${categoryHrefSlug}-${index}`}
                            >
                              {option.label}
                            </label>
                          </span>
                        ))}
                      </div>
                    </div>
                    <div
                      className={`a-field-select${
                        isSortOpen
                          ? " a-field-select--focus a-field-select--open"
                          : ""
                      }`}
                    >
                      <div
                        className="a-field-select__constrain"
                        tabIndex={0}
                        onBlur={(event) => {
                          if (
                            event.relatedTarget &&
                            event.currentTarget.contains(event.relatedTarget)
                          ) {
                            return;
                          }
                          setIsSortOpen(false);
                        }}
                      >
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
                                  {
                                    value: "popular-desc",
                                    label: "Популярности",
                                  },
                                  { value: "rate-desc", label: "Рейтингу" },
                                  {
                                    value: "price-desc",
                                    label: "Сначала дороже",
                                  },
                                  {
                                    value: "price-asc",
                                    label: "Сначала дешевле",
                                  },
                                ].find(
                                  (option) => option.value === selectedSort,
                                )?.label
                              }
                              role="button"
                              tabIndex={0}
                              onClick={() => setIsSortOpen((prev) => !prev)}
                              onKeyDown={(event) => {
                                if (
                                  event.key === "Enter" ||
                                  event.key === " "
                                ) {
                                  event.preventDefault();
                                  setIsSortOpen((prev) => !prev);
                                }
                              }}
                            >
                              {
                                [
                                  {
                                    value: "popular-desc",
                                    label: "Популярности",
                                  },
                                  { value: "rate-desc", label: "Рейтингу" },
                                  {
                                    value: "price-desc",
                                    label: "Сначала дороже",
                                  },
                                  {
                                    value: "price-asc",
                                    label: "Сначала дешевле",
                                  },
                                ].find(
                                  (option) => option.value === selectedSort,
                                )?.label
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
                              tabIndex={-1}
                              onClick={() => {
                                setSelectedSort(option.value);
                                setIsSortOpen(false);
                              }}
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
      {isMobile && isFilterOpen ? (
        <div id="modals-container">
          <div className="vm--container scrollable">
            <div
              data-modal="filter"
              aria-expanded="true"
              className="vm--overlay"
              onClick={() => setIsFilterOpen(false)}
            >
              <div className="vm--top-right-slot" />
            </div>
            <div
              aria-expanded="true"
              role="dialog"
              aria-modal="true"
              className="vm--modal a-main-modal-parent"
            >
              <div
                className="a-main-modal"
                style={{ top: "0px", transition: "none" }}
              >
                <div className="a-main-modal__wrap">
                  <button
                    type="button"
                    className="a-main-modal__close"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    <svg className="a-svg">
                      <use
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        xlinkHref="#icon-cross"
                      />
                    </svg>
                  </button>
                  <div className="a-main-modal__content">
                    <BaseFilter
                      manufacturerOptions={[
                        { id: brandSlug, label: brandName, title: brandName },
                      ]}
                      selectedManufacturers={[brandSlug]}
                      countryOptions={countryOptions}
                      selectedCountries={draftCountries}
                      priceMinBound={priceBounds.min}
                      priceMaxBound={priceBounds.max}
                      priceMin={draftPriceMin}
                      priceMax={draftPriceMax}
                      onPriceMinChange={setDraftPriceMin}
                      onPriceMaxChange={setDraftPriceMax}
                      onCountryToggle={(value, checked) => {
                        setDraftCountries((prev) => {
                          const next = new Set(prev);
                          if (checked) {
                            next.add(value);
                          } else {
                            next.delete(value);
                          }
                          return Array.from(next);
                        });
                      }}
                      onApply={handleApplyFilters}
                      onClearAll={handleClearFilters}
                      totalCount={totalCount}
                      showActions
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
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
