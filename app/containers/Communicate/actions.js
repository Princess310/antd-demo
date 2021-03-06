/*
 *
 * Communicate actions
 *
 */

import {
  FETCH_COMMUNICATE,
  LOAD_COMMUNICATE,
  LOAD_COMMUNICATE_REFRESH,
  LOAD_COMMUNICATE_LOADING,

  FETCH_COMMUNICATE_SEARCH,
  LOAD_COMMUNICATE_SEARCH,
  LOAD_COMMUNICATE_SEARCH_LOADING,

  REFRESH_LIST_NEW_MOMENT,
  REMOVE_LIST_MOMENT,
} from './constants';

export function fetchCommunicate(page) {
  return {
    type: FETCH_COMMUNICATE,
    payload: {
      page,
    },
  };
}

export function loadCommunicate(list, page) {
  return {
    type: LOAD_COMMUNICATE,
    payload: {
      list,
      page,
    },
  };
}

export function loadCommunicateRefresh(refresh) {
  return {
    type: LOAD_COMMUNICATE_REFRESH,
    payload: {
      refresh,
    },
  };
}

export function loadCommunicateLoading(loading) {
  return {
    type: LOAD_COMMUNICATE_LOADING,
    payload: {
      loading,
    },
  };
}

export function fetchCommunicateSearch(keyword, page) {
  return {
    type: FETCH_COMMUNICATE_SEARCH,
    payload: {
      keyword,
      page
    },
  };
}

export function loadCommunicateSearch(list, page) {
  return {
    type: LOAD_COMMUNICATE_SEARCH,
    payload: {
      list,
      page,
    },
  };
}

export function loadCommunicateSearchLoading(loading) {
  return {
    type: LOAD_COMMUNICATE_SEARCH_LOADING,
    payload: {
      loading,
    },
  };
}

export function refreshListNewCommunicate(data) {
  return {
    type: REFRESH_LIST_NEW_MOMENT,
    payload: {
      data,
    },
  };
}

export function removeListCommunicate(id) {
  return {
    type: REMOVE_LIST_MOMENT,
    payload: {
      id,
    },
  };
}
