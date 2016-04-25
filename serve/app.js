import request from 'request';
import express from 'express';
import process from 'process';
import _ from 'lodash';

export var app = express();

/* GET only requests */
function getOnly(req, res, next) {
  if (req.method.toLowerCase() !== 'get') {
    console.log("bad method:", req.method);
    return res.sendStatus(400);
  }
  next();
}

//host app code
app.use('/project-cms', express.static(__dirname + '/../'));

function serveGithub(res, username, repository, path, version="master") {
  var url = `https://raw.github.com/${username}/${repository}/${version}/${path}`;

  var r = request(url);
  r.on('response', function(resp) {
    r.pipe(res);
  });
  return r;
}

function serveIPFS(res, path) {
  var url = `${process.env.IPFS_API_ADDRESS}/${path}`;

  var r = request(url);
  r.on('response', function(resp) {
    r.pipe(res);
  });
  return r;
}

//github proxy view
app.use('/github/:username/:repository', getOnly, function(req, res) {
  var {username, repository} = req.params;

  return serveGithub(res, username, repository, req.path);
});

app.use('/ipfs', function(req, res) {
  return serveIPFS(res, '/ipfs'+req.path)
});

app.get('/', function(req, res) {
  return res.redirect('/project-cms/index.html');
});



var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log(`Listening at http://${host}:${port}`)
});
