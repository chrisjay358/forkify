import View from "./view.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");

      if (!btn) return;

      const gotoPage = +btn.dataset.goto;

      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupNextButton(currentPage + 1);
    }

    // Last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupPrevButton(currentPage - 1);
    }

    // Other page
    if (currentPage < numPages) {
      return `${this._generateMarkupPrevButton(
        currentPage - 1
      )} ${this._generateMarkupNextButton(currentPage + 1)}`;

      // Page 1, and there are NO other pages
    }
    return;
  }

  _generateMarkupNextButton(pageNum) {
    return `
      <button data-goto="${pageNum}" class="btn--inline pagination__btn--next">
        <span>Page ${pageNum}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }

  _generateMarkupPrevButton(pageNum) {
    return `
      <button data-goto="${pageNum}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}svg#icon-arrow-left"></use>
        </svg>
        <span>Page ${pageNum}</span>
      </button>
      `;
  }
}

export default new PaginationView();
