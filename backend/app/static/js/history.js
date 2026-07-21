// =========================================
// History Dashboard
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // Elements
    // ==============================

    const grid = document.querySelector(".history-grid");

    const cards = Array.from(
        document.querySelectorAll(".history-card")
    );

    const searchInput = document.getElementById("searchInput");

    const genreFilter = document.getElementById("genreFilter");

    const sortSelect = document.getElementById("sortSelect");

    const confidenceBars =
        document.querySelectorAll(".confidence-fill");


    // ==============================
    // Animate Cards
    // ==============================

    function animateCards() {

        cards.forEach((card, index) => {

            card.style.opacity = "0";

            card.style.transform =

                "translateY(40px)";

            setTimeout(() => {

                card.style.transition =

                    "all .6s ease";

                card.style.opacity = "1";

                card.style.transform =

                    "translateY(0)";

            }, index * 120);

        });

    }


    // ==============================
    // Animate Progress Bars
    // ==============================

    function animateBars() {

        confidenceBars.forEach(bar => {

            const width = bar.style.width;

            bar.style.width = "0";

            setTimeout(() => {

                bar.style.transition =

                    "width 1.2s ease";

                bar.style.width = width;

            }, 400);

        });

    }


    // ==============================
    // Hover Animation
    // ==============================

    cards.forEach(card => {

        card.addEventListener(

            "mouseenter",

            () => {

                card.style.transform =

                    "translateY(-8px)";

            }

        );

        card.addEventListener(

            "mouseleave",

            () => {

                card.style.transform =

                    "translateY(0px)";

            }

        );

    });


    // ==============================
    // Helper Function
    // ==============================

    function getVisibleCards() {

        return cards.filter(card =>

            card.style.display !== "none"

        );

    }


    // ==============================
    // Initialize Animations
    // ==============================

    animateCards();

    animateBars();

    // ==============================
    // Search + Filter + Sort
    // ==============================

    function updateHistory() {

        const searchText =

            searchInput

                ? searchInput.value.trim().toLowerCase()

                : "";

        const selectedGenre =

            genreFilter

                ? genreFilter.value.toLowerCase()

                : "all";


        // --------------------------
        // Search & Filter
        // --------------------------

        cards.forEach(card => {

            const filename =

                card.dataset.name;

            const genre =

                card.dataset.genre;


            const matchesSearch =

                filename.includes(searchText);


            const matchesGenre =

                selectedGenre === "all"

                ||

                genre === selectedGenre;


            if (

                matchesSearch

                &&

                matchesGenre

            ) {

                card.style.display = "";

            }

            else {

                card.style.display = "none";

            }

        });


        // --------------------------
        // Sort Visible Cards
        // --------------------------

        let visibleCards =

            getVisibleCards();


        switch (

            sortSelect

                ? sortSelect.value

                : "new"

        ) {

            case "high":

                visibleCards.sort(

                    (a, b) =>

                        parseFloat(

                            b.dataset.confidence

                        )

                        -

                        parseFloat(

                            a.dataset.confidence

                        )

                );

                break;


            case "low":

                visibleCards.sort(

                    (a, b) =>

                        parseFloat(

                            a.dataset.confidence

                        )

                        -

                        parseFloat(

                            b.dataset.confidence

                        )

                );

                break;


            case "old":

                visibleCards.sort(

                    (a, b) =>

                        parseFloat(

                            a.dataset.date

                        )

                        -

                        parseFloat(

                            b.dataset.date

                        )

                );

                break;


            default:

                visibleCards.sort(

                    (a, b) =>

                        parseFloat(

                            b.dataset.date

                        )

                        -

                        parseFloat(

                            a.dataset.date

                        )

                );

        }


        // --------------------------
        // Rebuild Grid
        // --------------------------

        visibleCards.forEach(card => {

            grid.appendChild(card);

        });


        updateEmptyState();

    }


    // ==============================
    // Event Listeners
    // ==============================

    if (searchInput) {

        searchInput.addEventListener(

            "input",

            updateHistory

        );

    }


    if (genreFilter) {

        genreFilter.addEventListener(

            "change",

            updateHistory

        );

    }


    if (sortSelect) {

        sortSelect.addEventListener(

            "change",

            updateHistory

        );

    }

    // ==============================
    // Empty Results Message
    // ==============================

    function updateEmptyState() {

        const visibleCards = getVisibleCards();

        let emptyState =

            document.querySelector(".search-empty");

        if (visibleCards.length === 0) {

            if (!emptyState) {

                emptyState =

                    document.createElement("div");

                emptyState.className =

                    "search-empty";

                emptyState.innerHTML = `

                    <i class="fa-solid fa-magnifying-glass"></i>

                    <h2>No Predictions Found</h2>

                    <p>

                        Try another search keyword or filter.

                    </p>

                `;

                grid.appendChild(emptyState);

            }

        }

        else {

            if (emptyState) {

                emptyState.remove();

            }

        }

    }


    // ==============================
    // Smooth Fade Animation
    // ==============================

    function fadeVisibleCards() {

        getVisibleCards().forEach((card, index) => {

            card.style.opacity = "0";

            card.style.transform =

                "translateY(20px)";

            setTimeout(() => {

                card.style.transition =

                    "all .35s ease";

                card.style.opacity = "1";

                card.style.transform =

                    "translateY(0px)";

            }, index * 40);

        });

    }


    // ==============================
    // Refresh after Search/Sort
    // ==============================

    function refreshHistory() {

        updateHistory();

        fadeVisibleCards();

    }


    // Replace listeners with animated version

    if (searchInput) {

        searchInput.removeEventListener(

            "input",

            updateHistory

        );

        searchInput.addEventListener(

            "input",

            refreshHistory

        );

    }

    if (genreFilter) {

        genreFilter.removeEventListener(

            "change",

            updateHistory

        );

        genreFilter.addEventListener(

            "change",

            refreshHistory

        );

    }

    if (sortSelect) {

        sortSelect.removeEventListener(

            "change",

            updateHistory

        );

        sortSelect.addEventListener(

            "change",

            refreshHistory

        );

    }


    // ==============================
    // Initial Refresh
    // ==============================

    refreshHistory();

    console.log(

        "History Dashboard Loaded Successfully"

    );

});    