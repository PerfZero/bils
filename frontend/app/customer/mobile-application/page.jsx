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
      <h1>Мобильное приложение</h1>
    </div>{" "}
    <div className="a-page-static__wrap">
      <div className="a-page-static__style">
        <style
          dangerouslySetInnerHTML={{
            __html:
              ".containerPage {margin-left: -8px; margin-right: -8px; padding: 0; font-family: Montserrat,Montserrat-Fallback,sans-serif;}.row { display: -ms-flexbox; display: flex; -ms-flex-wrap: wrap; flex-wrap: wrap; margin-right: 0; margin-left: 0; margin-bottom: 16px; }.col-all { padding: 0 8px 16px 8px; }.col-all img {margin-top: 0px; margin-bottom: 0px; width: 100%; height: auto; }.col-mp-1, .col-mp-2, .col-mp-14, .col-mp-20, .col-mp-40, .col-mp-60, .col-mp-80, .col-mp-3, .col-mp-4, .col-mp-5, .col-mp-6, .col-mp-7, .col-mp-8, .col-mp-9, .col-mp-10, .col-mp-11, .col-mp-12,.col-tl-1, .col-tl-2, .col-tl-14, .col-tl-20, .col-tl-40, .col-tl-60, .col-tl-80, .col-tl-3, .col-tl-4, .col-tl-5, .col-tl-6, .col-tl-7, .col-tl-8, .col-tl-9, .col-tl-10, .col-tl-11, .col-tl-12 { width: 100%; min-height: 20px; }@media only screen and (min-width: 0px) and (max-width: 568px) {.containerPage{width: 100%; }.visible-mp {display: block !important;}.hidden-mp {display: none !important;}.col-mp-1, .col-mp-2, .col-mp-14, .col-mp-20, .col-mp-40, .col-mp-60, .col-mp-80, .col-mp-3, .col-mp-4, .col-mp-5, .col-mp-6, .col-mp-7, .col-mp-8, .col-mp-9, .col-mp-10, .col-mp-11, .col-mp-12,.col-tl-1, .col-tl-2, .col-tl-14, .col-tl-20, .col-tl-40, .col-tl-60, .col-tl-80, .col-tl-3, .col-tl-4, .col-tl-5, .col-tl-6, .col-tl-7, .col-tl-8, .col-tl-9, .col-tl-10, .col-tl-11, .col-tl-12 { width: 100%; min-height: 20px; padding: 0 10px;}}@media only screen and (min-width: 0px) and (max-width: 568px) {.col-mp-1, .col-mp-2, .col-mp-14, .col-mp-20,  .col-mp-40,  .col-mp-60,  .col-mp-80, .col-mp-3, .col-mp-4, .col-mp-5, .col-mp-6, .col-mp-7, .col-mp-8, .col-mp-9, .col-mp-10, .col-mp-11, .col-mp-12 {float: left;}.col-mp-12 {width: 100%;}.col-mp-11 {width: 91.66666667%;}.col-mp-10 {width: 83.33333333%;}.col-mp-9 {width: 75%;}.col-mp-8 {width: 66.66666667%;}.col-mp-7 {width: 58.33333333%;}.col-mp-6 {width: 50%;}.col-mp-5 {width: 41.66666667%;}.col-mp-4 {width: 33.33333333%;}.col-mp-3 {width: 25%;}.col-mp-20 {width: 20%;}.col-mp-40 {width: 40%;}.col-mp-60 {width: 60%;}.col-mp-80 {width: 80%;}.col-mp-14 {width: 14.28%;}.col-mp-2 {width: 16.66666667%;}.col-mp-1 {width: 8.33333333%;}.col-mp-0 {width: 0%;}}@media only screen and (min-width: 569px)  {.col-tl-1, .col-tl-2, .col-tl-14, .col-tl-40, .col-tl-60, .col-tl-80, .col-tl-3, .col-tl-4, .col-tl-5, .col-tl-6, .col-tl-7, .col-tl-8, .col-tl-9, .col-tl-10, .col-tl-11, .col-tl-12 {float: left;}.col-tl-12 {width: 100%;}.col-tl-11 {width: 91.66666667%;}.col-tl-10 {width: 83.33333333%;}.col-tl-9 {width: 75%;}.col-tl-8 {width: 66.66666667%;}.col-tl-7 {width: 58.33333333%;}.col-tl-6 {width: 50%;}.col-tl-5 {width: 41.66666667%;}.col-tl-4 {width: 33.33333333%;}.col-tl-3 {width: 25%;}.col-tl-20 {width: 20%;}.col-tl-40 {width: 40%;}.col-tl-60 {width: 60%;}.col-tl-80 {width: 80%;}.col-tl-14 {width: 14.28%;}.col-tl-2 {width: 16.66666667%;}.col-tl-1 {width: 8.33333333%;}.col-tl-0 {width: 0%;}}.containerPage h2 { color: #084A87; margin-bottom: 0px; margin-top: 0px;}.menuSub { padding-bottom: 22px; border-bottom: 1px solid #D1D1D1; margin-bottom: 16px; margin-left: 8px; margin-right: 8px; }.menuSub a { color: #004584; font-style: normal; font-weight: 400;  line-height: 1.1; text-decoration: none; border-bottom: 1px dashed #004584;  }.menuSub-left { text-align:center;}.menuSub-center { text-align: center; }.menuSub-right { text-align: center; }.blockBox { border: 1px solid #ECECEC; border-radius: 24px; padding: 30px 30px 30px 30px; height: 290px;}img.blockBoxIcon { width: 50%; height: auto; display: block; margin-bottom: 10px; }.blockBox  h4 { font-weight: 500; margin-top: 0px; margin-bottom: 16px; }.blockBox  p { font-weight: 300; margin-top: 0px; margin-bottom: 0px; line-height: 1.2; }.blockBoxRules {  height:auto;}.blockBoxRules .col-all { padding: 0 0px 0px 0px; }.blockBoxRules p { margin-top: 20px; margin-bottom: 20px; }.blockBoxRules .row { margin-bottom: 0px; }a.linkOpen { padding: 20px 20px 20px 20px; background: #F6F6F6; border-radius: 50%; border-bottom: none;  display: block; float: right;}a.linkOpen:hover { background: #47a3ef;}a.linkOpen img { width: 20px; height: 20px; display: block;}  a.linkOpen img.linkOpenImgOver { display: none;}  a.linkOpen:hover img.linkOpenImg { display: none; }  a.linkOpen:hover img.linkOpenImgOver { display: block;}  @media only screen and (max-width: 568px){.menuSub-left { text-align: left;}.menuSub-center { text-align: left; }.menuSub-right { text-align: left; }.blockBox { border-radius: 12px; padding: 16px 16px 16px 16px; height: auto; margin-bottom: 16px; }img.blockBoxIcon { width: 30%; }}  #blockRules {  height: 0px; overflow: hidden;  transition: height 2.0s ease-out; background: #FFFFFF; margin-top: -60px; margin-bottom: 60px; position: relative; z-index: 10; }#blockRules:target { height: auto;}",
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
              aria-current="page"
              className="page-static-menu__link nuxt-link-exact-active nuxt-link-active page-static-menu__link--active"
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
        <div className="containerPage">
          <div className="row">
            <div className="col-tl-12 col-mp-12 col-all">
              {" "}
              <img
                alt="баннер.jpg"
                src="https://cdn.bigam.ru/medialibrary/b85/spksa6ygn523jlcse50ngft4ww96bg70/Frame 1200_120-2.png"
                title="баннер.jpg"
              />
            </div>
          </div>
          <div className="row menuSub">
            <div className="col-tl-4 col-mp-12 col-all menuSub-left">
              {" "}
              <a className="topLink" href="#content_01">
                Что дает мобильное приложение?
              </a>
            </div>
            <div className="col-tl-4 col-mp-12 col-all menuSub-center">
              {" "}
              <a className="topLink" href="#content_02">
                Как установить приложение?
              </a>
            </div>
            <div className="col-tl-4 col-mp-12 col-all menuSub-right">
              {" "}
              <a className="topLink" href="#content_03">
                Как получить 200 бонусов за установку?
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-tl-12 col-mp-12 col-all">
              <h2>
                <a id="content_01" />
                Что дает мобильное приложение?
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-tl-4 col-mp-12 col-all">
              <div className="blockBox">
                {" "}
                <img
                  alt="1.jpg"
                  className="blockBoxIcon"
                  src="https://cdn.bigam.ru/medialibrary/de8/inaxm44p92ag01gphj0wcyph9q2kin2u/1.jpg"
                  title="1.jpg"
                />
                <h4>Оформление заказа </h4>
                <p>
                  Никаких лишних действий, контактные данные для заказа
                  подтянутся автоматически
                </p>
              </div>
            </div>
            <div className="col-tl-4 col-mp-12 col-all">
              <div className="blockBox">
                {" "}
                <img
                  alt="2.jpg"
                  className="blockBoxIcon"
                  src="https://cdn.bigam.ru/medialibrary/1bb/ir3r2rkpeywvp9onheu4ukuaorcd3f12/2.jpg"
                  title="2.jpg"
                />
                <h4>Бонусный баланс под рукой</h4>
                <p>
                  Вы всегда будете знать количество активных бонусов и даты их
                  сгорания
                </p>
              </div>
            </div>
            <div className="col-tl-4 col-mp-12 col-all">
              <div className="blockBox">
                {" "}
                <img
                  alt="3.jpg"
                  className="blockBoxIcon"
                  src="https://cdn.bigam.ru/medialibrary/e82/hqniwoh0n7u91d7p1q8vt0at9v4s01t4/3.jpg"
                  title="3.jpg"
                />
                <h4>Списание бонусов</h4>
                <p>
                  Мы просчитали выгоду за вас: цены в приложении указаны с
                  учетом примененных бонусов
                </p>
              </div>
            </div>
            <div className="col-tl-4 col-mp-12 col-all">
              <div className="blockBox">
                {" "}
                <img
                  alt="4.jpg"
                  className="blockBoxIcon"
                  src="https://cdn.bigam.ru/medialibrary/c34/t10umoy2c2z7ab2n0doqsrwujkm2rai0/4.jpg"
                  title="4.jpg"
                />
                <h4>Выгодные акции</h4>
                <p>
                  Подпишитесь на уведомления и первыми получайте новости о
                  суперпредложениях
                </p>
              </div>
            </div>
            <div className="col-tl-4 col-mp-12 col-all">
              <div className="blockBox">
                {" "}
                <img
                  alt="5.jpg"
                  className="blockBoxIcon"
                  src="https://cdn.bigam.ru/medialibrary/742/z4tsroneouhg2veqxngo0fe1ovqev2tz/5.jpg"
                  title="5.jpg"
                />
                <h4>Статусы ремонта</h4>
                <p>
                  Вы всегда будете в курсе, на какой сейчас стадии ремонта ваш
                  инструмент в сервисном центре
                </p>
              </div>
            </div>
            <div className="col-tl-4 col-mp-12 col-all">
              <div className="blockBox">
                {" "}
                <img
                  alt="6.jpg"
                  className="blockBoxIcon"
                  src="https://cdn.bigam.ru/medialibrary/902/zhjrevf57l9tp117mzzeeurolr5sdv69/6.jpg"
                  title="6.jpg"
                />
                <h4>Дополнительная скидка</h4>
                <p>
                  Получите 200 бонусных рублей в подарок при первой установке
                  приложения
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-tl-12 col-mp-12 col-all">
              <h2>
                <a id="content_02" />
                Как установить приложение?
              </h2>
              <p>Воспользуйтесь любым из этих вариантов:</p>
              <ol>
                <li>
                  Установите приложение Бигам, предварительно скачав его с
                  любого подходящего сервиса (
                  <a
                    href="https://play.google.com/store/apps/details?id=com.interhub.bigam"
                    rel="nofollow"
                    target="_blank">
                    Google Play
                  </a>
                  ,{" "}
                  <a
                    href="https://apps.rustore.ru/app/com.interhub.bigam"
                    rel="nofollow"
                    target="_blank">
                    RuStore
                  </a>
                  ,{" "}
                  <a
                    href="https://appgallery.huawei.com/#/app/C107597843"
                    rel="nofollow"
                    target="_blank">
                    AppGallery
                  </a>
                  ,{" "}
                  <a
                    href="https://apps.apple.com/ru/app/%D0%B1%D0%B8%D0%B3%D0%B0%D0%BC-%D0%B1%D0%BE%D0%BD%D1%83%D1%81%D0%BD%D0%B0%D1%8F-%D0%BA%D0%B0%D1%80%D1%82%D0%B0/id1539989003"
                    rel="nofollow"
                    target="_blank">
                    AppStore
                  </a>
                  )
                </li>
                <li>
                  Отсканируйте QR-код с рекламного плаката, размещенного во всех
                  розничных магазинах Бигам
                </li>
                <li>
                  Просто обратитесь к любому сотруднику магазина: они отправят
                  вам СМС со ссылкой на установку и с удовольствием ответят на
                  любые вопросы о приложении
                </li>
              </ol>
            </div>
          </div>
          <div className="row">
            <div className="col-tl-12 col-mp-12 col-all">
              <h2>
                <a id="content_03" />
                Как получить 200 бонусов за первую установку?
              </h2>
              <p>
                {" "}
                <b>Если у вас уже есть бонусная карта Бигам:</b>
              </p>
              <ol>
                <li>
                  После установки авторизуйтесь в приложении: введите номер
                  телефона, привязанный к вашей бонусной карте
                </li>
                <li>Получите код для входа в приложение</li>
                <li>Введите полученный код и завершите авторизацию</li>
              </ol>
              <p>
                {" "}
                <b>Если у вас еще нет бонусной карты Бигам:</b>
              </p>
              <ol>
                <li>
                  Пройдите процедуру регистрации (заполните предложенные поля)
                </li>
                <li>
                  На указанный вами телефон получите код для входа в приложение
                </li>
                <li>Пройдите авторизацию </li>
              </ol>
              <p>
                200 бонусных рублей будут доступны в течение суток после
                авторизации. Срок действия бонусов — целых <b>120 дней</b>.
              </p>
              <p>
                {" "}
                <i>
                  Примечание: Клиенты, которые ранее устанавливали приложение,
                  не могут получить бонусы
                </i>
              </p>
              <p></p>
            </div>
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
