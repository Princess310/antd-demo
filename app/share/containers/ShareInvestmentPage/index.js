/*
 *
 * ShareInvestmentPage
 *
 */

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Clipboard  from 'clipboard';

import { Button, WhiteSpace, Icon, Toast, Tabs, InputItem } from 'antd-mobile';
import AppContent from 'components/AppContent';
import MomentHeader from 'components/MomentCard/MomentHeader';
import UserHeaderBar from 'components/UserHeaderBar';
import WxUserBar from 'components/UserHeaderBar/WxUserBar';
import ListItem from 'components/ListItem';
import FlexSB from 'components/FlexSB';
import Paper from 'components/Paper';
import Avatar from 'components/Avatar';
import DownloadBar from 'share/components/DownloadBar';

import pallete from 'styles/colors';
import request from 'utils/shareRequest';
import shareConfig from 'utils/shareConfig';
import date from 'utils/date';

const buttonStyle = {
  height: '0.44rem',
  width: '1.2rem',
  lineHeight: '0.44rem',
  fontSize: '0.24rem',
  color: pallete.white,
  border: 'none ',
  borderRadius: '0.44rem',
  backgroundColor: pallete.theme,
}

const submitBtnStyle = {
  marginTop: '0.6rem',
  height: '0.64rem',
  lineHeight: '0.64rem',
  backgroundColor: pallete.theme,
  color: pallete.white,
  fontSize: '0.32rem',
  borderRadius: '0.64rem',
  border: 'none',
};

const contentStyle = {
  paddingLeft: '1.24rem',
};

const imgStyle = {
  marginTop: '0.1rem',
  height: '2.64rem',
  width: '100%',
  objectFit: 'cover',
};

const actionItemStyle = {
  marginLeft: '0.36rem',
};

const ListWrapper = styled.div`
  .list-item {
    borderBottom: 0.01rem solid ${pallete.border.normal};
  }

  .list-item:last-child {
    border: none;
  }
`;

const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const CommentWrapper= styled.div`
  fontSize: 0.26rem;
  padding: 0 0.12rem 0.12rem 1.2rem;
  background-color: ${pallete.white};
`;

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: ${pallete.text.help};
`;

const InputWrapper = styled.div`
  margin-top: 0.6rem;
  padding: 0.1rem;
  width: 100%;
  font-size: 0.24rem;
  color: #888888;
  border: 0.01rem solid #999999;
