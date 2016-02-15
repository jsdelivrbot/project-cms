/* */ 
'use strict';
var parseLinkLabel = require('../helpers/parse_link_label');
var parseLinkDestination = require('../helpers/parse_link_destination');
var parseLinkTitle = require('../helpers/parse_link_title');
var normalizeReference = require('../helpers/normalize_reference');
module.exports = function links(state, silent) {
  var labelStart,
      labelEnd,
      label,
      href,
      title,
      pos,
      ref,
      code,
      isImage = false,
      oldPos = state.pos,
      max = state.posMax,
      start = state.pos,
      marker = state.src.charCodeAt(start);
  if (marker === 0x21) {
    isImage = true;
    marker = state.src.charCodeAt(++start);
  }
  if (marker !== 0x5B) {
    return false;
  }
  if (state.level >= state.options.maxNesting) {
    return false;
  }
  labelStart = start + 1;
  labelEnd = parseLinkLabel(state, start);
  if (labelEnd < 0) {
    return false;
  }
  pos = labelEnd + 1;
  if (pos < max && state.src.charCodeAt(pos) === 0x28) {
    pos++;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (code !== 0x20 && code !== 0x0A) {
        break;
      }
    }
    if (pos >= max) {
      return false;
    }
    start = pos;
    if (parseLinkDestination(state, pos)) {
      href = state.linkContent;
      pos = state.pos;
    } else {
      href = '';
    }
    start = pos;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (code !== 0x20 && code !== 0x0A) {
        break;
      }
    }
    if (pos < max && start !== pos && parseLinkTitle(state, pos)) {
      title = state.linkContent;
      pos = state.pos;
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (code !== 0x20 && code !== 0x0A) {
          break;
        }
      }
    } else {
      title = '';
    }
    if (pos >= max || state.src.charCodeAt(pos) !== 0x29) {
      state.pos = oldPos;
      return false;
    }
    pos++;
  } else {
    if (state.linkLevel > 0) {
      return false;
    }
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (code !== 0x20 && code !== 0x0A) {
        break;
      }
    }
    if (pos < max && state.src.charCodeAt(pos) === 0x5B) {
      start = pos + 1;
      pos = parseLinkLabel(state, pos);
      if (pos >= 0) {
        label = state.src.slice(start, pos++);
      } else {
        pos = start - 1;
      }
    }
    if (!label) {
      if (typeof label === 'undefined') {
        pos = labelEnd + 1;
      }
      label = state.src.slice(labelStart, labelEnd);
    }
    ref = state.env.references[normalizeReference(label)];
    if (!ref) {
      state.pos = oldPos;
      return false;
    }
    href = ref.href;
    title = ref.title;
  }
  if (!silent) {
    state.pos = labelStart;
    state.posMax = labelEnd;
    if (isImage) {
      state.push({
        type: 'image',
        src: href,
        title: title,
        alt: state.src.substr(labelStart, labelEnd - labelStart),
        level: state.level
      });
    } else {
      state.push({
        type: 'link_open',
        href: href,
        title: title,
        level: state.level++
      });
      state.linkLevel++;
      state.parser.tokenize(state);
      state.linkLevel--;
      state.push({
        type: 'link_close',
        level: --state.level
      });
    }
  }
  state.pos = pos;
  state.posMax = max;
  return true;
};
