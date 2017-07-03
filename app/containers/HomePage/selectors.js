/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectAppGlobale = (state) => state.get('global');
const selectHome = (state) => state.get('home');

const makeSelectCurrentUser = () => createSelector(
  selectAppGlobale,
  (globalState) => globalState.get('currentUser')
);

const makeSelectTab = () => createSelector(
  selectHome,
  (substate) => substate.get('selectTab')
);

const makeSelectUnreadDot = () => createSelector(
  selectHome,
  (substate) => substate.get('unreadDot')
);

export {
  makeSelectCurrentUser,
  makeSelectTab,
  makeSelectUnreadDot,
};
