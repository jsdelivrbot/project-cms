import _ from 'lodash';
import auth from 'knox/lib/auth';
import {Buffer} from 'buffer';
import {v4} from 'node-uuid';

//https://github.com/Automattic/knox/issues/299


export function put(awsConfig, {path, content, mimetype}, onProgress) {
  let date = new Date();
  let headers = {
    'x-amz-acl': 'public-read',
    'x-amz-date': date.toUTCString(),
    'Access-Control-Allow-Origin': '*',
    'Content-Length': Buffer.byteLength(content),
    'Content-Type': mimetype,
  };

  headers.Authorization = auth.authorization({
    key: awsConfig.key,
    secret: awsConfig.secret,
    verb: 'PUT',
    date: '',
    resource: auth.canonicalizeResource('/' + awsConfig.bucket + path),
    contentType: mimetype,
    md5: '',
    amazonHeaders: `x-amz-acl:public-read\nx-amz-date:${headers['x-amz-date']}`,
  });

  //sadly fetch isn't at a point where I know how to do onprogress events
  let url = `https://${awsConfig.bucket}.s3.amazonaws.com${path}`;

  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest({
      responseType: 'blob',
    });

    xhr.open("PUT", url, true);
    _.each(headers, (headerValue, headerName) => {
      if (headerName === 'Content-Length') return;
      xhr.setRequestHeader(headerName, headerValue);
    });

    if (onProgress) {
      xhr.upload.addEventListener("progress", onProgress);
    }
    xhr.upload.addEventListener("abort", reject);
    xhr.upload.addEventListener("error", reject);

    xhr.addEventListener("load", event => {
      resolve({
        url,
        body: xhr.response,
        xhr
      });
    });

    xhr.send(content);
  });

  /*
  return fetch(`https://${awsConfig.bucket}.s3.amazonaws.com${path}`, {
    method: 'PUT',
    headers: headers,
    body: content
  });
  */
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
