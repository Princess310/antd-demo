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
};
