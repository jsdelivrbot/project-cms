import JSZip from "jszip";
import saveAs from 'FileSaver.js';

//directory is a path -> content dictionary
export default function downloadDirectory(directory) {
  var zip = new JSZip();
  directory.map((content, path) => {
    zip.file(path, content);
  });
  var blob = zip.generate({type:"blob"});
  saveAs(blob, "published.zip");
}
