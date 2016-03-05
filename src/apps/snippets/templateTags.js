//env.addExtension('SnippetExtension', new SnippetExtension());
import _ from 'lodash';
import nunjucks from 'nunjucks/browser/nunjucks.js';


export function SnippetsExtension({getState}) {
    this.tags = ['snippet'];

    this.parse = function(parser, nodes, lexer) {
        // get the tag token
        var tok = parser.nextToken();

        // parse the args and move after the block end. passing true
        // as the second arg is required if there are no parentheses
        var args = parser.parseSignature(null, true); //TODO parse options?
        parser.advanceAfterBlockEnd(tok.value);

        //parser.advanceAfterBlockEnd();

        // See above for notes about CallExtension
        return new nodes.CallExtensionAsync(this, 'run', args);
    };

    this.run = function(context, key, /*options,*/ callback) {
      console.log("Snippets run:", arguments)
      let state = getState();
      let snippet = state.getIn(['tables', '/snippets']).find(x => x.get('key') === key);
      if (!snippet) {
        console.warn('Snippet not found during render:', key)
        return callback('');
      }
      let provider = _.find(state.getIn(['/engine', 'apps']), {baseUrl: snippet.get('snippet_type')});
      if (!provider) {
        console.warn('Snippet type not found during render:', snippet.get('snippet_type'))
        return callback('')
      }
      if (!provider.itemInterface || !provider.itemInterface.render) {
        console.warn('Snippet provider does not define render item interface', provider)
        return callback('')
      }
      provider.itemInterface.render(state, snippet).then(content => {
        callback(null, new nunjucks.runtime.SafeString(content));
      }).catch(error => {
        callback(error);
      });
    };
}

export default {SnippetsExtension}
