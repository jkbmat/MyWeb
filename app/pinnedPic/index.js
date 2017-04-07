/**
 * Created by Jakub Matuška on 07.04.2017.
 */
import React from 'react';
import {connect} from 'react-redux';

require('./_style.scss');


class PinnedPic extends React.Component {
  componentDidMount() {
    const img = new Image();
    img.src = this.props.picture;
    let that = this;

    img.onload = () => {
      that.pictureW = img.naturalWidth;
      that.pictureH = img.naturalHeight;

      window.addEventListener('resize', this.resizeHandler.bind(that));
      that.hasMounted = true;

      this.resizeHandler();
    };
  }

  componentWillUnmount() {
    if (!this.hasMounted)
      return;

    window.removeEventListener('resize', this.resizeHandler.bind(this));
  }

  resizeHandler() {
    const { centerX, centerY } = this.props;

    const containerW = this.container.scrollWidth;
    const containerH = this.container.scrollHeight;

    /*console.log("picture: ", this.pictureW, this.pictureH);
    console.log("container: ", containerW, containerH);
    console.log("center: ", centerX, centerY);*/

    let calculatedCenterX = Math.max(
      Math.min(
        -centerX + containerW / 2,
        0
      ),
      -this.pictureW + containerW
    );

    let calculatedCenterY = Math.max(
      Math.min(
        -centerY + containerH / 2,
        0
      ),
      -this.pictureH + containerH
    );

    if (this.pictureW < containerW)
      calculatedCenterX = containerW / 2 - this.pictureW / 2;

    if (this.pictureH < containerH)
      calculatedCenterY = containerH / 2 - this.pictureH / 2;

    this.container.style.backgroundPositionX = calculatedCenterX + 'px';
    this.container.style.backgroundPositionY = calculatedCenterY + 'px';
  }

  render () {
    return (
      <div
        className="pinnedPic"
        ref={(container) => this.container = container}
        style={{
          background: 'url('+this.props.picture+')',
          backgroundRepeat: 'no-repeat'
        }}
      />
    );
  }
}

export default connect(
  (state, ownProps) => ({
    centerX: ownProps.x,
    centerY: ownProps.y,
    picture: ownProps.picture
  }),

  (dispatch, ownProps) => ({})
)(PinnedPic);
