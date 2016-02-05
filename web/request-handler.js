var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');
var httpHelpers = require('./http-helpers.js');
var urlParser = require('url');

var actions = {
  "GET": function() {

  },
  "POST": function() {

  }
};

exports.handleRequest = function (req, res) {
  if(req.method === "GET") {
    if (req.url === "/" || req.url === "") {
      httpHelpers.serveAssets(res, archive.paths.siteAssets + '/index.html');
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
  } else if (req.method === "POST") {
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
