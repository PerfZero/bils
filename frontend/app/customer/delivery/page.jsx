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
                        <h1>Условия доставки и самовывоза для физических лиц</h1>
                    </div>{" "}
                    <div className="a-page-static__wrap">
                        <div className="a-page-static__style">
                            <style
                                dangerouslySetInnerHTML={{
                                    __html:
                                        ".static-pages-content__item-table {  border: none !important;  border-collapse: collapse;}.static-pages-content__item-table tr:nth-child(odd) {  background: #f8f8f8;}.static-pages-content__item-table tr td {  border: none;  padding: 12px;}",
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
                                    <a
                                        aria-current="page"
                                        className="page-static-menu__link nuxt-link-exact-active nuxt-link-active page-static-menu__link--active"
                                        href="/customer/delivery/">
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
                            <ol>
                                <li>
                                    <b>Самовывоз из Магазинов «Бигам» (Бесплатно)</b>
                                </li>
                                <ul>
                                    <li>
                                        Как это работает: Заберите ваш заказ самостоятельно в любом
                                        удобном розничном магазине «Бигам».{" "}
                                    </li>
                                    <li>Стоимость: абсолютно бесплатно при любой сумме заказа. </li>
                                    <li>
                                        Часы работы: Уточняйте график работы нужного вам магазина по
                                        ссылке: График работы магазинов{" "}
                                        <a href="https://bigam.ru/shops/" target="_blank">
                                            «Бигам»
                                        </a>
                                        .
                                    </li>
                                    <li>
                                        Оплата: Оплата заказа возможна онлайн при оформлении или
                                        наличными/картой при получении в магазине.{" "}
                                    </li>
                                    <li>
                                        Срок хранения: Готовый к выдаче заказ хранится 3 календарных дня.
                                        Пожалуйста, заберите его вовремя, если не сможете забрать –
                                        позвоните по бесплатному телефону: 8-800-555-69-73.{" "}
                                    </li>
                                </ul>
                                <li>
                                    {" "}
                                    <b>Курьерская Доставка (Платная)</b>
                                </li>
                                <ul>
                                    <li>
                                        Службы доставки: Мы сотрудничаем с проверенными партнерами:
                                        Яндекс.Доставка, СДЭК, DPD, а также используем нашу собственную
                                        курьерскую службу.{" "}
                                    </li>
                                    <li>
                                        Часы доставки: Курьеры работают с понедельника по воскресенье с
                                        09:00 до 22:00.{" "}
                                    </li>
                                    <li>Стоимость доставки: </li>
                                    <p>   - Москва (внутри МКАД): от 400 руб.</p>
                                    <p>
                                        - Города: Ярославль, Александров, Муром, Рыбинск, Тверь, Углич:
                                        от 450 руб.
                                    </p>
                                    <p>
                                        - Города: Владимир, Вологда, Иваново, Кинешма, Ковров,
                                        Кострома, Переславль-Залесский, Череповец, Калуга, Нижний
                                        Новгород, Рязань: от 500 руб.
                                    </p>
                                    <p>
                                        - Доставка по области: Точную стоимость уточняйте у наших
                                        менеджеров по бесплатному телефону: 8-800-555-69-73.
                                    </p>
                                    <li>
                                        Оплата доставки: оплачивается вместе с заказом онлайн или в вашем
                                        личном кабинете.
                                    </li>
                                    <li>Условия доставки:</li>
                                    <p>
                                        - Доставка осуществляется до подъезда (парадной) дома. Услуги
                                        подъема на этаж и заноса в квартиру не предоставляются.
                                    </p>
                                    <p>
                                        {`			    - Крупногабаритные/тяжелые товары (длина> 1 м, вес> 35 кг): Стоимость и условия доставки таких товаров обязательно согласовываются индивидуально с вашим менеджером при оформлении заказа.		`}
                                    </p>
                                    <p>
                                        - Проверка товара курьером: Курьер не проверяет
                                        работоспособность техники.
                                    </p>
                                </ul>
                                <li>
                                    {" "}
                                    <b>Согласование и Отслеживание</b>
                                </li>
                                <ul>
                                    <li>
                                        Выбор даты и времени: после оформления заказа с вами свяжется
                                        менеджер магазина, чтобы согласовать удобный для вас день и
                                        временной интервал доставки.
                                    </li>
                                    <li>
                                        Изменения в доставке: если вам потребуется изменить дату, время
                                        или другие детали доставки, пожалуйста, оперативно свяжитесь
                                        со своим менеджером.{" "}
                                    </li>
                                    <li>
                                        Статус заказа и вопросы: Все вопросы по срокам сборки заказа,
                                        точной стоимости доставки или отслеживанию отправления задавайте
                                        менеджерам по телефону: 8-800-555-69-73 (бесплатно по РФ).{" "}
                                    </li>
                                </ul>
                            </ol>
                            <p>
                                {" "}
                                <b>Важно! Проверка товара при получении:</b>
                            </p>
                            <ol>
                                <li>
                                    Осмотрите коробку: убедитесь в целостности упаковки, отсутствии
                                    повреждений, вмятин или следов вскрытия.{" "}
                                </li>
                                <li>
                                    Проверьте товар и комплектацию: Вскройте упаковку (при курьере или
                                    сотруднике магазина), осмотрите товар на предмет дефектов и
                                    убедитесь в наличии всей комплектации.{" "}
                                </li>
                                <li>Если обнаружена проблема (повреждение, брак, некомплект): </li>
                                <ul>
                                    <li>
                                        Немедленно сообщите об этом курьеру или сотруднику магазина.{" "}
                                    </li>
                                    <li>Не подтверждайте получение товара. </li>
                                    <li>
                                        Сразу позвоните нам по телефону 8-800-555-69-73 для решения
                                        вопроса.{" "}
                                    </li>
                                </ul>
                            </ol>
                        </div>
                    </div>
                </section>
            </div>

        </main>
    );
}
