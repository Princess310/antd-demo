/*
 *
 * CommunicatePublish
 * 
 * path --> communicatePublish
 *
 * publish the communication page
 * 
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import pallete from 'styles/colors';
import { browserHistory } from 'react-router';

import { NavBar, List, TextareaItem, WhiteSpace, ImagePicker, Toast, Icon } from 'antd-mobile';
import MenuBtn from 'components/MenuBtn';

import { publishMoment, loadPublishParams } from 'containers/BusinessPage/actions';
import { makeSelectPublishParams } from 'containers/BusinessPage/selectors';

const Item = List.Item;
export class CommunicatePublish extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    // for some special demand, we need to save some publish params for redux, the get it from props first.
    const { publishParams }  = this.props;

    this.state = {
      content: publishParams.content ? publishParams.content : '',
      files: publishParams.files ? publishParams.files : [],
      filesMax: 9,
    }
  }

  // when get in page from index page, we need to clear the publish params
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

  // when get out of this page, save the publish params
  componentWillUnmount() {
    const { location: { action } } = this.props;
    const { content, files } = this.state;

    this.props.setPublishParams({
      content,
      files,
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

  // do save the publish info
  handleSave = () => {
    const { content, files } = this.state;
    const { publishParams, saveMoment } = this.props;

    saveMoment(content, files, {
      category: 4,
      reminds: publishParams.selectFriend ? publishParams.selectFriend.join(',') : '',
    });
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
          社交信息发布
        </NavBar>
        <WhiteSpace size="md" />
        <List>
          <TextareaItem
            placeholder="这里是行业信息分享板块，请不要在这里发广告哦···"
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
      </div>
    );
  }
}

CommunicatePublish.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(CommunicatePublish);
