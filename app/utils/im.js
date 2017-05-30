const sdk = new WSDK();
const APP_KEY = 23354047;
const SYS_NAME = 'system';
const GROUP_PREFIX = 'chntribe';

const im = {
  statusCode: {
    SUCCESS: 1000,
    NOT_LOGIN: 1001,
    TIMEOUT: 1002,
    OTHER_ERROR: 1003,
    PARSE_ERROR: 1004,
    NET_ERROR: 1005,
    KICK_OFF: 1006,
    LOGIN_INFO_ERROR: 1007,
    ALREADY_LOGIN: 1008,
    NO_MESSAGE: 1009,
    PARAM_ERROR: 1010,
    OFTEN_LOGIN: 1011,
    SERVER_ALREADY_LOGIN: 1012,
    NO_USER: 1013,
    PASSWORD_ERROR: 1014,
  },
  getSysName: () => SYS_NAME,
  getGroupPreFix: () => GROUP_PREFIX,
  getNick: (luid) => sdk.Base.getNick(luid),
  destroy: () => {
    sdk.Base.destroy();
  },
  login: (uid, pwd) => (new Promise((resolve, reject) => {
    sdk.Base.login({
      uid,
      appkey: APP_KEY,
      credential: pwd,
      timeout: 5000,
      success: (data) => {
        resolve(data);
      },
      error: (error) => {
        reject(error);
      },
    });
  })),
  logout: () => (new Promise((resolve, reject) => {
    sdk.Base.logout({
      success: (data) => {
        resolve(data);
      },
      error: (error) => {
        reject(error);
      },
    });
  })),
  getUnreadMsgCount: (count) => (new Promise((resolve, reject) => {
    sdk.Base.getUnreadMsgCount({
      count,
      success: (data) => {
        resolve(data);
      },
      error: (error) => {
        reject(error);
      },
    });
  })),
  getRecentContact: (count) => (new Promise((resolve, reject) => {
    sdk.Base.getRecentContact({
      count,
      success: (data) => {
        resolve(data);
      },
      error: (error) => {
        reject(error);
      },
    });
  })),
  startListenAllMsg: () => {
    sdk.Base.startListenAllMsg();
  },
  stopListenAllMsg: () => {
    sdk.Base.stopListenAllMsg();
  },
  // single chat
  chat: {
    sendMsg: (touid, msg) => (new Promise((resolve, reject) => {
      sdk.Chat.sendMsg({
        touid,
        msg,
        success: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    })),
    sendCustomMsg: (touid, msg, summary) => (new Promise((resolve, reject) => {
      sdk.Chat.sendCustomMsg({
        touid,
        msg,
        summary,
        success: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    })),
    getHistory: (touid, nextkey, count) => (new Promise((resolve, reject) => {
      sdk.Chat.getHistory({
        touid,
        nextkey,
        count,
        success: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    })),
    setReadState: (touid) => (new Promise((resolve, reject) => {
      sdk.Chat.setReadState({
        touid,
        timestamp: Math.floor((+new Date()) / 1000),
        success: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    })),
    startListenMsg: (touid) => (new Promise((resolve, reject) => {
      sdk.Chat.startListenMsg({
        touid,
        success: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    })),
    stopListenMsg: () => {
      sdk.Chat.stopListenMsg();
    },
    getUserStatus: (uids) => (new Promise((resolve, reject) => {
      sdk.Chat.getUserStatus({
        uids,
        hasPrefix: true,
        success: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    })),
    recieveMsg: (fn) => (new Promise(() => {
      sdk.Event.on('CHAT.MSG_RECEIVED', (data) => {
        fn(data);
      });
    })),
  },
  // tribe chat
  tribe: {
    sendMsg: (tid, msg) => (new Promise((resolve, reject) => {
      sdk.Tribe.sendMsg({
        tid,
        msg,
        msgType: 17,
        success: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    })),
    getHistory: (tid, nextkey, count) => (new Promise((resolve, reject) => {
      sdk.Tribe.getHistory({
        tid,
        nextkey,
        count,
        success: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    })),
    getTribeInfo: (tid) => (new Promise((resolve, reject) => {
      sdk.Tribe.getTribeInfo({
        tid,
        success: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    })),
    getTribeList: () => (new Promise((resolve, reject) => {
      sdk.Tribe.getTribeList({
        success: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    })),
    getTribeMembers: (tid) => (new Promise((resolve, reject) => {
      sdk.Tribe.getTribeMembers({
        tid,
        success: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    })),
    responseInviteIntoTribe: (tid, recommender, validatecode, manager) => (new Promise((resolve, reject) => {
      sdk.Tribe.responseInviteIntoTribe({
        tid,
        recommender,
        validatecode,
        manager,
        success: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    })),
    recieveMsg: (fn) => (new Promise(() => {
      sdk.Event.on('TRIBE.MSG_RECEIVED', (data) => {
        fn(data);
      });
    })),
  },
};

export default im;
