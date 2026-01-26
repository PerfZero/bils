"use client";

import Breadcrumbs from "../../components/Breadcrumbs";
import BackButton from "../../components/BackButton";

export default function ReviewsOfWorks() {
  const breadcrumbs = [
    { href: "/", label: "Главная" },
    { href: "/about/", label: "О компании" },
    { label: "Отзывы о работах" },
  ];

  const totalRating = {
    rating: 4.6,
    reviewCount: 782,
    yearsOnYandex: 13,
  };

  const reviews = [
    {
      id: "1403482",
      name: "Гацерелия Андрей Тимофеевич",
      date: "17 декабря 2024",
      location: "Ковров",
      rating: 5.0,
      type: "Отличный магазин",
      message:
        "Сегодня приобретали снегоуборщик в магазине на Октябрьском 25. Хотелось бы поблагодарить продавцов-консультантов этого магазина. Ребята знают своё дело, грамотно могут помочь в выборе, сопровождают на всех этапах покупки, вплоть до загрузки её в автомобиль. Рекомендую этот магазин всем!",
      likes: 5,
      isExpanded: true,
    },
    {
      id: "1403485",
      name: "Агапов Александр Иванович",
      date: "30 июня 2024",
      location: "Кострома",
      rating: 4.0,
      type: "Хороший магазин",
      message:
        "Очень хороший магазин, советую всем, хороший товар, быстрая доставка и отличные курьеры,большое спасибо BREMAX!!!",
      likes: 4,
      isExpanded: true,
    },
    {
      id: "1403486",
      name: "Викторов Владислав Викторович",
      date: "9 июня 2024",
      location: "Углич",
      rating: 5.0,
      type: "Отличный магазин",
      message: "Отличный магазин,все быстро и в срок!!! рекомендую",
      likes: 0,
      isExpanded: true,
    },
    {
      id: "1403484",
      name: "Бобр-Сергеев Андрей Анатольевич",
      date: "16 мая 2024",
      location: "Москва",
      rating: 4.0,
      type: "Хороший магазин",
      message:
        "Хочется сказать спасибо всем сотрудникам Вашей компании за профессиональный подход к своей работе и внимательное, простое общение с заказчиком. Всем здоровья и хорошего настроения. С уважением Андрей",
      likes: 0,
      isExpanded: true,
    },
    {
      id: "1403489",
      name: "Раиса Николаевна Белялова",
      date: "24 марта 2024",
      location: "Ярославль",
      rating: 5.0,
      type: "Отличный магазин",
      message:
        "Прошу руководство компании BREMAX отметить не просто хорошую, а замечательную работу сотрудников магазина BREMAX в городе Иваново, ул. Куконковых, 141 Б. Дважды в этом месяце делала покупки в магазине, заказывала по интернету и получала там товар. Во-первых, в магазине редкая чистота, во-вторых, товары все разложены по типам и категориям с ценниками и необходимой информацией, а в-третьих, там замечательный персонал. С моим товаром занимался менеджер Моклоков Владимир. Всё рассказал, показал, предложил посмотреть другие товары, провёл по залу. Помог оформить 3-х летнюю гарантию на шуруповёрт Метабо на компьютере (дома мне не удалось это сделать). А кассир Анна Фроловских - само обаяние и дружелюбие! Знаете, даже в наше конкурентное время, в редких магазинах такое встретишь. Ещё хочется отметить службу заказа интернет-магазина - позвонили, предупредили, что товар на день задерживается, потом прислали смс о том, что можно забрать заказ. Честное слово, молодцы! Отличная организация работы компании! Всем спасибо! Приду ещё не раз. Р. Н. Белялова - 68 лет. г. Иваново.",
      likes: 0,
      isExpanded: false,
    },
    {
      id: "1403490",
      name: "Немолочнов ЗС",
      date: "26 февраля 2024",
      location: "Ярославль",
      rating: 5.0,
      type: "Отличный магазин",
      message:
        "Очень благодарны за компетентный обзор и вежливую продажу менеджеру Никита. по адресу Ярославль ул Силикатное шосссе",
      likes: 0,
      isExpanded: true,
    },
    {
      id: "1422018",
      name: "Роман Косицын",
      date: "21 февраля 2024",
      location: "Москва",
      rating: 5.0,
      type: "Отличный магазин",
      message:
        "Ассортимент достойный, нам нужны были определенные позиции, смотрели по своему списку приготовленному, по итогу сразу всё нашли. Цены вполне адекватные, сравнивали для себя разные места.",
      likes: 3,
      isExpanded: true,
    },
    {
      id: "1403491",
      name: "ГЕННАДИЙ ПЕТРОВИЧ ЯКУБОВ",
      date: "11 февраля 2024",
      location: "Тверь",
      rating: 5.0,
      type: "Отличный магазин",
      message: "хорошее описание товара.быстрая доставка.все устраивает.",
      likes: 0,
      isExpanded: true,
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => {
      const isActive = index < Math.floor(rating);
      return (
        <li
          key={index}
          className={`a-rating__item ${isActive ? "a-rating__item--active" : ""}`}
        >
          <svg className="a-svg a-rating__icon a-rating__icon--inactive a-rating__icon--color-grey">
            <use
              xlinkHref="#icon-star"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            />
          </svg>
          <svg className="a-svg a-rating__icon a-rating__icon--active a-rating__icon--color-orange">
            <use
              xlinkHref="#icon-star"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            />
          </svg>
        </li>
      );
    });
  };

  return (
    <main className="a-page-reviews-of-works a-page__main">
      <div className="a-page-reviews-of-works__container">
        <Breadcrumbs items={breadcrumbs} />
        <BackButton href="/about/" text="О компании" />
        <h1 className="a-page-reviews-of-works__header">Отзывы покупателей</h1>
        <div className="a-page-reviews-of-works__content">
          <div className="a-shop-review-list">
            <ul className="a-shop-review-list__list">
              <li className="a-shop-review-list__item a-shop-review-list__item--total">
                <div className="a-shop-review-list__title">
                  Общий рейтинг магазина
                </div>
                <div className="a-shop-review-list__group">
                  <div className="a-shop-review-list__logo">
                    <svg className="a-svg">
                      <use
                        xlinkHref="#icon-last-bigam-logo-color"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      />
                    </svg>
                  </div>
                  <div className="a-shop-review-list__rating">
                    <div className="a-rating">
                      <ul className="a-rating__list">
                        {renderStars(totalRating.rating)}
                      </ul>
                      <div className="a-rating__count">
                        {totalRating.rating}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="a-shop-review-list__count">
                  {totalRating.reviewCount} отзыва
                </div>
                <div className="a-shop-review-list__years-on-yandex">
                  {totalRating.yearsOnYandex} лет на Яндекс.Маркет
                </div>
              </li>
              {reviews.map((review) => (
                <li key={review.id} className="a-shop-review-list__item">
                  <div className="a-review-card" id={review.id}>
                    <div className="a-review-card__name">{review.name}</div>
                    <div className="a-review-card__info">
                      {review.date}, {review.location}
                    </div>
                    <div className="a-review-card__rating">
                      <div className="a-rating" text={review.type}>
                        <ul className="a-rating__list">
                          {renderStars(review.rating)}
                        </ul>
                        <div className="a-rating__count">{review.rating}</div>
                      </div>
                      <div className="a-review-card__type">{review.type}</div>
                    </div>
                    <div
                      className={`a-spoiler a-title-indent ${review.isExpanded ? "a-spoiler--open" : ""}`}
                    >
                      <div className="a-spoiler__content">
                        <div className="a-review-card__message">
                          <p className="a-review-card__description">
                            {review.message}
                          </p>
                        </div>
                      </div>
                      <div
                        className="a-spoiler__buttons"
                        style={{
                          display: review.isExpanded ? "none" : "",
                        }}
                      >
                        <button
                          className="a-spoiler__button a-spoiler__button--open a-link a-link--grey"
                          style={{
                            "--spoiler-open-text": "'Читать полностью'",
                          }}
                          type="button"
                        />
                        <button
                          className="a-spoiler__button a-spoiler__button--close a-link a-link--grey"
                          type="button"
                        >
                          Скрыть
                        </button>
                      </div>
                    </div>
                    <button className="a-review-card__likes">
                      <span className="a-review-card__likes-icon">
                        <svg className="a-svg">
                          <use
                            xlinkHref="#icon-like"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                          />
                        </svg>
                      </span>
                      <span className="a-review-card__likes-text">
                        {review.likes}
                      </span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>{" "}
          </div>
          <div className="a-page-reviews-of-works__footer">
            <button
              className="a-main-button a-main-button--display-inline a-main-button--type-medium a-main-button--corner-round a-main-button--color-light-grey"
              type="button"
            >
              {" "}
              <span className="a-main-button__wrap">
                {" "}
                <span className="a-main-button__content">
                  Показать еще
                </span>{" "}
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
                  <a
                    className="a-pagination__button"
                    href="/about/reviews-of-works/?page=2"
                  >
                    2
                  </a>
                </li>
                <li className="a-pagination__item">
                  <a
                    className="a-pagination__button"
                    href="/about/reviews-of-works/?page=3"
                  >
                    3
                  </a>
                </li>
                <li className="a-pagination__item">
                  <a
                    className="a-pagination__button"
                    href="/about/reviews-of-works/?page=4"
                  >
                    4
                  </a>
                </li>
                <li className="a-pagination__item">
                  <a
                    className="a-pagination__button"
                    href="/about/reviews-of-works/?page=5"
                  >
                    5
                  </a>
                </li>
                <li className="a-pagination__item">
                  <span className="a-pagination__button">...</span>
                </li>
                <li className="a-pagination__item">
                  <a
                    className="a-pagination__button"
                    href="/about/reviews-of-works/?page=98"
                  >
                    98
                  </a>
                </li>
              </ul>{" "}
              <a
                className="a-pagination__button"
                href="/about/reviews-of-works/?page=2"
              >
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
      </div>
    </main>
  );
}
