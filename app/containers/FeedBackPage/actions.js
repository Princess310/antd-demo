/*
 *
 * FeedBackPage actions
 *
 */

import {
  SAVE_INFO,
} from './constants';

export function saveInfo(message, files) {
  return {
    type: SAVE_INFO,
    payload: {
      message,
      files,
    },
  };
}
