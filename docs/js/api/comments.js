import { BASE_URL, requestOptions } from "./common.js";
const commentsAPI = {
    getAll: function() {
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/comments`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    getById: function(photoId) {
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/comments/${photoId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },



    create: function(photoId, userId, formData) {
        return new Promise(function(resolve, reject) {
            axios
                .post(`${BASE_URL}/comments/${photoId}/${userId}`, formData, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
};

export { commentsAPI };