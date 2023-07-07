"use strict"

import {LIMIT_CARDS_PER_PAGE, NUMBER_GENERATED_CARDS} from './constants';

export function clearAndFillLocalStorage() {
    const existingCards = localStorage.getItem('cards');
    const existingCurrentPage = localStorage.getItem('currentPageNumber');
    const existingTotalPages = localStorage.getItem('totalPages');
    if (!existingCards || !existingCurrentPage || !existingTotalPages) {
        localStorage.clear();
        localStorage.setItem('currentPageNumber', '1');
        localStorage.setItem('searchQuery', "");
        localStorage.setItem('category', "all");
        let cards = sortByCreatedDateInDesc(getRandomCards());
        let cardsJSON = JSON.stringify(cards);
        localStorage.setItem("cards", cardsJSON);
        console.log('LocalStorage has been cleared and filled with random cards.');
    } else {
        console.log('LocalStorage already contains data. Skipping clearing and filling process.');
    }
}

function sortByCreatedDateInDesc(array) {
    return array.sort((a, b) => b.createdDate - a.createdDate);
}

function getRandomCards() {
    const arrayCategories = [
        'beauty salons', 'for motorists', 'sightseeing ride', 'for gourmets', 'photosession'
    ];
    let randomCards = [];
    for (let i = 0; i < NUMBER_GENERATED_CARDS; i++) {
        let randomIndex = Math.floor(Math.random() * arrayCategories.length);
        let card = generateRandomCard(i, arrayCategories[randomIndex]);
        card.pageNumber = Math.ceil(i / LIMIT_CARDS_PER_PAGE) || 1;
        randomCards.push(card);
    }
    return randomCards;
}

function generateRandomCard(id, category) {
    let card = {};
    card.name = `Coupon${id} ${getRandomWords(2)}`;
    card.description = getRandomWords(3);
    card.expireTime = "Expires in " + Math.floor(Math.random() * 10) + " days";
    card.price = "$" + Math.floor(Math.random() * 500);
    card.createdDate = new Date().getTime() + (id * 100);
    card.category = category;
    return card;
}

function getRandomWords(count) {
    const arrayWords = [
        'apple', 'banana', 'carrot', 'dog', 'elephant', 'fish', 'grape', 'horse', 'ice', 'cream', 'jacket',
        'kiwi', 'lemon', 'mango', 'nut', 'orange', 'pear', 'quinoa', 'raspberry', 'strawberry', 'tomato',
        'umbrella', 'violet', 'watermelon', 'xylophone', 'yogurt', 'zebra', 'almond', 'broccoli', 'cucumber',
        'dragonfruit', 'eggplant', 'fig', 'garlic', 'honeydew', 'ice', 'jackfruit', 'kale', 'lime', 'melon',
        'nectarine', 'olive', 'pepper', 'quince', 'radish', 'spinach', 'tangerine', 'ugli', 'fruit', 'vanilla',
        'watercress', 'xigua', 'yam', 'zucchini', 'avocado', 'blueberry', 'cherry', 'date', 'elderberry',
        'feijoa', 'grapefruit', 'huckleberry', 'itapopo', 'jabuticaba', 'kiwifruit', 'lemonade', 'mangosteen',
        'nance', 'olallieberry', 'papaya', 'quince', 'rambutan', 'soursop', 'tamarind', 'ugni', 'vavai',
        'white', 'currant', 'ximenia', 'yellow', 'passionfruit', 'zhe'
    ];
    let words = '';
    for (let i = 0; i < count; i++) {
        let randomIndex = Math.floor(Math.random() * arrayWords.length);
        words += arrayWords[randomIndex] + " ";
    }
    return words;
}