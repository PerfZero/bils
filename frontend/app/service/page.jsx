"use client";

import Breadcrumbs from "../components/Breadcrumbs";

export default function CatalogSlugPage({ params }) {
  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Корпоративным клиентам" },
  ];

  return (
    <main className="a-page-static__description a-page-static__description--new">
      <div className="a-page-catalog__container">
        <Breadcrumbs
          items={breadcrumbs}
          className="a-page-catalog__breadcrumbs"
        />
      </div>
      <div className="a-page-static__container">
        <section className="a-page-static__section">
          <div className="a-page-static__title">
            <h1>Сервисный центр «BREMAX»</h1>
          </div>{" "}
          <div className="a-page-static__wrap">
            <div className="a-page-static__style">
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    '    h2 {        text-align: center;        width: 100%    }        .static-pages-content__menu-item a {        border-bottom: none;    }    .static-pages-content__menu-item_active a {        color: #F2B705 !important;        border-bottom: 1px solid #F2B705 !important;    }    .static-pages-content__item iframe {        width: 100%;        max-height: 500px;        border-radius: 12px;        overflow: hidden;    }    @media (max-width: 567px) {        .static-pages-content__item iframe {            max-height: 300px;        }    }    @media (min-width: 799px) {        .static-pages-content__item .del-normilaze-styles {            width: auto;        }        .static-pages-content__item .ml-20 {            margin-left: 20px;        }    }    .static-pages-content__item-image-rad {        border-radius: 12px;    }    .static-pages-content__opened-list li::before {        display: none;    }    .static-pages-content__opened-list-item ul > li::before {        content: "•";        display: inline-block;        margin-right: 8px;        font-weight: 700;        color: #F2B705;    }    .static-pages-content__item-blocks {        margin: 0 -10px;    }    .static-pages-content__item-blocks__item {        height: -webkit-fit-content;        height: -moz-fit-content;        height: fit-content;        padding: 0 10px;    }    .static-pages-content__item-blocks__item_three-one {        -ms-flex-preferred-size: calc(33% - 20px);        flex-basis: calc(33% - 20px);    }    @media (max-width: 567px) {        .static-pages-content__item-blocks__item_three-one {            -ms-flex-preferred-size: 100%;            flex-basis: 100%;        }    }    .static-pages-content__item-blocks__item_four-one {        -ms-flex-preferred-size: calc(25% - 20px);        flex-basis: calc(25% - 20px);    }    @media (max-width: 567px) {        .static-pages-content__item-blocks__item_four-one {            -ms-flex-preferred-size: 100%;            flex-basis: 100%;        }    }    .static-pages-content__item-blocks__item_col-30 {        width: 30%;    }    @media (max-width: 567px) {        .static-pages-content__item-blocks__item_col-30 {            -ms-flex-preferred-size: 100%;            flex-basis: 100%;        }    }    .static-pages-content__item-blocks__item_col-70 {        width: 70%;    }    @media (max-width: 567px) {        .static-pages-content__item-blocks__item_col-70 {            -ms-flex-preferred-size: 100%;            flex-basis: 100%;        }    }    .static-pages-content__item-blocks__item-portrets img {        height: 60%;        -o-object-fit: cover;        object-fit: cover;        margin-bottom: 5px;    }    .static-pages-content__item-blocks__item-portrets p {        margin-top: 10px;        margin-bottom: 10px;    }    .static-pages-content__item-blocks__item-portrets .small-par {        font-size: 0.8rem;    }    .static-pages-content__item-blocks__item_center-content {        height: auto;        display: -webkit-box;        display: -ms-flexbox;        display: flex;        -webkit-box-orient: vertical;        -webkit-box-direction: normal;        -ms-flex-direction: column;        flex-direction: column;        -webkit-box-align: center;        -ms-flex-align: center;        align-items: center;    }    .static-pages-content__item-blocks__item_center-content h3 {        text-align: center;    }    .static-pages-content__item-blocks__item_center-content .fs-17 {        font-size: 17px;    }    .static-pages-content__item-blocks__item_center-content .fs-20 {        font-size: 20px;    }    .static-pages-content__item-blocks__item_center-content .pos-center {        text-align: center;    }    .static-pages-content__item-blocks__item_center-content .width-110 {        width: 110px;    }    .static-pages-content__item-blocks__item_link-container a {        position: relative;        border-bottom: none;        display: block;    }    .static-pages-content__item-blocks__item_link-container a h3 {        font-size: 16px;        font-weight: 7000;        position: absolute;        top: 10px;        margin: 0;    }    .static-pages-content__item-blocks__item_link-container a img {        height: 300px;        -o-object-fit: contain;        object-fit: contain;        margin: 0 !important;    }    .static-pages-content__item-blocks__item_link-container a button {        position: absolute;        bottom: 30px;        left: 0;    }    .static-pages-content__item-blocks .flex-space-btw {        height: -webkit-fit-content;        height: -moz-fit-content;        height: fit-content;        display: -webkit-box;        display: -ms-flexbox;        display: flex;        -webkit-box-orient: vertical;        -webkit-box-direction: normal;        -ms-flex-direction: column;        flex-direction: column;        -webkit-box-pack: justify;        -ms-flex-pack: justify;        justify-content: space-between;    }    .static-pages-content__item-blocks .flex-space-btw a {        border-bottom-color: #F2B705;    }    .static-pages-content__item-blocks .flex-column {        display: -webkit-box;        display: -ms-flexbox;        display: flex;        -webkit-box-orient: vertical;        -webkit-box-direction: normal;        -ms-flex-direction: column;        flex-direction: column;        -webkit-box-pack: center;        -ms-flex-pack: center;        justify-content: center;    }    .static-pages-content__item-blocks .out-margin {        margin: 0 !important;    }    .static-pages-content__item-blocks .text-content {        margin-left: 20px;    }    .static-pages-content__item-blocks .text-content h3 {        margin-top: 0;        margin-bottom: 20px;    }    .static-pages-content__item-blocks .fixed-image-width-80 {        width: 80px;    }    .static-pages-content__item-blocks .image-container {        width: 120px;        height: 120px;        border-radius: 50%;        display: -webkit-box;        display: -ms-flexbox;        display: flex;        -webkit-box-pack: center;        -ms-flex-pack: center;        justify-content: center;        -webkit-box-align: center;        -ms-flex-align: center;        align-items: center;        background-color: #163285;        overflow: hidden;    }    .static-pages-content__item-blocks .image-container img {        margin: 0 !important;        max-width: 69px;    }    .static-pages-content__item-blocks_flex-wrap {        display: -webkit-box;        display: -ms-flexbox;        display: flex;        -ms-flex-wrap: wrap;        flex-wrap: wrap;    }    .static-pages-content__item-blocks_bg-grey img {        max-width: 70px;    }    .static-pages-content__item-blocks_bg-grey p {        margin-left: 15px;    }    .static-pages-content__item-table tr:nth-child(odd) {        background: #f8f8f8;    }    .static-pages-content__item-table tr td {        border: none;        padding: 12px;    }    .static-pages-content .svg-static-content {        position: absolute;        top: calc(50% - 6px);        right: 10px;        width: 12px;        height: 12px;        margin-top: 0 !important;        margin-bottom: 0 !important;        -webkit-transform: rotateZ(180deg);        transform: rotateZ(180deg);    }    .static-pages-content .svg-static-content_open {        -webkit-transform: rotateZ(0deg);        transform: rotateZ(0deg);    }    @media (max-width: 799px) {        .static-pages-content__menu-item a {            border-bottom: none;        }    }',
                }}
              />{" "}
              <script />
            </div>{" "}
            <div className="a-page-static__sidebar">
              <div className="page-static-menu__list">
                <div className="page-static-menu__item">
                  <a
                    className="page-static-menu__link nuxt-link-active page-static-menu__link--active"
                    href="/service/"
                  >
                    Сервисный центр
                  </a>
                </div>
                <div className="page-static-menu__item">
                  <div className="page-static-menu__link">Проверить статус</div>
                </div>
                <div className="page-static-menu__item">
                  <a
                    className="page-static-menu__link"
                    href="/catalog/zapchasti-6733/"
                  >
                    Каталог запчастей
                  </a>
                </div>
                <div className="page-static-menu__item">
                  <a className="page-static-menu__link" href="/service/prices/">
                    Услуги
                  </a>
                </div>
                <div className="page-static-menu__item">
                  <a
                    className="page-static-menu__link"
                    href="/service/zapchasti-kak-oformit-zakaz/"
                  >
                    Как заказать запчаcть
                  </a>
                </div>
                <div className="page-static-menu__item">
                  <a
                    aria-current="page"
                    className="page-static-menu__link nuxt-link-exact-active nuxt-link-active"
                    href="/service/#contact-1"
                  >
                    Контакты
                  </a>
                </div>
              </div>
            </div>{" "}
            <div className="a-page-static__description a-page-static__description--old">
              <img
                alt=""
                className="static-pages-content__item-image-rad"
                src="https://cdn.bigam.ru/medialibrary/3e1/5zc0y279a4zjc2vlfnbmvyb38176ofde/banner_service_center.jpg"
              />
              <h2>Краткая общая информация</h2>
              <p>
                Сервисный центр компании «BREMAX» осуществляет полный спектр
                услуг по диагностике, ремонту и обслуживанию инструмента и
                техники. Мы обладаем широким ассортиментом всевозможных
                запчастей для оборудования российских и зарубежных марок: Bosch,
                Makita, ИНТЕРСКОЛ, Сварог, Кадви, Remington, Caiman, Oleo-Mac,
                Viking и мн. др.
              </p>
              <p>
                Большая часть ремонтных работ проводится в нашем центре, где
                есть необходимые производственные и складские площади,
                оснащенные специализированным оборудованием.
              </p>
              <p>
                Мы постоянно совершенствуем свою техническую базу, наши
                специалисты регулярно проходят курсы повышения квалификации, что
                позволяет нам осуществлять ремонт качественно и в кратчайшие
                сроки.
              </p>
              <p>Мы создаем для Вас рабочую атмосферу!</p>
              <h2>Возможности Сервисного центра</h2>
              <div className="static-pages-content__item-blocks static-pages-content__item-blocks_flex-wrap">
                <div className="static-pages-content__item-blocks__item static-pages-content__item-blocks__item_three-one static-pages-content__item-blocks__item_center-content">
                  <div className="image-container">
                    {" "}
                    <img
                      alt=""
                      className="radius-circle"
                      src="https://cdn.bigam.ru/medialibrary/d1c/kl3ypw5kdjb1ad51yypun3rlfrinp66i/icn_sevice_1.png"
                    />
                  </div>
                  <h3 className="fs-17">РЕМОНТ</h3>
                  <div className="flex-space-btw">
                    <p>
                      Мы осуществляем установку, диагностику, профилактику,
                      настройку, ремонт, а также гарантийное и послегарантийное
                      обслуживание вашего оборудования.
                    </p>{" "}
                    <a
                      className="a-sidebar-cart__button a-button a-button--light-orange a-button--full"
                      href="/service/prices/"
                    >
                      Подробнее
                    </a>
                  </div>
                </div>
                <div className="static-pages-content__item-blocks__item static-pages-content__item-blocks__item_three-one static-pages-content__item-blocks__item_center-content">
                  <div className="image-container">
                    {" "}
                    <img
                      alt=""
                      className="radius-circle"
                      src="https://cdn.bigam.ru/medialibrary/9ec/z6sguwg5cdcgvllfl54labcehdn5qc41/icn_sevice_2.png"
                    />
                  </div>
                  <h3 className="fs-17">ЗАПЧАСТИ</h3>
                  <div className="flex-space-btw">
                    <p>
                      Кроме услуг по ремонту, диагностике и обслуживанию
                      оборудования, мы предлагаем огромный выбор комплектующих и
                      запасных частей на продажу в наличии и под заказ.
                    </p>{" "}
                    <a
                      className="a-sidebar-cart__button a-button a-button--light-orange a-button--full"
                      href="/service/zapchasti-kak-oformit-zakaz/"
                    >
                      Подробнее
                    </a>
                  </div>
                </div>
                <div className="static-pages-content__item-blocks__item static-pages-content__item-blocks__item_three-one static-pages-content__item-blocks__item_center-content">
                  <div className="image-container">
                    {" "}
                    <img
                      alt=""
                      className="radius-circle"
                      src="https://cdn.bigam.ru/medialibrary/d7e/nvkmoo0pf2i7u2rm1hb163ccisd0ne93/icn_sevice_3.png"
                    />
                  </div>
                  <h3 className="fs-17">УСЛУГИ</h3>
                  <div className="flex-space-btw">
                    <p>
                      Мы постоянно расширяем список предоставляемых услуг для
                      всех своих клиентов! Растем вместе с вами. С наиболее
                      полным перечнем услуг вы можете ознакомится по ссылке
                      ниже.
                    </p>{" "}
                    <a
                      className="a-sidebar-cart__button a-button a-button--light-orange a-button--full"
                      href="/service/prices/"
                    >
                      Подробнее
                    </a>
                  </div>
                </div>
              </div>
              <h2 id="contact-1">Контакты Сервисного центра</h2>
              <div className="static-pages-content__item-blocks static-pages-content__item-blocks_flex-wrap">
                <div className="static-pages-content__item-blocks__item static-pages-content__item-blocks__item_four-one static-pages-content__item-blocks__item_center-content">
                  {" "}
                  <img
                    alt=""
                    className="width-110"
                    src="https://cdn.bigam.ru/medialibrary/e33/7ewjbqemmw45kqch9rubigqjnnu2hf1w/service_contact_1.png"
                  />
                  <h3 className="fs-17">РУКОВОДИТЕЛЬ СЕРВИСНОГО ЦЕНТРА</h3>
                  <p className="pos-center">БРЮХНО ВАДИМ ВИКТОРОВИЧ</p>{" "}
                  <a href="tel:8(4852)73-72-91">8(4852)73-72-91</a>{" "}
                  <a href="mailto:bryuhno@bigam.ru">bryuhno@bigam.ru</a>
                </div>
                <div className="static-pages-content__item-blocks__item static-pages-content__item-blocks__item_four-one static-pages-content__item-blocks__item_center-content">
                  {" "}
                  <img
                    alt=""
                    className="width-110"
                    src="https://cdn.bigam.ru/medialibrary/344/kgr9lqup3dbd1p9r8vasaylgol53knn6/service_contact_2.png"
                  />
                  <h3 className="fs-17">ОТДЕЛ ПРИЕМА ОБОРУДОВАНИЯ</h3>{" "}
                  <a href="tel:8(4852)23-10-73">8(4852)23-10-73</a>{" "}
                  <a href="mailto:sc@bigam.ru">sc@bigam.ru</a>
                </div>
                <div className="static-pages-content__item-blocks__item static-pages-content__item-blocks__item_four-one static-pages-content__item-blocks__item_center-content">
                  {" "}
                  <img
                    alt=""
                    className="width-110"
                    src="https://cdn.bigam.ru/medialibrary/d6a/pacvdoc0v5iqd1vn7aag6frlg28svbr8/service_contact_3.png"
                  />
                  <h3 className="fs-17">ОТДЕЛ ПРОДАЖИ ЗАПАСНЫХ ЧАСТЕЙ</h3>{" "}
                  <a href="tel:8(4852)73-76-02">8(4852)73-76-02</a>
                  <a href="mailto:sc@bigam.ru">sc@bigam.ru</a>
                </div>
                <div className="static-pages-content__item-blocks__item static-pages-content__item-blocks__item_four-one static-pages-content__item-blocks__item_center-content">
                  {" "}
                  <img
                    alt=""
                    className="width-110"
                    src="https://cdn.bigam.ru/medialibrary/27f/qune91x6zv93qhn05k8nftrivkygnw8n/service_contact_4.png"
                  />
                  <h3 className="fs-17">ЖАЛОБЫ И ПРЕДЛОЖЕНИЯ</h3>{" "}
                  <a href="mailto:zabota@bigam.ru">zabota@bigam.ru</a>
                </div>
              </div>
              <h2>Как проехать</h2>
              <div className="static-pages-content__item-blocks static-pages-content__item-blocks_flex-wrap">
                <div className="static-pages-content__item-blocks__item static-pages-content__item-blocks__item_col-30">
                  <h4
                    style={{
                      marginTop: "0",
                    }}
                  >
                    АДРЕС СЕРВИСНОГО ЦЕНТРА
                  </h4>
                  <p>
                    г. Ярославль, ул. Выставочная, д. 12 (рядом с Торговым
                    центром «BREMAX»)
                  </p>
                  <h4>ГРАФИК РАБОТЫ</h4>
                  <p>
                    Пн - Пт: 9:00 - 18:00
                    <br />
                  </p>
                  <p>Сб., Вск.- выходной.</p>
                  <p>
                    <strong>
                      {" "}
                      с 31 декабря 2025 по 11 января 2026 - выходной день.
                    </strong>
                  </p>
                  <h4>КООРДИНАТЫ</h4>
                  <p>
                    Широта: 57.66455561726793
                    <br />
                    Долгота: 39.83950801321297
                  </p>
                </div>
                <div className="static-pages-content__item-blocks__item static-pages-content__item-blocks__item_col-70">
                  <iframe
                    frameBorder="0"
                    height="518"
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3A58b181fad7cbdd89a7d212e4f13798be9416d1d6b70e8880055939bc8c02153f&source=constructor"
                    width="100%"
                  />
                </div>
              </div>{" "}
              <br />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
