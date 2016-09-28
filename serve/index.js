var {app} = require('./app');

exports.app = app

if (require.main === module) {
  var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log(`Listening at http://${host}:${port}`)
  });
}
