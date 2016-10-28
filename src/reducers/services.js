import {Map, fromJS} from 'immutable';
import querystring from 'querystring';
import {setStorage} from './tables';
import {loadUploader} from '~/middleware/uploader';


function loadItem(itemKey, defaultValue) {
  //detects service setting from storage or from query params
  //CONSIDER: password protected token that acts as a sharing url
  let item = localStorage.getItem(itemKey);
  if (item) {
    item = fromJS(JSON.parse(item));
  }
  if (!item) {
    let queryParamsStr = window.location.href.split('?')[1];
    let queryParams = querystring.parse(queryParamsStr)
    if (queryParams[itemKey]) {
      item = fromJS({ module: queryParams[itemKey] });
    }
  }
  return item ? item : fromJS(defaultValue);
}

export const INITIAL_STATE = Map({
  'database': loadItem('database-service', {module: '~/services/localdb'}),
  'hosting': loadItem('hosting-service', {module: '~/services/ipfs'}),
});

export default function servicesReducer(state=INITIAL_STATE, action) {
  switch(action.type) {
    case "SET_DATABASE_SERVICE":
      var config = action.config;
      localStorage.setItem('database-service', JSON.stringify(config));
      return state.set('database', fromJS(config));
    //CONSIDER: hosting vs publisher vs uploader disambig
    case "SET_HOSTING_SERVICE":
      var config = action.config;
      localStorage.setItem('hosting-service', JSON.stringify(config));
      return state.set('hosting', fromJS(config));
  }
  return state
}

export function initializeDatabase() {
  return setStorage(INITIAL_STATE.get('database').toJS());
}

export function initializeHosting(store) {
  let hosting_config = store.getState().getIn(['services', 'hosting']);
  if (hosting_config) {
    return loadUploader(hosting_config.toJS()).then(({uploader}) => {
      store.dispatch({
        type: 'SET_UPLOADER',
        uploader
      });
    });
  }
}
