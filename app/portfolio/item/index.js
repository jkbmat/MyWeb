/**
 * Created by Jakub Matuška on 27.01.2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import ReactMarkdown from 'react-markdown';

import PinnedPic from 'pinnedPic';

import {setOverlay} from 'main/actions';
import {getItemById, getCategoryById} from 'utils';

require('./_style.scss');
const classNames = require('classnames');

export const DisplayItem = ({item, color, toggleHandler, enlargePictureHandler}) => (
  <div className={classNames("item-container", {expanded: item.expanded})}>
    <div className="item">
      <div className="item-header" onClick={toggleHandler} style={{borderTopColor: color}}>
        {item.name}
        <span className="year">({item.year})</span>
        {!item.expanded && (
          <div className="item-header-pic">
            <PinnedPic picture={item.picture} x={item.pictureX} y={item.pictureY}/>
          </div>)}
      </div>
      {item.expanded &&
      <div className="item-details" style={{display: item.expanded ? 'block' : 'none'}}>
        {item.picture && (
          <div className="image" onClick={enlargePictureHandler}>
            <PinnedPic picture={item.picture} x={item.pictureX} y={item.pictureY}/>
          </div>
        )}

        <div className="item-details-text">
          {item.description && (
            <div className="item-description">
              <ReactMarkdown source={item.description}/>
            </div>
          )}

          {item.link && (
            <span>
            <span className="label">Link: </span><a href={item.link}>{item.link}</a>
          </span>
          )}
        </div>
      </div>
      }
    </div>
  </div>
);

export const Item = connect(
  (store, ownProps) => ({
    color: ownProps.color,
    toggleHandler: ownProps.onToggle
  }),

  (dispatch, ownProps) => ({
    enlargePictureHandler: () => dispatch(setOverlay(ownProps.item.picture))
  })
)(DisplayItem);