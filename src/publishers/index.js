import _ from 'lodash';

export default function publish(store, publisher) {
  let state = store.getState();
  let apps = state.getIn(['/engine', 'apps']);
  let engine = _.find(apps, {baseUrl: '/engine'});
  let dashboard = _.find(apps, {baseUrl: '/'});
  let pushContentAction = _.flow(engine.actions.pushContent, store.dispatch);

  function pushContent(path, content, mimetype) {
    pushContentAction(path, content, mimetype);
    return publisher.pushContent(path, content, mimetype);
  }

  var appPublishes = _.filter(_.map(apps, app => {
    if (app.publish) {
      return app.publish(state, pushContent);
    }
    return null;
  }));

  console.log("app publishes:", appPublishes);

  return store.dispatch({
    type: 'PUBLISH',
    promise: Promise.all(appPublishes).then(() => {
      return publisher.done ? publisher.done() : Promise.resolve(null);
    }).then(() => {
      return publisher.view();
    })
  }).catch(error => {
    console.error(error);
    store.dispatch(dashboard.actions.addAlert('error', 'Publish failed: '+error))
  });
}
