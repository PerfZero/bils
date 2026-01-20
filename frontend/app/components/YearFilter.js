'use client';

import React, { useState, useRef, useEffect } from 'react';

const YearFilter = ({ years, selectedYear, onYearChange, placeholder = "Все года" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleYearSelect = (year) => {
    onYearChange(year);
    setIsOpen(false);
  };

  const displayValue = selectedYear || placeholder;

  return (
    <div className="a-field-select a-page-news__date" ref={dropdownRef}>
      <div 
        className="a-field-select__constrain"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="a-field-select__container">
          <div className="a-field-select__wrap">
            <input 
              type="hidden" 
              name="date" 
              value={selectedYear || ''} 
              className="a-field-select__input"
            />
            <div className="a-field-select__placeholder"></div>
            <div className="a-field-select__fake" title={displayValue}>
              {displayValue}
              <div className="a-field-select__icon">
                <svg className="a-svg">
                  <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#icon-old-arrow"></use>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {isOpen && (
          <ul className="a-field-select__list">
            <li 
              className={`a-field-select__item ${!selectedYear ? 'a-field-select__item--active' : ''}`}
              onClick={() => handleYearSelect('')}
            >
              <div className="a-field-select__text" style={{ '--filter-item-text': `'${placeholder}'` }}>
                {placeholder}
              </div>
            </li>
            {years.map((year) => (
              <li 
                key={year}
                className={`a-field-select__item ${selectedYear === year ? 'a-field-select__item--active' : ''}`}
                onClick={() => handleYearSelect(year)}
              >
                <div className="a-field-select__text" style={{ '--filter-item-text': `'${year}'` }}>
                  {year}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default YearFilter;
