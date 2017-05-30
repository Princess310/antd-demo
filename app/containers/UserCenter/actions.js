/*
 *
 * UserCenter actions
 *
 */

import {
  SAVE_USER,
} from './constants';

export function saveUser(params) {
  return {
    type: SAVE_USER,
    payload: {
      params,
    },
  };
}
