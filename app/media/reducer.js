import {Map} from 'immutable';

const INITIAL_STATE = Map();

export default function pages(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ASK_FOR_MEDIA':
      //TODO direct media object changes to "datastore", "data", or "records" and store modal options from this action
      $("#media-modal-picker").modal('show');
    default:
      return state
  }
}
