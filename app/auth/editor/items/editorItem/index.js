/**
 * Created by Jakub Matuška on 20.03.2017.
 */
import React from 'react';
import {connect} from 'react-redux';

import {DisplayItem} from 'portfolio/item';
import * as Actions from './actions';

import {commonPropsDiffer} from 'utils';

import classNames from 'classnames';
import isEqual from 'lodash';

require('./_style.scss');

let EditorItem = ({item, color, handlers, isChanged, isTemporary}) => (
  <div className={classNames("item-container", {expanded: item.expanded})}>
    <div className="item">
      <div className={classNames("item-header", {temporary: isTemporary})} onClick={handlers.toggle} style={{borderTopColor: color}}>
        {item.name}
        <span className="year">({item.year})</span>
      </div>
      <div className="item-details" style={{display: item.expanded ? 'block' : 'none'}}>
        {item.picture && (
          <a href={item.link} className="image" target="_blank">
            <div className="item-picture" style={{backgroundImage: 'url(' + item.picture + ')'}}/>
          </a>
        )}

        <div className="item-details-text">
          <div className="item-table">

            <label>
              <span>Name:</span>
              <input type="text" value={item.name} onChange={handlers.change.name}/>
            </label>

            <label>
              <span>Year:</span>
              <input type="number" value={item.year} onChange={handlers.change.year}/>
            </label>

            <label>
              <span>Description:</span>
              <textarea value={item.description} onChange={handlers.change.description}/>
            </label>

            <label>
              <span>Link:</span>
              <input type="text" value={item.link} onChange={handlers.change.link}/>
            </label>
          </div>

          <div className="buttons">
            <span className="button" onClick={handlers.remove}>Remove</span>

            {
              isTemporary ? <span className="button" onClick={handlers.create}>Create</span> :
                <div>
                  {isChanged && <span className="button" onClick={handlers.reset}>Cancel</span>}
                  {isChanged && <span className="button" onClick={handlers.update}>Submit</span>}
                </div>
            }
          </div>
        </div>

      </div>
    </div>
  </div>
);


export default connect(
  (state, ownProps) => {
    return {
      color: state.Editor.Categories.find(category => category.id === ownProps.item.category).color,
      isChanged: commonPropsDiffer(ownProps.item, state.Items.find((item) => item.id === ownProps.item.id), ["expanded"]),
      isTemporary: ownProps.item.temporary
    }
  },

  (dispatch, ownProps) => ({
    handlers: {
      change: {
        name: (e) => dispatch(Actions.onChange(ownProps.item.id, "name", e.target.value)),
        year: (e) => dispatch(Actions.onChange(ownProps.item.id, "year", e.target.value)),
        description: (e) => dispatch(Actions.onChange(ownProps.item.id, "description", e.target.value)),
        link: (e) => dispatch(Actions.onChange(ownProps.item.id, "link", e.target.value))
      },
      toggle: () => dispatch(Actions.toggleItem(ownProps.item.id)),
      reset: () => dispatch(Actions.resetItem(ownProps.item.id)),
      remove: () => {
        if (confirm("Are you sure you want to delete this item?"))
          dispatch(Actions.removeItem(ownProps.item))
      },
      create: () => dispatch(Actions.createItem(ownProps.item)),
      update: () => dispatch(Actions.updateItem(ownProps.item)),
    }
  })
)(EditorItem);