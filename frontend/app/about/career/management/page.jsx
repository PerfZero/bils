"use client";

import Breadcrumbs from "../../../components/Breadcrumbs";

export default function CatalogSlugPage({ params }) {
  const breadcrumbs = [{ label: "Главная", href: "/" }, { label: "Карьера" }];

  return (
    <main className="a-page-static a-page__main">
      <div className="a-page-catalog__container">
        <Breadcrumbs
          items={breadcrumbs}
          className="a-page-catalog__breadcrumbs"
        />
      </div>
      <div className="a-page-static__container">
        <section className="a-page-static__section">
          <div className="a-page-static__title">
            <h1>Руководители</h1>
          </div>{" "}
          <div className="a-page-static__wrap">
            <div className="a-page-static__style">
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    '    .static-pages-content {        display: -webkit-box;        display: -ms-flexbox;        display: flex;    }    .static-pages-content__menu {        padding: 20px;        border-radius: 12px;        border: 1px solid #d1d1d1;        height: -webkit-fit-content;        height: -moz-fit-content;        height: fit-content;        width: 20%;        overflow: hidden;    }    .static-pages-content__menu-item {        list-style: none !important;    }    .static-pages-content__menu-item::before {        display: none;    }    .static-pages-content__menu-item a {        border-bottom: none;    }    .static-pages-content__menu-item-head-mobile {        display: none !important;        position: relative;    }    .static-pages-content__menu-item_active a {        color: #F2B705 !important;        border-bottom: 1px solid #F2B705 !important;    }    .static-pages-content__item {        margin-left: 30px;        width: 80%;    }    .static-pages-content__item iframe {        width: 100%;        max-height: 500px;        border-radius: 12px;        overflow: hidden;    }    @media (max-width: 567px) {        .static-pages-content__item iframe {            max-height: 300px;        }    }    @media (min-width: 799px) {        .static-pages-content__item .del-normilaze-styles {            width: auto;        }        .static-pages-content__item .ml-20 {            margin-left: 20px;        }    }    .static-pages-content__item-image-rad {        border-radius: 12px;    }    .static-pages-content__opened-list {        width: 100%;        list-style: none;        border-radius: 12px;        overflow: hidden;    }    .static-pages-content__opened-list li::before {        display: none;    }    .static-pages-content__opened-list-item-header {        background: #d1d1d1;        position: relative;        font-weight: 700;        padding: 10px;        padding-right: 50px;        margin-bottom: 0 !important;        cursor: pointer;    }    .static-pages-content__opened-list-item {        padding: 10px;        display: none !important;    }    .static-pages-content__opened-list-item ul > li::before {        content: "•";        display: inline-block;        margin-right: 8px;        font-weight: 700;        color: #F2B705;    }    .static-pages-content__opened-list-item_open {        display: block !important;    }    .static-pages-content__item-blocks {        margin: 0 -10px;    }    .static-pages-content__item-blocks__item {        height: -webkit-fit-content;        height: -moz-fit-content;        height: fit-content;        margin: 0 10px;    }    .static-pages-content__item-blocks__item_three-two {        -ms-flex-preferred-size: calc(33% - 20px);        flex-basis: calc(33% - 20px);    }    @media (max-width: 567px) {        .static-pages-content__item-blocks__item_three-two {            -ms-flex-preferred-size: calc(50% - 20px);            flex-basis: calc(50% - 20px);        }    }    .static-pages-content__item-blocks__item-portrets img {        height: 60%;        -o-object-fit: cover;        object-fit: cover;        margin-bottom: 5px;    }    .static-pages-content__item-blocks__item-portrets p {        margin-top: 10px;        margin-bottom: 10px;    }    .static-pages-content__item-blocks__item-portrets .small-par {        font-size: 0.8rem;    }    .static-pages-content__item-blocks_flex-wrap {        display: -webkit-box;        display: -ms-flexbox;        display: flex;        -ms-flex-wrap: wrap;        flex-wrap: wrap;    }    .static-pages-content__item-table {        border: none !important;        border-collapse: collapse;    }    .static-pages-content__item-table tr:nth-child(odd) {        background: #f8f8f8;    }    .static-pages-content__item-table tr td {        border: none;        padding: 12px;    }    .static-pages-content .svg-static-content {        position: absolute;        top: calc(50% - 6px);        right: 10px;        width: 12px;        height: 12px;        margin-top: 0 !important;        margin-bottom: 0 !important;        -webkit-transform: rotateZ(180deg);        transform: rotateZ(180deg);    }    .static-pages-content .svg-static-content_open {        -webkit-transform: rotateZ(0deg);        transform: rotateZ(0deg);    }    @media (max-width: 799px) {        .static-pages-content {            -webkit-box-orient: vertical;            -webkit-box-direction: normal;            -ms-flex-direction: column;            flex-direction: column;        }        .static-pages-content__menu {            width: 100%;            padding: 0;        }        .static-pages-content__menu-item {            display: none !important;            margin-bottom: 0;            padding: 5px 10px;        }        .static-pages-content__menu-item a {            border-bottom: none;        }        .static-pages-content__menu-item-head-mobile {            display: block !important;            padding: 10px;            padding-right: 50px;            font-weight: 700;            margin-bottom: 0;        }        .static-pages-content__menu-item-head-mobile::before {            display: none;        }        .static-pages-content__menu-item-head_mobile-active {            border-bottom: 1px solid #d1d1d1;        }        .static-pages-content__menu-item_mobile-visible {            display: block !important;        }        .static-pages-content__item {            width: 100%;            margin-left: 0;        }    }',
                }}
              />{" "}
              <script />
            </div>{" "}
            <div className="a-page-static__sidebar">
              <div className="page-static-menu__list">
                <div className="page-static-menu__item">
                  <a
                    className="page-static-menu__link nuxt-link-active"
                    href="/about/career/"
                  >
                    Карьера
                  </a>
                </div>
                <div className="page-static-menu__item">
                  <a
                    className="page-static-menu__link"
                    href="/about/career/life/"
                  >
                    Наша жизнь
                  </a>
                </div>
                <div className="page-static-menu__item">
                  <a
                    aria-current="page"
                    className="page-static-menu__link nuxt-link-exact-active nuxt-link-active page-static-menu__link--active"
                    href="/about/career/management/"
                  >
                    Наши руководители
                  </a>
                </div>
                <div className="page-static-menu__item">
                  <a
                    className="page-static-menu__link"
                    href="                https://yaroslavl.hh.ru/search/vacancy?from=employerPage&employer_id=50355&hhtmFrom=employer            "
                    rel="nofollow"
                    target="_blank"
                  >
                    Вакансии
                  </a>
                </div>
              </div>
            </div>{" "}
            <div className="a-page-static__description a-page-static__description--old">
              <div className="static-pages-content__item-blocks static-pages-content__item-blocks_flex-wrap">
                <div className="static-pages-content__item-blocks__item static-pages-content__item-blocks__item_three-two static-pages-content__item-blocks__item-portrets">
                  {" "}
                  <img
                    alt=""
                    className="static-pages-content__item-image-rad"
                    src="https://cdn.bigam.ru/medialibrary/371/u0nqmfw3rpg1izhsybhf11f7risf5ume/IMG_9190.jpg"
                  />
                  <p>
                    {" "}
                    <b>Арефьев Анатолий Владимирович</b>
                  </p>
                  <p className="small-par">
                    Заместитель генерального директора по розничным продажам
                  </p>
                </div>
                <div className="static-pages-content__item-blocks__item static-pages-content__item-blocks__item_three-two static-pages-content__item-blocks__item-portrets">
                  {" "}
                  <img
                    alt=""
                    className="static-pages-content__item-image-rad"
                    src="https://cdn.bigam.ru/medialibrary/921/wm8tfr400pf5rmdmhy2ekef3dxcmhnl4/IMG_9264.jpg"
                  />
                  <p>
                    {" "}
                    <b>Суслова Марина Леонтьевна</b>
                  </p>
                  <p className="small-par">Руководитель отдела обучения</p>
                </div>
                <div className="static-pages-content__item-blocks__item static-pages-content__item-blocks__item_three-two static-pages-content__item-blocks__item-portrets">
                  {" "}
                  <img
                    alt=""
                    className="static-pages-content__item-image-rad"
                    src="https://cdn.bigam.ru/medialibrary/a53/b1yf3td1imr5gnianlzfxriusv80ejlk/IMG_9037.jpg"
                  />
                  <p>
                    {" "}
                    <b>Гришаева Юлия Равильевна</b>
                  </p>
                  <p className="small-par">
                    Руководитель отдела управления персоналом
                  </p>
                </div>
                <div className="static-pages-content__item-blocks__item static-pages-content__item-blocks__item_three-two static-pages-content__item-blocks__item-portrets">
                  {" "}
                  <img
                    alt=""
                    className="static-pages-content__item-image-rad"
                    src="https://cdn.bigam.ru/medialibrary/912/gqzbtfoi4ureii97f4urvbbf8nyny3tx/IMG_8605.jpg"
                  />
                  <p>
                    {" "}
                    <b>Иванов Владимир Александрович</b>
                  </p>
                  <p className="small-par">
                    Руководитель отдела электронной торговли
                  </p>
                </div>
                <div className="static-pages-content__item-blocks__item static-pages-content__item-blocks__item_three-two static-pages-content__item-blocks__item-portrets">
                  {" "}
                  <img
                    alt=""
                    className="static-pages-content__item-image-rad"
                    src="https://cdn.bigam.ru/medialibrary/2c4/5qg92or274t1nmgdt1v10qfvdpawwuwy/IMG_8782.jpg"
                  />
                  <p>
                    {" "}
                    <b>Косушкин Максим Павлович</b>
                  </p>
                  <p className="small-par">
                    Руководитель отдела продаж корпоративным клиентам
                  </p>
                </div>
                <div className="static-pages-content__item-blocks__item static-pages-content__item-blocks__item_three-two static-pages-content__item-blocks__item-portrets">
                  {" "}
                  <img
                    alt=""
                    className="static-pages-content__item-image-rad"
                    src="https://cdn.bigam.ru/medialibrary/d63/jfqrv6u5v1po17q1c32ob0buece8dlbb/IMG_9286.jpg"
                  />
                  <p>
                    {" "}
                    <b>Барбашов Иван Андреевич</b>
                  </p>
                  <p className="small-par">
                    Заместитель директора по открытию филиалов
                  </p>
                </div>
                <div className="static-pages-content__item-blocks__item static-pages-content__item-blocks__item_three-two static-pages-content__item-blocks__item-portrets">
                  {" "}
                  <img
                    alt=""
                    className="static-pages-content__item-image-rad"
                    src="https://cdn.bigam.ru/medialibrary/2d1/fc5tmfz7sptyrui31ndcq2i56soqbirs/IMG_8926.jpg"
                  />
                  <p>
                    {" "}
                    <b>Бисерова Екатерина Викторовна</b>
                  </p>
                  <p className="small-par">
                    Заместитель директора по развитию розничной сети
                  </p>
                </div>
                <div className="static-pages-content__item-blocks__item static-pages-content__item-blocks__item_three-two static-pages-content__item-blocks__item-portrets">
                  {" "}
                  <img
                    alt="Александр Сипов.jpg"
                    className="static-pages-content__item-image-rad"
                    src="https://cdn.bigam.ru/medialibrary/a60/rxsbkzz52xc3ue6225e4lylrin8kvyaz/Aleksandr-Sipov2.jpg"
                    title="Александр Сипов.jpg"
                  />
                  <p>
                    {" "}
                    <b>Сипов Александр Вячеславович</b>
                  </p>
                  <p className="small-par">
                    Руководитель розничных продаж (Нижегородская территория)
                  </p>
                </div>
                <div className="static-pages-content__item-blocks__item static-pages-content__item-blocks__item_three-two static-pages-content__item-blocks__item-portrets">
                  {" "}
                  <img
                    alt="Егор Фалалеев.jpg"
                    className="static-pages-content__item-image-rad"
                    src="https://cdn.bigam.ru/medialibrary/585/v6h3u697xlszmol58stzjoatxsjs0v8y/Egor-Falaleev2.jpg"
                    title="Егор Фалалеев.jpg"
                  />
                  <p>
                    {" "}
                    <b>Фалалеев Егор Андреевич</b>
                  </p>
                  <p className="small-par">
                    Руководитель розничных продаж (Ивановская территория)
                  </p>
                </div>
                <div className="static-pages-content__item-blocks__item static-pages-content__item-blocks__item_three-two static-pages-content__item-blocks__item-portrets">
                  {" "}
                  <img
                    alt=""
                    className="static-pages-content__item-image-rad"
                    src="https://cdn.bigam.ru/medialibrary/f1a/90qcf7rcbar1o3lesriq3csvvyi9xj0o/IMG_8808.jpg"
                  />
                  <p>
                    {" "}
                    <b>Нечесанов Юрий Николаевич</b>
                  </p>
                  <p className="small-par">Руководитель транспортной службы</p>
                </div>
                <div className="static-pages-content__item-blocks__item static-pages-content__item-blocks__item_three-two static-pages-content__item-blocks__item-portrets">
                  {" "}
                  <img
                    alt=""
                    className="static-pages-content__item-image-rad"
                    src="https://cdn.bigam.ru/medialibrary/e6a/d29v0caop85jtgyhrvysgce0yh9k0ods/IMG_9107.jpg"
                  />
                  <p>
                    {" "}
                    <b>Голубев Алексей Александрович</b>
                  </p>
                  <p className="small-par">
                    Руководитель отдела управления ассортиментом
                  </p>
                </div>
                <div className="static-pages-content__item-blocks__item static-pages-content__item-blocks__item_three-two static-pages-content__item-blocks__item-portrets">
                  {" "}
                  <img
                    alt=""
                    className="static-pages-content__item-image-rad"
                    src="https://cdn.bigam.ru/medialibrary/bbf/qtjs2kfe9updn322aryxh3puwkdck5fr/IMG_8620.jpg"
                  />
                  <p>
                    {" "}
                    <b>Пржиборская Яна Моровна</b>
                  </p>
                  <p className="small-par">Главный бухгалтер</p>
                </div>
                <div className="static-pages-content__item-blocks__item static-pages-content__item-blocks__item_three-two static-pages-content__item-blocks__item-portrets">
                  {" "}
                  <img
                    alt="Брюхно В.В.jpg"
                    className="static-pages-content__item-image-rad"
                    src="https://cdn.bigam.ru/medialibrary/4ae/4ae9d500206d3054ff865c23abe2025c/Bryuhno-V.V.jpg"
                    title="Брюхно В.В.jpg"
                  />
                  <p>
                    {" "}
                    <b>Брюхно Вадим Викторович</b>
                  </p>
                  <p className="small-par">Руководитель сервисного центра</p>
                </div>
                <div className="static-pages-content__item-blocks__item static-pages-content__item-blocks__item_three-two static-pages-content__item-blocks__item-portrets">
                  {" "}
                  <img
                    alt="Руслан.jpg"
                    className="static-pages-content__item-image-rad"
                    src="https://cdn.bigam.ru/medialibrary/aeb/aeb7da3ac01c2f6b845bb2657e951d0b/Ruslan.jpg"
                    title="Руслан байрамгалин.jpg"
                  />
                  <p>
                    {" "}
                    <b>Байрамгалин Руслан Ринатович </b>
                  </p>
                  <p className="small-par">Руководитель складской логистики</p>
                </div>
              </div>{" "}
              <br /> <br />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
