import _ from 'lodash';


export function getTemplates(type, tags) {
  return function(state) {
    return state.getIn(['tables', '/templates']).filter(tmp => {
      return tmp.get('type') === type;
    });
  }
}

export function mediaSidebar(state) {
  let mediaApp = _.find(state.getIn(['/engine', 'apps']), {baseUrl: '/media'});
  return (mediaApp && mediaApp.embeddableComponents) ? mediaApp.embeddableComponents.mediaSidebar : null;
}
