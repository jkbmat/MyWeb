/**
 * Created by Jakub Matuška on 31.01.2017.
 */
import fetch from 'isomorphic-fetch';

import {setMessage, MESSAGE_ERROR} from 'message/actions';
import {getEditorCategoryById, getCategoryById, makeToken} from 'utils';
import {loadCategories} from '../actions';
import {removeItem} from '../../items/editorItem/actions';

export const fieldChange = (id, field, value) => ({
  type: 'EDITOR_CATEGORY_CHANGE',
  id,
  field,
  value
});

export const submit = (id) => (dispatch, getState) => {
  const {temporary} = getEditorCategoryById(getState(), id);

  if (temporary) return dispatch(createCategory(id));

  return dispatch(updateCategory(id));
};

export const updateCategory = (id) => (dispatch, getState) => {
  const {name, color, defaultChecked, autoOpen} = getEditorCategoryById(getState(), id);

  dispatch({type: "LOADING_START"});

  fetch('/api/categories/' + id, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': makeToken(getState())
    }),
    body: JSON.stringify({
      name,
      color,
      defaultChecked,
      autoOpen
    })
  }).then(
    (success) => {
      if (success.ok) {
        dispatch({type: "LOADING_END"});
        dispatch(loadCategories());
        dispatch(setMessage('Category ' + name + ' changed successfully.'));
      }
      else {
        fail();
      }
    },

    (error) => {
      fail()
    }
  );

  function fail() {
    dispatch({type: "LOADING_END"});
    dispatch(setMessage('Unable to change category.', MESSAGE_ERROR));
  }
};

export const toggleColorPicker = (id) => ({
  type: 'TOGGLE_COLOR_PICKER',
  id
});

export const resetChanges = (id) => (dispatch, getState) => {
  const refCategory = getCategoryById(getState(), id);

  dispatch({
    type: 'RESET_EDITOR_CATEGORY',
    id,
    name: refCategory.name,
    color: refCategory.color
  });
};

export const createCategory = (id) => (dispatch, getState) => {
  const category = getEditorCategoryById(getState(), id);
  const {name, color, defaultChecked, autoOpen} = category;

  dispatch({type: 'LOADING_START'});

  fetch('/api/categories',
    {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': makeToken(getState())
      }),
      body: JSON.stringify({
        id,
        name,
        color,
        defaultChecked,
        autoOpen
      })
    }).then((success) => {
      if (success.ok) {
        dispatch({type: 'LOADING_END'});

        dispatch({
          type: 'CREATE_CATEGORY',
          id,
          name: category.name,
          color: category.color
        });

        dispatch(setMessage('Category ' + category.name + ' created successfully.'));
      }
      else
        fail()
    },
    (error) => {
      fail();
    });

  function fail() {
    dispatch({type: 'LOADING_END'});
    dispatch(setMessage('Unable to create category.', MESSAGE_ERROR));
  }
};

export const removeCategory = (id) => (dispatch, getState) => {
  const category = getEditorCategoryById(getState(), id);

  if (category.temporary) {
    dispatch({type: 'REMOVE_CATEGORY', id});
    dispatch(setMessage('Temporary category ' + category.name + ' removed successfully.'));

    return;
  }

  dispatch({type: 'LOADING_START'});

  (async () => {
    let res;

    try {
      getState().Editor.Items
        .filter((item) => item.category === id)
        .forEach((item) => {
          dispatch(removeItem(item, true));
        });

      res = await fetch('/api/categories/' + id,
        {
          method: 'DELETE',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': makeToken(getState())
          }),
        });

      if (!res.ok)
        throw {reson: 'Unable to remove category.'};

      dispatch({type: 'LOADING_END'});
      dispatch({type: 'REMOVE_CATEGORY', id});

      dispatch(setMessage('Category ' + category.name + ' removed successfully.'));
    }
    catch (e) {
      dispatch({type: "LOADING_END"});
      dispatch(setMessage(e.reason || 'An error occurred.', MESSAGE_ERROR));
    }

  })();
};