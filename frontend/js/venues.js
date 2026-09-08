// =====================================================
// MUST VENUES
// SEARCH, FILTERS AND VENUE DETAILS
// =====================================================


const venueSearch =
    document.getElementById("venueSearch");

const venueType =
    document.getElementById("venueType");

const venueStatus =
    document.getElementById("venueStatus");

const venueCards =
    document.querySelectorAll(".venue-card");

const venueResultCount =
    document.getElementById("venueResultCount");

const venueNoResults =
    document.getElementById("venueNoResults");


// =====================================================
// FILTER VENUES
// =====================================================

function filterVenues() {

    const search =
        venueSearch.value
            .toLowerCase()
            .trim();

    const type =
        venueType.value;

    const status =
        venueStatus.value;

    let visible = 0;


    venueCards.forEach(function(card) {

        const name =
            card.dataset.name
                .toLowerCase();

        const cardType =
            card.dataset.type;

        const cardStatus =
            card.dataset.status;


        const matchesSearch =
            name.includes(search);

        const matchesType =
            type === "all" ||
            cardType === type;

        const matchesStatus =
            status === "all" ||
            cardStatus === status;


        if (
            matchesSearch &&
            matchesType &&
            matchesStatus
        ) {

            card.classList.remove("hidden");

            visible++;

        } else {

            card.classList.add("hidden");

        }

    });


    venueResultCount.textContent =
        visible + (visible === 1
            ? " venue"
            : " venues");


    if (visible === 0) {

        venueNoResults.classList.add(
            "show"
        );

    } else {

        venueNoResults.classList.remove(
            "show"
        );

    }

}


// =====================================================
// SEARCH
// =====================================================

if (venueSearch) {

    venueSearch.addEventListener(
        "input",
        filterVenues
    );

}


// =====================================================
// TYPE FILTER
// =====================================================

if (venueType) {

    venueType.addEventListener(
        "change",
        filterVenues
    );

}


// =====================================================
// STATUS FILTER
// =====================================================

if (venueStatus) {

    venueStatus.addEventListener(
        "change",
        filterVenues
    );

}


// =====================================================
// VENUE MODAL
// =====================================================

const venueModal =
    document.getElementById("venueModal");

const modalOverlay =
    document.getElementById("modalOverlay");

const modalClose =
    document.getElementById("modalClose");

const modalVenueName =
    document.getElementById("modalVenueName");

const modalVenueDescription =
    document.getElementById(
        "modalVenueDescription"
    );

const modalCapacity =
    document.getElementById(
        "modalCapacity"
    );

const modalLocation =
    document.getElementById(
        "modalLocation"
    );

const modalAvailability =
    document.getElementById(
        "modalAvailability"
    );


// =====================================================
// VENUE INFORMATION
// =====================================================

const venueInformation = {

    "University Chapel": {

        description:
            "A dedicated worship space suitable for Christian services, prayer and approved spiritual activities.",

        capacity:
            "250",

        location:
            "Main Campus",

        availability:
            "Available"

    },


    "University Hall": {

        description:
            "A large multipurpose venue used for major university events, meetings and approved community gatherings.",

        capacity:
            "600",

        location:
            "Main Campus",

        availability:
            "Currently in use"

    },


    "Muslim Prayer Hall": {

        description:
            "A designated prayer space for Muslim students and approved Islamic activities.",

        capacity:
            "180",

        location:
            "Student Centre",

        availability:
            "Available"

    },


    "Student Centre": {

        description:
            "A flexible student space suitable for fellowships, discussions and approved student activities.",

        capacity:
            "300",

        location:
            "Student Affairs Area",

        availability:
            "Available"

    },


    "Conference Room": {

        description:
            "A formal meeting space for seminars, dialogue forums, planning meetings and university-approved activities.",

        capacity:
            "100",

        location:
            "Administration Block",

        availability:
            "Currently in use"

    }

};


// =====================================================
// OPEN MODAL
// =====================================================

const venueButtons =
    document.querySelectorAll(
        ".venue-details-button"
    );


venueButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            const venueName =
                button.dataset.venue;

            const venue =
                venueInformation[
                    venueName
                ];


            if (!venue) {
                return;
            }


            modalVenueName.textContent =
                venueName;

            modalVenueDescription.textContent =
                venue.description;

            modalCapacity.textContent =
                venue.capacity;

            modalLocation.textContent =
                venue.location;

            modalAvailability.textContent =
                venue.availability;


            venueModal.classList.add(
                "show"
            );

            document.body.style.overflow =
                "hidden";

        }
    );

});


// =====================================================
// CLOSE MODAL
// =====================================================

function closeVenueModal() {

    venueModal.classList.remove(
        "show"
    );

    document.body.style.overflow =
        "";

}


if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeVenueModal
    );

}


if (modalOverlay) {

    modalOverlay.addEventListener(
        "click",
        closeVenueModal
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
            venueModal.classList.contains("show")
        ) {

            closeVenueModal();

        }

    }
);
