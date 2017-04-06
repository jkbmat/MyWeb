/**
 * Created by Jakub Matuška on 29.01.2017.
 */
import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import Login from 'auth/login';

import { isLoggedIn } from 'utils';


class EnsureLogin extends React.Component {
  render() {
    if (this.props.loggedIn)
      return this.props.children;

    return <Login />;
  }
}

export default connect(
  (state, ownProps) => ({
    loggedIn: isLoggedIn(state),
  }),

)(EnsureLogin);
