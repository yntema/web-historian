var fs = require('fs');

// Sync is ok here because this is called just once on startup.
module.exports = function (basePath) {
  // if the archive folder doesn't exist, create it.
  if (!fs.existsSync(basePath)) {
    // We use fs.mkdirSync to create the folder
    fs.mkdirSync(basePath);
  }

  // if the file doesn't exist, create it.
  if (!fs.existsSync(basePath + "/sites.txt")) {
    // We use fs.openSync to create the file
    var file = fs.openSync(basePath + "/sites.txt", "w");
    fs.closeSync(file);
  }

  // if the folder doesn't exist, create it.
  if (!fs.existsSync(basePath + "/sites")) {
    // We use fs.mkdirSync to create the folder
    fs.mkdirSync(basePath + "/sites");
  }
};


// initialize is a function that will be used in the basic server.
// it checks if the basepath folder exits and creates it if not.
// creates /sites.txt if not already there
// creates /sites folder if not already there


// .sites.txt will hold the names of sites that need to be fetched by workers
// /sites is where the html files will be stored