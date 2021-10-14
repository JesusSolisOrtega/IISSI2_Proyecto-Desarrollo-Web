"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";
import { usersAPI } from "/js/api/users.js";
import { ratingsAPI } from "/js/api/ratings.js";

const photoRenderer = {
    asCard: function(photo) {
        let html = `<div class="col-md-4">
                        <div class="card">
                            <a href="photo_detail.html?photoId=${photo.photoId}">
                                <img src="${photo.url}" class="card-img-top">
                            </a>
                            <div class="card-body">
                                <h5 class= "card-title text-center">${photo.title}</h5>
                                <p class="text-right user-name">${photo.userId}</p>
                            </div>
                        </div>
                    </div>`;
        let card = parseHTML(html);
        loadUsernameCard(card, photo.userId);
        return card;
    },

    asDetails: function(photo) {
        let html = `<div class="photo-details">
            <h3><strong>${photo.title} </strong></h3>
            <hr>
            <div class="row text-center">
                <div class="col-md-8">
                    <img src="${photo.url}" class="img-fluid">
                </div>
                <div class="col-md">
                    <h5><strong> Rating: </strong></h5>
                    <h4 class="rating">${photo.photoId} / 5</h4>
                    <hr>
                    <h7>- <strong>Description:</strong> </h7>
                    <h6>${photo.description} </h6>
                    <hr>
                    <h7>- <strong>Uploaded by:</strong> </h7>
                    <p><a href="user_profile.html?userId=${photo.userId}" class="user-link user-name">
                        ${photo.userId} </a></p>
                    <hr>
                    <h7>- <strong>Upload date:</strong></h7>
                    <h6> ${photo.date}</h6>
                </div>
            </div>
            <hr>   
        </div>`;
        let photoDetails = parseHTML(html);
        loadPhotoRatingDetails(photoDetails, photo.photoId);
        loadUsernameDetails(photoDetails, photo.userId);
        return photoDetails;
    },

    asUserDetails: function(user) {
        let html = `<div class="user-details">
            <h3>${user.username} profile</h3>
            <hr>
            <div class="row text-center">
                <div class="col-md-8">
                    <img src="${user.avatarUrl}" class="img-fluid">
                </div>
                <div class="col-md">
                    <h7>- <strong>First name: </strong> </h7>
                    <h6>${user.firstName} </h6>
                    <hr>
                    <h7>- <strong>Last name:</strong> </h7>
                    <h6>${user.lastName} </h6>
                    <hr>
                    <h7>- <strong>Telephone:</strong></h7>
                    <h6> ${user.telephone}</h6>
                    <hr>
                    <h7>- <strong>Email:</strong></h7>
                    <h6> ${user.email}</h6>
                </div>
            </div>
            <hr>   
        </div>`;
        let userDetails = parseHTML(html);
        return userDetails;
    },



    asLog: function(user) {
        let html = `
        <div class="col-md-2">
            <a href="user_profile.html?userId=${user.userId}" style="color: #e8e7f3;">  
                <img src="${user.avatarUrl}" class="avatar rounded-circle" alt="" style="height: 2.3em; width: 2.3em">         
                @${user.username}
            </a>
        </div>
            `;
        let logged = parseHTML(html);
        return logged;
    },
};

function loadPhotoRatingDetails(photoDetails, photoId) {
    ratingsAPI.getAll()
        .then(ratings => {
            let rates = 0;
            let count = 0;
            for (let r of ratings) {
                if (r.photoId == photoId) {
                    count = count + 1;
                    rates = rates + r.rating;
                }
            };
            let rating = rates / count;
            let h = photoDetails.querySelector("h4.rating");
            h.textContent = rating + " / 5";
            if (count == 0) {
                h.textContent = "-no rates-";
            };
        });
}

function loadUsernameCard(card, userId) {
    usersAPI.getById(userId)
        .then(users => {
            let username = users[0].username;
            let p = card.querySelector("p.user-name");
            p.textContent = "@" + username;
        });
}

function loadUsernameDetails(photoDetails, userId) {
    usersAPI.getById(userId)
        .then(users => {
            let username = users[0].username;
            let p = photoDetails.querySelector("a.user-name");
            p.textContent = username;
        });
}


export { photoRenderer };