/*
 *
 * SelectFriend
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import pallete from 'styles/colors';
import { browserHistory } from 'react-router';

import { NavBar, Icon, Accordion, List, Radio } from 'antd-mobile';
import MenuBtn from 'components/MenuBtn';
import FlexSB from 'components/FlexSB';

import { fetchUserFriend } from 'containers/UserCenter/actions';
import { loadPublishParams } from 'containers/BusinessPage/actions';
import { makeSelectUserFriend } from 'containers/UserCenter/selectors';
import { makeSelectPublishParams } from 'containers/BusinessPage/selectors';

const RadioItem = Radio.RadioItem;
const AccordionPanel = Accordion.Panel;
export class SelectFriend extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const { publishParams } = this.props;

    this.state = {
      selectedList: publishParams.selectFriend ? publishParams.selectFriend : [],
    };
  }

  componentWillMount() {
    const { friendList, getList } = this.props;

    if (!friendList) {
      getList();
    }
  }

  handleSelect = (id) => {
    let { selectedList } = this.state;
    const index = selectedList.indexOf(id);

    if (index > -1) {
      selectedList.splice(index, 1);
    } else {
      selectedList.push(id);
    }

    this.setState({
      selectedList: [...selectedList],
    });
  }

  handleSave = () => {
    const { selectedList } = this.state;

    this.props.setList({
      selectFriend: selectedList,
    });
    browserHistory.goBack();
  }

  render() {
    const { selectedList } = this.state;
    const { friendList } = this.props;
    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
          rightContent={[
            <MenuBtn key="0" onClick={this.handleSave}>确定</MenuBtn>,
          ]}
        >
          提醒谁看
        </NavBar>
        <Accordion defaultActiveKey="0" className="select-friend-accordion">
          {friendList && friendList.map((i) => (
            <AccordionPanel key={i.id} header={
              <FlexSB>
                <div>{i.name}</div>
                <div>{i.list.length}</div>
              </FlexSB>}>
              <List className="my-list">
                {i.list && i.list.map((u) => (
                  <RadioItem key={u.id} checked={selectedList.indexOf(u.id) > -1} onChange={() => this.handleSelect(u.id)}>
                    {u.nickname}
                  </RadioItem>
                ))}
              </List>
            </AccordionPanel>
          ))}
        </Accordion>
      </div>
    );
  }
}

SelectFriend.propTypes = {
  friendList: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  getList: PropTypes.func,
  publishParams: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  friendList: makeSelectUserFriend(),
  publishParams: makeSelectPublishParams(),
});

function mapDispatchToProps(dispatch) {
  return {
    getList: () => dispatch(fetchUserFriend()),
    setList: (params) => dispatch(loadPublishParams(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectFriend);
