/**
 * Created by Jakub Matuška on 29.01.2017.
 */
import React from 'react';

import Filter from 'portfolio/filter';
import VisibleItemList from 'portfolio/visibleItemList';
import Main from 'main';

export default () => (
  <Main title="Hello">
    <p>My name is Jakub Matuška and here are some of the things I've made:</p>
    <br />

    <Filter />
    <VisibleItemList />
  </Main>
)