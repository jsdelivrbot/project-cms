import assert from 'assert';
import {Map} from 'immutable';
import {appsLoader, loadAppsTables, loadAppsConfig, readAppsConfig, DEFAULT_APPS_CONFIG} from '~/appsLoader';
import {getStorage, destroy} from '~/reducers/tables';


describe("appsLoader module", function() {
  beforeEach(function() {
    let storage = getStorage();
    if (storage) return storage.destroy();
  });

  describe("appsLoader", function() {
    it("default settings returns a successful promise", function() {
      this.timeout(9000);
      return appsLoader();
    });
  });

  describe("loadAppsTables", function() {
    it("returns an empty Map if no apps are given", function() {
      return loadAppsTables().then(tables => {
        assert(Map.isMap(tables));
        assert.equal(tables.size, 0);
      });
    });

    it("loads initial fixture from app", function() {
      let apps = [{
        baseUrl: 'testing_foo',
        tables: ['testing_foo'],
        fixtures: { initial: { 'testing_foo': {
          somekey: { a: 1, b: 2 }
        }}}
      }];
      return loadAppsTables(apps).then(tables => {
        assert(Map.isMap(tables));
        assert.equal(tables.size, 1);
        assert.equal(tables.getIn(['testing_foo', 'somekey', 'a']), 1, tables.toJS());
      });
    });
  });

  describe("loadAppsConfig", function() {
    it("can load default apps", function() {
      return loadAppsConfig(DEFAULT_APPS_CONFIG);
    });
  });

  describe("readAppsConfig", function() {
    it("has defaults if none are specified", function() {
      return readAppsConfig().then(appsConfig => {
        assert.deepEqual(appsConfig, DEFAULT_APPS_CONFIG);
      })
    });
  });
});
