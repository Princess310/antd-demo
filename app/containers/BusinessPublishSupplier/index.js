/*
 *
 * BusinessPublishSupplier
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import pallete from 'styles/colors';
import request from 'utils/request';

import { NavBar, List, TextareaItem, WhiteSpace, ImagePicker, Toast, Icon, SegmentedControl, Switch, Modal } from 'antd-mobile';
import MenuBtn from 'components/MenuBtn';
import FlexCenter from 'components/FlexCenter';
import FlexRow from 'components/FlexRow';

import { publishMoment, loadPublishParams } from 'containers/BusinessPage/actions';
import { makeSelectPublishParams } from 'containers/BusinessPage/selectors';

const alert = Modal.alert;
const Item = List.Item;
export class BusinessPublishSupplier extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const { publishParams, location: { state } }  = this.props;

    this.state = {
      content: publishParams.content ? publishParams.content : '',
      files: publishParams.files ? publishParams.files : [],
      filesMax: 9,
      showMobile: typeof publishParams.showMobile === 'boolean' ? publishParams.showMobile : state.show_mobile === '1',
    }
  }

  componentWillMount() {
    const { location: { action } } = this.props;

    if (action !== 'POP') {
      this.props.setPublishParams(false);
      this.setState({
        content: '',
        files: [],
      });
    }
  }

  componentWillUnmount() {
    const { location: { action } } = this.props;
    const { content, files } = this.state;

    this.props.setPublishParams({
      content,
      files,
    });
  }

  onChange = (files) => {
    this.setState({
      files,
    });
  };

  handleContent = (value) => {
    this.setState({
      content: value,
    });
  }

  onChangeTitle = (e) => {
    const index = e.nativeEvent.selectedSegmentIndex;
    const { showMobile } = this.state;

    if (Number(index) === 0) {
      request.doGet('moments/check-release', { reward_as: 2 }).then((res) => {
        const { my_point, release_point, free, show_mobile } = res;
        if (Number(free) ===  0) {
          if (my_point < release_point) {
            alert('发布失败', <div>
                <div style={{ color: pallete.theme }}>{`剩余${my_point}积分`}</div>
                <div>{`您的账户已不足${release_point}分，无法继续发布供应信息，可到“讨论”栏目评论（+5分）、点赞（+1分）、分享（+10分）挣取积分。`}</div>
              </div>, [
              { text: '我知道了', onPress: () => console.log('cancel') },
              { text: '立即前去', onPress: () => {
                setSelectTab('communicate');
              }, style: { fontWeight: 'bold' } },
            ]);
          }

          return;
        }

        browserHistory.replace({
          pathname: 'businessPublish',
          state: {
            show_mobile,
          },
        });
      });
    }
  }
  handleMobile = (value) => {
    const self = this;
    request.doPost('moments/show-mobile').then(() => {
      self.setState({
        showMobile: value,
      });
    });
  }

  handleSave = () => {
    const { content, files } = this.state;
    const { publishParams, saveMoment, location: { state } } = this.props;
    let step = 1;

    if (!publishParams.reward_item) {
      Toast.info('请选择产品类别', 2);
      return;
    }

    if (content.trim().length > 0 && (content.trim().length > 1000 || content.trim().length < 6)) {
      Toast.info('补充信息 (6~1000字)', 2);
      return;
    }

    if (state && state.from && state.from === 'demand') {
      step = 2;
    }

    saveMoment(content, files, {
      category: 6,
      reward_as: 1,
      reward_item: publishParams.reward_item ? publishParams.reward_item.id : 0,
      section: publishParams.price ? publishParams.price.value : '',
      units: publishParams.units ? publishParams.units.name : '',
      characteristic_service: publishParams.character ? publishParams.character.name : '',
    }, step);
  }

  render() {
    const { content, files, filesMax, showMobile } = this.state;
    const { publishParams } = this.props;

    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
          rightContent={[
            <MenuBtn key="0" onClick={this.handleSave}>发送</MenuBtn>,
          ]}
        >
          发布供应信息
        </NavBar>
        <WhiteSpace size="md" />
        <List>
          <Item>
            <FlexCenter style={{ fontSize: '0.3rem'}}>
              <SegmentedControl
                selectedIndex={1}
                values={['发需求', '发供应']}
                style={{ height: '0.3rem', width: '3rem' }}
                onChange={this.onChangeTitle}
                tintColor={pallete.theme}
              />
            </FlexCenter>
          </Item>
        </List>
        <WhiteSpace size="md" />
        <List>
          <TextareaItem
            placeholder="这一刻的想法..."
            value={content}
            onChange={this.handleContent}
            rows={4}
          />
        </List>
        <ImagePicker
          files={files}
          onChange={this.onChange}
          selectable={files.length < filesMax}
        />
        <List>
          <Item
            arrow="horizontal"
            extra={publishParams.reward_item ? publishParams.reward_item.name : '未选择'}
            onClick={() => {
              browserHistory.push('/selectReward');
            }}
          >产品类别<span style={{ color: '#FE6270' }}>（必选）</span></Item>
          <Item
            arrow="horizontal"
            extra={!publishParams.price || publishParams.price.value === '' ? "不限" : `${publishParams.price.value}${publishParams.price.unit}` }
            onClick={() => {
              browserHistory.push('/selectPrice');
            }}
          >单价区间</Item>
          <Item
            arrow="horizontal"
            extra={!publishParams.units ? "不限" : publishParams.units.name}
            onClick={() => {
              if (publishParams.price && publishParams.price.value !== '') {
                browserHistory.push({
                  pathname: '/selectUnits',
                  state: {
                    type: 'supplier',
                  },
                });
              }
            }}
          >单价区间单位</Item>
          <Item
            arrow="horizontal"
            extra={!publishParams.character ? "不限" : publishParams.character.name}
            onClick={() => {
              browserHistory.push('/selectCharacterService');
            }}
          >添加特色服务</Item>
        </List>
        <WhiteSpace size="md" />
        <List>
          <Item
            extra={<Switch checked={showMobile} onChange={this.handleMobile} />}
          >
            <FlexRow>
              <FlexCenter style={{ marginRight: '0.24rem' }}><Icon type={require('icons/ali/公布电话.svg')} color={pallete.text.help} /></FlexCenter>
              <span>公布电话，让需求方联系您</span>
            </FlexRow>
          </Item>
        </List>
      </div>
    );
  }
}

BusinessPublishSupplier.propTypes = {
  setPublishParams: PropTypes.func,
  saveMoment: PropTypes.func,
  publishParams: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  publishParams: makeSelectPublishParams(),
});

function mapDispatchToProps(dispatch) {
  return {
    setPublishParams: (params) => dispatch(loadPublishParams(params)),
    saveMoment: (content, files, params, step) => dispatch(publishMoment(content, files, params, step)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessPublishSupplier);
