"use strict";
const textValidator = {
    validateCommentary: function(formData) {
        let errors = [];
        let commentary = formData.get("commentary");

        if (commentary.length < 3 || commentary.length > 256) {
            errors.push("comments must be between 3 and 256 chars");
        }

        return errors;
    },


};
export { textValidator };