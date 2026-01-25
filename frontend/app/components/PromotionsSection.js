"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

const promotions = [
  {
    href: "/promo/darim-5000-bonusov-za-pokupku-2049673/",
    title: "Дарим 5000 бонусов за покупку",
    desktopImage:
      "https://cdn.bigam.ru/iblock/a80/a808a97685070cd86dbc61f7f78f82cd/588h360.jpg",
    mobileImage:
      "https://cdn.bigam.ru/iblock/b82/b8217a008848102d983fcd87353026af/430h356.jpg",
    hasTooltip: true,
  },
  {
    href: "/promo/luchshie-predlozheniya-yanvarya-2026-god-2050045/",
    title: "«Лучшие предложения Января» 2026 год",
    desktopImage:
      "https://cdn.bigam.ru/iblock/9db/9db4107ecd9031551d06539075791a9d/588h360-_4_.jpg",
    mobileImage:
      "https://cdn.bigam.ru/iblock/51b/51b27e77b6aebee107bec9acb8fac0f0/430h356-_3_.jpg",
    hasTooltip: true,
  },
  {
    href: "/promo/novinki-yanvarya-2049847/",
    title: "Новинки Января",
    desktopImage:
      "https://cdn.bigam.ru/iblock/32a/32a12348e6db16bd15eb0b1da5d963b6/588h360.jpg",
    mobileImage:
      "https://cdn.bigam.ru/iblock/065/065667fa06b751dd3fafdcac78e11918/430h356.jpg",
    hasTooltip: true,
  },
  {
    href: "/promo/uspei-kupit-tovary-so-skidkami-do-30-1796165/",
    title: "Успей купить – товары со скидками до 30%",
    desktopImage:
      "https://cdn.bigam.ru/iblock/433/4loby9xphc0so2z1k3xdovsp0suzp6cx/588h360.jpg",
    mobileImage:
      "https://cdn.bigam.ru/iblock/4ec/hlol9ftgihptklpfee25wn1ufxnafabc/430h356.jpg",
    hasTooltip: true,
  },
  {
    href: "/promo/keshbek-5-pri-oplate-tovara-po-qr-kodu-i-nfc-1558090/",
    title: "Кешбэк 5% при оплате товара по QR-коду и NFC",
    desktopImage:
      "https://cdn.bigam.ru/iblock/a3e/d9gokeyiu8qnp9ylzq3219vosuv8d4nz/588h360.jpg",
    mobileImage:
      "https://cdn.bigam.ru/iblock/178/fvtq2qo4hw7t89j5qj4hax9w6i9r24nd/430h356.jpg",
    hasTooltip: false,
  },
];

function TooltipCommercial() {
  return (
    <div className="tooltip-commercial">
      <svg className="a-svg">
        <use xlinkHref="#icon-reklama-desktop"></use>
      </svg>
      <div className="floating-block floating-block--right">
        <div className="floating-block__content">
          <div className="tooltip-commercial__block">
            <div className="tooltip-commercial__title">Реклама</div>
            <div className="tooltip-commercial__advertiser">
              Рекламодатель: ООО "БИГАМ-Инвест" г. Ярославль
            </div>
            <div className="tooltip-commercial__advertiser">
              ОГРН 1127604010555
            </div>
            <div className="a-copy-button">
              <button
                aria-label="Скопировать токен"
                title="Скопировать токен"
                type="button"
                className="a-link-button"
              >
                <span className="a-link-button__icon a-link-button__icon--blue">
                  <svg className="a-svg a-svg--medium">
                    <use xlinkHref="#icon-control-copy"></use>
                  </svg>
                </span>
                <span className="a-link-button__content a-link-button__content--blue">
                  Скопировать токен
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PromotionsSection() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);

  return (
    <section className="a-page-main__promotions">
      <div className="a-page-main__container">
        <h2 className="a-page-main__title a-title-h2">Акции</h2>
        <div className="a-card-carousel a-card-carousel--type-picture">
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={2}
            spaceBetween={24}
            loop
            pagination={{
              el: ".a-card-carousel__pagination",
              type: "custom",
              renderCustom: (swiper, current, total) => {
                return `
                  <div class="a-card-carousel__bullet">
                    <div class="a-card-carousel__bullet-current">${String(current).padStart(2, "0")}</div>
                    <div class="a-card-carousel__bullet-count">${String(total).padStart(2, "0")}</div>
                  </div>
                `;
              },
            }}
            navigation
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.params.pagination.el = paginationRef.current;
            }}
            className="a-card-carousel__container swiper-container"
            wrapperClass="a-card-carousel__wrapper"
          >
            {promotions.map((promo) => (
              <SwiperSlide key={promo.href} className="a-card-carousel__slide">
                <div className="a-card-carousel__card">
                  <a
                    href={promo.href}
                    title={promo.title}
                    className="a-picture-card"
                  >
                    <img
                      src={promo.desktopImage}
                      alt={promo.title}
                      className="a-picture-card__picture a-picture-card__picture--desktop a-lazy-load"
                    />
                    <img
                      src={promo.mobileImage}
                      alt={promo.title}
                      className="a-picture-card__picture a-picture-card__picture--mobile a-lazy-load"
                    />
                    <span></span>
                    {promo.hasTooltip && <TooltipCommercial />}
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="a-card-carousel__navigation">
            <button
              type="button"
              className="a-card-carousel__button a-card-carousel__button--prev"
              ref={prevRef}
            >
              <svg className="a-svg">
                <use xlinkHref="#icon-chevron-left"></use>
              </svg>
            </button>
            <div
              className="a-card-carousel__pagination"
              ref={paginationRef}
            ></div>
            <button
              type="button"
              className="a-card-carousel__button a-card-carousel__button--next"
              ref={nextRef}
            >
              <svg className="a-svg">
                <use xlinkHref="#icon-chevron-right"></use>
              </svg>
            </button>
          </div>
        </div>
        <a
          href="/promo/"
          className="a-main-button a-page-main__button-all a-main-button--display-inline a-main-button--type-large a-main-button--corner-round a-main-button--color-light-orange"
        >
          <span className="a-main-button__wrap">
            <span className="a-main-button__content">Все акции</span>
            <span className="a-main-button__constrain">
              <svg className="a-svg a-main-button__icon a-main-button__icon--right a-svg--medium a-main-button__icon--icon-meatballs a-main-button__icon--color">
                <use xlinkHref="#icon-meatballs"></use>
              </svg>
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}
