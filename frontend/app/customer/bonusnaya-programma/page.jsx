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
      <h1>Бонусная программа</h1>
    </div>{" "}
    <div className="a-page-static__wrap">
      <div className="a-page-static__style">
        <style
          dangerouslySetInnerHTML={{
            __html:
              ".containerPage {margin-left: -8px; margin-right: -8px; padding: 0; font-family: Montserrat,Montserrat-Fallback,sans-serif;}.row { display: -ms-flexbox; display: flex; -ms-flex-wrap: wrap; flex-wrap: wrap; margin-right: 0; margin-left: 0; margin-bottom: 16px; }.col-all { padding: 0 8px 16px 8px; }.col-all img {margin-top: 0px; margin-bottom: 0px; width: 100%; height: auto; }.col-mp-1, .col-mp-2, .col-mp-14, .col-mp-20, .col-mp-40, .col-mp-60, .col-mp-80, .col-mp-3, .col-mp-4, .col-mp-5, .col-mp-6, .col-mp-7, .col-mp-8, .col-mp-9, .col-mp-10, .col-mp-11, .col-mp-12,.col-tl-1, .col-tl-2, .col-tl-14, .col-tl-20, .col-tl-40, .col-tl-60, .col-tl-80, .col-tl-3, .col-tl-4, .col-tl-5, .col-tl-6, .col-tl-7, .col-tl-8, .col-tl-9, .col-tl-10, .col-tl-11, .col-tl-12 { width: 100%; min-height: 20px; }@media only screen and (min-width: 0px) and (max-width: 568px) {.containerPage{width: 100%; }.visible-mp {display: block !important;}.hidden-mp {display: none !important;}.col-mp-1, .col-mp-2, .col-mp-14, .col-mp-20, .col-mp-40, .col-mp-60, .col-mp-80, .col-mp-3, .col-mp-4, .col-mp-5, .col-mp-6, .col-mp-7, .col-mp-8, .col-mp-9, .col-mp-10, .col-mp-11, .col-mp-12,.col-tl-1, .col-tl-2, .col-tl-14, .col-tl-20, .col-tl-40, .col-tl-60, .col-tl-80, .col-tl-3, .col-tl-4, .col-tl-5, .col-tl-6, .col-tl-7, .col-tl-8, .col-tl-9, .col-tl-10, .col-tl-11, .col-tl-12 { width: 100%; min-height: 20px; padding: 0 10px;}}@media only screen and (min-width: 0px) and (max-width: 568px) {.col-mp-1, .col-mp-2, .col-mp-14, .col-mp-20,  .col-mp-40,  .col-mp-60,  .col-mp-80, .col-mp-3, .col-mp-4, .col-mp-5, .col-mp-6, .col-mp-7, .col-mp-8, .col-mp-9, .col-mp-10, .col-mp-11, .col-mp-12 {float: left;}.col-mp-12 {width: 100%;}.col-mp-11 {width: 91.66666667%;}.col-mp-10 {width: 83.33333333%;}.col-mp-9 {width: 75%;}.col-mp-8 {width: 66.66666667%;}.col-mp-7 {width: 58.33333333%;}.col-mp-6 {width: 50%;}.col-mp-5 {width: 41.66666667%;}.col-mp-4 {width: 33.33333333%;}.col-mp-3 {width: 25%;}.col-mp-20 {width: 20%;}.col-mp-40 {width: 40%;}.col-mp-60 {width: 60%;}.col-mp-80 {width: 80%;}.col-mp-14 {width: 14.28%;}.col-mp-2 {width: 16.66666667%;}.col-mp-1 {width: 8.33333333%;}.col-mp-0 {width: 0%;}}@media only screen and (min-width: 569px)  {.col-tl-1, .col-tl-2, .col-tl-14, .col-tl-40, .col-tl-60, .col-tl-80, .col-tl-3, .col-tl-4, .col-tl-5, .col-tl-6, .col-tl-7, .col-tl-8, .col-tl-9, .col-tl-10, .col-tl-11, .col-tl-12 {float: left;}.col-tl-12 {width: 100%;}.col-tl-11 {width: 91.66666667%;}.col-tl-10 {width: 83.33333333%;}.col-tl-9 {width: 75%;}.col-tl-8 {width: 66.66666667%;}.col-tl-7 {width: 58.33333333%;}.col-tl-6 {width: 50%;}.col-tl-5 {width: 41.66666667%;}.col-tl-4 {width: 33.33333333%;}.col-tl-3 {width: 25%;}.col-tl-20 {width: 20%;}.col-tl-40 {width: 40%;}.col-tl-60 {width: 60%;}.col-tl-80 {width: 80%;}.col-tl-14 {width: 14.28%;}.col-tl-2 {width: 16.66666667%;}.col-tl-1 {width: 8.33333333%;}.col-tl-0 {width: 0%;}}.containerPage h2 { color: #084A87; margin-bottom: 0px; margin-top: 0px;}.menuSub { padding-bottom: 22px; border-bottom: 1px solid #D1D1D1; margin-bottom: 16px; margin-left: 8px; margin-right: 8px; }.menuSub a { color: #004584; font-style: normal; font-weight: 400;  line-height: 1.1; text-decoration: none; border-bottom: 1px dashed #004584;  }.menuSub-left { text-align: left;}.menuSub-center { text-align: center; }.menuSub-right { text-align: right; }.blockBox { border: 1px solid #ECECEC; border-radius: 24px; padding: 30px 30px 30px 30px; height: 290px;}img.blockBoxIcon { width: 50%; height: auto; display: block; margin-bottom: 10px; }.blockBox  h4 { font-weight: 500; margin-top: 0px; margin-bottom: 16px; }.blockBox  p { font-weight: 300; margin-top: 0px; margin-bottom: 0px; line-height: 1.2; }.blockBoxRules {  height:auto;}.blockBoxRules .col-all { padding: 0 0px 0px 0px; }.blockBoxRules p { margin-top: 20px; margin-bottom: 20px; }.blockBoxRules .row { margin-bottom: 0px; }a.linkOpen { padding: 20px 20px 20px 20px; background: #F6F6F6; border-radius: 50%; border-bottom: none;  display: block; float: right;}a.linkOpen:hover { background: #47a3ef;}a.linkOpen img { width: 20px; height: 20px; display: block;}  a.linkOpen img.linkOpenImgOver { display: none;}  a.linkOpen:hover img.linkOpenImg { display: none; }  a.linkOpen:hover img.linkOpenImgOver { display: block;}  @media only screen and (max-width: 568px){.menuSub-left { text-align: left;}.menuSub-center { text-align: left; }.menuSub-right { text-align: left; }.blockBox { border-radius: 12px; padding: 16px 16px 16px 16px; height: auto; margin-bottom: 16px; }img.blockBoxIcon { width: 30%; }}  #blockRules {  height: 0px; overflow: hidden;  transition: height 2.0s ease-out; background: #FFFFFF; margin-top: -60px; margin-bottom: 60px; position: relative; z-index: 10; }#blockRules:target { height: auto;}",
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
              aria-current="page"
              className="page-static-menu__link nuxt-link-exact-active nuxt-link-active page-static-menu__link--active"
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
                alt="С картой Бигам выгоднее!"
                src="https://cdn.bigam.ru/medialibrary/000/top.jpg"
              />
            </div>
          </div>
          <div className="row menuSub">
            <div className="col-tl-4 col-mp-12 col-all menuSub-left">
              {" "}
              <a className="topLink" href="#content_01">
                Что дает бонусная карта?
              </a>
            </div>
            <div className="col-tl-4 col-mp-12 col-all menuSub-center">
              {" "}
              <a className="topLink" href="#content_02">
                Как получить бонусную карту?
              </a>
            </div>
            <div className="col-tl-4 col-mp-12 col-all menuSub-right">
              {" "}
              <a className="topLink" href="#content_03">
                Как потратить бонусы?
              </a>
            </div>
          </div>
          <a id="content_01" />
          <div className="row">
            <div className="col-tl-12 col-mp-12 col-all">
              <h2>Что дает бонусная карта Бигам?</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-tl-4 col-mp-12 col-all">
              <div className="blockBox">
                {" "}
                <img
                  alt="Кешбэк от 1 до 30%"
                  className="blockBoxIcon"
                  src="https://cdn.bigam.ru/medialibrary/000/icon_01.png"
                />
                <h4>Кешбэк от 1 до 10%</h4>
                <p>
                  Совершайте покупки и получайте кешбэк бонусами на вашу карту
                  Бигам
                </p>
              </div>
            </div>
            <div className="col-tl-4 col-mp-12 col-all">
              <div className="blockBox">
                {" "}
                <img
                  alt="Оплата до 30% от стоимости"
                  className="blockBoxIcon"
                  src="https://cdn.bigam.ru/medialibrary/000/icon_02.png"
                />
                <h4>Оплата до 30% от стоимости</h4>
                <p>Оплачивайте на кассе часть суммы покупки бонусами</p>
              </div>
            </div>
            <div className="col-tl-4 col-mp-12 col-all">
              <div className="blockBox">
                {" "}
                <img
                  alt="Подарочные бонусы"
                  className="blockBoxIcon"
                  src="https://cdn.bigam.ru/medialibrary/000/icon_03.png"
                />
                <h4>Подарочные бонусы</h4>
                <p>Получайте бонусы в подарок на День Рождения и просто так!</p>
              </div>
            </div>
          </div>
          <a id="content_02" />
          <div className="row">
            <div className="col-tl-12 col-mp-12 col-all">
              <h2>Как получить бонусную карту Бигам?</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-tl-4 col-mp-12 col-all">
              <div className="blockBox">
                {" "}
                <img
                  alt="Онлайн"
                  className="blockBoxIcon"
                  src="https://cdn.bigam.ru/medialibrary/000/icon_04.png"
                />
                <h4>Онлайн</h4>
                <p>
                  Совершите покупку в 
                  <nobr>интернет-магазине</nobr> и для вас будет оформлена
                  виртуальная бонусная карта
                </p>
              </div>
            </div>
            <div className="col-tl-4 col-mp-12 col-all">
              <div className="blockBox">
                {" "}
                <img
                  alt="В магазине"
                  className="blockBoxIcon"
                  src="https://cdn.bigam.ru/medialibrary/000/icon_05.png"
                />
                <h4>В магазине</h4>
                <p>
                  Оформите бонусную карту у кассира в любом розничном магазине
                  Бигам
                </p>
              </div>
            </div>
            <div className="col-tl-4 col-mp-12 col-all">
              <div className="blockBox">
                {" "}
                <img
                  alt="В мобильном приложении"
                  className="blockBoxIcon"
                  src="https://cdn.bigam.ru/medialibrary/000/icon_06.png"
                />
                <h4>В мобильном приложении</h4>
                <p>Установите мобильное приложение и авторизуйтесь в нем</p>
              </div>
            </div>
          </div>
          <a id="content_03" />
          <div className="row">
            <div className="col-tl-12 col-mp-12 col-all">
              {" "}
              <img
                alt="Как копить и тратить бонусы?"
                src="https://cdn.bigam.ru/medialibrary/000/Group 3072 (1).png"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-tl-12 col-mp-12 col-all">
              <h2>Как узнать свой бонусный баланс?</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-tl-4 col-mp-12 col-all">
              <div className="blockBox">
                {" "}
                <img
                  alt="Спросите у менеджера или кассира в магазине"
                  className="blockBoxIcon"
                  src="https://cdn.bigam.ru/medialibrary/000/icon_07.png"
                />
                <h4>Спросите у менеджера или кассира в магазине</h4>
              </div>
            </div>
            <div className="col-tl-4 col-mp-12 col-all">
              <div className="blockBox">
                {" "}
                <img
                  alt="В мобильном приложении"
                  className="blockBoxIcon"
                  src="https://cdn.bigam.ru/medialibrary/000/icon_08.png"
                />
                <h4>В мобильном приложении или на сайте в личном кабинете</h4>
              </div>
            </div>
            <div className="col-tl-4 col-mp-12 col-all">
              <div className="blockBox">
                {" "}
                <img
                  alt="По телефону 88005556973"
                  className="blockBoxIcon"
                  src="https://cdn.bigam.ru/medialibrary/000/icon_09.png"
                />
                <h4>
                  По телефону{" "}
                  <a href="tel:+78005556973">
                    <br />8 800 555 69 73
                  </a>
                </h4>{" "}
                <a href="tel:+78005556973"> </a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-tl-12 col-mp-12 col-all">
              <div className="blockBox blockBoxRules">
                <div className="row" id="blockLinkOpen">
                  <div className="col-tl-8 col-mp-8 col-all">
                    <p
                      style={{
                        fontWeight: "500",
                      }}>
                      Подробные правила бонусной программы
                    </p>
                  </div>
                  <div className="col-tl-4 col-mp-4 col-all">
                    {" "}
                    <a className="linkOpen" href="#blockRules">
                      <img
                        alt="Подробные правила бонусной программы"
                        className="linkOpenImg"
                        src="https://cdn.bigam.ru/medialibrary/000/linkOpen.png"
                      />
                      <img
                        alt="Подробные правила бонусной программы"
                        className="linkOpenImgOver"
                        src="https://cdn.bigam.ru/medialibrary/000/linkOpenOver.png"
                      />
                    </a>
                  </div>
                </div>
                <div id="blockRules">
                  <h2>Правила участия в программе лояльности Бигам</h2>
                  <ol>
                    <li>Регистрация в программе</li>
                    <li>Начисление Бонусов</li>
                    <li>Порядок активации Бонусов</li>
                    <li>Порядок использования (списания) и сгорания Бонусов</li>
                    <li>Получение информации в рамках программы</li>
                    <li>Прочие положения</li>
                  </ol>
                  <p>
                    {" "}
                    <strong>Определения:</strong>
                  </p>
                  <p>
                    {" "}
                    <strong>Бигам</strong>
                     — ООО «Бигам Инвест» (ОГРН 112 760 401 05 55. Юр. адрес: г.
                    Ярославль, Силикатное ш., 15.).
                  </p>
                  <p>
                    {" "}
                    <strong>Магазины Бигам</strong>
                     — розничные магазины Бигам и Интернет-магазин
                    <a href="/">www.bigam.ru</a> на Территории действия
                    Программы.
                  </p>
                  <p>
                    {" "}
                    <strong>Программа</strong>
                     — бонусная программа лояльности ООО «Бигам-Инвест»,
                    являющаяся мероприятием, направленным на привлечение
                    покупателей и стимулирование продаж в магазинах Бигам, и
                    действующая на Территории действия программы.
                  </p>
                  <p>
                    {" "}
                    <strong>Территория действия программы</strong>
                     — Российская Федерация.
                  </p>
                  <p>
                    {" "}
                    <strong>Участник программы/ Участник</strong>
                     — физическое лицо, достигшее совершеннолетия и получившее
                    или выразившее свое желание получить Карту.
                  </p>
                  <p>
                    {" "}
                    <strong>Карта</strong>
                     — пластиковая или виртуальная карта Программы, или ее
                    изображения в электронном виде (штрих-код), а также
                    уникальный номер, присвоенный Участнику при регистрации в
                    Программе, является собственностью Бигам. Карта не именная,
                    т.е. на предъявителя. Срок действия Карты не ограничен.
                  </p>
                  <p>
                    {" "}
                    <strong>Виртуальная карта</strong>
                     — уникальный в рамках Программы номер, который используется
                    для идентификации Участника в Программе, присвоенный
                    Участнику при регистрации в Программе.
                  </p>
                  <p>
                    {" "}
                    <strong>Способы получения Карты</strong>
                     — при обращении к сотруднику розничного магазина Бигам, при
                    первой регистрации в мобильном приложении Бигам, при
                    оформлении интернет-заказа на сайте{" "}
                    <a href="/">www.bigam.ru</a>.
                  </p>
                  <p>
                    {" "}
                    <strong>Активированная карта - </strong>с подтверждением
                    Участника, что он согласен с Правилами участия в бонусной
                    Программе лояльности.
                  </p>
                  <p>
                    {" "}
                    <strong>Неактивированная карта - </strong>
                    карта, созданная по инициативе Участника, но без согласия с
                    Правилами участия в бонусной программе лояльности.
                  </p>
                  <p>
                    {" "}
                    <strong>Активация Карты</strong>
                     — подтверждение согласия с Правилами участия в бонусной
                    программе лояльности и подтверждение факта владения
                    указанным номером телефона путем сообщения сотруднику
                    магазина кода активации, пришедшего по SMS, либо путем
                    подтверждения телефона в мобильном приложении Бигам.
                  </p>
                  <p>
                    {" "}
                    <strong>Единая Информационная служба</strong>
                     — единая информационная служба Бигам, доступная по телефону
                    8-800-555-69-73.
                  </p>
                  <p>
                    {" "}
                    <strong>Рекламная акция</strong>
                     — мероприятие, направленное на привлечение покупателей и
                    стимулирование продаж в магазинах Бигам.
                  </p>
                  <p>
                    {" "}
                    <strong>Бонусы</strong>
                     — размер скидки, которая может быть предоставлена Участнику
                    программы в соответствии с настоящими Правилами. Бонусы не
                    подлежат обмену на наличные денежные средства.
                  </p>
                  <p>
                    {" "}
                    <strong>Активный бонус</strong>
                     — размер скидки, подлежащий предоставлению Участнику
                    программы в соответствии с условиями и ограничениями,
                    предусмотренными настоящими Правилами. Срок активации
                    Бонусов за
                  </p>
                  <p>
                    {" "}
                    <strong>Скидочные средства</strong>
                     — промокоды, купоны, сертификаты, акционные бонусы.
                  </p>
                  <h3>1. Регистрация в Программе</h3>
                  <div></div> <b>1.1</b> Для участия в Программе Участнику
                  необходимо получить Карту и активировать ее в Программе путем:
                  <br /> <b>1.1.1</b>
                   Предоставления персональных данных сотруднику магазина и
                  сообщения кода активации, пришедшему покупателю по SMS. <br />{" "}
                  <b>1.1.2.</b>
                   Заполнения Анкеты при регистрации в мобильном приложении
                  <br /> <b>1.1.3. </b>
                  Оформления заказа в интернет-магазине Бигам и активировании на
                  кассе в розничном магазине Бигам.
                  <br />{" "}
                  <b>
                    <br />{" "}
                  </b>{" "}
                  <b>1.2.</b>
                   С момента регистрации Участник самостоятельно контролирует
                  изменение персональных данных (в т.ч. e-mail, номер телефона и
                  т.д.). Участник может скорректировать свои персональные
                  данные, позвонив по телефону Информационной службы. На все
                  остальные корректировки Участник заполняет новую Анкету на
                  стойке сервиса в любом розничном магазине Бигам. <br /> <br />{" "}
                  <b>1.3.</b>
                   В случае указания ложных (недостоверных) сведений о себе, а
                  также при несвоевременном изменении некорректных сведений
                  Участник самостоятельно несет риск любых негативных
                  последствий, связанных с предоставлением неверных сведений.{" "}
                  <br /> <br /> <b>1.4.</b>
                   По не прошедшим активацию Картам, списание Бонусов при оплате
                  товаров не производится.
                  <br />
                  <h3>2. Начисление Бонусов</h3>
                  <h4>2.1 Начисление основных бонусов</h4> <b>2.1.1.</b>{" "}
                  <b> </b>
                  Бонусы начисляются за покупку товаров Участником в Магазинах
                  Бигам в сроки, указанные в п.2.6 настоящих Правил, в следующем
                  порядке: <br /> <b>2.1.1.1. </b>
                  При оплате на кассе в розничном магазине Бигам и предъявлении
                  Карты или её номера, или номера мобильного телефона, который
                  был указан при регистрации Карты. Начисление Бонусов после
                  совершения покупки, по чеку, а также на карту другого лица (в
                  том числе, в следствие ошибочно предоставленных клиентом
                  данных при покупке) не производится. <br /> <b>2.1.1.2.</b>
                   При приобретении товаров в Интернет-магазине{" "}
                  <a href="/">www.bigam.ru</a> Бонусы начисляются на счет
                  Участника программы автоматически на Карту, привязанную к
                  номеру мобильного телефона, указанного клиентом при оформлении
                  заказа, либо при оформлении и/или подтверждении заказа по
                  телефону путем сообщения оператору номера телефона, который
                  был указан при регистрации Карты. Начисление бонусов
                  происходит до конца дня, следующего за днем приобритения
                  товара Участнику программы. <br /> <b>2.1.1.3.</b>
                   Бонусы не начисляются за покупку следующих товаров/ услуг:
                  <br /> <b>2.1.1.3.1.</b>
                   Подарочные карты;
                  <br /> <b>2.1.1.3.2.</b>
                   Оплата дополнительных услуг (в т.ч. доставка)
                  <br /> <b>2.1.1.3.3.</b> Сертификаты дополнительного
                  обслуживания (СДО)
                  <div>
                    {" "}
                    <b>
                      <br />{" "}
                    </b>
                    <b>2.1.1.4.</b>
                     Бонусы начисляются на стоимость товара, оплаченную
                    денежными средствами, в т.ч. с использованием подарочных
                    карт, после применения Скидочных средств.
                    <br /> <b>2.1.1.5.</b>
                     При возврате товара Бонусы, начисленные за покупку этого
                    товара, возвращаются Участнику программы.
                    <br /> <b>2.1.1.6.</b>
                     В случае оплаты товара частями Бонусы начисляются после
                    оплаты 100% его стоимости и передачи товара клиенту. <br />{" "}
                    <b>2.1.1.7.</b>
                     Бигам по своему усмотрению может установить иные основания
                    (случаи) начисления и/или неначисления Бонусов, в том числе
                    в отношении отдельных товаров, для отдельных категорий
                    Участников программы. <br /> <br /> <b>2.1.2.</b>
                     Размер начисляемых Бонусов: <br /> <b>2.1.2.1.</b>
                     Бонусы с покупок: 1% от оплаченной денежными средствами
                    стоимости каждого отдельного товара с желтым ценником в
                    Магазинах Бигам (кроме периода распродаж) и на все товары из
                    интернет-магазина и 3% на все товары с белым ценником.
                    (Базовое начисление). За оплату товара на кассе в розничном
                    магазине по QR-коду и NFC начисляются бонусы в размере 5%
                    независимо от цвета ценника (5% начисляется при условии 100%
                    оплаты по QR-коду и NFC, при этом Базовое начисление при
                    покупке таких товаров не производится). <br />{" "}
                    <b>2.1.2.2.</b>
                    <b></b>
                    100 приветственных Бонусов (Приветственный бонус) за первую
                    покупку, предусматривающую начисление Бонуснов в
                    соответствии с настоящими Правилами, на бонусный счёт
                    Участника программы.
                    <br /> <b>2.1.2.3.</b> 200 Бонусов за первую установку
                    мобильного приложения. Начисляются в течении суток с момента
                    первой установки мобильного приложения.
                    <br /> <b>2.1.3.</b>
                     Бонусы, начисляемые в соответствии с п.2.1.2.1, суммируются
                    с Бонусами, начисляемыми в соответствии с п.2.1.2.2.,
                    п.2.1.2.3.
                  </div>
                  <div>
                    {" "}
                    <b>2.1.4.</b>
                     Сроки начисления Бонуснов на бонусный счет: <br />{" "}
                    <b>2.1.4.1.</b>
                     При покупках в розничных магазинах Бигам Бонусы начисляются
                    в течение одного дня с даты полной оплаты покупки. <br />{" "}
                    <b>2.1.4.2.</b>
                     При покупках в Интернет-магазине
                    <a href="/">www.bigam.ru</a>
                    Бонусы начисляются в течение одного дня с даты передачи
                    товара Участнику программы.
                    <h3>2.2. Начисление Акционных Бонусов</h3> <b>2.2.1.</b>{" "}
                    3000 Бонусов на День Рождения Участника программы
                    (начисляются при наличии заполненной даты рождения в профиле
                    клиента). Начисляются за 3 дня до даты рождения, указанной в
                    профиле клиента.
                    <br /> <b>2.2.2.</b> Сроки, размеры и процент начисления
                    других Акционных Бонусов зависят от правил проведения
                    конкретной акции.
                    <br /> <b>2.2.3.</b> При возврате товара Акционные Бонусы,
                    использованные при оплате покупки этого товара, возвращаются
                    Участнику программы только при условии, что Акционные бонусы
                    все еще действуют в рамках правил проведения конкретной
                    акции.
                    <br />
                  </div>
                  <h3>
                    <b>3.</b> Порядок активации Бонусов
                  </h3>
                  <h4>
                    <b>3.1.</b> Активация Основных бонусов
                  </h4>{" "}
                  <br /> <b>3.1.1.</b> Бонусы с покупок активируются
                  автоматически по истечении 16 (шестнадцати) дней с даты
                  начисления на бонусный счет при условии регистрации Участника
                  в Программе. <br /> <b>3.1.2.</b>
                    Другие виды Бонусов. указанные в п. 2.1.2.2. активированы в
                  момент их начисления.
                  <br />
                  <h4>
                    <b>3.2.</b> Активация Акционных бонусов
                  </h4>
                  <b>3.2.1.</b>
                    Акционные бонусы активируются в сроки, указанные в правилах
                  конкретной акции.
                  <br /> <b>3.2.2.</b>
                   Акционные Бонусы, начисляемые при покупке товаров в период
                  распродажи, активируются автоматически на следующий день после
                  покупки.
                  <br /> <br />
                  <h4>
                    <b>3.3.</b> Отображение бонусного баланса
                  </h4>
                   Актуальное состояние баланса Бонусов на бонусном счёте можно
                  узнать:
                  <br />
                  <ul>
                    <li>В мобильном приложении Бигам; </li>
                    <li>у кассиров в розничных магазинах Бигам;</li>
                    <li>по телефону Информационной службы;</li>
                    <li>на кассовом чеке после совершения покупки;</li>
                    <li>
                      в личном кабинете на сайте <a href="/">www.bigam.ru</a>
                    </li>
                  </ul>{" "}
                  <b
                    style={{
                      fontFamily: "Verdana, Arial",
                      fontSize: "12px",
                    }}>
                    <h3 />{" "}
                  </b>
                  <h3>
                    4. Общие правила использования (списания) и сгорания Бонусов
                  </h3>{" "}
                  <br /> <b>4.1.</b>
                   Участник программы может использовать целое число Бонусов для
                  получения скидки при оплате товаров, за исключением товаров,
                  перечисленных в п. 4.8. Максимальный размер скидки с учетом
                  положений п. 4.2. настоящих Правил не может быть более 30% от
                  стоимости товара. <br />1 Бонус равен скидке на 1 рубль РФ.{" "}
                  <br /> <b>4.2.</b> Списание Бонусов допустимо только с
                  Бонусных карт, имеющий статус «Активирована».
                  <br /> <b>4.3.</b>
                   Использование Бонусов для получения скидки при оплате
                  товаров, на которые в соответствии с условиями Рекламных акций
                  Бигам уже предоставлены скидки не допускается, если иное не
                  предусмотрено настоящими Правилами. <br />
                  Клиент сам принимает решение о покупке по акционной цене без
                  списания Бонусов, либо о покупке товара по регулярной
                  (неакционной) цене и при этом списании Бонусов. <br />{" "}
                  <b>4.4.</b>
                   Использованию подлежит только целое число Активированных
                  бонусов (скидки) (см. Раздел 3 Правил).
                  <br /> <b>4.5.</b>
                   Использование (списание) Бонусов с бонусного счета Участника
                  программы производится в момент применения бонусов при заказе
                  товаров в интернет-магазине, при оплате товаров на кассе
                  розничного магазина.
                  <br /> <b>4.6.</b>В розничных магазинах Бигам необходимо в
                  момент оплаты товаров на кассе предъявить Карту или сообщить
                  номер телефона, который был указан при регистрации Карты. На
                  указанный номер телефона Участник программы получит
                  проверочный код, который необходимо сообщить кассиру для
                  завершения операции по списанию Бонусов. <br />
                  <b>4.7.</b>
                   Использование бонусов при оформлении заказа на сайте
                  интернет-магазина <a href="/">www.bigam.ru</a>
                  :
                  <br /> <b>4.7.1</b>
                   При оформлении заказа необходимо указать номер мобильного
                  телефона, к которому привязана Карта (авторизоваться на
                  сайте), либо при оформлении и/или подтверждении заказа по
                  телефону сообщить номер телефона, к которому привязана Карта
                  оператору.
                  <br /> <b>4.7.2</b>
                   Для списания Бонусов при совершении заказов на сайте
                  Интернет-магазина{" "}
                  <a href="https://www.bigam.ru">www.bigam.ru</a> и в мобильном
                  приложении в форме заказа необходимо поставить галочку возле
                  соответствующего поля. Количество Бонусов, подлежащих
                  списанию, будет рассчитано автоматически.
                  <br /> <b>4.7.3</b>
                   Процент скидки с применением Бонусов при совершении заказов
                  на сайте Интернет-магазина{" "}
                  <a href="https://www.bigam.ru">www.bigam.ru</a> и в мобильном
                  приложении может различаться в зависимости от товаров.
                  Максимальный процент скидки с учетом Бонусов не может
                  превышать 30%.
                  <br /> <b>4.7.4</b>
                   При оплате товара, заказанного на сайте Интернет-магазина{" "}
                  <a href="https://www.bigam.ru">www.bigam.ru</a> или в
                  мобильном приложении с примененными Бонусами на этапе
                  оформления заказа, дополнительно списать бонусы на кассе
                  розничного магазина невозможно.
                  <br /> <b>4.7.5</b>
                   При оплате товара, заказанного на сайте Интернет-магазина{" "}
                  <a href="https://www.bigam.ru">www.bigam.ru</a> или в
                  мобильном приложении без применения Бонусов на этапе
                  оформления заказа, Бонусы возможно применить на кассе
                  розничного магазина. В этом случае процент скидки с
                  использованием Бонусов будет рассчитан автоматически в
                  соответствии с п. 4.7.3.
                  <br /> <b>4.7.6</b>
                   При покупке товаров в розничном магазине по ценам и условиям
                  Интернет-магазина, использование бонусов осуществляется в
                  соответствии с правилами, действующими в Интернет-магазине и
                  указанными п. 4.7.1, п. 4.7.3, п. 4.7.4, п. 4.7.5.
                  <br /> <b>4.8.</b>
                   С использованием Бонусов не могут быть оплачены следующие
                  товары/ услуги: <br /> <b>4.8.1.</b>
                   Товары, отмеченные желтыми ценниками; <br /> <b>4.8.2.</b>
                   Подарочные карты; <br /> <b>4.8.3.</b>
                   Услуги; <br /> <b>4.8.4.</b>
                   Первоначальный взнос при покупке товаров в кредит; <br />{" "}
                  <b>4.8.5.</b>
                   Товары исключения, определенные компанией Бигам в
                  одностороннем порядке;
                  <br /> <b>4.8.6.</b> Уцененные товары <br /> <b>4.8.7.</b>
                  Сертификаты дополнительного обслуживания (СДО) <br />{" "}
                  <b>4.9.</b>
                   Бигам по своему усмотрению может вводить ограничения на
                  использование Бонусов при приобретении товаров и услуг. <br />{" "}
                  <b>4.10.</b>
                   В случае использования Бонусов на приобретение двух и более
                  товаров, скидка предоставляется в отношении каждого товара
                  пропорционально их стоимости, но не более суммы Активных
                  Бонусов на бонусном счёте Участника на дату покупки. <br />{" "}
                  <b>4.11. </b>В случае возврата товара, частично оплаченного с
                  использованием Бонусов, Бонусы будут возвращены на бонусный
                  счет Участника в течение суток с даты возврата. <br />{" "}
                  <b>4.12.</b>
                   Бонусы списываются в хронологическом порядке: сначала
                  списываются Бонусы с более ранней датой сгорания. <br />{" "}
                  <b>4.13. </b>
                  По истечению срока действия Бонусы сгорают и не подлежат
                  восстановлению.
                  <br /> <b>4.14.</b>
                  <b>.</b>
                   Бонусы не подлежат обмену на наличные денежные средства.
                  <br /> <b>4.15. </b>
                  Участник, включая, но не ограничиваясь, не вправе выполнять
                  любое из следующих действий
                  <br />
                  <ul>
                    <li>
                      дарить, продавать, либо иным образом отчуждать Бонусы,
                      либо права на их получение другим Участникам или иным
                      третьим лицам;{" "}
                    </li>
                    <li>
                      передавать Бонусы, либо права на их получение в залог,
                      либо иным образом накладывать обременения на них и/или на
                      права на их получение.{" "}
                    </li>
                  </ul>{" "}
                  <b>4.16.</b>
                   Бонусы не суммируются с другими Скидочными средствами, т.е.
                  одновременный прием Бонусов и каких-либо иных Скидочных
                  средств в один чек невозможен. В случае наличия у Участника
                  программы нескольких типов Скидочных средств, Участник
                  программы самостоятельно выбирает для использования одно любое
                  из имеющихся у него Скидочных средств. <br /> <b>4.17</b>
                  . Участник программы может предъявить на кассе только одну
                  Карту, для начисления и/или использования Бонусов. <br />{" "}
                  <b>4.18.</b>
                  <b></b>В случае оплаты товара с помощью банковского перевода
                  использование Бонусов не предусмотрено. <br /> <br />
                  <h3>5. Использование/сгорание Основных Бонусов</h3>{" "}
                  <b>5.1.</b> Максимальный размер скидки за счет списания
                  Основных Бонусов с учетом положений п. 4.2. настоящих Правил
                  не может быть более 30% от стоимости товара. <br />{" "}
                  <b>5.2. </b>
                  Срок действия Основных Бонусов — срок, в течение которого
                  Бонусы могут быть использованы Участником программы,
                  составляет 120 (сто двадцать) календарных дней со дня их
                  Начисления. Бонусный баланс полностью сгорает, если за 120
                  дней клиент не совершит ни одной покупки и не получит новых
                  бонусных поступлений, указанных в п. 2.1.2.1, п. 2.1.2.2, п.
                  2.1.2.3.
                  <br /> <b>5.3.</b> Если после совершения покупки сумма
                  Основных Бонусов на бонусном счёте списана не полностью, то
                  неиспользованный остаток остаётся доступным для списания, и
                  срок сгорания оставшихся Основных Бонусов продлевается на 120
                  дней.
                  <br /> <b>5.4.</b> При начислении Основных Бонусов на бонусный
                  счет после совершения покупки или Бонусов, указанных в п. п.
                  2.1.2.1, п. 2.1.2.2, п. 2.1.2.3 весь активный баланс Основных
                  Бонусов продляет срок действия еще на 120 дней.
                  <br />
                  <h3>6. Использование/сгорание Акционных Бонусов</h3>{" "}
                  <b>6.1.</b>
                   Срок действия Акционных бонусов на День рождения составляет
                  11 дней с момента начисления. Сроки действия и правила
                  использования остальных Акционных бонусов Бигам указаны в
                  правилах проведения конкретной акции.
                  <br /> <b>6.2.</b>
                   Максимальный размер скидки за счет списания Акционных Бонусов
                  с учетом положений п. 4.2. настоящих Правил не может быть
                  более 10% от стоимости товара, если иное не прописано в
                  правилах Акции.
                  <br />{" "}
                  <span
                    style={{
                      fontWeight: "bold",
                    }}>
                    <h3> 7. Получение информации в рамках Программы </h3>{" "}
                  </span>
                  <p></p>
                  <p></p>
                  <div>
                    {" "}
                    <b>7.1.</b>
                     Активируя карту Бигам, Участник соглашается на получение,
                    рекламно-информационных материалов в виде sms-сообщений и
                    входящих звонков на указанный Участником номер телефона
                    и/или e-mail рассылок на указанный Участником e-mail адрес,
                    а также на обработку, систематизацию, уточнение (обновление,
                    изменение), извлечение, хранение и использование
                    персональных данных, содержащихся в Анкете с целью
                    направления указанной выше информации, в том числе на
                    передачу персональных данных третьим лицам, привлекаемым к
                    исполнениям указанных действий.
                    <br /> <b>7.2.</b>
                     Для отзыва согласия на обработку персональных данных
                    необходимо подать заявление в письменной форме по месту
                    нахождения Бигам. <br /> <b>7.3.</b> Для отзыва согласия на
                    получение рекламно-информационных материалов и для изменения
                    предпочтительных каналов связи – участник может обратиться в
                    Информационную службу по телефону или написать заявление в
                    письменной форме по месту нахождения Бигам.
                    <br /> <b>7.4.</b>
                     Регистрируясь в программе, Участник подтверждает, что все
                    указанные в Анкете данные (в том числе номер телефона и
                    e-mail адрес) верны и принадлежат Участнику, Участник готов
                    понести все риски в полном объеме, которые могут возникнуть
                    в связи с указанием Участником некорректных данных в Анкете.
                    <br /> <b>7.5.</b>
                    <b></b>
                    В случае получения Бигам отзыва согласия в соответствии с
                    п.5.2 настоящих Правил регистрация Участника прекращается по
                    истечении срока, указанного в п.5.1. настоящих Правил. Все
                    начисленные Бонусы, бонусный счёт и Карта блокируются/
                    аннулируются.
                    <br /> <b>7.6.</b>
                     Дополнительную информацию о накопленных Бонусных рублях,
                    новостях и акциях Бигам можно получить в Информационной
                    службе либо на сайте <a href="/">www.bigam.ru</a>
                    <br /> <br />
                  </div>
                  <h3>8. Прочие положения</h3>
                  <p
                    style={{
                      fontFamily: "Verdana, Arial",
                      fontSize: "12px",
                    }}></p>
                  <div>
                    {" "}
                    <b>8.1.</b>
                     Для блокировки Карты или изменения персональных данных
                    необходимо позвонить в Информационную службу Бигам.
                    <br /> <b>8.2.</b>
                     Бигам имеет право в одностороннем порядке заблокировать
                    Карту и бонусный счет, если у Бигам есть обоснованные
                    основания полагать, что Карта используется недобросовестно
                    или используется не Участником программы без согласия
                    Участника программы.
                    <br /> <b>8.3.</b>
                     Бигам не несет ответственности за любые убытки Участника
                    программы, включая, но не ограничиваясь убытками,
                    нанесенными в результате несанкционированного использования
                    Карты и доступа к бонусному счету и персональным данным по
                    вине и/или небрежности Участника и/или без таковых; в
                    случаях совершения административных правонарушений
                    (уголовных преступлений) третьими лицами и/или Участником
                    программы; в случае действия обстоятельств непреодолимой
                    силы (Форс-мажор).
                    <br /> <b>8.4.</b>
                     Срок действия Программы не ограничен. Бигам имеет право в
                    любой момент прекратить действие Программы, разместив
                    информацию о прекращении в Магазинах Бигам и на сайте{" "}
                    <a href="/">www.bigam.ru</a> <br /> <b>8.5. </b>
                    Бигам имеет право в любой момент в одностороннем порядке
                    изменять условия Программы. Условия Программы с изменениями
                    публикуются на сайте <a href="/">www.bigam.ru</a>
                    .
                    <br /> <b>8.6. </b>
                    Уведомление Участников программы о любых изменениях в
                    настоящих Правилах осуществляется способом, указанным в
                    п.6.5. и является надлежащим.
                    <br /> <b>8.7. </b>
                    По техническим причинам (отказ или сбой в работе каналов
                    связи, перебои в электропитании, а также в иных случаях
                    технического и/или технологического сбоя работы оборудования
                    и программного обеспечения) Бигам имеет право временно
                    приостановить выполнение операций по Карте, а также действие
                    настоящей Программы.
                    <br /> <b>8.8.</b>
                     Документом, подтверждающим обязанность Бигам начислить
                    Бонусы на бонусный счет Участника, является кассовый чек на
                    бумажном носителе с информацией о начисленных Бонусных
                    рублях и номером Карты. Все претензии по факту начисления
                    Бонусов рассматриваются Бигам только при предъявлении
                    документа, указанного выше.
                    <br /> <b>8.9.</b>
                     В отдельных случаях Бигам вправе при предъявлении
                    Участником требования о списании Бонусов (в том числе при
                    заказе товара в Интернет-магазине{" "}
                    <a href="/">www.bigam.ru</a>
                    ) потребовать от Участника документ, удостоверяющий
                    личность. Не предоставление документа, удостоверяющего
                    личность, является основанием для отказа в списании Бонусов.
                    <br /> <b>8.10.</b>
                     По одной и той же Карте можно совершать не более 5 (пяти)
                    операций начисления Бонусов в течение одного дня.
                    <br /> <b>8.11.</b>
                     Бонусы могут быть списаны по инициативе Бигам без
                    предварительного уведомления Участника программы, в случае
                    если они были начислены на бонусный счет Участника ошибочно,
                    в результате действий Участника или иного лица, содержащих
                    элементы недобросовестности, или по иным основаниям,
                    определенным по решению Бигам.
                    <br /> <b>8.12.</b>
                     Бигам может проводить акции по восстановлению сгоревших
                    Бонусов.
                    <br /> <b>8.13.</b>
                     Бигам вправе прекратить участие в Программе любого
                    Участника и заблокировать/аннулировать бонусный счет без
                    уведомления в случаях, если <br />
                    Участник: <br />
                    <ul>
                      <li>
                        Не соблюдает настоящие Правила, а также условия иных
                        акций Бигам;{" "}
                      </li>
                      <li>
                        Совершил или намеревается совершить действия, имеющие
                        значимые признаки мошенничества, обмана или прочие
                        манипуляции, которые повлекли или могут повлечь за собой
                        материальный ущерб / убытки, моральные и прочие
                        негативные последствия;{" "}
                      </li>
                      <li>
                        Злоупотребляет какими-либо правами, предоставляемыми
                        Участнику в рамках Программы;
                      </li>
                      <li>
                        В случае если Участник не зарегистрировался в программе,
                        либо указал неверные данные при регистрации, и это не
                        позволяет его идентифицировать надлежащим образом;{" "}
                      </li>
                      <li>
                        Предоставляет информацию (сведения), вводящую в
                        заблуждение, либо не соответствующую действительности;
                      </li>
                      <li>
                        В соответствии с требованиями действующего
                        законодательства;
                      </li>
                      <li>
                        В случае если факты свидетельствуют о том, что покупки
                        Участника совершаются в предпринимательских целях, то
                        есть, с целью последующей реализации/перепродажи
                        товаров.{" "}
                      </li>
                    </ul>{" "}
                    <br /> <b>8.14. </b>
                    Если Карта используется с нарушением настоящих Правил, норм
                    законодательства Российской Федерации, с целью совершения
                    недобросовестных действий, она может быть заблокирована
                    персоналом Бигам. <br /> <b>8.15.</b>
                     Юридические лица, а также их представители не могут
                    использовать Карту для совершения покупок, даже если они
                    являются держателями Карты.
                    <br /> <b>8.16. </b>
                    На одно физическое лицо может быть оформлена только одна
                    Карта. Бигам вправе отказать Участнику в повторной
                    регистрации в Программе при обнаружении ранее оформленной на
                    данное физическое лицо Карты.
                  </div>
                </div>
              </div>
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
