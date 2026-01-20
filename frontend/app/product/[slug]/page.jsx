"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import Breadcrumbs from "../../components/Breadcrumbs";
import { API_BASE_URL } from "../../../config/api";

export default function CatalogSlugPage({ params }) {
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [product, setProduct] = useState(null);

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

  const backItem = (() => {
    for (let i = breadcrumbs.length - 1; i >= 0; i -= 1) {
      if (breadcrumbs[i]?.href) {
        return breadcrumbs[i];
      }
    }
    return null;
  })();
  const ratingValue = Number(product?.rating ?? 0);
  const ratingCount = Number(product?.rating_count ?? 0);
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
                    href={
                      product?.href
                        ? `${product.href}specification/`
                        : "/catalog/"
                    }
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
                  доступны на сайте интернет-магазина Бигам в Москве по
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
                <section className="a-sidebar__section--parts">
                  <div className="a-pay-parts a-pay-parts-sidebar">
                    <div className="a-pay-parts__header">
                      <svg className="a-svg a-pay-parts__header-logo">
                        <use
                          xlinkHref="#icon-plait"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        />
                      </svg>
                      <button
                        aria-label=""
                        className="a-link-button a-pay-parts__header-info"
                        title=""
                        type="button"
                      >
                        <span className="a-link-button__icon a-link-button__icon--black">
                          <svg className="a-svg a-svg--medium">
                            <use
                              xlinkHref="#icon-info"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                            />
                          </svg>
                        </span>
                        <span className="a-link-button__content a-link-button__content--black" />
                      </button>
                    </div>
                    <div className="a-pay-parts__header-bottom">
                      <span className="a-pay-parts__description-head">
                        Рассрочка без переплат
                      </span>
                    </div>
                    <div className="a-pay-parts__parts">
                      <div className="a-pay-parts__parts-part a-pay-parts__parts-part--active">
                        <div className="a-pay-parts__parts-line" />
                        <div className="a-pay-parts__parts-date">Сегодня</div>
                        <div className="a-pay-parts__parts-sum">1 448 ₽</div>
                      </div>
                      <div className="a-pay-parts__parts-part">
                        <div className="a-pay-parts__parts-line" />
                        <div className="a-pay-parts__parts-date">03 фев</div>
                        <div className="a-pay-parts__parts-sum">1 448 ₽</div>
                      </div>
                      <div className="a-pay-parts__parts-part">
                        <div className="a-pay-parts__parts-line" />
                        <div className="a-pay-parts__parts-date">17 фев</div>
                        <div className="a-pay-parts__parts-sum">1 447 ₽</div>
                      </div>
                      <div className="a-pay-parts__parts-part">
                        <div className="a-pay-parts__parts-line" />
                        <div className="a-pay-parts__parts-date">03 мар</div>
                        <div className="a-pay-parts__parts-sum">1 447 ₽</div>
                      </div>
                    </div>
                    <button
                      className="a-main-button a-main-button--display-block a-main-button--type-medium a-main-button--corner-round"
                      type="button"
                    >
                      <span className="a-main-button__wrap">
                        <span className="a-main-button__content">
                          Купить в рассрочку
                        </span>
                      </span>
                    </button>
                  </div>
                </section>
                <section className="a-sidebar__section a-sidebar__section--warranty">
                  <div className="a-sidebar__container">
                    <div className="a-sidebar__warranty a-sidebar__warranty--juicy">
                      <svg className="a-svg">
                        <use
                          xlinkHref="#icon-old-shield"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        />
                      </svg>
                      <span>3 года гарантии</span>
                    </div>
                  </div>
                </section>
                <section className="a-sidebar__section a-sidebar__section--delivery">
                  <div className="a-sidebar__container">
                    <ul className="a-sidebar__delivery">
                      <li className="a-sidebar__delivery-item">
                        <div className="a-diagram">
                          <div className="a-diagram__diagram a-diagram__diagram--error">
                            <svg
                              viewBox="0 0 46 16"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                            >
                              <rect
                                className="a-diagram__node a-diagram__node--critical"
                                height="9"
                                rx="2"
                                width="4"
                                y="7"
                              />
                              <rect
                                className="a-diagram__node a-diagram__node--critical"
                                height="9"
                                rx="2"
                                width="4"
                                x="6"
                                y="7"
                              />
                              <rect
                                className="a-diagram__node a-diagram__node--error"
                                height="12"
                                rx="2"
                                width="4"
                                x="12"
                                y="4"
                              />
                              <rect
                                className="a-diagram__node a-diagram__node--error"
                                height="12"
                                rx="2"
                                width="4"
                                x="18"
                                y="4"
                              />
                            </svg>
                          </div>
                          меньше 10 шт
                        </div>
                      </li>
                      <li className="a-sidebar__delivery-item">
                        <b>Забрать</b> 26 января или позже
                        <br />
                        из
                        <a
                          className="a-link a-link--blue"
                          href="/product/nabor-instrumenta-universalnyy-ombra-omt57s-57-predmetov-814964/stores/"
                        >
                          42 пунктов выдачи
                        </a>
                        ,<b>295 ₽</b>
                      </li>
                      <li className="a-sidebar__delivery-item">
                        <b>Доставка</b> 26 января или позже, <b>536 ₽</b>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
        <section
          className="a-product-tabs a-page-detail__full-features"
          id="tabs"
        >
          <div className="a-product-tabs__tabs">
            <div className="a-product-tabs__buttons">
              <button
                aria-label=""
                className="a-link-button a-product-tabs__button a-product-tabs__button--active"
                title=""
                type="button"
              >
                <span className="a-link-button__content a-link-button__content--black">
                  Описание
                </span>
              </button>
              <a
                className="a-link-button a-product-tabs__button"
                href="/product/nabor-instrumenta-universalnyy-ombra-omt57s-57-predmetov-814964/specification/"
              >
                <span className="a-link-button__content a-link-button__content--black">
                  Характеристики и комплектация
                </span>
              </a>
              <a
                className="a-link-button a-product-tabs__button"
                href="/product/nabor-instrumenta-universalnyy-ombra-omt57s-57-predmetov-814964/reviews/"
              >
                <span className="a-link-button__content a-link-button__content--black">
                  Рейтинги и отзывы
                </span>
              </a>
              <a
                className="a-link-button a-product-tabs__button"
                href="/product/nabor-instrumenta-universalnyy-ombra-omt57s-57-predmetov-814964/stores/"
              >
                <span className="a-link-button__content a-link-button__content--black">
                  Где купить
                </span>
              </a>
              <a
                className="a-link-button a-product-tabs__button"
                href="/product/nabor-instrumenta-universalnyy-ombra-omt57s-57-predmetov-814964/video/"
              >
                <span className="a-link-button__content a-link-button__content--black">
                  Статьи и обзоры
                </span>
              </a>
            </div>
          </div>
          <ul className="a-product-tabs__sections">
            <li
              className="a-product-tabs__sections-item a-product-tabs__sections-item--description a-product-tabs__sections-item--active"
              id="description"
            >
              <section className="a-product-tabs__section">
                <div className="a-product-tabs__column a-product-tabs__column--description">
                  <section className="a-page-detail__description">
                    <div className="a-spoiler a-title-indent">
                      <div className="a-spoiler__content a-spoiler--column-m">
                        <div className="a-page-detail__inner">
                          <br /> Универсальный набор инструмента Ombra OMT57S
                          1/4"DR состоит из 57 предметов, изготовленных по
                          специальной технологии Трипл Коатинг. За счет этого
                          инструменты защищены от механических и химических
                          воздействий.
                          <h3>Преимущества</h3>
                          <ul>
                            <li>
                              Все инструменты расположены в пластиковом кейсе.
                              Надежная застежка предотвращает выпадение
                              инструментов из кейса
                            </li>
                            <li>
                              Размеры инструментов универсального набора Ombra
                              OMT57S 1/4"DR подписаны - для удобства выбора
                            </li>
                            <li>Защита инструментов от коррозии</li>
                            <li>Широкий выбор головок</li>
                          </ul>
                          <h3 />
                        </div>
                      </div>
                      <div className="a-spoiler__buttons" style={{}}>
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
                  </section>
                  <div className="a-product-tabs__autotext">
                    Оформить заказ на оригинал товара набор инструмента
                    универсальный Ombra OMT57S, 57 предметов у официального
                    дилера можно онлайн или по телефону 8 (495) 287-07-27.
                    Стоимость модели 5790 ₽. Доставка изделия бренда Ombra в
                    городе Москва осуществляется курьером и транспортными
                    компаниями. Наличие, условия и сроки поставки артикула набор
                    инструмента универсальный Ombra OMT57S, 57 предметов, а
                    также аксессуаров и расходных материалов Омбра в другие
                    регионы России уточняйте у менеджеров по номеру 8 (495)
                    152-56-79.
                  </div>
                </div>
              </section>
            </li>
            <li
              className="a-product-tabs__sections-item a-product-tabs__sections-item--specification"
              id="specification"
            >
              <section className="a-product-tabs__section" />
            </li>
            <li
              className="a-product-tabs__sections-item a-product-tabs__sections-item--reviews"
              id="reviews"
            >
              <section className="a-product-tabs__section" />
            </li>
            <li
              className="a-product-tabs__sections-item a-product-tabs__sections-item--stores"
              id="stores"
            >
              <section className="a-product-tabs__section" />
            </li>
            <li
              className="a-product-tabs__sections-item a-product-tabs__sections-item--video"
              id="video"
            >
              <section className="a-product-tabs__section" />
            </li>
          </ul>
        </section>
        <section className="a-page-detail__similar-products">
          <div className="a-page-detail__similar-products-title">
            Похожие товары
          </div>
          <div className="a-card-carousel a-card-carousel--type-product-vertical">
            <div className="a-card-carousel__container swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
              <div
                className="a-card-carousel__wrapper swiper-wrapper"
                style={{
                  transform: "translate3d(-1224px, 0px, 0px)",
                  transitionDuration: "0ms",
                }}
              >
                <div
                  className="a-card-carousel__slide swiper-slide swiper-slide-duplicate"
                  data-swiper-slide-index="8"
                  style={{
                    marginRight: "24px",
                    width: "282px",
                  }}
                >
                  <div className="a-card-carousel__card">
                    <div
                      className="a-product-card a-product-card--type-vertical-vertical a-product-card--load"
                      deliveryshort=""
                      picturesslider="[object Object],[object Object],[object Object],[object Object],[object Object]"
                      shorttitle="Набор ручных инструментов Ombra OMT82S универсальный, 82 предмета"
                      vendorcode="Х1302356151"
                    >
                      <a
                        className="a-product-card__preview"
                        href="/product/nabor-instrumentov-ombra-omt82s-universalnyy-82-predmeta-521700/"
                      >
                        <img
                          alt=""
                          className="a-product-card__picture a-lazy-load"
                          data-src="https://cdn.bigam.ru/resize_cache/iblock/edf/zb3syqzobk4t2hysvu0x2z9wconf89z3/400_364_0/521700.jpg"
                          src="/images/layouts/no_picture.svg"
                          title=""
                        />
                        <span />
                        <div className="a-product-card__mark-list">
                          <div className="a-product-card__mark-item a-product-card__mark-item--color-blue">
                            <svg className="a-svg">
                              <use
                                xlinkHref="#icon-bigam-sign-solid"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                              />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="a-product-card__description">
                        <div className="a-product-card__price">
                          <div
                            afterauthorization="8499"
                            bonusdiscount="0"
                            className="a-price"
                            currentshop="8499"
                            discount="2771"
                            discountshop="2771"
                            minbonusprice="8499"
                            retail="11270"
                            showpersonalpricedifference="true"
                            showretail="true"
                          >
                            <div className="a-price__new">8 499 ₽</div>
                            <div className="a-price__old">11 270 ₽</div>
                          </div>
                        </div>
                        <div className="a-product-card__status">
                          <div className="a-rating">
                            <ul className="a-rating__list">
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                            </ul>
                            <div className="a-rating__count">4.8</div>
                          </div>
                        </div>
                        <div className="a-product-card__title">
                          <a
                            className=""
                            href="/product/nabor-instrumentov-ombra-omt82s-universalnyy-82-predmeta-521700/"
                            title=""
                          >
                            Набор ручных инструментов Ombra OMT82S универсальный
                            (82 предмета, чемодан, вес 5.8 кг)
                          </a>
                        </div>
                      </div>
                      <div className="a-product-card__badges">
                        <ul className="a-main-badge-list a-main-badge-list--load">
                          <li className="a-main-badge-list__item">
                            <div
                              className="a-main-badge-list__badge"
                              style={{
                                "--badge-title": "'-2 771 ₽'",
                                backgroundColor: "rgb(243, 86, 67)",
                              }}
                            />
                          </li>
                        </ul>
                      </div>
                      <div className="a-product-card__buttons">
                        <button
                          className="a-main-button a-product-card__add a-main-button--load a-main-button--display-inline a-main-button--type-auto a-main-button--corner-round a-main-button--color-orange"
                          type="button"
                        >
                          <span className="a-main-button__wrap">
                            <span className="a-main-button__content">
                              В корзину
                            </span>
                          </span>
                        </button>
                        <div className="a-product-card__mini-add">
                          <button
                            className="a-main-button a-main-button--load a-main-button--display-inline a-main-button--type-auto a-main-button--corner-round a-main-button--color-orange"
                            type="button"
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
                      <a
                        className="a-product-card__link"
                        href="/product/nabor-instrumentov-ombra-omt82s-universalnyy-82-predmeta-521700/"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="a-card-carousel__slide swiper-slide swiper-slide-duplicate"
                  data-swiper-slide-index="9"
                  style={{
                    marginRight: "24px",
                    width: "282px",
                  }}
                >
                  <div className="a-card-carousel__card">
                    <div
                      className="a-product-card a-product-card--type-vertical-vertical a-product-card--load"
                      deliveryshort=""
                      picturesslider="[object Object],[object Object],[object Object],[object Object],[object Object]"
                      shorttitle='Набор инструмента Ombra OMT55S, 4-32мм 1/4" и 1/2"DR '
                      vendorcode="О00000018494"
                    >
                      <a
                        className="a-product-card__preview"
                        href="/product/ombra-nabor-instrumenta-4-32mm-1-4-i-1-2-dr-omt55s-1762765/"
                      >
                        <img
                          alt=""
                          className="a-product-card__picture a-lazy-load"
                          data-src="https://cdn.bigam.ru/resize_cache/iblock/6ff/lfx1y1la4ssixl7k27ewi673tomd2c7g/400_364_0/1762765.jpg"
                          src="/images/layouts/no_picture.svg"
                          title=""
                        />
                        <span />
                      </a>
                      <div className="a-product-card__description">
                        <div className="a-product-card__price">
                          <div
                            afterauthorization="15790"
                            bonusdiscount="0"
                            className="a-price"
                            currentshop="15790"
                            discount="1997"
                            discountshop="1997"
                            minbonusprice="13691"
                            retail="17787"
                            showpersonalpricedifference="true"
                            showretail="true"
                          >
                            <div className="a-price__new">15 790 ₽</div>
                            <div className="a-price__old">17 787 ₽</div>
                          </div>
                        </div>
                        <div className="a-product-card__status">
                          <div className="a-rating">
                            <ul className="a-rating__list">
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item">
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
                            </ul>
                            <div className="a-rating__count">4.0</div>
                          </div>
                        </div>
                        <div className="a-product-card__title">
                          <a
                            className=""
                            href="/product/ombra-nabor-instrumenta-4-32mm-1-4-i-1-2-dr-omt55s-1762765/"
                            title=""
                          >
                            Набор инструмента Ombra OMT55S, 4-32мм 1/4" и 1/2"DR
                          </a>
                        </div>
                      </div>
                      <div className="a-product-card__badges">
                        <ul className="a-main-badge-list a-main-badge-list--load">
                          <li className="a-main-badge-list__item">
                            <div
                              className="a-main-badge-list__badge"
                              style={{
                                "--badge-title": "'-1 997 ₽'",
                                backgroundColor: "rgb(243, 86, 67)",
                              }}
                            />
                          </li>
                        </ul>
                      </div>
                      <div className="a-product-card__buttons">
                        <button
                          className="a-main-button a-product-card__add a-main-button--load a-main-button--display-inline a-main-button--type-auto a-main-button--corner-round a-main-button--color-orange"
                          type="button"
                        >
                          <span className="a-main-button__wrap">
                            <span className="a-main-button__content">
                              В корзину
                            </span>
                          </span>
                        </button>
                        <div className="a-product-card__mini-add">
                          <button
                            className="a-main-button a-main-button--load a-main-button--display-inline a-main-button--type-auto a-main-button--corner-round a-main-button--color-orange"
                            type="button"
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
                      <a
                        className="a-product-card__link"
                        href="/product/ombra-nabor-instrumenta-4-32mm-1-4-i-1-2-dr-omt55s-1762765/"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="a-card-carousel__slide swiper-slide swiper-slide-duplicate"
                  data-swiper-slide-index="10"
                  style={{
                    marginRight: "24px",
                    width: "282px",
                  }}
                >
                  <div className="a-card-carousel__card">
                    <div
                      className="a-product-card a-product-card--type-vertical-vertical a-product-card--load"
                      deliveryshort=""
                      picturesslider="[object Object],[object Object],[object Object]"
                      shorttitle="Набор головок торцевых с аксессуарами Ombra 911423, 1/4 DR, 4-13мм, 23пр. "
                      vendorcode="О00000043236"
                    >
                      <a
                        className="a-product-card__preview"
                        href="/product/jonnesway-nabor-golovok-torcevyh-s-aksessuarami-1-4-dr-4-13mm-23pr-911423-1762947/"
                      >
                        <img
                          alt=""
                          className="a-product-card__picture a-lazy-load"
                          data-src="https://cdn.bigam.ru/resize_cache/iblock/0fc/hmk8ujaockopc38ziyapgvbt8e4qbs28/400_364_0/1762947.jpg"
                          src="/images/layouts/no_picture.svg"
                          title=""
                        />
                        <span />
                      </a>
                      <div className="a-product-card__description">
                        <div className="a-product-card__price">
                          <div
                            afterauthorization="4684"
                            bonusdiscount="0"
                            className="a-price"
                            currentshop="4684"
                            discount="416"
                            discountshop="416"
                            minbonusprice="3709"
                            retail="5100"
                            showpersonalpricedifference="true"
                            showretail="true"
                          >
                            <div className="a-price__new">4 684 ₽</div>
                            <div className="a-price__old">5 100 ₽</div>
                          </div>
                        </div>
                        <div className="a-product-card__status">
                          <div className="a-rating">
                            <ul className="a-rating__list">
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item">
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
                            </ul>
                            <div className="a-rating__count">4.0</div>
                          </div>
                        </div>
                        <div className="a-product-card__title">
                          <a
                            className=""
                            href="/product/jonnesway-nabor-golovok-torcevyh-s-aksessuarami-1-4-dr-4-13mm-23pr-911423-1762947/"
                            title=""
                          >
                            Набор головок торцевых с аксессуарами Ombra 911423,
                            1/4 DR, 4-13мм, 23пр.
                          </a>
                        </div>
                      </div>
                      <div className="a-product-card__badges">
                        <ul className="a-main-badge-list a-main-badge-list--load">
                          <li className="a-main-badge-list__item">
                            <div
                              className="a-main-badge-list__badge"
                              style={{
                                "--badge-title": "'-416 ₽'",
                                backgroundColor: "rgb(243, 86, 67)",
                              }}
                            />
                          </li>
                        </ul>
                      </div>
                      <div className="a-product-card__buttons">
                        <button
                          className="a-main-button a-product-card__add a-main-button--load a-main-button--display-inline a-main-button--type-auto a-main-button--corner-round a-main-button--color-orange"
                          type="button"
                        >
                          <span className="a-main-button__wrap">
                            <span className="a-main-button__content">
                              В корзину
                            </span>
                          </span>
                        </button>
                        <div className="a-product-card__mini-add">
                          <button
                            className="a-main-button a-main-button--load a-main-button--display-inline a-main-button--type-auto a-main-button--corner-round a-main-button--color-orange"
                            type="button"
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
                      <a
                        className="a-product-card__link"
                        href="/product/jonnesway-nabor-golovok-torcevyh-s-aksessuarami-1-4-dr-4-13mm-23pr-911423-1762947/"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="a-card-carousel__slide swiper-slide swiper-slide-duplicate swiper-slide-prev"
                  data-swiper-slide-index="11"
                  style={{
                    marginRight: "24px",
                    width: "282px",
                  }}
                >
                  <div className="a-card-carousel__card">
                    <div
                      className="a-product-card a-product-card--type-vertical-vertical a-product-card--load a-product-card--not-available"
                      deliveryshort=""
                      picturesslider="[object Object],[object Object],[object Object],[object Object]"
                      shorttitle="Набор инструмента универсальный Ombra OMT77S12, 77 предметов"
                      vendorcode="Х1302356141"
                    >
                      <a
                        className="a-product-card__preview"
                        href="/product/ombra-omt77s12-nabor-instrumenta-universalnyi-77-predmetov-1763461/"
                      >
                        <img
                          alt=""
                          className="a-product-card__picture a-lazy-load"
                          data-src="https://cdn.bigam.ru/resize_cache/iblock/fcf/mvzor3j3ecb53l4p6ye6n871r5tqiund/400_364_0/1763461.jpg"
                          src="/images/layouts/no_picture.svg"
                          title=""
                        />
                        <span />
                      </a>
                      <div className="a-product-card__description">
                        <div className="a-product-card__not-available" />
                        <div className="a-product-card__status">
                          <div className="a-rating">
                            <ul className="a-rating__list">
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item">
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
                            </ul>
                            <div className="a-rating__count">4.3</div>
                          </div>
                        </div>
                        <div className="a-product-card__title">
                          <a
                            className=""
                            href="/product/ombra-omt77s12-nabor-instrumenta-universalnyi-77-predmetov-1763461/"
                            title=""
                          >
                            Набор инструмента универсальный Ombra OMT77S12, 77
                            предметов
                          </a>
                        </div>
                      </div>
                      <div className="a-product-card__buttons">
                        <a
                          className="a-main-button a-product-card__show a-main-button--load a-main-button--display-inline a-main-button--type-auto a-main-button--corner-round a-main-button--color-light-space"
                          href="/product/ombra-omt77s12-nabor-instrumenta-universalnyi-77-predmetov-1763461/"
                        />
                      </div>
                      <a
                        className="a-product-card__link"
                        href="/product/ombra-omt77s12-nabor-instrumenta-universalnyi-77-predmetov-1763461/"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="a-card-carousel__slide swiper-slide swiper-slide-active"
                  data-swiper-slide-index="0"
                  style={{
                    marginRight: "24px",
                    width: "282px",
                  }}
                >
                  <div className="a-card-carousel__card">
                    <div
                      className="a-product-card a-product-card--type-vertical-vertical"
                      deliveryshort=""
                      picturesslider="[object Object],[object Object],[object Object],[object Object],[object Object]"
                      shorttitle="Набор инструментов для автомобиля Ombra OMT82S12 82 предмета"
                      vendorcode="О00000009672"
                    >
                      <a
                        className="a-product-card__preview"
                        href="/product/ombra-omt82s12-nabor-instrumentov-dlya-avtomobilya-s-12-gr-golovkami-1-2-dr-i-1-4-dr-82-predmeta-1494931/"
                      >
                        <img
                          alt="Набор инструментов для автомобиля Ombra OMT82S12 82 предмета"
                          className="a-product-card__picture a-lazy-load a-is-loaded"
                          src="https://cdn.bigam.ru/resize_cache/iblock/afc/kxj9k5fx275rc820u0wt98heyon7avvh/400_364_0/1494931.jpg"
                          title="Набор инструментов для автомобиля Ombra OMT82S12 82 предмета"
                        />
                        <span />
                      </a>
                      <div className="a-product-card__description">
                        <div className="a-product-card__price">
                          <div
                            afterauthorization="10704"
                            bonusdiscount="0"
                            className="a-price"
                            currentshop="11266"
                            discount="0"
                            discountshop="0"
                            haspersonalblock="true"
                            minbonusprice="8667"
                            personalpricedifference="-562"
                            retail="11266"
                            showpersonalpricedifference="true"
                          >
                            <div className="a-price__current">11 266 ₽</div>
                          </div>
                        </div>
                        <div className="a-product-card__status">
                          <div className="a-rating">
                            <ul className="a-rating__list">
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                            </ul>
                            <div className="a-rating__count">5.0</div>
                          </div>
                        </div>
                        <div className="a-product-card__title">
                          <a
                            className=""
                            href="/product/ombra-omt82s12-nabor-instrumentov-dlya-avtomobilya-s-12-gr-golovkami-1-2-dr-i-1-4-dr-82-predmeta-1494931/"
                            title="Набор инструментов для автомобиля Ombra OMT82S12 82 предмета"
                          >
                            Набор инструментов для автомобиля Ombra OMT82S12 82
                            предмета
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
                      <a
                        className="a-product-card__link"
                        href="/product/ombra-omt82s12-nabor-instrumentov-dlya-avtomobilya-s-12-gr-golovkami-1-2-dr-i-1-4-dr-82-predmeta-1494931/"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="a-card-carousel__slide swiper-slide swiper-slide-next"
                  data-swiper-slide-index="1"
                  style={{
                    marginRight: "24px",
                    width: "282px",
                  }}
                >
                  <div className="a-card-carousel__card">
                    <div
                      className="a-product-card a-product-card--type-vertical-vertical"
                      deliveryshort=""
                      picturesslider="[object Object],[object Object],[object Object]"
                      shorttitle="Набор инструмента универсальный Ombra OMT88S, 88 предметов"
                      vendorcode="Ю00000021212"
                    >
                      <a
                        className="a-product-card__preview"
                        href="/product/nabor-instrumentoov-ombra-omt88s-universalnyy-88-predmetov-885935/"
                      >
                        <img
                          alt="Набор инструмента универсальный Ombra OMT88S, 88 предметов"
                          className="a-product-card__picture a-lazy-load a-is-loaded"
                          src="https://cdn.bigam.ru/resize_cache/iblock/898/uhh963oep2h2ju4eyg2ydw5n7fp0os34/400_364_0/885935.jpg"
                          title="Набор инструмента универсальный Ombra OMT88S, 88 предметов"
                        />
                        <span />
                      </a>
                      <div className="a-product-card__description">
                        <div className="a-product-card__price">
                          <div
                            afterauthorization="19629"
                            bonusdiscount="0"
                            className="a-price"
                            currentshop="19629"
                            discount="0"
                            discountshop="0"
                            minbonusprice="15107"
                            retail="19629"
                            showpersonalpricedifference="true"
                          >
                            <div className="a-price__current">19 629 ₽</div>
                          </div>
                        </div>
                        <div className="a-product-card__status">
                          <div className="a-rating">
                            <ul className="a-rating__list">
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                            </ul>
                            <div className="a-rating__count">5.0</div>
                          </div>
                        </div>
                        <div className="a-product-card__title">
                          <a
                            className=""
                            href="/product/nabor-instrumentoov-ombra-omt88s-universalnyy-88-predmetov-885935/"
                            title="Набор инструмента универсальный Ombra OMT88S, 88 предметов"
                          >
                            Набор инструмента универсальный Ombra OMT88S, 88
                            предметов
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
                      <a
                        className="a-product-card__link"
                        href="/product/nabor-instrumentoov-ombra-omt88s-universalnyy-88-predmetov-885935/"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="a-card-carousel__slide swiper-slide"
                  data-swiper-slide-index="2"
                  style={{
                    marginRight: "24px",
                    width: "282px",
                  }}
                >
                  <div className="a-card-carousel__card">
                    <div
                      className="a-product-card a-product-card--type-vertical-vertical"
                      deliveryshort=""
                      picturesslider="[object Object],[object Object],[object Object]"
                      shorttitle="Набор автомобильного инструмента Ombra OMT94S универсальный, 94 предмета"
                      vendorcode="Х1302356195"
                    >
                      <a
                        className="a-product-card__preview"
                        href="/product/nabor-instrumenta-ombra-omt94s-universalnyy-94-predmeta-561817/"
                      >
                        <img
                          alt="Набор автомобильного инструмента Ombra OMT94S (универсальный, 94 предмета, вес  6.25 кг)"
                          className="a-product-card__picture a-lazy-load a-is-loaded"
                          src="https://cdn.bigam.ru/resize_cache/713959/ae1d3c12631bcd92ab74e2237d30068a/iblock/02b/02ba2cba4eac29e46b0895aefb6bb52a/561817.jpg"
                          title="Набор автомобильного инструмента Ombra OMT94S (универсальный, 94 предмета, вес  6.25 кг)"
                        />
                        <span />
                        <div className="a-product-card__mark-list">
                          <div className="a-product-card__mark-item a-product-card__mark-item--color-blue">
                            <svg className="a-svg">
                              <use
                                xlinkHref="#icon-bigam-sign-solid"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                              />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="a-product-card__description">
                        <div className="a-product-card__price">
                          <div
                            afterauthorization="7670"
                            bonusdiscount="0"
                            className="a-price"
                            currentshop="8399"
                            discount="2061"
                            discountshop="2061"
                            haspersonalblock="true"
                            minbonusprice="7912"
                            personalpricedifference="-729"
                            retail="10460"
                            showpersonalpricedifference="true"
                            showretail="true"
                          >
                            <div className="a-price__new">8 399 ₽</div>
                            <div className="a-price__old">10 460 ₽</div>
                          </div>
                        </div>
                        <div className="a-product-card__status">
                          <div className="a-rating">
                            <ul className="a-rating__list">
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                            </ul>
                            <div className="a-rating__count">4.9</div>
                          </div>
                        </div>
                        <div className="a-product-card__title">
                          <a
                            className=""
                            href="/product/nabor-instrumenta-ombra-omt94s-universalnyy-94-predmeta-561817/"
                            title="Набор автомобильного инструмента Ombra OMT94S (универсальный, 94 предмета, вес  6.25 кг)"
                          >
                            Набор автомобильного инструмента Ombra OMT94S
                            (универсальный, 94 предмета, вес 6.25 кг)
                          </a>
                        </div>
                      </div>
                      <div className="a-product-card__badges">
                        <ul className="a-main-badge-list">
                          <li className="a-main-badge-list__item">
                            <div
                              className="a-main-badge-list__badge"
                              style={{
                                "--badge-title": "'-2 061 ₽'",
                                backgroundColor: "rgb(243, 86, 67)",
                              }}
                            />
                          </li>
                        </ul>
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
                      <a
                        className="a-product-card__link"
                        href="/product/nabor-instrumenta-ombra-omt94s-universalnyy-94-predmeta-561817/"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="a-card-carousel__slide swiper-slide"
                  data-swiper-slide-index="3"
                  style={{
                    marginRight: "24px",
                    width: "282px",
                  }}
                >
                  <div className="a-card-carousel__card">
                    <div
                      className="a-product-card a-product-card--type-vertical-vertical"
                      deliveryshort=""
                      picturesslider="[object Object],[object Object],[object Object],[object Object],[object Object]"
                      shorttitle="Набор инструмента Ombra OMT101S, 101 предмет"
                      vendorcode="Х1302356150"
                    >
                      <a
                        className="a-product-card__preview"
                        href="/product/nabor-instrumenta-ombra-omt101s-universalnyj-101pr-591952/"
                      >
                        <img
                          alt="Набор инструмента Ombra OMT101S, 101 предмет"
                          className="a-product-card__picture a-lazy-load a-is-loaded"
                          src="https://cdn.bigam.ru/resize_cache/iblock/c35/400_364_0/t6o22lzxpmumofx8p7m04d6txvenzm2a.jpg"
                          title="Набор инструмента Ombra OMT101S, 101 предмет"
                        />
                        <span />
                      </a>
                      <div className="a-product-card__description">
                        <div className="a-product-card__price">
                          <div
                            afterauthorization="22777"
                            bonusdiscount="0"
                            className="a-price"
                            currentshop="22777"
                            discount="0"
                            discountshop="0"
                            minbonusprice="17528"
                            retail="22777"
                            showpersonalpricedifference="true"
                          >
                            <div className="a-price__current">22 777 ₽</div>
                          </div>
                        </div>
                        <div className="a-product-card__status">
                          <div className="a-rating">
                            <ul className="a-rating__list">
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                            </ul>
                            <div className="a-rating__count">5.0</div>
                          </div>
                        </div>
                        <div className="a-product-card__title">
                          <a
                            className=""
                            href="/product/nabor-instrumenta-ombra-omt101s-universalnyj-101pr-591952/"
                            title="Набор инструмента Ombra OMT101S, 101 предмет"
                          >
                            Набор инструмента Ombra OMT101S, 101 предмет
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
                      <a
                        className="a-product-card__link"
                        href="/product/nabor-instrumenta-ombra-omt101s-universalnyj-101pr-591952/"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="a-card-carousel__slide swiper-slide"
                  data-swiper-slide-index="4"
                  style={{
                    marginRight: "24px",
                    width: "282px",
                  }}
                >
                  <div className="a-card-carousel__card">
                    <div
                      className="a-product-card a-product-card--type-vertical-vertical"
                      deliveryshort=""
                      picturesslider="[object Object],[object Object],[object Object],[object Object],[object Object]"
                      shorttitle='Набор инструмента Ombra OMT30S, 1/4"DR, 30 предметов'
                      vendorcode="ombratools_4233"
                    >
                      <a
                        className="a-product-card__preview"
                        href="/product/nabor-instrumenta-ombra-1-4-dr-30-predmetov-omt30s-1762972/"
                      >
                        <img
                          alt='Набор инструмента Ombra OMT30S, 1/4"DR, 30 предметов'
                          className="a-product-card__picture a-lazy-load"
                          data-src="https://cdn.bigam.ru/resize_cache/iblock/9ff/26sdes605swkvoee7uapb3ugumwn95rw/400_364_0/1762972.jpg"
                          src="/images/layouts/no_picture.svg"
                          title='Набор инструмента Ombra OMT30S, 1/4"DR, 30 предметов'
                        />
                        <span />
                      </a>
                      <div className="a-product-card__description">
                        <div className="a-product-card__price">
                          <div
                            afterauthorization="6170"
                            bonusdiscount="0"
                            className="a-price"
                            currentshop="6170"
                            discount="0"
                            discountshop="0"
                            minbonusprice="4753"
                            retail="6170"
                            showpersonalpricedifference="true"
                          >
                            <div className="a-price__current">6 170 ₽</div>
                          </div>
                        </div>
                        <div className="a-product-card__status">
                          <div className="a-rating">
                            <ul className="a-rating__list">
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item">
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
                            </ul>
                            <div className="a-rating__count">4.3</div>
                          </div>
                        </div>
                        <div className="a-product-card__title">
                          <a
                            className=""
                            href="/product/nabor-instrumenta-ombra-1-4-dr-30-predmetov-omt30s-1762972/"
                            title='Набор инструмента Ombra OMT30S, 1/4"DR, 30 предметов'
                          >
                            Набор инструмента Ombra OMT30S, 1/4"DR, 30 предметов
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
                      <a
                        className="a-product-card__link"
                        href="/product/nabor-instrumenta-ombra-1-4-dr-30-predmetov-omt30s-1762972/"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="a-card-carousel__slide swiper-slide"
                  data-swiper-slide-index="5"
                  style={{
                    marginRight: "24px",
                    width: "282px",
                  }}
                >
                  <div className="a-card-carousel__card">
                    <div
                      className="a-product-card a-product-card--type-vertical-vertical"
                      deliveryshort=""
                      picturesslider="[object Object],[object Object],[object Object]"
                      shorttitle='Универсальный набор инструмента Ombra OMT150S 055370, торцевые головки 1/4", 3/8", 1/2"DR 150пр.'
                      vendorcode="X10192029"
                    >
                      <a
                        className="a-product-card__preview"
                        href="/product/ombra-omt150s-universalnyi-nabor-instrumenta-torcevye-golovki-1-4-3-8-1-2-dr-150pr-055370-1763125/"
                      >
                        <img
                          alt='Универсальный набор инструмента Ombra OMT150S 055370, торцевые головки 1/4", 3/8", 1/2"DR 150пр.'
                          className="a-product-card__picture a-lazy-load"
                          data-src="https://cdn.bigam.ru/resize_cache/iblock/d20/bzil0tgiayhlst7s1tuimgegc4258nja/400_364_0/1763125.jpg"
                          src="/images/layouts/no_picture.svg"
                          title='Универсальный набор инструмента Ombra OMT150S 055370, торцевые головки 1/4", 3/8", 1/2"DR 150пр.'
                        />
                        <span />
                      </a>
                      <div className="a-product-card__description">
                        <div className="a-product-card__price">
                          <div
                            afterauthorization="30560"
                            bonusdiscount="0"
                            className="a-price"
                            currentshop="30560"
                            discount="2764"
                            discountshop="2764"
                            minbonusprice="25948"
                            retail="33324"
                            showpersonalpricedifference="true"
                            showretail="true"
                          >
                            <div className="a-price__new">30 560 ₽</div>
                            <div className="a-price__old">33 324 ₽</div>
                          </div>
                        </div>
                        <div className="a-product-card__status">
                          <div className="a-rating">
                            <ul className="a-rating__list">
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item">
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
                            </ul>
                            <div className="a-rating__count">4.0</div>
                          </div>
                        </div>
                        <div className="a-product-card__title">
                          <a
                            className=""
                            href="/product/ombra-omt150s-universalnyi-nabor-instrumenta-torcevye-golovki-1-4-3-8-1-2-dr-150pr-055370-1763125/"
                            title='Универсальный набор инструмента Ombra OMT150S 055370, торцевые головки 1/4", 3/8", 1/2"DR 150пр.'
                          >
                            Универсальный набор инструмента Ombra OMT150S
                            055370, торцевые головки 1/4", 3/8", 1/2"DR 150пр.
                          </a>
                        </div>
                      </div>
                      <div className="a-product-card__badges">
                        <ul className="a-main-badge-list">
                          <li className="a-main-badge-list__item">
                            <div
                              className="a-main-badge-list__badge"
                              style={{
                                "--badge-title": "'-2 764 ₽'",
                                backgroundColor: "rgb(243, 86, 67)",
                              }}
                            />
                          </li>
                        </ul>
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
                      <a
                        className="a-product-card__link"
                        href="/product/ombra-omt150s-universalnyi-nabor-instrumenta-torcevye-golovki-1-4-3-8-1-2-dr-150pr-055370-1763125/"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="a-card-carousel__slide swiper-slide"
                  data-swiper-slide-index="6"
                  style={{
                    marginRight: "24px",
                    width: "282px",
                  }}
                >
                  <div className="a-card-carousel__card">
                    <div
                      className="a-product-card a-product-card--type-vertical-vertical"
                      deliveryshort=""
                      picturesslider="[object Object],[object Object],[object Object]"
                      shorttitle='Набор инструмента универсальный Ombra OMT143SL, 1/4", 1/2"DR, 143 предмета'
                      vendorcode="ombratools_6420"
                    >
                      <a
                        className="a-product-card__preview"
                        href="/product/nabor-instrumenta-universalnyi-ombra-1-4-1-2-dr-143-predmeta-omt143sl-1763136/"
                      >
                        <img
                          alt='Набор инструмента универсальный Ombra OMT143SL, 1/4", 1/2"DR, 143 предмета'
                          className="a-product-card__picture a-lazy-load"
                          data-src="https://cdn.bigam.ru/resize_cache/iblock/1a6/53k643hwvk6x47dzhewry884fmwhy54d/400_364_0/1763136.jpg"
                          src="/images/layouts/no_picture.svg"
                          title='Набор инструмента универсальный Ombra OMT143SL, 1/4", 1/2"DR, 143 предмета'
                        />
                        <span />
                      </a>
                      <div className="a-product-card__description">
                        <div className="a-product-card__price">
                          <div
                            afterauthorization="28070"
                            bonusdiscount="0"
                            className="a-price"
                            currentshop="28070"
                            discount="3668"
                            discountshop="3668"
                            minbonusprice="24710"
                            retail="31738"
                            showpersonalpricedifference="true"
                            showretail="true"
                          >
                            <div className="a-price__new">28 070 ₽</div>
                            <div className="a-price__old">31 738 ₽</div>
                          </div>
                        </div>
                        <div className="a-product-card__status">
                          <div className="a-rating">
                            <ul className="a-rating__list">
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item">
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
                            </ul>
                            <div className="a-rating__count">4.3</div>
                          </div>
                        </div>
                        <div className="a-product-card__title">
                          <a
                            className=""
                            href="/product/nabor-instrumenta-universalnyi-ombra-1-4-1-2-dr-143-predmeta-omt143sl-1763136/"
                            title='Набор инструмента универсальный Ombra OMT143SL, 1/4", 1/2"DR, 143 предмета'
                          >
                            Набор инструмента универсальный Ombra OMT143SL,
                            1/4", 1/2"DR, 143 предмета
                          </a>
                        </div>
                      </div>
                      <div className="a-product-card__badges">
                        <ul className="a-main-badge-list">
                          <li className="a-main-badge-list__item">
                            <div
                              className="a-main-badge-list__badge"
                              style={{
                                "--badge-title": "'-3 668 ₽'",
                                backgroundColor: "rgb(243, 86, 67)",
                              }}
                            />
                          </li>
                        </ul>
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
                      <a
                        className="a-product-card__link"
                        href="/product/nabor-instrumenta-universalnyi-ombra-1-4-1-2-dr-143-predmeta-omt143sl-1763136/"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="a-card-carousel__slide swiper-slide"
                  data-swiper-slide-index="7"
                  style={{
                    marginRight: "24px",
                    width: "282px",
                  }}
                >
                  <div className="a-card-carousel__card">
                    <div
                      className="a-product-card a-product-card--type-vertical-vertical"
                      deliveryshort=""
                      picturesslider="[object Object],[object Object],[object Object],[object Object],[object Object]"
                      shorttitle="Набор инструментов универсальный Ombra OMT69S, 69 предметов"
                      vendorcode="Х1302356140"
                    >
                      <a
                        className="a-product-card__preview"
                        href="/product/nabor-instrumentov-ombra-omt69s-universalnyj-69-predmetov-494265/"
                      >
                        <img
                          alt="Набор инструментов универсальный Ombra OMT69S, 69 предметов"
                          className="a-product-card__picture a-lazy-load"
                          data-src="https://cdn.bigam.ru/resize_cache/iblock/bb1/uks0nqvf66erhjzrbvclk3d1b9tf23dt/400_364_0/494265.jpg"
                          src="/images/layouts/no_picture.svg"
                          title="Набор инструментов универсальный Ombra OMT69S, 69 предметов"
                        />
                        <span />
                      </a>
                      <div className="a-product-card__description">
                        <div className="a-product-card__price">
                          <div
                            afterauthorization="14957"
                            bonusdiscount="0"
                            className="a-price"
                            currentshop="14957"
                            discount="0"
                            discountshop="0"
                            minbonusprice="11510"
                            retail="14957"
                            showpersonalpricedifference="true"
                          >
                            <div className="a-price__current">14 957 ₽</div>
                          </div>
                        </div>
                        <div className="a-product-card__status">
                          <div className="a-rating">
                            <ul className="a-rating__list">
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                            </ul>
                            <div className="a-rating__count">5.0</div>
                          </div>
                        </div>
                        <div className="a-product-card__title">
                          <a
                            className=""
                            href="/product/nabor-instrumentov-ombra-omt69s-universalnyj-69-predmetov-494265/"
                            title="Набор инструментов универсальный Ombra OMT69S, 69 предметов"
                          >
                            Набор инструментов универсальный Ombra OMT69S, 69
                            предметов
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
                      <a
                        className="a-product-card__link"
                        href="/product/nabor-instrumentov-ombra-omt69s-universalnyj-69-predmetov-494265/"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="a-card-carousel__slide swiper-slide"
                  data-swiper-slide-index="8"
                  style={{
                    marginRight: "24px",
                    width: "282px",
                  }}
                >
                  <div className="a-card-carousel__card">
                    <div
                      className="a-product-card a-product-card--type-vertical-vertical"
                      deliveryshort=""
                      picturesslider="[object Object],[object Object],[object Object],[object Object],[object Object]"
                      shorttitle="Набор ручных инструментов Ombra OMT82S универсальный, 82 предмета"
                      vendorcode="Х1302356151"
                    >
                      <a
                        className="a-product-card__preview"
                        href="/product/nabor-instrumentov-ombra-omt82s-universalnyy-82-predmeta-521700/"
                      >
                        <img
                          alt="Набор ручных инструментов Ombra OMT82S универсальный (82 предмета, чемодан, вес 5.8 кг)"
                          className="a-product-card__picture a-lazy-load"
                          data-src="https://cdn.bigam.ru/resize_cache/iblock/edf/zb3syqzobk4t2hysvu0x2z9wconf89z3/400_364_0/521700.jpg"
                          src="/images/layouts/no_picture.svg"
                          title="Набор ручных инструментов Ombra OMT82S универсальный (82 предмета, чемодан, вес 5.8 кг)"
                        />
                        <span />
                        <div className="a-product-card__mark-list">
                          <div className="a-product-card__mark-item a-product-card__mark-item--color-blue">
                            <svg className="a-svg">
                              <use
                                xlinkHref="#icon-bigam-sign-solid"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                              />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="a-product-card__description">
                        <div className="a-product-card__price">
                          <div
                            afterauthorization="8499"
                            bonusdiscount="0"
                            className="a-price"
                            currentshop="8499"
                            discount="2771"
                            discountshop="2771"
                            minbonusprice="8499"
                            retail="11270"
                            showpersonalpricedifference="true"
                            showretail="true"
                          >
                            <div className="a-price__new">8 499 ₽</div>
                            <div className="a-price__old">11 270 ₽</div>
                          </div>
                        </div>
                        <div className="a-product-card__status">
                          <div className="a-rating">
                            <ul className="a-rating__list">
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                            </ul>
                            <div className="a-rating__count">4.8</div>
                          </div>
                        </div>
                        <div className="a-product-card__title">
                          <a
                            className=""
                            href="/product/nabor-instrumentov-ombra-omt82s-universalnyy-82-predmeta-521700/"
                            title="Набор ручных инструментов Ombra OMT82S универсальный (82 предмета, чемодан, вес 5.8 кг)"
                          >
                            Набор ручных инструментов Ombra OMT82S универсальный
                            (82 предмета, чемодан, вес 5.8 кг)
                          </a>
                        </div>
                      </div>
                      <div className="a-product-card__badges">
                        <ul className="a-main-badge-list">
                          <li className="a-main-badge-list__item">
                            <div
                              className="a-main-badge-list__badge"
                              style={{
                                "--badge-title": "'-2 771 ₽'",
                                backgroundColor: "rgb(243, 86, 67)",
                              }}
                            />
                          </li>
                        </ul>
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
                      <a
                        className="a-product-card__link"
                        href="/product/nabor-instrumentov-ombra-omt82s-universalnyy-82-predmeta-521700/"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="a-card-carousel__slide swiper-slide"
                  data-swiper-slide-index="9"
                  style={{
                    marginRight: "24px",
                    width: "282px",
                  }}
                >
                  <div className="a-card-carousel__card">
                    <div
                      className="a-product-card a-product-card--type-vertical-vertical"
                      deliveryshort=""
                      picturesslider="[object Object],[object Object],[object Object],[object Object],[object Object]"
                      shorttitle='Набор инструмента Ombra OMT55S, 4-32мм 1/4" и 1/2"DR '
                      vendorcode="О00000018494"
                    >
                      <a
                        className="a-product-card__preview"
                        href="/product/ombra-nabor-instrumenta-4-32mm-1-4-i-1-2-dr-omt55s-1762765/"
                      >
                        <img
                          alt='Набор инструмента Ombra OMT55S, 4-32мм 1/4" и 1/2"DR '
                          className="a-product-card__picture a-lazy-load"
                          data-src="https://cdn.bigam.ru/resize_cache/iblock/6ff/lfx1y1la4ssixl7k27ewi673tomd2c7g/400_364_0/1762765.jpg"
                          src="/images/layouts/no_picture.svg"
                          title='Набор инструмента Ombra OMT55S, 4-32мм 1/4" и 1/2"DR '
                        />
                        <span />
                      </a>
                      <div className="a-product-card__description">
                        <div className="a-product-card__price">
                          <div
                            afterauthorization="15790"
                            bonusdiscount="0"
                            className="a-price"
                            currentshop="15790"
                            discount="1997"
                            discountshop="1997"
                            minbonusprice="13691"
                            retail="17787"
                            showpersonalpricedifference="true"
                            showretail="true"
                          >
                            <div className="a-price__new">15 790 ₽</div>
                            <div className="a-price__old">17 787 ₽</div>
                          </div>
                        </div>
                        <div className="a-product-card__status">
                          <div className="a-rating">
                            <ul className="a-rating__list">
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item">
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
                            </ul>
                            <div className="a-rating__count">4.0</div>
                          </div>
                        </div>
                        <div className="a-product-card__title">
                          <a
                            className=""
                            href="/product/ombra-nabor-instrumenta-4-32mm-1-4-i-1-2-dr-omt55s-1762765/"
                            title='Набор инструмента Ombra OMT55S, 4-32мм 1/4" и 1/2"DR '
                          >
                            Набор инструмента Ombra OMT55S, 4-32мм 1/4" и 1/2"DR
                          </a>
                        </div>
                      </div>
                      <div className="a-product-card__badges">
                        <ul className="a-main-badge-list">
                          <li className="a-main-badge-list__item">
                            <div
                              className="a-main-badge-list__badge"
                              style={{
                                "--badge-title": "'-1 997 ₽'",
                                backgroundColor: "rgb(243, 86, 67)",
                              }}
                            />
                          </li>
                        </ul>
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
                      <a
                        className="a-product-card__link"
                        href="/product/ombra-nabor-instrumenta-4-32mm-1-4-i-1-2-dr-omt55s-1762765/"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="a-card-carousel__slide swiper-slide"
                  data-swiper-slide-index="10"
                  style={{
                    marginRight: "24px",
                    width: "282px",
                  }}
                >
                  <div className="a-card-carousel__card">
                    <div
                      className="a-product-card a-product-card--type-vertical-vertical"
                      deliveryshort=""
                      picturesslider="[object Object],[object Object],[object Object]"
                      shorttitle="Набор головок торцевых с аксессуарами Ombra 911423, 1/4 DR, 4-13мм, 23пр. "
                      vendorcode="О00000043236"
                    >
                      <a
                        className="a-product-card__preview"
                        href="/product/jonnesway-nabor-golovok-torcevyh-s-aksessuarami-1-4-dr-4-13mm-23pr-911423-1762947/"
                      >
                        <img
                          alt="Набор головок торцевых с аксессуарами Ombra 911423, 1/4 DR, 4-13мм, 23пр. "
                          className="a-product-card__picture a-lazy-load"
                          data-src="https://cdn.bigam.ru/resize_cache/iblock/0fc/hmk8ujaockopc38ziyapgvbt8e4qbs28/400_364_0/1762947.jpg"
                          src="/images/layouts/no_picture.svg"
                          title="Набор головок торцевых с аксессуарами Ombra 911423, 1/4 DR, 4-13мм, 23пр. "
                        />
                        <span />
                      </a>
                      <div className="a-product-card__description">
                        <div className="a-product-card__price">
                          <div
                            afterauthorization="4684"
                            bonusdiscount="0"
                            className="a-price"
                            currentshop="4684"
                            discount="416"
                            discountshop="416"
                            minbonusprice="3709"
                            retail="5100"
                            showpersonalpricedifference="true"
                            showretail="true"
                          >
                            <div className="a-price__new">4 684 ₽</div>
                            <div className="a-price__old">5 100 ₽</div>
                          </div>
                        </div>
                        <div className="a-product-card__status">
                          <div className="a-rating">
                            <ul className="a-rating__list">
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item">
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
                            </ul>
                            <div className="a-rating__count">4.0</div>
                          </div>
                        </div>
                        <div className="a-product-card__title">
                          <a
                            className=""
                            href="/product/jonnesway-nabor-golovok-torcevyh-s-aksessuarami-1-4-dr-4-13mm-23pr-911423-1762947/"
                            title="Набор головок торцевых с аксессуарами Ombra 911423, 1/4 DR, 4-13мм, 23пр. "
                          >
                            Набор головок торцевых с аксессуарами Ombra 911423,
                            1/4 DR, 4-13мм, 23пр.
                          </a>
                        </div>
                      </div>
                      <div className="a-product-card__badges">
                        <ul className="a-main-badge-list">
                          <li className="a-main-badge-list__item">
                            <div
                              className="a-main-badge-list__badge"
                              style={{
                                "--badge-title": "'-416 ₽'",
                                backgroundColor: "rgb(243, 86, 67)",
                              }}
                            />
                          </li>
                        </ul>
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
                      <a
                        className="a-product-card__link"
                        href="/product/jonnesway-nabor-golovok-torcevyh-s-aksessuarami-1-4-dr-4-13mm-23pr-911423-1762947/"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="a-card-carousel__slide swiper-slide swiper-slide-duplicate-prev"
                  data-swiper-slide-index="11"
                  style={{
                    marginRight: "24px",
                    width: "282px",
                  }}
                >
                  <div className="a-card-carousel__card">
                    <div
                      className="a-product-card a-product-card--type-vertical-vertical a-product-card--not-available"
                      deliveryshort=""
                      picturesslider="[object Object],[object Object],[object Object],[object Object]"
                      shorttitle="Набор инструмента универсальный Ombra OMT77S12, 77 предметов"
                      vendorcode="Х1302356141"
                    >
                      <a
                        className="a-product-card__preview"
                        href="/product/ombra-omt77s12-nabor-instrumenta-universalnyi-77-predmetov-1763461/"
                      >
                        <img
                          alt="Набор инструмента универсальный Ombra OMT77S12, 77 предметов"
                          className="a-product-card__picture a-lazy-load"
                          data-src="https://cdn.bigam.ru/resize_cache/iblock/fcf/mvzor3j3ecb53l4p6ye6n871r5tqiund/400_364_0/1763461.jpg"
                          src="/images/layouts/no_picture.svg"
                          title="Набор инструмента универсальный Ombra OMT77S12, 77 предметов"
                        />
                        <span />
                      </a>
                      <div className="a-product-card__description">
                        <div className="a-product-card__not-available" />
                        <div className="a-product-card__status">
                          <div className="a-rating">
                            <ul className="a-rating__list">
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item">
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
                            </ul>
                            <div className="a-rating__count">4.3</div>
                          </div>
                        </div>
                        <div className="a-product-card__title">
                          <a
                            className=""
                            href="/product/ombra-omt77s12-nabor-instrumenta-universalnyi-77-predmetov-1763461/"
                            title="Набор инструмента универсальный Ombra OMT77S12, 77 предметов"
                          >
                            Набор инструмента универсальный Ombra OMT77S12, 77
                            предметов
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
                        <a
                          className="a-main-button a-product-card__show a-main-button--display-inline a-main-button--type-auto a-main-button--corner-round a-main-button--color-light-space"
                          href="/product/ombra-omt77s12-nabor-instrumenta-universalnyi-77-predmetov-1763461/"
                        />
                      </div>
                      <a
                        className="a-product-card__link"
                        href="/product/ombra-omt77s12-nabor-instrumenta-universalnyi-77-predmetov-1763461/"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="a-card-carousel__slide swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
                  data-swiper-slide-index="0"
                  style={{
                    marginRight: "24px",
                    width: "282px",
                  }}
                >
                  <div className="a-card-carousel__card">
                    <div
                      className="a-product-card a-product-card--type-vertical-vertical a-product-card--load"
                      deliveryshort=""
                      picturesslider="[object Object],[object Object],[object Object],[object Object],[object Object]"
                      shorttitle="Набор инструментов для автомобиля Ombra OMT82S12 82 предмета"
                      vendorcode="О00000009672"
                    >
                      <a
                        className="a-product-card__preview"
                        href="/product/ombra-omt82s12-nabor-instrumentov-dlya-avtomobilya-s-12-gr-golovkami-1-2-dr-i-1-4-dr-82-predmeta-1494931/"
                      >
                        <img
                          alt=""
                          className="a-product-card__picture a-lazy-load"
                          data-src="https://cdn.bigam.ru/resize_cache/iblock/afc/kxj9k5fx275rc820u0wt98heyon7avvh/400_364_0/1494931.jpg"
                          src="/images/layouts/no_picture.svg"
                          title=""
                        />
                        <span />
                      </a>
                      <div className="a-product-card__description">
                        <div className="a-product-card__price">
                          <div
                            afterauthorization="10704"
                            bonusdiscount="0"
                            className="a-price"
                            currentshop="11266"
                            discount="0"
                            discountshop="0"
                            haspersonalblock="true"
                            minbonusprice="8667"
                            personalpricedifference="-562"
                            retail="11266"
                            showpersonalpricedifference="true"
                          >
                            <div className="a-price__current">11 266 ₽</div>
                          </div>
                        </div>
                        <div className="a-product-card__status">
                          <div className="a-rating">
                            <ul className="a-rating__list">
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                            </ul>
                            <div className="a-rating__count">5.0</div>
                          </div>
                        </div>
                        <div className="a-product-card__title">
                          <a
                            className=""
                            href="/product/ombra-omt82s12-nabor-instrumentov-dlya-avtomobilya-s-12-gr-golovkami-1-2-dr-i-1-4-dr-82-predmeta-1494931/"
                            title=""
                          >
                            Набор инструментов для автомобиля Ombra OMT82S12 82
                            предмета
                          </a>
                        </div>
                      </div>
                      <div className="a-product-card__buttons">
                        <button
                          className="a-main-button a-product-card__add a-main-button--load a-main-button--display-inline a-main-button--type-auto a-main-button--corner-round a-main-button--color-orange"
                          type="button"
                        >
                          <span className="a-main-button__wrap">
                            <span className="a-main-button__content">
                              В корзину
                            </span>
                          </span>
                        </button>
                        <div className="a-product-card__mini-add">
                          <button
                            className="a-main-button a-main-button--load a-main-button--display-inline a-main-button--type-auto a-main-button--corner-round a-main-button--color-orange"
                            type="button"
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
                      <a
                        className="a-product-card__link"
                        href="/product/ombra-omt82s12-nabor-instrumentov-dlya-avtomobilya-s-12-gr-golovkami-1-2-dr-i-1-4-dr-82-predmeta-1494931/"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="a-card-carousel__slide swiper-slide swiper-slide-duplicate swiper-slide-duplicate-next"
                  data-swiper-slide-index="1"
                  style={{
                    marginRight: "24px",
                    width: "282px",
                  }}
                >
                  <div className="a-card-carousel__card">
                    <div
                      className="a-product-card a-product-card--type-vertical-vertical a-product-card--load"
                      deliveryshort=""
                      picturesslider="[object Object],[object Object],[object Object]"
                      shorttitle="Набор инструмента универсальный Ombra OMT88S, 88 предметов"
                      vendorcode="Ю00000021212"
                    >
                      <a
                        className="a-product-card__preview"
                        href="/product/nabor-instrumentoov-ombra-omt88s-universalnyy-88-predmetov-885935/"
                      >
                        <img
                          alt=""
                          className="a-product-card__picture a-lazy-load"
                          data-src="https://cdn.bigam.ru/resize_cache/iblock/898/uhh963oep2h2ju4eyg2ydw5n7fp0os34/400_364_0/885935.jpg"
                          src="/images/layouts/no_picture.svg"
                          title=""
                        />
                        <span />
                      </a>
                      <div className="a-product-card__description">
                        <div className="a-product-card__price">
                          <div
                            afterauthorization="19629"
                            bonusdiscount="0"
                            className="a-price"
                            currentshop="19629"
                            discount="0"
                            discountshop="0"
                            minbonusprice="15107"
                            retail="19629"
                            showpersonalpricedifference="true"
                          >
                            <div className="a-price__current">19 629 ₽</div>
                          </div>
                        </div>
                        <div className="a-product-card__status">
                          <div className="a-rating">
                            <ul className="a-rating__list">
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                            </ul>
                            <div className="a-rating__count">5.0</div>
                          </div>
                        </div>
                        <div className="a-product-card__title">
                          <a
                            className=""
                            href="/product/nabor-instrumentoov-ombra-omt88s-universalnyy-88-predmetov-885935/"
                            title=""
                          >
                            Набор инструмента универсальный Ombra OMT88S, 88
                            предметов
                          </a>
                        </div>
                      </div>
                      <div className="a-product-card__buttons">
                        <button
                          className="a-main-button a-product-card__add a-main-button--load a-main-button--display-inline a-main-button--type-auto a-main-button--corner-round a-main-button--color-orange"
                          type="button"
                        >
                          <span className="a-main-button__wrap">
                            <span className="a-main-button__content">
                              В корзину
                            </span>
                          </span>
                        </button>
                        <div className="a-product-card__mini-add">
                          <button
                            className="a-main-button a-main-button--load a-main-button--display-inline a-main-button--type-auto a-main-button--corner-round a-main-button--color-orange"
                            type="button"
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
                      <a
                        className="a-product-card__link"
                        href="/product/nabor-instrumentoov-ombra-omt88s-universalnyy-88-predmetov-885935/"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="a-card-carousel__slide swiper-slide swiper-slide-duplicate"
                  data-swiper-slide-index="2"
                  style={{
                    marginRight: "24px",
                    width: "282px",
                  }}
                >
                  <div className="a-card-carousel__card">
                    <div
                      className="a-product-card a-product-card--type-vertical-vertical a-product-card--load"
                      deliveryshort=""
                      picturesslider="[object Object],[object Object],[object Object]"
                      shorttitle="Набор автомобильного инструмента Ombra OMT94S универсальный, 94 предмета"
                      vendorcode="Х1302356195"
                    >
                      <a
                        className="a-product-card__preview"
                        href="/product/nabor-instrumenta-ombra-omt94s-universalnyy-94-predmeta-561817/"
                      >
                        <img
                          alt=""
                          className="a-product-card__picture a-lazy-load"
                          data-src="https://cdn.bigam.ru/resize_cache/713959/ae1d3c12631bcd92ab74e2237d30068a/iblock/02b/02ba2cba4eac29e46b0895aefb6bb52a/561817.jpg"
                          src="/images/layouts/no_picture.svg"
                          title=""
                        />
                        <span />
                        <div className="a-product-card__mark-list">
                          <div className="a-product-card__mark-item a-product-card__mark-item--color-blue">
                            <svg className="a-svg">
                              <use
                                xlinkHref="#icon-bigam-sign-solid"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                              />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="a-product-card__description">
                        <div className="a-product-card__price">
                          <div
                            afterauthorization="7670"
                            bonusdiscount="0"
                            className="a-price"
                            currentshop="8399"
                            discount="2061"
                            discountshop="2061"
                            haspersonalblock="true"
                            minbonusprice="7912"
                            personalpricedifference="-729"
                            retail="10460"
                            showpersonalpricedifference="true"
                            showretail="true"
                          >
                            <div className="a-price__new">8 399 ₽</div>
                            <div className="a-price__old">10 460 ₽</div>
                          </div>
                        </div>
                        <div className="a-product-card__status">
                          <div className="a-rating">
                            <ul className="a-rating__list">
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                            </ul>
                            <div className="a-rating__count">4.9</div>
                          </div>
                        </div>
                        <div className="a-product-card__title">
                          <a
                            className=""
                            href="/product/nabor-instrumenta-ombra-omt94s-universalnyy-94-predmeta-561817/"
                            title=""
                          >
                            Набор автомобильного инструмента Ombra OMT94S
                            (универсальный, 94 предмета, вес 6.25 кг)
                          </a>
                        </div>
                      </div>
                      <div className="a-product-card__badges">
                        <ul className="a-main-badge-list a-main-badge-list--load">
                          <li className="a-main-badge-list__item">
                            <div
                              className="a-main-badge-list__badge"
                              style={{
                                "--badge-title": "'-2 061 ₽'",
                                backgroundColor: "rgb(243, 86, 67)",
                              }}
                            />
                          </li>
                        </ul>
                      </div>
                      <div className="a-product-card__buttons">
                        <button
                          className="a-main-button a-product-card__add a-main-button--load a-main-button--display-inline a-main-button--type-auto a-main-button--corner-round a-main-button--color-orange"
                          type="button"
                        >
                          <span className="a-main-button__wrap">
                            <span className="a-main-button__content">
                              В корзину
                            </span>
                          </span>
                        </button>
                        <div className="a-product-card__mini-add">
                          <button
                            className="a-main-button a-main-button--load a-main-button--display-inline a-main-button--type-auto a-main-button--corner-round a-main-button--color-orange"
                            type="button"
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
                      <a
                        className="a-product-card__link"
                        href="/product/nabor-instrumenta-ombra-omt94s-universalnyy-94-predmeta-561817/"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="a-card-carousel__slide swiper-slide swiper-slide-duplicate"
                  data-swiper-slide-index="3"
                  style={{
                    marginRight: "24px",
                    width: "282px",
                  }}
                >
                  <div className="a-card-carousel__card">
                    <div
                      className="a-product-card a-product-card--type-vertical-vertical a-product-card--load"
                      deliveryshort=""
                      picturesslider="[object Object],[object Object],[object Object],[object Object],[object Object]"
                      shorttitle="Набор инструмента Ombra OMT101S, 101 предмет"
                      vendorcode="Х1302356150"
                    >
                      <a
                        className="a-product-card__preview"
                        href="/product/nabor-instrumenta-ombra-omt101s-universalnyj-101pr-591952/"
                      >
                        <img
                          alt=""
                          className="a-product-card__picture a-lazy-load"
                          data-src="https://cdn.bigam.ru/resize_cache/iblock/c35/400_364_0/t6o22lzxpmumofx8p7m04d6txvenzm2a.jpg"
                          src="/images/layouts/no_picture.svg"
                          title=""
                        />
                        <span />
                      </a>
                      <div className="a-product-card__description">
                        <div className="a-product-card__price">
                          <div
                            afterauthorization="22777"
                            bonusdiscount="0"
                            className="a-price"
                            currentshop="22777"
                            discount="0"
                            discountshop="0"
                            minbonusprice="17528"
                            retail="22777"
                            showpersonalpricedifference="true"
                          >
                            <div className="a-price__current">22 777 ₽</div>
                          </div>
                        </div>
                        <div className="a-product-card__status">
                          <div className="a-rating">
                            <ul className="a-rating__list">
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                              <li className="a-rating__item a-rating__item--active">
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
                            </ul>
                            <div className="a-rating__count">5.0</div>
                          </div>
                        </div>
                        <div className="a-product-card__title">
                          <a
                            className=""
                            href="/product/nabor-instrumenta-ombra-omt101s-universalnyj-101pr-591952/"
                            title=""
                          >
                            Набор инструмента Ombra OMT101S, 101 предмет
                          </a>
                        </div>
                      </div>
                      <div className="a-product-card__buttons">
                        <button
                          className="a-main-button a-product-card__add a-main-button--load a-main-button--display-inline a-main-button--type-auto a-main-button--corner-round a-main-button--color-orange"
                          type="button"
                        >
                          <span className="a-main-button__wrap">
                            <span className="a-main-button__content">
                              В корзину
                            </span>
                          </span>
                        </button>
                        <div className="a-product-card__mini-add">
                          <button
                            className="a-main-button a-main-button--load a-main-button--display-inline a-main-button--type-auto a-main-button--corner-round a-main-button--color-orange"
                            type="button"
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
                      <a
                        className="a-product-card__link"
                        href="/product/nabor-instrumenta-ombra-omt101s-universalnyj-101pr-591952/"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
              </button>
              <div className="a-card-carousel__pagination swiper-pagination swiper-pagination-custom">
                <div className="a-card-carousel__bullet">
                  <div className="a-card-carousel__bullet-current">01</div>
                  <div className="a-card-carousel__bullet-count">03</div>
                </div>
              </div>
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
