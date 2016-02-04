var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

exports.readListOfUrls = function(callback) {
  fs.readFile(this.paths.list, 'utf8', function(err, data) {
  if (err) throw err;
    callback(data.split('\n'));
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(urls) {
    callback(_.contains(urls, url));
  });
};

exports.addUrlToList = function(url, callback) {
  exports.isUrlInList(url, function(bool) {
    if (!bool) {
      fs.appendFile(exports.paths.list, url, function(err) {
        callback();
      });
    }
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.exists(exports.paths.archivedSites + '/' + url, function(exists) {
    callback(exists);
  });
};

exports.downloadUrls = function(urlArray, callback) {
  _.each(urlArray, function(url) {
    exports.isUrlArchived(url, function(bool2) {
      if (!bool2) {
        fs.writeFile(exports.paths.archivedSites + '/' + url, 'abc');
      }
    });
  });
};
