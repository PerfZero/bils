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
            <h1>Подарочные карты</h1>
          </div>{" "}
          <div className="a-page-static__wrap">
            <div className="a-page-static__style">
              <style /> <script />
            </div>{" "}
            <div className="a-page-static__sidebar">
              <div className="page-static-menu__list">
                <div className="page-static-menu__item">
                  <a
                    className="page-static-menu__link nuxt-link-active"
                    href="/customer/"
                  >
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
                  <a
                    className="page-static-menu__link"
                    href="/customer/delivery/"
                  >
                    Доставка
                  </a>
                </div>
                <div className="page-static-menu__item">
                  <a
                    className="page-static-menu__link"
                    href="/customer/mobile-application/"
                  >
                    Мобильное приложение
                  </a>
                </div>
                <div className="page-static-menu__item">
                  <a className="page-static-menu__link" href="/customer/pay/">
                    Оплата
                  </a>
                </div>
                <div className="page-static-menu__item">
                  <a
                    className="page-static-menu__link"
                    href="/customer/returns/"
                  >
                    Правила приемки и возврата
                  </a>
                </div>
                <div className="page-static-menu__item">
                  <a
                    className="page-static-menu__link"
                    href="/customer/garantii/"
                  >
                    Гарантии
                  </a>
                </div>
                <div className="page-static-menu__item">
                  <a
                    className="page-static-menu__link"
                    href="/customer/polzovatelskoe-soglashenie/"
                  >
                    Пользовательское соглашение
                  </a>
                </div>
                <div className="page-static-menu__item">
                  <a
                    className="page-static-menu__link"
                    href="/customer/politika-konfidentsialnosti/"
                  >
                    Политика конфидециальности
                  </a>
                </div>
                <div className="page-static-menu__item">
                  <a
                    className="page-static-menu__link"
                    href="/customer/bonusnaya-programma/"
                  >
                    Бонусная программа
                  </a>
                </div>
                <div className="page-static-menu__item">
                  <a
                    aria-current="page"
                    className="page-static-menu__link nuxt-link-exact-active nuxt-link-active page-static-menu__link--active"
                    href="/customer/gift-cards/"
                  >
                    Подарочные карты
                  </a>
                </div>
                <div className="page-static-menu__item">
                  <a
                    className="page-static-menu__link"
                    href="/customer/promokody/"
                  >
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
              <img
                alt="gift-cards.jpg"
                src="https://cdn.bigam.ru/medialibrary/562/wyigp6uf02tdd3m1d8yfjp0hamukhj6d/Group 3072 (3).png"
              />
              <h2>Не знаете, что подарить?</h2>
              <p>
                Подарочная карта BREMAX — отличная возможность приподнести
                идеальный подарок. Вы будете уверены в том, что ваш подарок
                точно придется по вкусу тому, кого вы собираетесь порадовать. Вы
                самостоятельно определяете бюджет своего подарка, ведь
                подарочная карта может быть любого номинала.
              </p>
              <h2>Правила приобретения подарочной карты</h2>
              <p>
                Подарочная карта (сертификат) – это документ, удостоверяющий
                право его держателя получить товары на сумму, равную номинальной
                стоимости этого сертификата, посредством его обмена на товар в
                магазинах «BREMAX».
              </p>
              <ul>
                <li>
                  Подарочную карту вы можете приобрести на кассе в любом
                  магазине или на сайте
                  <a href="/catalog/podarochnye-karty-9840/" target="_blank">
                    «BREMAX»
                  </a>
                  . Просто скажите кассиру сумму номинала, которую бы вы хотели
                  подарить.
                </li>
                <li>
                  Подарочный сертификат содержит индивидуальный номер в виде
                  штрих кода и нефиксированное значение номинальной стоимости.
                  На подарочный сертификат может быть начислена любая сумма
                  кратная 100 руб.
                </li>
                <li>
                  Подарочный сертификат активируется в день его получения и
                  действителен в течение 12 (двенадцать) месяцев с момента его
                  приобретения.
                </li>
              </ul>
              <img
                alt="gift-cards.jpg"
                src="https://cdn.bigam.ru/medialibrary/562/wyigp6uf02tdd3m1d8yfjp0hamukhj6d/Баннер (3).png"
              />
              <p>
                <em>
                  <small>
                    В случае, если Подарочный сертификат не будет использован в
                    течение срока его действия- денежные средства, равные его
                    стоимости, возврату не подлежат. Подарочный сертификат
                    возврату и обмену на денежный эквивалент не подлежит. В
                    случае потери, кражи, порчи или механического повреждения,
                    которое не позволяет идентифицировать Подарочный сертификат
                    по индивидуальному номеру, он не восстанавливается и
                    денежные средства, равные его стоимости, не возвращаются.
                    Подарочные сертификаты, имеющие признаки подделки, к
                    исполнению не принимаются. Вся номинальная стоимость
                    Подарочного сертификата может использоваться при покупке
                    товара единовременно в полном объеме, либо частями при
                    оплате нескольких покупок в течение срока действия
                    сертификата. В случае, если суммарная стоимость выбранных
                    товаров превышает номинальную стоимость сертификата, разница
                    доплачивается наличными денежными средствами в кассу
                    Компании-продавца и/или в форме безналичного расчета. В
                    случае, если суммарная стоимость выбранных товаров меньше
                    номинальной стоимости Подарочного сертификата – разница
                    фиксируется на карте и может быть потрачена в рамках срока
                    действия сертификата. Допускается оплата Подарочным
                    сертификатом товаров, участвующих в акциях. Допускается
                    оплата Подарочным сертификатом покупок в розничном магазине
                    BREMAX и интернет-магазине BREMAX, но при оплате покупки в
                    кассу розничного магазина. Допускается суммирование
                    нескольких Подарочных сертификатов для совершения
                    единовременной покупки. Гарантийное обслуживание, обмен и
                    возврат некачественных товаров, а также товаров надлежащего
                    качества, приобретенных с использованием Подарочного
                    сертификата, осуществляется в общем порядке, предусмотренном
                    действующим законодательством.
                  </small>
                </em>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
