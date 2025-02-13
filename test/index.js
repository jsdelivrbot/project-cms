//
// This tells SystemJS to load the mocha library
// and allows us to interact with the library below.
//
import mocha from 'mocha';
import _modernize from '~/shims';


//
// If you have a global or two that get exposed from your
// tests that is expected you can include them here
//
const allowedMochaGlobals = [
  'jQuery',
  'require',
  'module_path',
  'nunjucks',
  'resample_hermite',
];


//
// Importing mocha with JSPM and ES6 doesn't expose the usual mocha globals.
// I found this is one way to manually expose the globals, however if you know of a better way please let me know...
//
mocha.suite.on('pre-require', function(context) {
  var exports = window;

  exports.afterEach = context.afterEach || context.teardown;
  exports.after = context.after || context.suiteTeardown;
  exports.beforeEach = context.beforeEach || context.setup;
  exports.before = context.before || context.suiteSetup;
  exports.describe = context.describe || context.suite;
  exports.it = context.it || context.test;
  exports.setup = context.setup || context.beforeEach;
  exports.suiteSetup = context.suiteSetup || context.before;
  exports.suiteTeardown = context.suiteTeardown || context.after;
  exports.suite = context.suite || context.describe;
  exports.teardown = context.teardown || context.afterEach;
  exports.test = context.test || context.it;
  exports.run = context.run;
});

export default function(testScripts) {
  mocha.setup('bdd');
  // now use SystemJS to load all test files
  return Promise
    .all(testScripts.map(function(testScript) {
      return System.import(testScript);
    })).then(function() {
      mocha.checkLeaks();
      mocha.globals(allowedMochaGlobals);
      mocha.run();
    }, function(err) {
      console.error("Error loading test modules");
      console.error(err);
    });
}
