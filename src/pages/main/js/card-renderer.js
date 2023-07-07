"use strict"

import {LIMIT_CARDS_PER_PAGE} from './constants';

export function fetchCards() {
    let searchQuery = localStorage.getItem('searchQuery') ?? "";
    let category = localStorage.getItem('category') ?? "all";
    let currentPage = +localStorage.getItem('currentPageNumber') || 1;
    let cards = JSON.parse(localStorage.getItem('cards'));
    if (!cards || !Array.isArray(cards) || cards.length === 0) {
        return [];
    }
    if (category !== "all") {
        cards = cards.filter(card => card.category === category);
    }
    if (searchQuery !== "") {
        cards = cards.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    if (cards.length === 0) {
        return [];
    }
    injectPaginationToCardList(cards);
    return cards.filter(card => +card.pageNumber === currentPage);
}

function injectPaginationToCardList(cardsList) {
    for (let i = 0; i < cardsList.length; i++) {
        cardsList[i].pageNumber = Math.ceil(i / LIMIT_CARDS_PER_PAGE) || 1;
    }
    localStorage.setItem('totalPages', cardsList.at(-1).pageNumber);
    return cardsList;
}

export function renderCards(cards) {
    for (let i = 0; i < cards.length; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML =
            `<div class="card-image"></div>
            <div class="card-sections-wrapper">
                <div class="card-section">
                    <div class="card-name">${cards[i].name}</div>
                    <div class="card-like-button">
                        <span class="material-icons">favorite</span>
                    </div>
                </div>
                <div class="card-section">
                    <div class="card-description">${cards[i].description}</div>
                    <div class="card-expire-time">${cards[i].expireTime}</div>
                </div>
                <div class="card-section">
                    <div class="card-price">${cards[i].price}</div>
                    <button class="button-cancel add-to-card">Add to Cart</button>
                </div>
            </div>`;
        const cardContainer = document.querySelector(".coupon-card-wrapper");
        cardContainer.appendChild(card);
    }
}

export function loadMoreCards() {
    let cards = getNextCards();
    if (cards.length === 0) {
        return;
    }
    renderCards(cards);
}

function getNextCards() {
    let currentPage = +localStorage.getItem('currentPageNumber') || 1;
    let totalPages = +localStorage.getItem('totalPages');
    let nextPage = currentPage + 1;
    if (nextPage > totalPages) {
        return [];
    }
    localStorage.setItem('currentPageNumber', String(nextPage));
    return fetchCards();
}

export function updateDisplayedItems(items) {
    const cardContainer = document.querySelector(".coupon-card-wrapper");
    cardContainer.innerHTML = '';
    renderCards(items);
}