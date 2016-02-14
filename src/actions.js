export function uploadFile(file) {
  return {
    type: 'UPLOAD_FILE',
    file
  }
}

export function replaceFile(file, path) {
  file.path = path;
  return {
    type: 'REPLACE_FILE',
    file
  }
}

export function uploadFiles(files) {
  return {
    type: 'UPLOAD_FILES',
    files
  }
}

export function askForMedia(mediaTypes, quantityLimit=1) {
  return {
    type: 'ASK_FOR_MEDIA',
    mediaTypes,
    quantityLimit
  };
}

export function makeThumbnail(picture, options) {
  return {
    type: 'MAKE_THUMBNAIL',
    picture,
    options,
    promise: new Promise(function(resolve, reject) {
      original = new Image();
      original.crossOrigin = "Anonymous";
      original.onload = function() {
        let {width, height, quality} = options;
        thumb(original, width, height, quality || .9, resolve);
      }
      original.onerror = reject;
      original.src = picture.url;
    })
  };
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
