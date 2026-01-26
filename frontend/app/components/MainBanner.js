"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

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
  desktopSrc:
    "https://cdn.bigam.ru/resize_cache/744041/e4df8ff52d47681371555f6ccd9eb1f8/iblock/91d/91d58c67297b7e8c73e12a6c787cb380/1000h1000.jpg",
  position: 4,
};

function TooltipCommercial({ isMobile, onOpen }) {
  const iconId = isMobile ? "#icon-reklama-mobile" : "#icon-reklama-desktop";
  if (isMobile) {
    return (
      <div
        className="tooltip-commercial"
        role="button"
        tabIndex={0}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onOpen?.();
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            event.stopPropagation();
            onOpen?.();
          }
        }}
      >
        <svg className="a-svg">
          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={iconId} />
        </svg>
      </div>
    );
  }

  return (
    <div data-v-bf32e510="" className="tooltip-commercial">
      <svg data-v-bf32e510="" className="a-svg">
        <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={iconId}></use>
      </svg>
      <div data-v-bf32e510="" className="floating-block floating-block--right">
        <div className="floating-block__content">
          <div data-v-bf32e510="" className="tooltip-commercial__block">
            <div data-v-bf32e510="" className="tooltip-commercial__title">
              Реклама
            </div>
            <div data-v-bf32e510="" className="tooltip-commercial__advertiser">
              Рекламодатель: ООО "BREMAX-Инвест" г. Ярославль
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

function TooltipCommercialModal({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div id="modals-container">
      <div className="vm--container scrollable">
        <div
          data-modal="tooltip-commercial"
          aria-expanded="true"
          className="vm--overlay"
          onClick={onClose}
        >
          <div className="vm--top-right-slot" />
        </div>
        <div
          aria-expanded="true"
          role="dialog"
          aria-modal="true"
          className="vm--modal a-main-modal-parent"
          style={{
            left: 0,
            width: "min(425px, 100%)",
            height: "auto",
            top: "260px",
          }}
        >
          <div
            className="a-main-modal"
            style={{ top: "0px", transition: "none" }}
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
                onClick={onClose}
              >
                <svg className="a-svg">
                  <use
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xlinkHref="#icon-cross"
                  />
                </svg>
              </button>
              <div className="a-main-modal__content">
                <div className="tooltip-commercial-modal">
                  <div className="tooltip-commercial-modal__title">Реклама</div>
                  <div className="tooltip-commercial-modal__advertiser">
                    Рекламодатель: ООО "BREMAX-Инвест" г. Ярославль
                  </div>
                  <div className="tooltip-commercial-modal__advertiser">
                    ОГРН 1127604010555
                  </div>
                  <button
                    type="button"
                    className="a-main-button a-main-button--display-inline a-main-button--type-medium a-main-button--corner-round a-main-button--color-light-blue"
                  >
                    <span className="a-main-button__wrap">
                      <span className="a-main-button__content">
                        Скопировать токен
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
  );
}

export default function MainBanner() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

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

  const swiperSlides = isMobile
    ? [
        carouselSlides[0],
        carouselSlides[1],
        carouselSlides[2],
        staticBanner,
        carouselSlides[3],
      ].filter(Boolean)
    : carouselSlides;

  return (
    <section className="a-page-main__banner">
      <div className="a-page-main__container">
        <div className="a-main-banner a-main-banner--default">
          <div className="a-main-banner__carousel">
            <div className="a-main-carousel a-main-carousel--use-navigation a-main-carousel--default">
              <Swiper
                key={isMobile ? "main-banner-mobile" : "main-banner-desktop"}
                className="a-main-carousel__container"
                modules={[Autoplay, Navigation, Pagination]}
                slidesPerView={1}
                spaceBetween={10}
                loop
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                onBeforeInit={(swiper) => {
                  if (!isMobile) {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                  }
                  swiper.params.pagination.el = paginationRef.current;
                }}
                navigation={
                  isMobile
                    ? false
                    : {
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                      }
                }
                pagination={{
                  el: paginationRef.current,
                  clickable: true,
                  bulletClass:
                    "a-main-carousel__bullet swiper-pagination-bullet",
                  bulletActiveClass:
                    "swiper-pagination-bullet-active a-main-carousel__bullet--active",
                }}
              >
                {swiperSlides.map((slide) => (
                  <SwiperSlide
                    className="a-main-carousel__slide"
                    key={slide.href}
                  >
                    <a
                      className="a-picture-card"
                      href={slide.href}
                      position={slide.position}
                      isstatic={slide === staticBanner ? "true" : undefined}
                      title=""
                      type="default"
                    >
                      <img
                        alt=""
                        className="a-picture-card__picture a-lazy-load a-is-loaded"
                        src={slide.src}
                      />
                      <span />
                      <TooltipCommercial
                        isMobile={isMobile}
                        onOpen={() => setIsTooltipOpen(true)}
                      />
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div
                className="a-main-carousel__pagination swiper-pagination"
                ref={paginationRef}
              />
              {!isMobile && (
                <>
                  <div
                    className="a-main-carousel__button a-main-carousel__button--prev swiper-button-prev"
                    ref={prevRef}
                  >
                    <svg className="a-svg">
                      <use
                        xlinkHref="#icon-left-arrow"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      />
                    </svg>
                  </div>
                  <div
                    className="a-main-carousel__button a-main-carousel__button--next swiper-button-next"
                    ref={nextRef}
                  >
                    <svg className="a-svg">
                      <use
                        xlinkHref="#icon-left-arrow"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      />
                    </svg>
                  </div>
                </>
              )}
            </div>
          </div>{" "}
          {!isMobile && (
            <div className="a-main-banner__static-banner">
              <a
                className="a-picture-card"
                href={staticBanner.href}
                isstatic="true"
                position={staticBanner.position}
                title=""
                type="default"
              >
                <img
                  alt=""
                  className="a-picture-card__picture a-lazy-load a-is-loaded"
                  src={staticBanner.desktopSrc || staticBanner.src}
                />
                <span />
                <TooltipCommercial
                  isMobile={isMobile}
                  onOpen={() => setIsTooltipOpen(true)}
                />
              </a>
            </div>
          )}
        </div>{" "}
        {isMobile && (
          <a
            href="/promo/"
            className="a-main-button a-main-button--display-block a-main-button--type-medium a-main-button--corner-round a-main-button--color-orange"
          >
            <span className="a-main-button__wrap">
              <span className="a-main-button__constrain">
                <svg className="a-svg a-main-button__icon a-main-button__icon--left a-svg--medium a-main-button__icon--icon-menu-item-sale a-main-button__icon--color">
                  <use
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xlinkHref="#icon-menu-item-sale"
                  />
                </svg>
              </span>
              <span className="a-main-button__content">Все акции</span>
            </span>
          </a>
        )}
        <TooltipCommercialModal
          isOpen={isMobile && isTooltipOpen}
          onClose={() => setIsTooltipOpen(false)}
        />
      </div>
    </section>
  );
}
