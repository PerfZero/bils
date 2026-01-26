"use client";

import Breadcrumbs from "../../components/Breadcrumbs";

export default function CatalogSlugPage({ params }) {
  const breadcrumbs = [{ label: "Главная", href: "/" }, { label: "Карьера" }];

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
            <h1>Карьера</h1>
          </div>{" "}
          <div className="a-page-static__wrap">
            <div className="a-page-static__style">
              <style /> <script />
            </div>{" "}
            <div className="a-page-static__sidebar">
              <div className="page-static-menu__list">
                <div className="page-static-menu__item">
                  <a
                    aria-current="page"
                    className="page-static-menu__link nuxt-link-exact-active nuxt-link-active page-static-menu__link--active"
                    href="/about/career/"
                  >
                    Карьера
                  </a>
                </div>
                <div className="page-static-menu__item">
                  <a
                    className="page-static-menu__link"
                    href="/about/career/life/"
                  >
                    Наша жизнь
                  </a>
                </div>
                <div className="page-static-menu__item">
                  <a
                    className="page-static-menu__link"
                    href="/about/career/management/"
                  >
                    Наши руководители
                  </a>
                </div>
                <div className="page-static-menu__item">
                  <a
                    className="page-static-menu__link"
                    href="                https://yaroslavl.hh.ru/search/vacancy?from=employerPage&employer_id=50355&hhtmFrom=employer            "
                    rel="nofollow"
                    target="_blank"
                  >
                    Вакансии
                  </a>
                </div>
              </div>
            </div>{" "}
            <div className="a-page-static__description a-page-static__description--old">
              <h2>О Компании</h2>
              <p>
                Компания BREMAX – Федеральная торговая сеть центров, один из
                крупнейших поставщиков профессионального рабочего оборудования,
                инструмента и техники.
              </p>
              <p>Наша компания:</p>
              <ul>
                <li>
                  Топ-100 в Рейтинге работодателей hh.ru (в сегменте средних
                  компаний)
                </li>
                <li>Более 35 магазинов</li>
                <li>Отдел по работе с корпоративными клиентами</li>
                <li>Интернет - магазин</li>
                <li>Служба заботы о клиентах</li>
                <li>Распределительный центр</li>
                <li>Собственный автопарк</li>
                <li>
                  Сервисный центр в г. Ярославль и его представительства в
                  регионах.
                </li>
              </ul>
              <p
                style={{
                  textAlign: "center",
                }}
              >
                {" "}
                <strong>BREMAX - это 31 год успешной истории работы!</strong>
              </p>{" "}
              <img
                alt=""
                src="https://cdn.bigam.ru/medialibrary/0cc/9qdh3msl51xre6cgx02slw4cfihk0wfs/career_about1 (1).jpg"
              />
              <h2>Наши сотрудники – главная ценность компании!</h2>
              <p>
                Нам важно, чтобы каждый чувствовал себя комфортно и уверенно,
                работая вместе с нами.
              </p>
              <p>Работа в BREMAX дает возможность:</p>
              <ul>
                <li>Реализовывать свои идеи и зарабатывать</li>
                <li>Получать удовольствие от того, чем Вы занимаетесь</li>
                <li>Сделать ваши ожидания реальностью</li>
              </ul>
              <h2>Ценности</h2>
              <h3>Исключительное отношение сотрудников друг к другу</h3>
              <p>
                Мы помогаем друг другу в достижении общих целей.
                <br />
                Каждый из нас ежедневно заряжает своих коллег улыбкой и
                позитивом, уважительно относится к себе и к другим.
                <br />
                Совместная работа и желание достичь результата – приоритетные
                составляющие работы в нашей компании.
              </p>{" "}
              <img
                alt=""
                src="https://cdn.bigam.ru/medialibrary/60a/cuot7aj9sjcbzeq6m39h9aeeym070suu/1.png"
                style={{
                  width: "200px",
                }}
              />
              <h3>Взаимная лояльность к нашим клиентам</h3>
              <p>
                Мы не мыслим себя без наших клиентов.
                <br />
                Каждый из нас помогает удовлетворять желания клиентов, благодаря
                умению видеть их потребности.
                <br />
                Искренняя вежливость, отзывчивость, внимательность, честность, и
                профессиональные знания сотрудников возвращают к нам клиентов
                снова и снова.
                <br />
              </p>{" "}
              <img
                alt=""
                src="https://cdn.bigam.ru/medialibrary/60a/cuot7aj9sjcbzeq6m39h9aeeym070suu/2.png"
                style={{
                  width: "200px",
                }}
              />
              <h3>Развитие</h3>
              <p>
                Мы непрерывно развиваемся, ежедневно меняя мир вокруг нас.
                <br />
                Каждый из нас анализирует свои достижения, улучшает технологии
                работы, совершенствует результат и непреодолимо движется к
                намеченным целям.
                <br />
                От эффективности работы сотрудников зависит успех компании и
                благополучие ее клиентов.
                <br />
              </p>{" "}
              <img
                alt=""
                src="https://cdn.bigam.ru/medialibrary/60a/cuot7aj9sjcbzeq6m39h9aeeym070suu/4.png"
                style={{
                  width: "200px",
                }}
              />
              <h3>Ответственность</h3>
              <p>
                Мы в ответе за результат своей работы в компании. <br />
                Каждый из нас эффективно использует рабочее время и ресурсы
                компании, соблюдает дисциплину, правила и стандарты.
                <br />
                Наши действия, поступки и поведение влияют на происходящие
                вокруг нас события.
                <br />
              </p>{" "}
              <img
                alt=""
                src="https://cdn.bigam.ru/medialibrary/60a/cuot7aj9sjcbzeq6m39h9aeeym070suu/3.png"
                style={{
                  width: "200px",
                }}
              />
              <h2>Работа в BREMAX:</h2>
              <ul>
                <li>
                  Стабильность – Работа в крупной развивающейся компании
                  федерального уровня.
                </li>
                <li>Карьера – Перспектива роста и развития внутри компании.</li>
                <li>
                  Самореализация – Воплощение идей, целей и личных  проектов в
                  жизнь.
                </li>
                <li>
                  Мотивация – Возможность влиять на уровень своего дохода.
                  Размер оплаты труда, зависит от результатов работы самого
                  сотрудника.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
