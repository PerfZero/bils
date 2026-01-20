"use client";

import Breadcrumbs from "../../../components/Breadcrumbs";

export default function CatalogSlugPage({ params }) {
  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Наша жизнь" },
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
      <h1>Наша жизнь</h1>
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
              href="/about/career/">
              Карьера
            </a>
          </div>
          <div className="page-static-menu__item">
            <a
              aria-current="page"
              className="page-static-menu__link nuxt-link-exact-active nuxt-link-active page-static-menu__link--active"
              href="/about/career/life/">
              Наша жизнь
            </a>
          </div>
          <div className="page-static-menu__item">
            <a
              className="page-static-menu__link"
              href="/about/career/management/">
              Наши руководители
            </a>
          </div>
          <div className="page-static-menu__item">
            <a
              className="page-static-menu__link"
              href="                https://yaroslavl.hh.ru/search/vacancy?from=employerPage&employer_id=50355&hhtmFrom=employer            "
              rel="nofollow"
              target="_blank">
              Вакансии
            </a>
          </div>
        </div>
      </div>{" "}
      <div className="a-page-static__description a-page-static__description--old">
        <p>Бигам – это не только про работу, но и про отдых.</p>
        <p>
          Праздники, дни рождения компании, открытия новых филиалов и розыгрыши
          для клиентов мы традиционно проводим вместе.
        </p>
        <p>
          Сотрудники развивают свои профессиональные и лидерские качества
          благодаря участию в event-мероприятиях, выездных конференциях и
          обучающих тренингах.
        </p>
        <p>
          <strong>
            * Наша команда это не только сотрудники, но и их семьи. Для них мы
            проводим творческие конкурсы и дарим подарки!
          </strong>
        </p>
        <p>
          <strong>
            Бигам - команда единомышленников, близких по духу и ценностям!
          </strong>
        </p>
        <img
          alt="DSC_5426.jpg"
          src="https://cdn.bigam.ru/medialibrary/fed/sjkx3307451wux5g4jli017d17xhyveq/DSC_5426.jpg"
        />
      </div>
    </div>
  </section>
</div>

    </main>
  );
}
