/* =========================================================
   MUST STUDENT DASHBOARD
   FRONTEND ↔ SPRING BOOT CONNECTION
========================================================= */

const API_URL = "http://localhost:8080/api";


/* =========================================================
   AUTHENTICATION
========================================================= */

function getToken() {
    return localStorage.getItem("mustToken");
}


function getUser() {
    try {
        return JSON.parse(
            localStorage.getItem("mustUser")
        );
    } catch (error) {
        return null;
    }
}


/* =========================================================
   AUTHENTICATED API REQUEST
========================================================= */

async function authenticatedRequest(endpoint, options = {}) {

    const token = getToken();

    if (!token) {
        window.location.href = "login.html";
        return null;
    }

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        "Authorization": `Bearer ${token}`
    };

    try {

        const response = await fetch(
            `${API_URL}${endpoint}`,
            {
                ...options,
                headers
            }
        );

        if (response.status === 401 ||
            response.status === 403) {

            localStorage.removeItem("mustToken");
            localStorage.removeItem("mustUser");

            window.location.href = "login.html";

            return null;
        }

        const text = await response.text();

        let data = null;

        if (text) {
            try {
                data = JSON.parse(text);
            } catch {
                data = text;
            }
        }

        if (!response.ok) {

            const message =
                data?.message ||
                data?.error ||
                data ||
                `Request failed (${response.status})`;

            throw new Error(message);
        }

        return data;

    } catch (error) {

        console.error(
            "API request error:",
            error
        );

        throw error;
    }
}


/* =========================================================
   LOGOUT
========================================================= */

function logout() {

    localStorage.removeItem("mustToken");
    localStorage.removeItem("mustUser");

    window.location.href = "login.html";
}


/* =========================================================
   DISPLAY STUDENT
========================================================= */

function displayStudent(user) {

    if (!user) {
        return;
    }

    const fullName =
        user.fullName || "Student";

    const registrationNumber =
        user.registrationNumber || "N/A";

    const email =
        user.email || "N/A";

    const programme =
        user.programme ||
        user.currentProgramme ||
        user.currentProgram ||
        "Not provided";


    /* Header */

    const headerName =
        document.getElementById(
            "headerStudentName"
        );

    if (headerName) {
        headerName.textContent = fullName;
    }


    /* Welcome */

    const welcomeName =
        document.getElementById(
            "welcomeName"
        );

    if (welcomeName) {
        welcomeName.textContent = fullName;
    }


    /* Sidebar */

    const profileName =
        document.getElementById(
            "profileName"
        );

    if (profileName) {
        profileName.textContent = fullName;
    }


    const profileReg =
        document.getElementById(
            "profileReg"
        );

    if (profileReg) {
        profileReg.textContent =
            registrationNumber;
    }


    /* Profile */

    const studentName =
        document.getElementById(
            "studentName"
        );

    if (studentName) {
        studentName.textContent =
            fullName;
    }


    const studentReg =
        document.getElementById(
            "studentReg"
        );

    if (studentReg) {
        studentReg.textContent =
            registrationNumber;
    }


    const studentEmail =
        document.getElementById(
            "studentEmail"
        );

    if (studentEmail) {
        studentEmail.textContent =
            email;
    }


    const studentProgram =
        document.getElementById(
            "studentProgram"
        );

    if (studentProgram) {
        studentProgram.textContent =
            programme;
    }


    const profileProgram =
        document.getElementById(
            "profileProgram"
        );

    if (profileProgram) {
        profileProgram.textContent =
            programme;
    }


    /* Current programme form field */

    const currentProgramme =
        document.getElementById(
            "formCurrentProgram"
        );

    if (
        currentProgramme &&
        programme !== "Not provided"
    ) {

        currentProgramme.value =
            programme;
    }
}


/* =========================================================
   LOAD STUDENT PROFILE
========================================================= */

