"use client";

import { useEffect, useState } from "react";
import { getOrCreateCart } from "../../../lib/cart";
import { API_ENDPOINTS } from "../../../../config/api";

function formatItemCount(count) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return `${count} товар`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return `${count} товара`;
  }
  return `${count} товаров`;
}

function formatPrice(value) {
  const number = Number(value || 0);
  return `${number.toLocaleString("ru-RU")} ₽`;
}

function normalizePhoneDigits(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("8")) return `7${digits.slice(1)}`;
  if (digits.startsWith("7")) return digits;
  return `7${digits}`;
}

function formatPhone(value) {
  const digits = normalizePhoneDigits(value).slice(0, 11);
  if (!digits) return "";
  const national = digits.slice(1);
  let result = "+7";
  if (national.length > 0) {
    result += ` (${national.slice(0, 3)}`;
  }
  if (national.length >= 3) {
    result += ")";
  }
  if (national.length > 3) {
    result += ` ${national.slice(3, 6)}`;
  }
  if (national.length > 6) {
    result += `-${national.slice(6, 8)}`;
  }
  if (national.length > 8) {
    result += `-${national.slice(8, 10)}`;
  }
  return result;
}

function formatPhoneForApi(value) {
  const digits = normalizePhoneDigits(value).slice(0, 11);
  return digits ? `+${digits}` : "";
}

