/* */ 
(function(process) {
  Autolinker.matchParser.MatchParser = Autolinker.Util.extend(Object, {
    urls: true,
    email: true,
    twitter: true,
    stripPrefix: true,
    matcherRegex: (function() {
      var twitterRegex = /(^|[^\w])@(\w{1,15})/,
          emailRegex = /(?:[\-;:&=\+\$,\w\.]+@)/,
          protocolRegex = /(?:[A-Za-z][-.+A-Za-z0-9]+:(?![A-Za-z][-.+A-Za-z0-9]+:\/\/)(?!\d+\/?)(?:\/\/)?)/,
          wwwRegex = /(?:www\.)/,
          domainNameRegex = /[A-Za-z0-9\.\-]*[A-Za-z0-9\-]/,
          tldRegex = /\.(?:international|construction|contractors|enterprises|photography|productions|foundation|immobilien|industries|management|properties|technology|christmas|community|directory|education|equipment|institute|marketing|solutions|vacations|bargains|boutique|builders|catering|cleaning|clothing|computer|democrat|diamonds|graphics|holdings|lighting|partners|plumbing|supplies|training|ventures|academy|careers|company|cruises|domains|exposed|flights|florist|gallery|guitars|holiday|kitchen|neustar|okinawa|recipes|rentals|reviews|shiksha|singles|support|systems|agency|berlin|camera|center|coffee|condos|dating|estate|events|expert|futbol|kaufen|luxury|maison|monash|museum|nagoya|photos|repair|report|social|supply|tattoo|tienda|travel|viajes|villas|vision|voting|voyage|actor|build|cards|cheap|codes|dance|email|glass|house|mango|ninja|parts|photo|shoes|solar|today|tokyo|tools|watch|works|aero|arpa|asia|best|bike|blue|buzz|camp|club|cool|coop|farm|fish|gift|guru|info|jobs|kiwi|kred|land|limo|link|menu|mobi|moda|name|pics|pink|post|qpon|rich|ruhr|sexy|tips|vote|voto|wang|wien|wiki|zone|bar|bid|biz|cab|cat|ceo|com|edu|gov|int|kim|mil|net|onl|org|pro|pub|red|tel|uno|wed|xxx|xyz|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw)\b/,
          urlSuffixRegex = /[\-A-Za-z0-9+&@#\/%=~_()|'$*\[\]?!:,.;]*[\-A-Za-z0-9+&@#\/%=~_()|'$*\[\]]/;
      return new RegExp(['(', twitterRegex.source, ')', '|', '(', emailRegex.source, domainNameRegex.source, tldRegex.source, ')', '|', '(', '(?:', '(', protocolRegex.source, domainNameRegex.source, ')', '|', '(?:', '(.?//)?', wwwRegex.source, domainNameRegex.source, ')', '|', '(?:', '(.?//)?', domainNameRegex.source, tldRegex.source, ')', ')', '(?:' + urlSuffixRegex.source + ')?', ')'].join(""), 'gi');
    })(),
    charBeforeProtocolRelMatchRegex: /^(.)?\/\//,
    constructor: function(cfg) {
      Autolinker.Util.assign(this, cfg);
      this.matchValidator = new Autolinker.MatchValidator();
    },
    replace: function(text, replaceFn, contextObj) {
      var me = this;
      return text.replace(this.matcherRegex, function(matchStr, $1, $2, $3, $4, $5, $6, $7, $8) {
        var matchDescObj = me.processCandidateMatch(matchStr, $1, $2, $3, $4, $5, $6, $7, $8);
        if (!matchDescObj) {
          return matchStr;
        } else {
          var replaceStr = replaceFn.call(contextObj, matchDescObj.match);
          return matchDescObj.prefixStr + replaceStr + matchDescObj.suffixStr;
        }
      });
    },
    processCandidateMatch: function(matchStr, twitterMatch, twitterHandlePrefixWhitespaceChar, twitterHandle, emailAddressMatch, urlMatch, protocolUrlMatch, wwwProtocolRelativeMatch, tldProtocolRelativeMatch) {
      var protocolRelativeMatch = wwwProtocolRelativeMatch || tldProtocolRelativeMatch,
          match,
          prefixStr = "",
          suffixStr = "";
      if ((twitterMatch && !this.twitter) || (emailAddressMatch && !this.email) || (urlMatch && !this.urls) || !this.matchValidator.isValidMatch(urlMatch, protocolUrlMatch, protocolRelativeMatch)) {
        return null;
      }
      if (this.matchHasUnbalancedClosingParen(matchStr)) {
        matchStr = matchStr.substr(0, matchStr.length - 1);
        suffixStr = ")";
      }
      if (emailAddressMatch) {
        match = new Autolinker.match.Email({
          matchedText: matchStr,
          email: emailAddressMatch
        });
      } else if (twitterMatch) {
        if (twitterHandlePrefixWhitespaceChar) {
          prefixStr = twitterHandlePrefixWhitespaceChar;
          matchStr = matchStr.slice(1);
        }
        match = new Autolinker.match.Twitter({
          matchedText: matchStr,
          twitterHandle: twitterHandle
        });
      } else {
        if (protocolRelativeMatch) {
          var charBeforeMatch = protocolRelativeMatch.match(this.charBeforeProtocolRelMatchRegex)[1] || "";
          if (charBeforeMatch) {
            prefixStr = charBeforeMatch;
            matchStr = matchStr.slice(1);
          }
        }
        match = new Autolinker.match.Url({
          matchedText: matchStr,
          url: matchStr,
          protocolUrlMatch: !!protocolUrlMatch,
          protocolRelativeMatch: !!protocolRelativeMatch,
          stripPrefix: this.stripPrefix
        });
      }
      return {
        prefixStr: prefixStr,
        suffixStr: suffixStr,
        match: match
      };
    },
    matchHasUnbalancedClosingParen: function(matchStr) {
      var lastChar = matchStr.charAt(matchStr.length - 1);
      if (lastChar === ')') {
        var openParensMatch = matchStr.match(/\(/g),
            closeParensMatch = matchStr.match(/\)/g),
            numOpenParens = (openParensMatch && openParensMatch.length) || 0,
            numCloseParens = (closeParensMatch && closeParensMatch.length) || 0;
        if (numOpenParens < numCloseParens) {
          return true;
        }
      }
      return false;
    }
  });
})(require('process'));
