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
  snippetItem = snippetItem.toJS();
  let warehouseId = snippetItem.warehouseId;
  let definition = state.getIn(['tables', snippetItem.snippet_type, warehouseId]);
  let templatePath = `/warehouse/${warehouseId}.html`;
  return state.getIn(['/engine', 'renderer'])(templatePath, {
    snippet: snippetItem
  });
}

export default {
  embedCode,
  detailLink,
  preview,
  render
};
