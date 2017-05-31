/*
 *
 * UserEditBasic
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from 'containers/HomePage/selectors';
import { browserHistory } from 'react-router';

import { NavBar, List, WhiteSpace, InputItem } from 'antd-mobile';
import Avatar from 'components/Avatar';
import MenuBtn from 'components/MenuBtn';

import { saveUser } from 'containers/UserCenter/actions';
import oss from 'utils/oss';

import messages from './messages';
import styles from './styles.scss';

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
    }
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
    })
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
    const self = this;

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
    const { avatar, nickname, company, position } = this.state;

    saveUserInfo({
      avatar,
      nickname,
      company,
      position,
    });
  }

  render() {
    const { id, verify_status, avatar, nickname, company, position } = this.state;

    return (
      <div className="user-edit-basic">
        <NavBar
          leftContent="back"
          mode="light"
          onLeftClick={() => browserHistory.goBack()}
          rightContent={[
            <MenuBtn key="0" onClick={this.handleSave}>保存</MenuBtn>
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
                isVip={verify_status == 2}
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
