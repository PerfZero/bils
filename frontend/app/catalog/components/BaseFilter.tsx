"use client";

import { useMemo, useState } from "react";

type FilterOption = {
  id: string;
  label: string;
  title: string;
};

type FilterSection = {
  id: string;
  title: string;
  descriptionClassName?: string;
  content?: JSX.Element;
  options?: FilterOption[];
  searchName?: string;
  name?: string;
  dataTargetPrefix?: string;
  fullText?: string;
};

export function BaseFilter() {
  const sections: FilterSection[] = useMemo(() => {
    const manufacturerOptions = [
      { id: "_439826", label: "Abac (Абак)", title: "Abac(Абак)" },
      { id: "_1466482", label: "Absolut", title: "Absolut" },
    ];
    const countryOptions = [
      { id: "russia", label: "Россия", title: "Россия" },
      { id: "germany", label: "Германия", title: "Германия" },
      { id: "china", label: "Китай", title: "Китай" },
      { id: "italy", label: "Италия", title: "Италия" },
      { id: "usa", label: "США", title: "США" },
      { id: "latvia", label: "Латвия", title: "Латвия" },
      { id: "taiwan", label: "Тайвань", title: "Тайвань" },
    ];

    return [
      {
        id: "price",
        title: "Цена, руб.",
        content: (
          <div className="a-base-filter__content">
            <div className="a-base-filter__fields a-base-filter__fields--int">
              <div
                className="a-base-filter__field"
                data-target="field-price"
                data-target-offset="-6"
              >
                <div className="a-range-field">
                  <div className="a-range-field__constrain">
                    <div className="a-range-field__slider">
                      <div
                        className="vue-slider vue-slider-ltr"
                        style={{
                          height: "4px",
                          padding: "12px",
                          width: "auto",
                        }}
                      >
                        <div className="vue-slider-rail">
                          <div
                            className="vue-slider-process"
                            style={{
                              height: "100%",
                              left: "0%",
                              top: "0px",
                              transitionDuration: "0.5s",
                              transitionProperty: "width, left",
                              width: "100%",
                            }}
                          />
                          <div
                            aria-orientation="horizontal"
                            aria-valuemax="374800"
                            aria-valuemin="8"
                            aria-valuenow="8"
                            aria-valuetext="8"
                            className="vue-slider-dot"
                            role="slider"
                            style={{
                              height: "14px",
                              left: "0%",
                              top: "50%",
                              transform: "translate(-50%, -50%)",
                              transition: "left 0.5s",
                              width: "14px",
                            }}
                            tabIndex={0}
                          >
                            <div className="vue-slider-dot-handle" />
                          </div>
                          <div
                            aria-orientation="horizontal"
                            aria-valuemax="374800"
                            aria-valuemin="8"
                            aria-valuenow="374800"
                            aria-valuetext="374800"
                            className="vue-slider-dot"
                            role="slider"
                            style={{
                              height: "14px",
                              left: "100%",
                              top: "50%",
                              transform: "translate(-50%, -50%)",
                              transition: "left 0.5s",
                              width: "14px",
                            }}
                            tabIndex={0}
                          >
                            <div className="vue-slider-dot-handle" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="a-range-field__interval">
                      <div className="a-range-field__field">
                        <div className="a-input-field a-input-field--type-integer">
                          <label className="a-input-field__constrain" title="">
                            <input
                              autoComplete="off"
                              className="a-input-field__input"
                              inputMode="numeric"
                              lang="ru"
                              name="price-min"
                              placeholder=""
                              spellCheck={false}
                              type="text"
                            />
                          </label>
                        </div>
                        <span className="a-range-field__helper">от</span>
                      </div>
                      <div className="a-range-field__field">
                        <div className="a-input-field a-input-field--type-integer">
                          <label className="a-input-field__constrain" title="">
                            <input
                              autoComplete="off"
                              className="a-input-field__input"
                              inputMode="numeric"
                              lang="ru"
                              name="price-max"
                              placeholder=""
                              spellCheck={false}
                              type="text"
                            />
                          </label>
                        </div>
                        <span className="a-range-field__helper">до</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "manufacturer",
        title: "Производитель",
        descriptionClassName:
          "a-base-filter__title-description a-base-filter__title-description--right-padding",
        options: manufacturerOptions,
        searchName: "manufacturer-search",
        name: "manufacturer",
        dataTargetPrefix: "field-manufacturer-",
        fullText: "Скрыть",
      },
      {
        id: "country_of_origin",
        title: "Страна производства",
        descriptionClassName:
          "a-base-filter__title-description a-base-filter__title-description--right-padding",
        options: countryOptions,
        searchName: "country_of_origin-search",
        name: "country_of_origin",
        dataTargetPrefix: "field-country_of_origin-",
        fullText: "Показать все",
      },
    ];
  }, []);

  const [openIds, setOpenIds] = useState(
    () => new Set(sections.map(({ id }) => id)),
  );

  const toggleSection = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="a-base-filter">
      <div className="js-base-filter a-base-filter__base">
        <div className="a-base-filter__wrap">
          <ul className="a-base-filter__list">
            {sections.map((section) => {
              const isOpen = openIds.has(section.id);
              const descriptionClassName =
                section.descriptionClassName ||
                "a-base-filter__title-description";
              return (
                <li
                  key={section.id}
                  className={`a-base-filter__item js-base-filter__item${isOpen ? " a-base-filter__item--active" : ""}`}
                >
                  <div
                    className="a-base-filter__header"
                    id={section.id}
                    onClick={() => toggleSection(section.id)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isOpen}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        toggleSection(section.id);
                      }
                    }}
                  >
                    <div className="a-base-filter__title">
                      <svg
                        className="a-svg a-base-filter__icon"
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      >
                        <use
                          xlinkHref="#icon-last-chevron-down"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        />
                      </svg>
                      <div className="a-base-filter__title--text">
                        <div className={descriptionClassName}>
                          <span className="a-base-filter__text">
                            {section.title}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {isOpen
                    ? section.content || (
                        <div className="a-base-filter__content">
                          <div className="a-base-filter__search">
                            <div className="a-input-field a-input-field--type-string">
                              <label
                                className="a-input-field__constrain"
                                title=""
                              >
                                <input
                                  autoComplete="off"
                                  className="a-input-field__input"
                                  inputMode="search"
                                  lang="ru"
                                  name={section.searchName}
                                  placeholder="Поиск"
                                  spellCheck={false}
                                  type="text"
                                />
                                <span className="a-input-field__append-content">
                                  <button title="Поиск" type="button">
                                    <svg className="a-svg">
                                      <use
                                        xlinkHref="#icon-search"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                      />
                                    </svg>
                                  </button>
                                </span>
                              </label>
                            </div>
                          </div>
                          <div className="a-base-filter__fields a-base-filter__fields--enum">
                            {section.options?.map((option) => (
                              <div
                                key={option.id}
                                className="a-base-filter__field"
                                data-target={`${section.dataTargetPrefix}${option.id}`}
                              >
                                <div className="a-checkbox-field">
                                  <label className="a-checkbox-field__constrain">
                                    <input
                                      className="a-checkbox-field__input"
                                      defaultValue={option.id}
                                      name={section.name}
                                      type="checkbox"
                                    />
                                    <span
                                      className="a-checkbox-field__fake"
                                      title={option.title}
                                    />
                                    <span className="a-checkbox-field__label">
                                      {option.label}
                                    </span>
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="a-base-filter__full">
                            <button
                              className="a-base-filter__link a-link"
                              type="button"
                            >
                              <div
                                className="seo-text"
                                style={{
                                  "--seo-text": `'${section.fullText}'`,
                                }}
                              />
                            </button>
                          </div>
                        </div>
                      )
                    : null}
                </li>
              );
            })}
            <li className="a-base-filter__action">
              <button
                className="a-main-button a-base-filter__all-filters a-main-button--display-block a-main-button--type-medium a-main-button--corner-round a-main-button--color-light-blue"
                style={{
                  display: "none",
                }}
                type="button"
              >
                <span className="a-main-button__wrap">
                  <span className="a-main-button__content">Все фильтры</span>
                </span>
              </button>
              <button
                className="a-main-button a-main-button--display-block a-main-button--type-medium a-main-button--corner-round a-main-button--color-blue"
                type="button"
              >
                <span className="a-main-button__wrap">
                  <span
                    className="seo-text a-main-button__content"
                    style={{
                      "--seo-text": "'Показать 10000 товаров'",
                    }}
                  />
                </span>
              </button>
              <button
                aria-label="Очистить все"
                className="a-link-button"
                title="Очистить все"
                type="button"
              >
                <span
                  className="seo-text a-link-button__content a-link-button__content--blue"
                  style={{
                    "--seo-text": "'Очистить все'",
                  }}
                />
              </button>
            </li>
          </ul>
        </div>
        <div
          className="a-base-filter__flow"
          style={{
            display: "none",
            top: "0px",
          }}
        >
          <button
            className="a-main-button a-main-button--display-inline a-main-button--type-medium a-main-button--corner-round a-main-button--color-blue"
            type="button"
          >
            <span className="a-main-button__wrap">
              <span
                className="seo-text a-main-button__content"
                style={{
                  "--seo-text": "'Показать 10000 товаров'",
                }}
              />
            </span>
          </button>
        </div>
        <div
          className="v-portal"
          style={{
            display: "none",
          }}
        />
      </div>
    </div>
  );
}
