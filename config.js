System.config({
  baseURL: "/project-cms",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "blacklist": [],
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ],
    "stage": 0
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  packages: {
    "/project-cms/src": {
      "defaultExtension": "js",
      "meta": {
        "*.jsx": {
          "format": "esm"
        },
        "*.css": {
          "loader": "css"
        }
      }
    },
    "/project-cms": {
      "meta": {
        "*.css": {
          "loader": "css"
        }
      }
    }
  },

  map: {
    "@empty/package": "@empty",
    "FileSaver.js": "github:eligrey/FileSaver.js@master",
    "abstract-leveldown": "npm:abstract-leveldown@2.6.0",
    "assert": "github:jspm/nodelibs-assert@0.1.0",
    "aws-sdk": "npm:aws-sdk@2.2.36",
    "babel": "npm:babel-core@5.8.38",
    "babel-preset-stage-0": "npm:babel-preset-stage-0@6.5.0",
    "babel-runtime": "npm:babel-runtime@5.8.38",
    "buffer": "github:jspm/nodelibs-buffer@0.1.0",
    "buffertools": "@empty",
    "codemirror": "npm:codemirror@5.11.0",
    "core-js": "npm:core-js@1.2.7",
    "create-hmac": "npm:create-hmac@1.1.4",
    "css": "npm:systemjs-plugin-css@0.1.20",
    "deeper": "npm:deeper@2.1.0",
    "dynamo-down": "npm:dynamo-down@1.0.5",
    "eligrey/FileSaver.js": "github:eligrey/FileSaver.js@master",
    "fetch": "github:github/fetch@0.11.0",
    "hermimg": "github:viliusle/Hermite-resize@master",
    "history": "npm:history@1.17.0",
    "immutable": "npm:immutable@3.7.6",
    "immutable-reducers": "npm:immutable-reducers@1.1.0",
    "ipfs-api": "npm:ipfs-api@3.0.2",
    "jsx": "github:floatdrop/plugin-jsx@1.2.1",
    "jszip": "npm:jszip@2.5.0",
    "level-sublevel": "npm:level-sublevel@6.5.4",
    "levelup": "npm:levelup@0.19.0",
    "localstorage-down": "npm:localstorage-down@0.6.6",
    "lodash": "npm:lodash@4.4.0",
    "mocha": "npm:mocha@3.1.2",
    "mozilla/nunjucks": "github:mozilla/nunjucks@2.3.0",
    "node-uuid": "npm:node-uuid@1.4.7",
    "nunjucks": "github:mozilla/nunjucks@2.3.0",
    "path": "npm:path@0.12.7",
    "process": "github:jspm/nodelibs-process@0.1.2",
    "querystring": "github:jspm/nodelibs-querystring@0.1.0",
    "react": "npm:react@0.14.7",
    "react-addons-shallow-compare": "npm:react-addons-shallow-compare@0.14.7",
    "react-codemirror": "npm:react-codemirror@0.2.5",
    "react-cropper": "npm:react-cropper@0.6.2",
    "react-dom": "npm:react-dom@0.14.7",
    "react-jsonschema-form": "npm:react-jsonschema-form@0.15.0",
    "react-redux": "npm:react-redux@4.4.0",
    "react-remarkable": "npm:react-remarkable@1.1.1",
    "react-router": "npm:react-router@1.0.3",
    "readable-stream": "npm:readable-stream@2.0.5",
    "redux": "npm:redux@3.3.1",
    "redux-immutable": "npm:redux-immutable@1.3.10",
    "redux-immutablejs": "npm:redux-immutablejs@0.0.7",
    "reflect-metadata": "npm:reflect-metadata@0.1.3",
    "remarkable": "npm:remarkable@1.6.2",
    "stream-browserify": "npm:stream-browserify@2.0.1",
    "systemjs-json": "github:systemjs/plugin-json@0.1.2",
    "text": "github:systemjs/plugin-text@0.0.4",
    "zbyte64/react-jsonschema-form": "github:zbyte64/react-jsonschema-form@component-FieldSet",
    "zone.js": "npm:zone.js@0.5.14",
    "~": "/project-cms/src",
    "github:floatdrop/plugin-jsx@1.2.1": {
      "react-tools": "npm:react-tools@0.13.3"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-constants@0.1.0": {
      "constants-browserify": "npm:constants-browserify@0.0.1"
    },
    "github:jspm/nodelibs-crypto@0.1.0": {
      "crypto-browserify": "npm:crypto-browserify@3.11.0"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-http@1.7.1": {
      "Base64": "npm:Base64@0.2.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "github:jspm/nodelibs-https@0.1.0": {
      "https-browserify": "npm:https-browserify@0.0.0"
    },
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.9"
    },
    "github:jspm/nodelibs-punycode@0.1.0": {
      "punycode": "npm:punycode@1.3.2"
    },
    "github:jspm/nodelibs-querystring@0.1.0": {
      "querystring": "npm:querystring@0.2.0"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@2.0.1"
    },
    "github:jspm/nodelibs-string_decoder@0.1.0": {
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "github:jspm/nodelibs-timers@0.1.0": {
      "timers-browserify": "npm:timers-browserify@1.4.2"
    },
    "github:jspm/nodelibs-url@0.1.0": {
      "url": "npm:url@0.10.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "github:zbyte64/react-jsonschema-form@component-FieldSet": {
      "deeper": "npm:deeper@2.1.0",
      "jsonschema": "npm:jsonschema@1.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "react": "npm:react@0.14.7",
      "react-dom": "npm:react-dom@0.14.7"
    },
    "npm:abstract-leveldown@0.12.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2",
      "util": "github:jspm/nodelibs-util@0.1.0",
      "xtend": "npm:xtend@4.0.1"
    },
    "npm:abstract-leveldown@2.6.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "github:jspm/nodelibs-util@0.1.0",
      "xtend": "npm:xtend@4.0.1"
    },
    "npm:acorn@1.2.2": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
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
    "npm:asn1.js@4.5.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "bn.js": "npm:bn.js@4.11.3",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.1",
      "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:assert@1.4.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:autolinker@0.15.3": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:aws-sdk@2.2.36": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "https": "github:jspm/nodelibs-https@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "punycode": "github:jspm/nodelibs-punycode@0.1.0",
      "querystring": "github:jspm/nodelibs-querystring@0.1.0",
      "sax": "npm:sax@1.1.5",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0",
      "xml2js": "npm:xml2js@0.4.16",
      "xmlbuilder": "npm:xmlbuilder@4.2.1"
    },
    "npm:babel-code-frame@6.5.0": {
      "babel-runtime": "npm:babel-runtime@5.8.38",
      "chalk": "npm:chalk@1.1.1",
      "esutils": "npm:esutils@2.0.2",
      "js-tokens": "npm:js-tokens@1.0.2",
      "line-numbers": "npm:line-numbers@0.2.0",
      "repeating": "npm:repeating@1.1.3"
    },
    "npm:babel-helper-bindify-decorators@6.5.0": {
      "babel-runtime": "npm:babel-runtime@5.8.38",
      "babel-traverse": "npm:babel-traverse@6.5.0",
      "babel-types": "npm:babel-types@6.5.2"
    },
    "npm:babel-helper-builder-binary-assignment-operator-visitor@6.5.0": {
      "babel-helper-explode-assignable-expression": "npm:babel-helper-explode-assignable-expression@6.5.0",
      "babel-runtime": "npm:babel-runtime@5.8.38",
      "babel-types": "npm:babel-types@6.5.2"
    },
    "npm:babel-helper-define-map@6.5.0": {
      "babel-helper-function-name": "npm:babel-helper-function-name@6.5.0",
      "babel-runtime": "npm:babel-runtime@5.8.38",
      "babel-types": "npm:babel-types@6.5.2",
      "lodash": "npm:lodash@4.4.0"
    },
    "npm:babel-helper-explode-assignable-expression@6.5.0": {
      "babel-runtime": "npm:babel-runtime@5.8.38",
      "babel-traverse": "npm:babel-traverse@6.5.0",
      "babel-types": "npm:babel-types@6.5.2"
    },
    "npm:babel-helper-explode-class@6.5.0": {
      "babel-helper-bindify-decorators": "npm:babel-helper-bindify-decorators@6.5.0",
      "babel-runtime": "npm:babel-runtime@5.8.38",
      "babel-traverse": "npm:babel-traverse@6.5.0",
      "babel-types": "npm:babel-types@6.5.2"
    },
    "npm:babel-helper-function-name@6.5.0": {
      "babel-helper-get-function-arity": "npm:babel-helper-get-function-arity@6.5.0",
      "babel-runtime": "npm:babel-runtime@5.8.38",
      "babel-template": "npm:babel-template@6.5.0",
      "babel-traverse": "npm:babel-traverse@6.5.0",
      "babel-types": "npm:babel-types@6.5.2"
    },
    "npm:babel-helper-get-function-arity@6.5.0": {
      "babel-runtime": "npm:babel-runtime@5.8.38",
      "babel-types": "npm:babel-types@6.5.2"
    },
    "npm:babel-helper-remap-async-to-generator@6.5.0": {
      "babel-helper-function-name": "npm:babel-helper-function-name@6.5.0",
      "babel-runtime": "npm:babel-runtime@5.8.38",
      "babel-template": "npm:babel-template@6.5.0",
      "babel-traverse": "npm:babel-traverse@6.5.0",
      "babel-types": "npm:babel-types@6.5.2"
    },
    "npm:babel-messages@6.5.0": {
      "babel-runtime": "npm:babel-runtime@5.8.38",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:babel-plugin-syntax-async-functions@6.5.0": {
      "babel-runtime": "npm:babel-runtime@5.8.38"
    },
    "npm:babel-plugin-syntax-class-constructor-call@6.5.0": {
      "babel-runtime": "npm:babel-runtime@5.8.38"
    },
    "npm:babel-plugin-syntax-class-properties@6.5.0": {
      "babel-runtime": "npm:babel-runtime@5.8.38"
    },
    "npm:babel-plugin-syntax-decorators@6.5.0": {
      "babel-runtime": "npm:babel-runtime@5.8.38"
    },
    "npm:babel-plugin-syntax-do-expressions@6.5.0": {
      "babel-runtime": "npm:babel-runtime@5.8.38"
    },
    "npm:babel-plugin-syntax-exponentiation-operator@6.5.0": {
      "babel-runtime": "npm:babel-runtime@5.8.38"
    },
    "npm:babel-plugin-syntax-export-extensions@6.5.0": {
      "babel-runtime": "npm:babel-runtime@5.8.38"
    },
    "npm:babel-plugin-syntax-function-bind@6.5.0": {
      "babel-runtime": "npm:babel-runtime@5.8.38"
    },
    "npm:babel-plugin-syntax-object-rest-spread@6.5.0": {
      "babel-runtime": "npm:babel-runtime@5.8.38"
    },
    "npm:babel-plugin-syntax-trailing-function-commas@6.5.0": {
      "babel-runtime": "npm:babel-runtime@5.8.38"
    },
    "npm:babel-plugin-transform-async-to-generator@6.5.0": {
      "babel-helper-remap-async-to-generator": "npm:babel-helper-remap-async-to-generator@6.5.0",
      "babel-plugin-syntax-async-functions": "npm:babel-plugin-syntax-async-functions@6.5.0",
      "babel-runtime": "npm:babel-runtime@5.8.38"
    },
    "npm:babel-plugin-transform-class-constructor-call@6.5.0": {
      "babel-plugin-syntax-class-constructor-call": "npm:babel-plugin-syntax-class-constructor-call@6.5.0",
      "babel-runtime": "npm:babel-runtime@5.8.38",
      "babel-template": "npm:babel-template@6.5.0"
    },
    "npm:babel-plugin-transform-class-properties@6.5.2": {
      "babel-plugin-syntax-class-properties": "npm:babel-plugin-syntax-class-properties@6.5.0",
      "babel-runtime": "npm:babel-runtime@5.8.38"
    },
    "npm:babel-plugin-transform-decorators@6.5.0": {
      "babel-helper-define-map": "npm:babel-helper-define-map@6.5.0",
      "babel-helper-explode-class": "npm:babel-helper-explode-class@6.5.0",
      "babel-plugin-syntax-decorators": "npm:babel-plugin-syntax-decorators@6.5.0",
      "babel-runtime": "npm:babel-runtime@5.8.38",
      "babel-template": "npm:babel-template@6.5.0",
      "babel-types": "npm:babel-types@6.5.2"
    },
    "npm:babel-plugin-transform-do-expressions@6.5.0": {
      "babel-plugin-syntax-do-expressions": "npm:babel-plugin-syntax-do-expressions@6.5.0",
      "babel-runtime": "npm:babel-runtime@5.8.38"
    },
    "npm:babel-plugin-transform-exponentiation-operator@6.5.0": {
      "babel-helper-builder-binary-assignment-operator-visitor": "npm:babel-helper-builder-binary-assignment-operator-visitor@6.5.0",
      "babel-plugin-syntax-exponentiation-operator": "npm:babel-plugin-syntax-exponentiation-operator@6.5.0",
      "babel-runtime": "npm:babel-runtime@5.8.38"
    },
    "npm:babel-plugin-transform-export-extensions@6.5.0": {
      "babel-plugin-syntax-export-extensions": "npm:babel-plugin-syntax-export-extensions@6.5.0",
      "babel-runtime": "npm:babel-runtime@5.8.38"
    },
    "npm:babel-plugin-transform-function-bind@6.5.2": {
      "babel-plugin-syntax-function-bind": "npm:babel-plugin-syntax-function-bind@6.5.0",
      "babel-runtime": "npm:babel-runtime@5.8.38"
    },
    "npm:babel-plugin-transform-object-rest-spread@6.5.0": {
      "babel-plugin-syntax-object-rest-spread": "npm:babel-plugin-syntax-object-rest-spread@6.5.0",
      "babel-runtime": "npm:babel-runtime@5.8.38"
    },
    "npm:babel-preset-stage-0@6.5.0": {
      "babel-plugin-transform-do-expressions": "npm:babel-plugin-transform-do-expressions@6.5.0",
      "babel-plugin-transform-function-bind": "npm:babel-plugin-transform-function-bind@6.5.2",
      "babel-preset-stage-1": "npm:babel-preset-stage-1@6.5.0"
    },
    "npm:babel-preset-stage-1@6.5.0": {
      "babel-plugin-transform-class-constructor-call": "npm:babel-plugin-transform-class-constructor-call@6.5.0",
      "babel-plugin-transform-class-properties": "npm:babel-plugin-transform-class-properties@6.5.2",
      "babel-plugin-transform-decorators": "npm:babel-plugin-transform-decorators@6.5.0",
      "babel-plugin-transform-export-extensions": "npm:babel-plugin-transform-export-extensions@6.5.0",
      "babel-preset-stage-2": "npm:babel-preset-stage-2@6.5.0"
    },
    "npm:babel-preset-stage-2@6.5.0": {
      "babel-plugin-syntax-trailing-function-commas": "npm:babel-plugin-syntax-trailing-function-commas@6.5.0",
      "babel-plugin-transform-object-rest-spread": "npm:babel-plugin-transform-object-rest-spread@6.5.0",
      "babel-preset-stage-3": "npm:babel-preset-stage-3@6.5.0"
    },
    "npm:babel-preset-stage-3@6.5.0": {
      "babel-plugin-transform-async-to-generator": "npm:babel-plugin-transform-async-to-generator@6.5.0",
      "babel-plugin-transform-exponentiation-operator": "npm:babel-plugin-transform-exponentiation-operator@6.5.0"
    },
    "npm:babel-runtime@5.8.38": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:babel-template@6.5.0": {
      "babel-runtime": "npm:babel-runtime@5.8.38",
      "babel-traverse": "npm:babel-traverse@6.5.0",
      "babel-types": "npm:babel-types@6.5.2",
      "babylon": "npm:babylon@6.5.2",
      "lodash": "npm:lodash@4.4.0"
    },
    "npm:babel-traverse@6.5.0": {
      "babel-code-frame": "npm:babel-code-frame@6.5.0",
      "babel-messages": "npm:babel-messages@6.5.0",
      "babel-runtime": "npm:babel-runtime@5.8.38",
      "babel-types": "npm:babel-types@6.5.2",
      "babylon": "npm:babylon@6.5.2",
      "debug": "npm:debug@2.2.0",
      "globals": "npm:globals@8.18.0",
      "invariant": "npm:invariant@2.2.0",
      "lodash": "npm:lodash@4.4.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "repeating": "npm:repeating@1.1.3"
    },
    "npm:babel-types@6.5.2": {
      "babel-runtime": "npm:babel-runtime@5.8.38",
      "babel-traverse": "npm:babel-traverse@6.5.0",
      "esutils": "npm:esutils@2.0.2",
      "lodash": "npm:lodash@4.4.0",
      "to-fast-properties": "npm:to-fast-properties@1.0.1"
    },
    "npm:babylon@6.5.2": {
      "babel-runtime": "npm:babel-runtime@5.8.38",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:balanced-match@0.3.0": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:base-x@1.0.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:bl@0.8.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "readable-stream": "npm:readable-stream@2.0.5",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:bn.js@4.11.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:boom@3.1.2": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "hoek": "npm:hoek@3.0.4"
    },
    "npm:brace-expansion@1.1.3": {
      "balanced-match": "npm:balanced-match@0.3.0",
      "concat-map": "npm:concat-map@0.0.1"
    },
    "npm:browserify-aes@1.0.6": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "buffer-xor": "npm:buffer-xor@1.0.3",
      "cipher-base": "npm:cipher-base@1.0.2",
      "create-hash": "npm:create-hash@1.1.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:browserify-cipher@1.0.0": {
      "browserify-aes": "npm:browserify-aes@1.0.6",
      "browserify-des": "npm:browserify-des@1.0.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "evp_bytestokey": "npm:evp_bytestokey@1.0.0"
    },
    "npm:browserify-des@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "cipher-base": "npm:cipher-base@1.0.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "des.js": "npm:des.js@1.0.0",
      "inherits": "npm:inherits@2.0.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:browserify-rsa@4.0.1": {
      "bn.js": "npm:bn.js@4.11.3",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "constants": "github:jspm/nodelibs-constants@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "randombytes": "npm:randombytes@2.0.3"
    },
    "npm:browserify-sign@4.0.0": {
      "bn.js": "npm:bn.js@4.11.3",
      "browserify-rsa": "npm:browserify-rsa@4.0.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "create-hmac": "npm:create-hmac@1.1.4",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "elliptic": "npm:elliptic@6.2.3",
      "inherits": "npm:inherits@2.0.1",
      "parse-asn1": "npm:parse-asn1@5.0.0",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:bs58@3.0.0": {
      "base-x": "npm:base-x@1.0.4"
    },
    "npm:buffer-xor@1.0.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.8",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:bytewise-core@1.2.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "typewise-core": "npm:typewise-core@1.2.0"
    },
    "npm:bytewise@1.1.0": {
      "bytewise-core": "npm:bytewise-core@1.2.3",
      "typewise": "npm:typewise@1.0.3"
    },
    "npm:canonical-reducer-composition-validator@1.3.1": {
      "lodash": "npm:lodash@4.4.0"
    },
    "npm:chalk@1.1.1": {
      "ansi-styles": "npm:ansi-styles@2.1.0",
      "escape-string-regexp": "npm:escape-string-regexp@1.0.4",
      "has-ansi": "npm:has-ansi@2.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "strip-ansi": "npm:strip-ansi@3.0.0",
      "supports-color": "npm:supports-color@2.0.0"
    },
    "npm:cipher-base@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "string_decoder": "github:jspm/nodelibs-string_decoder@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:codemirror@5.11.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:commander@2.9.0": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "graceful-readlink": "npm:graceful-readlink@1.0.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:commoner@0.10.4": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "commander": "npm:commander@2.9.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "detective": "npm:detective@4.3.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "glob": "npm:glob@7.0.3",
      "graceful-fs": "npm:graceful-fs@4.1.3",
      "iconv-lite": "npm:iconv-lite@0.4.13",
      "mkdirp": "npm:mkdirp@0.5.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "private": "npm:private@0.1.6",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "q": "npm:q@1.4.1",
      "recast": "npm:recast@0.10.43",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:constants-browserify@0.0.1": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:core-js@1.2.7": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:core-util-is@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:create-ecdh@4.0.0": {
      "bn.js": "npm:bn.js@4.11.3",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "elliptic": "npm:elliptic@6.2.3"
    },
    "npm:create-hash@1.1.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "cipher-base": "npm:cipher-base@1.0.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.1",
      "ripemd160": "npm:ripemd160@1.0.1",
      "sha.js": "npm:sha.js@2.4.5"
    },
    "npm:create-hmac@1.1.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:crypto-browserify@3.11.0": {
      "browserify-cipher": "npm:browserify-cipher@1.0.0",
      "browserify-sign": "npm:browserify-sign@4.0.0",
      "create-ecdh": "npm:create-ecdh@4.0.0",
      "create-hash": "npm:create-hash@1.1.2",
      "create-hmac": "npm:create-hmac@1.1.4",
      "diffie-hellman": "npm:diffie-hellman@5.0.2",
      "inherits": "npm:inherits@2.0.1",
      "pbkdf2": "npm:pbkdf2@3.0.4",
      "public-encrypt": "npm:public-encrypt@4.0.0",
      "randombytes": "npm:randombytes@2.0.3",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:d64@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:debug@2.2.0": {
      "ms": "npm:ms@0.7.1"
    },
    "npm:deeper@2.1.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:deferred-leveldown@0.2.0": {
      "abstract-leveldown": "npm:abstract-leveldown@0.12.3",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:des.js@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
    },
    "npm:detect-node@2.0.3": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:detective@4.3.1": {
      "acorn": "npm:acorn@1.2.2",
      "defined": "npm:defined@1.0.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:diffie-hellman@5.0.2": {
      "bn.js": "npm:bn.js@4.11.3",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "miller-rabin": "npm:miller-rabin@4.0.0",
      "randombytes": "npm:randombytes@2.0.3",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:dynamo-down@1.0.5": {
      "abstract-leveldown": "npm:abstract-leveldown@2.6.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:elliptic@6.2.3": {
      "bn.js": "npm:bn.js@4.11.3",
      "brorand": "npm:brorand@1.0.5",
      "hash.js": "npm:hash.js@1.0.3",
      "inherits": "npm:inherits@2.0.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:errno@0.1.4": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "prr": "npm:prr@0.0.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:es6-promise@3.1.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:esprima-fb@15001.1001.0-dev-harmony-fb": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:evp_bytestokey@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:fbjs@0.6.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:glob@7.0.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inflight": "npm:inflight@1.0.4",
      "inherits": "npm:inherits@2.0.1",
      "minimatch": "npm:minimatch@3.0.0",
      "once": "npm:once@1.3.3",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "path-is-absolute": "npm:path-is-absolute@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:globals@8.18.0": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:graceful-fs@4.1.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "constants": "github:jspm/nodelibs-constants@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:graceful-readlink@1.0.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:has-ansi@2.0.0": {
      "ansi-regex": "npm:ansi-regex@2.0.0"
    },
    "npm:has-localstorage@1.0.1": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "querystring": "github:jspm/nodelibs-querystring@0.1.0"
    },
    "npm:hash.js@1.0.3": {
      "inherits": "npm:inherits@2.0.1"
    },
    "npm:history@1.17.0": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "deep-equal": "npm:deep-equal@1.0.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "invariant": "npm:invariant@2.2.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "query-string": "npm:query-string@3.0.0",
      "warning": "npm:warning@2.1.0"
    },
    "npm:hoek@3.0.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:https-browserify@0.0.0": {
      "http": "github:jspm/nodelibs-http@1.7.1"
    },
    "npm:humble-localstorage@1.4.2": {
      "has-localstorage": "npm:has-localstorage@1.0.1",
      "localstorage-memory": "npm:localstorage-memory@1.0.2"
    },
    "npm:iconv-lite@0.4.13": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "string_decoder": "github:jspm/nodelibs-string_decoder@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:immutable@3.7.6": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:inflight@1.0.4": {
      "once": "npm:once@1.3.3",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "wrappy": "npm:wrappy@1.0.1"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:invariant@2.2.0": {
      "loose-envify": "npm:loose-envify@1.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:ip@1.1.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:ipfs-api@3.0.2": {
      "babel-runtime": "npm:babel-runtime@5.8.38",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "detect-node": "npm:detect-node@2.0.3",
      "flatmap": "npm:flatmap@0.0.3",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "glob": "npm:glob@7.0.3",
      "multiaddr": "npm:multiaddr@1.4.1",
      "multipart-stream": "npm:multipart-stream@2.0.1",
      "ndjson": "npm:ndjson@1.4.3",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "qs": "npm:qs@6.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2",
      "wreck": "npm:wreck@7.2.0"
    },
    "npm:is-finite@1.0.1": {
      "number-is-nan": "npm:number-is-nan@1.0.0"
    },
    "npm:isarray@1.0.0": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:jsonschema@1.1.0": {
      "url": "github:jspm/nodelibs-url@0.1.0"
    },
    "npm:jstransform@10.1.0": {
      "base62": "npm:base62@0.1.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "esprima-fb": "npm:esprima-fb@15001.1001.0-dev-harmony-fb",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "source-map": "npm:source-map@0.5.3"
    },
    "npm:jszip@2.5.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "pako": "npm:pako@0.2.8",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:level-sublevel@6.5.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "bytewise": "npm:bytewise@1.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "levelup": "npm:levelup@0.19.0",
      "ltgt": "npm:ltgt@2.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "pull-stream": "npm:pull-stream@2.21.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2",
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
      "readable-stream": "npm:readable-stream@2.0.5",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2",
      "util": "github:jspm/nodelibs-util@0.1.0",
      "xtend": "npm:xtend@4.0.1"
    },
    "npm:line-numbers@0.2.0": {
      "left-pad": "npm:left-pad@0.0.3"
    },
    "npm:localstorage-down@0.6.6": {
      "abstract-leveldown": "npm:abstract-leveldown@0.12.3",
      "argsarray": "npm:argsarray@0.0.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "d64": "npm:d64@1.0.0",
      "humble-localstorage": "npm:humble-localstorage@1.4.2",
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "tiny-queue": "npm:tiny-queue@0.2.0"
    },
    "npm:localstorage-memory@1.0.2": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "querystring": "github:jspm/nodelibs-querystring@0.1.0"
    },
    "npm:lodash._baseassign@3.2.0": {
      "lodash._basecopy": "npm:lodash._basecopy@3.0.1",
      "lodash.keys": "npm:lodash.keys@3.1.2"
    },
    "npm:lodash._basefilter@4.0.1": {
      "lodash._baseeach": "npm:lodash._baseeach@4.1.2"
    },
    "npm:lodash._baseiteratee@4.6.1": {
      "lodash._stringtopath": "npm:lodash._stringtopath@4.7.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash._stringtopath@4.7.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.create@3.1.1": {
      "lodash._baseassign": "npm:lodash._baseassign@3.2.0",
      "lodash._basecreate": "npm:lodash._basecreate@3.0.3",
      "lodash._isiterateecall": "npm:lodash._isiterateecall@3.0.9"
    },
    "npm:lodash.filter@4.3.0": {
      "lodash._basefilter": "npm:lodash._basefilter@4.0.1",
      "lodash._baseiteratee": "npm:lodash._baseiteratee@4.6.1"
    },
    "npm:lodash.keys@3.1.2": {
      "lodash._getnative": "npm:lodash._getnative@3.9.1",
      "lodash.isarguments": "npm:lodash.isarguments@3.1.0",
      "lodash.isarray": "npm:lodash.isarray@3.0.4"
    },
    "npm:lodash.map@4.3.0": {
      "lodash._baseeach": "npm:lodash._baseeach@4.1.2",
      "lodash._baseiteratee": "npm:lodash._baseiteratee@4.6.1"
    },
    "npm:lodash@4.4.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:loose-envify@1.1.0": {
      "js-tokens": "npm:js-tokens@1.0.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:ltgt@2.1.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:miller-rabin@4.0.0": {
      "bn.js": "npm:bn.js@4.11.3",
      "brorand": "npm:brorand@1.0.5"
    },
    "npm:minimatch@3.0.0": {
      "brace-expansion": "npm:brace-expansion@1.1.3",
      "path": "github:jspm/nodelibs-path@0.1.0"
    },
    "npm:mkdirp@0.5.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "minimist": "npm:minimist@1.2.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:mocha@3.1.2": {
      "css": "github:systemjs/plugin-css@0.1.32",
      "debug": "npm:debug@2.2.0",
      "json3": "npm:json3@3.3.2",
      "lodash.create": "npm:lodash.create@3.1.1"
    },
    "npm:multiaddr@1.4.1": {
      "babel-runtime": "npm:babel-runtime@5.8.38",
      "bs58": "npm:bs58@3.0.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "ip": "npm:ip@1.1.2",
      "lodash.filter": "npm:lodash.filter@4.3.0",
      "lodash.map": "npm:lodash.map@4.3.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "varint": "npm:varint@4.0.0",
      "xtend": "npm:xtend@4.0.1"
    },
    "npm:multipart-stream@2.0.1": {
      "inherits": "npm:inherits@2.0.1",
      "is-stream": "npm:is-stream@1.1.0",
      "sandwich-stream": "npm:sandwich-stream@1.0.0",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:ndjson@1.4.3": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "minimist": "npm:minimist@1.2.0",
      "os": "github:jspm/nodelibs-os@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "split2": "npm:split2@0.2.1",
      "through2": "npm:through2@0.6.5"
    },
    "npm:node-uuid@1.4.7": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0"
    },
    "npm:once@1.3.3": {
      "wrappy": "npm:wrappy@1.0.1"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:pako@0.2.8": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:parse-asn1@5.0.0": {
      "asn1.js": "npm:asn1.js@4.5.2",
      "browserify-aes": "npm:browserify-aes@1.0.6",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
      "pbkdf2": "npm:pbkdf2@3.0.4",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:path-is-absolute@1.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:path@0.12.7": {
      "process": "npm:process@0.11.9",
      "util": "npm:util@0.10.3"
    },
    "npm:pbkdf2@3.0.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "create-hmac": "npm:create-hmac@1.1.4",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:process-nextick-args@1.0.6": {
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:process@0.11.9": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:prr@0.0.0": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:public-encrypt@4.0.0": {
      "bn.js": "npm:bn.js@4.11.3",
      "browserify-rsa": "npm:browserify-rsa@4.0.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "parse-asn1": "npm:parse-asn1@5.0.0",
      "randombytes": "npm:randombytes@2.0.3"
    },
    "npm:pull-stream@2.21.0": {
      "process": "github:jspm/nodelibs-process@0.1.2",
      "pull-core": "npm:pull-core@1.0.0"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:q@1.4.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:query-string@3.0.0": {
      "strict-uri-encode": "npm:strict-uri-encode@1.1.0"
    },
    "npm:randombytes@2.0.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:react-addons-shallow-compare@0.14.7": {
      "react": "npm:react@0.14.7"
    },
    "npm:react-codemirror@0.2.5": {
      "classnames": "npm:classnames@2.2.3",
      "codemirror": "npm:codemirror@5.11.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "react": "npm:react@0.14.7"
    },
    "npm:react-cropper@0.6.2": {
      "cropperjs": "npm:cropperjs@0.5.6",
      "react": "npm:react@0.14.7",
      "react-dom": "npm:react-dom@0.14.7"
    },
    "npm:react-dom@0.14.7": {
      "react": "npm:react@0.14.7"
    },
    "npm:react-jsonschema-form@0.15.0": {
      "jsonschema": "npm:jsonschema@1.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "react": "npm:react@0.14.7",
      "react-dom": "npm:react-dom@0.14.7"
    },
    "npm:react-redux@4.4.0": {
      "hoist-non-react-statics": "npm:hoist-non-react-statics@1.0.5",
      "invariant": "npm:invariant@2.2.0",
      "lodash": "npm:lodash@4.4.0",
      "loose-envify": "npm:loose-envify@1.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "react": "npm:react@0.14.7",
      "redux": "npm:redux@3.3.1"
    },
    "npm:react-remarkable@1.1.1": {
      "remarkable": "npm:remarkable@1.6.2"
    },
    "npm:react-router@1.0.3": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "history": "npm:history@1.17.0",
      "invariant": "npm:invariant@2.2.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "warning": "npm:warning@2.1.0"
    },
    "npm:react-tools@0.13.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "commoner": "npm:commoner@0.10.4",
      "jstransform": "npm:jstransform@10.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:react@0.14.7": {
      "fbjs": "npm:fbjs@0.6.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:readable-stream@2.0.5": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "process-nextick-args": "npm:process-nextick-args@1.0.6",
      "string_decoder": "npm:string_decoder@0.10.31",
      "util-deprecate": "npm:util-deprecate@1.0.2"
    },
    "npm:recast@0.10.43": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "ast-types": "npm:ast-types@0.8.15",
      "esprima-fb": "npm:esprima-fb@15001.1001.0-dev-harmony-fb",
      "os": "github:jspm/nodelibs-os@0.1.0",
      "private": "npm:private@0.1.6",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "source-map": "npm:source-map@0.5.3"
    },
    "npm:redux-immutable@1.3.10": {
      "canonical-reducer-composition-validator": "npm:canonical-reducer-composition-validator@1.3.1",
      "immutable": "npm:immutable@3.7.6",
      "lodash": "npm:lodash@4.4.0"
    },
    "npm:redux-immutablejs@0.0.7": {
      "immutable": "npm:immutable@3.7.6",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "redux": "npm:redux@3.3.1"
    },
    "npm:redux@3.3.1": {
      "lodash": "npm:lodash@4.4.0",
      "lodash-es": "npm:lodash-es@4.3.0",
      "loose-envify": "npm:loose-envify@1.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:reflect-metadata@0.1.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:remarkable@1.6.2": {
      "argparse": "npm:argparse@0.1.16",
      "autolinker": "npm:autolinker@0.15.3",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:repeating@1.1.3": {
      "is-finite": "npm:is-finite@1.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:ripemd160@1.0.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:sandwich-stream@1.0.0": {
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:sax@1.1.5": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "string_decoder": "github:jspm/nodelibs-string_decoder@0.1.0"
    },
    "npm:sha.js@2.4.5": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:source-map@0.5.3": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:split2@0.2.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "through2": "npm:through2@0.6.5"
    },
    "npm:stream-browserify@2.0.1": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@2.0.5"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:strip-ansi@3.0.0": {
      "ansi-regex": "npm:ansi-regex@2.0.0"
    },
    "npm:supports-color@2.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:through2@0.6.5": {
      "process": "github:jspm/nodelibs-process@0.1.2",
      "readable-stream": "npm:readable-stream@2.0.5",
      "util": "github:jspm/nodelibs-util@0.1.0",
      "xtend": "npm:xtend@4.0.1"
    },
    "npm:timers-browserify@1.4.2": {
      "process": "npm:process@0.11.9"
    },
    "npm:tiny-queue@0.2.0": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:typewise-core@1.2.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:typewise@1.0.3": {
      "typewise-core": "npm:typewise-core@1.2.0"
    },
    "npm:typewiselite@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:url@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util-deprecate@1.0.2": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:varint@4.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    },
    "npm:warning@2.1.0": {
      "loose-envify": "npm:loose-envify@1.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:wreck@7.2.0": {
      "boom": "npm:boom@3.1.2",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "hoek": "npm:hoek@3.0.4",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "https": "github:jspm/nodelibs-https@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0"
    },
    "npm:xml2js@0.4.16": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "sax": "npm:sax@1.1.5",
      "timers": "github:jspm/nodelibs-timers@0.1.0",
      "xmlbuilder": "npm:xmlbuilder@4.2.1"
    },
    "npm:xmlbuilder@4.2.1": {
      "lodash": "npm:lodash@4.4.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:xtend@4.0.1": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:zone.js@0.5.14": {
      "es6-promise": "npm:es6-promise@3.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
