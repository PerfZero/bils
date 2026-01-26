"use client";

import React, { useState } from "react";
import Breadcrumbs from "./Breadcrumbs";
import BackButton from "./BackButton";
import NewsCard from "./NewsCard";
import Pagination from "./Pagination";
import TagsFilter from "./TagsFilter";
import YearFilter from "./YearFilter";

const NewsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  // Mock data - в реальном приложении это будет приходить с API
  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "О компании", href: "/about/" },
    { label: "Новости", isCurrent: true },
  ];

  const years = [
    "2026",
    "2025",
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
    "2014",
    "2013",
    "2011",
  ];

  const tags = ["Режим работы", "Акции", "Новинки", "События", "Статьи"];

  const newsData = [
    {
      id: "2051657",
      title:
        "BREMAX расширяет свой ассортимент, представив обширную линейку алюминиевых и стальных лестниц и стремянок от Торговой марки SNIRREX.",
      date: "13.01.2026",
      image:
        "https://cdn.bigam.ru/iblock/cd9/cd92d7692fcbb6d3a44d0aabe16a3083/713h260.jpg",
      imageAlt:
        "BREMAX расширяет свой ассортимент, представив обширную линейку алюминиевых и стальных лестниц и стремянок от Торговой марки SNIRREX.",
      href: "/about/novosti/bigam-rasshiryaet-svoi-assortiment-predstaviv-obshirnuyu-lineiku-alyuminievyh-i-stalnyh-lestnic-i-st/",
    },
    {
      id: "2051648",
      title:
        "Готовьтесь к зиме с выгодой! «Скидка выходного дня -20%» в «BREMAX»!",
      date: "13.01.2026",
      image:
        "https://cdn.bigam.ru/iblock/fd7/fd7589ba18ff0ba4356a1f0d51f6e70c/713h260.jpg",
      imageAlt:
        "Готовьтесь к зиме с выгодой! «Скидка выходного дня -20%» в «BREMAX»!",
      href: "/about/novosti/gotovtes-k-zime-s-vygodoi-skidka-vyhodnogo-dnya-20-v-bigam-/",
    },
    {
      id: "2049682",
      title: "Режим работы «BREMAX» в новогодние праздники 2026 год",
      date: "25.12.2025",
      image:
        "https://cdn.bigam.ru/iblock/090/090f7069344f49f87e88176e66a7def3/grafik-raboty_5.jpg",
      imageAlt: "Режим работы «BREMAX» в новогодние праздники 2026 год",
      href: "/about/novosti/rezhim-raboty-bigam-v-novogodnie-prazdniki-2026-god/",
    },
    {
      id: "2045146",
      title: "Воскресная скидка -20%",
      date: "04.12.2025",
      image:
        "https://cdn.bigam.ru/iblock/ac4/ac4f0c49f5a0e62c8567cdf5583135a6/713h260-_7_.jpg",
      imageAlt: "Воскресная скидка -20%",
      href: "/about/novosti/voskresnaya-skidka-20/",
    },
    {
      id: "2010264",
      title: "В «BREMAX» стартует БОЛЬШАЯ РАСПРОДАЖА со скидками до 30%",
      date: "12.09.2025",
      image:
        "https://cdn.bigam.ru/iblock/824/824b3d60bfe35cfb88879d2e15d275f2/713h260-_6_.jpg",
      imageAlt: "В «BREMAX» стартует БОЛЬШАЯ РАСПРОДАЖА со скидками до 30%",
      href: "/about/novosti/v-bigam-startuet-bolshaya-rasprodazha-so-skidkami-do-30/",
    },
    {
      id: "2009812",
      title: "Сварочные инверторы SNIRREX: мощность, надежность и инновации",
      date: "11.09.2025",
      image:
        "https://cdn.bigam.ru/iblock/a36/a36d2bfef6185c7c3961c7ebed2768f7/svarka-SNIRREX_713h260.jpg",
      imageAlt: "Сварочные инверторы SNIRREX: мощность, надежность и инновации",
      href: "/about/novosti/svarochnye-invertory-snirrex-moshchnost-nadezhnost-i-innovacii/",
    },
    {
      id: "1997988",
      title: "Компрессоры SNIRREX — мощность и надежность для любых задач",
      date: "19.08.2025",
      image:
        "https://cdn.bigam.ru/iblock/1bd/1bd6ba68e0f45cac340c810f53a552b7/kompressory-SNIRREX_713h260_1_-_1_.jpg",
      imageAlt: "Компрессоры SNIRREX — мощность и надежность для любых задач",
      href: "/about/novosti/kompressory-snirrex-moshchnost-i-nadezhnost-dlya-lyubyh-zadach/",
    },
    {
      id: "1994487",
      title:
        "BREMAX приглашает ярославцев на грандиозный «Праздник инструмента»!",
      date: "14.08.2025",
      image:
        "https://cdn.bigam.ru/iblock/fa4/fa4e2414dc3b2b91f67470f147fd7bc2/713h260_2.jpg",
      imageAlt:
        "BREMAX приглашает ярославцев на грандиозный «Праздник инструмента»!",
      href: "/about/novosti/bigam-priglashaet-yaroslavcev-na-grandioznyi-prazdnik-instrumenta-/",
    },
    {
      id: "1992571",
      title:
        "BREMAX приглашает жителей г. Кинешмы на грандиозный «Праздник инструмента»!",
      date: "07.08.2025",
      image:
        "https://cdn.bigam.ru/iblock/a12/a12c2079be7b48ff94bf7b355b5bb19c/713h260_Kineshma.jpg",
      imageAlt:
        "BREMAX приглашает жителей г. Кинешмы на грандиозный «Праздник инструмента»!",
      href: "/about/novosti/bigam-priglashaet-zhitelei-g-kineshmy-na-grandioznyi-prazdnik-instrumenta-/",
    },
  ];

  const totalPages = 23;

  const handleLoadMore = () => {
    // В реальном приложении здесь будет запрос к API
    console.log("Load more news");
  };

  return (
    <div className="a-page-news a-page__main">
      <div className="a-page-news__container">
        <Breadcrumbs items={breadcrumbs} className="a-page-news__breadcrumbs" />
        <BackButton
          href="/about/"
          text="О компании"
          className="a-page-news__back"
        />
      </div>

      <div className="a-page-news__container">
        <div className="a-page-news__header">
          <h1 className="a-page-news__title">Новости</h1>{" "}
          <button
            aria-label="Все года"
            className="a-page-news__date-fake"
            type="button"
          >
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
                    defaultValue=""
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
                  title="Все года"
                >
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
                <li className="a-field-select__item" title="2017">
                  <div
                    className="a-field-select__text"
                    style={{
                      "--filter-item-text": "'2017'",
                    }}
                  />
                </li>
                <li className="a-field-select__item" title="2016">
                  <div
                    className="a-field-select__text"
                    style={{
                      "--filter-item-text": "'2016'",
                    }}
                  />
                </li>
                <li className="a-field-select__item" title="2015">
                  <div
                    className="a-field-select__text"
                    style={{
                      "--filter-item-text": "'2015'",
                    }}
                  />
                </li>
                <li className="a-field-select__item" title="2014">
                  <div
                    className="a-field-select__text"
                    style={{
                      "--filter-item-text": "'2014'",
                    }}
                  />
                </li>
                <li className="a-field-select__item" title="2013">
                  <div
                    className="a-field-select__text"
                    style={{
                      "--filter-item-text": "'2013'",
                    }}
                  />
                </li>
                <li className="a-field-select__item" title="2011">
                  <div
                    className="a-field-select__text"
                    style={{
                      "--filter-item-text": "'2011'",
                    }}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="a-page-news__tags">
          <div className="js-tags a-tags">
            {" "}
            <ul className="a-tags__groups">
              <li className="js-tags__group a-tags__group a-tags__group--hide">
                <div className="a-tags__title">Поиск по теме</div>{" "}
                <ul className="js-tags__list a-tags__list">
                  <li
                    className="js-tags__item a-tags__item"
                    style={{ display: "" }}
                  >
                    <div
                      aria-label="Режим работы"
                      title="Режим работы"
                      className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                    >
                      <a
                        href="/about/novosti/?tag=%D0%A0%D0%B5%D0%B6%D0%B8%D0%BC%20%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%8B"
                        aria-label="Режим работы"
                        title="Режим работы"
                        className="a-ellipse-button__button nuxt-link-active"
                      >
                        {/**/}{" "}
                        <span className="a-ellipse-button__text">
                          Режим работы
                        </span>{" "}
                        {/**/}
                      </a>{" "}
                      {/**/} {/**/}
                    </div>
                  </li>{" "}
                  <li
                    className="js-tags__more a-tags__item a-tags__item--more"
                    style={{ display: "none" }}
                  >
                    <div
                      aria-label="ещё"
                      title="ещё"
                      className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange"
                    >
                      <button
                        aria-label="ещё"
                        title="ещё"
                        type="button"
                        className="a-ellipse-button__button"
                      >
                        {/**/}{" "}
                        <span className="a-ellipse-button__text">ещё</span>{" "}
                        <span className="a-ellipse-button__icon">
                          <svg className="a-svg">
                            <use
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              xlinkHref="#icon-meatballs"
                            />
                          </svg>
                        </span>
                      </button>{" "}
                      {/**/} {/**/}
                    </div>
                  </li>
                </ul>
              </li>
            </ul>{" "}
          </div>
        </div>

        <div className="a-page-news__main">
          <div className="a-page-news__list">
            {newsData.map((news) => (
              <div key={news.id} className="a-page-news__item">
                <NewsCard
                  id={news.id}
                  title={news.title}
                  date={news.date}
                  image={news.image}
                  imageAlt={news.imageAlt}
                  href={news.href}
                  className="a-page-news__card"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="a-page-news__footer">
          <button
            type="button"
            className="a-main-button a-main-button--display-inline a-main-button--type-medium a-main-button--corner-round a-main-button--color-light-grey"
            onClick={handleLoadMore}
          >
            <span className="a-main-button__wrap">
              <span className="a-main-button__content">Показать еще</span>
              <span className="a-main-button__constrain">
                <svg className="a-svg a-main-button__icon a-main-button__icon--right a-svg--medium a-main-button__icon--icon-meatballs a-main-button__icon--color">
                  <use
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xlinkHref="#icon-meatballs"
                  ></use>
                </svg>
              </span>
            </span>
          </button>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
