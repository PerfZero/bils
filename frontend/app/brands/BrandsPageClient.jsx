"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Breadcrumbs from "../components/Breadcrumbs";
import { API_BASE_URL } from "../../config/api";

const RU_LETTERS = [
  "А",
  "Б",
  "В",
  "Г",
  "Д",
  "Е",
  "Ж",
  "З",
  "И",
  "К",
  "Л",
  "М",
  "Н",
  "О",
  "П",
  "Р",
  "С",
  "Т",
  "У",
  "Ф",
  "Х",
  "Ц",
  "Ч",
  "Ш",
  "Щ",
  "Э",
  "Ю",
  "Я",
];

const EN_LETTERS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

function normalizeImageUrl(url) {
  if (!url) return url;
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  if (url.startsWith("/media/")) {
    return `${API_BASE_URL}${url}`;
  }
  return url;
}

function normalizeLetter(letter) {
  if (!letter) return "";
  return letter.trim().toUpperCase();
}

function buildQuery({ letter, category }) {
  const params = new URLSearchParams();
  if (letter) {
    params.set("letter", letter.toLowerCase());
  }
  if (category) {
    params.set("category", category);
  }
  const query = params.toString();
  return query ? `?${query}` : "";
}

export default function BrandsPage() {
  const breadcrumbs = [{ label: "Главная", href: "/" }, { label: "Бренды" }];
  const searchParams = useSearchParams();
  const selectedLetter = normalizeLetter(searchParams.get("letter"));
  const selectedCategory = searchParams.get("category") || "";
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedLetter) {
          params.set("letter", selectedLetter);
        }
        if (selectedCategory) {
          params.set("category", selectedCategory);
        }
        const query = params.toString();
        const response = await fetch(
          `${API_BASE_URL}/api/brands/${query ? `?${query}` : ""}`,
        );
        const data = await response.json();
        const items = Array.isArray(data?.results) ? data.results : data;
        setBrands(Array.isArray(items) ? items : []);
      } catch (error) {
        console.error("Failed to fetch brands:", error);
        setBrands([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, [selectedLetter, selectedCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/categories/`);
        const data = await response.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  const groupedBrands = useMemo(() => {
    const groups = new Map();

    brands.forEach((brand) => {
      const letter = normalizeLetter(brand.letter || brand.name?.[0]);
      if (!letter) return;
      if (!groups.has(letter)) {
        groups.set(letter, []);
      }
      groups.get(letter).push(brand);
    });

    const sortedGroups = Array.from(groups.entries()).sort(([a], [b]) =>
      a.localeCompare(b, "ru"),
    );

    return sortedGroups.map(([letter, items]) => [
      letter,
      items.sort((a, b) => a.name.localeCompare(b.name, "ru")),
    ]);
  }, [brands]);

  return (
    <main className="a-page-static a-page__main">
      <div className="a-page-catalog__container">
        <Breadcrumbs
          items={breadcrumbs}
          className="a-page-catalog__breadcrumbs"
        />
      </div>
      <div className="a-page-brands__container">
        <h1 className="a-page-brands__title">Бренды и производители</h1>
        <section className="a-page-brands__section a-page-brands__section--filter">
          <div className="js-tags a-tags">
            <ul className="a-tags__groups a-tags__groups--letter">
              <li className="a-tags__group a-tags__group--limit-left a-tags__group--limit-right">
                <div className="a-tags__title">А-Я:</div>
                <ul className="a-tags__list">
                  {RU_LETTERS.map((letter) => (
                    <li key={`ru-${letter}`} className="a-tags__item">
                      <div
                        aria-label={letter}
                        className={
                          "a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange" +
                          (selectedLetter === letter
                            ? " a-ellipse-button--active"
                            : "")
                        }
                        title={letter}
                      >
                        <a
                          aria-label={letter}
                          className="a-ellipse-button__button"
                          href={`/brands/${buildQuery({
                            letter,
                            category: selectedCategory,
                          })}`}
                          title={letter}
                        >
                          <span className="a-ellipse-button__text">
                            {letter}
                          </span>
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="a-tags__group a-tags__group--limit-left a-tags__group--limit-right">
                <div className="a-tags__title">A-Z:</div>
                <ul className="a-tags__list">
                  {EN_LETTERS.map((letter) => (
                    <li key={`en-${letter}`} className="a-tags__item">
                      <div
                        aria-label={letter}
                        className={
                          "a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange" +
                          (selectedLetter === letter
                            ? " a-ellipse-button--active"
                            : "")
                        }
                        title={letter}
                      >
                        <a
                          aria-label={letter}
                          className="a-ellipse-button__button"
                          href={`/brands/${buildQuery({
                            letter,
                            category: selectedCategory,
                          })}`}
                          title={letter}
                        >
                          <span className="a-ellipse-button__text">
                            {letter}
                          </span>
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            <ul className="a-tags__groups">
              <li className="a-tags__group">
                <ul className="a-tags__list">
                  <li className="a-tags__item">
                    <div
                      aria-label="Все категории"
                      className={
                        "a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange" +
                        (!selectedCategory ? " a-ellipse-button--active" : "")
                      }
                      title="Все категории"
                    >
                      <a
                        className="a-ellipse-button__button"
                        href={`/brands/${buildQuery({ letter: selectedLetter })}`}
                        aria-label="Все категории"
                        title="Все категории"
                      >
                        <span className="a-ellipse-button__text">
                          Все категории
                        </span>
                      </a>
                    </div>
                  </li>
                  {categories.map((category) => (
                    <li key={category.id} className="a-tags__item">
                      <div
                        aria-label={category.name}
                        className={
                          "a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange" +
                          (selectedCategory === category.slug
                            ? " a-ellipse-button--active"
                            : "")
                        }
                        title={category.name}
                      >
                        <a
                          className="a-ellipse-button__button"
                          href={`/brands/${buildQuery({
                            letter: selectedLetter,
                            category: category.slug,
                          })}`}
                          aria-label={category.name}
                          title={category.name}
                        >
                          <span className="a-ellipse-button__text">
                            {category.name}
                          </span>
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </section>
        <section className="a-page-brands__section a-page-brands__section--letters">
          {loading ? (
            <div className="a-page-brands__empty">Загрузка брендов...</div>
          ) : groupedBrands.length === 0 ? (
            <div className="a-page-brands__empty">Бренды не найдены</div>
          ) : (
            <ul className="a-page-brands__groups">
              {groupedBrands.map(([letter, items]) => (
                <li key={`group-${letter}`} className="a-page-brands__group">
                  <div className="a-page-brands__letter">
                    <span>{letter}</span>
                  </div>
                  <ul className="a-page-brands__list">
                    {items.map((brand) => (
                      <li key={brand.id} className="a-page-brands__item">
                        <a className="a-page-brands__picture" href={brand.href}>
                          {brand.logo ? (
                            <img
                              alt={brand.name}
                              className="a-lazy-load a-is-loaded"
                              loading="lazy"
                              decoding="async"
                              src={normalizeImageUrl(brand.logo)}
                            />
                          ) : (
                            <div className="a-page-brands__text">
                              {brand.name}
                            </div>
                          )}
                          <span />
                        </a>
                        <a className="a-page-brands__link" href={brand.href}>
                          {brand.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
