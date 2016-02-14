import _fetch from 'fetch';
import _ from 'lodash';


export default function thumbnailerMiddleware({getState}) {
  let promises = {};

  function uploader(files) {
    return getState().getIn(['/engine', 'uploader'])(files);
  }

  function fullfill(pictureId, thumbnailKey, picture) {
    let index = `${pictureId}::${thumbnailKey}`;
    let commitments = promises[index];
    if (commitments) {
      _.each(commitments, ([r,e]) => r(picture));
      delete promises[index];
    }
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
          picture = getState().getIn(['tables', '/media', pictureId]);
          console.log("saving thumbnail:", thumbnailKey, thumbnail, pictureId);
          picture = picture.setIn(['thumbnails', thumbnailKey], thumbnail);
          console.log("picture result:", picture);

          fullfill(pictureId, thumbnailKey, thumbnail);

          //TODO bulk record_changes once all commitments have been fulfilled
          next({
            type: 'UPDATE_MEDIA',
            pictureId,
            picture,
            record_change: {
              update_object: picture,
              table_name: '/media',
              object_id: pictureId
            }
          });

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
