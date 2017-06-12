// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HomePage/reducer'),
          import('containers/HomePage/sagas'),

          import('containers/Communicate/reducer'),
          import('containers/Communicate/sagas'),

          import('containers/BusinessPage/reducer'),
          import('containers/BusinessPage/sagas'),

          import('containers/UserCenter/reducer'),
          import('containers/UserCenter/sagas'),

          import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([
          reducer, sagas,
          communicateReducer, communicateSagas,
          businessReducer, businessSagas,
          userCenterReducer, userCenterSagas,
          component,
        ]) => {
          injectReducer('home', reducer.default);
          injectSagas(sagas.default);

          injectReducer('communicate', communicateReducer.default);
          injectSagas(communicateSagas.default);

          injectReducer('business', businessReducer.default);
          injectSagas(businessSagas.default);

          injectReducer('userCenter', userCenterReducer.default);
          injectSagas(userCenterSagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      childRoutes: [
        {
          path: 'userSetting',
          name: 'userSettingPage',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              import('containers/UserSettingPage/reducer'),
              import('containers/UserSettingPage/sagas'),
              import('containers/UserSettingPage'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('userSettingPage', reducer.default);
              injectSagas(sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        }, {
          path: 'userPrivacy',
          name: 'userPrivacy',
          getComponent(location, cb) {
            import('containers/UserPrivacy')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        }, {
          path: 'userBlackList',
          name: 'userBlackList',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              import('containers/UserBlackList/reducer'),
              import('containers/UserBlackList/sagas'),
              import('containers/UserBlackList'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('userBlackList', reducer.default);
              injectSagas(sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        }, {
          path: 'resetPassword',
          name: 'resetPassword',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              import('containers/ResetPassword'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([component]) => {
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        }, {
          path: 'resetMobile',
          name: 'resetMobile',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              import('containers/ResetMobile'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([component]) => {
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        }, {
          path: 'about',
          name: 'aboutPage',
          getComponent(location, cb) {
            import('containers/AboutPage')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        }, {
          path: 'browser',
          name: 'browserPage',
          getComponent(location, cb) {
            import('containers/BrowserPage')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        }, {
          path: 'feedBack',
          name: 'feedBackPage',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              import('containers/FeedBackPage/reducer'),
              import('containers/FeedBackPage/sagas'),
              import('containers/FeedBackPage'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('feedBackPage', reducer.default);
              injectSagas(sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        }, {
          path: 'feedBackResult',
          name: 'feedBackResult',
          getComponent(location, cb) {
            import('containers/FeedBackResult')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        }, {
          path: 'userEdit',
          name: 'userEdit',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              import('containers/UserEdit'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([component]) => {
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        }, {
          path: 'userEditBasic',
          name: 'userEditBasic',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              import('containers/UserEditBasic'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([component]) => {
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        }, {
          path: 'userEditCompany',
          name: 'userEditCompany',
          getComponent(location, cb) {
            import('containers/UserEditCompany')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        }, {
          path: 'userEditIntro',
          name: 'userEditIntro',
          getComponent(location, cb) {
            import('containers/UserEditIntro')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        }, {
          path: 'userEditIdentity',
          name: 'userEditIdentity',
          getComponent(location, cb) {
            import('containers/UserEditIdentity')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        }, {
          path: 'userEditService',
          name: 'userEditService',
          getComponent(location, cb) {
            import('containers/UserEditService')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        }, {
          path: 'userEditPics',
          name: 'userEditPictures',
          getComponent(location, cb) {
            import('containers/UserEditPictures')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        }, {
          path: 'selectAddress',
          name: 'selectAddress',
          getComponent(location, cb) {
            import('containers/SelectAddress')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        }, {
          path: 'userCenterVisitor',
          name: 'userCenterVisitor',
          getComponent(location, cb) {
            import('containers/UserCenterVisitor')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        }, {
          path: 'userCenterCollects',
          name: 'userCenterCollects',
          getComponent(location, cb) {
            import('containers/UserCenterCollects')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        }, {
          path: 'userAuthorize',
          name: 'userAuthorize',
          getComponent(location, cb) {
            import('containers/UserAuthorize')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        }, {
          path: 'userMoments',
          name: 'userMoments',
          getComponent(location, cb) {
            import('containers/UserMoments')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        }, {
          path: 'userAuthorizeFiles',
          name: 'userAuthorizeFiles',
          getComponent(location, cb) {
            import('containers/UserAuthorizeFiles')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        }, {
          path: 'userCommunicate',
          name: 'userCommunication',
          getComponent(location, cb) {
            import('containers/UserCommunication')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        }, {
          path: 'momentDetail',
          name: 'momentDetail',
          getComponent(location, cb) {
            import('containers/MomentDetail')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        }, {
          path: 'userInfo',
          name: 'userInfo',
          getComponent(location, cb) {
            import('containers/UserInfo')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        }, {
          path: 'businessPublish',
          name: 'businessPublish',
          getComponent(location, cb) {
            import('containers/BusinessPublish')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        }, {
          path: 'businessPublishSupplier',
          name: 'businessPublishSupplier',
          getComponent(location, cb) {
            import('containers/BusinessPublishSupplier')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        },  {
          path: 'communicatePublish',
          name: 'communicatePublish',
          getComponent(location, cb) {
            import('containers/CommunicatePublish')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        }, {
          path: 'businessSearch',
          name: 'businessSearch',
          getComponent(location, cb) {
            import('containers/BusinessSearch')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        }, {
          path: 'guide',
          name: 'guidePage',
          getComponent(location, cb) {
            import('containers/GuidePage')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        }, {
          path: 'recentDemand',
          name: 'recentDemandPage',
          getComponent(location, cb) {
            import('containers/RecentDemandPage')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        }, {
          path: 'communicateSearch',
          name: 'communicateSearch',
          getComponent(location, cb) {
            import('containers/CommunicateSearch')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        },
      ],
    }, {
      path: 'login',
      name: 'loginPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/LoginPage/reducer'),
          import('containers/LoginPage/sagas'),
          import('containers/LoginPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('loginPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: 'preview',
      name: 'previewPage',
      getComponent(location, cb) {
        import('containers/PreviewPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: 'loginPhone',
      name: 'loginPhonePage',
      getComponent(location, cb) {
        import('containers/LoginPhonePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: 'register',
      name: 'registerPage',
      getComponent(location, cb) {
        import('containers/RegisterPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
