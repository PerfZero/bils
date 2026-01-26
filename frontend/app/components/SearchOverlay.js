"use client";

import { useEffect, useState } from "react";

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="digi-is-container digi-search-fixed digi_desktop digi-disable-scroll digi_open digi_searchless digi_open-ac"
      id="digi-shield"
      style={{
        "--wrapper-padding": "0 20px 0 20px",
        "--wrapper-width": "1240px",
        height: "calc(-160px + 100vh)",
        top: "160px",
      }}
    >
      <div className="digi-overlay" onClick={onClose} />
      <div className="digi-search">
        <div className="digi-wrapper">
          <div className="digi-search-wrapper">
            <form className="digi-search__form digi-search-form digi-search-form-active">
              <div className="digi-search-form__input-block">
                <svg
                  className="digi-search-form__icon digi-search-form__icon_decorative"
                  fill="none"
                  height="16"
                  viewBox="0 0 20 20"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use xlinkHref="#digi-icon-magnifier-desktop" />
                </svg>
                <input
                  className="digi-search-form__input"
                  data-target="_self"
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <div className="digi-search-form__actions" />
              </div>
              <button className="digi-search-form__submit" type="button">
                Найти
              </button>
              <button
                className="digi-search-form__close"
                type="button"
                onClick={onClose}
              >
                Закрыть
              </button>
            </form>
          </div>
        </div>
      </div>
      <div
        className="digi-ac digi-ac--vertical"
        style={{
          left: "250.5px",
          width: "556px",
        }}
      >
        <div className="digi-wrapper">
          <div className="digi-outer" />
          <div className="digi-ac__wrapper">
            <div className="digi-ac__set digi-ac__set_main">
              <div className="digi-ac-block">
                <div className="digi-ac-block__title digi-ac-block__title_history">
                  История
                  <button className="digi-ac-history-clear-all">
                    Очистить
                  </button>
                </div>
                <ul>
                  <li>
                    <button
                      className="digi-ac-block__button digi-ac-history"
                      type="button"
                    >
                      <svg
                        className="digi-ac-block__icon digi-ac-block__icon-history"
                        clipRule="evenodd"
                        fill="none"
                        fillRule="evenodd"
                        height="16"
                        stroke=""
                        viewBox="0 0 20 20"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use xlinkHref="#digi-icon-history" />
                      </svg>
                      <span className="digi-ac-history__text">
                        <b />
                        мотоблок дизельный patriot boston 6d 440701535
                      </span>
                      <span className="digi-ac-history__clear">
                        <svg
                          height="11"
                          viewBox="0 0 14 14"
                          width="11"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use xlinkHref="#digi-icon-cross" />
                        </svg>
                      </span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="digi-ac-block__button digi-ac-history"
                      type="button"
                    >
                      <svg
                        className="digi-ac-block__icon digi-ac-block__icon-history"
                        clipRule="evenodd"
                        fill="none"
                        fillRule="evenodd"
                        height="16"
                        stroke=""
                        viewBox="0 0 20 20"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use xlinkHref="#digi-icon-history" />
                      </svg>
                      <span className="digi-ac-history__text">
                        <b />
                        набор торцевых 6-гранных головок jtc jtc-h816m, 1",
                        36-65 мм, 16 предметов
                      </span>
                      <span className="digi-ac-history__clear">
                        <svg
                          height="11"
                          viewBox="0 0 14 14"
                          width="11"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use xlinkHref="#digi-icon-cross" />
                        </svg>
                      </span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="digi-ac-block__button digi-ac-history"
                      type="button"
                    >
                      <svg
                        className="digi-ac-block__icon digi-ac-block__icon-history"
                        clipRule="evenodd"
                        fill="none"
                        fillRule="evenodd"
                        height="16"
                        stroke=""
                        viewBox="0 0 20 20"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use xlinkHref="#digi-icon-history" />
                      </svg>
                      <span className="digi-ac-history__text">
                        <b />
                        перфоратор sds-plus makita hr 4501c
                      </span>
                      <span className="digi-ac-history__clear">
                        <svg
                          height="11"
                          viewBox="0 0 14 14"
                          width="11"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use xlinkHref="#digi-icon-cross" />
                        </svg>
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
              <div className="digi-ac-block">
                <div className="digi-ac-block__title digi-ac-block__title_queries">
                  Часто ищут
                </div>
                <ul>
                  <li>
                    <button className="digi-ac-block__button" type="button">
                      <svg
                        className="digi-ac-block__icon digi-ac-block__icon-history"
                        clipRule="evenodd"
                        fill="none"
                        fillRule="evenodd"
                        height="16"
                        stroke=""
                        viewBox="0 0 20 20"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use xlinkHref="#digi-icon-query" />
                      </svg>
                      <span className="digi-ac-query__name">
                        <b />
                        электроды
                      </span>
                    </button>
                  </li>
                  <li>
                    <button className="digi-ac-block__button" type="button">
                      <svg
                        className="digi-ac-block__icon digi-ac-block__icon-history"
                        clipRule="evenodd"
                        fill="none"
                        fillRule="evenodd"
                        height="16"
                        stroke=""
                        viewBox="0 0 20 20"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use xlinkHref="#digi-icon-query" />
                      </svg>
                      <span className="digi-ac-query__name">
                        <b />
                        электрический лобзик
                      </span>
                    </button>
                  </li>
                  <li>
                    <button className="digi-ac-block__button" type="button">
                      <svg
                        className="digi-ac-block__icon digi-ac-block__icon-history"
                        clipRule="evenodd"
                        fill="none"
                        fillRule="evenodd"
                        height="16"
                        stroke=""
                        viewBox="0 0 20 20"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use xlinkHref="#digi-icon-query" />
                      </svg>
                      <span className="digi-ac-query__name">
                        <b />
                        электролопата
                      </span>
                    </button>
                  </li>
                  <li>
                    <button className="digi-ac-block__button" type="button">
                      <svg
                        className="digi-ac-block__icon digi-ac-block__icon-history"
                        clipRule="evenodd"
                        fill="none"
                        fillRule="evenodd"
                        height="16"
                        stroke=""
                        viewBox="0 0 20 20"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use xlinkHref="#digi-icon-query" />
                      </svg>
                      <span className="digi-ac-query__name">
                        <b />
                        компрессор воздушный электрический 220в 50литров
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
              <div className="digi-ac-block">
                <div className="digi-ac-block__title digi-ac-block__title_brands">
                  Бренды
                </div>
                <ul className="digi-ac-brand-wrapper">
                  <li>
                    <a href="https://bremax.ru/brands/szsm/">
                      <button className="digi-ac-block__button digi-ac-brand">
                        <img
                          alt="СЗСМ"
                          className="digi-ac-brand-image"
                          src="https://cdn.bigam.ru/resize_cache/iblock/eb8/g6ov06zwg52f8ie7n1chx4mbyinsn9wn/312_96_0/svgnw9zl5led7bg7woj9gd1kcgj34kko.png"
                          title="СЗСМ"
                        />
                      </button>
                    </a>
                  </li>
                  <li>
                    <a href="https://bremax.ru/brands/penzaelektrod/">
                      <button className="digi-ac-block__button digi-ac-brand">
                        <img
                          alt="Пензаэлектрод"
                          className="digi-ac-brand-image"
                          src="https://cdn.bigam.ru/iblock/5f0/1nbtrfujv0aqx6yso4pjuqk21o63b383/penzaelektrod.png"
                          title="Пензаэлектрод"
                        />
                      </button>
                    </a>
                  </li>
                  <li>
                    <a href="https://bremax.ru/brands/mez/">
                      <button className="digi-ac-block__button digi-ac-brand">
                        <img
                          alt="МЭЗ"
                          className="digi-ac-brand-image"
                          src="https://cdn.bigam.ru/resize_cache/iblock/fb9/rmpz8smb0lr1ured1nzwyyjwsz9p9ra2/312_96_0/jj7z07g0kxm80svge4mmpo3p3ymhfa4g.jpg"
                          title="МЭЗ"
                        />
                      </button>
                    </a>
                  </li>
                  <li>
                    <a href="https://bremax.ru/brands/esab/">
                      <button className="digi-ac-block__button digi-ac-brand">
                        <img
                          alt="Esab"
                          className="digi-ac-brand-image"
                          src="https://cdn.bigam.ru/resize_cache/iblock/3a3/uu97g134mdm68tlx3e73kl0ch3dpmvnu/312_96_0/edi1yv1wq882vli56vas2n9p3j8q1czg.jpg"
                          title="Esab"
                        />
                      </button>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="digi-ac__set digi-ac__set_products">
              <div className="digi-ac-block">
                <div className="digi-ac-block__title digi-ac-block__title_products">
                  Популярные товары
                </div>
                <div className="digi-products-grid">
                  <div className="digi-product digi-product_ac">
                    <a
                      className="digi-product__image-wrapper"
                      href="/product/elektrody-mr-3s-1-6mm-sinie-695798/"
                      tabIndex="-1"
                      target="_blank"
                    >
                      <div className="digi-product__labels" />
                      <img
                        alt=""
                        className="digi-product__image"
                        onError={(event) => {
                          event.currentTarget.src =
                            "//cdn.diginetica.net/images/noimage.png";
                        }}
                        src="https://cdn.bigam.ru/iblock/4b4/qcn7mudncl9km8euj0vd7hs3zktqy1yw.jpg"
                      />
                    </a>
                    <div className="digi-product__main">
                      <div className="digi-product__meta">
                        <a
                          className="digi-product__label"
                          href="/product/elektrody-mr-3s-1-6mm-sinie-695798/"
                          target="_blank"
                        >
                          Электроды СЗСМ МР-3С, 1.6 мм, синие
                        </a>
                      </div>
                      <div className="digi-product__price">
                        <span className="digi-product-price-variant digi-product-price-variant_actual">
                          630
                          <span className="digi-product-price-variant__currency">
                            ₽
                          </span>
                        </span>
                      </div>
                      <div className="digi-product__actions">
                        <a
                          className="digi-product__button"
                          href="/product/elektrody-mr-3s-1-6mm-sinie-695798/"
                          tabIndex="-1"
                          target="_blank"
                        >
                          Подробнее
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="digi-product digi-product_ac">
                    <a
                      className="digi-product__image-wrapper"
                      href="/product/flagman-elektrody-mr-3-f-3-0-mm-kapsula-1-5kg-gost-9466-75-1589414/"
                      tabIndex="-1"
                      target="_blank"
                    >
                      <div className="digi-product__labels" />
                      <img
                        alt=""
                        className="digi-product__image"
                        onError={(event) => {
                          event.currentTarget.src =
                            "//cdn.diginetica.net/images/noimage.png";
                        }}
                        src="https://cdn.bigam.ru/iblock/9a5/fwclhcqtyodaf1bpf4w4dhxa755vlunc/1589414.jpg"
                      />
                    </a>
                    <div className="digi-product__main">
                      <div className="digi-product__meta">
                        <a
                          className="digi-product__label"
                          href="/product/flagman-elektrody-mr-3-f-3-0-mm-kapsula-1-5kg-gost-9466-75-1589414/"
                          target="_blank"
                        >
                          Электроды Пензаэлектрод Флагман зеленые (МР-3, 3.0 мм,
                          капсула 1.5 кг) ГОСТ 9466-75
                        </a>
                      </div>
                      <div className="digi-product__price">
                        <span className="digi-product-price-variant digi-product-price-variant_actual">
                          585
                          <span className="digi-product-price-variant__currency">
                            ₽
                          </span>
                        </span>
                      </div>
                      <div className="digi-product__actions">
                        <a
                          className="digi-product__button"
                          href="/product/flagman-elektrody-mr-3-f-3-0-mm-kapsula-1-5kg-gost-9466-75-1589414/"
                          tabIndex="-1"
                          target="_blank"
                        >
                          Подробнее
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="digi-product digi-product_ac">
                    <a
                      className="digi-product__image-wrapper"
                      href="/product/mez-elektrody-svarochnye-d-3-0-mr-3-lyuks-1kg-1556928/"
                      tabIndex="-1"
                      target="_blank"
                    >
                      <div className="digi-product__labels" />
                      <img
                        alt=""
                        className="digi-product__image"
                        onError={(event) => {
                          event.currentTarget.src =
                            "//cdn.diginetica.net/images/noimage.png";
                        }}
                        src="https://cdn.bigam.ru/iblock/87c/9wachoz0wqx3spdme2pirlw08x0d3mxy/1556928.jpg"
                      />
                    </a>
                    <div className="digi-product__main">
                      <div className="digi-product__meta">
                        <a
                          className="digi-product__label"
                          href="/product/mez-elektrody-svarochnye-d-3-0-mr-3-lyuks-1kg-1556928/"
                          target="_blank"
                        >
                          Электроды сварочные МЭЗ МР-3 Люкс 3 мм, 1 кг
                        </a>
                      </div>
                      <div className="digi-product__price">
                        <span className="digi-product-price-variant digi-product-price-variant_actual">
                          350
                          <span className="digi-product-price-variant__currency">
                            ₽
                          </span>
                        </span>
                      </div>
                      <div className="digi-product__actions">
                        <a
                          className="digi-product__button"
                          href="/product/mez-elektrody-svarochnye-d-3-0-mr-3-lyuks-1kg-1556928/"
                          tabIndex="-1"
                          target="_blank"
                        >
                          Подробнее
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="digi-main-scroll-wrapper">
        <div className="digi-main">
          <div className="digi-wrapper">
            <div className="digi-main-wrapper">
              <div className="digi-main__facets" style={{ display: "none" }} />
              <div
                className="digi-main__results"
                style={{
                  display: "none",
                  position: "relative",
                }}
              >
                <div className="digi-products">
                  <div className="digi-products-grid digi-products-grid_horde" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="digi_hidden">
        <svg>
          <symbol id="digi-icon-history">
            <path
              d="M9.42145 4.44187H10.5749C10.6805 4.44187 10.7668 4.52559 10.7668 4.62791V11.0302C10.7668 11.0907 10.738 11.1465 10.6876 11.1814L6.72359 13.9884C6.63725 14.0488 6.51735 14.0326 6.455 13.9488L5.76914 13.0419C5.70439 12.9558 5.72358 12.8395 5.80991 12.7814L9.2296 10.3837V4.62791C9.2296 4.52559 9.31593 4.44187 9.42145 4.44187ZM4.15042 6.1907L0.390202 7.0814C0.270297 7.10931 0.152791 7.02094 0.152791 6.90233L0.133605 3.14652C0.133605 2.9907 0.31826 2.90233 0.442961 3L4.22237 5.8628C4.25093 5.88423 4.27268 5.91304 4.28511 5.94592C4.29754 5.9788 4.30014 6.01442 4.29263 6.04867C4.28511 6.08292 4.26778 6.11443 4.24262 6.13955C4.21747 6.16468 4.18551 6.18241 4.15042 6.1907V6.1907ZM0.12881 13.193L1.48853 12.7395C1.53594 12.7238 1.58782 12.7266 1.63309 12.7475C1.67835 12.7684 1.7134 12.8056 1.73074 12.8512C1.7763 12.9698 1.82427 13.0861 1.87463 13.2023C2.30149 14.1814 2.913 15.0628 3.69478 15.8186C4.46788 16.5707 5.3841 17.1701 6.39265 17.5837C7.43744 18.0121 8.5605 18.232 9.69483 18.2302C10.8411 18.2302 11.9514 18.014 12.997 17.5837C14.0056 17.1701 14.9218 16.5707 15.6949 15.8186C16.4743 15.0628 17.0858 14.1814 17.515 13.2023C17.9543 12.1886 18.1794 11.0996 18.1769 10C18.1769 8.88838 17.9539 7.80931 17.5102 6.79536C17.0834 5.81629 16.4719 4.93489 15.6901 4.17908C14.917 3.42703 14.0008 2.82758 12.9922 2.41396C11.9514 1.98372 10.8387 1.76745 9.69243 1.76745C8.54614 1.76745 7.43582 1.98372 6.39025 2.41396C5.3817 2.82758 4.46549 3.42703 3.69239 4.17908C3.44778 4.41861 3.21756 4.66745 3.00653 4.93024L1.57247 3.84187C3.45977 1.50233 6.39744 -0.00232289 9.69723 2.69196e-06C15.4431 0.00232827 20.057 4.52791 19.9995 10.1023C19.9419 15.5791 15.3496 20 9.69243 20C5.24396 20 1.45496 17.2651 0.0113027 13.4349C-0.0246688 13.3372 0.02809 13.2279 0.12881 13.193V13.193Z"
              fill="black"
            />
          </symbol>
          <symbol id="digi-icon-query">
            <path
              clipRule="evenodd"
              d="M9.16667 3.4375C6.00254 3.4375 3.4375 6.00254 3.4375 9.16667C3.4375 12.3308 6.00254 14.8958 9.16667 14.8958C12.3308 14.8958 14.8958 12.3308 14.8958 9.16667C14.8958 6.00254 12.3308 3.4375 9.16667 3.4375ZM1.5625 9.16667C1.5625 4.967 4.967 1.5625 9.16667 1.5625C13.3663 1.5625 16.7708 4.967 16.7708 9.16667C16.7708 13.3663 13.3663 16.7708 9.16667 16.7708C4.967 16.7708 1.5625 13.3663 1.5625 9.16667Z"
              fill="black"
              fillRule="evenodd"
            />
            <path
              clipRule="evenodd"
              d="M13.2121 13.2121C13.5782 12.8459 14.1718 12.8459 14.5379 13.2121L18.1629 16.8371C18.529 17.2032 18.529 17.7968 18.1629 18.1629C17.7968 18.529 17.2032 18.529 16.8371 18.1629L13.2121 14.5379C12.846 14.1718 12.846 13.5782 13.2121 13.2121Z"
              fill="black"
              fillRule="evenodd"
            />
          </symbol>
          <symbol id="digi-icon-cross">
            <path d="M8.14298 6.96147L13.813 1.29147C13.9404 1.14268 14.007 0.951284 13.9994 0.755536C13.9919 0.559788 13.9107 0.374102 13.7722 0.235584C13.6337 0.097066 13.448 0.0159182 13.2522 0.00835727C13.0565 0.000796372 12.8651 0.0673792 12.7163 0.1948L7.04631 5.8648L1.37631 0.187022C1.22752 0.0596013 1.03613 -0.00698084 0.840382 0.000580055C0.644634 0.00814095 0.458948 0.089288 0.32043 0.227806C0.181912 0.366324 0.100764 0.55201 0.093203 0.747758C0.0856421 0.943506 0.152225 1.1349 0.279646 1.28369L5.94965 6.96147L0.271868 12.6315C0.190448 12.7012 0.124321 12.787 0.0776367 12.8835C0.0309519 12.98 0.00471697 13.0851 0.000579584 13.1922C-0.0035578 13.2993 0.0144913 13.4061 0.0535937 13.5059C0.0926962 13.6058 0.152008 13.6964 0.227806 13.7722C0.303604 13.848 0.394252 13.9073 0.494061 13.9464C0.593869 13.9855 0.700683 14.0036 0.807798 13.9994C0.914913 13.9953 1.02002 13.9691 1.11651 13.9224C1.21301 13.8757 1.29881 13.8096 1.36853 13.7281L7.04631 8.05813L12.7163 13.7281C12.8651 13.8556 13.0565 13.9221 13.2522 13.9146C13.448 13.907 13.6337 13.8259 13.7722 13.6874C13.9107 13.5488 13.9919 13.3631 13.9994 13.1674C14.007 12.9717 13.9404 12.7803 13.813 12.6315L8.14298 6.96147Z" />
          </symbol>
          <symbol id="digi-icon-magnifier-desktop">
            <path
              clipRule="evenodd"
              d="M9.16667 3.4375C6.00254 3.4375 3.4375 6.00254 3.4375 9.16667C3.4375 12.3308 6.00254 14.8958 9.16667 14.8958C12.3308 14.8958 14.8958 12.3308 14.8958 9.16667C14.8958 6.00254 12.3308 3.4375 9.16667 3.4375ZM1.5625 9.16667C1.5625 4.967 4.967 1.5625 9.16667 1.5625C13.3663 1.5625 16.7708 4.967 16.7708 9.16667C16.7708 13.3663 13.3663 16.7708 9.16667 16.7708C4.967 16.7708 1.5625 13.3663 1.5625 9.16667Z"
              fill="black"
              fillRule="evenodd"
            />
            <path
              clipRule="evenodd"
              d="M13.2121 13.2121C13.5782 12.8459 14.1718 12.8459 14.5379 13.2121L18.1629 16.8371C18.529 17.2032 18.529 17.7968 18.1629 18.1629C17.7968 18.529 17.2032 18.529 16.8371 18.1629L13.2121 14.5379C12.846 14.1718 12.846 13.5782 13.2121 13.2121Z"
              fill="black"
              fillRule="evenodd"
            />
          </symbol>
        </svg>
      </div>
    </div>
  );
}