async function loadStudentProfile() {

    try {

        const profile =
            await authenticatedRequest(
                "/student-profile"
            );

        if (profile) {

            console.log(
                "Student profile:",
                profile
            );

            const user =
                getUser() || {};

            const mergedUser = {
                ...user,
                ...profile
            };

            displayStudent(
                mergedUser
            );

            localStorage.setItem(
                "mustUser",
                JSON.stringify(
                    mergedUser
                )
            );
        }

    } catch (error) {

        console.warn(
            "Could not load student profile:",
            error.message
        );

        /*
         * Use information from login
         * if profile endpoint fails.
         */

        displayStudent(
            getUser()
        );
    }
}


/* =========================================================
   LOAD PROGRAMME CHANGE APPLICATION
========================================================= */

async function loadProgramChange() {

    const statusElement =
        document.getElementById(
            "dashboardStatus"
        );

    const detailsElement =
        document.getElementById(
            "applicationDetails"
        );


    try {

        const application =
            await authenticatedRequest(
                "/program-change"
            );

        console.log(
            "Programme change response:",
            application
        );


        if (!application) {
            return;
        }


        let latestApplication =
            application;


        /*
         * Backend may return an array.
         */

        if (Array.isArray(application)) {

            if (application.length === 0) {

                showNoApplication();

                return;
            }

            latestApplication =
                application[
                    application.length - 1
                ];
        }


        displayApplication(
            latestApplication
        );


    } catch (error) {

        console.warn(
            "Could not load programme change:",
            error.message
        );

        showNoApplication();
    }
}


/* =========================================================
   NO APPLICATION
========================================================= */

function showNoApplication() {

    const statusElement =
        document.getElementById(
            "dashboardStatus"
        );

    const detailsElement =
        document.getElementById(
            "applicationDetails"
        );


    if (statusElement) {

        statusElement.textContent =
            "No Application";
    }


    if (detailsElement) {

        detailsElement.innerHTML = `
            <p class="empty-message">
                You have not submitted a programme
                change application yet.
            </p>
        `;
    }
}


/* =========================================================
   DISPLAY APPLICATION
========================================================= */

function displayApplication(application) {

    const statusElement =
        document.getElementById(
            "dashboardStatus"
        );

    const detailsElement =
        document.getElementById(
            "applicationDetails"
        );


    if (!application) {

        showNoApplication();

        return;
    }


    const status =
        application.status ||
        "PENDING";


    const normalizedStatus =
        String(status).toUpperCase();


    if (statusElement) {

        statusElement.textContent =
            normalizedStatus;
    }


    let statusClass =
        "status-pending";


    if (normalizedStatus === "APPROVED") {

        statusClass =
            "status-approved";

    } else if (normalizedStatus === "REJECTED") {

        statusClass =
            "status-rejected";
    }


    const currentProgramme =
        application.currentProgramme ||
        "N/A";


    /*
     * IMPORTANT:
     * Backend uses requestedProgramme.
     */

    const requestedProgramme =
        application.requestedProgramme ||
        "N/A";


    const reason =
        application.reason ||
        "N/A";


    const id =
        application.id ||
        "N/A";


    const createdAt =
        application.createdAt ||
        application.applicationDate ||
        "N/A";


    if (detailsElement) {

        detailsElement.innerHTML = `

            <div class="application-box">

                <div class="application-row">

                    <span>
                        Application ID
                    </span>

                    <strong>
                        #${escapeHtml(id)}
                    </strong>

                </div>


                <div class="application-row">

                    <span>
                        Current Programme
                    </span>

                    <strong>
                        ${escapeHtml(
                            currentProgramme
                        )}
                    </strong>

                </div>


                <div class="application-row">

                    <span>
                        Requested Programme
                    </span>

                    <strong>
                        ${escapeHtml(
                            requestedProgramme
                        )}
                    </strong>

                </div>


                <div class="application-row">

                    <span>
                        Reason
                    </span>

                    <strong>
                        ${escapeHtml(
                            reason
                        )}
                    </strong>

                </div>


                <div class="application-row">

                    <span>
                        Status
                    </span>

                    <strong>

                        <span class="
                            status-badge
                            ${statusClass}
                        ">
                            ${escapeHtml(
                                normalizedStatus
                            )}
                        </span>

                    </strong>

                </div>


                <div class="application-row">

                    <span>
                        Submitted
                    </span>

                    <strong>
                        ${escapeHtml(
                            String(createdAt)
                        )}
                    </strong>

                </div>

            </div>

        `;
    }
}


