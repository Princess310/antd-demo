/*
 *
 * UserBlackList actions
 *
 */

import {
  FETCH_LIST,
  LOAD_LIST,
  LOAD_RERRESH,
  LOAD_LOADING,
  DELETE_BLACK,
  REMOVE_BLACK,
} from './constants';

export function fetchList(page) {
  return {
    type: FETCH_LIST,
    payload: {
      page,
    },
  };
}

export function loadList(list, page) {
  return {
    type: LOAD_LIST,
    payload: {
      list,
      page,
    },
  };
}

export function loadRefresh(refresh) {
  return {
    type: LOAD_RERRESH,
    payload: {
      refresh,
    },
  };
}

export function loadLoading(loading) {
  return {
    type: LOAD_LOADING,
    payload: {
      loading,
    },
  };
}

export function deleteBlack(fid) {
  return {
    type: DELETE_BLACK,
    payload: {
      fid,
    },
  };
}

export function removeBlack(id) {
  return {
    type: REMOVE_BLACK,
    payload: {
      id,
    },
  };
}