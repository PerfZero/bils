'use client';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, FreeMode } from 'swiper/modules';


// Добавляем кастомные стили для Swiper
const swiperStyles = `
  .a-tabs-carousel .swiper-slide {
    width: auto !important;
  }
  
  .a-card-carousel .swiper-wrapper {
    display: flex;
    align-items: stretch;
  }
  
  .a-card-carousel .swiper-slide {
    height: auto !important;
  }
  
  .a-card-carousel .swiper-button-next,
  .a-card-carousel .swiper-button-prev {
    color: #007bff !important;
    background: white !important;
    border-radius: 50% !important;
    width: 40px !important;
    height: 40px !important;
    margin-top: -20px !important;
  }
  
  .a-card-carousel .swiper-pagination-bullet {
    background: #007bff !important;
    opacity: 0.5 !important;
  }
  
  .a-card-carousel .swiper-pagination-bullet-active {
    opacity: 1 !important;
  }
`;

export default function CompanyNewsSection() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    // Создаем элемент для стилей
    const styleElement = document.createElement('style');
    styleElement.textContent = swiperStyles;
    document.head.appendChild(styleElement);

    // Очистка при размонтировании
    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  const tabs = [
    { id: 0, name: 'Видео-обзоры' },
    { id: 1, name: 'Полезные статьи' }
  ];

  const videos = [
    {
      id: 1,
      title: 'Новинка! Бензогенераторы Snirrex / Хороший генератор для дома',
      image: 'https://cdn.bigam.ru/resize_cache/iblock/23a/g2cc3nskzq4qz4qonhhg1946tz5w1pl0/770_382_0/Prevyu-YUtub.jpg',
      href: '/videos/novinka-benzogeneratory-snirrex-horoshii-generator-dlya-doma/'
    },
    {
      id: 2,
      title: 'Выбираем строительный пылесос / Обзор Daewoo DAVC 2514S',
      image: 'https://cdn.bigam.ru/resize_cache/iblock/7c8/9ii19986rcod7o7dg2mb9l17pgwcnv24/770_382_0/Prevyu.jpg',
      href: '/videos/vybiraem-stroitelnyi-pylesos-obzor-daewoo-davc-2514s/'
    }
  ];

  const articles = [
    {
      id: 1,
      title: 'Рейтинг профессиональных аккумуляторных шуруповертов',
      image: 'https://cdn.bigam.ru/resize_cache/745199/c815982ac5e917f5de5d39415cbb16ea/iblock/012/012de650c95e6a96ed0fec58118d34f2/glavnaya.jpg',
      href: '/stati/reiting-professionalnyh-akkumulyatornyh-shurupovertov/'
    },
    {
      id: 2,
      title: '6 способов убрать снег на участке',
      image: 'https://cdn.bigam.ru/resize_cache/744897/c815982ac5e917f5de5d39415cbb16ea/iblock/f32/f3222c73e283f01b28adc72ceba59091/glavnaya.jpg',
      href: '/stati/6-sposobov-ubrat-sneg-na-uchastke/'
    }
  ];

  const news = [
    {
      id: 1,
      date: '13.01.2026',
      title: 'Бигам расширяет свой ассортимент, представив обширную линейку алюминиевых и стальных лестниц и стремянок от Торговой марки SNIRREX.',
      href: '/about/novosti/bigam-rasshiryaet-svoi-assortiment-predstaviv-obshirnuyu-lineiku-alyuminievyh-i-stalnyh-lestnic-i-st/'
    },
    {
      id: 2,
      date: '13.01.2026',
      title: 'Готовьтесь к зиме с выгодой! «Скидка выходного дня -20%» в «Бигам»!',
      href: '/about/novosti/gotovtes-k-zime-s-vygodoi-skidka-vyhodnogo-dnya-20-v-bigam-/'
    }
  ];

  return (
    <section className="a-page-main__info">
      <div className="a-page-main__container">
        <div className="a-main-news">
          <div className="a-main-news__column a-main-news__column--tabs">
            <div className="a-main-tabs">
              <div className="a-main-tabs__tabs">
                <div className="a-tabs-carousel a-main-tabs__carousel">
                  <Swiper
                    slidesPerView="auto"
                    spaceBetween={0}
                    freeMode={true}
                    modules={[FreeMode]}
                    className="a-tabs-carousel__container"
                  >
                    {tabs.map((tab) => (
                      <SwiperSlide key={tab.id} className="a-tabs-carousel__slide">
                        <button
                          type="button"
                          className={`a-main-tabs__button ${activeTab === tab.id ? 'a-main-tabs__button--active' : ''}`}
                          onClick={() => setActiveTab(tab.id)}
                        >
                          {tab.name}
                        </button>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
              <div className="a-main-tabs__sections">
                {activeTab === 0 && (
                <section className="a-main-tabs__section a-main-tabs__section--active">
                  <div className="a-page-main__tab a-page-main__tab--videos">
                    <div className="a-card-carousel a-page-main__info-carousel a-card-carousel--type-news">
                      <Swiper
                        slidesPerView={1}
                        spaceBetween={20}
                        navigation={true}
                        pagination={true}
                        modules={[Navigation, Pagination]}
                        className="a-card-carousel__container"
                        breakpoints={{
                          640: {
                            slidesPerView: 2,
                          },
                          1024: {
                            slidesPerView: 2,
                          },
                        }}
                      >
                        {videos.map((video) => (
                          <SwiperSlide key={video.id} className="a-card-carousel__slide">
                            <div className="a-card-carousel__card">
                              <div className="a-light-news-card">
                                <a href={video.href} className="a-light-news-card__picture">
                                  <img 
                                    src={video.image} 
                                    alt={video.title} 
                                    className="a-light-news-card__image a-lazy-load a-is-loaded" 
                                  />
                                  <span></span>
                                </a>
                                <a href={video.href} className="a-light-news-card__title">
                                  {video.title}
                                </a>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                    <a href="/videos/" className="a-main-button a-page-main__button a-page-main__button--info-more a-main-button--display-inline a-main-button--type-large a-main-button--corner-round a-main-button--color-light-blue">
                      <span className="a-main-button__wrap">
                        <span className="a-main-button__content">Все видео</span>
                        <span className="a-main-button__constrain">
                          <svg className="a-svg a-main-button__icon a-main-button__icon--right a-svg--medium a-main-button__icon--icon-meatballs a-main-button__icon--color">
                            <use xlinkHref="#icon-meatballs"></use>
                          </svg>
                        </span>
                      </span>
                    </a>
                  </div>
                </section>
                )}
                {activeTab === 1 && (
                <section className="a-main-tabs__section a-main-tabs__section--active">
                  <div className="a-page-main__tab a-page-main__tab--articles">
                    <div className="a-card-carousel a-page-main__info-carousel a-card-carousel--type-news">
                      <Swiper
                        slidesPerView={1}
                        spaceBetween={20}
                        navigation={true}
                        pagination={true}
                        modules={[Navigation, Pagination]}
                        className="a-card-carousel__container"
                        breakpoints={{
                          640: {
                            slidesPerView: 2,
                          },
                          1024: {
                            slidesPerView: 2,
                          },
                        }}
                      >
                        {articles.map((article) => (
                          <SwiperSlide key={article.id} className="a-card-carousel__slide">
                            <div className="a-card-carousel__card">
                              <div className="a-light-news-card">
                                <a href={article.href} className="a-light-news-card__picture">
                                  <img 
                                    src={article.image} 
                                    alt={article.title} 
                                    className="a-light-news-card__image a-lazy-load a-is-loaded" 
                                  />
                                  <span></span>
                                </a>
                                <a href={article.href} className="a-light-news-card__title">
                                  {article.title}
                                </a>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                    <a href="/stati/" className="a-main-button a-page-main__button a-page-main__button--info-more a-main-button--display-inline a-main-button--type-large a-main-button--corner-round a-main-button--color-light-blue">
                      <span className="a-main-button__wrap">
                        <span className="a-main-button__content">Все статьи</span>
                        <span className="a-main-button__constrain">
                          <svg className="a-svg a-main-button__icon a-main-button__icon--right a-svg--medium a-main-button__icon--icon-meatballs a-main-button__icon--color">
                            <use xlinkHref="#icon-meatballs"></use>
                          </svg>
                        </span>
                      </span>
                    </a>
                  </div>
                </section>
                )}
              </div>
            </div>
          </div>
          <div className="a-main-news__column a-main-news__column--news">
            <h2 className="a-main-news__title">Новости компании</h2>
            <div className="a-main-news__list">
              <ul className="a-main-news-list">
                {news.map((item) => (
                  <li key={item.id} className="a-main-news-list__item">
                    <div className="a-main-news-list__content">
                      <div className="a-main-news-list__date">{item.date}</div>
                      <a href={item.href} className="a-main-news-list__title">
                        {item.title}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="a-main-news__more">
              <a href="/about/novosti/" className="a-main-button a-page-main__button a-page-main__button--list-more-desktop a-main-button--display-inline a-main-button--type-large a-main-button--corner-round a-main-button--color-blue">
                <span className="a-main-button__wrap">
                  <span className="a-main-button__content">Все новости</span>
                  <span className="a-main-button__constrain">
                    <svg className="a-svg a-main-button__icon a-main-button__icon--right a-svg--medium a-main-button__icon--icon-meatballs a-main-button__icon--color">
                      <use xlinkHref="#icon-meatballs"></use>
                    </svg>
                  </span>
                </span>
              </a>
              <a href="/about/novosti/" className="a-main-button a-page-main__button a-page-main__button--list-more-mobile a-main-button--display-inline a-main-button--type-large a-main-button--corner-round a-main-button--color-light-blue">
                <span className="a-main-button__wrap">
                  <span className="a-main-button__content">Все новости</span>
                  <span className="a-main-button__constrain">
                    <svg className="a-svg a-main-button__icon a-main-button__icon--right a-svg--medium a-main-button__icon--icon-meatballs a-main-button__icon--color">
                      <use xlinkHref="#icon-meatballs"></use>
                    </svg>
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
