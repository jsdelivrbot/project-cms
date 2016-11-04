const request = require('request');
const express = require('express');
const process = require('process');
const _ = require('lodash');
const ipfsDaemon = require('ipfs-daemon');


var app = express();
exports.app = app;

/* GET only requests */
function getOnly(req, res, next) {
  if (req.method.toLowerCase() !== 'get') {
    console.log("bad method:", req.method);
    return res.sendStatus(400);
  }
  next();
}

function constructIPFSService() {
  console.log("Starting IPFS deamon...");
  const conf = {
    //IpfsDataDir: `/tmp/ipfs-session-${sessionId}`,
    Addresses: {
      API: '/ip4/127.0.0.1/tcp/0',
      Swarm: ['/ip4/0.0.0.0/tcp/0'],
      Gateway: '/ip4/0.0.0.0/tcp/0'
    },
  };
  return ipfsDaemon(conf)
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


function pipeRequest(address, res, path) {
  var url = `${address}/${path}`;

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

app.get('/', function(req, res) {
  return res.redirect('/project-cms/index.html');
});



constructIPFSService().then(res => {
  //console.log("IPFS daemon result:", res)
  let {daemon} = res;
  console.log(daemon.apiAddr, daemon.gatewayAddr)
  let apiAddr = 'http://127.0.0.1:'+_.last(daemon.apiAddr.split('/'));
  let gatewayAddr = 'http://127.0.0.1:'+_.last(daemon.gatewayAddr.split(':'));


  app.use('/ipfs', getOnly, function(req, res) {
    return pipeRequest(gatewayAddr, res, '/ipfs'+req.path)
  });

  app.use('/ipns', getOnly, function(req, res) {
    return pipeRequest(gatewayAddr, res, '/ipns'+req.path)
  });

  app.use(function(req, res) {
    return pipeRequest(apiAddr, res, req.path);
  });

  var server = app.listen(8000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log(`Listening at http://${host}:${port}`)
  });
}).catch(error => console.error(error));
