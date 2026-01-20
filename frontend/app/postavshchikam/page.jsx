"use client";

import Breadcrumbs from "../components/Breadcrumbs";

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
                        <h1>Поставщикам</h1>
                    </div>{" "}
                    <div className="a-page-static__wrap">
                        <div className="a-page-static__style">
                            <style /> <script />
                        </div>{" "}
                        <div className="a-page-static__sidebar">
                            <div className="page-static-menu__list">
                                <div className="page-static-menu__item">
                                    <a className="page-static-menu__link" href="/customer/">
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
                            <img
                                alt=""
                                src="https://cdn.bigam.ru/medialibrary/53f/riheibi3pqf2ecij3y0lgi4qgbdajp5u/banner_provider.jpg"
                            />
                            <h2>Краткая общая информация</h2>
                            <p>
                                «Бигам» – это постоянно расширяющаяся сеть Центров продаж
                                профессионального инструмента и техники. В нашем ассортименте более
                                600 категорий товаров известных мировых и отечественных брендов. Мы
                                заботимся о наших клиентах и предлагаем только лучшее оборудование
                                отличного качества и гарантируем приемлемые рыночные цены.
                            </p>
                            <p>
                                С нами работают более 100 поставщиков. Мы заинтересованы в расширении
                                сотрудничества, всегда приветствуем высокое качество и надежность в
                                отношениях с нашими партнерами. Особое внимание мы уделяем
                                региональным поставщикам и местным производителям, что является для
                                них отличной платформой для поддержки и развития бизнеса.
                            </p>
                            <p>
                                Если Вы хотите стать нашим поставщиком, рекомендуем ознакомиться с
                                информацией ниже, в соответствующих разделах.
                            </p>
                            <h2>Как стать поставщиком</h2>
                            <ol>
                                <li>
                                    Вы отправляете на{" "}
                                    <a href="mailto:zakazzakupki@bigam.ru" target="_blank">
                                        электронную почту
                                    </a>{" "}
                                    предложение о сотрудничестве. В случае актуальности предложения с
                                    Вами свяжется менеджер с уточнением необходимых документов для
                                    сотрудничества.{" "}
                                </li>
                                <li>
                                    Производится анализ спроса на предлагаемый товар/товарную группу.
                                    Анализ коммерческих условий (отсрочка платежа, бонусные программы,
                                    рекламный бюджет, гарантии постоянного наличия, логистика, доставка
                                    и др.).{" "}
                                </li>
                                <li>Согласование условий. Подготовка договора.</li>
                                <li>Подписание договора. Начало сотрудничества.</li>
                            </ol>
                            <h2>Категории товаров</h2>
                            <ul>
                                <li>
                                    <a href="/catalog/instrument-5748/">Инструмент</a>
                                </li>
                                <li>
                                    <a href="/catalog/vse-dlya-sada-i-ogoroda-5880/">
                                        Все для сада и огорода
                                    </a>
                                </li>
                                <li>
                                    <a href="/catalog/vodosnabzhenie-santekhnika-i-otoplenie-6069/">
                                        Водоснабжение, сантехника и отопление
                                    </a>
                                </li>
                                <li>
                                    <a href="/catalog/svarochnoe-oborudovanie-6350/">
                                        Сварочное оборудование
                                    </a>
                                </li>
                                <li>
                                    <a href="/catalog/stanki-6351/">Станки</a>
                                </li>
                                <li>
                                    <a href="/catalog/stroitelnaya-tekhnika-6029/">
                                        Строительная техника
                                    </a>
                                </li>
                                <li>
                                    <a href="/catalog/klimaticheskoe-oborudovanie-5944/">
                                        Климатическое оборудование
                                    </a>
                                </li>
                                <li>
                                    <a href="/catalog/uborka-i-klining-6018/">Уборка и клининг</a>
                                </li>
                                <li>
                                    <a href="/catalog/elektrika-i-svet-5972/">Электрика и свет</a>
                                </li>
                                <li>
                                    <a href="/catalog/avtotovary-i-oborudovanie-5998/">
                                        Автотовары и оборудование
                                    </a>
                                </li>
                                <li>
                                    <a href="/catalog/sredstva-individualnoj-zashhity-6358/">
                                        Средства индивидуальной защиты
                                    </a>
                                </li>
                                <li>
                                    <a href="/catalog/zapasnye-chasti-i-komplektuyushhie-6352/">
                                        Запасные части и комплектующие
                                    </a>
                                </li>
                                <li>
                                    <a href="/catalog/tovary-pervoj-neobkhodimosti-7199/">
                                        Товары первой необходимости
                                    </a>
                                </li>
                            </ul>
                            <h2>Контакты отдела по работе с поставщиками</h2>
                            <p>8 800 555 69 73</p>
                            <p>
                                {" "}
                                <a href="mailto:zakazzakupki@bigam.ru" target="_blank">
                                    zakazzakupki@bigam.ru
                                </a>
                            </p>
                            <p>
                                {" "}
                                <a href="mailto: zakupki-im@bigam.ru" target="_blank">
                                    {" "}
                                    zakupki-im@bigam.ru
                                </a>
                            </p>
                            <p>
                                Компания «Бигам» всегда открыта для сотрудничества с новыми
                                поставщиками. Мы заинтересованы в дистрибьюторах, которые могут
                                предложить качественный товар в хороших объемах по доступным ценам. С
                                нашей стороны мы предлагаем взаимовыгодные партнерские отношения,
                                основанные на доверии, честности и прозрачности.
                            </p>
                            <p>
                                Мы гарантируем рассмотрение предложений индивидуально от каждого
                                поставщика независимо от масштабов бизнеса.
                            </p>
                            <p>Ждем Вас, будущий Партнер!</p>
                        </div>
                    </div>
                </section>
            </div>

        </main>
    );
}
