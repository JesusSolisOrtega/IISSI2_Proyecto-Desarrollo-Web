"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";

const commentsRenderer = {
    asComments: function(comments) {
        let divClass = parseHTML(`<div class="col-md"></div>`);

        for (let comment of comments) {
            let com = parseHTML(`<div class="row"><p> - "${comment.commentary}"</p></div>`);
            divClass.appendChild(com);
        }
        return divClass;
    },
};


export { commentsRenderer };