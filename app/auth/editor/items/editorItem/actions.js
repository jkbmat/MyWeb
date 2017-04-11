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
  replacement.isPictureTemporary = false;

  dispatch({
    type: 'RESET_EDITOR_ITEM',
    replacement
  })
};

export const updateItem = (item, pictureForm) => (dispatch, getState) => {
  dispatch({type: "LOADING_START"});

  (async() => {
    try {
      let res;
      let picturePath = item.picture;

      if (item.isPictureTemporary) {
        res = await fetch('/api/items/' + item.id + '/picture', {
          method: 'POST',
          headers: new Headers({
            'Authorization': makeToken(getState())
          }),
          body: new FormData(pictureForm)
        });

        if (!res.ok)
          throw {reason: "Picture uploading failed."};

        picturePath = await res.text();

        dispatch(onChange(item.id, 'picture', picturePath));
        dispatch(onChange(item.id, 'isPictureTemporary', false));
      }

      res = await fetch('/api/items/' + item.id, {
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
          picture: picturePath,
          pictureX: item.pictureX,
          pictureY: item.pictureY,
          link: item.link
        })
      });

      if (!res.ok)
        throw {reason: 'Unable to change item.'};

      dispatch(onChange(item.id, 'temporary', false));
      dispatch({type: "LOADING_END"});
      dispatch(loadItems());
      dispatch(setMessage('Item ' + item.name + ' changed successfully.'));
    }
    catch (e) {
      dispatch({type: "LOADING_END"});
      dispatch(setMessage(e.reason || 'An error occurred.', MESSAGE_ERROR));
    }
  })();
};

export const createItem = (item, pictureForm) => (dispatch, getState) => {
  dispatch({type: "LOADING_START"});

  (async () => {
    try {
      let res;
      let picturePath = item.picture;

      if (item.isPictureTemporary) {
        res = await fetch('/api/items/' + item.id + '/picture', {
          method: 'POST',
          headers: new Headers({
            'Authorization': makeToken(getState())
          }),
          body: new FormData(pictureForm)
        });

        if (!res.ok)
          throw {reason: "Picture uploading failed."};

        picturePath = await res.text();

        dispatch(onChange(item.id, 'picture', picturePath));
        dispatch(onChange(item.id, 'isPictureTemporary', false));
      }

      res = await fetch('/api/items/', {
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
          picture: picturePath,
          pictureX: item.pictureX,
          pictureY: item.pictureY,
          link: item.link
        })
      });

      if (!res.ok)
        throw {reason: 'Unable to create item.'};

      dispatch(onChange(item.id, 'temporary', false));
      dispatch({type: "LOADING_END"});
      dispatch(loadItems());
      dispatch(setMessage('Item ' + item.name + ' created successfully.'));
    }
    catch (e) {
      dispatch({type: "LOADING_END"});
      dispatch(setMessage(e.reason || 'An error occurred.', MESSAGE_ERROR));
    }
  })();
};


export const removeItem = (item, silent = false) => (dispatch, getState) => {
  if (item.temporary) {
    dispatch({type: 'REMOVE_ITEM', id: item.id});
    if (!silent)
      dispatch(setMessage('Temporary item ' + item.name + ' removed successfully.'));

    return;
  }

  dispatch({type: 'LOADING_START'});

  (async() => {
    let res;

    try {
      res = await fetch('/api/items/' + item.id + '/picture', {
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': makeToken(getState())
        }),
      });


      if (!res.ok && res.status !== 404)
        throw {reason: "Unable to delete picture."};

      res = await fetch('/api/items/' + item.id,
        {
          method: 'DELETE',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': makeToken(getState())
          }),
        });

      if (!res.ok)
        throw {reason: "Unable to remove item."};

      dispatch({type: 'LOADING_END'});
      dispatch({type: 'REMOVE_ITEM', id: item.id});

      if (!silent)
        dispatch(setMessage('Item ' + item.name + ' removed successfully.'));
    }
    catch(e) {
      dispatch({type: "LOADING_END"});
      dispatch(setMessage(e.reason || 'An error occurred.', MESSAGE_ERROR));
    }
  })();
};

export const removePicture = (id) => ({
  type: 'REMOVE_EDITOR_PICTURE',
  id
});

export const addTempPicture = (id, url, file) => ({
  type: 'ADD_EDITOR_TEMP_PICTURE',
  id, url, file
});