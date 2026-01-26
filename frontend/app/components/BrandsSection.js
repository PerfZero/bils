"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

export default function BrandsSection({ brands = [] }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="a-page-main__brands">
      <div className="a-page-main__container">
        <div className="a-page-main__title a-title-h2">Товары по брендам</div>
        <div className="a-brand-carousel a-brand-carousel--next-limit">
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={7}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            className="a-brand-carousel__container swiper-container"
            wrapperClass="a-brand-carousel__wrapper"
          >
            {brands.slice(0, 10).map((brand) => (
              <SwiperSlide
                key={brand.url || brand.name}
                className="a-brand-carousel__slide"
              >
                <a
                  href={brand.url}
                  title={brand.name}
                  className="a-picture-card"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="a-picture-card__picture a-lazy-load a-is-loaded"
                  />
                  <span></span>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            className="a-brand-carousel__button a-brand-carousel__button--prev"
            ref={prevRef}
          >
            <svg className="a-svg">
              <use xlinkHref="#icon-chevron-left"></use>
            </svg>
          </button>
          <button
            type="button"
            className="a-brand-carousel__button a-brand-carousel__button--next"
            ref={nextRef}
          >
            <svg className="a-svg">
              <use xlinkHref="#icon-chevron-right"></use>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
