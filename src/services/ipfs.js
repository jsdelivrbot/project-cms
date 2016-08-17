import ipfsAPI from 'ipfs-api';
import _ from 'lodash';


//CONSIDER: there is no replace unless using ipns

export var IPFS_CLIENT = ipfsAPI({host: 'ipfs', port: '5001', procotol: 'http'});

function put(ipfsClient, {path, content, mimetype}, onProgress) {

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
    //TODO awsConfig.prefix
    //we only want to prepend prefix if it is a new upload, mot a replace action
    //TODO what sort of path can we specify?
    let path = file.path;
    if (!path) {
      let id = v4();
      let extension = _.last(file.name.split('.'));
      path = `/media/${id}.${extension}`;
    }
    if (!overwrite && awsConfig.prefix) {
      path = awsConfig.prefix + path;
    }
    let content = file;
    let mimetype = file.type;
    return put(awsConfig, {
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

  let pushContent = _.partial(put, ipfs);

  return {
    pushContent,
    view
  }
}
