/*
 *
 * UserInfo
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import pallete from 'styles/colors';

import ExpandContent from 'components/UserInfoCard/ExpandContent';
import Gallery from 'components/UserInfoCard/Gallery';
import UserInfoCard from 'components/UserInfoCard';
import { NavBar, Popover, Tabs, WhiteSpace, Icon } from 'antd-mobile';

import { makeSelectUserInfo } from 'containers/UserCenter/selectors';
import { makeSelectCurrentUser } from 'containers/HomePage/selectors';
import { fetchUserInfo, loadUserInfo } from 'containers/UserCenter/actions';

const Item = Popover.Item;
export class UserInfo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      visiblePopover: false,
      selected: '',
    };
  }

  componentWillMount() {
    const { location: { query: { id } }, getUserInfo } = this.props;

    getUserInfo(id);
  }
  
  componentWillUnmount() {
    this.props.saveUserInfo(false);
  }

  onSelect = (opt) => {
    // console.log(opt.props.value);
    this.setState({
      visible: false,
      selected: opt.props.value,
    });
  };
  handleVisibleChange = (visiblePopover) => {
    this.setState({
      visiblePopover,
    });
  };

  render() {
    const { userInfo } = this.props;

    return (
      <div>
        <NavBar
          leftContent="back"
          mode="light"
          onLeftClick={() => browserHistory.goBack()}
          rightContent={
            <Popover mask
              overlayClassName="fortest"
              overlayStyle={{ color: 'currentColor' }}
              visible={this.state.visiblePopover}
              overlay={[
                (<Item key="1" value="focus" data-seed="logId">关注</Item>),
                (<Item key="2" value="setting">资料设置</Item>),
                (<Item key="3" value="share">
                  分享健康商信名片
                </Item>),
              ]}
              align={{
                overflow: { adjustY: 0, adjustX: 0 },
                offset: [-26, 15],
              }}
              onVisibleChange={this.handleVisibleChange}
              onSelect={this.onSelect}
            >
              <div style={{
                height: '100%',
                padding: '0 0.3rem',
                marginRight: '-0.3rem',
                display: 'flex',
                alignItems: 'center',
              }}
              >
                <Icon type="ellipsis" />
              </div>
            </Popover>
          }
        >
          {userInfo ? userInfo.nickname : '用户详情'}
        </NavBar>
        {userInfo && (
          <div>
            <UserInfoCard user={userInfo} />
            {userInfo.intro !== '' && (
              <div>
                <WhiteSpace size="md" />
                <ExpandContent title="个人简介" content={userInfo.intro} />
              </div>
            )}
            {userInfo.business_intro !== '' && (
              <div>
                <WhiteSpace size="md" />
                <ExpandContent title="业务介绍" content={userInfo.business_intro} />
              </div>
            )}
            {
              userInfo.pictures.length > 0 && (
                <div>
                  <WhiteSpace size="md" />
                  <Gallery
                    title="展示图片"
                    pictures={userInfo.pictures}
                  />
                </div>
              )
            }
          </div>
        )}
      </div>
    );
  }
}

UserInfo.propTypes = {
  userInfo: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  currentUser: PropTypes.object,
  getUserInfo: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userInfo: makeSelectUserInfo(),
  currentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUserInfo: (id) => dispatch(fetchUserInfo(id)),
    saveUserInfo: (data) => dispatch(loadUserInfo(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
