import {Map} from 'immutable';

const INITIAL_STATE = Map();

export default function pages(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_MEDIA':
      return state.set(action.record_change.object_id, Map(action.record_change.new_object));
    case 'REMOVE_MEDIA':
      return state.delete(action.record_change.object_id);
    case 'UPDATE_MEDIA':
      return state.set(action.record_change.object_id, Map(action.record_change.update_object));
    case 'ASK_FOR_MEDIA':
      //TODO direct media object changes to "datastore", "data", or "records" and store modal options from this action
      $("#media-modal-picker").modal('show');
    default:
      return state
  }
}
