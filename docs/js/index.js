"use strict";


import { photosAPI } from "/js/api/photos.js";
import { galleryRenderer } from "/js/renderers/gallery.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { categoriesAPI } from "/js/api/categories.js";
import { sessionManager } from "/js/utils/session.js";
import { categoryRenderer } from "/js/renderers/categories.js";

let urlParams = new URLSearchParams(window.location.search);
let categoryId = urlParams.get("categoryId");

function main() {
    let galleryContainer = document.querySelector("div.container");
    if (categoryId !== 0 && categoryId !== null && sessionManager.isLogged()) {
        categoriesAPI.getByCategoryId(categoryId)
            .then(photos => {
                let publicPhotos = [];
                for (let photo of photos) {
                    if (photo.visibility == 'Public' || photo.userId == sessionManager.getLoggedId()) {
                        publicPhotos.push(photo);
                    }
                }
                let gallery = galleryRenderer.asCardGallery(publicPhotos);
                galleryContainer.appendChild(gallery);
            });
    }

    if (categoryId == 0 || categoryId == null) {
        photosAPI.getAll()
            .then(photos => {
                let publicPhotos = [];
                for (let photo of photos) {
                    if (photo.visibility == 'Public' || photo.userId == sessionManager.getLoggedId()) {
                        publicPhotos.push(photo);
                    }
                }
                let gallery = galleryRenderer.asCardGallery(publicPhotos);
                galleryContainer.appendChild(gallery);
            })
            .catch(error => messageRenderer.showErrorMessage(error));
    }

    let searchCategoryForm = document.getElementById("search-by-category");
    categoriesAPI.getAll()
        .then(categories => {

            let form = categoryRenderer.asSearch(categories);
            searchCategoryForm.appendChild(form);
        })
        .catch(error => messageRenderer.showErrorMessage(error));
    searchCategoryForm.onsubmit = handleSearchByCategory;





    hideLoggedUsersRow();
}

function handleSearchByCategory(event) {
    window.location.href = "index.html?categoryId=" + categoryId;
}


function hideLoggedUsersRow() {
    let actions_row = document.getElementById("logged-row");
    if (!sessionManager.isLogged()) {
        actions_row.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", main);