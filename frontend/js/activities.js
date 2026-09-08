// =====================================================
// MUST ACTIVITIES
// SEARCH, FILTER AND VIEW CONTROLS
// =====================================================

const activitySearch =
    document.getElementById("activitySearch");

const activityType =
    document.getElementById("activityType");

const activityDay =
    document.getElementById("activityDay");

const activityCards =
    document.querySelectorAll(".activity-card");

const activityCount =
    document.getElementById("upcomingCount");

const noResults =
    document.getElementById("activityNoResults");

const activitiesGrid =
    document.getElementById("activitiesGrid");

const cardView =
    document.getElementById("cardView");

const listView =
    document.getElementById("listView");


// =====================================================
// FILTER ACTIVITIES
// =====================================================

function filterActivities() {

    const search =
        activitySearch.value
            .toLowerCase()
            .trim();

    const type =
        activityType.value;

    const day =
        activityDay.value;

    let visibleActivities = 0;


    activityCards.forEach(function (card) {

        const name =
            card.dataset.name.toLowerCase();

        const cardType =
            card.dataset.type;

        const cardDay =
            card.dataset.day;


        const matchesSearch =
            name.includes(search);

        const matchesType =
            type === "all" ||
            cardType === type;

        const matchesDay =
            day === "all" ||
            cardDay === day;


        if (
            matchesSearch &&
            matchesType &&
            matchesDay
        ) {

            card.classList.remove("hidden");

            visibleActivities++;

        } else {

            card.classList.add("hidden");

        }

    });


    activityCount.textContent =
        visibleActivities;


    if (visibleActivities === 0) {

        noResults.classList.add("show");

    } else {

        noResults.classList.remove("show");

    }

}


// =====================================================
// SEARCH
// =====================================================

if (activitySearch) {

    activitySearch.addEventListener(
        "input",
        filterActivities
    );

}


// =====================================================
// TYPE FILTER
// =====================================================

if (activityType) {

    activityType.addEventListener(
        "change",
        filterActivities
    );

}


// =====================================================
// DAY FILTER
// =====================================================

if (activityDay) {

    activityDay.addEventListener(
        "change",
        filterActivities
    );

}


// =====================================================
// CARD VIEW
// =====================================================

if (cardView) {

    cardView.addEventListener("click", function () {

        activitiesGrid.classList.remove(
            "list-view"
        );

        cardView.classList.add("active");

        listView.classList.remove("active");

    });

}


// =====================================================
// LIST VIEW
// =====================================================

if (listView) {

    listView.addEventListener("click", function () {

        activitiesGrid.classList.add(
            "list-view"
        );

        listView.classList.add("active");

        cardView.classList.remove("active");

    });

}
