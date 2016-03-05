import {connect} from 'react-redux'
import _ from 'lodash';

import EditTemplateSettings from './components/EditTemplateSettings.jsx';
import AddTemplateSettings from './components/AddTemplateSettings.jsx';
import TemplateSettingsList from './components/TemplateSettingsList.jsx';
import ExtraForm from './components/ExtraForm.jsx';

import actions from './actions';

import {getTemplates} from '~/plugins';

/*
CONSIDER appMiddleware:
  TemplateSettingsAppMiddleware(myApp) =>
  inject tables
  inject childRoutes

  how would it inject templates into props?
  if path == 'add' or path == ':id'
    component = connect(state)(already connected component)
    provides templates, ExtraForm

  AddPage.jsx needs to know of extra fields, render <props.ExtraForm onValue={(value, key) => doState} value={object.state} template={object.template}/>
  Or imports ExtraForm <ExtraForm onValue={(value, key) => doState} value={object.state} template={object.template} baseUrl={baseUrl}/>
*/


export default function templateSettingsMiddleware(appFactory, namespace='templates') {
  let getAppTemplates = getTemplates('page');

  return function(baseUrl, ...args) {
    let app = appFactory(baseUrl, ...args);
    let tableName = `${baseUrl}/${namespace}`;

    app.tables.push(tableName);

    function getExtraForm(props, context) {
      props = {
        tableName,
        ...props
      };
      return ExtraForm(props, context);
    }

    function getConfiguredTemplates(state) {
      //only template names or template objects?
      return {
        templates: state.getIn(['tables', tableName]),
        ExtraForm: getExtraForm,
      }
    }

    _.each(app.routes.childRoutes, route => {
      switch(route.path) {
        case "add":
          route.component = connect(getConfiguredTemplates)(route.component);
        case ":id":
          route.component = connect(getConfiguredTemplates)(route.component);
      }
    });


    let extraRoutes = [{
      path: namespace,
      component: connect(state => {
        return {
          baseUrl: tableName,
          templates: state.getIn(['tables', tableName]),
        }
      })(TemplateSettingsList)
    }, {
      path: `${namespace}/add`,
      component: connect(state => {
        return {
          baseUrl: tableName,
          availableTemplates: getAppTemplates(state) //TODO filter out existing configs
        }
      }, {
        addTemplateSettings: _.partial(actions.addTemplateSettings, tableName),
      })(AddTemplateSettings)
    }, {
      path: `${namespace}/**`,
      component: connect((state, props) => {
        let path = props.params.splat;
        return {
          baseUrl: tableName,
          path,
          template: state.getIn(['tables', tableName, path]),
        }
      }, {
        updateTemplateSettings: _.partial(actions.updateTemplateSettings, tableName),
        removeTemplateSettings: _.partial(actions.removeTemplateSettings, tableName),
      })(EditTemplateSettings)
    }];


    app.routes.childRoutes = extraRoutes.concat(app.routes.childRoutes);

    return app;
  }
}
