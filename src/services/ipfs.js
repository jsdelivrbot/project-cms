import ipfsAPI from 'ipfs-api';
import {v4} from 'node-uuid';
import _ from 'lodash';


//CONSIDER: there is no replace unless using ipns

export var IPFS_CLIENT = ipfsAPI({
    host: window.location.hostname,
    port: window.location.port,
    procotol: window.location.protocol.substr(0, window.location.protocol.length-1),
});

function put(ipfsClient, {path, content, mimetype}, onProgress) {
    //no onProgress unless maybe:
    //https://github.com/ipfs/interface-ipfs-core/tree/master/API/files#createaddstream
    //TODO path does what?
    return ipfsClient.files.add({path, content})
}

function _uploader(ipfsClient, files, overwrite, onProgress) {
  let total = 0;
  let individualUploads = {};

  //emit an overall progress
  function updateProgress(index, event) {
    if (!onProgress) return;
    individualUploads[index] = event.loaded;
    let loaded = _.reduce(individualUploads, (loaded, col) => {
      return col+loaded;
    }, 0);
    onProgress({loaded, total});
  }

  return Promise.all(_.map(files, (file, index) => {
    total += file.size;
    //we only want to prepend prefix if it is a new upload, not a replace action
    //TODO path does nothing, track internally
    let path = file.path;
    if (!path) {
      let id = v4();
      let extension = _.last(file.name.split('.'));
      path = `/media/${id}.${extension}`;
    }
    let content = file;
    let mimetype = file.type;
    return put(IPFS_CLIENT, {
      path,
      content,
      mimetype
    }, _.partial(updateProgress, index)).then(r => _.assign(r, {
      path,
      name: file.name,
      type: file.type
    }));
  }));
}

export function uploaderFactory(config) {
  return _.partial(_uploader, config);
}

export function publisherFactory(awsConfig) {
  function view() {
    let hash = 'DEADBEAF'
    let url = `/ipfs/${hash}`;
    return window.open(url, '_blank');
  }

  let pushContent = _.partial(put, IPFS_CLIENT);

  return {
    pushContent,
    view
  }
}
