# plugin-babel-jsx
SystemJS plugin that uses Babel for jsx transformation.  Includes hot reload for React components.

## Notes
This plugin is really straightforward.  It will attempt to use whatever `babelOptions` you've configured for `systemjs` and fallback to some defaults, `{stage: 0, optional: ['runtime']}`, when calling `babel.transform` for the translation.  It has only one dependency, [`babel-plugin-react-hot`](https://github.com/loggur/babel-plugin-react-hot), added to `babel.transform`'s `options.plugins`, which of course exists to support hot reloading of React components by default.  You can use [`systemjs-reload`](https://github.com/loggur/systemjs-reload) to reload modules and [`babel-plugin-react-hot`](https://github.com/loggur/babel-plugin-react-hot) will handle the React hot reloading portion of it for you.

Builds/bundles have not yet been tested with all of this, but in development, all of this seems to handle everything thrown at it.  Some logic also needs to be added to [`babel-plugin-react-hot`](https://github.com/loggur/babel-plugin-react-hot) to exclude the hot reload code from production builds.  Tests will probably also eventually be added to everything, but so far it's all pretty straightforward.  Maybe we'll find out that people have some interesting edge cases that require tests sooner rather than later.

## Installation
```
jspm install jsx=github:loggur/plugin-babel-jsx@1.0.3
```
or
```
jspm install jsx=npm:plugin-babel-jsx
```

## Usage
```js
import someComponent from 'some-component.jsx!';
```

Or if you want to import from `some-component.jsx` instead of `some-component.jsx!`, you can configure `System` along these lines:
```js
System.config({
  "baseURL": "./",
  "defaultJSExtensions": true,
  "transpiler": "babel",
  "babelOptions": {
    "stage": 0,
    "optional": [
      "runtime"
    ]
  },
  "paths": {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  "packages": {
    ".": {
      "defaultExtension": "js",
      "main": "src/main",
      "meta": {
        "*.jsx": {
          "loader": "jsx"
        }
      }
    }
  }
});
```

## License
MIT
