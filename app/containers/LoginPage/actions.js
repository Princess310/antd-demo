/*
 *
 * LoginPage actions
 *
 */

import {
  DO_LOGIN,
  LOAD_LOGIN_ERROR,
} from './constants';

export function doLogin(username, password) {
  return {
    type: DO_LOGIN,
    payload: {
      username,
      password,
    },
  };
}

export function loadLoginError(error, data) {
  return {
    type: LOAD_LOGIN_ERROR,
    payload: {
      error,
      data,
    },
  };
}
