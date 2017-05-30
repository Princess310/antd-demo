/*
 *
 * UserCenter actions
 *
 */

import {
  SAVE_USER,
  FETCH_INDUSTRY,
  LOAD_INDUSTRY,
  FETCH_SERVICE,
  LOAD_SERVICE,
} from './constants';

export function saveUser(params) {
  return {
    type: SAVE_USER,
    payload: {
      params,
    },
  };
}

export function fetchIndustry() {
  return {
    type: FETCH_INDUSTRY,
  };
}

export function loadIndustry(list) {
  return {
    type: LOAD_INDUSTRY,
    payload: {
      list,
    },
  };
}

export function fetchService(id) {
  return {
    type: FETCH_SERVICE,
    payload: {
      id,
    },
  };
}

export function loadService(list) {
  return {
    type: LOAD_SERVICE,
    payload: {
      list,
    },
  };
}