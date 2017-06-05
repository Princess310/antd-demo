import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
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

  .home-container {
    height: 100%;
    padding-bottom: 1rem;
  }

  .user-edit-basic {
    .am-list-item .am-input-control input {
      text-align: right;
    }
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

  .t-l {
    text-align: left;
  }

  .t-c {
    text-align: center;
  }

  .t-r {
    text-align: right;
  }

  .am-result .am-result-pic {
    display: flex;
    align-items: cener;
    justify-content: center;
  }
`;
