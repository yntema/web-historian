var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');
var httpHelpers = require('./http-helpers.js');
var urlParser = require('url');

var actions = {
  "GET": function(req, res) {
    if (req.url === "/" || req.url === "") {
      httpHelpers.serveAssets(res, archive.paths.siteAssets + '/index.html');
    } else if (req.url === "/styles.css") {
      fs.readFile(archive.paths.siteAssets + '/styles.css', 'utf8', function(err, data) {
        if (err) throw err;
        res.writeHead(200, {"Content-Type": "text/css"});
        res.end(data);
      });
    } else {
      fs.exists(archive.paths.archivedSites + req.url, function(exists) {
        if (exists) {
          httpHelpers.serveAssets(res, archive.paths.archivedSites + req.url);
        } else {
          res.statusCode = 404;
          res.end();
        }
      });
    }
  },
  "POST": function(req, res) {
    var buffer = '';

    req.on('data', function(data) {
      buffer += data;
    });

    req.on('end', function() {
      buffer = buffer.substring(4);
      archive.isUrlInList(buffer, function (isInList) {
        if (isInList) {
          archive.isUrlArchived(buffer, function (isArchived) {
            if (isArchived) {
              httpHelpers.serveAssets(res, archive.paths.archivedSites + '/' + buffer + '.html');
            } else {
              httpHelpers.serveAssets(res, archive.paths.siteAssets + '/loading.html');
            }
          });
        } else {
          archive.addUrlToList(buffer, function() {
            httpHelpers.serveAssets(res, archive.paths.siteAssets + '/loading.html');
          });
        }
      });
    });
  }
};

exports.handleRequest = function (req, res) {
  actions[req.method](req, res);
};
