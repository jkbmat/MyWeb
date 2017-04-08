/**
 * Created by Jakub Matuška on 21.03.2017.
 */

import fetch from 'isomorphic-fetch';

import {setMessage, MESSAGE_ERROR} from 'message/actions';
import {makeToken} from 'utils';
import {loadItems} from '../actions';


export const toggleItem = (id) => ({
  type: 'TOGGLE_EDITOR_ITEM',
  id
});

export const onChange = (id, field, value) => ({
  type: 'CHANGE_EDITOR_ITEM',
  id, field, value
});

export const resetItem = (id) => (dispatch, getState) => {
  let replacement = getState().Items.find((item) => item.id === id);
  replacement.expanded = true;

  dispatch({
    type: 'RESET_EDITOR_ITEM',
    replacement
  })
};

export const updateItem = (item) => (dispatch, getState) => {
  dispatch({type: "LOADING_START"});

  fetch('/api/items/' + item.id, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': makeToken(getState())
    }),
    body: JSON.stringify({
      category: item.category,
      name: item.name,
      year: item.year,
      description: item.description,
      picture: item.picture,
      pictureX: item.pictureX,
      pictureY: item.pictureY,
      link: item.link
    })
  }).then(
    (success) => {
      if (success.ok) {
        dispatch({type: "LOADING_END"});
        dispatch(loadItems());
        dispatch(setMessage('Item ' + item.name + ' changed successfully.'));
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
    dispatch(setMessage('Unable to change item.', MESSAGE_ERROR));
  }
};

export const createItem = (item) => (dispatch, getState) => {
  dispatch({type: "LOADING_START"});

  fetch('/api/items/', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': makeToken(getState())
    }),
    body: JSON.stringify({
      id: item.id,
      category: item.category,
      name: item.name,
      year: item.year,
      description: item.description,
      picture: item.picture,
      pictureX: item.pictureX,
      pictureY: item.pictureY,
      link: item.link
    })
  }).then(
    (success) => {
      if (success.ok) {
        dispatch({type: "LOADING_END"});
        dispatch(loadItems());
        dispatch(setMessage('Item ' + item.name + ' created successfully.'));
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
    dispatch(setMessage('Unable to create item.', MESSAGE_ERROR));
  }
};


export const removeItem = (item) => (dispatch, getState) => {
  if (item.temporary) {
    dispatch({type: 'REMOVE_ITEM', id: item.id});
    dispatch(setMessage('Temporary item ' + item.name + ' removed successfully.'));

    return;
  }

  dispatch({type: 'LOADING_START'});

  fetch('/api/items/' + item.id,
    {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': makeToken(getState())
      }),
    }).then((success) => {
      if (success.ok) {
        dispatch({type: 'LOADING_END'});
        dispatch({type: 'REMOVE_ITEM', id: item.id});

        dispatch(setMessage('Item ' + item.name + ' removed successfully.'));
      }
      else
        fail()
    },
    (error) => {
      fail();
    });

  function fail() {
    dispatch({type: 'LOADING_END'});
    dispatch(setMessage('Unable to remove item.', MESSAGE_ERROR));
  }
};

export const removePicture = (id) => ({
  type: 'REMOVE_EDITOR_PICTURE',
  id
});