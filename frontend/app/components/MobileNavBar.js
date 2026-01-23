"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getOrCreateCart } from "../lib/cart";

export default function MobileNavBar({ onProfileClick, onCatalogOpen }) {
  const [cartCount, setCartCount] = useState(0);

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

  return (
    <div className="nav-bar-mobile">
      <ul className="a-helper-list nav-bar-mobile__helper-list">
        <li className="a-helper-list__item a-helper-list__item--home">
          <Link
            href="/"
            aria-current="page"
            className="a-helper-list__link"
            rel="nofollow"
          >
            <button
              type="button"
              title="Главная"
              className="a-helper a-helper--home a-helper--active a-helper--standalone"
              link="/"
            >
              <span className="a-helper__container">
                <span className="a-helper__wrap">
                  <svg className="a-svg a-helper__icon">
                    <use
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xlinkHref="#icon-home"
                    />
                  </svg>
                </span>
                <span className="a-helper__label">Главная</span>
              </span>
            </button>
          </Link>
        </li>
        <li className="a-helper-list__item a-helper-list__item--catalog">
          <button
            type="button"
            title="Каталог"
            className="a-helper a-helper--catalog a-helper--standalone"
            iconinactive="catalog-navbar"
            onClick={onCatalogOpen}
          >
            <span className="a-helper__container">
              <span className="a-helper__wrap">
                <svg className="a-svg a-helper__icon">
                  <use
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xlinkHref="#icon-catalog-navbar"
                  />
                </svg>
              </span>
              <span className="a-helper__label">Каталог</span>
            </span>
          </button>
        </li>
        <li className="a-helper-list__item a-helper-list__item--cart">
          <Link
            href="/personal/cart/"
            className="a-helper-list__link"
            rel="nofollow"
          >
            <button
              type="button"
              title="Корзина"
              className="a-helper a-helper--cart a-helper--standalone"
              link="/personal/cart/"
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
          </Link>
        </li>
        <li className="a-helper-list__item a-helper-list__item--favorite">
          <Link
            href="/personal/favorites/"
            className="a-helper-list__link"
            rel="nofollow"
          >
            <button
              type="button"
              title="Избранное"
              className="a-helper a-helper--favorite a-helper--standalone"
              link="/personal/favorites/"
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
          </Link>
        </li>
        <li className="a-helper-list__item a-helper-list__item--profile">
          <button
            type="button"
            title="Профиль"
            className="a-helper a-helper--profile"
            link=""
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
        </li>
      </ul>
    </div>
  );
}
