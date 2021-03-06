/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_USERNAME = 'boilerplate/Home/CHANGE_USERNAME';

export const FETCH_USER = 'app/HomePage/FETCH_USER';

export const LOAD_SELECT_TAB = 'app/HomePage/LOAD_SELECT_TAB';

export const FETCH_UNREAD_DOT = 'app/HomePage/FETCH_UNREAD_DOT';
export const LOAD_UNREAD_DOT = 'app/HomePage/LOAD_UNREAD_DOT';
