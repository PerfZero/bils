'use client';

import React, { useState } from 'react';

const TagsFilter = ({ title, tags, selectedTags, onTagChange }) => {
  const [showMore, setShowMore] = useState(false);
  const visibleTags = showMore ? tags : tags.slice(0, 5);

  const handleTagClick = (tag) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    onTagChange(newSelectedTags);
  };

  return (
    <div className="js-tags a-tags">
      <ul className="a-tags__groups">
        <li className={`js-tags__group a-tags__group ${!showMore && tags.length > 5 ? 'a-tags__group--hide' : ''}`}>
          <div className="a-tags__title">{title}</div>
          <ul className="js-tags__list a-tags__list">
            {visibleTags.map((tag, index) => (
              <li key={index} className="js-tags__item a-tags__item">
                <div 
                  className={`a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange ${selectedTags.includes(tag) ? 'a-ellipse-button--active' : ''}`}
                >
                  <a 
                    href={`/about/novosti/?tag=${encodeURIComponent(tag)}`}
                    className="a-ellipse-button__button nuxt-link-active"
                    aria-label={tag}
                    title={tag}
                  >
                    {null}
                    <span className="a-ellipse-button__text">{tag}</span>
                    {null}
                    {null}
                    {null}
                  </a>
                </div>
              </li>
            ))}
            {tags.length > 5 && (
              <li className="js-tags__more a-tags__item a-tags__item--more" style={{ display: showMore ? 'none' : '' }}>
                <div className="a-ellipse-button a-ellipse-button--interactive a-ellipse-button--color-light-orange">
                  <button
                    type="button"
                    className="a-ellipse-button__button"
                    onClick={() => setShowMore(true)}
                    aria-label="ещё"
                    title="ещё"
                  >
                    {null}
                    <span className="a-ellipse-button__text">ещё</span>
                    <span className="a-ellipse-button__icon">
                      <svg className="a-svg">
                        <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#icon-meatballs"></use>
                      </svg>
                    </span>
                  </button>
                  {null}
                  {null}
                  {null}
                </div>
              </li>
            )}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default TagsFilter;
