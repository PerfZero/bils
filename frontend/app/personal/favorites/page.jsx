"use client";

import { useEffect, useMemo, useState } from "react";
import {
  clearFavorites,
  getOrCreateFavorites,
  removeFavoriteItem,
} from "../../lib/favorites";
import { addToCart } from "../../lib/cart";
import { API_BASE_URL } from "../../../config/api";

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

export default function FavoritesPage() {
  const [favoritesToken, setFavoritesToken] = useState(null);
  const [favorites, setFavorites] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingItem, setUpdatingItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isActive = true;
    const loadFavorites = async () => {
      try {
        const { token, favorites: payload } = await getOrCreateFavorites();
        if (!isActive) return;
        setFavoritesToken(token);
        setFavorites(payload);
      } catch (err) {
        if (!isActive) return;
        setError("Не удалось загрузить избранное.");
      } finally {
        if (isActive) setLoading(false);
      }
    };
    loadFavorites();
    return () => {
      isActive = false;
    };
  }, []);

  const items = useMemo(() => favorites?.items || [], [favorites]);

  const handleRemoveItem = async (itemId) => {
    if (!favoritesToken) return;
    setUpdatingItem(itemId);
    try {
      const updated = await removeFavoriteItem(favoritesToken, itemId);
      setFavorites(updated);
    } catch (err) {
      setError("Не удалось удалить товар из избранного.");
    } finally {
      setUpdatingItem(null);
    }
  };

  const handleClear = async () => {
    if (!favoritesToken || items.length === 0) return;
    setUpdatingItem("clear");
    try {
      const updated = await clearFavorites(favoritesToken);
      setFavorites(updated);
    } catch (err) {
      setError("Не удалось очистить избранное.");
    } finally {
      setUpdatingItem(null);
    }
  };

  const handleAddToCart = async (productId) => {
    if (!productId) return;
    try {
      await addToCart(productId, 1);
    } catch (err) {
      setError("Не удалось добавить товар в корзину.");
    }
  };

  return (
    <main className="a-page-personal a-page__main">
      <div className="a-page-personal__container">
        <ul className="a-breadcrumbs a-page-personal__breadcrumbs">
          <li className="a-breadcrumbs__item">
            <a className="a-breadcrumbs__link nuxt-link-active" href="/">
              Главная
            </a>{" "}
          </li>
          <li className="a-breadcrumbs__item a-breadcrumbs__item--current">
            <span className="a-breadcrumbs__text">Избранное</span>
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
        <div className="a-page-personal__head">
          <div className="a-page-personal__head-content vue-portal-target">
            <h1 className="a-title__h1">Избранное</h1>{" "}
            <button
              aria-label="Очистить все"
              className="a-link-button"
              title="Очистить все"
              type="button"
              onClick={handleClear}
              disabled={updatingItem === "clear"}
            >
              <span className="a-link-button__icon a-link-button__icon--grey">
                <svg className="a-svg a-svg--medium">
                  <use xlinkHref="#icon-delete" />
                </svg>
              </span>{" "}
              <span className="a-link-button__content a-link-button__content--black">
                Очистить все
              </span>{" "}
            </button>
          </div>{" "}
          <div className="a-page-personal__head-append vue-portal-target" />
        </div>{" "}
        <div className="a-page-personal__wrap">
          <div className="a-page-personal__main a-page-personal__main--favourite a-page-personal__content">
            <div
              className="v-portal"
              style={{
                display: "none",
              }}
            />
            <div className="a-page-compare__auth">
              <span className="a-page-compare__auth-link">Авторизуйтесь</span>,
              чтобы сохранить список избранного для просмотра на этом и других
              устройствах
            </div>
            {error && (
              <div className="a-page-cart__error a-page-cart__error--inline">
                {error}
              </div>
            )}
            {loading ? (
              <div className="a-page-cart__empty">Загрузка...</div>
            ) : items.length === 0 ? (
              <div className="a-page-cart__empty">В избранном пока пусто.</div>
            ) : (
              <div
                className="a-product-list a-product-list--view-vertical-tile"
                id="product-list"
              >
                <div className="a-product-list__main">
                  <ul className="a-product-list__list">
                    {items.map((item) => (
                      <li className="a-product-list__item" key={item.id}>
                        <div className="a-product-card a-product-card--type-favorites">
                          <a
                            className="a-product-card__preview"
                            href={item.href}
                          >
                            <img
                              alt={item.product_name}
                              className="a-product-card__picture a-lazy-load a-is-loaded"
                              src={normalizeImageUrl(item.product_image)}
                              title={item.product_name}
                            />{" "}
                            <span />{" "}
                          </a>
                          <div className="a-product-card__description">
                            <div className="a-product-card__price">
                              <div className="a-price">
                                <div className="a-price__new">
                                  {formatPrice(item.price)}
                                </div>
                                {item.retail_price && (
                                  <div className="a-price__old">
                                    {formatPrice(item.retail_price)}
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
                              <a href={item.href} title={item.product_name}>
                                {item.product_name}
                              </a>
                            </div>
                          </div>
                          <div className="a-product-card__helpers">
                            <div className="a-main-like a-main-like--active a-main-like--type-favorites">
                              <button
                                className="a-main-like__helper"
                                title="Удалить"
                                type="button"
                                onClick={() => handleRemoveItem(item.id)}
                                disabled={updatingItem === item.id}
                              >
                                <span className="a-main-like__icon">
                                  <svg className="a-svg">
                                    <use xlinkHref="#icon-delete" />
                                  </svg>{" "}
                                  <svg className="a-svg">
                                    <use xlinkHref="#icon-delete" />
                                  </svg>
                                </span>{" "}
                                <span className="a-main-like__title a-main-like__title--in-favorite" />
                              </button>{" "}
                            </div>
                          </div>{" "}
                          <div className="a-product-card__buttons">
                            <button
                              className="a-main-button a-product-card__add a-main-button--display-inline a-main-button--type-auto a-main-button--corner-round a-main-button--color-orange"
                              type="button"
                              onClick={() => handleAddToCart(item.product_id)}
                            >
                              <span className="a-main-button__wrap">
                                <span className="a-main-button__content">
                                  В корзину
                                </span>
                              </span>
                            </button>{" "}
                            <div className="a-product-card__mini-add">
                              <button
                                className="a-main-button a-main-button--display-inline a-main-button--type-auto a-main-button--corner-round a-main-button--color-orange"
                                type="button"
                                onClick={() => handleAddToCart(item.product_id)}
                              >
                                <span className="a-main-button__constrain">
                                  <svg className="a-svg a-main-button__icon a-main-button__icon--center a-svg--medium a-main-button__icon--icon-cart-stroke a-main-button__icon--color">
                                    <use xlinkHref="#icon-cart-stroke" />
                                  </svg>
                                </span>
                              </button>{" "}
                            </div>
                          </div>{" "}
                          <a
                            className="a-product-card__link"
                            href={item.href}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>{" "}
                <div className="a-product-list__footer" />
              </div>
            )}
          </div>
        </div>
      </div>{" "}
      <div className="vue-portal-target" />
    </main>
  );
}
