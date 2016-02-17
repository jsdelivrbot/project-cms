import _ from 'lodash';
import _AWS from 'aws-sdk/dist/aws-sdk.min'; //I have a dream that browser and node packages can live side by side
import {Buffer} from 'buffer';
import {v4} from 'node-uuid';

const AWS = window.AWS;
console.log("AWS:", AWS)

export function put(awsConfig, {path, content, mimetype}, onProgress) {
  AWS.config.update({accessKeyId: awsConfig.key, secretAccessKey: awsConfig.secret});
  AWS.config.region = awsConfig.region || 'us-east-1';

  let key = path.slice(1);

  return new Promise(function(resolve, reject) {
    var s3obj = new AWS.S3({params: {Bucket: awsConfig.bucket, Key: key}});
    s3obj.upload({Body: content, ACL: 'public-read', ContentType: mimetype}).
      on('httpUploadProgress', function(evt) {
        //console.log(evt);
        onProgress(evt)
      }).
      send(function(err, data) {
        //console.log(err, data)
        if(err) {
          reject(err)
        } else {
          resolve({
            url: data.Location,
            response: data
          });
        }
      });
  });
}

function _uploader(awsConfig, files, onProgress) {
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
    let id = v4();
    let extension = _.last(file.name.split('.'));
    let path = file.path ? file.path : `/media/${id}.${extension}`;
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

export function s3Uploader(store) {
  let awsConfig = null;

  function listener() {
    let newAwsConfig = store.getState().getIn(['tables', '/engine', 'awsConfig']);
    if (awsConfig !== newAwsConfig && newAwsConfig.get('bucket')) {
      awsConfig = newAwsConfig;
      let uploader = _.partial(_uploader, awsConfig.toJS());

      store.dispatch({
        type: 'SET_UPLOADER',
        uploader
      });
    }
  }

  listener();
  store.subscribe(listener);
}
