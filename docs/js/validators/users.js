"use strict";
const userValidator = {
    validateRegister: function(formData) {
        let errors = [];
        let firstName = formData.get("firstName");
        let lastName = formData.get("lastName");
        let password = formData.get("password");
        let password2 = formData.get("password2");
        let username = formData.get("username");
        if (firstName.length < 3 || lastName.length < 3) {
            errors.push("The first and last name should have more than 3 characters");
        }
        if (password !== password2) {
            errors.push("The passwords must match");
        }
        if (username == password) {
            errors.push("For security reasons you should not use the same string for username and password");
        }

        return errors;
    },

    validateLogin: function(formData) {
        let errors = [];
        let username = formData.get("username");
        let password = formData.get("password");
        if (username == password) {
            errors.push("For security reasons we don't let you use the same string for username and password");
        }

        return errors;
    }
};
export { userValidator };