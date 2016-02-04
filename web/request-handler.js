var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');
var httpHelpers = require('./http-helpers.js');
var urlParser = require('url');

var actions = {
  "GET": function() {

  }
};

exports.handleRequest = function (req, res) {
  if(req.method === "GET") {
    if (req.url === "/" || req.url === "") {
      fs.readFile(archive.paths.siteAssets + '/index.html', 'utf8', function(err, data) {
        if (err) throw err;
        res.writeHead(200, httpHelpers.headers);
        res.end(data);
        });
    } else {
      fs.exists(archive.paths.archivedSites + req.url, function(exists) {
        if (exists) {
          fs.readFile(archive.paths.archivedSites + req.url, 'utf8', function(err, data) {
            if (err) throw err;
            res.end(data);
          });
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
              fs.readFile(archive.paths.archivedSites + '/' + buffer + '.html', 'utf8', function(err, data) {
                if (err) throw err;
                res.writeHead(200, httpHelpers.headers);
                res.end(data);
              });
            } else {
              fs.readFile(archive.paths.siteAssets + '/loading.html', 'utf8', function(err, data) {
                if (err) throw err;
                res.writeHead(200, httpHelpers.headers);
                res.end(data);
              });
            }
          });
        } else {
          archive.addUrlToList(buffer, function() {
            fs.readFile(archive.paths.siteAssets + '/loading.html', 'utf8', function(err, data) {
              if (err) throw err;
              res.writeHead(200, httpHelpers.headers);
              res.end(data);
            });
          });
        }
      });
    });
  }
};
