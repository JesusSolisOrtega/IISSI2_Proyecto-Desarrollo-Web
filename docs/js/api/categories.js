"use_strict";

import { BASE_URL, requestOptions } from "./common.js";
const categoriesAPI = {
    getAll: function() {
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/categories`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    getByCategoryId: function(categoryId) {
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/categories/${categoryId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getByPhotoId: function(photoId) {
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/categories/photo/${photoId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    create: function(formData) {
        return new Promise(function(resolve, reject) {
            axios
                .post(`${BASE_URL}/categories`, formData, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    add: function(photoId, formData) {
        return new Promise(function(resolve, reject) {
            axios
                .post(`${BASE_URL}/categories/${photoId}`, formData, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    delete: function(categoryId, photoId) {
        return new Promise(function(resolve, reject) {
            axios
                .delete(`${BASE_URL}/categories/${categoryId}/${photoId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
};


export { categoriesAPI };