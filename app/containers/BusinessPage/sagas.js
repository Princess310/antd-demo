import { take, cancel, put, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';
import request from 'utils/request';

import {
  FETCH_MOMENT_DETAIL,
} from './constants';

import {
  loadMomentDetail,
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

export function* defaultSaga() {
  const watcher = yield takeLatest(FETCH_MOMENT_DETAIL, fetchMomentDetail);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
