const fs = require("fs");

module.exports.getData = function(callback) {
    const projectdata = [];

    fs.readdir(__dirname + "/projects", (err, dirs) => {
        if (err) {
            console.log(err);
        } else {
            dirs.forEach(function(dir) {
                // require the json files
                if (dir.slice(0, 1) !== ".") {
                    const data = require(__dirname +
                        "/projects/" +
                        dir +
                        "/data.json");
                    projectdata.push({
                        dir: dir,
                        title: data.title,
                        description: data.description
                    });
                }
            });
            callback(null, projectdata);
        }
    });
};
