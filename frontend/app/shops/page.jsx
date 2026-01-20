"use client";

import Breadcrumbs from "../components/Breadcrumbs";

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
          <a
            aria-current="page"
            className="a-main-switch__option nuxt-link-exact-active nuxt-link-active a-main-switch__option--active"
            href="/shops/">
            Список
          </a>
          <a className="a-main-switch__option" href="/shops/map/">
            Карта
          </a>
        </menu>
      </div>
    </div>
  </div>{" "}
  <div className="a-page-shops__container">
    <div className="a-page-shops__main">
      <ul className="a-page-shops__list">
        <li className="a-page-shops__item">
          <div className="a-shop-new-card">
            <a
              className="a-shop-new-card__picture"
              href="/shops/g-yaroslavl-ul-vystavochnaya-d-12/">
              <img
                alt="г. Ярославль, ул. Выставочная, д. 12"
                className="a-lazy-load a-is-loaded"
                src="https://cdn.bigam.ru/resize_cache/iblock/149/1000_404_0/ahbviom6sp1d4yw29041i03yodtug115.jpg"
                title="г. Ярославль, ул. Выставочная, д. 12"
              />{" "}
              <span />
            </a>{" "}
            <div className="a-shop-new-card__content">
              <div className="a-shop-new-card__type-and-distance">
                <div className="a-shop-new-card__type">Магазин</div>{" "}
              </div>{" "}
              <a
                className="a-shop-new-card__address"
                href="/shops/g-yaroslavl-ul-vystavochnaya-d-12/">
                г. Ярославль, ул. Выставочная, д. 12
              </a>{" "}
              <div className="a-shop-new-card__status a-shop-new-card__status--opened">
                Открыто
              </div>
              <div className="a-shop-new-card__schedule-and-contacts">
                <div className="a-shop-new-card__column">
                  <div className="a-shop-new-card__schedule">
                    пн.-пт.: 09:00 - 19:00 <br />
                    сб.: 09:00 - 18:00 <br />
                    вс.: 09:00 - 17:00
                  </div>
                </div>{" "}
                <div className="a-shop-new-card__column">
                  <div className="a-shop-new-card__phones">
                    <a className="a-link-button" href="tel:+74852282313">
                      {" "}
                      <span className="a-link-button__content a-link-button__content--black">
                        +7 (485) 228-23-13
                      </span>{" "}
                    </a>
                  </div>{" "}
                  <div className="a-shop-new-card__emails">
                    <a className="a-link-button" href="mailto:yar-tc@bigam.ru">
                      {" "}
                      <span className="a-link-button__content a-link-button__content--blue">
                        yar-tc@bigam.ru
                      </span>{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li className="a-page-shops__item">
          <div className="a-shop-new-card">
            <a
              className="a-shop-new-card__picture"
              href="/shops/g-yaroslavl-silikatnoe-shosse-d-15/">
              <img
                alt="г. Ярославль, Силикатное шоссе, д. 15"
                className="a-lazy-load a-is-loaded"
                src="https://cdn.bigam.ru/resize_cache/iblock/e81/1000_404_0/z2cmmghif7plt5uvvpcxpv14vr3tbgcb.jpg"
                title="г. Ярославль, Силикатное шоссе, д. 15"
              />{" "}
              <span />
            </a>{" "}
            <div className="a-shop-new-card__content">
              <div className="a-shop-new-card__type-and-distance">
                <div className="a-shop-new-card__type">Магазин</div>{" "}
              </div>{" "}
              <a
                className="a-shop-new-card__address"
                href="/shops/g-yaroslavl-silikatnoe-shosse-d-15/">
                г. Ярославль, Силикатное шоссе, д. 15
              </a>{" "}
              <div className="a-shop-new-card__status a-shop-new-card__status--opened">
                Открыто
              </div>
              <div className="a-shop-new-card__schedule-and-contacts">
                <div className="a-shop-new-card__column">
                  <div className="a-shop-new-card__schedule">
                    пн.-пт.: 09:00 - 19:00 <br />
                    сб.: 09:00 - 18:00 <br />
                    вс.: 09:00 - 17:00
                  </div>
                </div>{" "}
                <div className="a-shop-new-card__column">
                  <div className="a-shop-new-card__phones">
                    <a className="a-link-button" href="tel:+74852282313">
                      {" "}
                      <span className="a-link-button__content a-link-button__content--black">
                        +7 (485) 228-23-13
                      </span>{" "}
                    </a>
                  </div>{" "}
                  <div className="a-shop-new-card__emails">
                    <a
                      className="a-link-button"
                      href="mailto:silikatnoe@bigam.ru">
                      {" "}
                      <span className="a-link-button__content a-link-button__content--blue">
                        silikatnoe@bigam.ru
                      </span>{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li className="a-page-shops__item">
          <div className="a-shop-new-card">
            <a
              className="a-shop-new-card__picture"
              href="/shops/g-aleksandrov-ul-pervomayskaya-d-48/">
              <img
                alt="г. Александров, ул. Первомайская, д. 48"
                className="a-lazy-load a-is-loaded"
                src="https://cdn.bigam.ru/resize_cache/iblock/77a/vqvvdtrwgne4gp3q8ofjeooeq3h5eck4/1000_404_0/alex1.jpg"
                title="г. Александров, ул. Первомайская, д. 48"
              />{" "}
              <span />
            </a>{" "}
            <div className="a-shop-new-card__content">
              <div className="a-shop-new-card__type-and-distance">
                <div className="a-shop-new-card__type">Магазин</div>{" "}
              </div>{" "}
              <a
                className="a-shop-new-card__address"
                href="/shops/g-aleksandrov-ul-pervomayskaya-d-48/">
                г. Александров, ул. Первомайская, д. 48
              </a>{" "}
              <div className="a-shop-new-card__status a-shop-new-card__status--opened">
                Открыто
              </div>
              <div className="a-shop-new-card__schedule-and-contacts">
                <div className="a-shop-new-card__column">
                  <div className="a-shop-new-card__schedule">
                    пн-пт: 09:00 - 19:00
                    <br />
                    сб: 09:00 - 18:00
                    <br />
                    вс: 09:00 - 17:00{" "}
                  </div>
                </div>{" "}
                <div className="a-shop-new-card__column">
                  <div className="a-shop-new-card__phones">
                    <a className="a-link-button" href="tel:+74922499929">
                      {" "}
                      <span className="a-link-button__content a-link-button__content--black">
                        +7 (492) 249-99-29
                      </span>{" "}
                    </a>
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>
        </li>
        <li className="a-page-shops__item">
          <div className="a-shop-new-card">
            <a
              className="a-shop-new-card__picture"
              href="/shops/g-vladimir-moskovskoe-shosse-d-2/">
              <img
                alt="г. Владимир, Московское шоссе, д. 2"
                className="a-lazy-load a-is-loaded"
                src="https://cdn.bigam.ru/resize_cache/iblock/938/qbxd8t2h7pl18d3l1f1ud7111k7d6rjw/1000_404_0/1709624307836.jpg"
                title="г. Владимир, Московское шоссе, д. 2"
              />{" "}
              <span />
            </a>{" "}
            <div className="a-shop-new-card__content">
              <div className="a-shop-new-card__type-and-distance">
                <div className="a-shop-new-card__type">Магазин</div>{" "}
              </div>{" "}
              <a
                className="a-shop-new-card__address"
                href="/shops/g-vladimir-moskovskoe-shosse-d-2/">
                г. Владимир, Московское шоссе, д. 2
              </a>{" "}
              <div className="a-shop-new-card__status a-shop-new-card__status--opened">
                Открыто
              </div>
              <div className="a-shop-new-card__schedule-and-contacts">
                <div className="a-shop-new-card__column">
                  <div className="a-shop-new-card__schedule">
                    пн.-вс.: 09:00 - 19:00
                    <br />
                    31 декабря 2025 - 09:00-17:00
                    <br />
                    1 января 2026 - выходной день
                    <br /> 2 января 2026 - 09:00-19:00
                  </div>
                </div>{" "}
                <div className="a-shop-new-card__column">
                  <div className="a-shop-new-card__phones">
                    <a className="a-link-button" href="tel:+74922499929">
                      {" "}
                      <span className="a-link-button__content a-link-button__content--black">
                        +7 (492) 249-99-29
                      </span>{" "}
                    </a>
                  </div>{" "}
                  <div className="a-shop-new-card__emails">
                    <a className="a-link-button" href="mailto:vld3@bigam.ru">
                      {" "}
                      <span className="a-link-button__content a-link-button__content--blue">
                        vld3@bigam.ru
                      </span>{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li className="a-page-shops__item">
          <div className="a-shop-new-card">
            <a
              className="a-shop-new-card__picture"
              href="/shops/g-vladimir-suzdalskiy-pr-kt-d-20/">
              <img
                alt="г. Владимир, Суздальский пр-кт, д. 20"
                className="a-lazy-load a-is-loaded"
                src="https://cdn.bigam.ru/resize_cache/iblock/c55/24k43bes0l3scfxh57w42ls28pknabfd/1000_404_0/vlad1_1.jpg"
                title="г. Владимир, Суздальский пр-кт, д. 20"
              />{" "}
              <span />
            </a>{" "}
            <div className="a-shop-new-card__content">
              <div className="a-shop-new-card__type-and-distance">
                <div className="a-shop-new-card__type">Магазин</div>{" "}
              </div>{" "}
              <a
                className="a-shop-new-card__address"
                href="/shops/g-vladimir-suzdalskiy-pr-kt-d-20/">
                г. Владимир, Суздальский пр-кт, д. 20
              </a>{" "}
              <div className="a-shop-new-card__status a-shop-new-card__status--opened">
                Открыто
              </div>
              <div className="a-shop-new-card__schedule-and-contacts">
                <div className="a-shop-new-card__column">
                  <div className="a-shop-new-card__schedule">
                    пн.-пт.: 09:00 - 19:00 <br />
                    сб.: 09:00 - 18:00 <br />
                    вс.: 09:00 - 17:00
                  </div>
                </div>{" "}
                <div className="a-shop-new-card__column">
                  <div className="a-shop-new-card__phones">
                    <a className="a-link-button" href="tel:+74922499929">
                      {" "}
                      <span className="a-link-button__content a-link-button__content--black">
                        +7 (492) 249-99-29
                      </span>{" "}
                    </a>
                  </div>{" "}
                  <div className="a-shop-new-card__emails">
                    <a
                      className="a-link-button"
                      href="mailto:vladimir1@bigam.ru">
                      {" "}
                      <span className="a-link-button__content a-link-button__content--blue">
                        vladimir1@bigam.ru
                      </span>{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li className="a-page-shops__item">
          <div className="a-shop-new-card">
            <a
              className="a-shop-new-card__picture"
              href="/shops/g-vladimir-ul-gastello-8a-tsk-terminal-pervyi-etazh-vhod-5b/">
              <img
                alt="г. Владимир, ул. Гастелло 8А, ТСК Терминал, первый этаж, вход 5Б"
                className="a-lazy-load a-is-loaded"
                src="https://cdn.bigam.ru/iblock/06c/06c7e3c4a4dfb0916340b176fab98081/20250210_165929.jpg"
                title="г. Владимир, ул. Гастелло 8А, ТСК Терминал, первый этаж, вход 5Б"
              />{" "}
              <span />
            </a>{" "}
            <div className="a-shop-new-card__content">
              <div className="a-shop-new-card__type-and-distance">
                <div className="a-shop-new-card__type">Магазин</div>{" "}
              </div>{" "}
              <a
                className="a-shop-new-card__address"
                href="/shops/g-vladimir-ul-gastello-8a-tsk-terminal-pervyi-etazh-vhod-5b/">
                г. Владимир, ул. Гастелло 8А, ТСК Терминал, первый этаж, вход 5Б
              </a>{" "}
              <div className="a-shop-new-card__status a-shop-new-card__status--opened">
                Открыто
              </div>
              <div className="a-shop-new-card__schedule-and-contacts">
                <div className="a-shop-new-card__column">
                  <div className="a-shop-new-card__schedule">
                    пн.-пт.: 09:00 - 18:00, <br /> сб.-вс.: выходной{" "}
                  </div>
                </div>{" "}
                <div className="a-shop-new-card__column">
                  <div className="a-shop-new-card__phones">
                    <a className="a-link-button" href="tel:+74922499929">
                      {" "}
                      <span className="a-link-button__content a-link-button__content--black">
                        +7 (492) 249-99-29
                      </span>{" "}
                    </a>
                  </div>{" "}
                  <div className="a-shop-new-card__emails">
                    <a className="a-link-button" href="mailto:vldb2b@bigam.ru">
                      {" "}
                      <span className="a-link-button__content a-link-button__content--blue">
                        vldb2b@bigam.ru
                      </span>{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li className="a-page-shops__item">
          <div className="a-shop-new-card">
            <a
              className="a-shop-new-card__picture"
              href="/shops/g-vladimir-ul-kuybysheva-d-24a/">
              <img
                alt="г. Владимир, ул. Куйбышева, д 24А"
                className="a-lazy-load a-is-loaded"
                src="https://cdn.bigam.ru/resize_cache/iblock/670/vvpp2h1k3ychtya3xtygtbe0e6o136t7/1000_404_0/Fasad.jpg"
                title="г. Владимир, ул. Куйбышева, д 24А"
              />{" "}
              <span />
            </a>{" "}
            <div className="a-shop-new-card__content">
              <div className="a-shop-new-card__type-and-distance">
                <div className="a-shop-new-card__type">Магазин</div>{" "}
              </div>{" "}
              <a
                className="a-shop-new-card__address"
                href="/shops/g-vladimir-ul-kuybysheva-d-24a/">
                г. Владимир, ул. Куйбышева, д 24А
              </a>{" "}
              <div className="a-shop-new-card__status a-shop-new-card__status--opened">
                Открыто
              </div>
              <div className="a-shop-new-card__schedule-and-contacts">
                <div className="a-shop-new-card__column">
                  <div className="a-shop-new-card__schedule">
                    пн.-вс.: 09:00 - 19:00
                  </div>
                </div>{" "}
                <div className="a-shop-new-card__column">
                  <div className="a-shop-new-card__phones">
                    <a className="a-link-button" href="tel:+74922499929">
                      {" "}
                      <span className="a-link-button__content a-link-button__content--black">
                        +7 (492) 249-99-29
                      </span>{" "}
                    </a>
                  </div>{" "}
                  <div className="a-shop-new-card__emails">
                    <a
                      className="a-link-button"
                      href="mailto:vladimir2@bigam.ru">
                      {" "}
                      <span className="a-link-button__content a-link-button__content--blue">
                        vladimir2@bigam.ru
                      </span>{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li className="a-page-shops__item">
          <div className="a-shop-new-card">
            <a
              className="a-shop-new-card__picture"
              href="/shops/g-vologda-ul-preobrazhenskogo-d-30/">
              <img
                alt="г. Вологда, ул Преображенского, д. 30"
                className="a-lazy-load a-is-loaded"
                src="https://cdn.bigam.ru/resize_cache/iblock/2c4/dlqeo8qkth9ncnf9g72jze1c3trl3heo/1000_404_0/photo_2023_08_15_17_09_47-_1_.jpg"
                title="г. Вологда, ул Преображенского, д. 30"
              />{" "}
              <span />
            </a>{" "}
            <div className="a-shop-new-card__content">
              <div className="a-shop-new-card__type-and-distance">
                <div className="a-shop-new-card__type">Магазин</div>{" "}
              </div>{" "}
              <a
                className="a-shop-new-card__address"
                href="/shops/g-vologda-ul-preobrazhenskogo-d-30/">
                г. Вологда, ул Преображенского, д. 30
              </a>{" "}
              <div className="a-shop-new-card__status a-shop-new-card__status--opened">
                Открыто
              </div>
              <div className="a-shop-new-card__schedule-and-contacts">
                <div className="a-shop-new-card__column">
                  <div className="a-shop-new-card__schedule">
                    пн.-вс.: 09:00 - 19:00
                  </div>
                </div>{" "}
                <div className="a-shop-new-card__column">
                  <div className="a-shop-new-card__phones">
                    <a className="a-link-button" href="tel:+78172347909">
                      {" "}
                      <span className="a-link-button__content a-link-button__content--black">
                        +7 (817) 234-79-09
                      </span>{" "}
                    </a>
                  </div>{" "}
                  <div className="a-shop-new-card__emails">
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
                </div>
              </div>
            </div>
          </div>
        </li>
        <li className="a-page-shops__item">
          <div className="a-shop-new-card">
            <a
              className="a-shop-new-card__picture"
              href="/shops/g-vologda-ul-leningradskaya-d-144/">
              <img
                alt="г. Вологда, ул. Ленинградская, д. 144"
                className="a-lazy-load a-is-loaded"
                src="https://cdn.bigam.ru/resize_cache/iblock/a23/8o48kpnz2818xt4hte10rb9n9898vo6w/1000_404_0/vologda1_1.jpg"
                title="г. Вологда, ул. Ленинградская, д. 144"
              />{" "}
              <span />
            </a>{" "}
            <div className="a-shop-new-card__content">
              <div className="a-shop-new-card__type-and-distance">
                <div className="a-shop-new-card__type">Магазин</div>{" "}
              </div>{" "}
              <a
                className="a-shop-new-card__address"
                href="/shops/g-vologda-ul-leningradskaya-d-144/">
                г. Вологда, ул. Ленинградская, д. 144
              </a>{" "}
              <div className="a-shop-new-card__status a-shop-new-card__status--opened">
                Открыто
              </div>
              <div className="a-shop-new-card__schedule-and-contacts">
                <div className="a-shop-new-card__column">
                  <div className="a-shop-new-card__schedule">
                    пн.-пт.: 09:00 - 19:00 <br />
                    сб.: 09:00 - 18:00 <br />
                    вс.: 09:00 - 17:00
                  </div>
                </div>{" "}
                <div className="a-shop-new-card__column">
                  <div className="a-shop-new-card__phones">
                    <a className="a-link-button" href="tel:+78172347909">
                      {" "}
                      <span className="a-link-button__content a-link-button__content--black">
                        +7 (817) 234-79-09
                      </span>{" "}
                    </a>
                  </div>{" "}
                  <div className="a-shop-new-card__emails">
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
                </div>
              </div>
            </div>
          </div>
        </li>
        <li className="a-page-shops__item">
          <div className="a-shop-new-card">
            <a
              className="a-shop-new-card__picture"
              href="/shops/g-ivanovo-ul-velizhskaya-d-3/">
              <img
                alt="г. Иваново, ул. Велижская, д. 3"
                className="a-lazy-load a-is-loaded"
                src="https://cdn.bigam.ru/resize_cache/iblock/2f0/3o355jn0xo0uuq36lvty3ci8bulw85sk/1000_404_0/Fasad_2.jpg"
                title="г. Иваново, ул. Велижская, д. 3"
              />{" "}
              <span />
            </a>{" "}
            <div className="a-shop-new-card__content">
              <div className="a-shop-new-card__type-and-distance">
                <div className="a-shop-new-card__type">Магазин</div>{" "}
              </div>{" "}
              <a
                className="a-shop-new-card__address"
                href="/shops/g-ivanovo-ul-velizhskaya-d-3/">
                г. Иваново, ул. Велижская, д. 3
              </a>{" "}
              <div className="a-shop-new-card__status a-shop-new-card__status--opened">
                Открыто
              </div>
              <div className="a-shop-new-card__schedule-and-contacts">
                <div className="a-shop-new-card__column">
                  <div className="a-shop-new-card__schedule">
                    пн.-пт.: 09:00 - 19:00 <br />
                    сб.: 09:00 - 18:00 <br />
                    вс.: 09:00 - 17:00
                  </div>
                </div>{" "}
                <div className="a-shop-new-card__column">
                  <div className="a-shop-new-card__phones">
                    <a className="a-link-button" href="tel:+74932999594">
                      {" "}
                      <span className="a-link-button__content a-link-button__content--black">
                        +7 (493) 299-95-94
                      </span>{" "}
                    </a>
                  </div>{" "}
                  <div className="a-shop-new-card__emails">
                    <a className="a-link-button" href="mailto:Ivanovo@bigam.ru">
                      {" "}
                      <span className="a-link-button__content a-link-button__content--blue">
                        Ivanovo@bigam.ru
                      </span>{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>{" "}
      <div className="a-page-shops__pagination">
        <div className="a-page-shops__button-more">
          <button
            className="a-main-button a-main-button--display-inline a-main-button--type-medium a-main-button--corner-round a-main-button--color-light-grey"
            type="button">
            {" "}
            <span className="a-main-button__wrap">
              {" "}
              <span className="a-main-button__content">Показать еще</span>{" "}
              <span className="a-main-button__constrain">
                <svg className="a-svg a-main-button__icon a-main-button__icon--right a-svg--medium a-main-button__icon--icon-meatballs a-main-button__icon--color">
                  <use
                    xlinkHref="#icon-meatballs"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  />
                </svg>
              </span>
            </span>{" "}
          </button>
        </div>{" "}
        <div className="a-pagination">
          <span className="a-pagination__button">
            <svg className="a-svg a-pagination__icon a-pagination__icon--prev">
              <use
                xlinkHref="#icon-old-arrow"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              />
            </svg>
          </span>{" "}
          <ul className="a-pagination__list">
            <li className="a-pagination__item a-pagination__item--active">
              <span className="a-pagination__button">1</span>
            </li>
            <li className="a-pagination__item">
              <a className="a-pagination__button" href="/shops/?page=2">
                2
              </a>
            </li>
            <li className="a-pagination__item">
              <a className="a-pagination__button" href="/shops/?page=3">
                3
              </a>
            </li>
            <li className="a-pagination__item">
              <a className="a-pagination__button" href="/shops/?page=4">
                4
              </a>
            </li>
          </ul>{" "}
          <a className="a-pagination__button" href="/shops/?page=2">
            <svg className="a-svg a-pagination__icon a-pagination__icon--next">
              <use
                xlinkHref="#icon-old-arrow"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</main>
  );
}
