import { createSelector } from 'reselect';

/**
 * Direct selector to the userCenter state domain
 */
const selectUserCenter = (state) => state.get('userCenter');

/**
 * Other specific selectors
 */


/**
 * Default selector used by UserCenter
 */

const makeSelectUserCenterIndustry = () => createSelector(
  selectUserCenter,
  (substate) => substate.get('industry')
);

const makeSelectUserCenterIndustrySon = () => createSelector(
  selectUserCenter,
  (substate) => substate.get('industrySon')
);

const makeSelectUserCenterService = () => createSelector(
  selectUserCenter,
  (substate) => substate.get('service')
);

const makeSelectUserCenterBusiness = () => createSelector(
  selectUserCenter,
  (substate) => substate.get('business')
);

const makeSelectUserCenterCity = () => createSelector(
  selectUserCenter,
  (substate) => substate.get('city')
);

const makeSelectUserVisitorUsers = () => createSelector(
  selectUserCenter,
  (substate) => {
    const info = substate.get('visitorUsers');
    return {
      page: info.get('page'),
      refresh: info.get('refresh'),
      loading: info.get('loading'),
      list: info.get('list'),
      hasNext: info.get('hasNext'),
    };
  }
);

const makeSelectUserVisitorMine = () => createSelector(
  selectUserCenter,
  (substate) => {
    const info = substate.get('visitorMine');
    return {
      page: info.get('page'),
      refresh: info.get('refresh'),
      loading: info.get('loading'),
      list: info.get('list'),
      hasNext: info.get('hasNext'),
    };
  }
);

const makeSelectUserCollects = () => createSelector(
  selectUserCenter,
  (substate) => {
    const info = substate.get('collects');
    return {
      page: info.get('page'),
      refresh: info.get('refresh'),
      loading: info.get('loading'),
      list: info.get('list'),
      hasNext: info.get('hasNext'),
    };
  }
);


const makeSelectUserMomentDemand = () => createSelector(
  selectUserCenter,
  (substate) => {
    const info = substate.get('momentsDemand');
    return {
      page: info.get('page'),
      refresh: info.get('refresh'),
      loading: info.get('loading'),
      list: info.get('list'),
      hasNext: info.get('hasNext'),
    };
  }
);

const makeSelectUserMomentSupplier = () => createSelector(
  selectUserCenter,
  (substate) => {
    const info = substate.get('momentsSupplier');
    return {
      page: info.get('page'),
      refresh: info.get('refresh'),
      loading: info.get('loading'),
      list: info.get('list'),
      hasNext: info.get('hasNext'),
    };
  }
);

const makeSelectUserCommunication = () => createSelector(
  selectUserCenter,
  (substate) => {
    const info = substate.get('communication');
    return {
      page: info.get('page'),
      refresh: info.get('refresh'),
      loading: info.get('loading'),
      list: info.get('list'),
      hasNext: info.get('hasNext'),
    };
  }
);

const makeSelectUserAuthInfo = () => createSelector(
  selectUserCenter,
  (substate) => substate.get('authInfo')
);

const makeSelectUserAuthFiles = () => createSelector(
  selectUserCenter,
  (substate) => substate.get('authFiles')
);

const makeSelectUserInfo = () => createSelector(
  selectUserCenter,
  (substate) => substate.get('userInfo')
);

const makeSelectUserComplaint = () => createSelector(
  selectUserCenter,
  (substate) => substate.get('complaintList')
);

const makeSelectUserFriend = () => createSelector(
  selectUserCenter,
  (substate) => substate.get('friendList')
);

const makeSelectFollowUserInfo = () => createSelector(
  selectUserCenter,
  (substate) => substate.get('followUser')
);

const makeSelectPointsRules = () => createSelector(
  selectUserCenter,
  (substate) => substate.get('pointsRules')
);

export {
  makeSelectUserCenterIndustry,
  makeSelectUserCenterIndustrySon,
  makeSelectUserCenterService,
  makeSelectUserCenterBusiness,
  makeSelectUserCenterCity,
  makeSelectUserVisitorUsers,
  makeSelectUserVisitorMine,
  makeSelectUserMomentDemand,
  makeSelectUserMomentSupplier,
  makeSelectUserCollects,
  makeSelectUserAuthInfo,
  makeSelectUserAuthFiles,
  makeSelectUserCommunication,
  makeSelectUserInfo,
  makeSelectUserComplaint,
  makeSelectUserFriend,
  makeSelectFollowUserInfo,
  makeSelectPointsRules,
};
