/* */ 
(function(process) {
  var Autolinker = function(cfg) {
    Autolinker.Util.assign(this, cfg);
  };
  Autolinker.prototype = {
    constructor: Autolinker,
    urls: true,
    email: true,
    twitter: true,
    newWindow: true,
    stripPrefix: true,
    truncate: undefined,
    className: "",
    htmlParser: undefined,
    matchParser: undefined,
    tagBuilder: undefined,
    link: function(textOrHtml) {
      var htmlParser = this.getHtmlParser(),
          htmlNodes = htmlParser.parse(textOrHtml),
          anchorTagStackCount = 0,
          resultHtml = [];
      for (var i = 0,
          len = htmlNodes.length; i < len; i++) {
        var node = htmlNodes[i],
            nodeType = node.getType(),
            nodeText = node.getText();
        if (nodeType === 'element') {
          if (node.getTagName() === 'a') {
            if (!node.isClosing()) {
              anchorTagStackCount++;
            } else {
              anchorTagStackCount = Math.max(anchorTagStackCount - 1, 0);
            }
          }
          resultHtml.push(nodeText);
        } else if (nodeType === 'entity') {
          resultHtml.push(nodeText);
        } else {
          if (anchorTagStackCount === 0) {
            var linkifiedStr = this.linkifyStr(nodeText);
            resultHtml.push(linkifiedStr);
          } else {
            resultHtml.push(nodeText);
          }
        }
      }
      return resultHtml.join("");
    },
    linkifyStr: function(str) {
      return this.getMatchParser().replace(str, this.createMatchReturnVal, this);
    },
    createMatchReturnVal: function(match) {
      var replaceFnResult;
      if (this.replaceFn) {
        replaceFnResult = this.replaceFn.call(this, this, match);
      }
      if (typeof replaceFnResult === 'string') {
        return replaceFnResult;
      } else if (replaceFnResult === false) {
        return match.getMatchedText();
      } else if (replaceFnResult instanceof Autolinker.HtmlTag) {
        return replaceFnResult.toString();
      } else {
        var tagBuilder = this.getTagBuilder(),
            anchorTag = tagBuilder.build(match);
        return anchorTag.toString();
      }
    },
    getHtmlParser: function() {
      var htmlParser = this.htmlParser;
      if (!htmlParser) {
        htmlParser = this.htmlParser = new Autolinker.htmlParser.HtmlParser();
      }
      return htmlParser;
    },
    getMatchParser: function() {
      var matchParser = this.matchParser;
      if (!matchParser) {
        matchParser = this.matchParser = new Autolinker.matchParser.MatchParser({
          urls: this.urls,
          email: this.email,
          twitter: this.twitter,
          stripPrefix: this.stripPrefix
        });
      }
      return matchParser;
    },
    getTagBuilder: function() {
      var tagBuilder = this.tagBuilder;
      if (!tagBuilder) {
        tagBuilder = this.tagBuilder = new Autolinker.AnchorTagBuilder({
          newWindow: this.newWindow,
          truncate: this.truncate,
          className: this.className
        });
      }
      return tagBuilder;
    }
  };
  Autolinker.link = function(textOrHtml, options) {
    var autolinker = new Autolinker(options);
    return autolinker.link(textOrHtml);
  };
  Autolinker.match = {};
  Autolinker.htmlParser = {};
  Autolinker.matchParser = {};
})(require('process'));
