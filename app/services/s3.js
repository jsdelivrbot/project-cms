import _ from 'lodash';
import auth from 'knox/lib/auth';
import _fetch from 'fetch';
import {Buffer} from 'buffer';

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
