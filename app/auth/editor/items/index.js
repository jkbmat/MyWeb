/**
 * Created by Jakub Matuška on 20.03.2017.
 */
import React from 'react';
import {connect} from 'react-redux';

import EditorItem from './editorItem';
import * as Actions from './actions';


class EditorItemList extends React.Component {
  componentWillMount() {
    this.props.loadItems();
  }

  render () {
    const { items, addItem, isCategorySelected } = this.props;

    return (
      <div>

        <div className="item-editor itemList">
          {isCategorySelected && <span className="button add" onClick={addItem}></span>}
          {items.map((item) => <EditorItem item={item} key={item.id} />)}
        </div>


      </div>
    );
  }
}

export default connect(
  (state, ownProps) => {
    let selectedCategory = state.Editor.Categories.find(category => category.selected);

    return {
      isCategorySelected: selectedCategory != null,
      items: selectedCategory == null ? [] :
        state.Editor.Items.filter(item => item.category === selectedCategory.id)
    }
  },

  (dispatch, ownProps) => ({
    addItem: () => dispatch(Actions.addItem()),
    loadItems: () => dispatch(Actions.loadItems())
  })
)(EditorItemList);