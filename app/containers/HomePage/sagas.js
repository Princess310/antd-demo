/**
 * Gets the repositories of the user from Github
 */

import { take, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { loadUser } from 'containers/App/actions';
import request from 'utils/request';
import { browserHistory } from 'react-router';

import { FETCH_USER, FETCH_UNREAD_DOT } from './constants';

import { loadUnreadDot } from './actions';

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

export function* fetchUnreadDot() {
  try {
    // Call our request helper (see 'utils/request')
    const res = yield request.doGet('moments/unread-dot');

    yield put(loadUnreadDot(res.list));
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
  const watcherUnreadDot = yield takeLatest(FETCH_UNREAD_DOT, fetchUnreadDot);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
  yield cancel(watcherUnreadDot);
}

// Bootstrap sagas
export default [
  defaultSaga,
];
