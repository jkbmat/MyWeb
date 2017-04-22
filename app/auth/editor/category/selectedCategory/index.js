/**
 * Created by Jakub Matuška on 31.01.2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import {ChromePicker} from 'react-color';

import * as Actions from './actions';
import {getEditorCategoryById, getCategoryById, commonPropsDiffer} from 'utils';

require('./_style.scss');


let Category = ({autoOpenChangeHandler, defaultCheckedChangeHandler, autoOpen, defaultChecked, name, color, changed, temporary, showColorPicker, submitHandler, nameChangeHandler, resetHandler, removeHandler, colorChangeHandler, colorPickerClickHandler}) => (
  <form className="selectedCategory" style={{borderTopColor: color}} onSubmit={submitHandler}>
    <label>
      <span className="label">Name: </span>
      <input type="text" value={name} onChange={nameChangeHandler} required="required"/>
    </label>
    <label>
      <span className="label">Color: </span>
      <div>
        <div className="colorPickerButton" style={{backgroundColor: color}} onClick={colorPickerClickHandler}></div>
        {showColorPicker && (
          <div className="colorPopover">
            <div className="cover" onClick={colorPickerClickHandler}></div>
            <ChromePicker disableAlpha={true} color={color} onChange={colorChangeHandler}/>
          </div>
        )}
      </div>
    </label>
    <label>
      <span className="label">Auto open image: </span>
      <input type="checkbox" checked={autoOpen} onChange={autoOpenChangeHandler} />
    </label>
    <label>
      <span className="label">Checked by default: </span>
      <input type="checkbox" checked={defaultChecked} onChange={defaultCheckedChangeHandler} />
    </label>
    <div className="buttons">
      <span onClick={removeHandler} className="button">Remove</span>
      {temporary ? <input type="submit" value="Create" className="button" /> :
        <div>
          {changed && <span className="button" onClick={resetHandler}>Cancel</span>}
          {changed && <input type="submit" value="Change" className="button" />}
        </div>
      }
    </div>
  </form>
);

export default connect(
  (state, ownProps) => {
    const id = ownProps.id;
    const category = getEditorCategoryById(state, id);
    const {name, color, colorPicker, temporary} = category;

    return {
      name,
      color,
      temporary,
      changed: commonPropsDiffer(category, getCategoryById(state, id), ["selected"]),
      showColorPicker: colorPicker,
      autoOpen: category.autoOpen,
      defaultChecked: category.defaultChecked
    }
  },

  (dispatch, ownProps) => {
    const id = ownProps.id;

    return {
      submitHandler: (e) => {e.preventDefault(); dispatch(Actions.submit(id)); return false;},
      nameChangeHandler: (e) => dispatch(Actions.fieldChange(id, 'name', e.target.value)),
      colorChangeHandler: (color) => dispatch(Actions.fieldChange(id, 'color', color.hex)),
      colorPickerClickHandler: () => dispatch(Actions.toggleColorPicker(id)),
      resetHandler: () => dispatch(Actions.resetChanges(id)),
      removeHandler: () => {if(confirm("Are you sure you want to delete this category and all its items?"))dispatch(Actions.removeCategory(id))},
      autoOpenChangeHandler: (e) => dispatch(Actions.fieldChange(id, 'autoOpen', e.target.checked)),
      defaultCheckedChangeHandler: (e) => dispatch(Actions.fieldChange(id, 'defaultChecked', e.target.checked))
    }
  }
)(Category);


