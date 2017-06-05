import { createSelector } from 'reselect';

/**
 * Direct selector to the businessPage state domain
 */
const selectBusiness = (state) => state.get('business');

/**
 * Other specific selectors
 */


/**
 * Default selector used by BusinessPage
 */

const makeSelectBusinessDetail = () => createSelector(
  selectBusiness,
  (substate) => substate.get('detail')
);

export {
  makeSelectBusinessDetail,
};
