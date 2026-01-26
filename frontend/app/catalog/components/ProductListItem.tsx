"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../config/api";
import { addToCart } from "../../lib/cart";
import { isFavorite, loadFavorites, toggleFavorite } from "../../lib/favorites";
import FastOrderModal from "./FastOrderModal";

interface ProductListItemProps {
  product?: any;
}

function normalizeImageUrl(url: string) {
  if (!url) return url;
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  if (url.startsWith("/media/")) {
    return `${API_BASE_URL}${url}`;
  }
  return url;
}

function formatSeoText(value?: string) {
  if (!value) return undefined;
  return `'${value}'`;
}

export function ProductListItem({ product }: ProductListItemProps) {
  if (!product) return null;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isFastOrderOpen, setIsFastOrderOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isFavoriteActive, setIsFavoriteActive] = useState(false);
  const [favoriteBusy, setFavoriteBusy] = useState(false);

  const images =
    product.images && product.images.length > 1
      ? product.images
      : product.image
        ? [
            {
              id: "main",
              url: product.image,
              alt: product.name,
              is_main: true,
            },
          ]
        : [];
  const limitedImages = images.slice(0, 6);
  const fallbackImage = "/images/layouts/no_picture.svg";
  const hasGallery = limitedImages.length > 1;
  const ratingValue = Number(product.rating || 0);
  const ratingActive = Math.round(ratingValue);
  const priceValue = Number(product.price || 0);
  const formattedPrice = priceValue.toLocaleString("ru-RU");
  const retailValue = Number(product.retail_price || 0);
  const formattedRetail =
    retailValue > 0 ? retailValue.toLocaleString("ru-RU") : "";
  const hasDiscount = retailValue > priceValue && priceValue > 0;
  const discountValue = Number(product.discount_percent || 0);
  const discountAmount = hasDiscount
    ? retailValue - priceValue
    : discountValue > 0 && priceValue > 0
      ? discountValue
      : 0;
  const formattedDiscount =
    discountAmount > 0 ? `-${discountAmount.toLocaleString("ru-RU")} ₽` : "";

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
    let isActive = true;
    const syncFavorite = () => {
      if (!isActive) return;
      setIsFavoriteActive(isFavorite(product.id));
    };
    loadFavorites()
      .then(syncFavorite)
      .catch(() => {});
    syncFavorite();
    if (typeof window === "undefined") return () => {};
    const handler = () => syncFavorite();
    window.addEventListener("favorites:updated", handler);
    return () => {
      isActive = false;
      window.removeEventListener("favorites:updated", handler);
    };
  }, [product.id]);

  const handleAddToCart = async () => {
    if (!product?.id || isAdding) return;
    setIsAdding(true);
    try {
      await addToCart(product.id, 1);
    } catch (error) {
      console.error("Failed to add item to cart", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!product?.id || favoriteBusy) return;
    setFavoriteBusy(true);
    try {
      await toggleFavorite(product.id);
      setIsFavoriteActive(isFavorite(product.id));
    } finally {
      setFavoriteBusy(false);
    }
  };

  return (
    <li className="a-product-list__item">
      <div className="product-card-line-tile">
        {isMobile ? (
          <>
            <div className="product-card-line-tile--mobile-badges">
              <ul className="a-main-badge-list product-card-line-tile__badges">
                {discountAmount > 0 ? (
                  <li className="a-main-badge-list__item">
                    <div
                      className="a-main-badge-list__badge"
                      style={{
                        "--badge-title": formatSeoText(formattedDiscount),
                        backgroundColor: "#F35643",
                      }}
                    />
                  </li>
                ) : null}
              </ul>
              <div className="product-card-line-tile__picture-area">
                <div className="product-card-line-tile__picture-container">
                  <div className="a-gallery-carousel">
                    <div className="a-gallery-carousel__gallery">
                      <div className="a-gallery-carousel__container swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-android">
                        <div className="a-gallery-carousel__mousemove" />
                        <div
                          className="a-gallery-carousel__wrapper swiper-wrapper"
                          style={{
                            transform: "translate3d(0px, 0px, 0px)",
                          }}
                        >
                          {(limitedImages.length > 0
                            ? limitedImages
                            : [{ id: "fallback", url: fallbackImage }]
                          ).map((image: any, index: number) => {
                            const normalized = normalizeImageUrl(image.url);
                            const classes = [
                              "a-gallery-carousel__slide",
                              "swiper-slide",
                            ];
                            if (index === 0)
                              classes.push("swiper-slide-active");
                            if (index === 1) classes.push("swiper-slide-next");
                            return (
                              <div
                                key={image.id || `${product.id}-${index}`}
                                className={classes.join(" ")}
                                style={{ width: "106px" }}
                              >
                                <div className="a-gallery-carousel__card">
                                  <div className="a-picture-card" title="">
                                    <img
                                      src={normalized}
                                      alt={image.alt || product.name || ""}
                                      className={`a-picture-card__picture a-lazy-load${index < 2 ? " a-is-loaded" : ""}`}
                                    />
                                    <span />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="a-gallery-carousel__navigation">
                        <button
                          type="button"
                          className={`a-gallery-carousel__button a-gallery-carousel__button--prev swiper-button-prev${activeIndex === 0 ? " swiper-button-disabled" : ""}`}
                          disabled={activeIndex === 0}
                        >
                          <svg className="a-svg">
                            <use
                              xlinkHref="#icon-chevron-left"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="a-gallery-carousel__button a-gallery-carousel__button--next swiper-button-next"
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
                    <div
                      className="a-gallery-carousel__thumbs a-gallery-carousel__thumbs--short"
                      style={{
                        "--width-thumbs": "96px",
                      }}
                    >
                      <div className="a-gallery-carousel__container swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-android swiper-container-thumbs">
                        <div className="a-gallery-carousel__wrapper swiper-wrapper a-gallery-carousel__wrapper--center">
                          {(limitedImages.length > 0
                            ? limitedImages
                            : [{ id: "fallback", url: fallbackImage }]
                          ).map((image: any, index: number) => {
                            const thumbClasses = [
                              "a-gallery-carousel__slide",
                              "swiper-slide",
                              "a-gallery-carousel__slide--bullet",
                            ];
                            if (index === 0) {
                              thumbClasses.push(
                                "swiper-slide-active",
                                "swiper-slide-thumb-active",
                              );
                            }
                            if (index === 1) {
                              thumbClasses.push("swiper-slide-next");
                            }
                            return (
                              <div
                                key={`thumb-${image.id || index}`}
                                className={thumbClasses.join(" ")}
                                style={{ width: "8px", marginRight: "4px" }}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-card-line-tile__group-title">
                {product.code ? (
                  <span
                    className="seo-text product-card-line-tile__props product-card-line-tile__props--no-margin"
                    style={{
                      "--seo-text": formatSeoText(`Код: ${product.code}`),
                    }}
                  />
                ) : null}
                <a
                  className="product-card-line-tile__title"
                  href={product.href || "#"}
                >
                  <span>{product.name}</span>
                </a>
                <a
                  className="product-card-line-tile__status"
                  href={product.reviews_href || "#"}
                >
                  <div className="a-rating">
                    <ul className="a-rating__list">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <li
                          key={`rating-${product.id}-${index}`}
                          className={`a-rating__item${index < ratingActive ? " a-rating__item--active" : ""}`}
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
                      ))}
                    </ul>
                    <div className="a-rating__count">{ratingValue}</div>
                  </div>
                </a>
              </div>
              <div className="product-card-line-tile__props">
                {product.attributes?.length
                  ? product.attributes.slice(0, 6).map((attribute: any) => (
                      <div key={attribute.id}>
                        <span
                          className="seo-text"
                          style={{
                            "--seo-text": formatSeoText(attribute.name),
                          }}
                        />
                        <span
                          className="seo-text product-card-line-tile__prop-value"
                          style={{
                            "--seo-text": formatSeoText(attribute.value),
                          }}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </>
        ) : (
          <div className="product-card-line-tile__content product-card-line-tile__content--higher">
            {discountAmount > 0 ? (
              <ul className="a-main-badge-list product-card-line-tile__badges">
                <li className="a-main-badge-list__item">
                  <div
                    className="a-main-badge-list__badge"
                    style={{
                      "--badge-title": formatSeoText(formattedDiscount),
                      backgroundColor: "rgb(243, 86, 67)",
                    }}
                  />
                </li>
              </ul>
            ) : null}
            <div className="product-card-line-tile__picture-area">
              <div
                className="product-card-line-tile__picture-container"
                onMouseLeave={() => {
                  if (hasGallery) {
                    setActiveIndex(0);
                  }
                }}
              >
                {limitedImages.length > 0 ? (
                  limitedImages.map((image: any, index: number) => (
                    <div
                      key={image.id || `${product.id}-${index}`}
                      className="a-picture-card"
                      style={index !== activeIndex ? { display: "none" } : {}}
                      title=""
                    >
                      <img
                        alt={image.alt || product.name || ""}
                        className="a-picture-card__picture a-lazy-load a-is-loaded"
                        src={normalizeImageUrl(image.url)}
                      />
                      <span />
                    </div>
                  ))
                ) : (
                  <div className="a-picture-card" style={{}} title="">
                    <img
                      alt={product.name || ""}
                      className="a-picture-card__picture a-lazy-load"
                      src={fallbackImage}
                    />
                    <span />
                  </div>
                )}
                {hasGallery ? (
                  <>
                    <div className="product-card-line-tile__picture-overlay">
                      {limitedImages.map((_: any, index: number) => (
                        <div
                          key={`overlay-${product.id}-${index}`}
                          onMouseEnter={() => setActiveIndex(index)}
                        />
                      ))}
                    </div>
                    <div className="product-card-line-tile__picture-thumbs">
                      {limitedImages.map((_: any, index: number) => (
                        <div
                          key={`thumb-${product.id}-${index}`}
                          className={
                            index === activeIndex
                              ? "product-card-line-tile__picture-thumb--active"
                              : ""
                          }
                        />
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
              <div className="product-card-line-tile__mark-list">
                <svg className="a-svg product-card-line-tile__mark-item product-card-line-tile__mark-item--color-blue">
                  <use
                    xlinkHref="#icon-bigam-sign-solid"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  />
                </svg>
              </div>
            </div>
            <div className="product-card-line-tile__group-title">
              {product.code ? (
                <span
                  className="seo-text product-card-line-tile__props product-card-line-tile__props--no-margin"
                  style={{
                    "--seo-text": formatSeoText(`Код: ${product.code}`),
                  }}
                />
              ) : null}
              <a
                className="product-card-line-tile__title"
                href={product.href || "#"}
              >
                <span>{product.name}</span>
              </a>
              <a
                className="product-card-line-tile__status"
                href={product.reviews_href || "#"}
              >
                <div className="a-rating">
                  <ul className="a-rating__list">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <li
                        key={`rating-${product.id}-${index}`}
                        className={`a-rating__item${index < ratingActive ? " a-rating__item--active" : ""}`}
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
                    ))}
                  </ul>
                  <div className="a-rating__count">{ratingValue}</div>
                </div>
              </a>
            </div>
            <div className="product-card-line-tile__props">
              {product.attributes?.length
                ? product.attributes.slice(0, 6).map((attribute: any) => (
                    <div key={attribute.id}>
                      <span
                        className="seo-text"
                        style={{
                          "--seo-text": formatSeoText(attribute.name),
                        }}
                      />
                      <span
                        className="seo-text product-card-line-tile__prop-value"
                        style={{
                          "--seo-text": formatSeoText(attribute.value),
                        }}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        )}
        <div className="product-card-line-tile__price-actions">
          <div className="product-card-line-tile__price-add-help">
            <div className="product-card-line-tile__left-side">
              <div className="product-card-line-tile__description">
                <div className="product-card-line-tile__price">
                  <div
                    afterauthorization={product.price}
                    className="a-price"
                    discount={product.discount_percent || 0}
                    minbonusprice={product.min_bonus_price || ""}
                    retail={product.retail_price || ""}
                    showretail={String(hasDiscount)}
                    showpersonalpricedifference={String(
                      product.show_personal_price_difference ?? true,
                    )}
                  >
                    <div className="a-price__new">{formattedPrice} ₽</div>
                    {hasDiscount ? (
                      <div className="a-price__old">{formattedRetail} ₽</div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="product-card-line-tile__buttons">
                <div className="product-buttons-add">
                  <button
                    className="a-main-button a-main-button--display-inline a-main-button--type-auto a-main-button--corner-round a-main-button--color-orange"
                    type="button"
                    onClick={handleAddToCart}
                    disabled={isAdding}
                  >
                    <span className="a-main-button__wrap">
                      <span className="a-main-button__content">В корзину</span>
                    </span>
                  </button>
                </div>
                <div className="product-card-line-tile__helpers">
                  <div className="a-main-compare a-main-compare--type-line-tile">
                    <div
                      className="tooltip-main a-main-compare__tooltip tooltip-main--position-bottom-left"
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
                  <div
                    className={`a-main-like a-main-like--type-line-tile${
                      isFavoriteActive ? " a-main-like--active" : ""
                    }`}
                  >
                    <div
                      className="tooltip-main a-main-like__tooltip tooltip-main--position-bottom-left"
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
                      title={isFavoriteActive ? "Удалить" : "В избранное"}
                      type="button"
                      onClick={handleToggleFavorite}
                      disabled={favoriteBusy}
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
                      <span
                        className={`a-main-like__title ${
                          isFavoriteActive
                            ? "a-main-like__title--in-favorite"
                            : "a-main-like__title--to-favorite"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="product-card-line-tile__buy-one-click">
            <button
              aria-label="Заказ в 1 клик"
              className="a-link-button"
              title="Заказ в 1 клик"
              type="button"
              onClick={() => setIsFastOrderOpen(true)}
            >
              <span
                className="seo-text a-link-button__content a-link-button__content--orange a-link-button__content--underline a-link-button__content--underline-solid"
                style={{
                  "--seo-text": "'Заказ в 1 клик'",
                }}
              />
            </button>
          </div>
          <div className="product-card-line-tile__deliveries" />
        </div>
      </div>
      <FastOrderModal
        isOpen={isFastOrderOpen}
        onClose={() => setIsFastOrderOpen(false)}
        product={product}
      />
    </li>
  );
}
