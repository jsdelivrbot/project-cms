/* */ 
(function() {
    'use strict';

    var expect, util, lib, Environment, Loader, templatesPath;

    if(typeof require !== 'undefined') {
        expect = require('expect.js');
        util = require('./util');
        lib = require('../src/lib');
        Environment = require('../src/environment').Environment;
        Loader = require('../src/node-loaders').FileSystemLoader;
        templatesPath = 'tests/templates';
    }
    else {
        expect = window.expect;
        util = window.util;
        lib = nunjucks.lib;
        Environment = nunjucks.Environment;
        Loader = nunjucks.WebLoader;
        templatesPath = '../templates';
    }

    var equal = util.equal;
    var finish = util.finish;

    describe('global', function() {
        it('should have range', function(done) {
            equal('{% for i in range(0, 10) %}{{ i }}{% endfor %}', '0123456789');
            equal('{% for i in range(10) %}{{ i }}{% endfor %}', '0123456789');
            equal('{% for i in range(5, 10) %}{{ i }}{% endfor %}', '56789');
            equal('{% for i in range(5, 10, 2) %}{{ i }}{% endfor %}', '579');
            equal('{% for i in range(5, 10, 2.5) %}{{ i }}{% endfor %}', '57.5');
            equal('{% for i in range(5, 10, 2.5) %}{{ i }}{% endfor %}', '57.5');

            equal('{% for i in range(10, 5, -1) %}{{ i }}{% endfor %}', '109876');
            equal('{% for i in range(10, 5, -2.5) %}{{ i }}{% endfor %}', '107.5');

            finish(done);
        });

        it('should have cycler', function(done) {
            equal('{% set cls = cycler("odd", "even") %}' +
                  '{{ cls.next() }}' +
                  '{{ cls.next() }}' +
                  '{{ cls.next() }}',
                  'oddevenodd');

            equal('{% set cls = cycler("odd", "even") %}' +
                  '{{ cls.next() }}' +
                  '{{ cls.reset() }}' +
                  '{{ cls.next() }}',
                  'oddodd');

            equal('{% set cls = cycler("odd", "even") %}' +
                  '{{ cls.next() }}' +
                  '{{ cls.next() }}' +
                  '{{ cls.current }}',
                  'oddeveneven');

            finish(done);
        });

        it('should have joiner', function(done) {
            equal('{% set comma = joiner() %}' +
                          'foo{{ comma() }}bar{{ comma() }}baz{{ comma() }}',
                  'foobar,baz,');

            equal('{% set pipe = joiner("|") %}' +
                  'foo{{ pipe() }}bar{{ pipe() }}baz{{ pipe() }}',
                  'foobar|baz|');

            finish(done);
        });

        it('should allow addition of globals', function(done) {
          var env = new Environment(new Loader(templatesPath));

          env.addGlobal('hello', function(arg1) {
            return 'Hello ' + arg1;
          });

          equal('{{ hello("World!") }}', 'Hello World!', env);

          finish(done);
        });

        it('should allow chaining of globals', function(done) {
          var env = new Environment(new Loader(templatesPath));

          env.addGlobal('hello', function(arg1) {
            return 'Hello ' + arg1;
          }).addGlobal('goodbye', function(arg1) {
            return 'Goodbye ' + arg1;
          });

          equal('{{ hello("World!") }}', 'Hello World!', env);
          equal('{{ goodbye("World!") }}', 'Goodbye World!', env);

          finish(done);
        });

        it('should allow getting of globals', function(done) {
            var env = new Environment(new Loader(templatesPath));
            var hello = function(arg1) {
                return 'Hello ' + arg1;
            };

            env.addGlobal('hello', hello);

            expect(env.getGlobal('hello')).to.be.equal(hello);

            finish(done);
        });

        it('should fail on getting non-existent global', function(done) {
            var env = new Environment(new Loader(templatesPath));

            // Using this format instead of .withArgs since env.getGlobal uses 'this'
            expect(function() { env.getGlobal('hello') }).to.throwError();

            finish(done);
        });

        it('should pass context as this to global functions', function(done) {
            var env = new Environment(new Loader(templatesPath));

            env.addGlobal('hello', function() {
                return 'Hello ' + this.lookup('user');
            });

            equal('{{ hello() }}', { user: 'James' }, 'Hello James', env);
            finish(done);
        });

        it('should be exclusive to each environment', function(done) {
          var env = new Environment(new Loader(templatesPath));
          var env2;

          env.addGlobal('hello', 'konichiwa');
          env2 = new Environment(new Loader(templatesPath));

          // Using this format instead of .withArgs since env2.getGlobal uses 'this'
          expect(function() { env2.getGlobal('hello') }).to.throwError();

          finish(done);
        });
    });
})();
