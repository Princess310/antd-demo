/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';
import { browserHistory } from 'react-router';
import {
  CHANGE_USERNAME,
  LOAD_SELECT_TAB,

  LOAD_UNREAD_DOT,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  username: '',
  selectTab: 'business',
  unreadDot: {},
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:

      // Delete prefixed '@' from the github username
      return state
        .set('username', action.name.replace(/@/gi, ''));
    case LOAD_SELECT_TAB: {
      const { selectTab } = action.payload;
      const { pathname } = window.location;

      if (pathname !== '/') {
        browserHistory.goBack();
      }
      return state.set('selectTab', selectTab);
    }
    case LOAD_UNREAD_DOT: {
      const { data } = action.payload;

      return state.set('unreadDot', data);
    }
    default:
      return state;
  }
}

export default homeReducer;
