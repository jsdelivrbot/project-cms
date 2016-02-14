import _fetch from 'fetch';


export default function thumbnailerMiddleware({getState}) {
  function uploader(files) {
    return getState().getIn(['/engine', 'uploader'])(files);
  }

  return (next) => (action) => {
    const { type } = action;
    if (type === 'MAKE_THUMBNAIL') {
      //TODO dedupe thumbnail requests
      //result is blob
      console.log("processing thumbnail result:", action);
      let {picture, options, result} = action;
      let {width, height} = options;
      let pictureId = picture.id;
      let thumbnailKey = `${width}x${height}`;
      let path = `${picture.path}/${thumbnailKey}.jpg`;
      result.path = path;
      result.name = picture.name;

      let thumbnail = {
        path,
        width,
        height
      };

      //CONSIDER: only record change after upload completion
      return uploader([result]).then(uploads => {
        console.log("thumbnail upload results:", uploads);
        thumbnail.url = uploads[0].url;
        picture = getState().getIn(['tables', '/media', pictureId]);
        console.log("saving thumbnail:", thumbnailKey, thumbnail, pictureId);
        picture = picture.setIn(['thumbnails', thumbnailKey], thumbnail);
        console.log("picture result:", picture);

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
      });
    }
    return next(action);
  }
}
