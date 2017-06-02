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
  FETCH_USER_VISITOR,
  FETCH_USER_COLLECTS,
  DELETE_USER_COLLECT,
} from './constants';

import {
  loadIndustry,
  loadService,
  loadBusiness,
  loadCity,
  loadUserVistor,
  loadVisitorRefresh,
  loadVisitorLoading,

  loadCollects,
  loadCollectsRefresh,
  loadCollectsLoading,
  removeCollect,
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

    const { list } = res;
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
    yield request.doPut('user/business', params);

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

export function* fetchVisitor(action) {
  try {
    const { type, page } = action.payload;
    // add refresh status
    if (page === 1) {
      yield put(loadVisitorRefresh(type, true));
    } else {
      yield put(loadVisitorLoading(type, true));
    }

    const res = yield request.doGet('user/visitor-list', { type, page });

    const { list, page: resPage } = res;
    yield put(loadUserVistor(type, list, resPage));
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchCollects(action) {
  try {
    const { page } = action.payload;
    // add refresh status
    if (page === 1) {
      yield put(loadCollectsRefresh(true));
    } else {
      yield put(loadCollectsLoading(true));
    }

    const res = yield request.doGet('user/my-favorite-list', { page });

    const { list, page: resPage } = res;
    yield put(loadCollects(list, resPage));
  } catch (err) {
    // console.log(err);
  }
}

export function* delCollect(action) {
  try {
    const { id } = action.payload;
    yield request.doDelete('user/delete-favorite', { id });

    yield put(removeCollect(id));
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
  const watcherVisitor = yield takeLatest(FETCH_USER_VISITOR, fetchVisitor);
  const watcherCollects = yield takeLatest(FETCH_USER_COLLECTS, fetchCollects);
  const watcherDelCollect = yield takeLatest(DELETE_USER_COLLECT, delCollect);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
  yield cancel(watcherIndustry);
  yield cancel(watcherService);
  yield cancel(watcherBusiness);
  yield cancel(watcherSaveBusiness);
  yield cancel(watcherCity);
  yield cancel(watcherVisitor);
  yield cancel(watcherCollects);
  yield cancel(watcherDelCollect);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
