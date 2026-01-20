"use client";

import Breadcrumbs from "../components/Breadcrumbs";

export default function CatalogSlugPage({ params }) {
  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Видео" },
  ];

  return (
    <main className="a-page-catalog a-page-catalog--type-a a-page-catalog--contrast a-page__main">
      <div className="a-page-catalog__container">
        <Breadcrumbs
          items={breadcrumbs}
          className="a-page-catalog__breadcrumbs"
        />

      </div>
    <div className="a-page-news__container">
  <div className="a-page-news__header">
    <h1 className="a-page-news__title">Статьи</h1>{" "}
    <button
      aria-label="Все года"
      className="a-page-news__date-fake"
      type="button">
      Все года
      <span className="a-page-news__date-icon">
        <svg className="a-svg">
          <use
            xlinkHref="#icon-old-arrow"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          />
        </svg>
      </span>
    </button>{" "}
    <div className="a-field-select a-page-news__date">
      <div className="a-field-select__constrain" tabIndex="0">
        <div className="a-field-select__container">
          <div className="a-field-select__wrap">
            <input
              className="a-field-select__input"
              name="date"
              type="hidden"
            />
            <div className="a-field-select__placeholder" />{" "}
            <div className="a-field-select__fake" title="Все года">
              Все года
              <div className="a-field-select__icon">
                <svg className="a-svg">
                  <use
                    xlinkHref="#icon-old-arrow"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>{" "}
        <ul className="a-field-select__list">
          <li
            className="a-field-select__item a-field-select__item--active"
            title="Все года">
            <div
              className="a-field-select__text"
              style={{
                "--filter-item-text": "'Все года'",
              }}
            />
          </li>
          <li className="a-field-select__item" title="2026">
            <div
              className="a-field-select__text"
              style={{
                "--filter-item-text": "'2026'",
              }}
            />
          </li>
          <li className="a-field-select__item" title="2025">
            <div
              className="a-field-select__text"
              style={{
                "--filter-item-text": "'2025'",
              }}
            />
          </li>
          <li className="a-field-select__item" title="2024">
            <div
              className="a-field-select__text"
              style={{
                "--filter-item-text": "'2024'",
              }}
            />
          </li>
          <li className="a-field-select__item" title="2023">
            <div
              className="a-field-select__text"
              style={{
                "--filter-item-text": "'2023'",
              }}
            />
          </li>
          <li className="a-field-select__item" title="2022">
            <div
              className="a-field-select__text"
              style={{
                "--filter-item-text": "'2022'",
              }}
            />
          </li>
          <li className="a-field-select__item" title="2021">
            <div
              className="a-field-select__text"
              style={{
                "--filter-item-text": "'2021'",
              }}
            />
          </li>
          <li className="a-field-select__item" title="2020">
            <div
              className="a-field-select__text"
              style={{
                "--filter-item-text": "'2020'",
              }}
            />
          </li>
          <li className="a-field-select__item" title="2019">
            <div
              className="a-field-select__text"
              style={{
                "--filter-item-text": "'2019'",
              }}
            />
          </li>
          <li className="a-field-select__item" title="2018">
            <div
              className="a-field-select__text"
              style={{
                "--filter-item-text": "'2018'",
              }}
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div className="a-page-news__main">
    <div className="a-page-news__list">
      <div className="a-page-news__item">
        <div className="a-news-card a-page-news__card" type="articles">
          <a
            className="a-news-card__picture"
            href="/stati/top-luchshih-drovokolov-dlya-doma/">
            <img
              alt="Топ лучших дровоколов для дома"
              className="a-news-card__image a-lazy-load a-is-loaded"
              src="https://cdn.bigam.ru/resize_cache/745659/c815982ac5e917f5de5d39415cbb16ea/iblock/6da/6dae055aa3ac17ed28ac6ad847b03ab9/glavnaya.jpg"
            />{" "}
            <span />
          </a>{" "}
          <div className="a-news-card__content">
            {" "}
            <div className="a-news-card__wrap">
              <a
                className="a-news-card__title"
                href="/stati/top-luchshih-drovokolov-dlya-doma/">
                Топ лучших дровоколов для дома
              </a>
            </div>{" "}
          </div>
        </div>
      </div>
      <div className="a-page-news__item">
        <div className="a-news-card a-page-news__card" type="articles">
          <a
            className="a-news-card__picture"
            href="/stati/luchshie-porshnevye-kompressory/">
            <img
              alt="Лучшие поршневые компрессоры"
              className="a-news-card__image a-lazy-load a-is-loaded"
              src="https://cdn.bigam.ru/resize_cache/iblock/551/gf3bck2vq2kjpwvrskqrfxra5qbypmsp/770_382_0/luchshie_porshnevye_kompressory_01.jpg"
            />{" "}
            <span />
          </a>{" "}
          <div className="a-news-card__content">
            {" "}
            <div className="a-news-card__wrap">
              <a
                className="a-news-card__title"
                href="/stati/luchshie-porshnevye-kompressory/">
                Лучшие поршневые компрессоры
              </a>
            </div>{" "}
          </div>
        </div>
      </div>
      <div className="a-page-news__item">
        <div className="a-news-card a-page-news__card" type="articles">
          <a
            className="a-news-card__picture"
            href="/stati/kompressory-dlya-pokraski-avtomobilya/">
            <img
              alt="Какой компрессор выбрать для покраски автомобиля"
              className="a-news-card__image a-lazy-load a-is-loaded"
              src="https://cdn.bigam.ru/resize_cache/iblock/52c/0jqru3rfnry0t4uyqwlkgtykorp0zd1e/770_382_0/01.jpg"
            />{" "}
            <span />
          </a>{" "}
          <div className="a-news-card__content">
            {" "}
            <div className="a-news-card__wrap">
              <a
                className="a-news-card__title"
                href="/stati/kompressory-dlya-pokraski-avtomobilya/">
                Какой компрессор выбрать для покраски автомобиля
              </a>
            </div>{" "}
          </div>
        </div>
      </div>
      <div className="a-page-news__item">
        <div className="a-news-card a-page-news__card" type="articles">
          <a
            className="a-news-card__picture"
            href="/stati/reiting-kompressorov-na-100-litrov/">
            <img
              alt="Рейтинг компрессоров на 100 литров"
              className="a-news-card__image a-lazy-load a-is-loaded"
              src="https://cdn.bigam.ru/resize_cache/iblock/224/n7st0hgn5yj5rqojcgn7okr2vw6dauu2/770_382_0/01.jpg"
            />{" "}
            <span />
          </a>{" "}
          <div className="a-news-card__content">
            {" "}
            <div className="a-news-card__wrap">
              <a
                className="a-news-card__title"
                href="/stati/reiting-kompressorov-na-100-litrov/">
                Рейтинг компрессоров на 100 литров
              </a>
            </div>{" "}
          </div>
        </div>
      </div>
      <div className="a-page-news__item">
        <div className="a-news-card a-page-news__card" type="articles">
          <a
            className="a-news-card__picture"
            href="/stati/reiting-professionalnyh-akkumulyatornyh-shurupovertov/">
            <img
              alt="Рейтинг профессиональных аккумуляторных шуруповертов"
              className="a-news-card__image a-lazy-load a-is-loaded"
              src="https://cdn.bigam.ru/resize_cache/745199/c815982ac5e917f5de5d39415cbb16ea/iblock/012/012de650c95e6a96ed0fec58118d34f2/glavnaya.jpg"
            />{" "}
            <span />
          </a>{" "}
          <div className="a-news-card__content">
            {" "}
            <div className="a-news-card__wrap">
              <a
                className="a-news-card__title"
                href="/stati/reiting-professionalnyh-akkumulyatornyh-shurupovertov/">
                Рейтинг профессиональных аккумуляторных шуруповертов
              </a>
            </div>{" "}
          </div>
        </div>
      </div>
      <div className="a-page-news__item">
        <div className="a-news-card a-page-news__card" type="articles">
          <a
            className="a-news-card__picture"
            href="/stati/6-sposobov-ubrat-sneg-na-uchastke/">
            <img
              alt="6 способов убрать снег на участке"
              className="a-news-card__image a-lazy-load a-is-loaded"
              src="https://cdn.bigam.ru/resize_cache/744897/c815982ac5e917f5de5d39415cbb16ea/iblock/f32/f3222c73e283f01b28adc72ceba59091/glavnaya.jpg"
            />{" "}
            <span />
          </a>{" "}
          <div className="a-news-card__content">
            {" "}
            <div className="a-news-card__wrap">
              <a
                className="a-news-card__title"
                href="/stati/6-sposobov-ubrat-sneg-na-uchastke/">
                6 способов убрать снег на участке
              </a>
            </div>{" "}
          </div>
        </div>
      </div>
      <div className="a-page-news__item">
        <div className="a-news-card a-page-news__card" type="articles">
          <a
            className="a-news-card__picture"
            href="/stati/reyting-bolgarok-230-po-nadezhnosti-i-tsene/">
            <img
              alt="Рейтинг болгарок 230 по надежности и цене"
              className="a-news-card__image a-lazy-load a-is-loaded"
              src="https://cdn.bigam.ru/resize_cache/iblock/b4f/pup5jz8fmm5j2505ncnauv20s0mtdmrg/770_382_0/reyting_bolgarok_230_po_nadezhnosti_i_tsene_1.jpg"
            />{" "}
            <span />
          </a>{" "}
          <div className="a-news-card__content">
            {" "}
            <div className="a-news-card__wrap">
              <a
                className="a-news-card__title"
                href="/stati/reyting-bolgarok-230-po-nadezhnosti-i-tsene/">
                Рейтинг болгарок 230 по надежности и цене
              </a>
            </div>{" "}
          </div>
        </div>
      </div>
      <div className="a-page-news__item">
        <div className="a-news-card a-page-news__card" type="articles">
          <a
            className="a-news-card__picture"
            href="/stati/kak-vybrat-boiler-kosvennogo-nagreva/">
            <img
              alt="Как выбрать бойлер косвенного нагрева"
              className="a-news-card__image a-lazy-load a-is-loaded"
              src="https://cdn.bigam.ru/resize_cache/744213/c815982ac5e917f5de5d39415cbb16ea/iblock/276/276ed136c5fc5bd2a8bfe29a94407377/glavnaya.jpg"
            />{" "}
            <span />
          </a>{" "}
          <div className="a-news-card__content">
            {" "}
            <div className="a-news-card__wrap">
              <a
                className="a-news-card__title"
                href="/stati/kak-vybrat-boiler-kosvennogo-nagreva/">
                Как выбрать бойлер косвенного нагрева
              </a>
            </div>{" "}
          </div>
        </div>
      </div>
      <div className="a-page-news__item">
        <div className="a-news-card a-page-news__card" type="articles">
          <a
            className="a-news-card__picture"
            href="/stati/luchshaya-akkumulyatornaya-bolgarka/">
            <img
              alt="Рейтинг аккумуляторных болгарок"
              className="a-news-card__image a-lazy-load a-is-loaded"
              src="https://cdn.bigam.ru/resize_cache/iblock/eaa/2kamvavlduvwht9gcm1xze4qh1ns09on/770_382_0/luchshaya_akkumulyatornaya_bolgarka_4.jpg"
            />{" "}
            <span />
          </a>{" "}
          <div className="a-news-card__content">
            {" "}
            <div className="a-news-card__wrap">
              <a
                className="a-news-card__title"
                href="/stati/luchshaya-akkumulyatornaya-bolgarka/">
                Рейтинг аккумуляторных болгарок
              </a>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  </div>{" "}
  <div className="a-page-news__footer">
    <button
      className="a-main-button a-main-button--display-inline a-main-button--type-medium a-main-button--corner-round a-main-button--color-light-grey"
      type="button">
      {" "}
      <span className="a-main-button__wrap">
        {" "}
        <span className="a-main-button__content">Показать еще</span>{" "}
        <span className="a-main-button__constrain">
          <svg className="a-svg a-main-button__icon a-main-button__icon--right a-svg--medium a-main-button__icon--icon-meatballs a-main-button__icon--color">
            <use
              xlinkHref="#icon-meatballs"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            />
          </svg>
        </span>
      </span>{" "}
    </button>{" "}
    <div className="a-pagination">
      <span className="a-pagination__button">
        <svg className="a-svg a-pagination__icon a-pagination__icon--prev">
          <use
            xlinkHref="#icon-old-arrow"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          />
        </svg>
      </span>{" "}
      <ul className="a-pagination__list">
        <li className="a-pagination__item a-pagination__item--active">
          <span className="a-pagination__button">1</span>
        </li>
        <li className="a-pagination__item">
          <a className="a-pagination__button" href="/stati/?page=2">
            2
          </a>
        </li>
        <li className="a-pagination__item">
          <a className="a-pagination__button" href="/stati/?page=3">
            3
          </a>
        </li>
        <li className="a-pagination__item">
          <a className="a-pagination__button" href="/stati/?page=4">
            4
          </a>
        </li>
        <li className="a-pagination__item">
          <a className="a-pagination__button" href="/stati/?page=5">
            5
          </a>
        </li>
        <li className="a-pagination__item">
          <span className="a-pagination__button">...</span>
        </li>
        <li className="a-pagination__item">
          <a className="a-pagination__button" href="/stati/?page=37">
            37
          </a>
        </li>
      </ul>{" "}
      <a className="a-pagination__button" href="/stati/?page=2">
        <svg className="a-svg a-pagination__icon a-pagination__icon--next">
          <use
            xlinkHref="#icon-old-arrow"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          />
        </svg>
      </a>
    </div>
  </div>
</div>

    </main>
  );
}
