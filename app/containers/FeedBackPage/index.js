/*
 *
 * FeedBackPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';

import { NavBar, List, TextareaItem, WhiteSpace, ImagePicker, Toast } from 'antd-mobile';
import MenuBtn from 'components/MenuBtn';

import { saveInfo } from './actions';
import makeSelectFeedBackPage from './selectors';

export class FeedBackPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    message: '',
    files: [],
    filesMax: 9,
  }

  onChange = (files) => {
    this.setState({
      files,
    });
  };

  handleMessage = (value) => {
    this.setState({
      message: value,
    });
  }

  handleSave = () => {
    const { message, files } = this.state;
    const { saveFeedBack } = this.props;

    if (message.trim() === '') {
      Toast.info('请输入反馈的问题及意见', 2);
      return;
    }

    saveFeedBack(message, files);
  }

  render() {
    const { message, files, filesMax } = this.state;

    return (
      <div>
        <NavBar
          leftContent="back"
          mode="light"
          onLeftClick={() => browserHistory.goBack()}
          rightContent={[
            <MenuBtn key="0" onClick={this.handleSave}>发送</MenuBtn>,
          ]}
        >
          意见反馈
        </NavBar>
        <WhiteSpace size="md" />
        <List>
          <TextareaItem
            placeholder="请输入反馈的问题及意见"
            value={message}
            onChange={this.handleMessage}
            rows={4}
            count={150}
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

FeedBackPage.propTypes = {
  saveFeedBack: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  FeedBackPage: makeSelectFeedBackPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    saveFeedBack: (message, files) => dispatch(saveInfo(message, files)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedBackPage);
