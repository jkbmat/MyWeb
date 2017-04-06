/**
 * Created by Jakub Matuška on 31.01.2017.
 */
import fetch from 'isomorphic-fetch';
import {save, remove} from 'react-cookie';
import {browserHistory} from 'react-router';

import { MESSAGE_ERROR, setMessage } from 'message/actions';

export const sendLogin = (username, password) => (dispatch) => {
  dispatch({
    type: 'LOADING_START',
  });

  fetch(
    "/login", {
      method: "POST",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        username,
        password
      })
    }).then(
    (response) => {
      dispatch(receiveLogin(response))
    },
    (error) => {
      console.log(error);
      dispatch(receiveLogin(error))
    }
  );
};


export const receiveLogin = (response) => (dispatch, getState) => {

  if (response.ok) {
    response.json().then(({ username, token }) => {
      dispatch(login(username, token));

      dispatch({
        type: 'LOADING_END'
      });
    });
  }

  else {
    dispatch({
      type: 'LOADING_END'
    });

    dispatch(setMessage('Wrong credentials. Try again!', MESSAGE_ERROR));
  }
};

export const login = (username, token) => (dispatch) => {
  save('token', token, {
    path: '/',
    maxAge: 24 * 60 * 60 * 30
  });

  save('username', username, {
    path: '/',
    maxAge: 24 * 60 * 60 * 30
  });

  dispatch({type: 'LOGIN', username, token});
  dispatch(setMessage('Welcome ' + username + '!'));
};

export const logout = () => (dispatch) => {
  remove('token', {path: '/'});
  remove('username', {path: '/'});

  dispatch({type: 'LOGOUT'});
  dispatch(setMessage('You have logged out successfully.'));

  browserHistory.push('/');
};

