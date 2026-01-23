"use client";

import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../../config/api";

function formatPrice(value) {
  const number = Number(value || 0);
  return `${number.toLocaleString("ru-RU")} ₽`;
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("ru-RU");
}

function getStatusLabel(status) {
  switch (status) {
    case "paid":
      return "Оплачен";
    case "shipped":
      return "Отправлен";
    case "cancelled":
      return "Отменен";
    default:
      return "В обработке";
  }
}

export default function PersonalPage() {
  const [orders, setOrders] = useState([]);
  const [ordersError, setOrdersError] = useState("");
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    const loadOrders = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.ORDERS);
        const payload = await response.json();
        if (!response.ok) {
          throw new Error(payload?.detail || "Не удалось загрузить заказы.");
        }
        const items = Array.isArray(payload) ? payload : payload.results || [];
        if (isActive) {
          setOrders(items);
        }
      } catch (error) {
        if (isActive) {
          setOrdersError("Не удалось загрузить заказы.");
        }
      } finally {
        if (isActive) {
          setOrdersLoading(false);
        }
      }
    };
    loadOrders();
    return () => {
      isActive = false;
    };
  }, []);

  const latestOrder = orders[0];
  const profileName = latestOrder?.customer_name || "";
  const profilePhone = latestOrder?.customer_phone || "";
  const profileEmail = latestOrder?.customer_email || "";

  return (
    <main className="a-page-personal a-page__main">
      <div className="a-page-personal__container">
        <ul className="a-breadcrumbs a-page-personal__breadcrumbs">
          <li className="a-breadcrumbs__item">
            <a className="a-breadcrumbs__link nuxt-link-active" href="/">
              Главная
            </a>
          </li>
          <li className="a-breadcrumbs__item a-breadcrumbs__item--current">
            <span className="a-breadcrumbs__text">Личный кабинет</span>
          </li>
        </ul>
        <div className="a-back a-page-personal__back">
          <a className="a-back__link nuxt-link-active" href="/">
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
          <div className="a-page-personal__head-content vue-portal-target">
            <h1 className="a-title__h1">Личный кабинет</h1>
          </div>
          <div className="a-page-personal__head-append vue-portal-target" />
        </div>
        <div className="a-page-personal__wrap">
          <aside className="a-personal-sidebar a-page-personal__sidebar a-page-personal__sidebar--left">
            <ul className="a-personal-sidebar__nav">
              <li className="a-personal-sidebar__nav-item">
                <a
                  aria-current="page"
                  className="a-link-button nuxt-link-exact-active nuxt-link-active a-link-button--active"
                  href="/personal/"
                >
                  <span className="a-link-button__icon a-link-button__icon--grey">
                    <svg className="a-svg a-svg--medium">
                      <use
                        xlinkHref="#icon-person-stroke"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      />
                    </svg>
                  </span>
                  <span className="a-link-button__content a-link-button__content--black">
                    Профиль
                  </span>
                </a>
              </li>
              <li className="a-personal-sidebar__nav-item">
                <button
                  className="a-link-button a-link-button--disabled"
                  counter="0"
                  type="button"
                  disabled
                >
                  <span className="a-link-button__icon a-link-button__icon--grey">
                    <svg className="a-svg a-svg--medium">
                      <use
                        xlinkHref="#icon-section-briefcase-stroke"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      />
                    </svg>
                  </span>
                  <span className="a-link-button__content a-link-button__content--black">
                    Мои организации
                  </span>
                </button>
              </li>
              <li className="a-personal-sidebar__nav-item">
                <a
                  className="a-link-button"
                  counter="0"
                  href="/personal/orders/"
                >
                  <span className="a-link-button__icon a-link-button__icon--grey">
                    <svg className="a-svg a-svg--medium">
                      <use
                        xlinkHref="#icon-section-box"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      />
                    </svg>
                  </span>
                  <span className="a-link-button__content a-link-button__content--black">
                    Мои заказы
                  </span>
                </a>
              </li>
              <li className="a-personal-sidebar__nav-item">
                <button
                  className="a-link-button a-link-button--disabled"
                  counter="0"
                  type="button"
                  disabled
                >
                  <span className="a-link-button__icon a-link-button__icon--grey">
                    <svg className="a-svg a-svg--medium">
                      <use
                        xlinkHref="#icon-section-heart"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      />
                    </svg>
                  </span>
                  <span className="a-link-button__content a-link-button__content--black">
                    Избранное
                  </span>
                </button>
              </li>
              <li className="a-personal-sidebar__nav-item">
                <button
                  className="a-link-button a-link-button--disabled"
                  counter="0"
                  type="button"
                  disabled
                >
                  <span className="a-link-button__icon a-link-button__icon--grey">
                    <svg className="a-svg a-svg--medium">
                      <use
                        xlinkHref="#icon-section-eye"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      />
                    </svg>
                  </span>
                  <span className="a-link-button__content a-link-button__content--black">
                    Вы смотрели
                  </span>
                </button>
              </li>
              <li className="a-personal-sidebar__nav-item">
                <button
                  className="a-link-button a-link-button--disabled"
                  counter="0"
                  type="button"
                  disabled
                >
                  <span className="a-link-button__icon a-link-button__icon--grey">
                    <svg className="a-svg a-svg--medium">
                      <use
                        xlinkHref="#icon-section-repairs"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      />
                    </svg>
                  </span>
                  <span className="a-link-button__content a-link-button__content--black">
                    Заявки на ремонт
                  </span>
                </button>
              </li>
              <li className="a-personal-sidebar__nav-item">
                <button
                  className="a-link-button a-link-button--disabled"
                  counter="0"
                  type="button"
                  disabled
                >
                  <span className="a-link-button__icon a-link-button__icon--grey">
                    <svg className="a-svg a-svg--medium">
                      <use
                        xlinkHref="#icon-like"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      />
                    </svg>
                  </span>
                  <span className="a-link-button__content a-link-button__content--black">
                    Отзывы
                  </span>
                </button>
              </li>
              <li className="a-personal-sidebar__nav-item">
                <button
                  aria-label="Выход"
                  className="a-link-button a-link-button--disabled"
                  title="Выход"
                  type="button"
                  disabled
                >
                  <span className="a-link-button__icon a-link-button__icon--grey">
                    <svg className="a-svg a-svg--medium">
                      <use
                        xlinkHref="#icon-section-logout"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      />
                    </svg>
                  </span>
                  <span className="a-link-button__content a-link-button__content--black">
                    Выход
                  </span>
                </button>
              </li>
            </ul>
          </aside>
          <div className="a-page-personal__main a-page-personal__default a-page-personal__content">
            <section className="a-page-personal__row" />
            <section className="a-page-personal__row">
              <div className="a-page-personal__card">
                <div className="a-page-personal__panel">
                  <h3 className="a-page-personal__header">Бонусная карта</h3>
                </div>
                <div className="a-personal-card">
                  <div className="a-personal-card__header">
                    <div className="a-personal-card__icon">
                      <svg className="a-svg">
                        <use
                          xlinkHref="#icon-last-bonus"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        />
                      </svg>
                    </div>
                    <div className="a-personal-card__balance-header">0 Б</div>
                  </div>
                  <div className="a-personal-card__balance-details">
                    <div className="a-personal-card__balance-main">
                      <div className="a-personal-card__balance-title">
                        Основные
                      </div>
                      <div className="a-personal-card__balance-quantity">0</div>
                    </div>
                    <div className="a-personal-card__balance-action">
                      <div className="a-personal-card__balance-title">
                        Акционные
                      </div>
                      <div className="a-personal-card__balance-quantity">
                        <span>0</span>
                      </div>
                    </div>
                  </div>
                  <div className="a-personal-card__barcode-container">
                    <div className="a-personal-card__barcode">
                      <svg
                        className="vue-barcode-element"
                        height="96px"
                        style={{ transform: "translate(0,0)" }}
                        version="1.1"
                        viewBox="0 0 305 96"
                        width="305px"
                        x="0px"
                        xmlns="http://www.w3.org/2000/svg"
                        y="0px"
                      >
                        <rect
                          height="96"
                          style={{ fill: "#ffffff" }}
                          width="305"
                          x="0"
                          y="0"
                        />
                        <g
                          style={{ fill: "#000000" }}
                          transform="translate(10, 10)"
                        >
                          <rect height="76" width="3" x="0" y="0" />
                          <rect height="76" width="3" x="6" y="0" />
                          <rect height="76" width="9" x="12" y="0" />
                          <rect height="76" width="6" x="24" y="0" />
                          <rect height="76" width="3" x="39" y="0" />
                          <rect height="76" width="6" x="45" y="0" />
                          <rect height="76" width="3" x="54" y="0" />
                          <rect height="76" width="3" x="69" y="0" />
                          <rect height="76" width="3" x="78" y="0" />
                          <rect height="76" width="3" x="90" y="0" />
                          <rect height="76" width="3" x="99" y="0" />
                          <rect height="76" width="6" x="108" y="0" />
                          <rect height="76" width="3" x="117" y="0" />
                          <rect height="76" width="9" x="126" y="0" />
                          <rect height="76" width="3" x="138" y="0" />
                          <rect height="76" width="3" x="144" y="0" />
                          <rect height="76" width="3" x="150" y="0" />
                          <rect height="76" width="9" x="156" y="0" />
                          <rect height="76" width="9" x="171" y="0" />
                          <rect height="76" width="3" x="186" y="0" />
                          <rect height="76" width="6" x="192" y="0" />
                          <rect height="76" width="6" x="204" y="0" />
                          <rect height="76" width="3" x="213" y="0" />
                          <rect height="76" width="9" x="219" y="0" />
                          <rect height="76" width="9" x="234" y="0" />
                          <rect height="76" width="3" x="246" y="0" />
                          <rect height="76" width="9" x="255" y="0" />
                          <rect height="76" width="3" x="270" y="0" />
                          <rect height="76" width="3" x="276" y="0" />
                          <rect height="76" width="3" x="282" y="0" />
                        </g>
                      </svg>
                      <div style={{ display: "none" }} />
                    </div>
                    <div className="a-personal-card__barcode-link">
                      <svg className="a-svg">
                        <use
                          xlinkHref="#icon-zoom"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="a-personal-card__rules">
                    <a
                      className="a-personal-card__link"
                      href="/customer/bonusnaya-programma/"
                    >
                      Правила бонусной программы
                    </a>
                  </div>
                </div>
              </div>
              <div className="a-page-personal__form" to="profile-mobile">
                <div>
                  <div className="a-page-personal__panel">
                    <h3 className="a-page-personal__header">
                      Профиль
                      <svg className="a-svg">
                        <use
                          xlinkHref="#icon-notice-stroke"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        />
                      </svg>
                    </h3>
                  </div>
                  <article
                    className="a-personal-form a-personal-form--border"
                    id="personal-data"
                  >
                    <div className="a-personal-form__helper-empty-data">
                      Заполните данные, чтобы получать письма по заказам, бонусы
                      ко дню рождения и скидки.
                    </div>
                    <form>
                      <div className="a-personal-form__input-group">
                        <label
                          className="a-personal-form__input-label"
                          htmlFor="name"
                        >
                          Имя, фамилия
                        </label>
                        <p
                          className={
                            "a-personal-form__form-control" +
                            (!profileName
                              ? " a-personal-form__form-control--empty"
                              : "")
                          }
                        >
                          {profileName || "не заполнено"}
                        </p>
                      </div>
                      <div className="a-personal-form__input-group">
                        <label
                          className="a-personal-form__input-label"
                          htmlFor="phone"
                        >
                          Номер телефона
                        </label>
                        <p
                          className={
                            "a-personal-form__form-control" +
                            (!profilePhone
                              ? " a-personal-form__form-control--empty"
                              : "")
                          }
                        >
                          {profilePhone || "не заполнено"}
                        </p>
                      </div>
                      <div className="a-personal-form__input-group">
                        <label
                          className="a-personal-form__input-label"
                          htmlFor="email"
                        >
                          E-mail
                        </label>
                        <p
                          className={
                            "a-personal-form__form-control" +
                            (!profileEmail
                              ? " a-personal-form__form-control--empty"
                              : "")
                          }
                        >
                          {profileEmail || "не заполнено"}
                        </p>
                      </div>
                      <div className="a-personal-form__input-group">
                        <label
                          className="a-personal-form__input-label"
                          htmlFor="birth"
                        >
                          Дата рождения
                        </label>
                        <p className="a-personal-form__form-control a-personal-form__form-control--empty">
                          не заполнено
                        </p>
                      </div>
                      <div className="a-personal-form__footer">
                        <button
                          aria-label="Изменить данные"
                          className="a-link-button a-link-button--disabled"
                          title="Изменить данные"
                          type="button"
                          disabled
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
                            Изменить данные
                          </span>
                        </button>
                      </div>
                    </form>
                  </article>
                </div>
              </div>
            </section>
            <section className="a-page-personal__orders">
              <div className="a-page-personal__panel">
                <h3 className="a-page-personal__header">Активные заказы</h3>
              </div>
              <ul className="a-page-personal__order-list">
                {ordersLoading && <li>Загрузка...</li>}
                {!ordersLoading && ordersError && <li>{ordersError}</li>}
                {!ordersLoading && !ordersError && orders.length === 0 && (
                  <li>Активных заказов пока нет.</li>
                )}
                {orders.map((order) => (
                  <li
                    className="a-order-card"
                    id={`order-${order.id}`}
                    key={order.id}
                  >
                    <section className="a-order-card__header">
                      <div className="a-order-card__header-title">
                        <a
                          className="a-order-card__title-text"
                          href={`/personal/orders/${order.id}/`}
                        >
                          Заказ № {order.id}
                        </a>
                        <p className="a-order-card__header-date">
                          {order.created_at
                            ? `от ${formatDate(order.created_at)}`
                            : ""}
                        </p>
                      </div>
                      <div className="a-order-card__header-status">
                        <span className="a-order-label" id={order.status}>
                          {getStatusLabel(order.status)}
                        </span>
                      </div>
                      <div className="a-order-card__header-price">
                        <div className="a-price">
                          <div className="a-price__current">
                            {formatPrice(order.total)}
                          </div>
                        </div>
                        <p className="a-order-card__text a-order-card__text--muted">
                          {order.status === "paid"
                            ? "Оплачен"
                            : "Ожидает оплаты"}
                        </p>
                      </div>
                    </section>
                    <section className="a-order-card__footer">
                      <menu className="a-order-card__footer-toggler">
                        <a
                          className="a-link-button"
                          href={`/personal/orders/${order.id}/`}
                        >
                          <span className="a-link-button__content a-link-button__content--blue">
                            Подробнее
                          </span>
                        </a>
                      </menu>
                    </section>
                  </li>
                ))}
              </ul>
            </section>
            <section className="a-page-personal__column">
              <h4 className="a-page-personal__subheader">Получатели</h4>
              <ul className="a-page-personal__field-list" />
              <menu className="a-page-personal__field-button">
                <button
                  aria-label="Добавить получателя"
                  className="a-link-button a-link-button--disabled"
                  title="Добавить получателя"
                  type="button"
                  disabled
                >
                  <span className="a-link-button__icon a-link-button__icon--blue">
                    <svg className="a-svg a-svg--medium">
                      <use
                        xlinkHref="#icon-plus"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      />
                    </svg>
                  </span>
                  <span className="a-link-button__content a-link-button__content--blue">
                    Добавить получателя
                  </span>
                </button>
              </menu>
            </section>
            <section className="a-page-personal__column">
              <h4 className="a-page-personal__subheader">Адреса доставки</h4>
              <ul className="a-page-personal__field-list" />
              <menu className="a-page-personal__field-button">
                <button
                  aria-label="Добавить адрес"
                  className="a-link-button a-link-button--disabled"
                  title="Добавить адрес"
                  type="button"
                  disabled
                >
                  <span className="a-link-button__icon a-link-button__icon--blue">
                    <svg className="a-svg a-svg--medium">
                      <use
                        xlinkHref="#icon-plus"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      />
                    </svg>
                  </span>
                  <span className="a-link-button__content a-link-button__content--blue">
                    Добавить адрес
                  </span>
                </button>
              </menu>
            </section>
            <section className="a-page-personal__subscriptions">
              <h4 className="a-page-personal__subheader">Подписки</h4>
              <ul className="a-page-personal__subscription-list">
                <li className="a-page-personal__sub-item">
                  <div className="a-checkbox-field">
                    <label className="a-checkbox-field__constrain">
                      <input
                        className="a-checkbox-field__input"
                        defaultValue="4"
                        name="Обновления статусов в SMS"
                        type="checkbox"
                        disabled
                      />
                      <span
                        className="a-checkbox-field__fake"
                        title="Обновления статусов в SMS"
                      />
                      <span className="a-checkbox-field__label">
                        Обновления статусов в SMS
                      </span>
                    </label>
                  </div>
                </li>
                <li className="a-page-personal__sub-item">
                  <div className="a-checkbox-field">
                    <label className="a-checkbox-field__constrain">
                      <input
                        className="a-checkbox-field__input"
                        defaultValue="5"
                        name="Акции и персональные предложения"
                        type="checkbox"
                        disabled
                      />
                      <span
                        className="a-checkbox-field__fake"
                        title="Акции и персональные предложения"
                      />
                      <span className="a-checkbox-field__label">
                        Акции и персональные предложения
                      </span>
                    </label>
                  </div>
                </li>
              </ul>
              <button
                className="a-main-button a-page-personal__subscriptions-confirm a-main-button--disabled a-main-button--display-inline a-main-button--type-medium a-main-button--corner-round a-main-button--color-light-blue"
                style={{ display: "none" }}
                type="button"
                disabled
              >
                <span className="a-main-button__wrap">
                  <span className="a-main-button__content">Сохранить</span>
                </span>
              </button>
            </section>
          </div>
        </div>
      </div>
      <div className="vue-portal-target" />
    </main>
  );
}
