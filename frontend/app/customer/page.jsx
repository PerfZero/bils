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
      <h1>Как заказать</h1>
    </div>{" "}
    <div className="a-page-static__wrap">
      <div className="a-page-static__style">
        <style /> <script />
      </div>{" "}
      <div className="a-page-static__sidebar">
        <div className="page-static-menu__list">
          <div className="page-static-menu__item">
            <a
              aria-current="page"
              className="page-static-menu__link nuxt-link-exact-active nuxt-link-active page-static-menu__link--active"
              href="/customer/">
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
        <h2>Как оформить покупку в интернет-магазине «Бигам»?</h2>
        <h3>Оформление заказа через «Корзину товаров»</h3>
        <ol>
          <li>
            На сайте выберите нужный товар, нажмите кнопку «В корзину» и укажите
            количество.
          </li>
          <li>
            Для заказа сразу нескольких товаров нажмите кнопку «Продолжить
            покупки», и вы вернетесь опять к каталогу.
          </li>
          <li>Нажмите кнопку «Перейти в корзину» и «Оформить заказ».</li>
          <li>
            Выберите способ доставки (самовывоз или доставка в пункт выдачи),
            ниже на странице введите свои данные, выберите способ оплаты, еще
            раз проверьте правильность своего заказа и, если требуется, укажите
            дополнительную информацию в комментарии.
          </li>
          <li>
            Нажмите кнопку «Отправить заказ». Позже на вашу электронную почту и
            телефон придет подтверждение заказа. Как заказ будет готов, с вами
            свяжется наш менеджер и сообщит дату и место, где можно получить
            товар.
          </li>
        </ol>
        <h3>Быстрый заказ в 1 клик</h3>
        <ol>
          <li>Нажмите кнопку «Купить в 1 клик»</li>
          <li>
            В появившемся окне укажите свои данные и номер телефона, нажмите
            кнопку «Отправить».
          </li>
          <li>Дождитесь звонка нашего менеджера, который оформит ваш заказ.</li>
        </ol>
        <h3>Другие способы заказа</h3>
        <p>
          Вы можете оформить заказ по нашему бесплатному номеру
          <a href="tel:88005556973" target="_blank">
            8-800-555-69-73
          </a>
          с 8-00 до 20-00 с Пн по Пт, с 8-00 по 18-00 с Сб по Вс (звонок
          бесплатный по РФ), отправить заявку на почту
          <a href="mailto:help@bigam.ru" target="_blank">
            help@bigam.ru
          </a>
          или написать нам в онлайн-чате.
        </p>
        <h2>Почему удобнее заказывать товары с регистрацией на сайте?</h2>
        <p>
          При регистрации на сайте и заказе товаров через Личный кабинет вы
          получаете несколько преимуществ:
        </p>
        <ul>
          <li>нет необходимости вводить личные данные при каждом заказе,</li>
          <li>есть возможность отменить заказ без связи с менеджером,</li>
          <li>
            есть возможность повторить заказ и узнать его статус на любом этапе
            обработки,
          </li>
          <li>доступна история заказов,</li>
          <li>доступно сравнение товаров,</li>
          <li>
            доступно хранение избранных позиций и приглянувшихся моделей в
            корзине,
          </li>
          <li>
            доступна подписка на рассылку новостей и информацию о предстоящих
            акциях.
          </li>
        </ul>
        <hr />
        <p>
          Если у вас возникли трудности с оформлением заказа или регистрацией на
          сайте, вы всегда можете обратиться к менеджерам контакт-центра по
          телефону горячей линиии
          <a href="tel:88005556973">8-800-555-69-73</a>
           (звонок бесплатный по РФ).
        </p>
      </div>
    </div>
  </section>
</div>

        </main>
    );
}
