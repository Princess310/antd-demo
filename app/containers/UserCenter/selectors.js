import { createSelector } from 'reselect';

/**
 * Direct selector to the userCenter state domain
 */
 const selectGlobal = (state) => state.get('global');

/**
 * Other specific selectors
 */


/**
 * Default selector used by UserCenter
 */

const makeSelectUserCenter = () => createSelector(
  selectGlobal,
  (substate) => substate.get('currentUser')
);

export default makeSelectUserCenter;
export {
  selectUserCenterDomain,
};
