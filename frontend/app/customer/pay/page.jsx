"use client";

import Breadcrumbs from "../../components/Breadcrumbs";

export default function CatalogSlugPage({ params }) {
  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Корпоративным клиентам" },
  ];

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
      <h1>Оплата</h1>
    </div>{" "}
    <div className="a-page-static__wrap">
      <div className="a-page-static__style">
        <style
          dangerouslySetInnerHTML={{
            __html:
              "    .static-pages-content {        display: -webkit-box;        display: -ms-flexbox;        display: flex;    }    .static-pages-content__menu {        padding: 20px;        border-radius: 12px;        border: 1px solid #d1d1d1;        height: -webkit-fit-content;        height: -moz-fit-content;        height: fit-content;        width: 20%;        overflow: hidden;    }    .static-pages-content__menu-item {        list-style: none !important;    }    .static-pages-content__menu-item::before {        display: none;    }    .static-pages-content__menu-item a {        border-bottom: none;    }    .static-pages-content__menu-item-head-mobile {        display: none !important;        position: relative;    }    .static-pages-content__menu-item_active a {        color: #f27e00 !important;        border-bottom: 1px solid #f27e00 !important;    }    .static-pages-content__opened-list {        width: 100%;        list-style: none;        border-radius: 12px;        overflow: hidden;    }    .static-pages-content__opened-list li::before {        display: none;    }    .static-pages-content__opened-list-item-header {        background: #d1d1d1;        position: relative;        font-weight: 700;        padding: 10px;        padding-right: 50px;        margin-bottom: 0 !important;        cursor: pointer;    }    .static-pages-content__opened-list-item {        padding: 10px;        display: none !important;    }    .static-pages-content__opened-list-item_open {        display: block !important;    }    .static-pages-content .svg-static-content {        position: absolute;        top: calc(50% - 6px);        right: 10px;        width: 12px;        height: 12px;        margin-top: 0 !important;        margin-bottom: 0 !important;        -webkit-transform: rotateZ(180deg);        transform: rotateZ(180deg);    }    .static-pages-content .svg-static-content_open {        -webkit-transform: rotateZ(0deg);        transform: rotateZ(0deg);    }    @media (max-width: 799px) {        .static-pages-content {            -webkit-box-orient: vertical;            -webkit-box-direction: normal;            -ms-flex-direction: column;            flex-direction: column;        }        .static-pages-content__menu {            width: 100%;            padding: 0;        }        .static-pages-content__menu-item {            display: none !important;            margin-bottom: 0;            padding: 5px 10px;        }        .static-pages-content__menu-item a {            border-bottom: none;        }        .static-pages-content__menu-item-head-mobile {            display: block !important;            padding: 10px;            padding-right: 50px;            font-weight: 700;            margin-bottom: 0;        }        .static-pages-content__menu-item-head-mobile::before {            display: none;        }        .static-pages-content__menu-item-head_mobile-active {            border-bottom: 1px solid #d1d1d1;        }        .static-pages-content__menu-item_mobile-visible {            display: block !important;        }        .static-pages-content__item {            width: 100%;            margin-left: 0;        }    }",
          }}
        />{" "}
        <script />
      </div>{" "}
      <div className="a-page-static__sidebar">
        <div className="page-static-menu__list">
          <div className="page-static-menu__item">
            <a
              className="page-static-menu__link nuxt-link-active"
              href="/customer/">
              Как заказать
            </a>
          </div>
          <div className="page-static-menu__item">
            <a className="page-static-menu__link" href="/promo/">
              Акции
            </a>
          </div>
          <div className="page-static-menu__item">
            <a className="page-static-menu__link" href="/corporate/">
              Корпоративным клиентам
            </a>
          </div>
          <div className="page-static-menu__item">
            <a className="page-static-menu__link" href="/customer/delivery/">
              Доставка
            </a>
          </div>
          <div className="page-static-menu__item">
            <a
              className="page-static-menu__link"
              href="/customer/mobile-application/">
              Мобильное приложение
            </a>
          </div>
          <div className="page-static-menu__item">
            <a
              aria-current="page"
              className="page-static-menu__link nuxt-link-exact-active nuxt-link-active page-static-menu__link--active"
              href="/customer/pay/">
              Оплата
            </a>
          </div>
          <div className="page-static-menu__item">
            <a className="page-static-menu__link" href="/customer/returns/">
              Правила приемки и возврата
            </a>
          </div>
          <div className="page-static-menu__item">
            <a className="page-static-menu__link" href="/customer/garantii/">
              Гарантии
            </a>
          </div>
          <div className="page-static-menu__item">
            <a
              className="page-static-menu__link"
              href="/customer/polzovatelskoe-soglashenie/">
              Пользовательское соглашение
            </a>
          </div>
          <div className="page-static-menu__item">
            <a
              className="page-static-menu__link"
              href="/customer/politika-konfidentsialnosti/">
              Политика конфидециальности
            </a>
          </div>
          <div className="page-static-menu__item">
            <a
              className="page-static-menu__link"
              href="/customer/bonusnaya-programma/">
              Бонусная программа
            </a>
          </div>
          <div className="page-static-menu__item">
            <a className="page-static-menu__link" href="/customer/gift-cards/">
              Подарочные карты
            </a>
          </div>
          <div className="page-static-menu__item">
            <a className="page-static-menu__link" href="/customer/promokody/">
              Промокоды
            </a>
          </div>
          <div className="page-static-menu__item">
            <a className="page-static-menu__link" href="/customer/faq/">
              FAQ
            </a>
          </div>
        </div>
      </div>{" "}
      <div className="a-page-static__description a-page-static__description--old">
        <div className="static-pages-content">
          <div className="static-pages-content__item">
            <p>
              В нашем интернет-магазине <a href="/">www.bigam.ru</a> и розничных
              магазинах «Бигам» вы можете оплатить любым удобным для вас
              способом. Мы работаем как с физическими лицами, так и с
              юридическими лицами. Для клиентов интернет-магазина действуют
              следующие способы оплаты:
            </p>
            <ul className="static-pages-content__opened-list">
              <li
                className="static-pages-content__opened-list-item-header"
                onclick="this.nextElementSibling.classList.toggle('static-pages-content__opened-list-item_open');this.querySelector('.svg-static-content').classList.toggle('svg-static-content_open');">
                Наличный расчет{" "}
                <img
                  alt=""
                  className="svg-static-content"
                  src="https://cdn.bigam.ru/medialibrary/3da/0iwkxdft3qjqx9o99d70vmy2lzgklwxz/arrow_black.svg"
                />{" "}
              </li>
              <li className="static-pages-content__opened-list-item">
                Оплатить товар наличными вы можете в точках выдачи заказа
                (транспортная компания, розничный магазин «Бигам») и при
                доставке курьером. Вместе с заказом вам выдается кассовый чек и
                гарантийный талон.{" "}
              </li>
            </ul>
            <ul className="static-pages-content__opened-list">
              <li
                className="static-pages-content__opened-list-item-header"
                onclick="this.nextElementSibling.classList.toggle('static-pages-content__opened-list-item_open');this.querySelector('.svg-static-content').classList.toggle('svg-static-content_open');">
                Банковской картой{" "}
                <img
                  alt=""
                  className="svg-static-content"
                  src="https://cdn.bigam.ru/medialibrary/3da/0iwkxdft3qjqx9o99d70vmy2lzgklwxz/arrow_black.svg"
                />{" "}
              </li>
              <li className="static-pages-content__opened-list-item">
                <div className="pay__tab__content">
                  <p>
                    <b>Расчет банковской картой при получении заказа </b>
                  </p>
                  <b> </b>
                  <p>
                    Вы можете оплатить товар банковской картой в точках выдачи
                    заказа (транспортная компания, розничный магазин «Бигам») и
                    при доставке заказа курьером только в г. Москве. Вместе с
                    заказом вам выдается кассовый чек и гарантийный талон.
                  </p>
                  <p>
                    Оплата заказа банковской картой при получении (курьерской
                    доставкой) доступно только в г. Москва. Вместе с заказом вам
                    выдается кассовый чек и гарантийный талон. В других регионах
                    данный способ оплаты при получении недоступен.
                  </p>
                  <p>
                    К оплате принимаются банковские карты платежной системы
                    Visa, MasterCard, Maestro, МИР.
                  </p>
                  <p>
                    <b>Расчет банковской картой в интернет-магазине «Бигам» </b>
                  </p>
                  <p>
                    При оплате товара банковской картой на сайте{" "}
                    <a href="/">www.bigam.ru</a> с вас не взимаются никакие
                    комиссии, данная услуга бесплатна.
                  </p>
                  <p>
                    К оплате принимаются банковские карты платежной системы
                    Visa, MasterCard, Maestro, МИР. Перевод денежных средств
                    осуществляется через процессинговый центр, выполняющий
                    интернет-эквайринг. После подтверждения заказа вы будете
                    перенаправлены на защищенную платежную страницу, где
                    необходимо ввести данные Вашей банковской карты. После
                    успешной оплаты вы получите электронный чек. Информация,
                    указанная в чеке, содержит все данные о проведенной
                    платежной транзакции.
                  </p>
                  <p>
                    Интернет-эквайринг осуществляет Московский банк «ПАО
                    Сбербанк». Подробнее ознакомиться с правилами оплаты
                    банковской картой на сайте можно по{" "}
                    <a href="/customer/pay/plastik/">ссылке</a>.
                  </p>
                  <p>
                    Отгрузка товара осуществляется в точках выдачи заказа
                    (транспортная компания, розничный магазин «Бигам») и при
                    доставке курьером при предъявлении паспорта или иного
                    документа, удостоверяющего личность (загранпаспорт и т.п.).
                    Вместе с заказом вам выдается кассовый чек и гарантийный
                    талон.
                  </p>
                </div>
              </li>
            </ul>
            <ul className="static-pages-content__opened-list">
              <li
                className="static-pages-content__opened-list-item-header"
                onclick="this.nextElementSibling.classList.toggle('static-pages-content__opened-list-item_open');this.querySelector('.svg-static-content').classList.toggle('svg-static-content_open');">
                Безналичный расчет (по выставленному счёту) для юридических лиц{" "}
                <img
                  alt=""
                  className="svg-static-content"
                  src="https://cdn.bigam.ru/medialibrary/3da/0iwkxdft3qjqx9o99d70vmy2lzgklwxz/arrow_black.svg"
                />{" "}
              </li>
              <li className="static-pages-content__opened-list-item">
                <div className="pay__tab__content">
                  <p>
                    Для физических и юридических лиц доступна оплата по
                    безналичному расчету (выставленный счет). Выдача товара
                    физическому лицу осуществляется только при предъявлении
                    документа, удостоверяющего личность (паспорт или иной
                    документ, удостоверяющий личность).
                  </p>
                  <p>
                    Представитель от юридического лица для получения товара
                    предоставляет платежное поручение и доверенность (если
                    получатель не имеет права подписи).
                  </p>
                  <p></p>
                  <p>
                    Вместе с заказом выдается товарная накладная и акт
                    приемки-передачи.
                  </p>
                </div>
              </li>
            </ul>
            <ul className="static-pages-content__opened-list">
              <li
                className="static-pages-content__opened-list-item-header"
                onclick="this.nextElementSibling.classList.toggle('static-pages-content__opened-list-item_open');this.querySelector('.svg-static-content').classList.toggle('svg-static-content_open');">
                Подарочная карта «Бигам»{" "}
                <img
                  alt=""
                  className="svg-static-content"
                  src="https://cdn.bigam.ru/medialibrary/3da/0iwkxdft3qjqx9o99d70vmy2lzgklwxz/arrow_black.svg"
                />{" "}
              </li>
              <li className="static-pages-content__opened-list-item">
                <div className="pay__tab__content">
                  <p>
                    Вы можете оплатить товар подарочными картами в любом
                    розничном магазине «Бигам», выбрав товар в торговом зале или
                    предварительно оформив заказ в интернет-магазине. Подробные
                    условия использования подарочной карты можно по{" "}
                    <a href="/customer/bonusnaya-programma/">ссылке</a>.
                  </p>
                  <p></p>
                  <p>
                    В интернет-магазине <a href="/">www.bigam.ru</a>
                     для клиентов проводятся ежемесячные 
                    <a href="/promo/">акции</a> и скидки по промокодам. Вы
                    можете подписаться на рассылку и получать уведомление обо
                    всех акциях и распродажа, проводимых в интернет-магазине.
                  </p>
                  <p>
                    Так-же у наших клиентов есть возможность приобрести
                    дисконтную карту, которая позволяет приобретать товары со
                    скидками (карты действуют только в розничных магазина
                    «Бигам»).
                  </p>
                </div>
              </li>
            </ul>
            <ul className="static-pages-content__opened-list">
              <li
                className="static-pages-content__opened-list-item-header"
                onclick="this.nextElementSibling.classList.toggle('static-pages-content__opened-list-item_open');this.querySelector('.svg-static-content').classList.toggle('svg-static-content_open');">
                Дисконтные карты{" "}
                <img
                  alt=""
                  className="svg-static-content"
                  src="https://cdn.bigam.ru/medialibrary/3da/0iwkxdft3qjqx9o99d70vmy2lzgklwxz/arrow_black.svg"
                />{" "}
              </li>
              <li className="static-pages-content__opened-list-item">
                <div className="pay__tab__content">
                  <p>
                    Для покупателей в розничных магазинах «Бигам» доступна
                    возможность приобрести дисконтную карту и воспользоваться
                    скидками от 3 до 10%. Подробные условия покупки и
                    использования дисконтной карты можно узнать по{" "}
                    <a href="/customer/pay/diskontnaya-karta/">ссылке</a>.
                  </p>
                  <b>Важно!</b> Дисконтные карты действуют только при покупке в
                  розничных магазинах «Бигам». В интернет-магазине{" "}
                  <a href="/">www.bigam.ru</a>
                   данная услуга не предоставляется.
                  <p></p>
                </div>
              </li>
            </ul>
            <ul className="static-pages-content__opened-list">
              <li
                className="static-pages-content__opened-list-item-header"
                onclick="this.nextElementSibling.classList.toggle('static-pages-content__opened-list-item_open');this.querySelector('.svg-static-content').classList.toggle('svg-static-content_open');">
                Оплата «Частями»{" "}
                <img
                  alt=""
                  className="svg-static-content"
                  src="https://cdn.bigam.ru/medialibrary/3da/0iwkxdft3qjqx9o99d70vmy2lzgklwxz/arrow_black.svg"
                />{" "}
              </li>
              <li className="static-pages-content__opened-list-item">
                <div className="pay__tab__content">
                  <p>
                    <b>Разбейте оплату частями без переплат</b>
                  </p>
                  <span
                    style={{
                      fontSize: "11pt",
                    }}>
                    - Добавляйте товары в корзину до 100 000 рублей;
                  </span>
                  <br />
                  <span
                    style={{
                      fontSize: "11pt",
                    }}>
                    - Выбирайте способ оплаты Частями;
                  </span>
                  <br />
                  <span
                    style={{
                      fontSize: "11pt",
                    }}>
                    - Оплачивайте сегодня только 25% картой любого банка;
                  </span>
                  <br />
                  <span
                    style={{
                      fontSize: "11pt",
                    }}>
                    - Получайте товар выбранным способом;
                  </span>
                  <br />
                  <span
                    style={{
                      fontSize: "11pt",
                    }}>
                    - Оставшиеся 75% будут списываться с вашей карты по 25%
                    каждые 2 недели.
                  </span>
                  <br />
                  <p>
                    <b>Подробнее об оплате частями</b>
                  </p>
                  <p>
                    <b>Что такое оплата Частями?</b>
                  </p>
                  <p>
                    - Это короткая мгновенная беспроцентная рассрочка. Вы
                    оплачиваете сразу только 25%, а оставшиеся 75% вы
                    оплачиваете в течение 6 недель, по 25% каждые 2 недели.
                  </p>
                  <p>
                    <b>Есть ли переплата?</b>
                  </p>
                  <p>
                    - Нет. Вы ничего не переплачиваете. Нет никаких скрытых
                    комиссий.
                  </p>
                  <p>
                    <b> Это кредит?</b>
                  </p>
                  <p>- Нет, это не кредит. Кредитный договор не оформляется.</p>
                  <p>
                    <b> Как будут списываться деньги за оставшиеся части?</b>
                  </p>
                  <p>
                    - Всё работает также как в сервисах подписки, например,
                    Яндекс.Музыка или Spotify. Вы делаете первый платёж, а
                    дальше с вашей карты списываются средства один раз в 2
                    недели.
                  </p>
                  <p>
                    <b>Политика безопасности платежей</b>
                  </p>
                  <p>
                    Оплатить заказ можно с помощью банковских карт платёжных
                    систем Visa, MasterCard, МИР. При оплате банковской картой
                    безопасность платежей гарантирует процессинговый центр
                    Best2Pay.
                  </p>
                  <p>
                    Приём платежей происходит через защищённое безопасное
                    соединение, используя протокол TLS 1.2. Компания Best2Pay
                    соответствует международным требованиями PCI DSS для
                    обеспечения безопасной обработки реквизитов банковской карты
                    плательщика. Ваши конфиденциальные данные необходимые для
                    оплаты (реквизиты карты, регистрационные данные и др.) не
                    поступают в Интернет-магазин, их обработка производится на
                    стороне процессингового центра Best2Pay и полностью
                    защищена. Никто, в том числе интернет-магазин{" "}
                    <a href="/" target="_blank">
                      "Бигам"
                    </a>
                    , не может получить банковские и персональные данные
                    плательщика.
                  </p>
                  <p>
                    При оплате заказа банковской картой возврат денежных средств
                    производится на ту же самую карту, с которой был произведён
                    платёж.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <br />
      </div>
    </div>
  </section>
</div>

    </main>
  );
}
