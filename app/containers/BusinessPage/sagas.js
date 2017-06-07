import { take, cancel, put, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';
import request from 'utils/request';

import {
  FETCH_MOMENT_DETAIL,

  FETCH_BUSINESS,

  FETCH_BUSINESS_PRICE,
  FETCH_BUSINESS_NUMBER,
  FETCH_BUSINESS_UNITS,
  FETCH_BUSINESS_REWARD,
} from './constants';

import {
  loadMomentDetail,

  loadBusiness,
  loadBusinessRefresh,
  loadBusienssLoading,

  loadBusinessPrice,
  loadBusinessNumber,
  loadBusinessUnits,
  loadReward,
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
    const { type, page, searchParams } = action.payload;
    // add refresh status
    if (page === 1) {
      yield put(loadBusinessRefresh(type, true));
    } else {
      yield put(loadBusienssLoading(type, true));
    }

    const res = yield request.doGet('moments/filter-supplier-demand', { reward_as: type, page, ...searchParams });

    const { list, page: resPage } = res;
    yield put(loadBusiness(type, list, resPage));
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchBusinessPrice() {
  try {
    const res = yield request.doGet('moments/price-section');

    // load all filter things
    yield put(loadBusinessPrice(res.list));
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchBusinessNumber() {
  try {
    const res = yield request.doGet('moments/number-section');

    // load all filter things
    yield put(loadBusinessNumber(res.list));
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchBusinessUnits() {
  try {
    const res = yield request.doGet('moments/moments/units');

    // load all filter things
    yield put(loadBusinessUnits(res.list));
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchBusinessReward() {
  try {
    const res = yield request.doGet('moments/reward-item');

    // load all filter things
    yield put(loadReward(res.list));
  } catch (err) {
    // console.log(err);
  }
}

export function* defaultSaga() {
  const watcher = yield takeLatest(FETCH_MOMENT_DETAIL, fetchMomentDetail);
  const watcherBusiness = yield takeLatest(FETCH_BUSINESS, fetchBusiness);
  const watcherBusinessPrice = yield takeLatest(FETCH_BUSINESS_PRICE, fetchBusinessPrice);
  const watcherBusinessNumber = yield takeLatest(FETCH_BUSINESS_NUMBER, fetchBusinessNumber);
  const watcherBusinessUnits = yield takeLatest(FETCH_BUSINESS_UNITS, fetchBusinessUnits);
  const watcherBusinessReward = yield takeLatest(FETCH_BUSINESS_REWARD, fetchBusinessReward);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
  yield cancel(watcherBusiness);
  yield cancel(watcherBusinessPrice);
  yield cancel(watcherBusinessNumber);
  yield cancel(watcherBusinessUnits);
  yield cancel(watcherBusinessReward);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
