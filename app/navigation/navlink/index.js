/**
 * Created by Jakub Matuška on 18.03.2017.
 */
import React from 'react';
import {connect} from 'react-redux';

import {IndexLink, Link} from 'react-router';

require('./_style.scss');


let NavLink = ({to, children}) => {
  if (to === '/')
    return (
      <IndexLink activeClassName='navigation-link-active' to={to}>{children}</IndexLink>
    );
  return (
    <Link activeClassName='navigation-link-active' to={to}>{children}</Link>
  );
};

export default connect(
  (state, ownProps) => ({}),

  (dispatch, ownProps) => ({})
)(NavLink);