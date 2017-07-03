/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  CHANGE_USERNAME,
  FETCH_USER,
  LOAD_SELECT_TAB,

  FETCH_UNREAD_DOT,
  LOAD_UNREAD_DOT,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function changeUsername(name) {
  return {
    type: CHANGE_USERNAME,
    name,
  };
}

export function fetchUser() {
  return {
    type: FETCH_USER,
  };
}

export function loadSelectTab(selectTab) {
  return {
    type: LOAD_SELECT_TAB,
    payload: {
      selectTab,
    },
  };
}

export function fetchUnreadDot() {
  return {
    type: FETCH_UNREAD_DOT,
  };
}

export function loadUnreadDot(data) {
  return {
    type: LOAD_UNREAD_DOT,
    payload: {
      data,
    },
  };
}
