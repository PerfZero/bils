import React from 'react';

const BackButton = ({ href, text }) => {
  return (
    <div className="a-back a-page-news__back">
      <a href={href || "/about/"} className="a-back__link nuxt-link-active">
        <svg className="a-svg a-back__icon">
          <use href="#icon-old-arrow"></use>
        </svg> 
        <span className="a-back__text">{text || "О компании"}</span>
      </a>
    </div>
  );
};

export default BackButton;
