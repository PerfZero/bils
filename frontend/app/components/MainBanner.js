"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { API_BASE_URL, API_ENDPOINTS } from "../../config/api";

function TooltipCommercial({
  isMobile,
  onOpen,
  title,
  advertiser,
  ogrn,
  token,
}) {
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
            {title && (
              <div
                data-v-bf32e510=""
                className="tooltip-commercial__advertiser"
              >
                {title}
              </div>
            )}
            {advertiser && (
              <div
                data-v-bf32e510=""
                className="tooltip-commercial__advertiser"
              >
                Рекламодатель: {advertiser}
              </div>
            )}
            {ogrn && (
              <div
                data-v-bf32e510=""
                className="tooltip-commercial__advertiser"
              >
                ОГРН {ogrn}
              </div>
            )}
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

function TooltipCommercialModal({
  isOpen,
  onClose,
  title,
  advertiser,
  ogrn,
  token,
}) {
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
                  {title && (
                    <div className="tooltip-commercial-modal__advertiser">
                      {title}
                    </div>
                  )}
                  {advertiser && (
                    <div className="tooltip-commercial-modal__advertiser">
                      Рекламодатель: {advertiser}
                    </div>
                  )}
                  {ogrn && (
                    <div className="tooltip-commercial-modal__advertiser">
                      ОГРН {ogrn}
                    </div>
                  )}
                  <button
                    type="button"
                    className="a-main-button a-main-button--display-inline a-main-button--type-medium a-main-button--corner-round a-main-button--color-light-blue"
                    onClick={() => {
                      if (token && navigator?.clipboard) {
                        navigator.clipboard.writeText(token);
                      }
                    }}
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
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    let isActive = true;
    const fetchBanners = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.MAIN_BANNERS);
        if (!response.ok) return;
        const payload = await response.json();
        const list = Array.isArray(payload) ? payload : payload.results || [];
        if (isActive) {
          setBanners(list);
        }
      } catch (error) {
        // ignore
      }
    };
    fetchBanners();
    return () => {
      isActive = false;
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

  const carouselSlides = banners
    .filter((item) => item.banner_type === "carousel")
    .filter((item) => (isMobile ? item.show_on_mobile : item.show_on_desktop))
    .map((item) => ({
      href: item.href,
      src: item.image,
      position: item.position,
    }));

  const staticBanner = banners
    .filter((item) => item.banner_type === "static")
    .find((item) => (isMobile ? item.show_on_mobile : item.show_on_desktop));

  const normalizeImageUrl = (url) => {
    if (!url) return url;
    if (url.startsWith("http") || url.startsWith("//")) return url;
    if (url.startsWith("/media/")) return `${API_BASE_URL}${url}`;
    return url;
  };

  const baseSlides = carouselSlides.length
    ? carouselSlides
    : staticBanner
      ? [staticBanner]
      : [];
  const swiperSlides = isMobile
    ? [...baseSlides]
        .filter(Boolean)
        .sort((a, b) => (a.position || 0) - (b.position || 0))
        .map((item) => ({
          ...item,
          src: item.image || item.src,
          href: item.href || "#",
          position: item.position,
        }))
    : baseSlides.map((item) => ({
        ...item,
        src: item.image || item.src,
        href: item.href || "#",
        position: item.position,
      }));

  const modalBanner = staticBanner || swiperSlides[0];

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
                    key={slide.href || slide.position}
                  >
                    <a
                      className="a-picture-card"
                      href={slide.href}
                      position={slide.position}
                      isstatic={
                        slide.banner_type === "static" ? "true" : undefined
                      }
                      title=""
                      type="default"
                    >
                      <img
                        alt=""
                        className="a-picture-card__picture a-lazy-load a-is-loaded"
                        src={normalizeImageUrl(slide.src || slide.image)}
                      />
                      <span />
                      <TooltipCommercial
                        isMobile={isMobile}
                        title={slide.title}
                        advertiser={slide.advertiser}
                        ogrn={slide.ogrn}
                        token={slide.token}
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
          {!isMobile && staticBanner && (
            <div className="a-main-banner__static-banner">
              <a
                className="a-picture-card"
                href={staticBanner.href || "#"}
                isstatic="true"
                position={staticBanner.position}
                title=""
                type="default"
              >
                <img
                  alt=""
                  className="a-picture-card__picture a-lazy-load a-is-loaded"
                  src={normalizeImageUrl(
                    staticBanner.image_desktop || staticBanner.image,
                  )}
                />
                <span />
                <TooltipCommercial
                  isMobile={isMobile}
                  title={staticBanner.title}
                  advertiser={staticBanner.advertiser}
                  ogrn={staticBanner.ogrn}
                  token={staticBanner.token}
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
          title={modalBanner?.title}
          advertiser={modalBanner?.advertiser}
          ogrn={modalBanner?.ogrn}
          token={modalBanner?.token}
        />
      </div>
    </section>
  );
}
