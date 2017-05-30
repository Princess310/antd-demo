/*
 *
 * UserCenter reducer
 *
 */

import { fromJS } from 'immutable';
import {

} from './constants';

const initialState = fromJS({});

function userCenterReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default userCenterReducer;
