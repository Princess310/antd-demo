import { createSelector } from 'reselect';

/**
 * Direct selector to the feedBackPage state domain
 */
const selectFeedBackPageDomain = () => (state) => state.get('feedBackPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by FeedBackPage
 */

const makeSelectFeedBackPage = () => createSelector(
  selectFeedBackPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectFeedBackPage;
export {
  selectFeedBackPageDomain,
};
