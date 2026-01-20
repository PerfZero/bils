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

                    <div className="a-page-static__wrap">
                        <div className="a-page-static__style">
                            <style /> <script />
                        </div>
                        <div className="a-page-static__description a-page-static__description--new">
                            <div className="banner banner--full-width banner--" picture="" url="">
                                <div className="banner__image">
                                    <div className="a-picture-card" title="">
                                        <img
                                            alt=""
                                            className="a-picture-card__picture a-picture-card__picture--desktop a-lazy-load a-is-loaded"
                                            src="https://cdn.bigam.ru/medialibrary/51f/my7sy8ld7kv63fy9ncbmp617ntf7rc60/corp_1.jpg"
                                        />
                                        <img
                                            alt=""
                                            className="a-picture-card__picture a-picture-card__picture--mobile a-lazy-load"
                                            data-src="https://cdn.bigam.ru/medialibrary/116/cd1rhxx3yeak5mdb99gaj32fet9iqc8s/corp_mob_1.jpg"
                                            src="/images/layouts/no_picture.svg"
                                        />
                                        <span />
                                    </div>
                                </div>
                                <div className="banner__content">
                                    <h1 className="banner__title banner__title--default">
                                        Корпоративным клиентам
                                    </h1>
                                    <ul className="banner__list-text">
                                        <li className="banner__text">
                                            Личный кабинет и работа со сметами
                                        </li>
                                        <li className="banner__text">
                                            Помощь и поддержка персонального менеджера
                                        </li>
                                    </ul>
                                    <button
                                        className="a-main-button a-main-button--display-inline a-main-button--type-medium a-main-button--corner-round a-main-button--color-orange"
                                        type="button">

                                        <span className="a-main-button__wrap">

                                            <span className="a-main-button__content">
                                                зарегистрироваться
                                            </span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <p
                                className="html-block "
                                style={{
                                    fontSize: "18px",
                                }}>
                                Мы предлагаем корпоративным клиентам огромный ассортимент
                                профессионального инструмента, оборудования и техники от ведущих
                                российских и мировых производителей для бесперебойной и эффективной
                                работы вашего бизнеса.
                            </p>
                            <div className="banner banner--low banner--">

                                <div className="banner__content">
                                    <ul className="banner__list-text">
                                        <li className="banner__text">Корпоративный отдел:</li>
                                        <li className="banner__text">
                                            <a href="tel:+74852208434">+7 (4852) 20-84-34</a>
                                        </li>
                                        <li className="banner__text">
                                            <a href="mailto:corp@bigam.ru">corp@bigam.ru</a>
                                        </li>
                                    </ul>
                                    <button
                                        className="a-main-button a-main-button--display-inline a-main-button--type-medium a-main-button--corner-round a-main-button--color-orange"
                                        type="button">

                                        <span className="a-main-button__wrap">

                                            <span className="a-main-button__content">
                                                отправить запрос
                                            </span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <h2 className="html-block html-block--corporate">Почему Бигам:</h2>
                            <div className="infographics infographics--two-columns">
                                <div className="infographic-block infographic-block--dark-blue">
                                    <div className="infographic-block__title">Ассортимент</div>
                                    <ul className="infographic-block__list">
                                        <li
                                            className="infographic-card infographic-card--top infographic-card--full infographic-card--"
                                            style={{
                                                backgroundImage:
                                                    'url("https://cdn.bigam.ru/medialibrary/59e/cps5ifkhqb3z4pkmf2wccx82txkqujl5/corp_2.jpg")',
                                            }}>
                                            <div className="infographic-card__header">
                                                <span>40 000+</span> SKU
                                            </div>
                                            <div className="infographic-card__text">
                                                в наличии и под заказ
                                            </div>
                                        </li>
                                        <li className="infographic-card infographic-card--top infographic-card--half infographic-card--blue">
                                            <div className="infographic-card__header">
                                                <span>400+</span>
                                            </div>
                                            <div className="infographic-card__text">
                                                ведущих российских и иностранных производителей
                                            </div>
                                        </li>
                                        <li className="infographic-card infographic-card--bottom infographic-card--half infographic-card--pale-blue">
                                            <div className="infographic-card__header">
                                                <span>Доставка</span>
                                                <br />
                                                по всей России
                                            </div>
                                            <div className="infographic-card__text">точно в срок</div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="infographic-block infographic-block--dark-blue">
                                    <div className="infographic-block__title">Опыт работы</div>
                                    <ul className="infographic-block__list">
                                        <li className="infographic-card infographic-card--top infographic-card--half infographic-card--pale-blue">
                                            <div className="infographic-card__header">
                                                <span>30 лет</span>
                                            </div>
                                            <div className="infographic-card__text">
                                                непрерывного развития
                                            </div>
                                        </li>
                                        <li className="infographic-card infographic-card--bottom infographic-card--half infographic-card--blue">
                                            <div className="infographic-card__header">
                                                <span>30 000+</span>
                                                <br />
                                                клиентов
                                            </div>
                                            <div className="infographic-card__text">
                                                опыт и экспертиза в любых отраслях
                                            </div>
                                        </li>
                                        <li
                                            className="infographic-card infographic-card--top infographic-card--full infographic-card--"
                                            style={{
                                                backgroundImage:
                                                    'url("https://cdn.bigam.ru/medialibrary/5c1/ay4slo1901fv9hw6zyvnxtofhgmdk9q0/corp_3.jpg")',
                                            }}>
                                            <div className="infographic-card__header">
                                                <span>32 профессиональных</span>
                                                <br />
                                                центра
                                            </div>
                                            <div className="infographic-card__text">
                                                в 19 городах России
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <h2 className="html-block html-block--corporate">
                                С нами успешно работают:
                            </h2>
                            <div className="partners-list">
                                <div className="image-carousel image-carousel--prev-limit image-carousel--next-limit">
                                    <div className="image-carousel__container swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
                                        <div
                                            className="image-carousel__wrapper swiper-wrapper"
                                            style={{
                                                transform: "translate3d(-259px, 0px, 0px)",
                                                transitionDuration: "0ms",
                                            }}>
                                            <div
                                                className="image-carousel__slide swiper-slide swiper-slide-prev"
                                                style={{
                                                    marginRight: "103px",
                                                }}>
                                                <div className="a-picture-card" title="">
                                                    <img
                                                        alt=""
                                                        className="a-picture-card__picture a-lazy-load a-is-loaded"
                                                        src="https://cdn.bigam.ru/sprint.editor/3e5/womlsvmugu2afy37x5fbqly6hue5mp0y/Severstal_Logo_CYR_Blue_RGB-1.png"
                                                    />
                                                    <span />
                                                </div>
                                            </div>
                                            <div
                                                className="image-carousel__slide swiper-slide swiper-slide-active"
                                                style={{
                                                    marginRight: "103px",
                                                }}>
                                                <div className="a-picture-card" title="">
                                                    <img
                                                        alt=""
                                                        className="a-picture-card__picture a-lazy-load a-is-loaded"
                                                        src="https://cdn.bigam.ru/sprint.editor/153/5j4zo5ttv8blwvt9g3ccjjgp1fh65u2p/Logotip_PAO_PIK_-1.png"
                                                    />
                                                    <span />
                                                </div>
                                            </div>
                                            <div
                                                className="image-carousel__slide swiper-slide swiper-slide-next"
                                                style={{
                                                    marginRight: "103px",
                                                }}>
                                                <div className="a-picture-card" title="">
                                                    <img
                                                        alt=""
                                                        className="a-picture-card__picture a-lazy-load a-is-loaded"
                                                        src="https://cdn.bigam.ru/sprint.editor/b7c/xtii6tpmku8p5gbddsd9hmgz6k3lfmrx/logo_white-1.png"
                                                    />
                                                    <span />
                                                </div>
                                            </div>
                                            <div
                                                className="image-carousel__slide swiper-slide"
                                                style={{
                                                    marginRight: "103px",
                                                }}>
                                                <div className="a-picture-card" title="">
                                                    <img
                                                        alt=""
                                                        className="a-picture-card__picture a-lazy-load a-is-loaded"
                                                        src="https://cdn.bigam.ru/sprint.editor/962/g6rdppplxixj57yq81fdin21b82ur0z6/08346810_94bc_47b6_a694_0d71cbb010e4-1.png"
                                                    />
                                                    <span />
                                                </div>
                                            </div>
                                            <div
                                                className="image-carousel__slide swiper-slide"
                                                style={{
                                                    marginRight: "103px",
                                                }}>
                                                <div className="a-picture-card" title="">
                                                    <img
                                                        alt=""
                                                        className="a-picture-card__picture a-lazy-load a-is-loaded"
                                                        src="https://cdn.bigam.ru/sprint.editor/16b/rkembx5jj2sx6r8ijwclmcagipwn8n2u/RTRS_logo-1.png"
                                                    />
                                                    <span />
                                                </div>
                                            </div>
                                            <div
                                                className="image-carousel__slide swiper-slide"
                                                style={{
                                                    marginRight: "103px",
                                                }}>
                                                <div className="a-picture-card" title="">
                                                    <img
                                                        alt=""
                                                        className="a-picture-card__picture a-lazy-load a-is-loaded"
                                                        src="https://cdn.bigam.ru/sprint.editor/687/iwr2lhx37gmgw6j11q9j3qdmf39uh2by/Logotip_Segezha_Group-1.png"
                                                    />
                                                    <span />
                                                </div>
                                            </div>
                                            <div
                                                className="image-carousel__slide swiper-slide"
                                                style={{
                                                    marginRight: "103px",
                                                }}>
                                                <div className="a-picture-card" title="">
                                                    <img
                                                        alt=""
                                                        className="a-picture-card__picture a-lazy-load"
                                                        data-src="https://cdn.bigam.ru/sprint.editor/dc9/eeewnoku5kuxul201raxckw6zuep6qad/LOGO_MOSGAZ-1.png"
                                                        src="/images/layouts/no_picture.svg"
                                                    />
                                                    <span />
                                                </div>
                                            </div>
                                            <div
                                                className="image-carousel__slide swiper-slide"
                                                style={{
                                                    marginRight: "103px",
                                                }}>
                                                <div className="a-picture-card" title="">
                                                    <img
                                                        alt=""
                                                        className="a-picture-card__picture a-lazy-load"
                                                        data-src="https://cdn.bigam.ru/sprint.editor/44d/pe7ikmm6elaxr4axpp0ttxncci354c0v/bdeb077c30ec0e73fbe6089da8f4ea44-1.png"
                                                        src="/images/layouts/no_picture.svg"
                                                    />
                                                    <span />
                                                </div>
                                            </div>
                                            <div
                                                className="image-carousel__slide swiper-slide"
                                                style={{
                                                    marginRight: "103px",
                                                }}>
                                                <div className="a-picture-card" title="">
                                                    <img
                                                        alt=""
                                                        className="a-picture-card__picture a-lazy-load"
                                                        data-src="https://cdn.bigam.ru/sprint.editor/04a/1vndpodc39ev7ir39yuo2ifffyccwe4l/2c541c61a6c8bb1a275ef4f36fa809f1-1.png"
                                                        src="/images/layouts/no_picture.svg"
                                                    />
                                                    <span />
                                                </div>
                                            </div>
                                            <div
                                                className="image-carousel__slide swiper-slide"
                                                style={{
                                                    marginRight: "103px",
                                                }}>
                                                <div className="a-picture-card" title="">
                                                    <img
                                                        alt=""
                                                        className="a-picture-card__picture a-lazy-load"
                                                        data-src="https://cdn.bigam.ru/sprint.editor/acf/7q3yaw0bade8vxsxxevhmkq64tvbtcfr/5016f6151adba8ee49133a482d927992-1.png"
                                                        src="/images/layouts/no_picture.svg"
                                                    />
                                                    <span />
                                                </div>
                                            </div>
                                            <div
                                                className="image-carousel__slide swiper-slide"
                                                style={{
                                                    marginRight: "103px",
                                                }}>
                                                <div className="a-picture-card" title="">
                                                    <img
                                                        alt=""
                                                        className="a-picture-card__picture a-lazy-load"
                                                        data-src="https://cdn.bigam.ru/sprint.editor/98d/su51jmbucqf0fcoks74qgrgi0x406l19/Kazanskii_vertoletnyi_zavod-1.png"
                                                        src="/images/layouts/no_picture.svg"
                                                    />
                                                    <span />
                                                </div>
                                            </div>
                                            <div
                                                className="image-carousel__slide swiper-slide"
                                                style={{
                                                    marginRight: "103px",
                                                }}>
                                                <div className="a-picture-card" title="">
                                                    <img
                                                        alt=""
                                                        className="a-picture-card__picture a-lazy-load"
                                                        data-src="https://cdn.bigam.ru/sprint.editor/47c/wbngkcagwk26dap360i3786k7ilcap2d/logo_rks_80-1.png"
                                                        src="/images/layouts/no_picture.svg"
                                                    />
                                                    <span />
                                                </div>
                                            </div>
                                            <div
                                                className="image-carousel__slide swiper-slide"
                                                style={{
                                                    marginRight: "103px",
                                                }}>
                                                <div className="a-picture-card" title="">
                                                    <img
                                                        alt=""
                                                        className="a-picture-card__picture a-lazy-load"
                                                        data-src="https://cdn.bigam.ru/sprint.editor/e8d/0d9w25b7gkd56u9ij9rud5h5kbu18cup/6b855d20d0f46bbff4cf37afa4fea6ad-1.png"
                                                        src="/images/layouts/no_picture.svg"
                                                    />
                                                    <span />
                                                </div>
                                            </div>
                                            <div
                                                className="image-carousel__slide swiper-slide"
                                                style={{
                                                    marginRight: "103px",
                                                }}>
                                                <div className="a-picture-card" title="">
                                                    <img
                                                        alt=""
                                                        className="a-picture-card__picture a-lazy-load"
                                                        data-src="https://cdn.bigam.ru/sprint.editor/946/3r1io7o3kp4x7lcu4lgrdqo10lznthd3/YArbrlogo-1.png"
                                                        src="/images/layouts/no_picture.svg"
                                                    />
                                                    <span />
                                                </div>
                                            </div>
                                            <div
                                                className="image-carousel__slide swiper-slide"
                                                style={{
                                                    marginRight: "103px",
                                                }}>
                                                <div className="a-picture-card" title="">
                                                    <img
                                                        alt=""
                                                        className="a-picture-card__picture a-lazy-load"
                                                        data-src="https://cdn.bigam.ru/sprint.editor/3b6/jrvh1rdn9iiitimq4n062z2nxxt29yhg/lavochkin_logo_rus_horizontal-1.png"
                                                        src="/images/layouts/no_picture.svg"
                                                    />
                                                    <span />
                                                </div>
                                            </div>
                                            <div
                                                className="image-carousel__slide swiper-slide"
                                                style={{
                                                    marginRight: "103px",
                                                }}>
                                                <div className="a-picture-card" title="">
                                                    <img
                                                        alt=""
                                                        className="a-picture-card__picture a-lazy-load"
                                                        data-src="https://cdn.bigam.ru/sprint.editor/27b/4i9o57vheuemp1f4vfpnhtpzo0bsstxp/logo_phosagro-1.png"
                                                        src="/images/layouts/no_picture.svg"
                                                    />
                                                    <span />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className="image-carousel__button image-carousel__button--prev swiper-button-prev"
                                        type="button">
                                        <svg className="a-svg">
                                            <use
                                                xlinkHref="#icon-chevron-left"
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        className="image-carousel__button image-carousel__button--next swiper-button-next"
                                        type="button">
                                        <svg className="a-svg">
                                            <use
                                                xlinkHref="#icon-chevron-right"
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <h2 className="html-block html-block--corporate">
                                Популярные категории:
                            </h2>
                            <div className="categories-list">
                                <div className="categories-list__container">
                                    <div className="category-card">
                                        <a
                                            className="category-card__link"
                                            href="/catalog/stroitelnaya-tekhnika-6029/">
                                            <img
                                                alt=""
                                                className="category-card__image"
                                                src="https://cdn.bigam.ru/sprint.editor/8d2/r31ovlz2zayk4a9o02izuc23dl1vxcpw/17caa775aa066d10b63f211eb8e7df0f.png"
                                            />
                                            <div className="category-card__title">Строительная техника</div>
                                        </a>
                                    </div>
                                    <div className="category-card">
                                        <a
                                            className="category-card__link"
                                            href="/catalog/elektroinstrument-5749/">
                                            <img
                                                alt=""
                                                className="category-card__image"
                                                src="https://cdn.bigam.ru/sprint.editor/9de/s8vsdeauqbcoq22ozrwxft7rrx29tdka/Instrument-1.png"
                                            />
                                            <div className="category-card__title">Электроинструмент</div>
                                        </a>
                                    </div>
                                    <div className="category-card">
                                        <a
                                            className="category-card__link"
                                            href="/catalog/svarochnoe-oborudovanie-6350/">
                                            <img
                                                alt=""
                                                className="category-card__image"
                                                src="https://cdn.bigam.ru/sprint.editor/71f/itlizyyvapkjsmfrbud7espicgu3jjec/svarka-1.png"
                                            />
                                            <div className="category-card__title">
                                                Сварочное оборудование
                                            </div>
                                        </a>
                                    </div>
                                    <div className="category-card">
                                        <a
                                            className="category-card__link"
                                            href="/catalog/sadovaya-tekhnika-5881/">
                                            <img
                                                alt=""
                                                className="category-card__image"
                                                src="https://cdn.bigam.ru/sprint.editor/3ad/mjvycu7vblhpbledw22y559f9osvzfxa/Vse-dlya-sada-i-ogoroda_osen_zima-1.png"
                                            />
                                            <div className="category-card__title">
                                                Садовая техника и комплектующие
                                            </div>
                                        </a>
                                    </div>
                                    <div className="category-card">
                                        <a
                                            className="category-card__link"
                                            href="/catalog/pnevmoinstrument-5751/">
                                            <img
                                                alt=""
                                                className="category-card__image"
                                                src="https://cdn.bigam.ru/sprint.editor/345/671k58dt07todc0g0d1ghw0atlimso8p/kompresory-1.png"
                                            />
                                            <div className="category-card__title">
                                                Компрессоры и пневмоинструмент
                                            </div>
                                        </a>
                                    </div>
                                    <div className="category-card">
                                        <a
                                            className="category-card__link"
                                            href="/catalog/lestnicy-i-vyshki-6038/">
                                            <img
                                                alt=""
                                                className="category-card__image"
                                                src="https://cdn.bigam.ru/sprint.editor/823/sxtvy87wk9xrwy1cu6egmgqwjoezs7ta/8fceeaf6201cbd256dfb30bda9b907ea.png"
                                            />
                                            <div className="category-card__title">Леса, вышки, туры</div>
                                        </a>
                                    </div>
                                </div>
                                <a
                                    className="a-main-button a-main-button--display-inline a-main-button--type-medium a-main-button--corner-round a-main-button--color-light-orange"
                                    href="/catalog/">

                                    <span className="a-main-button__wrap">

                                        <span className="a-main-button__content">Все категории</span>
                                        <span className="a-main-button__constrain">
                                            <svg className="a-svg a-main-button__icon a-main-button__icon--right a-svg--medium a-main-button__icon--icon-meatballs a-main-button__icon--color">
                                                <use
                                                    xlinkHref="#icon-meatballs"
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                />
                                            </svg>
                                        </span>
                                    </span>
                                </a>
                            </div>
                            <div className="banner banner--full-width banner--" picture="" url="">
                                <div className="banner__image">
                                    <div className="a-picture-card" title="">
                                        <img
                                            alt=""
                                            className="a-picture-card__picture a-picture-card__picture--desktop a-lazy-load a-is-loaded"
                                            src="https://cdn.bigam.ru/medialibrary/950/7j9w3h2hnavxdy0ow9slj1th6t3g4qwo/corp_4.jpg"
                                        />
                                        <img
                                            alt=""
                                            className="a-picture-card__picture a-picture-card__picture--mobile a-lazy-load"
                                            data-src="https://cdn.bigam.ru/medialibrary/a1b/vp89elc4vb784q2uyui7amcrs21zypxo/corp_mob_4.jpg"
                                            src="/images/layouts/no_picture.svg"
                                        />
                                        <span />
                                    </div>
                                </div>
                                <div className="banner__content">
                                    <div className="banner__title banner__title--default">
                                        Сервисный центр
                                    </div>
                                    <ul className="banner__list-text">
                                        <li className="banner__text">
                                            Профессиональный ремонт и сервисное обслуживание
                                        </li>
                                        <li className="banner__text">
                                            Сертифицированные мастера и инженеры
                                        </li>
                                        <li className="banner__text">
                                            Собственный склад оригинальных запасных частей
                                        </li>
                                    </ul>
                                    <button
                                        className="a-main-button a-main-button--display-inline a-main-button--type-medium a-main-button--corner-round a-main-button--color-orange"
                                        type="button">

                                        <span className="a-main-button__wrap">

                                            <span className="a-main-button__content">
                                                запись на ремонт
                                            </span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <p
                                className="html-block "
                                style={{
                                    fontSize: "18px",
                                }}>
                                Мы имеем собственный авторизованный сервисный центр. Выполняем ремонт
                                и обслуживание строительного оборудования и инструмента любой степени
                                сложности. Оперативная диагностика неисправностей и выявление
                                возможных причин поломки. Гарантия на выполненные ремонтные работы и
                                запасные части.
                            </p>
                            <div className="advantages-list advantages-list--col-3">
                                <div
                                    className="advantage-card advantage-card--border-none advantage-card--background-light-grey advantage-card--icon-top"
                                    iconcolor="orange"
                                    style={{
                                        opacity: "1",
                                        rotate: "none",
                                        scale: "none",
                                        transform: "translate(0px, 0px)",
                                        translate: "none",
                                    }}>
                                    <div className="advantage-card__icon">
                                        <img
                                            alt="Ремонт"
                                            src="https://cdn.bigam.ru/sprint.editor/398/zikcvvge5vw2cowzzws5kfhm60j83rfj/heroicons_wrench_screwdriver.svg"
                                        />
                                    </div>
                                    <div className="advantage-card__content">
                                        <div className="advantage-card__title">Ремонт</div>
                                        <div className="advantage-card__text">
                                            Постгарантийный ремонт оборудования любой сложности с
                                            минимальным простоем
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="advantage-card advantage-card--border-none advantage-card--background-light-grey advantage-card--icon-top"
                                    iconcolor="orange"
                                    style={{
                                        opacity: "1",
                                        rotate: "none",
                                        scale: "none",
                                        transform: "translate(0px, 0px)",
                                        translate: "none",
                                    }}>
                                    <div className="advantage-card__icon">
                                        <img
                                            alt="Запчасти"
                                            src="https://cdn.bigam.ru/sprint.editor/9b4/oarmzpw26wgkqap1kwfp6o2rnnssslrp/settings.svg"
                                        />
                                    </div>
                                    <div className="advantage-card__content">
                                        <div className="advantage-card__title">Запчасти</div>
                                        <div className="advantage-card__text">
                                            Запчасти, комплектующие и компоненты для широкого спектра
                                            оборудования
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="advantage-card advantage-card--border-none advantage-card--background-light-grey advantage-card--icon-top"
                                    iconcolor="orange"
                                    style={{
                                        opacity: "1",
                                        rotate: "none",
                                        scale: "none",
                                        transform: "translate(0px, 0px)",
                                        translate: "none",
                                    }}>
                                    <div className="advantage-card__icon">
                                        <img
                                            alt="Услуги"
                                            src="https://cdn.bigam.ru/sprint.editor/f70/3lti10g2a2zo4laoi2h88w0l9u3vf4tp/system_uicons_document.svg"
                                        />
                                    </div>
                                    <div className="advantage-card__content">
                                        <div className="advantage-card__title">Услуги</div>
                                        <div className="advantage-card__text">
                                            Техническое обслуживание техники. Диагностика, выезд мастера
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="banner banner--small banner--reverse" picture="" url="">
                                <div className="banner__image">
                                    <div className="a-picture-card" title="">
                                        <img
                                            alt=""
                                            className="a-picture-card__picture a-picture-card__picture--desktop a-lazy-load a-is-loaded"
                                            src="https://cdn.bigam.ru/medialibrary/935/hstewf9pjjrgnlbveqvwnuz321q73uym/corp_5.jpg"
                                        />
                                        <img
                                            alt=""
                                            className="a-picture-card__picture a-picture-card__picture--mobile a-lazy-load"
                                            data-src="https://cdn.bigam.ru/medialibrary/2ba/yorubc9dt9r4l5dt6hm8niaw0w39fnl9/corp_mob_5.png"
                                            src="/images/layouts/no_picture.svg"
                                        />
                                        <span />
                                    </div>
                                </div>
                                <div className="banner__content">
                                    <div className="banner__title banner__title--corporate">
                                        Доставка по всей России
                                    </div>
                                    <div className="banner__text">
                                        Мы доставим товар в любой город и населенный пункт России
                                        собственной логистической службой или проверенными транспортными
                                        компаниями. Вы получите товар в гарантированные сроки и по
                                        минимальным транспортным тарифам.
                                        <br />
                                        <br />
                                    </div>
                                    <ul className="banner__list-text" />
                                    <button
                                        className="a-main-button a-main-button--display-inline a-main-button--type-medium a-main-button--corner-round a-main-button--color-orange"
                                        type="button">

                                        <span className="a-main-button__wrap">

                                            <span className="a-main-button__content">
                                                рассчитать доставку
                                            </span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div className="banner banner--low banner--">

                                <div className="banner__content">
                                    <ul className="banner__list-text">
                                        <li className="banner__text">Остались вопросы?</li>
                                        <li className="banner__text">
                                            <a href="tel:+74852208434">+7 (4852) 20-84-34</a>
                                        </li>
                                        <li className="banner__text">
                                            <a href="mailto:corp@bigam.ru">corp@bigam.ru</a>
                                        </li>
                                    </ul>
                                    <button
                                        className="a-main-button a-main-button--display-inline a-main-button--type-medium a-main-button--corner-round a-main-button--color-orange"
                                        type="button">

                                        <span className="a-main-button__wrap">

                                            <span className="a-main-button__content">
                                                Задать вопрос
                                            </span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </main>
    );
}