`;

const TabPane = Tabs.TabPane;
export class ShareInvestmentPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      info: null,
      username: '',
      phone: '',
      downloadStyle: {},
    };
  }

  componentWillMount() {
    this.getInvestInfo();
  }

  componentDidUpdate() {
    let clipboard = new Clipboard('.cut-btn');

    clipboard.on('success', function(e) {
      Toast.info('复制成功', 2);
    });
  }

  getInvestInfo = (showTost) => {
    const { id, uid } = this.props;
    
    request.doGet('moments/details', {
      moments_id: id,
      uid,
      'from_share': 1
    }).then((res) => {
      const { data, share_user } = res;

      if (showTost) {
        Toast.info('报名成功', 2);
      }

      this.setState({
        info: data,
      });

      shareConfig.share('investment', data, share_user);
    });
  }

  handleView = (e, i) => {
    e.preventDefault();
    e.stopPropagation()
    const { info: { pictures } } = this.state;

    wx.previewImage({
      current: pictures[i],
      urls: pictures,
    });
  }

  handlePhone = (value) => {
    this.setState({
      phone: value,
    });
  }

  handleUsername = (value) => {
    this.setState({
      username: value,
    });
  }

  handleDownloadInfo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    Toast.info('请下载健康商信APP', 2);
  }

  handleInput = (focus) => {
    const position = focus ? 'relative' : 'fixed';

    this.setState({
      downloadStyle: { position },
    });
  }

  handleSubmit = () => {
    const { username, phone } = this.state;
    const { id } = this.props;

    if (username.trim() === '' || username.match(/\d+/g) || username.trim().length < 2 || username.trim().length > 6 ) {
      Toast.info('姓名长度2~6个中文且不能包含数字', 2);
      return;
    }

    if (phone.trim() === '') {
      Toast.info('请输入正确的电话号码', 2);
      return;
    }

    request.doPost('investment/enroll', {
      name: username,
      mobile: phone,
      moments_id: id,
    }).then((res) => {
      this.setState({
        username: '',
        phone: '',
      });

      // refresh info
      this.getInvestInfo(true);
    });
  }

  render() {
    const { info, username, phone, downloadStyle } = this.state;

    return (
      <div>
        <Helmet
          title="招商会详情"
          meta={[
            { name: 'description', content: '健康商信' },
            { name: 'keywords', content: '健康, 商业, 健康商信, 招商会' },
          ]}
        />
        <AppContent style={{
          top: 0,
          paddingBottom: '2rem',
          backgroundColor: pallete.white,
        }}>
          {info && (
            <div>
              <div style={{ position: 'relative', padding: '0.15rem'}}>
                <MomentHeader
                  user={{
                    id: info.uid,
                    avatar: info.avatar,
                    verify_status: info.verify_status,
                    nickname: info.nickname,
                    tag_identity_name: info.tag_identity_name,
                    main_service_name: info.main_service_name,
                    company: info.company,
                    position: info.position,
                  }}
                  source_type={info.source_type}
                  created_at={info.created_at}
                  linkUser={false}
                />
                <Button style={{ position: 'absolute', top: '0.52rem', right: '0.2rem', ...buttonStyle}} onClick={this.handleDownloadInfo}>对话</Button>
                <div style={contentStyle}>
                  <header style={{ color: '#333333', fontSize: '0.32rem' }}>{info.title}</header>
                  <section style={{ color: '#888888', fontSize: '0.26rem' }}>{info.content}</section>
                  {info.pictures.map((p, i) => (
                    <img key={i} src={p} style={imgStyle} onClick={(e) => this.handleView(e, i)} />
                  ))}
                  <div style={{ margin: '0.2rem 0', fontSize: '0.26rem', color: '#999999' }}>{info.hits}人看过</div>
                </div>
              </div>
              <ListWrapper>
                <ListItem
                  className="list-item"
                  icon={<Icon type={require('icons/ali/地点.svg')} size="xs" color={pallete.theme } />}
                  name={info.address}
                  rightContent={<Button style={buttonStyle} className="cut-btn" onClick={this.handleCopy} data-clipboard-text={info.address}>复制</Button>}
                />
                {Number(info.show_mobile) === 1 && (info.mobile !== '') && (
                  <ListItem
                    className="list-item"
                    icon={<Icon type={require('icons/ali/电话.svg')} size="xs" color={pallete.theme } />}
                    name={<span style={{ color: pallete.theme, textDecoration: 'underline' }}>{info.mobile}</span>}
                    rightContent={
                      <Button style={buttonStyle} href={`tel:${info.mobile}`}>拨打</Button>
                    }
                  />
                )}
                <ListItem
                  className="list-item"
                  icon={<Icon type={require('icons/ali/时间.svg')} size="xs" color={pallete.theme } />}
                  name="会议时间"
                  rightContent={date.parseTimeDetail(info.meeting_time * 1000)}
                />
                {info.group_name && (
                  <ListItem
                    className="list-item"
                    icon={<Icon type={require('icons/ali/群.svg')} size="xs" color={pallete.theme } />}
                    name="交流群"
                    rightContent={info.group_name}
                  />
                )}
                {Number(info.member_limit) > 0 && (
                  <ListItem
                    className="list-item"
                    icon={<Icon type={require('icons/ali/名额.svg')} size="xs" color={pallete.theme } />}
                    name="招商会名额"
                    rightContent={`${info.member_limit}人`}
                  />
                )}
              </ListWrapper>
              <ActionWrapper style={{ paddingRight: '0.12rem', fontSize: '0.28rem', color: pallete.theme }}>
                <FlexSB onClick={this.handleDownloadInfo} style={actionItemStyle}>
                  <Icon type={require('icons/ali/消息.svg')} size="sm" />
                  <span style={{ marginLeft: '0.04rem' }}>{info.comment_count > 0 ? info.comment_count : '评论'}</span>
                </FlexSB>
                <FlexSB onClick={this.handleDownloadInfo} style={actionItemStyle}>
                  <Icon type={require('icons/ali/点赞.svg')} size="sm" />
                  <span style={{ marginLeft: '0.04rem' }}>{info.like_count > 0 ? info.like_count : '点赞'}</span>
                </FlexSB>
                <FlexSB onClick={this.handleDownloadInfo} style={actionItemStyle}>
                  <Icon type={require('icons/ali/分享.svg')} size="xxs" />
                  <span style={{ marginLeft: '0.04rem' }}>{info.share_count > 0 ? info.share_count : '分享'}</span>
                </FlexSB>
              </ActionWrapper>
              <Tabs
                defaultActiveKey="1"
                animated={false}
                className="invest-detail-tabs"
              >
                <TabPane tab="我要报名" key="1">
                  <div style={{ padding: '0.2rem 0.23rem' }}>
                    <Paper style={{ padding: '0.4rem 1.27rem', textAlign: 'center' }}>
                      <header style={{ fontSize: '0.34rem', color: '#333333', fontWeight: 'bolder' }}>我要报名</header>
                      <InputWrapper>
                        <InputItem
                          placeholder="请输入您的姓名..."
                          value={username}
                          onChange={this.handleUsername}
                          onFocus={() => {this.handleInput(true)}}
                          onBlur={() => {this.handleInput(false)}}
                        />
                      </InputWrapper>
                      <InputWrapper>
                        <InputItem
                          type="phone"
                          placeholder="请输入您的手机号..."
                          value={phone}
                          onChange={this.handlePhone}
                          onFocus={() => {this.handleInput(true)}}
                          onBlur={() => {this.handleInput(false)}}
                        />
                      </InputWrapper>

                      {info.is_action === 1 ? (
                        <Button style={{...submitBtnStyle, backgroundColor: '#CCCCCC'}}>活动已结束</Button>
                      ) : (
                        info.is_end === 1 ? (
                          <Button style={{...submitBtnStyle, backgroundColor: '#CCCCCC'}}>报名已截止</Button>
                        ) : info.is_full === 1 && (
                          <Button style={{...submitBtnStyle, backgroundColor: '#CCCCCC'}}>活动名额已满</Button>
                        )
                      )}
                      {(info.is_end === 0 && info.is_full === 0 && info.is_action === 0) && (
                        <Button style={submitBtnStyle} onClick={this.handleSubmit}>立即报名</Button>
                      )}
                    </Paper>
                  </div>
                </TabPane>
                <TabPane tab={`已报名商家 ${info.member_count}`} key="2">
                  <div>
                    {info.enroll.map((u, i)  => (
                      <div key={i} style={{ borderBottom: `0.01rem ${pallete.border.deep} solid` }}>
                        {u.come_from === '0' ? (
                          <UserHeaderBar
                            user={{...u, id: u.created_by}}
                            linkUser={false}
                          />
                        ) : (
                          <WxUserBar username={u.name} />
                        )}
                      </div>
                    ))}
                  </div>
                </TabPane>
                <TabPane tab={`评论 ${info.comment_count}`} key="3">
                  <div>
                    {info.comments.map((u)  => (
                      <div key={u.id} style={{ borderBottom: `0.01rem ${pallete.border.deep} solid` }}>
                        <UserHeaderBar
                          user={{...u, id: u.created_by}}
                          linkUser={false}
                        />
                        <CommentWrapper>
                          <div>
                            {u.to_name !== '' && <span>回复<span style={{ color: pallete.theme }}>{u.to_name}</span>：</span>}
                            {u.content}
                          </div>
                          <LikeWrapper onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            this.handleDownloadInfo(e);
                          }}>
                            <Icon type={require('icons/ali/点赞.svg')} size="sm" color={pallete.text.help} />
                            {u.like_count}
                          </LikeWrapper>
                        </CommentWrapper>
                      </div>
                    ))}
                  </div>
                </TabPane>
                <TabPane tab={`赞 ${info.like_count}`} key="4">
                  <div>
                    {info.likes.map((u)  => (
                      <div key={u.id} style={{ borderBottom: `0.01rem ${pallete.border.deep} solid` }}>
                        <UserHeaderBar
                          user={{...u, id: u.created_by}}
                          linkUser={false}
                        />
                      </div>
                    ))}
                  </div>
                </TabPane>
                <TabPane tab={`分享 ${info.share_count}`} key="5">
                  <div>
                    {info.shares.map((u)  => (
                      <div key={u.id} style={{ borderBottom: `0.01rem ${pallete.border.deep} solid` }}>
                        <UserHeaderBar
                          user={{...u, id: u.created_by}}
                          linkUser={false}
                        />
                      </div>
                    ))}
                  </div>
                </TabPane>
              </Tabs>
            </div>
          )}
          <DownloadBar name="立即加群交流" style={downloadStyle} />
        </AppContent>
      </div>
    );
  }
}

ShareInvestmentPage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ShareInvestmentPage;
