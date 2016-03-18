import _ from 'lodash';
import {v4} from 'node-uuid';

export function addSnippet(baseUrl, snippet) {
  let snippetId = v4();

  snippet = _.assign({
    id: snippetId,
    snippet_type: baseUrl,
  }, snippet);

  return {
    type: 'ADD_SNIPPET',
    snippetId,
    snippet,
    record_change: {
      new_object: snippet,
      table_name: '/snippets',
      object_id: snippetId
    },
    alert_message: `Added snippet`,
    next_url: `${baseUrl}/${snippetId}`
  };
}

export function updateSnippet(baseUrl, snippetId, snippet) {
  return {
    type: 'UPDATE_SNIPPET',
    snippetId,
    record_change: {
      update_object: snippet,
      table_name: '/snippets',
      object_id: snippetId
    },
    alert_message: `Updated snippet`
  };
}

export function removeSnippet(baseUrl, snippetId) {
  return {
    type: 'REMOVE_SNIPPET',
    snippetId,
    record_change: {
      remove_object: snippetId,
      table_name: '/snippets',
      object_id: snippetId
    },
    alert_message: `Removed snippet`,
    next_url: baseUrl
  };
}

export function addDefinition(baseUrl, definition) {
  let warehouseId = definition.id;
  let templateSource = definition.templateSource;
  delete definition.templateSource;
  let templatePath = `/warehouse/${warehouseId}.html`;

  return {
    type: 'ADD_DEFINITION',
    warehouseId,
    definition,
    record_changes: [{
      new_object: {
        path: templatePath,
        content: templateSource,
        type: 'partial',
      },
      table_name: '/templates',
      object_id: templatePath
    }, {
      new_object: definition,
      table_name: baseUrl,
      object_id: warehouseId
    }],
    alert_message: `Added definition`,
    next_url: `${baseUrl}/edit-definition/${warehouseId}`
  };
}

export function updateDefinition(baseUrl, warehouseId, definition) {
  let templateSource = definition.templateSource;
  delete definition.templateSource;
  let templatePath = `/warehouse/${warehouseId}.html`;

  return {
    type: 'UPDATE_DEFINITION',
    warehouseId,
    record_changes: [{
      update_object: {
        path: templatePath,
        content: templateSource,
        type: 'partial',
      },
      table_name: '/templates',
      object_id: templatePath
    },{
      update_object: definition,
      table_name: baseUrl,
      object_id: warehouseId
    }],
    alert_message: `Updated defintion`
  };
}

export function removeDefinition(baseUrl, warehouseId) {
  //CONSIDER: do we also remove the template? others may have referenced
  return {
    type: 'REMOVE_DEFINITION',
    warehouseId,
    record_change: {
      remove_object: warehouseId,
      table_name: baseUrl,
      object_id: warehouseId
    },
    alert_message: `Removed definition`,
    next_url: baseUrl
  };
}


export default {addSnippet, updateSnippet, removeSnippet, addDefinition, updateDefinition, removeDefinition}
