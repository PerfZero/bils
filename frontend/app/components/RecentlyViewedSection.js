"use client";

import { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { API_BASE_URL } from "../../config/api";
import { addToCart } from "../lib/cart";

const RECENTLY_VIEWED_KEY = "mms_recently_viewed";
const MAX_ITEMS = 4;

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

function renderStars(rating) {
  const fullStars = Math.round(Number(rating || 0));
  return (
    <div className="a-rating">
      <ul className="a-rating__list">
        {Array.from({ length: 5 }).map((_, index) => (
          <li
            key={`star-${index}`}
            className={`a-rating__item${index < fullStars ? " a-rating__item--active" : ""}`}
          >
            <svg className="a-svg a-rating__icon a-rating__icon--inactive a-rating__icon--color-grey">
              <use xlinkHref="#icon-star"></use>
            </svg>
            {index < fullStars ? (
              <svg className="a-svg a-rating__icon a-rating__icon--active a-rating__icon--color-orange">
                <use xlinkHref="#icon-star"></use>
              </svg>
            ) : null}
          </li>
        ))}
      </ul>
      <div className="a-rating__count">{Number(rating || 0).toFixed(1)}</div>
    </div>
  );
}

function readRecentlyViewed() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENTLY_VIEWED_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

export default function RecentlyViewedSection() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(readRecentlyViewed());
    const handler = () => setItems(readRecentlyViewed());
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const products = useMemo(() => {
    return items
      .slice()
      .sort((a, b) => (b?.viewed_at || 0) - (a?.viewed_at || 0))
      .slice(0, MAX_ITEMS);
  }, [items]);

  if (!products.length) return null;

  return (
    <section className="a-page-main__recently-viewed">
      <div className="a-page-main__container">
        <h2 className="a-page-main__title a-title-h2">Вы недавно смотрели</h2>
        <div className="a-card-carousel a-card-carousel--type-product-horizontal">
          <Swiper
            spaceBetween={24}
            slidesPerView="auto"
            className="a-card-carousel__container"
            wrapperClass="a-card-carousel__wrapper"
          >
            {products.map((product) => {
              const image = normalizeImageUrl(product.image);
              const price = Number(product.price || 0);
              const retail = Number(product.retail_price || 0);
              const hasDiscount = retail > price && price > 0;
              const href = product.href || `/product/${product.slug}/`;
              return (
                <SwiperSlide
                  key={product.id || product.slug}
                  className="a-card-carousel__slide"
                >
                  <div className="a-card-carousel__card">
                    <div className="a-product-card a-product-card--type-horizontal-vertical">
                      <a href={href} className="a-product-card__preview">
                        <img
                          src={image}
                          alt={product.name}
                          title={product.name}
                          className="a-product-card__picture a-lazy-load a-is-loaded"
                        />
                        <span></span>
                      </a>
                      <div className="a-product-card__description">
                        <div className="a-product-card__price">
                          <div className="a-price">
                            <div className="a-price__new">
                              {formatPrice(price)}
                            </div>
                            {hasDiscount ? (
                              <div className="a-price__old">
                                {formatPrice(retail)}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="a-product-card__status">
                          {renderStars(product.rating)}
                        </div>
                        <div className="a-product-card__title">
                          <a href={href} title={product.name}>
                            {product.name}
                          </a>
                        </div>
                      </div>
                      <div className="a-product-card__buttons">
                        <button
                          type="button"
                          className="a-main-button a-product-card__add a-main-button--display-inline a-main-button--type-auto a-main-button--corner-round a-main-button--color-orange"
                          onClick={() => addToCart(product.id, 1)}
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
                            onClick={() => addToCart(product.id, 1)}
                          >
                            <span className="a-main-button__constrain">
                              <svg className="a-svg a-main-button__icon a-main-button__icon--center a-svg--medium a-main-button__icon--icon-cart-stroke a-main-button__icon--color">
                                <use xlinkHref="#icon-cart-stroke"></use>
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                      <a href={href} className="a-product-card__link"></a>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
