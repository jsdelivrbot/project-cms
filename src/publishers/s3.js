import {put} from '~/services/s3';


export default function s3Publisher(awsConfig) {
  function view() {
    //TODO region
    let region = awsConfig.region || 'us-east-1';
    let url = `http://${awsConfig.bucket}.s3-website-${region}.amazonaws.com/`;
    return window.open(url, '_blank');
  }

  function pushContent(path, content, mimetype) {
    return put(awsConfig, {path, content, mimetype});
  }

  return {
    pushContent,
    view
  }
}
