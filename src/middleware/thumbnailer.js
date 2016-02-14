import _ from 'lodash';
import {fromJS, Map} from 'immutable';


export default function thumbnailerMiddleware({getState}) {
  let promises = {};
  let changes = Map();

  function uploader(files) {
    return getState().getIn(['/engine', 'uploader'])(files);
  }



  function rejectfill(pictureId, thumbnailKey) {
    let index = `${pictureId}::${thumbnailKey}`;
    let commitments = promises[index];
    if (commitments) {
      _.each(commitments, ([r,e]) => e());
      delete promises[index];
    }
  }

  function requestThumbnail(pictureId, thumbnailKey) {
    let index = `${pictureId}::${thumbnailKey}`;
    let commitments = promises[index];
    if (commitments) {
      return new Promise((r, e) => {
        commitments.push([r,e]);
      });
    } else {
      promises[index] = [];
    }
  }

  return (next) => (action) => {

    function fullfill(pictureId, thumbnailKey, thumbnail) {
      let index = `${pictureId}::${thumbnailKey}`;
      let commitments = promises[index];
      if (commitments) {
        _.each(commitments, ([r,e]) => r(thumbnail));
        delete promises[index];
      }

      changes = changes.setIn([pictureId, thumbnailKey], fromJS(thumbnail));
      if (!_.keys(promises).length) {
        recordChanges();
      }
    }

    function recordChanges() {
      let record_changes = [];

      changes.forEach((thumbnails, pictureId) => {
        let picture = getState().getIn(['tables', '/media', pictureId]);
        console.log("saving thumbnails for picture:", pictureId);

        thumbnails.forEach((thumbnail, thumbnailKey) => {
          picture = picture.setIn(['thumbnails', thumbnailKey], thumbnail);
        });

        record_changes.push({
          update_object: picture,
          table_name: '/media',
          object_id: pictureId
        });
      });

      changes = new Map();

      next({
        type: 'UPDATE_MEDIAS',
        record_changes,
      });
    }

    const { type } = action;
    if (type === 'MAKE_THUMBNAIL') {
      let {picture, options, result} = action;
      let {width, height, quality} = options;
      let pictureId = picture.id;
      let thumbnailKey = `${width}x${height}`;

      let promise = requestThumbnail(pictureId, thumbnailKey);

      if (!promise) {
        let path = `/media/${pictureId}/${thumbnailKey}.jpg`;
        let thumbnail = {
          path,
          width,
          height
        };

        promise =  new Promise(function(resolve, reject) {
          original = new Image();
          original.crossOrigin = "Anonymous";
          original.onload = function() {
            thumb(original, width, height, quality || .9, resolve);
          }
          original.onerror = reject;
          original.src = picture.url;
        }).then(result => {
          //result is blob
          console.log("processing thumbnail result:", action);
          result.path = path;
          result.name = picture.name;

          return uploader([result]);
        }).then(uploads => {
          console.log("thumbnail upload results:", uploads);
          thumbnail.url = uploads[0].url;
          console.log("picture result:", picture);

          fullfill(pictureId, thumbnailKey, thumbnail);
          return thumbnail;
        }).catch(error => {
          console.error(error);
          rejectfill(pictureId, thumbnailKey);
          return Promise.reject(error);
        });
      }
      action.promise = promise;
    }
    return next(action);
  }
}


//TODO finalize options
function thumb(img, width, height, quality, resolve) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');

  var ratio = img.width / width > img.height / height
    ? img.width / width
    : img.height / height;

  if (ratio > 1) {
    width = Math.ceil(img.width / ratio);
    height = Math.ceil(img.height / ratio);
  } else {
    width = img.width;
    height = img.height;
  }

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);

  if (canvas.toBlob) {
    canvas.toBlob(resolve, 'image/jpeg', quality);
  } else {
    console.log("fall back to data url")
    resolve(dataURLToBlob(canvas.toDataURL('image/jpeg', quality)));
  }
}

function dataURLToBlob(dataURL) {
  var BASE64_MARKER = ';base64,';
  if (dataURL.indexOf(BASE64_MARKER) == -1) {
    var parts = dataURL.split(',');
    var contentType = parts[0].split(':')[1];
    var raw = decodeURIComponent(parts[1]);

    return new Blob([raw], {type: contentType});
  }

  var parts = dataURL.split(BASE64_MARKER);
  var contentType = parts[0].split(':')[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;

  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], {type: contentType});
}
