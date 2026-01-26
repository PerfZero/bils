"use client";

import { useEffect, useState } from "react";
import { isFavorite, loadFavorites, toggleFavorite } from "../lib/favorites";

export default function RecommendedProducts() {
  const [, setFavoritesTick] = useState(0);
  const products = [
    {
      id: 1,
      title: "Бензиновый триммер Denzel DGT-520S",
      href: "/product/denzel-trimmer-benzinovyj-dgt-520s-52sm3-3-l-s-razemnaya-shtanga-sostoit-iz-2-chastej-1147241/",
      image:
        "https://cdn.bigam.ru/resize_cache/681859/ae1d3c12631bcd92ab74e2237d30068a/iblock/6f9/6f97bb59793c635806fcd0010601254e/1147241.jpg",
      price: {
        current: "13 560 ₽",
        old: "13 840 ₽",
      },
      rating: 4.8,
      badge: {
        title: "-280 ₽",
        color: "#F35643",
      },
    },
    {
      id: 2,
      title: "Угловая шлифмашина Интерскол (болгарка) УШМ-125/900",
      href: "/product/interskol-shlifmashina-uglovaya-ushm-125900-671-1-0-00-1124014/",
      image:
        "https://cdn.bigam.ru/resize_cache/iblock/ca3/e50a5enry0yc8f01f2ms2hab0llfh25t/400_364_0/1124014.jpg",
      price: {
        current: "3 550 ₽",
      },
      rating: 4.0,
    },
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="a-rating">
        <ul className="a-rating__list">
          {[...Array(5)].map((_, index) => (
            <li
              key={index}
              className={`a-rating__item ${index < fullStars ? "a-rating__item--active" : ""}`}
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
        <div className="a-rating__count">{rating}</div>
      </div>
    );
  };

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    loadFavorites().catch(() => {});
    const handler = () => setFavoritesTick((tick) => tick + 1);
    window.addEventListener("favorites:updated", handler);
    return () => window.removeEventListener("favorites:updated", handler);
  }, []);

  return (
    <section className="a-page-main__recommend">
      <div className="a-page-main__container">
        <div className="a-main-recommend-list">
          <div className="a-main-recommend-list__row">
            <div className="a-main-recommend-list__column">
              <div className="a-main-recommend-list__mark">
                <svg className="a-svg">
                  <use xlinkHref="#icon-last-recommend"></use>
                </svg>
              </div>
              <div className="a-main-recommend-list__logo">
                <div className="a-main-recommend-list__logo-icon">
                  <svg className="a-svg">
                    <use xlinkHref="#icon-last-bigam-logo"></use>
                  </svg>
                </div>
                <div className="a-main-recommend-list__logo-title">
                  Рекомендует
                </div>
              </div>
              <div className="a-main-recommend-list__text">
                Товары
                <br />
                которым
                <br />
                можно доверять
              </div>
              <div className="a-main-recommend-list__extend">
                <a
                  href="/catalog/recommended/"
                  rel="nofollow"
                  className="a-main-button a-main-button--display-inline a-main-button--type-large a-main-button--corner-round a-main-button--color-orange"
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
            </div>
            <div className="a-main-recommend-list__column">
              <ul className="a-main-recommend-list__list">
                {products.map((product) => {
                  const favoriteActive = isFavorite(product.id);
                  return (
                    <li
                      key={product.id}
                      className="a-main-recommend-list__item"
                    >
                      <div className="a-product-card a-product-card--type-vertical-vertical">
                        <a
                          href={product.href}
                          className="a-product-card__preview"
                        >
                          <img
                            src={product.image}
                            alt={product.title}
                            title={product.title}
                            className="a-product-card__picture a-lazy-load a-is-loaded"
                          />
                          <span></span>
                          <div className="a-product-card__mark-list">
                            <div className="a-product-card__mark-item a-product-card__mark-item--color-blue">
                              <svg className="a-svg">
                                <use xlinkHref="#icon-bigam-sign-solid"></use>
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="a-product-card__description">
                          <div className="a-product-card__price">
                            <div className="a-price">
                              {product.price.current && (
                                <div className="a-price__current">
                                  {product.price.current}
                                </div>
                              )}
                              {product.price.old && (
                                <div className="a-price__old">
                                  {product.price.old}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="a-product-card__status">
                            {renderStars(product.rating)}
                          </div>
                          <div className="a-product-card__title">
                            <a href={product.href} title={product.title}>
                              {product.title}
                            </a>
                          </div>
                        </div>
                        {product.badge && (
                          <div className="a-product-card__badges">
                            <ul className="a-main-badge-list">
                              <li className="a-main-badge-list__item">
                                <div
                                  className="a-main-badge-list__badge"
                                  style={{
                                    "--badge-title": `'${product.badge.title}'`,
                                    backgroundColor: product.badge.color,
                                  }}
                                ></div>
                              </li>
                            </ul>
                          </div>
                        )}
                        <div className="a-product-card__helpers">
                          <div className="a-main-compare a-main-compare--type-vertical-vertical">
                            <div
                              className="tooltip-main a-main-compare__tooltip tooltip-main--position-left"
                              color="white"
                            >
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
                              title="В сравнение"
                              type="button"
                              className="a-main-compare__helper"
                            >
                              <span className="a-main-compare__icon">
                                <svg className="a-svg">
                                  <use xlinkHref="#icon-comparison-stroke"></use>
                                </svg>
                                <svg className="a-svg">
                                  <use xlinkHref="#icon-comparison-solid"></use>
                                </svg>
                              </span>
                              <span className="a-main-compare__title a-main-compare__title--to-compare"></span>
                            </button>
                          </div>
                          <div
                            className={`a-main-like a-main-like--type-vertical-vertical${
                              favoriteActive ? " a-main-like--active" : ""
                            }`}
                          >
                            <div
                              className="tooltip-main a-main-like__tooltip tooltip-main--position-left"
                              color="white"
                            >
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
                          href={product.href}
                          className="a-product-card__link"
                        ></a>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="a-main-recommend-list__footer">
            <a
              href="/catalog/recommended/"
              rel="nofollow"
              className="a-main-button a-main-button--display-block a-main-button--type-medium a-main-button--corner-round a-main-button--color-light-orange"
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
        </div>
      </div>
    </section>
  );
}
