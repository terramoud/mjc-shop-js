"use strict"

require('./main.scss');
import {debounce} from 'lodash';
import {clearAndFillLocalStorage} from './js/starter-data-generator';
import {generatePagination} from './js/pagination';
import {fetchCards, loadMoreCards, updateDisplayedItems} from './js/card-renderer';
import {resetCurrentPageNumber, scrollToPosition} from './js/utils';
import {
    MIN_SCROLL_TO_DISPLAY_BUTTON,
    SCROLL_DURATION,
    DELAY_BETWEEN_THROTTLING,
    TOP_OF_PAGE
} from './js/constants';

history.scrollRestoration = 'manual';
clearAndFillLocalStorage();

window.addEventListener('load', returnToLastScrollPositionAfterReopenPage);

const scrollToTopButton = document.getElementById("scroll-to-top");
scrollToTopButton.addEventListener('click', () => {
    scrollToPosition(TOP_OF_PAGE, SCROLL_DURATION);
});

const debouncedScrollHandler = debounce(handleScroll, DELAY_BETWEEN_THROTTLING);
window.addEventListener("scroll", function () {
    debouncedScrollHandler();
    if (window.scrollY > MIN_SCROLL_TO_DISPLAY_BUTTON) {
        scrollToTopButton.style.display = 'flex';
    } else {
        scrollToTopButton.style.display = 'none';
    }
})

const searchInput = document.getElementById('search-input');
const debouncedSearchHandler = debounce(handleSearch, DELAY_BETWEEN_THROTTLING);
searchInput.addEventListener('input', debouncedSearchHandler);

const categories = document.querySelectorAll('.categories .category-card');
for (const category of categories) {
    category.addEventListener('click', () => {
        renderCardsForClickedCategory(category)
    });
}

function handleScroll() {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
        loadMoreCards();
        generatePagination();
    }
}

function handleSearch() {
    resetCurrentPageNumber();
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim();
    localStorage.setItem('searchQuery', query);
    updatePageContent();
}

function renderCardsForClickedCategory(category) {
    resetCurrentPageNumber();
    localStorage.setItem('searchQuery', "");
    const categoryName = category.querySelector('.category-card-name').innerText;
    localStorage.setItem('category', categoryName);
    updatePageContent();
}

function returnToLastScrollPositionAfterReopenPage() {
    const searchQuery = localStorage.getItem('searchQuery') ?? "";
    if (searchQuery !== "") {
        localStorage.setItem('searchQuery', "");
        resetCurrentPageNumber();
    }
    const category = localStorage.getItem('category') ?? "all";
    if (category !== "all") {
        localStorage.setItem('category', "all");
        resetCurrentPageNumber();
    }
    updatePageContent();
}

function updatePageContent() {
    const cards = fetchCards();
    updateDisplayedItems(cards);
    generatePagination();
}