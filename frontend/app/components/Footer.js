"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config/api";
import styles from "./Footer.module.css";

const menuLinks = [
  { label: "Акции", href: "/promo/" },
  { label: "Бренды", href: "/brands/" },
  { label: "Инструменты", href: "/catalog/instrument-5748/" },
  { label: "Сад", href: "/catalog/vse-dlya-sada-i-ogoroda-5880/" },
  { label: "Отопление", href: "/catalog/otoplenie-6071/" },
  {
    label: "Водоснабжение",
    href: "/catalog/vodosnabzhenie-santekhnika-i-otoplenie-6069/",
  },
  { label: "Сварка", href: "/catalog/svarochnoe-oborudovanie-6350/" },
  { label: "Техника", href: "/catalog/stroitelnaya-tekhnika-6029/" },
];

const contacts = [
  {
    phone: "+7 (495) 320-30-06",
    city: "г. Москва, Михайловский проезд, 1с3",
    route: "Как проехать?",
    href: "/contacts/moscow/",
  },
  {
    phone: "+7 (812) 604-89-29",
    city: "г. Санкт Петербург, Железнодорожный проспект 40",
    route: "Как проехать?",
    href: "/contacts/spb/",
  },
  {
    phone: "+7 (423) 255-72-21",
    city: "г. Владивосток, ул Посетская 10",
    route: "Как проехать?",
    href: "/contacts/vl/",
  },
];

export default function Footer() {
  const [parentSections, setParentSections] = useState([]);
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  useEffect(() => {
    let isActive = true;
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/categories/`);
        if (!response.ok) return;
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results || [];
        const mapped = data.map((category) => ({
          label: category.name,
          href: category.href,
        }));
        if (isActive) {
          setParentSections(mapped);
        }
      } catch (error) {
        if (isActive) {
          setParentSections([]);
        }
      }
    };
    fetchCategories();
    return () => {
      isActive = false;
    };
  }, []);

  const sectionLinks = parentSections.slice(0, 6);

  return (
    <div className={`a-page__footer ${styles.footer}`}>
      <footer className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.block}>
              <div className={styles.title}>МЕНЮ</div>
              <ul className={styles.list}>
                {menuLinks.map((item) => (
                  <li key={item.label} className={styles.item}>
                    <a href={item.href} className={styles.link}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.block}>
              <div className={styles.title}>РАЗДЕЛЫ</div>
              <ul className={styles.list}>
                {sectionLinks.map((item) => (
                  <li key={item.label} className={styles.item}>
                    <a href={item.href} className={styles.link}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={styles.cta}
                onClick={() => setIsOrderOpen(true)}
              >
                ЗАКАЗАТЬ
              </button>
            </div>

            <div className={styles.block}>
              <div className={styles.title}>
                Следите за нашими новостями в соцсетях:
              </div>
              <ul className={`a-footer__socials ${styles.socials}`}>
                <li className="a-footer__social">
                  <a
                    href="https://ok.ru/bigam/"
                    target="_blank"
                    title="Одноклассники"
                    rel="nofollow"
                    className={`a-footer__link ${styles.socialLink}`}
                  >
                    <svg className="a-svg a-footer__icon a-footer__icon--ok">
                      <use
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        xlinkHref="#icon-old-social-ok"
                      ></use>
                    </svg>
                  </a>
                </li>
                <li className="a-footer__social">
                  <a
                    href="https://twitter.com/BigamRu/"
                    target="_blank"
                    title="Twitter"
                    rel="nofollow"
                    className={`a-footer__link ${styles.socialLink}`}
                  >
                    <svg className="a-svg a-footer__icon a-footer__icon--tw">
                      <use
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        xlinkHref="#icon-old-social-tw"
                      ></use>
                    </svg>
                  </a>
                </li>
                <li className="a-footer__social">
                  <a
                    href="https://www.youtube.com/user/BigamRu/"
                    target="_blank"
                    title="YouTube"
                    rel="nofollow"
                    className={`a-footer__link ${styles.socialLink}`}
                  >
                    <svg className="a-svg a-footer__icon a-footer__icon--yt">
                      <use
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        xlinkHref="#icon-old-social-yt"
                      ></use>
                    </svg>
                  </a>
                </li>
                <li className="a-footer__social">
                  <a
                    href="https://t.me/bigam_ru/"
                    target="_blank"
                    title="Telegram"
                    rel="nofollow"
                    className={`a-footer__link ${styles.socialLink}`}
                  >
                    <svg className="a-svg a-footer__icon a-footer__icon--tg">
                      <use
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        xlinkHref="#icon-old-social-tg"
                      ></use>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.contacts}>
              {contacts.map((item) => (
                <div key={item.phone} className={styles.contactCard}>
                  <div className={styles.phone}>{item.phone}</div>
                  <div className={styles.address}>{item.city}</div>
                  <a href={item.href} className={styles.route}>
                    {item.route}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.bottomInner}>
            <div className={styles.brand}>© BREMAX 2010-2026</div>
            <div className={styles.disclaimer}>
              Предложение не является публичной офертой.
            </div>
          </div>
        </div>
      </footer>
      {isOrderOpen ? (
        <div id="modals-container">
          <div className="vm--container scrollable">
            <div
              data-modal="lead-request"
              aria-expanded="true"
              className="vm--overlay"
              onClick={() => setIsOrderOpen(false)}
            >
              <div className="vm--top-right-slot" />
            </div>
            <div
              aria-expanded="true"
              role="dialog"
              aria-modal="true"
              className="vm--modal a-main-modal-parent lead-request-modal"
              style={{ top: 0, left: 0, width: "100%", height: "100%" }}
            >
              <div
                className="a-main-modal"
                style={{
                  transition: "none",
                  width: "auto",
                  maxWidth: "calc(100vw - 32px)",
                }}
              >
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
                  <button
                    type="button"
                    className="a-main-modal__close"
                    onClick={() => setIsOrderOpen(false)}
                  >
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
                        Заказать
                      </div>
                      <div className="a-fast-order-modal-content__alert"></div>
                      <form
                        className="a-fast-order-modal-content__form"
                        onSubmit={(event) => event.preventDefault()}
                      >
                        <div className="a-fast-order-modal-content__field">
                          <div className="a-input-field a-input-field--type-name">
                            <label className="a-input-field__constrain">
                              <span className="a-input-field__label">Имя</span>
                              <input
                                type="text"
                                placeholder="Ваше имя"
                                spellCheck="false"
                                autoComplete="off"
                                inputMode="text"
                                className="a-input-field__input"
                              />
                            </label>
                          </div>
                        </div>
                        <div className="a-fast-order-modal-content__field">
                          <div className="a-input-field a-input-field--type-phone">
                            <label className="a-input-field__constrain">
                              <span className="a-input-field__label">
                                Телефон
                              </span>
                              <input
                                type="tel"
                                placeholder="Ваш телефон"
                                spellCheck="false"
                                autoComplete="off"
                                inputMode="tel"
                                className="a-input-field__input"
                              />
                            </label>
                          </div>
                        </div>
                        <div className="a-fast-order-modal-content__buttons">
                          <button
                            type="submit"
                            className="a-main-button a-main-button--display-block a-main-button--type-medium a-main-button--corner-round a-main-button--color-orange"
                          >
                            <span className="a-main-button__wrap">
                              <span className="a-main-button__content">
                                Отправить
                              </span>
                            </span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
