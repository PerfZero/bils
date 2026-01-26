"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { isFavorite, loadFavorites, toggleFavorite } from "../lib/favorites";
import { isCompared, toggleCompare } from "../lib/compare";

const formatPrice = (value) => {
  if (!Number.isFinite(value)) {
    return null;
  }
  return `${value.toLocaleString("ru-RU")}\u00A0₽`;
};

const renderStars = (rating) => {
  const safeRating = Number.isFinite(rating) ? rating : 0;
  const fullStars = Math.floor(safeRating);

  return (
    <div className="a-rating">
      <ul className="a-rating__list">
        {[...Array(5)].map((_, index) => (
          <li
            key={index}
            className={`a-rating__item ${
              index < fullStars ? "a-rating__item--active" : ""
            }`}
          >
            <svg className="a-svg a-rating__icon a-rating__icon--inactive a-rating__icon--color-grey">
              <use xlinkHref="#icon-star"></use>
            </svg>
            {index < fullStars && (
              <svg className="a-svg a-rating__icon a-rating__icon--active a-rating__icon--color-orange">
                <use xlinkHref="#icon-star"></use>
              </svg>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function NewArrivalsSection({ products = [] }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);
  const [, setFavoritesTick] = useState(0);
  const [, setCompareTick] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    loadFavorites().catch(() => {});
    const handler = () => setFavoritesTick((tick) => tick + 1);
    window.addEventListener("favorites:updated", handler);
    return () => window.removeEventListener("favorites:updated", handler);
  }, []);

  useEffect(() => {
    const handler = () => setCompareTick((tick) => tick + 1);
    window.addEventListener("compare:updated", handler);
    return () => window.removeEventListener("compare:updated", handler);
  }, []);

  return (
    <section className="a-page-main__novelty">
      <div className="a-page-main__container">
        <h2 className="a-page-main__title a-title-h2">Новинки</h2>
        <div className="a-card-carousel a-card-carousel--type-product-vertical">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView="auto"
            pagination={{
              el: paginationRef.current,
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
            navigation
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.params.pagination.el = paginationRef.current;
            }}
            className="a-card-carousel__container swiper-container"
            wrapperClass="a-card-carousel__wrapper"
          >
            {products.map((product) => {
              const favoriteActive = isFavorite(product.id);
              const compareActive = isCompared(product.id);
              return (
                <SwiperSlide
                  key={product.id}
                  className="a-card-carousel__slide"
                >
                  <div className="a-card-carousel__card">
                    <div className="a-product-card a-product-card--type-vertical-vertical">
                      <a href={product.url} className="a-product-card__preview">
                        <img
                          src={product.image}
                          alt={product.title}
                          title={product.title}
                          className="a-product-card__picture a-lazy-load a-is-loaded"
                        />
                        <span></span>
                      </a>

                      <div className="a-product-card__description">
                        <div className="a-product-card__price">
                          <div className="a-price">
                            {product.oldPrice ? (
                              <>
                                <div className="a-price__new">
                                  {formatPrice(product.price) ||
                                    "Цена по запросу"}
                                </div>
                                <div className="a-price__old">
                                  {formatPrice(product.oldPrice)}
                                </div>
                              </>
                            ) : (
                              <div className="a-price__current">
                                {formatPrice(product.price) ||
                                  "Цена по запросу"}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="a-product-card__status">
                          {renderStars(product.rating)}
                        </div>

                        <div className="a-product-card__title">
                          <a href={product.url} title={product.title}>
                            {product.title}
                          </a>
                        </div>
                      </div>

                      {Number.isFinite(product.discount) &&
                        product.discount > 0 && (
                          <div className="a-product-card__badges">
                            <ul className="a-main-badge-list a-main-badge-list--load">
                              <li className="a-main-badge-list__item">
                                <div
                                  className="a-main-badge-list__badge"
                                  style={{
                                    "--badge-title": `'-${product.discount.toLocaleString("ru-RU")} ₽'`,
                                    backgroundColor: "#F35643",
                                  }}
                                ></div>
                              </li>
                            </ul>
                          </div>
                        )}

                      <div className="a-product-card__helpers">
                        <div
                          className={`a-main-compare a-main-compare--type-vertical-vertical${
                            compareActive ? " a-main-compare--active" : ""
                          }`}
                        >
                          <div className="tooltip-main a-main-compare__tooltip tooltip-main--position-left">
                            <div className="tooltip-main__content">
                              <a
                                href="/personal/compare/"
                                className="a-link-button"
                              >
                                <span className="a-link-button__content a-link-button__content--black"></span>
                              </a>
                            </div>
                          </div>
                          <button
                            title={compareActive ? "Удалить" : "В сравнение"}
                            type="button"
                            className="a-main-compare__helper"
                            onClick={() => toggleCompare(product.id)}
                          >
                            <span className="a-main-compare__icon">
                              <svg className="a-svg">
                                <use xlinkHref="#icon-comparison-stroke"></use>
                              </svg>
                              <svg className="a-svg">
                                <use xlinkHref="#icon-comparison-solid"></use>
                              </svg>
                            </span>
                            <span
                              className={`a-main-compare__title ${
                                compareActive
                                  ? "a-main-compare__title--in-compare"
                                  : "a-main-compare__title--to-compare"
                              }`}
                            ></span>
                          </button>
                        </div>

                        <div
                          className={`a-main-like a-main-like--type-vertical-vertical${
                            favoriteActive ? " a-main-like--active" : ""
                          }`}
                        >
                          <div className="tooltip-main a-main-like__tooltip tooltip-main--position-left">
                            <div className="tooltip-main__content">
                              <a
                                href="/personal/favorites/"
                                className="a-link-button"
                              >
                                <span className="a-link-button__content a-link-button__content--black"></span>
                              </a>
                            </div>
                          </div>
                          <button
                            title={favoriteActive ? "Удалить" : "В избранное"}
                            type="button"
                            className="a-main-like__helper"
                            onClick={() => toggleFavorite(product.id)}
                          >
                            <span className="a-main-like__icon">
                              <svg className="a-svg">
                                <use xlinkHref="#icon-favorite-stroke"></use>
                              </svg>
                              <svg className="a-svg">
                                <use xlinkHref="#icon-favorite-solid"></use>
                              </svg>
                            </span>
                            <span
                              className={`a-main-like__title ${
                                favoriteActive
                                  ? "a-main-like__title--in-favorite"
                                  : "a-main-like__title--to-favorite"
                              }`}
                            ></span>
                          </button>
                        </div>
                      </div>

                      <div className="a-product-card__buttons">
                        <button
                          type="button"
                          className="a-main-button a-product-card__add a-main-button--display-inline a-main-button--type-auto a-main-button--corner-round a-main-button--color-orange"
                        >
                          <span className="a-main-button__wrap">
                            <span className="a-main-button__content">
                              В корзину
                            </span>
                          </span>
                        </button>

                        <div className="a-product-card__mini-add">
                          <button
                            type="button"
                            className="a-main-button a-main-button--display-inline a-main-button--type-auto a-main-button--corner-round a-main-button--color-orange"
                          >
                            <span className="a-main-button__constrain">
                              <svg className="a-svg a-main-button__icon a-main-button__icon--center a-svg--medium a-main-button__icon--icon-cart-stroke a-main-button__icon--color">
                                <use xlinkHref="#icon-cart-stroke"></use>
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>

                      <a
                        href={product.url}
                        className="a-product-card__link"
                      ></a>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="a-card-carousel__navigation">
            <button
              type="button"
              className="a-card-carousel__button a-card-carousel__button--prev"
              ref={prevRef}
            >
              <svg className="a-svg">
                <use xlinkHref="#icon-chevron-left"></use>
              </svg>
            </button>

            <div
              className="a-card-carousel__pagination"
              ref={paginationRef}
            ></div>

            <button
              type="button"
              className="a-card-carousel__button a-card-carousel__button--next"
              ref={nextRef}
            >
              <svg className="a-svg">
                <use xlinkHref="#icon-chevron-right"></use>
              </svg>
            </button>
          </div>
        </div>

        <a
          href="/catalog/new/"
          className="a-main-button a-page-main__button-all a-main-button--display-inline a-main-button--type-large a-main-button--corner-round a-main-button--color-light-orange"
        >
          <span className="a-main-button__wrap">
            <span className="a-main-button__content">Все товары</span>
            <span className="a-main-button__constrain">
              <svg className="a-svg a-main-button__icon a-main-button__icon--right a-svg--medium a-main-button__icon--icon-meatballs a-main-button__icon--color">
                <use xlinkHref="#icon-meatballs"></use>
              </svg>
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}
