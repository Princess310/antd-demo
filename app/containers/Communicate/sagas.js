import { take, cancel, put, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import {
  FETCH_COMMUNICATE,
} from './constants';

import {
  loadCommunicate,
  loadCommunicateRefresh,
  loadCommunicateLoading,
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

// Individual exports for testing
export function* defaultSaga() {
  const watcher = yield takeLatest(FETCH_COMMUNICATE, fetchCommunicate);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
