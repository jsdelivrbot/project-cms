import _ from 'lodash';

const INITIATE_REQUEST = 'ASK_FOR_';
const FULFILL_REQUEST = 'RESPOND_WITH_';

//'ASK_FOR_<NS>' middleware; injects promise; fullfills when it sees RESPOND_WITH_<NS>
export default function promiseMiddleware() {
  var requests = {};

  return (next) => (action) => {
    const {type} = action;

    if (_.startsWith(type, INITIATE_REQUEST)) {

      var ns = type.slice(INITIATE_REQUEST.length);

      console.log("initiate request:", ns)

      if (requests[ns]) {
        console.warn(`${type} was sent but was unfulfilled when another request was made`);
        requests[ns].reject('Another request was sent');
      }

      var promise = new Promise(function(resolve, reject) {
        requests[ns] = {resolve, reject};
      });

      next(action);
      return promise;

    } else if (_.startsWith(type, FULFILL_REQUEST)) {
      var ns = type.slice(FULFILL_REQUEST.length);

      console.log("fulfill request:", ns)

      requests[ns].resolve(action.result === undefined ? action : action.result);
      delete requests[ns];
    }

    return next(action);
  };
}
