/**
 * Created by Jakub Matuška on 07.04.2017.
 */
import React from 'react';
import {connect} from 'react-redux';

require('./_style.scss');


class PinnedPic extends React.Component {
  componentDidMount() {
    this.resizeHandler = this.resizeHandler.bind(this);

    this.targetSize = 30;

    const img = new Image();
    img.src = this.props.picture;

    let that = this;

    img.onload = () => {
      that.pictureW = img.naturalWidth;
      that.pictureH = img.naturalHeight;

      window.addEventListener('resize', that.resizeHandler);
      that.hasMounted = true;

      that.resizeHandler();
    };
  }

  componentWillUnmount() {
    if (!this.hasMounted)
      return;

    window.removeEventListener('resize', this.resizeHandler);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.picture !== this.props.picture) {
      const img = new Image();
      img.src = this.props.picture;

      let that = this;

      img.onload = () => {
        that.pictureW = img.naturalWidth;
        that.pictureH = img.naturalHeight;

        that.resizeHandler();
      }
    }
    else {
      this.resizeHandler();
    }
  }

  resizeHandler() {
    const {centerX, centerY} = this.props;

    const containerW = this.container.scrollWidth;
    const containerH = this.container.scrollHeight;

    /*console.log("picture: ", this.pictureW, this.pictureH);
     console.log("container: ", containerW, containerH);
     console.log("center: ", centerX, centerY);*/

    let calculatedX = Math.max(
      Math.min(
        -centerX + containerW / 2,
        0
      ),
      -this.pictureW + containerW
    );

    let calculatedY = Math.max(
      Math.min(
        -centerY + containerH / 2,
        0
      ),
      -this.pictureH + containerH
    );

    if (this.pictureW < containerW)
      calculatedX = containerW / 2 - this.pictureW / 2;

    if (this.pictureH < containerH)
      calculatedY = containerH / 2 - this.pictureH / 2;

    this.container.style.backgroundPositionX = calculatedX + 'px';
    this.container.style.backgroundPositionY = calculatedY + 'px';

    const targetPos = {
      x: calculatedX + centerX - this.targetSize / 2,
      y: calculatedY + centerY - this.targetSize / 2
    };

    if(this.props.showTarget) {
      this.target.style.left = targetPos.x + "px";
      this.target.style.top = targetPos.y + "px";
    }
  }

  render() {
    return (
      <div className="pinnedPic-wrapper">
        {this.props.showTarget && <div className="pinnedPic-target" ref={(target) => this.target = target} />}
      <div
        className="pinnedPic"
        ref={(container) => this.container = container}
        style={{
          backgroundImage: 'url(' + this.props.picture + ')',
        }}
      >

      </div>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    centerX: ownProps.x,
    centerY: ownProps.y,
    picture: ownProps.picture,
    showTarget: ownProps.showTarget
  }),

  (dispatch, ownProps) => ({})
)(PinnedPic);
