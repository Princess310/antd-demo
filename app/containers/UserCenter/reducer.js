/*
 *
 * UserCenter reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_INDUSTRY,
  LOAD_SERVICE,
  LOAD_BUSINESS_INFO,
  LAOD_CITY_INFO,
  LOAD_USER_VISITOR,
  LOAD_USER_VISITOR_REFRESH,
  LOAD_USER_VISITOR_LOADING,

  LOAD_USER_COLLECTS,
  LOAD_USER_COLLECTS_REFRESH,
  LOAD_USER_COLLECTS_LOADING,
  REMOVE_USER_COLLECT,
} from './constants';

const initialState = fromJS({
  industry: false,
  service: false,
  business: false,
  city: false,
  visitorUsers: {
    refresh: false,
    loading: false,
    list: false,
    hasNext: false,
  },
  visitorMine: {
    refresh: false,
    loading: false,
    list: false,
    hasNext: false,
  },
  collects: {
    refresh: false,
    loading: false,
    list: false,
    hasNext: false,
  },
});

function userCenterReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_INDUSTRY: {
      const { list } = action.payload;

      return state.set('industry', list);
    }
    case LOAD_SERVICE: {
      const { list } = action.payload;

      return state.set('service', list);
    }
    case LOAD_BUSINESS_INFO: {
      const { data } = action.payload;

      return state.set('business', data);
    }
    case LAOD_CITY_INFO: {
      const { data } = action.payload;

      return state.set('city', data);
    }
    case LOAD_USER_VISITOR: {
      const { type, list, page } = action.payload;
      const info = type === 0 ? state.get('visitorUsers') : state.get('visitorMine');

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

      return type === 0 ? state.set('visitorUsers', result) : state.set('visitorMine', result);
    }
    case LOAD_USER_VISITOR_REFRESH: {
      const { type, refresh } = action.payload;
      const info = type === 0 ? state.get('visitorUsers') : state.get('visitorMine');

      const result = info.set('refresh', refresh);
      return type === 0 ? state.set('visitorUsers', result) : state.set('visitorMine', result);
    }
    case LOAD_USER_VISITOR_LOADING: {
      const { type, loading } = action.payload;
      const info = type === 0 ? state.get('visitorUsers') : state.get('visitorMine');

      const result = info.set('loading', loading);
      return type === 0 ? state.set('visitorUsers', result) : state.set('visitorMine', result);
    }
    case LOAD_USER_COLLECTS: {
      const { list, page } = action.payload;
      const info = state.get('collects');

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

      return state.set('collects', result);
    }
    case LOAD_USER_COLLECTS_REFRESH: {
      const { refresh } = action.payload;
      const info = state.get('collects');

      const result = info.set('refresh', refresh);
      return state.set('collects', result);
    }
    case LOAD_USER_COLLECTS_LOADING: {
      const { loading } = action.payload;

      const info = state.get('collects');

      const result = info.set('loading', loading);
      return state.set('collects', result);
    }
    case REMOVE_USER_COLLECT: {
      const { id } = action.payload;
      const info = state.get('collects');
      const list = info.get('list');

      const newList = list.filter((moment) => (moment.id !== id));

      const result = info.set('list', newList);
      return state.set('collects', result);
    }
    default:
      return state;
  }
}

export default userCenterReducer;
