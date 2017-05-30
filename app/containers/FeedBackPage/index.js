/*
 *
 * FeedBackPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectFeedBackPage from './selectors';
import { browserHistory } from 'react-router';

import { NavBar, List, TextareaItem, WhiteSpace, ImagePicker, Toast } from 'antd-mobile';
import MenuBtn from 'components/MenuBtn';

import messages from './messages';
import { saveInfo } from './actions';

export class FeedBackPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    message: '',
    files: [],
    filesMax: 9,
  }

  handleMessage = (value) => {
    this.setState({
      message: value,
    });
  }

  onChange = (files, type, index) => {
    this.setState({
      files,
    });
  };

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
            <MenuBtn key="0" onClick={this.handleSave}>发送</MenuBtn>
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
          onImageClick={(index, fs) => console.log(index, fs)}
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
