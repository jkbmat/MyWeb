/**
 * Created by Jakub Matuška on 29.01.2017.
 */
import React from 'react';
import { save, remove, load } from 'react-cookie';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Main from 'main';
import * as Actions from './actions';

require('./_style.scss');


let Login = ({ submitHandler }) => (
  <Main title="Login">
    <form className="login" onSubmit={submitHandler} name="login">
        <label>
          <span className="label">User name:</span>
          <input type="text" name="username" required="required" />
        </label>

        <label>
          <span className="label">Password:</span>
          <input type="password" name="password" required="required" />
        </label>

        <input className="button" type="submit" name="submit" value="Submit" />
    </form>
  </Main>
);

export default Login = connect(
  null,

  (dispatch, ownProps) => ({
    submitHandler: (e) => {
      e.preventDefault();

      const username = document.querySelector('form[name=login] *[name=username]').value;
      const password = document.querySelector('form[name=login] *[name=password]').value;

      dispatch(Actions.sendLogin(username, password))
    },
  })
)(Login);
