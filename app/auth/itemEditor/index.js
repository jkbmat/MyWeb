/**
 * Created by Jakub Matuška on 22.02.2017.
 */
import React from 'react';
import { connect } from 'react-redux';

import { getSelectedEditorItem } from 'utils';

import * as Actions from './actions';

require('./_style.scss');


let ItemEditor = ({ link }) => (
    <div>
        <label>
          <span className="label">Link: </span>
          <input type="text" value={link} />
        </label>
    </div>
);

export default connect(
    (state, ownProps) => {
      let item = getSelectedEditorItem(state);

      return {
        link: item.link,
        description: item.description,
        data: item.data,
        picture: item.picture
      };
    },
    
    (dispatch, ownProps) => ({
        
    })
)(ItemEditor);