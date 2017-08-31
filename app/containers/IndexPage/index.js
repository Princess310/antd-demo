/*
 *
 * IndexPage
 * Try to handle old project hash things.
 * path --> index.html [see routes.js]
 * 
 * Note: this is try fix some things for old project: https://code.aliyun.com/alj/jkhz-mobile.git
 * So, try to know why to handle this param to link to current project.
 * maybe this page will handle some special index page things, so set it to state component
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { parseHash } from 'utils/utils';
import { WEB_ROOT } from 'utils/request';
import { browserHistory } from 'react-router';

export class IndexPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { location } = this.props;
    const { hash } = location;
    const hashParams = parseHash(hash);
    
    const { path, params } = hashParams;

    switch (path) {
      case 'groupEdit': {
        const { id } = params;

        window.location.href = `${WEB_ROOT}public_share.html?type=jk_group&id=${id}`;
        break;
      }
      default:
        browserHistory.push('/');
        break;
    }
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

IndexPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(IndexPage);
