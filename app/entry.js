import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, Route, browserHistory} from 'react-router';
import thunkMiddleware from 'redux-thunk';

import reducer from './reducers';
import Portfolio from './portfolio';
import Login from './auth/login';
import Error404 from './error404';
import EnsureLogin from './auth/ensureLogin';
import Editor from './auth/editor/';

require('./_style/style.scss');
require('file-loader?emitFile=false!./_html/index.html');

render((
  <Provider store={createStore(reducer, window.__DEFAULT_STATE__, applyMiddleware(thunkMiddleware))}>
    <Router history={browserHistory}>
      <Route path='/' component={Portfolio} />
      <Route path='/login' component={Login} />
      <Route component={EnsureLogin}>
        <Route path='/auth/secret' component={Portfolio} />
        <Route path='/auth' component={Editor} />
      </Route>
      <Route path='*' component={Error404} />
    </Router>
  </Provider>
), document.getElementById('app'));