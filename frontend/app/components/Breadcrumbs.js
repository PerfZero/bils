import React, { useState } from "react";

const Breadcrumbs = ({ items, className = "" }) => {
  const classes = ["a-breadcrumbs", className].filter(Boolean).join(" ");
  const [activeIndex, setActiveIndex] = useState(null);
  const list = Array.isArray(items) ? items : [];
  return (
    <ul className={classes}>
      {list.map((item, index) => {
        const hasDropdown = item.dropdown && item.dropdown.length > 0;
        return (
          <li
            key={index}
            className={[
              "a-breadcrumbs__item",
              item.href ? "" : "a-breadcrumbs__item--current",
            ]
              .filter(Boolean)
              .join(" ")}
            onMouseEnter={hasDropdown ? () => setActiveIndex(index) : undefined}
            onMouseLeave={hasDropdown ? () => setActiveIndex(null) : undefined}
          >
            {item.href ? (
              <>
                <a href={item.href} className="a-breadcrumbs__link">
                  {item.label}
                </a>
                {hasDropdown ? (
                  <>
                    <svg className="a-svg">
                      <use
                        xlinkHref="#icon-chevron-down"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      />
                    </svg>
                    <div
                      className={[
                        "a-breadcrumbs__dropdown",
                        activeIndex === index
                          ? "a-breadcrumbs__dropdown--visible"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <div className="a-breadcrumbs__dropdown-scroll">
                        <ul>
                          {item.dropdown.map((child, childIndex) => (
                            <li key={childIndex}>
                              <a
                                href={child.href}
                                className="a-breadcrumbs__dropdown-link"
                              >
                                {child.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                ) : null}
              </>
            ) : (
              <span className="a-breadcrumbs__text">{item.label}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Breadcrumbs;
