export default function ReviewsSection() {
  return (
    <section className="a-page-main__reviews">
      <div className="a-page-main__container">
        <h2 className="a-page-main__title a-title-h2">Отзывы покупателей</h2>
        <div
          className="a-reviews-links"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
            alignItems: "center",
          }}
        >
          <a href="#" className="a-reviews-links__item">
            <img
              src="/img_1.png"
              alt="Отзыв 1"
              className="a-reviews-links__image"
              style={{ display: "block", maxHeight: "180px", width: "auto" }}
            />
          </a>
          <a href="#" className="a-reviews-links__item">
            <img
              src="/img_2.png"
              alt="Отзыв 2"
              className="a-reviews-links__image"
              style={{ display: "block", maxHeight: "180px", width: "auto" }}
            />
          </a>
          <a href="#" className="a-reviews-links__item">
            <img
              src="/img_3.jpg"
              alt="Отзыв 3"
              className="a-reviews-links__image"
              style={{ display: "block", maxHeight: "180px", width: "auto" }}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
