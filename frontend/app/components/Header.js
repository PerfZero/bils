"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { API_BASE_URL } from "../../config/api";
import { getOrCreateCart } from "../lib/cart";

const chunkItems = (items, size) => {
  if (!items?.length) {
    return [];
  }

  const chunks = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
};

export default function Header({ onProfileClick }) {
  const [isSticky, setIsSticky] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isHamburgerCatalogOpen, setIsHamburgerCatalogOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeChildIndex, setActiveChildIndex] = useState(0);
  const [catalogItems, setCatalogItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let isActive = true;
    const updateCount = async () => {
      try {
        const { cart } = await getOrCreateCart();
        if (isActive) {
          setCartCount(cart?.total_quantity || 0);
        }
      } catch (error) {
        if (isActive) {
          setCartCount(0);
        }
      }
    };

    updateCount();
    const handleCartUpdate = (event) => {
      const nextCount = event?.detail?.total_quantity || 0;
      setCartCount(nextCount);
    };
    window.addEventListener("cart:updated", handleCartUpdate);
    return () => {
      isActive = false;
      window.removeEventListener("cart:updated", handleCartUpdate);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 568px)");
    const update = () => setIsMobile(media.matches);
    update();
    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }
    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/categories/`);
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results || [];

        // Transform API data to match expected format
        const transformedData = data.map((category) => ({
          label: category.name,
          href: category.href,
          code: category.slug,
          children: category.children.map((child) => ({
            label: child.name,
            href: child.href,
            children: child.children.map((subchild) => ({
              label: subchild.name,
              href: subchild.href,
            })),
          })),
        }));

        setCatalogItems(transformedData);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        // Fallback to empty array if API fails
        setCatalogItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const activeItem = catalogItems[activeIndex];
  const activeChild = activeItem?.children?.[activeChildIndex];
  const depthThreeColumns = chunkItems(activeChild?.children, 10);
  const brands = activeItem?.brands ?? [];
  const isStickyCatalogOpen = isCatalogOpen && isSticky;
  const isBottomCatalogOpen = isCatalogOpen && !isSticky;

  const renderCatalogPlane = (isOpen) => (
    <div className="js-menu__plane a-menu__plane" style={{ height: "640px" }}>
      <div
        className="a-menu__depth a-menu__depth--1"
        style={{ display: isOpen ? "block" : "none" }}
      >
        <ul className="a-menu__list">
          {loading ? (
            <li className="a-menu__item a-menu__item--list">
              <span className="a-menu__link">Загрузка...</span>
            </li>
          ) : (
            catalogItems.map((item, index) => (
              <li
                key={item.href}
                className={`a-menu__item a-menu__item--list${
                  activeIndex === index ? " a-menu__item--active" : ""
                }`}
                onMouseEnter={() => {
                  setActiveIndex(index);
                  setActiveChildIndex(0);
                }}
              >
                <a href={item.href} className="a-menu__link">
                  <span>{item.label}</span>
                </a>
              </li>
            ))
          )}
        </ul>
      </div>
      {isOpen && activeItem?.children?.length > 0 && (
        <div className="a-menu__depth a-menu__depth--2">
          <div className="a-menu__group a-menu__group--active">
            <a href={activeItem.href} className="a-menu__title">
              {activeItem.label}
            </a>
            <ul className="a-menu__list">
              {activeItem.children.map((child, index) => (
                <li
                  key={child.href}
                  className={`a-menu__item a-menu__item--list${
                    activeChildIndex === index ? " a-menu__item--active" : ""
                  }`}
                  onMouseEnter={() => setActiveChildIndex(index)}
                >
                  <a href={child.href} className="a-menu__link">
                    <span>{child.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {isOpen && depthThreeColumns.length > 0 && (
        <div className="a-menu__depth a-menu__depth--3">
          <div className="a-menu__group a-menu__group--active">
            <a href={activeChild.href} className="a-menu__title">
              {activeChild.label}
            </a>
            <div className="a-menu__columns">
              {depthThreeColumns.map((column, columnIndex) => (
                <div className="a-menu__column" key={columnIndex}>
                  <div>
                    <ul className="a-menu__list">
                      {column.map((childItem) => (
                        <li className="a-menu__item" key={childItem.href}>
                          <a href={childItem.href} className="a-menu__link">
                            <span>{childItem.label}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {isOpen && brands.length > 0 && (
        <div className="a-menu__depth a-menu__depth--4">
          <div className="a-menu__title">Популярные бренды</div>
          <ul className="a-menu__list">
            {brands.map((brand) => (
              <a
                key={brand.href}
                href={brand.href}
                className="a-picture-card a-menu__item-picture"
                code={activeItem.code}
              >
                <img
                  src={brand.src}
                  alt={brand.alt}
                  className="a-picture-card__picture a-lazy-load a-is-loaded"
                />
                <span />
              </a>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <header
      className={`a-header a-page__header a-header--main-desktop${
        isSticky ? " a-header--sticky-desktop" : ""
      }`}
    >
      {isCatalogOpen && (
        <div className="a-overlay" onClick={() => setIsCatalogOpen(false)} />
      )}
      <div className="a-header__stub" />
      <div className="a-header__top">
        <div className="a-header__container a-bar">
          <ul className="a-bar__list">
            <li className="a-bar__item a-bar__item--left">
              <button
                type="button"
                className="a-bar__link a-bar__link--city a-link"
              >
                <svg className="a-svg a-bar__icon a-bar__icon--city">
                  <use
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xlinkHref="#icon-plane"
                  />
                </svg>{" "}
                Москва
              </button>
              <div className="a-bar__group-logo-link">
                <svg className="a-svg a-bar__icon-location">
                  <use
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xlinkHref="#icon-location"
                  />
                </svg>{" "}
                <a
                  href="/shops/"
                  className="a-bar__link a-link a-link--solid-line"
                >
                  Магазины
                </a>
              </div>
            </li>
            <li className="a-bar__item a-bar__item--center">
              <span className="a-bar__spoiler">
                <svg className="a-svg a-bar__icon--briefcase">
                  <use
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xlinkHref="#icon-section-briefcase-stroke"
                  />
                </svg>{" "}
                <a
                  href="/corporate/"
                  className="a-link-button a-bar__spoiler a-bar__spoiler--underline"
                >
                  <span className="a-link-button__content a-link-button__content--black">
                    Юридическим лицам
                  </span>
                </a>
              </span>{" "}
              <a
                href="/service/"
                className="a-link-button a-bar__spoiler a-bar__spoiler--underline"
              >
                <span className="a-link-button__content a-link-button__content--black">
                  Сервисный центр
                </span>
              </a>{" "}
              <span className="a-bar__spoiler">
                Оплата и{"\u00a0"}получение
                <svg className="a-svg a-bar__icon-chevron-down">
                  <use
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xlinkHref="#icon-chevron-down"
                  />
                </svg>
                <div
                  content="корпоративным клиентам"
                  className="floating-block floating-block--left"
                >
                  <div className="floating-block__content">
                    <ul className="a-bar__floating-list">
                      <a
                        href="/customer/delivery/"
                        className="a-link-button a-bar__floating-item"
                      >
                        <span className="a-link-button__content a-link-button__content--black">
                          Условия доставки
                        </span>
                      </a>
                      <button
                        aria-label="Статус заказа"
                        title="Статус заказа"
                        type="button"
                        className="a-link-button a-bar__floating-item"
                      >
                        <span className="a-link-button__content a-link-button__content--black">
                          Статус заказа
                        </span>
                      </button>
                      <button
                        aria-label="Оплатить заказ"
                        title="Оплатить заказ"
                        type="button"
                        className="a-link-button a-bar__floating-item"
                      >
                        <span className="a-link-button__content a-link-button__content--black">
                          Оплатить заказ
                        </span>
                      </button>
                    </ul>
                  </div>
                </div>
              </span>
            </li>
            <li className="a-bar__item">
              <a
                href="tel:+74951525679"
                className="a-bar__link a-bar__link--bold a-bar__link--phone a-link a-link--no-line"
              >
                8 (495) 152-56-79
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="a-header__middle">
        <div className="a-header__constrain a-header__constrain--main-bar">
          <div className="a-header__container a-bar">
            <div className="a-bar__logo">
              <Link href="/" className="a-bar__logo-link">
                <svg className="a-svg a-bar__logo-icon">
                  <use
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xlinkHref="#icon-logo-30"
                  />
                </svg>{" "}
                <span className="a-bar__logo-text">
                  Сеть центров
                  <br />
                  инструмента
                  <br />и{"\u00a0"}техники
                </span>
              </Link>
            </div>
            <div className="a-bar__buttons">
              <div
                className={`a-menu__item a-menu__item--main a-menu__item--list${
                  isStickyCatalogOpen ? " a-menu__item--active" : ""
                }`}
              >
                <div
                  role="button"
                  tabIndex={0}
                  className="a-bar__button a-button a-button--orange"
                  onClick={() => setIsCatalogOpen((prev) => !prev)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setIsCatalogOpen((prev) => !prev);
                    }
                  }}
                >
                  <span>Каталог товаров</span>{" "}
                  <svg className="a-svg a-menu__icon">
                    <use
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xlinkHref={
                        isStickyCatalogOpen
                          ? "#icon-old-hamburger-close"
                          : "#icon-old-hamburger-open-right"
                      }
                    />
                  </svg>
                </div>
                {renderCatalogPlane(isStickyCatalogOpen)}
              </div>
            </div>
            <div className="a-bar__search">
              <form>
                <div className="a-main-search">
                  <div className="a-main-search__container">
                    <div className="a-main-search__wrap">
                      <div className="a-main-search__placeholder" />
                      <div className="a-input-field a-input-field--type-string">
                        <label className="a-input-field__constrain search-page">
                          <input
                            autoComplete="off"
                            type="text"
                            name="q"
                            placeholder="Найти в Бигам ..."
                            className="a-input-field__input digi-instant-search jc-ignore"
                          />
                        </label>
                      </div>
                      <div className="a-main-search__buttons">
                        <button
                          type="button"
                          title="Поиск"
                          className="a-main-search__button a-main-search__button--search"
                        >
                          <svg className="a-svg">
                            <use
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              xlinkHref="#icon-search"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <ul className="a-helper-list a-bar__helper-list">
              <li className="a-helper-list__item a-helper-list__item--profile">
                <button
                  type="button"
                  title="Профиль"
                  className="a-helper a-helper--profile a-helper--active"
                  onClick={onProfileClick}
                >
                  <span className="a-helper__container">
                    <span className="a-helper__wrap">
                      <svg className="a-svg a-helper__icon a-helper__icon--active">
                        <use
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          xlinkHref="#icon-person-stroke"
                        />
                      </svg>
                    </span>
                    <span className="a-helper__label">Профиль</span>
                  </span>
                </button>
                <div
                  id="auth-block"
                  className="floating-block floating-block--left"
                >
                  <div className="floating-block__content">
                    <div className="user-floating-menu">
                      <span className="user-floating-menu__no-auth-title">
                        Вход или регистрация
                      </span>
                      <span className="user-floating-menu__no-auth-description">
                        Доступ к персональным скидкам и бонусным баллам
                      </span>
                      <button
                        type="button"
                        className="a-main-button a-main-button--display-inline a-main-button--type-medium a-main-button--corner-round a-main-button--color-orange"
                      >
                        <span className="a-main-button__wrap">
                          <span className="a-main-button__content">Войти</span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
              <li className="a-helper-list__item a-helper-list__item--comparison">
                <a
                  href="/personal/compare/"
                  rel="nofollow"
                  className="a-helper-list__link"
                >
                  <button
                    type="button"
                    title="Сравнение"
                    className="a-helper a-helper--comparison a-helper--active a-helper--standalone"
                  >
                    <span className="a-helper__container">
                      <span className="a-helper__wrap">
                        <svg className="a-svg a-helper__icon">
                          <use
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            xlinkHref="#icon-comparison-stroke"
                          />
                        </svg>
                      </span>
                      {!isMobile && (
                        <span className="a-helper__label">Сравнение</span>
                      )}
                    </span>
                  </button>
                </a>
              </li>
              <li className="a-helper-list__item a-helper-list__item--favorite">
                <a
                  href="/personal/favorites/"
                  rel="nofollow"
                  className="a-helper-list__link"
                >
                  <button
                    type="button"
                    title="Избранное"
                    className="a-helper a-helper--favorite a-helper--active a-helper--standalone"
                  >
                    <span className="a-helper__container">
                      <span className="a-helper__wrap">
                        <svg className="a-svg a-helper__icon">
                          <use
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            xlinkHref="#icon-favorite-stroke"
                          />
                        </svg>
                      </span>
                      <span className="a-helper__label">Избранное</span>
                    </span>
                  </button>
                </a>
              </li>
              <li className="a-helper-list__item a-helper-list__item--cart">
                <a
                  href="/personal/cart/"
                  rel="nofollow"
                  className="a-helper-list__link"
                >
                  <button
                    type="button"
                    title="Корзина"
                    className="a-helper a-helper--cart a-helper--active a-helper--standalone"
                  >
                    <span className="a-helper__container">
                      <span className="a-helper__wrap">
                        <svg className="a-svg a-helper__icon">
                          <use
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            xlinkHref="#icon-cart-stroke"
                          />
                        </svg>
                        {cartCount > 0 && (
                          <span className="a-helper__count">{cartCount}</span>
                        )}
                      </span>
                      <span className="a-helper__label">Корзина</span>
                    </span>
                  </button>
                </a>
              </li>
              <li className="a-helper-list__item a-helper-list__item--search">
                <button
                  type="button"
                  title=""
                  className="a-helper a-helper--search a-helper--active a-helper--standalone"
                >
                  <span className="a-helper__container">
                    <span className="a-helper__wrap">
                      <svg className="a-svg a-helper__icon">
                        <use
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          xlinkHref="#icon-search"
                        />
                      </svg>
                    </span>
                  </span>
                </button>
              </li>
            </ul>
            <button
              type="button"
              title="Меню"
              className={
                "a-bar__hamburger" +
                (isHamburgerOpen ? " a-bar__hamburger--open" : "")
              }
              onClick={() =>
                setIsHamburgerOpen((prev) => {
                  if (prev) {
                    setIsHamburgerCatalogOpen(false);
                  }
                  return !prev;
                })
              }
              aria-expanded={isHamburgerOpen}
            >
              <svg className="a-svg a-bar__hamburger-icon a-bar__hamburger-icon--open">
                <use
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xlinkHref="#icon-old-hamburger-open"
                />
              </svg>
              <svg className="a-svg a-bar__hamburger-icon a-bar__hamburger-icon--close">
                <use
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xlinkHref="#icon-old-hamburger-close"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="a-header__constrain a-header__constrain--anchors-bar vue-portal-target" />
        {isHamburgerOpen && (
          <div className="hamburger">
            <div className="hamburger__city">
              <button
                aria-label=""
                title=""
                type="button"
                className="a-link-button"
              >
                <span className="a-link-button__icon a-link-button__icon--blue">
                  <svg className="a-svg a-svg--sm">
                    <use
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xlinkHref="#icon-plane"
                    />
                  </svg>
                </span>
                <span className="a-link-button__content a-link-button__content--blue a-link-button__content--underline a-link-button__content--underline-dashed">
                  <span>Москва</span>
                </span>
              </button>
            </div>
            <ul className="hamburger__menu">
              <li className="hamburger__menu-item">
                <button
                  aria-label=""
                  title=""
                  type="button"
                  className="a-link-button"
                  onClick={onProfileClick}
                >
                  <span className="a-link-button__icon a-link-button__icon--orange">
                    <svg className="a-svg a-svg--sm">
                      <use
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        xlinkHref="#icon-person-stroke"
                      />
                    </svg>
                  </span>
                  <span className="a-link-button__content a-link-button__content--black">
                    <span>Профиль</span>
                  </span>
                </button>
              </li>
              <li className="hamburger__menu-item">
                <a href="/promo/" className="a-link-button">
                  <span className="a-link-button__icon a-link-button__icon--blue">
                    <svg className="a-svg a-svg--sm">
                      <use
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        xlinkHref="#icon-menu-item-sale"
                      />
                    </svg>
                  </span>
                  <span className="a-link-button__content a-link-button__content--black">
                    <span>Акции</span>
                  </span>
                </a>
              </li>
              <li className="hamburger__menu-item">
                <div className="hamburger__item-horizon">
                  <button
                    aria-label=""
                    title=""
                    type="button"
                    className="a-link-button"
                    onClick={() => setIsHamburgerCatalogOpen((prev) => !prev)}
                  >
                    <span className="a-link-button__icon a-link-button__icon--blue">
                      <svg className="a-svg a-svg--sm">
                        <use
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          xlinkHref="#icon-catalog-navbar"
                        />
                      </svg>
                    </span>
                    <span className="a-link-button__content a-link-button__content--black">
                      <span>Каталог товаров</span>
                    </span>
                  </button>
                  <svg className="a-svg hamburger__menu-chevron--grey a-svg--small">
                    <use
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xlinkHref={
                        isHamburgerCatalogOpen
                          ? "#icon-chevron-up"
                          : "#icon-chevron-down"
                      }
                    />
                  </svg>
                </div>
                {isHamburgerCatalogOpen && (
                  <ul className="hamburger__catalog">
                    <li className="hamburger__catalog-item">
                      <a
                        href="/catalog/instrument-5748/"
                        className="a-link-button"
                      >
                        <span className="a-link-button__content a-link-button__content--black">
                          Инструменты
                        </span>
                      </a>
                    </li>
                    <li className="hamburger__catalog-item">
                      <a
                        href="/catalog/vse-dlya-sada-i-ogoroda-5880/"
                        className="a-link-button"
                      >
                        <span className="a-link-button__content a-link-button__content--black">
                          Сад
                        </span>
                      </a>
                    </li>
                    <li className="hamburger__catalog-item">
                      <a
                        href="/catalog/otoplenie-6071/"
                        className="a-link-button"
                      >
                        <span className="a-link-button__content a-link-button__content--black">
                          Отопление
                        </span>
                      </a>
                    </li>
                    <li className="hamburger__catalog-item">
                      <a
                        href="/catalog/vodosnabzhenie-santekhnika-i-otoplenie-6069/"
                        className="a-link-button"
                      >
                        <span className="a-link-button__content a-link-button__content--black">
                          Водоснабжение
                        </span>
                      </a>
                    </li>
                    <li className="hamburger__catalog-item">
                      <a
                        href="/catalog/svarochnoe-oborudovanie-6350/"
                        className="a-link-button"
                      >
                        <span className="a-link-button__content a-link-button__content--black">
                          Сварка
                        </span>
                      </a>
                    </li>
                    <li className="hamburger__catalog-item">
                      <a
                        href="/catalog/stroitelnaya-tekhnika-6029/"
                        className="a-link-button"
                      >
                        <span className="a-link-button__content a-link-button__content--black">
                          Техника
                        </span>
                      </a>
                    </li>
                    <li className="hamburger__catalog-item">
                      <button
                        aria-label="Все категории"
                        title="Все категории"
                        type="button"
                        className="a-link-button"
                      >
                        <span className="a-link-button__content a-link-button__content--black">
                          Все категории
                        </span>
                      </button>
                    </li>
                  </ul>
                )}
              </li>
              <li className="hamburger__menu-item">
                <a href="/brands/" className="a-link-button">
                  <span className="a-link-button__icon a-link-button__icon--blue">
                    <svg className="a-svg a-svg--sm">
                      <use
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        xlinkHref="#icon-menu-item-catalog"
                      />
                    </svg>
                  </span>
                  <span className="a-link-button__content a-link-button__content--black">
                    <span>Бренды</span>
                  </span>
                </a>
              </li>
              <li className="hamburger__menu-item">
                <a href="/shops/" className="a-link-button">
                  <span className="a-link-button__icon a-link-button__icon--blue">
                    <svg className="a-svg a-svg--sm">
                      <use
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        xlinkHref="#icon-menu-item-shops"
                      />
                    </svg>
                  </span>
                  <span className="a-link-button__content a-link-button__content--black">
                    <span>Магазины</span>
                  </span>
                </a>
              </li>
            </ul>
            <div>
              <div className="hamburger__contacts-label">Интернет-магазин</div>
              <a
                href="tel:+74951525679"
                className="a-link-button hamburger__contacts-link"
              >
                <span className="a-link-button__content a-link-button__content--blue">
                  8 (495) 152-56-79
                </span>
              </a>
            </div>
            <ul>
              <li className="hamburger__link">
                <a href="/about/" className="a-link-button">
                  <span className="a-link-button__content a-link-button__content--grey">
                    О компании
                  </span>
                </a>
              </li>
              <li className="hamburger__link">
                <a href="/corporate/" className="a-link-button">
                  <span className="a-link-button__content a-link-button__content--grey">
                    Юридическим лицам
                  </span>
                </a>
              </li>
              <li className="hamburger__link">
                <a href="/service/" className="a-link-button">
                  <span className="a-link-button__content a-link-button__content--grey">
                    Сервисный центр
                  </span>
                </a>
              </li>
              <li className="hamburger__link">
                <a href="/customer/delivery/" className="a-link-button">
                  <span className="a-link-button__content a-link-button__content--grey">
                    Условия доставки
                  </span>
                </a>
              </li>
              <li className="hamburger__link">
                <button
                  aria-label="Статус заказа"
                  title="Статус заказа"
                  type="button"
                  className="a-link-button"
                >
                  <span className="a-link-button__content a-link-button__content--grey">
                    Статус заказа
                  </span>
                </button>
              </li>
              <li className="hamburger__link">
                <button
                  aria-label="Оплатить заказ"
                  title="Оплатить заказ"
                  type="button"
                  className="a-link-button"
                >
                  <span className="a-link-button__content a-link-button__content--grey">
                    Оплатить заказ
                  </span>
                </button>
              </li>
              <li className="hamburger__link">
                <a href="/shops/" className="a-link-button">
                  <span className="a-link-button__content a-link-button__content--grey">
                    Контакты
                  </span>
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="a-header__bottom">
        <div className="a-header__container a-bar">
          <div className="a-bar__menu">
            <nav
              className="js-menu a-menu"
              onMouseLeave={() => {
                setActiveIndex(0);
                setActiveChildIndex(0);
              }}
            >
              <ul className="a-menu__list">
                <li
                  className={`a-menu__item a-menu__item--main a-menu__item--list${
                    isBottomCatalogOpen ? " a-menu__item--active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="a-main-button a-menu__link a-main-button--display-inline a-main-button--type-medium a-main-button--corner-round"
                    onClick={() => setIsCatalogOpen((prev) => !prev)}
                    aria-expanded={isBottomCatalogOpen}
                  >
                    <span className="a-main-button__wrap">
                      <span className="a-main-button__constrain">
                        <svg className="a-svg a-main-button__icon a-main-button__icon--left a-svg--medium a-main-button__icon--icon-old-hamburger-open-right a-main-button__icon--color">
                          <use
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            xlinkHref={
                              isCatalogOpen
                                ? "#icon-old-hamburger-close"
                                : "#icon-old-hamburger-open-right"
                            }
                          />
                        </svg>
                      </span>
                      <span className="a-main-button__content">
                        Каталог товаров
                      </span>
                    </span>
                  </button>
                  {renderCatalogPlane(isBottomCatalogOpen)}
                </li>
                <li className="a-menu__item">
                  <a href="/promo/" className="a-menu__link">
                    <svg className="a-svg a-menu__icon a-menu__icon--discount">
                      <use
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        xlinkHref="#icon-old-discount"
                      />
                    </svg>{" "}
                    <span>Акции</span>
                  </a>
                </li>
                <li className="a-menu__item">
                  <a href="/brands/" className="a-menu__link">
                    <span>Бренды</span>
                  </a>
                </li>
                <li className="a-menu__item">
                  <a href="/catalog/instrument-5748/" className="a-menu__link">
                    <span>Инструменты</span>
                  </a>
                </li>
                <li className="a-menu__item">
                  <a
                    href="/catalog/vse-dlya-sada-i-ogoroda-5880/"
                    className="a-menu__link"
                  >
                    <span>Сад</span>
                  </a>
                </li>
                <li className="a-menu__item">
                  <a href="/catalog/otoplenie-6071/" className="a-menu__link">
                    <span>Отопление</span>
                  </a>
                </li>
                <li className="a-menu__item">
                  <a
                    href="/catalog/vodosnabzhenie-santekhnika-i-otoplenie-6069/"
                    className="a-menu__link"
                  >
                    <span>Водоснабжение</span>
                  </a>
                </li>
                <li className="a-menu__item">
                  <a
                    href="/catalog/svarochnoe-oborudovanie-6350/"
                    className="a-menu__link"
                  >
                    <span>Сварка</span>
                  </a>
                </li>
                <li className="a-menu__item">
                  <a
                    href="/catalog/stroitelnaya-tekhnika-6029/"
                    className="a-menu__link"
                  >
                    <span>Техника</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
