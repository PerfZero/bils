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
                Интернет-магазин «BREMAX» — профессиональный инструмент и
                оборудование
              </h3>

              <p>
                Интернет-магазин «BREMAX» специализируется на продаже
                электроинструмента и строительного инструмента, оборудования для
                сада и дачи, а также климатической техники для дома и бизнеса.
              </p>

              <p>
                Компания «BREMAX» уже более 8 лет успешно работает на рынке и за
                это время зарекомендовала себя как надёжный поставщик
                качественного оборудования для строительства, ремонта и
                обслуживания объектов различного назначения. Мы предлагаем
                проверенные решения как для профессионалов, так и для частных
                клиентов, уделяя особое внимание качеству продукции и уровню
                сервиса.
              </p>

              <p>
                Сегодня ассортимент «BREMAX» включает широкий выбор
                строительного и садового инструмента, сварочного оборудования,
                климатической техники, а также товаров для водоснабжения,
                отопления и ремонта. Мы постоянно расширяем каталог и работаем
                только с проверенными производителями.
              </p>

              <h5>География компании</h5>
              <p>
                «BREMAX» осуществляет продажи и доставку по всей территории
                России, обеспечивая клиентов качественным сервисом и оперативной
                логистикой. Мы стремимся быть максимально удобными для наших
                покупателей — как в онлайн-формате, так и при работе с
                корпоративными заказами.
              </p>
              <p>
                «BREMAX» — это практичный подход, надёжность и профессиональный
                выбор, проверенные временем....
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
