/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { loadUser } from 'containers/App/actions';
import request from 'utils/request';

import { FETCH_USER } from './constants';

export function* fetchUser() {
  try {
    // Call our request helper (see 'utils/request')
    const res = yield request.doGet('user/info');

    yield put(loadUser(res.data));
    // yield im.login(res.data.chat.userid, res.data.chat.password);
  } catch (err) {
    // console.log(err);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* defaultSaga() {
  const watcher = yield takeLatest(FETCH_USER, fetchUser);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  defaultSaga,
];
