"use client";

import Breadcrumbs from "../../components/Breadcrumbs";

export default function CatalogSlugPage({ params }) {
    const breadcrumbs = [
        { label: "Главная", href: "/" },
        { label: "Корпоративным клиентам" },
    ];

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
      <h1>Благотворительность</h1>
    </div>{" "}
    <div className="a-page-static__wrap">
      <div className="a-page-static__style">
        <style
          dangerouslySetInnerHTML={{
            __html:
              "    @media (min-width: 799px) {        .del-normilaze-styles.ml-20 {            margin-left: 20px;            width: auto;        }    }",
          }}
        />{" "}
        <script />
      </div>{" "}
      <div className="a-page-static__sidebar">
        <div className="page-static-menu__list">
          <div className="page-static-menu__item">
            <a className="page-static-menu__link" href="/brands/">
              Производители
            </a>
          </div>
          <div className="page-static-menu__item">
            <a className="page-static-menu__link" href="/about/career/">
              Карьера
            </a>
          </div>
          <div className="page-static-menu__item">
            <a
              aria-current="page"
              className="page-static-menu__link nuxt-link-exact-active nuxt-link-active page-static-menu__link--active"
              href="/about/charity/">
              Благотворительность
            </a>
          </div>
          <div className="page-static-menu__item">
            <a className="page-static-menu__link" href="/about/novosti/">
              Новости
            </a>
          </div>
          <div className="page-static-menu__item">
            <a className="page-static-menu__link" href="/stati/">
              Статьи
            </a>
          </div>
        </div>
      </div>{" "}
      <div className="a-page-static__description a-page-static__description--old">
        <p>
          Почему компания «Бигам» занимается благотворительностью? Главная
          причина, по которой мы это делаем, – желание творить добро и помогать
          другим людям.
        </p>
        <p>
          Мы понимаем, насколько важно быть частью общества и мира, в котором мы
          живем, проявляя терпение, великодушие и милосердие к ближнему.
        </p>
        <p>
          Мы верим в простую истину – то, что мы делаем, может быть большим
          вкладом в другие жизни.
        </p>
        <img
          align="right"
          alt="стикер.jpg - IrfanView.jpg"
          className="del-normilaze-styles ml-20"
          height="265"
          src="https://cdn.bigam.ru/medialibrary/a36/s0p5n110twmoa9oilna8hr5w96ows9st/stiker.jpg_irfanview.jpg"
          title="стикер.jpg - IrfanView.jpg"
          width="235"
        />
        <p>
          <strong>
            Сегодня покупатели магазинов «Бигам» и «Н2О», приобретая на кассе
            пакет для упаковки товара, помогают больным детям фонда РУСФОНД.
          </strong>
        </p>
        <p>
          Все денежные средства, вырученные с продажи пакетов, компания «Бигам»
          ежемесячно перечисляет в благотворительный фонд РУСФОНД (
          <a href="http://www.rusfond.ru/" rel="nofollow" target="_blank">
            www.rusfond.ru
          </a>
          ) для детей, нуждающихся в дорогостоящем лечении.
        </p>
        <p>
          <strong>
            Отчет о перечислениях в фонд РУСФОНД расположен по этой
            <a href="/about/charity/aktsiya-kupi-paket-pomogi-detyam/">
              ссылке
            </a>
            .
          </strong>
        </p>
        <p>
          <strong>
            Также компания «Бигам» помогает таким организациям, как:
          </strong>
        </p>
        <ul>
          <li>Специальная (коррекционная) школа-интернат 82;</li>
          <li>Специальная (коррекционная) школа-интернат 8;</li>
          <li>
            Ярославская местная организация Всероссийского общества слепых;
          </li>
          <li>
            Отделение Ярославской Областной организации Общероссийской
            общественной Организации «Всероссийское общество инвалидов»;
          </li>
          <li>
            Угоднический дом милосердия (детский приют Ивановской области);
          </li>
          <li>Кирилло-Афанасиевский мужской монастырь г. Ярославля и др.</li>
        </ul>
        <p>
          Это неполный список учреждений, которым мы оказываем материальную
          поддержку.
        </p>
        <p>
          Кроме того, «Бигам» проявляет содействие в проведении различных
          мероприятий и акций. С нашей помощью были реализованы такие проекты,
          как Межрегиональный молодежный форум Ярославской области, праздник
          «День города Рыбинска», Международный день инвалидов для детей с
          ограниченными возможностями Ярославского района, праздник «День города
          Ярославля», благотворительная акция для ветеранов ВОВ ко Дню Победы и
          др.
        </p>
        <p>
          Благотворительная деятельность компании неоднократно отмечена
          благодарственными письмами.
        </p>
        <p>Делать добрые дела просто.</p>
        <p>
          По вопросам благотворительности пишите на почту: 
          <a href="mailto:reklama@bigam.ru">reklama@bigam.ru</a>.
        </p>
      </div>
    </div>
  </section>
</div>

        </main>
    );
}
