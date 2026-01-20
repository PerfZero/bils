"use client";

import Breadcrumbs from "../../components/Breadcrumbs";

export default function CatalogSlugPage({ params }) {
  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Видео" },
  ];

  return (
<main className="a-page-shops a-page__main">
  <div className="a-page-shops__container">
    <ul className="a-breadcrumbs a-page-shops__breadcrumbs">
      <li className="a-breadcrumbs__item">
        <a className="a-breadcrumbs__link nuxt-link-active" href="/">
          Главная
        </a>{" "}
      </li>
      <li className="a-breadcrumbs__item a-breadcrumbs__item--current">
        <span className="a-breadcrumbs__text">Где купить</span>
      </li>
    </ul>{" "}
    <div className="a-back a-page-shops__back">
      <a className="a-back__link nuxt-link-active" href="/">
        <svg className="a-svg a-back__icon">
          <use
            xlinkHref="#icon-old-arrow"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          />
        </svg>{" "}
        <span className="a-back__text">Главная</span>
      </a>
    </div>{" "}
    <div className="a-page-shops__wrap">
      <h1 className="a-page-shops__header">
        Магазины в
        <button
          aria-label="России"
          className="a-link-button a-page-shops__header-button"
          title="России"
          type="button">
          {" "}
          <span className="a-link-button__content a-link-button__content--blue a-link-button__content--underline a-link-button__content--underline-dashed">
            России
          </span>{" "}
        </button>
      </h1>{" "}
      <div className="a-page-shops__switch">
        <menu className="a-main-switch">
          <a className="a-main-switch__option nuxt-link-active" href="/shops/">
            Список
          </a>
          <a
            aria-current="page"
            className="a-main-switch__option nuxt-link-exact-active nuxt-link-active a-main-switch__option--active"
            href="/shops/map/">
            Карта
          </a>
        </menu>
      </div>
    </div>
  </div>{" "}
  <div className="a-page-shops__map">
    <div className="a-main-map">
      {" "}
      <div className="a-main-map__map">
        <section className="ymap-container">
          <div
            id="yandexMap53851"
            style={{
              height: "100%",
              width: "100%",
            }}>
            <ymaps
              className="ymaps-2-1-79-map"
              style={{
                height: "578px",
                width: "1271px",
              }}>
              <ymaps
                className="ymaps-2-1-79-map ymaps-2-1-79-i-ua_js_yes ymaps-2-1-79-map-bg ymaps-2-1-79-islets_map-lang-ru"
                style={{
                  height: "578px",
                  width: "1271px",
                }}>
                <ymaps className="ymaps-2-1-79-inner-panes">
                  <ymaps
                    className="ymaps-2-1-79-events-pane ymaps-2-1-79-user-selection-none"
                    style={{
                      cursor:
                        'url("https://yastatic.net/s3/front-maps-static/maps-front-jsapi-v2-1/2.1.79-18504404/out/release/images/cursor/grab.cur") 16 16, url("https://yastatic.net/s3/front-maps-static/maps-front-jsapi-v2-1/2.1.79-18504404/out/release/images/cursor/grab.cur"), move',
                      height: "100%",
                      left: "0px",
                      position: "absolute",
                      top: "0px",
                      width: "100%",
                      zIndex: "2500",
                    }}
                    unselectable="on"
                  />
                  <ymaps
                    className="ymaps-2-1-79-ground-pane"
                    style={{
                      left: "0px",
                      position: "absolute",
                      top: "0px",
                      transform: "translate3d(0px, 0px, 0px) scale(1, 1)",
                      zIndex: "501",
                    }}>
                    <ymaps
                      style={{
                        position: "absolute",
                        zIndex: "150",
                      }}>
                      <canvas
                        height="1668"
                        style={{
                          height: "834px",
                          left: "-128px",
                          position: "absolute",
                          top: "-128px",
                          width: "1527px",
                        }}
                        width="3054"
                      />
                    </ymaps>
                  </ymaps>
                  <ymaps
                    className="ymaps-2-1-79-copyrights-pane"
                    style={{
                      height: "0px",
                      inset: "auto 0px 0px",
                      position: "absolute",
                      zIndex: "5002",
                    }}>
                    <ymaps>
                      <ymaps
                        className="ymaps-2-1-79-copyright"
                        style={{
                          top: "-29px",
                        }}>
                        <ymaps className="ymaps-2-1-79-copyright__fog">…</ymaps>
                        <ymaps className="ymaps-2-1-79-copyright__wrap">
                          <ymaps className="ymaps-2-1-79-copyright__layout">
                            <ymaps className="ymaps-2-1-79-copyright__content-cell">
                              <ymaps className="ymaps-2-1-79-copyright__content">
                                <ymaps className="ymaps-2-1-79-copyright__text">
                                  © Яндекс
                                </ymaps>
                                <ymaps className="ymaps-2-1-79-copyright__agreement">
                                  <a
                                    className="ymaps-2-1-79-copyright__link"
                                    href="https://yandex.ru/legal/maps_termsofuse/?lang=ru"
                                    rel="noopener"
                                    target="_blank">
                                    Условия использования
                                  </a>
                                </ymaps>
                              </ymaps>
                            </ymaps>
                            <ymaps className="ymaps-2-1-79-copyright__logo-cell">
                              <a
                                className="ymaps-2-1-79-copyright__logo"
                                href=""
                                target="_blank"
                              />
                            </ymaps>
                          </ymaps>
                        </ymaps>
                      </ymaps>
                    </ymaps>
                    <ymaps className="ymaps-2-1-79-map-copyrights-promo">
                      <ymaps>
                        <ymaps
                          className="ymaps-2-1-79-gotoymaps"
                          title="Открыть в Яндекс Картах">
                          <ymaps className="ymaps-2-1-79-gotoymaps__container">
                            <ymaps className="ymaps-2-1-79-gotoymaps__pin" />
                            <ymaps className="ymaps-2-1-79-gotoymaps__text-container">
                              <ymaps className="ymaps-2-1-79-gotoymaps__text">
                                Открыть в Яндекс Картах
                              </ymaps>
                            </ymaps>
                          </ymaps>
                        </ymaps>
                        <ymaps
                          className="ymaps-2-1-79-gototaxi"
                          style={{
                            display: "none",
                          }}
                          title="Доехать на такси">
                          <ymaps className="ymaps-2-1-79-gototaxi__container">
                            <ymaps className="ymaps-2-1-79-gototaxi__pin" />
                            <ymaps className="ymaps-2-1-79-gototaxi__text-container">
                              <ymaps className="ymaps-2-1-79-gototaxi__text" />
                            </ymaps>
                          </ymaps>
                        </ymaps>
                        <a
                          className="ymaps-2-1-79-gototech"
                          href="https://tech.yandex.ru/maps/mapsapi/?from=api-maps "
                          target="_blank">
                          Создать свою карту
                        </a>
                      </ymaps>
                    </ymaps>
                  </ymaps>
                  <ymaps
                    className="ymaps-2-1-79-controls-pane"
                    style={{
                      left: "0px",
                      position: "absolute",
                      top: "0px",
                      width: "100%",
                      zIndex: "4503",
                    }}>
                    <ymaps
                      className="ymaps-2-1-79-controls__toolbar"
                      style={{
                        marginTop: "10px",
                      }}>
                      <ymaps className="ymaps-2-1-79-controls__toolbar_left" />
                      <ymaps className="ymaps-2-1-79-controls__toolbar_right" />
                    </ymaps>
                    <ymaps
                      className="ymaps-2-1-79-controls__bottom"
                      style={{
                        top: "578px",
                      }}
                    />
                    <ymaps
                      className="ymaps-2-1-79-controls__control"
                      style={{
                        inset: "108px auto auto 10px",
                        marginLeft: "0px",
                        marginRight: "0px",
                        position: "inherit",
                      }}>
                      <ymaps>
                        <ymaps
                          className="ymaps-2-1-79-zoom"
                          style={{
                            height: "150px",
                          }}>
                          <ymaps
                            className="ymaps-2-1-79-zoom__plus ymaps-2-1-79-zoom__button ymaps-2-1-79-float-button ymaps-2-1-79-user-selection-none"
                            unselectable="on">
                            <ymaps className="ymaps-2-1-79-zoom__icon ymaps-2-1-79-float-button-icon" />
                          </ymaps>
                          <ymaps
                            className="ymaps-2-1-79-zoom__minus ymaps-2-1-79-zoom__button ymaps-2-1-79-float-button ymaps-2-1-79-user-selection-none"
                            unselectable="on">
                            <ymaps className="ymaps-2-1-79-zoom__icon ymaps-2-1-79-float-button-icon" />
                          </ymaps>
                          <ymaps className="ymaps-2-1-79-zoom__scale">
                            <ymaps
                              className="ymaps-2-1-79-zoom__runner ymaps-2-1-79-zoom__button ymaps-2-1-79-float-button ymaps-2-1-79-zoom__runner__transition ymaps-2-1-79-touch-action-none ymaps-2-1-79-user-selection-none"
                              style={{
                                top: "64px",
                              }}
                              unselectable="on">
                              <ymaps className="ymaps-2-1-79-zoom__icon ymaps-2-1-79-float-button-icon ymaps-2-1-79-float-button-icon_icon_runner" />
                            </ymaps>
                          </ymaps>
                        </ymaps>
                      </ymaps>
                    </ymaps>
                  </ymaps>
                  <ymaps
                    className="ymaps-2-1-79-places-pane"
                    style={{
                      left: "0px",
                      position: "absolute",
                      top: "0px",
                      transform: "translate3d(0px, 0px, 0px) scale(1, 1)",
                      zIndex: "2004",
                    }}>
                    <ymaps
                      className="ymaps-2-1-79-placemark-overlay ymaps-2-1-79-user-selection-none"
                      style={{
                        height: "0px",
                        left: "653px",
                        position: "absolute",
                        top: "250px",
                        width: "0px",
                        zIndex: "650",
                      }}
                      unselectable="on">
                      <ymaps>
                        <ymaps
                          className="ymaps-2-1-79-image-with-content"
                          style={{
                            backgroundImage:
                              'url("https://www.bigam.ru/images/components/map/marker_bigam_inactive.svg")',
                            backgroundPosition: "0px 0px",
                            backgroundSize: "33px 46px",
                            height: "46px",
                            left: "-16px",
                            opacity: "1",
                            position: "absolute",
                            top: "-46px",
                            width: "33px",
                          }}>
                          <ymaps
                            className="ymaps-2-1-79-image-with-content-content"
                            style={{
                              font: "13px Arial,sans-serif",
                              height: "10px",
                              left: "-16px",
                              position: "absolute",
                              textAlign: "center",
                              top: "-46px",
                              width: "10px",
                            }}>
                            <ymaps id="id_176889798641478088564">
                              <ymaps>
                                <div className="a-main-map__balloon" />
                              </ymaps>
                            </ymaps>
                          </ymaps>
                        </ymaps>
                      </ymaps>
                    </ymaps>
                    <ymaps
                      className="ymaps-2-1-79-placemark-overlay ymaps-2-1-79-user-selection-none"
                      style={{
                        height: "0px",
                        left: "721px",
                        position: "absolute",
                        top: "295px",
                        width: "0px",
                      }}
                      unselectable="on">
                      <ymaps
                        className="ymaps-2-1-79-default-cluster"
                        style={{
                          backgroundImage:
                            'url("/images/components/map/marker_bigam_cluster_inactive.svg")',
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "100% 100%",
                          height: "46px",
                          left: "-16px",
                          lineHeight: "33px",
                          top: "-46px",
                          width: "33px",
                        }}>
                        <ymaps>
                          <div className="a-main-map__cluster">2</div>
                        </ymaps>
                      </ymaps>
                    </ymaps>
                    <ymaps
                      className="ymaps-2-1-79-placemark-overlay ymaps-2-1-79-user-selection-none"
                      style={{
                        height: "0px",
                        left: "711px",
                        position: "absolute",
                        top: "410px",
                        width: "0px",
                        zIndex: "650",
                      }}
                      unselectable="on">
                      <ymaps>
                        <ymaps
                          className="ymaps-2-1-79-image-with-content"
                          style={{
                            backgroundImage:
                              'url("https://www.bigam.ru/images/components/map/marker_bigam_inactive.svg")',
                            backgroundPosition: "0px 0px",
                            backgroundSize: "33px 46px",
                            height: "46px",
                            left: "-16px",
                            opacity: "1",
                            position: "absolute",
                            top: "-46px",
                            width: "33px",
                          }}>
                          <ymaps
                            className="ymaps-2-1-79-image-with-content-content"
                            style={{
                              font: "13px Arial,sans-serif",
                              height: "10px",
                              left: "-16px",
                              position: "absolute",
                              textAlign: "center",
                              top: "-46px",
                              width: "10px",
                            }}>
                            <ymaps id="id_176889798641478088571">
                              <ymaps>
                                <div className="a-main-map__balloon" />
                              </ymaps>
                            </ymaps>
                          </ymaps>
                        </ymaps>
                      </ymaps>
                    </ymaps>
                    <ymaps
                      className="ymaps-2-1-79-placemark-overlay ymaps-2-1-79-user-selection-none"
                      style={{
                        height: "0px",
                        left: "749px",
                        position: "absolute",
                        top: "478px",
                        width: "0px",
                        zIndex: "650",
                      }}
                      unselectable="on">
                      <ymaps>
                        <ymaps
                          className="ymaps-2-1-79-image-with-content"
                          style={{
                            backgroundImage:
                              'url("https://www.bigam.ru/images/components/map/marker_bigam_inactive.svg")',
                            backgroundPosition: "0px 0px",
                            backgroundSize: "33px 46px",
                            height: "46px",
                            left: "-16px",
                            opacity: "1",
                            position: "absolute",
                            top: "-46px",
                            width: "33px",
                          }}>
                          <ymaps
                            className="ymaps-2-1-79-image-with-content-content"
                            style={{
                              font: "13px Arial,sans-serif",
                              height: "10px",
                              left: "-16px",
                              position: "absolute",
                              textAlign: "center",
                              top: "-46px",
                              width: "10px",
                            }}>
                            <ymaps id="id_176889798641478088573">
                              <ymaps>
                                <div className="a-main-map__balloon" />
                              </ymaps>
                            </ymaps>
                          </ymaps>
                        </ymaps>
                      </ymaps>
                    </ymaps>
                    <ymaps
                      className="ymaps-2-1-79-placemark-overlay ymaps-2-1-79-user-selection-none"
                      style={{
                        height: "0px",
                        left: "899px",
                        position: "absolute",
                        top: "354px",
                        width: "0px",
                        zIndex: "650",
                      }}
                      unselectable="on">
                      <ymaps>
                        <ymaps
                          className="ymaps-2-1-79-image-with-content"
                          style={{
                            backgroundImage:
                              'url("https://www.bigam.ru/images/components/map/marker_bigam_inactive.svg")',
                            backgroundPosition: "0px 0px",
                            backgroundSize: "33px 46px",
                            height: "46px",
                            left: "-16px",
                            opacity: "1",
                            position: "absolute",
                            top: "-46px",
                            width: "33px",
                          }}>
                          <ymaps
                            className="ymaps-2-1-79-image-with-content-content"
                            style={{
                              font: "13px Arial,sans-serif",
                              height: "10px",
                              left: "-16px",
                              position: "absolute",
                              textAlign: "center",
                              top: "-46px",
                              width: "10px",
                            }}>
                            <ymaps id="id_176889798641478088575">
                              <ymaps>
                                <div className="a-main-map__balloon" />
                              </ymaps>
                            </ymaps>
                          </ymaps>
                        </ymaps>
                      </ymaps>
                    </ymaps>
                  </ymaps>
                </ymaps>
              </ymaps>
            </ymaps>
          </div>
          <div className="ymap-markers"> </div>
        </section>
      </div>{" "}
      <div className="a-main-map__list">
        <div className="a-main-map-list a-main-map-list--limit-prev">
          <div
            className="a-main-map-list__scroll __vuescroll hasVBar vBarVisible"
            style={{
              height: "100%",
              overflow: "hidden",
              padding: "0px",
              position: "relative",
              width: "100%",
            }}>
            <div
              className="__panel"
              style={{
                boxSizing: "border-box",
                height: "100%",
                marginRight: "-6px",
                overflow: "hidden scroll",
                position: "relative",
              }}>
              <div
                className="__view"
                style={{
                  boxSizing: "border-box",
                  minHeight: "100%",
                  minWidth: "100%",
                  position: "relative",
                  width: "-webkit-fit-content",
                }}>
                <ul className="a-main-map-list__list">
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="г. Ярославль, ул. Выставочная, д. 12"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Ярославль, ул. Выставочная, д. 12
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+74852282313">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (485) 228-23-13
                        </span>{" "}
                      </a>
                    </div>{" "}
                    <div className="a-main-map-list__emails">
                      <a
                        className="a-link-button"
                        href="mailto:yar-tc@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          yar-tc@bigam.ru
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/g-yaroslavl-ul-vystavochnaya-d-12/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="г. Ярославль, Силикатное шоссе, д. 15"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Ярославль, Силикатное шоссе, д. 15
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+74852282313">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (485) 228-23-13
                        </span>{" "}
                      </a>
                    </div>{" "}
                    <div className="a-main-map-list__emails">
                      <a
                        className="a-link-button"
                        href="mailto:silikatnoe@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          silikatnoe@bigam.ru
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/g-yaroslavl-silikatnoe-shosse-d-15/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="г. Александров, ул. Первомайская, д. 48"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Александров, ул. Первомайская, д. 48
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+74922499929">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (492) 249-99-29
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/g-aleksandrov-ul-pervomayskaya-d-48/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="г. Владимир, Московское шоссе, д. 2"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Владимир, Московское шоссе, д. 2
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+74922499929">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (492) 249-99-29
                        </span>{" "}
                      </a>
                    </div>{" "}
                    <div className="a-main-map-list__emails">
                      <a className="a-link-button" href="mailto:vld3@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          vld3@bigam.ru
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/g-vladimir-moskovskoe-shosse-d-2/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="г. Владимир, Суздальский пр-кт, д. 20"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Владимир, Суздальский пр-кт, д. 20
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+74922499929">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (492) 249-99-29
                        </span>{" "}
                      </a>
                    </div>{" "}
                    <div className="a-main-map-list__emails">
                      <a
                        className="a-link-button"
                        href="mailto:vladimir1@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          vladimir1@bigam.ru
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/g-vladimir-suzdalskiy-pr-kt-d-20/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="г. Владимир, ул. Гастелло 8А, ТСК Терминал, первый этаж, вход 5Б"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Владимир, ул. Гастелло 8А, ТСК Терминал, первый этаж,
                      вход 5Б
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+74922499929">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (492) 249-99-29
                        </span>{" "}
                      </a>
                    </div>{" "}
                    <div className="a-main-map-list__emails">
                      <a
                        className="a-link-button"
                        href="mailto:vldb2b@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          vldb2b@bigam.ru
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/g-vladimir-ul-gastello-8a-tsk-terminal-pervyi-etazh-vhod-5b/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="г. Владимир, ул. Куйбышева, д 24А"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Владимир, ул. Куйбышева, д 24А
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+74922499929">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (492) 249-99-29
                        </span>{" "}
                      </a>
                    </div>{" "}
                    <div className="a-main-map-list__emails">
                      <a
                        className="a-link-button"
                        href="mailto:vladimir2@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          vladimir2@bigam.ru
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/g-vladimir-ul-kuybysheva-d-24a/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="г. Вологда, ул Преображенского, д. 30"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Вологда, ул Преображенского, д. 30
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+78172347909">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (817) 234-79-09
                        </span>{" "}
                      </a>
                    </div>{" "}
                    <div className="a-main-map-list__emails">
                      <a className="a-link-button" href="mailto:vol2@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          vol2@bigam.ru для физ.лиц
                        </span>{" "}
                      </a>
                      ,
                      <br />
                      <a
                        className="a-link-button"
                        href="mailto:vol2-opt2@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          vol2-opt2@bigam.ru для юр.лиц
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/g-vologda-ul-preobrazhenskogo-d-30/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="г. Вологда, ул. Ленинградская, д. 144"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Вологда, ул. Ленинградская, д. 144
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+78172347909">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (817) 234-79-09
                        </span>{" "}
                      </a>
                    </div>{" "}
                    <div className="a-main-map-list__emails">
                      <a
                        className="a-link-button"
                        href="mailto:vologda1@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          vologda1@bigam.ru для физ.лиц
                        </span>{" "}
                      </a>
                      ,
                      <br />
                      <a
                        className="a-link-button"
                        href="mailto:vol1-opt@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          vol1-opt@bigam.ru для юр.лиц
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/g-vologda-ul-leningradskaya-d-144/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="г. Иваново, ул. Велижская, д. 3"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Иваново, ул. Велижская, д. 3
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+74932999594">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (493) 299-95-94
                        </span>{" "}
                      </a>
                    </div>{" "}
                    <div className="a-main-map-list__emails">
                      <a
                        className="a-link-button"
                        href="mailto:Ivanovo@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          Ivanovo@bigam.ru
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/g-ivanovo-ul-velizhskaya-d-3/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="г. Иваново, ул. Карла Маркса, д. 34"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Иваново, ул. Карла Маркса, д. 34
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+74932999594">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (493) 299-95-94
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/g-ivanovo-ul-karla-marksa-d-34/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="г. Иваново, ул. Куконковых, д. 141Б"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Иваново, ул. Куконковых, д. 141Б
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+74932999594">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (493) 299-95-94
                        </span>{" "}
                      </a>
                    </div>{" "}
                    <div className="a-main-map-list__emails">
                      <a
                        className="a-link-button"
                        href="mailto:Ivanovo2@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          Ivanovo2@bigam.ru
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/g-ivanovo-ul-kukonkovykh-d-141b/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="г. Кинешма, ул. Вичугская, д.140В"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Кинешма, ул. Вичугская, д.140В
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+74932999594">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (493) 299-95-94
                        </span>{" "}
                      </a>
                    </div>{" "}
                    <div className="a-main-map-list__emails">
                      <a
                        className="a-link-button"
                        href="mailto:kineshma@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          kineshma@bigam.ru
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/g-kineshma-ul-vichugskaya-d-140v/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt='г. Ковров, ул Лопатина, д. 7А, ТРЦ  "Ковров МОЛЛ"'
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Ковров, ул Лопатина, д. 7А, ТРЦ "Ковров МОЛЛ"
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+74922499929">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (492) 249-99-29
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/g-kovrov-ul-lopatina-d-7a-trts-kovrov-moll/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="г. Кострома, ул. Волжская 2-я, д. 3"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Кострома, ул. Волжская 2-я, д. 3
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+74942465115">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (494) 246-51-15
                        </span>{" "}
                      </a>
                    </div>{" "}
                    <div className="a-main-map-list__emails">
                      <a
                        className="a-link-button"
                        href="mailto:kostroma2@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          kostroma2@bigam.ru
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/g-kostroma-ul-volzhskaya-2-ya-d-3/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="г. Москва, Варшавское шоссе, д. 65 к. 2"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Москва, Варшавское шоссе, д. 65 к. 2
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+74993722664">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (499) 372-26-64
                        </span>{" "}
                      </a>
                    </div>{" "}
                    <div className="a-main-map-list__emails">
                      <a
                        className="a-link-button"
                        href="mailto:moscow1@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          moscow1@bigam.ru
                        </span>{" "}
                      </a>
                      ,
                      <br />
                      <a
                        className="a-link-button"
                        href="mailto:msk1-mpp@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          msk1-mpp@bigam.ru
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/g-moskva-varshavskoe-shosse-d-65-k-2/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="г. Муром, ул. Филатова, д. 10"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Муром, ул. Филатова, д. 10
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+74922499929">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (492) 249-99-29
                        </span>{" "}
                      </a>
                    </div>{" "}
                    <div className="a-main-map-list__emails">
                      <a className="a-link-button" href="mailto:mur1@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          mur1@bigam.ru
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/g-murom-ul-filatova-d-10/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="г. Нижний Новгород, Московское шоссе, д. 159"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Нижний Новгород, Московское шоссе, д. 159
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+78312812040">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (831) 281-20-40
                        </span>{" "}
                      </a>
                    </div>{" "}
                    <div className="a-main-map-list__emails">
                      <a
                        className="a-link-button"
                        href="mailto:popkov@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          popkov@bigam.ru
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/g-nizhnii-novgorod-moskovskoe-shosse-d-159/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="г. Переславль-Залесский, ул. Магистральная, д. 10"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Переславль-Залесский, ул. Магистральная, д. 10
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+74852282313">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (485) 228-23-13
                        </span>{" "}
                      </a>
                    </div>{" "}
                    <div className="a-main-map-list__emails">
                      <a
                        className="a-link-button"
                        href="mailto:pereslavl2@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          pereslavl2@bigam.ru
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/g-pereslavl-zalesskiy-ul-magistralnaya-d-10/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="г. Рыбинск, пр-кт Ленина, д. 184"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Рыбинск, пр-кт Ленина, д. 184
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+74852282313">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (485) 228-23-13
                        </span>{" "}
                      </a>
                    </div>{" "}
                    <div className="a-main-map-list__emails">
                      <a
                        className="a-link-button"
                        href="mailto:rybinsk@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          rybinsk@bigam.ru
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/g-rybinsk-pr-kt-lenina-d-184/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="г. Рыбинск, ул. Пушкина, д. 24"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Рыбинск, ул. Пушкина, д. 24
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+74852282313">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (485) 228-23-13
                        </span>{" "}
                      </a>
                    </div>{" "}
                    <div className="a-main-map-list__emails">
                      <a className="a-link-button" href="mailto:ryb3@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          ryb3@bigam.ru
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/g-rybinsk-ul-pushkina-d-24/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="г. Рязань, Куйбышевское шоссе д. 29 лит. Б"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Рязань, Куйбышевское шоссе д. 29 лит. Б
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+74912206764">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (491) 220-67-64
                        </span>{" "}
                      </a>
                    </div>{" "}
                    <div className="a-main-map-list__emails">
                      <a
                        className="a-link-button"
                        href="mailto:rznb2b1@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          rznb2b1@bigam.ru
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/g-ryazan-kuibyshevskoe-shosse-d-29-lit-b/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="г. Тверь, Волоколамский пр-кт, д. 43"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Тверь, Волоколамский пр-кт, д. 43
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+74822785700">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (482) 278-57-00
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/g-tver-volokolamskiy-pr-kt-d-43/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="г. Тверь, Московское шоссе, д. 16, к. 3"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Тверь, Московское шоссе, д. 16, к. 3
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+74822785700">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (482) 278-57-00
                        </span>{" "}
                      </a>
                    </div>{" "}
                    <div className="a-main-map-list__emails">
                      <a className="a-link-button" href="mailto:tver3@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          tver3@bigam.ru
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/g-tver-moskovskoe-shosse-d-16-k-3/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="г. Тула, улица Павшинский мост, д. 3"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Тула, улица Павшинский мост, д. 3
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+74872525096">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (487) 252-50-96
                        </span>{" "}
                      </a>
                    </div>{" "}
                    <div className="a-main-map-list__emails">
                      <a
                        className="a-link-button"
                        href="mailto:tulab2b@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          tulab2b@bigam.ru
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a className="a-link-button" href="/shops/tula/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="г. Углич, ул. Ярославская, д. 50"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Углич, ул. Ярославская, д. 50
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+74852282313">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (485) 228-23-13
                        </span>{" "}
                      </a>
                    </div>{" "}
                    <div className="a-main-map-list__emails">
                      <a className="a-link-button" href="mailto:ugl1@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          ugl1@bigam.ru
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/g-uglich-ul-yaroslavskaya-d-50/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="г. Череповец, Октябрьский пр-кт, д. 25"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Череповец, Октябрьский пр-кт, д. 25
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+78202253099">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (820) 225-30-99
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/g-cherepovets-oktyabrskiy-pr-kt-d-25/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="г. Череповец, пр-кт Победы, д. 93Б"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Череповец, пр-кт Победы, д. 93Б
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+78202253099">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (820) 225-30-99
                        </span>{" "}
                      </a>
                    </div>{" "}
                    <div className="a-main-map-list__emails">
                      <a
                        className="a-link-button"
                        href="mailto:cherepovets2@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          cherepovets2@bigam.ru - для физ.лиц
                        </span>{" "}
                      </a>
                      ,
                      <br />
                      <a
                        className="a-link-button"
                        href="mailto:cherepovets2-opt@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          cherepovets2-opt@bigam.ru - для юр.лиц
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/g-cherepovets-pr-kt-pobedy-d-93b/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="г. Череповец, ул. Комсомольская, д. 39"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Череповец, ул. Комсомольская, д. 39
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+78202253099">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (820) 225-30-99
                        </span>{" "}
                      </a>
                    </div>{" "}
                    <div className="a-main-map-list__emails">
                      <a
                        className="a-link-button"
                        href="mailto:cherepovets@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          cherepovets@bigam.ru
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/g-cherepovets-ul-komsomolskaya-d-39/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="г. Ярославль, Ленинградский пр-кт, д. 49"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Ярославль, Ленинградский пр-кт, д. 49
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+74852282313">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (485) 228-23-13
                        </span>{" "}
                      </a>
                    </div>{" "}
                    <div className="a-main-map-list__emails">
                      <a className="a-link-button" href="mailto:len@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          len@bigam.ru
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/g-yaroslavl-leningradskiy-pr-kt-d-49/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="г. Ярославль, ул. Вспольинское поле, д. 15"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Ярославль, ул. Вспольинское поле, д. 15
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+74852282313">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (485) 228-23-13
                        </span>{" "}
                      </a>
                    </div>{" "}
                    <div className="a-main-map-list__emails">
                      <a
                        className="a-link-button"
                        href="mailto:vspole@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          vspole@bigam.ru
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/g-yaroslavl-ul-vspolinskoe-pole-d-15/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="г. Ярославль, ул. Выставочная, д. 12"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      г. Ярославль, ул. Выставочная, д. 12
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+74852231048">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (485) 223-10-48
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/yaroslavl-diskont-centr/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="a-main-map-list__item">
                    <button className="a-main-map-list__button" type="button" />{" "}
                    <div className="a-main-map-list__logo-and-distance">
                      <div className="a-main-map-list__logo">
                        <img
                          alt="Ярославский р-н, пос. Красный Бор, ул. Васильковая, д. 2"
                          src="/images/components/delivery/bigam.svg"
                        />
                      </div>{" "}
                    </div>{" "}
                    <div className="a-main-map-list__address">
                      Ярославский р-н, пос. Красный Бор, ул. Васильковая, д. 2
                    </div>{" "}
                    <div className="a-main-map-list__phones">
                      <a className="a-link-button" href="tel:+74852282313">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black">
                          +7 (485) 228-23-13
                        </span>{" "}
                      </a>
                    </div>{" "}
                    <div className="a-main-map-list__emails">
                      <a
                        className="a-link-button"
                        href="mailto:zavolga@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          zavolga@bigam.ru - для физ.лиц
                        </span>{" "}
                      </a>
                      ,
                      <br />
                      <a
                        className="a-link-button"
                        href="mailto:zav-opt@bigam.ru">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--blue">
                          zav-opt@bigam.ru - для юр. лиц
                        </span>{" "}
                      </a>
                    </div>
                    <div className="a-main-map-list__link">
                      <a
                        className="a-link-button"
                        href="/shops/yaroslavskiy-r-n-pos-krasnyy-bor-ul-vasilkovaya-d-2-tts-kdw/">
                        {" "}
                        <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                          Подробнее о магазине
                        </span>{" "}
                      </a>
                    </div>
                  </li>
                </ul>
                <div
                  style={{
                    border: "none",
                    display: "block",
                    height: "100%",
                    left: "0px",
                    margin: "0px",
                    opacity: "0",
                    padding: "0px",
                    pointerEvents: "none",
                    position: "absolute",
                    top: "0px",
                    width: "100%",
                    zIndex: "-1000",
                  }}>
                  <object
                    data="about:blank"
                    style={{
                      border: "none",
                      display: "block",
                      height: "100%",
                      left: "0px",
                      margin: "0px",
                      opacity: "0",
                      padding: "0px",
                      pointerEvents: "none",
                      position: "absolute",
                      top: "0px",
                      width: "100%",
                      zIndex: "-1000",
                    }}
                    tabIndex="-1"
                    type="text/html"
                  />
                </div>
              </div>
            </div>
            <div
              className="__rail-is-vertical"
              style={{
                background: "rgb(229, 229, 229)",
                border: "none",
                borderRadius: "4px",
                bottom: "38px",
                position: "absolute",
                right: "20px",
                top: "38px",
                width: "4px",
                zIndex: "1",
              }}>
              <div
                className="__bar-wrap-is-vertical"
                style={{
                  borderRadius: "4px",
                  bottom: "0px",
                  position: "absolute",
                  top: "0px",
                  width: "100%",
                }}>
                <div
                  className="__bar-is-vertical"
                  style={{
                    background: "rgb(201, 201, 201)",
                    borderRadius: "inherit",
                    cursor: "pointer",
                    height: "10%",
                    left: "0px",
                    margin: "auto",
                    opacity: "1",
                    position: "absolute",
                    right: "0px",
                    transform: "translateY(0%)",
                    transition: "opacity 0.5s",
                    userSelect: "none",
                    width: "4px",
                  }}
                />
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  </div>
</main>
  );
}
