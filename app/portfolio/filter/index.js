/**
 * Created by Jakub Matuška on 24.01.2017.
 */
import React from 'react';
import Category from 'portfolio/category/index';
import { connect } from 'react-redux';

import { getCategoryIds } from 'utils';
import * as Actions from './actions';

require('./_style.scss');

let Filter = ({ categories, checkAll, uncheckAll }) => (
  <div className="filter">
    <span className="filter-pretext">Show me:</span>
    <div className="button" onClick={checkAll}>Everything</div>
    <div className="button" onClick={uncheckAll}>Nothing</div>

    {categories.map(
      id => <Category key={id} id={id} />
    )}
  </div>
);

Filter.propTypes = {
  categories: React.PropTypes.array
};

export default Filter = connect(
  (store) => {
    return {
      categories: getCategoryIds(store)
    }
  },

  (dispatch) => ({
    checkAll: () => dispatch(Actions.checkAll()),
    uncheckAll: () => dispatch(Actions.uncheckAll()),
  })
)(Filter);
