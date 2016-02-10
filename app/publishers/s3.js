import _ from 'lodash';
import knox from 'knox';
import {Buffer} from 'buffer';


export default function s3Publisher(awsConfig) {
  var client = knox.createClient({
    key: awsConfig.key,
    secret: awsConfig.secret,
    bucket: awsConfig.bucket
  });

  function view() {
    //TODO open tab
    return `https://${awsConfig.bucket}.s3.amazonaws.com/`;
  }

  function pushContent(path, content, mimetype) {
    return new Promise(function(resolve, reject) {
      var req = client.put(path, {
        'x-amz-acl': 'public-read',
        'Content-Length': Buffer.byteLength(content),
        'Content-Type': mimetype
      });
      req.on('response', function(res) {
        if (res.statusCode === 200) {
          resolve(req.url)
        } else {
          reject(res)
        }
      });
      req.end(content);
    });
  }

  return {
    pushContent,
    view
  }
}
