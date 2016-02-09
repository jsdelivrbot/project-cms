import _ from 'lodash';
import fetch from 'whatwg-fetch';

//CONSIDER: use knoxclient?

export default function s3Publisher(awsConfig) {
  let baseUrl = `https://${awsConfig.bucket}.s3.amazonaws.com`;

  function view() {
    return baseUrl;
  }

  function pushContent(path, content, mimetype) {
    let url = `${baseUrl}${path}`;
    let authorization = '';
    return fetch(url, {
      method: 'PUT',
      data: content,
      headers: {
        'Authorization': authorization,
        'x-amz-acl': 'public-read',
        'Content-Length': Buffer.byteLength(content),
        'Content-Type': mimetype,
        'Content-Encoding': 'utf-8'
      }
    });
  }

  return {
    pushContent,
    view
  }
}
