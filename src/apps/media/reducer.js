import {Map} from 'immutable';

const INITIAL_STATE = Map();

export default function pages(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ASK_FOR_MEDIA':
      return state.set('modal-options', Map({
        mediaTypes: action.mediaTypes,
        quantityLimit: action.quantityLimit,
        visible: true
      }));
    case 'RESPOND_WITH_MEDIA':
      return state.set('modal-options', Map({
        visible: false
      }));
    default:
      return state
  }
}
