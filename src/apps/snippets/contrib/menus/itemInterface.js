import React from 'react';


export function embedCode(snippetItem) {
  const key = snippetItem.get('key');
  return `{% snippet "${key}"/>`;
}

export function detailLink(snippetItem) {
  return snippetItem.get('snippet_type') + "/" + snippetItem.get('id');
}

export function preview(snippetItem) {
  return snippetItem.get('key');
}

export function render(state, snippetItem) {
  return state.getIn('/engine', 'renderer')(snippetItem.get('template_name'), {
    menu: snippetItem.toJS()
  });
}

export default {
  embedCode,
  detailLink,
  preview,
  render
};
