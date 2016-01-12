var _resolve, _reject;

//CONSIDER: should UX calls be made in actions, reducer, or a component subscription
//CANONICAL: information should go through connect() & state -> different reducer
//CONSIDER: other apps will need to import askForMedia because of special promise handling
//would be better without the import and send a non-special message
//perhaps this should be absorbed by dashboard plugins?
//need state for toggling sidebar view
//media input: this.props.dispatch({type: 'ASK_FOR_MEDIA', media_types:['image']}) .then() =>
//CONSIDER: 'ASK_FOR_<NS>' middleware; injects promise; fullfills when it sees RESPOND_WITH_<NS>
//allows for plugin IO
//does not resolve sidebar embed toggle - red herring - that needs to be an embedable component; different kind of plugin
//we can access via engine apps...
export function askForMedia(media_types, multiple=false) {
  if (_resolve) {
    throw new Error('A media request has already been made and has not been answered')
  }

  var promise = new Promise(function(resolve, reject) {
    _resolve = resolve;
    _reject = reject;
  });

  $("#media-modal-picker").modal('show');

  return {
    type: 'ASK_FOR_MEDIA',
    media_types,
    multiple,
    promise,
  };
}

export function respondWithMedia(media_item) {
  //CONSIDER: this might cause a race condition, or an action to be called when it shouldn't
  _resolve(media_item);
  _resolve = null; _reject = null;

  $("#media-modal-picker").modal('hide');

  return {
    type: 'RESPOND_WITH_MEDIA',
    media_item,
  }
}

export default {askForMedia, respondWithMedia}
