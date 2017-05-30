import { take, cancel, put, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';
import request from 'utils/request';

import { SAVE_USER } from './constants';
import { loadUser } from 'containers/App/actions';

export function* saveUser(action) {
  try {
    const { params } = action.payload;

    const res = yield request.doPut('user/edit', params);

    yield put(loadUser(res.data));
    // go back to user info page
    browserHistory.go(-1);
  } catch (err) {
    // console.log(err);
  }
}

export function* defaultSaga() {
  const watcher = yield takeLatest(SAVE_USER, saveUser);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
