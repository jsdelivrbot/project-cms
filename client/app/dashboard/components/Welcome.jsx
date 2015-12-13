import React from 'react';
import {destroy} from '../../middleware/persistence';

function doPurge(event) {
  destroy(err => {
    console.log("Purge complete", err);
    window.location.reload();
  });
}

export default function Welcome() {
  return <div className="container-fluid">
    <div className="row">
      <div className="col-sm-12">
        <h1>Welcome!</h1>

        <p>
          Things you should try:
        </p>
        <ul>
          <li><a href="#/pages/add">Add a Page</a></li>
          <li><a href="#/templates/base.html">Change the base layout of the site</a></li>
          <li>Press the export button in the top right corner</li>
        </ul>

        <p>
          Technical Notes:
        </p>
        <ul>
          <li>This demo is 100% in the browser, no help from servers</li>
          <li>Everything is a pluggable application and is given a `baseUrl` for mounting in the dashboard app</li>
          <li>Publishing currently exports to a zipfile</li>
          <li>Persistence is done with localstorage which can be <a onClick={doPurge}>purged</a></li>
          <li>[TODO] apps can be hot loaded from github</li>
          <li>[TODO] HTTP/2 will dramatically decrease load time</li>
        </ul>
      </div>
    </div>
  </div>
}
