import { take, cancel, put, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';
import request from 'utils/request';
import { loadUser } from 'containers/App/actions';

import {
  SAVE_USER,
  FETCH_INDUSTRY,
  FETCH_SERVICE,
  FETCH_BUSINESS_INFO,
  SVAE_BUSINESS_INFO,
  FETCH_CITY_INFO,
} from './constants';

import {
  loadIndustry,
  loadService,
  loadBusiness,
  loadCity,
} from './actions';

export function* saveUser(action) {
  try {
    const { params } = action.payload;

    const res = yield request.doPut('user/edit', params);

    yield put(loadUser(res.data));
    // go back to user info page
    browserHistory.goBack();
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchIndustry() {
  try {
    const res = yield request.doGet('industry/industry-lists');

    const { list } = res
    // industry list set in first child for back data
    const { children } = list[0];
    yield put(loadIndustry(children));
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchService(action) {
  try {
    const { id } = action.payload;
    const res = yield request.doGet('main-service/list', {
      role_id: id,
    });

    const { list } = res;
    yield put(loadService(list));
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchBusiness() {
  try {
    const res = yield request.doGet('user/business-info');

    const { data } = res;
    yield put(loadBusiness(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* saveBusiness(action) {
  try {
    const { params } = action.payload;
    const res = yield request.doPut('user/business', params);

    browserHistory.goBack();
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchCity() {
  try {
    const res = yield request.doGet('area');

    const { data } = res;
    yield put(loadCity(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* defaultSaga() {
  const watcher = yield takeLatest(SAVE_USER, saveUser);
  const watcherIndustry = yield takeLatest(FETCH_INDUSTRY, fetchIndustry);
  const watcherService = yield takeLatest(FETCH_SERVICE, fetchService);
  const watcherBusiness = yield takeLatest(FETCH_BUSINESS_INFO, fetchBusiness);
  const watcherSaveBusiness = yield takeLatest(SVAE_BUSINESS_INFO, saveBusiness);
  const watcherCity = yield takeLatest(FETCH_CITY_INFO, fetchCity);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
  yield cancel(watcherIndustry);
  yield cancel(watcherService);
  yield cancel(watcherBusiness);
  yield cancel(watcherSaveBusiness)
  yield cancel(watcherCity);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
