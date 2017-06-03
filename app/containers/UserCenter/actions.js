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

  FETCH_BUSINESS_INFO,
  LOAD_BUSINESS_INFO,
  SVAE_BUSINESS_INFO,

  FETCH_CITY_INFO,
  LAOD_CITY_INFO,

  FETCH_USER_VISITOR,
  LOAD_USER_VISITOR,
  LOAD_USER_VISITOR_REFRESH,
  LOAD_USER_VISITOR_LOADING,

  FETCH_USER_COLLECTS,
  LOAD_USER_COLLECTS,
  LOAD_USER_COLLECTS_REFRESH,
  LOAD_USER_COLLECTS_LOADING,
  DELETE_USER_COLLECT,
  REMOVE_USER_COLLECT,

  FETCH_USER_MOMENTS,
  LOAD_USER_MOMENTS,
  LOAD_USER_MOMENTS_REFRESH,
  LOAD_USER_MOMENTS_LOADING,

  FETCH_USER_AUTH_INFO,
  LOAD_USER_AUTH_INFO,
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

export function fetchBusiness() {
  return {
    type: FETCH_BUSINESS_INFO,
  };
}

export function loadBusiness(data) {
  return {
    type: LOAD_BUSINESS_INFO,
    payload: {
      data,
    },
  };
}

export function saveBusiness(params) {
  return {
    type: SVAE_BUSINESS_INFO,
    payload: {
      params,
    },
  };
}

export function fetchCity() {
  return {
    type: FETCH_CITY_INFO,
  };
}

export function loadCity(data) {
  return {
    type: LAOD_CITY_INFO,
    payload: {
      data,
    },
  };
}

export function fetchVistor(type, page) {
  return {
    type: FETCH_USER_VISITOR,
    payload: {
      type,
      page,
    },
  };
}

export function loadUserVistor(type, list, page) {
  return {
    type: LOAD_USER_VISITOR,
    payload: {
      type,
      list,
      page,
    },
  };
}

export function loadVisitorRefresh(type, refresh) {
  return {
    type: LOAD_USER_VISITOR_REFRESH,
    payload: {
      type,
      refresh,
    },
  };
}

export function loadVisitorLoading(type, loading) {
  return {
    type: LOAD_USER_VISITOR_LOADING,
    payload: {
      type,
      loading,
    },
  };
}

export function fetchCollects(page) {
  return {
    type: FETCH_USER_COLLECTS,
    payload: {
      page,
    },
  };
}

export function loadCollects(list, page) {
  return {
    type: LOAD_USER_COLLECTS,
    payload: {
      list,
      page,
    },
  };
}

export function loadCollectsRefresh(refresh) {
  return {
    type: LOAD_USER_COLLECTS_REFRESH,
    payload: {
      refresh,
    },
  };
}

export function loadCollectsLoading(loading) {
  return {
    type: LOAD_USER_COLLECTS_LOADING,
    payload: {
      loading,
    },
  };
}

export function delCollect(id) {
  return {
    type: DELETE_USER_COLLECT,
    payload: {
      id,
    },
  };
}

export function removeCollect(id) {
  return {
    type: REMOVE_USER_COLLECT,
    payload: {
      id,
    },
  };
}

export function fetchUserMoments(type, page) {
  return {
    type: FETCH_USER_MOMENTS,
    payload: {
      type,
      page,
    },
  };
}

export function loadUserMoments(type, list, page) {
  return {
    type: LOAD_USER_MOMENTS,
    payload: {
      type,
      list,
      page,
    },
  };
}

export function loadUserMomentsRefresh(type, refresh) {
  return {
    type: LOAD_USER_MOMENTS_REFRESH,
    payload: {
      type,
      refresh,
    },
  };
}

export function loadUserMomentsLoading(type, loading) {
  return {
    type: LOAD_USER_MOMENTS_LOADING,
    payload: {
      type,
      loading,
    },
  };
}

export function fetchAuthInfo() {
  return {
    type: FETCH_USER_AUTH_INFO,
  };
}

export function loadAuthInfo(data) {
  return {
    type: LOAD_USER_AUTH_INFO,
    payload: {
      data,
    },
  };
}
