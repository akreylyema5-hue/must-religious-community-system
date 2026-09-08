// =====================================================
// MUST SCHEDULE
// =====================================================

const scheduleFilter =
    document.getElementById("scheduleFilter");

const previousWeek =
    document.getElementById("previousWeek");

const nextWeek =
    document.getElementById("nextWeek");

const todayButton =
    document.getElementById("todayButton");

const weekTitle =
    document.getElementById("weekTitle");


// =====================================================
// SAMPLE WEEK DATA
// =====================================================

const weeks = [

    "14 – 20 September 2026",

    "21 – 27 September 2026",

    "28 September – 4 October 2026",

    "5 – 11 October 2026"

];

let currentWeek = 0;


// =====================================================
// UPDATE WEEK
// =====================================================

function updateWeek() {

    weekTitle.textContent =
        weeks[currentWeek];

}


// =====================================================
// PREVIOUS WEEK
// =====================================================

if (previousWeek) {

    previousWeek.addEventListener(
        "click",
        function () {

            if (currentWeek > 0) {

                currentWeek--;

                updateWeek();

            }

        }
    );

}


// =====================================================
// NEXT WEEK
// =====================================================

if (nextWeek) {

    nextWeek.addEventListener(
        "click",
        function () {

            if (currentWeek < weeks.length - 1) {

                currentWeek++;

                updateWeek();

            }

        }
    );

}


// =====================================================
// TODAY
// =====================================================

if (todayButton) {

    todayButton.addEventListener(
        "click",
        function () {

            currentWeek = 0;

            updateWeek();

        }
    );

}


// =====================================================
// DESKTOP FILTER
// =====================================================

if (scheduleFilter) {

    scheduleFilter.addEventListener(
        "change",
        function () {

            const selected =
                scheduleFilter.value;

            const events =
                document.querySelectorAll(
                    ".schedule-event"
                );

            events.forEach(function (event) {

                const type =
                    event.dataset.type;

                if (
                    selected === "all" ||
                    selected === type
                ) {

                    event.style.display =
                        "flex";

                } else {

                    event.style.display =
                        "none";

                }

            });


            // Mobile events

            const mobileEvents =
                document.querySelectorAll(
                    ".mobile-event"
                );

            mobileEvents.forEach(function (event) {

                const type =
                    event.dataset.type;

                if (
                    selected === "all" ||
                    selected === type
                ) {

                    event.style.display =
                        "flex";

                } else {

                    event.style.display =
                        "none";

                }

            });

        }
    );

}
