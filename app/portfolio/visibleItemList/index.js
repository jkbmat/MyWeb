/**
 * Created by Jakub Matuška on 27.01.2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import 'core-js/fn/array/find';

import { Item } from 'portfolio/item';
import * as Actions from './actions';

require('./_style.scss');

let VisibleItemList = ({ items, categories, toggleItem }) => (
  <div className="itemList">
    {items.map((item) => {
      let category = categories.find((category) => item.category === category.id);
      let color = category.color;
      let autoOpen = category.autoOpen;

      return (
        <Item key={item.id} item={item} color={color} autoOpen={autoOpen} onToggle={() => toggleItem(item.id)} />
      )
    })}
  </div>
);

export default VisibleItemList = connect(
  (store) => {
    let categories = store.Categories.filter((category) => category.selected).map((category) => category.id);

    return {
      items: store.Items.filter((item) => categories.indexOf(item.category) >= 0).sort((a, b) => b.year - a.year),
      categories: store.Categories
    };
  },

  (dispatch) => ({
    toggleItem: (id) => dispatch(Actions.toggleItem(id))
  })
)(VisibleItemList);