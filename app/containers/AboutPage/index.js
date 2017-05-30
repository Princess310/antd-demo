/*
 *
 * AboutPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { browserHistory } from 'react-router';

import { NavBar, List, WhiteSpace, } from 'antd-mobile';
import Avatar from 'components/Avatar';
import FlexCenter from 'components/FlexCenter';

import logo from 'assets/images/logo-icon.png';
import messages from './messages';

const Item = List.Item;
export class AboutPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <NavBar
          leftContent="back"
          mode="light"
          onLeftClick={() => browserHistory.goBack()}
        >
          关于健康商信
        </NavBar>
        <WhiteSpace size="md" />
        <FlexCenter>
          <Avatar id='' avatar={logo} />
        </FlexCenter>
        <WhiteSpace size="md" />
        <FlexCenter style={{ fontSize: '0.24rem' }}>V1.5.0</FlexCenter>
        <WhiteSpace size="md" />
        <List>
          <Item
            arrow="horizontal"
            onClick={() => {
              browserHistory.push({
                pathname: 'browser',
                state: {
                  link: 'http://djkwlw.com/app_help.html',
                  title: '常见问题与帮助',
                }
              });
            }}
          >常见问题与帮助</Item>
        </List>
      </div>
    );
  }
}

AboutPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(AboutPage);
