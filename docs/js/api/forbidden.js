"use_strict";

import { BASE_URL, requestOptions } from "./common.js";
const forbiddenAPI = {
    getAll: function() {
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/forbidden`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

}
export { forbiddenAPI };