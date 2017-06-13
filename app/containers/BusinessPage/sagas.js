import { take, cancel, put, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';
import request from 'utils/request';

import {
  refreshListNewCommunicate,
  removeListCommunicate,
} from 'containers/Communicate/actions';

import {
  FETCH_MOMENT_DETAIL,

  FETCH_BUSINESS,

  FETCH_BUSINESS_PRICE,
  FETCH_BUSINESS_NUMBER,
  FETCH_BUSINESS_UNITS,
  FETCH_BUSINESS_REWARD,

  FETCH_BUSINESS_SEARCH,

  DO_LIKE_MOMENT,
  DO_DELETE_MOMENT,
  DO_LIKE_COMMENT,
  DO_SEND_COMMENT,
  DO_DELETE_COMMENT,
} from './constants';

import {
  loadMomentDetail,
  refreshListNewMoment,

  loadBusiness,
  loadBusinessRefresh,
  loadBusienssLoading,

  loadBusinessPrice,
  loadBusinessNumber,
  loadBusinessUnits,
  loadReward,

  loadSearchPanel,
  loadSearchAll,
  loadSearchAllLoading,

  removeMoment,
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

export function* fetchBusiness(action) {
  try {
    const { type, page, searchParams } = action.payload;
    // add refresh status
    if (page === 1) {
      yield put(loadBusinessRefresh(type, true));
    } else {
      yield put(loadBusienssLoading(type, true));
    }

    const res = yield request.doGet('moments/filter-supplier-demand', { reward_as: type, page, ...searchParams });

    const { list, page: resPage } = res;
    yield put(loadBusiness(type, list, resPage));
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchBusinessPrice() {
  try {
    const res = yield request.doGet('moments/price-section');

    // load all filter things
    yield put(loadBusinessPrice(res.list));
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchBusinessNumber() {
  try {
    const res = yield request.doGet('moments/number-section');

    // load all filter things
    yield put(loadBusinessNumber(res.list));
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchBusinessUnits() {
  try {
    const res = yield request.doGet('moments/moments/units');

    // load all filter things
    yield put(loadBusinessUnits(res.list));
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchBusinessReward() {
  try {
    const res = yield request.doGet('moments/reward-item');

    // load all filter things
    yield put(loadReward(res.list));
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchBusinessSearch(action) {
  try {
    const { panel, keyword, reward_as, page } = action.payload;

    if (panel === '7' || reward_as) {
      const res = yield request.doGet('moments/search', {
        panel,
        keyword,
        reward_as,
        page,
      });

      if (panel === '7') {
        yield put(loadSearchPanel(res));
      } else {
        const { list, page: resPage } = res;
        yield put(loadSearchAll(list, resPage));
      }
    } else {
      if (page !== 1) {
        yield put(loadSearchAllLoading(true));
      }
      const res = yield request.doGet('follow/search-friend', {
        type: 0,
        search: keyword,
        page,
      });

      const { list, page: resPage } = res;
      yield put(loadSearchAll(list, resPage));
    }
  } catch (err) {
    // console.log(err);
  }
}

export function* doRefreshMoment(id) {
  try {
    const newRes = yield request.doGet('moments/new-details', {
      moments_id: id,
    });

    const { list } = newRes;
    const newData = list[0];

    yield put(refreshListNewMoment(newData));
    yield put(refreshListNewCommunicate(newData));
  } catch (err) {
    // console.log(err);
  }
}

export function* likeMoment(action) {
  try {
    const { id, uid, from } = action.payload;
    const res = yield request.doPost('moments/like', {
      moments_id: id,
      to_uid: uid,
    });

    if (from === 'detail') {
      yield fetchMomentDetail({
        payload: {
          id,
        }
      });
    }

    yield doRefreshMoment(id);
  } catch (err) {
    // console.log(err);
  }
}

export function* delMoment(action) {
  try {
    const { id, from } = action.payload;console.log('from', from);
    const res = yield request.doDelete('moments/delete', {
      moments_id: id,
    });

    yield put(removeMoment(id));
    yield put(removeListCommunicate(id));

    if (from === 'detail') {
      browserHistory.push('/');
    }
  } catch (err) {
    // console.log(err);
  }
}

export function* likeComment(action) {
  try {
    const { id, cid, uid } = action.payload;
    const res = yield request.doPost('moments/comment-like', {
      comment_id: cid,
      to_uid: uid,
    });

    yield fetchMomentDetail({
      payload: {
        id,
      }
    });
  } catch (err) {
    // console.log(err);
  }
}

export function* sendComment(action) {
  try {
    const { id, uid, content, from, pid } = action.payload;
    const params = {
      moments_id: id,
      content,
      to_uid: uid,
    }

    if (pid) {
      params.pid = pid;
    }

    const res = yield request.doPost('moments/comment', params);

    if (from === 'detail') {
      yield fetchMomentDetail({
        payload: {
          id,
        }
      });
    }

    yield doRefreshMoment(id);
  } catch (err) {
    // console.log(err);
  }
}

export function* delComment(action) {
  try {
    const { id, cid } = action.payload;

    const res = yield request.doDelete('moments/del-comment', {
      comment_id: cid
    });

    yield fetchMomentDetail({
      payload: {
        id,
      }
    });
  } catch (err) {
    // console.log(err);
  }
}

export function* defaultSaga() {
  const watcher = yield takeLatest(FETCH_MOMENT_DETAIL, fetchMomentDetail);
  const watcherBusiness = yield takeLatest(FETCH_BUSINESS, fetchBusiness);
  const watcherBusinessPrice = yield takeLatest(FETCH_BUSINESS_PRICE, fetchBusinessPrice);
  const watcherBusinessNumber = yield takeLatest(FETCH_BUSINESS_NUMBER, fetchBusinessNumber);
  const watcherBusinessUnits = yield takeLatest(FETCH_BUSINESS_UNITS, fetchBusinessUnits);
  const watcherBusinessReward = yield takeLatest(FETCH_BUSINESS_REWARD, fetchBusinessReward);
  const watcherBusinessSearch = yield takeLatest(FETCH_BUSINESS_SEARCH, fetchBusinessSearch);
  const watcherLikeMoment = yield takeLatest(DO_LIKE_MOMENT, likeMoment);
  const watcherDelMoment = yield takeLatest(DO_DELETE_MOMENT, delMoment);
  const watcherLileComment = yield takeLatest(DO_LIKE_COMMENT, likeComment);
  const watcherSendComment = yield takeLatest(DO_SEND_COMMENT, sendComment);
  const watcherDelComment = yield takeLatest(DO_DELETE_COMMENT, delComment);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
  yield cancel(watcherBusiness);
  yield cancel(watcherBusinessPrice);
  yield cancel(watcherBusinessNumber);
  yield cancel(watcherBusinessUnits);
  yield cancel(watcherBusinessReward);
  yield cancel(watcherBusinessSearch);
  yield cancel(watcherLikeMoment);
  yield cancel(watcherDelMoment);
  yield cancel(watcherLileComment);
  yield cancel(watcherSendComment);
  yield cancel(watcherDelComment);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
