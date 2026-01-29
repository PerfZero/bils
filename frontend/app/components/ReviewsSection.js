import styles from "./ReviewsSection.module.css";

export default function ReviewsSection() {
  const items = [
    {
      href: "https://vl.ru/",
      logo: "/img_1.png",
      alt: "Отзыв 1",
      rating: "5",
      reviews: "29 отзывов",
    },
    {
      href: "https://2gis-firm.ru/bremax",
      logo: "/img_2.png",
      alt: "Отзыв 2",
      rating: "4.8",
      reviews: "122 отзывов",
    },
    {
      href: "https://yandex-reviews.ru/bremax",
      logo: "/img_3.jpg",
      alt: "Отзыв 3",
      rating: "5",
      reviews: "36 отзывов",
    },
    {
      href: "https://dzen.ru/",
      logo: "/img_4.png",
      alt: "Отзыв 4",
      rating: "5",
      reviews: "17 отзывов",
    },
  ];

  return (
    <section className="a-page-main__reviews">
      <div className="a-page-main__container">
        <h2 className="a-page-main__title a-title-h2">Отзывы покупателей</h2>
        <div className={`a-reviews-links ${styles.grid}`}>
          {items.map((item) => (
            <a
              key={item.alt}
              href={item.href}
              className={`a-reviews-links__item ${styles.card}`}
            >
              <div className={styles.logoWrap}>
                <img
                  src={item.logo}
                  alt={item.alt}
                  className={`a-reviews-links__image ${styles.logo}`}
                />
              </div>
              <div className={styles.meta}>
                <span className={styles.rating}>★ {item.rating}</span>
                <span className={styles.reviews}>{item.reviews}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
