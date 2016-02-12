import nunjucks from 'nunjucks/browser/nunjucks.js';
import {markdownFilter} from './filters';

console.log("nunjucks", nunjucks)

/*
  Nunjucks renderer tied to our template store
  Caches compiled templates and invalidates cache if template has been updated
*/

function storeLoader(store) {
  return {
    getSource: function (identifier) {
      console.log("getSource", identifier);
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

  env.addFilter('markdown', markdownFilter);

  var templatesCache = {}; // path: {renderF, template}

  function getRenderer(templateKey) {
    //console.log("getRenderer", templateKey)
    var cached = templatesCache[templateKey];
    var template = store.getState().getIn(['tables', '/templates', templateKey, 'content']);

    //if cache is up to date, return cached render
    if (cached && cached.template === template) {
      return cached.renderF;
    }

    console.log("compile template:", templateKey);
    //update cache and return new render function
    /*
    templateObj = nunjucks.compiler.compile(template,
                                   env.asyncFilters,
                                   env.extensionsList,
                                   templateKey,
                                   env.opts);
    */
    var templateObj = nunjucks.compile(template, env, templateKey, true);
    console.log("compiled to:", templateObj);
    var renderF = templateObj.render.bind(templateObj);
    /*
    var renderF = nunjucks.precompile(templateKey, {
      asFunction: true,
      env
    });
    */

    templatesCache[templateKey] = {
      renderF,
      template
    }
    return renderF;
  }

  return function render(templateKey, context) {
    var renderF = getRenderer(templateKey);
    return renderF(context);
  }
}
