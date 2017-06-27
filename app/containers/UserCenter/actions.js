/*
 *
 * UserCenter actions
 *
 */

import {
  SAVE_USER,

  FETCH_INDUSTRY,
  LOAD_INDUSTRY,
  LOAD_INDUSTRY_SON,

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
  SAVE_USER_AUTH_INFO,
  LOAD_USER_AUTH_FILES,

  FETCH_USER_COMMUNICATION,
  LOAD_USER_COMMUNICATION,
  LOAD_USER_COMMUNICATION_REFRESH,
  LOAD_USER_COMMUNICATION_LOADING,

  FETCH_USER_INFO,
  LOAD_USER_INFO,

  DO_FOLLOW_USER,

  FETCH_COMPLAINT_TYPES,
  LOAD_COMPLAINT_TYPES,
  SAVE_USER_COMPLAINT,

  FETCH_USER_FRIEND,
  LOAD_USER_FRIEND,

  FETCH_FOLLOW_USER_INFO,
  LOAD_FOLLOW_USER_INFO,

  DO_CHANGE_FOLLOW_BLACK,

  FETCH_POINTS_RULES,
  LOAD_POINTS_RULES,
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

export function loadIndustrySon(id) {
  return {
    type: LOAD_INDUSTRY_SON,
    payload: {
      id,
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

export function saveAuthInfo(params) {
  return {
    type: SAVE_USER_AUTH_INFO,
    payload: {
      params,
    },
  };
}

export function loadAuthFiles(list) {
  return {
    type: LOAD_USER_AUTH_FILES,
    payload: {
      list,
    },
  };
}

export function fetchCommunication(page) {
  return {
    type: FETCH_USER_COMMUNICATION,
    payload: {
      page,
    },
  };
}

export function loadCommunication(list, page) {
  return {
    type: LOAD_USER_COMMUNICATION,
    payload: {
      list,
      page,
    },
  };
}

export function loadCommunicationRefresh(refresh) {
  return {
    type: LOAD_USER_COMMUNICATION_REFRESH,
    payload: {
      refresh,
    },
  };
}

export function loadCommunicationLoading(loading) {
  return {
    type: LOAD_USER_COMMUNICATION_LOADING,
    payload: {
      loading,
    },
  };
}

export function fetchUserInfo(id) {
  return {
    type: FETCH_USER_INFO,
    payload: {
      id,
    },
  };
}

export function loadUserInfo(data) {
  return {
    type: LOAD_USER_INFO,
    payload: {
      data,
    },
  };
}

export function doFollow(id, type) {
  return {
    type: DO_FOLLOW_USER,
    payload: {
      id,
      type,
    },
  };
}

export function fetchComplaintTypes() {
  return {
    type: FETCH_COMPLAINT_TYPES,
  };
}

export function loadComplaintTypes(list) {
  return {
    type: LOAD_COMPLAINT_TYPES,
    payload: {
      list,
    },
  };
}

export function saveUserComplaint(id, type, module) {
  return {
    type: SAVE_USER_COMPLAINT,
    payload: {
      id,
      type,
      module,
    },
  };
}

export function fetchUserFriend() {
  return {
    type: FETCH_USER_FRIEND,
  };
}

export function loadUserFirend(list) {
  return {
    type: LOAD_USER_FRIEND,
    payload: {
      list,
    },
  };
}

export function fetchFollowUserInfo(id) {
  return {
    type: FETCH_FOLLOW_USER_INFO,
    payload: {
      id,
    },
  };
}

export function loadFollowUserInfo(data) {
  return {
    type: LOAD_FOLLOW_USER_INFO,
    payload: {
      data,
    },
  };
}

export function changeFollowBlack(id, isBlack) {
  return {
    type: DO_CHANGE_FOLLOW_BLACK,
    payload: {
      id,
      isBlack,
    },
  };
}

export function fetchPointsRules() {
  return {
    type: FETCH_POINTS_RULES,
  };
}

export function loadPointsRules(list) {
  return {
    type: LOAD_POINTS_RULES,
    payload: {
      list,
    },
  };
}
