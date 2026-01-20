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
      <h1>Гарантии</h1>
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
            <a className="page-static-menu__link" href="/customer/pay/">
              Оплата
            </a>
          </div>
          <div className="page-static-menu__item">
            <a className="page-static-menu__link" href="/customer/returns/">
              Правила приемки и возврата
            </a>
          </div>
          <div className="page-static-menu__item">
            <a
              aria-current="page"
              className="page-static-menu__link nuxt-link-exact-active nuxt-link-active page-static-menu__link--active"
              href="/customer/garantii/">
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
        <p>
          Весь товар интернет-магазина <a href="/">www.bigam.ru</a> и сети
          центров инструмента и техники «Бигам» качественный и имеет необходимые
          сертификаты качества. Если по каким-либо причинам Вам не понравится
          товар, можете его вернуть без объяснения причин в течение 7 дней, если
          Вы его не использовали.
        </p>
        <p>
          Интернет-магазин <a href="/">www.bigam.ru</a> работает в соответствии
          с Законом Российской Федерации «О защите прав потребителей» от
          07.02.1992 г. № 2300-1
        </p>
        <h2>Сроки гарантии</h2>
        <p>
          Срок гарантии, определяется производителем и исчисляется с даты,
          установленной изготовителем.
        </p>
        <p>
          Гарантийное обслуживание осуществляется в уполномоченных Сервисных
          центрах. Сервисный центр компании «Бигам» расположен по адресу г.
          Ярославль ул. Выставочная, д. 12. Подробнее о Сервисном центре можно
          узнать по этой
          <a href="/service/">ссылке</a>.
        </p>
        <h2>Обмен и возврат товара</h2>
        <p>
          При получении товара прежде чем расписаться в акте приемки,
          обязательно убедитесь в отсутствии внешних дефектов и комплектности
          вашего заказа.
        </p>
        <p>
          Претензии к внешнему виду товара в соответствии со ст. 458 и 459 ГК РФ
          вы можете предъявить только до передачи Вам товара продавцом.
        </p>
        <p>
          При обнаружении скрытых дефектов в товаре, его обмен или возврат
          денежных средств Покупателю (на основании законодательства «О защите
          прав потребителей» от 07.02.1992 г. № 2300-1 ) осуществляется после
          проведения проверки качества Cервисного центра.
        </p>
        <p>
          Подробные условия приемки, обмена и возврата товара указаны в разделе{" "}
          <a href="/customer/returns/">Правила приёмки и возврата</a>.
        </p>
      </div>
    </div>
  </section>
</div>

    </main>
  );
}
