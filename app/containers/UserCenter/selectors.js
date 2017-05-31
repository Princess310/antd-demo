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

export {
  makeSelectUserCenterIndustry,
  makeSelectUserCenterService,
  makeSelectUserCenterBusiness,
  makeSelectUserCenterCity,
};
