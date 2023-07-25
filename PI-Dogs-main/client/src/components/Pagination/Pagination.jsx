import React from 'react';
import style from './Pagination.module.css';
import { useEffect } from 'react';

const Pagination = ({ dogsPerPage, dogs, currentPage, pagination }) => {
    const pageNumber = Math.ceil(dogs / dogsPerPage);
  
    const handlePrevClick = () => {
      if (currentPage > 1) {
        pagination(currentPage - 1);
      }
    };
  
    const handleNextClick = () => {
      if (currentPage < pageNumber) {
        pagination(currentPage + 1);
      }
    };
    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, [currentPage]);

  
    const goToFirstPage = () => {
      pagination(1);
    };
  
    const goToLastPage = () => {
      pagination(pageNumber);
    };
  
    return (
      <nav className={style.Pagination}>
        <ul className={style.PageNumbers}>
          <li>
            <button
              className={style.PageNumber}
              type="button"
              onClick={goToFirstPage}
              disabled={currentPage === 1}
            >
              {'<<'}
            </button>
          </li>
          <li>
            <button
              className={style.PageNumber}
              type="button"
              onClick={handlePrevClick}
              disabled={currentPage === 1}
            >
              {'<'}
            </button>
          </li>
          <li>
            <span className={style.PageInfo}>
              {currentPage} / {pageNumber}
            </span>
          </li>
          <li>
            <button
              className={style.PageNumber}
              type="button"
              onClick={handleNextClick}
              disabled={currentPage === pageNumber}
            >
              {'>'}
            </button>
          </li>
          <li>
            <button
              className={style.PageNumber}
              type="button"
              onClick={goToLastPage}
              disabled={currentPage === pageNumber}
            >
              {'>>'}
            </button>
          </li>
        </ul>
      </nav>
    );
};
  
export default Pagination;