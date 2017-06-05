/*
 *
 * BusinessPage actions
 *
 */

import {
  FETCH_MOMENT_DETAIL,
  LOAD_MOMENT_DETAIL,
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
