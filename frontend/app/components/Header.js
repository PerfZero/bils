"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeChildIndex, setActiveChildIndex] = useState(0);
  const [catalogItems, setCatalogItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/categories/');
        const data = await response.json();
        
        // Transform API data to match expected format
        const transformedData = data.map(category => ({
          label: category.name,
          href: category.href,
          code: category.slug,
          children: category.children.map(child => ({
            label: child.name,
            href: child.href,
            children: child.children.map(subchild => ({
              label: subchild.name,
              href: subchild.href
            }))
          }))
        }));
        
        setCatalogItems(transformedData);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
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

  return (
    <header className="a-header a-page__header a-header--main-desktop">
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
                Ставрополь
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
              <div className="a-menu__item a-menu__item--main a-menu__item--list">
                <div className="a-bar__button a-button a-button--orange">
                  <span>Каталог товаров</span>{" "}
                  <svg className="a-svg a-menu__icon">
                    <use
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xlinkHref="#icon-old-hamburger-open-right"
                    />
                  </svg>
                </div>
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
                      <span className="a-helper__label">Сравнение</span>
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
            <button type="button" title="Меню" className="a-bar__hamburger">
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
      </div>
      <div className="a-header__bottom">
        <div className="a-header__container a-bar">
          <div className="a-bar__menu">
            {isCatalogOpen && (
              <div
                className="a-overlay a-overlay--active"
                onClick={() => setIsCatalogOpen(false)}
              />
            )}
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
                    isCatalogOpen ? " a-menu__item--active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="a-main-button a-menu__link a-main-button--display-inline a-main-button--type-medium a-main-button--corner-round"
                    onClick={() => setIsCatalogOpen((prev) => !prev)}
                    aria-expanded={isCatalogOpen}
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
                  <div
                    className="js-menu__plane a-menu__plane"
                    style={{ height: "640px" }}
                  >
                    <div
                      className="a-menu__depth a-menu__depth--1"
                      style={{ display: isCatalogOpen ? "block" : "none" }}
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
                              activeIndex === index
                                ? " a-menu__item--active"
                                : ""
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
                        )))}
                      </ul>
                    </div>
                    {isCatalogOpen && activeItem?.children?.length > 0 && (
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
                                  activeChildIndex === index
                                    ? " a-menu__item--active"
                                    : ""
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
                    {isCatalogOpen && depthThreeColumns.length > 0 && (
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
                                      <li
                                        className="a-menu__item"
                                        key={childItem.href}
                                      >
                                        <a
                                          href={childItem.href}
                                          className="a-menu__link"
                                        >
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
                    {isCatalogOpen && brands.length > 0 && (
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
