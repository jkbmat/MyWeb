/**
 * Created by Jakub Matuška on 31.01.2017.
 */
import fetch from 'isomorphic-fetch';

import {MESSAGE_ERROR, setMessage} from 'message/actions';

export const loadCategories = () => (dispatch) => {
  dispatch({type: 'LOADING_START'});

  fetch('/api/categories').then((response) => {
      response.json().then((categories) => {
        dispatch({
          type: 'LOAD_CATEGORIES',
          categories
        });

        dispatch({type: 'LOADING_END'});
      });
    },

    (error) => {
      dispatch(setMessage('Unable to fetch categories.', MESSAGE_ERROR));
      dispatch({type: 'LOADING_END'});
    }
  );
};

export const selectCategory = (id) => ({
  type: 'SELECT_EDITOR_CATEGORY',
  id
});

export const addCategory = (id) => (dispatch, getState) => {
  dispatch({
    type: 'ADD_EDITOR_CATEGORY',
    id
  });

  dispatch(selectCategory(id));
};
