"use client";

import Breadcrumbs from "../components/Breadcrumbs";

export default function CatalogSlugPage({ params }) {
  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Видео" },
  ];

  return (
    <main className="a-page-static a-page__main">
      <div className="a-page-catalog__container">
        <Breadcrumbs
          items={breadcrumbs}
          className="a-page-catalog__breadcrumbs"
        />

      </div>
 <div className="a-page-news__container">
  <div className="a-page-news__header">
    <h1 className="a-page-news__title">Видео</h1>{" "}
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
        <div className="a-news-card a-page-news__card" type="videos">
          <a
            className="a-news-card__picture"
            href="/videos/novinka-benzogeneratory-snirrex-horoshii-generator-dlya-doma/">
            <img
              alt="Новинка! Бензогенераторы Snirrex / Хороший генератор для дома"
              className="a-news-card__image a-lazy-load a-is-loaded"
              src="https://cdn.bigam.ru/resize_cache/iblock/23a/g2cc3nskzq4qz4qonhhg1946tz5w1pl0/770_382_0/Prevyu-YUtub.jpg"
            />{" "}
            <span />
          </a>{" "}
          <div className="a-news-card__content">
            {" "}
            <div className="a-news-card__wrap">
              <a
                className="a-news-card__title"
                href="/videos/novinka-benzogeneratory-snirrex-horoshii-generator-dlya-doma/">
                Новинка! Бензогенераторы Snirrex / Хороший генератор для дома
              </a>
            </div>{" "}
          </div>
        </div>
      </div>
      <div className="a-page-news__item">
        <div className="a-news-card a-page-news__card" type="videos">
          <a
            className="a-news-card__picture"
            href="/videos/vybiraem-stroitelnyi-pylesos-obzor-daewoo-davc-2514s/">
            <img
              alt="Выбираем строительный пылесос / Обзор Daewoo DAVC 2514S"
              className="a-news-card__image a-lazy-load a-is-loaded"
              src="https://cdn.bigam.ru/resize_cache/iblock/7c8/9ii19986rcod7o7dg2mb9l17pgwcnv24/770_382_0/Prevyu.jpg"
            />{" "}
            <span />
          </a>{" "}
          <div className="a-news-card__content">
            {" "}
            <div className="a-news-card__wrap">
              <a
                className="a-news-card__title"
                href="/videos/vybiraem-stroitelnyi-pylesos-obzor-daewoo-davc-2514s/">
                Выбираем строительный пылесос / Обзор Daewoo DAVC 2514S
              </a>
            </div>{" "}
          </div>
        </div>
      </div>
      <div className="a-page-news__item">
        <div className="a-news-card a-page-news__card" type="videos">
          <a
            className="a-news-card__picture"
            href="/videos/testiruem-novinku-akkumulyatornyi-snegouborshchik-ot-daewoo/">
            <img
              alt="Тестируем новинку - аккумуляторный снегоуборщик от Daewoo"
              className="a-news-card__image a-lazy-load a-is-loaded"
              src="https://cdn.bigam.ru/resize_cache/iblock/edb/tv3kagplw80grrucdvvc2j0nx401u8zd/770_382_0/Prevyu-DAEWOO-dast-3321.jpg"
            />{" "}
            <span />
          </a>{" "}
          <div className="a-news-card__content">
            {" "}
            <div className="a-news-card__wrap">
              <a
                className="a-news-card__title"
                href="/videos/testiruem-novinku-akkumulyatornyi-snegouborshchik-ot-daewoo/">
                Тестируем новинку - аккумуляторный снегоуборщик от Daewoo
              </a>
            </div>{" "}
          </div>
        </div>
      </div>
      <div className="a-page-news__item">
        <div className="a-news-card a-page-news__card" type="videos">
          <a
            className="a-news-card__picture"
            href="/videos/kak-organizovat-otopitelnuyu-sistemu-v-chastnom-dome-zakrytaya-sistema-otopleniya/">
            <img
              alt="Как организовать отопительную систему в частном доме? / Закрытая система отопления"
              className="a-news-card__image a-lazy-load a-is-loaded"
              src="https://cdn.bigam.ru/resize_cache/iblock/d97/ef6dya6pildtq3rciv71rnh4f5z3jgq2/770_382_0/otoplenie-_1_.jpg"
            />{" "}
            <span />
          </a>{" "}
          <div className="a-news-card__content">
            {" "}
            <div className="a-news-card__wrap">
              <a
                className="a-news-card__title"
                href="/videos/kak-organizovat-otopitelnuyu-sistemu-v-chastnom-dome-zakrytaya-sistema-otopleniya/">
                Как организовать отопительную систему в частном доме? / Закрытая
                система отопления
              </a>
            </div>{" "}
          </div>
        </div>
      </div>
      <div className="a-page-news__item">
        <div className="a-news-card a-page-news__card" type="videos">
          <a
            className="a-news-card__picture"
            href="/videos/otlichnyi-shurupovert-ot-interskol-obzor-na-interskol-da-10-18v/">
            <img
              alt="Отличный шуруповерт от Интерскол! / Обзор на Интерскол ДА-10/18В"
              className="a-news-card__image a-lazy-load a-is-loaded"
              src="https://cdn.bigam.ru/resize_cache/iblock/2ef/gtq5yq42fgv2xmx9t3zvgyll6d9w513c/770_382_0/interskol-_1_.jpg"
            />{" "}
            <span />
          </a>{" "}
          <div className="a-news-card__content">
            {" "}
            <div className="a-news-card__wrap">
              <a
                className="a-news-card__title"
                href="/videos/otlichnyi-shurupovert-ot-interskol-obzor-na-interskol-da-10-18v/">
                Отличный шуруповерт от Интерскол! / Обзор на Интерскол ДА-10/18В
              </a>
            </div>{" "}
          </div>
        </div>
      </div>
      <div className="a-page-news__item">
        <div className="a-news-card a-page-news__card" type="videos">
          <a
            className="a-news-card__picture"
            href="/videos/kakie-byvayut-konvektory-kak-vybrat-konvektor-samyi-ekonomichnyi-obogrevatel/">
            <img
              alt="Какие бывают конвекторы? / Как выбрать конвектор? / Самый экономичный обогреватель!"
              className="a-news-card__image a-lazy-load a-is-loaded"
              src="https://cdn.bigam.ru/resize_cache/iblock/332/ietqljwb4b47xlk7myqbdnnbd8jmw1f0/770_382_0/konvektory-_1_.jpg"
            />{" "}
            <span />
          </a>{" "}
          <div className="a-news-card__content">
            {" "}
            <div className="a-news-card__wrap">
              <a
                className="a-news-card__title"
                href="/videos/kakie-byvayut-konvektory-kak-vybrat-konvektor-samyi-ekonomichnyi-obogrevatel/">
                Какие бывают конвекторы? / Как выбрать конвектор? / Самый
                экономичный обогреватель!
              </a>
            </div>{" "}
          </div>
        </div>
      </div>
      <div className="a-page-news__item">
        <div className="a-news-card a-page-news__card" type="videos">
          <a
            className="a-news-card__picture"
            href="/videos/chem-otlichayutsya-elektropily-i-benzopily/">
            <img
              alt="Чем отличаются электропилы и бензопилы?"
              className="a-news-card__image a-lazy-load a-is-loaded"
              src="https://cdn.bigam.ru/resize_cache/iblock/716/vcpjq65q7d53zophvjldv5bk3nignid0/770_382_0/benzopily-_1_.jpg"
            />{" "}
            <span />
          </a>{" "}
          <div className="a-news-card__content">
            {" "}
            <div className="a-news-card__wrap">
              <a
                className="a-news-card__title"
                href="/videos/chem-otlichayutsya-elektropily-i-benzopily/">
                Чем отличаются электропилы и бензопилы?
              </a>
            </div>{" "}
          </div>
        </div>
      </div>
      <div className="a-page-news__item">
        <div className="a-news-card a-page-news__card" type="videos">
          <a
            className="a-news-card__picture"
            href="/videos/vybiraem-trimmer-dlya-dachi-na-chto-stoit-obratit-vnimanie-pri-pokupke-trimmera/">
            <img
              alt="Выбираем триммер для дачи / На что стоит обратить внимание при покупке триммера"
              className="a-news-card__image a-lazy-load a-is-loaded"
              src="https://cdn.bigam.ru/resize_cache/iblock/f07/um0vdylqfztd5b6rp8e1u72amh3ejgg9/770_382_0/trimmery-_1_.jpg"
            />{" "}
            <span />
          </a>{" "}
          <div className="a-news-card__content">
            {" "}
            <div className="a-news-card__wrap">
              <a
                className="a-news-card__title"
                href="/videos/vybiraem-trimmer-dlya-dachi-na-chto-stoit-obratit-vnimanie-pri-pokupke-trimmera/">
                Выбираем триммер для дачи / На что стоит обратить внимание при
                покупке триммера
              </a>
            </div>{" "}
          </div>
        </div>
      </div>
      <div className="a-page-news__item">
        <div className="a-news-card a-page-news__card" type="videos">
          <a
            className="a-news-card__picture"
            href="/videos/kak-organizovat-sistemu-vodosnabzheniya-v-chastnom-dome/">
            <img
              alt="Как организовать систему водоснабжения в частном доме?"
              className="a-news-card__image a-lazy-load a-is-loaded"
              src="https://cdn.bigam.ru/resize_cache/iblock/7ab/0nfpl91wicx93o52bh2uxhqk2yin8r7v/770_382_0/800-_1_.jpg"
            />{" "}
            <span />
          </a>{" "}
          <div className="a-news-card__content">
            {" "}
            <div className="a-news-card__wrap">
              <a
                className="a-news-card__title"
                href="/videos/kak-organizovat-sistemu-vodosnabzheniya-v-chastnom-dome/">
                Как организовать систему водоснабжения в частном доме?
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
          <a className="a-pagination__button" href="/videos/?page=2">
            2
          </a>
        </li>
        <li className="a-pagination__item">
          <a className="a-pagination__button" href="/videos/?page=3">
            3
          </a>
        </li>
        <li className="a-pagination__item">
          <a className="a-pagination__button" href="/videos/?page=4">
            4
          </a>
        </li>
        <li className="a-pagination__item">
          <a className="a-pagination__button" href="/videos/?page=5">
            5
          </a>
        </li>
        <li className="a-pagination__item">
          <span className="a-pagination__button">...</span>
        </li>
        <li className="a-pagination__item">
          <a className="a-pagination__button" href="/videos/?page=16">
            16
          </a>
        </li>
      </ul>{" "}
      <a className="a-pagination__button" href="/videos/?page=2">
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
