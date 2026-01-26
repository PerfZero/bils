"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Pagination } from "swiper/modules";
import Breadcrumbs from "../../components/Breadcrumbs";
import ProductTabs from "../../components/ProductTabs";
import { API_BASE_URL } from "../../../config/api";
import { addToCart } from "../../lib/cart";

export default function CatalogSlugPage({ params }) {
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [addingItemId, setAddingItemId] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // Загрузка данных товара
        const productResponse = await fetch(
          `${API_BASE_URL}/api/products/?slug=${params.slug}`,
        );
        const productPayload = await productResponse.json();
        const productData = Array.isArray(productPayload)
          ? productPayload
          : productPayload.results || [];

        if (productData.length > 0) {
          const currentProduct = productData[0];
          setProduct(currentProduct);

          // Загрузка пути категории для breadcrumbs
          const categoryId = currentProduct.category?.id;
          if (!categoryId) {
            throw new Error("Missing category id for breadcrumbs");
          }
          const categoryPathResponse = await fetch(
            `${API_BASE_URL}/api/categories/${categoryId}/path/`,
          );
          const categoryPath = await categoryPathResponse.json();

          const breadcrumbsData = [
            { label: "Главная", href: "/" },
            { label: "Каталог", href: "/catalog/" },
            ...categoryPath.map((cat) => ({
              label: cat.name,
              href: cat.href,
              dropdown:
                cat.children && cat.children.length > 0
                  ? cat.children.map((child) => ({
                      label: child.name,
                      href: child.href,
                    }))
                  : null,
            })),
          ];

          const productLabel =
            currentProduct.name || currentProduct.title || currentProduct.slug;
          const fullBreadcrumbs = productLabel
            ? [...breadcrumbsData, { label: productLabel }]
            : breadcrumbsData;

          setBreadcrumbs(fullBreadcrumbs);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        // Fallback breadcrumbs
        setBreadcrumbs([
          { label: "Главная", href: "/" },
          { label: "Корпоративным клиентам" },
        ]);
      }
    };

    if (params.slug) {
      fetchProductData();
    }
  }, [params.slug]);

  useEffect(() => {
    const categorySlug = product?.category?.slug;
    const currentSlug = product?.slug;
    if (!categorySlug) {
      setSimilarProducts([]);
      return;
    }
    let isActive = true;
    const fetchSimilar = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/products/?category=${categorySlug}`,
        );
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.results || [];
        const filtered = items
          .filter((item) => item?.slug && item.slug !== currentSlug)
          .slice(0, 12);
        if (isActive) {
          setSimilarProducts(filtered);
        }
      } catch (error) {
        console.error("Error fetching similar products:", error);
      }
    };
    fetchSimilar();
    return () => {
      isActive = false;
    };
  }, [product?.category?.slug, product?.slug]);

  const backItem = (() => {
    for (let i = breadcrumbs.length - 1; i >= 0; i -= 1) {
      if (breadcrumbs[i]?.href) {
        return breadcrumbs[i];
      }
    }
    return null;
  })();
  const ratingValue = Number(
    product?.review_stats?.average ?? product?.rating ?? 0,
  );
  const ratingCount = Number(
    product?.review_stats?.count ?? product?.rating_count ?? 0,
  );

  const handleAddToCart = async (productId) => {
    if (!productId || addingItemId === productId) return;
    setAddingItemId(productId);
    try {
      await addToCart(productId, 1);
    } catch (error) {
      console.error("Failed to add item to cart", error);
    } finally {
      setAddingItemId(null);
    }
  };
  const ratingText = ratingValue ? ratingValue.toFixed(1) : "0";
  const reviewHref = product?.reviews_href || "#";
  const article = product?.article || "";
  const code = product?.code || "";
  const codeText = code ? `'${code}'` : "''";
  const productTitle = product?.name || "";
  const priceValue = Number(product?.price ?? 0);
  const retailValue = Number(product?.retail_price ?? 0);
  const hasDiscount = retailValue > priceValue && priceValue > 0;
  const formattedPrice =
    priceValue > 0 ? priceValue.toLocaleString("ru-RU") : "";
  const formattedRetail =
    retailValue > 0 ? retailValue.toLocaleString("ru-RU") : "";
  const toAbsoluteUrl = (url) => {
    if (!url) {
      return "";
    }
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    if (url.startsWith("//")) {
      return url;
    }
    return `${API_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const productImages = (() => {
    if (!product) {
      return [];
    }
    const list = Array.isArray(product.images) ? product.images : [];
    const mapped = list
      .map((image) => ({
        id: image.id,
        url: toAbsoluteUrl(image.url),
        alt: image.alt || productTitle,
        isMain: Boolean(image.is_main),
      }))
      .filter((image) => Boolean(image.url));
    if (!mapped.length && product.image) {
      mapped.push({
        id: "main",
        url: toAbsoluteUrl(product.image),
        alt: productTitle,
        isMain: true,
      });
    }
    mapped.sort((a, b) => Number(b.isMain) - Number(a.isMain));
    return mapped;
  })();
  const brandLogoUrl = toAbsoluteUrl(product?.brand?.logo);
  const attributeLimit = product?.brand ? 7 : 8;
  const visibleAttributes = (product?.attributes || []).slice(
    0,
    attributeLimit,
  );
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [zoomedIndex, setZoomedIndex] = useState(null);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const renderSimilarRating = (value) => {
    const safeValue = Number.isFinite(value) ? value : 0;
    const fullStars = Math.floor(safeValue);
    const displayValue = safeValue ? safeValue.toFixed(1) : "0";

    return (
      <div className="a-rating">
        <ul className="a-rating__list">
          {[...Array(5)].map((_, index) => (
            <li
              key={index}
              className={[
                "a-rating__item",
                index < fullStars ? "a-rating__item--active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <svg className="a-svg a-rating__icon a-rating__icon--inactive a-rating__icon--color-grey">
                <use
                  xlinkHref="#icon-star"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                />
              </svg>
              {index < fullStars && (
                <svg className="a-svg a-rating__icon a-rating__icon--active a-rating__icon--color-orange">
                  <use
                    xlinkHref="#icon-star"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  />
                </svg>
              )}
            </li>
          ))}
        </ul>
        <div className="a-rating__count">{displayValue}</div>
      </div>
    );
  };

  return (
    <main className="a-page-static__description a-page-static__description--new">
      <div className="a-page-detail__container a-page-detail__container--navigation-helpers">
        <Breadcrumbs
          items={breadcrumbs}
          className="a-page-detail__breadcrumbs"
        />
        {backItem ? (
          <div className="a-back a-page-detail__back">
            <a href={backItem.href} className="a-back__link">
              <svg className="a-svg a-back__icon">
                <use
                  xlinkHref="#icon-old-arrow"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                />
              </svg>
              <span className="a-back__text">{backItem.label}</span>
            </a>
          </div>
        ) : null}
      </div>
      <div className="a-page-detail__container">
        <section className="a-page-detail__main">
          <div className="a-page-detail__name">
            <h1 className="a-page-detail__title">{productTitle}</h1>
            <div className="a-page-detail__vendor-code">
              <div>
                Артикул:
                <span className="a-page-detail__vendor-code-value">
                  {article}
                </span>
              </div>
              <div className="a-copy-button">
                <button
                  aria-label=""
                  className="a-link-button"
                  title=""
                  type="button"
                >
                  <span className="a-link-button__icon a-link-button__icon--black">
                    <svg className="a-svg a-svg--medium">
                      <use
                        xlinkHref="#icon-control-copy"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      />
                    </svg>
                  </span>
                  <span className="a-link-button__content a-link-button__content--black" />
                </button>
              </div>
            </div>
            <div className="a-page-detail__vendor-code">
              <div
                className="seo-text"
                style={{
                  "--seo-text": "'Код: '",
                }}
              />
              <span
                className="seo-text a-page-detail__vendor-code-value"
                style={{
                  "--seo-text": codeText,
                }}
              />
            </div>
            <a
              className="a-link-button a-page-detail__reviews"
              href={reviewHref}
            >
              <span className="a-link-button__content a-link-button__content--black">
                <div className="a-rating">
                  <ul className="a-rating__list">
                    {Array.from({ length: 5 }, (_, index) => {
                      const isActive = index < Math.round(ratingValue);
                      return (
                        <li
                          key={index}
                          className={[
                            "a-rating__item",
                            isActive ? "a-rating__item--active" : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        >
                          <svg className="a-svg a-rating__icon a-rating__icon--inactive a-rating__icon--color-grey">
                            <use
                              xlinkHref="#icon-star"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                            />
                          </svg>
                          <svg className="a-svg a-rating__icon a-rating__icon--active a-rating__icon--color-orange">
                            <use
                              xlinkHref="#icon-star"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                            />
                          </svg>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="a-rating__count">{ratingText}</div>
                </div>
                <div className="a-comment">
                  <svg className="a-svg a-comment__icon a-comment__icon--color-grey">
                    <use
                      xlinkHref="#icon-comment"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    />
                  </svg>
                  <div className="a-comment__count">{ratingCount}</div>
                </div>
              </span>
            </a>
          </div>
          <div className="a-page-detail__detail">
            <div className="a-page-detail__detail-top">
              <div className="a-page-detail__gallery">
                <div className="a-gallery-carousel">
                  <div className="a-gallery-carousel__gallery">
                    <Swiper
                      modules={[Navigation, Thumbs]}
                      className="a-gallery-carousel__container"
                      navigation={{
                        prevEl: ".a-gallery-carousel__button--prev",
                        nextEl: ".a-gallery-carousel__button--next",
                      }}
                      thumbs={{
                        swiper:
                          thumbsSwiper && !thumbsSwiper.destroyed
                            ? thumbsSwiper
                            : null,
                      }}
                      slidesPerView={1}
                    >
                      {productImages.map((image, index) => (
                        <SwiperSlide
                          key={image.id || `${image.url}-${index}`}
                          className="a-gallery-carousel__slide"
                        >
                          <div className="a-gallery-carousel__card">
                            <div
                              className="a-picture-zoom-card"
                              title={productTitle}
                              onMouseEnter={() => setZoomedIndex(index)}
                              onMouseLeave={() => setZoomedIndex(null)}
                              onMouseMove={(event) => {
                                const rect =
                                  event.currentTarget.getBoundingClientRect();
                                const x =
                                  ((event.clientX - rect.left) / rect.width) *
                                  100;
                                const y =
                                  ((event.clientY - rect.top) / rect.height) *
                                  100;
                                setZoomPosition({
                                  x: Math.max(0, Math.min(100, x)),
                                  y: Math.max(0, Math.min(100, y)),
                                });
                              }}
                            >
                              <img
                                alt={image.alt || productTitle}
                                className="a-picture-zoom-card__picture a-lazy-load a-is-loaded"
                                style={{
                                  transform:
                                    zoomedIndex === index
                                      ? "scale(1.6)"
                                      : "scale(1)",
                                  transformOrigin:
                                    zoomedIndex === index
                                      ? `${zoomPosition.x}% ${zoomPosition.y}%`
                                      : "50% 50%",
                                  transition: "transform 200ms ease",
                                }}
                                src={image.url}
                              />
                              <span />
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <div className="a-gallery-carousel__navigation">
                      <button
                        className="a-gallery-carousel__button a-gallery-carousel__button--prev swiper-button-prev"
                        type="button"
                      >
                        <svg className="a-svg">
                          <use
                            xlinkHref="#icon-chevron-left"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                          />
                        </svg>
                      </button>
                      <button
                        className="a-gallery-carousel__button a-gallery-carousel__button--next swiper-button-next"
                        type="button"
                      >
                        <svg className="a-svg">
                          <use
                            xlinkHref="#icon-chevron-right"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="a-gallery-carousel__watermark">
                      <div className="a-page-detail__recommend-mark">
                        <svg className="a-svg">
                          <use
                            xlinkHref="#icon-bigam-sign-full"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="a-gallery-carousel__stereographic" />
                  </div>
                  <div className="a-gallery-carousel__thumbs">
                    <Swiper
                      modules={[Thumbs]}
                      onSwiper={setThumbsSwiper}
                      watchSlidesProgress
                      slidesPerView="auto"
                      className="a-gallery-carousel__container"
                    >
                      {productImages.map((image, index) => (
                        <SwiperSlide
                          key={image.id || `thumb-${image.url}-${index}`}
                          className="a-gallery-carousel__slide"
                        >
                          <div className="a-gallery-carousel__card">
                            <div
                              className="a-picture-card"
                              full={image.url}
                              title={productTitle}
                            >
                              <img
                                alt={image.alt || productTitle}
                                className="a-picture-card__picture a-lazy-load a-is-loaded"
                                src={image.url}
                              />
                              <span />
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>
              <section className="a-page-detail__features">
                <h2 className="a-page-detail__title">Характеристики</h2>
                <table className="a-page-detail__parameters a-parameters">
                  <tbody>
                    {product?.brand ? (
                      <tr className="a-parameters__item">
                        <td className="a-parameters__name">
                          <div className="a-parameters__name-wrap">
                            <div className="a-parameters__name-text">
                              Производитель
                            </div>
                          </div>
                        </td>
                        <td className="a-parameters__value">
                          <a
                            className="a-parameters__manufacturer"
                            href={product.brand.href}
                          >
                            {brandLogoUrl ? (
                              <>
                                <img
                                  alt={product.brand.name}
                                  className="a-lazy-load a-is-loaded"
                                  src={brandLogoUrl}
                                  title={product.brand.name}
                                />
                                <span />
                              </>
                            ) : (
                              product.brand.name
                            )}
                          </a>
                        </td>
                      </tr>
                    ) : null}
                    {visibleAttributes.map((attribute) => (
                      <tr className="a-parameters__item" key={attribute.id}>
                        <td className="a-parameters__name">
                          <div className="a-parameters__name-wrap">
                            <div className="a-parameters__name-text">
                              {attribute.name}
                            </div>
                          </div>
                        </td>
                        <td className="a-parameters__value">
                          {attribute.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="a-page-detail__full-features-anchor">
                  <a
                    className="a-link a-link--blue"
                    href="#specification"
                    onClick={(event) => {
                      event.preventDefault();
                      if (typeof window !== "undefined") {
                        window.location.hash = "specification";
                        const tabsElement = document.getElementById("tabs");
                        if (tabsElement) {
                          tabsElement.scrollIntoView({ behavior: "smooth" });
                        }
                      }
                    }}
                  >
                    Все характеристики
                  </a>
                </div>
              </section>
            </div>
            <div className="a-spoiler a-page-detail__spoiler--small a-spoiler--open">
              <div className="a-spoiler__content">
                <div className="a-page-detail__autotext">
                  Набор инструмента универсальный Ombra OMT57S, 57 предметов и
                  другие оригинальные товары в категории наборы автоинструмента
                  доступны на сайте интернет-магазина BREMAX в Москве по
                  специальной цене 5790 рублей. Перед покупкой данной модели
                  бренда Ombra рекомендуем посмотреть особенности, технические
                  параметры, документацию и сертификаты на продукцию. Также
                  предлагаем сравнить товар набор инструмента универсальный
                  Ombra OMT57S, 57 предметов с ассортиментом модификаций и
                  аналогов из категории
                  <a href="/brands/ombra/nabory-avtoinstrumenta-7357/">
                    наборы автоинструмента Ombra
                  </a>
                  .
                </div>
              </div>
              <div
                className="a-spoiler__buttons"
                style={{
                  display: "none",
                }}
              >
                <button
                  className="a-spoiler__button a-spoiler__button--open a-link a-link--grey"
                  style={{
                    "--spoiler-open-text": "'Читать полностью'",
                  }}
                  type="button"
                />
                <button
                  className="a-spoiler__button a-spoiler__button--close a-link a-link--grey"
                  type="button"
                >
                  Скрыть
                </button>
              </div>
            </div>
          </div>
          <div className="a-page-detail__sidebar">
            <div className="a-page-detail__helpers">
              <div className="a-main-compare a-main-compare--type-horizontal">
                <div
                  className="tooltip-main a-main-compare__tooltip tooltip-main--position-left"
                  color="white"
                >
                  <div className="tooltip-main__content">
                    <a className="a-link-button" href="/personal/compare/">
                      <span className="a-link-button__content a-link-button__content--black" />
                    </a>
                  </div>
                </div>
                <button
                  className="a-main-compare__helper"
                  title="В сравнение"
                  type="button"
                >
                  <span className="a-main-compare__icon">
                    <svg className="a-svg">
                      <use
                        xlinkHref="#icon-comparison-stroke"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      />
                    </svg>
                    <svg className="a-svg">
                      <use
                        xlinkHref="#icon-comparison-solid"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      />
                    </svg>
                  </span>
                  <span className="a-main-compare__title a-main-compare__title--to-compare" />
                </button>
              </div>
              <div className="a-main-like a-main-like--type-horizontal">
                <div
                  className="tooltip-main a-main-like__tooltip tooltip-main--position-left"
                  color="white"
                >
                  <div className="tooltip-main__content">
                    <a className="a-link-button" href="/personal/favorites/">
                      <span className="a-link-button__content a-link-button__content--black" />
                    </a>
                  </div>
                </div>
                <button
                  className="a-main-like__helper"
                  title="В избранное"
                  type="button"
                >
                  <span className="a-main-like__icon">
                    <svg className="a-svg">
                      <use
                        xlinkHref="#icon-favorite-stroke"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      />
                    </svg>
                    <svg className="a-svg">
                      <use
                        xlinkHref="#icon-favorite-solid"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      />
                    </svg>
                  </span>
                  <span className="a-main-like__title a-main-like__title--to-favorite" />
                </button>
              </div>
            </div>
            <div
              className="a-page-detail__sidebar-cart a-page-detail--desktop"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div className="a-sidebar">
                <section className="a-sidebar__section a-sidebar__section--main">
                  <div className="a-sidebar__container">
                    <ul className="a-sidebar__badges a-page-detail__badges">
                      <li className="a-page-detail__badge a-badge a-badge--none">
                        <yandex-pay-badge
                          align="left"
                          amount={priceValue ? priceValue.toFixed(2) : "0.00"}
                          merchant-id="8179d1ae-c054-4da1-92db-f3dabfa804ff"
                          size="m"
                          sku-id={product?.id || ""}
                          source="cart"
                          theme="light"
                          type="ultimate"
                          variant="default"
                        />
                      </li>
                    </ul>
                    <div className="a-sidebar__price">
                      <div className="a-price a-sidebar__price-wrap">
                        {hasDiscount ? (
                          <>
                            <div className="a-price__new">
                              {formattedPrice} ₽
                            </div>
                            <div className="a-price__old">
                              {formattedRetail} ₽
                            </div>
                          </>
                        ) : (
                          <div className="a-price__current">
                            {formattedPrice} ₽
                          </div>
                        )}
                      </div>
                      <div className="a-sidebar__price-measure">за штуку</div>
                      <div className="a-sidebar__price-notice">
                        <div className="a-sidebar__price-site">
                          цена при
                          <div
                            className="a-tooltip a-sidebar__tooltip"
                            tabIndex="0"
                          >
                            <div className="a-link a-link--blue">
                              заказе на сайте
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="a-sidebar__buttons" data-sticky-in-cart="">
                      <button
                        className="a-main-button a-main-button--display-block a-main-button--type-medium a-main-button--corner-round a-main-button--color-orange"
                        type="button"
                        onClick={() => handleAddToCart(product?.id)}
                        disabled={addingItemId === product?.id}
                      >
                        <span className="a-main-button__wrap">
                          <span className="a-main-button__content">
                            В корзину
                          </span>
                        </span>
                      </button>
                      <button
                        className="a-main-button a-main-button--display-block a-main-button--type-medium a-main-button--corner-round a-main-button--color-light-orange"
                        type="button"
                      >
                        <span className="a-main-button__wrap">
                          <span className="a-main-button__content">
                            Заказ в 1 клик
                          </span>
                        </span>
                      </button>
                    </div>
                    <div className="a-sidebar__offer-buy-as-b2b">
                      <button
                        aria-label="Заказать как юр. лицо"
                        className="a-link-button"
                        title="Заказать как юр. лицо"
                        type="button"
                      >
                        <span className="a-link-button__icon a-link-button__icon--blue">
                          <svg className="a-svg a-svg--medium">
                            <use
                              xlinkHref="#icon-section-briefcase-stroke"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                            />
                          </svg>
                        </span>
                        <span className="a-link-button__content a-link-button__content--blue a-link-button__content--underline a-link-button__content--underline-dashed">
                          Заказать как юр. лицо
                        </span>
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>

        <ProductTabs
          descriptionHtml={
            product?.description_full || product?.description || ""
          }
          attributes={product?.attributes || []}
          complectationItems={product?.complectation_items || []}
          documents={product?.documents || product?.files || []}
          documentsAutoText={
            product?.documents_auto_text || product?.documentsAutoText || ""
          }
          reviews={product?.reviews || []}
          reviewStats={product?.review_stats || null}
          ratingValue={ratingValue}
          ratingCount={ratingCount}
          productId={product?.id || null}
          productTitle={productTitle}
          brand={product?.brand || null}
        />

        <section className="a-page-detail__similar-products">
          <div className="a-page-detail__similar-products-title">
            Похожие товары
          </div>{" "}
          <div className="a-card-carousel a-card-carousel--type-product-vertical">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={24}
              slidesPerView="auto"
              navigation={{
                prevEl: ".a-card-carousel__button--prev",
                nextEl: ".a-card-carousel__button--next",
              }}
              pagination={{
                el: ".a-card-carousel__pagination",
                type: "custom",
                renderCustom: (swiper, current, total) => {
                  return `
                    <div class="a-card-carousel__bullet">
                      <div class="a-card-carousel__bullet-current">${String(current).padStart(2, "0")}</div>
                      <div class="a-card-carousel__bullet-count">${String(total).padStart(2, "0")}</div>
                    </div>
                  `;
                },
              }}
              className="a-card-carousel__container"
            >
              {similarProducts.map((item, index) => {
                const title = item?.name || item?.title || item?.slug || "";
                const slug = item?.slug;
                const href = item?.href || (slug ? `/product/${slug}/` : "#");
                const images = Array.isArray(item?.images) ? item.images : [];
                const mainImage =
                  images.find((image) => image?.is_main) || images[0];
                const imageUrl = toAbsoluteUrl(item?.image || mainImage?.url);
                const price = Number(item?.price ?? 0);
                const retailPrice = Number(item?.retail_price ?? 0);
                const hasSimilarDiscount = retailPrice > price && price > 0;
                const formattedSimilarPrice =
                  price > 0 ? price.toLocaleString("ru-RU") : null;
                const formattedSimilarRetail = hasSimilarDiscount
                  ? retailPrice.toLocaleString("ru-RU")
                  : null;
                const similarRating = Number(
                  item?.review_stats?.average ?? item?.rating ?? 0,
                );

                return (
                  <SwiperSlide
                    key={item?.id || `${item?.slug}-${index}`}
                    className="a-card-carousel__slide"
                  >
                    <div className="a-card-carousel__card">
                      <div className="a-product-card a-product-card--type-vertical-vertical">
                        <a className="a-product-card__preview" href={href}>
                          {imageUrl && (
                            <img
                              alt={title}
                              className="a-product-card__picture a-lazy-load a-is-loaded"
                              src={imageUrl}
                              title={title}
                            />
                          )}
                          <span />
                        </a>
                        <div className="a-product-card__description">
                          <div className="a-product-card__price">
                            <div className="a-price">
                              {formattedSimilarPrice ? (
                                <>
                                  <div className="a-price__current">
                                    {formattedSimilarPrice} ₽
                                  </div>
                                  {formattedSimilarRetail && (
                                    <div className="a-price__old">
                                      {formattedSimilarRetail} ₽
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="a-price__current">
                                  Цена по запросу
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="a-product-card__status">
                            {renderSimilarRating(similarRating)}
                          </div>
                          <div className="a-product-card__title">
                            <a className="" href={href} title={title}>
                              {title}
                            </a>
                          </div>
                        </div>
                        <div className="a-product-card__helpers">
                          <div className="a-main-compare a-main-compare--type-vertical-vertical">
                            <div
                              className="tooltip-main a-main-compare__tooltip tooltip-main--position-left"
                              color="white"
                            >
                              <div className="tooltip-main__content">
                                <a
                                  className="a-link-button"
                                  href="/personal/compare/"
                                >
                                  <span className="a-link-button__content a-link-button__content--black" />
                                </a>
                              </div>
                            </div>
                            <button
                              className="a-main-compare__helper"
                              title="В сравнение"
                              type="button"
                            >
                              <span className="a-main-compare__icon">
                                <svg className="a-svg">
                                  <use
                                    xlinkHref="#icon-comparison-stroke"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                  />
                                </svg>
                                <svg className="a-svg">
                                  <use
                                    xlinkHref="#icon-comparison-solid"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                  />
                                </svg>
                              </span>
                              <span className="a-main-compare__title a-main-compare__title--to-compare" />
                            </button>
                          </div>
                          <div className="a-main-like a-main-like--type-vertical-vertical">
                            <div
                              className="tooltip-main a-main-like__tooltip tooltip-main--position-left"
                              color="white"
                            >
                              <div className="tooltip-main__content">
                                <a
                                  className="a-link-button"
                                  href="/personal/favorites/"
                                >
                                  <span className="a-link-button__content a-link-button__content--black" />
                                </a>
                              </div>
                            </div>
                            <button
                              className="a-main-like__helper"
                              title="В избранное"
                              type="button"
                            >
                              <span className="a-main-like__icon">
                                <svg className="a-svg">
                                  <use
                                    xlinkHref="#icon-favorite-stroke"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                  />
                                </svg>
                                <svg className="a-svg">
                                  <use
                                    xlinkHref="#icon-favorite-solid"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                  />
                                </svg>
                              </span>
                              <span className="a-main-like__title a-main-like__title--to-favorite" />
                            </button>
                          </div>
                        </div>
                        <div className="a-product-card__buttons">
                          <button
                            className="a-main-button a-product-card__add a-main-button--display-inline a-main-button--type-auto a-main-button--corner-round a-main-button--color-orange"
                            type="button"
                            onClick={() => handleAddToCart(item?.id)}
                            disabled={addingItemId === item?.id}
                          >
                            <span className="a-main-button__wrap">
                              <span className="a-main-button__content">
                                В корзину
                              </span>
                            </span>
                          </button>
                          <div className="a-product-card__mini-add">
                            <button
                              className="a-main-button a-main-button--display-inline a-main-button--type-auto a-main-button--corner-round a-main-button--color-orange"
                              type="button"
                              onClick={() => handleAddToCart(item?.id)}
                              disabled={addingItemId === item?.id}
                            >
                              <span className="a-main-button__constrain">
                                <svg className="a-svg a-main-button__icon a-main-button__icon--center a-svg--medium a-main-button__icon--icon-cart-stroke a-main-button__icon--color">
                                  <use
                                    xlinkHref="#icon-cart-stroke"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                  />
                                </svg>
                              </span>
                            </button>
                          </div>
                        </div>
                        <a className="a-product-card__link" href={href} />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>{" "}
            <div className="a-card-carousel__navigation">
              <button
                className="a-card-carousel__button a-card-carousel__button--prev swiper-button-prev"
                type="button"
              >
                <svg className="a-svg">
                  <use
                    xlinkHref="#icon-chevron-left"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  />
                </svg>
              </button>{" "}
              <div className="a-card-carousel__pagination swiper-pagination swiper-pagination-custom">
                <div className="a-card-carousel__bullet">
                  <div className="a-card-carousel__bullet-current">03</div>
                  <div className="a-card-carousel__bullet-count">00</div>
                </div>
              </div>{" "}
              <button
                className="a-card-carousel__button a-card-carousel__button--next swiper-button-next"
                type="button"
              >
                <svg className="a-svg">
                  <use
                    xlinkHref="#icon-chevron-right"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
