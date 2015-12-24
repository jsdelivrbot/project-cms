import JSZip from "jszip";
import _ from 'lodash';
import saveAs from 'FileSaver.js';

export default function zipPublisher() {
  var zip = new JSZip();

  function view() {
    var blob = zip.generate({type:"blob"});
    saveAs(blob, "published.zip");
    return zip;
  }

  function pushContent(path, content, mimetype) {
    zip.file(path, content);
  }

  return {
    pushContent,
    view
  }
}
