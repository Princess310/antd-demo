/*
 *
 * UserBlackList reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_LIST,
  LOAD_RERRESH,
  LOAD_LOADING,
  REMOVE_BLACK,
} from './constants';

const initialState = fromJS({
  refresh: false,
  loading: false,
  list: false,
  hasNext: false,
});

function userBlackListReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_LIST: {
      const { list, page } = action.payload;
      const oldList = state.get('list');
      let newList = oldList ? oldList : [];
      let hasNext = true;

      if (page) {
        if(page.current_page === 1){
          newList = list;
        } else if(page.current_page <= page.page_count){
          newList = [...newList, ...list];
        }

        if(page.current_page >= page.page_count){
          hasNext = false;
        }
      } else {
        hasNext = false;
      }

      return state
        .set('list', newList)
        .set('hasNext', hasNext)
        .set('refresh', false)
        .set('loading', false);
    }
    case LOAD_RERRESH: {
      const { refresh } = action.payload;

      return state.set('refresh', refresh);
    }
    case LOAD_LOADING: {
      const { loading } = action.payload;

      return state.set('loading', loading);
    }
    case REMOVE_BLACK: {
      const { id } = action.payload;
      const list = state.get('list');

      const newList = list.filter((user) => {
        return user.id !== id
      });

      return state.set('list', newList);
    }
    default:
      return state;
  }
}

export default userBlackListReducer;
