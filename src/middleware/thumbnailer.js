import _fetch from 'fetch';


export default function thumbnailerMiddleware({getState}) {
  return (next) => (action) => {
    const { type } = action;
    if (type === 'MAKE_THUMBNAIL') {
      let {picture, options} = action;
      action.promise = fetch(picture.url).then(response => response.blob()).then(image => {
        let {} = options;
        let pictureId = picture.id;
        let thumbnailKey = 'something';
        let file = {
          type: '',
          name: '',
          path: '',
        } //TODO should be a Blob

        //CONSIDER: record_change should be a merge as this may happen after someone else modifies object
        //especially in the case of multiple thumbnails of the same picture
        picture = getState().getIn(['tables', '/media', pictureId]);
        picture.thumbnails[thumbnailKey] = thumbnail;
        next({
          type: 'UPLOAD_FILE',
          file,
          record_change: {
            update_object: picture,
            table_name: '/media',
            object_id: pictureId
          }
        });
      });
    }
    return next(action);
  }
}
