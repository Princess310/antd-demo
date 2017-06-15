/*
 *
 * BusinessPage actions
 *
 */

import {
  FETCH_MOMENT_DETAIL,
  LOAD_MOMENT_DETAIL,
  REFRESH_LIST_NEW_MOMENT,

  FETCH_BUSINESS,
  LOAD_BUSINESS,
  LOAD_BUSINESS_REFRESH,
  LOAD_BUSINESS_LOADING,

  FETCH_BUSINESS_PRICE,
  LOAD_BUSINESS_PRICE,

  FETCH_BUSINESS_NUMBER,
  LOAD_BUSINESS_NUMBER,

  FETCH_BUSINESS_UNITS,
  LOAD_BUSINESS_UNITS,

  FETCH_BUSINESS_REWARD,
  LOAD_BUSINESS_REWARD,

  FETCH_BUSINESS_SEARCH,
  LOAD_BUSINESS_SEARCH_PANEL,
  LOAD_BUSINESS_SEARCH_ALL,
  LOAD_BUSINESS_SEARCH_ALL_LOADING,

  DO_LIKE_MOMENT,
  DO_LIKE_COMMENT,
  DO_DELETE_MOMENT,
  REMOVE_LIST_MOMENT,
  DO_SEND_COMMENT,
  DO_DELETE_COMMENT,
  DO_COLLECT_MOMENT,
  SET_TOP_MOMENT,
  CHANGE_MOMENT_TRADE,

  PUBLISH_MOMENT,

  LOAD_PUBLISH_PARAMS,
} from './constants';

export function fetchMomentDetail(id) {
  return {
    type: FETCH_MOMENT_DETAIL,
    payload: {
      id: id,
    },
  };
}

export function loadMomentDetail(data) {
  return {
    type: LOAD_MOMENT_DETAIL,
    payload: {
      data,
    },
  };
}

export function refreshListNewMoment(data) {
  return {
    type: REFRESH_LIST_NEW_MOMENT,
    payload: {
      data,
    },
  };
}

export function fetchBusiness(type, page, searchParams) {
  return {
    type: FETCH_BUSINESS,
    payload: {
      type,
      page,
      searchParams,
    },
  };
}

export function loadBusiness(type, list, page) {
  return {
    type: LOAD_BUSINESS,
    payload: {
      type,
      list,
      page,
    },
  };
}

export function loadBusinessRefresh(type, refresh) {
  return {
    type: LOAD_BUSINESS_REFRESH,
    payload: {
      type,
      refresh,
    },
  };
}

export function loadBusienssLoading(type, loading) {
  return {
    type: LOAD_BUSINESS_LOADING,
    payload: {
      type,
      loading,
    }, 
  };
}

export function fetchBusinessPrice() {
  return {
    type: FETCH_BUSINESS_PRICE,
  };
}

export function loadBusinessPrice(list) {
  return {
    type: LOAD_BUSINESS_PRICE,
    payload: {
      list,
    },
  };
}

export function fetchBusinessNumber() {
  return {
    type: FETCH_BUSINESS_NUMBER,
  };
}

export function loadBusinessNumber(list) {
  return {
    type: LOAD_BUSINESS_NUMBER,
    payload: {
      list,
    },
  };
}

export function fetchBusinessUnits() {
  return {
    type: FETCH_BUSINESS_UNITS,
  };
}

export function loadBusinessUnits(list) {
  return {
    type: LOAD_BUSINESS_UNITS,
    payload: {
      list,
    },
  };
}

export function fetchReward() {
  return {
    type: FETCH_BUSINESS_REWARD,
  };
}

export function loadReward(list) {
  return {
    type: LOAD_BUSINESS_REWARD,
    payload: {
      list,
    },
  };
}

export function fetchSearch(panel, keyword, reward_as, page) {
  return {
    type: FETCH_BUSINESS_SEARCH,
    payload: {
      panel,
      keyword,
      reward_as,
      page,
    },
  };
}

export function loadSearchPanel(data) {
  return {
    type: LOAD_BUSINESS_SEARCH_PANEL,
    payload: {
      data,
    },
  };
}

export function loadSearchAll(list, page) {
  return {
    type: LOAD_BUSINESS_SEARCH_ALL,
    payload: {
      list,
      page,
    }
  };
}

export function loadSearchAllLoading(loading) {
  return {
    type: LOAD_BUSINESS_SEARCH_ALL_LOADING,
    payload: {
      loading,
    },
  };
}

export function likeMoment(id, uid, from) {
  return {
    type: DO_LIKE_MOMENT,
    payload: {
      id,
      uid,
      from,
    },
  };
}

export function delMoment(id, from) {
  return {
    type: DO_DELETE_MOMENT,
    payload: {
      id,
      from,
    },
  };
}

export function removeMoment(id) {
  return {
    type: REMOVE_LIST_MOMENT,
    payload: {
      id,
    },
  };
}

export function likeComment(id, cid, uid) {
  return {
    type: DO_LIKE_COMMENT,
    payload: {
      id,
      cid,
      uid,
    },
  };
}

export function sendComment(id, uid, content, from, pid) {
  return {
    type: DO_SEND_COMMENT,
    payload: {
      id,
      uid,
      content,
      from,
      pid,
    },
  };
}

export function delComment(id, cid) {
  return {
    type: DO_DELETE_COMMENT,
    payload: {
      id,
      cid,
    },
  };
}

export function collectMoment(id) {
  return {
    type: DO_COLLECT_MOMENT,
    payload: {
      id,
    },
  };
}

export function setTopMoment(id, reward_as) {
  return {
    type: SET_TOP_MOMENT,
    payload: {
      id,
      reward_as,
    },
  };
}

export function changeMomentTrade(id, from) {
  return {
    type: CHANGE_MOMENT_TRADE,
    payload: {
      id,
      from,
    },
  };
}

export function publishMoment(content, files, params, step) {
  return {
    type: PUBLISH_MOMENT,
    payload: {
      content,
      files,
      params,
      step,
    },
  };
}

export function loadPublishParams(params) {
  return {
    type: LOAD_PUBLISH_PARAMS,
    payload: {
      params,
    },
  };
}
