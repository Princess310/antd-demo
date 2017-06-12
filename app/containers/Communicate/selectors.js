import { createSelector } from 'reselect';

/**
 * Direct selector to the communicate state domain
 */
const selectCommunicate = (state) => state.get('communicate');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Communicate
 */

const makeSelectCommunicate = () => createSelector(
  selectCommunicate,
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

const makeSelectCommunicateSearch = () => createSelector(
  selectCommunicate,
  (substate) => {
    const info = substate.get('search');
    return {
      loading: info.get('loading'),
      list: info.get('list'),
      hasNext: info.get('hasNext'),
    };
  }
);

export {
  makeSelectCommunicate,
  makeSelectCommunicateSearch,
};
