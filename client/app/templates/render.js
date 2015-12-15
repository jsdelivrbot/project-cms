import path from 'path';
import swig from 'swig';
import {markdownFilter} from './filters';

/*
  Swig renderer tied to our template store
  Caches compiled templates and invalidates cache if template has been updated
*/

function storeLoader(store) {
  return {
    resolve: function (to, from) {
      if (!from) from = '/';
      var rPath = path.resolve(from, to);
      //console.log(`resolve: ${to} (${from}) => ${rPath}`);
      return rPath;
    },
    load: function (identifier, cb) {
      var tpl = store.getState().getIn(['/templates', identifier]);
      if (tpl) {
        if (cb) return cb(null, tpl.content);
        return tpl.content
      } else {
        if (cb) return cb(new Error('Template not found'));
        throw new Error('Template not found');
      }
    }
  };
}

/*
  Given a redux store, return a rendering function
*/
export default function renderFactory(store) {
  // Tell swig about the loader:
  swig.setDefaults({
    loader: storeLoader(store),
    cache: false //TODO pass in get & set object with our own cache logic
  });

  swig.setFilter('markdown', markdownFilter);

  var templatesCache = {}; // path: {renderF, template}

  function getRenderer(templateKey) {
    //console.log("getRenderer", templateKey)
    var cached = templatesCache[templateKey];
    var template = store.getState().getIn(['/templates', templateKey]).content;

    //if cache is up to date, return cached render
    if (cached && cached.template === template) {
      return cached.renderF;
    }

    console.log("compile template:", templateKey);
    //update cache and return new render function
    var renderF = swig.compileFile(templateKey);

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
