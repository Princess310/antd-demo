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
