// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

// // this code will be run on a CRON. it will look through the site.txt for new urls then go fetch them
// // and store them in the archive /sites folder

// var fs = require("fs");

// fs.writeFile(__dirname + 'cron.txt', 'CRON', function(error) {
// 	console.log(error);
// });
var archive = require('../helpers/archive-helpers.js');

var CronJob = require('cron').CronJob;
new CronJob('* * * * * *', function() {
  console.log('Cron running...');
  var urlList;
  archive.readListOfUrls(function(urls) {
    console.log(urls);
    archive.downloadUrls(urls);
  });
  

}, null, true, 'America/Los_Angeles');

