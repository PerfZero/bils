"use client";

import Breadcrumbs from "../../components/Breadcrumbs";

export default function CatalogSlugPage({ params }) {
  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Корпоративным клиентам" },
  ];

  return (
    <main className="a-page-static__description a-page-static__description--new">
      <div className="a-page-catalog__container">
        <Breadcrumbs
          items={breadcrumbs}
          className="a-page-catalog__breadcrumbs"
        />

      </div>
 <div className="a-page-static__container">
  <section className="a-page-static__section">
    <div className="a-page-static__title">
      <h1>Прайс-лист «Бигам»</h1>
    </div>{" "}
    <div className="a-page-static__wrap">
      <div className="a-page-static__style">
        <style
          dangerouslySetInnerHTML={{
            __html:
              '    .static-pages-content__menu-item a {        border-bottom: none;    }    .static-pages-content__menu-item_active a {        color: #f27e00 !important;        border-bottom: 1px solid #f27e00 !important;    }    .static-pages-content__item iframe {        width: 100%;        max-height: 500px;        border-radius: 12px;        overflow: hidden;    }    @media (max-width: 567px) {        .static-pages-content__item iframe {            max-height: 300px;        }    }    @media (min-width: 799px) {        .static-pages-content__item .del-normilaze-styles {            width: auto;        }        .static-pages-content__item .ml-20 {            margin-left: 20px;        }    }    .static-pages-content__opened-list li::before {        display: none;    }    .static-pages-content__opened-list-item ul > li::before {        content: "•";        display: inline-block;        margin-right: 8px;        font-weight: 700;        color: #f27e00;    }    .static-pages-content__item-blocks__item-portrets img {        height: 60%;        -o-object-fit: cover;        object-fit: cover;        margin-bottom: 5px;    }    .static-pages-content__item-blocks__item-portrets p {        margin-top: 10px;        margin-bottom: 10px;    }    .static-pages-content__item-blocks__item-portrets .small-par {        font-size: 0.8rem;    }    .static-pages-content__item-blocks__item_center-content h3 {        text-align: center;    }    .static-pages-content__item-blocks__item_center-content .fs-17 {        font-size: 17px;    }    .static-pages-content__item-blocks__item_center-content .fs-20 {        font-size: 20px;    }    .static-pages-content__item-blocks__item_center-content .pos-center {        text-align: center;    }    .static-pages-content__item-blocks__item_center-content .width-110 {        width: 110px;    }    .static-pages-content__item-blocks__item_link-container a {        position: relative;        border-bottom: none;        display: block;    }    .static-pages-content__item-blocks__item_link-container a h3 {        font-size: 16px;        font-weight: 7000;        position: absolute;        top: 10px;        margin: 0;    }    .static-pages-content__item-blocks__item_link-container a img {        height: 300px;        -o-object-fit: contain;        object-fit: contain;        margin: 0 !important;    }    .static-pages-content__item-blocks__item_link-container a button {        position: absolute;        bottom: 30px;        left: 0;    }    .static-pages-content__item-blocks .flex-space-btw {        height: -webkit-fit-content;        height: -moz-fit-content;        height: fit-content;        display: -webkit-box;        display: -ms-flexbox;        display: flex;        -webkit-box-orient: vertical;        -webkit-box-direction: normal;        -ms-flex-direction: column;        flex-direction: column;        -webkit-box-pack: justify;        -ms-flex-pack: justify;        justify-content: space-between;    }    .static-pages-content__item-blocks .flex-space-btw a {        border-bottom-color: #f27e00;    }    .static-pages-content__item-blocks .flex-column {        display: -webkit-box;        display: -ms-flexbox;        display: flex;        -webkit-box-orient: vertical;        -webkit-box-direction: normal;        -ms-flex-direction: column;        flex-direction: column;        -webkit-box-pack: center;        -ms-flex-pack: center;        justify-content: center;    }    .static-pages-content__item-blocks .out-margin {        margin: 0 !important;    }    .static-pages-content__item-blocks .text-content {        margin-left: 20px;    }    .static-pages-content__item-blocks .text-content h3 {        margin-top: 0;        margin-bottom: 20px;    }    .static-pages-content__item-blocks .fixed-image-width-80 {        width: 80px;    }    .static-pages-content__item-blocks .image-container {        width: 120px;        height: 120px;        border-radius: 50%;        display: -webkit-box;        display: -ms-flexbox;        display: flex;        -webkit-box-pack: center;        -ms-flex-pack: center;        justify-content: center;        -webkit-box-align: center;        -ms-flex-align: center;        align-items: center;        background-color: #163285;        overflow: hidden;    }    .static-pages-content__item-blocks .image-container img {        margin: 0 !important;        max-width: 69px;    }    .static-pages-content__item-blocks_bg-grey img {        max-width: 70px;    }    .static-pages-content__item-blocks_bg-grey p {        margin-left: 15px;    }    .static-pages-content__item-table {        border: none !important;        border-collapse: collapse;    }    .static-pages-content__item-table tr:nth-child(odd) {        background: #f8f8f8;    }    .static-pages-content__item-table tr td {        border: none;        padding: 12px;    }    .static-pages-content .svg-static-content {        position: absolute;        top: calc(50% - 6px);        right: 10px;        width: 12px;        height: 12px;        margin-top: 0 !important;        margin-bottom: 0 !important;        -webkit-transform: rotateZ(180deg);        transform: rotateZ(180deg);    }    .static-pages-content .svg-static-content_open {        -webkit-transform: rotateZ(0deg);        transform: rotateZ(0deg);    }    @media (max-width: 799px) {        .static-pages-content__menu-item a {            border-bottom: none;        }    }',
          }}
        />{" "}
        <script />
      </div>{" "}
      <div className="a-page-static__sidebar">
        <div className="page-static-menu__list">
          <div className="page-static-menu__item">
            <a
              className="page-static-menu__link nuxt-link-active"
              href="/service/">
              Сервисный центр
            </a>
          </div>
          <div className="page-static-menu__item">
            <div className="page-static-menu__link">Проверить статус</div>
          </div>
          <div className="page-static-menu__item">
            <a
              className="page-static-menu__link"
              href="/catalog/zapchasti-6733/">
              Каталог запчастей
            </a>
          </div>
          <div className="page-static-menu__item">
            <a
              aria-current="page"
              className="page-static-menu__link nuxt-link-exact-active nuxt-link-active page-static-menu__link--active"
              href="/service/prices/">
              Услуги
            </a>
          </div>
          <div className="page-static-menu__item">
            <a
              className="page-static-menu__link"
              href="/service/zapchasti-kak-oformit-zakaz/">
              Как заказать запчаcть
            </a>
          </div>
          <div className="page-static-menu__item">
            <a className="page-static-menu__link" href="/service/#contact-1">
              Контакты
            </a>
          </div>
        </div>
      </div>{" "}
      <div className="a-page-static__description a-page-static__description--old">
        <h2>Стоимость работ по ремонту оборудования</h2>
        <table className="static-pages-content__item-table">
          <tbody>
            <tr>
              <td>
                <b>ВИД РАБОТ</b>
              </td>
              <td>
                <b>ЦЕНА, РУБ.</b>
              </td>
            </tr>
            <tr>
              <td colSpan="2" width="454">
                <strong>4х тактный двигатель</strong>
              </td>
            </tr>
            <tr>
              <td>Капитальный ремонт</td>
              <td>3125,00</td>
            </tr>
            <tr>
              <td>Замена поршня/колец</td>
              <td>1250,00</td>
            </tr>
            <tr>
              <td>Замена, ремонт головки цилиндра</td>
              <td>1000,00</td>
            </tr>
            <tr>
              <td>Замена распредвала</td>
              <td>1000,00</td>
            </tr>
            <tr>
              <td>Замена карбюратора</td>
              <td>687,50</td>
            </tr>
            <tr>
              <td>Замена маховика</td>
              <td>875,00</td>
            </tr>
            <tr>
              <td>Замена топливного бака</td>
              <td>625,00</td>
            </tr>
            <tr>
              <td>Замена магнето</td>
              <td>562,50</td>
            </tr>
            <tr>
              <td>Замена стартера</td>
              <td>437,50</td>
            </tr>
            <tr>
              <td>Замена корпуса воздушного фильтра</td>
              <td>187,50</td>
            </tr>
            <tr>
              <td>Мелкий ремонт*</td>
              <td>375-650</td>
            </tr>
            <tr>
              <td>Регулировочные работы</td>
              <td>437,50</td>
            </tr>
            <tr>
              <td colSpan="2" width="454">
                <strong>2х тактный двигатель</strong>
              </td>
            </tr>
            <tr>
              <td>Капитальный ремонт</td>
              <td>1875,00</td>
            </tr>
            <tr>
              <td>Замена поршня/колец</td>
              <td>1062,50</td>
            </tr>
            <tr>
              <td>Замена карбюратора</td>
              <td>562,50</td>
            </tr>
            <tr>
              <td>Замена маховика</td>
              <td>500,00</td>
            </tr>
            <tr>
              <td>Замена магнето</td>
              <td>562,50</td>
            </tr>
            <tr>
              <td>Замена стартера</td>
              <td>375,00</td>
            </tr>
            <tr>
              <td>Замена воздушного фильтра</td>
              <td>187,50</td>
            </tr>
            <tr>
              <td>Замена топливного шланга с фильтром</td>
              <td>250,00</td>
            </tr>
            <tr>
              <td>Замена праймера</td>
              <td>375,00</td>
            </tr>
            <tr>
              <td>Мелкий ремонт*</td>
              <td>200-500</td>
            </tr>
            <tr>
              <td>Регулировочные работы</td>
              <td>250,00</td>
            </tr>
            <tr>
              <td colSpan="2" width="454">
                <strong>Генератор до 8 кВт.</strong>
              </td>
            </tr>
            <tr>
              <td>Замена генератора в сборе</td>
              <td>1875,00</td>
            </tr>
            <tr>
              <td>Замена блока АВР</td>
              <td>812,50</td>
            </tr>
            <tr>
              <td>Замена панели</td>
              <td>1000,00</td>
            </tr>
            <tr>
              <td>Замена ротора</td>
              <td>1125,00</td>
            </tr>
            <tr>
              <td>Замена статора</td>
              <td>1250,00</td>
            </tr>
            <tr>
              <td>Замена рамы</td>
              <td>1125,00</td>
            </tr>
            <tr>
              <td>Замена щеток</td>
              <td>562,50</td>
            </tr>
            <tr>
              <td>Мелкий ремонт *</td>
              <td>380-880</td>
            </tr>
            <tr>
              <td>Т.О.**</td>
              <td>1062,50</td>
            </tr>
            <tr>
              <td colSpan="2" width="454">
                <strong>Мотоблок</strong>
              </td>
            </tr>
            <tr>
              <td>Замена редуктора</td>
              <td>1125,00</td>
            </tr>
            <tr>
              <td>Ремонт редуктора</td>
              <td>1500,00</td>
            </tr>
            <tr>
              <td>Замена ремня привода</td>
              <td>250,00</td>
            </tr>
            <tr>
              <td>Замена натяжного ролика</td>
              <td>312,50</td>
            </tr>
            <tr>
              <td>Замена колеса/фрезы</td>
              <td>312,50</td>
            </tr>
            <tr>
              <td>Замена троса с регулировкой</td>
              <td>
                250,00
                <br />
              </td>
            </tr>
            <tr>
              <td>Замена рукоятки</td>
              <td>
                250,00
                <br />
              </td>
            </tr>
            <tr>
              <td>Мелкий ремонт*</td>
              <td>250-650</td>
            </tr>
            <tr>
              <td>Мойка с химией</td>
              <td>187,50</td>
            </tr>
            <tr>
              <td>Т.О.**</td>
              <td>1062,50</td>
            </tr>
            <tr>
              <td colSpan="2" width="454">
                <strong>Культиватор</strong>
              </td>
            </tr>
            <tr>
              <td>Замена редуктора</td>
              <td>875,00</td>
            </tr>
            <tr>
              <td>Ремонт редуктора</td>
              <td>1125,00</td>
            </tr>
            <tr>
              <td>Замена ремня привода</td>
              <td>250,00</td>
            </tr>
            <tr>
              <td>Замена натяжного ролика</td>
              <td>312,50</td>
            </tr>
            <tr>
              <td>Замена колеса/фрезы</td>
              <td>187,50</td>
            </tr>
            <tr>
              <td>Замена троса с регулировкой</td>
              <td>250,00</td>
            </tr>
            <tr>
              <td>Замена рукоятки управления</td>
              <td>
                250,00
                <br />
              </td>
            </tr>
            <tr>
              <td>Мелкий ремонт*</td>
              <td>200-400</td>
            </tr>
            <tr>
              <td>Мойка с химией</td>
              <td>125,00</td>
            </tr>
            <tr>
              <td>Т.О.**</td>
              <td>937,50</td>
            </tr>
            <tr>
              <td colSpan="2" width="454">
                <strong>Снегоубощик</strong>
              </td>
            </tr>
            <tr>
              <td>Замена редуктора привода шнеков</td>
              <td>875,00</td>
            </tr>
            <tr>
              <td>Замена ремня привода шнеков</td>
              <td>750,00</td>
            </tr>
            <tr>
              <td>Ремонт редуктора привода шнеков</td>
              <td>1125,00</td>
            </tr>
            <tr>
              <td>Замена фрикционного диска</td>
              <td>1000,00</td>
            </tr>
            <tr>
              <td>Замена вала, шкива привода</td>
              <td>750,00</td>
            </tr>
            <tr>
              <td>Замена приводного вала колеса</td>
              <td>500,00</td>
            </tr>
            <tr>
              <td>Замена троса с регулировкой</td>
              <td>250,00</td>
            </tr>
            <tr>
              <td>Мелкий ремонт*</td>
              <td>200-500</td>
            </tr>
            <tr>
              <td colSpan="2" width="454">
                <strong>Бензопила</strong>
              </td>
            </tr>
            <tr>
              <td>Замена маслонасоса</td>
              <td>500,00</td>
            </tr>
            <tr>
              <td>Замена топливного бака(бензопила)</td>
              <td>625,00</td>
            </tr>
            <tr>
              <td>Замена тормоза цепи</td>
              <td>250,00</td>
            </tr>
            <tr>
              <td>Замена шины с установкой и натяжкой цепи</td>
              <td>375,00</td>
            </tr>
            <tr>
              <td>Замена натяжителя цепи</td>
              <td>
                375,00
                <br />
              </td>
            </tr>
            <tr>
              <td>Заточка цепи</td>
              <td>187,50</td>
            </tr>
            <tr>
              <td>Мелкий ремонт*</td>
              <td>125-375</td>
            </tr>
            <tr>
              <td colSpan="2" width="454">
                <strong>Бензотриммер</strong>
              </td>
            </tr>
            <tr>
              <td>Замена топливного бака</td>
              <td>375,00</td>
            </tr>
            <tr>
              <td>Замена сцепления</td>
              <td>562,50</td>
            </tr>
            <tr>
              <td>Замена штанги</td>
              <td>375,00</td>
            </tr>
            <tr>
              <td>Замена шпули</td>
              <td>187,50</td>
            </tr>
            <tr>
              <td>Мелкий ремонт*</td>
              <td>125-375</td>
            </tr>
            <tr>
              <td colSpan="2" width="454">
                <strong>Мотопомпа</strong>
              </td>
            </tr>
            <tr>
              <td>Замена корпуса насоса</td>
              <td>750,00</td>
            </tr>
            <tr>
              <td>Замена сальников крыльчатки</td>
              <td>562,50</td>
            </tr>
            <tr>
              <td>Замена крыльчатки</td>
              <td>500,00</td>
            </tr>
            <tr>
              <td>Замена корпуса крыльчатки</td>
              <td>375,00</td>
            </tr>
            <tr>
              <td>Мелкий ремонт*</td>
              <td>250-500</td>
            </tr>
            <tr>
              <td colSpan="2" width="454">
                <strong>Электроинструмент</strong>
              </td>
            </tr>
            <tr>
              <td colSpan="2" width="454">
                <b>Отбойный электрический  молоток</b>
              </td>
            </tr>
            <tr>
              <td>Ремонт редуктора с заменой ствола, цилиндра, поршня</td>
              <td>2500,00</td>
            </tr>
            <tr>
              <td>Ремонт редуктора без замены деталей</td>
              <td>1187,50</td>
            </tr>
            <tr>
              <td>Замена ротора</td>
              <td>750,00</td>
            </tr>
            <tr>
              <td>Замена статора</td>
              <td>1000,00</td>
            </tr>
            <tr>
              <td>Замена щеток</td>
              <td>312,50</td>
            </tr>
            <tr>
              <td>Замена выключателя электронного блока</td>
              <td>625,00</td>
            </tr>
            <tr>
              <td>Мелкий ремонт*</td>
              <td>200-625</td>
            </tr>
            <tr>
              <td colSpan="2" width="454">
                <strong>Перфоратор</strong>
              </td>
            </tr>
            <tr>
              <td>Ремонт редуктора с заменой ствола, цилиндра, поршня</td>
              <td>1500,00</td>
            </tr>
            <tr>
              <td>Замена ротора</td>
              <td>625,00</td>
            </tr>
            <tr>
              <td>Замена статора</td>
              <td>750,00</td>
            </tr>
            <tr>
              <td>Замена щеток</td>
              <td>250,00</td>
            </tr>
            <tr>
              <td>Мелкий ремонт*</td>
              <td>250-500</td>
            </tr>
            <tr>
              <td>Замена выключателя электронного блока</td>
              <td>500,00</td>
            </tr>
            <tr>
              <td colSpan="2" width="454">
                <strong>Дрель, триммер, пила, лобзик</strong>
              </td>
            </tr>
            <tr>
              <td>Замена ротора</td>
              <td>
                500,00
                <br />
              </td>
            </tr>
            <tr>
              <td>Замена статора</td>
              <td>
                500,00
                <br />
              </td>
            </tr>
            <tr>
              <td>Замена щеток</td>
              <td>187,50</td>
            </tr>
            <tr>
              <td>Ремонт редуктора</td>
              <td>500,00</td>
            </tr>
            <tr>
              <td>Замена выключателя электронного блока</td>
              <td>437,50</td>
            </tr>
            <tr>
              <td>Мелкий ремонт*</td>
              <td>150-400</td>
            </tr>
            <tr>
              <td colSpan="2" width="454">
                <strong>Компрессор</strong>
              </td>
            </tr>
            <tr>
              <td>Замена компрессорного блока</td>
              <td>1125,00</td>
            </tr>
            <tr>
              <td>Ремонт компрессорного блока с заменой ЦПГ</td>
              <td>2125,00</td>
            </tr>
            <tr>
              <td>Замена пресостата</td>
              <td>750,00</td>
            </tr>
            <tr>
              <td>Проверка рессивера, запорной арматуры,манометров</td>
              <td>500,00</td>
            </tr>
            <tr>
              <td>Мелкий ремонт*</td>
              <td>150-400</td>
            </tr>
            <tr>
              <td colSpan="2" width="454">
                <strong>Насосная станция</strong>
              </td>
            </tr>
            <tr>
              <td>Замена гидроаккумулятора</td>
              <td>875,00</td>
            </tr>
            <tr>
              <td>Замена электродвигателя</td>
              <td>1000,00</td>
            </tr>
            <tr>
              <td>Замена насосной части в сборе</td>
              <td>875,00</td>
            </tr>
            <tr>
              <td>Замена рабочих колес насосной части</td>
              <td>625,00</td>
            </tr>
            <tr>
              <td>Замена мембраны</td>
              <td>500,00</td>
            </tr>
            <tr>
              <td>Мелкий ремонт*</td>
              <td>150-400</td>
            </tr>
            <tr>
              <td>Обкатка на стенде с проверкой рабочих параметров</td>
              <td>562,50</td>
            </tr>
            <tr>
              <td colSpan="2" width="454">
                <b>Насосы</b>
              </td>
            </tr>
            <tr>
              <td>Замена электродвигателя</td>
              <td>1000,00</td>
            </tr>
            <tr>
              <td>Ремонт насосной части</td>
              <td>875,00</td>
            </tr>
            <tr>
              <td>Замена поплавка, шнура питания</td>
              <td>500,00</td>
            </tr>
            <tr>
              <td>Замена корпуса насоса</td>
              <td>750,00</td>
            </tr>
            <tr>
              <td>Ремонт шнура питания с термоусадочной трубкой</td>
              <td>375,00</td>
            </tr>
            <tr>
              <td>Мелкий ремонт *</td>
              <td>150-400</td>
            </tr>
            <tr>
              <td>Обкатка насоса на стенде с проверкой параметров</td>
              <td>562,50</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</div>

    </main>
  );
}
