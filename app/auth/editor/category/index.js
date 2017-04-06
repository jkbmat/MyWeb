/**
 * Created by Jakub Matuška on 31.01.2017.
 */
import React from 'react';
import {connect} from 'react-redux';

import * as Actions from './actions';

import {Category} from 'portfolio/category';
import {getEditorCategoryById, getSelectedEditorCategory} from 'utils';

require('./_style.scss');
const uuid = require('uuid/v4');

const EditorCategory = connect(
  (state, ownProps) => {
    const category = getEditorCategoryById(state, ownProps.id);

    return {
      name: category.name,
      color: category.color,
      selected: category.selected,
      temporary: category.temporary
    }
  },

  (dispatch, ownProps) => ({
    onCategoryClick: () => dispatch(Actions.selectCategory(ownProps.id))
  })
)(Category);


class CategoryEditor extends React.Component {
  componentWillMount() {
    this.props.loadCategories();
  }

  render () {
    const { categories, selectedCategory, addCategory } = this.props;

    return (
      <div>

        <div className="category-editor">
          <span className="button add" onClick={addCategory}></span>
          {categories.map((category) => <EditorCategory id={category.id} key={category.id} />)}
        </div>



      </div>
    );
  }
}


export default connect(
  (state, ownProps) => ({
    categories: state.Editor.Categories,

  }),

  (dispatch, ownProps) => ({
    loadCategories: () => dispatch(Actions.loadCategories()),
    addCategory: () => dispatch(Actions.addCategory(uuid()))
  })
)(CategoryEditor);