"use strict";
import { photosAPI } from "/js/api/photos.js";
import { usersAPI } from "/js/api/users.js";
import { photoRenderer } from "/js/renderers/photos.js";
import { galleryRenderer } from "/js/renderers/gallery.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";

let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get("userId");


function main() {

    let userContainer = document.querySelector("#user-details");

    usersAPI.getById(userId)
        .then(users => {
            let userDetails = photoRenderer.asUserDetails(users[0]);
            userContainer.appendChild(userDetails);
        })
        .catch(error => messageRenderer.showErrorMessage(error));



    gallery();
    //    mouseEvents();
}


function gallery() {
    let userGalleryContainer = document.querySelector("#user-gallery");
    photosAPI.getAll()
        .then(photos => {
            let userPhotos = [];
            for (let photo of photos) {
                if ((photo.visibility == 'Public' || photo.userId == sessionManager.getLoggedId()) && photo.userId == userId) {
                    userPhotos.push(photo);
                }
            }
            let gallery = galleryRenderer.asCardGallery(userPhotos);
            userGalleryContainer.appendChild(gallery);
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}

/*
function mouseEvents() {
    let cards = document.querySelectorAll("div.card");
    for (let card of cards) {
        card.onmouseenter = handleMouseEnter;
        card.onmouseleave = handleMouseLeave;
    }

}

function handleMouseEnter(event) {
    let card = event.target;
    card.style.backgroundColor = "black";
    card.style.color = "white";
}

function handleMouseLeave(event) {
    let card = event.target;
    card.style.backgroundColor = "white";
    card.style.color = "black";
}
*/

document.addEventListener("DOMContentLoaded", main);