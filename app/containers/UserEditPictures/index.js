/*
 *
 * UserEditPictures
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectCurrentUser } from 'containers/HomePage/selectors';
import { makeSelectUserCenterBusiness } from 'containers/UserCenter/selectors';
import { fetchBusiness, saveBusiness } from 'containers/UserCenter/actions';
import oss from 'utils/oss';

import { browserHistory } from 'react-router';
import pallete from 'styles/colors';
import { NavBar, ImagePicker, Icon } from 'antd-mobile';
import MenuBtn from 'components/MenuBtn';

export class UserEditPictures extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    const { businessInfo, getBusiness } = props;
    this.state = {
      files: businessInfo ? businessInfo.pictures.map((file) => ({
        url: file,
      })) : [],
      filesMax: 9,
    };

    getBusiness();
  }

  componentWillReceiveProps(nextProps) {
    const { businessInfo } = nextProps;

    this.setState({
      files: businessInfo ? businessInfo.pictures.map((file) => ({
        url: file,
      })) : [],
    });
  }

  onChange = (files) => {
    // when do select picture, we upload the file to the OSS
    const file = files[files.length - 1].file;
    const { currentUser: { id } } = this.props;

    if (file) {
      const { name, size } = file;

      const path = `${oss.getFolderPath('avatar', id)}__${size}__${oss.getFileSuffix(name)}`;

      // upload file here
      oss.multipartUpload(path, file).then((res) => {
        const url = oss.getImgDomain(oss.getFileDomain() + oss.getFilePath(res.name));

        const newFiles = [
          ...files.slice(0, files.length - 1),
          {
            url,
          },
        ];

        this.setState({
          files: newFiles,
        });
      });
    } else {
      this.setState({
        files,
      });
    }
  };

  handleSave = () => {
    const { files } = this.state;
    const { saveBusinessInfo } = this.props;
    const filesResult = files.map((file) => oss.getImgSourcePath(file.url));

    saveBusinessInfo({
      pictures: JSON.stringify(filesResult),
    });
  }

  render() {
    const { files, filesMax } = this.state;
    const suitableFiles = files.map((file) => {
      // compress img size to show
      const newUrl = file.url[file.url.length - 1] === 'p' ? file.url : oss.getImgSuitablePath(file.url);

      return {
        url: newUrl,
      };
    });

    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
          rightContent={[
            <MenuBtn key="0" onClick={this.handleSave}>保存</MenuBtn>,
          ]}
        >
          展示图片
        </NavBar>
        <ImagePicker
          files={suitableFiles}
          onChange={this.onChange}
          selectable={files.length < filesMax}
        />
      </div>
    );
  }
}

UserEditPictures.propTypes = {
  businessInfo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  getBusiness: PropTypes.func,
  saveBusinessInfo: PropTypes.func,
  currentUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  businessInfo: makeSelectUserCenterBusiness(),
  currentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getBusiness: () => dispatch(fetchBusiness()),
    saveBusinessInfo: (params) => dispatch(saveBusiness(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEditPictures);
