/*
 *
 * GuidePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import pallete from 'styles/colors';
import oss from 'utils/oss';
import request from 'utils/request';

import { browserHistory } from 'react-router';
import { makeSelectCurrentUser } from 'containers/HomePage/selectors';
import { makeSelectUserCenterIndustrySon } from 'containers/UserCenter/selectors';

import { NavBar, List, WhiteSpace, WingBlank, Button, InputItem } from 'antd-mobile';
import Avatar from 'components/Avatar';
import AppContent from 'components/AppContent';

const FileWrapper = styled.div`
  height: 3.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${pallete.white};
`;

const FileItem = styled.input`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  opacity: 0;
  font-size: 0;
`;

const Item = List.Item;
const inputStyle = {
  height: '0.48rem',
  minHeight: '0.48rem',
  paddingRight: 0,
};
export class GuidePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    const { currentUser, industrySon } = props;
    this.state = {
      id: currentUser.id,
      verify_status: currentUser.verify_status,
      avatar: currentUser.avatar,
      nickname: currentUser.nickname,
      company: currentUser.company,
      position: currentUser.position,
      tag_identity_id: currentUser.tag_identity_id,
      tag_identity_name: currentUser.tag_identity_name,
      main_service_id: currentUser.main_service_id,
      main_service_name: currentUser.main_service_name,
      industry_son_id: industrySon,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { currentUser, industrySon } = nextProps;

    this.setState({
      id: currentUser.id,
      verify_status: currentUser.verify_status,
      avatar: currentUser.avatar,
      nickname: currentUser.nickname,
      company: currentUser.company,
      position: currentUser.position,
      tag_identity_id: currentUser.tag_identity_id,
      tag_identity_name: currentUser.tag_identity_name,
      main_service_id: currentUser.main_service_id,
      main_service_name: currentUser.main_service_name,
      industry_son_id: industrySon,
    });
  }

  handleNickname = (value) => {
    this.setState({
      nickname: value,
    });
  }

  handleCompany = (value) => {
    this.setState({
      company: value,
    });
  }

  handlePosition= (value) => {
    this.setState({
      position: value,
    });
  }

  handleFileChange = (e) => {
    const { id } = this.state;
    const file = e.target.files[0];

    if (file) {
      const { name, size } = file;

      const path = `${oss.getFolderPath('avatar', id)}__${size}__${oss.getFileSuffix(name)}`;

      // upload file here
      oss.multipartUpload(path, file).then((res) => {
        const url = oss.getImgDomain(oss.getFileDomain() + oss.getFilePath(res.name));

        this.setState({
          avatar: url,
        });
      });
    }
  }

  saveInfo = () => {
    const { id, verify_status, avatar, nickname, company, position, tag_identity_id, main_service_id, industry_son_id } = this.state;

    request.doPut('user/complete-info', {
      avatar,
      nickname,
      industry_son_id,
      tag_identity_id,
      main_service_id,
      company,
      position,
    }).then(() => {
      browserHistory.push('/recentDemand');
    });
  }

  render() {
    const { id, verify_status, avatar, nickname, company, position, tag_identity_name, main_service_name } = this.state;
    return (
      <div className="user-edit-basic">
        <NavBar
          mode="light"
          iconName={false}
        >
          基本资料
        </NavBar>
        <AppContent>
          <FileWrapper>
            <div style={{ position: 'relative', height: '2rem', width: '2rem' }}>
              <Avatar
                id={id}
                avatar={avatar}
                size="2rem"
                isVip={Number(verify_status) === 2}
              />
              <FileItem type="file" accept="image/jpg,image/jpeg,image/png,image/gif" onChange={this.handleFileChange} />
            </div>
          </FileWrapper>
          <List>
            <Item
              extra={<InputItem
                maxLength={6}
                style={inputStyle}
                name="nickname"
                value={nickname}
                onChange={this.handleNickname}
                placeholder="输入姓名"
              ></InputItem>}
            >真实姓名</Item>
            <Item
              extra={<InputItem
                maxLength={6}
                style={inputStyle}
                name="company"
                value={company}
                onChange={this.handleCompany}
                placeholder="填写公司"
              ></InputItem>}
            >公司/个体</Item>
            <Item
              extra={<InputItem
                maxLength={20}
                style={inputStyle}
                name="position"
                value={position}
                onChange={this.handlePosition}
                placeholder="填写职位"
              ></InputItem>}
            >职位</Item>
            <Item
              extra={tag_identity_name}
              arrow="horizontal"
              onClick={() => {
                browserHistory.push('/userEditIdentity');
              }}
            >选择行业角色</Item>
            <Item
              extra={main_service_name}
              arrow="horizontal"
              onClick={() => {
                browserHistory.push('/userEditService');
              }}
            >选择主营类别</Item>
          </List>
          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
          <WingBlank>
            <Button className="btn" type="primary" onClick={this.saveInfo}>下一步</Button>
          </WingBlank>
        </AppContent>
      </div>
    );
  }
}

GuidePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentUser: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  industrySon: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  industrySon: makeSelectUserCenterIndustrySon(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GuidePage);
