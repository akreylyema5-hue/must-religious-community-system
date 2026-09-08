// =====================================================
// MUST ANNOUNCEMENTS
// SEARCH, FILTER AND READ MORE
// =====================================================


const announcementSearch =
    document.getElementById(
        "announcementSearch"
    );

const announcementCategory =
    document.getElementById(
        "announcementCategory"
    );

const announcementPeriod =
    document.getElementById(
        "announcementPeriod"
    );
    

const announcementCards =
    document.querySelectorAll(
        ".announcement-card"
    );

const announcementCount =
    document.getElementById(
        "announcementCount"
    );

const announcementNoResults =
    document.getElementById(
        "announcementNoResults"
    );


// =====================================================
// FILTER ANNOUNCEMENTS
// =====================================================

function filterAnnouncements() {

    const search =
        announcementSearch.value
            .toLowerCase()
            .trim();

    const category =
        announcementCategory.value;

    const period =
        announcementPeriod.value;

    let visible = 0;


    announcementCards.forEach(
        function(card) {

            const cardCategory =
                card.dataset.category;

            const cardPeriod =
                card.dataset.period;

            const cardSearch =
                card.dataset.search
                    .toLowerCase();


            const matchesSearch =
                cardSearch.includes(search);

            const matchesCategory =
                category === "all" ||
                cardCategory === category;

            const matchesPeriod =
                period === "all" ||
                cardPeriod === period;


            if (
                matchesSearch &&
                matchesCategory &&
                matchesPeriod
            ) {

                card.classList.remove(
                    "hidden"
                );

                visible++;

            } else {

                card.classList.add(
                    "hidden"
                );

            }

        }
    );


    announcementCount.textContent =
        visible +
        (
            visible === 1
                ? " announcement"
                : " announcements"
        );


    if (visible === 0) {

        announcementNoResults.classList.add(
            "show"
        );

    } else {

        announcementNoResults.classList.remove(
            "show"
        );

    }

}


// =====================================================
// SEARCH EVENT
// =====================================================

if (announcementSearch) {

    announcementSearch.addEventListener(
        "input",
        filterAnnouncements
    );

}


// =====================================================
// CATEGORY EVENT
// =====================================================

if (announcementCategory) {

    announcementCategory.addEventListener(
        "change",
        filterAnnouncements
    );

}


// =====================================================
// PERIOD EVENT
// =====================================================

if (announcementPeriod) {

    announcementPeriod.addEventListener(
        "change",
        filterAnnouncements
    );

}


// =====================================================
// MODAL
// =====================================================

const announcementModal =
    document.getElementById(
        "announcementModal"
    );

const announcementModalOverlay =
    document.getElementById(
        "announcementModalOverlay"
    );

const announcementModalClose =
    document.getElementById(
        "announcementModalClose"
    );

const modalCloseButton =
    document.getElementById(
        "modalCloseButton"
    );

const modalAnnouncementTitle =
    document.getElementById(
        "modalAnnouncementTitle"
    );

const modalAnnouncementContent =
    document.getElementById(
        "modalAnnouncementContent"
    );


// =====================================================
// OPEN ANNOUNCEMENT
// =====================================================

const readButtons =
    document.querySelectorAll(
        ".read-button"
    );


readButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                const title =
                    button.dataset.title;

                const content =
                    button.dataset.content;


                modalAnnouncementTitle.textContent =
                    title;

                modalAnnouncementContent.textContent =
                    content;


                announcementModal.classList.add(
                    "show"
                );


                document.body.style.overflow =
                    "hidden";

            }
        );

    }
);


// =====================================================
// CLOSE ANNOUNCEMENT
// =====================================================

function closeAnnouncementModal() {

    announcementModal.classList.remove(
        "show"
    );

    document.body.style.overflow =
        "";

}


if (announcementModalClose) {

    announcementModalClose.addEventListener(
        "click",
        closeAnnouncementModal
    );

}


if (modalCloseButton) {

    modalCloseButton.addEventListener(
        "click",
        closeAnnouncementModal
    );

}


if (announcementModalOverlay) {

    announcementModalOverlay.addEventListener(
        "click",
        closeAnnouncementModal
    );

}


// =====================================================
// ESCAPE KEY
// =====================================================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape" &&
            announcementModal.classList.contains(
                "show"
            )
        ) {

            closeAnnouncementModal();

        }

    }
);

