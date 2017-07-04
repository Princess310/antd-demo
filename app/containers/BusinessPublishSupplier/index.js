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

import { NavBar, List, TextareaItem, WhiteSpace, ImagePicker, Toast, Icon, SegmentedControl } from 'antd-mobile';
import MenuBtn from 'components/MenuBtn';
import FlexCenter from 'components/FlexCenter';

import { publishMoment, loadPublishParams } from 'containers/BusinessPage/actions';
import { makeSelectPublishParams } from 'containers/BusinessPage/selectors';

const Item = List.Item;
export class BusinessPublishSupplier extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const { publishParams }  = this.props;

    this.state = {
      content: publishParams.content ? publishParams.content : '',
      files: publishParams.files ? publishParams.files : [],
      filesMax: 9,
    }
  }

  componentWillMount() {
    const { location: { action } } = this.props;

    if (action === 'PUSH') {
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

    if (Number(index) === 0) {
      browserHistory.replace('/businessPublish');
    }
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
    }, step);
  }

  render() {
    const { content, files, filesMax } = this.state;
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
          发供应
        </NavBar>
        <WhiteSpace size="md" />
        <List>
          <Item>
            <FlexCenter style={{ fontSize: '0.3rem'}}>
              <SegmentedControl
                selectedIndex={1}
                values={['需求', '供应']}
                style={{ height: '0.3rem', width: '3rem' }}
                onChange={this.onChangeTitle}
                tintColor={pallete.yellow}
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
          >产品类别（必选）</Item>
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
