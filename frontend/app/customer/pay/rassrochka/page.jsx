"use client";

import Breadcrumbs from "../../../components/Breadcrumbs";

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
            <h1>Рассрочка и кредит</h1>
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
                  <a
                    className="page-static-menu__link nuxt-link-active"
                    href="/customer/pay/"
                  >
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
                    className="page-static-menu__link"
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
              <p>
                Нашли желанный товар по отличной цене или срочно нужен
                инструмент? Не упустите возможность его приобрести! В нашем
                магазине можно купить товар в рассрочку.
              </p>
              <p>
                Для комфортного совершения покупок и оформления заказов в
                интернет-магазине BREMAX действуют системы рассрочки:
              </p>
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  fontSize: "30px",
                  gap: "20px",
                }}
              >
                {" "}
                <a href="#playt">Плайт </a> <a href="#halvacard">Халва </a>{" "}
                <a href="#faq">FAQ </a>
              </div>
              <h2 id="playt">Покупки в рассрочку по программе Плайт</h2>
              <p>
                Рассрочка без участия банка? Легко! Можно оплатить 25% стоимости
                товара и пользоваться им уже сейчас.
              </p>
              <p>
                Благодаря программе{" "}
                <a href="https://plait.ru/" rel="nofollow">
                  Плайт
                </a>{" "}
                стоимость товара разбивается на несколько платежей, которые в
                указанные периоды списываются с карты покупателя.
              </p>
              <p>
                {" "}
                <strong>Условия:</strong>
              </p>
              <ul>
                <li>От 4 до 6 платежей на ваш выбор.</li>
                <li>
                  При оформлении заказа оплачивается 25% общей суммы. После
                  внесения товар уже можно получить.
                </li>
                <li>Срок выплат – до 1,5 месяцев.</li>
                <li>Автоматическое списание суммы платежа с карты.</li>
              </ul>
              <p>
                {" "}
                <strong>Преимущества:</strong>
              </p>
              <ul>
                <li>Используется с картой любого банка.</li>
                <li>Нет переплат.</li>
                <li>Не нужно обращаться в банк и заключать договор.</li>
                <li>Быстрое подтверждение покупки по СМС.</li>
              </ul>
              <p>
                {" "}
                <strong>Рассрочка предоставляется при:</strong>
              </p>
              <ul>
                <li>Оплате онлайн.</li>
                <li>Оформлении заказа физическим лицом.</li>
                <li>Стоимости заказа от 100 рублей до 50 тысяч.</li>
                <li>
                  Условии полной оплаты заказанного товара (на предоплату не
                  распространяется).
                </li>
                <li>
                  Разных способах доставки товара: самовывозе из розничного
                  магазина BREMAX, доставке курьером или на пункт выдачи.
                </li>
              </ul>
              <p>
                {" "}
                <strong>Как купить инструмент по программе Плайт</strong>
              </p>
              <p>
                Рассказываем пошагово, как купить инструмент в рассрочку при
                использовании Плайт.
              </p>
              <ol>
                <li>
                  Отметить нужные товары из "Корзины" на сайте BREMAX.{" "}
                  <img
                    alt="Отметить нужные товары из Корзины"
                    height="534"
                    src="https://cdn.bigam.ru/medialibrary/a2b/ydeyjnjkoucyjuy2bo8z2fga9iafrzr3/korzina.jpg"
                    title="Отметить нужные товары из Корзины"
                    width="1024"
                  />{" "}
                </li>
                <li>
                  Выбрать рассрочку без переплат. Для этого флажок переводится
                  вправо на текущей странице.{" "}
                  <img
                    alt="Выбрать рассрочку"
                    height="223"
                    src="https://cdn.bigam.ru/medialibrary/21b/57gxumojjt5kix01fqq4s2x698kt41k9/flazhok.jpg"
                    title="Выбрать рассрочку"
                    width="415"
                  />
                  <p>
                    Или нажать "Перейти к оформлению" и в выборе оплаты отметить
                    "В рассрочку".{" "}
                    <img
                      alt="Выбрать способ оплаты"
                      height="542"
                      src="https://cdn.bigam.ru/medialibrary/bfb/560nu32rdbr5x0nb738w23eddauq9lgz/sposob-oplaty.jpg"
                      title="Выбрать способ оплаты"
                      width="1024"
                    />
                  </p>{" "}
                </li>
                <li>
                  При оформлении заказа на сайте придет СМС-уведомление о
                  присвоении ему номера. Далее откроется страница Плайт с
                  выбором графика платежей.
                  <img
                    alt="График платежей"
                    height="606"
                    src="https://cdn.bigam.ru/medialibrary/d83/dlj0o0ilbio499l360rcvc81itg4oinw/grafik-platezhei.jpg"
                    title="График платежей"
                    width="1024"
                  />
                  <p>
                    Нажимаем "Далее" и вводим телефон. Далее нужно заполнить
                    небольшую анкету, где указываются имя, фамилия, дата
                    рождения и электронная почта для проверки.
                  </p>{" "}
                </li>
                <li>
                  Если рассрочка одобрена, в открывшемся окне нужно ввести
                  данные карты для списания первого платежа.
                  <img
                    alt="Первый платеж"
                    height="575"
                    src="https://cdn.bigam.ru/medialibrary/b14/dprh98479pucnnwedv0e1g2j8m0dfcc2/pervyi-platezh.jpg"
                    title="Первый платеж"
                    width="1024"
                  />
                </li>
              </ol>
              <h2 id="halvacard">Покупки в рассрочку с картой Халва</h2>
              <p>
                Взять электроинструмент в рассрочку можно без первого взноса и
                переплат с картой{" "}
                <a href="https://halvacard.ru/" rel="nofollow">
                  Халва
                </a>
                .
              </p>
              <p>
                Халва – карта рассрочки, которая позволяет покупать товары у
                партнеров банка и в других магазинах без оплаты банковских
                процентов. Максимальный предоставляемый срок рассрочки – до 24
                месяцев.
              </p>
              <p>
                {" "}
                <strong>Условия</strong>:
              </p>
              <ul>
                <li>
                  Оплата производится из кредитного лимита. Также карту можно
                  использовать в качестве дебетовой.
                </li>
                <li>
                  Платеж разбивается на части в соответствии с предоставленным
                  сроком выплат.
                </li>
                <li>Нет оплаты процентов банку.</li>
                <li>Возможность получения кэшбека и процентов на остаток.</li>
                <li>За выпуск и обслуживание плата не взимается.</li>
              </ul>
              <p>
                Для получения лучших условий при покупке в интернет-магазине
                BREMAX можно оформить подписку "Халва. Десятка"
              </p>
              <p>
                Покупайте любые товары в BREMAX в беспроцентную рассрочку до 10
                месяцев!
              </p>
              <p>
                При подключении подписки «ХАЛВА.ДЕСЯТКА» любые покупки в BREMAX
                происходят с рассрочкой 10 месяцев!* Полные условия акции по{" "}
                <a href="https://halvacard.ru/halvadesyatka" rel="nofollow">
                  ссылке
                </a>
                .
              </p>
              <p
                style={{
                  fontSize: "12px",
                }}
              >
                Дисклеймер:
              </p>
              <p
                style={{
                  fontSize: "12px",
                }}
              >
                * Без подключения для клиентов BREMAX действует беспроцентная
                рассрочка сроком на 2 месяца. Карта рассрочки «Халва». Плата за
                обслуживание - 0 руб. Ставка в теч.льготного периода (36 мес.) -
                0% год. При его нарушении по окончании-10% годовых. Лимит - до
                350 000 руб. в теч.10 лет. Срок рассрочки 1-18 мес. Общ.сумма
                переплаты - 0 руб. По факту просрочки неустойка 20 % годовых на
                сумму просроченной задолженности (за каждый день просрочки с
                6-го дня). Клиентам 20-75 лет по паспорту РФ. Официальное
                трудоустройство (стаж на последнем месте работы не менее 4 мес).
                Наличие постоянной регистрации от 4 последних месяцев (на
                территории 1го населенного пункта РФ) и проживание в городе
                подразделений Банка или прилегающих населенных пунктах (но не
                более 70 км от любого ВСП Банка). Наличие стационарного рабочего
                или домашнего телефона. ПАО «Совкомбанк». Ген.лицензия ЦБРФ
                №963.
              </p>
              <h2 id="faq">FAQ</h2>
              <div itemScope itemType="https://schema.org/FAQPage">
                {" "}
                <strong
                  style={{
                    borderBottom: "2px solid #F2B705",
                    display: "block",
                    fontSize: "20px",
                    padding: "10px 15px",
                  }}
                >
                  Плайт
                </strong>
                <div
                  itemProp="mainEntity"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <p itemProp="name">
                    {" "}
                    <strong>Нужна ли карта конкретного банка?</strong>
                  </p>
                  <div
                    itemProp="acceptedAnswer"
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <div itemProp="text">
                      <p>
                        Нет. Для получения средств по программе вводятся данные
                        банковской карты любого банка.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  itemProp="mainEntity"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <p itemProp="name">
                    {" "}
                    <strong>Почему рассрочка может быть не одобрена?</strong>
                  </p>
                  <div
                    itemProp="acceptedAnswer"
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <div itemProp="text">
                      <p>
                        Информация о причинах неодобрения банком является
                        конфиденциальной и не передается в целях безопасности.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  itemProp="mainEntity"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <p itemProp="name">
                    {" "}
                    <strong>Возможно ли внести сумму досрочно?</strong>
                  </p>
                  <div
                    itemProp="acceptedAnswer"
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <div itemProp="text">
                      <p>
                        Нет. Списание платежей производиться по изначально
                        выбранному графику.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  itemProp="mainEntity"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <p itemProp="name">
                    {" "}
                    <strong>
                      Влияет ли плохая кредитная история на оформление?
                    </strong>
                  </p>
                  <div
                    itemProp="acceptedAnswer"
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <div itemProp="text">
                      <p>Рассрочка по программе не является кредитом.</p>
                    </div>
                  </div>
                </div>
                <div
                  itemProp="mainEntity"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <p itemProp="name">
                    {" "}
                    <strong>Как вернуть платеж при возврате товара?</strong>
                  </p>
                  <div
                    itemProp="acceptedAnswer"
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <div itemProp="text">
                      <p>
                        Возврат товара осуществляется в зависимости от способа
                        покупки. Возврат интернет-заказа производится через
                        интернет-магазин, для этого нужно позвонить по номеру
                        8-800-505-52-17. Товары, приобретенные на розничных
                        точка, принимаются в магазинах BREMAX.
                      </p>
                      <p>
                        Ознакомиться с правилами возврата товара в
                        интернет-магазине BREMAX можно по{" "}
                        <a href="/customer/returns/">ссылке</a>.
                      </p>
                      <p>
                        В случае возврата сумма оплаты за товар возвращается
                        покупателю магазином BREMAX. Какие-либо изменения в
                        программу Плайт не вносятся.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  itemProp="mainEntity"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <p itemProp="name">
                    {" "}
                    <strong>Можно ли пропускать платежи?</strong>
                  </p>
                  <div
                    itemProp="acceptedAnswer"
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <div itemProp="text">
                      <p>
                        В указанный срок сумма будет списываться автоматически.
                        Если на карте будет недостаточно средств, то банк будет
                        повторять попытки списания и при неудаче свяжется с
                        владельцем карты.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  itemProp="mainEntity"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <p itemProp="name">
                    {" "}
                    <strong>
                      Что делать, если возникли проблемы с использованием
                      программы Плайт?
                    </strong>
                  </p>
                  <div
                    itemProp="acceptedAnswer"
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <div itemProp="text">
                      <p>
                        Для получения информации можно обратиться по телефону
                        поддержки программы Плайт 8-800-302-02-51.
                      </p>
                    </div>
                  </div>
                </div>{" "}
                <strong
                  style={{
                    borderBottom: "2px solid #F2B705",
                    display: "block",
                    fontSize: "20px",
                    padding: "10px 15px",
                  }}
                >
                  Халва
                </strong>
                <div
                  itemProp="mainEntity"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <p itemProp="name">
                    {" "}
                    <strong>Основные условия и плюсы по карте Халва?</strong>
                  </p>
                  <div
                    itemProp="acceptedAnswer"
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <div itemProp="text">
                      <p>
                        Кэшбек на покупки у партнеров до 10% и отсутствие оплаты
                        процентов банку при получении рассрочки. До 17% на
                        остаток своих средств.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  itemProp="mainEntity"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <p itemProp="name">
                    {" "}
                    <strong>Халва или кредит?</strong>
                  </p>
                  <div
                    itemProp="acceptedAnswer"
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <div itemProp="text">
                      <p>
                        Средствами, взятыми в кредит, как и картой Халва, можно
                        оплатить покупку единовременно. Однако, при оформлении
                        кредита предстоит выплачивать проценты банку, нет
                        льготных периодов по выплате. Также получение кредита не
                        дает бонусов в виде процентов на остаток.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  itemProp="mainEntity"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <p itemProp="name">
                    {" "}
                    <strong>
                      Что будет, если платеж по карте не внесен своевременно?
                    </strong>
                  </p>
                  <div
                    itemProp="acceptedAnswer"
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <div itemProp="text">
                      <p>
                        У владельца есть еще 5 дней, чтобы внести необходимую
                        сумму. Далее будут действовать штрафные санкции.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  itemProp="mainEntity"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <p itemProp="name">
                    {" "}
                    <strong>
                      Каковы самая большая и малая суммы рассрочки на покупки по
                      Халве?
                    </strong>
                  </p>
                  <div
                    itemProp="acceptedAnswer"
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <div itemProp="text">
                      <p>От 10 копеек до 500 тысяч рублей.</p>
                    </div>
                  </div>
                </div>
                <div
                  itemProp="mainEntity"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <p itemProp="name">
                    {" "}
                    <strong>Как часто можно пользоваться Халвой?</strong>
                  </p>
                  <div
                    itemProp="acceptedAnswer"
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <div itemProp="text">
                      <p>
                        В рамках одобренной суммы количество покупок не
                        ограничивается.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  itemProp="mainEntity"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <p itemProp="name">
                    {" "}
                    <strong>
                      Можно ли погасить задолженность по Халве досрочно?
                    </strong>
                  </p>
                  <div
                    itemProp="acceptedAnswer"
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <div itemProp="text">
                      <p>
                        Это возможно. На карту необходимо внести перекрывающую
                        задолженность сумму.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  itemProp="mainEntity"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <p itemProp="name">
                    {" "}
                    <strong>
                      Есть ли уведомления об операциях по Халве? Какова их
                      стоимость?
                    </strong>
                  </p>
                  <div
                    itemProp="acceptedAnswer"
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <div itemProp="text">
                      <p>
                        Да. При операциях с картой на указанный при оформлении
                        телефон приходят push-уведомления или СМС.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  itemProp="mainEntity"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <p itemProp="name">
                    {" "}
                    <strong>
                      Что делать, если возникли проблемы с оплатой по Халве?
                    </strong>
                  </p>
                  <div
                    itemProp="acceptedAnswer"
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <div itemProp="text">
                      <p>
                        Для решения вопросов по карте можно обратиться на линию
                        поддержки физических лиц Халва по номеру
                        8-800-100-77-72.
                      </p>
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
