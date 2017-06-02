import { take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';

import request from 'utils/request';
import { uploadFile } from 'utils/utils';
import oss from 'utils/oss';

import { SAVE_INFO } from './constants';

export function* saveInfo(action) {
  try {
    const { message, files } = action.payload;
    const pics = [];

    // compress images and upload to oss
    for (let i = 0; i < files.length; i += 1) {
      const url = yield uploadFile(files[i].file, oss.getFolderPath('moments', '1'));
      pics.push(url);
    }

    yield request.doPost('user/feedback', {
      message,
      pictures: pics.join(','),
    });

    browserHistory.replace('/feedBackResult');
  } catch (err) {
    // console.log(err);
  }
}

export function* defaultSaga() {
  const watcher = yield takeLatest(SAVE_INFO, saveInfo);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
