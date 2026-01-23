"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL, API_ENDPOINTS } from "../../../../config/api";

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

export default function OrderDetailsPage({ params }) {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelComment, setCancelComment] = useState("");

  useEffect(() => {
    let isActive = true;
    const loadOrder = async () => {
      try {
        const response = await fetch(`${API_ENDPOINTS.ORDERS}${params.id}/`);
        const payload = await response.json();
        if (!response.ok) {
          throw new Error(payload?.detail || "Не удалось загрузить заказ.");
        }
        if (isActive) {
          setOrder(payload);
        }
      } catch (err) {
        if (isActive) {
          setError("Не удалось загрузить заказ.");
        }
      }
    };
    loadOrder();
    return () => {
      isActive = false;
    };
  }, [params.id]);

  const items = order?.items || [];
  const totalDue = order?.total || 0;
  const totalPrice = order?.total || 0;
  const cancelReasons = [
    "Хочу изменить состав заказа",
    "Снизилась стоимость товара",
    "Хочу изменить способ получения",
    "Купил в розничном магазине Бигам",
    "Цена у конкурента ниже",
    "В другом магазине доставка быстрее",
    "Не смог забрать",
    "Не применился промокод",
    "Не списались бонусы",
  ];

  return (
    <main className="a-page-personal a-page__main">
      <div className="a-page-personal__container">
        <ul className="a-breadcrumbs a-page-personal__breadcrumbs">
          <li className="a-breadcrumbs__item">
            <a className="a-breadcrumbs__link nuxt-link-active" href="/">
              Главная
            </a>
          </li>
          <li className="a-breadcrumbs__item">
            <a
              className="a-breadcrumbs__link nuxt-link-active"
              href="/personal/"
            >
              Личный кабинет
            </a>
          </li>
          <li className="a-breadcrumbs__item">
            <a
              className="a-breadcrumbs__link nuxt-link-active"
              href="/personal/orders/"
            >
              Мои заказы
            </a>
          </li>
          <li className="a-breadcrumbs__item a-breadcrumbs__item--current">
            <span className="a-breadcrumbs__text">Заказ №{params.id}</span>
          </li>
        </ul>
        <div className="a-back a-page-personal__back">
          <a className="a-back__link nuxt-link-active" href="/personal/orders/">
            <svg className="a-svg a-back__icon">
              <use
                xlinkHref="#icon-old-arrow"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              />
            </svg>
            <span className="a-back__text">Мои заказы</span>
          </a>
        </div>
        <div className="a-page-personal__head">
          <div className="a-page-personal__head-content vue-portal-target">
            <h1 className="a-title__h1">Заказ № {params.id}</h1>
          </div>
          <div className="a-page-personal__head-append vue-portal-target">
            <span
              className="a-order-label a-page-complete__status"
              id="N"
              style={{
                borderColor: "rgb(255, 212, 58)",
                color: "rgb(255, 212, 58)",
              }}
            >
              В обработке
            </span>
          </div>
        </div>
        <div className="a-page-personal__wrap">
          <div className="a-page-complete a-page-personal__content">
            <div className="v-portal" style={{ display: "none" }} />
            <div className="v-portal" style={{ display: "none" }} />
            <div className="a-page-complete__header">
              <h2 className="a-page-complete__header-title">Товары в заказе</h2>
              <a
                className="a-link-button nuxt-link-active"
                href="/personal/orders/"
              >
                <span className="a-link-button__icon a-link-button__icon--blue">
                  <svg className="a-svg a-svg--medium">
                    <use
                      xlinkHref="#icon-control-left"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    />
                  </svg>
                </span>
                <span className="a-link-button__content a-link-button__content--blue">
                  Перейти к списку заказов
                </span>
              </a>
            </div>
            <div className="a-page-complete__content">
              {items.length ? (
                <ul className="a-page-complete__order-list">
                  {items.map((item) => (
                    <li className="a-page-complete__order-item" key={item.id}>
                      <picture className="a-page-complete__order-preview">
                        <img
                          alt={item.product_name}
                          className="a-lazy-load a-is-loaded"
                          src={normalizeImageUrl(item.product_image)}
                          title={item.product_name}
                        />
                        <span />
                      </picture>
                      <div className="a-page-complete__order-info">
                        <div className="a-page-complete__order-title">
                          <a
                            className="a-link-button"
                            href={`/product/${item.product_slug}/`}
                          >
                            <span className="a-link-button__content a-link-button__content--black">
                              {item.product_name}
                            </span>
                          </a>
                        </div>
                        <p className="a-page-complete__order-quantity">
                          {item.quantity} шт
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Данные заказа пока недоступны.</p>
              )}
              <ul className="a-page-complete__content-footer">
                <li className="a-page-complete__content-footer-option a-page-complete__content-footer-option--mobile">
                  <a
                    className="a-link-button nuxt-link-active"
                    href="/personal/orders/"
                  >
                    <span className="a-link-button__icon a-link-button__icon--blue">
                      <svg className="a-svg a-svg--medium">
                        <use
                          xlinkHref="#icon-control-left"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        />
                      </svg>
                    </span>
                    <span className="a-link-button__content a-link-button__content--blue">
                      Перейти к списку заказов
                    </span>
                  </a>
                </li>
                <li className="a-page-complete__content-footer-option">
                  <button
                    aria-label="Изменить"
                    className="a-link-button a-order-card__footer-action"
                    title="Изменить"
                    type="button"
                  >
                    <span className="a-link-button__icon a-link-button__icon--blue">
                      <svg className="a-svg a-svg--medium">
                        <use
                          xlinkHref="#icon-control-edit"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        />
                      </svg>
                    </span>
                    <span className="a-link-button__content a-link-button__content--blue">
                      Изменить
                    </span>
                  </button>
                </li>
                <li className="a-page-complete__content-footer-option">
                  <button
                    aria-label="Повторить"
                    className="a-link-button"
                    title="Повторить"
                    type="button"
                  >
                    <span className="a-link-button__icon a-link-button__icon--blue">
                      <svg className="a-svg a-svg--medium">
                        <use
                          xlinkHref="#icon-control-refresh"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        />
                      </svg>
                    </span>
                    <span className="a-link-button__content a-link-button__content--blue">
                      Повторить
                    </span>
                  </button>
                </li>
                <li className="a-page-complete__content-footer-option">
                  <button
                    aria-label="Отменить заказ"
                    className="a-link-button"
                    title="Отменить заказ"
                    type="button"
                    onClick={() => setShowCancelModal(true)}
                  >
                    <span className="a-link-button__icon a-link-button__icon--blue">
                      <svg className="a-svg a-svg--medium">
                        <use
                          xlinkHref="#icon-control-close"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        />
                      </svg>
                    </span>
                    <span className="a-link-button__content a-link-button__content--blue">
                      Отменить заказ
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <aside className="a-complete-sidebar a-page-personal__sidebar a-page-personal__sidebar--right a-page-personal__sidebar--personal-orders-id">
            <div className="a-complete-sidebar__summary">
              <div className="a-complete-sidebar__total">
                <div className="a-complete-sidebar__total-wrap">
                  <span className="a-complete-sidebar__total-header a-complete-sidebar__total-header--bold a-complete-sidebar__total-header--lg">
                    Стоимость
                  </span>
                  <span className="a-complete-sidebar__total-price a-complete-sidebar__total-price--lg a-complete-sidebar__total-header--bold">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <div className="a-complete-sidebar__total-wrap">
                  <span className="a-complete-sidebar__total-header a-complete-sidebar__total-header--bold">
                    Оплачено
                  </span>
                  <span className="a-complete-sidebar__total-price a-complete-sidebar__total-price--green">
                    {formatPrice(totalDue)}
                  </span>
                </div>
              </div>
              <div className="a-complete-sidebar__action"> </div>
            </div>
            <div className="a-complete-sidebar__header">
              <div className="a-complete-sidebar__header-head">
                <div className="a-complete-sidebar__header-block">
                  <h4 className="a-complete-sidebar__header-text a-complete-sidebar__header-text--bold">
                    Получатель
                  </h4>
                  <p className="a-complete-sidebar__header-text">—</p>
                  <p className="a-complete-sidebar__header-text">—</p>
                </div>
                <div className="a-complete-sidebar__header-block">
                  <h4 className="a-complete-sidebar__header-text a-complete-sidebar__header-text--bold">
                    Доставка
                  </h4>
                  <p className="a-complete-sidebar__header-text">—</p>
                  <p className="a-complete-sidebar__header-text">—</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <div className="vue-portal-target" />
      {showCancelModal && (
        <div id="modals-container">
          <div className="vm--container scrollable">
            <div
              aria-expanded="true"
              className="vm--overlay"
              data-modal="order-cancel"
              onClick={() => setShowCancelModal(false)}
            >
              <div className="vm--top-right-slot" />
            </div>
            <div
              aria-expanded="true"
              aria-modal="true"
              className="vm--modal a-main-modal-parent"
              role="dialog"
              style={{
                height: "auto",
                left: "175px",
                top: "83px",
                width: "652px",
              }}
            >
              <div className="a-main-modal" style={{ top: "0px" }}>
                <div
                  className="a-main-modal__drag"
                  style={{
                    WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                    WebkitUserDrag: "none",
                    touchAction: "none",
                    userSelect: "none",
                  }}
                />
                <div className="a-main-modal__wrap">
                  <button
                    className="a-main-modal__close"
                    type="button"
                    onClick={() => setShowCancelModal(false)}
                  >
                    <svg className="a-svg">
                      <use
                        xlinkHref="#icon-cross"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      />
                    </svg>
                  </button>
                  <div className="a-main-modal__content">
                    <div className="cancel-order-modal-content">
                      <div className="a-title-h3">Причина отмены заказа</div>
                      <div className="cancel-order-modal-content__reasons">
                        {cancelReasons.map((reason) => (
                          <div
                            className="a-radio-field cancel-order-modal-content__reason a-radio-field--blue"
                            key={reason}
                          >
                            <label className="a-radio-field__constrain">
                              <input
                                className="a-radio-field__input"
                                defaultValue={reason}
                                name="cancel-reason"
                                type="radio"
                                checked={cancelReason === reason}
                                onChange={() => setCancelReason(reason)}
                              />
                              <span
                                className="a-radio-field__fake"
                                title={reason}
                              />
                              <span className="a-radio-field__label">
                                {reason}
                              </span>
                            </label>
                          </div>
                        ))}
                      </div>
                      <div className="a-textarea">
                        <label
                          className="a-textarea__constrain"
                          title="Расскажите подробнее"
                        >
                          <span className="a-textarea__label">
                            Расскажите подробнее
                          </span>
                          <textarea
                            className="a-textarea__input"
                            data-expandable=""
                            name=""
                            placeholder="Расскажите подробнее"
                            spellCheck="false"
                            style={{ resize: "vertical" }}
                            value={cancelComment}
                            onChange={(event) =>
                              setCancelComment(event.target.value)
                            }
                          />
                        </label>
                      </div>
                      <div className="cancel-order-modal-content__actions">
                        <button
                          className={
                            "a-main-button a-main-button--display-inline a-main-button--type-medium a-main-button--corner-round a-main-button--color-light-blue" +
                            (!cancelReason ? " a-main-button--disabled" : "")
                          }
                          disabled={!cancelReason}
                          type="button"
                          onClick={() => setShowCancelModal(false)}
                        >
                          <span className="a-main-button__wrap">
                            <span className="a-main-button__content">
                              Подтвердить
                            </span>
                          </span>
                        </button>
                        <button
                          className="a-main-button a-main-button--display-inline a-main-button--type-medium a-main-button--corner-round a-main-button--color-light-grey"
                          type="button"
                          onClick={() => setShowCancelModal(false)}
                        >
                          <span className="a-main-button__wrap">
                            <span className="a-main-button__content">
                              Закрыть
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
      )}
    </main>
  );
}
