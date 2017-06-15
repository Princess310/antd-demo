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

const makeSelectUserBusinessDemand = () => createSelector(
  selectBusiness,
  (substate) => {
    const info = substate.get('businessDemand');
    return {
      refresh: info.get('refresh'),
      loading: info.get('loading'),
      list: info.get('list'),
      hasNext: info.get('hasNext'),
    };
  }
);

const makeSelectUserBusinessSupplier = () => createSelector(
  selectBusiness,
  (substate) => {
    const info = substate.get('businessSupplier');
    return {
      refresh: info.get('refresh'),
      loading: info.get('loading'),
      list: info.get('list'),
      hasNext: info.get('hasNext'),
    };
  }
);

const makeSelectBusinessFilter = () => createSelector(
  selectBusiness,
  (substate) => {
    return {
      price: substate.get('price'),
      number: substate.get('number'),
      units: substate.get('units'),
      reward: substate.get('reward'),
    };
  }
);

const makeSelectBusinessRewards = () => createSelector(
  selectBusiness,
  (substate) => substate.get('reward')
);

const makeSelectBusinessPrice = () => createSelector(
  selectBusiness,
  (substate) => substate.get('price')
);

const makeSelectBusinessNumber = () => createSelector(
  selectBusiness,
  (substate) => substate.get('number')
);

const makeSelectBusinessUnits = () => createSelector(
  selectBusiness,
  (substate) => substate.get('units')
);

const makeSelectBusinessSearchPanel = () => createSelector(
  selectBusiness,
  (substate) => substate.get('searchPanel')
);

const makeSelectBusinessSearchAll = () => createSelector(
  selectBusiness,
  (substate) => {
    const info = substate.get('searchAll');
    return {
      loading: info.get('loading'),
      list: info.get('list'),
      hasNext: info.get('hasNext'),
    };
  }
);

const makeSelectPublishParams = () => createSelector(
  selectBusiness,
  (substate) => substate.get('publishParams')
);

export {
  makeSelectBusinessDetail,
  makeSelectUserBusinessDemand,
  makeSelectUserBusinessSupplier,
  makeSelectBusinessFilter,
  makeSelectBusinessRewards,
  makeSelectBusinessPrice,
  makeSelectBusinessNumber,
  makeSelectBusinessUnits,
  makeSelectBusinessSearchPanel,
  makeSelectBusinessSearchAll,
  makeSelectPublishParams,
};
