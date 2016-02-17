/* */ 
var AWS = require('../core');
AWS.util.update(AWS.APIGateway.prototype, {
  setAcceptHeader: function setAcceptHeader(req) {
    var httpRequest = req.httpRequest;
    httpRequest.headers['Accept'] = 'application/json';
  },
  setupRequestListeners: function setupRequestListeners(request) {
    request.addListener('build', this.setAcceptHeader);
  }
});
