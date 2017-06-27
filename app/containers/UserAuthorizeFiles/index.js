/*
 *
 * UserAuthorizeFiles
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import pallete from 'styles/colors';
import oss from 'utils/oss';

import FlexCenter from 'components/FlexCenter';
import AuthCard from 'components/AuthCard';
import AppContent from 'components/AppContent';
import { NavBar, Button, Icon } from 'antd-mobile';
import { makeSelectUserAuthInfo, makeSelectPointsRules } from 'containers/UserCenter/selectors';
import { fetchAuthInfo, loadAuthFiles, fetchPointsRules } from 'containers/UserCenter/actions';

import card from 'assets/images/user-auth-card.png';
import email from 'assets/images/user-auth-email.png';
import license from 'assets/images/user-auth-license.png';
import other from 'assets/images/user-auth-other.png';
import position from 'assets/images/user-auth-position.png';
import work from 'assets/images/user-auth-work.png';

const contentStyle = {
  padding: '0.12rem 0.32rem',
  marginBottom: '.84rem',
  backgroundColor: pallete.white,
};

const btnStyle = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  borderRadius: 0,
  zIndex: 20,
};

const VerifyCicle = styled.div`
  position: absolute;
  top: .16rem;
  right: .16rem;
  width: 1.1rem;
  height: 1.1rem;
  line-height: 1.1rem;
  text-align: center;
  color: ${pallete.theme};
  border-radius: 50%;
  border: 0.05rem solid ${pallete.theme};
  background-color: transparent;
  transform: rotate(-30deg);
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const cards = [
  {
    feild: 'verify_by_business_card',
    flag: 2,
    url: '',
    backUrl: card,
    influence: 10,
    exp: 20,
    editable: true,
  }, {
    feild: 'verify_by_work_card',
    flag: 1,
    url: '',
    backUrl: work,
    influence: 5,
    exp: 10,
    editable: true,
  }, {
    field: 'verify_by_occupational_certificate',
    flag: 5,
    url: '',
    backUrl: position,
    influence: 20,
    exp: 40,
    editable: true,
  }, {
    field: 'verify_by_business_license',
    flag: 4,
    url: '',
    backUrl: license,
    influence: 30,
    exp: 60,
    editable: true,
  }, {
    field: 'verify_by_email',
    flag: 3,
    url: '',
    backUrl: email,
    influence: 5,
    exp: 10,
    editable: true,
  }, {
    field: 'verify_by_other',
    flag: 6,
    url: '',
    backUrl: other,
    influence: 10,
    exp: 20,
    editable: true,
  },
];
export class UserAuthorizeFiles extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      cards: cards,
      uploaded: false,
    };
  }

  componentWillMount() {
    const { pointsRules, getPointsRules, authInfo, getAuthInfo } = this.props;

    if (authInfo) {
      const { auth: { material } } = authInfo;
      material.forEach((m) => {
        cards.forEach((c) => {
        if (Number(m.flag) === c.flag) {
          c.url = m.url;
          c.editable = false;
          c.status = m.status;
        }
        });
      });
    } else {
      getAuthInfo();
    }

    if (!pointsRules) {
      getPointsRules();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { authInfo, pointsRules } = nextProps;

    if (authInfo) {
      const { auth: { material } } = authInfo;
      material.forEach((m) => {
        cards.forEach((c) => {
          if (Number(m.flag) === c.flag) {
            c.url = m.url;
            c.editable = false;
            c.status = m.status;
          }
        });
      });
    }

    if (pointsRules) {
      for (const k of Object.keys(pointsRules)) {
        cards.forEach((c) => {
          if (c.field === k) {
            c.influence = pointsRules[k].influence;
            c.exp = pointsRules[k].integrity;
          }
        });
      }
    }

    this.setState(
      cards,
    );
  }

  handFile = (e, index) => {
    const { cards } = this.state;
    const card = cards[index];
    const file = e.target.files[0];

    if (file) {
      const { name, size } = file;

      const path = `${oss.getFolderPath('avatar', 1)}__${size}__${oss.getFileSuffix(name)}`;

      // upload file here
      oss.multipartUpload(path, file).then((res) => {
        const url = oss.getImgDomain(oss.getFileDomain() + oss.getFilePath(res.name));
        card.url = url;
        card.editUrl = url;

        this.setState({
          cards: cards.slice(), // use slice to fix not rerender
          uploaded: true,
        });
      });
    }
  }

  handleSave = () => {
    const { cards } = this.state;
    const files = [];

    cards.forEach((c) => {
      if (c.editUrl) {
        files.push({
          flag: c.flag,
          url: c.editUrl,
        });
      }
    });
    this.props.saveAuthFiles(files);
    browserHistory.goBack();
  }

  render() {
    const { cards, uploaded } = this.state;
    const cardsView = cards.map((card, index) => {
      let materialCircle = null;

      if (card.status) {
        switch(Number(card.status)) {
          case 0:
            materialCircle = (
              <VerifyCicle style={{ color: pallete.text.yellow, borderColor: pallete.text.yellow }}>认证中</VerifyCicle>
            );
            break;
          case -1:
            materialCircle = (
              <VerifyCicle style={{ color: pallete.text.red, borderColor: pallete.text.red }}>认证失败</VerifyCicle>
            );
            break;
          case 1:
            materialCircle = (
              <VerifyCicle>认证成功</VerifyCicle>
            );
            break;
          default:
            break;
        }
      }

      return (
        <AuthCard
          key={index}
          style={{ margin: '0.24rem 0.12rem 0' }}
          backUrl={card.backUrl}
          url={card.url}
          onChange={ (e) => {this.handFile(e, index)} }
          influence={card.influence}
          exp={card.exp}
          editable={card.editable}
        >{materialCircle}</AuthCard>
      );
    });

    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
        >
          完善认证资料
        </NavBar>
        <AppContent>
          <div style={contentStyle}>
            <FlexCenter style={{ fontSize: '0.28rem' }}>选择以下任一材料上传，证明你的职业身份</FlexCenter>
            <Wrapper>
              {cardsView}
            </Wrapper>
            <div style={{ margin: '0.24rem 0.12rem', color: pallete.text.words, fontSize: '0.24rem' }}>
              注：上传材料，首次认证成功可获得相应活跃度
            </div>
          </div>
        </AppContent>
        <Button className="btn" style={btnStyle} type="primary" disabled={!uploaded} onClick={this.handleSave} >提交</Button>
      </div>
    );
  }
}

UserAuthorizeFiles.propTypes = {
  authInfo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  getAuthInfo: PropTypes.func,
  saveAuthFiles: PropTypes.func,
  pointsRules: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  getPointsRules: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  authInfo: makeSelectUserAuthInfo(),
  pointsRules: makeSelectPointsRules(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAuthInfo: () => dispatch(fetchAuthInfo()),
    saveAuthFiles: (files) => dispatch(loadAuthFiles(files)),
    getPointsRules: () => dispatch(fetchPointsRules()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAuthorizeFiles);
