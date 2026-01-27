"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [openSections, setOpenSections] = useState({
    contacts: false,
    buyers: false,
    bigam: false,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(max-width: 568px)");
    const handleChange = () => setIsMobile(media.matches);

    handleChange();
    if (media.addEventListener) {
      media.addEventListener("change", handleChange);
      return () => media.removeEventListener("change", handleChange);
    }
    media.addListener(handleChange);
    return () => media.removeListener(handleChange);
  }, []);

  const toggleSection = (key) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div class="a-page__footer">
      <footer class="a-footer">
        <div class="a-footer__container a-footer__container--fixed vue-portal-target"></div>
        <div class="a-footer__container">
          {isMobile ? (
            <>
              <div class="a-footer__sections a-footer__sections--space-between">
                <div class="a-footer__section a-footer__section--information">
                  <ul class="a-footer__navigation">
                    <li
                      class={`a-footer__section a-footer__section--list${
                        openSections.contacts
                          ? " a-footer__section--active"
                          : ""
                      }`}
                    >
                      <button
                        type="button"
                        class="a-footer__title"
                        onClick={() => toggleSection("contacts")}
                        aria-expanded={openSections.contacts}
                      >
                        Контакты
                      </button>
                      <div class="a-footer__wrap a-footer__wrap--max-width">
                        <div class="a-footer__contacts">
                          <a
                            href="mailto:support@bremax.ru"
                            class="a-footer__link"
                          >
                            support@bremax.ru
                          </a>
                        </div>
                        <button
                          aria-label="Обратная связь"
                          title="Обратная связь"
                          type="button"
                          class="a-link-button a-footer__contact-us"
                        >
                          <span class="a-link-button__content a-link-button__content--grey">
                            Обратная связь
                          </span>
                        </button>
                      </div>
                    </li>

                    <li
                      class={`a-footer__section a-footer__section--list${
                        openSections.bigam ? " a-footer__section--active" : ""
                      }`}
                    >
                      <button
                        type="button"
                        class="a-footer__title"
                        onClick={() => toggleSection("bigam")}
                        aria-expanded={openSections.bigam}
                      >
                        BREMAX
                      </button>
                      <div class="a-footer__wrap">
                        <ul class="a-footer__sections">
                          <li class="a-footer__section">
                            <a href="/about/" class="a-footer__link">
                              О компании
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="a-footer__section a-footer__section--mobile-stores"></div>
              </div>
              <div class="a-footer__sections a-footer__sections--space-between">
                <div class="a-footer__section a-footer__section--links">
                  <ul class="a-footer__documents">
                    <li class="a-footer__document">
                      <a
                        href="/customer/politika-konfidentsialnosti/"
                        class="a-footer__link"
                      >
                        Политика конфиденциальности
                      </a>
                    </li>
                    <li class="a-footer__document">
                      <a
                        href="/customer/polzovatelskoe-soglashenie/"
                        class="a-footer__link"
                      >
                        Обработка персональных данных
                      </a>
                    </li>
                  </ul>
                  <ul class="a-footer__socials">
                    <li class="a-footer__social">
                      <a
                        href="https://t.me/bigam_ru"
                        target="_blank"
                        title="Telegram"
                        rel="nofollow"
                        class="a-footer__link"
                      >
                        <svg class="a-svg a-footer__icon a-footer__icon--tg">
                          <use xlinkHref="#icon-old-social-tg"></use>
                        </svg>
                      </a>
                    </li>
                    <li class="a-footer__social">
                      <a href="#" title="WhatsApp" class="a-footer__link">
                        <svg class="a-svg a-footer__icon a-footer__icon--wa">
                          <use xlinkHref="#icon-old-social-wa"></use>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <>
              <div class="a-footer__sections a-footer__sections--space-between">
                <div class="a-footer__section a-footer__section--information">
                  <ul class="a-footer__navigation">
                    <li class="a-footer__section a-footer__section--list">
                      <button type="button" class="a-footer__title">
                        Информация для покупателей
                      </button>
                      <div class="a-footer__wrap">
                        <ul class="a-footer__sections">
                          <li class="a-footer__section">
                            <a href="/catalog/" class="a-footer__link">
                              Каталог товаров
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li class="a-footer__section a-footer__section--list">
                      <button type="button" class="a-footer__title">
                        BREMAX
                      </button>
                      <div class="a-footer__wrap">
                        <ul class="a-footer__sections">
                          <li class="a-footer__section">
                            <a href="/about/" class="a-footer__link">
                              О компании
                            </a>
                          </li>

                          <li class="a-footer__section">
                            <a href="/shops/" class="a-footer__link">
                              Контакты
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="a-footer__sections a-footer__sections--space-between">
                <div class="a-footer__section a-footer__section--desktop a-footer__section--contacts">
                  <div class="a-footer__contacts">
                    <a href="mailto:support@bremax.ru" class="a-footer__link">
                      support@bremax.ru
                    </a>
                  </div>
                </div>
                <div class="a-footer__section a-footer__section--links">
                  <ul class="a-footer__documents">
                    <li class="a-footer__document">
                      <a
                        href="/customer/politika-konfidentsialnosti/"
                        class="a-footer__link"
                      >
                        Политика конфиденциальности
                      </a>
                    </li>
                    <li class="a-footer__document">
                      <a
                        href="/customer/polzovatelskoe-soglashenie/"
                        class="a-footer__link"
                      >
                        Обработка персональных данных
                      </a>
                    </li>
                  </ul>
                  <ul class="a-footer__socials">
                    <li class="a-footer__social">
                      <a
                        href="https://t.me/bigam_ru"
                        target="_blank"
                        title="Telegram"
                        rel="nofollow"
                        class="a-footer__link"
                      >
                        <svg class="a-svg a-footer__icon a-footer__icon--tg">
                          <use xlinkHref="#icon-old-social-tg"></use>
                        </svg>
                      </a>
                    </li>
                    <li class="a-footer__social">
                      <a href="#" title="WhatsApp" class="a-footer__link">
                        <svg class="a-svg a-footer__icon a-footer__icon--wa">
                          <use xlinkHref="#icon-old-social-wa"></use>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </footer>
    </div>
  );
}
