"use client";

import { useEffect, useState } from "react";
import {
  getOrCreateCart,
  updateCartItem,
  removeCartItem,
  applyPromoCode,
  removePromoCode,
} from "../../lib/cart";
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

function formatItemCount(count) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return `${count} товар`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return `${count} товара`;
  }
  return `${count} товаров`;
}

export default function CartPage() {
  const [cartToken, setCartToken] = useState(null);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingItem, setUpdatingItem] = useState(null);
  const [error, setError] = useState(null);
  const [selectedItemIds, setSelectedItemIds] = useState(new Set());
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const [promoBusy, setPromoBusy] = useState(false);
  const [shareAlert, setShareAlert] = useState(false);

  useEffect(() => {
    let isActive = true;
    const loadCart = async () => {
      try {
        const { token, cart: payload } = await getOrCreateCart();
        if (!isActive) return;
        setCartToken(token);
        setCart(payload);
      } catch (err) {
        if (!isActive) return;
        setError("Не удалось загрузить корзину.");
      } finally {
        if (isActive) setLoading(false);
      }
    };
    loadCart();
    return () => {
      isActive = false;
    };
  }, []);

  const handleUpdateQuantity = async (itemId, nextQuantity) => {
    if (!cartToken || nextQuantity < 1) return;
    setUpdatingItem(itemId);
    try {
      const updated = await updateCartItem(cartToken, itemId, nextQuantity);
      setCart(updated);
    } catch (err) {
      setError("Не удалось обновить корзину.");
    } finally {
      setUpdatingItem(null);
    }
  };

  const handleRemoveItem = async (itemId) => {
    if (!cartToken) return;
    setUpdatingItem(itemId);
    try {
      const updated = await removeCartItem(cartToken, itemId);
      setCart(updated);
    } catch (err) {
      setError("Не удалось удалить товар.");
    } finally {
      setUpdatingItem(null);
    }
  };

  const handleToggleItem = (itemId, checked) => {
    setSelectedItemIds((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(itemId);
      } else {
        next.delete(itemId);
      }
      return next;
    });
  };

  const handleToggleAll = (checked) => {
    if (!checked) {
      setSelectedItemIds(new Set());
      return;
    }
    setSelectedItemIds(new Set(items.map((item) => item.id)));
  };

  const handleRemoveSelected = async () => {
    if (!cartToken || selectedItemIds.size === 0) return;
    setUpdatingItem("bulk");
    try {
      let updatedCart = cart;
      for (const itemId of selectedItemIds) {
        updatedCart = await removeCartItem(cartToken, itemId);
      }
      setCart(updatedCart);
      setSelectedItemIds(new Set());
    } catch (err) {
      setError("Не удалось удалить выбранные товары.");
    } finally {
      setUpdatingItem(null);
    }
  };

  const handleApplyPromo = async () => {
    if (!cartToken || promoBusy) return;
    setPromoBusy(true);
    setPromoError("");
    try {
      const updated = await applyPromoCode(cartToken, promoCode.trim());
      setCart(updated);
    } catch (err) {
      setPromoError(err?.message || "Не удалось применить промокод.");
    } finally {
      setPromoBusy(false);
    }
  };

  const handleClearPromo = async () => {
    if (!cartToken || promoBusy) return;
    setPromoBusy(true);
    setPromoError("");
    try {
      const updated = await removePromoCode(cartToken);
      setCart(updated);
      setPromoCode("");
    } catch (err) {
      setPromoError(err?.message || "Не удалось удалить промокод.");
    } finally {
      setPromoBusy(false);
    }
  };

  const handleShareCart = async () => {
    if (!items.length) return;
    const productsParam = items
      .map((item) => `${item.product_id}:${item.quantity}`)
      .join(",");
    if (!productsParam) return;
    const shareUrl = `${window.location.origin}/share-cart/?products=${encodeURIComponent(
      productsParam,
    )}&utm_source=sharecart`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareAlert(true);
      setTimeout(() => setShareAlert(false), 2000);
    } catch (error) {
      setError("Не удалось скопировать ссылку.");
    }
  };

  const items = cart?.items || [];
  const totalQuantity = cart?.total_quantity || 0;
  const totalPrice = cart?.total_price || 0;
  const totalDiscount = cart?.total_discount || 0;
  const promoDiscount = cart?.promo_discount || 0;
  const totalDue = cart?.total_due ?? totalPrice;
  const allSelected = items.length > 0 && selectedItemIds.size === items.length;

  useEffect(() => {
    setSelectedItemIds((prev) => {
      const next = new Set();
      items.forEach((item) => {
        if (prev.has(item.id)) {
          next.add(item.id);
        }
      });
      return next;
    });
  }, [items]);

  useEffect(() => {
    setPromoCode(cart?.promo_code || "");
  }, [cart?.promo_code]);

  if (loading) {
    return (
      <main className="a-page-personal a-page__main a-page-personal--bg-grey">
        <div className="a-page-personal__container">
          <div className="a-page-personal__wrap">
            <div className="a-page-cart a-page-personal__content a-page-personal__content--cart">
              <p>Загрузка...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="a-page-personal a-page__main a-page-personal--bg-grey">
        <div className="a-page-personal__container">
          <div className="a-page-personal__wrap">
            <div className="a-page-cart a-page-personal__content a-page-personal__content--cart">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!items.length) {
    return (
      <main className="a-page-personal a-page__main a-page-personal--bg-grey">
        <div className="a-page-personal__container">
          <div className="a-back a-page-personal__back">
            <a className="a-back__link nuxt-link-active" href="/personal/">
              <svg className="a-svg a-back__icon">
                <use
                  xlinkHref="#icon-old-arrow"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                />
              </svg>
              <span className="a-back__text">Назад</span>
            </a>
          </div>
          <div className="a-page-personal__head">
            <div className="a-page-personal__head-content vue-portal-target a-page-cart__head">
              <div className="a-page-cart__title">
                <h1 className="a-title__h1">Корзина</h1>
              </div>
            </div>
            <div className="a-page-personal__head-append vue-portal-target" />
          </div>
          <div className="a-page-personal__wrap">
            <div className="a-page-cart a-page-personal__content a-page-cart--empty a-page-personal__content--cart">
              <div className="v-portal" style={{ display: "none" }} />
              {/* <div className="choose-user a-page-cart__content">
                <div className="choose-user__auth">
                  <div className="choose-user__auth-text">
                    <span className="choose-user__text--bold">
                      Войдите или зарегистрируйтесь
                    </span>
                    <span className="choose-user__text">
                      Доступ к бонусным баллам, персональным ценам и скидкам
                    </span>
                  </div>
                  <button
                    className="a-main-button a-main-button--display-inline a-main-button--type-medium a-main-button--corner-round a-main-button--color-orange"
                    type="button"
                  >
                    <span className="a-main-button__wrap">
                      <span className="a-main-button__content">
                        Вход или регистрация
                      </span>
                    </span>
                  </button>
                </div>
              </div>*/}
              <section className="a-page-cart__content a-page-cart__content--empty">
                <h2>Добавьте в корзину нужные товары</h2>
                <p>
                  Чтобы их найти, перейдите в каталог товаров
                  <br />
                  или воспользуйтесь поиском
                </p>
                <div className="a-page-cart__content-buttons--empty">
                  <a
                    className="a-main-button a-main-button--display-inline a-main-button--type-medium a-main-button--corner-round a-main-button--color-orange"
                    href="/catalog/"
                  >
                    <span className="a-main-button__wrap">
                      <span className="a-main-button__content">
                        Каталог товаров
                      </span>
                    </span>
                  </a>
                  <a className="a-link-button nuxt-link-active" href="/">
                    <span className="a-link-button__content a-link-button__content--blue">
                      На главную
                    </span>
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="a-page-personal a-page__main a-page-personal--bg-grey">
      <div className="a-page-personal__container">
        <div className="a-page-personal__head">
          <div className="a-page-personal__head-content vue-portal-target a-page-cart__head">
            <div className="a-page-cart__title">
              <h1 className="a-title__h1">Корзина</h1>
              <div className="a-page-cart__count">
                {formatItemCount(totalQuantity)}
              </div>
            </div>
          </div>
          <div className="a-page-personal__head-append vue-portal-target " />
        </div>
        <div className="a-page-personal__wrap">
          <div className="a-page-cart a-page-personal__content a-page-personal__content--cart">
            <div className="v-portal" style={{ display: "none" }} />
            <div className="choose-user a-page-cart__content">
              <div className="choose-user__auth">
                <div className="choose-user__auth-text">
                  <span className="choose-user__text--bold">
                    Войдите или зарегистрируйтесь
                  </span>
                  <span className="choose-user__text">
                    Доступ к бонусным баллам, персональным ценам и скидкам
                  </span>
                </div>
                <button
                  className="a-main-button a-main-button--display-inline a-main-button--type-medium a-main-button--corner-round a-main-button--color-orange"
                  type="button"
                >
                  <span className="a-main-button__wrap">
                    <span className="a-main-button__content">
                      Вход или регистрация
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <section className="a-page-cart__content">
              <div className="a-cart-table">
                <div className="a-cart-table__head">
                  <div className="a-cart-table__head-options">
                    <div className="a-cart-table__select-all">
                      <div className="a-checkbox-field">
                        <label className="a-checkbox-field__constrain">
                          <input
                            className="a-checkbox-field__input"
                            defaultValue="false"
                            name=""
                            type="checkbox"
                            checked={allSelected}
                            onChange={(event) =>
                              handleToggleAll(event.target.checked)
                            }
                            disabled={updatingItem === "bulk"}
                          />
                          <span
                            className="a-checkbox-field__fake"
                            title="Выбрать все"
                          />
                          <span className="a-checkbox-field__label">
                            Выбрать все
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="a-cart-table__remove-all">
                      <button
                        aria-label="Удалить выбранные"
                        className="a-link-button"
                        title="Удалить выбранные"
                        type="button"
                        onClick={handleRemoveSelected}
                        disabled={
                          selectedItemIds.size === 0 || updatingItem === "bulk"
                        }
                      >
                        <span className="a-link-button__icon a-link-button__icon--grey">
                          <svg className="a-svg a-svg--medium">
                            <use
                              xlinkHref="#icon-delete"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                            />
                          </svg>
                        </span>
                        <span className="a-link-button__content a-link-button__content--black">
                          Удалить выбранные
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="a-cart-table__head-right-options a-cart-table__head-right-options--end">
                    <div className="a-cart-table__share-cart">
                      <button
                        aria-label="Поделиться"
                        className="a-link-button"
                        title="Поделиться"
                        type="button"
                        onClick={handleShareCart}
                      >
                        <span className="a-link-button__icon a-link-button__icon--grey">
                          <svg className="a-svg a-svg--medium">
                            <use
                              xlinkHref="#icon-share"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                            />
                          </svg>
                        </span>
                        <span className="a-link-button__content a-link-button__content--black">
                          Поделиться
                        </span>
                      </button>
                      {shareAlert ? (
                        <div className="a-main-alert a-main-alert--show a-main-alert--grey">
                          <svg className="a-svg a-main-alert__icon a-svg--medium a-main-alert__icon--black">
                            <use
                              xlinkHref="#icon-notice-stroke"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                            />
                          </svg>
                          <div className="a-main-alert__content a-main-alert__content--green">
                            Ссылка скопирована
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="a-cart-table__body">
                  {items.map((item) => {
                    const price = formatPrice(item.total);
                    const retail =
                      item.total_retail && Number(item.total_retail) > 0
                        ? formatPrice(item.total_retail)
                        : null;
                    const discountTotal =
                      item.discount_total && Number(item.discount_total) > 0
                        ? Number(item.discount_total)
                        : 0;
                    return (
                      <div className="a-cart-table__row" key={item.id}>
                        <div className="a-cart-table__product">
                          <div className="a-cart-table__selector">
                            <div className="a-checkbox-field">
                              <label className="a-checkbox-field__constrain">
                                <input
                                  className="a-checkbox-field__input"
                                  defaultValue="false"
                                  name=""
                                  type="checkbox"
                                  checked={selectedItemIds.has(item.id)}
                                  onChange={(event) =>
                                    handleToggleItem(
                                      item.id,
                                      event.target.checked,
                                    )
                                  }
                                  disabled={updatingItem === "bulk"}
                                />
                                <span
                                  className="a-checkbox-field__fake"
                                  title=""
                                />
                              </label>
                            </div>
                          </div>
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
                            <div className="a-cart-table__info-content">
                              <a
                                className="a-link-button a-cart-table__title"
                                href={`/product/${item.product_slug}/`}
                              >
                                <span className="a-link-button__content a-link-button__content--black">
                                  {item.product_name}
                                </span>
                              </a>
                            </div>
                            <div className="a-cart-table__info-buttons">
                              <div className="a-main-counter a-cart-table__quantity-counter a-main-counter--type-solid">
                                <div className="a-main-counter__decrease">
                                  <button
                                    aria-label="Уменьшить количество"
                                    className={`a-link-button${item.quantity <= 1 ? " a-link-button--disabled" : ""}`}
                                    title=""
                                    type="button"
                                    onClick={() =>
                                      handleUpdateQuantity(
                                        item.id,
                                        item.quantity - 1,
                                      )
                                    }
                                    disabled={
                                      item.quantity <= 1 ||
                                      updatingItem === item.id
                                    }
                                  >
                                    <span className="a-link-button__content a-link-button__content--black" />
                                    <span className="a-link-button__icon a-link-button__icon--grey">
                                      <svg className="a-svg a-svg--medium">
                                        <use
                                          xlinkHref="#icon-minus"
                                          xmlnsXlink="http://www.w3.org/1999/xlink"
                                        />
                                      </svg>
                                    </span>
                                  </button>
                                </div>
                                <input
                                  className="a-main-counter__count"
                                  inputMode="tel"
                                  max="9999"
                                  min="1"
                                  type="text"
                                  value={item.quantity}
                                  readOnly
                                />
                                <div className="a-main-counter__increase">
                                  <button
                                    aria-label="Увеличить количество"
                                    className="a-link-button"
                                    title=""
                                    type="button"
                                    onClick={() =>
                                      handleUpdateQuantity(
                                        item.id,
                                        item.quantity + 1,
                                      )
                                    }
                                    disabled={updatingItem === item.id}
                                  >
                                    <span className="a-link-button__content a-link-button__content--black" />
                                    <span className="a-link-button__icon a-link-button__icon--grey">
                                      <svg className="a-svg a-svg--medium">
                                        <use
                                          xlinkHref="#icon-plus"
                                          xmlnsXlink="http://www.w3.org/1999/xlink"
                                        />
                                      </svg>
                                    </span>
                                  </button>
                                </div>
                              </div>
                              <div className="a-main-like a-main-like--type-horizontal">
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
                                  title="В избранное"
                                  type="button"
                                  className="a-main-like__helper"
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
                              <button
                                className="a-icon-button"
                                title="Удалить"
                                type="button"
                                onClick={() => handleRemoveItem(item.id)}
                                disabled={updatingItem === item.id}
                              >
                                <svg className="a-svg a-icon-button__icon a-svg--medium a-icon-button__icon--grey">
                                  <use
                                    xlinkHref="#icon-delete"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                  />
                                </svg>
                              </button>
                            </div>
                            <p className="a-cart-table__info-quantity-price a-cart-table__text">
                              {discountTotal > 0
                                ? `Скидка -${formatPrice(discountTotal)}`
                                : ""}
                            </p>
                          </div>
                          <div className="a-cart-table__price">
                            <div className="a-cart-table__price-sum">
                              <div className="a-price">
                                <div className="a-price__new">{price}</div>
                                {retail ? (
                                  <div className="a-price__old">{retail}</div>
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
            <div className="v-portal" style={{ display: "none" }} />
          </div>
          <div
            className="a-main-sidebar a-page-personal__sidebar a-page-personal__sidebar--right a-page-personal__sidebar--personal-cart"
            data-v-sticky-container=""
            style={{ position: "relative" }}
          >
            <aside className="a-main-sidebar__bar" style={{}}>
              <div
                className="a-main-sidebar__sticky"
                data-v-sticky-inner=""
                style={{ position: "relative" }}
              >
                <div className="a-main-sidebar__summary">
                  <div className="a-main-sidebar__promo-code">
                    <div
                      className={
                        "a-input-field a-input-field--type-string" +
                        (promoError ? " a-input-field--error" : "") +
                        (promoCode
                          ? " a-input-field--focus a-input-field--fade-placeholder"
                          : "")
                      }
                    >
                      <label className="a-input-field__constrain" title="">
                        <input
                          autoComplete="off"
                          className="a-input-field__input"
                          inputMode="text"
                          lang="ru"
                          name=""
                          placeholder="Промокод"
                          spellCheck="false"
                          type="text"
                          value={promoCode}
                          onChange={(event) => setPromoCode(event.target.value)}
                          disabled={promoBusy}
                        />
                        <span className="a-input-field__append-content">
                          <button
                            type="button"
                            className="a-main-button a-main-sidebar__promo-code-button a-main-button--display-inline a-main-button--type-medium a-main-button--corner-round"
                            onClick={handleApplyPromo}
                            disabled={
                              promoBusy || promoCode.trim().length === 0
                            }
                          >
                            <span className="a-main-button__wrap">
                              <span className="a-main-button__content">
                                Применить
                              </span>
                            </span>
                          </button>
                        </span>
                      </label>
                      {promoError ? (
                        <div className="a-input-field__text">
                          <div className="a-input-field__content">
                            {promoError}
                          </div>
                        </div>
                      ) : null}
                    </div>
                    {cart?.promo_code ? (
                      <button
                        className="a-link-button"
                        type="button"
                        onClick={handleClearPromo}
                        disabled={promoBusy}
                      >
                        <span className="a-link-button__content a-link-button__content--blue">
                          Сбросить
                        </span>
                      </button>
                    ) : null}
                  </div>
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
                          <div className="a-main-sidebar__info-key">Скидка</div>
                          <div className="a-main-sidebar__info-value a-main-sidebar__info-value--discount">
                            -{formatPrice(totalDiscount)}
                          </div>
                        </div>
                      ) : null}
                      {promoDiscount > 0 ? (
                        <div className="a-main-sidebar__info-row">
                          <div className="a-main-sidebar__info-key">
                            Промокод
                          </div>
                          <div className="a-main-sidebar__info-value a-main-sidebar__info-value--discount">
                            -{formatPrice(promoDiscount)}
                          </div>
                        </div>
                      ) : null}
                      <div className="a-main-sidebar__info-row">
                        <div className="a-main-sidebar__info-key">Доставка</div>
                        <div className="a-main-sidebar__info-value">
                          укажите при оформлении
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="a-main-sidebar__cost">
                      <div className="a-main-sidebar__cost-key">Итого</div>
                      <div className="a-main-sidebar__cost-value">
                        {formatPrice(totalDue)}
                      </div>
                    </div>
                  </div>
                  <div className="a-main-sidebar__button">
                    <a
                      className="a-main-button a-main-button--display-block a-main-button--type-auto a-main-button--corner-round a-main-button--color-orange"
                      href="/personal/order/make/"
                    >
                      <span className="a-main-button__wrap">
                        <span className="a-main-button__content">
                          Перейти к оформлению
                        </span>
                      </span>
                    </a>
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
      </div>
    </main>
  );
}
