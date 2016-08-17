import {IPFS_CLIENT} from '~/services/ipfs';


function resolvePeerItems(hash) {
  return IPFS_CLIENT.name.resolve(hash)
    .then(x => IPFS_CLIENT.object.get(x.Path))
    .then(index => {
      return Promise.all(index.Links.map((link) => (
        IPFS_CLIENT.object.get(link.Hash).then(x => x.Data)
      )));
    });
}

export function fetchWarehouseListing(tableName, peerNames) {
  let promise = Promise.all(peerNames.map(resolvePeerItems))
    .then(function(itemSets) {
      let catalog = {};
      for(let i in itemSets) {
        catalog[peerNames[i]] = itemSets[i];
      }
      return catalog;
    });
  return {
    type: 'FETCH_WAREHOUSE_LISTING',
    warehouse: tableName,
    promise,
  };
}

export function addSubscription(tableName, peerId) {
  let promise = resolvePeerItems(peerId)
    .then(function(items) {
      return {
        [peerId]: items
      }
    });
  return {
    type: 'ADD_SUBSCRIPTION',
    warehouse: tableName,
    peerId,
    record_change: {
      new_object: {peerId},
      table_name: tableName,
      object_id: peerId,
    },
    promise,
  };
}

export function removeSubscription(tableName, peerId) {
  return {
    type: 'REMOVE_SUBSCRIPTION',
    warehouse: tableName,
    peerId,
    record_change: {
      remove_object: peerId,
      table_name: tableName,
      object_id: peerId,
    },
  };
}

export function exportItem(tableName, item) {
  //TODO ipfs calls
  //add object
  //associate link to index
  //update ipns
  let item_name = 'FOOBAR';//TODO
  let index_hash = 'FOOBAR';//TODO
  IPFS_CLIENT.id().then(self => {
    index_hash = IPFS_CLIENT.name.resolve(self.ID);
  });
  let serialized_item = JSON.stringify(item)
  let promise = IPFS_CLIENT.object.new(serialized_item)
    .then(res => res.Hash)
    .then(item_hash => {
      //TODO index_hash & item_name
      return IPFS_CLIENT.object.addLink(index_hash, item_name, item_hash);
    }).then(index_item => {
      //TODO associate
      return IPFS_CLIENT.name.publish(index_item.Hash)
    });
  return {
    type: 'EXPORT_ITEM',
    warehouse: tableName,
    item,
    promise,
  };
}

export function updateItem(tableName, couldId, item) {
  return {
    type: 'UPDATE_ITEM',
    warehouse: tableName,
    item,
  };
}
