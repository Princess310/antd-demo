/*
 *
 * BusinessPublish
 *
 * path --> /businessPublish
 * 
 * this comp is used for publish demand business status
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import pallete from 'styles/colors';
import request from 'utils/request';

import { NavBar, List, TextareaItem, WhiteSpace, WingBlank, ImagePicker, Toast, Icon, SegmentedControl, Switch, Modal } from 'antd-mobile';
import MenuBtn from 'components/MenuBtn';
import FlexCenter from 'components/FlexCenter';
import FlexRow from 'components/FlexRow';

import { publishMoment, loadPublishParams } from 'containers/BusinessPage/actions';
import { makeSelectPublishParams } from 'containers/BusinessPage/selectors';

const alert = Modal.alert;
const Item = List.Item;
export class BusinessPublish extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    // for some special demand, we need to save some publish params for redux, the get it from props first.
    const { publishParams, location: { state } }  = this.props;

    this.state = {
      content: publishParams.content ? publishParams.content : '',
      files: publishParams.files ? publishParams.files : [],
      filesMax: 9,
      showMobile: typeof publishParams.showMobile === 'boolean' ? publishParams.showMobile : state.show_mobile === '1',
    }
  }

  // when get in page from index page, we need to clear the publish params
  componentWillMount() {
    const { location: { action, state } } = this.props;

    if (action !== 'POP') {
      this.props.setPublishParams(false);
      this.setState({
        content: '',
        files: [],
        showMobile: state.show_mobile === '1',
      });
    }
  }

  // when get out of this page, save the publish params
  componentWillUnmount() {
    const { location: { action } } = this.props;
    const { content, files, showMobile } = this.state;

    this.props.setPublishParams({
      content,
      files,
      showMobile,
    });
  }

  // handle the files change
  onChange = (files) => {
    this.setState({
      files,
    });
  };

  // handle content words value
  handleContent = (value) => {
    this.setState({
      content: value,
    });
  }

  // when change the title, we should chech the release info, and link to another publish page
  onChangeTitle = (e) => {
    const index = e.nativeEvent.selectedSegmentIndex;

    if (Number(index) === 0) {
      request.doGet('moments/check-release', { reward_as: 1 }).then((res) => {
        const { my_point, release_point, free, show_mobile } = res;
        if (Number(free) ===  0) {
          if (my_point < release_point) {
            alert('发布失败', <div>
                <div style={{ color: pallete.theme }}>{`剩余${my_point}积分`}</div>
                <div>{`您的账户已不足${release_point}分，无法继续发布采购需求信息，可到“社交”栏目评论（+5分）、点赞（+1分）、分享（+10分）挣取积分。`}</div>
              </div>, [
              { text: '我知道了', onPress: () => console.log('cancel') },
              { text: '立即前去', onPress: () => {
                setSelectTab('communicate');
              }, style: { fontWeight: 'bold' } },
            ]);

            return;
          }
        }

        browserHistory.replace({
          pathname: 'businessPublishSupplier',
          state: {
            show_mobile,
          },
        });
      });
    }
  }

  // handle mobile change event
  handleMobile = (value) => {
    const self = this;
    request.doPost('moments/show-mobile').then(() => {
      self.setState({
        showMobile: value,
      });
    });
  }

  // do save the publish info
  handleSave = () => {
    const { content, files } = this.state;
    const { publishParams, saveMoment } = this.props;

    if (!publishParams.reward_item) {
      Toast.info('请选择产品类别', 2);
      return;
    }

    if (files.length === 0 && content.trim().length === 0) {
      Toast.info('请输入需求内容或上传图片', 2);
      return;
    }

    if (content.trim().length > 0 && (content.trim().length > 30 || content.trim().length < 6)) {
      Toast.info('补充信息 (6~30字)', 2);
      return;
    }

    saveMoment(content, files, {
      category: 6,
      reward_as: 2,
      reward_item: publishParams.reward_item ? publishParams.reward_item.id : 0,
      section: publishParams.number ? publishParams.number.value : '',
      units: publishParams.units ? publishParams.units.name : '',
    });
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
          发布采购需求
        </NavBar>
        <WhiteSpace size="md" />
        <List>
          <div style={{ padding: '0.24rem 0.64rem' }}>
            <FlexCenter style={{ fontSize: '0.3rem'}}>
              <SegmentedControl
                selectedIndex={1}
                values={['发供应', '发需求']}
                style={{ height: '0.3rem', width: '3rem' }}
                onChange={this.onChangeTitle}
                tintColor={pallete.theme}
              />
            </FlexCenter>
            <FlexCenter style={{ marginTop: '0.15rem', fontSize: '0.24rem', color: '#FE6270' }}>你平时爱采购什么？你平时都在寻找什么？填写完整信息可以帮你解决需求</FlexCenter>
          </div>
        </List>
        <WhiteSpace size="md" />
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
            extra={!publishParams.number || publishParams.number.value === '' ? "不限" : publishParams.number.value }
            onClick={() => {
              browserHistory.push('/selectNumber');
            }}
          >需求数量</Item>
          <Item
            arrow="horizontal"
            extra={!publishParams.units ? "不限" : publishParams.units.name}
            onClick={() => {
              if (publishParams.number && publishParams.number.value !== '') {
                browserHistory.push({
                  pathname: '/selectUnits',
                  state: {
                    type: 'demand',
                  },
                });
              }
            }}
          >需求数量单位</Item>
        </List>
        <WhiteSpace size="md" />
        <List>
          <TextareaItem
            placeholder="在此输入您的补充信息"
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
            extra={<Switch checked={showMobile} onChange={this.handleMobile} />}
          >
            <FlexRow>
              <FlexCenter style={{ marginRight: '0.24rem' }}><Icon type={require('icons/ali/公布电话.svg')} color={pallete.text.help} /></FlexCenter>
              <span>公布电话，让供应方联系您</span>
            </FlexRow>
          </Item>
        </List>
      </div>
    );
  }
}

BusinessPublish.propTypes = {
  /**
   * action: set the publish info to redux
   */
  setPublishParams: PropTypes.func,
  /**
   * action: the save action
   */
  saveMoment: PropTypes.func,
  /**
   * reducer: the publish params from reselect
   */
  publishParams: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  publishParams: makeSelectPublishParams(),
});

function mapDispatchToProps(dispatch) {
  return {
    setPublishParams: (params) => dispatch(loadPublishParams(params)),
    saveMoment: (content, files, params) => dispatch(publishMoment(content, files, params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessPublish);
