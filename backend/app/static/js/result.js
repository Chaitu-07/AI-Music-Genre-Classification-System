/*=====================================================
    AI MUSIC CLASSIFIER
    RESULT.JS
=====================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const resultCard = document.querySelector(".result-card");
    const progressBar = document.querySelector(".progress-bar");
    const smallBars = document.querySelectorAll(".small-bar");

    // If this isn't the result page, stop.
    if (!resultCard) {
        return;
    }

    // ==========================================
    // Card Animation
    // ==========================================

    resultCard.style.opacity = "0";
    resultCard.style.transform = "translateY(40px)";

    setTimeout(() => {

        resultCard.style.transition = "all .7s ease";
        resultCard.style.opacity = "1";
        resultCard.style.transform = "translateY(0)";

    }, 150);

    // ==========================================
    // Main Confidence Bar
    // ==========================================

    if (progressBar) {

        const value = parseFloat(
            progressBar.dataset.value
        ) || 0;

        progressBar.style.width = "0%";

        setTimeout(() => {

            progressBar.style.width = value + "%";

        }, 400);

    }

    // ==========================================
    // Top Prediction Bars
    // ==========================================

    smallBars.forEach((bar, index) => {

        const value = parseFloat(
            bar.dataset.value
        ) || 0;

        bar.style.width = "0%";

        setTimeout(() => {

            bar.style.width = value + "%";

        }, 700 + index * 250);

    });

    // ==========================================
    // Hover Effect
    // ==========================================

    resultCard.addEventListener("mouseenter", () => {

        resultCard.style.transform =
            "translateY(-5px)";

    });

    resultCard.addEventListener("mouseleave", () => {

        resultCard.style.transform =
            "translateY(0)";

    });

    console.log("result.js Loaded");

});