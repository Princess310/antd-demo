/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectAppGlobale = (state) => state.get('global');

const makeSelectCurrentUser = () => createSelector(
  selectAppGlobale,
  (globalState) => globalState.get('currentUser')
);

export {
  makeSelectCurrentUser,
};
