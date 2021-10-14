"use_strict";

import { BASE_URL, requestOptions } from "./common.js";

const ratingsAPI = {

    ratePhoto: function(formData) {
        return new Promise(function(resolve, reject) {
            axios
                .post(`${BASE_URL}/ratings`, formData, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getRating: function(photoId) {
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/ratings/${photoId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getAll: function() {
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/ratings`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    update: function(photoId, userId, formData) {
        return new Promise(function(resolve, reject) {
            axios
                .put(`${BASE_URL}/ratings/${photoId}/${userId}`, formData, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

};

export { ratingsAPI };