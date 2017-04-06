/**
 * Created by Jakub Matuška on 27.01.2017.
 */
import React from 'react';
import { connect } from 'react-redux';

import { getItemById, getCategoryById } from 'utils';

require('./_style.scss');
const classNames = require('classnames');

export const DisplayItem = ({ item, color, toggleHandler }) => (
  <div className={classNames("item-container", {expanded: item.expanded})}>
    <div className="item">
      <div className="item-header" onClick={toggleHandler} style={{borderTopColor: color}}>
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
          {item.description && (
            <div className="item-description">
              {item.description}
            </div>
          )}

          {item.link && (
            <span>
            <span className="label">Link: </span><a href={item.link}>{item.link}</a>
          </span>
          )}
        </div>
      </div>
    </div>
  </div>
);

export const Item = connect(
  (store, ownProps) => {
    let item = ownProps.item;
    return {
      item,
      color: ownProps.color,
      toggleHandler: ownProps.onToggle
    };
  }
)(DisplayItem);