/**
 * Created by Jakub Matuška on 31.01.2017.
 */
import React from 'react';
import { connect } from 'react-redux';

import { logout } from 'auth/login/actions';

require('./_style.scss');

let LoggedInBar = ({ username, logoutHandler }) => (
  <div className="loggedInBar">
    <strong>Hello {username}!</strong>
    <span className="button" onClick={logoutHandler}>Log out</span>
  </div>
);

export default connect(
  (state) => ({
    username: state.User.username
  }),

  (dispatch) => ({
    logoutHandler: () => dispatch(logout())
  })
)(LoggedInBar);