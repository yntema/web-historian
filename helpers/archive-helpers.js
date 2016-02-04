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

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

// the code below reads through the list urls in /sites.txt
// if the url is not there, it will add it
// it will check if a url has been archived and will download it if so.	

exports.readListOfUrls = function(callback) {
	// loops through all urls in sites.txt
      fs.readFile(this.paths.list, 'utf8', function(err, data) {
      if (err) throw err;
        // console.log('------------------------- data ', data);
        callback(data.split('\n'));
      });

};

exports.isUrlInList = function(url, callback) {
	// loop urls using readListOfUrls()
	// if target === a url in the site.txt
  this.readListOfUrls(function(urls) {
    callback(url);
  });

};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(this.paths.list, url, function(err) {
    callback(url);
  });
  // console.log("paths list", this.paths.list);
  // var buffer = "";
	// fs.open(this.paths.list, 'w', function(err, fd) {
 //    console.log('...................... fd ', fd)
 //    fs.write(fd, url, function(data) {
 //      console.log(data);
 //        buffer += fd;
 //        console.log('..................... buffer', buffer);  
 //    });
 //  });
  // fs.close(this.paths.list);
};

exports.isUrlArchived = function() {
};

exports.downloadUrls = function() {
};
