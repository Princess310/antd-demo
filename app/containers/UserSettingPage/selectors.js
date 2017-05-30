import { createSelector } from 'reselect';

/**
 * Direct selector to the userSettingPage state domain
 */
const selectUserSettingPageDomain = () => (state) => state.get('userSettingPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by UserSettingPage
 */

const makeSelectUserSettingPage = () => createSelector(
  selectUserSettingPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectUserSettingPage;
export {
  selectUserSettingPageDomain,
};
