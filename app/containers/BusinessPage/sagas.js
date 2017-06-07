import { take, cancel, put, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';
import request from 'utils/request';

import {
  FETCH_MOMENT_DETAIL,

  FETCH_BUSINESS,

  FETCH_BUSINESS_FILTER,
} from './constants';

import {
  loadMomentDetail,

  loadBusiness,
  loadBusinessRefresh,
  loadBusienssLoading,

  loadBusinessPrice,
  loadBusinessNumber,
  loadBusinessUnits,
} from './actions';

export function* fetchMomentDetail(action) {
  try {
    const { id } = action.payload;
    const res = yield request.doGet('moments/details', { moments_id: id });
    const { data } = res;

    yield put(loadMomentDetail(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchBusiness(action) {
  try {
    const { type, page, searchParams, doGetFilter } = action.payload;
    // add refresh status
    if (page === 1) {
      yield put(loadBusinessRefresh(type, true));
    } else {
      yield put(loadBusienssLoading(type, true));
    }

    const res = yield request.doGet('moments/filter-supplier-demand', { reward_as: type, page, ...searchParams });
    if (doGetFilter) {
      yield fetchBusinessFilter();
    }
    const { list, page: resPage } = res;
    yield put(loadBusiness(type, list, resPage));
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchBusinessFilter() {
  try {
    const priceRes = yield request.doGet('moments/price-section');
    const numberRes = yield request.doGet('moments/number-section');
    const unitsRes = yield request.doGet('moments/units');

    // load all filter things
    yield put(loadBusinessPrice(priceRes.list));
    yield put(loadBusinessNumber(numberRes.list));
    yield put(loadBusinessUnits(unitsRes.list));
  } catch (err) {
    // console.log(err);
  }
}

export function* defaultSaga() {
  const watcher = yield takeLatest(FETCH_MOMENT_DETAIL, fetchMomentDetail);
  const watcherBusiness = yield takeLatest(FETCH_BUSINESS, fetchBusiness);
  const watcherBusinessFilter = yield takeLatest(FETCH_BUSINESS_FILTER, fetchBusinessFilter);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
  yield cancel(watcherBusiness);
  yield cancel(watcherBusinessFilter);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
