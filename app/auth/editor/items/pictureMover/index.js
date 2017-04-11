/**
 * Created by Jakub Matuška on 07.04.2017.
 */

import React from 'react';
import {connect} from 'react-redux';

import PinnedPic from 'pinnedPic';

require('./_style.scss');


class PictureMover extends React.Component {
  componentDidMount() {
    this.mousedownHandler = this.mousedownHandler.bind(this);
    this.mouseupHandler = this.mouseupHandler.bind(this);
    this.mousemoveHandler = this.mousemoveHandler.bind(this);

    const img = new Image();
    img.src = this.props.picture;

    const that = this;

    img.onload = () => {
      that.pictureW = img.naturalWidth;
      that.pictureH = img.naturalHeight;

      that.container.addEventListener('mousedown', that.mousedownHandler);
      that.hasMounted = true;
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.picture !== this.props.picture) {
      const img = new Image();
      img.src = this.props.picture;

      let that = this;

      img.onload = () => {
        that.pictureW = img.naturalWidth;
        that.pictureH = img.naturalHeight;
      }
    }
  }

  componentWillUnmount() {
    if (!this.hasMounted)
      return;

    this.container.removeEventListener('mousedown', this.mousedownHandler);
    window.removeEventListener('mouseup', this.mouseupHandler);
    window.removeEventListener('mousemove', this.mousemoveHandler);
  }

  mousedownHandler(e) {
    this.startMouse = {x: e.pageX, y: e.pageY};
    this.startPos = {x: this.props.x, y: this.props.y};
    this.containerW = this.container.scrollWidth;
    this.containerH = this.container.scrollHeight;

    window.addEventListener('mouseup', this.mouseupHandler);
    window.addEventListener('mousemove', this.mousemoveHandler);

    e.preventDefault();
    e.stopPropagation();
  }

  mouseupHandler(e) {
    window.removeEventListener('mouseup', this.mouseupHandler);
    window.removeEventListener('mousemove', this.mousemoveHandler);

    e.preventDefault();
    e.stopPropagation();
  }

  mousemoveHandler(e) {
    const x = Math.max(0, Math.min(this.pictureW, this.startPos.x - (e.pageX - this.startMouse.x)));
    const y = Math.max(0, Math.min(this.pictureH, this.startPos.y - (e.pageY - this.startMouse.y)));

    this.props.onPosChange(x, y);

    e.preventDefault();
    e.stopPropagation();
  }

  render () {
    const {picture, x, y} = this.props;

    return (
      <div
        className="picture-mover"
        ref={(container) => this.container = container}
      >

        <PinnedPic picture={picture} x={x} y={y} showTarget="true" />
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    picture: ownProps.picture,
    x: ownProps.x,
    y: ownProps.y
  }),

  (dispatch, ownProps) => ({
    onPosChange: (x, y) => ownProps.posChangeHandler(x, y)
  })
)(PictureMover);
