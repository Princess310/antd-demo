/*
 *
 * UserAuthorize
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import pallete from 'styles/colors';

import AppContent from 'components/AppContent';
import Avatar from 'components/Avatar';
import FlexRow from 'components/FlexRow';
import UploadGrid from 'components/UploadGrid';
import { NavBar, Result, List, Icon, WhiteSpace, Button } from 'antd-mobile';
import { makeSelectUserAuthInfo, makeSelectUserAuthFiles } from 'containers/UserCenter/selectors';
import { fetchAuthInfo, loadAuthFiles, saveAuthInfo } from 'containers/UserCenter/actions';

const verifyStyle = {
  marginLeft: '0.12rem',
  color: pallete.text.yellow,
};

const btnStyle = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  borderRadius: 0,
};

const Item = List.Item;
const Brief = Item.Brief;
export class UserAuthorize extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { getAuthInfo } = this.props;

    getAuthInfo();
  }

  componentWillUnmount() {
    this.props.saveAuthFiles(false);
  }

  handleSave = () => {
    const { authFiles, saveAuth } = this.props;

    if (authFiles) {
      const info = authFiles[authFiles.length - 1];

      saveAuth({
        uids: '',
        ...info,
      });
    }
  }

  render() {
    const { authInfo, authFiles } = this.props;
    let contentView = null;

    if (authInfo) {
      const { auth, user_info } = authInfo;
      const { friend, material } = auth;
      const materialInfo = material[0];

      let verifyItem = null;
      switch (Number(user_info.verify_status)) {
        case 0:
          verifyItem = (
            <FlexRow style={{ justifyContent: 'flex-end' }}>
              <Icon type={require('icons/ali/感叹号提示.svg')} color={pallete.text.yellow} />
              <span style={verifyStyle}>未认证</span>
            </FlexRow>
          );
          break;
        case -1:
          verifyItem = (
            <span style={verifyStyle}>认证失败</span>
          );
          break;
        case 1:
          verifyItem = (
            <span style={verifyStyle}>认证中</span>
          );
          break;
        case 2:
          verifyItem = (
            <span style={verifyStyle}>认证成功</span>
          );
          break;
        default:
          break;
      }

      contentView = (
        <div>
          <List>
            <Item
              key={1}
              thumb={<Avatar
                size="0.8rem"
                id={user_info.id}
                avatar={user_info.avatar}
                isVip={Number(user_info.verify_status) === 2}
              />}
              multipleLine
              extra={verifyItem}
            >
              <span>{user_info.nickname}</span>
              <Brief>{user_info.tag_identity_name}</Brief>
            </Item>
          </List>
          <WhiteSpace size="md" />
          <Result
            title={<div style={{ fontSize: '0.32rem' }}>上传身份证明</div>}
            message="可上传工牌 身份证 名片"
          />
          <UploadGrid 
            style={{ position: 'relative', top: '-2px', paddingBottom: '1.2rem' }}
            url={authFiles ? authFiles[authFiles.length -1].url : (materialInfo ? materialInfo.url : '')}
            onClick={() => {
              if (!materialInfo || Number(materialInfo.status) !== 0) {
                browserHistory.push('/userAuthorizeFiles');
              }
            }}
          >
          </UploadGrid>
        </div>
      );
    }

    return (
      <div>
         <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
        >
          用户认证
        </NavBar>
        <AppContent>
          <WhiteSpace size="md" />
          <Result
            title={<div style={{ fontSize: '0.32rem' }}>上传材料证明职业身份</div>}
            message="职位认证后将点亮图标，获得优质人脉的关注"
          />
          <WhiteSpace size="md" />
          {contentView}
        </AppContent>
        <Button className="btn" style={btnStyle} type="primary" disabled={!authFiles} onClick={this.handleSave}>提交</Button>
      </div>
    );
  }
}

UserAuthorize.propTypes = {
  authInfo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  authFiles: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  getAuthInfo: PropTypes.func,
  saveAuthFiles: PropTypes.func,
  saveAuth: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  authInfo: makeSelectUserAuthInfo(),
  authFiles: makeSelectUserAuthFiles(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAuthInfo: () => dispatch(fetchAuthInfo()),
    saveAuthFiles: (files) => dispatch(loadAuthFiles(files)),
    saveAuth: (params) => dispatch(saveAuthInfo(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAuthorize);
