import {Map} from 'immutable';


export const INITIAL_STATE = Map();

//meant to be binded with warehouse/tableName
//stores warehouse items
export default function cloudWarehouseReducer(warehouse, state=INITIAL_STATE, action) {
  if (action.warehouse !== warehouse) return state;

  switch(action.type) {
    case "FETCH_WAREHOUSE_LISTING":
    case "ADD_SUBSCRIPTION":
      var items = {};
      _.each(action.result, function(peerItems, peerId) {
        _.each(peerItems, function(item, itemId)) {
          if (items[itemId]) {
            throw new Error("Duplicate warehouse item detected: "+itemId);
          }
          items[itemId] = _.assign(item, {peerId});
        });
      });
      return state.merge(items);
    case "REMOVE_SUBSCRIPTION":
      //TODO purge items where peerId = action.peerId
  }
  return state;
}
