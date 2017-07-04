/*
 *
 * UserEditBasic
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import pallete from 'styles/colors';

import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from 'containers/HomePage/selectors';
import { browserHistory } from 'react-router';

import { NavBar, List, WhiteSpace, InputItem, Icon, ActionSheet, Toast } from 'antd-mobile';
import Avatar from 'components/Avatar';
import MenuBtn from 'components/MenuBtn';

import { saveUser } from 'containers/UserCenter/actions';
import oss from 'utils/oss';

const FileItem = styled.input`
  position: absolute;
  top: 0;
  right: 0;
  width: 1.04rem;
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
export class UserEditBasic extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    const { currentUser } = props;
    this.state = {
      id: currentUser.id,
      verify_status: currentUser.verify_status,
      avatar: currentUser.avatar,
      nickname: currentUser.nickname,
      company: currentUser.company,
      position: currentUser.position,
      nature: currentUser.nature,

    };
  }

  componentWillReceiveProps(nextProps) {
    const { currentUser } = nextProps;

    this.setState({
      id: currentUser.id,
      verify_status: currentUser.verify_status,
      avatar: currentUser.avatar,
      nickname: currentUser.nickname,
      company: currentUser.company,
      position: currentUser.position,
      nature: currentUser.nature,
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

  handleNature = () => {
    const self = this;
    const BUTTONS = ['公司', '个体', '取消'];

    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      maskClosable: true,
    },
    (buttonIndex) => {
      if (buttonIndex === 0) {
        self.setState({
          nature: '公司',
          company: '',
          position: '',
        });
      } else if (buttonIndex === 1) {
        self.setState({
          nature: '个体',
          company: '',
          position: '',
        });
      }
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

  handleSave = () => {
    const { saveUserInfo } = this.props;
    const { avatar, nickname, company, position, nature } = this.state;

    if (nickname.trim().length > 6 || nickname.trim().length < 2) {
      Toast.info('真实姓名：2-6个字', 1.5);
      return;
    }

    if (company.trim().length > 15 || company.trim().length < 2) {
      Toast.info('公司：2-15个字', 1.5);
      return;
    }

    if (position.trim().length > 8 || position.trim().length < 2) {
      Toast.info('职位：2-8个字', 1.5);
      return;
    }

    saveUserInfo({
      avatar,
      nickname,
      company,
      position,
      nature,
    });
  }

  render() {
    const { id, verify_status, avatar, nickname, company, position, nature } = this.state;

    return (
      <div className="user-edit-basic">
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
          rightContent={[
            <MenuBtn key="0" onClick={this.handleSave}>保存</MenuBtn>,
          ]}
        >
          基本资料
        </NavBar>
        <WhiteSpace size="md" />
        <List>
          <Item
            extra={<div style={{ position: 'relative' }}>
              <Avatar
                id={id}
                avatar={avatar}
                isVip={Number(verify_status) === 2}
              />
              <FileItem type="file" accept="image/jpg,image/jpeg,image/png,image/gif" onChange={this.handleFileChange} />
            </div>}
          >头像</Item>
        </List>
        <WhiteSpace size="md" />
        <List>
          <Item
            extra={<InputItem
              maxLength={6}
              style={inputStyle}
              name="nickname"
              value={nickname}
              onChange={this.handleNickname}
              placeholder="必填"
            ></InputItem>}
          >真实姓名</Item>
          <Item extra={<div style={{ color: '#000' }}>{nature}</div>} onClick={this.handleNature}>公司性质</Item>
          <Item
            extra={<InputItem
              maxLength={15}
              style={inputStyle}
              name="company"
              value={company}
              onChange={this.handleCompany}
              placeholder={`输入${nature}名称`}
            ></InputItem>}
          >{nature}</Item>
          <Item
            extra={<InputItem
              maxLength={8}
              style={inputStyle}
              name="position"
              value={position}
              onChange={this.handlePosition}
              placeholder="输入职位名称"
            ></InputItem>}
          >职位</Item>
        </List>
      </div>
    );
  }
}

UserEditBasic.propTypes = {
  currentUser: PropTypes.object,
  saveUserInfo: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    saveUserInfo: (params) => dispatch(saveUser(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEditBasic);
