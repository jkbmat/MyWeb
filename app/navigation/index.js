/**
 * Created by Jakub Matuška on 17.03.2017.
 */
import React from 'react';
import {connect} from 'react-redux';

// import * as Actions from './actions';
import NavLink from './navlink';
import { isLoggedIn } from 'utils';

require('./_style.scss');


let Navigation = ({ loggedIn }) => (
  <div className="navigation">
    <NavLink to="/">Portfolio</NavLink>
    <NavLink to="/about-me">About me</NavLink>
    {loggedIn && <NavLink to="/auth">Editor</NavLink>}

  </div>
);

export default connect(
  (state, ownProps) => ({
    loggedIn: isLoggedIn(state)
  }),

  (dispatch, ownProps) => ({})
)(Navigation);