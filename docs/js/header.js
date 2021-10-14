"use strict";

import { sessionManager } from "/js/utils/session.js";
import { usersAPI } from "/js/api/users.js";
import { photoRenderer } from "/js/renderers/photos.js";

function main() {
    showUser();
    addLogoutHandler();
    hideHeaderOptions();
}

function showUser() {
    let title = document.getElementById("navbar-title");

    if (sessionManager.isLogged()) {
        let user = sessionManager.getLoggedUser();
        let userLog = photoRenderer.asLog(user);
        title.appendChild(userLog);
    } else {
        let text;
        text = "Anonymous";
        title.textContent = text;
    }
}

function addLogoutHandler() {
    let logoutButton = document.getElementById("navbar-logout");
    logoutButton.addEventListener("click", function() {
        sessionManager.logout();
        window.location.href = "index.html";
    });
}

function hideHeaderOptions() {

    let headerRegister = document.getElementById("navbar-register");
    let headerLogin = document.getElementById("navbar-login");
    let headerLogout = document.getElementById("navbar-logout");
    let headerCreate = document.getElementById("navbar-create");
    if (sessionManager.isLogged()) {
        headerRegister.style.display = "none";
        headerLogin.style.display = "none";
    } else {

        headerCreate.style.display = "none";
        headerLogout.style.display = "none";
    }
}


document.addEventListener("DOMContentLoaded", main);