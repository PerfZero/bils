"use client";

export default function AuthModal({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div id="modals-container">
      <div className="vm--container scrollable">
        <div
          data-modal="login"
          aria-expanded="true"
          className="vm--overlay"
          onClick={onClose}
        >
          <div className="vm--top-right-slot" />
        </div>
        <div
          aria-expanded="true"
          role="dialog"
          aria-modal="true"
          className="vm--modal a-main-modal-parent can-outside a-main-modal-parent--auth auth-modal--centered"
        >
          <div className="a-main-modal">
            <div
              className="a-main-modal__drag"
              style={{
                touchAction: "none",
                userSelect: "none",
                WebkitUserDrag: "none",
                WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
              }}
            />
            <div className="a-main-modal__wrap">
              <button
                type="button"
                className="a-main-modal__close"
                onClick={onClose}
              >
                <svg className="a-svg">
                  <use
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xlinkHref="#icon-cross"
                  />
                </svg>
              </button>
              <div className="a-main-modal__content">
                <div className="authentication-modal-content">
                  <div className="authentication-modal-content__title">
                    Вход или регистрация
                  </div>
                  <div className="authentication-modal-content__container">
                    <div className="auth-step-main">
                      <div className="a-input-field a-input-field--type-string">
                        <label
                          title="Номер телефона или E-mail"
                          className="a-input-field__constrain"
                        >
                          <span className="a-input-field__label">
                            Номер телефо⁠на или E-mail
                          </span>
                          <input
                            type="email"
                            placeholder="Номер телефона или E-mail"
                            spellCheck="false"
                            autoComplete="email"
                            lang="ru"
                            inputMode="email"
                            className="a-input-field__input"
                          />
                        </label>
                      </div>
                      <button
                        type="button"
                        className="a-main-button a-main-button--display-inline a-main-button--type-medium a-main-button--corner-round a-main-button--color-blue"
                      >
                        <span className="a-main-button__wrap">
                          <span className="a-main-button__content">
                            Продолжить
                          </span>
                        </span>
                      </button>
                      <div className="auth-step-main__separator">
                        или войти с помощью
                      </div>
                      <div className="auth-step-main__actions">
                        <button
                          type="button"
                          className="a-main-button auth-step-main__button-yandex a-main-button--display-inline a-main-button--type-medium a-main-button--corner-round a-main-button--color-light-blue"
                        >
                          <span className="a-main-button__wrap">
                            <span className="a-main-button__constrain">
                              <svg className="a-svg a-main-button__icon a-main-button__icon--left a-svg--medium a-main-button__icon--icon-yandex a-main-button__icon--color">
                                <use
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  xlinkHref="#icon-yandex"
                                />
                              </svg>
                            </span>
                            <span className="a-main-button__content">
                              Яндекс ID
                            </span>
                          </span>
                        </button>
                        <button
                          type="button"
                          className="a-main-button auth-step-main__button-vk a-main-button--display-inline a-main-button--type-medium a-main-button--corner-round a-main-button--color-light-blue"
                        >
                          <span className="a-main-button__wrap">
                            <span className="a-main-button__constrain">
                              <svg className="a-svg a-main-button__icon a-main-button__icon--left a-svg--medium a-main-button__icon--icon-vk a-main-button__icon--color">
                                <use
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  xlinkHref="#icon-vk"
                                />
                              </svg>
                            </span>
                            <span className="a-main-button__content">
                              VK ID
                            </span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="authentication-modal-content__policy">
                    Продолжая, вы соглашаетесь с{" "}
                    <a
                      href="/customer/polzovatelskoe-soglashenie/"
                      className="a-link-button"
                    >
                      <span className="a-link-button__content a-link-button__content--blue">
                        Политикой обработки персональных данных
                      </span>
                    </a>{" "}
                    и{" "}
                    <a
                      href="/customer/politika-konfidentsialnosti/"
                      className="a-link-button"
                    >
                      <span className="a-link-button__content a-link-button__content--blue">
                        Политикой конфиденциальности
                      </span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
