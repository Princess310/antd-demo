/**
*
* UserHeaderBar
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';
import { InputItem, Icon, Button, Toast } from 'antd-mobile';
import FlexRow from 'components/FlexRow';
import Mask from 'components/Mask';
import request from 'utils/shareRequest';

const ContentWrapper = styled.div`
  position: relative;
  padding: 0.32rem 0.6rem 0.8rem 0.6rem;
`;

const desStyle = {
  marginTop: '0.36rem',
  fontSize: '0.3rem',
};

const inputStyle = {
  marginTop: '0.3rem',
};

class ShareIntroduceModal extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      phone: '',
    };
  }

  handleUsername = (value) => {
    this.setState({
      username: value,
    });
  }

  handlePhone = (value) => {
    this.setState({
      phone: value,
    });
  }

  handleIntroduce = (e) => {
    const self = this;
    const { id, onClose } = this.props;
    const { username, phone } = this.state;

    if (username.trim().length > 6 || username.trim().length < 2) {
      Toast.info('推荐人姓名：2-6个字', 1.5);
      return;
    }

    if (phone.replace(/\s/g, '').length !== 11) {
      Toast.info('输入11位手机号', 1.5);
      return;
    }

    request.doPost('moments/add-referral', {
      moments_id: id,
      name: username,
      mobile: phone.replace(/\s/g, ''),
    }).then((res) => {
      Toast.info('操作成功！', 2);

      self.setState({
        username: '',
        phone: '',
      });

      onClose && onClose();
    });
  }

  render() {
    const { username, phone } = this.state;
    const { onClose } = this.props;
    return (
      <Mask>
        <div style={{ backgroundColor: pallete.white, borderRadius: '0.08rem' }}>
          <ContentWrapper>
            <div
              style={{
                position: 'absolute',
                top: '0.28rem',
                right: '0.4rem',
                cursor: 'pointer',
              }}
              onClick={onClose}
            >
              <Icon type={require('icons/ali/关闭.svg')} size="sm" />
            </div>
            <header style={{ fontSize: '0.3rem', textAlign: 'center' }}>转介绍</header>
            <section style={{ marginTop: '0.32rem', fontSize: '0.22rem', color: '#848b9f' }}>推荐商家给他人，也会让您认识更多生意伙伴哦~</section>
            <section>
              <header style={desStyle}>推荐人姓名：</header>
              <InputItem
                className="introduce-input-item"
                placeholder="2-6个字"
                maxLength="6"
                style={inputStyle}
                value={username}
                onChange={this.handleUsername}
              />
            </section>
            <section>
              <header style={desStyle}>推荐人电话：</header>
              <InputItem
                className="introduce-input-item"
                placeholder="符合规范的11位数字"
                type="phone"
                style={inputStyle}
                value={phone}
                onChange={this.handlePhone}
              />
            </section>
          </ContentWrapper>
          <FlexRow>
            <Button
              style={{
                flex: 1,
                color: pallete.theme,
                borderColor: pallete.theme,
                borderRadius: 0,
                borderBottomLeftRadius: '0.08rem',
              }}
              onClick={onClose}
            >取消</Button>
            <Button
              style={{
                flex: 1,
                borderColor: pallete.theme,
                borderRadius: 0,
                borderBottomRightRadius: '0.08rem',
              }}
              onClick={this.handleIntroduce}
              type="primary"
            >确定</Button>
          </FlexRow>
        </div>
      </Mask>
    );
  }
}

ShareIntroduceModal.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  onClose: PropTypes.func,
};

export default ShareIntroduceModal;
