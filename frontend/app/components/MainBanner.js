"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

const carouselSlides = [
  {
    href: "/catalog/snegouborochnye-mashiny-5942/filter/proizvoditel-is-snirrex/apply/",
    src: "https://cdn.bigam.ru/iblock/38e/38eede7e7e3712c36027d7b12cef6a15/c10c6d87_4189_47e3_86dc_1038b107735c.jpg",
    position: 1,
  },
  {
    href: "/promo/darim-5000-bonusov-za-pokupku-2049673/",
    src: "https://cdn.bigam.ru/iblock/9ed/9edb4b1b80c2b0fd6f38daf69a94582d/792h346.jpg",
    position: 2,
  },
  {
    href: "/promo/novinki-yanvarya-2049847/",
    src: "https://cdn.bigam.ru/iblock/6ce/6cefa941390eeab5ec02a0a4031e14d8/792x346.jpg",
    position: 3,
  },
  {
    href: "/promo/uspei-kupit-tovary-so-skidkami-do-30-1796165/",
    src: "https://cdn.bigam.ru/iblock/b20/rwwyep09thc02m7zsu9c0f207svvznzl/Frame-7142-_1_.jpg",
    position: 5,
  },
];

const staticBanner = {
  href: "/promo/luchshie-predlozheniya-yanvarya-2026-god-2050045/",
  src: "https://cdn.bigam.ru/iblock/eaf/eaf9b21800298d768c3f86d04d3b1668/538h239-_2_.jpg",
  position: 4,
};

function TooltipCommercial() {
  return (
    <div data-v-bf32e510="" className="tooltip-commercial">
      <svg data-v-bf32e510="" className="a-svg">
        <use
          xmlnsXlink="http://www.w3.org/1999/xlink"
          xlinkHref="#icon-reklama-desktop"
        ></use>
      </svg>
      <div data-v-bf32e510="" className="floating-block floating-block--right">
        <div className="floating-block__content">
          <div data-v-bf32e510="" className="tooltip-commercial__block">
            <div data-v-bf32e510="" className="tooltip-commercial__title">
              Реклама
            </div>
            <div data-v-bf32e510="" className="tooltip-commercial__advertiser">
              Рекламодатель: ООО "БИГАМ-Инвест" г. Ярославль
            </div>
            <div data-v-bf32e510="" className="tooltip-commercial__advertiser">
              ОГРН 1127604010555
            </div>
            <div data-v-bf32e510="" className="a-copy-button">
              <button
                aria-label="Скопировать токен"
                title="Скопировать токен"
                type="button"
                className="a-link-button"
              >
                <span className="a-link-button__icon a-link-button__icon--blue">
                  <svg className="a-svg a-svg--medium">
                    <use
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xlinkHref="#icon-control-copy"
                    ></use>
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

export default function MainBanner() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);

  return (
    <section className="a-page-main__banner">
      <div className="a-page-main__container">
        <div className="a-main-banner a-main-banner--default">
          <div className="a-main-banner__carousel">
            <div className="a-main-carousel__container">
              <Swiper
                className="a-main-carousel a-main-carousel--use-navigation a-main-carousel--default"
                modules={[Navigation, Pagination]}
                loop
                spaceBetween={10}
                slidesPerView={1}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                pagination={{
                  el: paginationRef.current,
                  clickable: true,
                  bulletClass: "a-main-carousel__bullet",
                  bulletActiveClass: "swiper-pagination-bullet-active",
                }}
                wrapperClass="a-main-carousel__wrapper"
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                  swiper.params.pagination.el = paginationRef.current;
                }}
              >
                {carouselSlides.map((slide) => (
                  <SwiperSlide
                    key={slide.href}
                    className="a-main-carousel__slide"
                  >
                    <a
                      href={slide.href}
                      className="a-picture-card"
                      title=""
                      type="default"
                      position={slide.position}
                    >
                      <img
                        src={slide.src}
                        alt=""
                        className="a-picture-card__picture a-lazy-load a-is-loaded"
                      />
                      <span></span>
                      <TooltipCommercial />
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div
                ref={paginationRef}
                className="a-main-carousel__pagination swiper-pagination"
              ></div>
              <div
                ref={prevRef}
                className="a-main-carousel__button a-main-carousel__button--prev swiper-button-prev"
              >
                <svg className="a-svg">
                  <use
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xlinkHref="#icon-left-arrow"
                  ></use>
                </svg>
              </div>
              <div
                ref={nextRef}
                className="a-main-carousel__button a-main-carousel__button--next swiper-button-next"
              >
                <svg className="a-svg">
                  <use
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xlinkHref="#icon-left-arrow"
                  ></use>
                </svg>
              </div>
            </div>
          </div>
          <div className="a-main-banner__static-banner">
            <a
              href={staticBanner.href}
              className="a-picture-card"
              title=""
              type="default"
              position={staticBanner.position}
              isstatic="true"
            >
              <img
                src={staticBanner.src}
                alt=""
                className="a-picture-card__picture a-lazy-load a-is-loaded"
              />
              <span></span>
              <TooltipCommercial />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
