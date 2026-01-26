"use client";
import { useState } from "react";

export default function CompanyDescription() {
  const [isSpoilerOpen, setIsSpoilerOpen] = useState(false);

  return (
    <section className="a-page-main__description">
      <div className="a-page-main__container">
        <div
          className={`a-spoiler a-title-indent ${isSpoilerOpen ? "a-spoiler--open" : ""}`}
        >
          <div className="a-spoiler__content">
            <div className="a-page-main__inner">
              <h3>
                Интернет-магазин «BREMAX» — электроинструмент и строительный
                инструмент, оборудование для сада, а также климатическая
                техника.
              </h3>

              <p>
                Компания «BREMAX» уже более 30 лет работает на российском рынке
                строительного, садового и сварочного оборудования. История
                компании началась в 1994 г., и первоначальной деятельностью была
                поставка газосварочного и электросварочного инструмента. Сейчас
                компания «BREMAX» — это широкая сеть профессиональных Центров
                продажи огромного ассортимента строительной и садовой техники,
                кондиционеров, инструмента для ремонта, приборов для
                водоснабжения, отопления и, конечно же, сварочного оборудования.
              </p>

              <h5>География компании</h5>
              <p>
                Сегодня «BREMAX» - это 35 магазинов в 18 крупных городах России:
                Ярославле, Переславле-Залесском, Рыбинске, Муроме, Москве,
                Череповце, Угличе, Твери, Вологде, Владимире, Александрове,
                Костроме, Коврове, Иванове, Кинешме, Нижнем Новгороде, Туле,
                Рязани. «BREMAX» — это качество и стабильность, проверенные
                временем.
              </p>
            </div>
          </div>
          <div className="a-spoiler__buttons">
            <button
              type="button"
              className={`a-spoiler__button a-spoiler__button--open a-link a-link--grey ${isSpoilerOpen ? "a-spoiler__button--hidden" : ""}`}
              onClick={() => setIsSpoilerOpen(true)}
              style={{ "--spoiler-open-text": "Читать полностью" }}
            >
              Читать полностью
            </button>
            <button
              type="button"
              className={`a-spoiler__button a-spoiler__button--close a-link a-link--grey ${!isSpoilerOpen ? "a-spoiler__button--hidden" : ""}`}
              onClick={() => setIsSpoilerOpen(false)}
            >
              Скрыть
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