export default function OrderMakePage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deliveryMethods, setDeliveryMethods] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [useReceiver, setUseReceiver] = useState(false);
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [smsCode, setSmsCode] = useState("");
  const [smsError, setSmsError] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [comment, setComment] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    let isActive = true;
    const loadCart = async () => {
      try {
        const { cart: payload } = await getOrCreateCart();
        if (!isActive) return;
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

  useEffect(() => {
    let isActive = true;
    const loadMethods = async () => {
      try {
        const [deliveryResponse, paymentResponse] = await Promise.all([
          fetch(API_ENDPOINTS.DELIVERY_METHODS),
          fetch(API_ENDPOINTS.PAYMENT_METHODS),
        ]);
        const deliveryPayload = await deliveryResponse.json();
        const paymentPayload = await paymentResponse.json();
        const deliveryItems = Array.isArray(deliveryPayload)
          ? deliveryPayload
          : deliveryPayload.results || [];
        const paymentItems = Array.isArray(paymentPayload)
          ? paymentPayload
          : paymentPayload.results || [];
        if (!isActive) return;
        setDeliveryMethods(deliveryItems);
        setPaymentMethods(paymentItems);
        const defaultDelivery =
          deliveryItems.find((item) => item.is_default)?.code ||
          deliveryItems[0]?.code ||
          "";
        const defaultPayment =
          paymentItems.find((item) => item.is_default)?.code ||
          paymentItems[0]?.code ||
          "";
        setSelectedDelivery(defaultDelivery);
        setSelectedPayment(defaultPayment);
      } catch (err) {
        if (isActive) {
          setDeliveryMethods([]);
          setPaymentMethods([]);
        }
      }
    };
    loadMethods();
    return () => {
      isActive = false;
    };
  }, []);

  const totalQuantity = cart?.total_quantity || 0;
  const totalPrice = cart?.total_price || 0;
  const totalDiscount = cart?.total_discount || 0;
  const promoDiscount = cart?.promo_discount || 0;
  const totalDue = cart?.total_due ?? totalPrice;
  const totalDiscountSum =
    Number(totalDiscount || 0) + Number(promoDiscount || 0);
  const totalWeight = cart?.total_weight ?? null;
  const yandexPayAmount = Number(totalDue || 0).toFixed(2);
  const phoneForApi = formatPhoneForApi(customerPhone);

  const handleOrderSubmit = () => {
    if (!cart || !cart.items?.length) {
      setError("Корзина пуста.");
      return;
    }
    setError("");
    setSmsError("");
    const normalizedPhone = normalizePhoneDigits(customerPhone);
    const nextErrors = {};
    if (!customerName.trim()) {
      nextErrors.name =
        "Значение обязательно для заполнения и не может быть пустым";
    }
    if (!normalizedPhone || normalizedPhone.length !== 11) {
      nextErrors.phone = "Значение не соответствует формату номера телефона";
    }
    const requiresAddress = selectedDeliveryMethod?.requires_address;
    if (requiresAddress && !deliveryAddress.trim()) {
      nextErrors.address =
        "Значение обязательно для заполнения и не может быть пустым";
    }
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    setSmsCode("");
    setShowSmsModal(true);
  };

  const handleConfirmSms = async () => {
    if (smsCode.trim() !== "0000") {
      setSmsError("Неверный код подтверждения.");
      return;
    }
    try {
      const response = await fetch(API_ENDPOINTS.ORDERS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart_token: cart.token,
          customer_name: customerName.trim(),
          customer_email: customerEmail.trim(),
          customer_phone: phoneForApi || customerPhone.trim(),
          address: deliveryAddress.trim(),
          delivery_method: selectedDelivery,
          payment_method: selectedPayment,
          comment: comment.trim(),
        }),
      });
      const payload = await response.json();
      if (!response.ok) {
        setSmsError(payload?.detail || "Не удалось оформить заказ.");
        return;
      }
      window.location.href = `/personal/orders/${payload.id}/`;
    } catch (error) {
      setSmsError("Не удалось оформить заказ.");
    }
  };

  const deliveryList = deliveryMethods;
  const paymentList = paymentMethods;
  const selectedDeliveryMethod =
    deliveryList.find((item) => item.code === selectedDelivery) || null;
  const showAddress = selectedDeliveryMethod?.requires_address;
  const showDeliveryDate = selectedDeliveryMethod?.requires_delivery_date;
  const formattedCustomerPhone =
    formatPhone(customerPhone) || "+7 000 000 00 00";

  return (
    <main className="a-page-personal a-page__main a-page-personal--bg-grey">
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
          <li className="a-breadcrumbs__item a-breadcrumbs__item--current">
            <span className="a-breadcrumbs__text">Оформление заказа</span>
          </li>
        </ul>
        <div className="a-back a-page-personal__back">
          <a className="a-back__link" href="/personal/cart/">
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
            <h1 className="a-page-order-make__title">Оформление заказа</h1>
          </div>
          <div className="a-page-personal__head-append vue-portal-target" />
        </div>
        <div className="a-page-personal__wrap">
          <div className="a-page-order-make a-page-personal__content">
            <div className="v-portal" style={{ display: "none" }} />
            {loading ? <p>Загрузка...</p> : null}
            {error ? <p>{error}</p> : null}
            <section className="a-page-order-make__section a-page-order-make__section--delivery">
              <div className="a-page-order-make__subtitle-name">
                1. Выберите удобный способ получения
              </div>
              <div className="a-page-order-make__list">
                {deliveryList.map((method) => (
                  <div className="a-page-order-make__item" key={method.code}>
                    <div
                      className={
                        "a-delivery-type-card" +
                        (selectedDelivery === method.code
                          ? " a-delivery-type-card--active"
                          : "")
                      }
                      onClick={() => setSelectedDelivery(method.code)}
                    >
                      <div className="a-delivery-type-card__icon">
                        <svg className="a-svg">
                          <use
                            xlinkHref={`#${method.icon || "icon-tile-delivery"}`}
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                          />
                        </svg>
                      </div>
                      <div className="a-delivery-type-card__content">
                        <div className="a-delivery-type-card__name">
                          {method.name}
                        </div>
                        <div className="a-delivery-type-card__description">
                          {method.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {(showAddress || showDeliveryDate) && (
                <div className="a-page-order-make__address-date">
                  {showAddress && (
                    <div className="a-page-order-make__set-address">
                      <div className="a-page-order-make__subtitle-name">
                        Укажите адрес доставки
                      </div>
                      <div className="a-page-order-make__form">
                        <form className="a-order-form">
                          <div className="a-order-form__fields">
                            <div className="a-combo-box-field a-page-order-make__field">
                              <div className="a-combo-box-field__container">
                                <div className="a-combo-box-field__contain">
                                  <div className="a-combo-box-field__wrap">
                                    <div
                                      className={
                                        "a-input-field a-input-field--type-string" +
                                        (fieldErrors.address
                                          ? " a-input-field--error"
                                          : "")
                                      }
                                    >
                                      <label
                                        className="a-input-field__constrain"
                                        title="Город, улица, дом, корпус"
                                      >
                                        <span className="a-input-field__label">
                                          Город, улица⁠, дом, корпус
                                        </span>
                                        <input
                                          autoComplete="off"
                                          className="a-input-field__input"
                                          inputMode="text"
                                          lang="ru"
                                          name=""
                                          placeholder="Город, улица, дом, корпус"
                                          spellCheck="false"
                                          type="text"
                                          value={deliveryAddress}
                                          onChange={(event) => {
                                            setDeliveryAddress(
                                              event.target.value,
                                            );
                                            if (fieldErrors.address) {
                                              setFieldErrors((prev) => ({
                                                ...prev,
                                                address: "",
                                              }));
                                            }
                                          }}
                                        />
                                      </label>
                                      {fieldErrors.address ? (
                                        <div className="a-input-field__text">
                                          <div className="a-input-field__content">
                                            {fieldErrors.address}
                                          </div>
                                        </div>
                                      ) : null}
                                    </div>
                                  </div>
                                  <div className="a-combo-box-field__options" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                        <button
                          className="a-main-button a-page-order-make__select-on-map a-main-button--display-inline a-main-button--type-medium a-main-button--corner-round a-main-button--color-light-orange"
                          type="button"
                        >
                          <span className="a-main-button__wrap">
                            Указать на карте
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                  {showDeliveryDate && (
                    <div className="a-page-order-make__set-date">
                      <div className="a-page-order-make__subtitle-name">
                        Выберите дату доставки
                      </div>
                      <div className="a-main-alert a-main-alert--green">
                        <svg className="a-svg a-main-alert__icon a-svg--medium a-main-alert__icon--green">
                          <use
                            xlinkHref="#icon-warning-stroke"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                          />
                        </svg>
                        <div className="a-main-alert__content a-main-alert__content--green">
                          Укажите адрес доставки
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>
            <section className="a-page-order-make__section a-page-order-make__section--pay-system">
              <div className="a-page-order-make__subtitle-name">
                2. Выберите удобный способ оплаты
              </div>
              <div className="a-page-order-make__list">
                {paymentList.map((method) => (
                  <div className="a-page-order-make__item" key={method.code}>
                    <div
                      className={
                        "a-pay-system-type-card" +
                        (selectedPayment === method.code
                          ? " a-pay-system-type-card--active"
                          : "")
                      }
                    >
                      <div className="a-radio-field a-radio-field--blue">
                        <label className="a-radio-field__constrain">
                          <input
                            className="a-radio-field__input"
                            defaultValue={method.code}
                            name="pay-system"
                            type="radio"
                            checked={selectedPayment === method.code}
                            onChange={() => setSelectedPayment(method.code)}
                          />
                          <span className="a-radio-field__fake" title="" />
                        </label>
                      </div>
                      <div className="a-pay-system-type-card__content">
                        <div
                          className={
                            "a-pay-system-type-card__name" +
                            (method.code === "ya-pay"
                              ? " a-pay-system-type-card__name--flex"
                              : "")
                          }
                        >
                          <div className="a-pay-system-type-card__name">
                            {method.name}
                          </div>
                          {method.code === "ya-pay" && (
                            <yandex-pay-badge
                              align="left"
                              amount={yandexPayAmount}
                              merchant-id="8179d1ae-c054-4da1-92db-f3dabfa804ff"
                              size="s"
                              source="cart"
                              theme="light"
                              type="ultimate"
                              variant="compact"
                            />
                          )}
                        </div>
                        <div className="a-pay-system-type-card__description">
                          {method.description}
                        </div>
                      </div>
                      {method.icon ? (
                        <img
                          alt="pay-system"
                          className="a-pay-system-type-card__image"
                          src={method.icon}
                        />
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section className="a-page-order-make__section a-page-order-make__section--customer">
              <div className="a-page-order-make__subtitle-name">
                3. Укажите ваши данные
              </div>
              <div className="a-page-order-make__subtitle-description">
                <button
                  aria-label="Авторизуйтесь,"
                  className="a-link-button"
                  title="Авторизуйтесь,"
                  type="button"
                >
                  <span className="a-link-button__content a-link-button__content--blue a-link-button__content--underline a-link-button__content--underline-dashed">
                    Авторизуйтесь,
                  </span>
                </button>
                если у вас есть личный кабинет
              </div>
              <ul className="a-page-order-make__form">
                <li className="a-page-order-make__input">
                  <div
                    className={
                      "a-input-field a-input-field--type-name" +
                      (fieldErrors.name ? " a-input-field--error" : "")
                    }
                  >
                    <label
                      className="a-input-field__constrain"
                      title="Имя, фамилия"
                    >
                      <span className="a-input-field__label">
                        Имя, ф⁠амилия
                      </span>
                      <input
                        autoComplete="off"
                        className="a-input-field__input"
                        inputMode="text"
                        lang="ru"
                        name=""
                        placeholder="Имя, фамилия"
                        spellCheck="false"
                        type="text"
                        value={customerName}
                        onChange={(event) => {
                          setCustomerName(event.target.value);
                          if (fieldErrors.name) {
                            setFieldErrors((prev) => ({
                              ...prev,
                              name: "",
                            }));
                          }
                        }}
                      />
                    </label>
                    {fieldErrors.name ? (
                      <div className="a-input-field__text">
                        <div className="a-input-field__content">
                          {fieldErrors.name}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </li>
                <li className="a-page-order-make__input">
                  <div
                    className={
                      "a-input-field a-input-field--type-phone" +
                      (fieldErrors.phone ? " a-input-field--error" : "")
                    }
                  >
                    <label className="a-input-field__constrain" title="Телефон">
                      <span className="a-input-field__label">Тел⁠ефон</span>
                      <input
                        autoComplete="off"
                        className="a-input-field__input"
                        inputMode="tel"
                        lang="ru"
                        name=""
                        placeholder="Телефон"
                        spellCheck="false"
                        type="tel"
                        value={customerPhone}
                        onChange={(event) => {
                          const formatted = formatPhone(event.target.value);
                          setCustomerPhone(formatted);
                          if (fieldErrors.phone) {
                            setFieldErrors((prev) => ({
                              ...prev,
                              phone: "",
                            }));
                          }
                        }}
                      />
                    </label>
                    {fieldErrors.phone ? (
                      <div className="a-input-field__text">
                        <div className="a-input-field__content">
                          {fieldErrors.phone}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </li>
                <li className="a-page-order-make__input">
                  <div className="a-input-field a-input-field--type-string">
                    <label
                      className="a-input-field__constrain"
                      title="Электронная почта (не обязательно)"
                    >
                      <span className="a-input-field__label">
                        Электронная почта⁠ (не обязательно)
                      </span>
                      <input
                        autoComplete="off"
                        className="a-input-field__input"
                        inputMode="email"
                        lang="ru"
                        name=""
                        placeholder="Электронная почта (не обязательно)"
                        spellCheck="false"
                        type="text"
                        value={customerEmail}
                        onChange={(event) =>
                          setCustomerEmail(event.target.value)
                        }
                      />
                    </label>
                  </div>
                </li>
                <li className="a-page-order-make__input a-page-order-make__input--dont-call-back">
                  <div className="a-checkbox-field">
                    <label className="a-checkbox-field__constrain">
                      <input
                        className="a-checkbox-field__input"
                        defaultValue="false"
                        name=""
                        type="checkbox"
                      />
                      <span
                        className="a-checkbox-field__fake"
                        title="Не требуется обратный звонок для консультации и подтверждения заказа"
                      />
                      <span className="a-checkbox-field__label">
                        Не требуется обратный звонок для консультации и
                        подтверждения заказа
                      </span>
                    </label>
                  </div>
                </li>
              </ul>
              {!showCompanyForm && (
                <button
                  aria-label="Добавить организацию"
                  className="a-link-button"
                  title="Добавить организацию"
                  type="button"
                  onClick={() => setShowCompanyForm(true)}
                >
                  <span className="a-link-button__icon a-link-button__icon--blue">
                    <svg className="a-svg a-svg--medium">
                      <use
                        xlinkHref="#icon-control-add"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      />
                    </svg>
                  </span>
                  <span className="a-link-button__content a-link-button__content--blue">
                    Добавить организацию
                  </span>
                </button>
              )}
              {showCompanyForm && (
                <div className="a-page-order-make__company-form">
                  <div className="organization-form">
                    <form className="organization-form__container">
                      <div className="organization-form__block">
                        <div className="organization-form__block--header">
                          Укажите ИНН организации или ИП
                        </div>
                        <div className="organization-form__block--inputs">
                          <div className="organization-form__block--input">
                            <div className="a-field-search-select">
                              <div className="a-field-search-select__container">
                                <div
                                  className="a-field-search-select__wrap"
                                  tabIndex="0"
                                >
                                  <div className="a-field-search-select__constrain">
                                    <div className="a-input-field a-input-field--type-string">
                                      <label
                                        className="a-input-field__constrain"
                                        title="ИНН"
                                      >
                                        <span className="a-input-field__label">
                                          И⁠НН
                                        </span>
                                        <input
                                          autoComplete="off"
                                          className="a-input-field__input"
                                          inputMode="text"
                                          lang="ru"
                                          name=""
                                          placeholder="ИНН"
                                          spellCheck="false"
                                          type="text"
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                    <div className="organization-form__buttons">
                      <button
                        className="a-main-button a-main-button--display-inline a-main-button--type-medium a-main-button--corner-round a-main-button--color-light-grey"
                        type="button"
                        onClick={() => setShowCompanyForm(false)}
                      >
                        <span className="a-main-button__wrap">
                          <span className="a-main-button__content">
                            Отменить
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div className="a-page-order-make__receiver">
                <div className="a-checkbox-field a-page-order-make__use-receiver">
                  <label className="a-checkbox-field__constrain">
                    <input
                      className="a-checkbox-field__input"
                      defaultValue="false"
                      name=""
                      type="checkbox"
                      checked={useReceiver}
                      onChange={(event) => setUseReceiver(event.target.checked)}
                    />
                    <span
                      className="a-checkbox-field__fake"
                      title="Другой получатель"
                    />
                    <span className="a-checkbox-field__label">
                      Другой получатель
                    </span>
                  </label>
                </div>
                {useReceiver && (
                  <form className="a-order-form">
                    <div className="a-order-form__fields">
                      <div className="a-input-field a-page-order-make__field a-input-field--type-name">
                        <label
                          className="a-input-field__constrain"
                          title="Имя, фамилия"
                        >
                          <span className="a-input-field__label">
                            Имя, ф⁠амилия
                          </span>
                          <input
                            autoComplete="off"
                            className="a-input-field__input"
                            inputMode="text"
                            lang="ru"
                            name=""
                            placeholder="Имя, фамилия"
                            spellCheck="false"
                            type="text"
                          />
                        </label>
                      </div>
                      <div className="a-input-field a-page-order-make__field a-input-field--type-phone">
                        <label
                          className="a-input-field__constrain"
                          title="Телефон"
                        >
                          <span className="a-input-field__label">Тел⁠ефон</span>
                          <input
                            autoComplete="off"
                            className="a-input-field__input"
                            inputMode="tel"
                            lang="ru"
                            name=""
                            placeholder="Телефон"
                            spellCheck="false"
                            type="tel"
                          />
                        </label>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </section>
            <section className="a-page-order-make__section a-page-order-make__section--comment">
              <div className="a-page-order-make__subtitle-name">
                4. Комментарий к заказу
              </div>
              <div className="a-textarea">
                <label className="a-textarea__constrain" title="Комментарий">
                  <span className="a-textarea__label">Комментарий</span>
                  <textarea
                    className="a-textarea__input"
                    data-expandable=""
                    name=""
                    placeholder="Напишите всё, что мы забыли у вас спросить"
                    spellCheck="false"
                    style={{ resize: "vertical" }}
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                  />
                </label>
              </div>
            </section>
          </div>
          <div
            className="a-main-sidebar a-page-personal__sidebar a-page-personal__sidebar--right a-page-personal__sidebar--personal-order-make"
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
                      {totalDiscountSum > 0 ? (
                        <div className="a-main-sidebar__info-row">
                          <div className="a-main-sidebar__info-key">Скидка</div>
                          <div className="a-main-sidebar__info-value a-main-sidebar__info-value--discount">
                            -{formatPrice(totalDiscountSum)}
                          </div>
                        </div>
                      ) : null}
                      <div className="a-main-sidebar__info-row">
                        <div className="a-main-sidebar__info-key">
                          Вес заказа
                        </div>
                        <div className="a-main-sidebar__info-value">
                          {totalWeight !== null
                            ? `${Number(totalWeight).toFixed(2)} кг`
                            : "—"}
                        </div>
                      </div>
                      <div className="a-main-sidebar__info-row">
                        <div className="a-main-sidebar__info-key">Доставка</div>
                        <div className="a-main-sidebar__info-value">
                          не указана
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
                  <div className="a-pay-parts a-pay-parts-main-sidebar">
                    <div className="a-pay-parts__header">
                      <svg className="a-svg a-pay-parts__header-logo">
                        <use
                          xlinkHref="#icon-plait"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        />
                      </svg>
                      <button
                        aria-label=""
                        className="a-link-button a-pay-parts__header-info"
                        title=""
                        type="button"
                      >
                        <span className="a-link-button__icon a-link-button__icon--black">
                          <svg className="a-svg a-svg--medium">
                            <use
                              xlinkHref="#icon-info"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                            />
                          </svg>
                        </span>
                        <span className="a-link-button__content a-link-button__content--black" />
                      </button>
                    </div>
                    <div className="a-pay-parts__header-bottom">
                      <span className="a-pay-parts__description-head">
                        Рассрочка без переплат
                      </span>
                      <div className="a-toggle">
                        <input
                          className="a-toggle__input"
                          id="get-pay-parts"
                          name="get-pay-parts"
                          type="checkbox"
                        />
                        <label
                          className="a-toggle__label"
                          htmlFor="get-pay-parts"
                        />
                      </div>
                    </div>
                    <div className="a-pay-parts__parts">
                      <div className="a-pay-parts__parts-part a-pay-parts__parts-part--active">
                        <div className="a-pay-parts__parts-line" />
                        <div className="a-pay-parts__parts-date">Сегодня</div>
                        <div className="a-pay-parts__parts-sum">4 232 ₽</div>
                      </div>
                      <div className="a-pay-parts__parts-part">
                        <div className="a-pay-parts__parts-line" />
                        <div className="a-pay-parts__parts-date">06 фев</div>
                        <div className="a-pay-parts__parts-sum">4 232 ₽</div>
                      </div>
                      <div className="a-pay-parts__parts-part">
                        <div className="a-pay-parts__parts-line" />
                        <div className="a-pay-parts__parts-date">20 фев</div>
                        <div className="a-pay-parts__parts-sum">4 232 ₽</div>
                      </div>
                      <div className="a-pay-parts__parts-part">
                        <div className="a-pay-parts__parts-line" />
                        <div className="a-pay-parts__parts-date">06 мар</div>
                        <div className="a-pay-parts__parts-sum">4 232 ₽</div>
                      </div>
                    </div>
                  </div>
                  <div className="a-main-sidebar__button">
                    <button
                      className="a-main-button a-main-button--display-block a-main-button--type-auto a-main-button--corner-round a-main-button--color-orange"
                      type="button"
                      onClick={handleOrderSubmit}
                    >
                      <span className="a-main-button__wrap">
                        <span className="a-main-button__content">
                          Оформить заказ
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
                <div
                  className="resize-sensor"
                  style={{
                    inset: "0px",
                    opacity: "0",
                    overflow: "hidden",
                    position: "absolute",
                    visibility: "hidden",
                    zIndex: "-1",
                  }}
                >
                  <div
                    className="resize-sensor-expand"
                    style={{
                      bottom: "0",
                      left: "0",
                      opacity: "0",
                      overflow: "hidden",
                      position: "absolute",
                      right: "0",
                      top: "0",
                      visibility: "hidden",
                      zIndex: "-1",
                    }}
                  >
                    <div
                      style={{
                        height: "100000px",
                        left: "0px",
                        position: "absolute",
                        top: "0px",
                        transition: "all",
                        width: "100000px",
                      }}
                    />
                  </div>
                  <div
                    className="resize-sensor-shrink"
                    style={{
                      bottom: "0",
                      left: "0",
                      opacity: "0",
                      overflow: "hidden",
                      position: "absolute",
                      right: "0",
                      top: "0",
                      visibility: "hidden",
                      zIndex: "-1",
                    }}
                  >
                    <div
                      style={{
                        height: "200%",
                        left: "0",
                        position: "absolute",
                        top: "0",
                        transition: "0s",
                        width: "200%",
                      }}
                    />
                  </div>
                </div>
              </div>
            </aside>
            <div
              className="resize-sensor"
              style={{
                inset: "0px",
                opacity: "0",
                overflow: "hidden",
                position: "absolute",
                visibility: "hidden",
                zIndex: "-1",
              }}
            >
              <div
                className="resize-sensor-expand"
                style={{
                  bottom: "0",
                  left: "0",
                  opacity: "0",
                  overflow: "hidden",
                  position: "absolute",
                  right: "0",
                  top: "0",
                  visibility: "hidden",
                  zIndex: "-1",
                }}
              >
                <div
                  style={{
                    height: "100000px",
                    left: "0px",
                    position: "absolute",
                    top: "0px",
                    transition: "all",
                    width: "100000px",
                  }}
                />
              </div>
              <div
                className="resize-sensor-shrink"
                style={{
                  bottom: "0",
                  left: "0",
                  opacity: "0",
                  overflow: "hidden",
                  position: "absolute",
                  right: "0",
                  top: "0",
                  visibility: "hidden",
                  zIndex: "-1",
                }}
              >
                <div
                  style={{
                    height: "200%",
                    left: "0",
                    position: "absolute",
                    top: "0",
                    transition: "0s",
                    width: "200%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="vue-portal-target" />
      {showSmsModal && (
        <div id="modals-container">
          <div className="vm--container scrollable">
            <div
              aria-expanded="true"
              className="vm--overlay"
              data-modal="sms-confirm"
              onClick={() => setShowSmsModal(false)}
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
                left: "185px",
                top: "186px",
                width: "632px",
              }}
            >
              <div
                className="a-main-modal"
                style={{ top: "0px", transition: "none" }}
              >
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
                    onClick={() => setShowSmsModal(false)}
                  >
                    <svg className="a-svg">
                      <use
                        xlinkHref="#icon-cross"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      />
                    </svg>
                  </button>
                  <div className="a-main-modal__content">
                    <div className="a-sms-confirm-modal-content">
                      <div className="a-sms-confirm-modal-content__title a-title-h3">
                        Подтверждение заказа
                      </div>
                      <div className="a-sms-confirm-modal-content__content">
                        <div className="a-sms-confirm-modal-content__text">
                          Для оформления заказа подтвердите ваш телефон. Код
                          подтверждения отправлен на номер
                          <span className="a-sms-confirm-modal-content__phone">
                            {" "}
                            {formattedCustomerPhone}
                          </span>
                        </div>
                        <div className="a-sms-confirm-modal-content__field">
                          <div className="a-input-field a-input-field--type-digits">
                            <label
                              className="a-input-field__constrain"
                              title="Код подтверждения"
                            >
                              <span className="a-input-field__label a-input-field__label--show">
                                Код подт⁠верждения
                              </span>
                              <input
                                autoComplete="off"
                                className="a-input-field__input"
                                inputMode="numeric"
                                lang="ru"
                                name=""
                                placeholder="Код подтверждения"
                                spellCheck="false"
                                type="text"
                                value={smsCode}
                                onChange={(event) =>
                                  setSmsCode(event.target.value)
                                }
                              />
                            </label>
                          </div>
                        </div>
                        <div className="a-sms-confirm-modal-content__text">
                          Тестовый код: 0000
                        </div>
                        {smsError ? (
                          <div className="a-sms-confirm-modal-content__text">
                            {smsError}
                          </div>
                        ) : null}
                      </div>
                      <div className="a-sms-confirm-modal-content__buttons">
                        <div className="a-sms-confirm-modal-content__button">
                          <button
                            className="a-main-button a-main-button--display-block a-main-button--type-medium a-main-button--corner-round a-main-button--color-blue"
                            type="button"
                            onClick={handleConfirmSms}
                          >
                            <span className="a-main-button__wrap">
                              <span className="a-main-button__content">
                                Подтвердить
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
      )}
    </main>
  );
}
