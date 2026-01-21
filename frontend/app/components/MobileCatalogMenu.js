"use client";

import { useMemo, useState } from "react";

export default function MobileCatalogMenu({ isOpen, onClose, items }) {
  const [catalogPath, setCatalogPath] = useState([]);

  const currentNode = catalogPath[catalogPath.length - 1] || null;
  const currentItems = useMemo(() => {
    if (currentNode?.children?.length) {
      return currentNode.children;
    }
    if (catalogPath.length) {
      return [];
    }
    const extraItems = [
      {
        name: "Подарочные карты",
        href: "/catalog/podarochnye-karty-9840/",
        children: [],
      },
      {
        name: "Уцененные товары",
        href: "/discharged-goods/",
        children: [],
      },
    ];
    const existing = new Set(
      (items || []).map((item) => item.href || item.slug || item.name),
    );
    const merged = [...(items || [])];
    extraItems.forEach((item) => {
      if (!existing.has(item.href)) {
        merged.push(item);
      }
    });
    return merged;
  }, [items, catalogPath, currentNode]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="js-menu__plane a-menu__plane menu-catalog-item-mobile">
      <div className="menu-catalog-item-mobile__navigation">
        <button
          title=""
          type="button"
          className={
            "a-icon-button menu-catalog-item-mobile__icon" +
            (catalogPath.length === 0
              ? " menu-catalog-item-mobile__icon--hidden"
              : "")
          }
          onClick={() => setCatalogPath((path) => path.slice(0, -1))}
        >
          <svg className="a-svg a-icon-button__icon a-svg--medium a-icon-button__icon--grey">
            <use
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xlinkHref="#icon-chevron-left"
            />
          </svg>
          <svg className="a-svg a-icon-button__icon a-icon-button__icon--active a-svg--medium a-icon-button__icon--grey">
            <use
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xlinkHref="#icon-chevron-left"
            />
          </svg>
        </button>
        {currentNode ? (
          <a
            href={currentNode.href}
            className="a-link-button menu-catalog-item-mobile__header-title"
          >
            <span className="a-link-button__content a-link-button__content--black">
              {currentNode.name}
            </span>
          </a>
        ) : (
          <span className="menu-catalog-item-mobile__header-title">
            Каталог товаров
          </span>
        )}
        <button
          title=""
          type="button"
          className="a-icon-button menu-catalog-item-mobile__icon"
          onClick={() => {
            setCatalogPath([]);
            onClose?.();
          }}
        >
          <svg className="a-svg a-icon-button__icon a-svg--medium a-icon-button__icon--grey">
            <use
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xlinkHref="#icon-old-close"
            />
          </svg>
          <svg className="a-svg a-icon-button__icon a-icon-button__icon--active a-svg--medium a-icon-button__icon--grey">
            <use
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xlinkHref="#icon-old-close"
            />
          </svg>
        </button>
      </div>
      <div className="a-menu__depth a-menu__depth--1">
        <ul className="a-menu__list">
          {currentItems.map((item) => (
            <li key={item.id || item.href} className="a-menu__item">
              {item.children && item.children.length ? (
                <div
                  className="a-menu__item--button"
                  onClick={() => setCatalogPath((path) => [...path, item])}
                >
                  <span>{item.name}</span>
                  <svg className="a-svg menu-catalog-item-mobile__icon">
                    <use
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xlinkHref="#icon-chevron-right"
                    />
                  </svg>
                </div>
              ) : (
                <a href={item.href} className="a-link-button">
                  <span className="a-link-button__content a-link-button__content--black">
                    {item.name}
                  </span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
