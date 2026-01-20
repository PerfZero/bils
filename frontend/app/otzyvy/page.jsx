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
      <div className="a-page-catalog__container">
  <section className="a-page-catalog__section a-page-catalog__section--catalog">
    <h1 className="a-page-catalog__title">Отзывы о товарах</h1>{" "}
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
                href="/otzyvy/instrument-5748/">
                Инструмент
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/elektroinstrument-5749/">
                  Электроинструмент
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/ruchnoy-instrument-5754/">
                  Ручной инструмент
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/izmeritelnyj-instrument-5753/">
                  Измерительный инструмент
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/benzoinstrument-5752/">
                  Бензоинструмент
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/pnevmoinstrument-5751/">
                  Пневмоинструмент
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/akkumulyatornyj-instrument-7654/">
                  Аккумуляторный инструмент
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/rezhushchiy-instrument-7758/">
                  Режущий инструмент
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/shtukaturnyj-instrument-7759/">
                  Штукатурный инструмент
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/nasadki-dlya-instrumenta-7762/">
                  Насадки для инструмента
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/kraskopulty-9469/">
                  Краскопульты
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a className="a-page-catalog__link" href="/otzyvy/pily-7726/">
                  Пилы
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/slesarnyj-instrument-7797/">
                  Слесарный инструмент
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/steplery-9277/">
                  Степлеры
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/stroitelnye-pistolety-8082/">
                  Строительные пистолеты
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/instrument-5748/"
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
                href="/otzyvy/vse-dlya-sada-i-ogoroda-5880/">
                Все для сада и огорода
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/tovary-i-tekhnika-dlya-uborki-snega-i-lda-5886/">
                  Товары и техника для уборки снега и льда
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/sadovaya-tekhnika-5881/">
                  Садовая техника
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/sadovyj-inventar-5882/">
                  Садовый инвентарь
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/sistemy-poliva-5883/">
                  Системы полива
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/komplektuyushhie-dlya-sadovoj-tekhniki-i-instrumenta-5887/">
                  Для садовой техники
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/sadovaya-mebel-10430/">
                  Садовая мебель
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/tovary-dlya-obustroistva-dachi-i-sada-10443/">
                  Товары для обустройства дачи и сада
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/vse-dlya-sada-i-ogoroda-5880/"
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
                href="/otzyvy/vodosnabzhenie-santekhnika-i-otoplenie-6069/">
                Водоснабжение, сантехника и отопление
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/otoplenie-6071/">
                  Отопление
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/vodosnabzhenie-6070/">
                  Водоснабжение
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/santekhnika-6072/">
                  Сантехника
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/inzhenernaya-santekhnika-6073/">
                  Инженерная сантехника
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/komplektuyushhie-dlya-vodosnabzheniya-i-santekhniki-6074/">
                  Комплектующие для водоснабжения и сантехники
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/vodosnabzhenie-santekhnika-i-otoplenie-6069/"
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
                href="/otzyvy/klimaticheskoe-oborudovanie-5944/">
                Климатическое оборудование
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/kondicionery-5945/">
                  Кондиционеры
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/ventilyacionnoe-oborudovanie-5950/">
                  Вентиляционное оборудование
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/sistemy-teplogo-pola-5946/">
                  Системы теплого пола
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/teplovoe-oborudovanie-5949/">
                  Тепловое оборудование
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/komplektuyushhie-dlya-klimaticheskogo-oborudovaniya-5947/">
                  Комплектующие для климатического оборудования
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/brizery-11101/">
                  Бризеры
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/uvlazhniteli-osushiteli-ochistiteli-6615/">
                  Оборудование поддержания влажности
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/klimaticheskoe-oborudovanie-5944/"
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
                href="/otzyvy/sredstva-individualnoj-zashhity-6358/">
                Средства индивидуальной защиты
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/specodezhda-6197/">
                  Спецодежда
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/zashhita-golovy2-6357/">
                  СИЗ головы
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/montazhnye-poyasa-6605/">
                  Страховочные привязи и монтажные пояса
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/komplektuyushhie-dlya-sredstv-zashhity-6367/">
                  Комплектующие для средств защиты
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/dielektricheskie-kovriki-7250/">
                  Диэлектрические коврики
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/sredstva-individualnoj-zashhity-6358/"
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
                href="/otzyvy/zapasnye-chasti-i-komplektuyushhie-6352/">
                Запасные части и комплектующие
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/zapchasti-6733/">
                  Запчасти
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/dlya-prochej-tekhniki-6328/">
                  Для прочей техники
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/po-tipu-tovara-7279/">
                  По типу товара
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/elektromotory-6792/">
                  Электромоторы
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/zapasnye-chasti-i-komplektuyushhie-6352/"
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
                href="/otzyvy/svarochnoe-oborudovanie-6350/">
                Сварочное оборудование
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/elektrosvarochnoe-oborudovanie-6143/">
                  Электросварочное оборудование
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/payalnye-lampy-6145/">
                  Паяльные лампы
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/komplektuyushhie-dlya-svarochnogo-oborudovaniya-6146/">
                  Комплектующие для сварочного оборудования
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/gazosvarochnoe-oborudovanie-6144/">
                  Газосварочное оборудование
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/lazernoe-svarochnoe-oborudovanie-10706/">
                  Лазерное сварочное оборудование
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/svarochnye-apparaty-7708-9492/">
                  Сварочные аппараты
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/svarochnye-gorelki-i-plazmotrony-9634/">
                  Сварочные горелки и плазмотроны
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/svarochnye-shlemy-6199/">
                  Сварочные маски
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/tochechnaya-svarka-10105/">
                  Точечная сварка
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/svarochnoe-oborudovanie-6350/"
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
                href="/otzyvy/uborka-i-klining-6018/">
                Уборка и клининг
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/mojki-vysokogo-davleniya-6020/">
                  Мойки высокого давления
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/pylesosy-6019/">
                  Пылесосы
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/stekloochistiteli-6024/">
                  Стеклоочистители
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/chistyashhaya-khimiya-6022/">
                  Чистящая химия
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/podmetalno-uborochnye-mashiny-7148/">
                  Подметально-уборочные машины
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/komplektuyushhie-dlya-kliningovogo-oborudovaniya-6025/">
                  Комплектующие для клинингового оборудования
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/parogeneratory-promyshlennye-elektricheskie-11243/">
                  Парогенераторы промышленные электрические
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/polomoechnye-mashiny-10284/">
                  Поломоечные машины
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/uborochnyy-inventar-4216/">
                  Уборочный инвентарь
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/uborka-i-klining-6018/"
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
                href="/otzyvy/skladskoe-oborudovanie-9344/">
                Складское оборудование
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a className="a-page-catalog__link" href="/otzyvy/vesy-10855/">
                  Весы
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/vyshki-podemnye-13153/">
                  Вышки подъемные
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/napolnye-pokrytiya-dlya-skladskih-i-proizvodstvennyh-pomeshchenii-13032/">
                  Напольные покрытия для складских и производственных помещений
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/pogruzchiki-13152/">
                  Погрузчики
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/pozharnoe-oborudovanie-9369/">
                  Пожарное оборудование
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/sredstva-ograzhdeniya-dlya-dorozhnyh-i-avariinyh-rabot-13028/">
                  Средства ограждения для дорожных и аварийных работ
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/stellazhi-9871/">
                  Стеллажи
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/shtabelery-10645/">
                  Штабелеры
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/skladskoe-oborudovanie-9344/"
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
                href="/otzyvy/tovary-pervoj-neobkhodimosti-7199/">
                Товары для туризма и отдыха
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a className="a-page-catalog__link" href="/otzyvy/sani-9536/">
                  Сани-волокуши
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/turisticheskii-inventar-9724/">
                  Туристический инвентарь
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/turisticheskie-gorelki-9720/">
                  Туристические горелки
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/gazovye-ballony-dlya-gorelok-9721/">
                  Газовые баллоны для горелок
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/sredstva-protiv-nasekomykh-7212/">
                  Средства против насекомых и грызунов
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/vs-dlya-shashlyka-i-barbekyu-7222/">
                  Всё для шашлыка, гриля и барбекю
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/batuty-10486/">
                  Батуты
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/kovriki-turisticheskie-10442/">
                  Коврики туристические
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/metalloiskateli-10405/">
                  Металлоискатели
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/spalniki-10937/">
                  Спальники
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/sumki-turisticheskie-10473/">
                  Сумки туристические
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/turisticheskaya-mebel-10471/">
                  Туристическая мебель
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/turisticheskaya-posuda-10472/">
                  Туристическая посуда
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/turisticheskie-palatki-10851/">
                  Туристические палатки
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/tovary-pervoj-neobkhodimosti-7199/"
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
              <a className="a-page-catalog__link" href="/otzyvy/stanki-6351/">
                Станки
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/derevoobrabatyvayushhie-stanki-6173/">
                  Деревообрабатывающие станки
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/metalloobrabatyvayushhie-stanki-6174/">
                  Металлообрабатывающие станки
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/kamneobrabatyvayushhie-stanki-6175/">
                  Камнеобрабатывающие станки
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/verstaki-i-stoly-6425/">
                  Верстаки и столы
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/komplektuyushhie-dlya-stankov-6177/">
                  Комплектующие
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/lentochnye-pily-lentochnopilnye-stanki-9398/">
                  Ленточные пилы (ленточнопильные станки)
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/mnogofunkcionalnye-stanki-9303/">
                  Многофункциональные станки
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/pilnye-stanki-9775/">
                  Распиловочные станки
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/sverlilnye-stanki-6187/">
                  Сверлильные станки
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/tokarnye-stanki-9448/">
                  Токарные станки
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/stanki-6351/"
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
                href="/otzyvy/elektrika-i-svet-5972/">
                Электрика и свет
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/generatory-5973/">
                  Генераторы
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/stabilizatory-napryazheniya-i-ibp-5979/">
                  Стабилизаторы напряжения
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/kabeli-shnury-provoda-5974/">
                  Кабели и провода
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/instrument-dlya-elektriki-5975/">
                  Инструмент для электрики
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/udliniteli-5988/">
                  Сетевые удлинители
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/istochniki-besperebojnogo-pitaniya-7252/">
                  Источники бесперебойного питания (ИБП)
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/blok-avtomatiki-7256/">
                  Автоматика для электростанций
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/svetilniki-9664/">
                  Светильники
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a className="a-page-catalog__link" href="/otzyvy/lampy-7206/">
                  Лампы
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/samoreguliruemye-greyushhie-kabeli-5989/">
                  Нагревательные кабели (греющие)
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/avtomaticheskie-vyklyuchateli-6554/">
                  Автоматические выключатели
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/avtotransformatory-6735/">
                  Автотрансформаторы
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/blok-zashhity-ot-povyshennogo-napryazheniya-7205/">
                  Блок защиты от повышенного напряжения
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/bloki-pitaniya-11058/">
                  Блоки питания
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/vilki-elektricheskie-9938/">
                  Вилки электрические
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/dyuralait-10970/">
                  Дюралайт
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/izolenta-6561/">
                  Изолента
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/komplektuyushhie-dlya-elektriki-5981/">
                  Комплектующие для электрики
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/payallnoe-oborudovanie-10391/">
                  Паяльное оборудование
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/rozetki-6607/">
                  Розетки и выключатели
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/svetodiodnye-lenty-10969/">
                  Светодиодные ленты
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/schetchiki-elektroenergii-9932/">
                  Счетчики электроэнергии
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/uzo-ustroistva-zashchitnogo-otklyucheniya-vdt-udt-11264/">
                  УЗО (устройства защитного отключения, ВДТ, УДТ)
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/ustroistva-elektropitaniya-13382/">
                  Устройства электропитания
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/izolyatory-11258/">
                  Шинные изоляторы (бочонки)
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/shchitovoe-oborudovanie-11250/">
                  Щитовое оборудование
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/elektromontazhnaya-produkciya-11259/">
                  Электромонтажная продукция
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/elektrika-i-svet-5972/"
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
              <a className="a-page-catalog__link" href="/otzyvy/krepezh-6566/">
                Крепеж
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a className="a-page-catalog__link" href="/otzyvy/metizy-9237/">
                  Метизы
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/khomuty-6540/">
                  Хомуты
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/verevki-i-kanaty-6550/">
                  Верёвки, канаты и шнуры
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a className="a-page-catalog__link" href="/otzyvy/lenty-6562/">
                  Монтажные ленты
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/takelazh-9638/">
                  Такелаж
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/krepezh-dlya-kabelya-10877/">
                  Крепёж для кабеля
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/mebelnyi-krepezh-10888/">
                  Мебельный крепеж
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/perforirovannyi-krepezh-10874/">
                  Перфорированный крепеж
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/skrytyi-krepezh-10879/">
                  Скрытый крепеж
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/krepezh-6566/"
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
                href="/otzyvy/tovary-dlya-ofisa-i-doma-10996/">
                Товары для офиса и дома
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/bytovaya-tehnika-10998/">
                  Бытовая техника
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/sredstva-lichnoi-gigieny-10483/">
                  Средства личной гигиены
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/tovary-dlya-prazdnika-10924/">
                  Товары для праздника
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/hozyaistvannye-tovary-10997/">
                  Хозяйственные товары
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/tovary-dlya-ofisa-i-doma-10996/"
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
                href="/otzyvy/stroitelnaya-tekhnika-6029/">
                Строительная техника
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/kompressory-vozdushnye-6032/">
                  Пневматические компрессоры
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/lestnicy-i-vyshki-6038/">
                  Лестницы и вышки
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/gruzopodemnoe-oborudovanie-6039/">
                  Грузоподъемное оборудование
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/vibrooborudovanie-6034/">
                  Виброоборудование
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/betonomeshalki-6030/">
                  Электрические бетономешалки
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/tachki-stroitelnye-6041/">
                  Тачки строительные
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/komplektuyushhie-dlya-stroitelnoj-tekhniki-6044/">
                  Запчасти для строительной техники
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/zatirochnye-mashiny-6036/">
                  Затирочные машины
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/okrasochnoe-oborudovanie-9351/">
                  Окрасочное оборудование
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/apparaty-dlya-svarki-plastika-10426/">
                  Аппараты для сварки пластика
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/dorozhno-razmetochnye-mashiny-10647/">
                  Дорожно-разметочные машины
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/oborudovanie-dlya-raboty-s-armaturoi-10903/">
                  Оборудование для работы с арматурой
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/rezchiki-10525/">
                  Резчики
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/ciklevochnye-mashiny-11137/">
                  Циклевочные машины
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/stroitelnaya-tekhnika-6029/"
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
                href="/otzyvy/avtotovary-i-oborudovanie-5998/">
                Автотовары
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/domkrati-5999/">
                  Домкраты
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a className="a-page-catalog__link" href="/otzyvy/masla-7291/">
                  Масла
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/shinomontazhnoe-i-avtoservisnoe-oborudovanie-6601/">
                  Шиномонтажное и автосервисное оборудование
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/avtokhimiya-6007/">
                  Автохимия
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/kompressory-avtomobilnye-6002/">
                  Компрессоры автомобильные
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/pusko-zaryadnye-ustrojstva-5980/">
                  Пуско-зарядные устройства
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/oborudovanie-dlya-perekachki-topliva-6004/">
                  Оборудование для перекачки топлива
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a className="a-page-catalog__link" href="/otzyvy/smazki-7294/">
                  Автомобильные смазки
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/rastyazhki-gidravlicheskie-6003/">
                  Растяжки гидравлические
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/plunzhernye-shpricy-7369/">
                  Плунжерные шприцы
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/steklodomkraty-7697/">
                  Стеклодомкраты
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/penogeneratory-vysokogo-davleniya-7401/">
                  Пеногенераторы высокого давления
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/aksessuary-dlya-salona-avtomobilya-9410/">
                  Аксессуары для салона автомобиля
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/nozhnye-nasosy-dlya-avtomobilya-4213/">
                  Ножные насосы для автомобиля
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/shchetki-10594/">
                  Автомобильные щетки для снега
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/vodosgony-10596/">
                  Водосгоны
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/prisadki-dlya-topliva-10145/">
                  Присадки для топлива
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/provoda-dlya-prikurivaniya-9631/">
                  Провода для прикуривания
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/skrebki-dlya-snega-10595/">
                  Скребки для снега
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/avtotovary-i-oborudovanie-5998/"
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
                href="/otzyvy/stroitelnaya-khimiya-4215/">
                Строительная химия
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/germetiki-7288/">
                  Герметики
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a className="a-page-catalog__link" href="/otzyvy/klej-7289/">
                  Клей
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/pena-montazhnaya-7293/">
                  Монтажная пена
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/ochistiteli-7292/">
                  Очистители монтажной пены
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/stroitelnaya-khimiya-4215/"
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
                href="/otzyvy/podarochnye-karty-9840/">
                Подарочные карты
              </a>
            </div>{" "}
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/podarochnye-karty-9840/"
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
                href="/otzyvy/vodosnabzhenie-santekhnika-i-otoplenie-6069/">
                Водоснабжение, сантехника и отопление
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/otoplenie-6071/">
                  Отопление
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/vodosnabzhenie-6070/">
                  Водоснабжение
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/santekhnika-6072/">
                  Сантехника
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/inzhenernaya-santekhnika-6073/">
                  Инженерная сантехника
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/komplektuyushhie-dlya-vodosnabzheniya-i-santekhniki-6074/">
                  Комплектующие для водоснабжения и сантехники
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/vodosnabzhenie-santekhnika-i-otoplenie-6069/"
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
              <a className="a-page-catalog__link" href="/otzyvy/stanki-6351/">
                Станки
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/derevoobrabatyvayushhie-stanki-6173/">
                  Деревообрабатывающие станки
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/metalloobrabatyvayushhie-stanki-6174/">
                  Металлообрабатывающие станки
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/kamneobrabatyvayushhie-stanki-6175/">
                  Камнеобрабатывающие станки
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/verstaki-i-stoly-6425/">
                  Верстаки и столы
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/komplektuyushhie-dlya-stankov-6177/">
                  Комплектующие
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/lentochnye-pily-lentochnopilnye-stanki-9398/">
                  Ленточные пилы (ленточнопильные станки)
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/mnogofunkcionalnye-stanki-9303/">
                  Многофункциональные станки
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/pilnye-stanki-9775/">
                  Распиловочные станки
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/sverlilnye-stanki-6187/">
                  Сверлильные станки
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/tokarnye-stanki-9448/">
                  Токарные станки
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/stanki-6351/"
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
                href="/otzyvy/klimaticheskoe-oborudovanie-5944/">
                Климатическое оборудование
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/kondicionery-5945/">
                  Кондиционеры
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/ventilyacionnoe-oborudovanie-5950/">
                  Вентиляционное оборудование
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/sistemy-teplogo-pola-5946/">
                  Системы теплого пола
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/teplovoe-oborudovanie-5949/">
                  Тепловое оборудование
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/komplektuyushhie-dlya-klimaticheskogo-oborudovaniya-5947/">
                  Комплектующие для климатического оборудования
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/brizery-11101/">
                  Бризеры
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/uvlazhniteli-osushiteli-ochistiteli-6615/">
                  Оборудование поддержания влажности
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/klimaticheskoe-oborudovanie-5944/"
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
                href="/otzyvy/elektrika-i-svet-5972/">
                Электрика и свет
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/generatory-5973/">
                  Генераторы
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/stabilizatory-napryazheniya-i-ibp-5979/">
                  Стабилизаторы напряжения
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/kabeli-shnury-provoda-5974/">
                  Кабели и провода
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/instrument-dlya-elektriki-5975/">
                  Инструмент для электрики
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/udliniteli-5988/">
                  Сетевые удлинители
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/istochniki-besperebojnogo-pitaniya-7252/">
                  Источники бесперебойного питания (ИБП)
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/blok-avtomatiki-7256/">
                  Автоматика для электростанций
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/svetilniki-9664/">
                  Светильники
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a className="a-page-catalog__link" href="/otzyvy/lampy-7206/">
                  Лампы
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/samoreguliruemye-greyushhie-kabeli-5989/">
                  Нагревательные кабели (греющие)
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/avtomaticheskie-vyklyuchateli-6554/">
                  Автоматические выключатели
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/avtotransformatory-6735/">
                  Автотрансформаторы
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/blok-zashhity-ot-povyshennogo-napryazheniya-7205/">
                  Блок защиты от повышенного напряжения
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/bloki-pitaniya-11058/">
                  Блоки питания
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/vilki-elektricheskie-9938/">
                  Вилки электрические
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/dyuralait-10970/">
                  Дюралайт
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/izolenta-6561/">
                  Изолента
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/komplektuyushhie-dlya-elektriki-5981/">
                  Комплектующие для электрики
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/payallnoe-oborudovanie-10391/">
                  Паяльное оборудование
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/rozetki-6607/">
                  Розетки и выключатели
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/svetodiodnye-lenty-10969/">
                  Светодиодные ленты
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/schetchiki-elektroenergii-9932/">
                  Счетчики электроэнергии
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/uzo-ustroistva-zashchitnogo-otklyucheniya-vdt-udt-11264/">
                  УЗО (устройства защитного отключения, ВДТ, УДТ)
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/ustroistva-elektropitaniya-13382/">
                  Устройства электропитания
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/izolyatory-11258/">
                  Шинные изоляторы (бочонки)
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/shchitovoe-oborudovanie-11250/">
                  Щитовое оборудование
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/elektromontazhnaya-produkciya-11259/">
                  Электромонтажная продукция
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/elektrika-i-svet-5972/"
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
                href="/otzyvy/sredstva-individualnoj-zashhity-6358/">
                Средства индивидуальной защиты
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/specodezhda-6197/">
                  Спецодежда
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/zashhita-golovy2-6357/">
                  СИЗ головы
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/montazhnye-poyasa-6605/">
                  Страховочные привязи и монтажные пояса
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/komplektuyushhie-dlya-sredstv-zashhity-6367/">
                  Комплектующие для средств защиты
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/dielektricheskie-kovriki-7250/">
                  Диэлектрические коврики
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/sredstva-individualnoj-zashhity-6358/"
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
              <a className="a-page-catalog__link" href="/otzyvy/krepezh-6566/">
                Крепеж
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a className="a-page-catalog__link" href="/otzyvy/metizy-9237/">
                  Метизы
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/khomuty-6540/">
                  Хомуты
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/verevki-i-kanaty-6550/">
                  Верёвки, канаты и шнуры
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a className="a-page-catalog__link" href="/otzyvy/lenty-6562/">
                  Монтажные ленты
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/takelazh-9638/">
                  Такелаж
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/krepezh-dlya-kabelya-10877/">
                  Крепёж для кабеля
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/mebelnyi-krepezh-10888/">
                  Мебельный крепеж
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/perforirovannyi-krepezh-10874/">
                  Перфорированный крепеж
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/skrytyi-krepezh-10879/">
                  Скрытый крепеж
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/krepezh-6566/"
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
                href="/otzyvy/zapasnye-chasti-i-komplektuyushhie-6352/">
                Запасные части и комплектующие
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/zapchasti-6733/">
                  Запчасти
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/dlya-prochej-tekhniki-6328/">
                  Для прочей техники
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/po-tipu-tovara-7279/">
                  По типу товара
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/elektromotory-6792/">
                  Электромоторы
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/zapasnye-chasti-i-komplektuyushhie-6352/"
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
                href="/otzyvy/tovary-dlya-ofisa-i-doma-10996/">
                Товары для офиса и дома
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/bytovaya-tehnika-10998/">
                  Бытовая техника
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/sredstva-lichnoi-gigieny-10483/">
                  Средства личной гигиены
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/tovary-dlya-prazdnika-10924/">
                  Товары для праздника
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/hozyaistvannye-tovary-10997/">
                  Хозяйственные товары
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/tovary-dlya-ofisa-i-doma-10996/"
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
                href="/otzyvy/svarochnoe-oborudovanie-6350/">
                Сварочное оборудование
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/elektrosvarochnoe-oborudovanie-6143/">
                  Электросварочное оборудование
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/payalnye-lampy-6145/">
                  Паяльные лампы
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/komplektuyushhie-dlya-svarochnogo-oborudovaniya-6146/">
                  Комплектующие для сварочного оборудования
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/gazosvarochnoe-oborudovanie-6144/">
                  Газосварочное оборудование
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/lazernoe-svarochnoe-oborudovanie-10706/">
                  Лазерное сварочное оборудование
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/svarochnye-apparaty-7708-9492/">
                  Сварочные аппараты
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/svarochnye-gorelki-i-plazmotrony-9634/">
                  Сварочные горелки и плазмотроны
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/svarochnye-shlemy-6199/">
                  Сварочные маски
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/tochechnaya-svarka-10105/">
                  Точечная сварка
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/svarochnoe-oborudovanie-6350/"
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
                href="/otzyvy/stroitelnaya-tekhnika-6029/">
                Строительная техника
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/kompressory-vozdushnye-6032/">
                  Пневматические компрессоры
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/lestnicy-i-vyshki-6038/">
                  Лестницы и вышки
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/gruzopodemnoe-oborudovanie-6039/">
                  Грузоподъемное оборудование
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/vibrooborudovanie-6034/">
                  Виброоборудование
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/betonomeshalki-6030/">
                  Электрические бетономешалки
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/tachki-stroitelnye-6041/">
                  Тачки строительные
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/komplektuyushhie-dlya-stroitelnoj-tekhniki-6044/">
                  Запчасти для строительной техники
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/zatirochnye-mashiny-6036/">
                  Затирочные машины
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/okrasochnoe-oborudovanie-9351/">
                  Окрасочное оборудование
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/apparaty-dlya-svarki-plastika-10426/">
                  Аппараты для сварки пластика
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/dorozhno-razmetochnye-mashiny-10647/">
                  Дорожно-разметочные машины
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/oborudovanie-dlya-raboty-s-armaturoi-10903/">
                  Оборудование для работы с арматурой
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/rezchiki-10525/">
                  Резчики
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/ciklevochnye-mashiny-11137/">
                  Циклевочные машины
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/stroitelnaya-tekhnika-6029/"
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
                href="/otzyvy/uborka-i-klining-6018/">
                Уборка и клининг
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/mojki-vysokogo-davleniya-6020/">
                  Мойки высокого давления
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/pylesosy-6019/">
                  Пылесосы
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/stekloochistiteli-6024/">
                  Стеклоочистители
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/chistyashhaya-khimiya-6022/">
                  Чистящая химия
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/podmetalno-uborochnye-mashiny-7148/">
                  Подметально-уборочные машины
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/komplektuyushhie-dlya-kliningovogo-oborudovaniya-6025/">
                  Комплектующие для клинингового оборудования
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/parogeneratory-promyshlennye-elektricheskie-11243/">
                  Парогенераторы промышленные электрические
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/polomoechnye-mashiny-10284/">
                  Поломоечные машины
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/uborochnyy-inventar-4216/">
                  Уборочный инвентарь
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/uborka-i-klining-6018/"
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
                href="/otzyvy/avtotovary-i-oborudovanie-5998/">
                Автотовары
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/domkrati-5999/">
                  Домкраты
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a className="a-page-catalog__link" href="/otzyvy/masla-7291/">
                  Масла
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/shinomontazhnoe-i-avtoservisnoe-oborudovanie-6601/">
                  Шиномонтажное и автосервисное оборудование
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/avtokhimiya-6007/">
                  Автохимия
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/kompressory-avtomobilnye-6002/">
                  Компрессоры автомобильные
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/pusko-zaryadnye-ustrojstva-5980/">
                  Пуско-зарядные устройства
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/oborudovanie-dlya-perekachki-topliva-6004/">
                  Оборудование для перекачки топлива
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a className="a-page-catalog__link" href="/otzyvy/smazki-7294/">
                  Автомобильные смазки
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/rastyazhki-gidravlicheskie-6003/">
                  Растяжки гидравлические
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/plunzhernye-shpricy-7369/">
                  Плунжерные шприцы
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/steklodomkraty-7697/">
                  Стеклодомкраты
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/penogeneratory-vysokogo-davleniya-7401/">
                  Пеногенераторы высокого давления
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/aksessuary-dlya-salona-avtomobilya-9410/">
                  Аксессуары для салона автомобиля
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/nozhnye-nasosy-dlya-avtomobilya-4213/">
                  Ножные насосы для автомобиля
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/shchetki-10594/">
                  Автомобильные щетки для снега
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/vodosgony-10596/">
                  Водосгоны
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/prisadki-dlya-topliva-10145/">
                  Присадки для топлива
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/provoda-dlya-prikurivaniya-9631/">
                  Провода для прикуривания
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/skrebki-dlya-snega-10595/">
                  Скребки для снега
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/avtotovary-i-oborudovanie-5998/"
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
                href="/otzyvy/skladskoe-oborudovanie-9344/">
                Складское оборудование
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a className="a-page-catalog__link" href="/otzyvy/vesy-10855/">
                  Весы
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/vyshki-podemnye-13153/">
                  Вышки подъемные
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/napolnye-pokrytiya-dlya-skladskih-i-proizvodstvennyh-pomeshchenii-13032/">
                  Напольные покрытия для складских и производственных помещений
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/pogruzchiki-13152/">
                  Погрузчики
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/pozharnoe-oborudovanie-9369/">
                  Пожарное оборудование
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/sredstva-ograzhdeniya-dlya-dorozhnyh-i-avariinyh-rabot-13028/">
                  Средства ограждения для дорожных и аварийных работ
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/stellazhi-9871/">
                  Стеллажи
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/shtabelery-10645/">
                  Штабелеры
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/skladskoe-oborudovanie-9344/"
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
                href="/otzyvy/stroitelnaya-khimiya-4215/">
                Строительная химия
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/germetiki-7288/">
                  Герметики
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a className="a-page-catalog__link" href="/otzyvy/klej-7289/">
                  Клей
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/pena-montazhnaya-7293/">
                  Монтажная пена
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/ochistiteli-7292/">
                  Очистители монтажной пены
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/stroitelnaya-khimiya-4215/"
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
                href="/otzyvy/tovary-pervoj-neobkhodimosti-7199/">
                Товары для туризма и отдыха
              </a>
            </div>{" "}
            <ul className="a-page-catalog__list">
              <li className="a-page-catalog__item">
                <a className="a-page-catalog__link" href="/otzyvy/sani-9536/">
                  Сани-волокуши
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/turisticheskii-inventar-9724/">
                  Туристический инвентарь
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/turisticheskie-gorelki-9720/">
                  Туристические горелки
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/gazovye-ballony-dlya-gorelok-9721/">
                  Газовые баллоны для горелок
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/sredstva-protiv-nasekomykh-7212/">
                  Средства против насекомых и грызунов
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/vs-dlya-shashlyka-i-barbekyu-7222/">
                  Всё для шашлыка, гриля и барбекю
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/batuty-10486/">
                  Батуты
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/kovriki-turisticheskie-10442/">
                  Коврики туристические
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/metalloiskateli-10405/">
                  Металлоискатели
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/spalniki-10937/">
                  Спальники
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/sumki-turisticheskie-10473/">
                  Сумки туристические
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/turisticheskaya-mebel-10471/">
                  Туристическая мебель
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/turisticheskaya-posuda-10472/">
                  Туристическая посуда
                </a>
              </li>
              <li className="a-page-catalog__item">
                <a
                  className="a-page-catalog__link"
                  href="/otzyvy/turisticheskie-palatki-10851/">
                  Туристические палатки
                </a>
              </li>
            </ul>
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/tovary-pervoj-neobkhodimosti-7199/"
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
                href="/otzyvy/podarochnye-karty-9840/">
                Подарочные карты
              </a>
            </div>{" "}
          </div>{" "}
          <a
            className="a-page-catalog__cover-link"
            href="/otzyvy/podarochnye-karty-9840/"
          />
        </div>
      </div>
    </div>
  </section>{" "}
  <section className="a-page-catalog__section a-page-catalog__section--description">
    <div className="a-spoiler a-title-indent a-spoiler--open">
      <div className="a-spoiler__content">
        <div className="a-page-catalog__inner" />
      </div>{" "}
      <div
        className="a-spoiler__buttons"
        style={{
          display: "none",
        }}>
        <button
          className="a-spoiler__button a-spoiler__button--open a-link a-link--grey"
          style={{
            "--spoiler-open-text": "'Читать полностью'",
          }}
          type="button"
        />{" "}
        <button
          className="a-spoiler__button a-spoiler__button--close a-link a-link--grey"
          type="button">
          Скрыть
        </button>
      </div>
    </div>
  </section>
</div>

    </main>
  );
}
