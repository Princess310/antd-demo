/*
 *
 * Communicate reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_COMMUNICATE,
  LOAD_COMMUNICATE_REFRESH,
  LOAD_COMMUNICATE_LOADING,
} from './constants';

const initialState = fromJS({
  communication: {
    refresh: false,
    loading: false,
    list: false,
    hasNext: false,
  },
});

function communicateReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_COMMUNICATE: {
      const { list, page } = action.payload;
      const info = state.get('communication');

      const oldList = info.get('list');
      let newList = oldList ? oldList : [];
      let hasNext = true;

      if (page) {
        if (page.current_page === 1) {
          newList = list;
        } else if (page.current_page <= page.page_count) {
          newList = [...newList, ...list];
        }

        if (page.current_page >= page.page_count) {
          hasNext = false;
        }
      } else {
        hasNext = false;
      }

      const result = info.set('list', newList)
        .set('hasNext', hasNext)
        .set('refresh', false)
        .set('loading', false);

      return state.set('communication', result);
    }
    case LOAD_COMMUNICATE_REFRESH: {
      const { refresh } = action.payload;
      const info = state.get('communication');

      const result = info.set('refresh', refresh);
      return state.set('communication', result);
    }
    case LOAD_COMMUNICATE_LOADING: {
      const { loading } = action.payload;

      const info = state.get('communication');

      const result = info.set('loading', loading);
      return state.set('communication', result);
    }
    default:
      return state;
  }
}

export default communicateReducer;
