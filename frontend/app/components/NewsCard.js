import React from 'react';

const NewsCard = ({ id, title, date, image, imageAlt, href }) => {
  return (
    <div type="news" id={id} className="a-news-card">
      <a href={href} className="a-news-card__picture">
        <img 
          src={image} 
          alt={imageAlt} 
          className="a-news-card__image a-lazy-load a-is-loaded"
        />
        <span></span>
      </a>
      <div className="a-news-card__content">
        <div className="a-news-card__date">{date}</div>
        <div className="a-news-card__wrap">
          <a href={href} className="a-news-card__title">
            {title}
          </a>
        </div>
        {null}
        {null}
        {null}
      </div>
    </div>
  );
};

export default NewsCard;
