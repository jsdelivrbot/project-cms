import _ from 'lodash';
import auth from 'knox/lib/auth';
import _fetch from 'fetch';
import {Buffer} from 'buffer';
import {v4} from 'node-uuid';

//https://github.com/Automattic/knox/issues/299


export function put(awsConfig, {path, content, mimetype}) {
  let date = new Date();
  let headers = {
    'x-amz-acl': 'public-read',
    'x-amz-date': date.toUTCString(),
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
  return fetch(`https://${awsConfig.bucket}.s3.amazonaws.com${path}`, {
    method: 'PUT',
    headers: headers,
    body: content
  });
}

function _uploader(awsConfig, files) {
  return Promise.all(_.map(files, file => {
    let id = v4();
    let extension = _.last(file.name.split('.'));
    let path = file.path ? file.path : `/media/${id}.${extension}`;
    let content = file;
    let mimetype = file.type;
    return put(awsConfig, {
      path,
      content,
      mimetype
    }).then(r => _.assign(r, {path}));
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
