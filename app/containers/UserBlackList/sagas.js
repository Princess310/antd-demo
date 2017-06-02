import { take, cancel, put, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import request from 'utils/request';

import { FETCH_LIST, DELETE_BLACK } from './constants';
import { loadList, loadRefresh, loadLoading, removeBlack } from './actions';

export function* fetchList(action) {
  try {
    // add refresh status
    if (action.payload.page === 1) {
      yield put(loadRefresh(true));
    } else {
      yield put(loadLoading(true));
    }

    const res = yield request.doGet('user/black-list', action.payload);
    const { list, page } = res;

    yield put(loadList(list, page));
  } catch (err) {
    // console.log(err);
  }
}

export function* deleteBlack(action) {
  try {
    yield request.doDelete('user/delete-black-list', action.payload);

    yield put(removeBlack(action.payload.fid));
  } catch (err) {
    // console.log(err);
  }
}

export function* defaultSaga() {
  const watcher = yield takeLatest(FETCH_LIST, fetchList);
  const watcherDelete = yield takeLatest(DELETE_BLACK, deleteBlack);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
  yield cancel(watcherDelete);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
