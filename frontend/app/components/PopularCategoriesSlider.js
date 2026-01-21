"use client";

export default function PopularCategoriesSlider({ categories }) {
  if (!categories?.length) {
    return null;
  }

  return (
    <section className="a-page-main__popular-categories">
      <div className="a-page-main__container">
        <div className="a-page-main__title a-title-h2">
          Популярные категории
        </div>
        <div className="popular-categories__list">
          {categories.map((category) => (
            <a key={category.id} className="a-link-button" href={category.url}>
              <span className="a-link-button__content a-link-button__content--black">
                <span>{category.name}</span>
                <div className="a-picture-card" title={category.name}>
                  {category.image && (
                    <img
                      alt={category.name}
                      className="a-picture-card__picture a-lazy-load a-is-loaded"
                      src={category.image}
                    />
                  )}
                  <span />
                </div>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
