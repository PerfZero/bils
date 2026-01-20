"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../config/api";

interface FastOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
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

export default function FastOrderModal({
  isOpen,
  onClose,
  product,
}: FastOrderModalProps) {
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setCount(1);
    }
  }, [isOpen]);

  if (!isOpen || !product) {
    return null;
  }

  const images = product.images?.length ? product.images : [];
  const fallbackImage = "/images/layouts/no_picture.svg";
  const imageUrl = images.length ? normalizeImageUrl(images[0].url) : normalizeImageUrl(product.image) || fallbackImage;
  const priceValue = Number(product.price || 0);
  const formattedPrice = priceValue.toLocaleString("ru-RU");
  const vendorCode = product.code ? `Арт. ${product.code}` : "";

  return (
    <div id="modals-container">
      <div className="vm--container scrollable">
        <div
          data-modal="fast-order"
          aria-expanded="true"
          className="vm--overlay"
          onClick={onClose}
        >
          <div className="vm--top-right-slot" />
        </div>
        <div
          aria-expanded="true"
          role="dialog"
          aria-modal="true"
          className="vm--modal a-main-modal-parent"
        >
          <div className="a-main-modal" style={{ top: "0px", transition: "none" }}>
            <div
              className="a-main-modal__drag"
              style={{
                touchAction: "none",
                userSelect: "none",
                WebkitUserDrag: "none",
                WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
              }}
            />
            <div className="a-main-modal__wrap">
              <button type="button" className="a-main-modal__close" onClick={onClose}>
                <svg className="a-svg">
                  <use
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xlinkHref="#icon-cross"
                  />
                </svg>
              </button>
              <div className="a-main-modal__content">
                <div className="a-fast-order-modal-content">
                  <div className="a-fast-order-modal-content__title a-title-h3">
                    Заказ в 1 клик
                  </div>
                  <div className="a-fast-order-modal-content__content">
                    <div className="a-fast-order-modal-content__product">
                      <div className="a-fast-order-modal-content__info">
                        {vendorCode ? (
                          <div className="a-fast-order-modal-content__vendor-code">
                            {vendorCode}
                          </div>
                        ) : null}
                        <div className="a-fast-order-modal-content__name">
                          {product.name}
                        </div>
                      </div>
                      <div className="a-fast-order-modal-content__picture">
                        <img
                          src={imageUrl}
                          className="a-lazy-load a-is-loaded"
                          alt={product.name}
                          title={product.name}
                        />
                        <span />
                      </div>
                      <div className="a-main-counter a-main-counter--type-solid">
                        <div className="a-main-counter__decrease">
                          <button
                            aria-label="Уменьшить количество"
                            title="Уменьшить количество"
                            type="button"
                            className={`a-link-button${count <= 1 ? " a-link-button--disabled" : ""}`}
                            onClick={() => setCount((value) => Math.max(1, value - 1))}
                          >
                            <span className="a-link-button__content a-link-button__content--black" />
                            <span className="a-link-button__icon a-link-button__icon--grey">
                              <svg className="a-svg a-svg--medium">
                                <use
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  xlinkHref="#icon-minus"
                                />
                              </svg>
                            </span>
                          </button>
                        </div>
                        <input
                          type="text"
                          inputMode="tel"
                          max="999"
                          min="1"
                          className="a-main-counter__count"
                          value={count}
                          onChange={(event) => {
                            const next = Number(event.target.value.replace(/\D/g, ""));
                            setCount(next > 0 ? next : 1);
                          }}
                        />
                        <div className="a-main-counter__increase">
                          <button
                            aria-label="Увеличить количество"
                            title="Увеличить количество"
                            type="button"
                            className="a-link-button"
                            onClick={() => setCount((value) => value + 1)}
                          >
                            <span className="a-link-button__content a-link-button__content--black" />
                            <span className="a-link-button__icon a-link-button__icon--grey">
                              <svg className="a-svg a-svg--medium">
                                <use
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  xlinkHref="#icon-plus"
                                />
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                      <div
                        className="a-price"
                        discount={product.discount_percent || 0}
                        retail={product.retail_price || ""}
                        minbonusprice={product.min_bonus_price || ""}
                        afterauthorization={product.price}
                      >
                        <div className="a-price__current">{formattedPrice} ₽</div>
                      </div>
                    </div>
                    <div className="a-fast-order-modal-content__alert">
                      <div className="a-main-alert a-main-alert--blue">
                        <svg className="a-svg a-main-alert__icon a-svg--medium a-main-alert__icon--blue">
                          <use
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            xlinkHref="#icon-notice-stroke"
                          />
                        </svg>
                        <div className="a-main-alert__content">
                          Сообщите оператору способ получения и оплаты
                        </div>
                      </div>
                    </div>
                    <form className="a-fast-order-modal-content__form">
                      <div className="a-fast-order-modal-content__field">
                        <div className="a-input-field a-input-field--type-name">
                          <label
                            title="Имя, фамилия"
                            className="a-input-field__constrain"
                          >
                            <span className="a-input-field__label">
                              Имя, ф⁠амилия
                            </span>
                            <input
                              type="text"
                              placeholder="Имя, фамилия"
                              spellCheck="false"
                              autoComplete="off"
                              lang="ru"
                              inputMode="text"
                              className="a-input-field__input"
                            />
                          </label>
                        </div>
                      </div>
                      <div className="a-fast-order-modal-content__field">
                        <div className="a-input-field a-input-field--type-phone">
                          <label title="Телефон" className="a-input-field__constrain">
                            <span className="a-input-field__label">Тел⁠ефон</span>
                            <input
                              type="tel"
                              placeholder="Телефон"
                              spellCheck="false"
                              autoComplete="off"
                              lang="ru"
                              inputMode="tel"
                              className="a-input-field__input"
                            />
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="a-fast-order-modal-content__buttons">
                    <div className="a-fast-order-modal-content__button a-fast-order-modal-content__button--full">
                      <button
                        type="button"
                        className="a-main-button a-main-button--display-block a-main-button--type-medium a-main-button--corner-round a-main-button--color-orange"
                      >
                        <span className="a-main-button__wrap">
                          <span className="a-main-button__content">
                            Оформить заказ
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
  );
}
