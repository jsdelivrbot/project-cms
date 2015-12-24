/* */ 
'use strict';
var parseLinkLabel = require('../helpers/parse_link_label');
module.exports = function footnote_inline(state, silent) {
  var labelStart,
      labelEnd,
      footnoteId,
      oldLength,
      max = state.posMax,
      start = state.pos;
  if (start + 2 >= max) {
    return false;
  }
  if (state.src.charCodeAt(start) !== 0x5E) {
    return false;
  }
  if (state.src.charCodeAt(start + 1) !== 0x5B) {
    return false;
  }
  if (state.level >= state.options.maxNesting) {
    return false;
  }
  labelStart = start + 2;
  labelEnd = parseLinkLabel(state, start + 1);
  if (labelEnd < 0) {
    return false;
  }
  if (!silent) {
    if (!state.env.footnotes) {
      state.env.footnotes = {};
    }
    if (!state.env.footnotes.list) {
      state.env.footnotes.list = [];
    }
    footnoteId = state.env.footnotes.list.length;
    state.pos = labelStart;
    state.posMax = labelEnd;
    state.push({
      type: 'footnote_ref',
      id: footnoteId,
      level: state.level
    });
    state.linkLevel++;
    oldLength = state.tokens.length;
    state.parser.tokenize(state);
    state.env.footnotes.list[footnoteId] = {tokens: state.tokens.splice(oldLength)};
    state.linkLevel--;
  }
  state.pos = labelEnd + 1;
  state.posMax = max;
  return true;
};
