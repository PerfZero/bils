"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

export default function BrandsSection({ brands = [] }) {
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
              prevEl: ".a-brand-carousel__button--prev",
              nextEl: ".a-brand-carousel__button--next",
            }}
            className="a-brand-carousel__container"
          >
            {brands.map((brand) => (
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
            className="a-brand-carousel__button a-brand-carousel__button--prev swiper-button-prev"
          >
            <svg className="a-svg">
              <use xlinkHref="#icon-chevron-left"></use>
            </svg>
          </button>
          <button
            type="button"
            className="a-brand-carousel__button a-brand-carousel__button--next swiper-button-next"
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
