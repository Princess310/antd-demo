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
`;
