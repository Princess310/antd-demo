/*
 *
 * AboutPage
 *
 * path --> /about
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import pallete from 'styles/colors';
import { NavBar, List, WhiteSpace, Icon } from 'antd-mobile';
import Avatar from 'components/Avatar';
import FlexCenter from 'components/FlexCenter';

import logo from 'assets/images/logo-icon.png';

const Item = List.Item;
export class AboutPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
        >
          关于健康商信
        </NavBar>
        <WhiteSpace size="md" />
        <FlexCenter>
          <Avatar id="" avatar={logo} />
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
                },
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
