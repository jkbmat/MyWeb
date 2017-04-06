/**
 * Created by Jakub Matuška on 15.03.2017.
 */
import React from 'react';
import { connect } from 'react-redux';

// import * as Actions from './actions';

import Category from './category';
import EditorItemList from './items';
import Main from 'main';
import SelectedCategory from './category/selectedCategory';

import { getSelectedEditorCategory } from 'utils';

// require('./_style.scss');


let Editor = ({ selectedCategory }) => (
  <Main title="Editor">
    <Category />
    {selectedCategory && <SelectedCategory id={selectedCategory.id} />}

    <EditorItemList />
  </Main>
);

export default connect(
    (state, ownProps) => ({
      selectedCategory: getSelectedEditorCategory(state)
    }),
    
    (dispatch, ownProps) => ({

    })
)(Editor);