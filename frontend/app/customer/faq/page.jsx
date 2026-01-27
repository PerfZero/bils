"use client";

import { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { API_ENDPOINTS } from "../../../config/api";
import "./styles.css";

export default function FAQPage({ params }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openQuestions, setOpenQuestions] = useState(new Set());

  const breadcrumbs = [{ label: "Главная", href: "/" }, { label: "FAQ" }];

  useEffect(() => {
    const fetchFAQData = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.FAQ_CATEGORIES);
        if (!response.ok) {
          throw new Error("Failed to fetch FAQ data");
        }
        const data = await response.json();
        const list = Array.isArray(data) ? data : data?.results || [];
        setCategories(list);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQData();
  }, []);

  const toggleQuestion = (questionId) => {
    setOpenQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  if (loading) {
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
              <h1>FAQ</h1>
            </div>
            <div className="a-page-static__wrap">
              <div className="a-page-static__description">
                <p>Загрузка...</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (error) {
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
              <h1>FAQ</h1>
            </div>
            <div className="a-page-static__wrap">
              <div className="a-page-static__description">
                <p>Ошибка загрузки: {error}</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

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
            <h1>FAQ</h1>
          </div>
          <div className="a-page-static__wrap">
            <div className="a-page-static__sidebar">
              <div className="page-static-menu__list">
                <div className="page-static-menu__item">
                  <a
                    aria-current="page"
                    className="page-static-menu__link nuxt-link-exact-active nuxt-link-active page-static-menu__link--active"
                    href="/customer/faq/"
                  >
                    FAQ
                  </a>
                </div>
              </div>
            </div>
            <div className="a-page-static__description a-page-static__description--old">
              <div className="static-pages-content">
                <div
                  className="static-pages-content__item"
                  itemScope
                  itemType="https://schema.org/FAQPage"
                >
                  {(Array.isArray(categories) ? categories : []).map(
                    (category, categoryIndex) => (
                      <div key={category.id}>
                        <h2 className="static-pages-content__title">
                          {category.name}
                        </h2>
                        {(Array.isArray(category?.questions)
                          ? category.questions
                          : []
                        ).map((question, questionIndex) => (
                          <div
                            key={question.id}
                            className="static-pages-content__opened-list"
                            itemProp="mainEntity"
                            itemScope
                            itemType="https://schema.org/Question"
                          >
                            <h3
                              className="static-pages-content__opened-list-item-header"
                              itemProp="name"
                              onClick={() => toggleQuestion(question.id)}
                            >
                              {question.question}
                              <img
                                alt=""
                                className={`svg-static-content ${openQuestions.has(question.id) ? "svg-static-content_open" : ""}`}
                                src="https://cdn.bigam.ru/medialibrary/3da/0iwkxdft3qjqx9o99d70vmy2lzgklwxz/arrow_black.svg"
                              />
                            </h3>
                            <div
                              className={`static-pages-content__opened-list-item ${openQuestions.has(question.id) ? "static-pages-content__opened-list-item_open" : ""}`}
                              itemProp="acceptedAnswer"
                              itemScope
                              itemType="https://schema.org/Answer"
                            >
                              <div
                                itemProp="text"
                                dangerouslySetInnerHTML={{
                                  __html: question.answer,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                        {categoryIndex < categories.length - 1 && <hr />}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
