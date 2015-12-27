System.config({
  baseURL: "/project-cms",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "blacklist": [],
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  packages: {
    ".": {
      "defaultExtension": "js",
      "modules": {
        "*.jsx": {
          "loader": "jsx"
        }
      }
    }
  },

  depCache: {
    "app/app.jsx": [
      "npm:babel-runtime@5.8.34/core-js/promise",
      "npm:react@0.14.3",
      "npm:react-dom@0.14.3",
      "npm:lodash@3.10.1",
      "npm:immutable@3.7.5",
      "npm:redux@3.0.4",
      "npm:react-redux@4.0.0",
      "npm:redux-immutablejs@0.0.7",
      "npm:react-router@1.0.0",
      "npm:history@1.13.1/lib/createHashHistory",
      "app/middleware/promise.js",
      "app/middleware/persistence.js",
      "app/appsLoader.js",
      "app/publishers/zipfile.js",
      "app/publishers/index.js"
    ],
    "npm:react-router@1.0.0": [
      "npm:react-router@1.0.0/lib/index"
    ],
    "npm:redux-immutablejs@0.0.7": [
      "npm:redux-immutablejs@0.0.7/lib/index"
    ],
    "npm:react@0.14.3": [
      "npm:react@0.14.3/react"
    ],
    "npm:react-redux@4.0.0": [
      "npm:react-redux@4.0.0/lib/index"
    ],
    "npm:lodash@3.10.1": [
      "npm:lodash@3.10.1/index"
    ],
    "npm:history@1.13.1/lib/createHashHistory": [
      "npm:warning@2.1.0",
      "npm:invariant@2.2.0",
      "npm:history@1.13.1/lib/Actions",
      "npm:history@1.13.1/lib/ExecutionEnvironment",
      "npm:history@1.13.1/lib/DOMUtils",
      "npm:history@1.13.1/lib/DOMStateStorage",
      "npm:history@1.13.1/lib/createDOMHistory",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "app/middleware/persistence.js": [
      "npm:babel-runtime@5.8.34/core-js/promise",
      "npm:levelup@0.19.0",
      "npm:localstorage-down@0.6.4",
      "npm:level-sublevel@6.5.2",
      "npm:lodash@3.10.1",
      "npm:immutable@3.7.5"
    ],
    "app/middleware/promise.js": [
      "npm:babel-runtime@5.8.34/helpers/extends",
      "npm:babel-runtime@5.8.34/helpers/object-without-properties",
      "npm:babel-runtime@5.8.34/core-js/promise"
    ],
    "npm:immutable@3.7.5": [
      "npm:immutable@3.7.5/dist/immutable"
    ],
    "npm:babel-runtime@5.8.34/core-js/promise": [
      "npm:core-js@1.2.6/library/fn/promise"
    ],
    "app/publishers/zipfile.js": [
      "npm:jszip@2.5.0",
      "npm:lodash@3.10.1",
      "github:eligrey/FileSaver.js@master"
    ],
    "npm:react-dom@0.14.3": [
      "npm:react-dom@0.14.3/index"
    ],
    "app/publishers/index.js": [
      "npm:babel-runtime@5.8.34/core-js/promise",
      "npm:lodash@3.10.1"
    ],
    "npm:redux@3.0.4": [
      "npm:redux@3.0.4/lib/index"
    ],
    "app/appsLoader.js": [
      "npm:babel-runtime@5.8.34/core-js/promise",
      "npm:lodash@3.10.1"
    ],
    "npm:react@0.14.3/react": [
      "npm:react@0.14.3/lib/React"
    ],
    "npm:redux-immutablejs@0.0.7/lib/index": [
      "npm:redux-immutablejs@0.0.7/lib/utils/combineReducers",
      "npm:redux-immutablejs@0.0.7/lib/utils/createReducer"
    ],
    "npm:react-router@1.0.0/lib/index": [
      "npm:react-router@1.0.0/lib/Router",
      "npm:react-router@1.0.0/lib/Link",
      "npm:react-router@1.0.0/lib/IndexLink",
      "npm:react-router@1.0.0/lib/IndexRedirect",
      "npm:react-router@1.0.0/lib/IndexRoute",
      "npm:react-router@1.0.0/lib/Redirect",
      "npm:react-router@1.0.0/lib/Route",
      "npm:react-router@1.0.0/lib/History",
      "npm:react-router@1.0.0/lib/Lifecycle",
      "npm:react-router@1.0.0/lib/RouteContext",
      "npm:react-router@1.0.0/lib/useRoutes",
      "npm:react-router@1.0.0/lib/RouteUtils",
      "npm:react-router@1.0.0/lib/RoutingContext",
      "npm:react-router@1.0.0/lib/PropTypes",
      "npm:react-router@1.0.0/lib/match"
    ],
    "npm:react-redux@4.0.0/lib/index": [
      "npm:react-redux@4.0.0/lib/components/Provider",
      "npm:react-redux@4.0.0/lib/components/connect"
    ],
    "github:jspm/nodelibs-process@0.1.2": [
      "github:jspm/nodelibs-process@0.1.2/index"
    ],
    "npm:warning@2.1.0": [
      "npm:warning@2.1.0/browser"
    ],
    "npm:invariant@2.2.0": [
      "npm:invariant@2.2.0/browser"
    ],
    "npm:history@1.13.1/lib/DOMStateStorage": [
      "npm:warning@2.1.0",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:lodash@3.10.1/index": [
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:history@1.13.1/lib/createDOMHistory": [
      "npm:invariant@2.2.0",
      "npm:history@1.13.1/lib/ExecutionEnvironment",
      "npm:history@1.13.1/lib/DOMUtils",
      "npm:history@1.13.1/lib/createHistory",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:level-sublevel@6.5.2": [
      "npm:level-sublevel@6.5.2/index"
    ],
    "npm:levelup@0.19.0": [
      "npm:levelup@0.19.0/lib/levelup"
    ],
    "npm:babel-runtime@5.8.34/helpers/extends": [
      "npm:babel-runtime@5.8.34/core-js/object/assign"
    ],
    "npm:localstorage-down@0.6.4": [
      "npm:localstorage-down@0.6.4/index"
    ],
    "npm:react-dom@0.14.3/index": [
      "npm:react@0.14.3/lib/ReactDOM"
    ],
    "npm:jszip@2.5.0": [
      "npm:jszip@2.5.0/lib/index"
    ],
    "npm:core-js@1.2.6/library/fn/promise": [
      "npm:core-js@1.2.6/library/modules/es6.object.to-string",
      "npm:core-js@1.2.6/library/modules/es6.string.iterator",
      "npm:core-js@1.2.6/library/modules/web.dom.iterable",
      "npm:core-js@1.2.6/library/modules/es6.promise",
      "npm:core-js@1.2.6/library/modules/$.core"
    ],
    "npm:redux@3.0.4/lib/index": [
      "npm:redux@3.0.4/lib/createStore",
      "npm:redux@3.0.4/lib/utils/combineReducers",
      "npm:redux@3.0.4/lib/utils/bindActionCreators",
      "npm:redux@3.0.4/lib/utils/applyMiddleware",
      "npm:redux@3.0.4/lib/utils/compose"
    ],
    "github:eligrey/FileSaver.js@master": [
      "github:eligrey/FileSaver.js@master/FileSaver"
    ],
    "npm:react@0.14.3/lib/React": [
      "npm:react@0.14.3/lib/ReactDOM",
      "npm:react@0.14.3/lib/ReactDOMServer",
      "npm:react@0.14.3/lib/ReactIsomorphic",
      "npm:react@0.14.3/lib/Object.assign",
      "npm:react@0.14.3/lib/deprecated"
    ],
    "npm:react-router@1.0.0/lib/Link": [
      "npm:react@0.14.3"
    ],
    "npm:react-router@1.0.0/lib/IndexLink": [
      "npm:react@0.14.3",
      "npm:react-router@1.0.0/lib/Link"
    ],
    "npm:redux-immutablejs@0.0.7/lib/utils/combineReducers": [
      "npm:immutable@3.7.5",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react-router@1.0.0/lib/IndexRedirect": [
      "npm:warning@2.1.0",
      "npm:invariant@2.2.0",
      "npm:react@0.14.3",
      "npm:react-router@1.0.0/lib/Redirect",
      "npm:react-router@1.0.0/lib/PropTypes",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:redux-immutablejs@0.0.7/lib/utils/createReducer": [
      "npm:immutable@3.7.5",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react-router@1.0.0/lib/IndexRoute": [
      "npm:warning@2.1.0",
      "npm:invariant@2.2.0",
      "npm:react@0.14.3",
      "npm:react-router@1.0.0/lib/RouteUtils",
      "npm:react-router@1.0.0/lib/PropTypes",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react-router@1.0.0/lib/Redirect": [
      "npm:invariant@2.2.0",
      "npm:react@0.14.3",
      "npm:react-router@1.0.0/lib/RouteUtils",
      "npm:react-router@1.0.0/lib/PatternUtils",
      "npm:react-router@1.0.0/lib/PropTypes",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react-router@1.0.0/lib/Route": [
      "npm:invariant@2.2.0",
      "npm:react@0.14.3",
      "npm:react-router@1.0.0/lib/RouteUtils",
      "npm:react-router@1.0.0/lib/PropTypes",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react-router@1.0.0/lib/History": [
      "npm:react-router@1.0.0/lib/PropTypes"
    ],
    "npm:react-router@1.0.0/lib/RouteContext": [
      "npm:react@0.14.3"
    ],
    "npm:react-router@1.0.0/lib/RouteUtils": [
      "npm:react@0.14.3",
      "npm:warning@2.1.0",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react-router@1.0.0/lib/Lifecycle": [
      "npm:react@0.14.3",
      "npm:invariant@2.2.0",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react-router@1.0.0/lib/RoutingContext": [
      "npm:invariant@2.2.0",
      "npm:react@0.14.3",
      "npm:react-router@1.0.0/lib/RouteUtils",
      "npm:react-router@1.0.0/lib/getRouteParams",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react-router@1.0.0/lib/Router": [
      "npm:warning@2.1.0",
      "npm:react@0.14.3",
      "npm:history@1.13.1/lib/createHashHistory",
      "npm:react-router@1.0.0/lib/RouteUtils",
      "npm:react-router@1.0.0/lib/RoutingContext",
      "npm:react-router@1.0.0/lib/useRoutes",
      "npm:react-router@1.0.0/lib/PropTypes",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react-router@1.0.0/lib/PropTypes": [
      "npm:react@0.14.3"
    ],
    "npm:react-router@1.0.0/lib/useRoutes": [
      "npm:warning@2.1.0",
      "npm:history@1.13.1/lib/Actions",
      "npm:history@1.13.1/lib/useQueries",
      "npm:react-router@1.0.0/lib/computeChangedRoutes",
      "npm:react-router@1.0.0/lib/TransitionUtils",
      "npm:react-router@1.0.0/lib/isActive",
      "npm:react-router@1.0.0/lib/getComponents",
      "npm:react-router@1.0.0/lib/matchRoutes",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react-router@1.0.0/lib/match": [
      "npm:invariant@2.2.0",
      "npm:history@1.13.1/lib/createMemoryHistory",
      "npm:history@1.13.1/lib/useBasename",
      "npm:react-router@1.0.0/lib/RouteUtils",
      "npm:react-router@1.0.0/lib/useRoutes",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react-redux@4.0.0/lib/components/Provider": [
      "npm:react@0.14.3",
      "npm:react-redux@4.0.0/lib/utils/storeShape"
    ],
    "npm:react-redux@4.0.0/lib/components/connect": [
      "npm:react@0.14.3",
      "npm:react-redux@4.0.0/lib/utils/storeShape",
      "npm:react-redux@4.0.0/lib/utils/shallowEqual",
      "npm:react-redux@4.0.0/lib/utils/isPlainObject",
      "npm:react-redux@4.0.0/lib/utils/wrapActionCreators",
      "npm:hoist-non-react-statics@1.0.3",
      "npm:invariant@2.2.0",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:warning@2.1.0/browser": [
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:invariant@2.2.0/browser": [
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "github:jspm/nodelibs-process@0.1.2/index": [
      "npm:process@0.11.2"
    ],
    "npm:history@1.13.1/lib/createHistory": [
      "npm:deep-equal@1.0.1",
      "npm:history@1.13.1/lib/AsyncUtils",
      "npm:history@1.13.1/lib/Actions",
      "npm:history@1.13.1/lib/createLocation",
      "npm:history@1.13.1/lib/runTransitionHook",
      "npm:history@1.13.1/lib/deprecate"
    ],
    "npm:level-sublevel@6.5.2/index": [
      "npm:level-sublevel@6.5.2/nut",
      "npm:level-sublevel@6.5.2/shell",
      "npm:level-sublevel@6.5.2/codec/index",
      "npm:levelup@0.19.0/lib/codec",
      "npm:xtend@4.0.1",
      "npm:levelup@0.19.0/lib/read-stream"
    ],
    "npm:levelup@0.19.0/lib/levelup": [
      "github:jspm/nodelibs-events@0.1.1",
      "github:jspm/nodelibs-util@0.1.0",
      "npm:xtend@3.0.0",
      "npm:prr@0.0.0",
      "npm:deferred-leveldown@0.2.0",
      "npm:levelup@0.19.0/lib/errors",
      "npm:levelup@0.19.0/lib/read-stream",
      "npm:levelup@0.19.0/lib/write-stream",
      "npm:levelup@0.19.0/lib/util",
      "npm:levelup@0.19.0/lib/batch",
      "npm:levelup@0.19.0/lib/codec",
      "github:jspm/nodelibs-buffer@0.1.0",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:babel-runtime@5.8.34/core-js/object/assign": [
      "npm:core-js@1.2.6/library/fn/object/assign"
    ],
    "npm:localstorage-down@0.6.4/index": [
      "npm:inherits@2.0.1",
      "npm:abstract-leveldown@0.12.3",
      "npm:localstorage-down@0.6.4/localstorage",
      "npm:localstorage-down@0.6.4/localstorage-core",
      "npm:localstorage-down@0.6.4/utils",
      "github:jspm/nodelibs-buffer@0.1.0",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactDOM": [
      "npm:react@0.14.3/lib/ReactCurrentOwner",
      "npm:react@0.14.3/lib/ReactDOMTextComponent",
      "npm:react@0.14.3/lib/ReactDefaultInjection",
      "npm:react@0.14.3/lib/ReactInstanceHandles",
      "npm:react@0.14.3/lib/ReactMount",
      "npm:react@0.14.3/lib/ReactPerf",
      "npm:react@0.14.3/lib/ReactReconciler",
      "npm:react@0.14.3/lib/ReactUpdates",
      "npm:react@0.14.3/lib/ReactVersion",
      "npm:react@0.14.3/lib/findDOMNode",
      "npm:react@0.14.3/lib/renderSubtreeIntoContainer",
      "npm:fbjs@0.3.2/lib/warning",
      "npm:fbjs@0.3.2/lib/ExecutionEnvironment",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:jszip@2.5.0/lib/index": [
      "npm:jszip@2.5.0/lib/base64",
      "npm:jszip@2.5.0/lib/object",
      "npm:jszip@2.5.0/lib/load",
      "npm:jszip@2.5.0/lib/support",
      "npm:jszip@2.5.0/lib/defaults",
      "npm:jszip@2.5.0/lib/deprecatedPublicUtils",
      "npm:jszip@2.5.0/lib/compressions"
    ],
    "npm:core-js@1.2.6/library/modules/es6.promise": [
      "npm:core-js@1.2.6/library/modules/$",
      "npm:core-js@1.2.6/library/modules/$.library",
      "npm:core-js@1.2.6/library/modules/$.global",
      "npm:core-js@1.2.6/library/modules/$.ctx",
      "npm:core-js@1.2.6/library/modules/$.classof",
      "npm:core-js@1.2.6/library/modules/$.export",
      "npm:core-js@1.2.6/library/modules/$.is-object",
      "npm:core-js@1.2.6/library/modules/$.an-object",
      "npm:core-js@1.2.6/library/modules/$.a-function",
      "npm:core-js@1.2.6/library/modules/$.strict-new",
      "npm:core-js@1.2.6/library/modules/$.for-of",
      "npm:core-js@1.2.6/library/modules/$.set-proto",
      "npm:core-js@1.2.6/library/modules/$.same-value",
      "npm:core-js@1.2.6/library/modules/$.wks",
      "npm:core-js@1.2.6/library/modules/$.species-constructor",
      "npm:core-js@1.2.6/library/modules/$.microtask",
      "npm:core-js@1.2.6/library/modules/$.descriptors",
      "npm:core-js@1.2.6/library/modules/$.redefine-all",
      "npm:core-js@1.2.6/library/modules/$.set-to-string-tag",
      "npm:core-js@1.2.6/library/modules/$.set-species",
      "npm:core-js@1.2.6/library/modules/$.core",
      "npm:core-js@1.2.6/library/modules/$.iter-detect",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:core-js@1.2.6/library/modules/web.dom.iterable": [
      "npm:core-js@1.2.6/library/modules/es6.array.iterator",
      "npm:core-js@1.2.6/library/modules/$.iterators"
    ],
    "npm:core-js@1.2.6/library/modules/es6.string.iterator": [
      "npm:core-js@1.2.6/library/modules/$.string-at",
      "npm:core-js@1.2.6/library/modules/$.iter-define"
    ],
    "npm:redux@3.0.4/lib/createStore": [
      "npm:redux@3.0.4/lib/utils/isPlainObject"
    ],
    "npm:redux@3.0.4/lib/utils/combineReducers": [
      "npm:redux@3.0.4/lib/createStore",
      "npm:redux@3.0.4/lib/utils/isPlainObject",
      "npm:redux@3.0.4/lib/utils/mapValues",
      "npm:redux@3.0.4/lib/utils/pick",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:redux@3.0.4/lib/utils/bindActionCreators": [
      "npm:redux@3.0.4/lib/utils/mapValues"
    ],
    "npm:redux@3.0.4/lib/utils/applyMiddleware": [
      "npm:redux@3.0.4/lib/utils/compose"
    ],
    "npm:react@0.14.3/lib/ReactIsomorphic": [
      "npm:react@0.14.3/lib/ReactChildren",
      "npm:react@0.14.3/lib/ReactComponent",
      "npm:react@0.14.3/lib/ReactClass",
      "npm:react@0.14.3/lib/ReactDOMFactories",
      "npm:react@0.14.3/lib/ReactElement",
      "npm:react@0.14.3/lib/ReactElementValidator",
      "npm:react@0.14.3/lib/ReactPropTypes",
      "npm:react@0.14.3/lib/ReactVersion",
      "npm:react@0.14.3/lib/Object.assign",
      "npm:react@0.14.3/lib/onlyChild",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactDOMServer": [
      "npm:react@0.14.3/lib/ReactDefaultInjection",
      "npm:react@0.14.3/lib/ReactServerRendering",
      "npm:react@0.14.3/lib/ReactVersion"
    ],
    "npm:react@0.14.3/lib/deprecated": [
      "npm:react@0.14.3/lib/Object.assign",
      "npm:fbjs@0.3.2/lib/warning",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react-router@1.0.0/lib/PatternUtils": [
      "npm:invariant@2.2.0",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react-router@1.0.0/lib/getRouteParams": [
      "npm:react-router@1.0.0/lib/PatternUtils"
    ],
    "npm:react-router@1.0.0/lib/computeChangedRoutes": [
      "npm:react-router@1.0.0/lib/PatternUtils"
    ],
    "npm:history@1.13.1/lib/useQueries": [
      "npm:qs@4.0.0",
      "npm:history@1.13.1/lib/runTransitionHook",
      "npm:history@1.13.1/lib/parsePath"
    ],
    "npm:react-router@1.0.0/lib/TransitionUtils": [
      "npm:react-router@1.0.0/lib/AsyncUtils"
    ],
    "npm:react-router@1.0.0/lib/isActive": [
      "npm:react-router@1.0.0/lib/PatternUtils"
    ],
    "npm:react-router@1.0.0/lib/getComponents": [
      "npm:react-router@1.0.0/lib/AsyncUtils"
    ],
    "npm:react-router@1.0.0/lib/matchRoutes": [
      "npm:warning@2.1.0",
      "npm:react-router@1.0.0/lib/AsyncUtils",
      "npm:react-router@1.0.0/lib/PatternUtils",
      "npm:react-router@1.0.0/lib/RouteUtils",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:history@1.13.1/lib/createMemoryHistory": [
      "npm:invariant@2.2.0",
      "npm:history@1.13.1/lib/Actions",
      "npm:history@1.13.1/lib/createHistory",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:history@1.13.1/lib/useBasename": [
      "npm:history@1.13.1/lib/ExecutionEnvironment",
      "npm:history@1.13.1/lib/runTransitionHook",
      "npm:history@1.13.1/lib/extractPath",
      "npm:history@1.13.1/lib/parsePath"
    ],
    "npm:react-redux@4.0.0/lib/utils/storeShape": [
      "npm:react@0.14.3"
    ],
    "npm:react-redux@4.0.0/lib/utils/wrapActionCreators": [
      "npm:redux@3.0.4"
    ],
    "npm:hoist-non-react-statics@1.0.3": [
      "npm:hoist-non-react-statics@1.0.3/index"
    ],
    "npm:deep-equal@1.0.1": [
      "npm:deep-equal@1.0.1/index"
    ],
    "npm:process@0.11.2": [
      "npm:process@0.11.2/browser"
    ],
    "npm:history@1.13.1/lib/createLocation": [
      "npm:history@1.13.1/lib/Actions",
      "npm:history@1.13.1/lib/parsePath"
    ],
    "npm:history@1.13.1/lib/runTransitionHook": [
      "npm:warning@2.1.0",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:history@1.13.1/lib/deprecate": [
      "npm:warning@2.1.0",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:level-sublevel@6.5.2/nut": [
      "npm:level-sublevel@6.5.2/hooks",
      "npm:ltgt@2.1.2"
    ],
    "npm:level-sublevel@6.5.2/shell": [
      "github:jspm/nodelibs-events@0.1.1",
      "npm:level-sublevel@6.5.2/range",
      "npm:levelup@0.19.0/lib/errors",
      "npm:level-sublevel@6.5.2/package.json!jspm_packages/github/systemjs/plugin-json@0.1.0",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:levelup@0.19.0/lib/codec": [
      "npm:levelup@0.19.0/lib/encodings"
    ],
    "npm:levelup@0.19.0/lib/read-stream": [
      "npm:readable-stream@1.0.33",
      "github:jspm/nodelibs-util@0.1.0",
      "npm:xtend@3.0.0",
      "npm:levelup@0.19.0/lib/errors",
      "npm:levelup@0.19.0/lib/util"
    ],
    "github:jspm/nodelibs-events@0.1.1": [
      "github:jspm/nodelibs-events@0.1.1/index"
    ],
    "npm:xtend@4.0.1": [
      "npm:xtend@4.0.1/immutable"
    ],
    "github:jspm/nodelibs-util@0.1.0": [
      "github:jspm/nodelibs-util@0.1.0/index"
    ],
    "npm:deferred-leveldown@0.2.0": [
      "npm:deferred-leveldown@0.2.0/deferred-leveldown"
    ],
    "github:jspm/nodelibs-buffer@0.1.0": [
      "github:jspm/nodelibs-buffer@0.1.0/index"
    ],
    "npm:xtend@3.0.0": [
      "npm:xtend@3.0.0/index"
    ],
    "npm:prr@0.0.0": [
      "npm:prr@0.0.0/prr"
    ],
    "npm:levelup@0.19.0/lib/errors": [
      "npm:errno@0.1.4"
    ],
    "npm:levelup@0.19.0/lib/write-stream": [
      "github:jspm/nodelibs-stream@0.1.0",
      "github:jspm/nodelibs-util@0.1.0",
      "npm:xtend@3.0.0",
      "npm:bl@0.8.2",
      "npm:levelup@0.19.0/lib/util",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:levelup@0.19.0/lib/batch": [
      "npm:levelup@0.19.0/lib/util",
      "npm:levelup@0.19.0/lib/errors"
    ],
    "npm:core-js@1.2.6/library/fn/object/assign": [
      "npm:core-js@1.2.6/library/modules/es6.object.assign",
      "npm:core-js@1.2.6/library/modules/$.core"
    ],
    "npm:inherits@2.0.1": [
      "npm:inherits@2.0.1/inherits_browser"
    ],
    "npm:levelup@0.19.0/lib/util": [
      "npm:xtend@3.0.0",
      "npm:levelup@0.19.0/lib/errors",
      "npm:levelup@0.19.0/lib/encodings",
      "npm:levelup@0.19.0/package.json!jspm_packages/github/systemjs/plugin-json@0.1.0",
      "@empty",
      "@empty"
    ],
    "npm:localstorage-down@0.6.4/localstorage": [
      "npm:localstorage-down@0.6.4/utils",
      "npm:localstorage-down@0.6.4/localstorage-core",
      "npm:localstorage-down@0.6.4/taskqueue",
      "npm:d64@1.0.0",
      "github:jspm/nodelibs-buffer@0.1.0"
    ],
    "npm:localstorage-down@0.6.4/localstorage-core": [
      "npm:humble-localstorage@1.4.2",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:abstract-leveldown@0.12.3": [
      "npm:abstract-leveldown@0.12.3/abstract-leveldown"
    ],
    "npm:react@0.14.3/lib/ReactDOMTextComponent": [
      "npm:react@0.14.3/lib/DOMChildrenOperations",
      "npm:react@0.14.3/lib/DOMPropertyOperations",
      "npm:react@0.14.3/lib/ReactComponentBrowserEnvironment",
      "npm:react@0.14.3/lib/ReactMount",
      "npm:react@0.14.3/lib/Object.assign",
      "npm:react@0.14.3/lib/escapeTextContentForBrowser",
      "npm:react@0.14.3/lib/setTextContent",
      "npm:react@0.14.3/lib/validateDOMNesting",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactDefaultInjection": [
      "npm:react@0.14.3/lib/BeforeInputEventPlugin",
      "npm:react@0.14.3/lib/ChangeEventPlugin",
      "npm:react@0.14.3/lib/ClientReactRootIndex",
      "npm:react@0.14.3/lib/DefaultEventPluginOrder",
      "npm:react@0.14.3/lib/EnterLeaveEventPlugin",
      "npm:fbjs@0.3.2/lib/ExecutionEnvironment",
      "npm:react@0.14.3/lib/HTMLDOMPropertyConfig",
      "npm:react@0.14.3/lib/ReactBrowserComponentMixin",
      "npm:react@0.14.3/lib/ReactComponentBrowserEnvironment",
      "npm:react@0.14.3/lib/ReactDefaultBatchingStrategy",
      "npm:react@0.14.3/lib/ReactDOMComponent",
      "npm:react@0.14.3/lib/ReactDOMTextComponent",
      "npm:react@0.14.3/lib/ReactEventListener",
      "npm:react@0.14.3/lib/ReactInjection",
      "npm:react@0.14.3/lib/ReactInstanceHandles",
      "npm:react@0.14.3/lib/ReactMount",
      "npm:react@0.14.3/lib/ReactReconcileTransaction",
      "npm:react@0.14.3/lib/SelectEventPlugin",
      "npm:react@0.14.3/lib/ServerReactRootIndex",
      "npm:react@0.14.3/lib/SimpleEventPlugin",
      "npm:react@0.14.3/lib/SVGDOMPropertyConfig",
      "npm:react@0.14.3/lib/ReactDefaultPerf",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactPerf": [
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactInstanceHandles": [
      "npm:react@0.14.3/lib/ReactRootIndex",
      "npm:fbjs@0.3.2/lib/invariant",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactReconciler": [
      "npm:react@0.14.3/lib/ReactRef"
    ],
    "npm:react@0.14.3/lib/ReactMount": [
      "npm:react@0.14.3/lib/DOMProperty",
      "npm:react@0.14.3/lib/ReactBrowserEventEmitter",
      "npm:react@0.14.3/lib/ReactCurrentOwner",
      "npm:react@0.14.3/lib/ReactDOMFeatureFlags",
      "npm:react@0.14.3/lib/ReactElement",
      "npm:react@0.14.3/lib/ReactEmptyComponentRegistry",
      "npm:react@0.14.3/lib/ReactInstanceHandles",
      "npm:react@0.14.3/lib/ReactInstanceMap",
      "npm:react@0.14.3/lib/ReactMarkupChecksum",
      "npm:react@0.14.3/lib/ReactPerf",
      "npm:react@0.14.3/lib/ReactReconciler",
      "npm:react@0.14.3/lib/ReactUpdateQueue",
      "npm:react@0.14.3/lib/ReactUpdates",
      "npm:react@0.14.3/lib/Object.assign",
      "npm:fbjs@0.3.2/lib/emptyObject",
      "npm:fbjs@0.3.2/lib/containsNode",
      "npm:react@0.14.3/lib/instantiateReactComponent",
      "npm:fbjs@0.3.2/lib/invariant",
      "npm:react@0.14.3/lib/setInnerHTML",
      "npm:react@0.14.3/lib/shouldUpdateReactComponent",
      "npm:react@0.14.3/lib/validateDOMNesting",
      "npm:fbjs@0.3.2/lib/warning",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactUpdates": [
      "npm:react@0.14.3/lib/CallbackQueue",
      "npm:react@0.14.3/lib/PooledClass",
      "npm:react@0.14.3/lib/ReactPerf",
      "npm:react@0.14.3/lib/ReactReconciler",
      "npm:react@0.14.3/lib/Transaction",
      "npm:react@0.14.3/lib/Object.assign",
      "npm:fbjs@0.3.2/lib/invariant",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/findDOMNode": [
      "npm:react@0.14.3/lib/ReactCurrentOwner",
      "npm:react@0.14.3/lib/ReactInstanceMap",
      "npm:react@0.14.3/lib/ReactMount",
      "npm:fbjs@0.3.2/lib/invariant",
      "npm:fbjs@0.3.2/lib/warning",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/renderSubtreeIntoContainer": [
      "npm:react@0.14.3/lib/ReactMount"
    ],
    "npm:fbjs@0.3.2/lib/warning": [
      "npm:fbjs@0.3.2/lib/emptyFunction",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:jszip@2.5.0/lib/load": [
      "npm:jszip@2.5.0/lib/base64",
      "npm:jszip@2.5.0/lib/zipEntries"
    ],
    "npm:jszip@2.5.0/lib/object": [
      "npm:jszip@2.5.0/lib/support",
      "npm:jszip@2.5.0/lib/utils",
      "npm:jszip@2.5.0/lib/crc32",
      "npm:jszip@2.5.0/lib/signature",
      "npm:jszip@2.5.0/lib/defaults",
      "npm:jszip@2.5.0/lib/base64",
      "npm:jszip@2.5.0/lib/compressions",
      "npm:jszip@2.5.0/lib/compressedObject",
      "npm:jszip@2.5.0/lib/nodeBuffer",
      "npm:jszip@2.5.0/lib/utf8",
      "npm:jszip@2.5.0/lib/stringWriter",
      "npm:jszip@2.5.0/lib/uint8ArrayWriter",
      "github:jspm/nodelibs-buffer@0.1.0",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:jszip@2.5.0/lib/support": [
      "github:jspm/nodelibs-buffer@0.1.0"
    ],
    "npm:jszip@2.5.0/lib/deprecatedPublicUtils": [
      "npm:jszip@2.5.0/lib/utils"
    ],
    "npm:jszip@2.5.0/lib/compressions": [
      "npm:jszip@2.5.0/lib/flate"
    ],
    "npm:core-js@1.2.6/library/modules/$.ctx": [
      "npm:core-js@1.2.6/library/modules/$.a-function"
    ],
    "npm:core-js@1.2.6/library/modules/$.classof": [
      "npm:core-js@1.2.6/library/modules/$.cof",
      "npm:core-js@1.2.6/library/modules/$.wks"
    ],
    "npm:core-js@1.2.6/library/modules/$.export": [
      "npm:core-js@1.2.6/library/modules/$.global",
      "npm:core-js@1.2.6/library/modules/$.core",
      "npm:core-js@1.2.6/library/modules/$.ctx"
    ],
    "npm:core-js@1.2.6/library/modules/$.an-object": [
      "npm:core-js@1.2.6/library/modules/$.is-object"
    ],
    "npm:core-js@1.2.6/library/modules/$.for-of": [
      "npm:core-js@1.2.6/library/modules/$.ctx",
      "npm:core-js@1.2.6/library/modules/$.iter-call",
      "npm:core-js@1.2.6/library/modules/$.is-array-iter",
      "npm:core-js@1.2.6/library/modules/$.an-object",
      "npm:core-js@1.2.6/library/modules/$.to-length",
      "npm:core-js@1.2.6/library/modules/core.get-iterator-method"
    ],
    "npm:core-js@1.2.6/library/modules/$.set-proto": [
      "npm:core-js@1.2.6/library/modules/$",
      "npm:core-js@1.2.6/library/modules/$.is-object",
      "npm:core-js@1.2.6/library/modules/$.an-object",
      "npm:core-js@1.2.6/library/modules/$.ctx"
    ],
    "npm:core-js@1.2.6/library/modules/$.wks": [
      "npm:core-js@1.2.6/library/modules/$.shared",
      "npm:core-js@1.2.6/library/modules/$.uid",
      "npm:core-js@1.2.6/library/modules/$.global"
    ],
    "npm:core-js@1.2.6/library/modules/$.species-constructor": [
      "npm:core-js@1.2.6/library/modules/$.an-object",
      "npm:core-js@1.2.6/library/modules/$.a-function",
      "npm:core-js@1.2.6/library/modules/$.wks"
    ],
    "npm:core-js@1.2.6/library/modules/$.microtask": [
      "npm:core-js@1.2.6/library/modules/$.global",
      "npm:core-js@1.2.6/library/modules/$.task",
      "npm:core-js@1.2.6/library/modules/$.cof",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:core-js@1.2.6/library/modules/$.redefine-all": [
      "npm:core-js@1.2.6/library/modules/$.redefine"
    ],
    "npm:core-js@1.2.6/library/modules/$.descriptors": [
      "npm:core-js@1.2.6/library/modules/$.fails"
    ],
    "npm:core-js@1.2.6/library/modules/$.set-to-string-tag": [
      "npm:core-js@1.2.6/library/modules/$",
      "npm:core-js@1.2.6/library/modules/$.has",
      "npm:core-js@1.2.6/library/modules/$.wks"
    ],
    "npm:core-js@1.2.6/library/modules/$.set-species": [
      "npm:core-js@1.2.6/library/modules/$.core",
      "npm:core-js@1.2.6/library/modules/$",
      "npm:core-js@1.2.6/library/modules/$.descriptors",
      "npm:core-js@1.2.6/library/modules/$.wks"
    ],
    "npm:core-js@1.2.6/library/modules/es6.array.iterator": [
      "npm:core-js@1.2.6/library/modules/$.add-to-unscopables",
      "npm:core-js@1.2.6/library/modules/$.iter-step",
      "npm:core-js@1.2.6/library/modules/$.iterators",
      "npm:core-js@1.2.6/library/modules/$.to-iobject",
      "npm:core-js@1.2.6/library/modules/$.iter-define"
    ],
    "npm:core-js@1.2.6/library/modules/$.iter-detect": [
      "npm:core-js@1.2.6/library/modules/$.wks"
    ],
    "npm:core-js@1.2.6/library/modules/$.string-at": [
      "npm:core-js@1.2.6/library/modules/$.to-integer",
      "npm:core-js@1.2.6/library/modules/$.defined"
    ],
    "npm:core-js@1.2.6/library/modules/$.iter-define": [
      "npm:core-js@1.2.6/library/modules/$.library",
      "npm:core-js@1.2.6/library/modules/$.export",
      "npm:core-js@1.2.6/library/modules/$.redefine",
      "npm:core-js@1.2.6/library/modules/$.hide",
      "npm:core-js@1.2.6/library/modules/$.has",
      "npm:core-js@1.2.6/library/modules/$.iterators",
      "npm:core-js@1.2.6/library/modules/$.iter-create",
      "npm:core-js@1.2.6/library/modules/$.set-to-string-tag",
      "npm:core-js@1.2.6/library/modules/$",
      "npm:core-js@1.2.6/library/modules/$.wks"
    ],
    "npm:react@0.14.3/lib/ReactComponent": [
      "npm:react@0.14.3/lib/ReactNoopUpdateQueue",
      "npm:react@0.14.3/lib/canDefineProperty",
      "npm:fbjs@0.3.2/lib/emptyObject",
      "npm:fbjs@0.3.2/lib/invariant",
      "npm:fbjs@0.3.2/lib/warning",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactChildren": [
      "npm:react@0.14.3/lib/PooledClass",
      "npm:react@0.14.3/lib/ReactElement",
      "npm:fbjs@0.3.2/lib/emptyFunction",
      "npm:react@0.14.3/lib/traverseAllChildren"
    ],
    "npm:react@0.14.3/lib/ReactClass": [
      "npm:react@0.14.3/lib/ReactComponent",
      "npm:react@0.14.3/lib/ReactElement",
      "npm:react@0.14.3/lib/ReactPropTypeLocations",
      "npm:react@0.14.3/lib/ReactPropTypeLocationNames",
      "npm:react@0.14.3/lib/ReactNoopUpdateQueue",
      "npm:react@0.14.3/lib/Object.assign",
      "npm:fbjs@0.3.2/lib/emptyObject",
      "npm:fbjs@0.3.2/lib/invariant",
      "npm:fbjs@0.3.2/lib/keyMirror",
      "npm:fbjs@0.3.2/lib/keyOf",
      "npm:fbjs@0.3.2/lib/warning",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactElementValidator": [
      "npm:react@0.14.3/lib/ReactElement",
      "npm:react@0.14.3/lib/ReactPropTypeLocations",
      "npm:react@0.14.3/lib/ReactPropTypeLocationNames",
      "npm:react@0.14.3/lib/ReactCurrentOwner",
      "npm:react@0.14.3/lib/canDefineProperty",
      "npm:react@0.14.3/lib/getIteratorFn",
      "npm:fbjs@0.3.2/lib/invariant",
      "npm:fbjs@0.3.2/lib/warning",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactElement": [
      "npm:react@0.14.3/lib/ReactCurrentOwner",
      "npm:react@0.14.3/lib/Object.assign",
      "npm:react@0.14.3/lib/canDefineProperty",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactPropTypes": [
      "npm:react@0.14.3/lib/ReactElement",
      "npm:react@0.14.3/lib/ReactPropTypeLocationNames",
      "npm:fbjs@0.3.2/lib/emptyFunction",
      "npm:react@0.14.3/lib/getIteratorFn"
    ],
    "npm:react@0.14.3/lib/ReactDOMFactories": [
      "npm:react@0.14.3/lib/ReactElement",
      "npm:react@0.14.3/lib/ReactElementValidator",
      "npm:fbjs@0.3.2/lib/mapObject",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/onlyChild": [
      "npm:react@0.14.3/lib/ReactElement",
      "npm:fbjs@0.3.2/lib/invariant",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactServerRendering": [
      "npm:react@0.14.3/lib/ReactDefaultBatchingStrategy",
      "npm:react@0.14.3/lib/ReactElement",
      "npm:react@0.14.3/lib/ReactInstanceHandles",
      "npm:react@0.14.3/lib/ReactMarkupChecksum",
      "npm:react@0.14.3/lib/ReactServerBatchingStrategy",
      "npm:react@0.14.3/lib/ReactServerRenderingTransaction",
      "npm:react@0.14.3/lib/ReactUpdates",
      "npm:fbjs@0.3.2/lib/emptyObject",
      "npm:react@0.14.3/lib/instantiateReactComponent",
      "npm:fbjs@0.3.2/lib/invariant",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:history@1.13.1/lib/parsePath": [
      "npm:warning@2.1.0",
      "npm:history@1.13.1/lib/extractPath",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:qs@4.0.0": [
      "npm:qs@4.0.0/lib/index"
    ],
    "npm:deep-equal@1.0.1/index": [
      "npm:deep-equal@1.0.1/lib/keys",
      "npm:deep-equal@1.0.1/lib/is_arguments"
    ],
    "npm:ltgt@2.1.2": [
      "npm:ltgt@2.1.2/index"
    ],
    "npm:level-sublevel@6.5.2/hooks": [
      "npm:level-sublevel@6.5.2/range"
    ],
    "npm:level-sublevel@6.5.2/range": [
      "npm:ltgt@2.1.2",
      "github:jspm/nodelibs-buffer@0.1.0"
    ],
    "npm:levelup@0.19.0/lib/encodings": [
      "github:jspm/nodelibs-buffer@0.1.0"
    ],
    "npm:readable-stream@1.0.33": [
      "npm:readable-stream@1.0.33/readable"
    ],
    "github:jspm/nodelibs-events@0.1.1/index": [
      "npm:events@1.0.2"
    ],
    "github:jspm/nodelibs-util@0.1.0/index": [
      "npm:util@0.10.3"
    ],
    "npm:deferred-leveldown@0.2.0/deferred-leveldown": [
      "github:jspm/nodelibs-util@0.1.0",
      "npm:abstract-leveldown@0.12.4",
      "github:jspm/nodelibs-buffer@0.1.0",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "github:jspm/nodelibs-buffer@0.1.0/index": [
      "npm:buffer@3.5.5"
    ],
    "npm:errno@0.1.4": [
      "npm:errno@0.1.4/errno"
    ],
    "github:jspm/nodelibs-stream@0.1.0": [
      "github:jspm/nodelibs-stream@0.1.0/index"
    ],
    "npm:d64@1.0.0": [
      "npm:d64@1.0.0/index"
    ],
    "npm:bl@0.8.2": [
      "npm:bl@0.8.2/bl"
    ],
    "npm:core-js@1.2.6/library/modules/es6.object.assign": [
      "npm:core-js@1.2.6/library/modules/$.export",
      "npm:core-js@1.2.6/library/modules/$.object-assign"
    ],
    "npm:localstorage-down@0.6.4/taskqueue": [
      "npm:argsarray@0.0.1",
      "npm:tiny-queue@0.2.0",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:abstract-leveldown@0.12.3/abstract-leveldown": [
      "npm:xtend@3.0.0",
      "npm:abstract-leveldown@0.12.3/abstract-iterator",
      "npm:abstract-leveldown@0.12.3/abstract-chained-batch",
      "github:jspm/nodelibs-buffer@0.1.0",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/DOMChildrenOperations": [
      "npm:react@0.14.3/lib/Danger",
      "npm:react@0.14.3/lib/ReactMultiChildUpdateTypes",
      "npm:react@0.14.3/lib/ReactPerf",
      "npm:react@0.14.3/lib/setInnerHTML",
      "npm:react@0.14.3/lib/setTextContent",
      "npm:fbjs@0.3.2/lib/invariant",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:humble-localstorage@1.4.2": [
      "npm:humble-localstorage@1.4.2/lib/index"
    ],
    "npm:react@0.14.3/lib/ReactComponentBrowserEnvironment": [
      "npm:react@0.14.3/lib/ReactDOMIDOperations",
      "npm:react@0.14.3/lib/ReactMount",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/DOMPropertyOperations": [
      "npm:react@0.14.3/lib/DOMProperty",
      "npm:react@0.14.3/lib/ReactPerf",
      "npm:react@0.14.3/lib/quoteAttributeValueForBrowser",
      "npm:fbjs@0.3.2/lib/warning",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/validateDOMNesting": [
      "npm:react@0.14.3/lib/Object.assign",
      "npm:fbjs@0.3.2/lib/emptyFunction",
      "npm:fbjs@0.3.2/lib/warning",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/BeforeInputEventPlugin": [
      "npm:react@0.14.3/lib/EventConstants",
      "npm:react@0.14.3/lib/EventPropagators",
      "npm:fbjs@0.3.2/lib/ExecutionEnvironment",
      "npm:react@0.14.3/lib/FallbackCompositionState",
      "npm:react@0.14.3/lib/SyntheticCompositionEvent",
      "npm:react@0.14.3/lib/SyntheticInputEvent",
      "npm:fbjs@0.3.2/lib/keyOf"
    ],
    "npm:react@0.14.3/lib/setTextContent": [
      "npm:fbjs@0.3.2/lib/ExecutionEnvironment",
      "npm:react@0.14.3/lib/escapeTextContentForBrowser",
      "npm:react@0.14.3/lib/setInnerHTML"
    ],
    "npm:react@0.14.3/lib/DefaultEventPluginOrder": [
      "npm:fbjs@0.3.2/lib/keyOf"
    ],
    "npm:react@0.14.3/lib/ChangeEventPlugin": [
      "npm:react@0.14.3/lib/EventConstants",
      "npm:react@0.14.3/lib/EventPluginHub",
      "npm:react@0.14.3/lib/EventPropagators",
      "npm:fbjs@0.3.2/lib/ExecutionEnvironment",
      "npm:react@0.14.3/lib/ReactUpdates",
      "npm:react@0.14.3/lib/SyntheticEvent",
      "npm:react@0.14.3/lib/getEventTarget",
      "npm:react@0.14.3/lib/isEventSupported",
      "npm:react@0.14.3/lib/isTextInputElement",
      "npm:fbjs@0.3.2/lib/keyOf",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/EnterLeaveEventPlugin": [
      "npm:react@0.14.3/lib/EventConstants",
      "npm:react@0.14.3/lib/EventPropagators",
      "npm:react@0.14.3/lib/SyntheticMouseEvent",
      "npm:react@0.14.3/lib/ReactMount",
      "npm:fbjs@0.3.2/lib/keyOf"
    ],
    "npm:react@0.14.3/lib/ReactBrowserComponentMixin": [
      "npm:react@0.14.3/lib/ReactInstanceMap",
      "npm:react@0.14.3/lib/findDOMNode",
      "npm:fbjs@0.3.2/lib/warning",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactDefaultBatchingStrategy": [
      "npm:react@0.14.3/lib/ReactUpdates",
      "npm:react@0.14.3/lib/Transaction",
      "npm:react@0.14.3/lib/Object.assign",
      "npm:fbjs@0.3.2/lib/emptyFunction"
    ],
    "npm:react@0.14.3/lib/HTMLDOMPropertyConfig": [
      "npm:react@0.14.3/lib/DOMProperty",
      "npm:fbjs@0.3.2/lib/ExecutionEnvironment"
    ],
    "npm:react@0.14.3/lib/ReactEventListener": [
      "npm:fbjs@0.3.2/lib/EventListener",
      "npm:fbjs@0.3.2/lib/ExecutionEnvironment",
      "npm:react@0.14.3/lib/PooledClass",
      "npm:react@0.14.3/lib/ReactInstanceHandles",
      "npm:react@0.14.3/lib/ReactMount",
      "npm:react@0.14.3/lib/ReactUpdates",
      "npm:react@0.14.3/lib/Object.assign",
      "npm:react@0.14.3/lib/getEventTarget",
      "npm:fbjs@0.3.2/lib/getUnboundedScrollPosition",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactReconcileTransaction": [
      "npm:react@0.14.3/lib/CallbackQueue",
      "npm:react@0.14.3/lib/PooledClass",
      "npm:react@0.14.3/lib/ReactBrowserEventEmitter",
      "npm:react@0.14.3/lib/ReactDOMFeatureFlags",
      "npm:react@0.14.3/lib/ReactInputSelection",
      "npm:react@0.14.3/lib/Transaction",
      "npm:react@0.14.3/lib/Object.assign"
    ],
    "npm:react@0.14.3/lib/ReactDOMComponent": [
      "npm:react@0.14.3/lib/AutoFocusUtils",
      "npm:react@0.14.3/lib/CSSPropertyOperations",
      "npm:react@0.14.3/lib/DOMProperty",
      "npm:react@0.14.3/lib/DOMPropertyOperations",
      "npm:react@0.14.3/lib/EventConstants",
      "npm:react@0.14.3/lib/ReactBrowserEventEmitter",
      "npm:react@0.14.3/lib/ReactComponentBrowserEnvironment",
      "npm:react@0.14.3/lib/ReactDOMButton",
      "npm:react@0.14.3/lib/ReactDOMInput",
      "npm:react@0.14.3/lib/ReactDOMOption",
      "npm:react@0.14.3/lib/ReactDOMSelect",
      "npm:react@0.14.3/lib/ReactDOMTextarea",
      "npm:react@0.14.3/lib/ReactMount",
      "npm:react@0.14.3/lib/ReactMultiChild",
      "npm:react@0.14.3/lib/ReactPerf",
      "npm:react@0.14.3/lib/ReactUpdateQueue",
      "npm:react@0.14.3/lib/Object.assign",
      "npm:react@0.14.3/lib/canDefineProperty",
      "npm:react@0.14.3/lib/escapeTextContentForBrowser",
      "npm:fbjs@0.3.2/lib/invariant",
      "npm:react@0.14.3/lib/isEventSupported",
      "npm:fbjs@0.3.2/lib/keyOf",
      "npm:react@0.14.3/lib/setInnerHTML",
      "npm:react@0.14.3/lib/setTextContent",
      "npm:fbjs@0.3.2/lib/shallowEqual",
      "npm:react@0.14.3/lib/validateDOMNesting",
      "npm:fbjs@0.3.2/lib/warning",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/SelectEventPlugin": [
      "npm:react@0.14.3/lib/EventConstants",
      "npm:react@0.14.3/lib/EventPropagators",
      "npm:fbjs@0.3.2/lib/ExecutionEnvironment",
      "npm:react@0.14.3/lib/ReactInputSelection",
      "npm:react@0.14.3/lib/SyntheticEvent",
      "npm:fbjs@0.3.2/lib/getActiveElement",
      "npm:react@0.14.3/lib/isTextInputElement",
      "npm:fbjs@0.3.2/lib/keyOf",
      "npm:fbjs@0.3.2/lib/shallowEqual"
    ],
    "npm:react@0.14.3/lib/ReactInjection": [
      "npm:react@0.14.3/lib/DOMProperty",
      "npm:react@0.14.3/lib/EventPluginHub",
      "npm:react@0.14.3/lib/ReactComponentEnvironment",
      "npm:react@0.14.3/lib/ReactClass",
      "npm:react@0.14.3/lib/ReactEmptyComponent",
      "npm:react@0.14.3/lib/ReactBrowserEventEmitter",
      "npm:react@0.14.3/lib/ReactNativeComponent",
      "npm:react@0.14.3/lib/ReactPerf",
      "npm:react@0.14.3/lib/ReactRootIndex",
      "npm:react@0.14.3/lib/ReactUpdates"
    ],
    "npm:react@0.14.3/lib/SVGDOMPropertyConfig": [
      "npm:react@0.14.3/lib/DOMProperty"
    ],
    "npm:react@0.14.3/lib/ReactDefaultPerf": [
      "npm:react@0.14.3/lib/DOMProperty",
      "npm:react@0.14.3/lib/ReactDefaultPerfAnalysis",
      "npm:react@0.14.3/lib/ReactMount",
      "npm:react@0.14.3/lib/ReactPerf",
      "npm:fbjs@0.3.2/lib/performanceNow"
    ],
    "npm:react@0.14.3/lib/SimpleEventPlugin": [
      "npm:react@0.14.3/lib/EventConstants",
      "npm:fbjs@0.3.2/lib/EventListener",
      "npm:react@0.14.3/lib/EventPropagators",
      "npm:react@0.14.3/lib/ReactMount",
      "npm:react@0.14.3/lib/SyntheticClipboardEvent",
      "npm:react@0.14.3/lib/SyntheticEvent",
      "npm:react@0.14.3/lib/SyntheticFocusEvent",
      "npm:react@0.14.3/lib/SyntheticKeyboardEvent",
      "npm:react@0.14.3/lib/SyntheticMouseEvent",
      "npm:react@0.14.3/lib/SyntheticDragEvent",
      "npm:react@0.14.3/lib/SyntheticTouchEvent",
      "npm:react@0.14.3/lib/SyntheticUIEvent",
      "npm:react@0.14.3/lib/SyntheticWheelEvent",
      "npm:fbjs@0.3.2/lib/emptyFunction",
      "npm:react@0.14.3/lib/getEventCharCode",
      "npm:fbjs@0.3.2/lib/invariant",
      "npm:fbjs@0.3.2/lib/keyOf",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:fbjs@0.3.2/lib/invariant": [
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactRef": [
      "npm:react@0.14.3/lib/ReactOwner",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactBrowserEventEmitter": [
      "npm:react@0.14.3/lib/EventConstants",
      "npm:react@0.14.3/lib/EventPluginHub",
      "npm:react@0.14.3/lib/EventPluginRegistry",
      "npm:react@0.14.3/lib/ReactEventEmitterMixin",
      "npm:react@0.14.3/lib/ReactPerf",
      "npm:react@0.14.3/lib/ViewportMetrics",
      "npm:react@0.14.3/lib/Object.assign",
      "npm:react@0.14.3/lib/isEventSupported",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/DOMProperty": [
      "npm:fbjs@0.3.2/lib/invariant",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactMarkupChecksum": [
      "npm:react@0.14.3/lib/adler32"
    ],
    "npm:react@0.14.3/lib/ReactUpdateQueue": [
      "npm:react@0.14.3/lib/ReactCurrentOwner",
      "npm:react@0.14.3/lib/ReactElement",
      "npm:react@0.14.3/lib/ReactInstanceMap",
      "npm:react@0.14.3/lib/ReactUpdates",
      "npm:react@0.14.3/lib/Object.assign",
      "npm:fbjs@0.3.2/lib/invariant",
      "npm:fbjs@0.3.2/lib/warning",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:fbjs@0.3.2/lib/emptyObject": [
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:fbjs@0.3.2/lib/containsNode": [
      "npm:fbjs@0.3.2/lib/isTextNode"
    ],
    "npm:react@0.14.3/lib/instantiateReactComponent": [
      "npm:react@0.14.3/lib/ReactCompositeComponent",
      "npm:react@0.14.3/lib/ReactEmptyComponent",
      "npm:react@0.14.3/lib/ReactNativeComponent",
      "npm:react@0.14.3/lib/Object.assign",
      "npm:fbjs@0.3.2/lib/invariant",
      "npm:fbjs@0.3.2/lib/warning",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/setInnerHTML": [
      "npm:fbjs@0.3.2/lib/ExecutionEnvironment",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/CallbackQueue": [
      "npm:react@0.14.3/lib/PooledClass",
      "npm:react@0.14.3/lib/Object.assign",
      "npm:fbjs@0.3.2/lib/invariant",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/PooledClass": [
      "npm:fbjs@0.3.2/lib/invariant",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/Transaction": [
      "npm:fbjs@0.3.2/lib/invariant",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:jszip@2.5.0/lib/zipEntries": [
      "npm:jszip@2.5.0/lib/stringReader",
      "npm:jszip@2.5.0/lib/nodeBufferReader",
      "npm:jszip@2.5.0/lib/uint8ArrayReader",
      "npm:jszip@2.5.0/lib/utils",
      "npm:jszip@2.5.0/lib/signature",
      "npm:jszip@2.5.0/lib/zipEntry",
      "npm:jszip@2.5.0/lib/support",
      "npm:jszip@2.5.0/lib/object",
      "github:jspm/nodelibs-buffer@0.1.0"
    ],
    "npm:jszip@2.5.0/lib/crc32": [
      "npm:jszip@2.5.0/lib/utils"
    ],
    "npm:jszip@2.5.0/lib/utils": [
      "npm:jszip@2.5.0/lib/support",
      "npm:jszip@2.5.0/lib/compressions",
      "npm:jszip@2.5.0/lib/nodeBuffer",
      "github:jspm/nodelibs-buffer@0.1.0"
    ],
    "npm:jszip@2.5.0/lib/nodeBuffer": [
      "github:jspm/nodelibs-buffer@0.1.0"
    ],
    "npm:jszip@2.5.0/lib/utf8": [
      "npm:jszip@2.5.0/lib/utils",
      "npm:jszip@2.5.0/lib/support",
      "npm:jszip@2.5.0/lib/nodeBuffer",
      "github:jspm/nodelibs-buffer@0.1.0",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:jszip@2.5.0/lib/stringWriter": [
      "npm:jszip@2.5.0/lib/utils"
    ],
    "npm:jszip@2.5.0/lib/flate": [
      "npm:pako@0.2.8"
    ],
    "npm:jszip@2.5.0/lib/uint8ArrayWriter": [
      "npm:jszip@2.5.0/lib/utils"
    ],
    "npm:core-js@1.2.6/library/modules/$.is-array-iter": [
      "npm:core-js@1.2.6/library/modules/$.iterators",
      "npm:core-js@1.2.6/library/modules/$.wks"
    ],
    "npm:core-js@1.2.6/library/modules/$.iter-call": [
      "npm:core-js@1.2.6/library/modules/$.an-object"
    ],
    "npm:core-js@1.2.6/library/modules/$.shared": [
      "npm:core-js@1.2.6/library/modules/$.global"
    ],
    "npm:core-js@1.2.6/library/modules/core.get-iterator-method": [
      "npm:core-js@1.2.6/library/modules/$.classof",
      "npm:core-js@1.2.6/library/modules/$.wks",
      "npm:core-js@1.2.6/library/modules/$.iterators",
      "npm:core-js@1.2.6/library/modules/$.core"
    ],
    "npm:core-js@1.2.6/library/modules/$.redefine": [
      "npm:core-js@1.2.6/library/modules/$.hide"
    ],
    "npm:core-js@1.2.6/library/modules/$.task": [
      "npm:core-js@1.2.6/library/modules/$.ctx",
      "npm:core-js@1.2.6/library/modules/$.invoke",
      "npm:core-js@1.2.6/library/modules/$.html",
      "npm:core-js@1.2.6/library/modules/$.dom-create",
      "npm:core-js@1.2.6/library/modules/$.global",
      "npm:core-js@1.2.6/library/modules/$.cof",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:core-js@1.2.6/library/modules/$.to-length": [
      "npm:core-js@1.2.6/library/modules/$.to-integer"
    ],
    "npm:core-js@1.2.6/library/modules/$.to-iobject": [
      "npm:core-js@1.2.6/library/modules/$.iobject",
      "npm:core-js@1.2.6/library/modules/$.defined"
    ],
    "npm:core-js@1.2.6/library/modules/$.hide": [
      "npm:core-js@1.2.6/library/modules/$",
      "npm:core-js@1.2.6/library/modules/$.property-desc",
      "npm:core-js@1.2.6/library/modules/$.descriptors"
    ],
    "npm:core-js@1.2.6/library/modules/$.iter-create": [
      "npm:core-js@1.2.6/library/modules/$",
      "npm:core-js@1.2.6/library/modules/$.property-desc",
      "npm:core-js@1.2.6/library/modules/$.set-to-string-tag",
      "npm:core-js@1.2.6/library/modules/$.hide",
      "npm:core-js@1.2.6/library/modules/$.wks"
    ],
    "npm:react@0.14.3/lib/traverseAllChildren": [
      "npm:react@0.14.3/lib/ReactCurrentOwner",
      "npm:react@0.14.3/lib/ReactElement",
      "npm:react@0.14.3/lib/ReactInstanceHandles",
      "npm:react@0.14.3/lib/getIteratorFn",
      "npm:fbjs@0.3.2/lib/invariant",
      "npm:fbjs@0.3.2/lib/warning",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactNoopUpdateQueue": [
      "npm:fbjs@0.3.2/lib/warning",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/canDefineProperty": [
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactPropTypeLocations": [
      "npm:fbjs@0.3.2/lib/keyMirror"
    ],
    "npm:react@0.14.3/lib/ReactPropTypeLocationNames": [
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:fbjs@0.3.2/lib/keyMirror": [
      "npm:fbjs@0.3.2/lib/invariant",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactServerRenderingTransaction": [
      "npm:react@0.14.3/lib/PooledClass",
      "npm:react@0.14.3/lib/CallbackQueue",
      "npm:react@0.14.3/lib/Transaction",
      "npm:react@0.14.3/lib/Object.assign",
      "npm:fbjs@0.3.2/lib/emptyFunction"
    ],
    "npm:qs@4.0.0/lib/index": [
      "npm:qs@4.0.0/lib/stringify",
      "npm:qs@4.0.0/lib/parse"
    ],
    "npm:ltgt@2.1.2/index": [
      "github:jspm/nodelibs-buffer@0.1.0"
    ],
    "npm:readable-stream@1.0.33/readable": [
      "npm:stream-browserify@1.0.0/index",
      "npm:readable-stream@1.0.33/lib/_stream_readable",
      "npm:readable-stream@1.0.33/lib/_stream_writable",
      "npm:readable-stream@1.0.33/lib/_stream_duplex",
      "npm:readable-stream@1.0.33/lib/_stream_transform",
      "npm:readable-stream@1.0.33/lib/_stream_passthrough"
    ],
    "npm:abstract-leveldown@0.12.4": [
      "npm:abstract-leveldown@0.12.4/abstract-leveldown"
    ],
    "npm:util@0.10.3": [
      "npm:util@0.10.3/util"
    ],
    "npm:events@1.0.2": [
      "npm:events@1.0.2/events"
    ],
    "npm:errno@0.1.4/errno": [
      "npm:errno@0.1.4/custom",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:buffer@3.5.5": [
      "npm:buffer@3.5.5/index"
    ],
    "github:jspm/nodelibs-stream@0.1.0/index": [
      "npm:stream-browserify@1.0.0"
    ],
    "npm:d64@1.0.0/index": [
      "github:jspm/nodelibs-buffer@0.1.0"
    ],
    "npm:argsarray@0.0.1": [
      "npm:argsarray@0.0.1/index"
    ],
    "npm:core-js@1.2.6/library/modules/$.object-assign": [
      "npm:core-js@1.2.6/library/modules/$",
      "npm:core-js@1.2.6/library/modules/$.to-object",
      "npm:core-js@1.2.6/library/modules/$.iobject",
      "npm:core-js@1.2.6/library/modules/$.fails"
    ],
    "npm:bl@0.8.2/bl": [
      "npm:readable-stream@1.0.33",
      "github:jspm/nodelibs-util@0.1.0",
      "github:jspm/nodelibs-buffer@0.1.0"
    ],
    "npm:tiny-queue@0.2.0": [
      "npm:tiny-queue@0.2.0/index"
    ],
    "npm:abstract-leveldown@0.12.3/abstract-iterator": [
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:abstract-leveldown@0.12.3/abstract-chained-batch": [
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactMultiChildUpdateTypes": [
      "npm:fbjs@0.3.2/lib/keyMirror"
    ],
    "npm:react@0.14.3/lib/Danger": [
      "npm:fbjs@0.3.2/lib/ExecutionEnvironment",
      "npm:fbjs@0.3.2/lib/createNodesFromMarkup",
      "npm:fbjs@0.3.2/lib/emptyFunction",
      "npm:fbjs@0.3.2/lib/getMarkupWrap",
      "npm:fbjs@0.3.2/lib/invariant",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactDOMIDOperations": [
      "npm:react@0.14.3/lib/DOMChildrenOperations",
      "npm:react@0.14.3/lib/DOMPropertyOperations",
      "npm:react@0.14.3/lib/ReactMount",
      "npm:react@0.14.3/lib/ReactPerf",
      "npm:fbjs@0.3.2/lib/invariant",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:humble-localstorage@1.4.2/lib/index": [
      "npm:humble-localstorage@1.4.2/lib/api"
    ],
    "npm:react@0.14.3/lib/quoteAttributeValueForBrowser": [
      "npm:react@0.14.3/lib/escapeTextContentForBrowser"
    ],
    "npm:react@0.14.3/lib/EventConstants": [
      "npm:fbjs@0.3.2/lib/keyMirror"
    ],
    "npm:react@0.14.3/lib/EventPropagators": [
      "npm:react@0.14.3/lib/EventConstants",
      "npm:react@0.14.3/lib/EventPluginHub",
      "npm:fbjs@0.3.2/lib/warning",
      "npm:react@0.14.3/lib/accumulateInto",
      "npm:react@0.14.3/lib/forEachAccumulated",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/FallbackCompositionState": [
      "npm:react@0.14.3/lib/PooledClass",
      "npm:react@0.14.3/lib/Object.assign",
      "npm:react@0.14.3/lib/getTextContentAccessor"
    ],
    "npm:react@0.14.3/lib/SyntheticCompositionEvent": [
      "npm:react@0.14.3/lib/SyntheticEvent"
    ],
    "npm:react@0.14.3/lib/SyntheticInputEvent": [
      "npm:react@0.14.3/lib/SyntheticEvent"
    ],
    "npm:react@0.14.3/lib/EventPluginHub": [
      "npm:react@0.14.3/lib/EventPluginRegistry",
      "npm:react@0.14.3/lib/EventPluginUtils",
      "npm:react@0.14.3/lib/ReactErrorUtils",
      "npm:react@0.14.3/lib/accumulateInto",
      "npm:react@0.14.3/lib/forEachAccumulated",
      "npm:fbjs@0.3.2/lib/invariant",
      "npm:fbjs@0.3.2/lib/warning",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/SyntheticEvent": [
      "npm:react@0.14.3/lib/PooledClass",
      "npm:react@0.14.3/lib/Object.assign",
      "npm:fbjs@0.3.2/lib/emptyFunction",
      "npm:fbjs@0.3.2/lib/warning",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/isEventSupported": [
      "npm:fbjs@0.3.2/lib/ExecutionEnvironment"
    ],
    "npm:fbjs@0.3.2/lib/EventListener": [
      "npm:fbjs@0.3.2/lib/emptyFunction",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/SyntheticMouseEvent": [
      "npm:react@0.14.3/lib/SyntheticUIEvent",
      "npm:react@0.14.3/lib/ViewportMetrics",
      "npm:react@0.14.3/lib/getEventModifierState"
    ],
    "npm:react@0.14.3/lib/ReactInputSelection": [
      "npm:react@0.14.3/lib/ReactDOMSelection",
      "npm:fbjs@0.3.2/lib/containsNode",
      "npm:fbjs@0.3.2/lib/focusNode",
      "npm:fbjs@0.3.2/lib/getActiveElement"
    ],
    "npm:react@0.14.3/lib/AutoFocusUtils": [
      "npm:react@0.14.3/lib/ReactMount",
      "npm:react@0.14.3/lib/findDOMNode",
      "npm:fbjs@0.3.2/lib/focusNode"
    ],
    "npm:react@0.14.3/lib/CSSPropertyOperations": [
      "npm:react@0.14.3/lib/CSSProperty",
      "npm:fbjs@0.3.2/lib/ExecutionEnvironment",
      "npm:react@0.14.3/lib/ReactPerf",
      "npm:fbjs@0.3.2/lib/camelizeStyleName",
      "npm:react@0.14.3/lib/dangerousStyleValue",
      "npm:fbjs@0.3.2/lib/hyphenateStyleName",
      "npm:fbjs@0.3.2/lib/memoizeStringOnly",
      "npm:fbjs@0.3.2/lib/warning",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactDOMOption": [
      "npm:react@0.14.3/lib/ReactChildren",
      "npm:react@0.14.3/lib/ReactDOMSelect",
      "npm:react@0.14.3/lib/Object.assign",
      "npm:fbjs@0.3.2/lib/warning",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactDOMInput": [
      "npm:react@0.14.3/lib/ReactDOMIDOperations",
      "npm:react@0.14.3/lib/LinkedValueUtils",
      "npm:react@0.14.3/lib/ReactMount",
      "npm:react@0.14.3/lib/ReactUpdates",
      "npm:react@0.14.3/lib/Object.assign",
      "npm:fbjs@0.3.2/lib/invariant",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactDOMSelect": [
      "npm:react@0.14.3/lib/LinkedValueUtils",
      "npm:react@0.14.3/lib/ReactMount",
      "npm:react@0.14.3/lib/ReactUpdates",
      "npm:react@0.14.3/lib/Object.assign",
      "npm:fbjs@0.3.2/lib/warning",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactDOMTextarea": [
      "npm:react@0.14.3/lib/LinkedValueUtils",
      "npm:react@0.14.3/lib/ReactDOMIDOperations",
      "npm:react@0.14.3/lib/ReactUpdates",
      "npm:react@0.14.3/lib/Object.assign",
      "npm:fbjs@0.3.2/lib/invariant",
      "npm:fbjs@0.3.2/lib/warning",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactMultiChild": [
      "npm:react@0.14.3/lib/ReactComponentEnvironment",
      "npm:react@0.14.3/lib/ReactMultiChildUpdateTypes",
      "npm:react@0.14.3/lib/ReactCurrentOwner",
      "npm:react@0.14.3/lib/ReactReconciler",
      "npm:react@0.14.3/lib/ReactChildReconciler",
      "npm:react@0.14.3/lib/flattenChildren",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactComponentEnvironment": [
      "npm:fbjs@0.3.2/lib/invariant",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactEmptyComponent": [
      "npm:react@0.14.3/lib/ReactElement",
      "npm:react@0.14.3/lib/ReactEmptyComponentRegistry",
      "npm:react@0.14.3/lib/ReactReconciler",
      "npm:react@0.14.3/lib/Object.assign"
    ],
    "npm:react@0.14.3/lib/ReactNativeComponent": [
      "npm:react@0.14.3/lib/Object.assign",
      "npm:fbjs@0.3.2/lib/invariant",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactDefaultPerfAnalysis": [
      "npm:react@0.14.3/lib/Object.assign"
    ],
    "npm:fbjs@0.3.2/lib/performanceNow": [
      "npm:fbjs@0.3.2/lib/performance"
    ],
    "npm:react@0.14.3/lib/SyntheticClipboardEvent": [
      "npm:react@0.14.3/lib/SyntheticEvent"
    ],
    "npm:react@0.14.3/lib/SyntheticKeyboardEvent": [
      "npm:react@0.14.3/lib/SyntheticUIEvent",
      "npm:react@0.14.3/lib/getEventCharCode",
      "npm:react@0.14.3/lib/getEventKey",
      "npm:react@0.14.3/lib/getEventModifierState"
    ],
    "npm:react@0.14.3/lib/SyntheticDragEvent": [
      "npm:react@0.14.3/lib/SyntheticMouseEvent"
    ],
    "npm:react@0.14.3/lib/SyntheticFocusEvent": [
      "npm:react@0.14.3/lib/SyntheticUIEvent"
    ],
    "npm:react@0.14.3/lib/SyntheticTouchEvent": [
      "npm:react@0.14.3/lib/SyntheticUIEvent",
      "npm:react@0.14.3/lib/getEventModifierState"
    ],
    "npm:react@0.14.3/lib/SyntheticUIEvent": [
      "npm:react@0.14.3/lib/SyntheticEvent",
      "npm:react@0.14.3/lib/getEventTarget"
    ],
    "npm:react@0.14.3/lib/SyntheticWheelEvent": [
      "npm:react@0.14.3/lib/SyntheticMouseEvent"
    ],
    "npm:react@0.14.3/lib/ReactOwner": [
      "npm:fbjs@0.3.2/lib/invariant",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/EventPluginRegistry": [
      "npm:fbjs@0.3.2/lib/invariant",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactEventEmitterMixin": [
      "npm:react@0.14.3/lib/EventPluginHub"
    ],
    "npm:react@0.14.3/lib/ReactCompositeComponent": [
      "npm:react@0.14.3/lib/ReactComponentEnvironment",
      "npm:react@0.14.3/lib/ReactCurrentOwner",
      "npm:react@0.14.3/lib/ReactElement",
      "npm:react@0.14.3/lib/ReactInstanceMap",
      "npm:react@0.14.3/lib/ReactPerf",
      "npm:react@0.14.3/lib/ReactPropTypeLocations",
      "npm:react@0.14.3/lib/ReactPropTypeLocationNames",
      "npm:react@0.14.3/lib/ReactReconciler",
      "npm:react@0.14.3/lib/ReactUpdateQueue",
      "npm:react@0.14.3/lib/Object.assign",
      "npm:fbjs@0.3.2/lib/emptyObject",
      "npm:fbjs@0.3.2/lib/invariant",
      "npm:react@0.14.3/lib/shouldUpdateReactComponent",
      "npm:fbjs@0.3.2/lib/warning",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:fbjs@0.3.2/lib/isTextNode": [
      "npm:fbjs@0.3.2/lib/isNode"
    ],
    "npm:jszip@2.5.0/lib/stringReader": [
      "npm:jszip@2.5.0/lib/dataReader",
      "npm:jszip@2.5.0/lib/utils"
    ],
    "npm:jszip@2.5.0/lib/nodeBufferReader": [
      "npm:jszip@2.5.0/lib/uint8ArrayReader"
    ],
    "npm:jszip@2.5.0/lib/uint8ArrayReader": [
      "npm:jszip@2.5.0/lib/dataReader"
    ],
    "npm:jszip@2.5.0/lib/zipEntry": [
      "npm:jszip@2.5.0/lib/stringReader",
      "npm:jszip@2.5.0/lib/utils",
      "npm:jszip@2.5.0/lib/compressedObject",
      "npm:jszip@2.5.0/lib/object",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:pako@0.2.8": [
      "npm:pako@0.2.8/index"
    ],
    "npm:core-js@1.2.6/library/modules/$.html": [
      "npm:core-js@1.2.6/library/modules/$.global"
    ],
    "npm:core-js@1.2.6/library/modules/$.dom-create": [
      "npm:core-js@1.2.6/library/modules/$.is-object",
      "npm:core-js@1.2.6/library/modules/$.global"
    ],
    "npm:core-js@1.2.6/library/modules/$.iobject": [
      "npm:core-js@1.2.6/library/modules/$.cof"
    ],
    "npm:qs@4.0.0/lib/stringify": [
      "npm:qs@4.0.0/lib/utils"
    ],
    "npm:qs@4.0.0/lib/parse": [
      "npm:qs@4.0.0/lib/utils"
    ],
    "npm:stream-browserify@1.0.0/index": [
      "github:jspm/nodelibs-events@0.1.1",
      "npm:inherits@2.0.1",
      "npm:readable-stream@1.0.33/readable",
      "npm:readable-stream@1.0.33/writable",
      "npm:readable-stream@1.0.33/duplex",
      "npm:readable-stream@1.0.33/transform",
      "npm:readable-stream@1.0.33/passthrough"
    ],
    "npm:readable-stream@1.0.33/lib/_stream_readable": [
      "npm:isarray@0.0.1",
      "github:jspm/nodelibs-buffer@0.1.0",
      "github:jspm/nodelibs-events@0.1.1",
      "npm:stream-browserify@1.0.0/index",
      "npm:core-util-is@1.0.2",
      "npm:inherits@2.0.1",
      "npm:string_decoder@0.10.31",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:readable-stream@1.0.33/lib/_stream_writable": [
      "github:jspm/nodelibs-buffer@0.1.0",
      "npm:core-util-is@1.0.2",
      "npm:inherits@2.0.1",
      "npm:stream-browserify@1.0.0/index",
      "npm:readable-stream@1.0.33/lib/_stream_duplex",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:readable-stream@1.0.33/lib/_stream_duplex": [
      "npm:core-util-is@1.0.2",
      "npm:inherits@2.0.1",
      "npm:readable-stream@1.0.33/lib/_stream_readable",
      "npm:readable-stream@1.0.33/lib/_stream_writable",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:readable-stream@1.0.33/lib/_stream_transform": [
      "npm:readable-stream@1.0.33/lib/_stream_duplex",
      "npm:core-util-is@1.0.2",
      "npm:inherits@2.0.1",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:readable-stream@1.0.33/lib/_stream_passthrough": [
      "npm:readable-stream@1.0.33/lib/_stream_transform",
      "npm:core-util-is@1.0.2",
      "npm:inherits@2.0.1"
    ],
    "npm:abstract-leveldown@0.12.4/abstract-leveldown": [
      "npm:xtend@3.0.0",
      "npm:abstract-leveldown@0.12.4/abstract-iterator",
      "npm:abstract-leveldown@0.12.4/abstract-chained-batch",
      "github:jspm/nodelibs-buffer@0.1.0",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:util@0.10.3/util": [
      "npm:util@0.10.3/support/isBufferBrowser",
      "npm:inherits@2.0.1",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:errno@0.1.4/custom": [
      "npm:prr@0.0.0"
    ],
    "npm:stream-browserify@1.0.0": [
      "npm:stream-browserify@1.0.0/index"
    ],
    "npm:buffer@3.5.5/index": [
      "npm:base64-js@0.0.8",
      "npm:ieee754@1.1.6",
      "npm:isarray@1.0.0"
    ],
    "npm:core-js@1.2.6/library/modules/$.to-object": [
      "npm:core-js@1.2.6/library/modules/$.defined"
    ],
    "npm:fbjs@0.3.2/lib/createNodesFromMarkup": [
      "npm:fbjs@0.3.2/lib/ExecutionEnvironment",
      "npm:fbjs@0.3.2/lib/createArrayFromMixed",
      "npm:fbjs@0.3.2/lib/getMarkupWrap",
      "npm:fbjs@0.3.2/lib/invariant",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:fbjs@0.3.2/lib/getMarkupWrap": [
      "npm:fbjs@0.3.2/lib/ExecutionEnvironment",
      "npm:fbjs@0.3.2/lib/invariant",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:humble-localstorage@1.4.2/lib/api": [
      "npm:localstorage-memory@1.0.1",
      "npm:has-localstorage@1.0.1"
    ],
    "npm:react@0.14.3/lib/getTextContentAccessor": [
      "npm:fbjs@0.3.2/lib/ExecutionEnvironment"
    ],
    "npm:react@0.14.3/lib/accumulateInto": [
      "npm:fbjs@0.3.2/lib/invariant",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/EventPluginUtils": [
      "npm:react@0.14.3/lib/EventConstants",
      "npm:react@0.14.3/lib/ReactErrorUtils",
      "npm:fbjs@0.3.2/lib/invariant",
      "npm:fbjs@0.3.2/lib/warning",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactErrorUtils": [
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactDOMSelection": [
      "npm:fbjs@0.3.2/lib/ExecutionEnvironment",
      "npm:react@0.14.3/lib/getNodeForCharacterOffset",
      "npm:react@0.14.3/lib/getTextContentAccessor"
    ],
    "npm:fbjs@0.3.2/lib/camelizeStyleName": [
      "npm:fbjs@0.3.2/lib/camelize"
    ],
    "npm:react@0.14.3/lib/dangerousStyleValue": [
      "npm:react@0.14.3/lib/CSSProperty"
    ],
    "npm:fbjs@0.3.2/lib/hyphenateStyleName": [
      "npm:fbjs@0.3.2/lib/hyphenate"
    ],
    "npm:react@0.14.3/lib/LinkedValueUtils": [
      "npm:react@0.14.3/lib/ReactPropTypes",
      "npm:react@0.14.3/lib/ReactPropTypeLocations",
      "npm:fbjs@0.3.2/lib/invariant",
      "npm:fbjs@0.3.2/lib/warning",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/ReactChildReconciler": [
      "npm:react@0.14.3/lib/ReactReconciler",
      "npm:react@0.14.3/lib/instantiateReactComponent",
      "npm:react@0.14.3/lib/shouldUpdateReactComponent",
      "npm:react@0.14.3/lib/traverseAllChildren",
      "npm:fbjs@0.3.2/lib/warning",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:react@0.14.3/lib/flattenChildren": [
      "npm:react@0.14.3/lib/traverseAllChildren",
      "npm:fbjs@0.3.2/lib/warning",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:fbjs@0.3.2/lib/performance": [
      "npm:fbjs@0.3.2/lib/ExecutionEnvironment"
    ],
    "npm:react@0.14.3/lib/getEventKey": [
      "npm:react@0.14.3/lib/getEventCharCode"
    ],
    "npm:jszip@2.5.0/lib/dataReader": [
      "npm:jszip@2.5.0/lib/utils"
    ],
    "npm:pako@0.2.8/index": [
      "npm:pako@0.2.8/lib/utils/common",
      "npm:pako@0.2.8/lib/deflate",
      "npm:pako@0.2.8/lib/inflate",
      "npm:pako@0.2.8/lib/zlib/constants"
    ],
    "npm:readable-stream@1.0.33/duplex": [
      "npm:readable-stream@1.0.33/lib/_stream_duplex"
    ],
    "npm:readable-stream@1.0.33/transform": [
      "npm:readable-stream@1.0.33/lib/_stream_transform"
    ],
    "npm:readable-stream@1.0.33/passthrough": [
      "npm:readable-stream@1.0.33/lib/_stream_passthrough"
    ],
    "npm:string_decoder@0.10.31": [
      "npm:string_decoder@0.10.31/index"
    ],
    "npm:core-util-is@1.0.2": [
      "npm:core-util-is@1.0.2/lib/util"
    ],
    "npm:isarray@0.0.1": [
      "npm:isarray@0.0.1/index"
    ],
    "npm:abstract-leveldown@0.12.4/abstract-iterator": [
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:readable-stream@1.0.33/writable": [
      "npm:readable-stream@1.0.33/lib/_stream_writable"
    ],
    "npm:base64-js@0.0.8": [
      "npm:base64-js@0.0.8/lib/b64"
    ],
    "npm:abstract-leveldown@0.12.4/abstract-chained-batch": [
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:isarray@1.0.0": [
      "npm:isarray@1.0.0/index"
    ],
    "npm:ieee754@1.1.6": [
      "npm:ieee754@1.1.6/index"
    ],
    "npm:localstorage-memory@1.0.1": [
      "npm:localstorage-memory@1.0.1/lib/localstorage-memory"
    ],
    "npm:fbjs@0.3.2/lib/createArrayFromMixed": [
      "npm:fbjs@0.3.2/lib/toArray"
    ],
    "npm:pako@0.2.8/lib/deflate": [
      "npm:pako@0.2.8/lib/zlib/deflate",
      "npm:pako@0.2.8/lib/utils/common",
      "npm:pako@0.2.8/lib/utils/strings",
      "npm:pako@0.2.8/lib/zlib/messages",
      "npm:pako@0.2.8/lib/zlib/zstream"
    ],
    "npm:has-localstorage@1.0.1": [
      "npm:has-localstorage@1.0.1/lib/has-localstorage"
    ],
    "npm:pako@0.2.8/lib/inflate": [
      "npm:pako@0.2.8/lib/zlib/inflate",
      "npm:pako@0.2.8/lib/utils/common",
      "npm:pako@0.2.8/lib/utils/strings",
      "npm:pako@0.2.8/lib/zlib/constants",
      "npm:pako@0.2.8/lib/zlib/messages",
      "npm:pako@0.2.8/lib/zlib/zstream",
      "npm:pako@0.2.8/lib/zlib/gzheader",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:string_decoder@0.10.31/index": [
      "github:jspm/nodelibs-buffer@0.1.0"
    ],
    "npm:core-util-is@1.0.2/lib/util": [
      "github:jspm/nodelibs-buffer@0.1.0"
    ],
    "npm:fbjs@0.3.2/lib/toArray": [
      "npm:fbjs@0.3.2/lib/invariant",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:pako@0.2.8/lib/zlib/deflate": [
      "npm:pako@0.2.8/lib/utils/common",
      "npm:pako@0.2.8/lib/zlib/trees",
      "npm:pako@0.2.8/lib/zlib/adler32",
      "npm:pako@0.2.8/lib/zlib/crc32",
      "npm:pako@0.2.8/lib/zlib/messages",
      "github:jspm/nodelibs-buffer@0.1.0"
    ],
    "npm:pako@0.2.8/lib/utils/strings": [
      "npm:pako@0.2.8/lib/utils/common",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:pako@0.2.8/lib/zlib/inflate": [
      "npm:pako@0.2.8/lib/utils/common",
      "npm:pako@0.2.8/lib/zlib/adler32",
      "npm:pako@0.2.8/lib/zlib/crc32",
      "npm:pako@0.2.8/lib/zlib/inffast",
      "npm:pako@0.2.8/lib/zlib/inftrees",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:pako@0.2.8/lib/zlib/trees": [
      "npm:pako@0.2.8/lib/utils/common",
      "github:jspm/nodelibs-process@0.1.2"
    ],
    "npm:pako@0.2.8/lib/zlib/inftrees": [
      "npm:pako@0.2.8/lib/utils/common",
      "github:jspm/nodelibs-process@0.1.2"
    ]
  },

  map: {
    "@empty/package": "@empty",
    "FileSaver.js": "github:eligrey/FileSaver.js@master",
    "babel": "npm:babel-core@5.8.34",
    "babel-runtime": "npm:babel-runtime@5.8.34",
    "codemirror": "npm:codemirror@5.9.0",
    "core-js": "npm:core-js@1.2.6",
    "history": "npm:history@1.13.1",
    "immutable": "npm:immutable@3.7.5",
    "jsx": "github:loggur/plugin-babel-jsx@1.0.5",
    "jszip": "npm:jszip@2.5.0",
    "level-sublevel": "npm:level-sublevel@6.5.2",
    "levelup": "npm:levelup@0.19.0",
    "localstorage-down": "npm:localstorage-down@0.6.4",
    "lodash": "npm:lodash@3.10.1",
    "path": "npm:path@0.12.7",
    "react": "npm:react@0.14.3",
    "react-codemirror": "npm:react-codemirror@0.2.2",
    "react-dom": "npm:react-dom@0.14.3",
    "react-redux": "npm:react-redux@4.0.0",
    "react-remarkable": "npm:react-remarkable@1.1.1",
    "react-router": "npm:react-router@1.0.0",
    "redux": "npm:redux@3.0.4",
    "redux-immutablejs": "npm:redux-immutablejs@0.0.7",
    "reflect-metadata": "npm:reflect-metadata@0.1.2",
    "remarkable": "npm:remarkable@1.6.1",
    "swig": "npm:swig@1.4.2",
    "text": "github:systemjs/plugin-text@0.0.4",
    "zone.js": "npm:zone.js@0.5.8",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.5.5"
    },
    "github:jspm/nodelibs-domain@0.1.0": {
      "domain-browser": "npm:domain-browser@1.1.5"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-querystring@0.1.0": {
      "querystring": "npm:querystring@0.2.0"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-tty@0.1.0": {
      "tty-browserify": "npm:tty-browserify@0.0.0"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "github:loggur/babel-plugin-react-hot@1.0.0": {
      "react": "npm:react@0.14.3",
      "react-hot-api": "npm:react-hot-api@0.4.7"
    },
    "github:loggur/plugin-babel-jsx@1.0.5": {
      "babel-plugin-react-hot": "github:loggur/babel-plugin-react-hot@1.0.0"
    },
    "npm:abstract-leveldown@0.12.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "github:jspm/nodelibs-util@0.1.0",
      "xtend": "npm:xtend@3.0.0"
    },
    "npm:abstract-leveldown@0.12.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "github:jspm/nodelibs-util@0.1.0",
      "xtend": "npm:xtend@3.0.0"
    },
    "npm:amdefine@1.0.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "module": "github:jspm/nodelibs-module@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:argparse@0.1.16": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "underscore": "npm:underscore@1.7.0",
      "underscore.string": "npm:underscore.string@2.4.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:asap@2.0.3": {
      "domain": "github:jspm/nodelibs-domain@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:assert-helpers@4.1.0": {
      "ansicolors": "npm:ansicolors@0.3.2",
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "diff": "npm:diff@2.2.1",
      "esnextguardian": "npm:esnextguardian@1.2.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:async@0.2.10": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:autolinker@0.15.3": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:babel-runtime@5.8.34": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:bl@0.8.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "readable-stream": "npm:readable-stream@1.0.33",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:bops@0.1.1": {
      "base64-js": "npm:base64-js@0.0.2",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "to-utf8": "npm:to-utf8@0.0.1"
    },
    "npm:buffer@3.5.5": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:bytewise@0.7.1": {
      "bops": "npm:bops@0.1.1"
    },
    "npm:classnames@2.2.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:codemirror@5.9.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:core-js@1.2.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:core-util-is@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:d64@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:deferred-leveldown@0.2.0": {
      "abstract-leveldown": "npm:abstract-leveldown@0.12.4",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:diff@2.2.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:domain-browser@1.1.5": {
      "assert-helpers": "npm:assert-helpers@4.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1"
    },
    "npm:envify@3.4.0": {
      "jstransform": "npm:jstransform@10.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "through": "npm:through@2.3.8"
    },
    "npm:errno@0.1.4": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "prr": "npm:prr@0.0.0"
    },
    "npm:es6-promise@3.0.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:esnextguardian@1.2.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:esprima-fb@13001.1001.0-dev-harmony-fb": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:fbjs@0.3.2": {
      "core-js": "npm:core-js@1.2.6",
      "loose-envify": "npm:loose-envify@1.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "promise": "npm:promise@7.0.4",
      "ua-parser-js": "npm:ua-parser-js@0.7.9",
      "whatwg-fetch": "npm:whatwg-fetch@0.9.0"
    },
    "npm:has-localstorage@1.0.1": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "querystring": "github:jspm/nodelibs-querystring@0.1.0"
    },
    "npm:history@1.13.1": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "deep-equal": "npm:deep-equal@1.0.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "invariant": "npm:invariant@2.2.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "qs": "npm:qs@4.0.0",
      "warning": "npm:warning@2.1.0"
    },
    "npm:humble-localstorage@1.4.2": {
      "has-localstorage": "npm:has-localstorage@1.0.1",
      "localstorage-memory": "npm:localstorage-memory@1.0.1"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:invariant@2.2.0": {
      "loose-envify": "npm:loose-envify@1.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:jstransform@10.1.0": {
      "base62": "npm:base62@0.1.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "esprima-fb": "npm:esprima-fb@13001.1001.0-dev-harmony-fb",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "source-map": "npm:source-map@0.1.34"
    },
    "npm:jszip@2.5.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "pako": "npm:pako@0.2.8",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:level-sublevel@6.5.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "bytewise": "npm:bytewise@0.7.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "levelup": "npm:levelup@0.19.0",
      "ltgt": "npm:ltgt@2.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "pull-stream": "npm:pull-stream@2.21.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0",
      "typewiselite": "npm:typewiselite@1.0.0",
      "xtend": "npm:xtend@4.0.1"
    },
    "npm:levelup@0.19.0": {
      "bl": "npm:bl@0.8.2",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "deferred-leveldown": "npm:deferred-leveldown@0.2.0",
      "errno": "npm:errno@0.1.4",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "prr": "npm:prr@0.0.0",
      "readable-stream": "npm:readable-stream@1.0.33",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0",
      "xtend": "npm:xtend@3.0.0"
    },
    "npm:localstorage-down@0.6.4": {
      "abstract-leveldown": "npm:abstract-leveldown@0.12.3",
      "argsarray": "npm:argsarray@0.0.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "d64": "npm:d64@1.0.0",
      "humble-localstorage": "npm:humble-localstorage@1.4.2",
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "tiny-queue": "npm:tiny-queue@0.2.0"
    },
    "npm:localstorage-memory@1.0.1": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "querystring": "github:jspm/nodelibs-querystring@0.1.0"
    },
    "npm:lodash@3.10.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:loose-envify@1.1.0": {
      "js-tokens": "npm:js-tokens@1.0.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:ltgt@2.1.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:optimist@0.6.1": {
      "minimist": "npm:minimist@0.0.10",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "wordwrap": "npm:wordwrap@0.0.2"
    },
    "npm:pako@0.2.8": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:path@0.12.7": {
      "process": "npm:process@0.11.2",
      "util": "npm:util@0.10.3"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:promise@7.0.4": {
      "asap": "npm:asap@2.0.3",
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:pull-stream@2.21.0": {
      "process": "github:jspm/nodelibs-process@0.1.2",
      "pull-core": "npm:pull-core@1.0.0"
    },
    "npm:react-codemirror@0.2.2": {
      "classnames": "npm:classnames@2.2.1",
      "codemirror": "npm:codemirror@5.9.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "react": "npm:react@0.14.3"
    },
    "npm:react-dom@0.14.3": {
      "react": "npm:react@0.14.3"
    },
    "npm:react-hot-api@0.4.7": {
      "react": "npm:react@0.14.3"
    },
    "npm:react-redux@4.0.0": {
      "hoist-non-react-statics": "npm:hoist-non-react-statics@1.0.3",
      "invariant": "npm:invariant@2.2.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "react": "npm:react@0.14.3",
      "redux": "npm:redux@3.0.4"
    },
    "npm:react-remarkable@1.1.1": {
      "remarkable": "npm:remarkable@1.6.1"
    },
    "npm:react-router@1.0.0": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "history": "npm:history@1.13.1",
      "invariant": "npm:invariant@2.2.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "warning": "npm:warning@2.1.0"
    },
    "npm:react@0.14.3": {
      "envify": "npm:envify@3.4.0",
      "fbjs": "npm:fbjs@0.3.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:readable-stream@1.0.33": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "npm:redux-immutablejs@0.0.7": {
      "immutable": "npm:immutable@3.7.5",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "redux": "npm:redux@3.0.4"
    },
    "npm:redux@3.0.4": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:reflect-metadata@0.1.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:remarkable@1.6.1": {
      "argparse": "npm:argparse@0.1.16",
      "autolinker": "npm:autolinker@0.15.3",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:source-map@0.1.34": {
      "amdefine": "npm:amdefine@1.0.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.0.33"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:swig@1.4.2": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "optimist": "npm:optimist@0.6.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0",
      "uglify-js": "npm:uglify-js@2.4.24",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:through@2.3.8": {
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:to-utf8@0.0.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:typewiselite@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:ua-parser-js@0.7.9": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:uglify-js@2.4.24": {
      "async": "npm:async@0.2.10",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "source-map": "npm:source-map@0.1.34",
      "uglify-to-browserify": "npm:uglify-to-browserify@1.0.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0",
      "yargs": "npm:yargs@3.5.4"
    },
    "npm:uglify-to-browserify@1.0.2": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    },
    "npm:warning@2.1.0": {
      "loose-envify": "npm:loose-envify@1.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:window-size@0.1.0": {
      "process": "github:jspm/nodelibs-process@0.1.2",
      "tty": "github:jspm/nodelibs-tty@0.1.0"
    },
    "npm:yargs@3.5.4": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "camelcase": "npm:camelcase@1.2.1",
      "decamelize": "npm:decamelize@1.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "window-size": "npm:window-size@0.1.0",
      "wordwrap": "npm:wordwrap@0.0.2"
    },
    "npm:zone.js@0.5.8": {
      "es6-promise": "npm:es6-promise@3.0.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
