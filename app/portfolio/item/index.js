/**
 * Created by Jakub Matuška on 27.01.2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import ReactMarkdown from 'react-markdown';
import ClassNames from 'classnames';
import SmoothScroll from 'smoothscroll';

import PinnedPic from 'pinnedPic';

import {setOverlay} from 'main/actions';
import {getItemById, getCategoryById} from 'utils';

require('./_style.scss');


export class DisplayItem extends React.Component {
  componentDidMount() {
    this.closeHandler = this.closeHandler.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.item.expanded && prevProps.item.expanded !== this.props.item.expanded) {
      function getOffsetTop (el) {
        return el.offsetTop + (el.offsetParent ? getOffsetTop(el.offsetParent) : 0);
      }

      SmoothScroll(getOffsetTop(this.container) - 70, 400);
    }
  }

  closeHandler() {
    const that = this;

    this.container.classList.add("removing");
    this.container.addEventListener("animationend", function onEnd() {
      that.container.removeEventListener("animationend", onEnd);
      that.props.toggleHandler();
    });
  }

  render() {
    const {item, color, toggleHandler, enlargePictureHandler} = this.props;

    return item.expanded ?
      (
        <div className="portfolio__item__container--expanded" ref={(container) => this.container = container}>
          <div className="portfolio__item" style={{borderColor: color}}>
            <div className="portfolio__item__title" onClick={() => this.closeHandler()}>
              <span className="portfolio__item__title__name">{item.name}</span>
              <span className="portfolio__item__title__year">({item.year})</span>
            </div>

            <div className="portfolio__item__pic" onClick={enlargePictureHandler}>
              <PinnedPic picture={item.picture} x={item.pictureX} y={item.pictureY}/>
            </div>

            <div className="portfolio__item__details">
              {item.description && (
                <div className="portfolio__item__details__description">
                  <ReactMarkdown source={item.description}/>
                </div>
              )}

              {item.link && (
                <div className="portfolio__item__details__link">
                  <span className="portfolio__item__details__label">Link: </span><a href={item.link} target="_blank">{item.link}</a>
                </div>
              )}
            </div>
          </div>
        </div>
      ) :
      (
        <div className="portfolio__item__container" ref={(container) => this.container = container}>
          <div className="portfolio__item__inside-container">
            <div className={ClassNames("portfolio__item", {"portfolio__item--magnify": this.props.autoOpen})} onClick={toggleHandler} style={{borderColor: color}}>
              <div className="portfolio__item__preview__pic">
                <PinnedPic picture={item.picture} x={item.pictureX} y={item.pictureY}/>
              </div>
              <div className="portfolio__item__preview__title">
                <span className="portfolio__item__preview__title__name">{item.name}</span>
                <span className="portfolio__item__preview__title__year">({item.year})</span>
              </div>
            </div>
          </div>
        </div>
      );
  }
}


export const Item = connect(
  (store, ownProps) => ({
    color: ownProps.color,
  }),

  (dispatch, ownProps) => ({
    enlargePictureHandler: () => dispatch(setOverlay(ownProps.item.picture)),
    toggleHandler: () => {
      if (ownProps.autoOpen)
        dispatch(setOverlay(ownProps.item.picture));
      else
        ownProps.onToggle();
    }
  })
)(DisplayItem);