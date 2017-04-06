/**
 * Created by Jakub Matuška on 31.01.2017.
 */
import fetch from 'isomorphic-fetch';

import {MESSAGE_ERROR, setMessage} from 'message/actions';

const uuid = require('uuid/v4');


export const loadItems = () => (dispatch) => {
  dispatch({type: 'LOADING_START'});

  fetch('/api/items').then((response) => {
      response.json().then((items) => {
        dispatch({
          type: 'LOAD_ITEMS',
          items
        });

        dispatch({type: 'LOADING_END'});
      });
    },

    (error) => {
      dispatch(setMessage('Unable to fetch items.', MESSAGE_ERROR));
      dispatch({type: 'LOADING_END'});
    }
  );
};

export const addItem = () => (dispatch, getState) => {
  let id = uuid();
  let categoryId = getState().Editor.Categories.find((category) => category.selected).id;

  dispatch({
    type: 'ADD_EDITOR_ITEM',
    id, categoryId
  });
};
