"use client";

import { useState, useEffect, useMemo } from "react";
import type { CSSProperties } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Breadcrumbs from "../../components/Breadcrumbs";
import { CatalogListItem } from "../components/CatalogListItem";
import { BaseFilter } from "../components/BaseFilter";
import { ProductListItem } from "../components/ProductListItem";
import { API_BASE_URL } from "../../../config/api";

export default function CatalogSlugPage({ params }) {
  const isAllCatalog = !params?.slug || params.slug === "all";
  const basePath = isAllCatalog ? "/catalog" : `/catalog/${params.slug}`;
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [productsLoading, setProductsLoading] = useState(true);
  const [priceBounds, setPriceBounds] = useState({ min: 0, max: 0 });
  const [manufacturerOptions, setManufacturerOptions] = useState<
    { id: string; label: string; title: string }[]
  >([]);
  const [countryOptions, setCountryOptions] = useState<
    { id: string; label: string; title: string }[]
  >([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page") || "1");
  const currentPage = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
  const parseListParam = (value) => {
    if (!value) return [];
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  };
  const selectedBrands = parseListParam(searchParams.get("brand"));
  const selectedCountries = parseListParam(searchParams.get("country"));
  const priceMinParam = (searchParams.get("price_min") || "").trim();
  const priceMaxParam = (searchParams.get("price_max") || "").trim();
  const [draftBrands, setDraftBrands] = useState<string[]>([]);
  const [draftCountries, setDraftCountries] = useState<string[]>([]);
  const [draftPriceMin, setDraftPriceMin] = useState("");
  const [draftPriceMax, setDraftPriceMax] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("popular-desc");

  useEffect(() => {
    setDraftBrands(selectedBrands);
    setDraftCountries(selectedCountries);
    setDraftPriceMin(priceMinParam);
    setDraftPriceMax(priceMaxParam);
  }, [
    selectedBrands.join(","),
    selectedCountries.join(","),
    priceMinParam,
    priceMaxParam,
  ]);

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
    const fetchCategory = async () => {
      try {
        if (isAllCatalog) {
          const rootsResponse = await fetch(
            `${API_BASE_URL}/api/categories/roots/`,
          );
          const rootsPayload = await rootsResponse.json();
          const rootsData = Array.isArray(rootsPayload)
            ? rootsPayload
            : rootsPayload.results || [];

          setCategory({
            name: "Каталог",
            slug: "catalog",
            href: "/catalog",
            description: "",
            path: [
              {
                name: "Каталог",
                slug: "catalog",
                href: "/catalog",
                children: rootsData,
                description: "",
              },
            ],
          });
          return;
        }

        const pathResponse = await fetch(
          `${API_BASE_URL}/api/categories/path-by-slug/?slug=${params.slug}`,
        );
        const pathPayload = await pathResponse.json();
        const categoryPath = Array.isArray(pathPayload) ? pathPayload : [];
        const foundCategory =
          categoryPath.length > 0
            ? categoryPath[categoryPath.length - 1]
            : null;

        setCategory(
          foundCategory ? { ...foundCategory, path: categoryPath } : null,
        );
      } catch (error) {
        console.error("Failed to fetch category:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug || isAllCatalog) {
      fetchCategory();
    }
  }, [params.slug, isAllCatalog]);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const brandUrl = new URL(`${API_BASE_URL}/api/brands/`);
        if (!isAllCatalog) {
          brandUrl.searchParams.set("category", params.slug);
        }
        const countryUrl = new URL(`${API_BASE_URL}/api/products/countries/`);
        if (!isAllCatalog) {
          countryUrl.searchParams.set("category", params.slug);
        }
        if (selectedBrands.length) {
          countryUrl.searchParams.set("brand", selectedBrands.join(","));
        }

        const [brandsResponse, countriesResponse] = await Promise.all([
          fetch(brandUrl.toString()),
          fetch(countryUrl.toString()),
        ]);
        const brandsPayload = await brandsResponse.json();
        const brandsData = Array.isArray(brandsPayload)
          ? brandsPayload
          : brandsPayload.results || [];
        const countriesData = await countriesResponse.json();

        setManufacturerOptions(
          brandsData.map((brand) => ({
            id: brand.slug || String(brand.id),
            label: brand.name,
            title: brand.name,
          })),
        );
        setCountryOptions(
          (Array.isArray(countriesData) ? countriesData : [])
            .filter(Boolean)
            .map((country) => ({
              id: country,
              label: country,
              title: country,
            })),
        );
      } catch (error) {
        console.error("Failed to fetch filter options:", error);
        setManufacturerOptions([]);
        setCountryOptions([]);
      }
    };

    if (params.slug || isAllCatalog) {
      fetchFilterOptions();
    }
  }, [params.slug, selectedBrands.join(","), isAllCatalog]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductsLoading(true);
        const productsUrl = new URL(`${API_BASE_URL}/api/products/list/`);
        if (!isAllCatalog) {
          productsUrl.searchParams.set("category", params.slug);
        }
        productsUrl.searchParams.set("page", String(currentPage));
        if (selectedBrands.length) {
          productsUrl.searchParams.set("brand", selectedBrands.join(","));
        }
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
        console.error("Failed to fetch products:", error);
        setProducts([]);
        setTotalCount(0);
      } finally {
        setProductsLoading(false);
      }
    };

    if (params.slug || isAllCatalog) {
      fetchProducts();
    }
  }, [
    params.slug,
    currentPage,
    selectedBrands.join(","),
    selectedCountries.join(","),
    priceMinParam,
    priceMaxParam,
    isAllCatalog,
  ]);

  const handleBrandToggle = (value, checked) => {
    setDraftBrands((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(value);
      } else {
        next.delete(value);
      }
      return Array.from(next);
    });
  };

  const handleCountryToggle = (value, checked) => {
    setDraftCountries((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(value);
      } else {
        next.delete(value);
      }
      return Array.from(next);
    });
  };

  const handleApplyFilters = () => {
    const nextParams = new URLSearchParams(searchParams.toString());
    if (draftBrands.length) {
      nextParams.set("brand", draftBrands.join(","));
    } else {
      nextParams.delete("brand");
    }
    if (draftCountries.length) {
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
    router.push(query ? `${basePath}/?${query}` : `${basePath}/`);
  };

  const handleClearFilters = () => {
    setDraftBrands([]);
    setDraftCountries([]);
    setDraftPriceMin("");
    setDraftPriceMax("");
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("brand");
    nextParams.delete("country");
    nextParams.delete("price_min");
    nextParams.delete("price_max");
    nextParams.set("page", "1");
    const query = nextParams.toString();
    router.push(query ? `${basePath}/?${query}` : `${basePath}/`);
  };

  const pageSize = 24;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const pageHref = (page) => `${basePath}/?page=${page}`;
  const pageNumbers = buildPagination(currentPage, totalPages);

  const breadcrumbs = category?.path?.map((cat, index) => {
    const isLast = index === category.path.length - 1;
    const hasDropdown = index === 0 && category.path.length > 1;

    return {
      label: cat.name,
      href: isLast ? null : cat.href,
      dropdown: hasDropdown
        ? category.path[0].children?.map((child) => ({
            label: child.name,
            href: child.href,
          })) || []
        : [],
    };
  }) || [
    { label: "Главная", href: "/" },
    { label: "Каталог", href: "/catalog" },
    { label: loading ? "Загрузка..." : params.slug },
  ];

  if (isAllCatalog) {
    breadcrumbs.splice(
      0,
      breadcrumbs.length,
      { label: "Главная", href: "/" },
      { label: "Каталог", href: "/catalog" },
    );
  }

  // Добавляем главную и каталог если их нет
  if (breadcrumbs.length > 0 && breadcrumbs[0].label !== "Главная") {
    breadcrumbs.unshift({ label: "Каталог", href: "/catalog" });
    breadcrumbs.unshift({ label: "Главная", href: "/" });
  }

  const sortOptions = useMemo(
    () => [
      { value: "popular-desc", label: "По популярности" },
      { value: "rate-desc", label: "По рейтингу" },
      { value: "price-desc", label: "Сначала дороже" },
      { value: "price-asc", label: "Сначала дешевле" },
    ],
    [],
  );

  const manufacturerLabelMap = useMemo(() => {
    return new Map(
      (manufacturerOptions || []).map((option) => [option.id, option.label]),
    );
  }, [manufacturerOptions]);

  const countryLabelMap = useMemo(() => {
    return new Map(
      (countryOptions || []).map((option) => [option.id, option.label]),
    );
  }, [countryOptions]);

  const activeFilterChips = useMemo(() => {
    const chips: {
      id: string;
      label: string;
      type: "brand" | "country" | "price";
      value?: string;
    }[] = [];

    draftBrands.forEach((brandId) => {
      const label = manufacturerLabelMap.get(brandId) || brandId;
      chips.push({
        id: `brand-${brandId}`,
        label: `Бренд: ${label}`,
        type: "brand",
        value: brandId,
      });
    });

    draftCountries.forEach((countryId) => {
      const label = countryLabelMap.get(countryId) || countryId;
      chips.push({
        id: `country-${countryId}`,
        label: `Страна: ${label}`,
        type: "country",
        value: countryId,
      });
    });

    if (draftPriceMin || draftPriceMax) {
      const parts: string[] = [];
      if (draftPriceMin) parts.push(`от ${draftPriceMin}`);
      if (draftPriceMax) parts.push(`до ${draftPriceMax}`);
      chips.push({
        id: "price",
        label: `Цена: ${parts.join(" ")}`,
        type: "price",
      });
    }

    return chips;
  }, [
    draftBrands,
    draftCountries,
    draftPriceMin,
    draftPriceMax,
    manufacturerLabelMap,
    countryLabelMap,
  ]);

  const handleFilterApply = () => {
    handleApplyFilters();
    setIsFilterOpen(false);
  };

  const handleRemoveChip = (chip: {
    type: "brand" | "country" | "price";
    value?: string;
  }) => {
    if (chip.type === "brand" && chip.value) {
      handleBrandToggle(chip.value, false);
      return;
    }
    if (chip.type === "country" && chip.value) {
      handleCountryToggle(chip.value, false);
      return;
    }
    if (chip.type === "price") {
      setDraftPriceMin("");
      setDraftPriceMax("");
    }
  };

  return (
    <main className="a-page-catalog a-page-catalog--type-c a-page__main">
      <div className="a-page-catalog__container">
        <Breadcrumbs
          items={breadcrumbs}
          className="a-page-catalog__breadcrumbs"
        />
        <div className="a-back a-page-catalog__back">
          <a
            className="a-back__link nuxt-link-active"
            href={
              isAllCatalog
                ? "/catalog"
                : category?.path?.[category.path.length - 2]?.href || "/catalog"
            }
          >
            <svg className="a-svg a-back__icon">
              <use
                xlinkHref="#icon-old-arrow"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              />
            </svg>
            <span className="a-back__text">
              {isAllCatalog
                ? "Каталог"
                : category?.path?.[category.path.length - 2]?.name || "Каталог"}
            </span>
          </a>
        </div>
      </div>
      <div className="a-page-catalog__container">
        <section className="a-page-catalog__section a-page-catalog__section--catalog">
          <div className="a-page-catalog__title">
            <div className="a-page-catalog__title-content">
              <h1>
                {loading
                  ? "Загрузка..."
                  : isAllCatalog
                    ? "Каталог товаров"
                    : category?.path?.[category.path.length - 1]?.name ||
                      params.slug}
              </h1>
            </div>
            <div className="a-page-catalog__title-count">
              Найдено {totalCount} товаров
            </div>
          </div>
          <div className="a-page-catalog__wrap">
            <div
              className="a-page-catalog__sidebar-container"
              data-v-sticky-container=""
              style={{
                position: "relative",
              }}
            >
              <div className="a-page-catalog__sidebar" style={{}}>
                <div
                  className="a-page-catalog__sticky"
                  data-v-sticky-inner=""
                  style={{
                    position: "relative",
                  }}
                >
                  <BaseFilter
                    manufacturerOptions={manufacturerOptions}
                    countryOptions={countryOptions}
                    selectedManufacturers={draftBrands}
                    selectedCountries={draftCountries}
                    priceMinBound={priceBounds.min}
                    priceMaxBound={priceBounds.max}
                    priceMin={draftPriceMin}
                    priceMax={draftPriceMax}
                    onPriceMinChange={setDraftPriceMin}
                    onPriceMaxChange={setDraftPriceMax}
                    onManufacturerToggle={handleBrandToggle}
                    onCountryToggle={handleCountryToggle}
                    onApply={handleApplyFilters}
                    onClearAll={handleClearFilters}
                    totalCount={totalCount}
                  />
                  <ul className="a-page-catalog__sticky resize-sensor category-list__categories">
                    <li className="category-list__category">
                      <div>
                        <a
                          className="category-list__category-link"
                          href="/catalog/napilniki-5832/"
                        >
                          Напильники
                        </a>
                      </div>
                    </li>
                    <li className="category-list__category">
                      <div>
                        <a
                          className="category-list__category-link"
                          href="/catalog/steklorezy-5830/"
                        >
                          Стеклорезы
                        </a>
                      </div>
                    </li>
                    <li className="category-list__category">
                      <div>
                        <a
                          className="category-list__category-link"
                          href="/catalog/izolenta-6561/"
                        >
                          Изолента
                        </a>
                      </div>
                    </li>
                    <li className="category-list__category">
                      <div>
                        <a
                          className="category-list__category-link"
                          href="/catalog/khomuty-6540/"
                        >
                          Хомуты
                        </a>
                      </div>
                    </li>
                    <li className="category-list__category">
                      <div>
                        <a
                          className="category-list__category-link"
                          href="/catalog/semniki-stopornykh-kolec-8107/"
                        >
                          Съемники стопорных колец
                        </a>
                      </div>
                    </li>
                    <li className="category-list__category">
                      <div>
                        <a
                          className="category-list__category-link"
                          href="/catalog/gvozdy-9239/"
                        >
                          Гвозди
                        </a>
                      </div>
                    </li>
                    <li className="category-list__category">
                      <div>
                        <a
                          className="category-list__category-link"
                          href="/catalog/mikrometry-9354/"
                        >
                          Микрометры
                        </a>
                      </div>
                    </li>
                    <li className="category-list__category">
                      <div>
                        <a
                          className="category-list__category-link"
                          href="/catalog/razmetochnyi-instrument-9599/"
                        >
                          Разметочный инструмент
                        </a>
                      </div>
                    </li>
                    <li className="category-list__category">
                      <div>
                        <a
                          className="category-list__category-link"
                          href="/catalog/kruglogubcy-9607/"
                        >
                          Круглогубцы
                        </a>
                      </div>
                    </li>
                  </ul>
                  <div
                    className="resize-sensor"
                    style={{
                      inset: "0px",
                      opacity: "0",
                      overflow: "hidden",
                      position: "absolute",
                      visibility: "hidden",
                      zIndex: "-1",
                    }}
                  >
                    <div
                      className="resize-sensor-expand"
                      style={{
                        bottom: "0",
                        left: "0",
                        opacity: "0",
                        overflow: "hidden",
                        position: "absolute",
                        right: "0",
                        top: "0",
                        visibility: "hidden",
                        zIndex: "-1",
                      }}
                    >
                      <div
                        style={{
                          height: "100000px",
                          left: "0px",
                          position: "absolute",
                          top: "0px",
                          transition: "all",
                          width: "100000px",
                        }}
                      />
                    </div>
                    <div
                      className="resize-sensor-shrink"
                      style={{
                        bottom: "0",
                        left: "0",
                        opacity: "0",
                        overflow: "hidden",
                        position: "absolute",
                        right: "0",
                        top: "0",
                        visibility: "hidden",
                        zIndex: "-1",
                      }}
                    >
                      <div
                        style={{
                          height: "200%",
                          left: "0",
                          position: "absolute",
                          top: "0",
                          transition: "0s",
                          width: "200%",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="resize-sensor"
                style={{
                  inset: "0px",
                  opacity: "0",
                  overflow: "hidden",
                  position: "absolute",
                  visibility: "hidden",
                  zIndex: "-1",
                }}
              >
                <div
                  className="resize-sensor-expand"
                  style={{
                    bottom: "0",
                    left: "0",
                    opacity: "0",
                    overflow: "hidden",
                    position: "absolute",
                    right: "0",
                    top: "0",
                    visibility: "hidden",
                    zIndex: "-1",
                  }}
                >
                  <div
                    style={{
                      height: "100000px",
                      left: "0px",
                      position: "absolute",
                      top: "0px",
                      transition: "all",
                      width: "100000px",
                    }}
                  />
                </div>
                <div
                  className="resize-sensor-shrink"
                  style={{
                    bottom: "0",
                    left: "0",
                    opacity: "0",
                    overflow: "hidden",
                    position: "absolute",
                    right: "0",
                    top: "0",
                    visibility: "hidden",
                    zIndex: "-1",
                  }}
                >
                  <div
                    style={{
                      height: "200%",
                      left: "0",
                      position: "absolute",
                      top: "0",
                      transition: "0s",
                      width: "200%",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="a-page-catalog__main">
              {!isMobile && (
                <>
                  <div className="a-page-catalog__note">
                    {loading
                      ? "Загрузка описания..."
                      : isAllCatalog
                        ? "В каталоге представлены товары для различных задач."
                        : category?.path?.[category.path.length - 1]
                            ?.description ||
                          `В категории "${category?.path?.[category.path.length - 1]?.name || params.slug}" представлены товары для различных задач.`}
                  </div>
                  {!isAllCatalog && (
                    <div className="a-catalog-list">
                      <ul className="a-catalog-list__list">
                        {category?.path?.[
                          category.path.length - 1
                        ]?.children?.map((childCategory) => (
                          <CatalogListItem
                            key={childCategory.id}
                            category={childCategory}
                          />
                        )) || <CatalogListItem />}
                      </ul>
                    </div>
                  )}
                </>
              )}
              {isMobile && !isAllCatalog && (
                <div className="a-page-catalog__buttons">
                  <div className="catalog-mobile-groups">
                    <div className="catalog-mobile-groups__container">
                      <ul className="catalog-mobile-groups__list catalog-mobile-groups__list--list">
                        {category?.path?.[
                          category.path.length - 1
                        ]?.children?.map((childCategory) => (
                          <li
                            key={childCategory.id || childCategory.slug}
                            className="catalog-mobile-groups__item catalog-mobile-groups__item--list"
                          >
                            <a
                              href={childCategory.href}
                              className="catalog-mobile-groups__link"
                            >
                              <span className="catalog-mobile-groups__text">
                                {childCategory.name}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
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
                        {sortOptions.map((option, index) => (
                          <span
                            key={option.value}
                            className="a-sort-list__option"
                          >
                            <input
                              id={`sort-9653-option-${index}`}
                              name="sort"
                              type="radio"
                              value={option.value}
                              checked={selectedSort === option.value}
                              onChange={() => setSelectedSort(option.value)}
                            />
                            <label htmlFor={`sort-9653-option-${index}`}>
                              {option.label}
                            </label>
                          </span>
                        ))}
                      </div>
                      <button
                        className="a-page-catalog__button a-page-catalog__button--filter"
                        type="button"
                        onClick={() => {
                          if (isMobile) {
                            setIsFilterOpen(true);
                          }
                        }}
                      >
                        <span className="a-page-catalog__icon a-page-catalog__icon--filter">
                          <svg className="a-svg">
                            <use
                              xlinkHref="#icon-old-funnel"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                            />
                          </svg>
                        </span>
                        <span className="a-page-catalog__text">Фильтры</span>
                      </button>
                    </div>
                    {isMobile && (
                      <div className="a-page-catalog__filter-shortcuts">
                        <div className="a-filter-shortcuts a-filter-shortcuts--limit-prev a-filter-shortcuts--limit-next">
                          <div className="a-filter-shortcuts__container">
                            <div className="a-filter-shortcuts__wrap">
                              <ul className="a-filter-shortcuts__list">
                                <li className="a-filter-shortcuts__item">
                                  <div
                                    aria-label="Цена"
                                    className="a-ellipse-button a-ellipse-button--color-light-blue"
                                    title="Цена"
                                  >
                                    <div
                                      aria-label="Цена"
                                      className="a-ellipse-button__button"
                                      title="Цена"
                                      role="button"
                                      tabIndex={0}
                                      onClick={() => setIsFilterOpen(true)}
                                      onKeyDown={(event) => {
                                        if (
                                          event.key === "Enter" ||
                                          event.key === " "
                                        ) {
                                          event.preventDefault();
                                          setIsFilterOpen(true);
                                        }
                                      }}
                                    >
                                      <span className="a-ellipse-button__text">
                                        Цена
                                      </span>
                                    </div>
                                  </div>
                                </li>
                                <li className="a-filter-shortcuts__item">
                                  <div
                                    aria-label="Бренд"
                                    className="a-ellipse-button a-ellipse-button--color-light-blue"
                                    title="Бренд"
                                  >
                                    <div
                                      aria-label="Бренд"
                                      className="a-ellipse-button__button"
                                      title="Бренд"
                                      role="button"
                                      tabIndex={0}
                                      onClick={() => setIsFilterOpen(true)}
                                      onKeyDown={(event) => {
                                        if (
                                          event.key === "Enter" ||
                                          event.key === " "
                                        ) {
                                          event.preventDefault();
                                          setIsFilterOpen(true);
                                        }
                                      }}
                                    >
                                      <span className="a-ellipse-button__text">
                                        Бренд
                                      </span>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div
                      className={`a-field-select${isSortOpen ? " a-field-select--focus a-field-select--open" : ""}`}
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
                              value={selectedSort}
                              name="sort"
                              type="hidden"
                            />
                            <div className="a-field-select__placeholder" />
                            <div
                              className="a-field-select__fake"
                              title={
                                sortOptions.find(
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
                              {sortOptions.find(
                                (option) => option.value === selectedSort,
                              )?.label || "По популярности"}
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
                          {sortOptions.map((option) => (
                            <li
                              key={option.value}
                              className={`a-field-select__item${selectedSort === option.value ? " a-field-select__item--active" : ""}`}
                              title={option.label}
                              tabIndex={-1}
                              onClick={() => {
                                setSelectedSort(option.value);
                                setIsSortOpen(false);
                              }}
                            >
                              <div
                                className="a-field-select__text"
                                style={
                                  {
                                    "--filter-item-text": `'${option.label}'`,
                                  } as CSSProperties
                                }
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
                    ) : (
                      products.map((product) => (
                        <ProductListItem key={product.id} product={product} />
                      ))
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
                      ) : (
                        <span className="a-pagination__button">
                          <svg className="a-svg a-pagination__icon a-pagination__icon--prev">
                            <use
                              xlinkHref="#icon-old-arrow"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                            />
                          </svg>
                        </span>
                      )}
                      <ul className="a-pagination__list">
                        {pageNumbers.map((page) =>
                          page === "..." ? (
                            <li
                              key={`page-${page}-${Math.random()}`}
                              className="a-pagination__item"
                            >
                              <span className="a-pagination__button">...</span>
                            </li>
                          ) : (
                            <li
                              key={`page-${page}`}
                              className={`a-pagination__item${page === currentPage ? " a-pagination__item--active" : ""}`}
                            >
                              {page === currentPage ? (
                                <span className="a-pagination__button">
                                  {page}
                                </span>
                              ) : (
                                <a
                                  className="a-pagination__button"
                                  href={pageHref(page)}
                                >
                                  {page}
                                </a>
                              )}
                            </li>
                          ),
                        )}
                      </ul>
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
                      ) : (
                        <span className="a-pagination__button">
                          <svg className="a-svg a-pagination__icon a-pagination__icon--next">
                            <use
                              xlinkHref="#icon-old-arrow"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                            />
                          </svg>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="a-page-catalog__tags">
                <div className="js-tags a-tags">
                  <ul className="a-tags__groups">
                    <li className="js-tags__group a-tags__group a-tags__group--hide">
                      <div className="a-tags__title">Популярное:</div>
                      <ul className="js-tags__list a-tags__list">
                        <li className="js-tags__item a-tags__item">
                          <div
                            aria-label="шлифовальные ленты"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="шлифовальные ленты"
                          >
                            <a
                              aria-label="шлифовальные ленты"
                              className="a-ellipse-button__button"
                              href="/catalog/shlifovalnye-lenty-6745/"
                              title="шлифовальные ленты"
                            >
                              <span className="a-ellipse-button__text">
                                шлифовальные ленты
                              </span>
                            </a>
                          </div>
                        </li>
                        <li className="js-tags__item a-tags__item">
                          <div
                            aria-label="чашки для УШМ"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="чашки для УШМ"
                          >
                            <a
                              aria-label="чашки для УШМ"
                              className="a-ellipse-button__button"
                              href="/catalog/chashechnye-korshhetki-dlya-ushm-7932/"
                              title="чашки для УШМ"
                            >
                              <span className="a-ellipse-button__text">
                                чашки для УШМ
                              </span>
                            </a>
                          </div>
                        </li>
                        <li className="js-tags__item a-tags__item">
                          <div
                            aria-label="ножовки столярные"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="ножовки столярные"
                          >
                            <a
                              aria-label="ножовки столярные"
                              className="a-ellipse-button__button"
                              href="/catalog/nozhovki-po-derevu-7995/"
                              title="ножовки столярные"
                            >
                              <span className="a-ellipse-button__text">
                                ножовки столярные
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="миксеры"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="миксеры"
                          >
                            <a
                              aria-label="миксеры"
                              className="a-ellipse-button__button"
                              href="/catalog/miksery-6575/"
                              title="миксеры"
                            >
                              <span className="a-ellipse-button__text">
                                миксеры
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="угломеры"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="угломеры"
                          >
                            <a
                              aria-label="угломеры"
                              className="a-ellipse-button__button"
                              href="/catalog/uglomery-5869/"
                              title="угломеры"
                            >
                              <span className="a-ellipse-button__text">
                                угломеры
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="комплектующие для реноваторов"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="комплектующие для реноваторов"
                          >
                            <a
                              aria-label="комплектующие для реноваторов"
                              className="a-ellipse-button__button"
                              href="/catalog/dlya-renovatorov-6383/"
                              title="комплектующие для реноваторов"
                            >
                              <span className="a-ellipse-button__text">
                                комплектующие для реноваторов
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="кувалды"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="кувалды"
                          >
                            <a
                              aria-label="кувалды"
                              className="a-ellipse-button__button"
                              href="/catalog/kuvaldy-5849/"
                              title="кувалды"
                            >
                              <span className="a-ellipse-button__text">
                                кувалды
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="сумки"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="сумки"
                          >
                            <a
                              aria-label="сумки"
                              className="a-ellipse-button__button"
                              href="/catalog/sumki-dlya-instrumenta-9334/"
                              title="сумки"
                            >
                              <span className="a-ellipse-button__text">
                                сумки
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="штангенциркули"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="штангенциркули"
                          >
                            <a
                              aria-label="штангенциркули"
                              className="a-ellipse-button__button"
                              href="/catalog/shtangencirkuli-5874/"
                              title="штангенциркули"
                            >
                              <span className="a-ellipse-button__text">
                                штангенциркули
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="точила"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="точила"
                          >
                            <a
                              aria-label="точила"
                              className="a-ellipse-button__button"
                              href="/catalog/tochilnye-stanki-6186/"
                              title="точила"
                            >
                              <span className="a-ellipse-button__text">
                                точила
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="сверла"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="сверла"
                          >
                            <a
                              aria-label="сверла"
                              className="a-ellipse-button__button"
                              href="/catalog/sverla-6569/"
                              title="сверла"
                            >
                              <span className="a-ellipse-button__text">
                                сверла
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="ленточные шлифмашинки"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="ленточные шлифмашинки"
                          >
                            <a
                              aria-label="ленточные шлифмашинки"
                              className="a-ellipse-button__button"
                              href="/catalog/lentochnye-shlifovalnye-mashiny-5788/"
                              title="ленточные шлифмашинки"
                            >
                              <span className="a-ellipse-button__text">
                                ленточные шлифмашинки
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="дисковые пилы"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="дисковые пилы"
                          >
                            <a
                              aria-label="дисковые пилы"
                              className="a-ellipse-button__button"
                              href="/catalog/cirkulyarnye-pily-5793/"
                              title="дисковые пилы"
                            >
                              <span className="a-ellipse-button__text">
                                дисковые пилы
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="пилки лобзиковые"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="пилки лобзиковые"
                          >
                            <a
                              aria-label="пилки лобзиковые"
                              className="a-ellipse-button__button"
                              href="/catalog/pilki-dlya-lobzikov-3146/"
                              title="пилки лобзиковые"
                            >
                              <span className="a-ellipse-button__text">
                                пилки лобзиковые
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="гвоздодеры"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="гвоздодеры"
                          >
                            <a
                              aria-label="гвоздодеры"
                              className="a-ellipse-button__button"
                              href="/catalog/gvozdoder-6450/"
                              title="гвоздодеры"
                            >
                              <span className="a-ellipse-button__text">
                                гвоздодеры
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="буры"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="буры"
                          >
                            <a
                              aria-label="буры"
                              className="a-ellipse-button__button"
                              href="/catalog/bury-6588/"
                              title="буры"
                            >
                              <span className="a-ellipse-button__text">
                                буры
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="мультитулы"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="мультитулы"
                          >
                            <a
                              aria-label="мультитулы"
                              className="a-ellipse-button__button"
                              href="/catalog/multituly-6875/"
                              title="мультитулы"
                            >
                              <span className="a-ellipse-button__text">
                                мультитулы
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="коронки для древесины"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="коронки для древесины"
                          >
                            <a
                              aria-label="коронки для древесины"
                              className="a-ellipse-button__button"
                              href="/catalog/koronki-po-derevu-7900/"
                              title="коронки для древесины"
                            >
                              <span className="a-ellipse-button__text">
                                коронки для древесины
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="фрезы"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="фрезы"
                          >
                            <a
                              aria-label="фрезы"
                              className="a-ellipse-button__button"
                              href="/catalog/dlya-frezernykh-stankov-6327/"
                              title="фрезы"
                            >
                              <span className="a-ellipse-button__text">
                                фрезы
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="болторезы"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="болторезы"
                          >
                            <a
                              aria-label="болторезы"
                              className="a-ellipse-button__button"
                              href="/catalog/boltorezy-5837/"
                              title="болторезы"
                            >
                              <span className="a-ellipse-button__text">
                                болторезы
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="зажимной инструмент"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="зажимной инструмент"
                          >
                            <a
                              aria-label="зажимной инструмент"
                              className="a-ellipse-button__button"
                              href="/catalog/zazhimnoj-instrument-5815/"
                              title="зажимной инструмент"
                            >
                              <span className="a-ellipse-button__text">
                                зажимной инструмент
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="лезвия для ножа"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="лезвия для ножа"
                          >
                            <a
                              aria-label="лезвия для ножа"
                              className="a-ellipse-button__button"
                              href="/catalog/lezviya-dlya-kancelyarskogo-nozha-7653/"
                              title="лезвия для ножа"
                            >
                              <span className="a-ellipse-button__text">
                                лезвия для ножа
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="пневмогайковерты"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="пневмогайковерты"
                          >
                            <a
                              aria-label="пневмогайковерты"
                              className="a-ellipse-button__button"
                              href="/catalog/pnevmaticheskie-gajkoverty-5801/"
                              title="пневмогайковерты"
                            >
                              <span className="a-ellipse-button__text">
                                пневмогайковерты
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="струбцины"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="струбцины"
                          >
                            <a
                              aria-label="струбцины"
                              className="a-ellipse-button__button"
                              href="/catalog/strubciny-5843/"
                              title="струбцины"
                            >
                              <span className="a-ellipse-button__text">
                                струбцины
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="зубила"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="зубила"
                          >
                            <a
                              aria-label="зубила"
                              className="a-ellipse-button__button"
                              href="/catalog/zubila-6590/"
                              title="зубила"
                            >
                              <span className="a-ellipse-button__text">
                                зубила
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="штроборезы"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="штроборезы"
                          >
                            <a
                              aria-label="штроборезы"
                              className="a-ellipse-button__button"
                              href="/catalog/shtroborezy-5766/"
                              title="штроборезы"
                            >
                              <span className="a-ellipse-button__text">
                                штроборезы
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="труборезы"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="труборезы"
                          >
                            <a
                              aria-label="труборезы"
                              className="a-ellipse-button__button"
                              href="/catalog/truborezy-5838/"
                              title="труборезы"
                            >
                              <span className="a-ellipse-button__text">
                                труборезы
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="рюкзаки"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="рюкзаки"
                          >
                            <a
                              aria-label="рюкзаки"
                              className="a-ellipse-button__button"
                              href="/catalog/ryukzaki-dlya-instrumenta-9335/"
                              title="рюкзаки"
                            >
                              <span className="a-ellipse-button__text">
                                рюкзаки
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="пневмопистолеты"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="пневмопистолеты"
                          >
                            <a
                              aria-label="пневмопистолеты"
                              className="a-ellipse-button__button"
                              href="/catalog/pnevmaticheskie-pistolety-7935/"
                              title="пневмопистолеты"
                            >
                              <span className="a-ellipse-button__text">
                                пневмопистолеты
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="ударно-рычажный"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="ударно-рычажный"
                          >
                            <a
                              aria-label="ударно-рычажный"
                              className="a-ellipse-button__button"
                              href="/catalog/udarno-rychazhnyj-instrument-5816/"
                              title="ударно-рычажный"
                            >
                              <span className="a-ellipse-button__text">
                                ударно-рычажный
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="бокорезы"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="бокорезы"
                          >
                            <a
                              aria-label="бокорезы"
                              className="a-ellipse-button__button"
                              href="/catalog/bokorezy-5840/"
                              title="бокорезы"
                            >
                              <span className="a-ellipse-button__text">
                                бокорезы
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="длинногубцы"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="длинногубцы"
                          >
                            <a
                              aria-label="длинногубцы"
                              className="a-ellipse-button__button"
                              href="/catalog/dlinnogubcy-9605/"
                              title="длинногубцы"
                            >
                              <span className="a-ellipse-button__text">
                                длинногубцы
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="тиски слесарные"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="тиски слесарные"
                          >
                            <a
                              aria-label="тиски слесарные"
                              className="a-ellipse-button__button"
                              href="/catalog/slesarnye-tiski-7850/"
                              title="тиски слесарные"
                            >
                              <span className="a-ellipse-button__text">
                                тиски слесарные
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="шарнирно-губцевый"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="шарнирно-губцевый"
                          >
                            <a
                              aria-label="шарнирно-губцевый"
                              className="a-ellipse-button__button"
                              href="/catalog/sharnirno-gubcevyj-instrument-5814/"
                              title="шарнирно-губцевый"
                            >
                              <span className="a-ellipse-button__text">
                                шарнирно-губцевый
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="резьбонарезной"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="резьбонарезной"
                          >
                            <a
                              aria-label="резьбонарезной"
                              className="a-ellipse-button__button"
                              href="/catalog/rezbonareznoj-instrument-5818/"
                              title="резьбонарезной"
                            >
                              <span className="a-ellipse-button__text">
                                резьбонарезной
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="вибрационные машинки"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="вибрационные машинки"
                          >
                            <a
                              aria-label="вибрационные машинки"
                              className="a-ellipse-button__button"
                              href="/catalog/vibracionnye-shlifovalnye-mashiny-5785/"
                              title="вибрационные машинки"
                            >
                              <span className="a-ellipse-button__text">
                                вибрационные машинки
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="экстракторы болтов"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="экстракторы болтов"
                          >
                            <a
                              aria-label="экстракторы болтов"
                              className="a-ellipse-button__button"
                              href="/catalog/ekstraktory-dlya-slomannykh-gaek-i-boltov-8063/"
                              title="экстракторы болтов"
                            >
                              <span className="a-ellipse-button__text">
                                экстракторы болтов
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__item a-tags__item"
                          style={{
                            display: "none",
                          }}
                        >
                          <div
                            aria-label="со скидкой"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="со скидкой"
                          >
                            <a
                              aria-label="со скидкой"
                              className="a-ellipse-button__button"
                              href="/sale/instrument-5748/"
                              title="со скидкой"
                            >
                              <span className="a-ellipse-button__text">
                                со скидкой
                              </span>
                            </a>
                          </div>
                        </li>
                        <li
                          className="js-tags__more a-tags__item a-tags__item--more"
                          style={{}}
                        >
                          <div
                            aria-label="ещё"
                            className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                            title="ещё"
                          >
                            <button
                              aria-label="ещё"
                              className="a-ellipse-button__button"
                              title="ещё"
                              type="button"
                            >
                              <span className="a-ellipse-button__text">
                                ещё
                              </span>
                              <span className="a-ellipse-button__icon">
                                <svg className="a-svg">
                                  <use
                                    xlinkHref="#icon-meatballs"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                  />
                                </svg>
                              </span>
                            </button>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              {isMobile && (
                <div className="a-page-catalog__note">
                  {loading
                    ? "Загрузка описания..."
                    : isAllCatalog
                      ? "В каталоге представлены товары для различных задач."
                      : category?.path?.[category.path.length - 1]
                          ?.description ||
                        `В категории "${category?.path?.[category.path.length - 1]?.name || params.slug}" представлены товары для различных задач.`}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
      {isMobile && isFilterOpen && (
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
              className="vm--modal a-full-modal-parent"
              style={{
                left: "0px",
                width: "425px",
                height: "776px",
                top: "0px",
              }}
            >
              <div className="a-full-modal">
                <div className="a-full-modal__wrap">
                  <div className="a-full-modal__content">
                    <div
                      className="a-filter-modal-content"
                      style={{ height: "776px" }}
                    >
                      <div className="a-filter-modal-content__header">
                        <div className="a-filter-modal-content__left-action">
                          <button
                            aria-label="Очистить"
                            title="Очистить"
                            type="button"
                            className="a-link-button"
                            onClick={handleClearFilters}
                          >
                            <span className="a-link-button__content a-link-button__content--blue">
                              Очистить
                            </span>
                          </button>
                        </div>
                        <div className="a-filter-modal-content__text a-title-h3">
                          Фильтры
                        </div>
                        <div className="a-filter-modal-content__right-action">
                          <button
                            type="button"
                            className="a-filter-modal-content__close"
                            onClick={() => setIsFilterOpen(false)}
                          >
                            <svg className="a-svg">
                              <use
                                xlinkHref="#icon-cross"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="a-filter-modal-content__content">
                        <BaseFilter
                          manufacturerOptions={manufacturerOptions}
                          countryOptions={countryOptions}
                          selectedManufacturers={draftBrands}
                          selectedCountries={draftCountries}
                          priceMinBound={priceBounds.min}
                          priceMaxBound={priceBounds.max}
                          priceMin={draftPriceMin}
                          priceMax={draftPriceMax}
                          onPriceMinChange={setDraftPriceMin}
                          onPriceMaxChange={setDraftPriceMax}
                          onManufacturerToggle={handleBrandToggle}
                          onCountryToggle={handleCountryToggle}
                          onApply={handleApplyFilters}
                          onClearAll={handleClearFilters}
                          totalCount={totalCount}
                          showActions={false}
                        />
                      </div>
                      <div className="a-filter-modal-content__buttons">
                        <div className="vue-portal-target">
                          <div className="a-base-filter-bar a-base-filter-bar--limit-prev">
                            <div className="a-base-filter-bar__title-remove">
                              <button
                                aria-label=""
                                title=""
                                type="button"
                                className="a-link-button a-base-filter-bar__remove"
                                onClick={handleClearFilters}
                              >
                                <span className="a-link-button__icon a-link-button__icon--blue">
                                  <svg className="a-svg a-svg--medium">
                                    <use
                                      xlinkHref="#icon-cross"
                                      xmlnsXlink="http://www.w3.org/1999/xlink"
                                    />
                                  </svg>
                                </span>
                                <span className="a-link-button__content a-link-button__content--blue" />
                              </button>
                            </div>
                            <div
                              body-scroll-lock-ignore=""
                              className="a-base-filter-bar__container"
                            >
                              <div className="a-base-filter-bar__wrap">
                                <ul className="a-base-filter-bar__list">
                                  {activeFilterChips.map((chip) => (
                                    <li
                                      key={chip.id}
                                      className="a-base-filter-bar__item"
                                    >
                                      <div
                                        aria-label={chip.label}
                                        title={chip.label}
                                        className="a-ellipse-button a-ellipse-button--remove a-ellipse-button--color-blue"
                                      >
                                        <div
                                          aria-label={chip.label}
                                          title={chip.label}
                                          className="a-ellipse-button__button"
                                        >
                                          <span className="a-ellipse-button__text">
                                            {chip.label}
                                          </span>
                                        </div>
                                        <button
                                          type="button"
                                          title="Убрать"
                                          className="a-ellipse-button__remove"
                                          onClick={() => handleRemoveChip(chip)}
                                        >
                                          <svg className="a-svg">
                                            <use
                                              xlinkHref="#icon-cross"
                                              xmlnsXlink="http://www.w3.org/1999/xlink"
                                            />
                                          </svg>
                                        </button>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="a-filter-modal-content__button">
                          <button
                            type="button"
                            className="a-main-button a-main-button--display-block a-main-button--type-medium a-main-button--corner-round a-main-button--color-orange"
                            onClick={handleFilterApply}
                          >
                            <span className="a-main-button__wrap">
                              <span className="a-main-button__content">
                                Показать {totalCount} товаров
                              </span>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
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
