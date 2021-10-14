"use strict";

import { photosAPI } from "/js/api/photos.js";
import { ratingsAPI } from "/js/api/ratings.js";
import { categoriesAPI } from "/js/api/categories.js";
import { commentsAPI } from "/js/api/comments.js";
import { photoRenderer } from "/js/renderers/photos.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";
import { categoryRenderer } from "/js/renderers/categories.js";
import { commentsRenderer } from "/js/renderers/comments.js";
import { textValidator } from "/js/validators/texts.js";


let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");

function main() {

    let photoContainer = document.querySelector("#photo-details-column");

    photosAPI.getById(photoId)
        .then(photos => {
            let photoDetails = photoRenderer.asDetails(photos[0]);
            photoContainer.appendChild(photoDetails);
        })
        .catch(error => messageRenderer.showErrorMessage(error));

    let showCategories = document.getElementById("show-categories");
    categoriesAPI.getByPhotoId(photoId)
        .then(categories => {
            let cat = categoryRenderer.asList(categories);
            showCategories.appendChild(cat);
        })




    let ratingForm = document.getElementById("rating-form");
    ratingForm.onsubmit = handleRating;

    let editBtn = document.querySelector("#button-edit");
    editBtn.onclick = handleEdit;

    let deleteBtn = document.querySelector("#button-delete");
    deleteBtn.onclick = handleDelete;

    let createCategoryForm = document.getElementById("create-category-form");
    createCategoryForm.onsubmit = handleCreateCategory;

    /////////////////////////////////
    let addCategoryForm = document.getElementById("add-category");
    categoriesAPI.getAll()
        .then(categories => {

            let select = categoryRenderer.asAdd(categories);
            addCategoryForm.appendChild(select);
        })
        .catch(error => messageRenderer.showErrorMessage(error));
    addCategoryForm.onsubmit = handleAddCategory;


    /////////////////////////
    let deleteCategoryForm = document.getElementById("delete-category");
    categoriesAPI.getByPhotoId(photoId)
        .then(categories => {
            let select = categoryRenderer.asDelete(categories);
            deleteCategoryForm.appendChild(select);
        })


    deleteCategoryForm.onsubmit = handleDeleteCategory;
    ////////////////////////

    let commentForm = document.getElementById("add-comment");
    commentForm.onsubmit = handleSubmitComment;

    let commentaryBlock = document.getElementById("commentary-block");
    commentsAPI.getById(photoId)
        .then(comments => {
            let commentaries = commentsRenderer.asComments(comments);
            commentaryBlock.appendChild(commentaries)
        })



    //////////////////////////
    hideActionsRow();
    hideCommentsContainer();
}

function handleSubmitComment(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    let userId = sessionManager.getLoggedId();

    textValidator.validateCommentary(formData)
        .then(errors => {if (errors.length === 0) {
            commentsAPI.create(photoId, userId, formData)
                .then(data => window.location.href = "photo_detail.html?photoId=" + photoId)
                .catch(error => messageRenderer.showErrorMessage(error));
    
        } else {
            let errorsDiv = document.getElementById("errors");
            errorsDiv.innerHTML = "";
    
            for (let error of errors) {
                messageRenderer.showErrorMessage(error);
            }
        }});


    
}



////////////////////////////////////



function handleDeleteCategory(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    categoriesAPI.delete(formData.get("categoryId"), photoId)
        .then(data => window.location.href = "photo_detail.html?photoId=" + photoId)
        .catch(error => messageRenderer.showErrorMessage(error));
}


function handleAddCategory(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    categoriesAPI.add(photoId, formData)
        .then(data => window.location.href = "photo_detail.html?photoId=" + photoId)
        .catch(error => messageRenderer.showErrorMessage(error));
}


function handleCreateCategory(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    categoriesAPI.create(formData)
        .then(data => window.location.href = "photo_detail.html?photoId=" + photoId)
        .catch(error => messageRenderer.showErrorMessage(error));
}


///////////////////////////////////////////
function handleRating(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    formData.append("photoId", photoId);
    formData.append("userId", sessionManager.getLoggedId());
    let userId = sessionManager.getLoggedId();
    let rated;
    ratingsAPI.getAll()
        .then(ratings => {

            for (let r of ratings) {
                let rPId = r.photoId;
                let rUId = r.userId;
                if (rPId == photoId && rUId == userId) {
                    rated = 1;
                    ratingsAPI.update(photoId, userId, formData)
                        .then(data => window.location.href = "photo_detail.html?photoId=" + photoId)
                        .catch(error => messageRenderer.showErrorMessage(error));
                    break;
                }
            }
        }).catch(error => messageRenderer.showErrorMessage(error));


    if (rated !== 1) {
        ratingsAPI.ratePhoto(formData)
            .then(data => window.location.href = "photo_detail.html?photoId=" + photoId)
            .catch(error => messageRenderer.showErrorMessage(error));
    }
}

function handleEdit(event) {
    window.location.href = "edit_photo.html?photoId=" + photoId;
}

function handleDelete(event) {
    let answer = confirm("Do you really want to delete this photo ?");
    if (answer) {
        photosAPI.delete(photoId)
            .then(data => window.location.href = "index.html")
            .catch(error => messageRenderer.showErrorMessage(error));
    }
}

////////////////////////////////////////


function hideActionsRow() {
    let actions_row = document.getElementById("actions-row");
    if (!sessionManager.isLogged()) {
        actions_row.style.display = "none";
    }
}

function hideCommentsContainer() {
    let comments = document.getElementById("comments-container");
    if (!sessionManager.isLogged()) {
        comments.style.display = "none";
    }
}


document.addEventListener("DOMContentLoaded", main);