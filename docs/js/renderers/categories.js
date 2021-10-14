"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";



const categoryRenderer = {
    asAdd: function(categories) {
        let formAdd = parseHTML(`<form id="add-category-form"></form>`);
        let divClass = parseHTML(`<div class="form-group"></div>`);
        let button = parseHTML(`<button type="submit" class="btn btn-primary"> Add category to photo</button>`);
        let selectCategories = parseHTML(`
        <select name="categoryId" id="category-input" class="form-control"></select>`);

        for (let category of categories) {
            let option = parseHTML(`<option value="${category.categoryId}">${category.category}</option>`);
            selectCategories.appendChild(option);
        }
        divClass.appendChild(selectCategories);
        divClass.appendChild(button);
        formAdd.appendChild(divClass);
        return formAdd;
    },

    asDelete: function(categories) {
        let formAdd = parseHTML(`<form id="delete-category-form"></form>`);
        let divClass = parseHTML(`<div class="form-group"></div>`);
        let button = parseHTML(`<button type="submit" class="btn btn-danger"> Delete from photo</button>`);
        let selectCategories = parseHTML(`
        <select name="categoryId" id="del-category-input" class="form-control"></select>`);

        for (let category of categories) {
            let option = parseHTML(`<option value="${category.categoryId}">${category.category}</option>`);
            selectCategories.appendChild(option);
        }
        divClass.appendChild(selectCategories);
        divClass.appendChild(button);
        formAdd.appendChild(divClass);
        return formAdd;
    },

    asSearch: function(categories) {
        let formSearch = parseHTML(`<form id="search-category-form"></form>`);
        let divClass = parseHTML(`<div class="form-group"></div>`);
        let button = parseHTML(`<button type="submit" class="btn btn-info"> Search by category</button>`);
        let selectCategories = parseHTML(`
        <select name="categoryId" id="category-input" class="form-control"></select>`);

        let option0 = parseHTML(`<option value="0">See All</option>`);
        selectCategories.appendChild(option0);

        for (let category of categories) {
            let option = parseHTML(`<option value="${category.categoryId}">${category.category}</option>`);
            selectCategories.appendChild(option);
        }


        divClass.appendChild(selectCategories);
        divClass.appendChild(button);
        formSearch.appendChild(divClass);
        return formSearch;
    },

    asList: function(categories) {

        let divClass = parseHTML(`<div class="row text-center"></div>`);

        for (let category of categories) {
            let cat = parseHTML(`<div class="col-md"><h6><strong>#${category.category}</strong></h6></div>`);
            divClass.appendChild(cat);
        }

        return divClass;
    },
};



export { categoryRenderer };