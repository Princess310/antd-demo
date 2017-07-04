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
import { makeSelectUserCenterIndustrySon, makeSelectUserCenterIndustry, makeSelectUserCenterService } from 'containers/UserCenter/selectors';
import { fetchIndustry, fetchService } from 'containers/UserCenter/actions';
import { loadUser } from 'containers/App/actions';

import { NavBar, List, WhiteSpace, WingBlank, Button, InputItem, ActionSheet, Popup, Modal, Radio, Icon, Toast } from 'antd-mobile';
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
const alert = Modal.alert;
const RadioItem = Radio.RadioItem;
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
      nature: currentUser.nature,
      tag_identity_id: currentUser.tag_identity_id,
      tag_identity_name: currentUser.tag_identity_name,
      main_service_id: currentUser.main_service_id,
      main_service_name: currentUser.main_service_name,
      // view to show
      showIndustry: false,
      showService: false,
    };
  }

  componentDidMount() {
    const { getIndustry, industryList } = this.props;

    // fetch industry list here
    if (!industryList) {
      getIndustry();
    }
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
      nature: currentUser.nature,
      industry_son_id: industrySon,
      tag_identity_id: currentUser.tag_identity_id,
      tag_identity_name: currentUser.tag_identity_name,
      main_service_id: currentUser.main_service_id,
      main_service_name: currentUser.main_service_name,
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

  handleChangeIndustry = (id, name) => {
    const { getService } = this.props;

    // refresh service list
    getService(id);

    this.setState({
      tag_identity_id: id,
      tag_identity_name: name,
      main_service_id: '',
      main_service_name: '',
      showIndustry: false,
    });
  }

  handleChangeService = (id, name) => {
    this.setState({
      main_service_id: id,
      main_service_name: name,
      showService: false,
    });
  }

  handleSelectIndustry = () => {
    const self = this;
    const { currentUser } = this.props;
    const editNumber = currentUser.role_edit_number;

    if (editNumber && editNumber >= 2) {
      alert('您已经修改过行业角色信息，不能再次修改', '', [
        { text: '我知道了', onPress: () => console.log('confirm') },
      ])
    } else {
      if (currentUser.tag_identity_id !== '') {
        alert('行业角色信息只能修改一次，并且会清空您之前的所有信息，请谨慎修改', '', [
          { text: '我知道了', onPress: () => console.log('cancel') },
          { text: '确定修改', onPress: () => {
             self.setState({
              showIndustry: true,
            });
          }, style: { fontWeight: 'bold' } },
        ]);
      } else {
        this.setState({
          showIndustry: true,
        });
      }
    };
  }

  saveInfo = () => {
    const { id, verify_status, avatar, nickname, company, position, tag_identity_id, main_service_id, industry_son_id, nature } = this.state;
    const { setUser } = this.props;

    if (!tag_identity_id || tag_identity_id === '') {
      Toast.info('未选择行业角色', 1.2);
      return;
    }

    if (!main_service_id || main_service_id === '') {
      Toast.info('未选择主营类别', 1.2);
      return;
    }

    request.doPut('user/complete-info', {
      avatar,
      nickname,
      industry_son_id,
      tag_identity_id,
      main_service_id,
      company,
      position,
      nature,
    }).then((res) => {
      const { data, list } = res;
      const { point: { is_popup, message } } = list;
      if (is_popup === 0) {
        Toast.info(message, 1.2);
      }

      setUser(data);
      browserHistory.push('/recentDemand');
    });
  }

  render() {
    const {
      id,
      verify_status,
      avatar,
      nickname,
      company,
      position,
      tag_identity_name,
      main_service_name,
      nature,
      showIndustry,
      showService,
      tag_identity_id,
      main_service_id,
    } = this.state;

    const { industryList, serviceList } = this.props;

    const listView = industryList ? industryList.map((industry) => (
      <RadioItem
        key={industry.id}
        checked={Number(tag_identity_id) === Number(industry.id)}
        onChange={() => this.handleChangeIndustry(industry.id, industry.name)}
      >
        {industry.name}
      </RadioItem>
    )) : null;

    const serviceListView = serviceList ? serviceList.map((service) => (
      <RadioItem
        key={service.id}
        checked={Number(main_service_id) === Number(service.id)}
        onChange={() => this.handleChangeService(service.id, service.name)}
      >
        {service.name}
      </RadioItem>
    )) : null;
    
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
            <Item extra={<div style={{ color: '#000' }}>{nature}</div>} onClick={this.handleNature}>公司性质</Item>
            <Item
              extra={<InputItem
                maxLength={6}
                style={inputStyle}
                name="company"
                value={company}
                onChange={this.handleCompany}
                placeholder={`输入${nature}名称`}
              ></InputItem>}
            >{nature}</Item>
            <Item
              extra={<InputItem
                maxLength={20}
                style={inputStyle}
                name="position"
                value={position}
                onChange={this.handlePosition}
                placeholder="填写职位名称"
              ></InputItem>}
            >职位</Item>
            <Item
              extra={tag_identity_name}
              arrow="horizontal"
              onClick={this.handleSelectIndustry}
            >选择行业角色</Item>
            <Item
              extra={main_service_name}
              arrow="horizontal"
              onClick={() => {
                serviceList && this.setState({
                  showService: true,
                });
              }}
            >选择主营类别</Item>
          </List>
          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
          <WingBlank>
            <Button className="btn" type="primary" onClick={this.saveInfo}>下一步</Button>
          </WingBlank>
        </AppContent>
        {showIndustry && <AppContent style={{ top: 0, zIndex: 100, background: pallete.white }}>
          <NavBar
            mode="light"
            iconName={false}
            leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
            onLeftClick={() => {
              this.setState({
                showIndustry: false,
              });
            }}
          >
            行业角色
          </NavBar>
          <WhiteSpace size="md" />
          <List>
            {listView}
          </List>
        </AppContent>}

        {showService && <AppContent style={{ top: 0, zIndex: 100, background: pallete.white }}>
          <NavBar
            mode="light"
            iconName={false}
            leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
            onLeftClick={() => {
              this.setState({
                showService: false,
              });
            }}
          >
            主营类别
          </NavBar>
          <WhiteSpace size="md" />
          <List>
            {serviceListView}
          </List>
        </AppContent>}
      </div>
    );
  }
}

GuidePage.propTypes = {
  currentUser: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  industrySon: PropTypes.string,
  industryList: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  serviceList: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  getIndustry: PropTypes.func,
  getService: PropTypes.func,
  setUser: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  industrySon: makeSelectUserCenterIndustrySon(),
  industryList: makeSelectUserCenterIndustry(),
  serviceList: makeSelectUserCenterService(),
});

function mapDispatchToProps(dispatch) {
  return {
    getIndustry: () => dispatch(fetchIndustry()),
    getService: (id) => dispatch(fetchService(id)),
    setUser: (data) => dispatch(loadUser(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GuidePage);
