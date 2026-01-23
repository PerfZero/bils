"use client";

export default function OrdersPage() {
  return (
    <main className="a-page-personal a-page__main">
      <div className="a-page-personal__container">
        <ul className="a-breadcrumbs a-page-personal__breadcrumbs">
          <li className="a-breadcrumbs__item">
            <a className="a-breadcrumbs__link nuxt-link-active" href="/">
              Главная
            </a>
          </li>
          <li className="a-breadcrumbs__item">
            <a className="a-breadcrumbs__link nuxt-link-active" href="/personal/">
              Личный кабинет
            </a>
          </li>
          <li className="a-breadcrumbs__item a-breadcrumbs__item--current">
            <span className="a-breadcrumbs__text">Мои заказы</span>
          </li>
        </ul>
        <div className="a-page-personal__head">
          <div className="a-page-personal__head-content vue-portal-target">
            <h1 className="a-title__h1">Мои заказы</h1>
          </div>
          <div className="a-page-personal__head-append vue-portal-target" />
        </div>
        <div className="a-page-personal__wrap">
          <div className="a-page-personal__content">
            <p>Список заказов пока пуст.</p>
          </div>
        </div>
      </div>
      <div className="vue-portal-target" />
    </main>
  );
}
