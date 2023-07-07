"use strict"

export function resetCurrentPageNumber() {
    localStorage.setItem('currentPageNumber', '1');
}

export function scrollToPosition(scrollPosition, duration) {
    const startPosition = window.scrollY;
    const distance = scrollPosition - startPosition;
    const startTime = performance.now();

    function scrollAnimation(currentTime) {
        const elapsedTime = currentTime - startTime;
        const scrollProgress = Math.min(elapsedTime / duration, 1);
        const easing = quadraticEaseOut(scrollProgress);
        const scrollOffset = startPosition + distance * easing;

        window.scrollTo(0, scrollOffset);

        if (elapsedTime < duration) {
            requestAnimationFrame(scrollAnimation);
        }
    }

    function quadraticEaseOut(animationProgress) {
        return animationProgress * (2 - animationProgress);
    }

    requestAnimationFrame(scrollAnimation);
}