/**
 * Created by Jakub Matuška on 27.01.2017.
 */

import React from 'react';
import { connect } from 'react-redux';

import * as Actions from './actions';
import { getCategoryById } from 'utils';

const classNames = require('classnames');

require('./_style.scss');

export const Category = ({ color, temporary, name, selected, onCategoryClick }) => (
  <div onClick={onCategoryClick} style={{
    borderTopColor: color
  }} className={classNames("button", "category", {selected, temporary})}>
    <div className="tick" />
    {name}
  </div>
);

export default connect(
  (store, ownProps) => {
    let id = ownProps.id;
    let category = getCategoryById(store, id);

    return {
      color: category.color,
      name: category.name,
      selected: category.selected,
      temporary: category.temporary
    }
  },

  (dispatch, ownProps) => {
    let id = ownProps.id;

    return {
      onCategoryClick: () => dispatch(Actions.toggleCategory(id))
    }
  }
)(Category);
