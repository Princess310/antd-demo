import { take, cancel, put, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import {
  FETCH_COMMUNICATE,
  
  FETCH_COMMUNICATE_SEARCH,
} from './constants';

import {
  loadCommunicate,
  loadCommunicateRefresh,
  loadCommunicateLoading,

  loadCommunicateSearch,
  loadCommunicateSearchLoading,
} from './actions';

export function* fetchCommunicate(action) {
  try {
    const { page } = action.payload;
    // add refresh status
    if (page === 1) {
      yield put(loadCommunicateRefresh(true));
    } else {
      yield put(loadCommunicateLoading(true));
    }

    const res = yield request.doGet('moments/communication', { page });

    const { list, page: resPage } = res;
    yield put(loadCommunicate(list, resPage));
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchCommunicateSearch(action) {
  try {
    const { keyword, page } = action.payload;

    if (page !== 1) {
      yield put(loadCommunicateSearchLoading(true));
    }

    const res = yield request.doGet('moments/search', {
      page,
      keyword,
      panel: 4,
    });

    const { list, page: resPage } = res;
    yield put(loadCommunicateSearch(list, resPage));
  } catch (err) {
    // console.log(err);
  }
}

// Individual exports for testing
export function* defaultSaga() {
  const watcher = yield takeLatest(FETCH_COMMUNICATE, fetchCommunicate);
  const watcherSearch = yield takeLatest(FETCH_COMMUNICATE_SEARCH, fetchCommunicateSearch);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
  yield cancel(watcherSearch);
}

// All sagas to be loaded
export default [
  defaultSaga,
];