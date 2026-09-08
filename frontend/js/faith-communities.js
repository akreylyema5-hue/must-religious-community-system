// =====================================================
// FAITH COMMUNITIES
// SEARCH AND FILTER
// =====================================================

const searchInput =
    document.getElementById("communitySearch");

const categoryFilter =
    document.getElementById("faithFilter");

const communityCards =
    document.querySelectorAll(".community-card");

const communityCount =
    document.getElementById("communityCount");

const noResults =
    document.getElementById("noResults");


function filterCommunities() {

    const searchValue =
        searchInput.value.toLowerCase().trim();

    const categoryValue =
        categoryFilter.value;

    let visibleCount = 0;


    communityCards.forEach(function (card) {

        const name =
            card.dataset.name.toLowerCase();

        const category =
            card.dataset.category;


        const matchesSearch =
            name.includes(searchValue);

        const matchesCategory =
            categoryValue === "all" ||
            category === categoryValue;


        if (matchesSearch && matchesCategory) {

            card.classList.remove("hidden");

            visibleCount++;

        } else {

            card.classList.add("hidden");

        }

    });


    communityCount.textContent =
        visibleCount;


    if (visibleCount === 0) {

        noResults.classList.add("show");

    } else {

        noResults.classList.remove("show");

    }

}


// Search while typing

if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterCommunities
    );

}


// Filter by category

if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        filterCommunities
    );

}
