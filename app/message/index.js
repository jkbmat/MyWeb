/**
 * Created by Jakub Matuška on 31.01.2017.
 */
import React from 'react';
import {connect} from 'react-redux';

import {MESSAGE_ERROR, hideMessage} from './actions';

const classNames = require('classnames');

require('./_style.scss');

const Message = ({message, status, hidden, handleClick}) => (
  <div className={classNames("message", {hidden, error: status === MESSAGE_ERROR})} onClick={handleClick}>
    {message}
  </div>
);

export default connect(
  (store) => ({
    message: store.Message.text,
    status: store.Message.status,
    hidden: store.Message.hidden
  }),

  (dispatch) => ({
    handleClick: () => dispatch(hideMessage())
  })
)(Message)