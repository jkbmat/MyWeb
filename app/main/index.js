/**
 * Created by Jakub Matuška on 28.01.2017.
 */
import React from 'react';
import { connect } from 'react-redux';

import Message from 'message';
import Navigation from 'navigation';
import LoggedInBar from 'auth/loggedInBar';
import { isLoggedIn } from 'utils';

require('./_style.scss');
const classNames = require('classnames');

let Main = ({ isLoggedIn, loading, title, children }) => (
  <div className={classNames("page", {loading})}>
    <Message />
    {isLoggedIn && <LoggedInBar />}
    <Navigation />
    <div className="robot" />
    <div className="main">
      <h1>{title}.</h1>
      {children}
    </div>
  </div>
);

export default connect(
  (store, ownProps) => ({
    title: ownProps.title,
    loading: store.Loading,
    isLoggedIn: isLoggedIn(store)
  })
)(Main)