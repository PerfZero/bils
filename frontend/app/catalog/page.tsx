"use client";

import Breadcrumbs from "../components/Breadcrumbs";

export default function CatalogSlugPage({ params }) {
  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Каталог", href: "/catalog" },
  ];

  return (
    <main className="a-page-catalog a-page-catalog--type-a a-page-catalog--contrast a-page__main">
      <div className="a-page-catalog__container">
        <Breadcrumbs
          items={breadcrumbs}
          className="a-page-catalog__breadcrumbs"
        />
        <div className="a-back a-page-catalog__back">
          <a className="a-back__link nuxt-link-active" href="/catalog">
            <svg className="a-svg a-back__icon">
              <use
                xlinkHref="#icon-old-arrow"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              />
            </svg>
            <span className="a-back__text">Каталог</span>
          </a>
        </div>
      </div>
      <div className="a-page-catalog__container">
        <section className="a-page-catalog__section a-page-catalog__section--catalog">
          <h1 className="a-page-catalog__title">Каталог товаров</h1>{" "}
          <div className="a-page-catalog__grid a-page-catalog__grid--large">
            <div className="a-page-catalog__column">
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Инструмент"
                    src="https://cdn.bigam.ru/iblock/554/y1bc00cwxpdpovvksmkq5m72em57vj06/Instrument.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/instrument-5748/"
                    >
                      Инструмент
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/elektroinstrument-5749/"
                      >
                        Электроинструмент
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/ruchnoy-instrument-5754/"
                      >
                        Ручной инструмент
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/izmeritelnyj-instrument-5753/"
                      >
                        Измерительный инструмент
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/benzoinstrument-5752/"
                      >
                        Бензоинструмент
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/pnevmoinstrument-5751/"
                      >
                        Пневмоинструмент
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/akkumulyatornyj-instrument-7654/"
                      >
                        Аккумуляторный инструмент
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/rezhushchiy-instrument-7758/"
                      >
                        Режущий инструмент
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/shtukaturnyj-instrument-7759/"
                      >
                        Штукатурный инструмент
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/nasadki-dlya-instrumenta-7762/"
                      >
                        Насадки для инструмента
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/kraskopulty-9469/"
                      >
                        Краскопульты
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/pily-7726/"
                      >
                        Пилы
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/slesarnyj-instrument-7797/"
                      >
                        Слесарный инструмент
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/steplery-9277/"
                      >
                        Степлеры
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/stroitelnye-pistolety-8082/"
                      >
                        Строительные пистолеты
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/instrument-5748/"
                />
              </div>
            </div>
            <div className="a-page-catalog__column">
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Все для сада и огорода"
                    src="https://cdn.bigam.ru/iblock/a39/a3914fd996064d8c958d0ed035403fc6/Vse_dlya_sada_i_ogoroda_osen_zima.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/vse-dlya-sada-i-ogoroda-5880/"
                    >
                      Все для сада и огорода
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/tovary-i-tekhnika-dlya-uborki-snega-i-lda-5886/"
                      >
                        Товары и техника для уборки снега и льда
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/sadovaya-tekhnika-5881/"
                      >
                        Садовая техника
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/sadovyj-inventar-5882/"
                      >
                        Садовый инвентарь
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/sistemy-poliva-5883/"
                      >
                        Системы полива
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/komplektuyushhie-dlya-sadovoj-tekhniki-i-instrumenta-5887/"
                      >
                        Для садовой техники
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/obrabotka-pochvy-10189/"
                      >
                        Обработка почвы
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/sadovaya-mebel-10430/"
                      >
                        Садовая мебель
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/tovary-dlya-obustroistva-dachi-i-sada-10443/"
                      >
                        Товары для обустройства дачи и сада
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/vse-dlya-sada-i-ogoroda-5880/"
                />
              </div>
            </div>
          </div>{" "}
          <div className="a-page-catalog__grid a-page-catalog__grid--desktop">
            <div className="a-page-catalog__column">
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Водоснабжение, сантехника и отопление"
                    src="https://cdn.bigam.ru/iblock/ce6/i2hk5k2vr502jf8oy59hu9aw9v6w9ymw/Vodosnabzhenie.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/vodosnabzhenie-santekhnika-i-otoplenie-6069/"
                    >
                      Водоснабжение, сантехника и отопление
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/otoplenie-6071/"
                      >
                        Отопление
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/vodosnabzhenie-6070/"
                      >
                        Водоснабжение
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/santekhnika-6072/"
                      >
                        Сантехника
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/inzhenernaya-santekhnika-6073/"
                      >
                        Инженерная сантехника
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/komplektuyushhie-dlya-vodosnabzheniya-i-santekhniki-6074/"
                      >
                        Комплектующие для водоснабжения и сантехники
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/vodosnabzhenie-santekhnika-i-otoplenie-6069/"
                />
              </div>
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Климатическое оборудование"
                    src="https://cdn.bigam.ru/iblock/69e/a3x26pmy476k1b6yjzavpenpiuqcasr3/Klimaticheskoe_oborudovanie.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/klimaticheskoe-oborudovanie-5944/"
                    >
                      Климатическое оборудование
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/kondicionery-5945/"
                      >
                        Кондиционеры
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/ventilyacionnoe-oborudovanie-5950/"
                      >
                        Вентиляционное оборудование
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/sistemy-teplogo-pola-5946/"
                      >
                        Системы теплого пола
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/teplovoe-oborudovanie-5949/"
                      >
                        Тепловое оборудование
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/komplektuyushhie-dlya-klimaticheskogo-oborudovaniya-5947/"
                      >
                        Комплектующие для климатического оборудования
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/brizery-11101/"
                      >
                        Бризеры
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/uvlazhniteli-osushiteli-ochistiteli-6615/"
                      >
                        Оборудование поддержания влажности
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/klimaticheskoe-oborudovanie-5944/"
                />
              </div>
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Средства индивидуальной защиты"
                    src="https://cdn.bigam.ru/iblock/3dc/s0bav30pdr1793ei5ea3w06z065lj5a0/Sredstva_individualnoi_zashchity_2.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/sredstva-individualnoj-zashhity-6358/"
                    >
                      Средства индивидуальной защиты
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/specodezhda-6197/"
                      >
                        Спецодежда
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/zashhita-golovy2-6357/"
                      >
                        СИЗ головы
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/montazhnye-poyasa-6605/"
                      >
                        Страховочные привязи и монтажные пояса
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/komplektuyushhie-dlya-sredstv-zashhity-6367/"
                      >
                        Комплектующие для средств защиты
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/dielektricheskie-kovriki-7250/"
                      >
                        Диэлектрические коврики
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/sredstva-individualnoj-zashhity-6358/"
                />
              </div>
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Запасные части и комплектующие"
                    src="https://cdn.bigam.ru/iblock/121/zw0k5tqkvjut3lga8xakt502tkrig211/Zapasnye_chasti_i_komplektuyushchie.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/zapasnye-chasti-i-komplektuyushhie-6352/"
                    >
                      Запасные части и комплектующие
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/zapchasti-6733/"
                      >
                        Запчасти
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/dlya-prochej-tekhniki-6328/"
                      >
                        Для прочей техники
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/po-tipu-tovara-7279/"
                      >
                        По типу товара
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/elektromotory-6792/"
                      >
                        Электромоторы
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/zapasnye-chasti-i-komplektuyushhie-6352/"
                />
              </div>
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Уцененные товары"
                    src="https://cdn.bigam.ru/resize_cache/661370/02f3bf84f3aa71bb65154dd183b1be90/iblock/378/3785713d585044786c4677db528ddc28/Ucenennye_tovary.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/discharged-goods/"
                    >
                      Уцененные товары
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/discharged-goods/?section=1452"
                      >
                        Инструмент
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/discharged-goods/?section=1453"
                      >
                        Все для сада и огорода
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/discharged-goods/?section=1454"
                      >
                        Водоснабжение, сантехника и отопление
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/discharged-goods/"
                />
              </div>
            </div>
            <div className="a-page-catalog__column">
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Сварочное оборудование"
                    src="https://cdn.bigam.ru/iblock/6bc/n75vgzefnlernihw401j9h2besw8uuyv/svarka.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/svarochnoe-oborudovanie-6350/"
                    >
                      Сварочное оборудование
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/elektrosvarochnoe-oborudovanie-6143/"
                      >
                        Электросварочное оборудование
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/payalnye-lampy-6145/"
                      >
                        Паяльные лампы
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/komplektuyushhie-dlya-svarochnogo-oborudovaniya-6146/"
                      >
                        Комплектующие для сварочного оборудования
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/gazosvarochnoe-oborudovanie-6144/"
                      >
                        Газосварочное оборудование
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/lazernoe-svarochnoe-oborudovanie-10706/"
                      >
                        Лазерное сварочное оборудование
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/svarochnye-apparaty-7708-9492/"
                      >
                        Сварочные аппараты
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/svarochnye-gorelki-i-plazmotrony-9634/"
                      >
                        Сварочные горелки и плазмотроны
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/svarochnye-shlemy-6199/"
                      >
                        Сварочные маски
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/tochechnaya-svarka-10105/"
                      >
                        Точечная сварка
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/svarochnoe-oborudovanie-6350/"
                />
              </div>
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Уборка и клининг"
                    src="https://cdn.bigam.ru/iblock/2f6/2f6caa97fc8050712da83e533c3eecde/Uborka_i_klining.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/uborka-i-klining-6018/"
                    >
                      Уборка и клининг
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/mojki-vysokogo-davleniya-6020/"
                      >
                        Мойки высокого давления
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/pylesosy-6019/"
                      >
                        Пылесосы
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/stekloochistiteli-6024/"
                      >
                        Стеклоочистители
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/chistyashhaya-khimiya-6022/"
                      >
                        Чистящая химия
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/podmetalno-uborochnye-mashiny-7148/"
                      >
                        Подметально-уборочные машины
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/komplektuyushhie-dlya-kliningovogo-oborudovaniya-6025/"
                      >
                        Комплектующие для клинингового оборудования
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/parogeneratory-promyshlennye-elektricheskie-11243/"
                      >
                        Парогенераторы промышленные электрические
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/polomoechnye-mashiny-10284/"
                      >
                        Поломоечные машины
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/uborochnyy-inventar-4216/"
                      >
                        Уборочный инвентарь
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/uborka-i-klining-6018/"
                />
              </div>
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Складское оборудование"
                    src="https://cdn.bigam.ru/iblock/a1a/r7lphouho4q9noop4hut54hu6pz1iciz/Skladskoe_oborudovanie.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/skladskoe-oborudovanie-9344/"
                    >
                      Складское оборудование
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/vesy-10855/"
                      >
                        Весы
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/vyshki-podemnye-13153/"
                      >
                        Вышки подъемные
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/napolnye-pokrytiya-dlya-skladskih-i-proizvodstvennyh-pomeshchenii-13032/"
                      >
                        Напольные покрытия для складских и производственных
                        помещений
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/pogruzchiki-13152/"
                      >
                        Погрузчики
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/pozharnoe-oborudovanie-9369/"
                      >
                        Пожарное оборудование
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/sredstva-ograzhdeniya-dlya-dorozhnyh-i-avariinyh-rabot-13028/"
                      >
                        Средства ограждения для дорожных и аварийных работ
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/stellazhi-9871/"
                      >
                        Стеллажи
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/shtabelery-10645/"
                      >
                        Штабелеры
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/skladskoe-oborudovanie-9344/"
                />
              </div>
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Товары для туризма и отдыха"
                    src="https://cdn.bigam.ru/iblock/a08/5o69zlrkh50ch4vpbc0qj0xd9fcbyatm/turizm.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/tovary-pervoj-neobkhodimosti-7199/"
                    >
                      Товары для туризма и отдыха
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/sani-9536/"
                      >
                        Сани-волокуши
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/turisticheskii-inventar-9724/"
                      >
                        Туристический инвентарь
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/turisticheskie-gorelki-9720/"
                      >
                        Туристические горелки
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/gazovye-ballony-dlya-gorelok-9721/"
                      >
                        Газовые баллоны для горелок
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/sredstva-protiv-nasekomykh-7212/"
                      >
                        Средства против насекомых и грызунов
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/vs-dlya-shashlyka-i-barbekyu-7222/"
                      >
                        Всё для шашлыка, гриля и барбекю
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/batuty-10486/"
                      >
                        Батуты
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/kovriki-turisticheskie-10442/"
                      >
                        Коврики туристические
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/metalloiskateli-10405/"
                      >
                        Металлоискатели
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/spalniki-10937/"
                      >
                        Спальники
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/sumki-turisticheskie-10473/"
                      >
                        Сумки туристические
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/turisticheskaya-mebel-10471/"
                      >
                        Туристическая мебель
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/turisticheskaya-posuda-10472/"
                      >
                        Туристическая посуда
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/turisticheskie-palatki-10851/"
                      >
                        Туристические палатки
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/turisticheskie-ryukzaki-10490/"
                      >
                        Туристические рюкзаки
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/tovary-pervoj-neobkhodimosti-7199/"
                />
              </div>
            </div>
            <div className="a-page-catalog__column">
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Станки"
                    src="https://cdn.bigam.ru/iblock/61d/8dcmwzble29m5gbkdux6v4q06upowybv/stanki.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/stanki-6351/"
                    >
                      Станки
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/derevoobrabatyvayushhie-stanki-6173/"
                      >
                        Деревообрабатывающие станки
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/metalloobrabatyvayushhie-stanki-6174/"
                      >
                        Металлообрабатывающие станки
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/kamneobrabatyvayushhie-stanki-6175/"
                      >
                        Камнеобрабатывающие станки
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/verstaki-i-stoly-6425/"
                      >
                        Верстаки и столы
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/komplektuyushhie-dlya-stankov-6177/"
                      >
                        Комплектующие
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/lentochnye-pily-lentochnopilnye-stanki-9398/"
                      >
                        Ленточные пилы (ленточнопильные станки)
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/mnogofunkcionalnye-stanki-9303/"
                      >
                        Многофункциональные станки
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/pilnye-stanki-9775/"
                      >
                        Распиловочные станки
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/sverlilnye-stanki-6187/"
                      >
                        Сверлильные станки
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/tokarnye-stanki-9448/"
                      >
                        Токарные станки
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/stanki-6351/"
                />
              </div>
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Электрика и свет"
                    src="https://cdn.bigam.ru/iblock/186/oahnsqe1f3532iry2ddf2kzb0uue6fid/Elektrika.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/elektrika-i-svet-5972/"
                    >
                      Электрика и свет
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/generatory-5973/"
                      >
                        Генераторы
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/stabilizatory-napryazheniya-i-ibp-5979/"
                      >
                        Стабилизаторы напряжения
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/kabeli-shnury-provoda-5974/"
                      >
                        Кабели и провода
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/instrument-dlya-elektriki-5975/"
                      >
                        Инструмент для электрики
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/udliniteli-5988/"
                      >
                        Сетевые удлинители
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/istochniki-besperebojnogo-pitaniya-7252/"
                      >
                        Источники бесперебойного питания (ИБП)
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/blok-avtomatiki-7256/"
                      >
                        Автоматика для электростанций
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/svetilniki-9664/"
                      >
                        Светильники
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/lampy-7206/"
                      >
                        Лампы
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/samoreguliruemye-greyushhie-kabeli-5989/"
                      >
                        Нагревательные кабели (греющие)
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/avtomaticheskie-vyklyuchateli-6554/"
                      >
                        Автоматические выключатели
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/avtotransformatory-6735/"
                      >
                        Автотрансформаторы
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/blok-zashhity-ot-povyshennogo-napryazheniya-7205/"
                      >
                        Блок защиты от повышенного напряжения
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/bloki-pitaniya-11058/"
                      >
                        Блоки питания
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/vilki-elektricheskie-9938/"
                      >
                        Вилки электрические
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/dyuralait-10970/"
                      >
                        Дюралайт
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/izolenta-6561/"
                      >
                        Изолента
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/komplektuyushhie-dlya-elektriki-5981/"
                      >
                        Комплектующие для электрики
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/payallnoe-oborudovanie-10391/"
                      >
                        Паяльное оборудование
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/rozetki-6607/"
                      >
                        Розетки и выключатели
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/svetodiodnye-lenty-10969/"
                      >
                        Светодиодные ленты
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/schetchiki-elektroenergii-9932/"
                      >
                        Счетчики электроэнергии
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/uzo-ustroistva-zashchitnogo-otklyucheniya-vdt-udt-11264/"
                      >
                        УЗО (устройства защитного отключения, ВДТ, УДТ)
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/ustroistva-elektropitaniya-13382/"
                      >
                        Устройства электропитания
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/izolyatory-11258/"
                      >
                        Шинные изоляторы (бочонки)
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/shchitovoe-oborudovanie-11250/"
                      >
                        Щитовое оборудование
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/elektromontazhnaya-produkciya-11259/"
                      >
                        Электромонтажная продукция
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/elektrika-i-svet-5972/"
                />
              </div>
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Крепеж"
                    src="https://cdn.bigam.ru/iblock/0ac/0aa3f3kbr1p71ib07ytn59rh2o060m0e/krepezh.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/krepezh-6566/"
                    >
                      Крепеж
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/metizy-9237/"
                      >
                        Метизы
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/khomuty-6540/"
                      >
                        Хомуты
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/verevki-i-kanaty-6550/"
                      >
                        Верёвки, канаты и шнуры
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/lenty-6562/"
                      >
                        Монтажные ленты
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/takelazh-9638/"
                      >
                        Такелаж
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/krepezh-dlya-kabelya-10877/"
                      >
                        Крепёж для кабеля
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/mebelnyi-krepezh-10888/"
                      >
                        Мебельный крепеж
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/perforirovannyi-krepezh-10874/"
                      >
                        Перфорированный крепеж
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/skrytyi-krepezh-10879/"
                      >
                        Скрытый крепеж
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/specialnyi-krepezh-10915/"
                      >
                        Специальный крепеж
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/krepezh-6566/"
                />
              </div>
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Товары для офиса и дома"
                    src="https://cdn.bigam.ru/iblock/904/904cba5b291e18804d9697df4188c487/tovary_dlya_ofisa_i_doma.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/tovary-dlya-ofisa-i-doma-10996/"
                    >
                      Товары для офиса и дома
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/bytovaya-tehnika-10998/"
                      >
                        Бытовая техника
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/sredstva-lichnoi-gigieny-10483/"
                      >
                        Средства личной гигиены
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/tovary-dlya-prazdnika-10924/"
                      >
                        Товары для праздника
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/hozyaistvannye-tovary-10997/"
                      >
                        Хозяйственные товары
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/tovary-dlya-ofisa-i-doma-10996/"
                />
              </div>
            </div>
            <div className="a-page-catalog__column">
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Строительная техника"
                    src="https://cdn.bigam.ru/iblock/9e4/pxu2rfodk78vr08b8n5uas827l208v2x/Stroitelnaya_tehnika.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/stroitelnaya-tekhnika-6029/"
                    >
                      Строительная техника
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/kompressory-vozdushnye-6032/"
                      >
                        Пневматические компрессоры
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/lestnicy-i-vyshki-6038/"
                      >
                        Лестницы и вышки
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/gruzopodemnoe-oborudovanie-6039/"
                      >
                        Грузоподъемное оборудование
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/vibrooborudovanie-6034/"
                      >
                        Виброоборудование
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/betonomeshalki-6030/"
                      >
                        Электрические бетономешалки
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/tachki-stroitelnye-6041/"
                      >
                        Тачки строительные
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/komplektuyushhie-dlya-stroitelnoj-tekhniki-6044/"
                      >
                        Запчасти для строительной техники
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/zatirochnye-mashiny-6036/"
                      >
                        Затирочные машины
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/okrasochnoe-oborudovanie-9351/"
                      >
                        Окрасочное оборудование
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/apparaty-dlya-svarki-plastika-10426/"
                      >
                        Аппараты для сварки пластика
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/dorozhno-razmetochnye-mashiny-10647/"
                      >
                        Дорожно-разметочные машины
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/oborudovanie-dlya-raboty-s-armaturoi-10903/"
                      >
                        Оборудование для работы с арматурой
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/rezchiki-10525/"
                      >
                        Резчики
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/stroitelnye-krany-13151/"
                      >
                        Строительные краны
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/ciklevochnye-mashiny-11137/"
                      >
                        Циклевочные машины
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/stroitelnaya-tekhnika-6029/"
                />
              </div>
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Автотовары"
                    src="https://cdn.bigam.ru/iblock/de4/2nxaeherjnjoxofmtzarq4y4uc5rwpdt/Avtotovary.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/avtotovary-i-oborudovanie-5998/"
                    >
                      Автотовары
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/domkrati-5999/"
                      >
                        Домкраты
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/masla-7291/"
                      >
                        Масла
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/shinomontazhnoe-i-avtoservisnoe-oborudovanie-6601/"
                      >
                        Шиномонтажное и автосервисное оборудование
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/avtokhimiya-6007/"
                      >
                        Автохимия
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/kompressory-avtomobilnye-6002/"
                      >
                        Компрессоры автомобильные
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/pusko-zaryadnye-ustrojstva-5980/"
                      >
                        Пуско-зарядные устройства
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/oborudovanie-dlya-perekachki-topliva-6004/"
                      >
                        Оборудование для перекачки топлива
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/smazki-7294/"
                      >
                        Автомобильные смазки
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/rastyazhki-gidravlicheskie-6003/"
                      >
                        Растяжки гидравлические
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/plunzhernye-shpricy-7369/"
                      >
                        Плунжерные шприцы
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/steklodomkraty-7697/"
                      >
                        Стеклодомкраты
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/penogeneratory-vysokogo-davleniya-7401/"
                      >
                        Пеногенераторы высокого давления
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/aksessuary-dlya-salona-avtomobilya-9410/"
                      >
                        Аксессуары для салона автомобиля
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/nozhnye-nasosy-dlya-avtomobilya-4213/"
                      >
                        Ножные насосы для автомобиля
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/shchetki-10594/"
                      >
                        Автомобильные щетки для снега
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/vodosgony-10596/"
                      >
                        Водосгоны
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/prisadki-dlya-topliva-10145/"
                      >
                        Присадки для топлива
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/provoda-dlya-prikurivaniya-9631/"
                      >
                        Провода для прикуривания
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/skrebki-dlya-snega-10595/"
                      >
                        Скребки для снега
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/avtotovary-i-oborudovanie-5998/"
                />
              </div>
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Строительная химия"
                    src="https://cdn.bigam.ru/iblock/a22/8cvu89wsnk6amq0qny3bv5ad8kel4ezc/Stroitelnaya_himiya.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/stroitelnaya-khimiya-4215/"
                    >
                      Строительная химия
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/germetiki-7288/"
                      >
                        Герметики
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/klej-7289/"
                      >
                        Клей
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/pena-montazhnaya-7293/"
                      >
                        Монтажная пена
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/obezzhirivatel-13262/"
                      >
                        Обезжириватели
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/ochistiteli-7292/"
                      >
                        Очистители монтажной пены
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/razbaviteli-krasok-13263/"
                      >
                        Разбавители красок
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/stroitelnaya-khimiya-4215/"
                />
              </div>
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Подарочные карты"
                    src="https://cdn.bigam.ru/iblock/9ea/va4xgqh054dw2d6699soca9w62k7fgzj/gifts_cards.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/podarochnye-karty-9840/"
                    >
                      Подарочные карты
                    </a>
                  </div>{" "}
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/podarochnye-karty-9840/"
                />
              </div>
            </div>
          </div>{" "}
          <div className="a-page-catalog__grid a-page-catalog__grid--mobile">
            <div className="a-page-catalog__column">
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Водоснабжение, сантехника и отопление"
                    src="https://cdn.bigam.ru/iblock/ce6/i2hk5k2vr502jf8oy59hu9aw9v6w9ymw/Vodosnabzhenie.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/vodosnabzhenie-santekhnika-i-otoplenie-6069/"
                    >
                      Водоснабжение, сантехника и отопление
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/otoplenie-6071/"
                      >
                        Отопление
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/vodosnabzhenie-6070/"
                      >
                        Водоснабжение
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/santekhnika-6072/"
                      >
                        Сантехника
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/inzhenernaya-santekhnika-6073/"
                      >
                        Инженерная сантехника
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/komplektuyushhie-dlya-vodosnabzheniya-i-santekhniki-6074/"
                      >
                        Комплектующие для водоснабжения и сантехники
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/vodosnabzhenie-santekhnika-i-otoplenie-6069/"
                />
              </div>
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Станки"
                    src="https://cdn.bigam.ru/iblock/61d/8dcmwzble29m5gbkdux6v4q06upowybv/stanki.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/stanki-6351/"
                    >
                      Станки
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/derevoobrabatyvayushhie-stanki-6173/"
                      >
                        Деревообрабатывающие станки
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/metalloobrabatyvayushhie-stanki-6174/"
                      >
                        Металлообрабатывающие станки
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/kamneobrabatyvayushhie-stanki-6175/"
                      >
                        Камнеобрабатывающие станки
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/verstaki-i-stoly-6425/"
                      >
                        Верстаки и столы
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/komplektuyushhie-dlya-stankov-6177/"
                      >
                        Комплектующие
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/lentochnye-pily-lentochnopilnye-stanki-9398/"
                      >
                        Ленточные пилы (ленточнопильные станки)
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/mnogofunkcionalnye-stanki-9303/"
                      >
                        Многофункциональные станки
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/pilnye-stanki-9775/"
                      >
                        Распиловочные станки
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/sverlilnye-stanki-6187/"
                      >
                        Сверлильные станки
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/tokarnye-stanki-9448/"
                      >
                        Токарные станки
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/stanki-6351/"
                />
              </div>
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Климатическое оборудование"
                    src="https://cdn.bigam.ru/iblock/69e/a3x26pmy476k1b6yjzavpenpiuqcasr3/Klimaticheskoe_oborudovanie.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/klimaticheskoe-oborudovanie-5944/"
                    >
                      Климатическое оборудование
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/kondicionery-5945/"
                      >
                        Кондиционеры
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/ventilyacionnoe-oborudovanie-5950/"
                      >
                        Вентиляционное оборудование
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/sistemy-teplogo-pola-5946/"
                      >
                        Системы теплого пола
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/teplovoe-oborudovanie-5949/"
                      >
                        Тепловое оборудование
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/komplektuyushhie-dlya-klimaticheskogo-oborudovaniya-5947/"
                      >
                        Комплектующие для климатического оборудования
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/brizery-11101/"
                      >
                        Бризеры
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/uvlazhniteli-osushiteli-ochistiteli-6615/"
                      >
                        Оборудование поддержания влажности
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/klimaticheskoe-oborudovanie-5944/"
                />
              </div>
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Электрика и свет"
                    src="https://cdn.bigam.ru/iblock/186/oahnsqe1f3532iry2ddf2kzb0uue6fid/Elektrika.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/elektrika-i-svet-5972/"
                    >
                      Электрика и свет
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/generatory-5973/"
                      >
                        Генераторы
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/stabilizatory-napryazheniya-i-ibp-5979/"
                      >
                        Стабилизаторы напряжения
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/kabeli-shnury-provoda-5974/"
                      >
                        Кабели и провода
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/instrument-dlya-elektriki-5975/"
                      >
                        Инструмент для электрики
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/udliniteli-5988/"
                      >
                        Сетевые удлинители
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/istochniki-besperebojnogo-pitaniya-7252/"
                      >
                        Источники бесперебойного питания (ИБП)
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/blok-avtomatiki-7256/"
                      >
                        Автоматика для электростанций
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/svetilniki-9664/"
                      >
                        Светильники
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/lampy-7206/"
                      >
                        Лампы
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/samoreguliruemye-greyushhie-kabeli-5989/"
                      >
                        Нагревательные кабели (греющие)
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/avtomaticheskie-vyklyuchateli-6554/"
                      >
                        Автоматические выключатели
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/avtotransformatory-6735/"
                      >
                        Автотрансформаторы
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/blok-zashhity-ot-povyshennogo-napryazheniya-7205/"
                      >
                        Блок защиты от повышенного напряжения
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/bloki-pitaniya-11058/"
                      >
                        Блоки питания
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/vilki-elektricheskie-9938/"
                      >
                        Вилки электрические
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/dyuralait-10970/"
                      >
                        Дюралайт
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/izolenta-6561/"
                      >
                        Изолента
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/komplektuyushhie-dlya-elektriki-5981/"
                      >
                        Комплектующие для электрики
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/payallnoe-oborudovanie-10391/"
                      >
                        Паяльное оборудование
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/rozetki-6607/"
                      >
                        Розетки и выключатели
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/svetodiodnye-lenty-10969/"
                      >
                        Светодиодные ленты
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/schetchiki-elektroenergii-9932/"
                      >
                        Счетчики электроэнергии
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/uzo-ustroistva-zashchitnogo-otklyucheniya-vdt-udt-11264/"
                      >
                        УЗО (устройства защитного отключения, ВДТ, УДТ)
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/ustroistva-elektropitaniya-13382/"
                      >
                        Устройства электропитания
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/izolyatory-11258/"
                      >
                        Шинные изоляторы (бочонки)
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/shchitovoe-oborudovanie-11250/"
                      >
                        Щитовое оборудование
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/elektromontazhnaya-produkciya-11259/"
                      >
                        Электромонтажная продукция
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/elektrika-i-svet-5972/"
                />
              </div>
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Средства индивидуальной защиты"
                    src="https://cdn.bigam.ru/iblock/3dc/s0bav30pdr1793ei5ea3w06z065lj5a0/Sredstva_individualnoi_zashchity_2.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/sredstva-individualnoj-zashhity-6358/"
                    >
                      Средства индивидуальной защиты
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/specodezhda-6197/"
                      >
                        Спецодежда
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/zashhita-golovy2-6357/"
                      >
                        СИЗ головы
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/montazhnye-poyasa-6605/"
                      >
                        Страховочные привязи и монтажные пояса
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/komplektuyushhie-dlya-sredstv-zashhity-6367/"
                      >
                        Комплектующие для средств защиты
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/dielektricheskie-kovriki-7250/"
                      >
                        Диэлектрические коврики
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/sredstva-individualnoj-zashhity-6358/"
                />
              </div>
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Крепеж"
                    src="https://cdn.bigam.ru/iblock/0ac/0aa3f3kbr1p71ib07ytn59rh2o060m0e/krepezh.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/krepezh-6566/"
                    >
                      Крепеж
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/metizy-9237/"
                      >
                        Метизы
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/khomuty-6540/"
                      >
                        Хомуты
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/verevki-i-kanaty-6550/"
                      >
                        Верёвки, канаты и шнуры
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/lenty-6562/"
                      >
                        Монтажные ленты
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/takelazh-9638/"
                      >
                        Такелаж
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/krepezh-dlya-kabelya-10877/"
                      >
                        Крепёж для кабеля
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/mebelnyi-krepezh-10888/"
                      >
                        Мебельный крепеж
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/perforirovannyi-krepezh-10874/"
                      >
                        Перфорированный крепеж
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/skrytyi-krepezh-10879/"
                      >
                        Скрытый крепеж
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/specialnyi-krepezh-10915/"
                      >
                        Специальный крепеж
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/krepezh-6566/"
                />
              </div>
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Запасные части и комплектующие"
                    src="https://cdn.bigam.ru/iblock/121/zw0k5tqkvjut3lga8xakt502tkrig211/Zapasnye_chasti_i_komplektuyushchie.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/zapasnye-chasti-i-komplektuyushhie-6352/"
                    >
                      Запасные части и комплектующие
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/zapchasti-6733/"
                      >
                        Запчасти
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/dlya-prochej-tekhniki-6328/"
                      >
                        Для прочей техники
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/po-tipu-tovara-7279/"
                      >
                        По типу товара
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/elektromotory-6792/"
                      >
                        Электромоторы
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/zapasnye-chasti-i-komplektuyushhie-6352/"
                />
              </div>
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Товары для офиса и дома"
                    src="https://cdn.bigam.ru/iblock/904/904cba5b291e18804d9697df4188c487/tovary_dlya_ofisa_i_doma.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/tovary-dlya-ofisa-i-doma-10996/"
                    >
                      Товары для офиса и дома
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/bytovaya-tehnika-10998/"
                      >
                        Бытовая техника
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/sredstva-lichnoi-gigieny-10483/"
                      >
                        Средства личной гигиены
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/tovary-dlya-prazdnika-10924/"
                      >
                        Товары для праздника
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/hozyaistvannye-tovary-10997/"
                      >
                        Хозяйственные товары
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/tovary-dlya-ofisa-i-doma-10996/"
                />
              </div>
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Уцененные товары"
                    src="https://cdn.bigam.ru/resize_cache/661370/02f3bf84f3aa71bb65154dd183b1be90/iblock/378/3785713d585044786c4677db528ddc28/Ucenennye_tovary.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/discharged-goods/"
                    >
                      Уцененные товары
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/discharged-goods/?section=1452"
                      >
                        Инструмент
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/discharged-goods/?section=1453"
                      >
                        Все для сада и огорода
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/discharged-goods/?section=1454"
                      >
                        Водоснабжение, сантехника и отопление
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/discharged-goods/"
                />
              </div>
            </div>
            <div className="a-page-catalog__column">
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Сварочное оборудование"
                    src="https://cdn.bigam.ru/iblock/6bc/n75vgzefnlernihw401j9h2besw8uuyv/svarka.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/svarochnoe-oborudovanie-6350/"
                    >
                      Сварочное оборудование
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/elektrosvarochnoe-oborudovanie-6143/"
                      >
                        Электросварочное оборудование
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/payalnye-lampy-6145/"
                      >
                        Паяльные лампы
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/komplektuyushhie-dlya-svarochnogo-oborudovaniya-6146/"
                      >
                        Комплектующие для сварочного оборудования
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/gazosvarochnoe-oborudovanie-6144/"
                      >
                        Газосварочное оборудование
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/lazernoe-svarochnoe-oborudovanie-10706/"
                      >
                        Лазерное сварочное оборудование
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/svarochnye-apparaty-7708-9492/"
                      >
                        Сварочные аппараты
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/svarochnye-gorelki-i-plazmotrony-9634/"
                      >
                        Сварочные горелки и плазмотроны
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/svarochnye-shlemy-6199/"
                      >
                        Сварочные маски
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/tochechnaya-svarka-10105/"
                      >
                        Точечная сварка
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/svarochnoe-oborudovanie-6350/"
                />
              </div>
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Строительная техника"
                    src="https://cdn.bigam.ru/iblock/9e4/pxu2rfodk78vr08b8n5uas827l208v2x/Stroitelnaya_tehnika.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/stroitelnaya-tekhnika-6029/"
                    >
                      Строительная техника
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/kompressory-vozdushnye-6032/"
                      >
                        Пневматические компрессоры
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/lestnicy-i-vyshki-6038/"
                      >
                        Лестницы и вышки
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/gruzopodemnoe-oborudovanie-6039/"
                      >
                        Грузоподъемное оборудование
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/vibrooborudovanie-6034/"
                      >
                        Виброоборудование
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/betonomeshalki-6030/"
                      >
                        Электрические бетономешалки
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/tachki-stroitelnye-6041/"
                      >
                        Тачки строительные
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/komplektuyushhie-dlya-stroitelnoj-tekhniki-6044/"
                      >
                        Запчасти для строительной техники
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/zatirochnye-mashiny-6036/"
                      >
                        Затирочные машины
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/okrasochnoe-oborudovanie-9351/"
                      >
                        Окрасочное оборудование
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/apparaty-dlya-svarki-plastika-10426/"
                      >
                        Аппараты для сварки пластика
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/dorozhno-razmetochnye-mashiny-10647/"
                      >
                        Дорожно-разметочные машины
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/oborudovanie-dlya-raboty-s-armaturoi-10903/"
                      >
                        Оборудование для работы с арматурой
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/rezchiki-10525/"
                      >
                        Резчики
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/stroitelnye-krany-13151/"
                      >
                        Строительные краны
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/ciklevochnye-mashiny-11137/"
                      >
                        Циклевочные машины
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/stroitelnaya-tekhnika-6029/"
                />
              </div>
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Уборка и клининг"
                    src="https://cdn.bigam.ru/iblock/2f6/2f6caa97fc8050712da83e533c3eecde/Uborka_i_klining.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/uborka-i-klining-6018/"
                    >
                      Уборка и клининг
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/mojki-vysokogo-davleniya-6020/"
                      >
                        Мойки высокого давления
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/pylesosy-6019/"
                      >
                        Пылесосы
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/stekloochistiteli-6024/"
                      >
                        Стеклоочистители
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/chistyashhaya-khimiya-6022/"
                      >
                        Чистящая химия
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/podmetalno-uborochnye-mashiny-7148/"
                      >
                        Подметально-уборочные машины
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/komplektuyushhie-dlya-kliningovogo-oborudovaniya-6025/"
                      >
                        Комплектующие для клинингового оборудования
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/parogeneratory-promyshlennye-elektricheskie-11243/"
                      >
                        Парогенераторы промышленные электрические
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/polomoechnye-mashiny-10284/"
                      >
                        Поломоечные машины
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/uborochnyy-inventar-4216/"
                      >
                        Уборочный инвентарь
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/uborka-i-klining-6018/"
                />
              </div>
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Автотовары"
                    src="https://cdn.bigam.ru/iblock/de4/2nxaeherjnjoxofmtzarq4y4uc5rwpdt/Avtotovary.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/avtotovary-i-oborudovanie-5998/"
                    >
                      Автотовары
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/domkrati-5999/"
                      >
                        Домкраты
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/masla-7291/"
                      >
                        Масла
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/shinomontazhnoe-i-avtoservisnoe-oborudovanie-6601/"
                      >
                        Шиномонтажное и автосервисное оборудование
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/avtokhimiya-6007/"
                      >
                        Автохимия
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/kompressory-avtomobilnye-6002/"
                      >
                        Компрессоры автомобильные
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/pusko-zaryadnye-ustrojstva-5980/"
                      >
                        Пуско-зарядные устройства
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/oborudovanie-dlya-perekachki-topliva-6004/"
                      >
                        Оборудование для перекачки топлива
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/smazki-7294/"
                      >
                        Автомобильные смазки
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/rastyazhki-gidravlicheskie-6003/"
                      >
                        Растяжки гидравлические
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/plunzhernye-shpricy-7369/"
                      >
                        Плунжерные шприцы
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/steklodomkraty-7697/"
                      >
                        Стеклодомкраты
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/penogeneratory-vysokogo-davleniya-7401/"
                      >
                        Пеногенераторы высокого давления
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/aksessuary-dlya-salona-avtomobilya-9410/"
                      >
                        Аксессуары для салона автомобиля
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/nozhnye-nasosy-dlya-avtomobilya-4213/"
                      >
                        Ножные насосы для автомобиля
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/shchetki-10594/"
                      >
                        Автомобильные щетки для снега
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/vodosgony-10596/"
                      >
                        Водосгоны
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/prisadki-dlya-topliva-10145/"
                      >
                        Присадки для топлива
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/provoda-dlya-prikurivaniya-9631/"
                      >
                        Провода для прикуривания
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/skrebki-dlya-snega-10595/"
                      >
                        Скребки для снега
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/avtotovary-i-oborudovanie-5998/"
                />
              </div>
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Складское оборудование"
                    src="https://cdn.bigam.ru/iblock/a1a/r7lphouho4q9noop4hut54hu6pz1iciz/Skladskoe_oborudovanie.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/skladskoe-oborudovanie-9344/"
                    >
                      Складское оборудование
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/vesy-10855/"
                      >
                        Весы
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/vyshki-podemnye-13153/"
                      >
                        Вышки подъемные
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/napolnye-pokrytiya-dlya-skladskih-i-proizvodstvennyh-pomeshchenii-13032/"
                      >
                        Напольные покрытия для складских и производственных
                        помещений
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/pogruzchiki-13152/"
                      >
                        Погрузчики
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/pozharnoe-oborudovanie-9369/"
                      >
                        Пожарное оборудование
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/sredstva-ograzhdeniya-dlya-dorozhnyh-i-avariinyh-rabot-13028/"
                      >
                        Средства ограждения для дорожных и аварийных работ
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/stellazhi-9871/"
                      >
                        Стеллажи
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/shtabelery-10645/"
                      >
                        Штабелеры
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/skladskoe-oborudovanie-9344/"
                />
              </div>
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Строительная химия"
                    src="https://cdn.bigam.ru/iblock/a22/8cvu89wsnk6amq0qny3bv5ad8kel4ezc/Stroitelnaya_himiya.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/stroitelnaya-khimiya-4215/"
                    >
                      Строительная химия
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/germetiki-7288/"
                      >
                        Герметики
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/klej-7289/"
                      >
                        Клей
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/pena-montazhnaya-7293/"
                      >
                        Монтажная пена
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/obezzhirivatel-13262/"
                      >
                        Обезжириватели
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/ochistiteli-7292/"
                      >
                        Очистители монтажной пены
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/razbaviteli-krasok-13263/"
                      >
                        Разбавители красок
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/stroitelnaya-khimiya-4215/"
                />
              </div>
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Товары для туризма и отдыха"
                    src="https://cdn.bigam.ru/iblock/a08/5o69zlrkh50ch4vpbc0qj0xd9fcbyatm/turizm.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/tovary-pervoj-neobkhodimosti-7199/"
                    >
                      Товары для туризма и отдыха
                    </a>
                  </div>{" "}
                  <ul className="a-page-catalog__list">
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/sani-9536/"
                      >
                        Сани-волокуши
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/turisticheskii-inventar-9724/"
                      >
                        Туристический инвентарь
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/turisticheskie-gorelki-9720/"
                      >
                        Туристические горелки
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/gazovye-ballony-dlya-gorelok-9721/"
                      >
                        Газовые баллоны для горелок
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/sredstva-protiv-nasekomykh-7212/"
                      >
                        Средства против насекомых и грызунов
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/vs-dlya-shashlyka-i-barbekyu-7222/"
                      >
                        Всё для шашлыка, гриля и барбекю
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/batuty-10486/"
                      >
                        Батуты
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/kovriki-turisticheskie-10442/"
                      >
                        Коврики туристические
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/metalloiskateli-10405/"
                      >
                        Металлоискатели
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/spalniki-10937/"
                      >
                        Спальники
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/sumki-turisticheskie-10473/"
                      >
                        Сумки туристические
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/turisticheskaya-mebel-10471/"
                      >
                        Туристическая мебель
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/turisticheskaya-posuda-10472/"
                      >
                        Туристическая посуда
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/turisticheskie-palatki-10851/"
                      >
                        Туристические палатки
                      </a>
                    </li>
                    <li className="a-page-catalog__item">
                      <a
                        className="a-page-catalog__link"
                        href="/catalog/turisticheskie-ryukzaki-10490/"
                      >
                        Туристические рюкзаки
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/tovary-pervoj-neobkhodimosti-7199/"
                />
              </div>
              <div className="a-page-catalog__cell">
                <div className="a-page-catalog__preview">
                  <img
                    alt="Подарочные карты"
                    src="https://cdn.bigam.ru/iblock/9ea/va4xgqh054dw2d6699soca9w62k7fgzj/gifts_cards.jpg"
                  />
                </div>{" "}
                <div className="a-page-catalog__content">
                  <div className="a-page-catalog__name">
                    <a
                      className="a-page-catalog__link"
                      href="/catalog/podarochnye-karty-9840/"
                    >
                      Подарочные карты
                    </a>
                  </div>{" "}
                </div>{" "}
                <a
                  className="a-page-catalog__cover-link"
                  href="/catalog/podarochnye-karty-9840/"
                />
              </div>
            </div>
          </div>
        </section>{" "}
        <section className="a-page-catalog__section a-page-catalog__section--description">
          <div className="a-spoiler a-title-indent a-spoiler--open">
            <div className="a-spoiler__content">
              <div className="a-page-catalog__inner">
                Интернет-магазин «BREMAX» предлагает купить в Москве широкий
                ассортимент товара по самым низким ценам. В каталоге более 40000
                наименований строительной и садовой техники, кондиционеров,
                инструмента для ремонта, приборов для водоснабжения, отопления
                и, конечно же, сварочного оборудования. Любой товар из каталога
                можно купить с доставкой в город Москва on-line на сайте или
                заказать по номеру телефона 8 (495) 152-56-79. Условия доставки
                в другие населенные пункты и регионы России уточняйте у
                менеджеров по номеру 8 (800) 555-69-73.
              </div>
            </div>{" "}
            <div
              className="a-spoiler__buttons"
              style={{
                display: "none",
              }}
            >
              <button
                className="a-spoiler__button a-spoiler__button--open a-link a-link--grey"
                style={{
                  "--spoiler-open-text": "'Читать полностью'",
                }}
                type="button"
              />{" "}
              <button
                className="a-spoiler__button a-spoiler__button--close a-link a-link--grey"
                type="button"
              >
                Скрыть
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
