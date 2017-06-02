import { createSelector } from 'reselect';

/**
 * Direct selector to the userBlackList state domain
 */
const selectUserBlackListDomain = () => (state) => state.get('userBlackList');

/**
 * Other specific selectors
 */


/**
 * Default selector used by UserBlackList
 */

const makeSelectUserBlackList = () => createSelector(
  selectUserBlackListDomain(),
  (substate) => substate.get('list')
);

const makeSelectListStatus = () => createSelector(
  selectUserBlackListDomain(),
  (substate) => ({
    refresh: substate.get('refresh'),
    hasNext: substate.get('hasNext'),
    loading: substate.get('loading'),
  })
);

export {
  makeSelectUserBlackList,
  makeSelectListStatus,
};
