"use strict";
import { forbiddenAPI } from "/js/api/forbidden.js";
const textValidator = {
    validateCommentary: function(formData) {

     
        return forbiddenAPI.getAll()
            .then(words => {
                let errors = [];
                let commentary = formData.get("commentary");
        
                if (commentary.length < 3 || commentary.length > 256) {
                    errors.push("comments must be between 3 and 256 chars");
                }
                for (let word of words) {
                    console.log(word);
                    console.log(word.word);
                    
                    if (commentary.includes(word.word)) {
                        errors.push("Este texto contiene una palabra prohibida");
                        console.log(errors);
                    }
                    console.log(errors);
                }  
                console.log(errors);
                return errors;
            });

            

    },


};
export { textValidator };