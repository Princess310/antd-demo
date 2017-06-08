/**
*
* TouchLoader
*
*/

import React, { PropTypes } from 'react';
import './styles.scss';

const STATS = {
  init: '',
  pulling: 'pulling',
  enough: 'pulling enough',
  refreshing: 'refreshing',
  refreshed: 'refreshed',
  reset: 'reset',

  loading: 'loading'// loading more
};

class TouchLoader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    
    this.state = {
      loaderState: STATS.init,
      pullHeight: 0,
      progressed: 0
    }
  }

  static defaultProps = {
    distanceToRefresh: 100,
    autoLoadMore: 1
  }

  componentWillReceiveProps(nextProps) {
    const { refreshing, loading } = nextProps;

    if(nextProps.initializing < 2) {
      this.setState({
        progressed: 0 // reset progress animation state
      });
    }

    // refresh
    if (refreshing) {
      this.setState({
        loaderState: STATS.refreshing,
      });
    } else {
      this.setState({
        loaderState: STATS.init,
        pullHeight: 0
      });
    }

    // loading
    if (loading) {
      this.setState({
        loaderState: STATS.loading,
      });
    } else {
      this.setState({
        loaderState: STATS.init,
      });
    }
  }

  calculateDistance = (touch) => {
    return touch.clientY - this._initialTouch.clientY;
  }

  // 拖拽的缓动公式 - easeOutSine
  easing = (distance) => {
    // t: current time, b: begInnIng value, c: change In value, d: duration
    const t = distance;
    const b = 0;
    const d = screen.availHeight; // 允许拖拽的最大距离
    const c = d / 2.5; // 提示标签最大有效拖拽距离

    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  }

  canRefresh = () => {
    return this.props.onRefresh && [STATS.refreshing, STATS.loading].indexOf(this.state.loaderState) < 0;
  }

  touchStart = (e) => {
    if(!this.canRefresh()) return;
    if(e.touches.length == 1) this._initialTouch = {
      clientY: e.touches[0].clientY,
      scrollTop: this.refs.panel.scrollTop
    };
  }

  touchMove = (e) => {
    if(!this.canRefresh()) return;
    var scrollTop = this.refs.panel.scrollTop;
    var distance = this.calculateDistance(e.touches[0]);

    if(distance > 0 && scrollTop <= 0){
      var pullDistance = distance - this._initialTouch.scrollTop;
      if(pullDistance < 0) {
        // 修复webview滚动过程中touchstart时计算panel.scrollTop不准
        pullDistance = 0;
        this._initialTouch.scrollTop = distance;
      }
      var pullHeight = this.easing(pullDistance);
      if(pullHeight) e.preventDefault();// 减弱滚动

      this.setState({
        loaderState: pullHeight > this.props.distanceToRefresh ? STATS.enough : STATS.pulling,
        pullHeight: pullHeight
      });
    }
  }

  touchEnd = () => {
    if (!this.canRefresh()) return;
    var endState = {
        loaderState: STATS.reset,
        pullHeight: 0
    };

    if (this.state.loaderState == STATS.enough) {
      // refreshing
      this.setState({
        loaderState: STATS.refreshing,
        pullHeight: 0
      });

      // trigger refresh action
      this.props.onRefresh && this.props.onRefresh();
    } else {
      this.setState(endState);// reset
    }
  }

  loadMore = () => {
    this.setState({ loaderState: STATS.loading });

    this.props.onLoadMore && this.props.onLoadMore();
  }

  onScroll = (e) => {
    if(
      this.props.autoLoadMore &&
      this.props.hasMore &&
      this.state.loaderState != STATS.loading
    ) {
      const panel = e.currentTarget;
      const scrollBottom = panel.scrollHeight - panel.clientHeight - panel.scrollTop;

      if(scrollBottom < 5) this.loadMore();
    }
  }

  animationEnd = () => {
    let newState = {};

    if(this.state.loaderState == STATS.refreshed) newState.loaderState = STATS.init;
    if(this.props.initializing > 1) newState.progressed = 1;

    this.setState(newState);
  }

  render() {
    const {
      className,
      hasMore,
      initializing,
      style,
    } = this.props;

    const {
      loaderState,
      pullHeight,
      progressed,
    } = this.state;

    const footer = hasMore ? (
        <div className="tloader-footer">
            <div className="tloader-btn" onClick={this.loadMore}/>
            <div className="tloader-loading"><i className="ui-loading"/></div>
        </div>
    ) : null;

    const bodyStyle = pullHeight ? {
        WebkitTransform: `translate3d(0,${pullHeight}px,0)`
    } : null;

    let progressClassName = '';

    if(!progressed){
      if(initializing > 0) progressClassName += ' tloader-progress';
      if(initializing > 1) progressClassName += ' ed';
    }

    return (
      <div ref="panel"
        className={`tloader state-${loaderState} ${className}${progressClassName}`}
        onScroll={this.onScroll}
        onTouchStart={this.touchStart}
        onTouchMove={this.touchMove}
        onTouchEnd={this.touchEnd}
        onAnimationEnd={this.animationEnd}
        style={style}
      >
        <div className="tloader-symbol">
          <div className="tloader-msg"><i/></div>
          <div className="tloader-loading"><i className="ui-loading"/></div>
        </div>
        <div className="tloader-body" style={bodyStyle}>{this.props.children}</div>
        {footer}
      </div>
    );
  }
}

TouchLoader.propTypes = {
  className: PropTypes.string,
  hasMore: PropTypes.bool,
  initializing: PropTypes.number,
  style: PropTypes.object,
  refreshing: PropTypes.bool,
  loading: PropTypes.bool,
};

export default TouchLoader;
