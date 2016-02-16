import nunjucks from 'nunjucks/browser/nunjucks.js';
import Obj from 'nunjucks/src/object';
import _ from 'lodash';
import {markdownFilter, refFilter, thumbnailFilter} from './filters';

console.log("nunjucks:", nunjucks)

/*
  Nunjucks renderer tied to our template store
  Caches compiled templates and invalidates cache if template has been updated
*/

const lib = nunjucks.lib;

//Why doesn't nunjucks export this???
//https://github.com/mozilla/nunjucks/issues/674
var Context = Obj.extend({
    init: function(ctx, blocks, env) {
        // Has to be tied to an environment so we can tap into its globals.
        this.env = env //|| new Environment();

        // Make a duplicate of ctx
        this.ctx = {};
        for(var k in ctx) {
            if(ctx.hasOwnProperty(k)) {
                this.ctx[k] = ctx[k];
            }
        }

        this.blocks = {};
        this.exported = [];

        for(var name in blocks) {
            this.addBlock(name, blocks[name]);
        }
    },

    lookup: function(name) {
        // This is one of the most called functions, so optimize for
        // the typical case where the name isn't in the globals
        if(name in this.env.globals && !(name in this.ctx)) {
            return this.env.globals[name];
        }
        else {
            return this.ctx[name];
        }
    },

    setVariable: function(name, val) {
        this.ctx[name] = val;
    },

    getVariables: function() {
        return this.ctx;
    },

    addBlock: function(name, block) {
        this.blocks[name] = this.blocks[name] || [];
        this.blocks[name].push(block);
        return this;
    },

    getBlock: function(name) {
        if(!this.blocks[name]) {
            throw new Error('unknown block "' + name + '"');
        }

        return this.blocks[name][0];
    },

    getSuper: function(env, name, block, frame, runtime, cb) {
        var idx = lib.indexOf(this.blocks[name] || [], block);
        var blk = this.blocks[name][idx + 1];
        var context = this;

        if(idx === -1 || !blk) {
            throw new Error('no super block available for "' + name + '"');
        }

        blk(env, context, frame, runtime, cb);
    },

    addExport: function(name) {
        this.exported.push(name);
    },

    getExported: function() {
        var exported = {};
        for(var i=0; i<this.exported.length; i++) {
            var name = this.exported[i];
            exported[name] = this.ctx[name];
        }
        return exported;
    }
});

function storeLoader(store) {
  return {
    getSource: function (identifier) {
      var tpl = store.getState().getIn(['tables', '/templates', identifier, 'content']);
      if (tpl) {
        return {
          path: identifier,
          src: tpl,
          noCache: true
        }
      } else {
        throw new Error('Template not found');
      }
    }
  };
}

/*
  Given a redux store, return a rendering function
*/
export default function renderFactory(store) {
  //construct nunjucks environment with our own custom caching mechanism
  let env = new nunjucks.Environment(storeLoader(store), {
    noCache: true
  });

  let apps = store.getState().getIn(['/engine', 'apps']);
  apps.forEach(app => {
    if (app.templateTags) {
      _.each(app.templateTags, (tag, tagname) => {
        env.addExtension(tagname, new tag(store));
      });
    }
    if (app.templateFilters) {
      _.each(app.templateFilters, (filter, filtername) => {
        env.addFilter(filtername, filter(store), filter.async);
      });
    }
  });

  env.addFilter('markdown', markdownFilter);
  env.addFilter('ref', _.partial(refFilter, store.getState));
  env.addFilter('thumbnail', _.partial(thumbnailFilter, store.dispatch), true);

  var templatesCache = {}; // path: {content, template}

  function getTemplate(templateKey) {
    //console.log("getRenderer", templateKey)
    var cached = templatesCache[templateKey];
    var content = store.getState().getIn(['tables', '/templates', templateKey, 'content']);

    //if cache is up to date, return cached render
    if (cached && cached.content === content) {
      return cached.template;
    }

    console.log("compile template:", templateKey);
    //update cache and return new template
    var template = nunjucks.compile(content, env, templateKey, true);

    templatesCache[templateKey] = {
      template,
      content
    }
    return template;
  }

  return function render(templateKey, ctx, blocks=false) {
    //TODO pluggable way to inject global rendering context
    let site = store.getState().getIn(['tables', '/site', 'site']).toJS();
    ctx = _.assign({}, ctx, {site});
    var template = getTemplate(templateKey);
    if (blocks) {
      var renderedBlocks = {};
      //console.log("rendering blocks:", blocks, template);
      let context = new Context(ctx, template.blocks, env)

      let promises = _.map(template.blocks, (renderBlock, blockName) => {
        return new Promise(function(resolve, reject) {
          //(env, context, frame, runtime, cb)
          let frame = new nunjucks.runtime.Frame();

          renderBlock(env, context, frame, nunjucks.runtime, (error, content) => {
            if (error) {
              reject(error)
            } else {
              renderedBlocks[blockName] = content;
              resolve(content);
            }
          });
        })
      });

      return Promise.all(promises).then(contents => renderedBlocks);
    } else {
      return new Promise(function(resolve, reject) {
        template.render(ctx, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    }
  }
}
