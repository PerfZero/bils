"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config/api";

const formatAttributeValue = (attribute) => {
  if (!attribute) return "";
  const value = attribute.value ?? "";
  if (!attribute.unit) return value;
  return `${value} ${attribute.unit}`.trim();
};

const normalizeAssetUrl = (url) => {
  if (!url) return url;
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  if (url.startsWith("/media/")) {
    return `${API_BASE_URL}${url}`;
  }
  return url;
};

const extractFileName = (value = "") => {
  if (!value) return "";
  const cleaned = value.split("?")[0].split("#")[0];
  const parts = cleaned.split("/");
  return parts[parts.length - 1] || "";
};

const formatFileSize = (bytes) => {
  if (!Number.isFinite(bytes) || bytes <= 0) return "";
  const kb = bytes / 1024;
  const mb = kb / 1024;
  const gb = mb / 1024;
  if (gb >= 1) return `${gb.toFixed(2).replace(/\.00$/, "")} GB`;
  if (mb >= 1) return `${mb.toFixed(2).replace(/\.00$/, "")} MB`;
  if (kb >= 1) return `${kb.toFixed(0)} KB`;
  return `${bytes} B`;
};

const normalizeFileSize = (size) => {
  if (!size) return "";
  if (typeof size === "number") return formatFileSize(size);
  return String(size).trim();
};

const clampRatingValue = (value) => {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(5, value));
};

const formatReviewDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })} г.`;
};

const getReviewMarkText = (rating) => {
  const map = {
    1: "Ужасный товар",
    2: "Плохой товар",
    3: "Обычный товар",
    4: "Хороший товар",
    5: "Отличный товар",
  };
  return map[rating] || "";
};

const getDocumentTitle = (document) => {
  if (!document) return "Документ";
  return (
    document.title ||
    document.name ||
    document.file_name ||
    document.filename ||
    extractFileName(document.url || document.href || document.file || "") ||
    "Документ"
  );
};

const getDocumentOrigin = (document) => {
  if (!document) return "";
  if (document.origin) return document.origin;
  const fileName =
    document.file_name ||
    document.filename ||
    extractFileName(document.url || document.href || document.file || "") ||
    "";
  const size = normalizeFileSize(
    document.size || document.file_size || document.fileSize || "",
  );
  return [fileName, size].filter(Boolean).join(" ").trim();
};

const getDocumentHref = (document) =>
  normalizeAssetUrl(document?.url || document?.href || document?.file || "");

const renderComplectationTable = (items = []) => (
  <table className="a-product-tabs__table a-parameters">
    <tbody>
      {items.map((item) => (
        <tr className="a-parameters__item" key={item.id || item.name}>
          <td className="a-parameters__name">
            <div className="a-parameters__name-wrap">
              <div className="a-parameters__name-text">{item.name}</div>
            </div>
          </td>
          <td className="a-parameters__value">{item.quantity}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const renderManufacturerRow = (brand) => (
  <tr className="a-parameters__item">
    <td className="a-parameters__name">
      <div className="a-parameters__name-wrap">
        <div className="a-parameters__name-text">Производитель</div>
      </div>
    </td>
    <td className="a-parameters__value">
      <span>
        {brand?.href ? (
          <a href={brand.href} className="a-parameters__manufacturer">
            {brand.logo ? (
              <img
                src={normalizeAssetUrl(brand.logo)}
                alt={brand.name}
                title={brand.name}
              />
            ) : (
              brand.name
            )}
            <span></span>
          </a>
        ) : (
          brand?.name
        )}
      </span>
    </td>
  </tr>
);

export default function ProductTabs({
  descriptionHtml = "",
  autoText = "",
  attributes = [],
  complectationItems = [],
  documents = [],
  documentsAutoText = "",
  reviews = [],
  reviewStats = null,
  ratingValue = 0,
  ratingCount = 0,
  productId = null,
  productTitle = "",
  brand = null,
}) {
  const [activeTab, setActiveTab] = useState("description");
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isWriteUsOpen, setIsWriteUsOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    authorName: "",
    authorEmail: "",
    comment: "",
    pros: "",
    cons: "",
    isAnonymous: false,
  });
  const [reviewStatus, setReviewStatus] = useState({
    isSending: false,
    message: "",
    isError: false,
  });
  const hasDocuments = documents.length > 0 || documentsAutoText;
  const reviewList = Array.isArray(reviews) ? reviews : [];
  const reviewCount =
    reviewStats?.count ?? reviewList.length ?? Number(ratingCount) ?? 0;
  const averageRating = (() => {
    if (reviewStats && typeof reviewStats.average === "number") {
      return reviewStats.average;
    }
    if (reviewList.length) {
      const sum = reviewList.reduce(
        (total, review) => total + Number(review.rating || 0),
        0,
      );
      return sum / reviewList.length;
    }
    if (Number(ratingCount) > 0) {
      return Number(ratingValue) || 0;
    }
    return 0;
  })();
  const ratingText = averageRating ? averageRating.toFixed(1) : "0";
  const ratingDistribution = (() => {
    const base = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    if (reviewStats?.distribution) {
      Object.entries(reviewStats.distribution).forEach(([score, count]) => {
        const key = Number(score);
        if (base[key] !== undefined) {
          base[key] = Number(count) || 0;
        }
      });
      return base;
    }
    reviewList.forEach((review) => {
      const score = Number(review.rating);
      if (base[score] !== undefined) {
        base[score] += 1;
      }
    });
    return base;
  })();
  const handleReviewChange = (field) => (event) => {
    const value =
      event?.target?.type === "checkbox"
        ? event.target.checked
        : (event?.target?.value ?? "");
    setReviewForm((current) => ({
      ...current,
      [field]: value,
    }));
  };
  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    if (!productId) {
      setReviewStatus({
        isSending: false,
        message: "Не удалось определить товар для отзыва.",
        isError: true,
      });
      return;
    }
    if (!reviewForm.rating || !reviewForm.authorName || !reviewForm.comment) {
      setReviewStatus({
        isSending: false,
        message: "Заполните обязательные поля.",
        isError: true,
      });
      return;
    }
    setReviewStatus({ isSending: true, message: "", isError: false });
    try {
      const response = await fetch(`${API_BASE_URL}/api/reviews/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          author_name: reviewForm.authorName,
          author_email: reviewForm.authorEmail,
          rating: Number(reviewForm.rating),
          comment: reviewForm.comment,
          pros: reviewForm.pros,
          cons: reviewForm.cons,
          is_anonymous: reviewForm.isAnonymous,
        }),
      });
      if (!response.ok) {
        throw new Error("Не удалось отправить отзыв.");
      }
      setReviewForm({
        rating: 0,
        authorName: "",
        authorEmail: "",
        comment: "",
        pros: "",
        cons: "",
        isAnonymous: false,
      });
      setReviewStatus({
        isSending: false,
        message: "Спасибо! Отзыв отправлен.",
        isError: false,
      });
    } catch (error) {
      setReviewStatus({
        isSending: false,
        message: error?.message || "Не удалось отправить отзыв.",
        isError: true,
      });
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const updateFromHash = () => {
      const nextHash = window.location.hash.replace("#", "");
      if (nextHash === "documents" && !hasDocuments) return;
      if (nextHash) {
        setActiveTab(nextHash);
      }
    };
    updateFromHash();
    window.addEventListener("hashchange", updateFromHash);
    return () => {
      window.removeEventListener("hashchange", updateFromHash);
    };
  }, [hasDocuments]);

  return (
    <section className="a-product-tabs a-page-detail__full-features" id="tabs">
      <div className="a-product-tabs__tabs">
        <div className="a-product-tabs__buttons">
          <button
            aria-label=""
            className={`a-link-button a-product-tabs__button ${
              activeTab === "description"
                ? "a-product-tabs__button--active"
                : ""
            }`}
            title=""
            type="button"
            onClick={() => {
              setActiveTab("description");
              window.location.hash = "description";
            }}
          >
            <span className="a-link-button__content a-link-button__content--black">
              Описание
            </span>
          </button>
          <button
            className={`a-link-button a-product-tabs__button ${
              activeTab === "specification"
                ? "a-product-tabs__button--active"
                : ""
            }`}
            type="button"
            onClick={() => {
              setActiveTab("specification");
              window.location.hash = "specification";
            }}
          >
            <span className="a-link-button__content a-link-button__content--black">
              Характеристики и комплектация
            </span>
          </button>
          {hasDocuments ? (
            <button
              className={`a-link-button a-product-tabs__button ${
                activeTab === "documents"
                  ? "a-product-tabs__button--active"
                  : ""
              }`}
              type="button"
              onClick={() => {
                setActiveTab("documents");
                window.location.hash = "documents";
              }}
            >
              <span className="a-link-button__content a-link-button__content--black">
                Документы
              </span>
            </button>
          ) : null}
          <button
            className={`a-link-button a-product-tabs__button ${
              activeTab === "reviews" ? "a-product-tabs__button--active" : ""
            }`}
            type="button"
            onClick={() => {
              setActiveTab("reviews");
              window.location.hash = "reviews";
            }}
          >
            <span className="a-link-button__content a-link-button__content--black">
              Рейтинги и отзывы
            </span>
          </button>
        </div>
      </div>
      <ul className="a-product-tabs__sections">
        <li
          className={`a-product-tabs__sections-item a-product-tabs__sections-item--description ${
            activeTab === "description"
              ? "a-product-tabs__sections-item--active"
              : ""
          }`}
          id="description"
        >
          <section className="a-product-tabs__section">
            <div className="a-product-tabs__column a-product-tabs__column--description">
              <section className="a-page-detail__description">
                <div
                  className={`a-spoiler a-title-indent ${
                    isDescriptionOpen ? "a-spoiler--open" : ""
                  }`}
                >
                  <div className="a-spoiler__content a-spoiler--column-m">
                    <div
                      className="a-page-detail__inner"
                      dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                    />
                  </div>
                  <div className="a-spoiler__buttons">
                    <button
                      className="a-spoiler__button a-spoiler__button--open a-link a-link--grey"
                      style={{
                        "--spoiler-open-text": "'Читать полностью'",
                      }}
                      type="button"
                      onClick={() => setIsDescriptionOpen(true)}
                    />
                    <button
                      className="a-spoiler__button a-spoiler__button--close a-link a-link--grey"
                      type="button"
                      onClick={() => setIsDescriptionOpen(false)}
                    >
                      Скрыть
                    </button>
                  </div>
                </div>
              </section>
              {autoText ? (
                <div
                  className="a-product-tabs__autotext"
                  dangerouslySetInnerHTML={{ __html: autoText }}
                />
              ) : null}
            </div>
          </section>
        </li>
        <li
          className={`a-product-tabs__sections-item a-product-tabs__sections-item--specification ${
            activeTab === "specification"
              ? "a-product-tabs__sections-item--active"
              : ""
          }`}
          id="specification"
        >
          <section className="a-product-tabs__section">
            <div className="a-product-tabs__column a-product-tabs__column--features">
              {attributes.length ? (
                <section className="a-product-tabs__parameters">
                  <table className="a-product-tabs__table a-parameters">
                    <tbody>
                      {brand ? renderManufacturerRow(brand) : null}
                      {attributes.map((attribute) => (
                        <tr
                          className="a-parameters__item"
                          key={attribute.id || attribute.slug || attribute.name}
                        >
                          <td className="a-parameters__name">
                            <div className="a-parameters__name-wrap">
                              <div className="a-parameters__name-text">
                                {attribute.name}
                              </div>
                            </div>
                          </td>
                          <td className="a-parameters__value">
                            <span>{formatAttributeValue(attribute)}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              ) : null}
              <div className="a-product-tabs__message a-message">
                <div className="a-message__icon">
                  <svg className="a-svg">
                    <use
                      xlinkHref="#icon-old-notice"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    />
                  </svg>
                </div>
                <div className="a-message__text">
                  Нашли неточность в&nbsp;описании?
                  <button
                    aria-label="Сообщите нам!"
                    title="Сообщите нам!"
                    type="button"
                    className="a-link-button a-message__link"
                    onClick={() => setIsWriteUsOpen(true)}
                  >
                    <span className="a-link-button__content a-link-button__content--blue a-link-button__content--underline a-link-button__content--underline-dashed">
                      Сообщите нам!
                    </span>
                  </button>
                </div>
              </div>
              {complectationItems.length ? (
                <section className="a-product-tabs__set">
                  <div className="a-product-tabs__title">В комплекте</div>
                  {renderComplectationTable(complectationItems)}
                </section>
              ) : null}
            </div>
          </section>
        </li>
        {hasDocuments ? (
          <li
            className={`a-product-tabs__sections-item a-product-tabs__sections-item--documents ${
              activeTab === "documents"
                ? "a-product-tabs__sections-item--active"
                : ""
            }`}
            id="documents"
          >
            <section className="a-product-tabs__section">
              <div className="a-product-tabs__column a-product-tabs__column--files">
                {documents.length ? (
                  <ul className="a-product-tabs__files">
                    {documents.map((document) => {
                      const href = getDocumentHref(document);
                      if (!href) return null;
                      const title = getDocumentTitle(document);
                      const origin = getDocumentOrigin(document);
                      return (
                        <li
                          className="a-product-tabs__file"
                          key={
                            document.id ||
                            document.url ||
                            document.href ||
                            document.file ||
                            title
                          }
                        >
                          <a
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            title={title}
                            className="a-product-tabs__file-link a-file a-file--full"
                          >
                            <div className="a-file__icon">
                              <svg className="a-svg">
                                <use
                                  xlinkHref="#icon-old-file"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                />
                              </svg>
                            </div>
                            <div className="a-file__description">
                              <div className="a-file__name">{title}</div>
                              {origin ? (
                                <div className="a-file__origin">{origin}</div>
                              ) : null}
                            </div>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
                {documentsAutoText ? (
                  <div
                    className="a-product-tabs__autotext"
                    dangerouslySetInnerHTML={{ __html: documentsAutoText }}
                  />
                ) : null}
              </div>
            </section>
          </li>
        ) : null}
        <li
          className={`a-product-tabs__sections-item a-product-tabs__sections-item--reviews ${
            activeTab === "reviews"
              ? "a-product-tabs__sections-item--active"
              : ""
          }`}
          id="reviews"
        >
          <section className="a-product-tabs__section">
            <div className="a-product-tabs__column a-product-tabs__column--review">
              <div className="a-rating-card a-product-tabs__rating">
                <svg className="a-svg a-rating-card__star">
                  <use
                    xlinkHref="#icon-star"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  />
                </svg>
                <span className="a-rating-card__rate">{ratingText}</span>
                <span className="a-rating-card__rate-name">
                  средняя
                  <br />
                  оценка
                </span>
                <div className="a-rating-card__rating-mobile">
                  <div className="a-rating">
                    <ul className="a-rating__list">
                      {[1, 2, 3, 4, 5].map((score) => (
                        <li
                          className={`a-rating__item ${
                            score <= Math.round(clampRatingValue(averageRating))
                              ? "a-rating__item--active"
                              : ""
                          }`}
                          key={score}
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
                      ))}
                    </ul>
                    <div className="a-rating__count">{ratingText}</div>
                  </div>
                </div>
                <p className="a-rating-card__rate-coment">
                  На основании <span>{reviewCount} отзывов</span>
                </p>
                <div className="a-rating-card__rating-list">
                  {[5, 4, 3, 2, 1].map((score) => (
                    <div className="a-rating-card__item" key={score}>
                      <div className="a-rating a-rating-card__rating">
                        <ul className="a-rating__list">
                          {[1, 2, 3, 4, 5].map((item) => (
                            <li
                              className={`a-rating__item ${
                                item <= score ? "a-rating__item--active" : ""
                              }`}
                              key={item}
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
                          ))}
                        </ul>
                        <div className="a-rating__count">{score}.0</div>
                      </div>
                      <p
                        className={`a-rating-card__count ${
                          ratingDistribution[score]
                            ? ""
                            : "a-rating-card__count--empty"
                        }`}
                      >
                        {ratingDistribution[score]} отзывов
                      </p>
                    </div>
                  ))}
                </div>
                <p className="a-rating-card__rate-text">
                  Для расчета средней оценки используются оценки товара за все
                  время.
                </p>
                <p className="a-rating-card__rate-text">
                  Оставьте свой отзыв о товаре:{" "}
                  <strong>{productTitle || "Товар"}</strong>
                </p>
                <button
                  type="button"
                  className="a-rating-card__button a-button a-button--orange a-button--full"
                  onClick={() => {
                    const formElement = document.getElementById("reviewForm");
                    if (formElement) {
                      formElement.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  Написать отзыв
                </button>
              </div>
              <div className="a-product-tabs__review">
                <div className="a-product-tabs__list">
                  <ul className="a-page-personal__order-list">
                    {reviewList.map((review) => {
                      const displayName = review.is_anonymous
                        ? "Аноним"
                        : review.author_name || "Покупатель";
                      const reviewRating = clampRatingValue(
                        Number(review.rating || 0),
                      );
                      const reviewDate = formatReviewDate(review.created_at);
                      const reviewMarkText = getReviewMarkText(
                        Math.round(reviewRating),
                      );
                      return (
                        <div
                          className="a-review-product-card"
                          key={review.id || displayName}
                        >
                          <p className="a-review-product-card__name">
                            {displayName}
                          </p>
                          {reviewDate ? (
                            <p className="a-review-product-card__date">
                              {reviewDate}
                            </p>
                          ) : null}
                          <div className="a-review-product-card__rating">
                            <div className="a-rating">
                              <ul className="a-rating__list">
                                {[1, 2, 3, 4, 5].map((score) => (
                                  <li
                                    className={`a-rating__item ${
                                      score <= Math.round(reviewRating)
                                        ? "a-rating__item--active"
                                        : ""
                                    }`}
                                    key={score}
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
                                ))}
                              </ul>
                              <div className="a-rating__count">
                                {reviewRating.toFixed(1)}
                              </div>
                            </div>
                            <div
                              className="a-review-product-card__type"
                              style={{
                                "--review-mark": `'${reviewMarkText}'`,
                              }}
                            />
                          </div>
                          <div className="a-review-card__more">
                            <div className="a-review-product-card__message">
                              <div className="a-spoiler a-review-product-card__spoiler a-spoiler--open">
                                <div className="a-spoiler__content">
                                  <div className="a-review-product-card__block">
                                    <div className="a-review-product-card__header">
                                      Достоинства
                                    </div>
                                    <div className="a-review-product-card__text">
                                      {review.pros || "-"}
                                    </div>
                                  </div>
                                  <div className="a-review-product-card__block">
                                    <div className="a-review-product-card__header">
                                      Недостатки
                                    </div>
                                    <div className="a-review-product-card__text">
                                      {review.cons || "-"}
                                    </div>
                                  </div>
                                  <div className="a-review-product-card__block">
                                    <div className="a-review-product-card__header">
                                      Комментарий
                                    </div>
                                    <div className="a-review-product-card__text">
                                      {review.comment || "-"}
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="a-spoiler__buttons"
                                  style={{ display: "none" }}
                                >
                                  <button
                                    type="button"
                                    className="a-spoiler__button a-spoiler__button--open a-link a-link--grey"
                                    style={{
                                      "--spoiler-open-text":
                                        "'Читать полностью'",
                                    }}
                                  />
                                  <button
                                    type="button"
                                    className="a-spoiler__button a-spoiler__button--close a-link a-link--grey"
                                  >
                                    Скрыть
                                  </button>
                                </div>
                              </div>
                              <div className="a-review-product-card__block a-block__likes">
                                <span className="a-block__likes-header">
                                  Отзыв полезен?
                                </span>
                                <div className="a-block__likes-item">
                                  <button
                                    className="a-block__likes-button"
                                    type="button"
                                  >
                                    <svg className="a-svg a-block__likes-svg">
                                      <use
                                        xlinkHref="#icon-like"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                      />
                                    </svg>
                                  </button>
                                  <div className="a-review-product-card__text">
                                    {review.likes || 0}
                                  </div>
                                </div>
                                <div className="a-block__likes-item">
                                  <button
                                    className="a-block__likes-button"
                                    type="button"
                                  >
                                    <svg className="a-svg a-block__likes-svg">
                                      <use
                                        xlinkHref="#icon-dislike"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                      />
                                    </svg>
                                  </button>
                                  <div className="a-review-product-card__text">
                                    {review.dislikes || 0}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </ul>
                </div>
                <article
                  className="a-review-form a-review-form--border"
                  id="reviewForm"
                >
                  <form onSubmit={handleReviewSubmit}>
                    <h2 className="a-review-form__title">Ваш отзыв о товаре</h2>
                    {reviewStatus.message ? (
                      <p className="a-review-form__text">
                        {reviewStatus.message}
                      </p>
                    ) : null}
                    <div
                      id="a-review-form__rating"
                      className="a-review-form__rating"
                    >
                      <label className="a-review-form__label">
                        Ваша оценка
                      </label>
                      <ul className="a-review-form__stars">
                        {[1, 2, 3, 4, 5].map((score) => (
                          <li key={score}>
                            <div className="a-radio-star-field a-radio-star-field--hover">
                              <label className="a-radio-star-field__constrain">
                                <input
                                  type="radio"
                                  name="rating"
                                  className="a-radio-star-field__input"
                                  value={score}
                                  checked={Number(reviewForm.rating) === score}
                                  onChange={handleReviewChange("rating")}
                                />
                                <svg
                                  className="a-svg a-radio-star-field__fake"
                                  title={getReviewMarkText(score)}
                                >
                                  <use
                                    xlinkHref="#icon-star"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                  />
                                </svg>
                                <span
                                  className="a-radio-star-field__label"
                                  style={{
                                    "--radio-star-label": `'${getReviewMarkText(score)}'`,
                                  }}
                                />
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="a-input-field a-review-form__input a-input-field--type-string">
                      <label
                        title="Фамилия, имя"
                        className="a-input-field__constrain"
                      >
                        <span className="a-input-field__label">
                          Фамилия, имя
                        </span>
                        <input
                          type="text"
                          placeholder="Фамилия, имя"
                          spellCheck="false"
                          autoComplete="off"
                          lang="ru"
                          inputMode="search"
                          className="a-input-field__input"
                          value={reviewForm.authorName}
                          onChange={handleReviewChange("authorName")}
                          required
                        />
                      </label>
                    </div>
                    <div className="a-input-field a-review-form__input a-review-form__input--email a-input-field--type-string">
                      <label
                        title="E-mail"
                        className="a-input-field__constrain"
                      >
                        <span className="a-input-field__label">E-mail</span>
                        <input
                          type="email"
                          placeholder="E-mail (необязательно)"
                          spellCheck="false"
                          autoComplete="off"
                          lang="ru"
                          inputMode="search"
                          className="a-input-field__input"
                          value={reviewForm.authorEmail}
                          onChange={handleReviewChange("authorEmail")}
                        />
                      </label>
                    </div>
                    <div className="a-textarea a-review-form__input">
                      <label
                        title="Общее впечатление"
                        className="a-textarea__constrain"
                      >
                        <span className="a-textarea__label">
                          Общее впечатление
                        </span>
                        <textarea
                          data-expandable=""
                          placeholder="Общее впечатление"
                          spellCheck="false"
                          className="a-textarea__input"
                          style={{ resize: "vertical" }}
                          value={reviewForm.comment}
                          onChange={handleReviewChange("comment")}
                          required
                        />
                      </label>
                    </div>
                    <div className="a-textarea a-review-form__input">
                      <label title="Плюсы" className="a-textarea__constrain">
                        <span className="a-textarea__label">Плюсы</span>
                        <textarea
                          data-expandable=""
                          placeholder="Плюсы (необязательно)"
                          spellCheck="false"
                          className="a-textarea__input"
                          style={{ resize: "vertical" }}
                          value={reviewForm.pros}
                          onChange={handleReviewChange("pros")}
                        />
                      </label>
                    </div>
                    <div className="a-textarea a-review-form__input">
                      <label title="Минусы" className="a-textarea__constrain">
                        <span className="a-textarea__label">Минусы</span>
                        <textarea
                          data-expandable=""
                          placeholder="Минусы (необязательно)"
                          spellCheck="false"
                          className="a-textarea__input"
                          style={{ resize: "vertical" }}
                          value={reviewForm.cons}
                          onChange={handleReviewChange("cons")}
                        />
                      </label>
                    </div>
                    <div className="a-review-form__anonymous">
                      <div className="a-toggle">
                        <input
                          id="toggle-anonymous-page"
                          type="checkbox"
                          className="a-toggle__input"
                          checked={reviewForm.isAnonymous}
                          onChange={handleReviewChange("isAnonymous")}
                        />
                        <label
                          htmlFor="toggle-anonymous-page"
                          className="a-toggle__label"
                        />
                      </div>
                      <span>Анонимный отзыв</span>
                    </div>
                    <button
                      type="submit"
                      className="a-review-form__button a-button a-button--orange"
                      disabled={reviewStatus.isSending}
                    >
                      {reviewStatus.isSending ? "Отправка..." : "Отправить"}
                    </button>
                  </form>
                </article>
              </div>
            </div>
          </section>
        </li>
      </ul>
      {isWriteUsOpen ? (
        <div id="modals-container">
          <div className="vm--container scrollable">
            <div
              data-modal="write-us"
              aria-expanded="true"
              className="vm--overlay"
            />
            <div
              aria-expanded="true"
              role="dialog"
              aria-modal="true"
              className="vm--modal a-main-modal-parent"
            >
              <div className="a-main-modal">
                <div className="a-main-modal__wrap">
                  <button
                    type="button"
                    className="a-main-modal__close"
                    onClick={() => setIsWriteUsOpen(false)}
                  >
                    <svg className="a-svg">
                      <use
                        xlinkHref="#icon-cross"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      />
                    </svg>
                  </button>
                  <div className="a-main-modal__content">
                    <div className="a-write-us-modal-content">
                      <div className="a-write-us-modal-content__title a-title-h3">
                        Напишите нам
                      </div>
                      <form className="a-write-us-modal-content__form">
                        <div className="a-write-us-modal-content__field">
                          <div className="a-input-field a-input-field--type-name">
                            <label
                              title="Имя, фамилия"
                              className="a-input-field__constrain"
                            >
                              <span className="a-input-field__label">
                                Имя, фамилия
                              </span>
                              <input
                                type="text"
                                placeholder="Имя, фамилия"
                                spellCheck="false"
                                autoComplete="off"
                                lang="ru"
                                inputMode="text"
                                className="a-input-field__input"
                              />
                            </label>
                          </div>
                        </div>
                        <div className="a-write-us-modal-content__field">
                          <div className="a-input-field a-input-field--type-string">
                            <label
                              title="E-mail (необязательно)"
                              className="a-input-field__constrain"
                            >
                              <span className="a-input-field__label">
                                E-mail (необязательно)
                              </span>
                              <input
                                type="text"
                                placeholder="E-mail (необязательно)"
                                spellCheck="false"
                                autoComplete="new-email"
                                lang="ru"
                                inputMode="search"
                                className="a-input-field__input"
                              />
                            </label>
                          </div>
                        </div>
                        <div className="a-write-us-modal-content__field">
                          <div className="a-input-field a-input-field--type-phone">
                            <label
                              title="Телефон"
                              className="a-input-field__constrain"
                            >
                              <span className="a-input-field__label">
                                Телефон
                              </span>
                              <input
                                type="tel"
                                placeholder="Телефон"
                                spellCheck="false"
                                autoComplete="off"
                                lang="ru"
                                inputMode="tel"
                                className="a-input-field__input"
                              />
                            </label>
                          </div>
                        </div>
                        <div className="a-write-us-modal-content__field">
                          <div className="a-textarea">
                            <label
                              title="Текст сообщения"
                              className="a-textarea__constrain"
                            >
                              <span className="a-textarea__label">
                                Текст сообщения
                              </span>
                              <textarea
                                data-expandable=""
                                placeholder="Текст сообщения"
                                spellCheck="false"
                                className="a-textarea__input"
                                style={{ resize: "vertical" }}
                              />
                            </label>
                          </div>
                        </div>
                        <div className="a-page-activation__form-check">
                          <div className="a-page-activation__form-field">
                            <div className="a-checkbox-field">
                              <label className="a-checkbox-field__constrain">
                                <input
                                  type="checkbox"
                                  className="a-checkbox-field__input"
                                  value="false"
                                />
                                <span className="a-checkbox-field__fake" />
                              </label>
                            </div>
                          </div>
                          <div className="a-page-activation__form-text">
                            Я, настоящим даю свое согласие на обработку моих
                            персональных данных.
                            <a
                              href="/customer/polzovatelskoe-soglashenie/"
                              className="a-link-button"
                            >
                              <span className="a-link-button__content a-link-button__content--black a-link-button__content--underline a-link-button__content--underline-solid">
                                Подробнее
                              </span>
                            </a>
                          </div>
                        </div>
                      </form>
                      <div className="a-write-us-modal-content__buttons">
                        <div className="a-write-us-modal-content__button a-write-us-modal-content__button--confirm">
                          <button
                            disabled
                            type="button"
                            className="a-main-button a-main-button--disabled a-main-button--display-block a-main-button--type-medium a-main-button--corner-round a-main-button--color-light-orange"
                          >
                            <span className="a-main-button__wrap">
                              <span className="a-main-button__content">
                                Отправить
                              </span>
                            </span>
                          </button>
                        </div>
                        <div className="a-write-us-modal-content__button a-write-us-modal-content__button--cancel">
                          <button
                            type="button"
                            className="a-main-button a-main-button--display-block a-main-button--type-medium a-main-button--corner-round a-main-button--color-light-grey"
                            onClick={() => setIsWriteUsOpen(false)}
                          >
                            <span className="a-main-button__wrap">
                              <span className="a-main-button__content">
                                Отменить
                              </span>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
