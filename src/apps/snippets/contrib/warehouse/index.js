import {connect} from 'react-redux'
import _ from 'lodash';

import EditSnippet from './components/EditSnippet.jsx';
import AddSnippet from './components/AddSnippet.jsx';
import DefinitionList from './components/DefinitionList.jsx';
import ImportDefinition from './components/ImportDefinition.jsx';
import AddDefinition from './components/AddDefinition.jsx';
import EditDefinition from './components/EditDefinition.jsx';
import DefinitionForm from './components/DefinitionForm.jsx';

import actions from './actions';
import itemInterface from './itemInterface';
import fixtures from './fixtures';


export default function SnippetsApplicationFactory(baseUrl) {
  function snippetAddLinks(state) {
    let definitions = state.getIn(['tables', baseUrl]);
    return definitions.map(definition => {
      return {
        link: baseUrl+'/add/'+definition.get('id'),
        title: definition.get('description'),
      }
    }).toArray();
  }

  function snippetServiceLinks() {
    return [{
      link: baseUrl,
      title: 'Warehouse',
    }];
  }

  return {
    type: 'snippets provider',
    actions,
    title: 'Warehouse Snippets',
    itemInterface,
    fixtures,
    tables: [baseUrl],
    snippetAddLinks,
    snippetServiceLinks,
    routes: {
      path: baseUrl,
      component: 'div',
      indexRoute: {
        component: connect((state, props) => {
          return {
            baseUrl: baseUrl,
            definitions: state.getIn(['tables', baseUrl]),
          }
        })(DefinitionList)
      },
      childRoutes: [{
        path: 'import-definition',
        component: connect((state, props) => {
          return {
            baseUrl: baseUrl,
          }
        }, {
          addDefinition: _.partial(actions.addDefinition, baseUrl),
        })(ImportDefinition)
      }, {
        path: 'add-definition',
        component: connect((state, props) => {
          return {
            baseUrl: baseUrl,
          }
        }, {
          addDefinition: _.partial(actions.addDefinition, baseUrl),
        })(AddDefinition)
      }, {
        path: 'edit-definition/:warehouseId',
        component: connect((state, props) => {
          let warehouseId = props.params.warehouseId;
          let templatePath = `/warehouse/${warehouseId}.html`;
          return {
            baseUrl: baseUrl,
            definition: state.getIn(['tables', baseUrl, warehouseId]),
            templateSource: state.getIn(['tables', '/templates', templatePath, 'content'])
          }
        }, {
          updateDefinition: _.partial(actions.updateDefinition, baseUrl),
          removeDefinition: _.partial(actions.removeDefinition, baseUrl),
        })(EditDefinition)
      }, {
        path: 'add/:warehouseId',
        component: connect((state, props) => {
          return {
            baseUrl: baseUrl,
            snippetDefinition: state.getIn(['tables', baseUrl, props.params.warehouseId]),
            Form: DefinitionForm,
          }
        }, {
          addSnippet: _.partial(actions.addSnippet, baseUrl),
        })(AddSnippet)
      }, {
        path: ':id',
        component: connect((state, props) => {
          let snippet = state.getIn(['tables', '/snippets', props.params.id]);
          return {
            baseUrl: baseUrl,
            id: props.params.id,
            snippet: snippet,
            snippetDefinition: state.getIn(['tables', baseUrl, snippet.get('warehouseId')]),
            Form: DefinitionForm,
          }
        }, {
          updateSnippet: _.partial(actions.updateSnippet, baseUrl),
          removeSnippet: _.partial(actions.removeSnippet, baseUrl),
        })(EditSnippet)
      }]
    }
  }
}
