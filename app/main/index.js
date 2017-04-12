/**
 * Created by Jakub Matuška on 28.01.2017.
 */
import React from 'react';
import {connect} from 'react-redux';

import Message from 'message';
import Navigation from 'navigation';
import LoggedInBar from 'auth/loggedInBar';
import {isLoggedIn} from 'utils';

import * as Actions from './actions';

require('./_style.scss');
const classNames = require('classnames');

let Main = ({isLoggedIn, loading, title, children, overlayPicture, closeOverlay}) => (
  <div className={classNames("page", {loading})}>
    <Message />
    {isLoggedIn && <LoggedInBar />}
    <Navigation />
    <div className="robot">
      <div className="fotka">&nbsp;</div>
    </div>
    <div className="main">
      <h1>{title}.</h1>
      {children}
    </div>
    {overlayPicture && (
      <div className="overlay" onClick={closeOverlay}>
        <div className="overlay-close button" onClick={closeOverlay}>Close</div>
        <div className="picture-viewer" style={{
          backgroundImage: 'url(' + overlayPicture + ')'
        }} />
      </div>
    )}
  </div>
);

export default connect(
  (store, ownProps) => ({
    title: ownProps.title,
    loading: store.Loading,
    isLoggedIn: isLoggedIn(store),
    overlayPicture: store.OverlayPicture
  }),

  (dispatch, ownProps) => ({
    closeOverlay: () => dispatch(Actions.closeOverlay())
  })
)(Main);