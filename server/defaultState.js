/**
 * Created by Jakub Matuška on 30.01.2017.
 */
"use strict";


const Categories = require('./sql/categories');
const Items = require('./sql/items');


module.exports = (connection) => new Promise((resolve, reject) => {
  Promise.all([Categories.getCategories(connection), Items.getItems(connection)]).then(
    (values) => resolve({
      Categories: values[0].map((category) => Object.assign({}, category, {selected: category.defaultChecked})),
      Items: values[1].map((item) => Object.assign({}, item, {expanded: false})),
    }),

    (error) => reject(error)
  );
});