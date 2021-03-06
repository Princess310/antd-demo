import { take, cancel, put, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';
import request from 'utils/request';
import { uploadFile } from 'utils/utils';
import oss from 'utils/oss';
import { Toast, Modal } from 'antd-mobile';
import { getStore } from 'app';

const alert = Modal.alert;

import {
  refreshListNewCommunicate,
  removeListCommunicate,
} from 'containers/Communicate/actions';

import {
  fetchCommunicate
} from 'containers/Communicate/sagas';

import { loadSelectTab } from 'containers/HomePage/actions';

import {
  FETCH_MOMENT_DETAIL,

  FETCH_BUSINESS,

  FETCH_BUSINESS_PRICE,
  FETCH_BUSINESS_NUMBER,
  FETCH_BUSINESS_UNITS,
  FETCH_BUSINESS_REWARD,
  FETCH_BUSINESS_CHARACTER_SERVICE,

  FETCH_BUSINESS_SEARCH,

  DO_LIKE_MOMENT,
  DO_DELETE_MOMENT,
  DO_LIKE_COMMENT,
  DO_SEND_COMMENT,
  DO_DELETE_COMMENT,
  DO_COLLECT_MOMENT,
  SET_TOP_MOMENT,
  CHANGE_MOMENT_TRADE,

  PUBLISH_MOMENT,

  FETCH_MY_MOMENTS,

  DO_REFRESH_MOMENT,

  FETCH_BUSINESS_RECOMMEND,
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
  loadCharacterService,

  loadSearchPanel,
  loadSearchAll,
  loadSearchAllLoading,

  removeMoment,

  loadPublishParams,

  loadMyMoments,
  loadMyMomentsLoading,

  loadUpdateMessage,

  loadBusinessRecommend,
  loadBusinessRecommendRefresh,
  loadBusinessRecommendLoading,
} from './actions';

import {
  fetchUnreadDot,
} from 'containers/HomePage/sagas';

export function* fetchMomentDetail(action) {
  try {
    const { id, recommendId } = action.payload;
    const res = yield request.doGet('moments/details', { moments_id: id, release_moments_id: recommendId });
    const { data } = res;

    yield put(loadMomentDetail(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchBusiness(action) {
  try {
    const { role, page } = action.payload;
    // add refresh status
    if (page === 1) {
      yield put(loadBusinessRefresh(role, true));
    } else {
      yield put(loadBusienssLoading(role, true));
    }

    const res = yield request.doGet('moments/filter-supplier-demand', { page, role });

    const { list, page: resPage, update_counts } = res;
    yield put(loadBusiness(role, list, resPage));

    if (page === 1 && Number(role) === 0) {
      yield fetchUnreadDot();

      if (update_counts > 0) {
        yield put(loadUpdateMessage('business', true, update_counts));
      }
    }
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
    const res = yield request.doGet('moments/units');

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

export function* fetchCharacterService() {
  try {
    const res = yield request.doGet('moments/characteristic-service');

    // load all filter things
    yield put(loadCharacterService(res.list));
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchBusinessSearch(action) {
  try {
    const { panel, keyword, reward_as, type, page } = action.payload;

    if (panel === '7' || reward_as) {
      const res = yield request.doGet('moments/search', {
        panel,
        keyword,
        reward_as,
        type,
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

// XXX: add the fresh moment func to refresh detail and list info
export function* refreshMoment(action) {
  try {
    const { id } = action.payload;

    yield fetchMomentDetail({
      payload: {
        id,
      }
    });

    yield doRefreshMoment(id);
    
    browserHistory.goBack();
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

    const { data: { is_popup }, message } = res;
    if (is_popup === 0) {
      Toast.info(message, 1.2);
    }
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

    const { data: { is_popup }, message } = res;
    if (is_popup === 0) {
      Toast.info(message, 1.2);
    }
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

    const { data: { is_popup, messagePopup }, message } = res;
    if (is_popup === 1) {
      alert('评论成功', <div>
          <div style={{ color: '#50ABF1' }}>{messagePopup[0]}</div>
          <div>{messagePopup[1]}</div>
        </div>, [
        { text: '我知道了', onPress: () => console.log('cancel') },
        { text: '立即前去', onPress: () => {
          const store = getStore();
          store.dispatch(loadSelectTab('business'));
        }, style: { fontWeight: 'bold' } },
      ]);
    } else {
      Toast.info(message, 1.2);
    }
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

export function* collectMoment(action) {
  try {
    const { id } = action.payload;

    const res = yield request.doPost('user/favorite', {
      moments_id: id,
    });

    Toast.success('收藏成功!', 1);
  } catch (err) {
    // console.log(err);
  }
}

export function* setTopMoment(action) {
  try {
    const { id, reward_as, role } = action.payload;

    const res = yield request.doPost('moments/supply-and-demnd-top', {
      moments_id: id,
    });
    
    if (res.code !== 200) {
      const { data: { my_point, release_point } } = res;

      if (my_point < release_point) {
        alert('积分不足', `剩余${my_point}积分。您的账户不足${release_point}分，无法置顶，可到“动态”栏目评论、点赞、分享挣取积分。`, [
          { text: '我知道了', onPress: () => console.log('cancel') },
          { text: '立即前去', onPress: () => {
            const store = getStore();
            store.dispatch(loadSelectTab('communicate'));
          }, style: { fontWeight: 'bold' } },
        ]);
      }
    } else {
       yield fetchBusiness({
        payload: {
          type: reward_as,
          page: 1,
          role,
        },
      });

      const { data: { is_popup }, message } = res;
      if (is_popup === 0) {
        Toast.info(message, 1.2);
      }
    }
  } catch (err) {
    // console.log(err);
  }
}

export function* changeMomentTrade(action) {
  try {
    const { id, from } = action.payload;

    const res = yield request.doPost('moments/trade', {
      moments_id: id,
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

export function* publishMoment(action) {
  try {
    const { content, files, params, step } = action.payload;
    const pics = [];

    // compress images and upload to oss
    for (let i = 0; i < files.length; i += 1) {
      const url = yield uploadFile(files[i].file, oss.getFolderPath('moments', '1'));
      pics.push(url);
    }

    const res = yield request.doPost('moments/release', {
      content,
      pictures: pics.join(','),
      ...params,
    });
    const { moments_id } = res;

    yield fetchCommunicate({
      payload: {
        page: 1,
      },
    });
    // reset publish params
    yield put(loadPublishParams(false));

    if (Number(params.category) === 4) {
      Toast.info('发布成功，审核通过后展示并挣取10积分!', 2);

      if (step) {
        browserHistory.go(-step);
      } else {
        browserHistory.goBack();
      }
    } else {
      Toast.info('发布成功', 2);

      yield fetchRecommend({
        payload: {
          id: moments_id,
          page: 1,
          step,
        },
      });
    }
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchMyMoments(action) {
  try {
    const { type, page, uid } = action.payload;
    // add refresh status
    if (page !== 1) {
      yield put(loadMyMomentsLoading(type, true));
    }

    const res = yield request.doGet('moments/my-supplier-demand', { reward_as: type, page, uid });

    const { list, page: resPage } = res;
    yield put(loadMyMoments(type, list, resPage));
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchRecommend(action) {
  const { id, page, step } = action.payload;
    // add refresh status
    if (page === 1) {
      yield put(loadBusinessRecommendRefresh(true));
    } else {
      yield put(loadBusinessRecommendLoading(true));
    }

    const res = yield request.doGet('moments/recommend', { moments_id: id, page });

    const { list, page: resPage } = res;
    yield put(loadBusinessRecommend(list, resPage));

    if (list.length > 0) {
      browserHistory.replace({
        pathname: 'businessRecommend',
        query: {
          id,
        },
      });
    } else {
      if (step) {
        browserHistory.go(-step);
      } else {
        browserHistory.goBack();
      }
    }
}

export function* defaultSaga() {
  const watcher = yield takeLatest(FETCH_MOMENT_DETAIL, fetchMomentDetail);
  const watcherBusiness = yield takeLatest(FETCH_BUSINESS, fetchBusiness);
  const watcherBusinessPrice = yield takeLatest(FETCH_BUSINESS_PRICE, fetchBusinessPrice);
  const watcherBusinessNumber = yield takeLatest(FETCH_BUSINESS_NUMBER, fetchBusinessNumber);
  const watcherBusinessUnits = yield takeLatest(FETCH_BUSINESS_UNITS, fetchBusinessUnits);
  const watcherBusinessReward = yield takeLatest(FETCH_BUSINESS_REWARD, fetchBusinessReward);
  const watcherBusinessCharacterService = yield takeLatest(FETCH_BUSINESS_CHARACTER_SERVICE, fetchCharacterService);
  const watcherBusinessSearch = yield takeLatest(FETCH_BUSINESS_SEARCH, fetchBusinessSearch);
  const watcherLikeMoment = yield takeLatest(DO_LIKE_MOMENT, likeMoment);
  const watcherDelMoment = yield takeLatest(DO_DELETE_MOMENT, delMoment);
  const watcherLileComment = yield takeLatest(DO_LIKE_COMMENT, likeComment);
  const watcherSendComment = yield takeLatest(DO_SEND_COMMENT, sendComment);
  const watcherDelComment = yield takeLatest(DO_DELETE_COMMENT, delComment);
  const watcherCollectMoment = yield takeLatest(DO_COLLECT_MOMENT, collectMoment);
  const watcherSetTop = yield takeLatest(SET_TOP_MOMENT, setTopMoment);
  const watcherChangeMomentTrade = yield takeLatest(CHANGE_MOMENT_TRADE, changeMomentTrade);
  const watcherPublishMoment = yield takeLatest(PUBLISH_MOMENT, publishMoment);
  const watcherMyMoments = yield takeLatest(FETCH_MY_MOMENTS, fetchMyMoments);
  const watcherRefreshMoment = yield takeLatest(DO_REFRESH_MOMENT, refreshMoment);
  const watcherBusinessRecommend = yield takeLatest(FETCH_BUSINESS_RECOMMEND, fetchRecommend);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
  yield cancel(watcherBusiness);
  yield cancel(watcherBusinessPrice);
  yield cancel(watcherBusinessNumber);
  yield cancel(watcherBusinessUnits);
  yield cancel(watcherBusinessReward);
  yield cancel(watcherBusinessCharacterService);
  yield cancel(watcherBusinessSearch);
  yield cancel(watcherLikeMoment);
  yield cancel(watcherDelMoment);
  yield cancel(watcherLileComment);
  yield cancel(watcherSendComment);
  yield cancel(watcherDelComment);
  yield cancel(watcherCollectMoment);
  yield cancel(watcherSetTop);
  yield cancel(watcherChangeMomentTrade);
  yield cancel(watcherPublishMoment);
  yield cancel(watcherMyMoments);
  yield cancel(watcherRefreshMoment);
  yield cancel(watcherBusinessRecommend);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
