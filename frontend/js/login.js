/* =========================================================
   MUST RELIGIOUS COMMUNITY SYSTEM
   LOGIN.JS
   ========================================================= */


/* =========================================================
   LOGIN FORM
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const loginForm =
            document.getElementById(
                "loginForm"
            );


        if (!loginForm) {

            return;
        }


        loginForm.addEventListener(
            "submit",
            handleLogin
        );


        setupPasswordToggle();

    }
);


/* =========================================================
   LOGIN
   ========================================================= */

async function handleLogin(event) {

    event.preventDefault();


    const emailInput =
        document.getElementById(
            "email"
        );


    const passwordInput =
        document.getElementById(
            "password"
        );


    const message =
        document.getElementById(
            "loginMessage"
        );


    const email =
        emailInput
            ?.value
            .trim();


    const password =
        passwordInput
            ?.value;


    /* -----------------------------------------------------
       VALIDATION
       ----------------------------------------------------- */

    if (!email) {

        showLoginMessage(
            "Please enter your email.",
            "error"
        );

        return;
    }


    if (!password) {

        showLoginMessage(
            "Please enter your password.",
            "error"
        );

        return;
    }


    /* -----------------------------------------------------
       BUTTON
       ----------------------------------------------------- */

    const submitButton =
        loginFormButton();


    const originalText =
        submitButton
            ? submitButton.innerHTML
            : "";


    if (submitButton) {

        submitButton.disabled =
            true;

        submitButton.innerHTML =
            "Logging in...";
    }


    showLoginMessage(
        "Connecting to server...",
        "info"
    );


    try {

        /* -------------------------------------------------
           BACKEND LOGIN
           ------------------------------------------------- */

        const response =
            await fetch(
                "http://localhost:8080/api/auth/login",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })

                }
            );


        /* -------------------------------------------------
           RESPONSE
           ------------------------------------------------- */

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


        /* -------------------------------------------------
           LOGIN ERROR
           ------------------------------------------------- */

        if (!response.ok) {

            let errorMessage =
                "Login failed.";


            if (
                typeof data ===
                "string" &&
                data.trim()
            ) {

                errorMessage =
                    data;
            }


            if (
                data &&
                typeof data ===
                "object"
            ) {

                errorMessage =
                    data.message ||
                    data.error ||
                    "Invalid email or password.";
            }


            throw new Error(
                errorMessage
            );
        }


        /* -------------------------------------------------
           CHECK TOKEN
           ------------------------------------------------- */

        if (
            !data ||
            !data.token
        ) {

            throw new Error(
                "Login succeeded but no authentication token was returned."
            );
        }


        /* -------------------------------------------------
           SAVE LOGIN
           ------------------------------------------------- */

        const user = {

            id:
                data.id ?? null,

            fullName:
                data.fullName ?? "",

            email:
                data.email ?? email,

            registrationNumber:
                data.registrationNumber ?? "",

            role:
                data.role ?? ""

        };


        localStorage.setItem(
            "mustToken",
            data.token
        );


        localStorage.setItem(
            "mustUser",
            JSON.stringify(user)
        );


        /* -------------------------------------------------
           SUCCESS MESSAGE
           ------------------------------------------------- */

        showLoginMessage(
            "Login successful. Redirecting...",
            "success"
        );


        /* -------------------------------------------------
           REDIRECT
           ------------------------------------------------- */

        setTimeout(
            function () {

                const role =
                    String(
                        user.role || ""
                    ).toUpperCase();


                if (
                    role ===
                    "ADMIN"
                ) {

                    window.location.href =
                        "../pages/admin-dashboard.html";

                } else {

                    window.location.href =
                        "../pages/student-dashboard.html";
                }

            },
            500
        );


    } catch (error) {

        console.error(
            "Login error:",
            error
        );


        showLoginMessage(
            error.message ||
            "Unable to login. Please try again.",
            "error"
        );


        if (submitButton) {

            submitButton.disabled =
                false;

            submitButton.innerHTML =
                originalText ||
                "Login";
        }

    }

}


/* =========================================================
   LOGIN MESSAGE
   ========================================================= */

function showLoginMessage(
    text,
    type
) {

    const message =
        document.getElementById(
            "loginMessage"
        );


    if (!message) {

        return;
    }


    message.textContent =
        text;


    message.className =
        "message";


    if (type) {

        message.classList.add(
            type
        );
    }

}


/* =========================================================
   LOGIN BUTTON
   ========================================================= */

function loginFormButton() {

    const form =
        document.getElementById(
            "loginForm"
        );


    if (!form) {

        return null;
    }


    return form.querySelector(
        'button[type="submit"]'
    );
}


/* =========================================================
   PASSWORD SHOW/HIDE
   ========================================================= */

function setupPasswordToggle() {

    const toggle =
        document.getElementById(
            "passwordToggle"
        );


    const password =
        document.getElementById(
            "password"
        );


    if (
        !toggle ||
        !password
    ) {

        return;
    }


    toggle.addEventListener(
        "click",
        function () {

            if (
                password.type ===
                "password"
            ) {

                password.type =
                    "text";

            } else {

                password.type =
                    "password";
            }

        }
    );

}