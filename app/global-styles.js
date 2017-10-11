import { injectGlobal } from 'styled-components';
import pallete from 'styles/colors';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    margin: 0;
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: #4d5059;
    font-size: 0.32rem;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  .app-browser {
    position: absolute;
    top: 0.9rem;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .app-content {
    position: absolute;
    top: 0.9rem;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    & .am-list-body {
      background-color: ${pallete.background.antd};
    }
  }

  .app-cms-content {
    img {
      width: 100% !important;
      height: auto;
    }
  }

  .mark-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .home-container {
    height: 100%;
    padding-bottom: 1rem;
  }

  .user-edit-basic {
    .am-list-item .am-input-control input {
      text-align: right;
    }
  }

  .am-tabs-bar {
    z-index: 10;
  }

  .moment-detail-tabs {
    .am-tabs-bar {
      padding-right: 3rem;
      background-color: #fff;
      border-bottom: 1PX solid #ddd;

      .am-tabs-tab {
        border-bottom: none;
      }
    }
  }

  .am-accordion {
    &.select-friend-accordion {
      .am-accordion-item .am-accordion-header {
        padding-left: 0.84rem;
        .arrow {
          left: 0.3rem;
          right: initial;
          transform: rotate(0);
        }
        &[aria-expanded~="true"] {
          .arrow {
            transform: rotate(90deg);
          }
        }
      }
    }
  }

  .am-segment {
    &.demand-dot {
      .am-segment-item {
        &:first-child {
          &:after {
            position: absolute;
            top: 0.16rem;
            right: 0.2rem;
            width: 0.16rem;
            height: 0.16rem;
            content: '';
            background-color: #ff5b05;
            border-radius: 50%;
          }
        }
      }
    }
    &.supplier-dot {
      .am-segment-item {
        &:last-child {
          &:after {
            position: absolute;
            top: 0.16rem;
            right: 0.2rem;
            width: 0.16rem;
            height: 0.16rem;
            content: '';
            background-color: #ff5b05;
            border-radius: 50%;
          }
        }
      }
    }
  }

  .am-tabs-bar .am-tabs-tab {
    align-items: center;
  }

  .t-l {
    text-align: left;
  }

  .t-c {
    text-align: center;
  }

  .t-r {
    text-align: right;
  }

  .am-navbar {
    border-bottom: 0.01rem #f0f0f0 solid;
  }

  .am-result .am-result-pic {
    display: flex;
    align-items: cener;
    justify-content: center;
  }

  .am-search .am-search-input .am-search-clear {
    top: 0.12rem;
    right: 0.12rem;
  }

  .introduce-input-item.am-list-item.am-input-item {
    padding: 0 0.24rem;
    height: 0.6rem;
    min-height: 0.6rem;
    background-color: #f0f0f0;

    &:after {
      display: none;
    }
  }

  .cms-service-item.am-list-item {
    padding-left: 0;
  }

  .am-button-primary {
    background-color: rgb(80, 171, 241);
    border: 1px solid rgb(80, 171, 241);
  }

  .am-list .am-switch input[type="checkbox"]:checked + .checkbox {
    background: #50abf1;
  }

  .pswp__top-bar {
    height: 0.88rem;
  }

  .pswp__button, .pswp__button--arrow--left:before, .pswp__button--arrow--right:before {
    background-size: 5.28rem 1.76rem;
    height: 0.88rem;
    width: 0.88rem;
  }
  
  .pswp__button--close {
    background-position: 0 -0.88rem;
  }

  .pswp__counter {
    height: 0.88rem;
    font-size: 0.26rem;
    line-height: 0.88rem;
  }

  .animated {
    animation-duration: 0.5s;
    animation-fill-mode: both;
  }

  .animated-2 {
    animation-duration: 1s;
    animation-fill-mode: both;
  }

  @keyframes fadeInUp {
    from {
      opacity: .5;
      transform: translate3d(0, 100%, 0);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  .fadeInUp {
    animation-name: fadeInUp;
  }

  @keyframes fadeInDown {
    from {
      opacity: .5;
      transform: translate3d(0, -100%, 0);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  .fadeInDown {
    animation-name: fadeInDown;
  }

  @keyframes zoomIn {
    from {
      opacity: 0;
      transform: scale3d(.3, .3, .3);
    }
  
    50% {
      opacity: 1;
    }
  }
  
  .zoomIn {
    animation-name: zoomIn;
  }

  .ball-pulse > div:nth-child(0) {
    animation: loaderScale 0.75s 0s infinite cubic-bezier(.2, .68, .18, 1.08);
  }
  .ball-pulse > div:nth-child(1) {
    animation: loaderScale 0.75s 0.12s infinite cubic-bezier(.2, .68, .18, 1.08);
  }
  .ball-pulse > div:nth-child(2) {
    animation: loaderScale 0.75s 0.24s infinite cubic-bezier(.2, .68, .18, 1.08);
  }
  .ball-pulse > div:nth-child(3) {
    animation: loaderScale 0.75s 0.36s infinite cubic-bezier(.2, .68, .18, 1.08);
  }

  .ball-pulse > div {
    background-color: #fff;
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 100%;
    margin: 0.04rem;
    display: inline-block;
  }

  @keyframes loaderScale {
    0% {
      transform: scale(1);
      opacity: 1;
    }
  
    45% {
      transform: scale(0.1);
      opacity: 0.7;
    }
  
    80% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;