/* =========================================================
   SUBMIT PROGRAMME CHANGE
========================================================= */

async function submitProgramChange(event) {

    event.preventDefault();


    const form =
        document.getElementById(
            "courseChangeForm"
        );


    const message =
        document.getElementById(
            "applicationMessage"
        );


    const button =
        document.getElementById(
            "submitApplicationBtn"
        );


    const currentProgramme =
        document.getElementById(
            "formCurrentProgram"
        ).value.trim();


    /*
     * IMPORTANT:
     * We use requestedProgramme because
     * that is what the backend requires.
     */

    const requestedProgramme =
        document.getElementById(
            "targetProgram"
        ).value.trim();


    const reason =
        document.getElementById(
            "reason"
        ).value.trim();


    /* Validation */

    if (
        !currentProgramme ||
        !requestedProgramme ||
        !reason
    ) {

        showMessage(
            "Please complete all fields.",
            "error"
        );

        return;
    }


    if (
        currentProgramme.toLowerCase() ===
        requestedProgramme.toLowerCase()
    ) {

        showMessage(
            "Requested programme must be different from your current programme.",
            "error"
        );

        return;
    }


    button.disabled = true;

    button.textContent =
        "Submitting...";


    try {

        /*
         * THIS is the exact data sent
         * to Spring Boot.
         */

        const requestBody = {

            currentProgramme:
                currentProgramme,

            requestedProgramme:
                requestedProgramme,

            reason:
                reason
        };


        console.log(
            "Sending programme change:",
            requestBody
        );


        const response =
            await authenticatedRequest(
                "/program-change",
                {
                    method: "POST",

                    body:
                        JSON.stringify(
                            requestBody
                        )
                }
            );


        console.log(
            "Application submitted:",
            response
        );


        showMessage(
            "Programme change application submitted successfully.",
            "success"
        );


        /*
         * Reset only target and reason.
         */

        document.getElementById(
            "targetProgram"
        ).value = "";


        document.getElementById(
            "reason"
        ).value = "";


        /*
         * Refresh application status.
         */

        await loadProgramChange();


    } catch (error) {

        console.error(
            "Submission failed:",
            error
        );


        showMessage(
            error.message ||
            "Failed to submit application.",
            "error"
        );


    } finally {

        button.disabled = false;

        button.textContent =
            "Submit Application";
    }
}


/* =========================================================
   MESSAGE
========================================================= */

function showMessage(text, type) {

    const element =
        document.getElementById(
            "applicationMessage"
        );


    if (!element) {
        return;
    }


    element.textContent =
        text;


    element.className =
        `message ${type}`;


    setTimeout(() => {

        element.className =
            "message";

    }, 6000);
}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {

    return String(value)

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");
}


/* =========================================================
   INITIALIZE DASHBOARD
========================================================= */

async function initializeDashboard() {

    console.log(
        "Initializing MUST student dashboard..."
    );


    const token =
        getToken();


    if (!token) {

        console.log(
            "No JWT token found."
        );

        window.location.href =
            "login.html";

        return;
    }


    /*
     * Display login information immediately.
     */

    const user =
        getUser();


    if (user) {

        displayStudent(
            user
        );
    }


    /*
     * Get latest student profile.
     */

    await loadStudentProfile();


    /*
     * Get programme change status.
     */

    await loadProgramChange();
}


/* =========================================================
   EVENT LISTENERS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const logoutBtn =
            document.getElementById(
                "logoutBtn"
            );


        if (logoutBtn) {

            logoutBtn.addEventListener(
                "click",
                logout
            );
        }


        const courseChangeForm =
            document.getElementById(
                "courseChangeForm"
            );


        if (courseChangeForm) {

            courseChangeForm.addEventListener(
                "submit",
                submitProgramChange
            );
        }


        initializeDashboard();
    }
);