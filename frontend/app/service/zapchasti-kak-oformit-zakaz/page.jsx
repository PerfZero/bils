"use client";

import Breadcrumbs from "../../components/Breadcrumbs";

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
          <div className="a-page-static__title">
            <h1>Как оформить заказ запчастей</h1>
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
                    href="/service/">
                    Сервисный центр
                  </a>
                </div>
                <div className="page-static-menu__item">
                  <div className="page-static-menu__link">Проверить статус</div>
                </div>
                <div className="page-static-menu__item">
                  <a
                    className="page-static-menu__link"
                    href="/catalog/zapchasti-6733/">
                    Каталог запчастей
                  </a>
                </div>
                <div className="page-static-menu__item">
                  <a className="page-static-menu__link" href="/service/prices/">
                    Услуги
                  </a>
                </div>
                <div className="page-static-menu__item">
                  <a
                    aria-current="page"
                    className="page-static-menu__link nuxt-link-exact-active nuxt-link-active page-static-menu__link--active"
                    href="/service/zapchasti-kak-oformit-zakaz/">
                    Как заказать запчаcть
                  </a>
                </div>
                <div className="page-static-menu__item">
                  <a className="page-static-menu__link" href="/service/#contact-1">
                    Контакты
                  </a>
                </div>
              </div>
            </div>{" "}
            <div className="a-page-static__description a-page-static__description--old">
              <img
                alt=""
                src="https://cdn.bigam.ru/medialibrary/376/xbftltzqo9yzjlcc78auknjlgij245st/spare_part_1140x330_2.jpg"
              />
              <p>
                Сервисный центр «BREMAX» располагает большим ассортиментом запчастей
                для любого специализированного оборудования, техники и инструмента: от
                рычагов переключения до роторов. Практически все представленные на
                сайте модели есть в наличии, также можем заказать недостающие изделия
                и доставить их в короткие сроки.
              </p>
              <p>
                <b>Как подобрать и оформить заказ запасных частей?</b>
              </p>
              <ol>
                <li>
                  Вы можете подобрать необходимую запчасть из имеющихся в наличии в
                  Сервисном центре по{" "}
                  <a href="/catalog/zapchasti-6733/">
                    <b>ссылке</b>
                  </a>
                  , используя поиск по бренду или по названию товара. Положить
                  необходимый товар в «Корзину», нажать «Оформить заказ» и в форме
                  оформления заказа ввести контактные данные.
                </li>
                <li>
                  Чтобы заказать запчасть, которой нет в ассортименте, позвоните на
                  один из номер сервисного центра. Менеджеры помогут разобраться в
                  инструменте и подобрать подходящую деталь.
                </li>
              </ol>
              <p>
                Решить проблему вашего неисправного инструмента – наша приоритетная
                задача!
              </p>
            </div>
          </div>
        </section>
      </div>

    </main>
  );
}
