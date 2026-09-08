/* =========================================================
   MUST RELIGIOUS COMMUNITY SYSTEM
   MAIN.JS
   ========================================================= */

const API_BASE_URL = "http://localhost:8080/api";


/* =========================================================
   AUTHENTICATION STORAGE
   ========================================================= */

const Auth = {

    saveLogin(data) {

        if (!data) {
            return;
        }

        if (data.token) {
            localStorage.setItem(
                "mustToken",
                data.token
            );
        }

        localStorage.setItem(
            "mustUser",
            JSON.stringify({
                id: data.id ?? null,
                fullName: data.fullName ?? "",
                email: data.email ?? "",
                registrationNumber:
                    data.registrationNumber ?? "",
                role: data.role ?? ""
            })
        );
    },


    getToken() {

        return localStorage.getItem(
            "mustToken"
        );
    },


    getUser() {

        const user =
            localStorage.getItem("mustUser");

        if (!user) {
            return null;
        }

        try {

            return JSON.parse(user);

        } catch (error) {

            console.error(
                "Invalid stored user:",
                error
            );

            return null;
        }
    },


    isLoggedIn() {

        return !!this.getToken();
    },


    logout() {

        localStorage.removeItem(
            "mustToken"
        );

        localStorage.removeItem(
            "mustUser"
        );

        window.location.href =
            "../pages/login.html";
    }

};


/* =========================================================
   API REQUEST HELPER
   ========================================================= */

async function apiRequest(
    endpoint,
    options = {}
) {

    const token =
        Auth.getToken();

    const headers = {

        "Content-Type":
            "application/json",

        ...(options.headers || {})
    };


    if (token) {

        headers.Authorization =
            `Bearer ${token}`;
    }


    const response =
        await fetch(
            `${API_BASE_URL}${endpoint}`,
            {
                ...options,
                headers
            }
        );


    /* -----------------------------------------------------
       SESSION EXPIRED
       ----------------------------------------------------- */

    if (response.status === 401) {

        Auth.logout();

        throw new Error(
            "Your session has expired. Please login again."
        );
    }


    /* -----------------------------------------------------
       FORBIDDEN
       ----------------------------------------------------- */

    if (response.status === 403) {

        throw new Error(
            "You do not have permission to access this resource."
        );
    }


    /* -----------------------------------------------------
       READ RESPONSE
       ----------------------------------------------------- */

    const contentType =
        response.headers.get(
            "content-type"
        ) || "";


    let data;


    if (
        contentType.includes(
            "application/json"
        )
    ) {

        data =
            await response.json();

    } else {

        data =
            await response.text();
    }


    /* -----------------------------------------------------
       HANDLE ERRORS
       ----------------------------------------------------- */

    if (!response.ok) {

        let message =
            "Request failed.";


        if (
            typeof data ===
            "string" &&
            data.trim()
        ) {

            message =
                data;
        }


        if (
            data &&
            typeof data ===
            "object"
        ) {

            message =
                data.message ||
                data.error ||
                data.detail ||
                message;
        }


        throw new Error(
            message
        );
    }


    return data;
}


/* =========================================================
   GET CURRENT USER
   ========================================================= */

function getCurrentUser() {

    return Auth.getUser();
}


/* =========================================================
   PROTECTED PAGE CHECK
   ========================================================= */

function requireLogin() {

    if (
        !Auth.isLoggedIn()
    ) {

        window.location.href =
            "../pages/login.html";

        return false;
    }

    return true;
}


/* =========================================================
   LOGOUT BUTTON
   ========================================================= */

function setupLogoutButton() {

    const logoutButtons =
        document.querySelectorAll(
            "#logoutBtn, .logout-btn"
        );


    logoutButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    Auth.logout();
                }
            );

        }
    );
}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function setupMobileMenu() {

    const menuButton =
        document.querySelector(
            ".menu-toggle"
        );

    const navigation =
        document.querySelector(
            ".nav-menu"
        );


    if (
        !menuButton ||
        !navigation
    ) {

        return;
    }


    menuButton.addEventListener(
        "click",
        function () {

            navigation.classList.toggle(
                "active"
            );
        }
    );
}


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setupLogoutButton();

        setupMobileMenu();

    }
);


/* =========================================================
   GLOBAL EXPORTS
   ========================================================= */

window.API_BASE_URL =
    API_BASE_URL;

window.apiRequest =
    apiRequest;

window.Auth =
    Auth;

window.getCurrentUser =
    getCurrentUser;

window.requireLogin =
    requireLogin;