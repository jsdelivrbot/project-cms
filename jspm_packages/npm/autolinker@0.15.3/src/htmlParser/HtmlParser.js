/* */ 
(function(process) {
  Autolinker.htmlParser.HtmlParser = Autolinker.Util.extend(Object, {
    htmlRegex: (function() {
      var tagNameRegex = /[0-9a-zA-Z][0-9a-zA-Z:]*/,
          attrNameRegex = /[^\s\0"'>\/=\x01-\x1F\x7F]+/,
          attrValueRegex = /(?:"[^"]*?"|'[^']*?'|[^'"=<>`\s]+)/,
          nameEqualsValueRegex = attrNameRegex.source + '(?:\\s*=\\s*' + attrValueRegex.source + ')?';
      return new RegExp(['(?:', '<(!DOCTYPE)', '(?:', '\\s+', '(?:', nameEqualsValueRegex, '|', attrValueRegex.source + ')', ')*', '>', ')', '|', '(?:', '<(/)?', '(' + tagNameRegex.source + ')', '(?:', '\\s+', nameEqualsValueRegex, ')*', '\\s*/?', '>', ')'].join(""), 'gi');
    })(),
    htmlCharacterEntitiesRegex: /(&nbsp;|&#160;|&lt;|&#60;|&gt;|&#62;|&quot;|&#34;|&#39;)/gi,
    parse: function(html) {
      var htmlRegex = this.htmlRegex,
          currentResult,
          lastIndex = 0,
          textAndEntityNodes,
          nodes = [];
      while ((currentResult = htmlRegex.exec(html)) !== null) {
        var tagText = currentResult[0],
            tagName = currentResult[1] || currentResult[3],
            isClosingTag = !!currentResult[2],
            inBetweenTagsText = html.substring(lastIndex, currentResult.index);
        if (inBetweenTagsText) {
          textAndEntityNodes = this.parseTextAndEntityNodes(inBetweenTagsText);
          nodes.push.apply(nodes, textAndEntityNodes);
        }
        nodes.push(this.createElementNode(tagText, tagName, isClosingTag));
        lastIndex = currentResult.index + tagText.length;
      }
      if (lastIndex < html.length) {
        var text = html.substring(lastIndex);
        if (text) {
          textAndEntityNodes = this.parseTextAndEntityNodes(text);
          nodes.push.apply(nodes, textAndEntityNodes);
        }
      }
      return nodes;
    },
    parseTextAndEntityNodes: function(text) {
      var nodes = [],
          textAndEntityTokens = Autolinker.Util.splitAndCapture(text, this.htmlCharacterEntitiesRegex);
      for (var i = 0,
          len = textAndEntityTokens.length; i < len; i += 2) {
        var textToken = textAndEntityTokens[i],
            entityToken = textAndEntityTokens[i + 1];
        if (textToken)
          nodes.push(this.createTextNode(textToken));
        if (entityToken)
          nodes.push(this.createEntityNode(entityToken));
      }
      return nodes;
    },
    createElementNode: function(tagText, tagName, isClosingTag) {
      return new Autolinker.htmlParser.ElementNode({
        text: tagText,
        tagName: tagName.toLowerCase(),
        closing: isClosingTag
      });
    },
    createEntityNode: function(text) {
      return new Autolinker.htmlParser.EntityNode({text: text});
    },
    createTextNode: function(text) {
      return new Autolinker.htmlParser.TextNode({text: text});
    }
  });
})(require('process'));
