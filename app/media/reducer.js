import {Map} from 'immutable';

const INITIAL_STATE = Map();

export default function pages(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ASK_FOR_MEDIA':
      $("#media-modal-picker").modal('show');
      return state.set('modal-options', {
        mediaTypes: action.mediaTypes,
        quantityLimit: action.quantityLimit,
      });
    default:
      return state
  }
}
