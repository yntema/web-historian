var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');

var actions = {
  "GET": function() {

  }
}

exports.handleRequest = function (req, res) {
  // console.log("................request method", req.method);
  // console.log("................request method", req.url);
  // res.writeHead()
  // console.log("................ res end ", archive.paths.siteAssets + '/index.html')



  if(req.method === "GET") {
    if (req.url === "/") {
      fs.readFile(archive.paths.siteAssets + '/index.html', 'utf8', function(err, data) {
        if (err) throw err;
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
      buffer = buffer.substring(4) + '\n';
      fs.writeFile(archive.paths.list, buffer);
      res.statusCode = 302;
      res.end();
    });
  }
};


// handling get requests:
// Check sites.txt to see if the url has been posted yet. (archive.isUrlInList())
  // if not, tell them that it has not been posted
// if it has been posted, check the /sites to see if it has been archived (archive.isUrlArchived())
  // if it has been archived, return the html page from /sites folder (archive.downloadUrls())
  // if not, tell them to check back soon


// handling post requests:
// Check if the url posted is available in the sites.txt list. (archive.isUrlInList())
  // if it has,
    // if url has been archived, send them to that link
    // if url has not yet been archived, send them to the loading page
  // if not, write the url to the sites.txt file (archive.addUrlToList())
