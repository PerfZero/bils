"use client";

import { useEffect, useMemo, useState } from "react";
import { addToCart } from "../lib/cart";
import { API_BASE_URL } from "../../config/api";

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

function formatItemCount(count) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return `${count} товар`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return `${count} товара`;
  }
  return `${count} товаров`;
}

export default function ShareCartPage({ searchParams }) {
  const productsParam = searchParams?.products || "";
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;
    const load = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/share-cart/?products=${encodeURIComponent(
            productsParam,
          )}`,
        );
        const payload = await response.json();
        if (!response.ok) {
          throw new Error(payload?.detail || "Не удалось загрузить корзину.");
        }
        if (isActive) {
          setData(payload);
        }
      } catch (err) {
        if (isActive) {
          setError("Не удалось загрузить корзину.");
        }
      } finally {
        if (isActive) setLoading(false);
      }
    };
    load();
    return () => {
      isActive = false;
    };
  }, [productsParam]);

  const items = data?.items || [];
  const totalQuantity = data?.total_quantity || 0;
  const totalPrice = data?.total_price || 0;
  const totalDiscount = data?.total_discount || 0;

  const hasItems = items.length > 0;

  const handleAddAll = async () => {
    if (!hasItems || adding) return;
    setAdding(true);
    try {
      for (const item of items) {
        await addToCart(item.product_id, item.quantity);
      }
      window.location.href = "/personal/cart/";
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <main className="a-page-personal a-page-personal--bg-grey page-share-cart a-page__main">
        <div className="a-page-personal__container">
          <div className="a-page-personal__content a-page-cart">
            <p>Загрузка...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="a-page-personal a-page-personal--bg-grey page-share-cart a-page__main">
        <div className="a-page-personal__container">
          <div className="a-page-personal__content a-page-cart">
            <p>{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="a-page-personal a-page-personal--bg-grey page-share-cart a-page__main">
      <div className="a-page-personal__container">
        <div className="a-page-personal__content a-page-cart">
          <div className="a-page-cart__title">
            <h1 className="a-title__h1">С вами поделились корзиной</h1>
          </div>
          <div className="page-share-cart__container">
            <div className="page-share-cart__offers">
              <div>
                <div className="page-share-cart__content-title">
                  Вы можете добавить этот список в свою корзину
                </div>
                <section className="a-page-cart__content">
                  <div className="a-cart-table">
                    <div className="a-cart-table__body">
                      {items.map((item) => {
                        const retail =
                          item.total_retail && Number(item.total_retail) > 0
                            ? formatPrice(item.total_retail)
                            : null;
                        return (
                          <div
                            className="a-cart-table__row"
                            key={item.product_id}
                          >
                            <div className="a-cart-table__product">
                              <div className="a-cart-table__preview">
                                <div
                                  className="a-picture-card"
                                  title={item.product_name}
                                >
                                  <img
                                    alt={item.product_name}
                                    className="a-picture-card__picture a-lazy-load a-is-loaded"
                                    src={normalizeImageUrl(item.product_image)}
                                  />
                                  <span />
                                </div>
                              </div>
                              <div className="a-cart-table__info">
                                {item.discount_total &&
                                Number(item.discount_total) > 0 ? (
                                  <ul className="a-main-badge-list">
                                    <li className="a-main-badge-list__item">
                                      <div
                                        className="a-main-badge-list__badge"
                                        style={{
                                          "--badge-title": `'${formatPrice(
                                            item.discount_total,
                                          )}'`,
                                          backgroundColor: "rgb(243, 86, 67)",
                                        }}
                                      />
                                    </li>
                                  </ul>
                                ) : null}
                                <div className="a-cart-table__info-content">
                                  <a
                                    className="a-link-button a-cart-table__title"
                                    href={item.href}
                                  >
                                    <span className="a-link-button__content a-link-button__content--black">
                                      {item.product_name}
                                    </span>
                                  </a>
                                </div>
                                <div className="a-cart-table__info-quantity">
                                  {item.quantity}
                                </div>
                                <p className="a-cart-table__info-quantity-price a-cart-table__text" />
                              </div>
                              <div className="a-cart-table__price">
                                <div className="a-cart-table__price-sum a-cart-table__price-sum--margin">
                                  <div className="a-price">
                                    <div className="a-price__new">
                                      {formatPrice(item.total)}
                                    </div>
                                    {retail ? (
                                      <div className="a-price__old">
                                        {retail}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <div
              className="a-main-sidebar a-page-personal__sidebar a-page-personal__sidebar--right a-page-personal__sidebar--share-cart"
              data-v-sticky-container=""
              style={{ position: "relative" }}
            >
              <aside className="a-main-sidebar__bar">
                <div
                  className="a-main-sidebar__sticky"
                  data-v-sticky-inner=""
                  style={{ position: "relative" }}
                >
                  <div className="a-main-sidebar__summary">
                    <div className="a-main-sidebar__results">
                      <div className="a-main-sidebar__info">
                        <div className="a-main-sidebar__info-row">
                          <div className="a-main-sidebar__info-key">
                            Всего {formatItemCount(totalQuantity)}
                          </div>
                          <div className="a-main-sidebar__info-value">
                            {formatPrice(totalPrice)}
                          </div>
                        </div>
                        {totalDiscount > 0 ? (
                          <div className="a-main-sidebar__info-row">
                            <div className="a-main-sidebar__info-key">
                              Скидка
                            </div>
                            <div className="a-main-sidebar__info-value a-main-sidebar__info-value--discount">
                              -{formatPrice(totalDiscount)}
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <hr />
                      <div className="a-main-sidebar__cost">
                        <div className="a-main-sidebar__cost-key">Итого</div>
                        <div className="a-main-sidebar__cost-value">
                          {formatPrice(totalPrice)}
                        </div>
                      </div>
                    </div>
                    <div className="a-main-sidebar__button">
                      <button
                        className="a-main-button a-main-button--display-block a-main-button--type-auto a-main-button--corner-round a-main-button--color-orange"
                        type="button"
                        onClick={handleAddAll}
                        disabled={!hasItems || adding}
                      >
                        <span className="a-main-button__wrap">
                          <span className="a-main-button__content">
                            добавить в корзину
                          </span>
                        </span>
                      </button>
                    </div>
                    <div className="a-main-sidebar__type">
                      <span>
                        Цены указаны при
                        <div
                          className="a-tooltip a-sidebar__tooltip"
                          tabIndex="0"
                        >
                          <div className="a-link a-link--blue">
                            заказе на сайте
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
          <div className="v-portal" style={{ display: "none" }} />
        </div>
      </div>
    </main>
  );
}
