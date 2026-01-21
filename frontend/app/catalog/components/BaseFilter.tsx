"use client";

import type { MouseEvent as ReactMouseEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

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
  selectedValues?: string[];
  onToggle?: (value: string, checked: boolean) => void;
};

type BaseFilterProps = {
  manufacturerOptions?: FilterOption[];
  countryOptions?: FilterOption[];
  selectedManufacturers?: string[];
  selectedCountries?: string[];
  priceMinBound?: number;
  priceMaxBound?: number;
  priceMin?: string;
  priceMax?: string;
  onPriceMinChange?: (value: string) => void;
  onPriceMaxChange?: (value: string) => void;
  onManufacturerToggle?: (value: string, checked: boolean) => void;
  onCountryToggle?: (value: string, checked: boolean) => void;
  onApply?: () => void;
  onClearAll?: () => void;
  totalCount?: number;
  showActions?: boolean;
};

export function BaseFilter({
  manufacturerOptions = [],
  countryOptions = [],
  selectedManufacturers = [],
  selectedCountries = [],
  priceMinBound = 0,
  priceMaxBound = 0,
  priceMin = "",
  priceMax = "",
  onPriceMinChange,
  onPriceMaxChange,
  onManufacturerToggle,
  onCountryToggle,
  onApply,
  onClearAll,
  totalCount,
  showActions = true,
}: BaseFilterProps) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [dragHandle, setDragHandle] = useState<"min" | "max" | null>(null);
  const safeMinBound = Number.isFinite(priceMinBound) ? priceMinBound : 0;
  const safeMaxBound = Number.isFinite(priceMaxBound) ? priceMaxBound : 0;
  const resolvedMin = Number.isFinite(Number(priceMin))
    ? Number(priceMin)
    : safeMinBound;
  const resolvedMax = Number.isFinite(Number(priceMax))
    ? Number(priceMax)
    : safeMaxBound;
  const minValue = Math.min(resolvedMin, resolvedMax);
  const maxValue = Math.max(resolvedMin, resolvedMax);
  const rangeSpan = Math.max(safeMaxBound - safeMinBound, 1);
  const minPercent = ((minValue - safeMinBound) / rangeSpan) * 100;
  const maxPercent = ((maxValue - safeMinBound) / rangeSpan) * 100;

  const updateFromPointer = (
    clientX: number,
    handleOverride?: "min" | "max",
  ) => {
    const activeHandle = handleOverride ?? dragHandle;
    if (!railRef.current || !activeHandle) return;
    const rect = railRef.current.getBoundingClientRect();
    const nextPercent = Math.min(
      1,
      Math.max(0, (clientX - rect.left) / rect.width),
    );
    const rawValue = safeMinBound + nextPercent * rangeSpan;
    if (activeHandle === "min") {
      const next = Math.min(Math.round(rawValue), maxValue);
      onPriceMinChange?.(String(next));
    } else {
      const next = Math.max(Math.round(rawValue), minValue);
      onPriceMaxChange?.(String(next));
    }
  };

  useEffect(() => {
    if (!dragHandle) return;
    const handleMove = (event: MouseEvent | TouchEvent) => {
      if ("touches" in event) {
        if (event.touches.length === 0) return;
        updateFromPointer(event.touches[0].clientX);
      } else {
        updateFromPointer(event.clientX);
      }
    };
    const handleEnd = () => {
      setDragHandle(null);
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", handleEnd);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [dragHandle, maxValue, minValue, rangeSpan, safeMinBound]);

  const handleRailMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const rail = railRef.current;
    if (!rail) return;
    const rect = rail.getBoundingClientRect();
    const clickPercent = ((event.clientX - rect.left) / rect.width) * 100;
    const distanceToMin = Math.abs(clickPercent - minPercent);
    const distanceToMax = Math.abs(clickPercent - maxPercent);
    const nextHandle = distanceToMin <= distanceToMax ? "min" : "max";
    setDragHandle(nextHandle);
    updateFromPointer(event.clientX, nextHandle);
  };
  const sections: FilterSection[] = useMemo(() => {
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
                          position: "relative",
                          width: "auto",
                        }}
                      >
                        <div
                          className="vue-slider-rail"
                          ref={railRef}
                          onMouseDown={handleRailMouseDown}
                        >
                          <div
                            className="vue-slider-process"
                            style={{
                              height: "100%",
                              left: `${minPercent}%`,
                              top: "0px",
                              transitionDuration: "0.5s",
                              transitionProperty: "width, left",
                              width: `${Math.max(0, maxPercent - minPercent)}%`,
                            }}
                          />
                          <div
                            aria-orientation="horizontal"
                            aria-valuemax={safeMaxBound}
                            aria-valuemin={safeMinBound}
                            aria-valuenow={minValue}
                            aria-valuetext={minValue}
                            className="vue-slider-dot"
                            role="slider"
                            style={{
                              height: "14px",
                              left: `${minPercent}%`,
                              top: "50%",
                              transform: "translate(-50%, -50%)",
                              transition: "left 0.5s",
                              width: "14px",
                            }}
                            tabIndex={0}
                            onMouseDown={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              setDragHandle("min");
                            }}
                            onTouchStart={(event) => {
                              event.stopPropagation();
                              if (event.touches.length) {
                                setDragHandle("min");
                                updateFromPointer(
                                  event.touches[0].clientX,
                                  "min",
                                );
                              }
                            }}
                          >
                            <div className="vue-slider-dot-handle" />
                          </div>
                          <div
                            aria-orientation="horizontal"
                            aria-valuemax={safeMaxBound}
                            aria-valuemin={safeMinBound}
                            aria-valuenow={maxValue}
                            aria-valuetext={maxValue}
                            className="vue-slider-dot"
                            role="slider"
                            style={{
                              height: "14px",
                              left: `${maxPercent}%`,
                              top: "50%",
                              transform: "translate(-50%, -50%)",
                              transition: "left 0.5s",
                              width: "14px",
                            }}
                            tabIndex={0}
                            onMouseDown={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              setDragHandle("max");
                            }}
                            onTouchStart={(event) => {
                              event.stopPropagation();
                              if (event.touches.length) {
                                setDragHandle("max");
                                updateFromPointer(
                                  event.touches[0].clientX,
                                  "max",
                                );
                              }
                            }}
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
                              value={priceMin}
                              onChange={(event) =>
                                onPriceMinChange?.(event.target.value)
                              }
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
                              value={priceMax}
                              onChange={(event) =>
                                onPriceMaxChange?.(event.target.value)
                              }
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
        selectedValues: selectedManufacturers,
        onToggle: onManufacturerToggle,
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
        selectedValues: selectedCountries,
        onToggle: onCountryToggle,
      },
    ];
  }, [
    manufacturerOptions,
    countryOptions,
    selectedManufacturers,
    selectedCountries,
    priceMin,
    priceMax,
    onPriceMinChange,
    onPriceMaxChange,
    onManufacturerToggle,
    onCountryToggle,
  ]);

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
                                      value={option.id}
                                      name={section.name}
                                      type="checkbox"
                                      checked={Boolean(
                                        section.selectedValues?.includes(
                                          option.id,
                                        ),
                                      )}
                                      onChange={(event) => {
                                        section.onToggle?.(
                                          option.id,
                                          event.target.checked,
                                        );
                                      }}
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
            {showActions && (
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
                  onClick={onApply}
                >
                  <span className="a-main-button__wrap">
                    <span
                      className="seo-text a-main-button__content"
                      style={{
                        "--seo-text": `'Показать ${totalCount || 0} товаров'`,
                      }}
                    />
                  </span>
                </button>
                <button
                  aria-label="Очистить все"
                  className="a-link-button"
                  title="Очистить все"
                  type="button"
                  onClick={onClearAll}
                >
                  <span
                    className="seo-text a-link-button__content a-link-button__content--blue"
                    style={{
                      "--seo-text": "'Очистить все'",
                    }}
                  />
                </button>
              </li>
            )}
          </ul>
        </div>
        {showActions && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
