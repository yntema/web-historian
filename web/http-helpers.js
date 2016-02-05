var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, url, callback) {
  fs.readFile(url, 'utf8', function(err, data) {
    if (err) throw err;
    res.writeHead(200, exports.headers);
    console.log(data);
    res.end(data);
  });

};
