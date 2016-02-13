export function getTemplates(type, tags) {
  return function(state) {
    return state.getIn(['tables', '/templates']).filter(tmp => {
      return tmp.get('type') === type;
    });
  }
}
