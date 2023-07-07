"use strict"

import { fetchCards, renderCards } from './card-renderer';
import {
    NUMBER_BUTTONS_FOR_FULL_SIZE_PAGINATION,
    MIN_VALUE_PREV_PAGE,
} from './constants';

export function generatePagination() {
    let paginationButtons = createPaginationHtml();
    setListenersToPaginationButtons(paginationButtons);
}

function createPaginationHtml() {
    const totalPages = +localStorage.getItem('totalPages');
    const currentPage = +localStorage.getItem('currentPageNumber') || 1;
    const paginationContainer = document.getElementById('pagination');
    if (totalPages < NUMBER_BUTTONS_FOR_FULL_SIZE_PAGINATION) {
        createMiniHTMLPagination(paginationContainer, totalPages);
    }
    if (totalPages >= NUMBER_BUTTONS_FOR_FULL_SIZE_PAGINATION) {
        const maxValueNextPage = totalPages - 1;
        const minValueNextPage = NUMBER_BUTTONS_FOR_FULL_SIZE_PAGINATION - 1;
        let nextPage = Math.max(currentPage + 1, minValueNextPage);
        nextPage = Math.min(nextPage, maxValueNextPage);
        const pageBetweenPrevAndNextPages = nextPage - 1;
        const prevPage = Math.max(pageBetweenPrevAndNextPages - 1, MIN_VALUE_PREV_PAGE);
        paginationContainer.innerHTML = `
            <li><a href="#">1</a></li>
            <li>...</li>
            <li><a href="#">${prevPage}</a></li>
            <li><a href="#">${pageBetweenPrevAndNextPages}</a></li>
            <li><a href="#">${nextPage}</a></li>
            <li>...</li>
            <li><a href="#">${totalPages}</a></li>
        `;
    }
    let paginationButtons = Array.from(document.querySelectorAll('#pagination li a'));
    let activePage = paginationButtons.find(a => +a.innerText === currentPage);
    activePage.classList.add("active");
    return paginationButtons;
}

function createMiniHTMLPagination(paginationContainer, totalPages) {
    paginationContainer.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        paginationContainer.innerHTML += `<li><a href="#">${i}</a></li>`;
    }
}

function setListenersToPaginationButtons(paginationButtons) {
    paginationButtons.forEach(paginationButton => {
        let pageNumber = paginationButton.innerText;
        paginationButton.addEventListener('click', () => renderPageForClickedPaginationButton(pageNumber));
    });
}

function renderPageForClickedPaginationButton(pageNumber) {
    document.querySelector(".coupon-card-wrapper").innerHTML = "";
    localStorage.setItem('currentPageNumber', pageNumber);
    let cards = fetchCards();
    renderCards(cards);
    generatePagination();
}