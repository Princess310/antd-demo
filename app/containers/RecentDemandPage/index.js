/*
 *
 * RecentDemandPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import pallete from 'styles/colors';
import request from 'utils/request';
import { browserHistory } from 'react-router';

import { NavBar, Icon, Button, TextareaItem, WhiteSpace, WingBlank, Toast, Modal } from 'antd-mobile';

import { fetchReward } from 'containers/BusinessPage/actions';
import { makeSelectBusinessRewards } from 'containers/BusinessPage/selectors';

const buttonStyle = {
  padding: 0,
  marginLeft: '0.2rem',
  marginBottom: '0.2rem',
  width: '1.64rem',
  height: '0.62rem',
  lineHeight: '0.62rem',
  backgroundColor: pallete.background.white,
  fontSize: '0.3rem',
}

const alert = Modal.alert;
export class RecentDemandPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    selected: '',
    content: '',
  }

  componentWillMount() {
    const { reward, getReward } = this.props;

    !reward && getReward();
  }

  handleSelect = (id) => {
    this.setState({
      selected: id,
    });
  }

  handleChange = (value) => {
    this.setState({
      content: value,
    });
  }

  saveInfo = () => {
    const { selected, content } = this.state;

    if (selected === '') {
      Toast.info('请选择产品需求标签', 2);
      return;
    }

    if (content.trim() === '') {
      const alertInstance = alert('对不起，您还未填写您的采购需求', '', [
        { text: '跳过', onPress: () => browserHistory.push('/'), style: 'default' },
        { text: '立即填写', onPress: () => alertInstance.close(), style: { fontWeight: 'bold' } },
      ]);

      return;
    }

    request.doPost('moments/release', {
      content,
      reward_item: selected,
      category: 6,
      reward_as: 2,
    }).then(() => {
      browserHistory.push('/');
    });
  }

  render() {
    const { selected, content } = this.state;
    const { reward } = this.props;

    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
        >
          近期需求
        </NavBar>
        <div style={{ padding: '0.12rem 0.22rem', fontSize: '0.3rem', color: pallete.text.help }}>
          您近期有哪方面产品/服务的采购需求？
        </div>
        <div style={{ paddingTop: '0.2rem', backgroundColor: pallete.white }}>
          {reward && reward.map((item, i) => (
            <Button
              type={selected === item.id ? 'primary' : ''}
              key={i}
              style={buttonStyle}
              inline
              onClick={() => this.handleSelect(item.id)}
            >{item.name}</Button>
          ))}
        </div>
        <WhiteSpace />
        <TextareaItem
          autoHeight
          value={content}
          onChange={this.handleChange}
          placeholder="请用一句话补充描述您的采购需求"
          labelNumber={1}
        />
        <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
          <WingBlank>
            <Button className="btn" type="primary" onClick={this.saveInfo}>立即体验</Button>
          </WingBlank>
      </div>
    );
  }
}

RecentDemandPage.propTypes = {
  getReward: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  reward: makeSelectBusinessRewards(),
});

function mapDispatchToProps(dispatch) {
  return {
    getReward: () => dispatch(fetchReward()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentDemandPage);
