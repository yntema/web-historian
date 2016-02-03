// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

// this code will be run on a CRON. it will look through the site.txt for new urls then go fetch them
// and store them in the archive /sites folder

var fs = require("fs");

fs.writeFile(__dirname + 'cron.txt', 'CRON', function(error) {
	console.log(error);
});