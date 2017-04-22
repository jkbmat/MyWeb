/**
 * Created by Jakub Matuška on 28.01.2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import SmoothScroll from 'smoothscroll';
import ClassNames from 'classnames';

import Message from 'message';
import Navigation from 'navigation';
import LoggedInBar from 'auth/loggedInBar';
import {isLoggedIn} from 'utils';

import * as Actions from './actions';

require('./_style.scss');
const classNames = require('classnames');

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {scrollToTopVisible: false};
  }

  componentDidMount() {
    this.resizeHandler = this.resizeOverlay.bind(this);
    this.closeHandler = this.closeHandler.bind(this);
    this.scrollHandler = this.scrollHandler.bind(this);

    window.addEventListener("resize", this.resizeHandler);
    window.addEventListener("resize", this.scrollHandler);
    window.addEventListener("scroll", this.scrollHandler);

    this.resizeHandler();
  }

  componentDidUpdate() {
    this.resizeHandler();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeHandler);
    window.removeEventListener("resize", this.scrollHandler);
    window.removeEventListener("scroll", this.scrollHandler);
  }

  resizeOverlay() {
    if (!this.props.overlayPicture)
      return;

    const img = new Image();
    const that = this;
    img.src = this.props.overlayPicture;
    img.onload = () => {
      const containerSize = {
        w: that.overlayPicture.scrollWidth,
        h: that.overlayPicture.scrollHeight
      };

      const imageSize = {
        w: img.naturalWidth,
        h: img.naturalHeight
      };

      that.overlayPicture.style.backgroundSize = (containerSize.w < imageSize.w || containerSize.h < imageSize.h) ?
        "contain" : "auto";
      that.overlayPicture.style.backgroundImage = 'url(' + that.props.overlayPicture + ')';
    }
  }

  scrollHandler() {
    if (window.scrollY > screen.availHeight / 3) {
      this.setState({scrollToTopVisible: true});
    }
    else {
      this.setState({scrollToTopVisible: false});
    }
  }

  scrollTopHandler() {
    SmoothScroll(0, 400);
  }

  closeHandler() {
    this.overlay.classList.add("removing");
    this.overlay.addEventListener("animationend", this.props.closeOverlay);
  }

  render() {
    const {isLoggedIn, loading, title, children, overlayPicture} = this.props;

    return (
      <div className={classNames("page", {loading})}>
        <div
          className={ClassNames("scroll-to-top", "button", {
            "scroll-to-top--visible": this.state.scrollToTopVisible,
            "scroll-to-top--invisible": !this.state.scrollToTopVisible
          })}
          onClick={this.scrollTopHandler}>
          Back to the top ^
        </div>
        <Message />
        {isLoggedIn && <LoggedInBar />}
        <Navigation />
        <div className="photo-container">
          <div className="photo"></div>
        </div>
        <div className="main">
          <h1>{title}.</h1>
          {children}
        </div>
        {overlayPicture && (
          <div className="overlay" onClick={this.closeHandler} ref={(overlay) => this.overlay = overlay}>

            <div className="overlay-close button" onClick={this.closeHandler}>Close</div>

            <div
              className="picture-viewer"
              ref={(overlayPicture) => this.overlayPicture = overlayPicture}
            />
          </div>
        )}
      </div>
    );
  }
}


export default connect(
  (store, ownProps) => ({
    title: ownProps.title,
    loading: store.Loading,
    isLoggedIn: isLoggedIn(store),
    overlayPicture: store.OverlayPicture
  }),

  (dispatch, ownProps) => ({
    closeOverlay: () => dispatch(Actions.closeOverlay())
  })
)(Main);